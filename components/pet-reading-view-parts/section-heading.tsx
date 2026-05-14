import { v1 } from "@/lib/theme";

export function SectionHeading({ label }: { label: string }) {
  return (
    <h3
      className="font-display mt-12 mb-4 pb-2"
      style={{
        color: v1.gold,
        fontSize: 10,
        letterSpacing: "0.45em",
        fontWeight: 500,
        borderBottom: `1px solid ${v1.goldFaint15}`,
      }}
    >
      {label}
    </h3>
  );
}
