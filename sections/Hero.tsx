import { Container } from "@/components/Container";
import { OrderButton } from "@/components/OrderButton";
import { HeroSceneMount } from "@/components/three/HeroSceneMount";
import { ArrowDown } from "@/components/Icons";
import { locationLine, site } from "@/data/site";

const SCENE_DESCRIPTION =
  "Esfiha turca fechada, com a massa reunida no topo, sobre um prato de cerâmica, sob luz quente de forno, com vapor discreto.";

/**
 * Hero.
 *
 * O que a pessoa precisa perceber primeiro: que isto é comida de forno, feita
 * agora, e que o botão de pedido está a dois cliques. O 3D existe para dar
 * material e temperatura — nunca para competir com a headline.
 *
 * O LCP é o H1 (HTML do servidor). O canvas entra depois, em tempo ocioso, e
 * por baixo dele já existe o fallback — portanto o 3D nunca atrasa a leitura.
 */
export function Hero() {
  return (
    <section
      id="hero"
      data-parallax-root
      className="theme-navy relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-[var(--color-bg)] pt-[var(--header-height)]"
      aria-labelledby="hero-titulo"
    >
      {/* luz do forno + grão: dão profundidade sem imagem pesada */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: "var(--glow-oven)" }}
      />
      <div aria-hidden className="grain pointer-events-none absolute inset-0 -z-10" />

      <Container className="flex flex-1 flex-col justify-center py-10 lg:py-16">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-6 xl:gap-10">
          {/* ---- editorial ---- */}
          <div className="lg:col-span-6 xl:col-span-5">
            <p className="eyebrow animate-rise">
              {site.claim} · {site.locale}
            </p>

            <h1
              id="hero-titulo"
              className="display-hero mt-5 max-w-[15ch] animate-rise text-ink"
              style={{ animationDelay: "80ms" }}
            >
              Tradição que se prova em cada{" "}
              <span className="relative whitespace-nowrap text-gold">
                mordida
                <svg
                  aria-hidden
                  viewBox="0 0 200 12"
                  preserveAspectRatio="none"
                  className="absolute -bottom-1 left-0 h-2 w-full text-gold"
                >
                  <path
                    d="M2 8c46-5 96-6 196-3"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    opacity="0.55"
                  />
                </svg>
              </span>
              .
            </h1>

            <p
              className="lede mt-7 animate-rise text-ink-2"
              style={{ animationDelay: "160ms" }}
            >
              Massa artesanal, recheios generosos e o calor do forno para
              transformar qualquer pedido em uma experiência.
            </p>

            <div
              className="mt-9 flex animate-rise flex-col gap-3 sm:flex-row sm:items-center"
              style={{ animationDelay: "240ms" }}
            >
              <OrderButton placement="hero">Pedir agora</OrderButton>
              <OrderButton placement="hero" variant="secondary" href="/#a-nazar">
                Conheça a Nazar
              </OrderButton>
            </div>

            <p
              className="mt-8 flex animate-rise items-center gap-2 text-sm text-ink-3"
              style={{ animationDelay: "320ms" }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
              {locationLine}
            </p>
          </div>

          {/* ---- palco 3D ---- */}
          <div className="lg:col-span-6 xl:col-span-7">
            <div className="relative mx-auto aspect-square w-full max-w-[30rem] lg:ml-auto lg:max-w-none">
              <HeroSceneMount description={SCENE_DESCRIPTION} />
            </div>
          </div>
        </div>
      </Container>

      {/* pista de rolagem — só no desktop, onde há altura sobrando */}
      <Container className="hidden lg:block">
        <div className="flex items-center justify-between border-t border-[var(--color-hairline)] py-5">
          <a
            href="#diferenciais"
            className="group inline-flex min-h-11 items-center gap-2 text-sm text-ink-2 transition-colors duration-[var(--duration-fast)] hover:text-ink"
          >
            Descubra a Nazar
            <ArrowDown className="transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)] group-hover:translate-y-0.5 motion-reduce:transform-none" />
          </a>
          <p className="text-2xs uppercase tracking-caps text-ink-3">
            Esfihas turcas · Pizzas artesanais
          </p>
        </div>
      </Container>
    </section>
  );
}