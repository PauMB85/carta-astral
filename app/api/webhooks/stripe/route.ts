import { confirmPayment } from "@pet/infrastructure/composition";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return new Response("Missing stripe-signature header", { status: 400 });
  }
  const rawBody = await req.text();
  return confirmPayment(rawBody, signature);
}
