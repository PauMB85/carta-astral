import { v1 } from "@/lib/theme";

type Props = {
  title: string;
  sub: string;
};

const TICKS = Array.from({ length: 12 }, (_, i) => i);
const PLANETS = [20, 100, 200, 290] as const;

export function PetLoading({ title, sub }: Props) {
  return (
    <section
      className="min-h-[70vh] flex flex-col items-center justify-center gap-9 px-5 py-16"
      role="status"
      aria-live="polite"
    >
      <PetLoadingStyles />

      <div className="relative w-44 h-44 pet-loading-ring">
        <svg
          viewBox="0 0 180 180"
          width="180"
          height="180"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="petLoadingBg" cx="0.5" cy="0.5" r="0.6">
              <stop offset="0%" stopColor={v1.ink} />
              <stop offset="100%" stopColor={v1.dark} />
            </radialGradient>
          </defs>

          <circle
            cx="90"
            cy="90"
            r="86"
            fill="url(#petLoadingBg)"
            stroke={v1.gold}
            strokeWidth="0.6"
            opacity="0.85"
          />
          <circle
            cx="90"
            cy="90"
            r="78"
            fill="none"
            stroke={v1.gold}
            strokeWidth="0.4"
            opacity="0.5"
          />
          <circle
            cx="90"
            cy="90"
            r="56"
            fill="none"
            stroke={v1.gold}
            strokeWidth="0.4"
            opacity="0.45"
          />

          {TICKS.map((i) => {
            const a = (i * 30 * Math.PI) / 180 - Math.PI / 2;
            const r1 = 86;
            const r2 = 78;
            return (
              <line
                key={i}
                x1={90 + Math.cos(a) * r1}
                y1={90 + Math.sin(a) * r1}
                x2={90 + Math.cos(a) * r2}
                y2={90 + Math.sin(a) * r2}
                stroke={v1.goldBright}
                strokeWidth="0.7"
                opacity="0.7"
              />
            );
          })}

          {PLANETS.map((a, i) => {
            const ra = (a * Math.PI) / 180 - Math.PI / 2;
            const x = 90 + Math.cos(ra) * 56;
            const y = 90 + Math.sin(ra) * 56;
            return (
              <g key={i}>
                <circle
                  cx={x}
                  cy={y}
                  r="2.5"
                  fill="none"
                  stroke={v1.goldBright}
                  strokeWidth="0.6"
                  opacity="0.8"
                />
                <circle cx={x} cy={y} r="1" fill={v1.goldBright} />
              </g>
            );
          })}

          <circle cx="90" cy="90" r="2" fill={v1.goldBright} />
        </svg>

        <div className="absolute inset-0 flex items-center justify-center pet-loading-crescent">
          <svg
            width="60"
            height="60"
            viewBox="0 0 60 60"
            aria-hidden="true"
          >
            <defs>
              <linearGradient
                id="petLoadingMoon"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor={v1.goldBright} />
                <stop offset="100%" stopColor={v1.gold} />
              </linearGradient>
            </defs>
            <path
              d="M 22 12 a 18 18 0 1 0 14 28 a 14 14 0 1 1 -14 -28 z"
              fill="url(#petLoadingMoon)"
              stroke={v1.gold}
              strokeWidth="0.6"
            />
          </svg>
        </div>
      </div>

      <div className="text-center max-w-md">
        <p
          className="font-body italic m-0 text-2xl sm:text-[28px] leading-snug"
          style={{ color: v1.cream }}
        >
          {title}
          <span aria-hidden="true" className="pet-loading-dots" />
        </p>
        <p
          className="font-display mt-5 m-0"
          style={{
            color: v1.dim,
            fontSize: 11,
            letterSpacing: "0.4em",
            fontWeight: 500,
          }}
        >
          {sub}
        </p>
      </div>
    </section>
  );
}

function PetLoadingStyles() {
  return (
    <style>{`
      .pet-loading-ring svg { animation: pet-loading-spin 24s linear infinite; transform-origin: 50% 50%; }
      .pet-loading-crescent { animation: pet-loading-pulse 3s ease-in-out infinite; }
      .pet-loading-dots::after { content: ''; animation: pet-loading-dots 1.6s steps(4) infinite; }
      @keyframes pet-loading-spin { to { transform: rotate(360deg); } }
      @keyframes pet-loading-pulse { 0%, 100% { opacity: 0.85; } 50% { opacity: 1; } }
      @keyframes pet-loading-dots { 0% { content: ''; } 25% { content: '.'; } 50% { content: '..'; } 75% { content: '...'; } }
      @media (prefers-reduced-motion: reduce) {
        .pet-loading-ring svg,
        .pet-loading-crescent,
        .pet-loading-dots::after { animation: none !important; }
      }
    `}</style>
  );
}
