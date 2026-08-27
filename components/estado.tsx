import { carro } from "@/lib/carro";
import { Revelar } from "@/components/revelar";

export function Estado() {
  return (
    <section className="mx-auto box-content max-w-[1080px] px-[clamp(1.25rem,5vw,6rem)]">
      <Revelar>
        <div className="mt-10 border-t border-creme pt-4.5">
          <h2 className="mb-4 font-mono text-[0.72rem] tracking-[0.2em] uppercase">
            {carro.manutencao.titulo}
          </h2>

          {/* Colunas CSS: a lista enche de cima para baixo, e a inspecao fica no
              fim da segunda coluna, como no desenho. */}
          <ul className="gap-x-14 text-[clamp(1rem,1.8vw,1.125rem)] text-corpo md:[column-count:2]">
            {carro.manutencao.itens.map((item) => (
              <li key={item} className="py-0.75 [break-inside:avoid]">
                {item}
              </li>
            ))}
            <li className="py-0.75 [break-inside:avoid]">
              <strong className="border-b-2 border-creme font-semibold text-creme">
                {carro.manutencao.inspecao}
              </strong>
            </li>
          </ul>

          <p className="mt-4.5 max-w-[60ch] text-[1.125rem] leading-relaxed text-corpo">
            {carro.corrosao}
          </p>
        </div>
      </Revelar>
    </section>
  );
}
