import "server-only";
import { after } from "next/server";
import { createAnthropic } from "@ai-sdk/anthropic";
import { streamText, Output } from "ai";
import type { z } from "zod";
import { env } from "@shared/infrastructure/env";
import type { LLMStreamPort } from "@shared/application/ports/llm-stream.port";

const MODEL = "claude-haiku-4-5-20251001";
const MAX_RETRIES = 5;

export function makeAiSdkAnthropicLLM(): LLMStreamPort {
  const anthropic = createAnthropic({ apiKey: env.ANTHROPIC_API_KEY });

  return {
    async streamObject({ system, prompt, schema, onFinish }) {
      const result = streamText({
        model: anthropic(MODEL),
        output: Output.object({ schema }),
        system,
        prompt,
        maxRetries: MAX_RETRIES,
        onError({ error }) {
          console.error("[llm/stream]", error);
        },
      });

      // Pre-await the first chunk so we can return HTTP 503 when the LLM
      // fails before producing any token (e.g. Anthropic 529 Overloaded
      // after exhausting retries). toTextStreamResponse() otherwise
      // silently closes the body and useObject sees an empty stream
      // without firing its error state.
      const iterator = result.textStream[Symbol.asyncIterator]();
      let firstChunk: string;
      try {
        const first = await iterator.next();
        if (first.done) {
          throw new Error("LLM produced empty stream");
        }
        firstChunk = first.value;
      } catch (err) {
        console.error("[llm/stream] no first chunk:", err);
        return Response.json({ error: "llm_unavailable" }, { status: 503 });
      }

      const encoder = new TextEncoder();
      const stream = new ReadableStream<Uint8Array>({
        async start(controller) {
          try {
            controller.enqueue(encoder.encode(firstChunk));
            while (true) {
              const { done, value } = await iterator.next();
              if (done) break;
              controller.enqueue(encoder.encode(value));
            }
            controller.close();
          } catch (err) {
            // Mid-stream failure (rare). Best-effort close — useObject
            // surfaces a partial object or a JSON parse error.
            console.error("[llm/stream] mid-stream error:", err);
            controller.close();
          }
        },
      });

      if (onFinish) {
        after(async () => {
          try {
            const [output, text] = await Promise.all([
              result.output,
              result.text,
            ]);
            await onFinish({
              object: output as z.infer<typeof schema>,
              text,
            });
          } catch (err) {
            console.error("[llm/onFinish]", err);
          }
        });
      }

      return new Response(stream, {
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      });
    },
  };
}
