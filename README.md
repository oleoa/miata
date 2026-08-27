# MX-5

Página do Mazda MX-5 NA de 1994 à venda. Um link só, para mandar a quem já está
em contacto. Não é um anúncio público: leva `noindex` e não tem contacto nenhum
no site.

## Correr

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run lint
```

## Fotos

Os originais estão em `_originais/` e **não** vão para o git (~50 MB). Os ficheiros
que a página usa são os WebP em `fotos/`, gerados por:

```bash
npm run fotos
```

O script (`scripts/processar-fotos.mjs`) faz três coisas que interessam:

1. Aplica a orientação EXIF e limpa a tag. Quatro dos originais estavam guardados
   torcidos e sem isto apareciam deitados em parte dos browsers.
2. Reduz para 2400 px no lado maior. O `next/image` gera daí o srcset.
3. Deita fora a metadata, incluindo o GPS das fotos tiradas com telemóvel.

Para trocar, acrescentar ou reordenar fotos: mexer no `MAPA` do script, correr
`npm run fotos`, e acertar `lib/fotos.ts`.

## Onde mudar o quê

| Quero mudar | Ficheiro |
| --- | --- |
| Preço, quilómetros, ficha técnica, textos | `lib/carro.ts` |
| Legendas, ordem e grupos da galeria | `lib/fotos.ts` |
| Cores e tipografia | `app/globals.css` |

## Deploy

Vercel. `vercel` para preview, `vercel --prod` para produção.
