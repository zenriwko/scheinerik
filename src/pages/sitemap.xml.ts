// pages/sitemap.xml.ts
export const runtime = "experimental-edge";

const SITE_URL = "https://www.nocni-nebe.eu";

const urls = [
  "/",
  "/sluzby",
  "/sluzby/automobily/hvezdny-interier",
  "/sluzby/automobily/hvezdny-strop",
  "/sluzby/nabytek",
  "/galerie",
  "/cenik",
  "/kontakt",
  "/o-nas",
  "/nase-prace",
];

function generateSiteMap() {
  const now = new Date().toISOString();

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map((path) => {
    const loc = `${SITE_URL}${path}`;
    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${now}</lastmod>
  </url>`;
  })
  .join("\n")}
</urlset>`;
}

export default function handler() {
  const xml = generateSiteMap();

  return new Response(xml, {
    headers: {
      "content-type": "application/xml; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}