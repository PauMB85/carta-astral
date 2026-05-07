import { v1 } from "@/lib/theme";

const ZODIAC_SIGILS: ReadonlyArray<{ name: string; paths: ReadonlyArray<string> }> = [
  { name: "Aries", paths: ["M 4 18 Q 4 8 12 8 Q 20 8 20 18", "M 4 18 Q 4 14 7 14", "M 20 18 Q 20 14 17 14"] },
  { name: "Tauro", paths: ["M 12 18 m -5 0 a 5 5 0 1 0 10 0 a 5 5 0 1 0 -10 0", "M 7 13 Q 4 6 9 6", "M 17 13 Q 20 6 15 6"] },
  { name: "Géminis", paths: ["M 8 6 L 8 18", "M 16 6 L 16 18", "M 6 6 L 18 6", "M 6 18 L 18 18"] },
  { name: "Cáncer", paths: ["M 5 10 a 3 3 0 1 1 6 0 a 3 3 0 1 1 -6 0", "M 13 14 a 3 3 0 1 1 6 0 a 3 3 0 1 1 -6 0", "M 5 10 Q 5 5 10 5", "M 19 14 Q 19 19 14 19"] },
  { name: "Leo", paths: ["M 9 13 a 3 3 0 1 1 6 0 a 3 3 0 1 1 -6 0", "M 12 10 Q 12 5 7 5 Q 4 5 4 9", "M 15 13 Q 18 16 18 19 Q 18 21 16 21"] },
  { name: "Virgo", paths: ["M 4 6 L 4 18", "M 4 6 Q 6 12 8 18", "M 8 18 Q 10 12 12 6 L 12 18", "M 12 6 Q 14 12 16 18", "M 16 18 Q 18 18 18 14 Q 18 10 14 12"] },
  { name: "Libra", paths: ["M 4 19 L 20 19", "M 6 16 L 18 16", "M 7 16 Q 7 9 12 9 Q 17 9 17 16"] },
  { name: "Escorpio", paths: ["M 4 6 L 4 18", "M 4 6 Q 6 12 8 18", "M 8 18 Q 10 12 12 6 L 12 18", "M 12 6 Q 14 12 16 18", "M 16 18 L 21 13", "M 21 13 L 18 12", "M 21 13 L 20 16"] },
  { name: "Sagitario", paths: ["M 4 20 L 20 4", "M 20 4 L 14 4", "M 20 4 L 20 10", "M 8 12 L 14 18"] },
  { name: "Capricornio", paths: ["M 4 6 L 8 14 L 12 6 L 16 16", "M 16 16 a 3 2.5 0 1 1 0 -5 a 4 4 0 0 0 -4 0"] },
  { name: "Acuario", paths: ["M 4 9 L 7 7 L 10 9 L 13 7 L 16 9 L 19 7", "M 4 14 L 7 12 L 10 14 L 13 12 L 16 14 L 19 12"] },
  { name: "Piscis", paths: ["M 5 6 Q 9 12 5 18", "M 19 6 Q 15 12 19 18", "M 7 12 L 17 12"] },
];

const PLANET_POINTS = [
  { angle: 24, r: 0.62 },
  { angle: 88, r: 0.55 },
  { angle: 142, r: 0.66 },
  { angle: 200, r: 0.58 },
  { angle: 268, r: 0.64 },
  { angle: 312, r: 0.56 },
  { angle: 18, r: 0.5 },
] as const;

const ASPECT_PAIRS: ReadonlyArray<readonly [number, number]> = [
  [0, 120],
  [60, 240],
  [30, 210],
  [90, 200],
  [150, 330],
];

type Props = {
  size?: number;
  spin?: boolean;
  className?: string;
};

export function NatalWheel({ size = 520, spin = true, className }: Props) {
  const cx = size / 2;
  const cy = size / 2;
  const R = size / 2 - 4;
  const rOuter = R;
  const rZodiac = R * 0.86;
  const rInner = R * 0.72;
  const rCenter = R * 0.34;
  const sigilSize = size * 0.052;

  const polar = (angleDeg: number, radius: number): readonly [number, number] => {
    const a = ((angleDeg - 90) * Math.PI) / 180;
    return [cx + Math.cos(a) * radius, cy + Math.sin(a) * radius];
  };

  return (
    <>
      <WheelStyles />
      <svg
        viewBox={`0 0 ${size} ${size}`}
        width={size}
        height={size}
        className={className}
        style={{ display: "block", overflow: "visible" }}
        role="img"
        aria-label="Carta natal"
      >
      <defs>
        <radialGradient id="wheel-bg" cx="0.5" cy="0.5" r="0.6">
          <stop offset="0%" stopColor="#1a160d" />
          <stop offset="70%" stopColor="#0b0a08" />
          <stop offset="100%" stopColor="#000" />
        </radialGradient>
        <filter id="wheel-glow">
          <feGaussianBlur stdDeviation="1.2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g className={spin ? "wheel-spin" : undefined} style={{ transformOrigin: `${cx}px ${cy}px` }}>
        <circle cx={cx} cy={cy} r={rOuter} fill="url(#wheel-bg)" stroke={v1.gold} strokeWidth="1" />
        <circle cx={cx} cy={cy} r={rOuter - 4} fill="none" stroke={v1.gold} strokeWidth="0.4" opacity="0.5" />
        <circle cx={cx} cy={cy} r={rZodiac} fill="none" stroke={v1.gold} strokeWidth="0.8" />
        <circle cx={cx} cy={cy} r={rInner} fill="none" stroke={v1.gold} strokeWidth="0.6" />
        <circle cx={cx} cy={cy} r={rInner * 0.88} fill="none" stroke={v1.gold} strokeWidth="0.3" opacity="0.5" />
        <circle cx={cx} cy={cy} r={rCenter} fill="none" stroke={v1.gold} strokeWidth="0.6" opacity="0.7" />
        <circle cx={cx} cy={cy} r={rCenter * 0.7} fill="none" stroke={v1.gold} strokeWidth="0.4" opacity="0.5" />

        {Array.from({ length: 12 }, (_, i) => {
          const a = i * 30;
          const [x1, y1] = polar(a, rInner);
          const [x2, y2] = polar(a, rOuter);
          return <line key={`div-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke={v1.gold} strokeWidth="0.6" opacity="0.7" />;
        })}

        {Array.from({ length: 36 }, (_, i) => {
          if (i % 3 === 0) return null;
          const a = i * 10;
          const [x1, y1] = polar(a, rZodiac);
          const [x2, y2] = polar(a, rZodiac + (rOuter - rZodiac) * 0.4);
          return <line key={`tick-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke={v1.gold} strokeWidth="0.4" opacity="0.5" />;
        })}

        {Array.from({ length: 12 }, (_, i) => {
          const a = i * 30 + 15;
          const [px, py] = polar(a, (rOuter + rZodiac) / 2);
          return <circle key={`mt-${i}`} cx={px} cy={py} r={size * 0.006} fill={v1.goldBright} opacity="0.85" />;
        })}

        {ZODIAC_SIGILS.map((sigil, i) => {
          const a = i * 30 + 15;
          const rSigil = (rOuter + rZodiac) / 2;
          const [sx, sy] = polar(a, rSigil);
          return (
            <g key={`z-${i}`} transform={`translate(${sx - sigilSize / 2}, ${sy - sigilSize / 2})`}>
              {sigil.paths.map((d, idx) => (
                <path
                  key={idx}
                  d={d}
                  fill="none"
                  stroke={v1.goldBright}
                  strokeWidth="0.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  transform={`scale(${sigilSize / 24})`}
                />
              ))}
            </g>
          );
        })}

        {Array.from({ length: 12 }, (_, i) => {
          const a = i * 30;
          const [x1, y1] = polar(a, rCenter);
          const [x2, y2] = polar(a, rInner);
          return <line key={`h-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke={v1.gold} strokeWidth="0.4" opacity="0.4" />;
        })}

        {ASPECT_PAIRS.map(([a1, a2], i) => {
          const [x1, y1] = polar(a1, rCenter * 0.95);
          const [x2, y2] = polar(a2, rCenter * 0.95);
          return <line key={`a-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke={v1.gold} strokeWidth="0.5" opacity="0.45" />;
        })}

        {Array.from({ length: 12 }, (_, i) => {
          const a = i * 30 + 15;
          const [dx, dy] = polar(a, rInner * 0.97);
          return <circle key={`id-${i}`} cx={dx} cy={dy} r={size * 0.004} fill={v1.gold} opacity="0.6" />;
        })}

        <g filter="url(#wheel-glow)">
          {PLANET_POINTS.map((p, i) => {
            const [px, py] = polar(p.angle, R * p.r);
            const ms = size * 0.012;
            return (
              <g key={`p-${i}`}>
                <circle cx={px} cy={py} r={ms * 1.6} fill="none" stroke={v1.goldBright} strokeWidth="0.6" opacity="0.7" />
                <circle cx={px} cy={py} r={ms * 0.6} fill={v1.goldBright} />
              </g>
            );
          })}
        </g>

        <g transform={`translate(${cx}, ${cy})`}>
          <circle r={rCenter * 0.18} fill="none" stroke={v1.goldBright} strokeWidth="0.6" />
          <circle r={size * 0.005} fill={v1.goldBright} />
          {[0, 90, 180, 270].map((a) => {
            const [x, y] = polar(a, rCenter * 0.45);
            return (
              <circle
                key={a}
                cx={x - cx}
                cy={y - cy}
                r={size * 0.003}
                fill={v1.goldBright}
                opacity="0.8"
              />
            );
          })}
        </g>
        </g>
      </svg>
    </>
  );
}

function WheelStyles() {
  return (
    <style>{`
      @keyframes v1-wheel-spin {
        from { transform: rotate(0deg); }
        to   { transform: rotate(360deg); }
      }
      .wheel-spin { animation: v1-wheel-spin 240s linear infinite; }
      @media (prefers-reduced-motion: reduce) {
        .wheel-spin { animation: none !important; }
      }
    `}</style>
  );
}
