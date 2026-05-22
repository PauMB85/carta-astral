import { GalgoProgress, GalgoSpinner } from "@/components/galgo-spinner";

type Props = {
  title: string;
  sub: string;
  quote?: string;
};

export function PetLoading({ title, sub, quote }: Props) {
  return (
    <section
      className="min-h-[70vh] flex flex-col items-center justify-center gap-12 px-5 py-16"
      role="status"
      aria-live="polite"
    >
      <GalgoSpinner size="lg" />

      <div className="text-center max-w-140">
        <h2 className="font-body italic m-0 text-[26px] sm:text-[32px] leading-tight text-cream tracking-[-0.005em]">
          <Deco />
          <span>{title}</span>
          <span
            aria-hidden="true"
            className="inline-block w-[1.4em] text-left after:content-[''] after:animate-pet-loading-dots motion-reduce:after:animate-none"
          />
          <Deco />
        </h2>
        <p className="font-body italic max-w-115 mx-auto mt-2 mb-0 text-[17px] leading-normal text-dim">
          {sub}
        </p>
      </div>

      <GalgoProgress />

      {quote ? <QuoteBox text={quote} /> : null}
    </section>
  );
}

function Deco() {
  return (
    <span
      aria-hidden="true"
      className="hidden sm:inline-block font-display text-gold-bright text-[0.55em] align-[0.45em] mx-3.5 opacity-90 -translate-y-px before:content-['✦']"
    />
  );
}

function QuoteBox({ text }: { text: string }) {
  return (
    <div className="mx-auto max-w-120 px-5.5 py-4 border border-[rgb(201_165_90/28%)] bg-ink/40 text-cream italic text-base leading-normal flex items-center gap-3.5 justify-center">
      <span aria-hidden="true" className="text-gold-bright text-sm shrink-0">
        ✦
      </span>
      <span>{text}</span>
    </div>
  );
}
