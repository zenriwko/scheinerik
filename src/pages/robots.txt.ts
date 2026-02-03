// pages/robots.txt.ts
import type { GetServerSideProps } from "next";

const SITE_URL = "https://www.nocni-nebe.eu";

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader("Content-Type", "text/plain");
  res.write(`User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`);
  res.end();

  return { props: {} };
};

export default function Robots() {
  return null;
}