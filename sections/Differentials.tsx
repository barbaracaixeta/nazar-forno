import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { DoughIcon, InspirationIcon, OvenIcon } from "@/components/Icons";
import { differentials } from "@/data/differentials";

const ICONS = {
  forno: OvenIcon,
  inspiracao: InspirationIcon,
  massa: DoughIcon,
} as const;

/**
 * "O que torna a Nazar única?"
 *
 * Não são três cards: é um índice editorial — numeral em serifa, título,
 * texto, e um fio que separa as colunas. A profundidade do ícone vem de CSS
 * 3D no hover com ponteiro fino; nada de canvas adicional (um 3D por página é
 * o orçamento; os outros custariam FPS sem ganhar significado).
 */
export function Differentials() {
  return (
    <Section
      id="diferenciais"
      theme="creme"
      eyebrow="A Nazar"
      title="O que torna a Nazar única?"
    >
      <Container>
        <ul className="grid gap-x-10 gap-y-12 md:grid-cols-3">
          {differentials.map((item, index) => {
            const Icon = ICONS[item.id as keyof typeof ICONS] ?? OvenIcon;

            return (
              <Reveal
                as="li"
                key={item.id}
                distance={18}
                delay={index * 90}
                className="pillar group relative border-t border-[var(--color-hairline)] pt-8"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute -top-px left-0 h-px w-0 bg-accent transition-[width] duration-[var(--duration-slow)] ease-[var(--ease-standard)] group-hover:w-full group-focus-visible:w-full motion-reduce:transition-none"
                />

                <div className="flex items-center gap-4">
                  <span className="pillar__icon relative inline-flex h-12 w-12 items-center justify-center rounded-[var(--radius-sm)] text-accent">
                    <span
                      aria-hidden
                      className="pillar__glow absolute inset-0 rounded-[var(--radius-sm)]"
                    />
                    <Icon size={24} className="relative" />
                  </span>
                  <span
                    aria-hidden
                    className="font-display text-sm tracking-caps text-ink-3"
                    data-tabular
                  >
                    {item.index}
                  </span>
                </div>

                <h3 className="mt-5 text-xl">{item.title}</h3>
                <p className="measure-tight mt-2 text-base text-ink-2">
                  {item.description}
                </p>
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}