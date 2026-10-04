"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { track } from "@/lib/analytics";

type ReducedMotionValue = boolean;

const ReducedMotionContext = createContext<ReducedMotionValue>(false);

/**
 * Reage a mudanças de `prefers-reduced-motion` durante a sessão — o usuário
 * pode alternar a configuração do sistema com a página aberta. Também é o
 * ponto único de verdade para reduced motion na interface (nenhum componente
 * duplica `matchMedia`).
 */
export function ReducedMotionProvider({ children }: { children: ReactNode }) {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      const value = mql.matches;
      setReduced(value);
      if (value) track("enable_reduced_motion", { scope: "session" });
    };

    sync();
    mql.addEventListener("change", sync);
    return () => mql.removeEventListener("change", sync);
  }, []);

  return (
    <ReducedMotionContext.Provider value={reduced}>
      {children}
    </ReducedMotionContext.Provider>
  );
}

export function usePrefersReducedMotion(): boolean {
  return useContext(ReducedMotionContext);
}