"use client";

import { useEffect, useRef } from "react";
import type { DeepPartial } from "ai";
import type { Dictionary } from "@/lib/i18n";
import type { PetReading } from "@pet/domain/pet-reading";
import { v1 } from "@/lib/theme";
import { HighlightItem } from "@/components/pet-reading-view-parts/highlight-item";
import { NarrativeSection } from "@/components/pet-reading-view-parts/narrative-section";
import { ReadingDisclaimer } from "@/components/pet-reading-view-parts/reading-disclaimer";
import { RitualCard } from "@/components/pet-reading-view-parts/ritual-card";
import { ScorePanel } from "@/components/pet-reading-view-parts/score-panel";
import { SectionHeading } from "@/components/pet-reading-view-parts/section-heading";
import { ShareButton } from "@/components/pet-reading-view-parts/share-button";
import { TipItem } from "@/components/pet-reading-view-parts/tip-item";

type Props = {
  reading: DeepPartial<PetReading> | undefined;
  isStreaming: boolean;
  t: Dictionary["pet"];
};

export function PetReadingView({ reading, isStreaming, t }: Props) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  const title = typeof reading?.title === "string" ? reading.title : "";
  const score = reading?.compatibility_score;
  const scoreValue =
    typeof score?.value === "number" ? score.value : undefined;
  const scoreLabel = typeof score?.label === "string" ? score.label : undefined;
  const scoreExplanation =
    typeof score?.explanation === "string" ? score.explanation : undefined;
  const showScore =
    scoreValue !== undefined || scoreLabel !== undefined;

  const highlights = filterPairs(reading?.highlights);
  const sections = filterPairs(reading?.sections);
  const ritualTitle =
    typeof reading?.ritual_or_activity?.title === "string"
      ? reading.ritual_or_activity.title
      : "";
  const ritualDescription =
    typeof reading?.ritual_or_activity?.description === "string"
      ? reading.ritual_or_activity.description
      : "";
  const ritualSteps = filterStrings(reading?.ritual_or_activity?.steps);
  const showRitual = ritualTitle.length > 0;

  const tips = filterStrings(reading?.actionable_tips);

  return (
    <article
      aria-busy={isStreaming}
      aria-live="polite"
      className="max-w-180 mx-auto px-5 sm:px-10 py-12"
    >
      <header className="text-center pt-2 pb-3">
        <p
          className="font-display m-0"
          style={{
            color: v1.gold,
            fontSize: 11,
            letterSpacing: "0.45em",
            fontWeight: 500,
          }}
        >
          {t.success.eyebrow}
        </p>
        <h1
          ref={headingRef}
          tabIndex={-1}
          className="font-body italic mt-5 m-0 text-4xl sm:text-5xl font-normal leading-tight focus-visible:outline-none"
          style={{ color: v1.cream, letterSpacing: "-0.01em" }}
        >
          {title || "…"}
        </h1>
      </header>

      {showScore ? (
        <ScorePanel
          label={scoreLabel}
          value={scoreValue}
          explanation={scoreExplanation}
        />
      ) : null}

      {highlights.length > 0 ? (
        <section>
          <SectionHeading label={t.success.highlightsLabel} />
          <div className="flex flex-col gap-3">
            {highlights.map((h, i) => (
              <HighlightItem
                key={i}
                index={i}
                title={h.title}
                content={h.content}
              />
            ))}
          </div>
        </section>
      ) : null}

      {sections.length > 0 ? (
        <section>
          <SectionHeading label={t.success.sectionsLabel} />
          <div>
            {sections.map((s, i) => (
              <NarrativeSection key={i} title={s.title} content={s.content} />
            ))}
          </div>
        </section>
      ) : null}

      {showRitual ? (
        <RitualCard
          eyebrow={t.success.ritualEyebrow}
          title={ritualTitle}
          description={ritualDescription}
          steps={ritualSteps}
        />
      ) : null}

      {tips.length > 0 ? (
        <section>
          <SectionHeading label={t.success.tipsLabel} />
          <div className="flex flex-col gap-3.5">
            {tips.map((tip, i) => (
              <TipItem key={i} index={i} text={tip} />
            ))}
          </div>
        </section>
      ) : null}

      <ShareButton label={t.success.share} onShare={() => shareReading(reading)} />

      <ReadingDisclaimer text={t.success.disclaimer} />
    </article>
  );
}

async function shareReading(reading: DeepPartial<PetReading> | undefined) {
  if (typeof navigator === "undefined" || !navigator.share) return;
  const title =
    typeof reading?.title === "string" ? reading.title : document.title;
  const text =
    typeof reading?.summary === "string" ? reading.summary : "";
  try {
    await navigator.share({ title, text, url: window.location.href });
  } catch {
    // User cancelled or share unsupported. Silent no-op.
  }
}

function filterPairs(
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

function filterStrings(
  arr: ReadonlyArray<string | undefined> | undefined,
): string[] {
  if (!arr) return [];
  return arr.filter((x): x is string => typeof x === "string" && x.length > 0);
}
