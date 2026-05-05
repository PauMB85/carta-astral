type Props = {
  title: string;
  content: string;
  index: number;
};

export function ReadingSection({ title, content, index }: Props) {
  return (
    <article
      className="mb-8 fade-up"
      style={{ animationDelay: `${0.2 + index * 0.05}s` }}
    >
      <div className="flex items-baseline gap-3 mb-2">
        <span
          className="font-display text-[10px] uppercase tracking-[0.35em] text-starlight-300/70"
          aria-hidden="true"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="font-italiana text-2xl sm:text-3xl gold-text leading-tight">
          {title}
        </h3>
      </div>
      {content ? (
        <p className="font-body text-base sm:text-lg text-starlight-50/85 leading-relaxed">
          {content}
        </p>
      ) : null}
    </article>
  );
}
