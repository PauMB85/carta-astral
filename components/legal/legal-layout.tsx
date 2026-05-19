import type { ReactNode } from "react";

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
      <header className="mb-10 pb-6 border-b border-b-gold-faint-15">
        <h1 className="font-body italic m-0 text-4xl sm:text-5xl font-normal leading-tight text-gold-bright">
          {title}
        </h1>
        <p className="font-display mt-4 m-0 text-gold text-[11px] tracking-[0.3em] font-medium">
          {lastUpdatedLabel} · {lastUpdated}
        </p>
      </header>

      {intro ? (
        <div className="legal-body font-body italic text-base sm:text-lg leading-relaxed mb-10 text-cream">
          {intro}
        </div>
      ) : null}

      <div className="flex flex-col gap-9">
        {sections.map((section, index) => (
          <section key={index}>
            <h2 className="font-display m-0 mb-4 text-base font-medium text-gold-bright tracking-[0.06em]">
              {section.title}
            </h2>
            <div className="legal-body font-body text-base sm:text-[17px] leading-relaxed text-cream">
              {section.body}
            </div>
          </section>
        ))}
      </div>
    </article>
  );
}
