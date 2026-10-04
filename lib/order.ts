/**
 * Checkout da Nazar Forno. O Xeguei continua sendo o sistema de pedidos:
 * este site é a experiência de marca e descoberta, não o carrinho.
 */
const ORDER_BASE = "https://nazarforno.xeguei.com.br/";

const UTM = {
  utm_source: "nazarforno",
  utm_medium: "site",
  utm_campaign: "nazar_order",
} as const;

export type OrderPlacement =
  | "hero"
  | "header"
  | "mobile_bar"
  | "favorites"
  | "menu"
  | "first_experience"
  | "club"
  | "final_cta"
  | "footer"
  | "product"
  | "not_found";

/** Link de pedido com UTM de atribuição por posição do CTA. */
export function orderHref(placement: OrderPlacement, slug?: string): string {
  const url = new URL(ORDER_BASE);
  url.searchParams.set("utm_source", UTM.utm_source);
  url.searchParams.set("utm_medium", UTM.utm_medium);
  url.searchParams.set("utm_campaign", UTM.utm_campaign);
  url.searchParams.set("utm_content", placement);
  if (slug) url.searchParams.set("utm_term", slug);
  return url.toString();
}