import { Diamond } from "@/components/ornaments/diamond";

type NeedsMoreDataProps = {
  message: string;
  missing?: ReadonlyArray<string | undefined>;
};

export function NeedsMoreData({ message, missing }: NeedsMoreDataProps) {
  const items = (missing ?? []).filter(
    (m): m is string => typeof m === "string" && m.length > 0,
  );
  return (
    <div className="text-center fade-up" role="status" aria-live="polite">
      <p className="font-display text-[10px] uppercase tracking-[0.4em] text-starlight-200/70 mb-3">
        Las estrellas piden más detalles
      </p>
      <h3 className="font-italiana text-3xl sm:text-4xl gold-text mb-4">
        Necesitamos un poco más
      </h3>
      <p className="font-body italic text-starlight-100/85 max-w-md mx-auto leading-relaxed mb-6">
        {message}
      </p>
      {items.length > 0 ? (
        <ul className="inline-flex flex-col gap-2 text-left">
          {items.map((item, i) => (
            <li
              key={i}
              className="flex items-center gap-3 font-body text-starlight-50/80"
            >
              <Diamond small />
              {item}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

type ReadingErrorProps = {
  message: string;
};

export function ReadingErrorState({ message }: ReadingErrorProps) {
  return (
    <div
      className="text-center py-6 px-6 fade-up"
      role="alert"
      style={{
        background: "rgba(120, 60, 160, 0.08)",
        border: "1px solid rgba(180, 130, 200, 0.2)",
      }}
    >
      <p className="font-display text-[10px] uppercase tracking-[0.4em] text-purple-200/80 mb-2">
        Las estrellas susurran
      </p>
      <p className="font-body italic text-starlight-100/90 leading-relaxed">
        {message}
      </p>
    </div>
  );
}
