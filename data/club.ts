/**
 * Nazar Club — arquitetura pronta para pontuação, histórico e backend.
 *
 * REGRA (brief §19/§33): os níveis e prêmios abaixo são REPRESENTAÇÃO VISUAL.
 * Não há programa de pontos, saldo, regras nem vale-compra implementados.
 * TODO(brand): confirmar-premios, regras de acúmulo e validade.
 */
export const clubTiers = [
  {
    id: "bebida",
    points: 100,
    label: "1 bebida",
    detail: "Por acúmulo de pontos em pedidos.",
  },
  {
    id: "esfiha",
    points: 250,
    label: "1 esfiha",
    detail: "Por acúmulo de pontos em pedidos.",
  },
  {
    id: "combo",
    points: 500,
    label: "1 combo especial",
    detail: "Por acúmulo de pontos em pedidos.",
  },
] as const;

export const clubNotice =
  "Representação visual dos benefícios. O programa completo entra em breve.";