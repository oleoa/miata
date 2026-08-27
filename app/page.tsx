import { Estado } from "@/components/estado";
import { FichaTecnica } from "@/components/ficha-tecnica";
import { Galeria } from "@/components/galeria";
import { Hero } from "@/components/hero";
import { Rodape } from "@/components/rodape";

export default function Pagina() {
  return (
    <main>
      <Hero />
      <FichaTecnica />
      <Estado />
      <Galeria />
      <Rodape />
    </main>
  );
}
