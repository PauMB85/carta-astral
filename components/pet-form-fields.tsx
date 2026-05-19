import type { ReactNode, Ref } from "react";
import type { PetData } from "@pet/domain/pet-data";

type PetType = PetData["type"];
type GenderKey = PetData["gender"];

const CARD_BASE =
  "cursor-pointer transition-all duration-200 motion-reduce:transition-none hover:border-gold-faint-35";
const CARD_SELECTED =
  "border border-gold-bright bg-gold-bright/8 shadow-[0_0_18px_var(--color-gold-glow)]";
const CARD_UNSELECTED = "border border-gold-faint-25 bg-ink/50";

export function Section({
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
    <div
      ref={ref}
      className="
        py-7 border-t border-gold-faint-15
        first-of-type:border-t-gold-faint-25
        last-of-type:border-b last-of-type:border-b-gold-faint-25
      "
    >
      <div className="font-display mb-2 text-gold text-[10px] tracking-[0.3em] font-medium">
        {num}
      </div>
      <div className="font-display mb-4 text-cream text-[11px] tracking-[0.22em] font-medium">
        {label}
        {hint ? (
          <span className="font-body italic ml-3 text-dim text-[13px] tracking-normal normal-case">
            {hint}
          </span>
        ) : null}
      </div>
      {children}
    </div>
  );
}

export function SubField({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div>
      <div className="font-display mb-2 text-cream text-[10px] tracking-[0.22em] font-medium">
        {label}
      </div>
      {children}
    </div>
  );
}

export function TypeCard({
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
      className={`${CARD_BASE} ${selected ? CARD_SELECTED : CARD_UNSELECTED} flex flex-col items-center justify-center gap-2.5 text-center px-4.5 py-5.5 min-h-27.5`}
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
      <span className="font-body italic text-cream text-[19px]">{label}</span>
      <span className="font-display text-gold text-[9px] tracking-[0.3em] font-medium">
        {sub}
      </span>
    </label>
  );
}

export function GenderCard({
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
      className={`${CARD_BASE} ${selected ? CARD_SELECTED : CARD_UNSELECTED} flex items-center justify-center px-5 py-4 min-h-17.5`}
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
      <span className="font-body italic text-cream text-[18px]">{label}</span>
    </label>
  );
}

export function PersonalityTag({
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
      className={`font-body italic px-4.5 py-2.25 text-base transition-colors duration-150 motion-reduce:transition-none ${selected ? "border border-gold bg-gold/6 text-gold-bright" : "border border-gold-faint-25 bg-transparent text-dim"} ${disabled ? "opacity-35 cursor-not-allowed" : "cursor-pointer"}`}
    >
      {label}
    </button>
  );
}

export function PurposeCard({
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
      className={`flex items-center text-left cursor-pointer px-5.5 py-4 gap-4 transition-colors motion-reduce:transition-none hover:border-gold-faint-35 ${selected ? "border border-gold-bright bg-gold-bright/6" : "border border-gold-faint-25 bg-transparent"}`}
    >
      <span
        className={`font-display text-[11px] tracking-[0.3em] font-medium min-w-7.5 ${selected ? "text-gold-bright" : "text-gold"}`}
      >
        {roman}
      </span>
      <span className="font-body italic text-cream text-[19px]">{label}</span>
    </button>
  );
}

export function InlineError({ message }: { message: string }) {
  return (
    <div
      role="alert"
      className="mt-4 px-5 py-3.5 flex gap-3 items-start bg-err-bg border border-err-bd"
    >
      <span
        className="font-display shrink-0 text-err-ink text-[13px] tracking-widest pt-0.75"
        aria-hidden="true"
      >
        ·
      </span>
      <span className="font-body italic leading-relaxed text-err-ink text-[15px]">
        {message}
      </span>
    </div>
  );
}
