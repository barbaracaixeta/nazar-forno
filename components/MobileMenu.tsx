"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { navigation } from "@/data/navigation";
import { site, locationLine } from "@/data/site";
import { OrderButton } from "./OrderButton";
import { Wordmark } from "./Wordmark";
import { CloseIcon } from "./Icons";
import { cn } from "@/lib/cn";

/**
 * Menu mobile.
 *
 * Não é um drawer genérico: é uma abertura de tela cheia com tipografia
 * grande, que trata a navegação como parte da identidade. Comportamento:
 * - `role="dialog"` + `aria-modal`, foco preso dentro do painel;
 * - `Escape` fecha e devolve o foco ao botão que abriu;
 * - scroll do body travado com compensação da barra de rolagem;
 * - `env(safe-area-inset-*)` respeitado;
 * - reduced motion: sem stagger, sem transform.
 */
export function MobileMenu({
  id,
  onClose,
  reducedMotion,
}: {
  id: string;
  onClose: () => void;
  reducedMotion: boolean;
}) {
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;

    // Trava o scroll sem deslocar o layout (compensa a scrollbar).
    const gap = window.innerWidth - document.documentElement.clientWidth;
    const { overflow, paddingRight } = document.body.style;
    document.body.style.overflow = "hidden";
    if (gap > 0) document.body.style.paddingRight = `${gap}px`;

    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>("a, button")?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panel) return;

      const focusable = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
      previouslyFocused?.focus?.();
    };
  }, [onClose]);

  const items = navigation;

  return (
    <div
      id={id}
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Menu principal"
      className="theme-navy fixed inset-0 z-[var(--z-drawer)] flex flex-col overflow-y-auto bg-[var(--color-bg)] pb-[env(safe-area-inset-bottom)]"
    >
      <div className="flex h-[var(--header-height)] shrink-0 items-center justify-between px-5">
        <span className="text-ink">
          <Wordmark />
        </span>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius-xs)] text-ink transition-colors duration-[var(--duration-fast)] hover:bg-[color-mix(in_srgb,var(--color-ink)_8%,transparent)]"
        >
          <CloseIcon size={22} />
          <span className="sr-only">Fechar menu</span>
        </button>
      </div>

      <nav aria-label="Navegação principal" className="flex-1 px-5">
        <ul className="flex flex-col">
          {items.map((item, index) => (
            <li
              key={item.label}
              className={cn(
                "border-b border-[var(--color-hairline)]",
                !reducedMotion && "animate-menu-in",
              )}
              style={
                reducedMotion
                  ? undefined
                  : { animationDelay: `${60 + index * 45}ms` }
              }
            >
              <Link
                href={item.href}
                onClick={onClose}
                className="flex min-h-16 items-center font-display text-2xl leading-tight text-ink transition-colors duration-[var(--duration-fast)] hover:text-gold"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-2xs uppercase tracking-caps text-ink-3">
          {locationLine}
        </p>

        <div className="mt-6 flex flex-col gap-3 pb-10">
          <OrderButton placement="header" block>
            Pedir agora
          </OrderButton>
          <p className="text-xs text-ink-3">
            Pedidos e pagamento processados pelo{" "}
            {site.delivery.platform}.
          </p>
        </div>
      </nav>
    </div>
  );
}