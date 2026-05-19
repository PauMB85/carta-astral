import { AstrolabeLoader } from "@/components/astrolabe-loader";

type Props = {
  title: string;
  sub: string;
};

export function PetLoading({ title, sub }: Props) {
  return (
    <section
      className="min-h-[70vh] flex flex-col items-center justify-center gap-9 px-5 py-16"
      role="status"
      aria-live="polite"
    >
      <AstrolabeLoader />

      <div className="text-center max-w-md">
        <p className="font-body italic m-0 text-2xl sm:text-[28px] leading-snug text-cream">
          {title}
          <span
            aria-hidden="true"
            className="after:content-[''] after:animate-pet-loading-dots motion-reduce:after:animate-none"
          />
        </p>
        <p className="font-display mt-5 m-0 text-dim text-[11px] tracking-[0.4em] font-medium">
          {sub}
        </p>
      </div>
    </section>
  );
}
