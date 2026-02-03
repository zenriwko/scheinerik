// pages/sitemap.xml.ts
import type { GetServerSideProps } from "next";

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
    return `
  <url>
    <loc>${loc}</loc>
    <lastmod>${now}</lastmod>
  </url>`;
  })
  .join("")}
</urlset>`;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const xml = generateSiteMap();
  res.setHeader("Content-Type", "application/xml");
  res.write(xml);
  res.end();

  return { props: {} };
};

export default function SiteMap() {
  return null;
}