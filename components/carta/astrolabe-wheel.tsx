import { Sun } from "lucide-react";

const ZODIAC_ABBR = [
  "ARI",
  "TAU",
  "GEM",
  "CAN",
  "LEO",
  "VIR",
  "LIB",
  "SCO",
  "SAG",
  "CAP",
  "AQU",
  "PIS",
];

export function AstrolabeWheel() {
  return (
    <div
      className="relative w-52 h-52 sm:w-60 sm:h-60 mx-auto mb-6"
      aria-hidden="true"
    >
      <div className="absolute inset-0 rotate-slow">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <defs>
            <radialGradient id="wheelGrad">
              <stop offset="60%" stopColor="transparent" />
              <stop offset="100%" stopColor="rgba(212,175,55,0.15)" />
            </radialGradient>
          </defs>
          <circle
            cx="100"
            cy="100"
            r="92"
            fill="none"
            stroke="rgba(212,175,55,0.3)"
            strokeWidth="0.5"
          />
          <circle
            cx="100"
            cy="100"
            r="78"
            fill="none"
            stroke="rgba(212,175,55,0.5)"
            strokeWidth="0.3"
            strokeDasharray="2 3"
          />
          <circle
            cx="100"
            cy="100"
            r="62"
            fill="url(#wheelGrad)"
            stroke="rgba(212,175,55,0.3)"
            strokeWidth="0.3"
          />
          {ZODIAC_ABBR.map((abbr, i) => {
            const angle = (i * 30 - 90) * (Math.PI / 180);
            const x = 100 + 86 * Math.cos(angle);
            const y = 100 + 86 * Math.sin(angle);
            return (
              <text
                key={abbr}
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#e8c867"
                fontSize="6"
                fontFamily="var(--font-cinzel), serif"
                letterSpacing="1.5"
                transform={`rotate(${i * 30} ${x} ${y})`}
                style={{ filter: "drop-shadow(0 0 2px rgba(212,175,55,0.5))" }}
              >
                {abbr}
              </text>
            );
          })}
          {ZODIAC_ABBR.map((_, i) => {
            const a = (i * 30 - 90) * (Math.PI / 180);
            return (
              <line
                key={`tick-${i}`}
                x1={100 + 62 * Math.cos(a)}
                y1={100 + 62 * Math.sin(a)}
                x2={100 + 78 * Math.cos(a)}
                y2={100 + 78 * Math.sin(a)}
                stroke="rgba(212,175,55,0.4)"
                strokeWidth="0.4"
              />
            );
          })}
          {ZODIAC_ABBR.map((_, i) => {
            const a = (i * 30) * (Math.PI / 180);
            const x = 100 + 50 * Math.cos(a);
            const y = 100 + 50 * Math.sin(a);
            return (
              <circle
                key={`dot-${i}`}
                cx={x}
                cy={y}
                r="0.6"
                fill="rgba(212,175,55,0.5)"
              />
            );
          })}
        </svg>
      </div>
      <div className="absolute inset-10 rotate-slow-rev">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <circle
            cx="100"
            cy="100"
            r="80"
            fill="none"
            stroke="rgba(212,175,55,0.25)"
            strokeWidth="0.3"
            strokeDasharray="1 4"
          />
          <g stroke="rgba(212,175,55,0.35)" strokeWidth="0.3" fill="none">
            <polygon points="100,40 152,130 48,130" />
            <polygon points="100,160 48,70 152,70" />
          </g>
        </svg>
      </div>
      <div className="absolute inset-0 flex items-center justify-center float-slow">
        <div className="relative">
          <span className="absolute inset-0 blur-xl bg-amber-400/40 rounded-full" />
          <Sun
            className="relative w-9 h-9 text-starlight-200"
            strokeWidth={1}
            style={{ filter: "drop-shadow(0 0 8px rgba(255, 220, 130, 0.8))" }}
          />
        </div>
      </div>
    </div>
  );
}
