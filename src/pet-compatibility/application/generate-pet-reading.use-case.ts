import type { LLMStreamPort } from "@shared/application/ports/llm-stream.port";
import type { PaymentPort } from "@pet/application/ports/payment.port";
import type { PetOrderRepository } from "@pet/application/ports/pet-order-repository.port";
import { petReadingSchema } from "@pet/domain/pet-reading";
import { PET_SYSTEM_PROMPT } from "@pet/domain/prompts/system";
import { buildPetUserPrompt } from "@pet/domain/prompts/user";

export function makeGeneratePetReading(deps: {
  llm: LLMStreamPort;
  payment: PaymentPort;
  repo: PetOrderRepository;
}) {
  return async function generatePetReading(
    sessionId: string,
  ): Promise<Response> {
    const order = await deps.repo.get(sessionId);
    if (!order) {
      return Response.json({ error: "session_not_found" }, { status: 404 });
    }

    const stripeStatus = await deps.payment.getCheckoutStatus(sessionId);
    if (!stripeStatus || stripeStatus.paymentStatus !== "paid") {
      return Response.json({ error: "payment_required" }, { status: 402 });
    }

    if (order.consumed && order.generatedReading) {
      return new Response(JSON.stringify(order.generatedReading), {
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      });
    }

    return deps.llm.streamObject({
      system: PET_SYSTEM_PROMPT,
      prompt: buildPetUserPrompt({
        natalInput: order.natalInput,
        reading: order.reading,
        petData: order.petData,
        lang: order.lang,
      }),
      schema: petReadingSchema,
      onFinish: async ({ object }) => {
        await deps.repo.consume(sessionId, object);
      },
    });
  };
}
