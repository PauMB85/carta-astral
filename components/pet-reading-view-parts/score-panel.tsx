type Props = {
  label: string | undefined;
  value: number | undefined;
  explanation: string | undefined;
};

export function ScorePanel({ label, value, explanation }: Props) {
  return (
    <div className="relative mt-8 mb-6 text-center bg-ink border border-gold-faint-25 py-9 px-7">
      <span
        aria-hidden="true"
        className="absolute pointer-events-none inset-1.5 border border-gold-faint-15"
      />

      {value !== undefined ? (
        <div className="font-display text-gold-bright text-[84px] font-medium leading-none [text-shadow:0_0_24px_var(--color-gold-glow)]">
          {value}
        </div>
      ) : null}

      {label ? (
        <div className="font-display mt-3 text-gold text-[11px] tracking-[0.4em] font-medium">
          {label}
        </div>
      ) : null}

      {value !== undefined ? (
        <div className="mx-auto mt-5 mb-3 relative w-full max-w-85 h-px bg-gold-faint-15">
          <div
            className="absolute left-0 -top-px h-[3px] bg-[linear-gradient(90deg,var(--color-gold),var(--color-gold-bright))] shadow-[0_0_10px_var(--color-gold-glow)]"
            style={{ width: `${value}%` }}
          />
        </div>
      ) : null}

      {explanation ? (
        <p className="font-body italic mt-4 mx-auto text-cream text-[19px] max-w-115 leading-[1.4]">
          “{explanation}”
        </p>
      ) : null}
    </div>
  );
}
