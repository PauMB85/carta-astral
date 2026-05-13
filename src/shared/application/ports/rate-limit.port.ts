export interface RateLimitResult {
  ok: boolean;
  limit: number;
  remaining: number;
  reset: number;
  retryAfter: number;
}

export interface RateLimitPort {
  check(identifier: string): Promise<RateLimitResult>;
}
