/**
 * Auditoria de navegador real via Chrome DevTools Protocol.
 *
 * Não substitui a revisão visual, mas responde ao que o HTML não responde:
 * erros de console, falha de hidratação, conteúdo invisível, contraste
 * computado, alvos de toque e métricas de CLS.
 *
 * Uso: node scripts/audit.mjs http://localhost:3210
 */
import { spawn } from "node:child_process";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const BASE = process.argv[2] ?? "http://localhost:3210";
const CHROME =
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const PORT = 9400 + Math.floor(Math.random() * 400);

// Nada aqui pode deixar o processo pendurado: auditoria que trava não
// informa nada. O timeout encerra tudo.
const HARD_LIMIT = setTimeout(() => {
  console.error("auditoria excedeu o tempo limite");
  chrome.kill("SIGKILL");
  process.exit(1);
}, Number(process.env.AUDIT_TIMEOUT ?? 180000));
HARD_LIMIT.unref?.();

const chrome = spawn(
  CHROME,
  [
    "--headless=new",
    `--remote-debugging-port=${PORT}`,
    "--disable-gpu",
    "--hide-scrollbars",
    "--no-first-run",
    "--no-default-browser-check",
    `--user-data-dir=${mkdtempSync(join(tmpdir(), "nazar-cdp-"))}`,
    ...(process.env.CHROME_GL ? ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"] : ["--disable-gpu"]),
    "about:blank",
  ],
  { stdio: "ignore" },
);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function targetWs() {
  for (let i = 0; i < 60; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/json/list`);
      const list = await res.json();
      const page = list.find((t) => t.type === "page");
      if (page?.webSocketDebuggerUrl) return page.webSocketDebuggerUrl;
    } catch {}
    await sleep(250);
  }
  throw new Error("Chrome não respondeu na porta de depuração");
}

let id = 0;
function connect(url) {
  const ws = new WebSocket(url);
  const pending = new Map();
  const events = [];
  const ready = new Promise((resolve) => ws.addEventListener("open", resolve));
  ws.addEventListener("message", (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id);
      pending.delete(msg.id);
      if (msg.error) reject(new Error(msg.error.message));
      else resolve(msg.result);
    } else if (msg.method) {
      events.push(msg);
    }
  });
  return {
    ready,
    events,
    send(method, params = {}) {
      const msgId = ++id;
      return new Promise((resolve, reject) => {
        pending.set(msgId, { resolve, reject });
        ws.send(JSON.stringify({ id: msgId, method, params }));
      });
    },
  };
}

const AUDIT = `(() => {
  const out = { problems: [], info: {} };
  const px = (el) => el.getBoundingClientRect();
  const cs = (el) => getComputedStyle(el);

  // 1. Texto invisível: o pior defeito possível numa página de conteúdo.
  const hidden = Array.from(document.querySelectorAll('.reveal')).filter(
    (el) => Number(cs(el).opacity) < 0.9 && px(el).top < innerHeight && px(el).bottom > 0,
  );
  if (hidden.length) {
    out.problems.push(
      'reveal invisível acima da dobra: ' + hidden.length +
      ' (' + hidden.slice(0,3).map((el) => el.className.slice(0,40)).join(' | ') + ')',
    );
  }

  // 2. Alvos de toque abaixo de 44px nos controles interativos.
  const small = Array.from(document.querySelectorAll('a,button,[role="tab"]'))
    .filter((el) => {
      const r = px(el);
      const style = cs(el);
      if (style.visibility === 'hidden' || style.display === 'none' || r.width === 0) return false;
      if (el.closest('[aria-hidden="true"]')) return false;
      return r.height < 44 || r.width < 44;
    })
    .map((el) => (el.tagName + ':' + (el.textContent || '').trim().slice(0, 24) +
      ' ' + Math.round(px(el).width) + 'x' + Math.round(px(el).height)));
  if (small.length) out.problems.push('alvos < 44px: ' + small.slice(0, 8).join(' , '));

  // 3. Overflow horizontal (quebra de layout em mobile).
  if (document.documentElement.scrollWidth > innerWidth + 1) {
    out.problems.push(
      'overflow horizontal: scrollWidth ' + document.documentElement.scrollWidth +
      ' > ' + innerWidth,
    );
  }

  // 4. Contraste computado dos textos principais.
  const lum = (c) => {
    const [r, g, b] = c.map((v) => {
      const s = v / 255;
      return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  const parse = (s) => (s.match(/[\\d.]+/g) || []).slice(0, 3).map(Number);
  const ratio = (fg, bg) => {
    const a = lum(parse(fg)), b = lum(parse(bg));
    return ((Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05)).toFixed(2);
  };
  const bgOf = (el) => {
    let node = el;
    while (node && node !== document.documentElement) {
      const bg = cs(node).backgroundColor;
      if (bg && !/rgba?\\(0, 0, 0, 0\\)|transparent/.test(bg)) return bg;
      node = node.parentElement;
    }
    return cs(document.body).backgroundColor;
  };
  const samples = ['h1', 'h2', '.lede', '.eyebrow', '.btn-primary', '.btn-secondary', 'p']
    .flatMap((sel) => Array.from(document.querySelectorAll(sel)).slice(0, 3));
  out.info.contraste = Array.from(new Set(samples.map((el) => {
    const style = cs(el);
    return el.tagName + ' ' + ratio(style.color, bgOf(el)) + ':1';
  })));

  // 5. Foco visível: nenhum elemento pode zerar o outline sem substituto.
  const noFocusStyle = Array.from(document.querySelectorAll('a,button'))
    .filter((el) => cs(el).outlineStyle === 'none' && cs(el).outlineWidth === '0px')
    .length;
  out.info.semOutline = noFocusStyle;


  // 6. Landmarks e h1 único.
  out.info.h1 = document.querySelectorAll('h1').length;
  out.info.main = document.querySelectorAll('main').length;
  out.info.header = document.querySelectorAll('header').length;
  out.info.footer = document.querySelectorAll('footer').length;
  out.info.nav = document.querySelectorAll('nav').length;
  out.info.sections = document.querySelectorAll('section').length;
  out.info.lang = document.documentElement.lang;
  out.info.canvas = document.querySelectorAll('canvas').length;
  out.info.canvasVisivel = Array.from(document.querySelectorAll('canvas')).some((c) => {
    const b = c.getBoundingClientRect();
    return b.width > 0 && b.height > 0 && getComputedStyle(c).opacity !== '0';
  });
  out.info.barraFixaVisivel = Array.from(document.querySelectorAll('.fixed.bottom-0'))
    .map((el) => getComputedStyle(el).transform === 'none' ? 'visivel' : 'oculta');
  out.info.imgsSemAlt = Array.from(document.querySelectorAll('img')).filter((i) => !i.alt).length;
  out.info.svgSemRotulo = Array.from(document.querySelectorAll('svg')).filter(
    (s) => !s.getAttribute('aria-hidden') && !s.querySelector('title') && !s.getAttribute('aria-label'),
  ).length;
  out.info.botoesSemNome = Array.from(document.querySelectorAll('button,a')).filter((el) =>
    !(el.textContent || '').trim() && !el.getAttribute('aria-label') && !el.querySelector('[class*=sr-only]'),
  ).length;
  out.info.fontes = Array.from(new Set(Array.from(document.querySelectorAll('h1,h2,p,span')).map((el) => cs(el).fontFamily.split(',')[0])));
  out.info.titulo = document.title;
  out.info.desc = (document.querySelector('meta[name=description]') || {}).content;
  return JSON.stringify(out);
})()`;

const CLS = `(async () => {
  let value = 0;
  new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) if (!entry.hadRecentInput) value += entry.value;
  }).observe({ type: 'layout-shift', buffered: true });
  await new Promise((r) => setTimeout(r, 1200));
  window.scrollTo(0, document.body.scrollHeight);
  await new Promise((r) => setTimeout(r, 1200));
  window.scrollTo(0, 0);
  await new Promise((r) => setTimeout(r, 600));
  return value;
})()`;

async function audit(url, viewport) {
  const wsUrl = await targetWs();
  const cdp = connect(wsUrl);
  await cdp.ready;
  await cdp.send("Page.enable");
  await cdp.send("Runtime.enable");
  await cdp.send("Log.enable");
  await cdp.send("Emulation.setDeviceMetricsOverride", {
    width: viewport[0],
    height: viewport[1],
    deviceScaleFactor: 1,
    mobile: viewport[0] < 700,
  });
  cdp.events.length = 0;
  await cdp.send("Page.navigate", { url });
  await sleep(Number(process.env.AUDIT_SETTLE ?? 3500));
  const auditRes = await cdp.send("Runtime.evaluate", {
    expression: AUDIT,
    returnByValue: true,
  });
  const clsRes = await cdp.send("Runtime.evaluate", {
    expression: CLS,
    awaitPromise: true,
    returnByValue: true,
  });

  const consoleIssues = cdp.events
    .filter((e) => e.method === "Log.entryAdded" || e.method === "Runtime.consoleAPICalled" || e.method === "Runtime.exceptionThrown")
    .map((e) => {
      if (e.method === "Log.entryAdded") return `${e.params.entry.level}: ${e.params.entry.text}`;
      if (e.method === "Runtime.exceptionThrown")
        return `exception: ${e.params.exceptionDetails.text} ${e.params.exceptionDetails.exception?.description ?? ""}`;
      return `console.${e.params.type}: ${e.params.args.map((a) => a.value ?? a.description).join(" ")}`;
    })
    .filter((t) => !/favicon|manifest|analytics|Download the React DevTools/i.test(t));

  return {
    url,
    viewport: viewport.join("x"),
    dados: JSON.parse(auditRes.result.value),
    consoleIssues,
    cls: clsRes.result.value,
  };
}

const ROUTES = (process.env.ROUTES ?? "/@1440x900,/@390x844,/cardapio@390x844,/a-nazar@1440x900,/privacidade@390x844")
  .split(",")
  .map((entry) => {
    const [path, size] = entry.split("@");
    const [w, h] = (size ?? "1440x900").split("x").map(Number);
    return [path, [w, h]];
  });

const results = [];
try {
  for (const [path, size] of ROUTES) results.push(await audit(BASE + path, size));
} finally {
  clearTimeout(HARD_LIMIT);
  chrome.kill("SIGKILL");
}
console.log(JSON.stringify(results, null, 2));
