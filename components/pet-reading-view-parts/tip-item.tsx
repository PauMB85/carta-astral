import { v1 } from "@/lib/theme";
import { toRoman } from "@/components/pet-reading-view-parts/roman";

type Props = {
  index: number;
  text: string;
};

export function TipItem({ index, text }: Props) {
  return (
    <div
      className="flex gap-4 items-start px-5 py-4"
      style={{
        border: `1px solid ${v1.goldFaint15}`,
        background: "rgba(26, 22, 13, 0.4)",
      }}
    >
      <span
        className="font-display shrink-0 pt-0.5"
        style={{
          color: v1.gold,
          fontSize: 11,
          letterSpacing: "0.25em",
          fontWeight: 500,
          minWidth: 32,
        }}
      >
        {toRoman(index)}
      </span>
      <span
        className="font-body italic"
        style={{ color: v1.cream, fontSize: 17, lineHeight: 1.5 }}
      >
        {text}
      </span>
    </div>
  );
}
