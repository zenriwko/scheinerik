// Cloudflare Pages Function — thin proxy. Browser Rendering bindings are not
// supported on Pages Functions, only on real Workers (confirmed against
// Cloudflare's binding compatibility docs), so the actual capture logic
// (SSRF checks, rate limiting, screenshot capture) lives in a separate
// Worker at workers/mockup-capture/, reached here via a service binding —
// see the [[services]] entry in the root wrangler.toml. This keeps the
// public /api/mockup endpoint on the main site unchanged.
// Minimal local stand-in for the `Fetcher` service-binding type — the
// project doesn't otherwise depend on @cloudflare/workers-types, and this is
// the only method actually used here.
interface ServiceBinding {
  fetch(request: Request): Promise<Response>;
}

interface Env {
  MOCKUP_WORKER: ServiceBinding;
}

export const onRequestPost = async ({
  request,
  env,
}: {
  request: Request;
  env: Env;
}) => {
  return env.MOCKUP_WORKER.fetch(request);
};
