import type { Dictionary } from "../_lib/i18n";
import { v1 } from "../_lib/theme";

type Props = {
  t: Dictionary["pillars"];
};

export function Pillars({ t }: Props) {
  return (
    <section
      className="grid grid-cols-1 sm:grid-cols-3 gap-px mx-5 sm:mx-10 lg:mx-16 my-10"
      style={{
        background: v1.goldFaint15,
        border: `1px solid ${v1.goldFaint15}`,
      }}
    >
      {t.map((p) => (
        <div
          key={p.roman}
          className="px-8 py-12 sm:py-14 text-center"
          style={{ background: v1.dark }}
        >
          <div
            className="font-display mb-4 leading-none"
            style={{
              color: v1.goldBright,
              fontSize: 26,
              letterSpacing: "0.25em",
              fontWeight: 500,
            }}
          >
            {p.roman}
          </div>
          <div
            className="font-display mb-3 uppercase"
            style={{
              color: v1.gold,
              fontSize: 13,
              letterSpacing: "0.25em",
              fontWeight: 500,
            }}
          >
            {p.title}
          </div>
          <div
            className="font-body italic text-base sm:text-lg leading-relaxed"
            style={{ color: "rgba(245, 236, 214, 0.75)" }}
          >
            {p.body}
          </div>
        </div>
      ))}
    </section>
  );
}
