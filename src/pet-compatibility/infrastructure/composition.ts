import "server-only";
import { llm, rateLimit } from "@shared/infrastructure/composition";
import { petEnv } from "@pet/infrastructure/env";
import { makeStripeAdapter } from "@pet/infrastructure/payment/stripe.adapter";
import { makeUpstashPetOrderRepository } from "@pet/infrastructure/persistence/upstash-pet-order.repository";
import { makeCreatePetCheckout } from "@pet/application/create-checkout.use-case";
import { makeConfirmPayment } from "@pet/application/confirm-payment.use-case";
import { makeGetOrderStatus } from "@pet/application/get-order-status.use-case";
import { makeGeneratePetReading } from "@pet/application/generate-pet-reading.use-case";

const payment = makeStripeAdapter();
const repo = makeUpstashPetOrderRepository();

export const createPetCheckout = makeCreatePetCheckout({
  payment,
  repo,
  rateLimit,
  config: {
    priceId: petEnv.STRIPE_PET_COMPATIBILITY_PRICE_ID,
    appUrl: petEnv.NEXT_PUBLIC_APP_URL,
  },
});

export const confirmPayment = makeConfirmPayment({ payment, repo });

export const getOrderStatus = makeGetOrderStatus({ payment });

export const generatePetReading = makeGeneratePetReading({
  llm,
  payment,
  repo,
});
