import Link from "next/link";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { ArtPlaceholder } from "@/components/PlaceholderArt";
import { ProvisionalNote } from "@/components/ProvisionalNote";

/**
 * História.
 *
 * Texto provisório, sem inventar origem, fundadores ou processo. A seção dá
 * o contexto e encaminha para a página "A Nazar", que é onde a história real
 * vai viver.
 */
export function About() {
  return (
    <Section id="a-nazar" theme="creme" eyebrow="Sobre a marca">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal as="div" distance={18} className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-hairline)]">
              <ArtPlaceholder
                variant="esfiha-carne"
                label="Ilustração: massa assada saindo do forno"
                className="aspect-[4/5] w-full"
              />
            </div>
          </Reveal>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal distance={18} delay={80}>
              <h2 className="display-section max-w-[16ch]">
                Conheça a Nazar.
              </h2>
              <p className="lede mt-6">
                Mais do que esfihas e pizzas, uma experiência que une sabor,
                cuidado e inspiração turca.
              </p>

              <ProvisionalNote className="mt-6">
                História, origem e processo reais entram na página da marca.
              </ProvisionalNote>

              <div className="mt-9">
                <Link href="/a-nazar" className="btn btn-secondary">
                  Conheça nossa história
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}