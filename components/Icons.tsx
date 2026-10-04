/**
 * Conjunto único de ícones: grade 24, traço 1.4, sem emoji, sem biblioteca.
 * Tamanho acompanha o texto adjacente via `size` em px (16/20/24).
 */
type IconProps = {
  size?: number;
  className?: string;
};

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
});

export function ArrowDown({ size = 16, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M12 4v15M6 13l6 6 6-6" />
    </svg>
  );
}

export function ArrowUpRight({ size = 16, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}

export function CloseIcon({ size = 20, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function MenuIcon({ size = 20, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M3 7h18M3 17h18" />
    </svg>
  );
}

export function StarIcon({ size = 16, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="m12 4 2.4 5 5.6.8-4 3.9 1 5.5-5-2.7-5 2.7 1-5.5-4-3.9 5.6-.8L12 4Z" />
    </svg>
  );
}

export function InstagramIcon({ size = 18, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <rect x="4" y="4" width="16" height="16" rx="4.5" />
      <circle cx="12" cy="12" r="3.6" />
      <circle cx="16.8" cy="7.2" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function WhatsAppIcon({ size = 18, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M4.5 19.5 6 15.8A7 7 0 1 1 9 18.3l-4.5 1.2Z" />
      <path d="M9.6 9.2c.3 1.4 1.4 2.5 2.8 2.8l1-1.1 1.6.9-.3 1.3c-1.9.4-4.7-1.9-5.6-4.6l1.3-.4.9 1.6-1.7.5Z" />
    </svg>
  );
}

/* --- Pilares da marca: um ícone por diferencial, mesma gramática visual --- */

export function OvenIcon({ size = 24, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M5 19V11a7 7 0 0 1 14 0v8" />
      <path d="M3.5 19h17" />
      <path d="M12 17.5c-1.6-1.5-.7-3.2.2-4.2.2 1.3 1.2 1.6 1.2 2.7 0 .7-.6 1.3-1.4 1.5Z" />
    </svg>
  );
}

export function InspirationIcon({ size = 24, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M6 19c0-4 2.7-7 6-7s6 3 6 7" />
      <path d="M3.5 19h17" />
      <path d="M12 9.5c0-1.6-.9-2.4-.9-3.6M16 10c0-1.2-.7-1.9-.7-2.9M8 10c0-1.2-.7-1.9-.7-2.9" />
    </svg>
  );
}

export function DoughIcon({ size = 24, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <circle cx="12" cy="12.5" r="6.2" />
      <path d="M7.6 11c2.6 1.2 6.2 1.2 8.8 0M7.6 14c2.6 1.2 6.2 1.2 8.8 0" />
      <path d="M4 20h16" />
    </svg>
  );
}