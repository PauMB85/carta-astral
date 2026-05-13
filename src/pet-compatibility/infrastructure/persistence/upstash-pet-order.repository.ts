import "server-only";
import { Redis } from "@upstash/redis";
import { env } from "@shared/infrastructure/env";
import type { PetOrderRepository } from "@pet/application/ports/pet-order-repository.port";
import { petOrderSchema, type PetOrder } from "@pet/domain/pet-order";

const TTL_SECONDS = 60 * 60 * 24;

export function makeUpstashPetOrderRepository(): PetOrderRepository {
  const prefix = env.NODE_ENV === "production" ? "pet:prod" : "pet:dev";
  const redis = new Redis({
    url: env.UPSTASH_REDIS_REST_URL,
    token: env.UPSTASH_REDIS_REST_TOKEN,
  });
  const key = (sessionId: string) => `${prefix}:order:${sessionId}`;

  async function read(sessionId: string): Promise<PetOrder | null> {
    const raw = await redis.get(key(sessionId));
    if (raw == null) return null;
    const data = typeof raw === "string" ? JSON.parse(raw) : raw;
    const parsed = petOrderSchema.safeParse(data);
    if (!parsed.success) {
      console.error("[pet-order/parse]", parsed.error);
      return null;
    }
    return parsed.data;
  }

  async function write(order: PetOrder): Promise<void> {
    await redis.set(key(order.sessionId), JSON.stringify(order), {
      ex: TTL_SECONDS,
    });
  }

  return {
    async create(order) {
      await write(order);
    },

    async get(sessionId) {
      return read(sessionId);
    },

    async markPaid(sessionId, paymentIntentId) {
      const order = await read(sessionId);
      if (!order || order.paymentStatus === "paid") return;
      await write({ ...order, paymentStatus: "paid", paymentIntentId });
    },

    async consume(sessionId, generatedReading) {
      const order = await read(sessionId);
      if (!order || order.consumed) return;
      await write({ ...order, consumed: true, generatedReading });
    },
  };
}
