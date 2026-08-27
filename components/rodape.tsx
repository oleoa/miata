import { carro } from "@/lib/carro";

export function Rodape() {
  return (
    <footer className="mx-auto box-content max-w-[1080px] px-[clamp(1.25rem,5vw,6rem)] pt-9 pb-14">
      <div className="flex flex-wrap items-baseline justify-between gap-3.5 border-t border-creme pt-5 text-[clamp(1rem,1.8vw,1.125rem)]">
        <div className="max-w-[46ch]">
          <p>{carro.rodape}</p>
          {/* Unico link para fora da pagina. `wa.me` abre a conversa ja com o
              numero preenchido, no telemovel e no WhatsApp Web. */}
          <a
            href={carro.contacto.ligacao}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block border-b-2 border-ouro pb-0.5 font-mono text-[0.78rem] tracking-[0.14em] text-creme uppercase transition-colors hover:text-ouro"
          >
            {carro.contacto.rotulo}
          </a>
        </div>
        <p className="font-mono text-[0.72rem] tracking-[0.14em] uppercase">
          {carro.ano} {carro.marca} {carro.modelo} {carro.geracao}
        </p>
      </div>
    </footer>
  );
}
