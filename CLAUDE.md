# CLAUDE.md · miata

Página única do Mazda MX-5 NA de 1994 do Leonardo, à venda. Next.js 16 + Tailwind
v4, sem base de dados, sem autenticação, deploy na Vercel.

## O que este site é, e o que não é

É um **link privado** que ele manda a quem já está em contacto, a substituir um
post do Facebook. **Não é um anúncio público.** Daí duas regras:

- **Um contacto só, o WhatsApp**, decidido por ele em agosto de 2026: o link `wa.me`
  no rodapé, e mais nenhum link para fora. Sem email, sem formulário, sem o número
  escrito noutro sítio. Acrescentar contactos é decisão dele, não uma suposição.
- **`noindex`** no metadata do `app/layout.tsx`. A página tem a matrícula e as fotos
  da casa dele.

## Convenções

- **Português de Portugal** em tudo: copy, nomes de ficheiro, nomes de variáveis,
  comentários e commits.
- **Nunca travessão nem em-dash**, regra da casa.
- Design system **próprio**, tirado das cores do carro (verde escuro da carroçaria,
  bege do interior). **Não** é Nature Warm v3, apesar de estar em `__Personal`.
  Tokens em `app/globals.css`.
- Todo o conteúdo textual vive em `lib/carro.ts`. Sem strings soltas nos componentes.

## Fotos

Os originais em `_originais/` estão fora do git. `npm run fotos` gera os WebP de
`fotos/`, que são esses sim commitados. Quatro originais têm orientação EXIF errada
e o `.rotate()` do script é o que os endireita: se alguma foto aparecer deitada,
é aí que se olha primeiro.

O `_originais/miata.png` é o caso à parte: um recorte do carro com o fundo removido,
que o script converte para `fotos/00-hero.webp` mantendo o alfa. É o que deixa o
carro assentar no verde do fundo, por baixo do lettering do hero. Não entra na
galeria, e é a mesma pose da foto 02.

## Ícone do separador

Sai do mesmo `_originais/miata.png` do hero: o recorte centrado num quadrado, a 96%
da largura, com o alfa intacto. Sem caixa nem fundo, o carro assenta direto no
separador. O `npm run fotos` escreve o `app/icon.png` (512px) e o `app/apple-icon.png`
(180px), este último com o verde por trás porque o iOS pinta o alfa de preto no ecrã
inicial.

Aos 16px de alguns separadores a foto vira uma mancha esverdeada, e isso é conhecido
e aceite: a alternativa era uma silhueta desenhada, que ele viu e preferiu a foto.

@AGENTS.md
