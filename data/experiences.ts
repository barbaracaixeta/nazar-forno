import type { ArtVariant } from "@/components/PlaceholderArt";

/** "Escolha seu momento" — editorial, não grid de cards iguais. */
export const moments = [
  {
    id: "so-pra-mim",
    index: "01",
    title: "Só pra mim",
    description: "Combos individuais.",
    art: "plate" as ArtVariant,
  },
  {
    id: "pra-compartilhar",
    index: "02",
    title: "Pra compartilhar",
    description: "Combos para duas pessoas.",
    art: "two-plates" as ArtVariant,
  },
  {
    id: "mesa-cheia",
    index: "03",
    title: "Mesa cheia",
    description: "Combos família.",
    art: "table" as ArtVariant,
  },
  {
    id: "pra-festa",
    index: "04",
    title: "Pra festa",
    description: "Pedidos maiores.",
    art: "tray" as ArtVariant,
  },
] as const;

export type Moment = (typeof moments)[number];

/** Composição do combo de primeira experiência — estrutura pronta, sem invenção. */
export const firstExperienceSlots = [
  { id: "esfiha", label: "Esfiha do dia", hint: "A definir" },
  { id: "acompanhamento", label: "Acompanhamento", hint: "A definir" },
  { id: "bebida", label: "Bebida", hint: "A definir" },
] as const;