import * as THREE from "three";
import { sceneColors } from "./palette";

/**
 * Material da massa.
 *
 * Um único `ShaderMaterial` no lugar de malha PBR + mapa de textura + shadow
 * map: 1 draw call, sem assets, sem custo de textura. Reproduz o que importa
 * em fotografia de forno — envoltório suave (wrap), luz quente de cima,
 * recorte frio na lateral, brilho de massa e grão de superfície.
 */
export function createDoughMaterial(): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    uniforms: {
      uColorTop: { value: new THREE.Color(sceneColors.doughTop) },
      uColorMid: { value: new THREE.Color(sceneColors.doughMid) },
      uColorDeep: { value: new THREE.Color(sceneColors.doughDeep) },
      uRimColor: { value: new THREE.Color(sceneColors.rimLight) },
      uKeyColor: { value: new THREE.Color(sceneColors.keyLight) },
      uKeyDirection: { value: new THREE.Vector3(-0.55, 0.72, 0.42).normalize() },
      uHeat: { value: 0 },
      uMinY: { value: -0.52 },
      uMaxY: { value: 0.74 },
    },
    vertexShader: /* glsl */ `
      varying vec3 vNormalW;
      varying vec3 vViewDir;
      varying vec3 vLocal;
      varying vec3 vLocalNormal;

      void main() {
        vLocal = position;
        vLocalNormal = normalize(normalMatrix * normal);

        vec4 worldPosition = modelMatrix * vec4(position, 1.0);
        vNormalW = normalize(mat3(modelMatrix) * normal);
        vViewDir = normalize(cameraPosition - worldPosition.xyz);

        gl_Position = projectionMatrix * viewMatrix * worldPosition;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 uColorTop;
      uniform vec3 uColorMid;
      uniform vec3 uColorDeep;
      uniform vec3 uRimColor;
      uniform vec3 uKeyColor;
      uniform vec3 uKeyDirection;
      uniform float uHeat;
      uniform float uMinY;
      uniform float uMaxY;

      varying vec3 vNormalW;
      varying vec3 vViewDir;
      varying vec3 vLocal;
      varying vec3 vLocalNormal;

      // Ruído de valor barato: grão de superfície da massa.
      float hash(vec3 p) {
        p = fract(p * 0.3183099 + vec3(0.71, 0.113, 0.419));
        p *= 17.0;
        return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
      }

      float valueNoise(vec3 p) {
        vec3 i = floor(p);
        vec3 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        float n000 = hash(i + vec3(0.0, 0.0, 0.0));
        float n100 = hash(i + vec3(1.0, 0.0, 0.0));
        float n010 = hash(i + vec3(0.0, 1.0, 0.0));
        float n110 = hash(i + vec3(1.0, 1.0, 0.0));
        float n001 = hash(i + vec3(0.0, 0.0, 1.0));
        float n101 = hash(i + vec3(1.0, 0.0, 1.0));
        float n011 = hash(i + vec3(0.0, 1.0, 1.0));
        float n111 = hash(i + vec3(1.0, 1.0, 1.0));
        return mix(
          mix(mix(n000, n100, f.x), mix(n010, n110, f.x), f.y),
          mix(mix(n001, n101, f.x), mix(n011, n111, f.x), f.y),
          f.z
        );
      }

      void main() {
        vec3 n = normalize(vNormalW);
        float height = clamp((vLocal.y - uMinY) / (uMaxY - uMinY), 0.0, 1.0);

        // --- cor assada: base mais tostada, topo mais claro
        vec3 base = mix(uColorDeep, uColorMid, smoothstep(0.02, 0.58, height));
        base = mix(base, uColorTop, smoothstep(0.52, 1.0, height));

        // --- luz com envoltório (diffuse suave, sem terminador duro)
        vec3 key = normalize(uKeyDirection);
        float ndl = dot(n, key);
        float wrap = ndl * 0.72 + 0.28;

        // --- oclusão na base: a massa assenta na sombra do prato
        float ao = mix(0.42, 1.0, smoothstep(0.0, 0.34, height));

        vec3 color = base * (wrap * 1.18) * ao;

        // --- recorte frio: separa o volume do fundo escuro
        float fresnel = pow(1.0 - max(dot(n, normalize(vViewDir)), 0.0), 2.6);
        color += uRimColor * fresnel * 0.34;

        // --- brilho de massa (especular largo e baixo)
        vec3 halfVector = normalize(key + normalize(vViewDir));
        float spec = pow(max(dot(n, halfVector), 0.0), 26.0);
        color += uKeyColor * spec * 0.28;

        // --- grão de superfície: duas oitavas
        float grain = valueNoise(vLocal * 34.0) * 0.6 + valueNoise(vLocal * 92.0) * 0.4;
        color *= 0.93 + grain * 0.14;

        // --- calor do forno na parte de baixo (usado no toque)
        float heatMask = 1.0 - smoothstep(0.0, 0.6, height);
        color += vec3(0.42, 0.14, 0.05) * heatMask * uHeat;

        gl_FragColor = vec4(color, 1.0);

        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `,
  });
}

/** Cerâmica do prato: material padrão barato (1 luz, sem sombra). */
export function createPlateMaterial(): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color: new THREE.Color(sceneColors.plate),
    roughness: 0.62,
    metalness: 0.05,
  });
}