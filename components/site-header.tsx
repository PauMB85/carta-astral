import Image from "next/image";
import Link from "next/link";
import type { Lang } from "@/lib/schema";
import type { Dictionary } from "@/lib/i18n";
import { v1 } from "@/lib/theme";

type Props = {
  lang: Lang;
  t: Dictionary["nav"];
};

export function SiteHeader({ lang, t }: Props) {
  return (
    <header
      className="grid grid-cols-2 lg:grid-cols-[1fr_auto_1fr] items-center gap-4 px-5 py-5 sm:px-10 sm:py-6 lg:px-16 lg:py-8 border-b"
      style={{ borderColor: v1.goldFaint15 }}
    >
      <div className="flex items-center gap-3 sm:gap-4 col-span-2 lg:col-span-1 order-1 lg:order-1">
        <Image
          src="/galgo-astral-logo.png"
          alt=""
          width={1024}
          height={1536}
          priority
          className="h-14 w-auto sm:h-16 lg:h-22"
          style={{ filter: `drop-shadow(0 0 24px ${v1.goldGlow})` }}
        />
        <div
          className="font-display leading-none"
          style={{ color: v1.goldBright, letterSpacing: "0.18em", fontWeight: 500 }}
        >
          <div className="text-base sm:text-lg">{t.brand}</div>
          <div
            className="font-body italic mt-1"
            style={{ color: v1.gold, fontSize: 11, letterSpacing: "0.1em" }}
          >
            {t.brandSub}
          </div>
        </div>
      </div>

      <nav
        className="hidden lg:flex justify-center gap-9 order-2 font-display"
        style={{ letterSpacing: "0.18em", fontWeight: 500 }}
        aria-label="Primary"
      >
        {t.links.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            className="text-xs no-underline opacity-85 hover:opacity-100 transition-opacity"
            style={{ color: v1.cream }}
          >
            {label}
          </a>
        ))}
      </nav>

      <div
        className="flex justify-end items-center gap-2 order-2 lg:order-3 font-display text-[11px]"
        style={{ letterSpacing: "0.2em", fontWeight: 500 }}
      >
        <LangLink targetLang="es" current={lang}>
          ES
        </LangLink>
        <span aria-hidden="true" style={{ color: "rgba(201,165,90,0.4)" }}>
          ·
        </span>
        <LangLink targetLang="en" current={lang}>
          EN
        </LangLink>
      </div>
    </header>
  );
}

function LangLink({
  targetLang,
  current,
  children,
}: {
  targetLang: Lang;
  current: Lang;
  children: React.ReactNode;
}) {
  const isActive = current === targetLang;
  return (
    <Link
      href={`/?lang=${targetLang}`}
      replace
      scroll={false}
      aria-current={isActive ? "true" : undefined}
      className="transition-colors"
      style={{
        color: isActive ? v1.goldBright : "rgba(245, 236, 214, 0.4)",
      }}
    >
      {children}
    </Link>
  );
}
