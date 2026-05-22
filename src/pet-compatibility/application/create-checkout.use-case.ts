import type { Lang } from "@shared/domain/lang";
import type { NatalInput } from "@natal/domain/natal-input";
import type { Reading } from "@natal/domain/reading";
import type { PetData } from "@pet/domain/pet-data";
import type { PetOrder } from "@pet/domain/pet-order";
import type { PaymentPort } from "@pet/application/ports/payment.port";
import type { PetOrderRepository } from "@pet/application/ports/pet-order-repository.port";
import type { RateLimitPort } from "@shared/application/ports/rate-limit.port";
import { rateLimitedResponse } from "@shared/infrastructure/http/responses";

export function makeCreatePetCheckout(deps: {
  payment: PaymentPort;
  repo: PetOrderRepository;
  rateLimit: RateLimitPort;
  config: { priceId: string; couponId: string; appUrl: string };
}) {
  return async function createPetCheckout(
    input: {
      petData: PetData;
      natalInput: NatalInput;
      reading: Reading;
      lang: Lang;
    },
    ip: string,
  ): Promise<Response> {
    const rl = await deps.rateLimit.check(ip);
    if (!rl.ok) return rateLimitedResponse(rl);

    const successUrl = `${deps.config.appUrl}/pet-compatibility/success?session_id={CHECKOUT_SESSION_ID}&lang=${input.lang}`;
    const cancelUrl = `${deps.config.appUrl}/pet-compatibility?lang=${input.lang}`;

    const { sessionId, url } = await deps.payment.createCheckoutSession({
      priceId: deps.config.priceId,
      couponId: deps.config.couponId,
      successUrl,
      cancelUrl,
    });

    const order: PetOrder = {
      sessionId,
      paymentStatus: "pending",
      consumed: false,
      petData: input.petData,
      natalInput: input.natalInput,
      reading: input.reading,
      lang: input.lang,
      createdAt: Date.now(),
    };

    await deps.repo.create(order);

    return Response.json({ url });
  };
}
