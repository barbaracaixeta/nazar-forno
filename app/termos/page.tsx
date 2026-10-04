import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/Container";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Termos de uso",
  description: `Condições de uso do site da ${site.name}: informações do cardápio, pedidos, propriedade intelectual e responsabilidade.`,
  alternates: { canonical: "/termos" },
};

const SECTIONS = [
  {
    title: "Objeto deste site",
    body: [
      `Este site apresenta a ${site.name}, mostra o cardápio e prepara o seu pedido. Ele é informativo: quem realiza o pedido, o pagamento e a entrega é a plataforma ${site.delivery.platform}.`,
    ],
  },
  {
    title: "Cardápio, preços e disponibilidade",
    body: [
      "Os itens, descrições e imagens do cardápio são ilustrativas e podem mudar sem aviso. Preços, adicionais, disponibilidade e forma de entrega são os que aparecem na plataforma de pedidos no momento da confirmação.",
      "Este site não fecha venda, não emite nota e não reserva estoque. O que vale é sempre o que o checkout mostra.",
    ],
  },
  {
    title: "Pedidos e pagamento",
    body: [
      `O pedido é montado aqui e finalizado fora daqui, no ambiente da ${site.delivery.platform}. Questões de pagamento, cupom, taxa de entrega, intervalo de entrega e cancelamento são regidas pelos termos da própria plataforma.`,
      `A ${site.name} pode interromper o recebimento de pedidos por indisponibilidade de insumo, por comunicado no aplicativo ou por força maior.`,
    ],
  },
  {
    title: "Alergias e restrições",
    body: [
      "As informações de ingredientes podem ser incompletas. Se você tem alergia, intolerância ou restrição alimentar, confirme os ingredientes com a loja antes de pedir. A marca não se responsabiliza por reação alérgica decorrente de informação não conferida.",
    ],
  },
  {
    title: "Propriedade intelectual",
    body: [
      `Nome, marca, textos, ilustrações, layout e elementos visuais deste site pertencem à ${site.name} ou a seus licenciados. É proibida a reprodução sem autorização.`,
      "O nome e a marca de terceiros citados apenas para indicar o local do pedido continuam sendo de seus respectivos donos.",
    ],
  },
  {
    title: "Uso do site",
    body: [
      "É proibido tentar comprometer a segurança do site, obter acesso indevido a dados ou usá-lo para fins ilícitos. O conteúdo é informativo e pode ser alterado ou descontinuado a qualquer momento.",
    ],
  },
] as const;

export default function TermsPage() {
  return (
    <>
      <Header theme="creme" />
      <main id="conteudo" className="theme-creme bg-[var(--color-bg)]">
        <div className="pt-[calc(var(--header-height)+var(--space-12))]">
          <Container className="max-w-[var(--measure-wide)]">
            <nav aria-label="Trilha de navegação" className="text-sm text-ink-3">
              <ol className="flex items-center gap-2">
                <li>
                  <Link href="/" className="link-inline inline-flex min-h-11 min-w-11 items-center">
                    Início
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li aria-current="page" className="text-ink-2">
                  Termos
                </li>
              </ol>
            </nav>

            <header className="mt-8 border-b border-[var(--color-hairline)] pb-8">
              <p className="eyebrow">Legal</p>
              <h1 className="display-section mt-5">Termos de uso</h1>
              <p className="lede mt-5">
                As regras deste site, escritas para dizer a verdade sobre como ele
                funciona.
              </p>
            </header>

            <div className="mt-12 flex flex-col gap-12">
              {SECTIONS.map((section, index) => (
                <section
                  key={section.title}
                  id={`secao-${index + 1}`}
                  aria-labelledby={`secao-${index + 1}-titulo`}
                  className="scroll-mt-[calc(var(--header-height)+var(--space-6))]"
                >
                  <h2 id={`secao-${index + 1}-titulo`} className="text-xl">
                    <span className="text-ink-3" data-tabular>
                      {String(index + 1).padStart(2, "0")} ·{" "}
                    </span>
                    {section.title}
                  </h2>
                  {section.body.map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 24)}
                      className="measure mt-4 text-base leading-relaxed text-ink-2"
                    >
                      {paragraph}
                    </p>
                  ))}
                </section>
              ))}
            </div>
          </Container>
        </div>

        <div className="h-[var(--space-24)]" />
      </main>
      <Footer />
    </>
  );
}