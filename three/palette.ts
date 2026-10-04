/**
 * Cores da cena 3D.
 *
 * Espelham os tokens do design system — a cena pertence ao mesmo sistema,
 * não a uma paleta própria. Se o token mudar, a cena muda junto.
 * (Valores hex são necessários aqui porque três.js não lê CSS custom
 * properties; a origem da verdade continua sendo globals.css.)
 */
export const sceneColors = {
  /** Creme da massa na parte alta */
  doughTop: "#f2e0c2",
  /** Massa assada */
  doughMid: "#c98a4e",
  /** Assado profundo / sombra da massa */
  doughDeep: "#5e2a1c",
  /** Luz principal do forno */
  keyLight: "#ffd9a0",
  /** Luz de recorte fria, para dar forma */
  rimLight: "#cfe0ff",
  /** Cor do vapor */
  steam: "#f7e7d2",
  /** Prato de cerâmica */
  plate: "#1b2530",
  plateEdge: "#33414f",
  /** Creme da massa no ponto mais alto da ilustração */
  doughHighlight: "#f6e3c4",
  /** Trilho de escurecimento da crosta */
  crust: "#c07c42",
  /** Vinco escuro da massa (pincas, cordonetes) */
  crease: "#3a1c14",
  /** Borda clara em movimento de calor */
  heatEdge: "#fff6e6",
  /** Traço de fio de cabelo sobre o creme */
  hairline: "#f4eee4",
  /** Ouro da marca */
  gold: "#c7a66a",
  /** Terracota da marca */
  terracotta: "#a94735",
} as const;

export const lightRig = {
  /** Luz-chave superior esquerda, quente */
  key: { position: [-2.4, 3.2, 2.6] as const, intensity: 2.1 },
  /** Luz de preenchimento fria pela direita */
  fill: { position: [2.8, 0.6, 1.4] as const, intensity: 0.55 },
  /** Luz de baixo, simulando o calor que sobe do forno */
  bounce: { position: [0.4, -1.6, 1.8] as const, intensity: 0.7 },
  ambient: 0.55,
} as const;