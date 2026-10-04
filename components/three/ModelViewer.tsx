"use client";

import { useCallback, useEffect, useState } from "react";
import { NazarHeroScene } from "@/three/NazarHeroScene";
import { WebGLFallback } from "./WebGLFallback";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/cn";

export type ModelViewerProps = {
  /** Liga/desliga a cena sem desmontar o layout. */
  enabled: boolean;
  quality?: "high" | "low";
  /** Interação com ponteiro e rolagem. */
  interactive?: boolean;
  /** Escala do movimento — 1 = nominal. */
  intensity?: number;
  /** GLB real; `null` usa a geometria procedural. */
  model?: string | null;
  /** Descrição textual do que o canvas mostra (para leitor de tela). */
  description: string;
  className?: string;
};

/**
 * Hospedeiro da cena 3D. Contrato único para qualquer cena do site:
 *
 * - o fallback visual é renderizado SEMPRE por baixo — nunca há área vazia
 *   nem salto de layout quando o WebGL falta ou some;
 * - `quality` e `intensity` controlam custo sem tocar na cena;
 * - a degradação é medida em runtime (FPS real), não estimada;
 * - perda de contexto WebGL volta ao fallback e reporta o evento;
 * - a descrição textual existe: nenhuma informação depende do canvas.
 */
export function ModelViewer({
  enabled,
  quality = "high",
  interactive = true,
  intensity = 0.85,
  model = null,
  description,
  className,
}: ModelViewerProps) {
  const [degraded, setDegraded] = useState(false);
  const [contextLost, setContextLost] = useState(false);

  // Reset ao mudar `enabled`: ajustamos o estado durante o render, que é o
  // padrão do React para "derivar estado de prop", em vez de um efeito que
  // dispara um segundo render.
  const [lastEnabled, setLastEnabled] = useState(enabled);
  if (lastEnabled !== enabled) {
    setLastEnabled(enabled);
    if (degraded) setDegraded(false);
    if (contextLost) setContextLost(false);
  }

  const onDegrade = useCallback(() => {
    setDegraded(true);
    track("webgl_fallback", { scope: "hero", cause: "low-fps" });
  }, []);

  const onContextLost = useCallback(() => {
    setContextLost(true);
    track("webgl_fallback", { scope: "hero", cause: "context-lost" });
  }, []);

  const showScene = enabled && !contextLost;

  useEffect(() => {
    if (showScene) track("view_3d_hero", { quality: degraded ? "low" : quality });
  }, [showScene, degraded, quality]);

  return (
    <div className={cn("relative isolate", className)} data-3d-enabled={enabled}>
      <WebGLFallback className="absolute inset-0" hidden={showScene} />

      {showScene ? (
        <div className="absolute inset-0 animate-fade">
          <NazarHeroScene
            interactive={interactive}
            intensity={intensity}
            quality={degraded ? "low" : quality}
            model={model}
            onInteract={() => track("interact_3d_hero")}
            onDegrade={onDegrade}
            onContextLost={onContextLost}
          />
        </div>
      ) : null}

      <p className="sr-only">{description}</p>
    </div>
  );
}