import type { FastifyInstance } from "fastify";
import { requireAuth } from "../lib/auth";

export async function conversationRoutes(app: FastifyInstance) {
  app.get("/conversations", async (request) => {
    const auth = await requireAuth(request, app.prisma);
    return app.prisma.conversation.findMany({
      where: { user_id: auth.userId },
      orderBy: { updated_at: "desc" }
    });
  });

  app.get("/conversations/:id", async (request) => {
    const auth = await requireAuth(request, app.prisma);
    const params = request.params as { id: string };

    const conversation = await app.prisma.conversation.findFirst({
      where: { id: params.id, user_id: auth.userId },
      include: { messages: { orderBy: { created_at: "asc" } } }
    });

    if (!conversation) {
      return { error: "Not found" };
    }

    return conversation;
  });
}
