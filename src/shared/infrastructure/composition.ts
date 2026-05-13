import "server-only";
import { makeAiSdkAnthropicLLM } from "@shared/infrastructure/llm/ai-sdk-anthropic.adapter";
import { makeUpstashRateLimit } from "@shared/infrastructure/rate-limit/upstash.adapter";

export const llm = makeAiSdkAnthropicLLM();
export const rateLimit = makeUpstashRateLimit();
