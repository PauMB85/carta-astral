import "server-only";
import { z } from "zod";

const schema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  ANTHROPIC_API_KEY: z.string().min(1, "ANTHROPIC_API_KEY is required"),
  UPSTASH_REDIS_REST_URL: z.string().url("UPSTASH_REDIS_REST_URL must be a valid URL"),
  UPSTASH_REDIS_REST_TOKEN: z.string().min(1, "UPSTASH_REDIS_REST_TOKEN is required"),
});

const parsed = schema.safeParse(process.env);

if (!parsed.success) {
  const fields = z.flattenError(parsed.error).fieldErrors;
  const missing = Object.entries(fields)
    .map(([k, v]) => `  - ${k}: ${(v ?? []).join(", ")}`)
    .join("\n");
  throw new Error(`Invalid server environment variables:\n${missing}`);
}

export const env = parsed.data;
