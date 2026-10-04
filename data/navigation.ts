export type NavItem = {
  label: string;
  href: string;
  /** Sai do site (checkout). Nunca recebe `aria-current`. */
  external?: boolean;
};

export const navigation: NavItem[] = [
  { label: "Início", href: "/" },
  { label: "Cardápio", href: "/cardapio" },
  { label: "A Nazar", href: "/a-nazar" },
  { label: "Nazar Club", href: "/#nazar-club" },
  { label: "Contato", href: "/#contato" },
];

/** Regras de item atual: âncora nunca é "página atual"; externo nunca é. */
export function isCurrentPath(pathname: string, href: string, external?: boolean) {
  if (external || href.includes("#")) return false;
  return pathname === href;
}