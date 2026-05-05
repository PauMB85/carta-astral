import { Diamond } from "@/components/ornaments/diamond";

type Props = {
  highlights: string[];
};

export function ReadingHighlights({ highlights }: Props) {
  if (!highlights?.length) return null;
  return (
    <div className="mb-10 fade-up" style={{ animationDelay: "0.15s" }}>
      <p className="font-display text-[10px] uppercase tracking-[0.35em] text-starlight-200/60 text-center mb-5">
        ideas clave
      </p>
      <ul className="grid sm:grid-cols-2 gap-3">
        {highlights.map((item, i) => (
          <li
            key={i}
            className="flex items-start gap-3 p-4"
            style={{
              background: "rgba(212, 175, 55, 0.04)",
              border: "1px solid rgba(212, 175, 55, 0.18)",
            }}
          >
            <span className="mt-1.5 flex-shrink-0">
              <Diamond small />
            </span>
            <span className="font-body text-base text-starlight-50/90 leading-relaxed">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
