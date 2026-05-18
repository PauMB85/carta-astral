import type { Metadata } from "next";
import { CosmosBg } from "@/components/cosmos-bg";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PetSuccessFlow } from "@/components/pet-success-flow";
import { getDictionary } from "@/lib/i18n";
import { pickLang } from "@shared/domain/lang";

type Props = {
  searchParams: Promise<{ session_id?: string; lang?: string }>;
};

export const metadata: Metadata = {
  title: "Galgo Astral · Tu vínculo con tu mascota",
  description:
    "Tu lectura de compatibilidad astral con tu mascota, trazada a mano por nuestras astrólogas.",
};

export default async function PetSuccessPage({ searchParams }: Props) {
  const params = await searchParams;
  const lang = pickLang(params.lang);
  const t = getDictionary(lang);
  const sessionId =
    typeof params.session_id === "string" && params.session_id.length > 0
      ? params.session_id
      : null;

  return (
    <>
      <CosmosBg />
      <main
        className="relative"
        style={{ color: "#f5ecd6", fontFamily: "var(--font-body), serif" }}
      >
        <SiteHeader lang={lang} t={t.nav} />
        <PetSuccessFlow sessionId={sessionId} lang={lang} t={t.pet} />
        <SiteFooter lang={lang} t={t.footer} />
      </main>
    </>
  );
}
