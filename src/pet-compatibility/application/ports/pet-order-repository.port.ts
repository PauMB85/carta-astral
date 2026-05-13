import type { PetOrder } from "@pet/domain/pet-order";
import type { PetReading } from "@pet/domain/pet-reading";

export interface PetOrderRepository {
  create(order: PetOrder): Promise<void>;
  get(sessionId: string): Promise<PetOrder | null>;
  markPaid(sessionId: string, paymentIntentId: string): Promise<void>;
  consume(sessionId: string, generatedReading: PetReading): Promise<void>;
}
