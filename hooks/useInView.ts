"use client";

import { useEffect, useRef } from "react";

/**
 * Observa a entrada do elemento na viewport **sem usar estado React**.
 *
 * O atributo `data-inview` é a única fonte de verdade do CSS (ver `.reveal` em
 * globals.css): enquanto ele não existir — servidor, primeiro paint, sem JS —
 * o conteúdo está visível. Só o valor "false" esconde.
 *
 * O estado inicial é resolvido de forma **síncrona**, na montagem, com um
 * `getBoundingClientRect()`: o que já está na viewport recebe "true" antes do
 * primeiro quadro pintado. O IntersectionObserver só entra depois, para
 * manter o estado em rolagem.
 *
 * Isso é deliberado:
 *
 * - sem flag global de JavaScript no <html>: mutar o DOM antes da hidratação
 *   faz o React acusar mismatch de atributos;
 * - sem `setState` em efeito (regra `react-hooks/set-state-in-effect`), sem
 *   render em cascata a cada entrada/saída;
 * - o conteúdo visível **nunca** depende de o observer disparar: se o browser
 *   atrasar, adiar ou não suportar o observer, a página continua legível. Um
 *   site de restaurante com texto invisível é pior que um site sem animação.
 */
export function useInView<T extends HTMLElement = HTMLElement>({
  rootMargin = "0px 0px -6% 0px",
  threshold = 0,
  once = false,
}: {
  rootMargin?: string;
  threshold?: number;
  once?: boolean;
} = {}) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const visibleNow = () => {
      const rect = node.getBoundingClientRect();
      return rect.top < window.innerHeight && rect.bottom > 0;
    };

    node.dataset.inview = visibleNow() ? "true" : "false";
    if (once && node.dataset.inview === "true") return;

    // Sem IntersectionObserver (navegador muito antigo): o estado sincrono
    // acima é o estado final. Conteúdo visível é o fallback seguro.
    if (typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[entries.length - 1];
        if (!entry) return;
        node.dataset.inview = entry.isIntersecting ? "true" : "false";
        if (entry.isIntersecting && once) observer.disconnect();
      },
      { rootMargin, threshold },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin, threshold, once]);

  return ref;
}