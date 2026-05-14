import { v1 } from "@/lib/theme";

type Props = {
  title: string;
  content: string;
};

export function NarrativeSection({ title, content }: Props) {
  return (
    <div className="my-6">
      <div
        className="font-display mb-3"
        style={{
          color: v1.goldBright,
          fontSize: 13,
          letterSpacing: "0.28em",
          fontWeight: 500,
        }}
      >
        {title}
      </div>
      <div
        className="font-body italic"
        style={{ color: v1.cream, fontSize: 18, lineHeight: 1.65 }}
      >
        {content
          .split(/\n+/)
          .filter((p) => p.trim().length > 0)
          .map((p, i) => (
            <p key={i} className="m-0 mb-3 last:mb-0">
              {p}
            </p>
          ))}
      </div>
    </div>
  );
}
