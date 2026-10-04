"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Progresso (0→1) de um elemento atravessando a viewport, para narrativa por
 * scroll. Leitura em rAF com scroll passivo: nunca bloqueia o scroll nem
 * causa layout thrash (só lê `getBoundingClientRect`).
 *
 * Não guarda o valor no estado a cada quadro se o consumidor só precisa de
 * callbacks — por isso `onProgress` recebe o número direto.
 */
export function useScrollProgress<T extends HTMLElement = HTMLElement>({
  onProgress,
}: {
  onProgress?: (progress: number) => void;
} = {}) {
  const ref = useRef<T | null>(null);
  const [progress, setProgress] = useState(0);
  const cbRef = useRef(onProgress);

  // Callback mais recente sem recriar o listener de scroll a cada render.
  useEffect(() => {
    cbRef.current = onProgress;
  }, [onProgress]);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    let raf: number | null = null;
    let last = -1;

    const measure = () => {
      raf = null;
      const rect = node.getBoundingClientRect();
      const viewport = window.innerHeight || 1;

      // Progresso do elemento entre dois marcos da viewport.
      const raw = (viewport - rect.top) / (viewport + rect.height);
      const value = Math.max(0, Math.min(1, raw));

      if (Math.abs(value - last) < 0.005) return;
      last = value;
      setProgress(value);
      cbRef.current?.(value);
    };

    const onScroll = () => {
      if (reduced.matches) {
        // Sem movimento: um único passo discreto, com base no posição.
        const rect = node.getBoundingClientRect();
        const viewport = window.innerHeight || 1;
        setProgress(rect.top < viewport ? 1 : 0);
        return;
      }
      if (raf === null) raf = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, []);

  return { ref, progress } as const;
}