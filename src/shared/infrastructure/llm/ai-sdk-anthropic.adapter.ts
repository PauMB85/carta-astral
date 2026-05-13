import "server-only";
import { after } from "next/server";
import { createAnthropic } from "@ai-sdk/anthropic";
import { streamText, Output } from "ai";
import type { z } from "zod";
import { env } from "@shared/infrastructure/env";
import type { LLMStreamPort } from "@shared/application/ports/llm-stream.port";

const MODEL = "claude-haiku-4-5-20251001";

export function makeAiSdkAnthropicLLM(): LLMStreamPort {
  const anthropic = createAnthropic({ apiKey: env.ANTHROPIC_API_KEY });

  return {
    streamObject({ system, prompt, schema, onFinish }) {
      const result = streamText({
        model: anthropic(MODEL),
        output: Output.object({ schema }),
        system,
        prompt,
        onError({ error }) {
          console.error("[llm/stream]", error);
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

      return result.toTextStreamResponse();
    },
  };
}
