import type { Metadata } from "next";
import { CosmosBg } from "./_components/cosmos-bg";
import { SiteHeader } from "./_components/site-header";
import { Hero } from "./_components/hero";
import { Pillars } from "./_components/pillars";
import { ChartFlow } from "./_components/chart-flow";
import { SiteFooter } from "./_components/site-footer";
import { getDictionary, pickLang } from "./_lib/i18n";

type Props = {
  searchParams: Promise<{ lang?: string }>;
};

export const metadata: Metadata = {
  title: "Galgo Astral · Carta Astral",
  description:
    "Una carta astral trazada a mano por astrólogas iniciadas en el linaje del galgo de la luna.",
};

export default async function NewDesignPage({ searchParams }: Props) {
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
        <ChartFlow lang={lang} formCopy={t.form} readingCopy={t.reading} />
        <SiteFooter t={t.footer} />
      </main>
    </>
  );
}
