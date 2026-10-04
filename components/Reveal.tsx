"use client";

import type { CSSProperties, ElementType, ReactNode } from "react";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/cn";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  id?: string;
  /** Distância inicial em px — só dois valores em uso no site. */
  distance?: number;
  delay?: number;
  once?: boolean;
};

/**
 * Revelação por entrada na viewport.
 *
 * Sem estado de "já hidratou" e sem `setState` em efeito: o `useInView`
 * escreve `data-inview` no elemento e o CSS anima `transform` e `opacity`.
 *
 * Três garantias:
 * - sem JavaScript (ou antes de ele rodar) o conteúdo aparece: o estado
 *   invisível exige `data-inview="false"`, atributo que só o hook escreve, e
 *   só depois da hidratação;
 * - com `prefers-reduced-motion: reduce` não há transformação nem transição —
 *   a regra é do CSS, não do componente;
 * - nada de `transition: all`: só as duas propriedades que mudam.
 */
export function Reveal({
  children,
  as: Tag = "div",
  className,
  id,
  distance = 14,
  delay = 0,
  once = false,
}: RevealProps) {
  const ref = useInView<HTMLDivElement>({ rootMargin: "0px 0px -6% 0px", once });

  // `ElementType` genérico não propaga `children`/`ref`; o cast local é o
  // preço de manter a primitiva polimórfica sem duplicar cinco componentes.
  const Component = Tag as "div";

  return (
    <Component
      id={id}
      ref={ref}
      style={
        {
          "--reveal-distance": `${distance}px`,
          transitionDelay: `${delay}ms`,
        } as CSSProperties
      }
      className={cn("reveal", className)}
    >
      {children}
    </Component>
  );
}
