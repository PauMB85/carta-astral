import { generateReading } from "@natal/infrastructure/composition";
import { birthInputSchema } from "@natal/domain/birth-input";
import { getClientIp } from "@shared/infrastructure/http/ip";
import { validationFailedResponse } from "@shared/infrastructure/http/responses";

export const maxDuration = 30;

const MAX_BODY_BYTES = 2048;

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

  const parsed = birthInputSchema.safeParse(body);
  if (!parsed.success) {
    return validationFailedResponse(
      parsed.error,
      "Datos inválidos. Necesitamos al menos una fecha de nacimiento.",
    );
  }

  return generateReading(parsed.data, getClientIp(req));
}
