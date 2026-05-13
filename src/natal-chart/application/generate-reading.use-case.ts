import type { LLMStreamPort } from "@shared/application/ports/llm-stream.port";
import type { RateLimitPort } from "@shared/application/ports/rate-limit.port";
import { rateLimitedResponse } from "@shared/infrastructure/http/responses";
import { readingSchema } from "@natal/domain/reading";
import type { BirthInput } from "@natal/domain/birth-input";
import { SYSTEM_PROMPT } from "@natal/domain/prompts/system";
import { buildUserPrompt } from "@natal/domain/prompts/user";

export function makeGenerateReading(deps: {
  llm: LLMStreamPort;
  rateLimit: RateLimitPort;
}) {
  return async function generateReading(
    input: BirthInput,
    ip: string,
  ): Promise<Response> {
    const rl = await deps.rateLimit.check(ip);
    if (!rl.ok) return rateLimitedResponse(rl);

    return deps.llm.streamObject({
      system: SYSTEM_PROMPT,
      prompt: buildUserPrompt(input),
      schema: readingSchema,
    });
  };
}
