type Props = {
  tips: string[];
};

export function ReadingTips({ tips }: Props) {
  if (!tips?.length) return null;
  return (
    <section
      className="mb-10 fade-up p-6 sm:p-8"
      style={{
        animationDelay: "0.45s",
        background: "rgba(212, 175, 55, 0.05)",
        border: "1px solid rgba(212, 175, 55, 0.25)",
      }}
    >
      <p className="font-display text-[10px] uppercase tracking-[0.35em] text-starlight-300/80 text-center mb-4">
        Consejos prácticos
      </p>
      <ul className="space-y-3 max-w-xl mx-auto">
        {tips.map((tip, i) => (
          <li key={i} className="flex items-start gap-3">
            <span
              className="mt-2 w-1.5 h-1.5 rounded-full bg-amber-400/70 flex-shrink-0"
              aria-hidden="true"
            />
            <span className="font-body italic text-starlight-50/90 leading-relaxed">
              {tip}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
