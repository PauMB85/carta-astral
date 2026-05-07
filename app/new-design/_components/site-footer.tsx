import Image from "next/image";
import type { Dictionary } from "../_lib/i18n";
import { v1 } from "../_lib/theme";

type Props = {
  t: Dictionary["footer"];
};

export function SiteFooter({ t }: Props) {
  return (
    <footer
      className="text-center px-5 sm:px-10 lg:px-16 py-14 mt-10 border-t"
      style={{ borderColor: v1.goldFaint15 }}
    >
      <Image
        src="/galgo-astral-logo.png"
        alt=""
        width={1024}
        height={1536}
        aria-hidden="true"
        className="w-[110px] sm:w-[120px] mx-auto mb-4 opacity-90"
      />
      <p
        className="font-body italic text-base sm:text-lg max-w-md mx-auto"
        style={{ color: "rgba(245, 236, 214, 0.5)" }}
      >
        {t.quote}
      </p>
      <div
        className="font-display mt-6"
        style={{
          color: v1.gold,
          fontSize: 10,
          letterSpacing: "0.4em",
          fontWeight: 500,
        }}
      >
        {t.credits}
      </div>
    </footer>
  );
}
