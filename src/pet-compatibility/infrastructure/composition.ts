import "server-only";
import { llm, rateLimit } from "@shared/infrastructure/composition";
import { petEnv } from "@pet/infrastructure/env";
import { makeStripeAdapter } from "@pet/infrastructure/payment/stripe.adapter";
import { makeUpstashPetOrderRepository } from "@pet/infrastructure/persistence/upstash-pet-order.repository";
import { makeCreatePetCheckout } from "@pet/application/create-checkout.use-case";
import { makeConfirmPayment } from "@pet/application/confirm-payment.use-case";
import { makeGetOrderStatus } from "@pet/application/get-order-status.use-case";
import { makeGeneratePetReading } from "@pet/application/generate-pet-reading.use-case";

type Wired = {
  createPetCheckout: ReturnType<typeof makeCreatePetCheckout>;
  confirmPayment: ReturnType<typeof makeConfirmPayment>;
  getOrderStatus: ReturnType<typeof makeGetOrderStatus>;
  generatePetReading: ReturnType<typeof makeGeneratePetReading>;
};

let cached: Wired | null = null;

function wire(): Wired {
  if (cached) return cached;
  const payment = makeStripeAdapter();
  const repo = makeUpstashPetOrderRepository();
  cached = {
    createPetCheckout: makeCreatePetCheckout({
      payment,
      repo,
      rateLimit,
      config: {
        priceId: petEnv.STRIPE_PET_COMPATIBILITY_PRICE_ID,
        appUrl: petEnv.NEXT_PUBLIC_APP_URL,
      },
    }),
    confirmPayment: makeConfirmPayment({ payment, repo }),
    getOrderStatus: makeGetOrderStatus({ payment }),
    generatePetReading: makeGeneratePetReading({ llm, payment, repo }),
  };
  return cached;
}

export const createPetCheckout: Wired["createPetCheckout"] = (...args) =>
  wire().createPetCheckout(...args);

export const confirmPayment: Wired["confirmPayment"] = (...args) =>
  wire().confirmPayment(...args);

export const getOrderStatus: Wired["getOrderStatus"] = (...args) =>
  wire().getOrderStatus(...args);

export const generatePetReading: Wired["generatePetReading"] = (...args) =>
  wire().generatePetReading(...args);
