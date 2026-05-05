"use client";

import { useId, useState } from "react";
import { Heart, Sparkles } from "lucide-react";
import type { Interest } from "@/lib/types";

type Props = {
  defaultValue?: Interest;
  name?: string;
};

const OPTIONS: { value: Interest; label: string; icon: React.ReactNode }[] = [
  { value: "amor", label: "Amor", icon: <Heart className="w-4 h-4" /> },
  {
    value: "general",
    label: "Vida en general",
    icon: <Sparkles className="w-4 h-4" />,
  },
];

export function InterestToggle({
  defaultValue = "general",
  name = "interest",
}: Props) {
  const groupId = useId();
  const [selected, setSelected] = useState<Interest>(defaultValue);

  return (
    <fieldset>
      <legend className="font-display flex items-center gap-2 text-xs text-starlight-200/70 uppercase tracking-[0.2em] mb-3">
        ¿Qué quieres explorar?
      </legend>
      <div
        role="radiogroup"
        aria-labelledby={groupId}
        className="grid grid-cols-2 gap-3"
      >
        {OPTIONS.map((option) => {
          const isSelected = selected === option.value;
          return (
            <label
              key={option.value}
              className="cursor-pointer"
              data-selected={isSelected}
            >
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={isSelected}
                onChange={() => setSelected(option.value)}
                className="sr-only peer"
              />
              <span
                className={`flex items-center justify-center gap-2 py-3 px-4 font-display text-xs uppercase tracking-[0.25em] transition-all duration-300 ${
                  isSelected
                    ? "text-starlight-100 border border-amber-400/60 bg-amber-400/10 shadow-[0_0_20px_rgba(212,175,55,0.15)]"
                    : "text-starlight-200/60 border border-amber-400/15 hover:border-amber-400/40 hover:text-starlight-100/90"
                }`}
              >
                <span aria-hidden="true">{option.icon}</span>
                {option.label}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
