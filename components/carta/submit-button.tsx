"use client";

import { Loader2 } from "lucide-react";
import { Diamond } from "@/components/ornaments/diamond";

type Props = {
  pending: boolean;
};

export function SubmitButton({ pending }: Props) {
  return (
    <button
      type="submit"
      disabled={pending}
      aria-busy={pending}
      className="group relative w-full py-4 overflow-hidden disabled:cursor-not-allowed disabled:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-cosmos-violet"
      style={{
        background:
          "linear-gradient(180deg, rgba(212, 175, 55, 0.15) 0%, rgba(160, 120, 24, 0.08) 100%)",
        border: "1px solid rgba(212, 175, 55, 0.5)",
      }}
    >
      <span
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "linear-gradient(180deg, rgba(212, 175, 55, 0.25) 0%, rgba(160, 120, 24, 0.15) 100%)",
        }}
        aria-hidden="true"
      />
      <span className="relative flex items-center justify-center gap-4">
        {pending ? (
          <>
            <Loader2
              className="w-4 h-4 text-starlight-200 animate-spin"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <span className="font-display text-sm gold-text tracking-[0.3em] uppercase">
              Consultando los astros
            </span>
          </>
        ) : (
          <>
            <Diamond />
            <span className="font-display text-sm gold-text tracking-[0.3em] uppercase">
              Revelar mi carta
            </span>
            <Diamond />
          </>
        )}
      </span>
    </button>
  );
}
