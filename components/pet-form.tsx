"use client";

import { useRef, useState, type SubmitEvent } from "react";
import type { Dictionary } from "@/lib/i18n";
import { v1 } from "@/lib/theme";
import { petDataSchema, type PetData } from "@pet/domain/pet-data";
import { DogIcon, CatIcon } from "@/components/pet-icons";
import {
  Section,
  SubField,
  TypeCard,
  GenderCard,
  PersonalityTag,
  PurposeCard,
  InlineError,
  PetFormStyles,
} from "@/components/pet-form-fields";

type Props = {
  t: Dictionary["pet"];
  submitError: string | null;
  onSubmit: (petData: PetData) => void;
};

type PersonalityKey = PetData["personality"][number];
type FocusKey = PetData["relationshipFocus"];
type GenderKey = PetData["gender"];
type PetType = PetData["type"];

const PERSONALITY_KEYS: readonly PersonalityKey[] = [
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
];

const FOCUS_KEYS: readonly FocusKey[] = [
  "bond",
  "behavior",
  "emotional_support",
  "daily_life",
];

const GENDER_KEYS: readonly GenderKey[] = ["male", "female", "unknown"];

export function PetForm({ t, submitError, onSubmit }: Props) {
  const [name, setName] = useState("");
  const [type, setType] = useState<PetType | null>(null);
  const [birthDate, setBirthDate] = useState("");
  const [adoptionDate, setAdoptionDate] = useState("");
  const [gender, setGender] = useState<GenderKey | null>(null);
  const [personality, setPersonality] = useState<PersonalityKey[]>([]);
  const [focus, setFocus] = useState<FocusKey | null>(null);
  const [showDatesError, setShowDatesError] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const datesRef = useRef<HTMLDivElement>(null);

  const togglePersonality = (key: PersonalityKey) => {
    setPersonality((prev) => {
      if (prev.includes(key)) return prev.filter((k) => k !== key);
      if (prev.length >= 5) return prev;
      return [...prev, key];
    });
  };

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowDatesError(false);
    setLocalError(null);

    if (!birthDate && !adoptionDate) {
      setShowDatesError(true);
      datesRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      return;
    }

    const formData = {
      name: name.trim(),
      type,
      birthDate: birthDate || undefined,
      adoptionDate: adoptionDate || undefined,
      gender: gender ?? "unknown",
      personality,
      relationshipFocus: focus,
    };

    const parsed = petDataSchema.safeParse(formData);
    if (!parsed.success) {
      setLocalError(t.form.errorMissing);
      return;
    }

    onSubmit(parsed.data);
  };

  const displayError = localError ?? submitError;
  const counterText = t.form.personalityCounter.replace(
    "{n}",
    String(personality.length),
  );

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="relative max-w-180 mx-auto px-5 sm:px-10 py-12"
    >
      <PetFormStyles />

      <Header t={t.form} />

      <div className="flex flex-col">
        <Section num="I" label={t.form.sectionName}>
          <input
            type="text"
            className="pet-form-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t.form.namePlaceholder}
            maxLength={40}
            required
          />
        </Section>

        <Section num="II" label={t.form.sectionType}>
          <fieldset>
            <legend className="sr-only">{t.form.sectionType}</legend>
            <div className="grid grid-cols-2 gap-3">
              <TypeCard
                value="dog"
                selected={type === "dog"}
                onSelect={() => setType("dog")}
                label={t.petType.dog}
                sub={t.petTypeSubtitle.dog}
                icon={<DogIcon />}
              />
              <TypeCard
                value="cat"
                selected={type === "cat"}
                onSelect={() => setType("cat")}
                label={t.petType.cat}
                sub={t.petTypeSubtitle.cat}
                icon={<CatIcon />}
              />
            </div>
          </fieldset>
        </Section>

        <Section ref={datesRef} num="III" label={t.form.sectionDates}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <SubField label={t.form.birthDateLabel}>
              <input
                type="date"
                className="pet-form-input"
                value={birthDate}
                onChange={(e) => {
                  setBirthDate(e.target.value);
                  setShowDatesError(false);
                }}
              />
            </SubField>
            <SubField label={t.form.adoptionDateLabel}>
              <input
                type="date"
                className="pet-form-input"
                value={adoptionDate}
                onChange={(e) => {
                  setAdoptionDate(e.target.value);
                  setShowDatesError(false);
                }}
              />
            </SubField>
          </div>
          <p
            className="font-body italic text-sm mt-3 leading-relaxed"
            style={{ color: v1.dim }}
          >
            {t.form.datesMicrocopy}
          </p>
          {showDatesError ? <InlineError message={t.form.datesError} /> : null}
        </Section>

        <Section num="IV" label={t.form.sectionGender}>
          <fieldset>
            <legend className="sr-only">{t.form.sectionGender}</legend>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {GENDER_KEYS.map((g) => (
                <GenderCard
                  key={g}
                  value={g}
                  selected={gender === g}
                  onSelect={() => setGender(g)}
                  label={t.petGender[g]}
                />
              ))}
            </div>
          </fieldset>
        </Section>

        <Section
          num="V"
          label={t.form.sectionPersonality}
          hint={t.form.personalityHint}
        >
          <div
            className="flex flex-wrap gap-2.5"
            role="group"
            aria-label={t.form.sectionPersonality}
          >
            {PERSONALITY_KEYS.map((k) => {
              const isSelected = personality.includes(k);
              const isDisabled = !isSelected && personality.length >= 5;
              return (
                <PersonalityTag
                  key={k}
                  selected={isSelected}
                  disabled={isDisabled}
                  onToggle={() => togglePersonality(k)}
                  label={t.personality[k]}
                />
              );
            })}
          </div>
          <p
            className="font-display mt-4 m-0"
            style={{
              color: v1.gold,
              fontSize: 10,
              letterSpacing: "0.25em",
              fontWeight: 500,
            }}
          >
            {counterText}
          </p>
        </Section>

        <Section num="VI" label={t.form.sectionFocus}>
          <fieldset>
            <legend className="sr-only">{t.form.sectionFocus}</legend>
            <div className="flex flex-col gap-2.5">
              {FOCUS_KEYS.map((f) => (
                <PurposeCard
                  key={f}
                  selected={focus === f}
                  onSelect={() => setFocus(f)}
                  roman={t.focusRoman[f]}
                  label={t.focus[f]}
                />
              ))}
            </div>
          </fieldset>
        </Section>
      </div>

      {displayError ? (
        <div className="mt-9">
          <InlineError message={displayError} />
        </div>
      ) : null}

      <button
        type="submit"
        className="pet-form-submit font-display mt-9 w-full flex items-center justify-center gap-3 border-0 cursor-pointer"
        style={{
          background: v1.goldBright,
          color: v1.dark,
          padding: "18px 32px",
          minHeight: 54,
          fontSize: 11,
          letterSpacing: "0.25em",
          fontWeight: 500,
        }}
      >
        <span>{t.form.submit}</span>
        <span className="pet-form-arrow" aria-hidden="true">
          →
        </span>
      </button>
    </form>
  );
}

function Header({ t }: { t: Dictionary["pet"]["form"] }) {
  return (
    <header className="text-center mb-10">
      <p
        className="font-display m-0"
        style={{
          color: v1.gold,
          fontSize: 11,
          letterSpacing: "0.45em",
          fontWeight: 500,
        }}
      >
        {t.eyebrow}
      </p>
      <h1
        className="font-body italic mt-4 m-0 text-4xl sm:text-5xl font-normal leading-tight"
        style={{ color: v1.cream }}
      >
        {t.title}
      </h1>
      <p
        className="font-body italic mt-3 m-0 text-base sm:text-lg"
        style={{ color: v1.dim }}
      >
        {t.sub}
      </p>
    </header>
  );
}
