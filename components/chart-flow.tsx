"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type SubmitEvent,
} from "react";
import Image from "next/image";
import { experimental_useObject as useObject } from "@ai-sdk/react";
import type { DeepPartial } from "ai";
import { readingSchema, type Reading } from "@/lib/schema";
import type { BirthInput, Lang } from "@/lib/types";
import type { Dictionary } from "@/lib/i18n";
import { v1 } from "@/lib/theme";

type Props = {
  lang: Lang;
  formCopy: Dictionary["form"];
  readingCopy: Dictionary["reading"];
};

export function ChartFlow({ lang, formCopy, readingCopy }: Props) {
  const [nombre, setNombre] = useState<string | null>(null);
  const [rateLimited, setRateLimited] = useState(false);

  const customFetch = useCallback<typeof fetch>(async (input, init) => {
    setRateLimited(false);
    const response = await fetch(input, init);
    if (response.status === 429) {
      setRateLimited(true);
    }
    return response;
  }, []);

  const { object, submit, isLoading, error, stop, clear } = useObject({
    api: "/api/carta",
    schema: readingSchema,
    fetch: customFetch,
  });

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const payload: BirthInput = {
      nombre: getString(data, "nombre") || undefined,
      fecha: getString(data, "fecha"),
      hora: getString(data, "hora") || undefined,
      lugar: getString(data, "lugar") || undefined,
      interest: getString(data, "interest") === "amor" ? "amor" : "general",
      lang,
    };
    setNombre(payload.nombre ?? null);
    submit(payload);
  };

  const handleReset = () => {
    stop();
    clear();
    setNombre(null);
    setRateLimited(false);
  };

  const showReading = Boolean(object) || isLoading || rateLimited;

  return (
    <section
      id="form"
      className="relative px-5 sm:px-10 lg:px-16 py-16 sm:py-20 lg:py-24"
    >
      <FormStyles />

      <div
        className="relative max-w-180 mx-auto"
        style={{
          background: `linear-gradient(180deg, rgba(26,22,13,0.95), rgba(11,10,8,0.98))`,
          border: `1px solid ${v1.gold}`,
          padding: "56px 28px",
        }}
      >
        <div
          aria-hidden="true"
          className="absolute pointer-events-none"
          style={{ inset: 12, border: `1px solid ${v1.goldFaint30}` }}
        />
        <Image
          src="/galgo-astral-logo.png"
          alt=""
          aria-hidden="true"
          width={1024}
          height={1536}
          className="absolute left-1/2 -translate-x-1/2 w-22 h-22 sm:w-27.5 sm:h-27.5 object-contain rounded-full p-3"
          style={{
            top: -50,
            background: v1.dark,
            border: `1px solid ${v1.gold}`,
          }}
        />

        <div className="relative pt-8 sm:px-12">
          {showReading ? (
            <ReadingView
              reading={object}
              nombre={nombre}
              isStreaming={isLoading}
              error={error}
              rateLimited={rateLimited}
              onReset={handleReset}
              t={readingCopy}
            />
          ) : (
            <ConsultForm
              t={formCopy}
              isLoading={isLoading}
              onSubmit={handleSubmit}
            />
          )}
        </div>
      </div>
    </section>
  );
}

type ConsultFormProps = {
  t: Dictionary["form"];
  isLoading: boolean;
  onSubmit: (event: SubmitEvent<HTMLFormElement>) => void;
};

function ConsultForm({ t, isLoading, onSubmit }: ConsultFormProps) {
  const [interest, setInterest] = useState<"amor" | "general">("general");

  return (
    <form noValidate onSubmit={onSubmit} aria-busy={isLoading}>
      <div className="text-center mb-12">
        <div
          className="font-display mb-4"
          style={{
            color: v1.gold,
            fontSize: 11,
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
            className="font-display block mb-4"
            style={{
              color: v1.gold,
              fontSize: 11,
              letterSpacing: "0.22em",
              fontWeight: 500,
              textTransform: "uppercase",
            }}
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
          className="font-display mt-4 disabled:opacity-70 disabled:cursor-not-allowed transition-opacity"
          style={{
            background: v1.goldBright,
            color: v1.dark,
            border: "none",
            padding: "22px 0",
            cursor: "pointer",
            letterSpacing: "0.35em",
            fontSize: 12,
            fontWeight: 500,
            textTransform: "uppercase",
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
  children: React.ReactNode;
}) {
  return (
    <div>
      <div
        className="font-display mb-1"
        style={{
          color: v1.gold,
          fontSize: 11,
          letterSpacing: "0.22em",
          fontWeight: 500,
          textTransform: "uppercase",
        }}
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
  return (
    <label className="cursor-pointer block" data-selected={selected}>
      <input
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
            letterSpacing: "0.25em",
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
            fontSize: 9,
            letterSpacing: "0.2em",
            fontWeight: 500,
          }}
        >
          {sub}
        </span>
      </span>
    </label>
  );
}

type ReadingViewProps = {
  reading: DeepPartial<Reading> | undefined;
  nombre: string | null;
  isStreaming: boolean;
  error: Error | undefined;
  rateLimited: boolean;
  onReset: () => void;
  t: Dictionary["reading"];
};

function ReadingView({
  reading,
  nombre,
  isStreaming,
  error,
  rateLimited,
  onReset,
  t,
}: ReadingViewProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <article
      aria-busy={isStreaming}
      aria-live="polite"
      className="text-left"
    >
      <div className="text-center mb-10">
        <p
          className="font-display"
          style={{
            color: v1.gold,
            fontSize: 11,
            letterSpacing: "0.4em",
            fontWeight: 500,
          }}
        >
          {t.eyebrow}
        </p>
        <h2
          ref={headingRef}
          tabIndex={-1}
          className="font-body italic mt-3 m-0 text-4xl sm:text-5xl lg:text-[56px] font-normal focus-visible:outline-none"
          style={{ color: v1.goldBright }}
        >
          {nombre ? `${t.titlePrefix} ${nombre}` : t.titleFallback}
        </h2>
      </div>

      {rateLimited ? (
        <ReadingError
          eyebrow={t.rateLimitEyebrow}
          message={t.rateLimitMessage}
        />
      ) : error ? (
        <ReadingError eyebrow={t.errorEyebrow} message={t.errorMessage} />
      ) : reading?.status === "needs_more_data" ? (
        <NeedsMoreData
          message={reading.message ?? t.missingDataFallback}
          missing={reading.missing}
          t={t}
        />
      ) : reading?.status === "error" ? (
        <ReadingError
          eyebrow={t.errorEyebrow}
          message={reading.message ?? t.genericErrorFallback}
        />
      ) : (
        <ReadingBody reading={reading} isStreaming={isStreaming} t={t} />
      )}

      <div className="mt-12 text-center">
        <button
          type="button"
          onClick={onReset}
          disabled={isStreaming}
          className="font-display transition-opacity disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          style={{
            background: "transparent",
            border: "none",
            color: v1.cream,
            fontSize: 11,
            letterSpacing: "0.32em",
            padding: "14px 28px",
            fontWeight: 500,
            textTransform: "uppercase",
            borderBottom: `1px solid ${v1.goldFaint35}`,
            cursor: isStreaming ? "not-allowed" : "pointer",
          }}
        >
          {isStreaming ? t.consulting : t.newConsult}
        </button>
      </div>
    </article>
  );
}

function ReadingBody({
  reading,
  isStreaming,
  t,
}: {
  reading: DeepPartial<Reading> | undefined;
  isStreaming: boolean;
  t: Dictionary["reading"];
}) {
  const summary = typeof reading?.summary === "string" ? reading.summary : "";
  const highlights = filterStrings(reading?.highlights);
  const sections = filterSections(reading?.sections);
  const tips = filterStrings(reading?.actionable_tips);
  const disclaimer =
    typeof reading?.disclaimer === "string" ? reading.disclaimer : "";

  if (
    !summary &&
    highlights.length === 0 &&
    sections.length === 0 &&
    tips.length === 0
  ) {
    return <ReadingPlaceholder t={t} />;
  }

  return (
    <div className="flex flex-col gap-10">
      {summary ? (
        <p
          className="font-body italic max-w-xl mx-auto text-center text-lg sm:text-xl leading-relaxed"
          style={{ color: "rgba(245, 236, 214, 0.85)" }}
        >
          {summary}
          {isStreaming ? <StreamingCursor /> : null}
        </p>
      ) : null}

      {highlights.length > 0 ? <HighlightsList items={highlights} /> : null}

      {sections.length > 0 ? (
        <div>
          <p
            className="font-display text-center mb-6"
            style={{
              color: v1.gold,
              fontSize: 11,
              letterSpacing: "0.4em",
              fontWeight: 500,
            }}
          >
            {t.sectionsLabel}
          </p>
          <div className="flex flex-col gap-7">
            {sections.map((s, i) => (
              <ReadingSectionCard
                key={i}
                index={i}
                title={s.title}
                content={s.content}
              />
            ))}
          </div>
        </div>
      ) : null}

      {tips.length > 0 ? <TipsBlock tips={tips} t={t} /> : null}

      {disclaimer ? (
        <p
          className="font-body italic text-xs text-center max-w-md mx-auto leading-relaxed"
          style={{ color: "rgba(245, 236, 214, 0.4)" }}
        >
          {disclaimer}
        </p>
      ) : null}
    </div>
  );
}

function HighlightsList({ items }: { items: string[] }) {
  return (
    <ul className="grid sm:grid-cols-2 gap-4">
      {items.map((item, i) => (
        <li
          key={i}
          className="flex items-start gap-3 px-5 py-4"
          style={{
            background: "rgba(201, 165, 90, 0.05)",
            border: `1px solid ${v1.goldFaint25}`,
          }}
        >
          <span
            aria-hidden="true"
            style={{
              width: 6,
              height: 6,
              marginTop: 9,
              background: v1.goldBright,
              flexShrink: 0,
              transform: "rotate(45deg)",
            }}
          />
          <span
            className="font-body leading-relaxed"
            style={{ color: "rgba(245, 236, 214, 0.9)", fontSize: 17 }}
          >
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

function ReadingSectionCard({
  title,
  content,
  index,
}: {
  title: string;
  content: string;
  index: number;
}) {
  return (
    <article>
      <div className="flex items-baseline gap-3 mb-2">
        <span
          className="font-display"
          style={{
            color: v1.goldBright,
            fontSize: 11,
            letterSpacing: "0.32em",
            fontWeight: 500,
          }}
          aria-hidden="true"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3
          className="font-body italic m-0 text-2xl sm:text-3xl font-normal"
          style={{ color: v1.goldBright }}
        >
          {title}
        </h3>
      </div>
      {content ? (
        <p
          className="font-body leading-relaxed text-base sm:text-lg"
          style={{ color: "rgba(245, 236, 214, 0.85)" }}
        >
          {content}
        </p>
      ) : null}
    </article>
  );
}

function TipsBlock({
  tips,
  t,
}: {
  tips: string[];
  t: Dictionary["reading"];
}) {
  return (
    <section
      className="px-6 py-8 sm:px-8"
      style={{
        background: "rgba(201, 165, 90, 0.05)",
        border: `1px solid ${v1.goldFaint25}`,
      }}
    >
      <p
        className="font-display text-center mb-4"
        style={{
          color: v1.gold,
          fontSize: 11,
          letterSpacing: "0.4em",
          fontWeight: 500,
        }}
      >
        {t.tipsLabel}
      </p>
      <ul className="space-y-3 max-w-xl mx-auto">
        {tips.map((tip, i) => (
          <li key={i} className="flex items-start gap-3">
            <span
              aria-hidden="true"
              className="shrink-0 mt-2.5"
              style={{
                width: 5,
                height: 5,
                background: v1.goldBright,
                transform: "rotate(45deg)",
              }}
            />
            <span
              className="font-body italic leading-relaxed"
              style={{ color: "rgba(245, 236, 214, 0.9)" }}
            >
              {tip}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function ReadingPlaceholder({ t }: { t: Dictionary["reading"] }) {
  return (
    <div className="text-center py-10" role="status" aria-live="polite">
      <Spinner />
      <p
        className="font-display mt-4"
        style={{
          color: v1.gold,
          fontSize: 11,
          letterSpacing: "0.4em",
          fontWeight: 500,
        }}
      >
        {t.streaming}
      </p>
      <p
        className="font-body italic text-sm mt-2"
        style={{ color: "rgba(245, 236, 214, 0.6)", animation: "v1-pulse 2.4s ease-in-out infinite" }}
      >
        {t.streamingSub}
      </p>
      <style>{`
        @keyframes v1-pulse { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }
        @media (prefers-reduced-motion: reduce) { p[style*="v1-pulse"] { animation: none !important; } }
      `}</style>
    </div>
  );
}

function NeedsMoreData({
  message,
  missing,
  t,
}: {
  message: string;
  missing: ReadonlyArray<string | undefined> | undefined;
  t: Dictionary["reading"];
}) {
  const items = (missing ?? []).filter(
    (m): m is string => typeof m === "string" && m.length > 0,
  );
  return (
    <div className="text-center" role="status" aria-live="polite">
      <p
        className="font-display"
        style={{
          color: v1.gold,
          fontSize: 11,
          letterSpacing: "0.4em",
          fontWeight: 500,
        }}
      >
        {t.missingDataEyebrow}
      </p>
      <h3
        className="font-body italic m-0 mt-3 text-3xl sm:text-4xl font-normal"
        style={{ color: v1.goldBright }}
      >
        {t.missingDataTitle}
      </h3>
      <p
        className="font-body italic max-w-md mx-auto leading-relaxed mt-4 mb-6 text-lg"
        style={{ color: "rgba(245, 236, 214, 0.85)" }}
      >
        {message}
      </p>
      {items.length > 0 ? (
        <ul className="inline-flex flex-col gap-2 text-left">
          {items.map((item, i) => (
            <li
              key={i}
              className="flex items-center gap-3 font-body"
              style={{ color: "rgba(245, 236, 214, 0.8)" }}
            >
              <span
                aria-hidden="true"
                style={{
                  width: 6,
                  height: 6,
                  background: v1.goldBright,
                  transform: "rotate(45deg)",
                }}
              />
              {item}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function ReadingError({
  eyebrow,
  message,
}: {
  eyebrow: string;
  message: string;
}) {
  return (
    <div
      className="text-center py-6 px-6"
      role="alert"
      style={{
        background: "rgba(120, 60, 160, 0.08)",
        border: "1px solid rgba(180, 130, 200, 0.2)",
      }}
    >
      <p
        className="font-display mb-2"
        style={{
          color: "rgba(220, 200, 255, 0.85)",
          fontSize: 11,
          letterSpacing: "0.4em",
          fontWeight: 500,
        }}
      >
        {eyebrow}
      </p>
      <p
        className="font-body italic leading-relaxed"
        style={{ color: "rgba(245, 236, 214, 0.9)" }}
      >
        {message}
      </p>
    </div>
  );
}

function StreamingCursor() {
  return (
    <span
      aria-hidden="true"
      className="inline-block align-middle ml-1"
      style={{
        width: 2,
        height: 18,
        background: v1.goldBright,
        animation: "v1-pulse 1.4s ease-in-out infinite",
      }}
    />
  );
}

function Spinner() {
  return (
    <svg
      className="mx-auto"
      width="28"
      height="28"
      viewBox="0 0 28 28"
      style={{ animation: "v1-spin 1s linear infinite" }}
      aria-hidden="true"
    >
      <circle
        cx="14"
        cy="14"
        r="11"
        stroke={v1.goldBright}
        strokeOpacity="0.25"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M 14 3 A 11 11 0 0 1 25 14"
        stroke={v1.goldBright}
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      <style>{`
        @keyframes v1-spin { to { transform: rotate(360deg); } }
        @media (prefers-reduced-motion: reduce) { svg[style*="v1-spin"] { animation: none !important; } }
      `}</style>
    </svg>
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

function getString(data: FormData, key: string): string {
  const value = data.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function filterStrings(
  arr: ReadonlyArray<string | undefined> | undefined,
): string[] {
  if (!arr) return [];
  return arr.filter((x): x is string => typeof x === "string" && x.length > 0);
}

function filterSections(
  arr:
    | ReadonlyArray<{ title?: string; content?: string } | undefined>
    | undefined,
): { title: string; content: string }[] {
  if (!arr) return [];
  return arr
    .filter((s): s is { title?: string; content?: string } => Boolean(s))
    .filter((s) => typeof s.title === "string" && s.title.length > 0)
    .map((s) => ({
      title: s.title as string,
      content: typeof s.content === "string" ? s.content : "",
    }));
}
