import { z } from "zod";

const petHighlightSchema = z.object({
  title: z.string().describe("Título corto y evocador del momento clave"),
  content: z.string().describe("Cuerpo del momento, 1-3 frases"),
});

const petSectionSchema = z.object({
  title: z.string().describe("Título de la sección narrativa"),
  content: z.string().describe("Cuerpo de la sección, 2-4 frases"),
});

const compatibilityScoreSchema = z.object({
  label: z
    .string()
    .describe(
      "Etiqueta cualitativa breve en el idioma de respuesta, p. ej. 'VÍNCULO PROFUNDO'",
    ),
  value: z
    .number()
    .min(0)
    .max(100)
    .describe("Puntuación entre 0 y 100"),
  explanation: z
    .string()
    .describe("Una frase poética que justifica la puntuación"),
});

const ritualSchema = z.object({
  title: z.string().describe("Título del ritual o actividad"),
  description: z.string().describe("Párrafo introductorio del ritual"),
  steps: z
    .array(z.string())
    .optional()
    .describe("Pasos ordenados, típicamente 3"),
});

export const petReadingSchema = z.object({
  status: z.enum(["ok", "error"]).describe("Estado de la lectura"),
  title: z
    .string()
    .optional()
    .describe("Título principal de la lectura. Solo si status='ok'"),
  summary: z
    .string()
    .optional()
    .describe("Párrafo breve que enmarca la lectura. Solo si status='ok'"),
  compatibility_score: compatibilityScoreSchema
    .optional()
    .describe("Bloque de puntuación. Solo si status='ok'"),
  highlights: z
    .array(petHighlightSchema)
    .optional()
    .describe("3 momentos clave del vínculo. Solo si status='ok'"),
  sections: z
    .array(petSectionSchema)
    .optional()
    .describe("2-3 secciones narrativas. Solo si status='ok'"),
  ritual_or_activity: ritualSchema
    .optional()
    .describe("Ritual o actividad propuesta. Solo si status='ok'"),
  actionable_tips: z
    .array(z.string())
    .optional()
    .describe("2-4 consejos accionables. Solo si status='ok'"),
  disclaimer: z
    .string()
    .optional()
    .describe("Aviso simbólico. Solo si status='ok'"),
  message: z
    .string()
    .optional()
    .describe("Mensaje al usuario. Solo si status='error'"),
});

export type PetReading = z.infer<typeof petReadingSchema>;
