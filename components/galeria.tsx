"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";

import { fotos } from "@/lib/fotos";

export function Galeria() {
  const [aberta, setAberta] = useState<number | null>(null);

  return (
    <section>
      <div className="mx-auto box-content max-w-[1080px] px-[clamp(1.25rem,5vw,6rem)]">
        <h2 className="mt-14 mb-3 border-t border-creme pt-4.5 font-mono text-[0.72rem] tracking-[0.2em] uppercase">
          Galeria
        </h2>
      </div>

      {/* Linhas justificadas, na ordem do `lib/fotos.ts`. O `--formato` de cada
          foto e o que a CSS usa para lhe dar a largura certa dentro da linha. */}
      <div className="galeria mx-auto box-content max-w-[1080px] px-[clamp(0.5rem,5vw,6rem)]">
        {fotos.map((foto, indice) => (
          <button
            key={foto.img.src}
            type="button"
            onClick={() => setAberta(indice)}
            aria-label={`Abrir em grande: ${foto.legenda}`}
            style={
              {
                "--formato": foto.img.width / foto.img.height,
              } as CSSProperties
            }
            className="group block cursor-zoom-in overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ouro"
          >
            <Image
              src={foto.img}
              alt={foto.alt}
              placeholder="blur"
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 96vw"
              className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            />
          </button>
        ))}
      </div>

      <Lightbox indice={aberta} aoFechar={() => setAberta(null)} aoMudar={setAberta} />
    </section>
  );
}

function Lightbox({
  indice,
  aoFechar,
  aoMudar,
}: {
  indice: number | null;
  aoFechar: () => void;
  aoMudar: (i: number) => void;
}) {
  const dialogo = useRef<HTMLDialogElement>(null);
  const toqueX = useRef<number | null>(null);

  const anterior = useCallback(() => {
    if (indice === null) return;
    aoMudar((indice - 1 + fotos.length) % fotos.length);
  }, [indice, aoMudar]);

  const seguinte = useCallback(() => {
    if (indice === null) return;
    aoMudar((indice + 1) % fotos.length);
  }, [indice, aoMudar]);

  // Abre e fecha o <dialog> nativo em funcao do estado, e trava o scroll da
  // pagina por baixo enquanto esta aberto.
  useEffect(() => {
    const el = dialogo.current;
    if (!el) return;

    if (indice !== null && !el.open) {
      el.showModal();
      document.body.style.overflow = "hidden";
    } else if (indice === null && el.open) {
      el.close();
    }

    if (indice === null) {
      document.body.style.overflow = "";
    }
  }, [indice]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (indice === null) return;

    function aoTeclar(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        anterior();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        seguinte();
      }
    }

    window.addEventListener("keydown", aoTeclar);
    return () => window.removeEventListener("keydown", aoTeclar);
  }, [indice, anterior, seguinte]);

  const foto = indice === null ? null : fotos[indice];

  return (
    <dialog
      ref={dialogo}
      className="lightbox"
      // O Esc dispara `cancel`, e o `close` cobre tambem o fecho programatico.
      onCancel={(e) => {
        e.preventDefault();
        aoFechar();
      }}
      onClose={aoFechar}
      onTouchStart={(e) => {
        toqueX.current = e.changedTouches[0]?.clientX ?? null;
      }}
      onTouchEnd={(e) => {
        const inicio = toqueX.current;
        toqueX.current = null;
        if (inicio === null) return;
        const delta = (e.changedTouches[0]?.clientX ?? inicio) - inicio;
        if (Math.abs(delta) < 45) return;
        if (delta > 0) anterior();
        else seguinte();
      }}
    >
      {foto && (
        <div className="flex h-full w-full flex-col">
          <div className="flex shrink-0 items-center justify-between px-4 py-3 sm:px-6">
            <p className="font-mono text-[0.72rem] tracking-[0.22em] text-creme/55 tabular-nums">
              {String((indice ?? 0) + 1).padStart(2, "0")} / {fotos.length}
            </p>
            <button
              type="button"
              onClick={aoFechar}
              aria-label="Fechar"
              className="flex h-10 w-10 items-center justify-center rounded-full text-creme/70 transition-colors hover:text-ouro focus-visible:text-ouro focus-visible:outline-none"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="h-5 w-5"
                aria-hidden
              >
                <path d="m6 6 12 12M18 6 6 18" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-2 sm:px-16">
            <Image
              key={foto.img.src}
              src={foto.img}
              alt={foto.alt}
              placeholder="blur"
              sizes="100vw"
              className="max-h-full w-auto max-w-full object-contain"
            />

            <BotaoSeta lado="esquerda" aoClicar={anterior} />
            <BotaoSeta lado="direita" aoClicar={seguinte} />
          </div>

          <p className="shrink-0 px-4 py-4 text-center text-[0.95rem] text-corpo sm:px-6 sm:py-5">
            {foto.legenda}
          </p>
        </div>
      )}
    </dialog>
  );
}

function BotaoSeta({
  lado,
  aoClicar,
}: {
  lado: "esquerda" | "direita";
  aoClicar: () => void;
}) {
  const esquerda = lado === "esquerda";
  return (
    <button
      type="button"
      onClick={aoClicar}
      aria-label={esquerda ? "Foto anterior" : "Foto seguinte"}
      className={`absolute top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-fundo/60 text-creme/80 backdrop-blur-sm transition-colors hover:text-ouro focus-visible:text-ouro focus-visible:outline-none ${
        esquerda ? "left-1 sm:left-3" : "right-1 sm:right-3"
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="h-5 w-5"
        aria-hidden
      >
        <path
          d={esquerda ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
