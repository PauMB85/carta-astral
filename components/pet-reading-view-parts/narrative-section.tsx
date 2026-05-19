type Props = {
  title: string;
  content: string;
};

export function NarrativeSection({ title, content }: Props) {
  return (
    <div className="my-6">
      <div className="font-display mb-3 text-gold-bright text-[13px] tracking-[0.28em] font-medium">
        {title}
      </div>
      <div className="font-body italic text-cream text-lg leading-[1.65]">
        {content
          .split(/\n+/)
          .filter((p) => p.trim().length > 0)
          .map((p, i) => (
            <p key={i} className="m-0 mb-3 last:mb-0">
              {p}
            </p>
          ))}
      </div>
    </div>
  );
}
