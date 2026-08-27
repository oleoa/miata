// Manifesto das fotos. Os imports sao estaticos de proposito: o next/image
// tira dai as dimensoes reais e o blurDataURL, sem precisar de nada a mao.
//
// Os ficheiros em `fotos/` sao gerados por `npm run fotos` a partir de
// `_originais/`. Nao editar a mao.

import type { StaticImageData } from "next/image";

import heroArte from "@/fotos/00-hero.webp";
import f01 from "@/fotos/01-perfil-lateral.webp";
import f03 from "@/fotos/03-hardtop-vista-funchal.webp";
import f04 from "@/fotos/04-softtop-luz-dourada.webp";
import f05 from "@/fotos/05-softtop-ceu-azul.webp";
import f06 from "@/fotos/06-farois-acesos-anoitecer.webp";
import f07 from "@/fotos/07-farol-pop-up.webp";
import f08 from "@/fotos/08-jante-e-pneu.webp";
import f09 from "@/fotos/09-interior-volante.webp";
import f10 from "@/fotos/10-motor-1600.webp";
import f11 from "@/fotos/11-inferior-frente.webp";
import f12 from "@/fotos/12-inferior-subquadro.webp";
import f13 from "@/fotos/13-inferior-caixa-escape.webp";

export type Foto = {
  img: StaticImageData;
  alt: string;
  legenda: string;
};

// O hero e o recorte com o fundo removido (`_originais/miata.png`), a mesma
// pose da foto 02. Por isso a 02 nao volta a aparecer na galeria.
export const hero = heroArte;
export const heroAlt =
  "Mazda MX-5 de 1994 verde escuro, de três quartos, com os faróis pop-up levantados";

// Uma so sequencia, na ordem do projeto. E tambem a ordem do lightbox.
export const fotos: Foto[] = [
  {
    img: f01,
    alt: "MX-5 verde escuro de perfil, com a capota baixada, num miradouro com nevoeiro",
    legenda: "Perfil, com a capota baixada",
  },
  {
    img: f03,
    alt: "MX-5 com o hard-top verde montado, com a baía do Funchal ao fundo",
    legenda: "Com o hard-top verde montado",
  },
  {
    img: f04,
    alt: "MX-5 com o soft-top bege levantado, à beira da estrada, com luz de fim de tarde",
    legenda: "Com o soft-top bege levantado",
  },
  {
    img: f05,
    alt: "MX-5 com o soft-top bege levantado, de três quartos, com o céu limpo ao fundo",
    legenda: "O soft-top bege, visto de trás",
  },
  {
    img: f06,
    alt: "MX-5 de três quartos à frente, com os faróis acesos, ao anoitecer, debaixo de uma árvore",
    legenda: "Faróis acesos, ao anoitecer",
  },
  {
    img: f07,
    alt: "Pormenor de um farol pop-up levantado e aceso",
    legenda: "O farol pop-up, de perto",
  },
  {
    img: f08,
    alt: "Pormenor da jante Mazda de 15 polegadas e do pneu Nexen 195/50 R15",
    legenda: "Jante de 15 polegadas e pneu 195/50 R15",
  },
  {
    img: f09,
    alt: "Interior do MX-5: volante em madeira, mostradores em creme e estofos bege",
    legenda: "Volante em madeira e mostradores em creme",
  },
  {
    img: f10,
    alt: "Motor 1.6 do MX-5, com o capô aberto",
    legenda: "Motor 1.6, com o capô aberto",
  },
  {
    img: f11,
    alt: "Parte inferior do MX-5: frente, subquadro, cremalheira de direção e alternador",
    legenda: "Parte inferior, frente e subquadro",
  },
  {
    img: f12,
    alt: "Parte inferior do MX-5: subquadro, alternador e radiador vistos de lado",
    legenda: "Subquadro, alternador e radiador",
  },
  {
    img: f13,
    alt: "Parte inferior do MX-5: caixa de velocidades e linha de escape",
    legenda: "Caixa de velocidades e escape",
  },
];
