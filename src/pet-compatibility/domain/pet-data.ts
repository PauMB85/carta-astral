import { z } from "zod";

const optionalIsoDate = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Formato de fecha inválido (YYYY-MM-DD)")
  .optional();

export const petDataSchema = z
  .object({
    name: z.string().trim().min(1).max(40),
    type: z.enum(["dog", "cat"]),
    birthDate: optionalIsoDate,
    adoptionDate: optionalIsoDate,
    gender: z.enum(["male", "female", "unknown"]).default("unknown"),
    personality: z
      .array(
        z.enum([
          "playful",
          "calm",
          "protective",
          "independent",
          "affectionate",
          "fearful",
          "curious",
          "social",
          "territorial",
          "sensitive",
          "mischievous",
          "attached",
        ]),
      )
      .max(5),
    relationshipFocus: z.enum([
      "bond",
      "behavior",
      "emotional_support",
      "daily_life",
    ]),
  })
  .superRefine((data, ctx) => {
    if (!data.birthDate && !data.adoptionDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["birthDate"],
        message: "Debes indicar fecha de nacimiento o adopción.",
      });
    }
  });

export type PetData = z.infer<typeof petDataSchema>;
