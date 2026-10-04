"use client";

import { useSyncExternalStore } from "react";

export type ThreeFallbackReason =
  | "ready"
  | "no-webgl"
  | "save-data"
  | "low-end"
  | "reduced-motion";

export type ThreeCapability = {
  /** O 3D pode ser montado? */
  enabled: boolean;
  reason: ThreeFallbackReason;
  /** Dpr e densidade de detalhe a usar quando habilitado. */
  quality: "high" | "low";
  /** Dispara quando a decisão muda — usado para analytics. */
  settled: boolean;
};

type NavigatorWithHints = Navigator & {
  deviceMemory?: number;
  connection?: { saveData?: boolean; effectiveType?: string };
};

function detectWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") ??
      canvas.getContext("webgl") ??
      canvas.getContext("experimental-webgl");
    return Boolean(gl);
  } catch {
    return false;
  }
}

/** Estado do servidor: sem 3D, mas ainda não decidido (`settled: false`). */
const SERVER_SNAPSHOT: ThreeCapability = {
  enabled: false,
  reason: "no-webgl",
  quality: "low",
  settled: false,
};

/**
 * `useSyncExternalStore` em vez de `useState` + efeito: a capacidade do
 * dispositivo é um fato do navegador, não estado React. O servidor entrega o
 * snapshot estático; o primeiro render do cliente também (hidratação idêntica)
 * e o React troca para o valor real logo depois. Nenhum `setState` em efeito,
 * nenhuma troca de layout durante a leitura.
 */
export function useThreeCapability(): ThreeCapability {
  return useSyncExternalStore(subscribeNever, getCapability, () => SERVER_SNAPSHOT);
}

/** Não há nada para assinar: a decisão é estável durante a sessão. */
function subscribeNever() {
  return () => {};
}

let cached: ThreeCapability | null = null;

function getCapability(): ThreeCapability {
  cached ??= probe();
  return cached;
}

/**
 * Decide se a cena 3D deve existir. A decisão é feita UMA vez, no cliente,
 * e o resultado é estável durante a sessão — evita trocar o layout no meio
 * da leitura.
 *
 * Ordem de decisão: consentimento de movimento → WebGL → economia de dados →
 * hardware. Sempre há fallback visual para o caso negativo.
 */
function probe(): ThreeCapability {
  const nav = navigator as NavigatorWithHints;
  const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

  if (reducedMotion) {
    return {
      enabled: false,
      reason: "reduced-motion",
      quality: "low",
      settled: true,
    };
  }

  if (!detectWebGL()) {
    return { enabled: false, reason: "no-webgl", quality: "low", settled: true };
  }

  if (nav.connection?.saveData === true) {
    return { enabled: false, reason: "save-data", quality: "low", settled: true };
  }

  const slowConnection =
    nav.connection?.effectiveType === "2g" ||
    nav.connection?.effectiveType === "slow-2g";

  const lowEnd =
    (nav.deviceMemory !== undefined && nav.deviceMemory <= 4) ||
    (nav.hardwareConcurrency !== undefined && nav.hardwareConcurrency <= 4) ||
    slowConnection;

  return {
    enabled: true,
    reason: "ready",
    quality: lowEnd ? "low" : "high",
    settled: true,
  };
}