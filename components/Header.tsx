"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { isCurrentPath, navigation } from "@/data/navigation";
import { site } from "@/data/site";
import { Container } from "./Container";
import { OrderButton } from "./OrderButton";
import { Wordmark } from "./Wordmark";
import { MenuIcon } from "./Icons";
import { MobileMenu } from "./MobileMenu";
import { usePrefersReducedMotion } from "./ReducedMotion";
import { cn } from "@/lib/cn";

/**
 * Header sticky.
 *
 * - Altura reduz discretamente ao rolar; fundo sólido + fio de cabelo.
 *   Sem `backdrop-filter`: sobre um header de cor sólida ele não produz
 *   efeito visível e custa composição em cada frame (constitution §6).
 * - Um único CTA primário no header. No mobile ele vira "Pedir" e continua
 *   visível ao lado do botão de menu.
 */
export function Header({ theme = "navy" }: { theme?: "navy" | "creme" }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement | null>(null);
  const pathname = usePathname();
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    let frame: number | null = null;
    const onScroll = () => {
      if (frame !== null) return;
      frame = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 24);
        frame = null;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    toggleRef.current?.focus();
  }, []);

  return (
    <>
      <header
        data-scrolled={scrolled}
        className={cn(
          theme === "navy" ? "theme-navy" : "theme-creme",
          "fixed inset-x-0 top-0 z-[var(--z-sticky)] transition-[background-color,border-color] duration-[var(--duration-base)] ease-[var(--ease-standard)]",
          "border-b",
          scrolled
            ? "border-[var(--color-hairline)] bg-[var(--color-bg)]"
            : "border-transparent bg-transparent",
        )}
      >
        <Container>
          <div
            className={cn(
              "flex items-center justify-between gap-4 transition-[height] duration-[var(--duration-base)] ease-[var(--ease-standard)]",
              scrolled ? "h-[var(--header-height-scrolled)]" : "h-[var(--header-height)]",
            )}
          >
            <Link
              href="/"
              className="inline-flex min-h-11 items-center rounded-[var(--radius-xs)] text-ink"
              aria-label={`${site.name} — início`}
            >
              <Wordmark />
            </Link>

            <nav aria-label="Navegação principal" className="hidden lg:block">
              <ul className="flex items-center gap-8">
                {navigation.map((item) => {
                  const active = isCurrentPath(pathname, item.href, item.external);
                  return (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          // min-w-11: "Início" tem 37px de texto; sem isso o
                          // alvo fica menor que 44px em largura.
                          "inline-flex h-11 min-w-11 items-center justify-center text-sm tracking-wide text-ink-2 transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:text-ink",
                          active && "text-ink",
                        )}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="flex items-center gap-2">
              <OrderButton
                placement="header"
                className="hidden lg:inline-flex"
              >
                Pedir agora
              </OrderButton>
              {/* No mobile, o CTA do header entrega o posto para a barra fixa
                  assim que a página rola — nunca dois primários na tela. */}
              <OrderButton
                placement="header"
                className={cn("px-4 lg:hidden", scrolled && "invisible")}
              >
                Pedir
              </OrderButton>
              <button
                ref={toggleRef}
                type="button"
                onClick={() => setMenuOpen(true)}
                aria-expanded={menuOpen}
                aria-controls="menu-mobile"
                className="inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius-xs)] text-ink transition-colors duration-[var(--duration-fast)] hover:bg-[color-mix(in_srgb,var(--color-ink)_8%,transparent)] lg:hidden"
              >
                <MenuIcon size={22} />
                <span className="sr-only">Abrir menu</span>
              </button>
            </div>
          </div>
        </Container>
      </header>

      {menuOpen && (
        <MobileMenu
          id="menu-mobile"
          onClose={closeMenu}
          reducedMotion={reducedMotion}
        />
      )}
    </>
  );
}