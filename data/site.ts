/**
 * Fonte única de verdade sobre a marca.
 *
 * REGRA (brief §33): não inventar preço, avaliação, horário, endereço,
 * história, promoção ou número. Tudo que ainda não foi confirmado pela marca
 * está `null` com um TODO explícito — o componente decide o que exibir.
 */
export const site = {
  name: "Nazar Forno",
  shortName: "Nazar",
  claim: "Esfihas turcas e pizzas artesanais",
  locale: "Tatuapé",
  city: "São Paulo",
  state: "SP",
  country: "BR",
  countryName: "Brasil",
  lang: "pt-BR",

  /** Checkout externo (Xeguei). */
  orderUrl: "https://nazarforno.xeguei.com.br/",

  /**
   * TODO(brand): confirmar antes de publicar.
   * Enquanto `null`, o footer exibe os canais como "em breve" em texto —
   * nunca um link quebrado nem um @inventado.
   */
  address: {
    street: null as string | null,
    number: null as string | null,
    neighborhood: null as string | null,
    postalCode: null as string | null,
  },
  phone: null as string | null,
  whatsapp: null as string | null,
  instagram: null as string | null,

  /** TODO(brand): inserir horário real para exibir e marcar no JSON-LD. */
  openingHours: null as Array<{
    days: string;
    opens: string;
    closes: string;
  }> | null,

  /**
   * URL canônica. O domínio real não foi confirmado pela marca, então é
   * configurável: `NEXT_PUBLIC_SITE_URL` no ambiente de deploy. O valor abaixo
   * é fallback provisório e precisa ser conferido antes de publicar — é ele que
   * alimenta canonical, Open Graph, JSON-LD e sitemap.
   */
  siteUrl: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://nazarforno.com.br").replace(/\/$/, ""),

  delivery: {
    /** O site não substitui o checkout; apenas prepara o pedido. */
    platform: "Xeguei",
  },
} as const;

export type Site = typeof site;

/** Canais sociais: só são linkados quando confirmados. */
export const socialChannels = [
  { id: "instagram", label: "Instagram", href: site.instagram },
  { id: "whatsapp", label: "WhatsApp", href: site.whatsapp },
] as const;

export const locationLine = `${site.locale} • ${site.city} — ${site.state}`;