import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { OrderButton } from "@/components/OrderButton";
import { ProvisionalNote } from "@/components/ProvisionalNote";
import { ArtPlaceholder } from "@/components/PlaceholderArt";
import { firstExperienceSlots } from "@/data/experiences";

/**
 * Primeira experiência.
 *
 * Um dos poucos momentos "dark" do site: aqui a resposta emocional precisa
 * acontecer, então o fundo é o navy do forno com luz quente vindo de baixo.
 *
 * A composição do combo é uma ESTRUTURA, não uma oferta: três posições
 * marcadas como "a definir". Nenhum item, preço ou quantidade foi inventado.
 */
export function FirstExperience() {
  return (
    <section
      id="primeira-experiencia"
      className="theme-navy relative isolate overflow-hidden bg-[var(--color-bg)] py-[var(--space-16)] lg:py-[var(--space-24)]"
      aria-labelledby="primeira-titulo"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(70% 50% at 22% 108%, rgba(199,166,106,0.22) 0%, transparent 66%)",
        }}
      />
      <div aria-hidden className="grain pointer-events-none absolute inset-0 -z-10" />

      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6">
            <Reveal distance={16}>
              <p className="eyebrow">Primeira vez na Nazar</p>
              <h2
                id="primeira-titulo"
                className="display-section mt-5 max-w-[18ch] text-ink"
              >
                Você nunca experimentou uma esfiha turca?
              </h2>
              <p className="mt-6 text-xl text-gold">Então comece por aqui.</p>
              <p className="lede mt-4 text-ink-2">
                Uma seleção especial para você conhecer a experiência Nazar.
              </p>

              <div className="mt-9">
                <OrderButton placement="first_experience">
                  Quero experimentar
                </OrderButton>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-6">
            <Reveal distance={20} delay={100}>
              <div className="surface overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-hairline)]">
                <ArtPlaceholder
                  variant="esfiha-especial"
                  label="Ilustração: esfiha especial sobre o prato, com luz de forno"
                  className="aspect-[5/4] w-full"
                />

                <div className="border-t border-[var(--color-hairline)] p-6 sm:p-8">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-lg text-ink">Seleção de estreia</h3>
                    <span className="badge">Em preparação</span>
                  </div>

                  <dl className="mt-6 divide-y divide-[var(--color-hairline)]">
                    {firstExperienceSlots.map((slot) => (
                      <div
                        key={slot.id}
                        className="flex items-baseline justify-between gap-4 py-4 first:pt-0 last:pb-0"
                      >
                        <dt className="text-base text-ink">{slot.label}</dt>
                        <dd className="text-sm text-ink-3">{slot.hint}</dd>
                      </div>
                    ))}
                  </dl>

                  <ProvisionalNote className="mt-6">
                    Composição e valores definitivos serão publicados pela
                    Nazar.
                  </ProvisionalNote>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}