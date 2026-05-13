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
