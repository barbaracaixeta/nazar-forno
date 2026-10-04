import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyOrderBarSpacer } from "@/components/StickyOrderBar";
import { Container } from "@/components/Container";
import { MenuExplorer } from "@/components/MenuExplorer";
import { OrderButton } from "@/components/OrderButton";
import { ProvisionalNote } from "@/components/ProvisionalNote";
import { categories, categoryName } from "@/data/categories";
import { products } from "@/data/products";
import { site } from "@/data/site";

const TITLE = `Cardápio — Esfihas e Pizzas no ${site.locale} | ${site.name}`;
const DESCRIPTION = `Cardápio da ${site.name}: esfihas, pizzas artesanais, especiais, doces e bebidas no ${site.locale}, São Paulo. Preços e disponibilidade atualizados no pedido.`;

export const metadata: Metadata = {
  title: "Cardápio",
  description: DESCRIPTION,
  alternates: { canonical: "/cardapio" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${site.siteUrl}/cardapio`,
    type: "website",
  },
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Início", item: site.siteUrl },
    { "@type": "ListItem", position: 2, name: "Cardápio", item: `${site.siteUrl}/cardapio` },
  ],
};

/**
 * Página de cardápio com URL própria: linkável, indexável e compartilhável.
 * A lista completa de produtos é renderizada no servidor (ver `noindex`
 * abaixo para o filtro por hash não duplicar conteúdo).
 */
export default function MenuPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumb).replace(/</g, "\\u003c"),
        }}
      />
      <Header theme="creme" />
      <main id="conteudo" className="theme-creme bg-[var(--color-bg)]">
        <div className="pt-[calc(var(--header-height)+var(--space-12))]">
          <Container>
            <nav aria-label="Trilha de navegação" className="text-sm text-ink-3">
              <ol className="flex items-center gap-2">
                <li>
                  <Link href="/" className="link-inline inline-flex min-h-11 min-w-11 items-center">
                    Início
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li aria-current="page" className="text-ink-2">
                  Cardápio
                </li>
              </ol>
            </nav>

            <header className="mt-8 max-w-[52ch]">
              <p className="eyebrow">{site.claim}</p>
              <h1 className="display-section mt-5">
                Cardápio {site.name}.
              </h1>
              <p className="lede mt-5">
                Esfihas, pizzas artesanais e as edições especiais da casa. Escolha
                uma categoria para ver os itens disponíveis agora.
              </p>
            </header>

            <div className="mt-8">
              <MenuExplorer />
            </div>

            <ProvisionalNote className="mt-10">
              Preços marcados como “R$ XX,XX” ainda não foram cadastrados pela
              marca. O valor final aparece no checkout.
            </ProvisionalNote>

            <div className="mt-8 flex flex-col gap-4 border-t border-[var(--color-hairline)] pt-8 sm:flex-row sm:items-center sm:justify-between">
              <p className="measure-tight text-sm text-ink-2">
                Itens listados: {products.length} · Categorias:{" "}
                {categories.map((c) => categoryName(c.id)).join(", ")}.
              </p>
              <OrderButton placement="menu">Pedir agora</OrderButton>
            </div>
          </Container>
        </div>

        <div className="h-[var(--space-24)]" />
      </main>
      <Footer />
      <StickyOrderBarSpacer />
    </>
  );
}