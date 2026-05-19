import type { Dictionary } from "@/lib/i18n";

export function ReadingPlaceholder({
  t,
}: {
  t: Dictionary["reading"];
}) {
  return (
    <div className="text-center py-10" role="status" aria-live="polite">
      <Spinner />
      <p className="font-display mt-4 text-gold text-xs font-medium">
        {t.streaming}
      </p>
      <p className="font-body italic text-sm mt-2 text-cream/60 animate-streaming-pulse motion-reduce:animate-none">
        {t.streamingSub}
      </p>
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
      <p className="font-display text-gold text-xs tracking-[0.4em] font-medium">
        {t.missingDataEyebrow}
      </p>
      <h3 className="font-body italic m-0 mt-3 text-3xl sm:text-4xl font-normal text-gold-bright">
        {t.missingDataTitle}
      </h3>
      <p className="font-body italic max-w-md mx-auto leading-relaxed mt-4 mb-6 text-lg text-cream/85">
        {message}
      </p>
      {items.length > 0 ? (
        <ul className="inline-flex flex-col gap-2 text-left">
          {items.map((item, i) => (
            <li
              key={i}
              className="flex items-center gap-3 font-body text-cream/80"
            >
              <span
                aria-hidden="true"
                className="w-1.5 h-1.5 bg-gold-bright rotate-45"
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
      className="text-center p-6 bg-[rgb(120_60_160_/_8%)] border border-[rgb(180_130_200_/_20%)]"
      role="alert"
    >
      <p className="font-display mb-2 text-[rgb(220_200_255_/_85%)] text-xs tracking-[0.4em] font-medium">
        {eyebrow}
      </p>
      <p className="font-body italic leading-relaxed text-cream/90">
        {message}
      </p>
    </div>
  );
}

function Spinner() {
  return (
    <svg
      className="mx-auto animate-spin motion-reduce:animate-none"
      width="28"
      height="28"
      viewBox="0 0 28 28"
      aria-hidden="true"
    >
      <circle
        cx="14"
        cy="14"
        r="11"
        stroke="var(--color-gold-bright)"
        strokeOpacity="0.25"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M 14 3 A 11 11 0 0 1 25 14"
        stroke="var(--color-gold-bright)"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
