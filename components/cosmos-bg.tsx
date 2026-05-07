import { v1 } from "@/lib/theme";

const STARS = (() => {
  let seed = 0xc05705;
  const rand = () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  return Array.from({ length: 80 }, (_, id) => ({
    id,
    x: rand() * 100,
    y: rand() * 100,
    r: (id % 4) * 0.4 + 0.6,
    delay: (id % 7) * 0.5,
  }));
})();

export function CosmosBg() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse at 50% 0%, rgba(201, 165, 90, 0.08), transparent 60%),
          radial-gradient(ellipse at 50% 100%, rgba(201, 165, 90, 0.05), transparent 60%),
          ${v1.dark}
        `,
      }}
    >
      <svg className="absolute inset-0 w-full h-full">
        {STARS.map((s) => (
          <circle
            key={s.id}
            cx={`${s.x}%`}
            cy={`${s.y}%`}
            r={s.r}
            fill={v1.goldBright}
            opacity={0.4}
            style={{
              animation: `v1-twinkle 4s ease-in-out infinite`,
              animationDelay: `${s.delay}s`,
            }}
          />
        ))}
      </svg>
      <style>{`
        @keyframes v1-twinkle {
          0%, 100% { opacity: 0.2; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.1); }
        }
        @media (prefers-reduced-motion: reduce) {
          svg circle { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
