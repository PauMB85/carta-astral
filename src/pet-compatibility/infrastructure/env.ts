import "server-only";
import { z } from "zod";

const schema = z.object({
  STRIPE_SECRET_KEY: z.string().min(1, "STRIPE_SECRET_KEY is required"),
  STRIPE_WEBHOOK_SECRET: z
    .string()
    .min(1, "STRIPE_WEBHOOK_SECRET is required"),
  STRIPE_PET_COMPATIBILITY_PRICE_ID: z
    .string()
    .min(1, "STRIPE_PET_COMPATIBILITY_PRICE_ID is required"),
  NEXT_PUBLIC_APP_URL: z
    .string()
    .url("NEXT_PUBLIC_APP_URL must be a valid URL"),
});

const parsed = schema.safeParse(process.env);

if (!parsed.success) {
  const fields = z.flattenError(parsed.error).fieldErrors;
  const missing = Object.entries(fields)
    .map(([k, v]) => `  - ${k}: ${(v ?? []).join(", ")}`)
    .join("\n");
  throw new Error(
    `Invalid pet-compatibility environment variables:\n${missing}`,
  );
}

export const petEnv = parsed.data;
