import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * Wordmark com logotipo oficial da marca.
 */
export function Wordmark({
  className,
  markClassName,
}: {
  className?: string;
  markClassName?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <Image
        src="/images/nazar/logo.jpg"
        alt="Nazar Forno"
        width={882}
        height={881}
        className={cn("h-6 w-6 shrink-0 object-contain", markClassName)}
        priority
      />
      <span className="flex flex-col leading-none">
        <span className="font-display text-base font-medium tracking-normal">
          Nazar
        </span>
        <span className="mt-0.5 text-2xs font-medium uppercase tracking-[var(--tracking-caps-lg)] text-current opacity-70">
          Forno
        </span>
      </span>
    </span>
  );
}