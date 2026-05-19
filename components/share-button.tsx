"use client";

type Props = {
  label: string;
  onShare: () => void;
};

export function ShareButton({ label, onShare }: Props) {
  return (
    <div className="flex justify-center mt-9">
      <button
        type="button"
        onClick={onShare}
        className="
          font-display inline-flex items-center gap-3.5 cursor-pointer
          bg-transparent text-gold-bright
          border border-gold outline outline-gold-faint-15 -outline-offset-5
          px-11 min-h-[58px]
          text-[11px] tracking-[0.3em] font-medium
          transition-colors motion-reduce:transition-none
          hover:bg-gold-bright/8 hover:text-cream
        "
      >
        <span>{label}</span>
      </button>
    </div>
  );
}
