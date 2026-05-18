import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "@/lib/i18n";
import type { Lang } from "@shared/domain/lang";
import { v1 } from "@/lib/theme";

type Props = {
  lang: Lang;
  t: Dictionary["footer"];
};

export function SiteFooter({ lang, t }: Props) {
  const legalLinks = [
    { href: "/legal/aviso-legal", label: t.legal.avisoLegal },
    { href: "/legal/privacidad", label: t.legal.privacidad },
    { href: "/legal/terminos", label: t.legal.terminos },
    { href: "/legal/cookies", label: t.legal.cookies },
  ];

  return (
    <footer
      className="text-center px-5 sm:px-10 lg:px-16 py-14 mt-10 border-t"
      style={{ borderColor: v1.goldFaint15 }}
    >
      <SiteFooterStyles />

      <Image
        src="/galgo-astral-logo.png"
        alt=""
        width={1024}
        height={1536}
        aria-hidden="true"
        className="w-27.5 sm:w-30 mx-auto mb-4 opacity-90"
      />
      <p
        className="font-body italic text-base sm:text-lg max-w-md mx-auto"
        style={{ color: "rgba(245, 236, 214, 0.5)" }}
      >
        {t.quote}
      </p>

      <nav
        className="font-display mt-8 flex flex-wrap justify-center gap-x-4 gap-y-2"
        aria-label="Legal"
        style={{
          fontSize: 11,
          letterSpacing: "0.18em",
          fontWeight: 500,
        }}
      >
        {legalLinks.map((link, i) => (
          <span key={link.href} className="inline-flex items-center gap-x-4">
            <Link
              href={`${link.href}?lang=${lang}`}
              className="site-footer-link no-underline"
              style={{ color: v1.gold }}
            >
              {link.label}
            </Link>
            {i < legalLinks.length - 1 ? (
              <span aria-hidden="true" style={{ color: v1.goldFaint35 }}>
                ·
              </span>
            ) : null}
          </span>
        ))}
      </nav>

      <div
        className="font-display mt-6"
        style={{
          color: v1.gold,
          fontSize: 12,
          letterSpacing: "0.15em",
          fontWeight: 500,
        }}
      >
        {t.credits}
      </div>
    </footer>
  );
}

function SiteFooterStyles() {
  return (
    <style>{`
      .site-footer-link { transition: color 0.2s; }
      .site-footer-link:hover { color: ${v1.goldBright}; }
      @media (prefers-reduced-motion: reduce) {
        .site-footer-link { transition: none !important; }
      }
    `}</style>
  );
}
