import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "@/lib/i18n";
import type { Lang } from "@shared/domain/lang";

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
    <footer className="text-center px-5 sm:px-10 lg:px-16 py-14 mt-10 border-t border-gold-faint-15">
      <Image
        src="/galgo-astral-logo.png"
        alt=""
        width={1024}
        height={1536}
        aria-hidden="true"
        sizes="(min-width: 640px) 120px, 110px"
        className="w-27.5 sm:w-30 mx-auto mb-4 opacity-90"
      />
      <p className="font-body italic text-base sm:text-lg max-w-md mx-auto text-cream/50">
        {t.quote}
      </p>

      <nav
        className="font-display mt-8 flex flex-wrap justify-center gap-x-4 gap-y-2 text-[11px] tracking-[0.18em] font-medium"
        aria-label="Legal"
      >
        {legalLinks.map((link, i) => (
          <span key={link.href} className="inline-flex items-center gap-x-4">
            <Link
              href={`${link.href}?lang=${lang}`}
              className="no-underline text-gold hover:text-gold-bright transition-colors motion-reduce:transition-none"
            >
              {link.label}
            </Link>
            {i < legalLinks.length - 1 ? (
              <span aria-hidden="true" className="text-gold-faint-35">
                ·
              </span>
            ) : null}
          </span>
        ))}
      </nav>

      <div className="font-display mt-6 text-gold text-[12px] tracking-[0.15em] font-medium">
        {t.credits}
      </div>
    </footer>
  );
}
