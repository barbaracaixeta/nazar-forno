export type CategoryId = "esfihas" | "pizzas" | "especiais" | "doces" | "bebidas";

export const categories = [
  {
    id: "esfihas" as CategoryId,
    name: "Esfihas",
    description: "O formato tradicional da casa, assado no forno.",
  },
  {
    id: "pizzas" as CategoryId,
    name: "Pizzas",
    description: "Massa artesanal, forno a lenha.",
  },
  {
    id: "especiais" as CategoryId,
    name: "Especiais",
    description: "Edições limitadas da Nazar.",
  },
  {
    id: "doces" as CategoryId,
    name: "Doces",
    description: "Finalizações e sobremesas.",
  },
  {
    id: "bebidas" as CategoryId,
    name: "Bebidas",
    description: "Para acompanhar o pedido.",
  },
];

export const categoryName = (id: CategoryId): string =>
  categories.find((c) => c.id === id)?.name ?? id;