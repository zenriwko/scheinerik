import Head from "next/head";

const SITE_URL = "https://nocninebe.eu";
const SITE_NAME = "Noční Nebe";

type SEOProps = {
  title: string;
  description: string;
  path: string;
  featuredImage?: string;
  noindex?: boolean;
};

export default function SEO({
  title,
  description,
  path,
  featuredImage,
  noindex = false,
}: SEOProps) {
  const url = `${SITE_URL}${path}`;
  const fullTitle = `${title} | ${SITE_NAME}`;

  // Use featured image if provided, otherwise fallback
  const imagePath = featuredImage ?? "/og.jpg";

  // If image already absolute, keep it
  const ogImage = imagePath.startsWith("http")
    ? imagePath
    : `${SITE_URL}${imagePath}`;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Head>
  );
}