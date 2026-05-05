type Shooter = {
  id: number;
  top: number;
  left: number;
  delay: number;
  duration: number;
  angle: number;
  length: number;
  dx: number;
  dy: number;
};

const SHOOTING_STARS: Shooter[] = [
  { id: 0, top: 6, left: 78, delay: 3, duration: 14, angle: -42, length: 110, dx: -460, dy: 460 },
  { id: 1, top: 18, left: 92, delay: 21, duration: 22, angle: -36, length: 140, dx: -560, dy: 420 },
  { id: 2, top: 32, left: 70, delay: 47, duration: 18, angle: -50, length: 90, dx: -420, dy: 540 },
  { id: 3, top: 52, left: 88, delay: 71, duration: 20, angle: -45, length: 120, dx: -520, dy: 520 },
];

export function ShootingStars() {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {SHOOTING_STARS.map((s) => (
        <span
          key={s.id}
          className="shooting-star"
          style={
            {
              top: `${s.top}%`,
              left: `${s.left}%`,
              "--delay": `${s.delay}s`,
              "--dur": `${s.duration}s`,
              "--angle": `${s.angle}deg`,
              "--len": `${s.length}px`,
              "--dx": `${s.dx}px`,
              "--dy": `${s.dy}px`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
