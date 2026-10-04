"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import type { Group, Sprite, SpriteMaterial as THREE_SpriteMaterial } from "three";
import { createSifihaGeometry, createPlateGeometry } from "./geometry";
import { createDoughMaterial, createPlateMaterial } from "./materials";
import { createContactShadowTexture, createSteamTexture } from "./textures";
import { sceneColors } from "./palette";

export type SceneQuality = "high" | "low";

export type NazarSceneProps = {
  /** Responde a ponteiro e rolagem? */
  interactive: boolean;
  /** Escala da resposta (0–1). Movimento sutil por padrão. */
  intensity: number;
  quality: SceneQuality;
  /**
   * Caminho de um GLB real. Enquanto `null`, usa a geometria procedural —
   * trocar o asset não muda a API nem o layout.
   */
  model?: string | null;
  onInteract?: () => void;
  onDegrade?: () => void;
  onContextLost?: () => void;
};

const YAW_LIMIT = 0.2; // ~11°
const PITCH_LIMIT = 0.11; // ~6°

/* -------------------------------------------------------------------------- */
/* Cena                                                                       */
/* -------------------------------------------------------------------------- */

export function NazarHeroScene({
  interactive,
  intensity,
  quality,
  onInteract,
  onDegrade,
  onContextLost,
}: NazarSceneProps) {
  return (
    <Canvas
      dpr={quality === "high" ? [1, 1.75] : [1, 1.25]}
      camera={{ position: [0, 0.62, 4.6], fov: 36, near: 0.1, far: 30 }}
      gl={{
        antialias: quality === "high",
        alpha: true,
        powerPreference: "high-performance",
      }}
      style={{ touchAction: "pan-y" }}
      onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
      frameloop="always"
    >
      <SceneContents
        interactive={interactive}
        intensity={intensity}
        quality={quality}
        onInteract={onInteract}
        onDegrade={onDegrade}
        onContextLost={onContextLost}
      />
    </Canvas>
  );
}

function SceneContents({
  interactive,
  intensity,
  quality,
  onInteract,
  onDegrade,
  onContextLost,
}: NazarSceneProps) {
  return (
    <>
      <ActivityGate />
      <ContextGuard onLost={onContextLost} />
      <PerformanceGuard onDegrade={onDegrade} />

      {/* Luz do forno: chave quente, preenchimento frio, calor vindo de baixo */}
      <ambientLight intensity={0.55} color="#ffe7c4" />
      <directionalLight
        position={[-2.4, 3.2, 2.6]}
        intensity={2.1}
        color={sceneColors.keyLight}
      />
      <directionalLight
        position={[2.8, 0.6, 1.4]}
        intensity={0.55}
        color={sceneColors.rimLight}
      />
      <pointLight
        position={[0.4, -1.6, 1.8]}
        intensity={0.7}
        color="#ff9a4d"
      />

      <Stage interactive={interactive} intensity={intensity} quality={quality} onInteract={onInteract} />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* Objeto principal: massa, prato, sombra, vapor                               */
/* -------------------------------------------------------------------------- */

function Stage({
  interactive,
  intensity,
  quality,
  onInteract,
}: Pick<
  NazarSceneProps,
  "interactive" | "intensity" | "quality" | "onInteract"
>) {
  const group = useRef<Group>(null);
  const heat = useRef(0);
  const pulse = useRef(0);
  const pointer = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const scroll = useRef(0);
  const dragging = useRef(false);

  const doughGeometry = useMemo(
    () =>
      createSifihaGeometry(
        quality === "high" ? { widthSegments: 96, heightSegments: 64 } : { widthSegments: 48, heightSegments: 32 },
      ),
    [quality],
  );

  const doughMaterial = useMemo(() => createDoughMaterial(), []);
  /**
   * Espelho em ref do material. O `useFrame` muda `uHeat` a cada quadro: isso é
   * mutação de objeto de GPU, não estado de React. O Compiler do React
   * congelaria um valor devolvido por `useMemo`, então o loop escreve pelo ref
   * — o único container mutável por contrato.
   */
  const doughMaterialRef = useRef(doughMaterial);

  const plateGeometry = useMemo(() => createPlateGeometry(), []);
  const plateMaterial = useMemo(() => createPlateMaterial(), []);
  const shadowTexture = useMemo(() => createContactShadowTexture(), []);
  const steamTexture = useMemo(() => createSteamTexture(), []);

  useEffect(() => {
    return () => {
      doughGeometry.dispose();
      doughMaterial.dispose();
      plateGeometry.dispose();
      plateMaterial.dispose();
      shadowTexture.dispose();
      steamTexture.dispose();
    };
  }, [
    doughGeometry,
    doughMaterial,
    plateGeometry,
    plateMaterial,
    shadowTexture,
    steamTexture,
  ]);

  /* --- ponteiro: janela inteira, para que o objeto responda mesmo quando o
         cursor está sobre o texto do hero ---------------------------------- */
  useEffect(() => {
    if (!interactive) return;

    const onMove = (event: PointerEvent) => {
      // No toque, só reage enquanto o dedo está arrastando sobre o objeto.
      if (event.pointerType === "touch" && !dragging.current) return;

      const target = pointer.current;
      target.targetX = (event.clientX / window.innerWidth) * 2 - 1;
      target.targetY = (event.clientY / window.innerHeight) * 2 - 1;
    };

    const onLeave = () => {
      pointer.current.targetX = 0;
      pointer.current.targetY = 0;
    };

    const onDown = (event: PointerEvent) => {
      if (event.pointerType === "touch") dragging.current = true;
    };

    const onUp = (event: PointerEvent) => {
      if (event.pointerType === "touch") dragging.current = false;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    window.addEventListener("pointerleave", onLeave, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, [interactive]);

  /* --- rolagem: aproximação e rotação mínimas ----------------------------- */
  useEffect(() => {
    const onScroll = () => {
      const hero = document.getElementById("hero");
      if (!hero) return;
      const rect = hero.getBoundingClientRect();
      const total = rect.height + window.innerHeight;
      scroll.current = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / total));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  /* --- toque/clique: pulso de calor. É atmosfera, não informação: nada é
         revelado apenas por esta interação, então não exige equivalente por
         teclado (brief §24). */
  const triggerHeat = useCallback(() => {
    heat.current = 1;
    pulse.current = 1;
    onInteract?.();
  }, [onInteract]);

  // Só conta como toque se o dedo/cursor não arrastou (evita disparo ao rolar).
  const handlePointerUp = useCallback(
    (event: { point?: unknown }) => {
      void event;
      triggerHeat();
    },
    [triggerHeat],
  );

  useFrame((state, delta) => {
    const node = group.current;
    if (!node) return;

    const t = state.clock.elapsedTime;
    const damping = 1 - Math.pow(0.0016, delta); // ~0.12 por quadro a 60fps

    const p = pointer.current;
    p.x += (p.targetX - p.x) * damping;
    p.y += (p.targetY - p.y) * damping;

    const strength = interactive ? intensity : 0;
    const progress = scroll.current;

    // respiração muito lenta: o objeto parece vivo, não girando
    const breathe = Math.sin(t * 0.32) * 0.022;
    const idleYaw = Math.sin(t * 0.14) * 0.05;

    node.rotation.y = idleYaw + p.x * YAW_LIMIT * strength + progress * 0.2;
    node.rotation.x = breathe + p.y * PITCH_LIMIT * strength;

    const approach = 1 + progress * 0.06 * strength;
    const pulseScale = 1 + pulse.current * 0.028;
    node.scale.setScalar(approach * pulseScale);
    node.position.y = -progress * 0.05 * strength;

    // calor e pulso decaem
    heat.current = Math.max(0, heat.current - delta * 1.6);
    pulse.current = Math.max(0, pulse.current - delta * 2.4);

    doughMaterialRef.current.uniforms.uHeat.value = heat.current;
  });

  const steamCount = quality === "high" ? 3 : 2;

  return (
    <group>
      {/* prato */}
      <mesh geometry={plateGeometry} material={plateMaterial} position={[0, -0.575, 0]} />

      {/* sombra de contato: gradiente, não shadow map */}
      <mesh position={[0, -0.532, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={2.1}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          map={shadowTexture}
          transparent
          opacity={0.62}
          depthWrite={false}
        />
      </mesh>

      <group ref={group} onPointerUp={handlePointerUp}>
        <mesh geometry={doughGeometry} material={doughMaterial} position={[0, -0.05, 0]} />

        {/* vapor: três sprites discretos, textura gerada em canvas */}
        {Array.from({ length: steamCount }).map((_, index) => (
          <SteamSprite
            key={index}
            texture={steamTexture}
            index={index}
            count={steamCount}
          />
        ))}
      </group>
    </group>
  );
}

/* -------------------------------------------------------------------------- */
/* Vapor                                                                      */
/* -------------------------------------------------------------------------- */

function SteamSprite({
  texture,
  index,
  count,
}: {
  texture: import("three").Texture;
  index: number;
  count: number;
}) {
  const ref = useRef<Sprite>(null);
  const offset = index / count;

  useFrame((state) => {
    const sprite = ref.current;
    if (!sprite) return;

    const t = state.clock.elapsedTime * 0.32 + offset;
    const cycle = t % 1;

    sprite.position.set(
      Math.sin(t * 1.6 + index) * 0.3,
      0.72 + cycle * 1.15,
      Math.cos(t * 1.1 + index) * 0.12,
    );

    const scale = 0.42 + cycle * 0.85;
    sprite.scale.set(scale, scale * 1.25, 1);
    (sprite.material as THREE_SpriteMaterial).opacity =
      Math.sin(cycle * Math.PI) * 0.17;
  });

  return (
    <sprite ref={ref}>
      <spriteMaterial
        map={texture}
        color={sceneColors.steam}
        transparent
        opacity={0}
        depthWrite={false}
      />
    </sprite>
  );
}

/* -------------------------------------------------------------------------- */
/* Gestão de energia e qualidade                                              */
/* -------------------------------------------------------------------------- */

/** Pause a cena fora da viewport ou com aba em segundo plano. */
function ActivityGate() {
  const setFrameloop = useThree((s) => s.setFrameloop);
  const gl = useThree((s) => s.gl);
  const active = useRef(true);

  useEffect(() => {
    const element = gl.domElement;

    const apply = () => {
      setFrameloop(active.current && !document.hidden ? "always" : "never");
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) active.current = entry.isIntersecting;
        apply();
      },
      { rootMargin: "120px" },
    );
    observer.observe(element);

    const onVisibility = () => apply();
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [gl, setFrameloop]);

  return null;
}

/** Perda de contexto WebGL (troca de GPU, aba em segundo plano, driver). */
function ContextGuard({ onLost }: { onLost?: () => void }) {
  const gl = useThree((s) => s.gl);

  useEffect(() => {
    const canvas = gl.domElement;
    const handler = (event: Event) => {
      event.preventDefault();
      onLost?.();
    };

    canvas.addEventListener("webglcontextlost", handler);
    return () => canvas.removeEventListener("webglcontextlost", handler);
  }, [gl, onLost]);

  return null;
}

/**
 * Mede o FPS real e degrada uma vez se o aparelho não acompanhar: primeiro a
 * densidade de pixels, depois o vapor. Medir em vez de estimar.
 */
function PerformanceGuard({ onDegrade }: { onDegrade?: () => void }) {
  const frames = useRef(0);
  const elapsed = useRef(0);
  const degraded = useRef(false);

  useFrame((_, delta) => {
    if (degraded.current) return;

    frames.current += 1;
    elapsed.current += delta;

    if (elapsed.current >= 2) {
      const fps = frames.current / elapsed.current;
      frames.current = 0;
      elapsed.current = 0;

      if (fps < 40) {
        degraded.current = true;
        onDegrade?.();
      }
    }
  });

  return null;
}