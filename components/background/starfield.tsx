function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const STARS = (() => {
  const rand = mulberry32(0xc05705);
  return Array.from({ length: 120 }, (_, id) => ({
    id,
    x: rand() * 100,
    y: rand() * 100,
    size: rand() * 1.8 + 0.3,
    delay: rand() * 6,
    duration: rand() * 4 + 3,
    opacity: rand() * 0.7 + 0.3,
  }));
})();

export function Starfield() {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      {STARS.map((s) => (
        <span
          key={s.id}
          className="absolute rounded-full bg-starlight-50 twinkle"
          style={
            {
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              "--delay": `${s.delay}s`,
              "--dur": `${s.duration}s`,
              "--base-op": s.opacity,
              boxShadow:
                s.size > 1.2
                  ? `0 0 ${s.size * 3}px rgba(255, 240, 200, 0.8)`
                  : "none",
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
