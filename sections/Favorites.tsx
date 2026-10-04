import Link from "next/link";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { ProductCard } from "@/components/ProductCard";
import { featuredProducts } from "@/data/products";

/**
 * "Os favoritos da Nazar."
 *
 * Grelha assimétrica de propósito: um produto em destaque (2×2) e quatro
 * menores. Grade uniforme de cinco cards iguais seria template; aqui o olho
 * tem hierarquia desde o primeiro olhar.
 */
export function Favorites() {
  const [feature, ...rest] = featuredProducts;

  return (
    <Section
      id="favoritos"
      theme="creme"
      eyebrow="Cardápio"
      title="Os favoritos da Nazar."
      lede="Sabores que conquistam desde o primeiro pedido."
    >
      <Container>
        <ul className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-6">
          {feature && (
            <Reveal
              as="li"
              distance={18}
              className="sm:col-span-2 lg:col-span-2 lg:row-span-2"
            >
              <ProductCard product={feature} />
            </Reveal>
          )}

          {rest.map((product, index) => (
            <Reveal
              as="li"
              key={product.id}
              distance={18}
              delay={60 + index * 70}
              className="sm:col-span-1 lg:col-span-2"
            >
              <ProductCard product={product} />
            </Reveal>
          ))}
        </ul>

        <div className="mt-14 flex flex-col gap-4 sm:flex-row sm:items-center">
          <Link href="/cardapio" className="btn btn-secondary">
            Ver cardápio completo
          </Link>
          <p className="text-sm text-ink-3">
            Preços e disponibilidade são atualizados no cardápio oficial.
          </p>
        </div>
      </Container>
    </Section>
  );
}