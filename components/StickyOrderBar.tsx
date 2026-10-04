"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { OrderButton } from "./OrderButton";
import { cn } from "@/lib/cn";

/**
 * CTA fixo inferior no mobile.
 *
 * Decisões:
 * - aparece depois do hero (no topo, o CTA do hero já cumpre a função —
 *   dois primários na mesma tela violaria "uma ação primária por tela");
 * - some quando a seção de CTA final entra na viewport (ali o botão já está
 *   em contexto, não precisa repetir);
 * - respeita `env(safe-area-inset-bottom)`;
 * - `env(safe-area-inset-bottom)` + altura fixa reservada no footer, então o
 *   conteúdo nunca fica coberto e não há salto de layout (CLS = 0).
 */
/**
 * Rotas com intenção de compra. Páginas legais não vendem nada: a barra some
 * lá para não disputar atenção com o texto.
 */
const COMMERCE_ROUTES = ["/", "/cardapio", "/a-nazar"];

export function StickyOrderBar() {
  const pathname = usePathname();
  const enabled = COMMERCE_ROUTES.includes(pathname);
  const [pastHero, setPastHero] = useState(false);
  const [finalInView, setFinalInView] = useState(false);

  useEffect(() => {
    let frame: number | null = null;

    const measure = () => {
      frame = null;
      const hero = document.getElementById("hero");
      // Sem hero (ex.: /cardapio) a barra vale desde o primeiro pixel.
      setPastHero(hero ? hero.getBoundingClientRect().bottom < 0 : true);
      const final = document.getElementById("cta-final");
      setFinalInView(Boolean(final && final.getBoundingClientRect().top < window.innerHeight * 0.6));
    };

    const schedule = () => {
      if (frame === null) frame = requestAnimationFrame(measure);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);

  const visible = enabled && pastHero && !finalInView;

  if (!enabled) return null;

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-[var(--z-sticky)] transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)] motion-reduce:transition-none",
        visible ? "translate-y-0" : "translate-y-[130%]",
      )}
    >
      <div
        className="border-t border-[var(--color-hairline)] bg-[var(--palette-navy)] px-5 pt-3"
        style={{ paddingBottom: "max(var(--space-3), env(safe-area-inset-bottom))" }}
      >
        <OrderButton placement="mobile_bar" block>
          Pedir agora
        </OrderButton>
      </div>
    </div>
  );
}

/**
 * Espaço reservado no final do documento para a barra fixa. Renderizado
 * sempre (mesmo com a barra oculta) para que nada mude de posição.
 */
export function StickyOrderBarSpacer() {
  return (
    <div
      aria-hidden="true"
      className="h-[calc(4rem+var(--space-6))] lg:hidden"
    />
  );
}