export interface CreateCheckoutInput {
  priceId: string;
  couponId: string;
  successUrl: string;
  cancelUrl: string;
}

export interface CreateCheckoutOutput {
  sessionId: string;
  url: string;
}

export interface CheckoutStatus {
  sessionId: string;
  paymentStatus: "paid" | "unpaid" | "no_payment_required";
  paymentIntentId: string | null;
}

export interface CheckoutCompletedEvent {
  type: "checkout.completed";
  sessionId: string;
  paymentStatus: "paid" | "unpaid";
  paymentIntentId: string | null;
}

export interface PaymentPort {
  createCheckoutSession(
    input: CreateCheckoutInput,
  ): Promise<CreateCheckoutOutput>;
  getCheckoutStatus(sessionId: string): Promise<CheckoutStatus | null>;
  verifyWebhook(
    rawBody: string,
    signature: string,
  ): CheckoutCompletedEvent | null;
}
