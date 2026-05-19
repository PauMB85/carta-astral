import { toRoman } from "@/components/pet-reading-view-parts/roman";

type Props = {
  index: number;
  title: string;
  content: string;
};

export function HighlightItem({ index, title, content }: Props) {
  return (
    <div className="flex items-start gap-4 py-3">
      <span
        className="font-display shrink-0 text-gold-bright text-lg min-w-7 text-center"
        aria-hidden="true"
      >
        {toRoman(index)}
      </span>
      <div className="font-body italic text-cream text-lg leading-[1.45]">
        <strong className="font-display block mb-1 not-italic font-medium text-[11px] tracking-[0.22em] text-gold">
          {title}
        </strong>
        {content}
      </div>
    </div>
  );
}
