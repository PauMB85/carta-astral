"use client";

import Link from "next/link";
import type { Dictionary } from "@/lib/i18n";
import type { Lang } from "@shared/domain/lang";
import { v1 } from "@/lib/theme";

type Props = {
  lang: Lang;
  t: Dictionary["pet"];
};

export function PetPremiumBlock({ lang, t }: Props) {
  return (
    <div className="mt-12">
      <PetPremiumBlockStyles />

      <div
        className="pt-6 mb-6"
        style={{ borderTop: `1px solid ${v1.goldFaint15}` }}
      >
        <div
          className="font-display"
          style={{
            fontSize: 11,
            letterSpacing: "0.4em",
            color: v1.gold,
            fontWeight: 500,
          }}
        >
          {t.prelude.eyebrow}
        </div>
        <p
          className="font-body italic mt-3 mb-0 text-base sm:text-lg leading-relaxed"
          style={{ color: v1.dim }}
        >
          {t.prelude.quote}
        </p>
      </div>

      <div
        className="relative"
        style={{
          background: v1.ink,
          border: `1px solid ${v1.goldFaint25}`,
          padding: "44px 36px",
          boxShadow:
            "0 0 36px rgba(231, 201, 122, 0.06), inset 0 0 0 1px rgba(0, 0, 0, 0.4)",
        }}
      >
        <Corner pos="top-left" />
        <Corner pos="bottom-right" />

        <div
          className="font-display mb-4"
          style={{
            fontSize: 11,
            letterSpacing: "0.45em",
            color: v1.gold,
            fontWeight: 500,
          }}
        >
          {t.premium.eyebrow}
        </div>

        <h3
          className="font-body italic m-0 mb-4 text-3xl sm:text-[32px] font-normal leading-tight"
          style={{ color: v1.cream }}
        >
          {t.premium.title}
        </h3>

        <p
          className="font-body italic mt-0 mb-6 text-base sm:text-lg leading-relaxed"
          style={{ color: v1.dim }}
        >
          {t.premium.sub}
        </p>

        <div
          className="font-display flex justify-between items-center mb-6 py-4"
          style={{
            fontSize: 12,
            letterSpacing: "0.3em",
            color: v1.goldBright,
            borderTop: `1px solid ${v1.goldFaint15}`,
            borderBottom: `1px solid ${v1.goldFaint15}`,
          }}
        >
          <span>{t.premium.priceLabel}</span>
          <span style={{ fontSize: 16 }}>{t.premium.priceAmount}</span>
        </div>

        <Link
          href={`/pet-compatibility?lang=${lang}`}
          className="pet-cta font-display flex items-center justify-center gap-3 no-underline w-full"
          style={{
            background: v1.goldBright,
            color: v1.dark,
            padding: "18px 32px",
            minHeight: 54,
            fontSize: 11,
            letterSpacing: "0.25em",
            fontWeight: 500,
          }}
        >
          <span>{t.premium.cta}</span>
          <span className="pet-cta-arrow" aria-hidden="true">
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
        style={{
          position: "absolute",
          top: -1,
          left: -1,
          width: 18,
          height: 18,
          borderTop: `1px solid ${v1.gold}`,
          borderLeft: `1px solid ${v1.gold}`,
        }}
      />
    );
  }
  return (
    <span
      aria-hidden="true"
      style={{
        position: "absolute",
        bottom: -1,
        right: -1,
        width: 18,
        height: 18,
        borderBottom: `1px solid ${v1.gold}`,
        borderRight: `1px solid ${v1.gold}`,
      }}
    />
  );
}

function PetPremiumBlockStyles() {
  return (
    <style>{`
      .pet-cta { transition: background 0.25s; }
      .pet-cta:hover { background: ${v1.cream}; }
      .pet-cta-arrow { transition: transform 0.25s; display: inline-block; }
      .pet-cta:hover .pet-cta-arrow { transform: translateX(4px); }
      @media (prefers-reduced-motion: reduce) {
        .pet-cta, .pet-cta-arrow { transition: none !important; }
        .pet-cta:hover .pet-cta-arrow { transform: none !important; }
      }
    `}</style>
  );
}
