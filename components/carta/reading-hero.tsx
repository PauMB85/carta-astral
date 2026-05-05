import { Diamond } from "@/components/ornaments/diamond";

type Props = {
  nombre: string | null;
  summary: string;
  isStreaming: boolean;
};

export function ReadingHero({ nombre, summary, isStreaming }: Props) {
  const greeting = nombre
    ? `Para ${nombre}`
    : "Tu lectura entre las estrellas";
  return (
    <div className="text-center mb-10 fade-up">
      <p className="font-display text-[10px] uppercase tracking-[0.4em] text-starlight-200/60 mb-3">
        {greeting}
      </p>
      <div className="relative inline-block">
        <span
          className="absolute inset-0 blur-2xl bg-amber-400/20 rounded-full"
          aria-hidden="true"
        />
        <h3 className="relative font-italiana text-4xl sm:text-5xl md:text-6xl gold-text leading-tight">
          Tu carta astral
        </h3>
      </div>
      <div
        className="flex items-center justify-center gap-3 mt-4 mb-5"
        aria-hidden="true"
      >
        <span className="h-px w-10 divider-line" />
        <Diamond small />
        <span className="h-px w-10 divider-line" />
      </div>
      {summary ? (
        <p className="font-body italic text-lg text-starlight-100/85 leading-relaxed max-w-xl mx-auto">
          {summary}
          {isStreaming ? <StreamingCursor /> : null}
        </p>
      ) : null}
    </div>
  );
}

function StreamingCursor() {
  return (
    <span
      aria-hidden="true"
      className="inline-block w-0.5 h-4 ml-1 bg-amber-300/80 align-middle pulse-soft"
    />
  );
}
