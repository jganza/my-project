import { describe, expect, it, vi } from "vitest";
import { createApp } from "../src/app";
import { SignJWT } from "jose";
import { createFakePrisma, seedVerses } from "./helpers";

vi.mock("../src/lib/openai", () => {
  return {
    getOpenAIClient: () => ({
      responses: {
        create: vi.fn().mockResolvedValue({
          id: "resp_1",
          output: [],
          output_text: "Scripture is clear that God offers life through Christ (John 3:16)."
        })
      }
    })
  };
});

function createToken(secret: string) {
  return new SignJWT({ email: "dev@example.com" })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject("supabase-user-id")
    .sign(new TextEncoder().encode(secret));
}

describe("POST /v1/chat", () => {
  it("returns a response with a reference", async () => {
    process.env.SUPABASE_JWT_SECRET = "test-secret";
    process.env.OPENAI_API_KEY = "test-key";

    const token = await createToken(process.env.SUPABASE_JWT_SECRET);
    const prisma = createFakePrisma({ verses: seedVerses });
    const app = await createApp({ prisma });

    const response = await app.inject({
      method: "POST",
      url: "/v1/chat",
      headers: {
        authorization: `Bearer ${token}`
      },
      payload: {
        message: "How do I know God loves me?",
        translation: "WEB",
        quoteVerbatim: false
      }
    });

    expect(response.statusCode).toBe(200);
    const body = response.json() as { assistantMessage: string };
    expect(body.assistantMessage.length).toBeGreaterThan(0);
    expect(body.assistantMessage).toContain("John 3:16");

    await app.close();
  });
});
