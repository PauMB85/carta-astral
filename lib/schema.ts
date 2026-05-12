import { z } from "zod";

const readingSectionSchema = z.object({
  title: z.string().describe("Título corto y evocador de la sección"),
  content: z.string().describe("Contenido detallado de 2-4 frases"),
});

export const readingSchema = z.object({
  status: z
    .enum(["ok", "needs_more_data", "error"])
    .describe("Estado de la lectura"),
  summary: z
    .string()
    .optional()
    .describe("Resumen breve. Solo si status='ok'"),
  highlights: z
    .array(z.string())
    .optional()
    .describe("3-5 ideas clave en frases cortas. Solo si status='ok'"),
  sections: z
    .array(readingSectionSchema)
    .optional()
    .describe("Secciones temáticas detalladas (3-5). Solo si status='ok'"),
  actionable_tips: z
    .array(z.string())
    .optional()
    .describe("Consejos prácticos (2-4). Solo si status='ok'"),
  disclaimer: z
    .string()
    .optional()
    .describe("Aviso de autoexploración. Solo si status='ok'"),
  missing: z
    .array(z.string())
    .optional()
    .describe("Datos que faltan. Solo si status='needs_more_data'"),
  message: z
    .string()
    .optional()
    .describe(
      "Mensaje al usuario. Para status='needs_more_data' o status='error'",
    ),
});

export type Reading = z.infer<typeof readingSchema>;

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
  lang: z.enum(["es", "en"]).default("es"),
});

export type BirthInput = z.infer<typeof birthInputSchema>;
export type Lang = BirthInput["lang"];
