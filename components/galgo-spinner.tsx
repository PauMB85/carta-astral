import { useId } from "react";

const STARS = [
  { top: "14%", left: "78%", delay: "0s" },
  { top: "52%", left: "96%", delay: "0.6s" },
  { top: "84%", left: "28%", delay: "1.2s" },
  { top: "30%", left: "6%", delay: "0.3s" },
  { top: "70%", left: "80%", delay: "1.8s" },
  { top: "8%", left: "36%", delay: "0.9s" },
];

const SIZE = {
  lg: { container: "w-90 h-90", moon: "w-9 h-9 -top-3.5", showStars: true },
  md: { container: "w-60 h-60", moon: "w-6 h-6 -top-3", showStars: false },
} as const;

type SpinnerProps = {
  size?: keyof typeof SIZE;
  className?: string;
};

const HALO_BG =
  "radial-gradient(circle, rgb(231 201 122 / 18%) 0%, rgb(231 201 122 / 6%) 38%, transparent 65%)";

export function GalgoSpinner({ size = "lg", className }: SpinnerProps) {
  const id = useId();
  const cfg = SIZE[size];

  return (
    <div
      className={`relative ${cfg.container} ${className ?? ""}`}
      role="status"
      aria-label="Cargando"
    >
      <div
        aria-hidden="true"
        className="absolute inset-[-10%] rounded-full animate-spinner-halo motion-reduce:animate-none"
        style={{ background: HALO_BG }}
      />

      <div
        aria-hidden="true"
        className="absolute inset-[6%] rounded-full border border-gold-faint-15 shadow-[inset_0_0_22px_rgb(231_201_122/6%),0_0_24px_rgb(201_165_90/8%)]"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-full border border-dashed border-[rgb(231_201_122/28%)]"
      />

      {cfg.showStars
        ? STARS.map((s, i) => (
            <span
              key={i}
              aria-hidden="true"
              className="absolute w-1.5 h-1.5 -translate-x-1/2 -translate-y-1/2 text-gold-warm before:content-[''] before:absolute before:inset-0 before:bg-current before:opacity-90 before:[clip-path:polygon(50%_0%,56%_44%,100%_50%,56%_56%,50%_100%,44%_56%,0%_50%,44%_44%)] animate-spinner-twinkle motion-reduce:animate-none"
              style={{
                top: s.top,
                left: s.left,
                animationDelay: s.delay,
              }}
            />
          ))
        : null}

      <div
        aria-hidden="true"
        className="absolute inset-0 animate-spinner-moon motion-reduce:animate-none"
      >
        <div
          className={`absolute left-1/2 -translate-x-1/2 ${cfg.moon}`}
        >
          <div className="w-full h-full animate-spinner-moon-counter motion-reduce:animate-none origin-center">
            <svg
              viewBox="0 0 36 36"
              className="w-full h-full drop-shadow-[0_0_8px_rgb(244_212_136/70%)]"
              aria-hidden="true"
            >
              <defs>
                <linearGradient
                  id={`moon-grad-${id}`}
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="1"
                >
                  <stop offset="0%" stopColor="var(--color-gold-warm)" />
                  <stop offset="100%" stopColor="var(--color-gold)" />
                </linearGradient>
                <mask id={`moon-mask-${id}`}>
                  <rect width="36" height="36" fill="black" />
                  <circle cx="14" cy="18" r="13" fill="white" />
                  <circle cx="19" cy="17" r="12" fill="black" />
                </mask>
              </defs>
              <rect
                width="36"
                height="36"
                fill={`url(#moon-grad-${id})`}
                mask={`url(#moon-mask-${id})`}
              />
            </svg>
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-[12%] bg-contain bg-no-repeat bg-center animate-spinner-glow motion-reduce:animate-none"
        style={{ backgroundImage: "url(/galgo-astral-logo.png)" }}
      />
    </div>
  );
}

const TAIL_BG =
  "linear-gradient(to left, rgb(244 212 136 / 95%) 0%, rgb(244 212 136 / 55%) 22%, rgb(244 212 136 / 22%) 55%, transparent 100%)";

const HEAD_HALO_BG =
  "radial-gradient(circle, rgb(244 212 136 / 55%) 0%, rgb(244 212 136 / 18%) 35%, transparent 72%)";

export function GalgoProgress({ className }: { className?: string }) {
  return (
    <div
      className={`grid grid-cols-[auto_1fr_auto] items-center gap-3.5 max-w-115 w-full ${className ?? ""}`}
      aria-hidden="true"
    >
      <SunIcon />
      <ProgressLine />
      <MoonIcon />
    </div>
  );
}

function SunIcon() {
  return (
    <span className="block w-6.5 h-6.5 text-gold-bright" aria-hidden="true">
      <svg viewBox="0 0 28 28" fill="none" className="w-full h-full block">
        <circle
          cx="14"
          cy="14"
          r="3.2"
          stroke="currentColor"
          strokeWidth="1"
        />
        <g
          transform="translate(14 14)"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
        >
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <line
              key={deg}
              x1="6"
              y1="0"
              x2="12"
              y2="0"
              transform={`rotate(${deg})`}
            />
          ))}
          <g strokeWidth="0.85">
            {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map(
              (deg) => (
                <line
                  key={deg}
                  x1="5.5"
                  y1="0"
                  x2="8.8"
                  y2="0"
                  transform={`rotate(${deg})`}
                />
              ),
            )}
          </g>
        </g>
      </svg>
    </span>
  );
}

function MoonIcon() {
  const id = useId();
  return (
    <span className="block w-6.5 h-6.5 text-gold-bright" aria-hidden="true">
      <svg viewBox="0 0 26 26" className="w-full h-full block">
        <defs>
          <mask id={`progress-moon-${id}`}>
            <rect width="26" height="26" fill="black" />
            <circle cx="10" cy="13" r="9" fill="white" />
            <circle cx="13.5" cy="12.4" r="8.4" fill="black" />
          </mask>
        </defs>
        <rect
          width="26"
          height="26"
          fill="currentColor"
          mask={`url(#progress-moon-${id})`}
        />
      </svg>
    </span>
  );
}

function ProgressLine() {
  return (
    <div className="relative h-5.5 flex items-center overflow-visible">
      <div className="w-full flex justify-between items-center">
        {Array.from({ length: 11 }, (_, i) => (
          <span
            key={i}
            className="w-0.75 h-0.75 bg-[rgb(201_165_90/60%)] rounded-full shrink-0"
          />
        ))}
      </div>
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-0 w-0 h-0 animate-spinner-comet motion-reduce:animate-none"
      >
        <div
          className="absolute top-0 left-0 w-16 h-0.5 blur-[0.4px] animate-spinner-tail motion-reduce:animate-none"
          style={{ background: TAIL_BG }}
        />
        <div className="absolute top-0 left-0 w-3 h-3 -translate-x-1/2 -translate-y-1/2 text-gold-warm">
          <span className="absolute inset-0 bg-current rounded-full shadow-[0_0_6px_1px_currentColor] animate-spinner-head motion-reduce:animate-none" />
          <span
            className="absolute -inset-2.5 rounded-full animate-spinner-head motion-reduce:animate-none"
            style={{ background: HEAD_HALO_BG }}
          />
        </div>
      </div>
    </div>
  );
}
