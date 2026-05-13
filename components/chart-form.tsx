"use client";

import { useState, type ReactNode, type SubmitEvent } from "react";
import type { Dictionary } from "@/lib/i18n";
import { v1 } from "@/lib/theme";

type ConsultFormProps = {
  t: Dictionary["form"];
  isLoading: boolean;
  onSubmit: (event: SubmitEvent<HTMLFormElement>) => void;
};

export function ConsultForm({ t, isLoading, onSubmit }: ConsultFormProps) {
  const [interest, setInterest] = useState<"amor" | "general">("general");

  return (
    <form noValidate onSubmit={onSubmit} aria-busy={isLoading}>
      <FormStyles />

      <div className="text-center mb-12">
        <div
          className="font-display mb-4"
          style={{
            color: v1.gold,
            fontSize: 12,
            letterSpacing: "0.4em",
            fontWeight: 500,
          }}
        >
          {t.eyebrow}
        </div>
        <h2
          className="font-body italic m-0 text-4xl sm:text-5xl lg:text-[56px] font-normal"
          style={{ color: v1.goldBright }}
        >
          {t.title}
        </h2>
        <p
          className="font-body italic mt-3 mb-0 text-base sm:text-lg"
          style={{ color: "rgba(245,236,214,0.65)" }}
        >
          {t.sub}
        </p>
      </div>

      <div className="flex flex-col gap-9">
        <Field roman="I" label={t.name}>
          <V1Input
            name="nombre"
            type="text"
            placeholder={t.namePlaceholder}
            autoComplete="given-name"
          />
        </Field>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-9">
          <Field roman="II" label={t.date}>
            <V1Input name="fecha" type="date" required />
          </Field>
          <Field roman="III" label={t.time}>
            <V1Input name="hora" type="time" />
            <div
              className="font-body italic text-xs mt-1"
              style={{ color: "rgba(245, 236, 214, 0.4)" }}
            >
              {t.timeHint}
            </div>
          </Field>
        </div>

        <Field roman="IV" label={t.place}>
          <V1Input
            name="lugar"
            type="text"
            placeholder={t.placePlaceholder}
            autoComplete="address-level2"
          />
        </Field>

        <fieldset>
          <legend
            className="font-display block mb-4 text-xs font-medium uppercase tracking-[0.22em]"
            style={{ color: v1.gold }}
          >
            <span style={{ color: v1.goldBright, marginRight: 6 }}>V</span>
            <span aria-hidden="true">·</span>
            <span> </span>
            {t.purpose}
          </legend>
          <div
            role="radiogroup"
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <RadioCard
              name="interest"
              value="amor"
              roman="I"
              label={t.love}
              sub={t.loveSub}
              selected={interest === "amor"}
              onSelect={() => setInterest("amor")}
            />
            <RadioCard
              name="interest"
              value="general"
              roman="II"
              label={t.life}
              sub={t.lifeSub}
              selected={interest === "general"}
              onSelect={() => setInterest("general")}
            />
          </div>
        </fieldset>

        <button
          type="submit"
          disabled={isLoading}
          className="font-display mt-4 border-0 cursor-pointer py-5.5 px-0 text-xs font-medium uppercase tracking-[0.35em] disabled:opacity-70 disabled:cursor-not-allowed transition-opacity"
          style={{
            background: v1.goldBright,
            color: v1.dark,
          }}
        >
          {isLoading ? t.submitting : t.submit}
        </button>

        <div
          className="text-center font-body italic"
          style={{
            fontSize: 13,
            color: "rgba(201, 165, 90, 0.6)",
            marginTop: -8,
          }}
        >
          {t.sealed}
        </div>
      </div>
    </form>
  );
}

function Field({
  roman,
  label,
  children,
}: {
  roman: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <div>
      <div
        className="font-display mb-1 text-xs font-medium uppercase tracking-[0.22em]"
        style={{ color: v1.gold }}
      >
        <span style={{ color: v1.goldBright, marginRight: 6 }}>{roman}</span>
        <span aria-hidden="true">·</span>{" "}
        {label}
      </div>
      {children}
    </div>
  );
}

function V1Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="v1-input"
      style={{ colorScheme: "dark", ...props.style }}
    />
  );
}

function RadioCard({
  name,
  value,
  roman,
  label,
  sub,
  selected,
  onSelect,
}: {
  name: string;
  value: string;
  roman: string;
  label: string;
  sub: string;
  selected: boolean;
  onSelect: () => void;
}) {
  const id = `${name}-${value}`;
  return (
    <label
      htmlFor={id}
      aria-label={`${label} — ${sub}`}
      className="cursor-pointer block"
      data-selected={selected}
    >
      <input
        id={id}
        type="radio"
        name={name}
        value={value}
        checked={selected}
        onChange={onSelect}
        className="sr-only peer"
      />
      <span
        className="block text-center font-body transition-all"
        style={{
          background: selected ? "rgba(201, 165, 90, 0.1)" : "transparent",
          border: `1px solid ${selected ? v1.goldBright : v1.goldFaint30}`,
          padding: "24px 20px",
          color: v1.cream,
        }}
      >
        <span
          className="font-display block mb-2 leading-none"
          style={{
            color: v1.goldBright,
            fontSize: 22,
            fontWeight: 500,
          }}
        >
          {roman}
        </span>
        <span className="block italic text-lg">{label}</span>
        <span
          className="font-display block mt-2 uppercase"
          style={{
            color: v1.gold,
            fontSize: 12,
            fontWeight: 500,
          }}
        >
          {sub}
        </span>
      </span>
    </label>
  );
}

function FormStyles() {
  return (
    <style>{`
      .v1-input {
        width: 100%;
        background: transparent;
        border: none;
        border-bottom: 1px solid ${v1.goldFaint35};
        color: ${v1.cream};
        font-family: var(--font-body), serif;
        font-size: 22px;
        padding: 8px 0 10px;
        outline: none;
        font-style: italic;
      }
      .v1-input::placeholder { color: rgba(245, 236, 214, 0.35); font-style: italic; }
      .v1-input:focus { border-bottom-color: ${v1.goldBright}; }
      .v1-input[type="date"]::-webkit-calendar-picker-indicator,
      .v1-input[type="time"]::-webkit-calendar-picker-indicator {
        filter: invert(0.85) sepia(1) saturate(5) hue-rotate(5deg);
        opacity: 0.7;
        cursor: pointer;
      }
    `}</style>
  );
}
