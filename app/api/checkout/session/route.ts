import { getOrderStatus } from "@pet/infrastructure/composition";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const sessionId = url.searchParams.get("session_id");
  if (!sessionId) {
    return Response.json({ error: "missing_session_id" }, { status: 400 });
  }
  return getOrderStatus(sessionId);
}
