import "server-only";
import Stripe from "stripe";
import { petEnv } from "@pet/infrastructure/env";
import type {
  CheckoutCompletedEvent,
  CheckoutStatus,
  CreateCheckoutInput,
  CreateCheckoutOutput,
  PaymentPort,
} from "@pet/application/ports/payment.port";

function extractPaymentIntentId(
  paymentIntent: Stripe.Checkout.Session["payment_intent"],
): string | null {
  if (paymentIntent == null) return null;
  return typeof paymentIntent === "string" ? paymentIntent : paymentIntent.id;
}

export function makeStripeAdapter(): PaymentPort {
  const stripe = new Stripe(petEnv.STRIPE_SECRET_KEY);

  return {
    async createCheckoutSession({
      priceId,
      couponId,
      successUrl,
      cancelUrl,
    }: CreateCheckoutInput): Promise<CreateCheckoutOutput> {
      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        line_items: [{ price: priceId, quantity: 1 }],
        discounts: [{ coupon: couponId }],
        success_url: successUrl,
        cancel_url: cancelUrl,
      });
      if (!session.url) {
        throw new Error("Stripe returned a checkout session without a URL");
      }
      return { sessionId: session.id, url: session.url };
    },

    async getCheckoutStatus(sessionId): Promise<CheckoutStatus | null> {
      try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        return {
          sessionId: session.id,
          paymentStatus: session.payment_status,
          paymentIntentId: extractPaymentIntentId(session.payment_intent),
        };
      } catch (err) {
        if (
          err instanceof Stripe.errors.StripeError &&
          err.statusCode === 404
        ) {
          return null;
        }
        throw err;
      }
    },

    verifyWebhook(rawBody, signature): CheckoutCompletedEvent | null {
      const event = stripe.webhooks.constructEvent(
        rawBody,
        signature,
        petEnv.STRIPE_WEBHOOK_SECRET,
      );

      if (event.type !== "checkout.session.completed") return null;

      const session = event.data.object;
      return {
        type: "checkout.completed",
        sessionId: session.id,
        paymentStatus: session.payment_status === "paid" ? "paid" : "unpaid",
        paymentIntentId: extractPaymentIntentId(session.payment_intent),
      };
    },
  };
}
