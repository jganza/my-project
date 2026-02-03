import { jwtVerify } from "jose";
import type { FastifyRequest } from "fastify";
import type { PrismaClient } from "@prisma/client";

export type AuthContext = {
  userId: string;
  supabaseUserId: string;
  email: string;
};

export async function requireAuth(request: FastifyRequest, prisma: PrismaClient): Promise<AuthContext> {
  const authHeader = request.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    throw new Error("Missing auth token");
  }

  const token = authHeader.replace("Bearer ", "");
  const secret = process.env.SUPABASE_JWT_SECRET;
  if (!secret) {
    throw new Error("SUPABASE_JWT_SECRET not configured");
  }

  const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
  const supabaseUserId = String(payload.sub ?? "");
  const email = String(payload.email ?? (payload as { user_metadata?: { email?: string } }).user_metadata?.email ?? "");

  if (!supabaseUserId || !email) {
    throw new Error("Invalid auth token");
  }

  const existing = await prisma.user.findUnique({ where: { supabase_user_id: supabaseUserId } });
  if (existing) {
    return { userId: existing.id, supabaseUserId, email: existing.email };
  }

  const created = await prisma.user.create({
    data: {
      supabase_user_id: supabaseUserId,
      email
    }
  });

  return { userId: created.id, supabaseUserId, email: created.email };
}
