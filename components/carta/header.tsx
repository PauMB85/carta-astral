import { AstrolabeWheel } from "./astrolabe-wheel";
import { OrnamentalDivider } from "@/components/ornaments/ornamental-divider";

export function Header() {
  return (
    <header className="text-center mb-10 sm:mb-14 fade-up">
      <AstrolabeWheel />
      <OrnamentalDivider className="mb-4" />
      <h1 className="font-italiana text-5xl sm:text-6xl md:text-7xl gold-text mb-3 tracking-wide">
        Carta Astral
      </h1>
      <p className="font-body text-starlight-100/60 text-lg sm:text-xl italic tracking-wider">
        el mapa de tu alma entre las estrellas
      </p>
    </header>
  );
}
