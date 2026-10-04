import * as THREE from "three";

/**
 * Texturas geradas em canvas — zero bytes de rede, zero requisição, e podem
 * ser geradas em qualquer resolução sem perda. usadas para sombra de contato
 * e vapor. Nenhuma imagem é enviada ao cliente além do próprio canvas.
 */

function canvas2d(size: number): CanvasRenderingContext2D {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas 2D indisponível para gerar texturas");
  return ctx;
}

/** Sombra de contato: gradiente radial suave, sem shadow map. */
export function createContactShadowTexture(size = 256): THREE.Texture {
  const ctx = canvas2d(size);
  const gradient = ctx.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2,
  );
  gradient.addColorStop(0, "rgba(0,0,0,0.62)");
  gradient.addColorStop(0.45, "rgba(0,0,0,0.28)");
  gradient.addColorStop(1, "rgba(0,0,0,0)");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(ctx.canvas);
  texture.needsUpdate = true;
  return texture;
}

/** Vapor: mancha radial com bordas irregulares. */
export function createSteamTexture(size = 128): THREE.Texture {
  const ctx = canvas2d(size);
  const gradient = ctx.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2,
  );
  gradient.addColorStop(0, "rgba(255,255,255,0.85)");
  gradient.addColorStop(0.4, "rgba(255,255,255,0.34)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(ctx.canvas);
  texture.needsUpdate = true;
  return texture;
}