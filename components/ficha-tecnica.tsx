import { carro } from "@/lib/carro";
import { Revelar } from "@/components/revelar";

export function FichaTecnica() {
  return (
    <section className="mx-auto box-content max-w-[1080px] px-[clamp(1.25rem,5vw,6rem)]">
      <Revelar>
        <div className="mt-9 grid gap-6 md:grid-cols-2 md:gap-x-12">
          <p className="text-[clamp(1.125rem,2vw,1.3125rem)] leading-[1.5] text-pretty">
            {carro.descricao}
          </p>
          <p
            aria-hidden
            className="font-display text-[clamp(3.5rem,7vw,4.75rem)] leading-[0.9] text-right"
          >
            {carro.ano}
          </p>
        </div>
      </Revelar>

      <Revelar>
        <div className="mt-14 border-t border-creme pt-4.5">
          <h2 className="mb-5.5 font-mono text-[0.72rem] tracking-[0.2em] uppercase">
            Ficha
          </h2>
          {/* Duas colunas preenchidas linha a linha, na ordem do `lib/carro.ts`. */}
          <dl className="grid text-[clamp(1rem,1.8vw,1.125rem)] md:grid-cols-2 md:gap-x-14">
            {carro.ficha.map((linha) => (
              <div
                key={linha.rotulo}
                className="flex justify-between gap-6 border-b border-linha py-2.5"
              >
                <dt className="text-rotulo">{linha.rotulo}</dt>
                <dd className="text-right">{linha.valor}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Revelar>
    </section>
  );
}
