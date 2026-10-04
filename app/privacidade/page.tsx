import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/Container";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Política de privacidade",
  description: `Como a ${site.name} trata dados no site: coleta mínima, cookies de medição e contato para dúvidas.`,
  alternates: { canonical: "/privacidade" },
};

/**
 * Política de privacidade.
 *
 * Conteúdo escrito para descrever o que este site realmente faz: não há
 * cadastro, não há cookie de anúncio, não há venda de dados. Se a marca
 * instalar analytics com identificadores ou marketing no futuro, este texto
 * precisa ser revisado antes de publicar (brief §33 — nada de promessa legal
 * genérica que o site não cumpra).
 */
const SECTIONS = [
  {
    title: "Quem é o controlador",
    body: [
      `Este site é mantido pela ${site.name}, operação de restaurante no ${site.locale}, ${site.city} — ${site.state}. Para qualquer questão sobre dados pessoais, use o canal oficial da marca.`,
      `O site não faz cadastro de usuário, não pede CPF e não cria conta. A finalização do pedido acontece inteiramente na plataforma ${site.delivery.platform}, que possui os próprios termos de privacidade.`,
    ],
  },
  {
    title: "O que é coletado",
    body: [
      "Por padrão, este site não grava nenhum dado pessoal. Não há formulários de contato, newsletter nem autenticação.",
      "A navegação pode gerar arquivos técnicos temporários (logs de servidor) com endereço IP, data e hora, mantidos pelo provedor de hospedagem conforme a boa prática de segurança.",
      "Links para a plataforma de pedidos saem do site com parâmetros de origem (utm) para permitir entender de onde vieram os pedidos. Esses parâmetros não identificam a pessoa.",
    ],
  },
  {
    title: "Medição de interação",
    body: [
      "O site emite eventos de interação (cliques em botões, categoria vista, abertura do cardápio) em memória, no próprio navegador. Eles podem ser lidos por uma ferramenta de análise instalada pela marca.",
      "Nenhum identificador persistente é criado por esse código, nenhum dado é enviado a terceiros por padrão e nada é compartilhado com anunciantes. Se a marca ativar essa medição, esta seção será atualizada com o nome da ferramenta e a forma de opt-out.",
    ],
  },
  {
    title: "Recursos de terceiros",
    body: [
      `Ao clicar em “Pedir agora”, você sai deste site e vai para ${site.delivery.platform}. A partir daí vale a política de privacidade daquela plataforma.`,
      "Nenhuma rede social é carregada de forma automática: não há widget de Instagram nem botão de compartilhamento embutido que rastreie a visita.",
    ],
  },
  {
    title: "Seus direitos",
    body: [
      "Como o site não trata cadastro de usuários, normalmente não há dado pessoal seu para corrigir ou apagar aqui. Se você tem uma relação com a marca por pedidos, o canal de atendimento é o da própria operação.",
      "Quando este site passar a coletar dados de forma identificável, esta página será atualizada com prazo de resposta, base legal e forma de solicitação.",
    ],
  },
  {
    title: "Alterações",
    body: [
      "Esta política pode ser atualizada quando o site mudar de função. A data da última atualização aparece no topo desta página.",
    ],
  },
] as const;

export default function PrivacyPage() {
  return (
    <>
      <Header theme="creme" />
      <main id="conteudo" className="theme-creme bg-[var(--color-bg)]">
        <div className="pt-[calc(var(--header-height)+var(--space-12))]">
          <Container className="max-w-[var(--measure-wide)]">
            <nav aria-label="Trilha de navegação" className="text-sm text-ink-3">
              <ol className="flex items-center gap-2">
                <li>
                  <Link href="/" className="link-inline inline-flex min-h-11 min-w-11 items-center">
                    Início
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li aria-current="page" className="text-ink-2">
                  Privacidade
                </li>
              </ol>
            </nav>

            <header className="mt-8 border-b border-[var(--color-hairline)] pb-8">
              <p className="eyebrow">Legal</p>
              <h1 className="display-section mt-5">Política de privacidade</h1>
              <p className="lede mt-5">
                O que este site coleta — que é quase nada — e por quê.
              </p>
            </header>

            <div className="mt-12 grid gap-x-10 gap-y-12 md:grid-cols-[14rem_1fr]">
              <nav aria-label="Seções desta política" className="hidden md:block">
                <h2 className="sr-only">Índice</h2>
                <ol className="flex flex-col gap-1 text-sm">
                  {SECTIONS.map((section, index) => (
                    <li key={section.title}>
                      <a
                        href={`#secao-${index + 1}`}
                        className="link-inline inline-flex min-h-11 items-center text-ink-2"
                      >
                        {section.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>

              <div className="flex flex-col gap-12">
                {SECTIONS.map((section, index) => (
                  <section
                    key={section.title}
                    id={`secao-${index + 1}`}
                    aria-labelledby={`secao-${index + 1}-titulo`}
                    className="scroll-mt-[calc(var(--header-height)+var(--space-6))]"
                  >
                    <h2
                      id={`secao-${index + 1}-titulo`}
                      className="text-xl"
                    >
                      <span className="text-ink-3" data-tabular>
                        {String(index + 1).padStart(2, "0")} ·{" "}
                      </span>
                      {section.title}
                    </h2>
                    {section.body.map((paragraph) => (
                      <p
                        key={paragraph.slice(0, 24)}
                        className="measure mt-4 text-base leading-relaxed text-ink-2"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </section>
                ))}
              </div>
            </div>
          </Container>
        </div>

        <div className="h-[var(--space-24)]" />
      </main>
      <Footer />
    </>
  );
}