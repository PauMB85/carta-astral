type Props = {
  text: string;
};

export function ReadingDisclaimer({ text }: Props) {
  return (
    <p className="mx-auto mt-12 pt-6 font-body italic text-xs text-center max-w-xl leading-relaxed text-dim border-t border-t-gold-faint-15">
      {text}
    </p>
  );
}
