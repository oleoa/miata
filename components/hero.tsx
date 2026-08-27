import Image from "next/image";

import { carro } from "@/lib/carro";
import { hero, heroAlt } from "@/lib/fotos";

export function Hero() {
  return (
    <header className="mx-auto box-content max-w-[1080px] px-[clamp(1.25rem,5vw,6rem)] pt-[clamp(1.5rem,5vw,3.5rem)]">
      <div className="flex justify-between border-b border-creme pb-3.5 font-mono text-[0.72rem] tracking-[0.14em] uppercase">
        <span>{carro.estadoVenda}</span>
        <span>{carro.local}</span>
        <span>{carro.ano}</span>
      </div>

      <h1 className="sr-only">
        {carro.ano} {carro.marca} {carro.modelo} {carro.geracao}
      </h1>

      {/* Duas linhas de lettering a toda a largura, e a foto a subir por baixo
          delas. Os `vw` sao de proposito: o tamanho segue a janela, nao o texto. */}
      <p
        aria-hidden
        className="mt-13 text-center font-display text-[clamp(2.125rem,9.4vw,6rem)] leading-none font-medium tracking-[0.02em] whitespace-nowrap"
      >
        {carro.titulo.primeira.toUpperCase()}
      </p>
      <p
        aria-hidden
        className="text-center font-display text-[clamp(5rem,22.6vw,14.375rem)] leading-[0.9] font-normal tracking-[0.01em] whitespace-nowrap"
      >
        {carro.titulo.segunda.toUpperCase()}
      </p>

      <Image
        src={hero}
        alt={heroAlt}
        priority
        sizes="(min-width: 1080px) 1123px, 104vw"
        className="relative -mt-[4.4vw] -ml-[2%] block w-[104%] max-w-none"
      />

      <div className="mt-7 flex flex-wrap justify-between gap-x-4 gap-y-2.5 border-y border-creme py-3.5 font-mono text-[0.78rem] tracking-[0.06em] uppercase sm:gap-x-8">
        {carro.resumo.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </header>
  );
}
