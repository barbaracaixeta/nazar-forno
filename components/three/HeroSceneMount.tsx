"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";
import { useThreeCapability } from "@/hooks/useWebGLSupport";
import { WebGLFallback } from "./WebGLFallback";
import { track } from "@/lib/analytics";

/**
 * Ponto de entrada da cena 3D no servidor.
 *
 * `ssr: false` + `next/dynamic` mantêm three.js fora do bundle inicial: o
 * chunk só é baixado quando a cena é realmente necessária. Como `ssr: false`
 * não é permitido em Server Components, este é um Client Component fino
 * (documentação do Next 16, "Lazy Loading").
 */
const ModelViewer = dynamic(
  () => import("./ModelViewer").then((m) => m.ModelViewer),
  { ssr: false },
);

export function HeroSceneMount({ description }: { description: string }) {
  const capability = useThreeCapability();
  const { enabled, reason, quality, settled } = capability;

  useEffect(() => {
    if (!settled || enabled) return;
    track("webgl_fallback", { scope: "hero", cause: reason });
  }, [settled, enabled, reason]);

  // Antes da decisão (primeiro render) e em qualquer caso negativo, a
  // ilustração estática ocupa o lugar: nada pisca, nada fica vazio.
  if (!enabled) {
    return <WebGLFallback description={description} className="absolute inset-0" />;
  }

  return (
    <ModelViewer
      enabled
      quality={quality}
      interactive
      intensity={0.85}
      model={null}
      description={description}
      className="absolute inset-0"
    />
  );
}