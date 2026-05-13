import { z, type ZodError } from "zod";
import type { RateLimitResult } from "@shared/application/ports/rate-limit.port";

export function validationFailedResponse(
  error: ZodError,
  message: string,
): Response {
  return Response.json(
    {
      error: message,
      issues: z.flattenError(error).fieldErrors,
    },
    { status: 400 },
  );
}

export function rateLimitedResponse(rl: RateLimitResult): Response {
  return Response.json(
    {
      error: "rate_limited",
      message:
        "Las estrellas están saturadas en este momento. El cosmos pide unos minutos antes de revelar otra carta.",
      retryAfter: rl.retryAfter,
    },
    {
      status: 429,
      headers: {
        "X-RateLimit-Limit": String(rl.limit),
        "X-RateLimit-Remaining": String(rl.remaining),
        "X-RateLimit-Reset": String(rl.reset),
        "Retry-After": String(rl.retryAfter),
      },
    },
  );
}
