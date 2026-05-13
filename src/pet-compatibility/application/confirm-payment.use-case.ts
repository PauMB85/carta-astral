import type { PaymentPort } from "@pet/application/ports/payment.port";
import type { PetOrderRepository } from "@pet/application/ports/pet-order-repository.port";

export function makeConfirmPayment(deps: {
  payment: PaymentPort;
  repo: PetOrderRepository;
}) {
  return async function confirmPayment(
    rawBody: string,
    signature: string,
  ): Promise<Response> {
    let event;
    try {
      event = deps.payment.verifyWebhook(rawBody, signature);
    } catch {
      return new Response("Invalid signature", { status: 400 });
    }

    if (event && event.paymentStatus === "paid" && event.paymentIntentId) {
      await deps.repo.markPaid(event.sessionId, event.paymentIntentId);
    }

    return new Response(null, { status: 200 });
  };
}
