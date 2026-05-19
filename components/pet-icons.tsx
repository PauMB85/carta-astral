const SVG_ATTRS = {
  width: 44,
  height: 44,
  fill: "none",
  stroke: "var(--color-gold-bright)",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  opacity: 0.95,
};

export function DogIcon() {
  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden="true"
      className="text-gold-bright"
      {...SVG_ATTRS}
    >
      <path d="M 12 24 L 8 14 L 16 18 L 22 16 C 30 14 38 14 46 18 L 52 14 L 56 24 C 56 36 50 46 38 50 L 38 54 M 26 54 L 26 50 C 18 48 12 38 12 28" />
      <circle cx="22" cy="28" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="42" cy="28" r="1.4" fill="currentColor" stroke="none" />
      <path d="M 30 36 Q 32 38 34 36" />
      <path d="M 32 32 L 32 35" />
    </svg>
  );
}

export function CatIcon() {
  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden="true"
      className="text-gold-bright"
      {...SVG_ATTRS}
    >
      <path d="M 14 22 L 10 10 L 22 18 C 28 16 36 16 42 18 L 54 10 L 50 22 C 54 28 54 38 48 44 C 42 50 22 50 16 44 C 10 38 10 28 14 22 Z" />
      <circle cx="24" cy="30" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="40" cy="30" r="1.4" fill="currentColor" stroke="none" />
      <path d="M 30 38 L 32 40 L 34 38" />
      <path d="M 22 36 L 16 35 M 22 38 L 16 40 M 42 36 L 48 35 M 42 38 L 48 40" />
    </svg>
  );
}
