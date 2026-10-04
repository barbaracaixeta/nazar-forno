/** Pilares de identidade. Copy fornecida no briefing da marca. */
export const differentials = [
  {
    id: "forno",
    index: "01",
    title: "Feita no forno",
    description:
      "Preparada para chegar quentinha e saborosa.",
    art: "oven" as const,
  },
  {
    id: "inspiracao",
    index: "02",
    title: "Inspiração turca",
    description:
      "Uma experiência inspirada nos sabores e na tradição da culinária turca.",
    art: "mint" as const,
  },
  {
    id: "massa",
    index: "03",
    title: "Massa artesanal",
    description:
      "Textura, leveza e sabor pensados para cada mordida.",
    art: "dough" as const,
  },
];

/**
 * Os ícones são SVG inline (componente `DifferentialIcon`): um único conjunto,
 * traço 1.5px, grade 24. Sem emoji, sem biblioteca de ícones.
 */