import type { Dictionary } from "@/lib/i18n";

type Props = {
  t: Dictionary["pillars"];
};

export function Pillars({ t }: Props) {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-3 gap-px mx-5 sm:mx-10 lg:mx-16 my-10 bg-gold-faint-15 border border-gold-faint-15">
      {t.map((p) => (
        <div key={p.roman} className="px-8 py-12 sm:py-14 text-center bg-dark">
          <div className="font-display mb-4 leading-none text-gold-bright text-[26px] font-medium">
            {p.roman}
          </div>
          <div className="font-display mb-3 uppercase text-gold text-[13px] tracking-[0.25em] font-medium">
            {p.title}
          </div>
          <div className="font-body italic text-base sm:text-lg leading-relaxed text-cream/75">
            {p.body}
          </div>
        </div>
      ))}
    </section>
  );
}
