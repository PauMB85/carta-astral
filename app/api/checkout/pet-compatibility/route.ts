import { z } from "zod";
import { createPetCheckout } from "@pet/infrastructure/composition";
import { petDataSchema } from "@pet/domain/pet-data";
import { natalInputSchema } from "@natal/domain/natal-input";
import { readingSchema } from "@natal/domain/reading";
import { langSchema } from "@shared/domain/lang";
import { getClientIp } from "@shared/infrastructure/http/ip";
import { validationFailedResponse } from "@shared/infrastructure/http/responses";

const bodySchema = z.object({
  petData: petDataSchema,
  natalInput: natalInputSchema,
  reading: readingSchema,
  lang: langSchema,
});

const MAX_BODY_BYTES = 16 * 1024;

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
    return validationFailedResponse(
      parsed.error,
      "Datos inválidos en el formulario de mascota.",
    );
  }

  return createPetCheckout(parsed.data, getClientIp(req));
}
