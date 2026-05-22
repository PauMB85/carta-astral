"use client";

import { useRef, useState, type SubmitEvent } from "react";
import Link from "next/link";
import type { Dictionary } from "@/lib/i18n";
import type { Lang } from "@shared/domain/lang";
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
} from "@/components/pet-form-fields";

const INPUT_CLASSES =
  "w-full bg-transparent border-0 border-b border-gold-faint-35 text-cream font-body italic text-[22px] py-2.5 outline-none [color-scheme:dark] focus:border-gold-bright placeholder:text-cream/25 placeholder:italic";

type Props = {
  lang: Lang;
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

export function PetForm({ lang, t, submitError, onSubmit }: Props) {
  const [name, setName] = useState("");
  const [type, setType] = useState<PetType | null>(null);
  const [birthDate, setBirthDate] = useState("");
  const [adoptionDate, setAdoptionDate] = useState("");
  const [gender, setGender] = useState<GenderKey | null>(null);
  const [personality, setPersonality] = useState<PersonalityKey[]>([]);
  const [focus, setFocus] = useState<FocusKey | null>(null);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
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

    if (!acceptedTerms) {
      setLocalError(t.form.errorTerms);
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
      <Header t={t.form} />

      <div className="flex flex-col">
        <Section num="I" label={t.form.sectionName}>
          <input
            type="text"
            className={INPUT_CLASSES}
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
                className={INPUT_CLASSES}
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
                className={INPUT_CLASSES}
                value={adoptionDate}
                onChange={(e) => {
                  setAdoptionDate(e.target.value);
                  setShowDatesError(false);
                }}
              />
            </SubField>
          </div>
          <p className="font-body italic text-sm mt-3 leading-relaxed text-dim">
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
          <p className="font-display mt-4 m-0 text-gold text-[10px] tracking-[0.25em] font-medium">
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

      <TermsCheckbox
        lang={lang}
        t={t.form.terms}
        checked={acceptedTerms}
        onToggle={() => {
          setAcceptedTerms((prev) => !prev);
          setLocalError(null);
        }}
      />

      {displayError ? (
        <div className="mt-6">
          <InlineError message={displayError} />
        </div>
      ) : null}

      <PriceBlessing t={t.premium} />

      <button
        type="submit"
        className="group font-display mt-6 w-full flex items-center justify-center gap-3 border-0 cursor-pointer bg-gold-bright text-dark px-8 py-4.5 min-h-13.5 text-[11px] tracking-[0.25em] font-medium transition-colors duration-250 motion-reduce:transition-none hover:bg-cream"
      >
        <span>{t.form.submit}</span>
        <span
          aria-hidden="true"
          className="inline-block transition-transform duration-250 motion-reduce:transition-none group-hover:translate-x-1"
        >
          →
        </span>
      </button>
    </form>
  );
}

function PriceBlessing({ t }: { t: Dictionary["pet"]["premium"] }) {
  return (
    <div className="font-display mt-9 py-4 border-t border-b border-gold-faint-15">
      <div className="text-center mb-2.5 text-gold text-[10px] tracking-[0.45em] font-medium">
        {t.priceBlessing}
      </div>
      <div className="flex justify-between items-center text-[12px] tracking-[0.3em] text-gold-bright">
        <span>{t.priceLabel}</span>
        <span className="text-base">
          <span className="line-through mr-3 text-cream/45">
            {t.priceOriginal}
          </span>
          {t.priceFinal}
        </span>
      </div>
    </div>
  );
}

function Header({ t }: { t: Dictionary["pet"]["form"] }) {
  return (
    <header className="text-center mb-10">
      <p className="font-display m-0 text-gold text-[11px] tracking-[0.45em] font-medium">
        {t.eyebrow}
      </p>
      <h1 className="font-body italic mt-4 m-0 text-4xl sm:text-5xl font-normal leading-tight text-cream">
        {t.title}
      </h1>
      <p className="font-body italic mt-3 m-0 text-base sm:text-lg text-dim">
        {t.sub}
      </p>
    </header>
  );
}

function TermsCheckbox({
  lang,
  t,
  checked,
  onToggle,
}: {
  lang: Lang;
  t: Dictionary["pet"]["form"]["terms"];
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <label className="flex items-start gap-3 mt-8 cursor-pointer text-cream">
      <input
        type="checkbox"
        checked={checked}
        onChange={onToggle}
        aria-required="true"
        className="appearance-none w-5 h-5 mt-1 shrink-0 cursor-pointer relative border border-gold-faint-35 bg-transparent transition-colors motion-reduce:transition-none hover:border-gold checked:bg-gold-bright checked:border-gold-bright after:content-[''] after:absolute after:left-1.5 after:top-px after:w-1.25 after:h-2.75 after:border-r-2 after:border-b-2 after:border-dark after:rotate-45 after:hidden checked:after:block"
      />
      <span className="font-body italic text-sm sm:text-base leading-relaxed">
        {t.prefix}
        <Link
          href={`/legal/terminos?lang=${lang}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="underline underline-offset-[3px] not-italic text-gold-bright transition-colors motion-reduce:transition-none hover:text-cream"
        >
          {t.termsLabel}
        </Link>
        {t.conjunction}
        <Link
          href={`/legal/privacidad?lang=${lang}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="underline underline-offset-[3px] not-italic text-gold-bright transition-colors motion-reduce:transition-none hover:text-cream"
        >
          {t.privacyLabel}
        </Link>
        {t.acceptanceEnd} <span className="text-dim">{t.withdrawal}</span>
      </span>
    </label>
  );
}
