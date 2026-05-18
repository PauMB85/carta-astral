import type { ReactNode } from "react";
import { v1 } from "@/lib/theme";

export type LegalContent = {
  title: string;
  lastUpdatedLabel: string;
  lastUpdated: string;
  intro?: ReactNode;
  sections: ReadonlyArray<{
    title: string;
    body: ReactNode;
  }>;
};

export function LegalLayout({
  title,
  lastUpdatedLabel,
  lastUpdated,
  intro,
  sections,
}: LegalContent) {
  return (
    <article className="relative max-w-3xl mx-auto px-5 sm:px-8 py-12 sm:py-16">
      <LegalLayoutStyles />

      <header
        className="mb-10 pb-6"
        style={{ borderBottom: `1px solid ${v1.goldFaint15}` }}
      >
        <h1
          className="font-body italic m-0 text-4xl sm:text-5xl font-normal leading-tight"
          style={{ color: v1.goldBright }}
        >
          {title}
        </h1>
        <p
          className="font-display mt-4 m-0"
          style={{
            color: v1.gold,
            fontSize: 11,
            letterSpacing: "0.3em",
            fontWeight: 500,
          }}
        >
          {lastUpdatedLabel} · {lastUpdated}
        </p>
      </header>

      {intro ? (
        <div
          className="legal-body font-body italic text-base sm:text-lg leading-relaxed mb-10"
          style={{ color: v1.cream }}
        >
          {intro}
        </div>
      ) : null}

      <div className="flex flex-col gap-9">
        {sections.map((section, index) => (
          <section key={index}>
            <h2
              className="font-display m-0 mb-4 text-base font-medium"
              style={{ color: v1.goldBright, letterSpacing: "0.06em" }}
            >
              {section.title}
            </h2>
            <div
              className="legal-body font-body text-base sm:text-[17px] leading-relaxed"
              style={{ color: v1.cream }}
            >
              {section.body}
            </div>
          </section>
        ))}
      </div>
    </article>
  );
}

function LegalLayoutStyles() {
  return (
    <style>{`
      .legal-body p { margin: 0 0 12px; }
      .legal-body p:last-child { margin-bottom: 0; }
      .legal-body ul, .legal-body ol { margin: 8px 0 12px; padding-left: 24px; }
      .legal-body li { margin-bottom: 6px; }
      .legal-body li:last-child { margin-bottom: 0; }
      .legal-body strong { color: ${v1.goldBright}; font-weight: 500; }
      .legal-body a { color: ${v1.goldBright}; text-decoration: underline; text-underline-offset: 3px; }
      .legal-body a:hover { color: ${v1.cream}; }
      .legal-body code { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 0.92em; padding: 1px 6px; background: rgba(201, 165, 90, 0.08); border: 1px solid ${v1.goldFaint15}; }
      .legal-body .legal-table-wrap { overflow-x: auto; margin: 12px 0; }
      .legal-body table { width: 100%; border-collapse: collapse; font-size: 0.95em; }
      .legal-body th, .legal-body td { text-align: left; padding: 10px 12px; border-bottom: 1px solid ${v1.goldFaint15}; vertical-align: top; }
      .legal-body th { color: ${v1.gold}; font-family: var(--font-display), serif; font-size: 11px; letter-spacing: 0.18em; font-weight: 500; text-transform: uppercase; }
      .legal-body td { color: ${v1.cream}; }
    `}</style>
  );
}
