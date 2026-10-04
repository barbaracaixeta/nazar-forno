import { cn } from "@/lib/cn";
import { sceneColors as C } from "@/three/palette";

/**
 * Fallback visual da cena 3D.
 *
 * Usado quando: WebGL ausente, `prefers-reduced-motion`, economia de dados,
 * hardware limitado, ou perda de contexto. Também fica por baixo do canvas
 * como base permanente.
 *
 * Não é uma imagem genérica: repete o mesmo enquadramento, a mesma luz
 * quente e a mesma forma da cena 3D, então a troca entre canvas e ilustração
 * é imperceptível. Estático por definição — sem animação, sem custo de GPU,
 * sem JS.
 */
export function WebGLFallback({
  className,
  description,
  hidden = false,
}: {
  className?: string;
  description?: string;
  hidden?: boolean;
}) {
  return (
    <div
      className={cn("relative isolate overflow-hidden", className)}
      hidden={hidden || undefined}
      aria-hidden={description ? undefined : true}
      role={description ? "img" : undefined}
      aria-label={description}
    >
      {/* luz do forno */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(58% 46% at 50% 62%, color-mix(in srgb, var(--color-accent) 42%, transparent) 0%, transparent 68%), radial-gradient(90% 70% at 50% 8%, color-mix(in srgb, var(--color-gold) 16%, transparent) 0%, transparent 72%)",
        }}
      />
      <div aria-hidden className="grain absolute inset-0" />

      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
        className="relative h-full w-full"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <radialGradient id="nazar-fallback-body" cx="38%" cy="30%" r="76%">
            <stop offset="0%" stopColor={C.doughHighlight} />
            <stop offset="50%" stopColor={C.crust} />
            <stop offset="100%" stopColor={C.doughDeep} />
          </radialGradient>
        </defs>

        {/* prato */}
        <circle cx="50" cy="58" r="37" fill="none" stroke={C.gold} strokeOpacity="0.22" strokeWidth="0.5" />
        <ellipse cx="50" cy="76" rx="26" ry="3.6" fill="#000" opacity="0.3" />

        {/* massa */}
        <g transform="translate(0,-4)">
          <path
            d="M50 34c-11 0-19 8.4-19 19 0 8.6 6 15 19 15s19-6.4 19-15c0-10.6-8-19-19-19Z"
            fill="url(#nazar-fallback-body)"
          />
          <path
            d="M50 34c-3.4 2.6-5.2 5.8-5.2 9.4M50 34c3.4 2.6 5.2 5.8 5.2 9.4M50 34v10"
            stroke={C.crease}
            strokeOpacity="0.4"
            strokeWidth="0.8"
            fill="none"
          />
          <path
            d="M33 60c4 4.6 9.6 6.8 17 6.8S63 64.6 67 60"
            stroke={C.crease}
            strokeOpacity="0.28"
            strokeWidth="0.8"
            fill="none"
          />
          <path
            d="M39 44c1-4.4 3.6-7.4 7.4-9"
            stroke={C.heatEdge}
            strokeOpacity="0.5"
            strokeWidth="1.2"
            strokeLinecap="round"
            fill="none"
          />
        </g>

        {/* vapor */}
        <g stroke={C.hairline} strokeOpacity="0.28" strokeWidth="0.7" fill="none" strokeLinecap="round">
          <path d="M41 26c-2-3 2-5 0-8" />
          <path d="M50 22c-2.4-3.4 2.4-5.6 0-9.4" />
          <path d="M59 26c-2-3 2-5 0-8" />
        </g>
      </svg>
    </div>
  );
}