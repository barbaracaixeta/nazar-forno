import { Container } from "@/components/Container";
import { TrackedLink } from "@/components/TrackedLink";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { ArtPlaceholder } from "@/components/PlaceholderArt";
import { ArrowUpRight } from "@/components/Icons";
import { moments } from "@/data/experiences";

/**
 * "Escolha seu momento".
 *
 * Composição editorial em mosaico assimétrico — propositalmente não é uma
 * grade de quatro cards iguais. No hover (ou foco) a arte ganha profundidade:
 * a moldura inclina, a luz quente sobe e uma camada de textura aparece.
 * Tudo em CSS, sem canvas, sem JS no caminho crítico.
 */
const SPAN = [
  "lg:col-span-7",
  "lg:col-span-5 lg:mt-16",
  "lg:col-span-5",
  "lg:col-span-7 lg:mt-10",
];

const RATIO = [
  "aspect-[16/10]",
  "aspect-[4/5]",
  "aspect-[4/5]",
  "aspect-[16/9]",
];

export function Experiences() {
  return (
    <Section
      id="momentos"
      theme="creme"
      eyebrow="Para cada ocasião"
      title="Escolha seu momento."
      lede="Seja para um momento só seu ou para compartilhar, sempre existe uma Nazar perfeita para a sua ocasião."
    >
      <Container>
        <ul className="grid gap-8 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-14">
          {moments.map((moment, index) => (
            <Reveal
              as="li"
              key={moment.id}
              distance={20}
              delay={index * 70}
              className={`group ${SPAN[index % SPAN.length]}`}
            >
              <TrackedLink
                href="/cardapio"
                event="click_category"
                payload={{ category: moment.id }}
                className="block rounded-[var(--radius-lg)]"
              >
                <div className="moment__frame relative overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-hairline)] bg-[var(--color-surface)]">
                  <ArtPlaceholder
                    variant={moment.art}
                    label={`Ilustração: ${moment.title}`}
                    className={`moment__art w-full ${RATIO[index % RATIO.length]}`}
                  />
                  {/* camada de textura revelada no hover */}
                  <span aria-hidden className="moment__texture absolute inset-0" />
                  {/* luz que muda com a interação */}
                  <span aria-hidden className="moment__light absolute inset-0" />
                </div>

                <div className="mt-5 flex items-start justify-between gap-6">
                  <div>
                    <p
                      aria-hidden
                      className="text-2xs uppercase tracking-caps text-ink-3"
                      data-tabular
                    >
                      {moment.index}
                    </p>
                    <h3 className="mt-2 text-xl">{moment.title}</h3>
                    <p className="mt-1 text-base text-ink-2">{moment.description}</p>
                  </div>
                  <span className="mt-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-sm)] border border-[var(--color-hairline)] text-ink transition-colors duration-[var(--duration-fast)] group-hover:border-accent group-hover:text-accent">
                    <ArrowUpRight size={18} />
                  </span>
                </div>
              </TrackedLink>
            </Reveal>
          ))}
        </ul>

        <div className="mt-14">
          <TrackedLink href="/cardapio" event="view_menu" className="btn btn-secondary">
            Ver cardápio
            <span className="sr-only">completo</span>
          </TrackedLink>
        </div>
      </Container>
    </Section>
  );
}