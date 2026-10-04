import type { CategoryId } from "./categories";
import type { ArtVariant } from "@/components/PlaceholderArt";

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: CategoryId;
  /**
   * Copy editorial provisória. Nenhum ingrediente, medida ou promessa
   * nutricional foi inventado — TODO(brand): validar com a marca.
   */
  description: string;
  /** `null` enquanto o preço real não for cadastrado. */
  price: number | null;
  /** Texto exibido no lugar do número. Nunca "R$ 0,00". */
  priceLabel: string;
  art: ArtVariant;
  availability: "available" | "unknown";
  featured: boolean;
};

/**
 * Cardápio. Somente os itens definidos no briefing: nenhum item extra,
 * nenhum preço inventado. `price: null` é tratado como estado "preço a
 * cadastrar" — a interface mostra o rótulo provisório, nunca um número falso.
 */
export const products: Product[] = [
  {
    id: "esfiha-carne",
    slug: "esfiha-turca-de-carne",
    name: "Esfiha Turca de Carne",
    category: "esfihas",
    description:
      "O clássico da casa: massa artesanal, recheio generoso, saída quente do forno.",
    price: null,
    priceLabel: "R$ XX,XX",
    art: "esfiha-carne",
    availability: "unknown",
    featured: true,
  },
  {
    id: "esfiha-queijo",
    slug: "esfiha-de-queijo",
    name: "Esfiha de Queijo",
    category: "esfihas",
    description: "Massa leve, recheio de queijo derretido e borda que estala.",
    price: null,
    priceLabel: "R$ XX,XX",
    art: "esfiha-queijo",
    availability: "unknown",
    featured: true,
  },
  {
    id: "pizza-artesanal",
    slug: "pizza-artesanal",
    name: "Pizza Artesanal",
    category: "pizzas",
    description: "Massa de fermentação lenta, assada no forno e servida à fatia.",
    price: null,
    priceLabel: "R$ XX,XX",
    art: "pizza",
    availability: "unknown",
    featured: true,
  },
  {
    id: "esfiha-especial",
    slug: "esfiha-especial",
    name: "Esfiha Especial",
    category: "especiais",
    description: "A versão da casa que pede acompanhamento à altura.",
    price: null,
    priceLabel: "R$ XX,XX",
    art: "esfiha-especial",
    availability: "unknown",
    featured: true,
  },
  {
    id: "esfiha-zaatar",
    slug: "esfiha-de-zaatar",
    name: "Esfiha de Za’atar",
    category: "esfihas",
    description: "Inspiração turca no prato: massa artesanal com za’atar.",
    price: null,
    priceLabel: "R$ XX,XX",
    art: "esfiha-zaatar",
    availability: "unknown",
    featured: true,
  },
];

export const featuredProducts = products.filter((p) => p.featured);

export const productsByCategory = (category: CategoryId): Product[] =>
  products.filter((p) => p.category === category);