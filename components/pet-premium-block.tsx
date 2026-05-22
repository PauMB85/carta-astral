"use client";

import Link from "next/link";
import type { Dictionary } from "@/lib/i18n";
import type { Lang } from "@shared/domain/lang";

type Props = {
  lang: Lang;
  t: Dictionary["pet"];
};

export function PetPremiumBlock({ lang, t }: Props) {
  return (
    <div className="mt-12">
      <div className="pt-6 mb-6 border-t border-gold-faint-15">
        <div className="font-display text-gold text-[11px] tracking-[0.4em] font-medium">
          {t.prelude.eyebrow}
        </div>
        <p className="font-body italic mt-3 mb-0 text-base sm:text-lg leading-relaxed text-dim">
          {t.prelude.quote}
        </p>
      </div>

      <div className="relative bg-ink border border-gold-faint-25 px-9 py-11 shadow-[0_0_36px_rgba(231,201,122,0.06),inset_0_0_0_1px_rgba(0,0,0,0.4)]">
        <Corner pos="top-left" />
        <Corner pos="bottom-right" />

        <div className="font-display mb-4 text-gold text-[11px] tracking-[0.45em] font-medium">
          {t.premium.eyebrow}
        </div>

        <h3 className="font-body italic m-0 mb-4 text-3xl sm:text-[32px] font-normal leading-tight text-cream">
          {t.premium.title}
        </h3>

        <p className="font-body italic mt-0 mb-6 text-base sm:text-lg leading-relaxed text-dim">
          {t.premium.sub}
        </p>

        <div className="font-display mb-6 py-4 border-t border-b border-gold-faint-15">
          <div className="text-center mb-2.5 text-gold text-[10px] tracking-[0.45em] font-medium">
            {t.premium.priceBlessing}
          </div>
          <div className="flex justify-between items-center text-[12px] tracking-[0.3em] text-gold-bright">
            <span>{t.premium.priceLabel}</span>
            <span className="text-base">
              <span className="line-through mr-3 text-cream/45">
                {t.premium.priceOriginal}
              </span>
              {t.premium.priceFinal}
            </span>
          </div>
        </div>

        <Link
          href={`/pet-compatibility?lang=${lang}`}
          className="group font-display flex items-center justify-center gap-3 no-underline w-full bg-gold-bright text-dark px-8 py-4.5 min-h-13.5 text-[11px] tracking-[0.25em] font-medium transition-colors duration-250 motion-reduce:transition-none hover:bg-cream"
        >
          <span>{t.premium.cta}</span>
          <span
            aria-hidden="true"
            className="inline-block transition-transform duration-250 motion-reduce:transition-none group-hover:translate-x-1"
          >
            →
          </span>
        </Link>
      </div>
    </div>
  );
}

function Corner({ pos }: { pos: "top-left" | "bottom-right" }) {
  if (pos === "top-left") {
    return (
      <span
        aria-hidden="true"
        className="absolute -top-px -left-px w-4.5 h-4.5 border-t border-l border-gold"
      />
    );
  }
  return (
    <span
      aria-hidden="true"
      className="absolute -bottom-px -right-px w-4.5 h-4.5 border-b border-r border-gold"
    />
  );
}
