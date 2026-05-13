import "server-only";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { env } from "@shared/infrastructure/env";
import type { RateLimitPort } from "@shared/application/ports/rate-limit.port";

export function makeUpstashRateLimit(): RateLimitPort {
  const prefix = env.NODE_ENV === "production" ? "carta:prod" : "carta:dev";

  const redis = new Redis({
    url: env.UPSTASH_REDIS_REST_URL,
    token: env.UPSTASH_REDIS_REST_TOKEN,
  });

  const limiter = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, "1 h"),
    analytics: true,
    prefix,
  });

  return {
    async check(identifier) {
      const { success, limit, remaining, reset } =
        await limiter.limit(identifier);
      const retryAfter = Math.max(
        1,
        Math.ceil((reset - Date.now()) / 1000),
      );
      return { ok: success, limit, remaining, reset, retryAfter };
    },
  };
}
