import { z } from "zod";
import { generatePetReading } from "@pet/infrastructure/composition";
import { validationFailedResponse } from "@shared/infrastructure/http/responses";

export const maxDuration = 30;

const bodySchema = z.object({
  sessionId: z.string().min(1),
});

const MAX_BODY_BYTES = 512;

export async function POST(req: Request) {
  const contentLength = req.headers.get("content-length");
  if (contentLength && Number(contentLength) > MAX_BODY_BYTES) {
    return Response.json(
      { error: "Payload demasiado grande" },
      { status: 413 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "JSON inválido" }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return validationFailedResponse(parsed.error, "sessionId requerido.");
  }

  return generatePetReading(parsed.data.sessionId);
}
