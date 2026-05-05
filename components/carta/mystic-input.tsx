"use client";

import { useId, type ReactNode } from "react";

type Props = {
  icon: ReactNode;
  label: string;
  name: string;
  type?: "text" | "date" | "time";
  placeholder?: string;
  required?: boolean;
  defaultValue?: string;
  autoComplete?: string;
};

export function MysticInput({
  icon,
  label,
  name,
  type = "text",
  placeholder,
  required = false,
  defaultValue,
  autoComplete,
}: Props) {
  const id = useId();
  return (
    <div className="group">
      <label
        htmlFor={id}
        className="font-display flex items-center gap-2 text-xs text-starlight-200/70 uppercase tracking-[0.2em] mb-2"
      >
        <span className="text-starlight-300/70" aria-hidden="true">
          {icon}
        </span>
        {label}
        {required ? (
          <span className="text-starlight-300/70" aria-hidden="true">
            ·
          </span>
        ) : null}
      </label>
      <div className="relative">
        <input
          id={id}
          name={name}
          type={type}
          required={required}
          defaultValue={defaultValue}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className="w-full font-body text-lg text-starlight-50 bg-transparent px-0 py-2 border-0 border-b border-amber-400/20 focus:border-amber-300/60 focus:outline-none focus-visible:ring-0 transition-colors duration-500"
          style={{ colorScheme: "dark" }}
        />
        <span
          className="absolute bottom-0 left-0 h-px w-0 bg-linear-to-r from-amber-300/80 to-transparent group-focus-within:w-full transition-all duration-700"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
