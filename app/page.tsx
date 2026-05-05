import { BackgroundCosmos } from "@/components/background/background-cosmos";
import { Header } from "@/components/carta/header";
import { CartaAstralForm } from "@/components/carta/carta-astral-form";
import { OrnamentalDivider } from "@/components/ornaments/ornamental-divider";

export default function Page() {
  return (
    <>
      <BackgroundCosmos />
      <main className="relative grain px-5 py-10 sm:py-16 max-w-3xl mx-auto">
        <Header />
        <CartaAstralForm />
        <footer className="mt-12 text-center fade-up" style={{ animationDelay: "0.4s" }}>
          <OrnamentalDivider />
          <p className="font-body italic text-starlight-100/40 text-xs mt-4 tracking-widest">
            ad astra per aspera
          </p>
        </footer>
      </main>
    </>
  );
}
