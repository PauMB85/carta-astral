import { Loader2 } from "lucide-react";

export function StreamingPlaceholder() {
  return (
    <div className="text-center py-10 fade-up" role="status" aria-live="polite">
      <Loader2
        className="w-6 h-6 text-starlight-200 animate-spin mx-auto mb-4"
        strokeWidth={1.2}
        aria-hidden="true"
      />
      <p className="font-display text-[10px] uppercase tracking-[0.4em] text-starlight-200/60">
        Las estrellas se alinean
      </p>
      <p className="font-body italic text-starlight-100/60 text-sm mt-2 pulse-soft">
        tu lectura está naciendo...
      </p>
    </div>
  );
}
