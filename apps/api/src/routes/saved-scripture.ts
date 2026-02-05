import type { FastifyInstance } from "fastify";
import { requireAuth } from "../lib/auth";

export async function savedScriptureRoutes(app: FastifyInstance) {
  app.post("/saved-scripture", async (request) => {
    const auth = await requireAuth(request, app.prisma);
    const body = request.body as { reference: string; translation: string; text: string };

    return app.prisma.savedScripture.create({
      data: {
        user_id: auth.userId,
        reference: body.reference,
        translation: body.translation,
        text: body.text
      }
    });
  });

  app.get("/saved-scripture", async (request) => {
    const auth = await requireAuth(request, app.prisma);
    return app.prisma.savedScripture.findMany({
      where: { user_id: auth.userId },
      orderBy: { created_at: "desc" }
    });
  });
}
