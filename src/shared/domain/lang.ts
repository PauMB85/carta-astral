import { z } from "zod";

export const langSchema = z.enum(["es", "en"]);
export type Lang = z.infer<typeof langSchema>;

export function pickLang(raw: string | undefined): Lang {
  return raw === "en" ? "en" : "es";
}
