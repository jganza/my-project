import Fastify from "fastify";
import cors from "@fastify/cors";
import rateLimit from "@fastify/rate-limit";
import { PrismaClient } from "@prisma/client";
import { chatRoutes } from "./routes/chat";
import { conversationRoutes } from "./routes/conversations";
import { journalRoutes } from "./routes/journal";
import { savedScriptureRoutes } from "./routes/saved-scripture";
import { scriptureRoutes } from "./routes/scripture";

export async function createApp(options?: { prisma?: PrismaClient }) {
  const prisma = options?.prisma ?? new PrismaClient();

  const app = Fastify({
    logger: {
      transport: {
        target: "pino-pretty",
        options: { translateTime: "SYS:standard" }
      }
    }
  });

  await app.register(cors, {
    origin: true,
    credentials: true
  });

  await app.register(rateLimit, {
    max: 60,
    timeWindow: "1 minute",
    keyGenerator: (request) => request.headers.authorization ?? request.ip
  });

  app.decorate("prisma", prisma);

  await app.register(chatRoutes, { prefix: "/v1" });
  await app.register(conversationRoutes, { prefix: "/v1" });
  await app.register(journalRoutes, { prefix: "/v1" });
  await app.register(savedScriptureRoutes, { prefix: "/v1" });
  await app.register(scriptureRoutes, { prefix: "/v1" });

  return app;
}
