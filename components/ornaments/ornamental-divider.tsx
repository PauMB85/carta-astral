import { Diamond } from "./diamond";

type Props = {
  width?: "sm" | "md" | "lg";
  className?: string;
};

const widthMap: Record<NonNullable<Props["width"]>, string> = {
  sm: "w-8",
  md: "w-16",
  lg: "w-24",
};

export function OrnamentalDivider({ width = "md", className = "" }: Props) {
  const w = widthMap[width];
  return (
    <div
      className={`flex items-center justify-center gap-3 ${className}`.trim()}
      aria-hidden="true"
    >
      <span className={`h-px ${w} divider-line`} />
      <Diamond small />
      <span className={`h-px ${w} divider-line`} />
    </div>
  );
}
