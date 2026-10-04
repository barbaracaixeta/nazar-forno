import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import { ReducedMotionProvider } from "@/components/ReducedMotion";
import { StickyOrderBar } from "@/components/StickyOrderBar";
import { site } from "@/data/site";
import "./globals.css";

/**
 * Tipografia: duas famílias, com regra clara de uso.
 * - Fraunces (serif editorial variável): só títulos e números de display.
 * - Inter (sans): interface, corpo, rótulos — família principal.
 *
 * Conflito registrado com a constitution §4 ("uma família principal"): a
 * direção "revista gastronômica" exige o par. O custo é uma requisição a mais;
 * o benefício é a hierarquia editorial pedida no briefing. Ambas com
 * métricas de reserva do next/font — sem salto de layout.
 */
const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"],
  variable: "--font-fraunces",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.siteUrl),
  title: {
    default: "Nazar Forno | Esfihas Turcas e Pizzas Artesanais no Tatuapé",
    template: "%s | Nazar Forno",
  },
  description:
    "Esfihas turcas e pizzas artesanais no Tatuapé, São Paulo. Massa artesanal, recheios generosos e o calor do forno. Peça pelo Xeguei.",
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: site.siteUrl,
    siteName: site.name,
    title: "Nazar Forno | Esfihas Turcas e Pizzas Artesanais no Tatuapé",
    description:
      "Esfihas turcas e pizzas artesanais no Tatuapé, São Paulo. Massa artesanal, recheios generosos e o calor do forno.",
    images: [
      {
        url: "/images/nazar/og.jpg",
        width: 1200,
        height: 630,
        alt: "Nazar Forno — Esfihas turcas e pizzas artesanais no Tatuapé",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nazar Forno | Esfihas Turcas e Pizzas Artesanais no Tatuapé",
    description:
      "Esfihas turcas e pizzas artesanais no Tatuapé, São Paulo.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "restaurant",
};

export const viewport: Viewport = {
  themeColor: "#101820",
  colorScheme: "dark light",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

/**
 * Dados estruturados. Só entram fatos confirmados: nome, locality, região,
 * país, tipos de culinária e o link do cardápio. Endereço, telefone e horário
 * ficam de fora até a marca confirmar — schema incompleto é melhor que schema
 * falso (Google penaliza dado incorreto).
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: site.name,
  url: site.siteUrl,
  description:
    "Esfihas turcas e pizzas artesanais no Tatuapé, São Paulo. Massa artesanal, recheios generosos e o calor do forno.",
  servesCuisine: ["Turca", "Pizzaria", "Árabe"],
  hasMenu: `${site.siteUrl}/cardapio`,
  currenciesAccepted: "BRL",
  address: {
    "@type": "PostalAddress",
    addressLocality: site.locale,
    addressRegion: site.state,
    addressCountry: site.country,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={site.lang} className={`${fraunces.variable} ${inter.variable}`}>
      <body className="min-h-[100dvh] bg-[var(--palette-navy)] antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <a href="#conteudo" className="skip-link">
          Pular para o conteúdo
        </a>
        <ReducedMotionProvider>{children}</ReducedMotionProvider>
        <StickyOrderBar />
      </body>
    </html>
  );
}