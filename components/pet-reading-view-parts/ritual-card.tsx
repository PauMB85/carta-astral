import { v1 } from "@/lib/theme";
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
      className="relative my-9 p-8"
      style={{
        background: `linear-gradient(180deg, rgba(26,22,13,0.85), rgba(11,10,8,0.85))`,
        border: `1px solid ${v1.gold}`,
        boxShadow: `0 0 32px rgba(231,201,122,0.08)`,
      }}
    >
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          top: -1,
          left: -1,
          width: 14,
          height: 14,
          borderTop: `1px solid ${v1.goldBright}`,
          borderLeft: `1px solid ${v1.goldBright}`,
        }}
      />
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: -1,
          right: -1,
          width: 14,
          height: 14,
          borderBottom: `1px solid ${v1.goldBright}`,
          borderRight: `1px solid ${v1.goldBright}`,
        }}
      />

      <div
        className="font-display"
        style={{
          color: v1.gold,
          fontSize: 10,
          letterSpacing: "0.45em",
          fontWeight: 500,
        }}
      >
        {eyebrow}
      </div>

      <h3
        className="font-body italic mt-3 mb-4 m-0"
        style={{
          color: v1.cream,
          fontSize: 26,
          fontWeight: 400,
          lineHeight: 1.15,
        }}
      >
        {title}
      </h3>

      {description ? (
        <p
          className="font-body italic m-0"
          style={{
            color: v1.cream,
            fontSize: 17,
            lineHeight: 1.6,
            opacity: 0.95,
          }}
        >
          {description}
        </p>
      ) : null}

      {steps.length > 0 ? (
        <div className="mt-5 flex flex-col gap-2.5">
          {steps.map((step, i) => (
            <div key={i} className="flex gap-3.5">
              <span
                className="font-display shrink-0 pt-1"
                style={{
                  color: v1.goldBright,
                  fontSize: 10,
                  letterSpacing: "0.3em",
                  fontWeight: 500,
                  minWidth: 28,
                }}
              >
                {toRoman(i)}
              </span>
              <span
                className="font-body italic"
                style={{ color: v1.dim, fontSize: 16 }}
              >
                {step}
              </span>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
