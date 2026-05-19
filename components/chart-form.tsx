"use client";

import { useState, type ReactNode, type SubmitEvent } from "react";
import type { Dictionary } from "@/lib/i18n";

const INPUT_CLASSES =
  "w-full bg-transparent border-0 border-b border-gold-faint-35 text-cream font-body italic text-[22px] pt-2 pb-2.5 outline-none [color-scheme:dark] placeholder:text-cream/35 placeholder:italic focus:border-gold-bright [&::-webkit-calendar-picker-indicator]:invert-[0.85] [&::-webkit-calendar-picker-indicator]:sepia [&::-webkit-calendar-picker-indicator]:saturate-[5] [&::-webkit-calendar-picker-indicator]:hue-rotate-[5deg] [&::-webkit-calendar-picker-indicator]:opacity-70 [&::-webkit-calendar-picker-indicator]:cursor-pointer";

type ConsultFormProps = {
  t: Dictionary["form"];
  isLoading: boolean;
  onSubmit: (event: SubmitEvent<HTMLFormElement>) => void;
};

export function ConsultForm({ t, isLoading, onSubmit }: ConsultFormProps) {
  const [interest, setInterest] = useState<"amor" | "general">("general");

  return (
    <form noValidate onSubmit={onSubmit} aria-busy={isLoading}>
      <div className="text-center mb-12">
        <div className="font-display mb-4 text-gold text-xs tracking-[0.4em] font-medium">
          {t.eyebrow}
        </div>
        <h2 className="font-body italic m-0 text-4xl sm:text-5xl lg:text-[56px] font-normal text-gold-bright">
          {t.title}
        </h2>
        <p className="font-body italic mt-3 mb-0 text-base sm:text-lg text-cream/65">
          {t.sub}
        </p>
      </div>

      <div className="flex flex-col gap-9">
        <Field roman="I" label={t.name}>
          <input
            name="nombre"
            type="text"
            placeholder={t.namePlaceholder}
            autoComplete="given-name"
            className={INPUT_CLASSES}
          />
        </Field>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-9">
          <Field roman="II" label={t.date}>
            <input name="fecha" type="date" required className={INPUT_CLASSES} />
          </Field>
          <Field roman="III" label={t.time}>
            <input name="hora" type="time" className={INPUT_CLASSES} />
            <div className="font-body italic text-xs mt-1 text-cream/40">
              {t.timeHint}
            </div>
          </Field>
        </div>

        <Field roman="IV" label={t.place}>
          <input
            name="lugar"
            type="text"
            placeholder={t.placePlaceholder}
            autoComplete="address-level2"
            className={INPUT_CLASSES}
          />
        </Field>

        <fieldset>
          <legend className="font-display block mb-4 text-gold text-xs font-medium uppercase tracking-[0.22em]">
            <span className="text-gold-bright mr-1.5">V</span>
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
          className="font-display mt-4 border-0 cursor-pointer py-5.5 px-0 text-xs font-medium uppercase tracking-[0.35em] disabled:opacity-70 disabled:cursor-not-allowed transition-opacity bg-gold-bright text-dark"
        >
          {isLoading ? t.submitting : t.submit}
        </button>

        <div className="text-center font-body italic text-[13px] -mt-2 text-gold/60">
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
      <div className="font-display mb-1 text-gold text-xs font-medium uppercase tracking-[0.22em]">
        <span className="text-gold-bright mr-1.5">{roman}</span>
        <span aria-hidden="true">·</span>{" "}
        {label}
      </div>
      {children}
    </div>
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
        className={`block text-center font-body transition-all px-5 py-6 text-cream ${selected ? "bg-gold/10 border border-gold-bright" : "bg-transparent border border-gold-faint-30"}`}
      >
        <span className="font-display block mb-2 leading-none text-gold-bright text-[22px] font-medium">
          {roman}
        </span>
        <span className="block italic text-lg">{label}</span>
        <span className="font-display block mt-2 uppercase text-gold text-xs font-medium">
          {sub}
        </span>
      </span>
    </label>
  );
}
