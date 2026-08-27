// Processa os originais de `_originais/` para WebP em `fotos/`, e ainda os
// icones do separador para `app/`.
//
// Faz tres coisas que importam:
//   1. `.rotate()` sem argumentos aplica a orientacao EXIF e limpa a tag. Quatro
//      dos originais estao guardados torcidos (2, 3 e 7 com orientacao 6; o 13
//      com orientacao 3) e sem isto apareciam deitados em parte dos browsers.
//   2. Reduz para 2400px no lado maior. O `next/image` gera dai o srcset.
//   3. O sharp nao copia metadata por omissao, portanto o GPS das fotos de
//      telemovel fica de fora. O link e partilhado, e isso interessa.
//
// Correr com: npm run fotos

import { mkdir, readdir, rm } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ORIGEM = "_originais";
const DESTINO = "fotos";
const LADO_MAIOR = 2400;
const QUALIDADE = 82;

// Recorte do carro com o fundo removido, so para o hero. Nao entra na galeria.
const HERO_ORIGEM = "miata.png";
const HERO_SAIDA = "00-hero.webp";

// Os icones do separador saem do mesmo recorte do hero, num quadrado sem fundo.
// Vao para `app/`, onde o Next os apanha por convencao.
const ICONES = "app";
const FUNDO = "#14231c";
const ICONE_LADO = 512;
const ICONE_APPLE_LADO = 180;
const ICONE_ESCALA = 0.96;

// original -> nome final (sem extensao). A ordem e a da galeria.
const MAPA = {
  "5.JPG": "01-perfil-lateral",
  "1.jpg": "02-frente-tres-quartos",
  "6.JPG": "03-hardtop-vista-funchal",
  "3.JPG": "04-softtop-luz-dourada",
  "7.JPG": "05-softtop-ceu-azul",
  "2.JPG": "06-farois-acesos-anoitecer",
  "9.jpg": "07-farol-pop-up",
  "10.jpg": "08-jante-e-pneu",
  "11.jpg": "09-interior-volante",
  "12.jpg": "10-motor-1600",
  "13.JPG": "11-inferior-frente",
  "14.JPG": "12-inferior-subquadro",
  "15.JPG": "13-inferior-caixa-escape",
};

const existentes = await readdir(ORIGEM);
const emFalta = [...Object.keys(MAPA), HERO_ORIGEM].filter(
  (f) => !existentes.includes(f),
);
if (emFalta.length > 0) {
  console.error(`Originais em falta em ${ORIGEM}/: ${emFalta.join(", ")}`);
  process.exit(1);
}

const naoMapeados = existentes.filter(
  (f) => /\.jpe?g$/i.test(f) && !(f in MAPA),
);
if (naoMapeados.length > 0) {
  console.warn(`Ignorados (sem entrada no MAPA): ${naoMapeados.join(", ")}`);
}

await rm(DESTINO, { recursive: true, force: true });
await mkdir(DESTINO, { recursive: true });

for (const [origem, nome] of Object.entries(MAPA)) {
  const entrada = path.join(ORIGEM, origem);
  const saida = path.join(DESTINO, `${nome}.webp`);

  const info = await sharp(entrada)
    .rotate()
    .resize({
      width: LADO_MAIOR,
      height: LADO_MAIOR,
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({ quality: QUALIDADE })
    .toFile(saida);

  const kb = Math.round(info.size / 1024);
  const forma = info.height > info.width ? "retrato " : "paisagem";
  console.log(
    `${origem.padEnd(8)} -> ${nome.padEnd(28)} ${forma} ${String(info.width).padStart(4)}x${String(info.height).padEnd(4)} ${String(kb).padStart(4)} KB`,
  );
}

console.log(`\n${Object.keys(MAPA).length} fotos escritas em ${DESTINO}/`);

// --- Arte do hero -----------------------------------------------------------
//
// O hero poe o carro por baixo do lettering gigante, e para isso a foto tem de
// assentar no verde do fundo sem caixa a volta. O `miata.png` dos originais e
// um recorte com o fundo removido, e e a unica coisa que precisa de manter o
// alfa ate ao WebP final.

const infoHero = await sharp(path.join(ORIGEM, HERO_ORIGEM))
  .resize({
    width: LADO_MAIOR,
    height: LADO_MAIOR,
    fit: "inside",
    withoutEnlargement: true,
  })
  .webp({ quality: QUALIDADE, alphaQuality: 100 })
  .toFile(path.join(DESTINO, HERO_SAIDA));

console.log(
  `\nArte do hero -> ${HERO_SAIDA} ${infoHero.width}x${infoHero.height} ${Math.round(infoHero.size / 1024)} KB`,
);

// --- Icones do separador ----------------------------------------------------
//
// O mesmo recorte do hero, centrado num quadrado e a 96% da largura. O alfa fica
// como esta: o carro assenta direto no separador, sem caixa a volta.
//
// O `apple-icon.png` e a excecao, e leva o verde por tras: o iOS pinta o alfa de
// preto no ecra inicial, e ai o carro escuro desaparecia.

const recorte = (lado) =>
  sharp(path.join(ORIGEM, HERO_ORIGEM)).resize({
    width: Math.round(lado * ICONE_ESCALA),
    height: Math.round(lado * ICONE_ESCALA),
    fit: "inside",
  });

// Paleta de 256 cores, com alfa. Um icone destes nao precisa de mais, e corta o
// PNG de 220 KB para 50 KB.
const PNG_ICONE = { palette: true, quality: 90, compressionLevel: 9 };

const infoIcone = await sharp({
  create: {
    width: ICONE_LADO,
    height: ICONE_LADO,
    channels: 4,
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  },
})
  .composite([{ input: await recorte(ICONE_LADO).toBuffer(), gravity: "centre" }])
  .png(PNG_ICONE)
  .toFile(path.join(ICONES, "icon.png"));

console.log(
  `\nIcone -> icon.png        ${infoIcone.width}x${infoIcone.height} ${Math.round(infoIcone.size / 1024)} KB`,
);

const infoApple = await sharp({
  create: {
    width: ICONE_APPLE_LADO,
    height: ICONE_APPLE_LADO,
    channels: 4,
    background: FUNDO,
  },
})
  .composite([
    { input: await recorte(ICONE_APPLE_LADO).toBuffer(), gravity: "centre" },
  ])
  .png(PNG_ICONE)
  .toFile(path.join(ICONES, "apple-icon.png"));

console.log(
  `Icone -> apple-icon.png  ${infoApple.width}x${infoApple.height} ${Math.round(infoApple.size / 1024)} KB`,
);
