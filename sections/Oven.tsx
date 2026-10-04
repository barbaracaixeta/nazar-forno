"use client";

import { useCallback, useState } from "react";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { ArtPlaceholder } from "@/components/PlaceholderArt";
import { ProvisionalNote } from "@/components/ProvisionalNote";
import { usePrefersReducedMotion } from "@/components/ReducedMotion";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { ovenSteps, ovenVideo } from "@/data/oven";

/**
 * "O melhor momento é quando sai do forno."
 *
 * A narrativa de 5 estados acontece sem um segundo canvas: uma máquina de
 * estados em SVG/CSS (massa → recheio → forno → saída → sabor) dirigida pelo
 * scroll no desktop e por um carrossel de snap no mobile. Menos GPU, mais
 * narrativa — e funciona igual sem WebGL.
 *
 * Com `prefers-reduced-motion`, nada é dirigido por scroll: os cinco passos
 * aparecem empilhados, cada um com a sua arte.
 */
export function Oven() {
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(0);

  const onProgress = useCallback((progress: number) => {
    const index = Math.min(
      ovenSteps.length - 1,
      Math.max(0, Math.floor(progress * ovenSteps.length)),
    );
    setActive((current) => (current === index ? current : index));
  }, []);

  const { ref } = useScrollProgress<HTMLOListElement>({ onProgress });

  const current = ovenSteps[active] ?? ovenSteps[0];

  return (
    <section
      id="forno"
      className="theme-navy relative isolate overflow-hidden bg-[var(--palette-navy-deep)] py-[var(--space-16)] text-ink lg:py-[var(--space-24)]"
      aria-labelledby="forno-titulo"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 45% at 78% 8%, rgba(169,71,53,0.3) 0%, transparent 62%)",
        }}
      />
      <div aria-hidden className="grain pointer-events-none absolute inset-0 -z-10" />

      <Container>
        <header className="max-w-[46ch]">
          <p className="eyebrow">Do forno para você</p>
          <h2 id="forno-titulo" className="display-section mt-5 text-ink">
            O melhor momento é quando sai do forno.
          </h2>
        </header>

        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-12 lg:gap-14">
          {/* --- palco (desktop) --- */}
          <div className="hidden lg:col-span-6 lg:block">
            <div className="sticky top-[calc(var(--header-height)+var(--space-8))]">
              <div className="relative aspect-square w-full overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-hairline)]">
                <ArtPlaceholder
                  key={current.id}
                  variant={current.art}
                  label={`Ilustração: etapa ${current.label}`}
                  className="absolute inset-0 animate-fade"
                />
              </div>

              {/* trilho de progresso: o estado é percebido por forma, não só por cor */}
              <ol className="mt-6 flex items-center gap-2" aria-hidden>
                {ovenSteps.map((step, index) => (
                  <li
                    key={step.id}
                    className="h-0.5 flex-1 rounded-full bg-[var(--color-hairline-strong)]"
                  >
                    <span
                      className="block h-full rounded-full bg-accent transition-[width] duration-[var(--duration-base)] ease-[var(--ease-standard)] motion-reduce:transition-none"
                      style={{
                        width: index <= active ? "100%" : "0%",
                      }}
                    />
                  </li>
                ))}
              </ol>

              <p className="mt-4 flex items-baseline gap-3 text-sm text-ink-2">
                <span className="font-display text-accent" data-tabular>
                  {current.index}
                </span>
                <span className="text-ink">{current.label}</span>
                <span aria-hidden className="text-ink-3">
                  ·
                </span>
                <span>{current.caption}</span>
              </p>
            </div>
          </div>

          {/* --- passos --- */}
          <ol ref={ref} className="lg:col-span-6">
            {ovenSteps.map((step, index) => {
              const isActive = index === active;
              return (
                <li key={step.id}>
                  <Reveal
                    as="div"
                    distance={14}
                    className="border-t border-[var(--color-hairline)] py-6 first:border-t-0 first:pt-0"
                  >
                    <div
                      className={
                        reduced
                          ? "block"
                          : "lg:hidden"
                      }
                    >
                      <ArtPlaceholder
                        variant={step.art}
                        label={`Ilustração: etapa ${step.label}`}
                        className="mb-5 aspect-[16/9] w-full rounded-[var(--radius-lg)]"
                      />
                    </div>

                    <div className="flex items-baseline gap-4">
                      <span
                        aria-hidden
                        className="font-display text-sm tracking-caps text-ink-3"
                        data-tabular
                      >
                        {step.index}
                      </span>
                      <div>
                        <h3
                          className="text-xl text-ink"
                          aria-current={!reduced && isActive ? "step" : undefined}
                        >
                          {step.label}
                        </h3>
                        <p className="mt-1 text-base text-ink-2">
                          {step.caption}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>

        {/* --- slot de vídeo: só aparece quando houver arquivo real --- */}
        <Reveal as="div" distance={16} className="mt-14 lg:mt-20">
          {ovenVideo.src ? (
            <video
              className="aspect-[16/9] w-full rounded-[var(--radius-xl)] border border-[var(--color-hairline)] object-cover"
              src={ovenVideo.src}
              poster={ovenVideo.poster ?? undefined}
              controls
              muted
              playsInline
              preload="none"
              aria-label="Vídeo do processo no forno"
            />
          ) : (
            <div className="surface-muted relative overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-hairline)]">
              <ArtPlaceholder
                variant="oven"
                label="Espaço reservado para o vídeo do forno"
                className="aspect-[21/9] w-full"
              />
              <div className="absolute inset-0 flex flex-col items-start justify-end gap-2 p-6 sm:p-8">
                <p className="text-sm font-medium text-ink">Vídeo do processo</p>
                <ProvisionalNote>
                  Em produção. O arquivo entra em{" "}
                  <code className="font-mono text-xs">/public/videos/nazar/</code>.
                </ProvisionalNote>
              </div>
            </div>
          )}
        </Reveal>
      </Container>
    </section>
  );
}