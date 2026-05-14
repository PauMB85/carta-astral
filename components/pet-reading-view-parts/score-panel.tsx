import { v1 } from "@/lib/theme";

type Props = {
  label: string | undefined;
  value: number | undefined;
  explanation: string | undefined;
};

export function ScorePanel({ label, value, explanation }: Props) {
  return (
    <div
      className="relative mt-8 mb-6 text-center"
      style={{
        background: v1.ink,
        border: `1px solid ${v1.goldFaint25}`,
        padding: "36px 28px",
      }}
    >
      <span
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{ inset: 6, border: `1px solid ${v1.goldFaint15}` }}
      />

      {value !== undefined ? (
        <div
          className="font-display"
          style={{
            color: v1.goldBright,
            fontSize: 84,
            fontWeight: 500,
            lineHeight: 1,
            textShadow: `0 0 24px ${v1.goldGlow}`,
          }}
        >
          {value}
        </div>
      ) : null}

      {label ? (
        <div
          className="font-display mt-3"
          style={{
            color: v1.gold,
            fontSize: 11,
            letterSpacing: "0.4em",
            fontWeight: 500,
          }}
        >
          {label}
        </div>
      ) : null}

      {value !== undefined ? (
        <div
          className="mx-auto mt-5 mb-3 relative"
          style={{
            width: "100%",
            maxWidth: 340,
            height: 1,
            background: v1.goldFaint15,
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 0,
              top: -1,
              height: 3,
              width: `${value}%`,
              background: `linear-gradient(90deg, ${v1.gold}, ${v1.goldBright})`,
              boxShadow: `0 0 10px ${v1.goldGlow}`,
            }}
          />
        </div>
      ) : null}

      {explanation ? (
        <p
          className="font-body italic mt-4 mx-auto"
          style={{
            color: v1.cream,
            fontSize: 19,
            maxWidth: 460,
            lineHeight: 1.4,
          }}
        >
          “{explanation}”
        </p>
      ) : null}
    </div>
  );
}
