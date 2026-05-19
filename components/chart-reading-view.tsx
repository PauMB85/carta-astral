"use client";

import { useEffect, useRef } from "react";
import type { DeepPartial } from "ai";
import type { Reading } from "@natal/domain/reading";
import type { Lang } from "@shared/domain/lang";
import type { Dictionary } from "@/lib/i18n";
import { PetPremiumBlock } from "@/components/pet-premium-block";
import { ShareButton } from "@/components/share-button";
import {
  NeedsMoreData,
  ReadingError,
  ReadingPlaceholder,
} from "@/components/chart-reading-states";

type ReadingViewProps = {
  reading: DeepPartial<Reading> | undefined;
  nombre: string | null;
  isStreaming: boolean;
  error: Error | undefined;
  rateLimited: boolean;
  onReset: () => void;
  t: Dictionary["reading"];
  lang: Lang;
  petCopy: Dictionary["pet"];
};

export function ReadingView({
  reading,
  nombre,
  isStreaming,
  error,
  rateLimited,
  onReset,
  t,
  lang,
  petCopy,
}: ReadingViewProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  const handleShare = async () => {
    if (typeof navigator === "undefined" || !navigator.share) return;
    const shareTitle = nombre ? `${t.titlePrefix} ${nombre}` : t.titleFallback;
    const summary =
      typeof reading?.summary === "string" ? reading.summary : "";
    try {
      await navigator.share({
        title: shareTitle,
        text: summary,
        url: window.location.href,
      });
    } catch {
      // User cancelled or share unsupported. Silent no-op.
    }
  };

  return (
    <article
      aria-busy={isStreaming}
      aria-live="polite"
      className="text-left"
    >
      <div className="text-center mb-10">
        <p className="font-display text-gold text-xs tracking-[0.4em] font-medium">
          {t.eyebrow}
        </p>
        <h2
          ref={headingRef}
          tabIndex={-1}
          className="font-body italic mt-3 m-0 text-4xl sm:text-5xl lg:text-[56px] font-normal focus-visible:outline-none text-gold-bright"
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

      {!isStreaming &&
      !rateLimited &&
      !error &&
      reading?.status === "ok" ? (
        <>
          <ShareButton label={t.share} onShare={handleShare} />
          <PetPremiumBlock lang={lang} t={petCopy} />
        </>
      ) : null}

      <div className="mt-12 text-center">
        <button
          type="button"
          onClick={onReset}
          disabled={isStreaming}
          className="font-display bg-transparent py-3.5 px-7 text-xs font-medium uppercase tracking-[0.32em] transition-opacity disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 text-cream border-b border-b-gold-faint-35"
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
        <p className="font-body italic max-w-xl mx-auto text-center text-lg sm:text-xl leading-relaxed text-cream/85">
          {summary}
          {isStreaming ? <StreamingCursor /> : null}
        </p>
      ) : null}

      {highlights.length > 0 ? <HighlightsList items={highlights} /> : null}

      {sections.length > 0 ? (
        <div>
          <p className="font-display text-center mb-6 text-gold text-xs tracking-[0.4em] font-medium">
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
        <p className="font-body italic text-xs text-center max-w-md mx-auto leading-relaxed text-cream/40">
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
          className="flex items-start gap-3 px-5 py-4 bg-gold/5 border border-gold-faint-25"
        >
          <span
            aria-hidden="true"
            className="w-1.5 h-1.5 mt-2.25 bg-gold-bright shrink-0 rotate-45"
          />
          <span className="font-body leading-relaxed text-cream/90 text-[17px]">
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
          className="font-display text-gold-bright text-xs tracking-[0.32em] font-medium"
          aria-hidden="true"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="font-body italic m-0 text-2xl sm:text-3xl font-normal text-gold-bright">
          {title}
        </h3>
      </div>
      {content ? (
        <p className="font-body leading-relaxed text-base sm:text-lg text-cream/85">
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
    <section className="px-6 py-8 sm:px-8 bg-gold/5 border border-gold-faint-25">
      <p className="font-display text-center mb-4 text-gold text-xs tracking-[0.4em] font-medium">
        {t.tipsLabel}
      </p>
      <ul className="space-y-3 max-w-xl mx-auto">
        {tips.map((tip, i) => (
          <li key={i} className="flex items-start gap-3">
            <span
              aria-hidden="true"
              className="w-1.25 h-1.25 shrink-0 mt-2.5 bg-gold-bright rotate-45"
            />
            <span className="font-body italic leading-relaxed text-cream/90">
              {tip}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function StreamingCursor() {
  return (
    <span
      aria-hidden="true"
      className="inline-block align-middle ml-1 w-0.5 h-4.5 bg-gold-bright animate-streaming-cursor motion-reduce:animate-none"
    />
  );
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
