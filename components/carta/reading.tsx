"use client";

import { useEffect, useRef } from "react";
import type { DeepPartial } from "ai";
import type { Reading as ReadingT } from "@/lib/schema";
import { OrnamentalDivider } from "@/components/ornaments/ornamental-divider";
import { ReadingHero } from "./reading-hero";
import { ReadingHighlights } from "./reading-highlights";
import { ReadingSection } from "./reading-section";
import { ReadingTips } from "./reading-tips";
import { NeedsMoreData, ReadingErrorState } from "./reading-states";
import { StreamingPlaceholder } from "./streaming-placeholder";

type Props = {
  reading: DeepPartial<ReadingT> | undefined;
  nombre: string | null;
  isStreaming: boolean;
  error: Error | undefined;
  onReset: () => void;
};

export function Reading({
  reading,
  nombre,
  isStreaming,
  error,
  onReset,
}: Props) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <section
      className="relative fade-up"
      aria-labelledby="reading-title"
      aria-live="polite"
      aria-busy={isStreaming}
    >
      <Corner position="tl" />
      <Corner position="tr" />
      <Corner position="bl" />
      <Corner position="br" />

      <div
        className="relative rounded-sm p-7 sm:p-10 shimmer-border"
        style={{
          background:
            "linear-gradient(180deg, rgba(30, 18, 50, 0.7) 0%, rgba(15, 8, 28, 0.8) 100%)",
          border: "1px solid rgba(212, 175, 55, 0.35)",
          backdropFilter: "blur(14px)",
        }}
      >
        <h2
          id="reading-title"
          ref={headingRef}
          tabIndex={-1}
          className="sr-only focus-visible:outline-none"
        >
          Tu carta astral
        </h2>

        {error ? (
          <ReadingErrorState message="Las estrellas están veladas esta noche. Intenta de nuevo en un momento." />
        ) : reading?.status === "needs_more_data" ? (
          <NeedsMoreData
            message={reading.message ?? "Necesitamos algún dato más para una lectura precisa."}
            missing={reading.missing}
          />
        ) : reading?.status === "error" ? (
          <ReadingErrorState
            message={reading.message ?? "Algo se interpuso entre tú y los astros."}
          />
        ) : (
          <ReadingOkBody reading={reading} nombre={nombre} isStreaming={isStreaming} />
        )}

        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={onReset}
            disabled={isStreaming}
            className="font-display text-xs uppercase tracking-[0.3em] text-starlight-300/70 hover:text-starlight-200 transition-colors border-b border-amber-400/30 hover:border-amber-300/80 pb-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/60 focus-visible:ring-offset-2 focus-visible:ring-offset-cosmos-violet disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isStreaming ? "consultando..." : "consultar otra alma"}
          </button>
        </div>
      </div>
    </section>
  );
}

function ReadingOkBody({
  reading,
  nombre,
  isStreaming,
}: {
  reading: DeepPartial<ReadingT> | undefined;
  nombre: string | null;
  isStreaming: boolean;
}) {
  const summary = typeof reading?.summary === "string" ? reading.summary : "";
  const highlights = filterStrings(reading?.highlights);
  const sections = filterSections(reading?.sections);
  const tips = filterStrings(reading?.actionable_tips);
  const disclaimer =
    typeof reading?.disclaimer === "string" ? reading.disclaimer : "";

  if (!summary && !highlights.length && !sections.length && !tips.length) {
    return <StreamingPlaceholder />;
  }

  return (
    <>
      <ReadingHero
        nombre={nombre}
        summary={summary}
        isStreaming={isStreaming}
      />

      {highlights.length > 0 ? (
        <>
          <OrnamentalDivider className="my-8 opacity-60" />
          <ReadingHighlights highlights={highlights} />
        </>
      ) : null}

      {sections.length > 0 ? (
        <>
          <OrnamentalDivider className="my-8 opacity-60" />
          <div>
            {sections.map((section, i) => (
              <ReadingSection
                key={i}
                index={i}
                title={section.title}
                content={section.content}
              />
            ))}
          </div>
        </>
      ) : null}

      {tips.length > 0 ? (
        <>
          <OrnamentalDivider className="my-8 opacity-60" />
          <ReadingTips tips={tips} />
        </>
      ) : null}

      {disclaimer ? (
        <p className="font-body italic text-xs text-starlight-100/40 text-center max-w-md mx-auto leading-relaxed">
          {disclaimer}
        </p>
      ) : null}
    </>
  );
}

function filterStrings(arr: ReadonlyArray<string | undefined> | undefined): string[] {
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

function Corner({ position }: { position: "tl" | "tr" | "bl" | "br" }) {
  const map = {
    tl: "-top-3 -left-3 border-t-2 border-l-2",
    tr: "-top-3 -right-3 border-t-2 border-r-2",
    bl: "-bottom-3 -left-3 border-b-2 border-l-2",
    br: "-bottom-3 -right-3 border-b-2 border-r-2",
  };
  return (
    <span
      aria-hidden="true"
      className={`absolute w-10 h-10 border-amber-400/50 ${map[position]}`}
    />
  );
}
