import { anthropic } from "@ai-sdk/anthropic";
import { streamText, Output } from "ai";
import { SYSTEM_PROMPT, buildUserPrompt } from "@/lib/prompt";
import { birthInputSchema, readingSchema } from "@/lib/schema";

export const maxDuration = 30;

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = birthInputSchema.safeParse(body);

  if (!parsed.success) {
    return new Response(
      JSON.stringify({
        error: "Datos inválidos. Necesitamos al menos una fecha de nacimiento.",
      }),
      { status: 400, headers: { "Content-Type": "application/json" } },
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
