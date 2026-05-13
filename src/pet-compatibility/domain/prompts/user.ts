import "server-only";
import type { Lang } from "@shared/domain/lang";
import type { NatalInput } from "@natal/domain/natal-input";
import type { Reading } from "@natal/domain/reading";
import {
  formatBirthDate,
  formatPlace,
  formatTime,
} from "@natal/domain/format";
import type { PetData } from "@pet/domain/pet-data";

const TYPE_LABELS = {
  dog: "Dog",
  cat: "Cat",
} as const;

const GENDER_LABELS = {
  male: "Male",
  female: "Female",
  unknown: "Unknown",
} as const;

const FOCUS_LABELS = {
  bond: "The bond between us",
  behavior: "Their behaviour",
  emotional_support: "Their emotional support",
  daily_life: "Our daily life together",
} as const;

export function buildPetUserPrompt(params: {
  natalInput: NatalInput;
  reading: Reading;
  petData: PetData;
  lang: Lang;
}): string {
  const { natalInput, reading, petData, lang } = params;
  const personality =
    petData.personality.length > 0
      ? petData.personality.join(", ")
      : "Not provided";

  return [
    `Response language: ${lang}`,
    "",
    "Person's natal data:",
    `- Date of birth: ${formatBirthDate(natalInput.fecha) || "Not specified"}`,
    `- Time of birth: ${formatTime(natalInput.hora ?? "") || "Not specified"}`,
    `- Place of birth: ${formatPlace(natalInput.lugar ?? "") || "Not specified"}`,
    `- Primary interest declared on the chart: ${natalInput.interest}`,
    "",
    "Person's natal chart reading (authoritative astrological context — do NOT contradict it, build upon it):",
    JSON.stringify(reading, null, 2),
    "",
    "Pet data:",
    `- Name: ${petData.name}`,
    `- Type: ${TYPE_LABELS[petData.type]}`,
    `- Gender: ${GENDER_LABELS[petData.gender]}`,
    `- Date of birth: ${petData.birthDate ? formatBirthDate(petData.birthDate) : "Not provided"}`,
    `- Date of adoption: ${petData.adoptionDate ? formatBirthDate(petData.adoptionDate) : "Not provided"}`,
    `- Personality traits: ${personality}`,
    `- Relationship focus: ${FOCUS_LABELS[petData.relationshipFocus]}`,
  ].join("\n");
}
