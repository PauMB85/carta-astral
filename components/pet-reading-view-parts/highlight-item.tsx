import { v1 } from "@/lib/theme";
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
        className="font-display shrink-0"
        aria-hidden="true"
        style={{
          color: v1.goldBright,
          fontSize: 18,
          minWidth: 28,
          textAlign: "center",
        }}
      >
        {toRoman(index)}
      </span>
      <div
        className="font-body italic"
        style={{ color: v1.cream, fontSize: 18, lineHeight: 1.45 }}
      >
        <strong
          className="font-display block mb-1"
          style={{
            fontStyle: "normal",
            fontWeight: 500,
            fontSize: 11,
            letterSpacing: "0.22em",
            color: v1.gold,
          }}
        >
          {title}
        </strong>
        {content}
      </div>
    </div>
  );
}
