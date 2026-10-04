import { cn } from "@/lib/cn";

/**
 * Sistema de ilustração editorial da Nazar.
 *
 * Por que ilustração e não fotografia: não existe fotografia licensed da
 * marca (brief §33 proíbe inventar imagens "como se fossem reais"). Um
 * placeholder de imagem cinza destrói a direção de arte; um sistema de
 * ilustração coerente entrega uma arte-finida e é substituível item a item:
 * cada produto aponta para `image` — quando a foto existir, o componente
 * troca uma linha.
 *
 * Propriedades: SVG inline (zero requisição, zero CLS, escala infinita),
 * cores por token (funciona nos temas navy e creme), traço 1.4px.
 */
export type ArtVariant =
  | "esfiha-carne"
  | "esfiha-queijo"
  | "esfiha-especial"
  | "esfiha-zaatar"
  | "pizza"
  | "dough"
  | "open"
  | "oven"
  | "mint"
  | "plate"
  | "two-plates"
  | "table"
  | "tray"
  | "bite"
  | "hero"
  | "flame";

type ArtProps = {
  variant: ArtVariant;
  className?: string;
  /** Rótulo do slot de imagem (evita ilustração sem nome acessível). */
  label?: string;
};

/** Paleta de cada variante: luz quente, mais ou menos profunda. */
const PALETTE: Record<ArtVariant, { glow: string; line: string; fill: string }> = {
  "esfiha-carne": { glow: "#a94735", line: "#c7a66a", fill: "#7c3626" },
  "esfiha-queijo": { glow: "#c7a66a", line: "#c7a66a", fill: "#8a6a34" },
  "esfiha-especial": { glow: "#a94735", line: "#e0c08a", fill: "#6d2f22" },
  "esfiha-zaatar": { glow: "#8a6a34", line: "#c7a66a", fill: "#4f4526" },
  pizza: { glow: "#a94735", line: "#d9be86", fill: "#7c3626" },
  dough: { glow: "#c7a66a", line: "#c7a66a", fill: "#6b5a3a" },
  open: { glow: "#a94735", line: "#d9be86", fill: "#6d2f22" },
  oven: { glow: "#a94735", line: "#c7a66a", fill: "#2a1a15" },
  mint: { glow: "#8a6a34", line: "#c7a66a", fill: "#3f4a33" },
  plate: { glow: "#a94735", line: "#c7a66a", fill: "#7c3626" },
  "two-plates": { glow: "#a94735", line: "#c7a66a", fill: "#7c3626" },
  table: { glow: "#c7a66a", line: "#d9be86", fill: "#6b5a3a" },
  tray: { glow: "#a94735", line: "#d9be86", fill: "#6d2f22" },
  bite: { glow: "#c7a66a", line: "#c7a66a", fill: "#8a6a34" },
  hero: { glow: "#a94735", line: "#c7a66a", fill: "#7c3626" },
  flame: { glow: "#c7a66a", line: "#e0c08a", fill: "#a94735" },
};

/** Silhueta de esfiha fechada: domo + pinça central + base. */
function SifihaShape({ id, fill }: { id: string; fill: string }) {
  return (
    <>
      <defs>
        <radialGradient id={`${id}-body`} cx="38%" cy="28%" r="78%">
          <stop offset="0%" stopColor="#f6e3c4" />
          <stop offset="52%" stopColor={fill} />
          <stop offset="100%" stopColor="#3a1c14" />
        </radialGradient>
      </defs>
      {/* corpo */}
      <path
        d="M50 26c-16 0-27 12-27 27 0 12 8 21 27 21s27-9 27-21c0-15-11-27-27-27Z"
        fill={`url(#${id}-body)`}
      />
      {/* vincos da pinça central */}
      <path
        d="M50 26c-5 4-8 9-8 14M50 26c5 4 8 9 8 14M50 26v15"
        stroke="#3a1c14"
        strokeOpacity="0.42"
        strokeWidth="1.1"
        fill="none"
      />
      {/* cordonetes na base */}
      <path
        d="M25 61c4 6 13 9 25 9s21-3 25-9"
        stroke="#3a1c14"
        strokeOpacity="0.3"
        strokeWidth="1.1"
        fill="none"
      />
      {/* brilho de forno */}
      <path
        d="M35 42c1-6 5-10 10-12"
        stroke="#fff6e6"
        strokeOpacity="0.5"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
    </>
  );
}

export function ArtPlaceholder({ variant, className, label }: ArtProps) {
  const id = `art-${variant}`;
  const p = PALETTE[variant];

  return (
    <div
      className={cn(
        "relative isolate overflow-hidden bg-surface",
        className,
      )}
      style={{ ["--art-glow" as string]: p.glow }}
    >
      {/* luz quente do forno + grão */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: `radial-gradient(120% 96% at 50% 118%, ${p.glow}59 0%, transparent 62%), radial-gradient(90% 70% at 50% -12%, ${p.line}1f 0%, transparent 70%)`,
        }}
      />
      <div aria-hidden className="grain absolute inset-0" />

      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        className="relative h-full w-full"
        role={label ? "img" : "presentation"}
        aria-label={label}
        aria-hidden={label ? undefined : true}
      >
        {/* base: sombra de prato */}
        <ellipse
          cx="50"
          cy="82"
          rx="30"
          ry="4.5"
          fill="#000"
          opacity="0.22"
        />

        {(variant === "esfiha-carne" ||
          variant === "esfiha-queijo" ||
          variant === "esfiha-especial" ||
          variant === "esfiha-zaatar" ||
          variant === "bite") && (
          <g>
            {variant === "esfiha-zaatar" && (
              <g stroke={p.line} strokeWidth="1" strokeOpacity="0.7" fill="none">
                <path d="M18 74c8-2 14-7 18-14" />
                <path d="M26 70c-1-4 0-7 2-10M32 66c-1-4 0-7 2-10" />
                <path d="M82 74c-8-2-14-7-18-14" />
                <path d="M74 70c1-4 0-7-2-10M68 66c1-4 0-7-2-10" />
              </g>
            )}
            <SifihaShape id={id} fill={p.fill} />
            {variant === "esfiha-especial" && (
              <g stroke={p.line} strokeWidth="1.1" fill="none" strokeOpacity="0.85">
                <circle cx="42" cy="60" r="2" />
                <circle cx="58" cy="64" r="1.6" />
              </g>
            )}
            {variant === "bite" && (
              <path
                d="M63 44a14 14 0 0 0 6 12"
                stroke="#fff6e6"
                strokeOpacity="0.65"
                strokeWidth="1.6"
                fill="none"
              />
            )}
          </g>
        )}

        {variant === "pizza" && (
          <g>
            <path d="M50 24 78 74H22L50 24Z" fill={p.fill} />
            <path d="M50 24 78 74H22L50 24Z" fill="none" stroke={p.line} strokeWidth="1.3" />
            <path d="M22 74h56" stroke="#f6e3c4" strokeWidth="3.4" strokeLinecap="round" />
            <circle cx="44" cy="58" r="3.4" fill="#a94735" opacity="0.9" />
            <circle cx="58" cy="66" r="2.6" fill="#a94735" opacity="0.75" />
            <circle cx="52" cy="46" r="2.2" fill="#c7a66a" opacity="0.8" />
          </g>
        )}

        {variant === "dough" && (
          <g>
            <ellipse cx="50" cy="58" rx="26" ry="22" fill={p.fill} />
            <ellipse
              cx="50"
              cy="58"
              rx="26"
              ry="22"
              fill="none"
              stroke={p.line}
              strokeWidth="1.3"
            />
            <path
              d="M36 50c8 4 20 4 28 0M36 62c8 4 20 4 28 0"
              stroke={p.line}
              strokeOpacity="0.75"
              strokeWidth="1.1"
              fill="none"
            />
            <path d="M22 40h8M70 40h8" stroke={p.line} strokeOpacity="0.5" strokeWidth="1" />
          </g>
        )}

        {variant === "open" && (
          <g>
            {/* pockets aberta: o recheio aparece, não é explicado */}
            <path
              d="M26 44c0 19 11 32 24 32s24-13 24-32"
              fill={p.fill}
              fillOpacity="0.5"
              stroke={p.line}
              strokeWidth="1.3"
              strokeLinecap="round"
            />
            <ellipse cx="50" cy="44" rx="24" ry="7.5" fill="#2a1a15" />
            <path
              d="M35 44c3-9 8-13 15-13s12 4 15 13c-4 3-9 4-15 4s-11-1-15-4Z"
              fill={p.glow}
              opacity="0.9"
            />
            <ellipse
              cx="50"
              cy="44"
              rx="24"
              ry="7.5"
              fill="none"
              stroke={p.line}
              strokeWidth="1.3"
            />
            {/* cordão na borda */}
            <path
              d="M28 52c2 8 5 12 8 15M72 52c-2 8-5 12-8 15"
              stroke="#3a1c14"
              strokeOpacity="0.3"
              strokeWidth="1"
              fill="none"
            />
          </g>
        )}

        {variant === "oven" && (
          <g>
            <path
              d="M24 78V52c0-14 12-24 26-24s26 10 26 24v26H24Z"
              fill="none"
              stroke={p.line}
              strokeWidth="1.4"
            />
            <path d="M32 78V54c0-10 8-17 18-17s18 7 18 17v24" fill="none" stroke={p.line} strokeOpacity="0.5" strokeWidth="1" />
            <path d="M50 74c-6-6-2-12 1-16 1 5 5 6 5 11 0 3-3 5-6 5Z" fill={p.glow} opacity="0.85" />
            <path d="M24 78h52" stroke={p.line} strokeWidth="1.4" strokeLinecap="round" />
          </g>
        )}

        {variant === "mint" && (
          <g stroke={p.line} strokeWidth="1.2" fill="none" strokeLinecap="round">
            <path d="M50 80V34" />
            <path d="M50 46c-8-6-14-6-18-2 6 6 12 7 18 2ZM50 46c8-6 14-6 18-2-6 6-12 7-18 2Z" />
            <path d="M50 60c-8-6-14-6-18-2 6 6 12 7 18 2ZM50 60c8-6 14-6 18-2-6 6-12 7-18 2Z" />
          </g>
        )}

        {variant === "flame" && (
          <g>
            <path d="M50 22c14 16 20 26 20 36a20 20 0 0 1-40 0c0-10 6-20 20-36Z" fill={p.fill} />
            <path d="M50 40c7 8 10 13 10 19a10 10 0 0 1-20 0c0-6 3-11 10-19Z" fill={p.line} opacity="0.85" />
          </g>
        )}

        {(variant === "plate" ||
          variant === "two-plates" ||
          variant === "table" ||
          variant === "tray") && (
          <g>
            {(variant === "plate" || variant === "two-plates") && (
              <>
                <circle cx={variant === "plate" ? 50 : 34} cy="60" r="20" fill="none" stroke={p.line} strokeWidth="1.2" />
                <circle cx={variant === "plate" ? 50 : 34} cy="60" r="13" fill={p.fill} opacity="0.35" />
                {variant === "two-plates" && (
                  <>
                    <circle cx="66" cy="60" r="20" fill="none" stroke={p.line} strokeWidth="1.2" />
                    <circle cx="66" cy="60" r="13" fill={p.fill} opacity="0.35" />
                  </>
                )}
              </>
            )}
            {variant === "table" && (
              <>
                <rect x="18" y="44" width="26" height="26" rx="3" fill="none" stroke={p.line} strokeWidth="1.2" />
                <rect x="52" y="52" width="30" height="20" rx="3" fill="none" stroke={p.line} strokeWidth="1.2" />
                <circle cx="31" cy="35" r="7" fill={p.fill} opacity="0.4" />
              </>
            )}
            {variant === "tray" && (
              <>
                <rect x="16" y="44" width="68" height="34" rx="4" fill="none" stroke={p.line} strokeWidth="1.2" />
                <circle cx="32" cy="61" r="6" fill={p.fill} opacity="0.4" />
                <circle cx="50" cy="61" r="6" fill={p.fill} opacity="0.4" />
                <circle cx="68" cy="61" r="6" fill={p.fill} opacity="0.4" />
              </>
            )}
          </g>
        )}

        {variant === "hero" && (
          <g>
            {/* anel de prato */}
            <circle cx="50" cy="56" r="34" fill="none" stroke={p.line} strokeOpacity="0.28" strokeWidth="1" />
            <circle cx="50" cy="56" r="24" fill="none" stroke={p.line} strokeOpacity="0.18" strokeWidth="1" />
          </g>
        )}
      </svg>
    </div>
  );
}