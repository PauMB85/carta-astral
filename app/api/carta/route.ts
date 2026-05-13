import { anthropic } from "@ai-sdk/anthropic";
import { streamText, Output } from "ai";
import { z } from "zod";
import { SYSTEM_PROMPT } from "@natal/domain/prompts/system";
import { buildUserPrompt } from "@natal/domain/prompts/user";
import { cartaRatelimit, getClientIdentifier } from "@/lib/ratelimit";
import { birthInputSchema } from "@natal/domain/birth-input";
import { readingSchema } from "@natal/domain/reading";

export const maxDuration = 30;

const MAX_BODY_BYTES = 2048;

export async function POST(req: Request) {
  const contentLength = req.headers.get("content-length");
  if (contentLength && Number(contentLength) > MAX_BODY_BYTES) {
    return Response.json(
      { error: "Payload demasiado grande" },
      { status: 413 },
    );
  }

  const identifier = getClientIdentifier(req);
  const { success, limit, remaining, reset } =
    await cartaRatelimit.limit(identifier);

  const headers: Record<string, string> = {
    "X-RateLimit-Limit": String(limit),
    "X-RateLimit-Remaining": String(remaining),
    "X-RateLimit-Reset": String(reset),
  };

  if (!success) {
    const retryAfterSeconds = Math.max(
      1,
      Math.ceil((reset - Date.now()) / 1000),
    );
    return Response.json(
      {
        error: "rate_limited",
        message:
          "Las estrellas están saturadas en este momento. El cosmos pide unos minutos antes de revelar otra carta.",
        retryAfter: retryAfterSeconds,
      },
      {
        status: 429,
        headers: { ...headers, "Retry-After": String(retryAfterSeconds) },
      },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json(
      { error: "JSON inválido" },
      { status: 400, headers },
    );
  }

  const parsed = birthInputSchema.safeParse(body);

  if (!parsed.success) {
    return Response.json(
      {
        error: "Datos inválidos. Necesitamos al menos una fecha de nacimiento.",
        issues: z.flattenError(parsed.error).fieldErrors,
      },
      { status: 400, headers },
    );
  }

  const result = streamText({
    model: anthropic("claude-haiku-4-5-20251001"),
    output: Output.object({ schema: readingSchema }),
    system: SYSTEM_PROMPT,
    prompt: buildUserPrompt(parsed.data),
    onError({ error }) {
      console.error("[carta/stream]", error);
    },
  });

  return result.toTextStreamResponse();
}
