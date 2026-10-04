import Link from "next/link";
import { Container } from "@/components/Container";
import { Wordmark } from "@/components/Wordmark";
import { OrderButton } from "@/components/OrderButton";
import { InstagramIcon, WhatsAppIcon } from "@/components/Icons";
import { navigation } from "@/data/navigation";
import { site, socialChannels, locationLine } from "@/data/site";

const CHANNEL_ICON = {
  instagram: InstagramIcon,
  whatsapp: WhatsAppIcon,
} as const;

const LEGAL = [
  { label: "Política de privacidade", href: "/privacidade" },
  { label: "Termos de uso", href: "/termos" },
];

/**
 * Footer.
 *
 * Os canais sociais só viram link quando a marca confirmar o endereço. Até lá
 * aparecem como item desabilitado com "em breve" — link quebrado ou @inventado
 * seria pior que a ausência (brief §33).
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="contato"
      className="theme-navy relative isolate bg-[var(--palette-navy-deep)] text-ink"
      aria-labelledby="rodape-titulo"
    >
      <div aria-hidden className="grain pointer-events-none absolute inset-0 -z-10" />

      <Container className="py-[var(--space-16)] lg:py-[var(--space-20)]">
        <h2 id="rodape-titulo" className="sr-only">
          Contato e navegação do rodapé
        </h2>

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <Link
              href="/"
              className="inline-flex min-h-11 items-center rounded-[var(--radius-xs)]"
              aria-label={`${site.name} — início`}
            >
              <Wordmark markClassName="footer-mark h-8 w-8" />
            </Link>
            <p className="measure-tight mt-5 text-sm text-ink-2">
              {site.claim} no {site.locale}, {site.city}. Massa artesanal,
              recheios generosos e o calor do forno.
            </p>

            <div className="mt-7">
              <OrderButton placement="footer" variant="secondary">
                Pedir agora
              </OrderButton>
            </div>
          </div>

          <nav aria-label="Navegação do rodapé" className="lg:col-span-3">
            <h3 className="text-2xs uppercase tracking-caps text-ink-3">
              Navegação
            </h3>
            <ul className="mt-5 flex flex-col gap-1">
              {navigation.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="inline-flex min-h-11 min-w-11 items-center text-sm text-ink-2 transition-colors duration-[var(--duration-fast)] hover:text-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-4">
            <h3 className="text-2xs uppercase tracking-caps text-ink-3">
              Onde estamos
            </h3>
            <p className="mt-5 text-sm text-ink">{locationLine}</p>
            <p className="mt-2 text-sm text-ink-3">
              Endereço completo e horário de funcionamento em breve.
            </p>

            <h3 className="mt-8 text-2xs uppercase tracking-caps text-ink-3">
              Fale com a Nazar
            </h3>
            <ul className="mt-4 flex flex-col gap-2">
              {socialChannels.map((channel) => {
                const Icon = CHANNEL_ICON[channel.id];
                const href = channel.href;

                return href ? (
                  <li key={channel.id}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center gap-3 text-sm text-ink transition-colors duration-[var(--duration-fast)] hover:text-gold"
                    >
                      <Icon size={18} />
                      {channel.label}
                      <span className="sr-only"> (abre em nova aba)</span>
                    </a>
                  </li>
                ) : (
                  <li
                    key={channel.id}
                    className="inline-flex min-h-11 items-center gap-3 text-sm text-ink-3"
                  >
                    <Icon size={18} />
                    {channel.label}
                    <span className="badge">Em breve</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-[var(--color-hairline)] pt-8 text-sm text-ink-3 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. Pedidos e pagamento processados pelo{" "}
            {site.delivery.platform}.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {LEGAL.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="link-inline min-h-11 py-2">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}