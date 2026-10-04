"use client";

import { ArtPlaceholder } from "./PlaceholderArt";
import { OrderButton } from "./OrderButton";
import { useTilt } from "@/hooks/useTilt";
import { categoryName } from "@/data/categories";
import type { Product } from "@/data/products";
import { track } from "@/lib/analytics";

/**
 * Card de produto.
 *
 * Hierarquia: imagem → nome → preço → descrição → categoria → ação.
 * Um único botão por card. Preço provisório aparece como rótulo, nunca como
 * número inventado (brief §33).
 *
 * Mobile não depende de hover: botão sempre visível, inclinação apenas com
 * ponteiro fino e movimento permitido (CSS decide, sem JS no caminho crítico).
 */
export function ProductCard({ product }: { product: Product }) {
  const { ref, handlers } = useTilt();

  return (
    <article
      ref={ref}
      onPointerMove={handlers.onPointerMove}
      onPointerLeave={handlers.onPointerLeave}
      onFocusCapture={() => track("click_product", { slug: product.slug })}
      className="card group flex h-full flex-col"
    >
      <div className="card__body overflow-hidden rounded-[var(--radius-lg)]">
        <ArtPlaceholder
          variant={product.art}
          label={`Ilustração de ${product.name}`}
          className="card__art aspect-[4/5] w-full"
        />
      </div>

      <div className="flex flex-1 flex-col pt-5">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="text-lg leading-snug">{product.name}</h3>
          <p className="shrink-0 text-base font-medium text-ink" data-tabular>
            {product.priceLabel}
          </p>
        </div>

        <p className="measure-tight mt-2 text-sm text-ink-2">{product.description}</p>

        <p className="mt-3 text-2xs uppercase tracking-caps text-ink-3">
          {categoryName(product.category)}
        </p>

        <div className="mt-4 flex-1" />

        <OrderButton
          placement="product"
          slug={product.slug}
          variant="secondary"
          block
          className="mt-5"
        >
          Pedir
        </OrderButton>
      </div>
    </article>
  );
}