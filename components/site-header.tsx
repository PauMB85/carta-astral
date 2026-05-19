import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Lang } from "@shared/domain/lang";
import type { Dictionary } from "@/lib/i18n";
import { LangLink } from "@/components/lang-link";

type Props = {
  lang: Lang;
  t: Dictionary["nav"];
};

export function SiteHeader({ lang, t }: Props) {
  const homeHref = `/?lang=${lang}`;
  const resolveLinkHref = (href: string) =>
    href.startsWith("#") ? `${homeHref}${href}` : href;

  return (
    <header className="grid grid-cols-2 lg:grid-cols-[1fr_auto_1fr] items-center gap-4 px-5 py-5 sm:px-10 sm:py-6 lg:px-16 lg:py-8 border-b border-b-gold-faint-15">
      <Link
        href={homeHref}
        aria-label={t.brand}
        className="flex items-center gap-3 sm:gap-4 col-span-2 lg:col-span-1 order-1 lg:order-1 no-underline text-inherit transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:opacity-90"
      >
        <Image
          src="/galgo-astral-logo.png"
          alt=""
          width={1024}
          height={1536}
          priority
          className="h-14 w-auto sm:h-16 lg:h-22 drop-shadow-[0_0_24px_var(--color-gold-glow)]"
        />
        <div className="font-display leading-none text-gold-bright tracking-[0.18em] font-medium">
          <div className="text-base sm:text-lg">{t.brand}</div>
          <div className="font-body italic mt-1 text-gold text-xs">
            {t.brandSub}
          </div>
        </div>
      </Link>

      <nav
        className="hidden lg:flex justify-center gap-9 order-2 font-display tracking-[0.18em] font-medium"
        aria-label="Primary"
      >
        {t.links.map(({ label, href }) => (
          <a
            key={label}
            href={resolveLinkHref(href)}
            className="text-xs no-underline opacity-85 hover:opacity-100 transition-opacity text-cream"
          >
            {label}
          </a>
        ))}
      </nav>

      <div className="flex justify-end items-center gap-2 order-2 lg:order-3 font-display text-xs tracking-[0.2em] font-medium">
        <Suspense fallback={<LangToggleFallback current={lang} />}>
          <LangLink targetLang="es" current={lang}>
            ES
          </LangLink>
          <span aria-hidden="true" className="text-gold/40">
            ·
          </span>
          <LangLink targetLang="en" current={lang}>
            EN
          </LangLink>
        </Suspense>
      </div>
    </header>
  );
}

function LangToggleFallback({ current }: { current: Lang }) {
  return (
    <>
      <span className={current === "es" ? "text-gold-bright" : "text-cream/40"}>
        ES
      </span>
      <span aria-hidden="true" className="text-gold/40">
        ·
      </span>
      <span className={current === "en" ? "text-gold-bright" : "text-cream/40"}>
        EN
      </span>
    </>
  );
}
