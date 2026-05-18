import type { Metadata } from "next";
import { CosmosBg } from "@/components/cosmos-bg";
import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { Pillars } from "@/components/pillars";
import { ChartFlow } from "@/components/chart-flow";
import { SiteFooter } from "@/components/site-footer";
import { getDictionary } from "@/lib/i18n";
import { pickLang } from "@shared/domain/lang";

type Props = {
  searchParams: Promise<{ lang?: string }>;
};

export const metadata: Metadata = {
  title: "Galgo Astral · Carta Astral",
  description:
    "Una carta astral trazada a mano por astrólogas iniciadas en el linaje del galgo de la luna.",
};

export default async function Page({ searchParams }: Props) {
  const { lang: rawLang } = await searchParams;
  const lang = pickLang(rawLang);
  const t = getDictionary(lang);

  return (
    <>
      <CosmosBg />
      <main
        className="relative"
        style={{ color: "#f5ecd6", fontFamily: "var(--font-body), serif" }}
      >
        <SiteHeader lang={lang} t={t.nav} />
        <Hero t={t.hero} />
        <Pillars t={t.pillars} />
        <ChartFlow
          lang={lang}
          formCopy={t.form}
          readingCopy={t.reading}
          petCopy={t.pet}
        />
        <SiteFooter lang={lang} t={t.footer} />
      </main>
    </>
  );
}
