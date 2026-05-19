import Image from "next/image";
import type { Dictionary } from "@/lib/i18n";
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

      <p className="font-display relative z-10 mb-6 text-gold text-xs tracking-[0.4em] font-medium">
        {t.eyebrow}
      </p>

      <h1 className="font-body font-normal text-5xl sm:text-7xl lg:text-[96px] m-0 text-cream tracking-[-0.01em] leading-[0.98]">
        <span className="block">{t.title1}</span>
        <span className="block italic font-light text-gold-bright">
          {t.title2}
        </span>
        <span className="block">{t.title3}</span>
      </h1>

      <p className="font-body italic max-w-xl mx-auto mt-8 mb-10 text-lg sm:text-xl leading-relaxed text-pretty text-cream/78">
        {t.body}
      </p>

      <div className="flex justify-center my-10 sm:my-12 animate-float motion-reduce:animate-none">
        <NatalWheel size={520} className="w-70 sm:w-100 lg:w-130 h-auto" />
      </div>

      <a
        href="#form"
        className="inline-flex items-center justify-center font-display whitespace-nowrap transition-colors min-h-16 px-14 py-0 text-[13px] font-medium tracking-[0.32em] outline-offset-[-6px] border border-gold outline outline-1 outline-gold-faint-35 text-gold-bright bg-gold/[0.04]"
      >
        <span className="pt-0.5">{t.cta}</span>
      </a>
      <div className="font-body italic mt-6 text-sm text-gold/70 tracking-wider">
        {t.sub}
      </div>
    </section>
  );
}
