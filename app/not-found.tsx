import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/Container";
import { ArtPlaceholder } from "@/components/PlaceholderArt";
import { OrderButton } from "@/components/OrderButton";

/**
 * 404.
 *
 * Estado de erro desenhado (constitution §12): diz o que houve, oferece a
 * saída principal e mantém a conversão disponível. Nunca "página não
 * encontrada" e fim de papo.
 */
export default function NotFound() {
  return (
    <>
      <Header theme="navy" />
      <main id="conteudo" className="theme-navy bg-[var(--palette-navy)]">
        <div className="pt-[calc(var(--header-height)+var(--space-16))]">
          <Container>
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
              <div>
                <p className="eyebrow">Erro 404</p>
                <h1 className="display-section mt-5 max-w-[16ch] text-ink">
                  Essa página saiu do forno.
                </h1>
                <p className="lede mt-6 text-ink-2">
                  O endereço que você tentou abrir não existe — ou mudou de lugar.
                  O cardápio e o pedido continuam no mesmo lugar.
                </p>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <Link href="/" className="btn btn-primary">
                    Voltar ao início
                  </Link>
                  <Link href="/cardapio" className="btn btn-secondary">
                    Ver cardápio
                  </Link>
                </div>
                <div className="mt-8">
                  <OrderButton placement="not_found" variant="secondary">
                    Pedir agora
                  </OrderButton>
                </div>
              </div>
              <div className="order-first lg:order-last">
                <ArtPlaceholder
                  variant="esfiha-queijo"
                  label="Ilustração: esfiha de queijo"
                  className="mx-auto aspect-square w-full max-w-[26rem] rounded-[var(--radius-xl)] border border-[var(--color-hairline)]"
                />
              </div>
            </div>
          </Container>
        </div>

        <div className="h-[var(--space-24)]" />
      </main>
      <Footer />
    </>
  );
}