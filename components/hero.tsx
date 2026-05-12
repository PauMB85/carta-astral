import Image from "next/image";
import type { Dictionary } from "@/lib/i18n";
import { v1 } from "@/lib/theme";
import { NatalWheel } from "./natal-wheel";

type Props = {
  t: Dictionary["hero"];
};

export function Hero({ t }: Props) {
  return (
    <section className="relative px-5 sm:px-10 lg:px-16 pt-12 sm:pt-16 lg:pt-20 pb-10 lg:pb-14 text-center">
      <Image
        src="/galgo-astral-logo.png"
        alt=""
        width={1024}
        height={1536}
        aria-hidden="true"
        priority
        className="absolute top-6 left-1/2 -translate-x-1/2 w-45 sm:w-65 lg:w-90 opacity-18 pointer-events-none z-0"
        style={{ filter: `drop-shadow(0 0 40px rgba(231,201,122,0.25))` }}
      />

      <p
        className="font-display relative z-10 mb-6"
        style={{
          color: v1.gold,
          fontSize: 12,
          letterSpacing: "0.4em",
          fontWeight: 500,
        }}
      >
        {t.eyebrow}
      </p>

      <h1
        className="font-body font-normal text-5xl sm:text-7xl lg:text-[96px] m-0"
        style={{
          color: v1.cream,
          letterSpacing: "-0.01em",
          lineHeight: 0.98,
        }}
      >
        <span className="block">{t.title1}</span>
        <span
          className="block italic font-light"
          style={{ color: v1.goldBright }}
        >
          {t.title2}
        </span>
        <span className="block">{t.title3}</span>
      </h1>

      <p
        className="font-body italic max-w-xl mx-auto mt-8 mb-10 text-lg sm:text-xl leading-relaxed text-pretty"
        style={{ color: "rgba(245, 236, 214, 0.78)" }}
      >
        {t.body}
      </p>

      <div className="flex justify-center my-10 sm:my-12 wheel-float">
        <NatalWheel
          size={520}
          className="w-70 sm:w-100 lg:w-130 h-auto"
        />
      </div>

      <a
        href="#form"
        className="inline-flex items-center justify-center font-display whitespace-nowrap transition-colors min-h-16 px-14 py-0 text-[13px] font-medium tracking-[0.32em] outline-offset-[-6px]"
        style={{
          border: `1px solid ${v1.gold}`,
          outline: `1px solid ${v1.goldFaint35}`,
          color: v1.goldBright,
          background: "rgba(201,165,90,0.04)",
        }}
      >
        <span style={{ paddingTop: 2 }}>{t.cta}</span>
      </a>
      <div
        className="font-body italic mt-6 text-sm"
        style={{ color: "rgba(201, 165, 90, 0.7)", letterSpacing: "0.05em" }}
      >
        {t.sub}
      </div>

      <style>{`
        @keyframes v1-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        .wheel-float { animation: v1-float 8s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .wheel-float { animation: none !important; }
        }
      `}</style>
    </section>
  );
}
