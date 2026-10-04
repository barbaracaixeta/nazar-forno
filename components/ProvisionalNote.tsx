import { cn } from "@/lib/cn";

/**
 * Marcador de conteúdo provisório (brief §33). Existe para que ninguém
 * confunda placeholder com dado real — e para tornar visível o que falta.
 */
export function ProvisionalNote({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("eyebrow text-ink-3 normal-case tracking-normal", className)}>
      {children}
    </p>
  );
}