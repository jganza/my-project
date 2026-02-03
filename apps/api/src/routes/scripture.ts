import type { FastifyInstance } from "fastify";
import { scriptureQuerySchema } from "@adonai/shared";
import { getScripture } from "../lib/scripture";
import { assertTranslationAllowed } from "../lib/translation";

export async function scriptureRoutes(app: FastifyInstance) {
  app.get("/scripture", async (request) => {
    const query = scriptureQuerySchema.parse(request.query);
    assertTranslationAllowed(query.translation);
    const results = await getScripture(app.prisma, query.ref, query.translation);
    return { results };
  });
}
