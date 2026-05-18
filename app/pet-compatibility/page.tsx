import type { Metadata } from "next";
import { CosmosBg } from "@/components/cosmos-bg";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PetFlow } from "@/components/pet-flow";
import { getDictionary } from "@/lib/i18n";
import { pickLang } from "@shared/domain/lang";

type Props = {
  searchParams: Promise<{ lang?: string }>;
};

export const metadata: Metadata = {
  title: "Galgo Astral · Compatibilidad con tu mascota",
  description:
    "Descubre tu vínculo astral con tu perro o gato a partir de tu carta natal.",
};

export default async function PetCompatibilityPage({ searchParams }: Props) {
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
        <PetFlow lang={lang} t={t.pet} />
        <SiteFooter lang={lang} t={t.footer} />
      </main>
    </>
  );
}
