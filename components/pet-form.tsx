"use client";

import {
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
  type Ref,
} from "react";
import type { Dictionary } from "@/lib/i18n";
import { v1 } from "@/lib/theme";
import { petDataSchema, type PetData } from "@pet/domain/pet-data";
import { DogIcon, CatIcon } from "@/components/pet-icons";

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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
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

function Section({
  num,
  label,
  hint,
  children,
  ref,
}: {
  num: string;
  label: string;
  hint?: string;
  children: ReactNode;
  ref?: Ref<HTMLDivElement>;
}) {
  return (
    <div className="pet-form-section" ref={ref}>
      <div
        className="font-display mb-2"
        style={{
          color: v1.gold,
          fontSize: 10,
          letterSpacing: "0.3em",
          fontWeight: 500,
        }}
      >
        {num}
      </div>
      <div
        className="font-display mb-4"
        style={{
          color: v1.cream,
          fontSize: 11,
          letterSpacing: "0.22em",
          fontWeight: 500,
        }}
      >
        {label}
        {hint ? (
          <span
            className="font-body italic ml-3"
            style={{
              color: v1.dim,
              fontSize: 13,
              letterSpacing: 0,
              textTransform: "none",
            }}
          >
            {hint}
          </span>
        ) : null}
      </div>
      {children}
    </div>
  );
}

function SubField({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div>
      <div
        className="font-display mb-2"
        style={{
          color: v1.cream,
          fontSize: 10,
          letterSpacing: "0.22em",
          fontWeight: 500,
        }}
      >
        {label}
      </div>
      {children}
    </div>
  );
}

function TypeCard({
  value,
  selected,
  onSelect,
  label,
  sub,
  icon,
}: {
  value: PetType;
  selected: boolean;
  onSelect: () => void;
  label: string;
  sub: string;
  icon: ReactNode;
}) {
  const id = `pet-type-${value}`;
  return (
    <label
      htmlFor={id}
      className="pet-radio-card cursor-pointer flex flex-col items-center justify-center gap-2.5 text-center"
      style={selected ? selectedCard() : unselectedCard()}
    >
      <input
        id={id}
        type="radio"
        name="petType"
        value={value}
        checked={selected}
        onChange={onSelect}
        className="sr-only"
      />
      {icon}
      <span
        className="font-body italic"
        style={{ color: v1.cream, fontSize: 19 }}
      >
        {label}
      </span>
      <span
        className="font-display"
        style={{
          color: v1.gold,
          fontSize: 9,
          letterSpacing: "0.3em",
          fontWeight: 500,
        }}
      >
        {sub}
      </span>
    </label>
  );
}

function GenderCard({
  value,
  selected,
  onSelect,
  label,
}: {
  value: GenderKey;
  selected: boolean;
  onSelect: () => void;
  label: string;
}) {
  const id = `pet-gender-${value}`;
  return (
    <label
      htmlFor={id}
      className="pet-radio-card cursor-pointer flex items-center justify-center"
      style={{
        ...(selected ? selectedCard() : unselectedCard()),
        minHeight: 70,
        padding: "16px 20px",
      }}
    >
      <input
        id={id}
        type="radio"
        name="petGender"
        value={value}
        checked={selected}
        onChange={onSelect}
        className="sr-only"
      />
      <span
        className="font-body italic"
        style={{ color: v1.cream, fontSize: 18 }}
      >
        {label}
      </span>
    </label>
  );
}

function PersonalityTag({
  selected,
  disabled,
  onToggle,
  label,
}: {
  selected: boolean;
  disabled: boolean;
  onToggle: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onToggle}
      aria-pressed={selected}
      className="font-body italic"
      style={{
        border: `1px solid ${selected ? v1.gold : v1.goldFaint25}`,
        background: selected ? "rgba(201, 165, 90, 0.06)" : "transparent",
        color: selected ? v1.goldBright : v1.dim,
        padding: "9px 18px",
        fontSize: 16,
        opacity: disabled ? 0.35 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "border-color 0.15s, color 0.15s, background 0.15s",
      }}
    >
      {label}
    </button>
  );
}

function PurposeCard({
  selected,
  onSelect,
  roman,
  label,
}: {
  selected: boolean;
  onSelect: () => void;
  roman: string;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className="pet-purpose-card flex items-center text-left cursor-pointer"
      style={{
        background: selected ? "rgba(231, 201, 122, 0.06)" : "transparent",
        border: `1px solid ${selected ? v1.goldBright : v1.goldFaint25}`,
        padding: "16px 22px",
        gap: 16,
      }}
    >
      <span
        className="font-display"
        style={{
          color: selected ? v1.goldBright : v1.gold,
          fontSize: 11,
          letterSpacing: "0.3em",
          fontWeight: 500,
          minWidth: 30,
        }}
      >
        {roman}
      </span>
      <span
        className="font-body italic"
        style={{ color: v1.cream, fontSize: 19 }}
      >
        {label}
      </span>
    </button>
  );
}

function InlineError({ message }: { message: string }) {
  return (
    <div
      role="alert"
      className="mt-4 px-5 py-3.5 flex gap-3 items-start"
      style={{
        background: v1.errBg,
        border: `1px solid ${v1.errBd}`,
      }}
    >
      <span
        className="font-display shrink-0"
        aria-hidden="true"
        style={{
          color: v1.errInk,
          fontSize: 13,
          letterSpacing: "0.1em",
          paddingTop: 3,
        }}
      >
        ·
      </span>
      <span
        className="font-body italic leading-relaxed"
        style={{ color: v1.errInk, fontSize: 15 }}
      >
        {message}
      </span>
    </div>
  );
}

function selectedCard() {
  return {
    background: "rgba(231, 201, 122, 0.08)",
    border: `1px solid ${v1.goldBright}`,
    padding: "22px 18px",
    minHeight: 110,
    boxShadow: `0 0 18px ${v1.goldGlow}`,
    transition: "all 0.2s",
  };
}

function unselectedCard() {
  return {
    background: "rgba(26, 22, 13, 0.5)",
    border: `1px solid ${v1.goldFaint25}`,
    padding: "22px 18px",
    minHeight: 110,
    transition: "all 0.2s",
  };
}

function PetFormStyles() {
  return (
    <style>{`
      .pet-form-section {
        padding: 28px 0;
        border-top: 1px solid ${v1.goldFaint15};
      }
      .pet-form-section:first-of-type {
        border-top-color: ${v1.goldFaint25};
      }
      .pet-form-section:last-of-type {
        border-bottom: 1px solid ${v1.goldFaint25};
      }
      .pet-form-input {
        width: 100%;
        background: transparent;
        border: none;
        border-bottom: 1px solid ${v1.goldFaint35};
        color: ${v1.cream};
        font-family: var(--font-body), serif;
        font-size: 22px;
        padding: 10px 0;
        outline: none;
        font-style: italic;
        color-scheme: dark;
      }
      .pet-form-input:focus { border-bottom-color: ${v1.goldBright}; }
      .pet-form-input::placeholder { color: rgba(245, 236, 214, 0.25); font-style: italic; }
      .pet-radio-card:hover {
        border-color: ${v1.goldFaint35};
      }
      .pet-purpose-card:hover {
        border-color: ${v1.goldFaint35};
      }
      .pet-form-submit { transition: background 0.25s; }
      .pet-form-submit:hover { background: ${v1.cream}; }
      .pet-form-arrow { transition: transform 0.25s; display: inline-block; }
      .pet-form-submit:hover .pet-form-arrow { transform: translateX(4px); }
      @media (prefers-reduced-motion: reduce) {
        .pet-form-submit, .pet-form-arrow { transition: none !important; }
        .pet-form-submit:hover .pet-form-arrow { transform: none !important; }
      }
    `}</style>
  );
}
