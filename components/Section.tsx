import type { ReactNode } from "react";
import { Container } from "./Container";
import { cn } from "@/lib/cn";

type SectionProps = {
  id?: string;
  /** Define a paleta da seção trocando tokens — nunca lógica de componente. */
  theme?: "navy" | "creme";
  eyebrow?: string;
  title?: ReactNode;
  lede?: ReactNode;
  /** Alinhamento do bloco de cabeçalho. */
  headerAlign?: "start" | "center";
  children: ReactNode;
  className?: string;
  /** Largura do conteúdo — algumas seções pedemmeasure maior. */
  wide?: boolean;
};

/**
 * Padrão de seção: contexto (eyebrow) → informação principal (título) →
 * apoio (lede) → conteúdo. Um único h2 por seção.
 */
export function Section({
  id,
  theme = "creme",
  eyebrow,
  title,
  lede,
  headerAlign = "start",
  children,
  className,
  wide = false,
}: SectionProps) {
  const headingId = id ? `${id}-titulo` : undefined;

  return (
    <section
      id={id}
      className={cn(
        theme === "navy" ? "theme-navy" : "theme-creme",
        "section-y relative",
        className,
      )}
      aria-labelledby={headingId}
    >
      {(eyebrow || title || lede) && (
        <Container className={cn(wide && "max-w-none")}>
          <header
            className={cn(
              "flex flex-col gap-4",
              headerAlign === "center" && "items-center text-center",
            )}
          >
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            {title && (
              <h2
                id={headingId}
                className="display-section max-w-[22ch] text-balance"
              >
                {title}
              </h2>
            )}
            {lede && (
              <p className="lede mt-1 text-pretty">
                {typeof lede === "string" ? <>{lede}</> : lede}
              </p>
            )}
          </header>
        </Container>
      )}
      <div className={cn(title || lede || eyebrow ? "mt-10 md:mt-14" : undefined)}>
        {children}
      </div>
    </section>
  );
}