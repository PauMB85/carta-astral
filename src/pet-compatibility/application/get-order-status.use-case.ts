import type { PaymentPort } from "@pet/application/ports/payment.port";

export function makeGetOrderStatus(deps: { payment: PaymentPort }) {
  return async function getOrderStatus(sessionId: string): Promise<Response> {
    const status = await deps.payment.getCheckoutStatus(sessionId);
    if (!status) {
      return Response.json({ error: "session_not_found" }, { status: 404 });
    }
    return Response.json({
      sessionId: status.sessionId,
      paymentStatus: status.paymentStatus,
    });
  };
}
