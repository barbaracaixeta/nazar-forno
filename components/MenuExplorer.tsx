"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArtPlaceholder } from "@/components/PlaceholderArt";
import { OrderButton } from "@/components/OrderButton";
import { categories } from "@/data/categories";
import { productsByCategory } from "@/data/products";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/cn";

/**
 * Cardápio.
 *
 * DECISÃO (contra a leitura literal do briefing de "tabs"): todas as categorias
 * ficam renderizadas no HTML e visíveis. Abas que escondem conteúdo têm três
 * custos reais aqui — texto invisível para indexação, navegação quebrada sem
 * JavaScript e salto de layout na hidratação. No lugar, a navegação é um trilho
 * de âncoras com scroll horizontal no mobile (área de toque ≥ 44px) e
 * scroll-spy que marca a categoria atual — a mesma informação, sem esconder
 * nada. Categoria ativa é marcada por forma + `aria-current`, nunca só por cor.
 */
export function MenuExplorer() {
  return (
    <>
      <CategoryRail />
      <div className="mt-12 flex flex-col gap-20">
        {categories.map((category) => {
          const items = productsByCategory(category.id);
          return (
            <section
              key={category.id}
              id={category.id}
              aria-labelledby={`titulo-${category.id}`}
              className="scroll-mt-[calc(var(--header-height)+var(--space-6))]"
            >
              <header className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-[var(--color-hairline)] pb-4">
                <h2 id={`titulo-${category.id}`} className="text-2xl">
                  {category.name}
                </h2>
                <p className="measure-tight text-sm text-ink-2">
                  {category.description}
                </p>
              </header>

              {items.length > 0 ? (
                <ul className="mt-8 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((product) => (
                    <li key={product.id} className="flex gap-5">
                      <div className="w-24 shrink-0 sm:w-28">
                        <ArtPlaceholder
                          variant={product.art}
                          label={`Ilustração de ${product.name}`}
                          className="aspect-square w-full rounded-[var(--radius-md)]"
                        />
                      </div>
                      <div className="flex min-w-0 flex-1 flex-col">
                        <div className="flex items-baseline justify-between gap-3">
                          <h3 className="text-base leading-snug">
                            {product.name}
                          </h3>
                          <p
                            className="shrink-0 text-base font-medium"
                            data-tabular
                          >
                            {product.priceLabel}
                          </p>
                        </div>
                        <p className="measure-tight mt-1 text-sm text-ink-2">
                          {product.description}
                        </p>
                        <div className="mt-3 flex-1" />
                        <OrderButton
                          placement="product"
                          slug={product.slug}
                          variant="secondary"
                          className="mt-3 self-start"
                        >
                          Pedir
                        </OrderButton>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <EmptyCategory name={category.name} />
              )}
            </section>
          );
        })}
      </div>
    </>
  );
}

/** Trilho de categorias: âncoras reais (funcionam sem JS) + scroll-spy. */
function CategoryRail() {
  const [active, setActive] = useState<string>(categories[0].id);
  const railRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const sections = categories
      .map((category) => document.getElementById(category.id))
      .filter((node): node is HTMLElement => Boolean(node));

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      // Faixa de detecção junto ao topo: a categoria "atual" é a que está
      // sendo lida, não a que cruzou o centro da tela.
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={railRef}
      className={cn(
        "sticky top-[var(--header-height)] z-[var(--z-base)] -mx-5 overflow-x-auto px-5 md:mx-0 md:px-0",
        "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
      )}
    >
      <nav aria-label="Categorias do cardápio">
        <ul className="flex snap-x snap-mandatory gap-2 border-b border-[var(--color-hairline)] pb-3">
          {categories.map((category) => {
            const isActive = category.id === active;
            return (
              <li key={category.id} className="snap-start">
                <Link
                  href={`#${category.id}`}
                  onClick={() => track("click_category", { category: category.id })}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "inline-flex min-h-11 items-center gap-2 rounded-[var(--radius-full)] border px-4 text-sm font-medium transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)]",
                    isActive
                      ? "border-accent bg-accent-quiet text-accent"
                      : "border-transparent text-ink-2 hover:border-[var(--color-hairline-strong)] hover:text-ink",
                  )}
                >
                  {category.name}
                  {isActive && (
                    <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

/**
 * Estado vazio desenhado (constitution §12): o que é, por que está vazio e o
 * que fazer agora. Nunca "nenhum resultado" sem saída.
 */
function EmptyCategory({ name }: { name: string }) {
  return (
    <div className="surface mt-8 flex flex-col items-start gap-4 rounded-[var(--radius-lg)] border border-[var(--color-hairline)] p-6 sm:p-8">
      <p className="text-lg">{name} em preparação</p>
      <p className="measure-tight text-sm text-ink-2">
        Ainda não há itens cadastrados nesta categoria. Enquanto isso, veja as
        esfihas e pizzas já disponíveis ou peça direto pelo{" "}
        <span className="text-ink">Xeguei</span>.
      </p>
      <OrderButton placement="menu" variant="secondary">
        Pedir agora
      </OrderButton>
    </div>
  );
}