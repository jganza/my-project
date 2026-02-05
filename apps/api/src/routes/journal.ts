import type { FastifyInstance } from "fastify";
import { requireAuth } from "../lib/auth";

export async function journalRoutes(app: FastifyInstance) {
  app.post("/journal", async (request) => {
    const auth = await requireAuth(request, app.prisma);
    const body = request.body as { title: string; content: string };

    return app.prisma.journalEntry.create({
      data: {
        user_id: auth.userId,
        title: body.title,
        content: body.content
      }
    });
  });

  app.get("/journal", async (request) => {
    const auth = await requireAuth(request, app.prisma);
    return app.prisma.journalEntry.findMany({
      where: { user_id: auth.userId },
      orderBy: { created_at: "desc" }
    });
  });
}
