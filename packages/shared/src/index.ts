import { z } from "zod";

export const chatRequestSchema = z.object({
  conversationId: z.string().optional(),
  message: z.string().min(1),
  mode: z.enum(["counsel", "scripture-first"]).optional(),
  translation: z.string().default("WEB"),
  quoteVerbatim: z.boolean().default(true)
});

export const chatResponseSchema = z.object({
  conversationId: z.string(),
  assistantMessage: z.string(),
  citations: z
    .array(
      z.object({
        reference: z.string(),
        translation: z.string()
      })
    )
    .default([])
});

export type ChatRequest = z.infer<typeof chatRequestSchema>;
export type ChatResponse = z.infer<typeof chatResponseSchema>;

export const scriptureQuerySchema = z.object({
  ref: z.string(),
  translation: z.string().default("WEB")
});
