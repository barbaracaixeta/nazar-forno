"use client";

import type { ReactNode } from "react";
import { orderHref, type OrderPlacement } from "@/lib/order";
import { track, type AnalyticsEvent } from "@/lib/analytics";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "tertiary";

type OrderButtonProps = {
  /** Posição do CTA — define UTM e evento de analytics. */
  placement: OrderPlacement;
  children: ReactNode;
  variant?: Variant;
  /** Slug do produto, quando o CTA vem de um card. */
  slug?: string;
  className?: string;
  block?: boolean;
  /** Sobrescreve o destino (uso raro: cardápio âncora). */
  href?: string;
  /** Rótulo acessível quando o texto visível não basta. */
  ariaLabel?: string;
};

const VARIANT_CLASS: Record<Variant, string> = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  tertiary: "btn-tertiary",
};

/**
 * Algumas posições têm um evento próprio além de `click_order`. Derivamos do
 * `placement` em vez de expor um `onClick`: assim o evento nunca pode ser
 * esquecido e a API do componente continua enxuta.
 */
const EXTRA_EVENT: Partial<Record<OrderPlacement, AnalyticsEvent>> = {
  first_experience: "click_first_experience",
  club: "click_nazar_club",
  mobile_bar: "click_order",
};

/**
 * Único ponto de saída para o checkout. Todos os CTAs de pedido passam aqui,
 * o que garante: mesmo destino, mesma atribuição, mesmo evento.
 *
 * Abre em nova aba para que a pessoa não perca a experiência de marca ao
 * voltar do checkout — o aviso "(abre em nova aba)" é lido por leitor de tela.
 */
export function OrderButton({
  placement,
  children,
  variant = "primary",
  slug,
  className,
  block = false,
  href,
  ariaLabel,
}: OrderButtonProps) {
  const target = href ?? orderHref(placement, slug);

  return (
    <a
      href={target}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      onClick={() => {
        track("click_order", { placement, slug });
        const extra = EXTRA_EVENT[placement];
        if (extra && extra !== "click_order") track(extra, { placement });
      }}
      className={cn(
        "btn",
        VARIANT_CLASS[variant],
        block && "btn-block",
        className,
      )}
    >
      {children}
      <span className="sr-only"> (abre em nova aba)</span>
    </a>
  );
}