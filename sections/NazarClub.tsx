import Link from "next/link";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { OrderButton } from "@/components/OrderButton";
import { ProvisionalNote } from "@/components/ProvisionalNote";
import { clubNotice, clubTiers } from "@/data/club";

/**
 * Nazar Club.
 *
 * Escada ascendente em vez de três cards iguais: a progressão em degraus é a
 * própria metáfora de acúmulo. Dourado aparece só nos números — um detalhe,
 * não uma decoração. Nenhum sistema de pontos existe por trás: é
 * representação visual (brief §19).
 */
export function NazarClub() {
  return (
    <Section
      id="nazar-club"
      theme="creme"
      eyebrow="Nazar Club"
      title="Seu próximo pedido pode valer mais."
      lede="Faça parte do Nazar Club e transforme seus pedidos em benefícios."
    >
      <Container>
        <ol className="grid gap-5 sm:grid-cols-3 sm:items-end">
          {clubTiers.map((tier, index) => (
            <Reveal
              as="li"
              key={tier.id}
              distance={16}
              delay={index * 90}
              className="club__item relative overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-hairline)] bg-[var(--color-surface)] p-6 sm:p-7"
            >
              <div aria-hidden className="club__glow absolute inset-0" />

              <div className="relative">
                <p className="flex items-baseline gap-2 text-gold">
                  <span className="font-display text-3xl leading-none" data-tabular>
                    {tier.points}
                  </span>
                  <span className="text-sm text-ink-2">pontos</span>
                </p>

                <div aria-hidden className="mt-5 h-px w-full bg-[var(--color-hairline-strong)]" />

                <p className="mt-5 text-lg text-ink">{tier.label}</p>
                <p className="mt-1 text-sm text-ink-2">{tier.detail}</p>
              </div>
            </Reveal>
          ))}
        </ol>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
          <OrderButton placement="club">Pedir agora</OrderButton>
          <Link href="/a-nazar#programa" className="btn btn-tertiary">
            Saiba mais
          </Link>
        </div>

        <ProvisionalNote className="mt-6">{clubNotice}</ProvisionalNote>
      </Container>
    </Section>
  );
}