import Link from "next/link";
import { v1 } from "@/lib/theme";

type Props = {
  title: string;
  text: string;
  ctaLabel: string;
  ctaHref: string;
};

export function PetErrorState({ title, text, ctaLabel, ctaHref }: Props) {
  return (
    <section
      className="min-h-[70vh] flex flex-col items-center justify-center text-center px-5 py-16 gap-7"
      role="status"
    >
      <div
        className="rounded-full flex items-center justify-center"
        style={{
          width: 88,
          height: 88,
          border: `1px solid ${v1.errBd}`,
          background: v1.errBg,
        }}
      >
        <svg
          width="44"
          height="44"
          viewBox="0 0 44 44"
          fill="none"
          stroke={v1.errInk}
          strokeWidth="1.2"
          aria-hidden="true"
        >
          <circle cx="22" cy="22" r="18" />
          <circle cx="22" cy="22" r="12" strokeDasharray="2 3" />
          <line x1="22" y1="4" x2="22" y2="14" />
          <line x1="22" y1="30" x2="22" y2="40" />
          <line x1="4" y1="22" x2="14" y2="22" />
          <line x1="30" y1="22" x2="40" y2="22" />
          <circle cx="22" cy="22" r="1.5" fill={v1.errInk} stroke="none" />
        </svg>
      </div>

      <h2
        className="font-body italic m-0 text-3xl sm:text-4xl font-normal max-w-md leading-tight"
        style={{ color: v1.cream }}
      >
        {title}
      </h2>

      <p
        className="font-body italic m-0 max-w-md text-base sm:text-lg leading-relaxed"
        style={{ color: v1.dim }}
      >
        {text}
      </p>

      <Link
        href={ctaHref}
        className="font-display inline-flex items-center gap-3 mt-3 no-underline transition-colors"
        style={{
          color: v1.goldBright,
          border: `1px solid ${v1.gold}`,
          padding: "14px 36px",
          fontSize: 11,
          letterSpacing: "0.3em",
          fontWeight: 500,
        }}
      >
        <span>{ctaLabel}</span>
        <span aria-hidden="true">→</span>
      </Link>
    </section>
  );
}
