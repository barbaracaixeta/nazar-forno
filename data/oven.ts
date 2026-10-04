/**
 * Narrativa "do forno para você". As legendas são editoriais e descrevem o
 * momento, não o processo técnico — nenhum tempo, temperatura ou técnica foi
 * inventado. TODO(brand): validar com a operação.
 */
export const ovenSteps = [
  {
    id: "massa",
    index: "01",
    label: "Massa",
    caption: "O ponto de partida de tudo.",
    art: "dough" as const,
  },
  {
    id: "recheio",
    index: "02",
    label: "Recheio",
    caption: "O momento em que o interior ganha forma.",
    art: "open" as const,
  },
  {
    id: "forno",
    index: "03",
    label: "Forno",
    caption: "Onde o calor transforma.",
    art: "oven" as const,
  },
  {
    id: "saida",
    index: "04",
    label: "Saída",
    caption: "O instante em que chega à mesa.",
    art: "tray" as const,
  },
  {
    id: "sabor",
    index: "05",
    label: "Sabor",
    caption: "A primeira mordida.",
    art: "bite" as const,
  },
] as const;

export type OvenStep = (typeof ovenSteps)[number];

/**
 * Slot de vídeo do processo.
 * TODO(brand/produção): gravar o vídeo e preencher `src` (MP4 + WEBM, sem
 * faixa inferior a 1080p, sem tarja pesada). Enquanto `src` é `null`, a
 * interface mostra um estado desenhado — nunca um player quebrado.
 */
export const ovenVideo = {
  src: null as string | null,
  poster: null as string | null,
};