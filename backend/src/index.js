import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import { PrismaClient } from "@prisma/client";
import OpenAI from "openai";
import { buildSystemPrompt } from "./prompt.js";

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const PORT = process.env.PORT || 4000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:3000";

app.use(cors({ origin: CLIENT_ORIGIN }));
app.use(express.json({ limit: "1mb" }));
app.use(morgan("combined"));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false
});

app.use(limiter);

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/conversations", async (_req, res) => {
  const conversations = await prisma.conversation.findMany({
    orderBy: { updatedAt: "desc" },
    select: { id: true, title: true, updatedAt: true }
  });

  res.json(conversations);
});

app.get("/api/conversations/:id/messages", async (req, res) => {
  const { id } = req.params;
  const messages = await prisma.message.findMany({
    where: { conversationId: id },
    orderBy: { createdAt: "asc" }
  });

  res.json(messages);
});

app.post("/api/chat", async (req, res) => {
  const { message, conversationId, counselMode } = req.body;

  if (!message) {
    res.status(400).json({ error: "Message is required." });
    return;
  }

  const activeConversation = conversationId
    ? await prisma.conversation.findUnique({ where: { id: conversationId } })
    : await prisma.conversation.create({ data: { title: message.slice(0, 40) } });

  const conversation = activeConversation || (await prisma.conversation.create({ data: { title: message.slice(0, 40) } }));

  await prisma.message.create({
    data: {
      conversationId: conversation.id,
      role: "user",
      content: message
    }
  });

  const history = await prisma.message.findMany({
    where: { conversationId: conversation.id },
    orderBy: { createdAt: "asc" }
  });

  const response = await openai.responses.create({
    model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
    input: [
      { role: "system", content: buildSystemPrompt(Boolean(counselMode)) },
      ...history.map((item) => ({ role: item.role, content: item.content }))
    ]
  });

  const assistantMessage = response.output_text || "";

  await prisma.message.create({
    data: {
      conversationId: conversation.id,
      role: "assistant",
      content: assistantMessage
    }
  });

  res.json({
    conversationId: conversation.id,
    message: assistantMessage
  });
});

app.get("/api/journal", async (_req, res) => {
  const entries = await prisma.journalEntry.findMany({
    orderBy: { createdAt: "desc" }
  });

  res.json(entries);
});

app.post("/api/journal", async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    res.status(400).json({ error: "Title and content are required." });
    return;
  }

  const entry = await prisma.journalEntry.create({
    data: { title, content }
  });

  res.status(201).json(entry);
});

app.listen(PORT, () => {
  console.log(`ADONAI.AI backend running on port ${PORT}`);
});
