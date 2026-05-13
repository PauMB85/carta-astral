import { z } from "zod";
import { langSchema } from "@shared/domain/lang";

const CURRENT_YEAR = new Date().getFullYear();

export const birthInputSchema = z.object({
  nombre: z
    .string()
    .trim()
    .max(80)
    .optional()
    .transform((v) => v || undefined),

  fecha: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Formato de fecha inválido (YYYY-MM-DD)")
    .refine((v) => {
      const d = new Date(`${v}T00:00:00`);
      const year = d.getFullYear();
      return (
        !Number.isNaN(d.getTime()) && year >= 1900 && year <= CURRENT_YEAR
      );
    }, "Fecha fuera de rango (1900–año actual)"),

  hora: z
    .string()
    .regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Formato de hora inválido (HH:MM)")
    .optional(),

  lugar: z
    .string()
    .trim()
    .max(100)
    .optional()
    .transform((v) => v || undefined),

  interest: z.enum(["amor", "general"]),
  lang: langSchema.default("es"),
});

export type BirthInput = z.infer<typeof birthInputSchema>;
