/**
 * Camada de analytics: fina, sem vendor, sem PII.
 * Se um GTM/Plausible for instalado depois, ele apenas lê
 * `window.dataLayer` e os eventos `CustomEvent` de `window`.
 *
 * Privacidade: só são enviados eventos de interação e posição de CTA.
 * Nenhum dado pessoal, nenhum identificador persistente é criado aqui.
 */

export type AnalyticsEvent =
  | "view_menu"
  | "click_order"
  | "click_product"
  | "click_category"
  | "click_first_experience"
  | "click_nazar_club"
  | "click_instagram"
  | "click_whatsapp"
  | "view_3d_hero"
  | "interact_3d_hero"
  | "enable_reduced_motion"
  | "webgl_fallback"
  | "click_3d_product";

type Payload = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export function track(event: AnalyticsEvent, payload: Payload = {}): void {
  if (typeof window === "undefined") return;

  const message = { event, ...payload };

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(message);

  window.dispatchEvent(new CustomEvent("nazar:analytics", { detail: message }));

  if (process.env.NODE_ENV === "development") {
    console.info("[analytics]", message);
  }
}