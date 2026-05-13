import type { ReactNode, Ref } from "react";
import type { PetData } from "@pet/domain/pet-data";
import { v1 } from "@/lib/theme";

type PetType = PetData["type"];
type GenderKey = PetData["gender"];

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

export function SubField({
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

export function InlineError({ message }: { message: string }) {
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

export function PetFormStyles() {
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
