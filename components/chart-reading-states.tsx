import type { Dictionary } from "@/lib/i18n";
import { v1 } from "@/lib/theme";

export function ReadingPlaceholder({
  t,
}: {
  t: Dictionary["reading"];
}) {
  return (
    <div className="text-center py-10" role="status" aria-live="polite">
      <Spinner />
      <p
        className="font-display mt-4"
        style={{
          color: v1.gold,
          fontSize: 12,
          fontWeight: 500,
        }}
      >
        {t.streaming}
      </p>
      <p
        className="font-body italic text-sm mt-2"
        style={{
          color: "rgba(245, 236, 214, 0.6)",
          animation: "v1-pulse 2.4s ease-in-out infinite",
        }}
      >
        {t.streamingSub}
      </p>
      <style>{`
        @keyframes v1-pulse { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }
        @media (prefers-reduced-motion: reduce) { p[style*="v1-pulse"] { animation: none !important; } }
      `}</style>
    </div>
  );
}

export function NeedsMoreData({
  message,
  missing,
  t,
}: {
  message: string;
  missing: ReadonlyArray<string | undefined> | undefined;
  t: Dictionary["reading"];
}) {
  const items = (missing ?? []).filter(
    (m): m is string => typeof m === "string" && m.length > 0,
  );
  return (
    <div className="text-center" role="status" aria-live="polite">
      <p
        className="font-display"
        style={{
          color: v1.gold,
          fontSize: 12,
          letterSpacing: "0.4em",
          fontWeight: 500,
        }}
      >
        {t.missingDataEyebrow}
      </p>
      <h3
        className="font-body italic m-0 mt-3 text-3xl sm:text-4xl font-normal"
        style={{ color: v1.goldBright }}
      >
        {t.missingDataTitle}
      </h3>
      <p
        className="font-body italic max-w-md mx-auto leading-relaxed mt-4 mb-6 text-lg"
        style={{ color: "rgba(245, 236, 214, 0.85)" }}
      >
        {message}
      </p>
      {items.length > 0 ? (
        <ul className="inline-flex flex-col gap-2 text-left">
          {items.map((item, i) => (
            <li
              key={i}
              className="flex items-center gap-3 font-body"
              style={{ color: "rgba(245, 236, 214, 0.8)" }}
            >
              <span
                aria-hidden="true"
                style={{
                  width: 6,
                  height: 6,
                  background: v1.goldBright,
                  transform: "rotate(45deg)",
                }}
              />
              {item}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export function ReadingError({
  eyebrow,
  message,
}: {
  eyebrow: string;
  message: string;
}) {
  return (
    <div
      className="text-center p-6"
      role="alert"
      style={{
        background: "rgba(120, 60, 160, 0.08)",
        border: "1px solid rgba(180, 130, 200, 0.2)",
      }}
    >
      <p
        className="font-display mb-2"
        style={{
          color: "rgba(220, 200, 255, 0.85)",
          fontSize: 12,
          letterSpacing: "0.4em",
          fontWeight: 500,
        }}
      >
        {eyebrow}
      </p>
      <p
        className="font-body italic leading-relaxed"
        style={{ color: "rgba(245, 236, 214, 0.9)" }}
      >
        {message}
      </p>
    </div>
  );
}

function Spinner() {
  return (
    <svg
      className="mx-auto"
      width="28"
      height="28"
      viewBox="0 0 28 28"
      style={{ animation: "v1-spin 1s linear infinite" }}
      aria-hidden="true"
    >
      <circle
        cx="14"
        cy="14"
        r="11"
        stroke={v1.goldBright}
        strokeOpacity="0.25"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M 14 3 A 11 11 0 0 1 25 14"
        stroke={v1.goldBright}
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      <style>{`
        @keyframes v1-spin { to { transform: rotate(360deg); } }
        @media (prefers-reduced-motion: reduce) { svg[style*="v1-spin"] { animation: none !important; } }
      `}</style>
    </svg>
  );
}
