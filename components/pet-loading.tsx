type Props = {
  title: string;
  sub: string;
};

const TICKS = Array.from({ length: 12 }, (_, i) => i);
const PLANETS = [20, 100, 200, 290] as const;

const round = (n: number) => Math.round(n * 1000) / 1000;

const GOLD = "var(--color-gold)";
const GOLD_BRIGHT = "var(--color-gold-bright)";

export function PetLoading({ title, sub }: Props) {
  return (
    <section
      className="min-h-[70vh] flex flex-col items-center justify-center gap-9 px-5 py-16"
      role="status"
      aria-live="polite"
    >
      <div className="relative w-44 h-44">
        <svg
          viewBox="0 0 180 180"
          width="180"
          height="180"
          aria-hidden="true"
          className="animate-pet-loading-spin motion-reduce:animate-none origin-center"
        >
          <defs>
            <radialGradient id="petLoadingBg" cx="0.5" cy="0.5" r="0.6">
              <stop offset="0%" stopColor="var(--color-ink)" />
              <stop offset="100%" stopColor="var(--color-dark)" />
            </radialGradient>
          </defs>

          <circle
            cx="90"
            cy="90"
            r="86"
            fill="url(#petLoadingBg)"
            stroke={GOLD}
            strokeWidth="0.6"
            opacity="0.85"
          />
          <circle
            cx="90"
            cy="90"
            r="78"
            fill="none"
            stroke={GOLD}
            strokeWidth="0.4"
            opacity="0.5"
          />
          <circle
            cx="90"
            cy="90"
            r="56"
            fill="none"
            stroke={GOLD}
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
                x1={round(90 + Math.cos(a) * r1)}
                y1={round(90 + Math.sin(a) * r1)}
                x2={round(90 + Math.cos(a) * r2)}
                y2={round(90 + Math.sin(a) * r2)}
                stroke={GOLD_BRIGHT}
                strokeWidth="0.7"
                opacity="0.7"
              />
            );
          })}

          {PLANETS.map((a, i) => {
            const ra = (a * Math.PI) / 180 - Math.PI / 2;
            const x = round(90 + Math.cos(ra) * 56);
            const y = round(90 + Math.sin(ra) * 56);
            return (
              <g key={i}>
                <circle
                  cx={x}
                  cy={y}
                  r="2.5"
                  fill="none"
                  stroke={GOLD_BRIGHT}
                  strokeWidth="0.6"
                  opacity="0.8"
                />
                <circle cx={x} cy={y} r="1" fill={GOLD_BRIGHT} />
              </g>
            );
          })}

          <circle cx="90" cy="90" r="2" fill={GOLD_BRIGHT} />
        </svg>

        <div className="absolute inset-0 flex items-center justify-center animate-pet-loading-pulse motion-reduce:animate-none">
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
                <stop offset="0%" stopColor={GOLD_BRIGHT} />
                <stop offset="100%" stopColor={GOLD} />
              </linearGradient>
            </defs>
            <path
              d="M 22 12 a 18 18 0 1 0 14 28 a 14 14 0 1 1 -14 -28 z"
              fill="url(#petLoadingMoon)"
              stroke={GOLD}
              strokeWidth="0.6"
            />
          </svg>
        </div>
      </div>

      <div className="text-center max-w-md">
        <p className="font-body italic m-0 text-2xl sm:text-[28px] leading-snug text-cream">
          {title}
          <span
            aria-hidden="true"
            className="after:content-[''] after:animate-pet-loading-dots motion-reduce:after:animate-none"
          />
        </p>
        <p className="font-display mt-5 m-0 text-dim text-[11px] tracking-[0.4em] font-medium">
          {sub}
        </p>
      </div>
    </section>
  );
}
