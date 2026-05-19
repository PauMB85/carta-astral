import { toRoman } from "@/components/pet-reading-view-parts/roman";

type Props = {
  eyebrow: string;
  title: string;
  description: string;
  steps: string[];
};

export function RitualCard({ eyebrow, title, description, steps }: Props) {
  return (
    <div
      className="relative my-9 p-8 border border-gold shadow-[0_0_32px_rgba(231,201,122,0.08)]"
      style={{
        background: `linear-gradient(180deg, rgba(26,22,13,0.85), rgba(11,10,8,0.85))`,
      }}
    >
      <span
        aria-hidden="true"
        className="absolute -top-px -left-px w-3.5 h-3.5 border-t border-l border-gold-bright"
      />
      <span
        aria-hidden="true"
        className="absolute -bottom-px -right-px w-3.5 h-3.5 border-b border-r border-gold-bright"
      />

      <div className="font-display text-gold text-[10px] tracking-[0.45em] font-medium">
        {eyebrow}
      </div>

      <h3 className="font-body italic mt-3 mb-4 m-0 text-cream text-[26px] font-normal leading-[1.15]">
        {title}
      </h3>

      {description ? (
        <p className="font-body italic m-0 text-cream/95 text-[17px] leading-[1.6]">
          {description}
        </p>
      ) : null}

      {steps.length > 0 ? (
        <div className="mt-5 flex flex-col gap-2.5">
          {steps.map((step, i) => (
            <div key={i} className="flex gap-3.5">
              <span className="font-display shrink-0 pt-1 text-gold-bright text-[10px] tracking-[0.3em] font-medium min-w-7">
                {toRoman(i)}
              </span>
              <span className="font-body italic text-dim text-base">
                {step}
              </span>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
