"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { track, type AnalyticsEvent } from "@/lib/analytics";
import { cn } from "@/lib/cn";

type TrackedLinkProps = {
  href: string;
  /** Evento emitido no clique.Único propósito do componente. */
  event: AnalyticsEvent;
  payload?: Record<string, string | number | boolean>;
  className?: string;
  children: ReactNode;
  "aria-label"?: string;
};

/**
 * Link com analytics.
 *
 * Existe para que nenhuma seção de servidor precise virar cliente só por causa
 * de um `onClick`: o componente cliente é pequeno, o HTML continua sendo
 * renderizado no servidor e o evento nunca é esquecido — vem na assinatura.
 */
export function TrackedLink({
  href,
  event,
  payload,
  className,
  children,
  "aria-label": ariaLabel,
}: TrackedLinkProps) {
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      onClick={() => track(event, payload)}
      className={cn(className)}
    >
      {children}
    </Link>
  );
}
