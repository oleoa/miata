import type { Metadata, Viewport } from "next";
import { EB_Garamond, IBM_Plex_Mono, Playfair_Display } from "next/font/google";

import { carro } from "@/lib/carro";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--fonte-display",
  display: "swap",
});

const garamond = EB_Garamond({
  subsets: ["latin"],
  variable: "--fonte-corpo",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--fonte-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${carro.ano} ${carro.marca} ${carro.modelo} ${carro.geracao}`,
  description: carro.descricao,
  // A pagina e um link partilhado diretamente, nao um anuncio publico. Nao ha
  // razao para o Google indexar a matricula e as fotos.
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#14231c",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-PT"
      className={`${playfair.variable} ${garamond.variable} ${plexMono.variable} h-full`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
