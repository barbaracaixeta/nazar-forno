import * as THREE from "three";

/**
 * Geometria procedural: a esfiha fechada.
 *
 * Por que procedural (e não um GLB): não existe modelo 3D licensed da marca.
 * Um `.glb` de banco de imagens seria "objeto 3D sem relação com o produto" —
 * exatamente o que o briefing proíbe. A forma é construída a partir da
 * assinatura real da esfiha: domo baixo, base assentada e a pinça central com
 * os cordonetes da massa.
 *
 * Quando houver modelo real: `ModelViewer` aceita `model="/models/nazar/hero/esfiha.glb"`
 * e este arquivo deixa de ser usado — o contrato do componente não muda.
 *
 * Custo: ~12k triângulos, 1 geometria, 1 material, zero textura.
 */

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

export type SifihaOptions = {
  /** Segmentos horizontais da esfera base. */
  widthSegments?: number;
  heightSegments?: number;
  /** Amplitude do irregularidade artesanal (0 = perfeito). */
  handmade?: number;
};

export function createSifihaGeometry({
  widthSegments = 96,
  heightSegments = 64,
  handmade = 1,
}: SifihaOptions = {}): THREE.BufferGeometry {
  const geometry = new THREE.SphereGeometry(
    1,
    widthSegments,
    heightSegments,
  );
  const position = geometry.attributes.position as THREE.BufferAttribute;
  const vertex = new THREE.Vector3();

  const verticalScale = 0.74; // domo baixo: sfiha é achatada, não bola
  const baseY = -0.52;

  for (let i = 0; i < position.count; i += 1) {
    vertex.fromBufferAttribute(position, i);

    const theta = Math.atan2(vertex.z, vertex.x);
    const normalizedY = vertex.y; // -1 (base) → 1 (topo)

    // --- 1. achatamento vertical + base assentada no prato
    let y = normalizedY * verticalScale;
    let radial = Math.hypot(vertex.x, vertex.z);

    if (y < baseY) {
      // achata a base: puxa os pontos para o plano, criando o "pé"
      const overshoot = baseY - y;
      y = baseY + overshoot * 0.12;
      radial *= 1 + overshoot * 0.55;
    }

    // --- 2. pinça central: quanto mais alto, mais a massa é reunida
    const topness = smoothstep(0.15, 0.95, normalizedY);
    const crown = 1 - 0.24 * Math.pow(topness, 1.7);

    // --- 3. cordonetes da massa na parte superior
    const pleat = Math.cos(theta * 8) * 0.052 * topness;

    // --- 4. irregularidade artesanal (baixa frequência, sem ruído)
    const lump =
      Math.sin(theta * 3 + normalizedY * 2.1) * 0.018 +
      Math.sin(theta * 5 - normalizedY * 3.4) * 0.009;

    radial *= crown * (1 + pleat * handmade + lump * handmade);

    // --- 5. leve assimetria: nada é perfeitamente round
    const scaleX = 1.035;
    const scaleZ = 0.965;

    position.setXYZ(
      i,
      Math.cos(theta) * radial * scaleX,
      y,
      Math.sin(theta) * radial * scaleZ,
    );
  }

  position.needsUpdate = true;
  geometry.computeVertexNormals();
  geometry.computeBoundingSphere();

  return geometry;
}

/** Prato de serviço: dá escala e assenta o objeto no espaço. */
export function createPlateGeometry(): THREE.BufferGeometry {
  return new THREE.CylinderGeometry(1.55, 1.42, 0.075, 64, 1, false);
}