// pages/robots.txt.ts
export const runtime = "edge";

const SITE_URL = "https://www.nocni-nebe.eu";

export default function handler() {
  const body = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;

  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}