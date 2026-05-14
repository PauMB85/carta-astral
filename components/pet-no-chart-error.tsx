import type { Dictionary } from "@/lib/i18n";
import type { Lang } from "@shared/domain/lang";
import { PetErrorState } from "@/components/pet-error-state";

type Props = {
  lang: Lang;
  t: Dictionary["pet"]["noChart"];
};

export function PetNoChartError({ lang, t }: Props) {
  return (
    <PetErrorState
      title={t.title}
      text={t.text}
      ctaLabel={t.cta}
      ctaHref={`/?lang=${lang}`}
    />
  );
}
