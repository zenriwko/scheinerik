// Real Cloudflare Worker — Browser Rendering bindings only work here, not on
// Pages Functions. The Pages project's functions/api/mockup.ts forwards
// requests to this Worker via a service binding (see the root wrangler.toml
// [[services]] entry), so the public /api/mockup endpoint is unchanged.
//
// Screenshot capture uses Cloudflare's Browser Rendering API (a managed,
// sandboxed Chromium pool reachable only via the MYBROWSER binding below —
// see wrangler.toml) rather than the `playwright` npm package, since a real
// Playwright/Chromium binary cannot run inside the Workers runtime.
import puppeteer, { type BrowserWorker, type Browser } from "@cloudflare/puppeteer";

interface Env {
  MYBROWSER: BrowserWorker;
}

interface Viewport {
  key: "desktop" | "laptop" | "tablet" | "phone";
  label: string;
  width: number;
  height: number;
}

const VIEWPORTS: Viewport[] = [
  { key: "desktop", label: "Desktop", width: 1920, height: 1080 },
  { key: "laptop", label: "Laptop", width: 1366, height: 768 },
  { key: "tablet", label: "Tablet", width: 768, height: 1024 },
  { key: "phone", label: "Phone", width: 375, height: 812 },
];

const NAV_TIMEOUT_MS = 15_000;
// Must comfortably exceed launch overhead + 4 sequential NAV_TIMEOUT_MS
// worst cases, or a slow-but-real site trips this before its own per-nav
// timeout ever gets a chance to fail individually.
const ROUTE_TIMEOUT_MS = 90_000;

// Best-effort, per-isolate rate limit. Cloudflare Workers isolates are
// ephemeral and not shared across edge locations, so this does not enforce a
// hard global cap — it just stops a single hot isolate from being hammered.
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const requestLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (requestLog.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );
  recent.push(now);
  requestLog.set(ip, recent);
  if (requestLog.size > 5000) requestLog.clear(); // guard against unbounded growth
  return recent.length > RATE_LIMIT_MAX_REQUESTS;
}

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

const PRIVATE_HOSTNAMES = new Set([
  "localhost",
  "127.0.0.1",
  "0.0.0.0",
  "::1",
]);

function isPrivateIPv4(ip: string): boolean {
  const parts = ip.split(".").map(Number);
  if (parts.length !== 4 || parts.some((p) => Number.isNaN(p))) return false;
  const [a, b] = parts;
  if (a === 10) return true;
  if (a === 127) return true;
  if (a === 0) return true;
  if (a === 169 && b === 254) return true; // link-local / cloud metadata
  if (a === 172 && b >= 16 && b <= 31) return true;
  if (a === 192 && b === 168) return true;
  return false;
}

function isPrivateIPv6(ip: string): boolean {
  const lower = ip.toLowerCase();
  if (lower === "::1") return true;
  if (lower.startsWith("fe80:")) return true; // link-local
  if (lower.startsWith("fc") || lower.startsWith("fd")) return true; // unique local
  if (lower.startsWith("::ffff:")) return isPrivateIPv4(lower.slice(7)); // IPv4-mapped
  return false;
}

function isIPLiteral(host: string): boolean {
  return /^\d{1,3}(\.\d{1,3}){3}$/.test(host) || host.includes(":");
}

// Resolves the hostname via DNS-over-HTTPS and rejects it if any record
// points at a private/reserved range, to reduce (not eliminate) DNS-rebinding
// SSRF risk. The actual page navigation happens inside Cloudflare's Browser
// Rendering sandbox, not from this Worker's own network context, so this is
// a defense-in-depth check rather than the sole protection.
async function resolvesToPrivateIP(hostname: string): Promise<boolean> {
  try {
    const lookups = await Promise.all(
      ["A", "AAAA"].map((type) =>
        fetch(
          `https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(
            hostname
          )}&type=${type}`,
          { headers: { Accept: "application/dns-json" } }
        )
          .then((r) => (r.ok ? r.json() : null))
          .catch(() => null)
      )
    );

    const records: { data: string }[] = [];
    for (const lookup of lookups) {
      if (lookup && Array.isArray(lookup.Answer)) {
        records.push(...lookup.Answer);
      }
    }

    if (records.length === 0) return true; // couldn't resolve — fail closed

    return records.some(({ data }) =>
      data.includes(":") ? isPrivateIPv6(data) : isPrivateIPv4(data)
    );
  } catch {
    return true; // fail closed on DoH errors
  }
}

async function validateUrl(
  raw: string
): Promise<{ ok: true; url: URL } | { ok: false; error: string }> {
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    return { ok: false, error: "Enter a valid URL, e.g. https://example.com" };
  }

  if (url.protocol !== "http:" && url.protocol !== "https:") {
    return { ok: false, error: "Only http:// and https:// URLs are allowed" };
  }

  const hostname = url.hostname.toLowerCase();
  if (PRIVATE_HOSTNAMES.has(hostname) || hostname.endsWith(".local")) {
    return { ok: false, error: "That host is not allowed" };
  }

  if (isIPLiteral(hostname)) {
    if (
      hostname.includes(":") ? isPrivateIPv6(hostname) : isPrivateIPv4(hostname)
    ) {
      return { ok: false, error: "That host is not allowed" };
    }
    return { ok: true, url };
  }

  if (await resolvesToPrivateIP(hostname)) {
    return { ok: false, error: "That host is not allowed" };
  }

  return { ok: true, url };
}

async function captureViewport(
  browser: Browser,
  targetUrl: string,
  viewport: Viewport
): Promise<{ key: string; label: string; image: string }> {
  const context = await browser.createBrowserContext();
  try {
    const page = await context.newPage();
    await page.setViewport({ width: viewport.width, height: viewport.height });
    // "load" rather than "networkidle0"/"networkidle2": many real sites keep
    // a connection open indefinitely (chat widgets, analytics beacons,
    // polling), which makes network-idle waits time out on pages that have
    // actually finished rendering.
    await page.goto(targetUrl, {
      waitUntil: "load",
      timeout: NAV_TIMEOUT_MS,
    });
    const buffer = await page.screenshot({ type: "png" });
    const base64 = buffer.toString("base64");
    return {
      key: viewport.key,
      label: viewport.label,
      image: `data:image/png;base64,${base64}`,
    };
  } finally {
    await context.close();
  }
}

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(
      () => reject(new Error("Mockup generation timed out")),
      ms
    );
    promise.then(
      (v) => {
        clearTimeout(timer);
        resolve(v);
      },
      (e) => {
        clearTimeout(timer);
        reject(e);
      }
    );
  });
}

const worker = {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method !== "POST") {
      return jsonResponse({ error: "Method not allowed" }, 405);
    }

    const ip = request.headers.get("CF-Connecting-IP") ?? "unknown";
    if (isRateLimited(ip)) {
      return jsonResponse(
        { error: "Too many requests. Try again in a minute." },
        429
      );
    }

    let body: { url?: unknown };
    try {
      body = await request.json();
    } catch {
      return jsonResponse({ error: "Invalid request body" }, 400);
    }

    if (typeof body.url !== "string" || body.url.trim() === "") {
      return jsonResponse({ error: "Missing 'url' field" }, 400);
    }

    const validation = await validateUrl(body.url.trim());
    if (!validation.ok) {
      return jsonResponse({ error: validation.error }, 400);
    }
    const targetUrl = validation.url.toString();

    let browser: Browser | undefined;
    try {
      browser = await withTimeout(puppeteer.launch(env.MYBROWSER), ROUTE_TIMEOUT_MS);

      // Captured sequentially — Browser Rendering sessions have a per-account
      // concurrency limit, so one browser with isolated contexts per viewport
      // is more reliable here than four parallel puppeteer.launch() calls.
      const results = await withTimeout(
        (async () => {
          const shots: { key: string; label: string; image: string }[] = [];
          for (const viewport of VIEWPORTS) {
            shots.push(await captureViewport(browser as Browser, targetUrl, viewport));
          }
          return shots;
        })(),
        ROUTE_TIMEOUT_MS
      );

      const screenshots = Object.fromEntries(
        results.map((r) => [r.key, { label: r.label, image: r.image }])
      );

      return jsonResponse({ screenshots });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      console.error("mockup capture failed:", message);
      const timedOut = message.toLowerCase().includes("timed out") || message.toLowerCase().includes("timeout");
      return jsonResponse(
        { error: timedOut ? "The site took too long to respond." : "Could not generate a mockup for that URL." },
        timedOut ? 504 : 502
      );
    } finally {
      if (browser) {
        try {
          await browser.close();
        } catch {
          // ignore close errors
        }
      }
    }
  },
};

export default worker;
