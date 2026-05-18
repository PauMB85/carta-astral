import "server-only";
import type { NatalInput } from "@natal/domain/natal-input";
import {
  formatBirthDate,
  formatPlace,
  formatTime,
} from "@natal/domain/format";

const INTEREST_LABELS = {
  amor: "Love and romantic relationships",
  general: "Life in general",
} as const;

export function buildUserPrompt(data: NatalInput): string {
  const formattedDate = formatBirthDate(data.fecha);
  const formattedTime = formatTime(data.hora ?? "");
  const formattedPlace = formatPlace(data.lugar ?? "");
  const interest = INTEREST_LABELS[data.interest];

  return [
    `Response language: ${data.lang}`,
    "",
    "Provided data:",
    `- Name: ${data.nombre || "Not specified"}`,
    `- Date of birth: ${formattedDate || "Not specified"}`,
    `- Time of birth: ${formattedTime || "Not specified"}`,
    `- Place of birth: ${formattedPlace || "Not specified"}`,
    `- Primary interest: ${interest}`,
  ].join("\n");
}
