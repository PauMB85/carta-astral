import { z } from "zod";
import { langSchema } from "@shared/domain/lang";
import { natalInputSchema } from "@natal/domain/natal-input";
import { readingSchema } from "@natal/domain/reading";
import { petDataSchema } from "@pet/domain/pet-data";
import { petReadingSchema } from "@pet/domain/pet-reading";

export const petOrderSchema = z.object({
  sessionId: z.string(),
  paymentStatus: z.enum(["pending", "paid"]),
  paymentIntentId: z.string().optional(),
  consumed: z.boolean(),
  petData: petDataSchema,
  natalInput: natalInputSchema,
  reading: readingSchema,
  lang: langSchema,
  generatedReading: petReadingSchema.optional(),
  createdAt: z.number(),
});

export type PetOrder = z.infer<typeof petOrderSchema>;
