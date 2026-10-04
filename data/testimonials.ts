/**
 * Prova social — estrutura pronta para Google Reviews.
 *
 * REGRA (brief §20/§33): nenhuma avaliação, nome, nota ou data foi inventada.
 * Enquanto `entries` estiver vazio, a interface exibe UM painel de estado
 * vazio desenhado (diz o que é, por que está vazio e o que fazer) em vez de
 * três cards falsos. Ao cadastrar a primeira avaliação real, o grid aparece
 * automaticamente — sem alteração de componente.
 *
 * TODO(brand): trocar `source` por "Google" e preencher `entries` com
 * avaliações autorizadas pelos clientes, com `rating` e `date` reais.
 */
export type Testimonial = {
  id: string;
  quote: string;
  author: string;
  rating: number;
  date: string;
  product?: string;
};

export const testimonials: Testimonial[] = [];

export const testimonialsSource = {
  label: "Avaliações de clientes",
  href: null as string | null,
  rating: null as number | null,
} as const;