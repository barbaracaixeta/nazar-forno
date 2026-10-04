import Link from "next/link";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { OrderButton } from "@/components/OrderButton";
import { ArtPlaceholder } from "@/components/PlaceholderArt";

/**
 * CTA final.
 *
 * O ponto mais escuro do site com a luz mais quente: calor vindo de baixo,
 * como se o forno estivesse logo abaixo da dobra. Um primário, um secundário —
 * nada mais disputando atenção no fim da jornada.
 */
export function FinalCTA() {
  return (
    <section
      id="cta-final"
      className="theme-navy relative isolate overflow-hidden bg-[var(--palette-navy-deep)] py-[var(--space-20)] text-ink lg:py-[var(--space-24)]"
      aria-labelledby="cta-final-titulo"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(65% 55% at 50% 112%, rgba(169,71,53,0.46) 0%, rgba(199,166,106,0.12) 45%, transparent 72%)",
        }}
      />
      <div aria-hidden className="grain pointer-events-none absolute inset-0 -z-10" />

      <Container>
        <div className="mx-auto flex max-w-[42rem] flex-col items-center text-center">
          <Reveal distance={14}>
            <div className="relative mx-auto h-24 w-24">
              <ArtPlaceholder
                variant="flame"
                label=""
                className="absolute inset-0 rounded-full"
              />
            </div>

            <h2
              id="cta-final-titulo"
              className="display-section mt-8 text-balance text-ink"
            >
              Seu próximo pedido começa aqui.
            </h2>

            <p className="lede mt-5 text-center text-ink-2">
              Peça pelo {""}
              <span className="text-ink">Xeguei</span> e receba quentinho, no
              Tatuapé.
            </p>

            <div className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <OrderButton placement="final_cta">Pedir agora</OrderButton>
              <Link href="/cardapio" className="btn btn-secondary">
                Ver cardápio
              </Link>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}