import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyOrderBarSpacer } from "@/components/StickyOrderBar";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { ArtPlaceholder } from "@/components/PlaceholderArt";
import { OrderButton } from "@/components/OrderButton";
import { ProvisionalNote } from "@/components/ProvisionalNote";
import { site } from "@/data/site";
import { clubNotice } from "@/data/club";

const TITLE = `A Nazar — Esfihas Turcas e Pizzas Artesanais no ${site.locale}`;
const DESCRIPTION = `A história da ${site.name}: massa artesanal, forno e inspiração turca no ${site.locale}, São Paulo.`;

export const metadata: Metadata = {
  title: "A Nazar",
  description: DESCRIPTION,
  alternates: { canonical: "/a-nazar" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: `${site.siteUrl}/a-nazar` },
};

/**
 * Página da marca.
 *
 * Estrutura pronta para o conteúdo real (história, fundadores, origem,
 * processo, filosofia). Enquanto os dados não existem, cada bloco é um estado
 * vazio honesto — nada de biografia ou founding date inventada (brief §33).
 */
const STORY_BLOCKS = [
  { id: "historia", title: "História", hint: "Quando e como a Nazar começou." },
  { id: "fundadores", title: "Fundadores", hint: "Quem faz a Nazar." },
  { id: "origem", title: "Origem", hint: "A inspiração turca que orienta o cardápio." },
  { id: "processo", title: "Processo", hint: "Do ponto de partida até o forno." },
  { id: "filosofia", title: "Filosofia", hint: "O que a Nazar entende por comida." },
];

export default function AboutPage() {
  return (
    <>
      <Header theme="navy" />
      <main id="conteudo" className="theme-navy bg-[var(--color-bg)]">
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
                  A Nazar
                </li>
              </ol>
            </nav>

            <header className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-12">
              <div className="lg:col-span-7">
                <p className="eyebrow">{site.claim}</p>
                <h1 className="display-section mt-5 max-w-[16ch] text-ink">
                  Conheça a Nazar.
                </h1>
                <p className="lede mt-6 text-ink-2">
                  Mais do que esfihas e pizzas, uma experiência que une sabor,
                  cuidado e inspiração turca.
                </p>
              </div>
              <div className="lg:col-span-5">
                <div className="overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-hairline)]">
                  <ArtPlaceholder
                    variant="esfiha-especial"
                    label="Ilustração: massa da casa"
                    className="aspect-[4/3] w-full"
                  />
                </div>
              </div>
            </header>

            <div className="mt-16 grid gap-x-10 gap-y-12 md:grid-cols-2">
              {STORY_BLOCKS.map((block, index) => (
                <Reveal
                  key={block.id}
                  as="section"
                  distance={16}
                  delay={index * 60}
                  id={block.id}
                  className="scroll-mt-[calc(var(--header-height)+var(--space-6))] border-t border-[var(--color-hairline)] pt-6"
                >
                  <h2 className="text-xl text-ink">{block.title}</h2>
                  <p className="measure-tight mt-2 text-base text-ink-2">
                    {block.hint}
                  </p>
                  <ProvisionalNote className="mt-4">
                    Conteúdo publicado pela Nazar.
                  </ProvisionalNote>
                </Reveal>
              ))}
            </div>

            <section
              id="programa"
              className="mt-16 scroll-mt-[calc(var(--header-height)+var(--space-6))] border-t border-[var(--color-hairline)] pt-8"
              aria-labelledby="programa-titulo"
            >
              <h2 id="programa-titulo" className="text-xl text-ink">
                Nazar Club
              </h2>
              <p className="measure-tight mt-2 text-base text-ink-2">
                O clube transforma pedidos em pontos que viram benefícios. As
                regras de acúmulo, validade e troca entram em breve.
              </p>
              <ProvisionalNote className="mt-4">{clubNotice}</ProvisionalNote>
            </section>

            <div className="mt-16 flex flex-col gap-4 sm:flex-row sm:items-center">
              <OrderButton placement="footer">Pedir agora</OrderButton>
              <Link href="/cardapio" className="btn btn-secondary">
                Ver cardápio
              </Link>
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