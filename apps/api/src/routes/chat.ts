import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { chatRequestSchema } from "@adonai/shared";
import { system_prompt } from "@adonai/adonai-prompt";
import { getOpenAIClient } from "../lib/openai";
import { getScripture } from "../lib/scripture";
import { requireAuth } from "../lib/auth";
import { assertTranslationAllowed } from "../lib/translation";

const MAX_CONTEXT_MESSAGES = 12;
const RETRY_SYSTEM_NOTE =
  "You included verbatim Scripture not returned by get_scripture. Remove verbatim quotes or call get_scripture for the missing references.";

function extractQuotedSegments(text: string) {
  const segments: string[] = [];
  const straight = /"([^"]+)"/g;
  const curly = /“([^”]+)”/g;
  let match = straight.exec(text);
  while (match) {
    segments.push(match[1]);
    match = straight.exec(text);
  }
  match = curly.exec(text);
  while (match) {
    segments.push(match[1]);
    match = curly.exec(text);
  }
  return segments;
}

function extractLineQuoteSegments(text: string) {
  const segments: string[] = [];
  const lines = text.split(/\r?\n/);
  for (const line of lines) {
    const match = line.match(/^(?<quote>.+?)(?:—|-|–)?\s*[1-3]?\s?[A-Za-z].*?\d+:\d+.*$/);
    if (match?.groups?.quote) {
      const quote = match.groups.quote.trim();
      if (quote.length > 10) {
        segments.push(quote.replace(/["“”]/g, "").trim());
      }
    }
  }
  return segments;
}

function isVerified(segment: string, allowed: string[]) {
  return allowed.some((block) => block.includes(segment));
}

function hasUnverifiedQuotes(text: string, allowed: string[]) {
  const segments = [...extractQuotedSegments(text), ...extractLineQuoteSegments(text)];
  if (segments.length === 0) {
    return false;
  }
  if (allowed.length === 0) {
    return true;
  }
  return segments.some((segment) => !isVerified(segment, allowed));
}

function stripUnverifiedQuotes(text: string, allowed: string[]) {
  const quotedSegments = extractQuotedSegments(text);
  let updated = text;
  for (const segment of quotedSegments) {
    if (!isVerified(segment, allowed)) {
      updated = updated.replaceAll(`"${segment}"`, segment).replaceAll(`“${segment}”`, segment);
    }
  }

  const lines = updated.split(/\r?\n/);
  const cleanedLines = lines.map((line) => {
    const match = line.match(/^(?<quote>.+?)(?<ref>(?:—|-|–)?\s*[1-3]?\s?[A-Za-z].*?\d+:\d+.*)$/);
    if (!match?.groups?.quote || !match.groups.ref) {
      return line;
    }
    const quote = match.groups.quote.trim().replace(/["“”]/g, "");
    if (quote.length > 10 && !isVerified(quote, allowed)) {
      return match.groups.ref.trim();
    }
    return line;
  });
  return cleanedLines.join("\n");
}

export async function chatRoutes(app: FastifyInstance) {
  app.post("/chat", async (request, reply) => {
    const auth = await requireAuth(request, app.prisma);
    const body = chatRequestSchema.parse(request.body);

    const translation = body.translation ?? "WEB";
    assertTranslationAllowed(translation);
    const quoteVerbatim = body.quoteVerbatim ?? true;

    let conversationId = body.conversationId;
    if (!conversationId) {
      const conversation = await app.prisma.conversation.create({
        data: {
          user_id: auth.userId,
          title: body.message.slice(0, 50)
        }
      });
      conversationId = conversation.id;
    }

    const history = await app.prisma.message.findMany({
      where: { conversation_id: conversationId },
      orderBy: { created_at: "asc" },
      take: MAX_CONTEXT_MESSAGES
    });

    await app.prisma.message.create({
      data: {
        conversation_id: conversationId,
        role: "user",
        content: body.message
      }
    });

    const openai = getOpenAIClient();
    const model = process.env.OPENAI_MODEL ?? "gpt-4.1-mini";

    const input = [
      { role: "system", content: system_prompt },
      {
        role: "system",
        content: `Preferred translation: ${translation}. Quote verbatim: ${quoteVerbatim ? "yes" : "no"}.`
      },
      ...history.map((message) => ({ role: message.role, content: message.content })),
      { role: "user", content: body.message }
    ];

    const tools = [
      {
        type: "function",
        function: {
          name: "get_scripture",
          description: "Fetch Bible verse text by reference and translation.",
          parameters: {
            type: "object",
            properties: {
              reference: { type: "string" },
              translation: { type: "string" }
            },
            required: ["reference"]
          }
        }
      }
    ];

    let response = await openai.responses.create({
      model,
      input,
      tools
    });

    const scriptureTexts: string[] = [];
    const citations: Array<{ reference: string; translation: string }> = [];

    const collectToolCalls = () =>
      response.output
        .filter((item) => item.type === "tool_call")
        .map((item) => ({ id: item.id, name: item.name, arguments: item.arguments }));

    let toolCalls = collectToolCalls();

    while (toolCalls.length > 0) {
      const toolOutputs = [] as Array<{ tool_call_id: string; output: string }>;
      for (const call of toolCalls) {
        if (call.name !== "get_scripture") {
          continue;
        }
        const args = z
          .object({ reference: z.string(), translation: z.string().optional() })
          .parse(JSON.parse(call.arguments));

        const scripture = await getScripture(app.prisma, args.reference, args.translation ?? translation);
        for (const entry of scripture) {
          citations.push({ reference: entry.reference, translation: entry.translation });
          scriptureTexts.push(entry.textBlock);
        }

        toolOutputs.push({
          tool_call_id: call.id,
          output: JSON.stringify({
            reference: args.reference,
            translation: args.translation ?? translation,
            results: scripture
          })
        });
      }

      response = await openai.responses.create({
        model,
        previous_response_id: response.id,
        tool_outputs: toolOutputs
      });
      toolCalls = collectToolCalls();
    }

    let assistantMessage = response.output_text ?? "";

    if (quoteVerbatim && hasUnverifiedQuotes(assistantMessage, scriptureTexts)) {
      const retry = await openai.responses.create({
        model,
        input: [
          { role: "system", content: system_prompt },
          { role: "system", content: RETRY_SYSTEM_NOTE },
          ...history.map((message) => ({ role: message.role, content: message.content })),
          { role: "user", content: body.message }
        ],
        tools
      });

      assistantMessage = retry.output_text ?? "";
      if (hasUnverifiedQuotes(assistantMessage, scriptureTexts)) {
        assistantMessage = stripUnverifiedQuotes(assistantMessage, scriptureTexts);
      }
    }

    await app.prisma.message.create({
      data: {
        conversation_id: conversationId,
        role: "assistant",
        content: assistantMessage,
        metadata_json: { citations }
      }
    });

    return reply.send({
      conversationId,
      assistantMessage,
      citations
    });
  });
}
