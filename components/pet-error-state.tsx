import Link from "next/link";

type Props = {
  title: string;
  text: string;
  ctaLabel: string;
  ctaHref?: string;
  onCtaAction?: () => void;
};

const CTA_CLASSNAME =
  "font-display inline-flex items-center gap-3 mt-3 no-underline cursor-pointer transition-colors text-gold-bright bg-transparent border border-gold py-3.5 px-9 text-[11px] tracking-[0.3em] font-medium";

export function PetErrorState({
  title,
  text,
  ctaLabel,
  ctaHref,
  onCtaAction,
}: Props) {
  return (
    <section
      className="min-h-[70vh] flex flex-col items-center justify-center text-center px-5 py-16 gap-7"
      role="status"
    >
      <div className="rounded-full flex items-center justify-center w-22 h-22 border border-err-bd bg-err-bg">
        <svg
          width="44"
          height="44"
          viewBox="0 0 44 44"
          fill="none"
          stroke="var(--color-err-ink)"
          strokeWidth="1.2"
          aria-hidden="true"
        >
          <circle cx="22" cy="22" r="18" />
          <circle cx="22" cy="22" r="12" strokeDasharray="2 3" />
          <line x1="22" y1="4" x2="22" y2="14" />
          <line x1="22" y1="30" x2="22" y2="40" />
          <line x1="4" y1="22" x2="14" y2="22" />
          <line x1="30" y1="22" x2="40" y2="22" />
          <circle cx="22" cy="22" r="1.5" fill="var(--color-err-ink)" stroke="none" />
        </svg>
      </div>

      <h2 className="font-body italic m-0 text-3xl sm:text-4xl font-normal max-w-md leading-tight text-cream">
        {title}
      </h2>

      <p className="font-body italic m-0 max-w-md text-base sm:text-lg leading-relaxed text-dim">
        {text}
      </p>

      {ctaHref ? (
        <Link href={ctaHref} className={CTA_CLASSNAME}>
          <span>{ctaLabel}</span>
          <span aria-hidden="true">→</span>
        </Link>
      ) : onCtaAction ? (
        <button
          type="button"
          onClick={onCtaAction}
          className={CTA_CLASSNAME}
        >
          <span>{ctaLabel}</span>
          <span aria-hidden="true">→</span>
        </button>
      ) : null}
    </section>
  );
}
