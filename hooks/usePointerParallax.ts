"use client";

import { useEffect, useRef } from "react";

type Options = {
  /** Suavização por quadro: 0 = sem damping. 0.1–0.2 é o intervalo útil. */
  damping?: number;
  /** Intensidade máxima do deslocamento, em pixels. */
  distance?: number;
  disabled?: boolean;
};

/**
 * Parallax de ponteiro que escreve direto em custom properties do elemento
 * alvo. Não usa estado do React: nenhum re-render durante o movimento.
 *
 * Devolve a função de attach para espalhar a normalized pointer em CSS:
 *   --parallax-x , --parallax-y  (valores -1 → 1)
 *
 * Respeita prefers-reduced-motion devolvendo sempre 0.
 */
export function usePointerParallax({
  damping = 0.12,
  distance = 12,
  disabled = false,
}: Options = {}) {
  const targetRef = useRef<HTMLElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const stateRef = useRef({ tx: 0, ty: 0, x: 0, y: 0 });

  useEffect(() => {
    const node = targetRef.current;
    if (!node) return;
    const element: HTMLElement = node;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

    if (disabled || reduced.matches || !finePointer.matches) {
      element.style.setProperty("--parallax-x", "0");
      element.style.setProperty("--parallax-y", "0");
      return;
    }

    const root = element.closest("[data-parallax-root]") ?? window;

    const onMove = (event: Event) => {
      const pointer = event as PointerEvent;
      const rect = node.getBoundingClientRect();
      const x = (pointer.clientX - rect.left) / rect.width - 0.5;
      const y = (pointer.clientY - rect.top) / rect.height - 0.5;
      stateRef.current.tx = Math.max(-0.5, Math.min(0.5, x));
      stateRef.current.ty = Math.max(-0.5, Math.min(0.5, y));
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    const onLeave = () => {
      stateRef.current.tx = 0;
      stateRef.current.ty = 0;
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    function tick() {
      const s = stateRef.current;
      s.x += (s.tx - s.x) * damping;
      s.y += (s.ty - s.y) * damping;

      element.style.setProperty(
        "--parallax-x",
        (s.x * 2 * distance).toFixed(2),
      );
      element.style.setProperty(
        "--parallax-y",
        (s.y * 2 * distance).toFixed(2),
      );

      const settled =
        Math.abs(s.tx - s.x) < 0.001 && Math.abs(s.ty - s.y) < 0.001;
      if (settled) {
        rafRef.current = null;
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    }

    root.addEventListener("pointermove", onMove, { passive: true });
    root.addEventListener("pointerleave", onLeave, { passive: true });

    return () => {
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [damping, distance, disabled]);

  return targetRef;
}