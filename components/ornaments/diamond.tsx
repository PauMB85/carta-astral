type DiamondProps = {
  small?: boolean;
};

export function Diamond({ small = false }: DiamondProps) {
  const size = small ? 6 : 8;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 8 8"
      style={{ overflow: "visible" }}
      aria-hidden="true"
    >
      <polygon
        points="4,0 8,4 4,8 0,4"
        fill="rgba(212,175,55,0.7)"
        stroke="rgba(212,175,55,0.9)"
        strokeWidth="0.3"
        style={{ filter: "drop-shadow(0 0 2px rgba(212,175,55,0.6))" }}
      />
    </svg>
  );
}
