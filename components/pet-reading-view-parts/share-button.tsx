"use client";

import { v1 } from "@/lib/theme";

type Props = {
  label: string;
  onShare: () => void;
};

export function ShareButton({ label, onShare }: Props) {
  return (
    <div className="flex justify-center mt-9">
      <ShareButtonStyles />
      <button
        type="button"
        onClick={onShare}
        className="pet-share-btn font-display inline-flex items-center gap-3.5 cursor-pointer"
        style={{
          background: "transparent",
          color: v1.goldBright,
          border: `1px solid ${v1.gold}`,
          outline: `1px solid ${v1.goldFaint15}`,
          outlineOffset: -5,
          padding: "0 44px",
          minHeight: 58,
          fontSize: 11,
          letterSpacing: "0.3em",
          fontWeight: 500,
        }}
      >
        <span>{label}</span>
      </button>
    </div>
  );
}

function ShareButtonStyles() {
  return (
    <style>{`
      .pet-share-btn { transition: background 0.25s, color 0.25s; }
      .pet-share-btn:hover { background: rgba(231, 201, 122, 0.08); color: ${v1.cream}; }
      @media (prefers-reduced-motion: reduce) {
        .pet-share-btn { transition: none !important; }
      }
    `}</style>
  );
}
