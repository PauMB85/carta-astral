import { toRoman } from "@/components/pet-reading-view-parts/roman";

type Props = {
  index: number;
  text: string;
};

export function TipItem({ index, text }: Props) {
  return (
    <div className="flex gap-4 items-start px-5 py-4 border border-gold-faint-15 bg-ink/40">
      <span className="font-display shrink-0 pt-0.5 text-gold text-[11px] tracking-[0.25em] font-medium min-w-8">
        {toRoman(index)}
      </span>
      <span className="font-body italic text-cream text-[17px] leading-normal">
        {text}
      </span>
    </div>
  );
}
