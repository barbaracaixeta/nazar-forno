import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { StarIcon } from "@/components/Icons";
import { ProvisionalNote } from "@/components/ProvisionalNote";
import { testimonials } from "@/data/testimonials";

/**
 * Prova social.
 *
 * Duas rotas, um componente:
 * - com avaliações reais cadastradas → grid de cards (com estrelas, autor e
 *   data), prepared para Google Reviews;
 * - sem elas → UM painel de estado vazio desenhado, que diz o que é, por que
 *   está vazio e o que acontece a seguir.
 *
 * Três cards com texto de mentira seriam pior que nenhum card (brief §33).
 */
export function Testimonials() {
  return (
    <Section
      id="depoimentos"
      theme="creme"
      eyebrow="Quem experimenta, volta."
      title="Quem experimenta, volta."
      lede="Veja o que os nossos clientes dizem sobre a Nazar."
    >
      <Container>
        {testimonials.length > 0 ? (
          <ul className="grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Reveal
                as="li"
                key={testimonial.id}
                distance={16}
                delay={index * 80}
                className="surface flex flex-col gap-4 rounded-[var(--radius-lg)] border border-[var(--color-hairline)] p-6"
              >
                <div
                  className="flex gap-1 text-gold"
                  aria-label={`${testimonial.rating} de 5 estrelas`}
                >
                  {Array.from({ length: 5 }).map((_, star) => (
                    <StarIcon
                      key={star}
                      size={14}
                      className={
                        star < testimonial.rating ? "opacity-100" : "opacity-30"
                      }
                    />
                  ))}
                </div>
                <blockquote className="measure-tight text-base text-ink">
                  “{testimonial.quote}”
                </blockquote>
                <footer className="mt-auto text-sm text-ink-2">
                  {testimonial.author}
                  <span className="text-ink-3"> · {testimonial.date}</span>
                </footer>
              </Reveal>
            ))}
          </ul>
        ) : (
          <Reveal distance={16}>
            <div className="surface flex flex-col gap-5 rounded-[var(--radius-lg)] border border-[var(--color-hairline)] p-6 sm:flex-row sm:items-start sm:gap-8 sm:p-8">
              <div
                className="flex gap-1 text-gold"
                aria-label="Sem avaliações publicadas"
              >
                {Array.from({ length: 5 }).map((_, star) => (
                  <StarIcon key={star} size={16} className="opacity-40" />
                ))}
              </div>

              <div>
                <p className="measure-tight text-base text-ink">
                  Assim que os primeiros clientes autorizarem a publicação, cada
                  avaliação aparece aqui com o nome de quem autorizou.
                </p>
                <ProvisionalNote className="mt-3">
                  Depoimentos reais em construção · fonte prevista: Google
                  Reviews.
                </ProvisionalNote>
              </div>
            </div>
          </Reveal>
        )}
      </Container>
    </Section>
  );
}