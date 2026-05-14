import { v1 } from "@/lib/theme";

type Props = {
  text: string;
};

export function ReadingDisclaimer({ text }: Props) {
  return (
    <p
      className="mx-auto mt-12 pt-6 font-body italic text-xs text-center max-w-xl leading-relaxed"
      style={{
        color: v1.dim,
        borderTop: `1px solid ${v1.goldFaint15}`,
      }}
    >
      {text}
    </p>
  );
}
