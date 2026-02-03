import SEO from "@/components/%SEO/SEO";
import JsonLd from "@/components/%SEO/JsonLd";

import SubHero from "@/components/SubHero/SubHero";
import GalleryGrid from "@/components/GalleryGrid/GalleryGrid";
import FooterCTA from "@/components/FooterCTA/FooterCTA";

const SITE_URL = "https://www.nocni-nebe.eu";

export default function GaleriePage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Domů", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Galerie", item: `${SITE_URL}/galerie` },
    ],
  };

  const galleryPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Galerie – Noční Nebe",
    url: `${SITE_URL}/galerie`,
    description:
      "Galerie realizací Noční Nebe: hvězdné stropy a hvězdné interiéry z optických vláken v autech i rezidencích.",
    isPartOf: {
      "@type": "WebSite",
      name: "Noční Nebe",
      url: SITE_URL,
    },
  };

  return (
    <>
      <SEO
        title="Galerie"
        description="Galerie realizací Noční Nebe: hvězdné stropy z optických vláken v interiérech aut i rezidencí. Inspirujte se stylem, hustotou hvězd a efekty."
        path="/galerie"
      />

      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={galleryPageJsonLd} />

      <main>
        <SubHero
          kicker="Naše Realizace"
          title="Galerie"
          subtitle="Prohlédněte si vybrané momenty z našich instalací – hvězdná obloha v interiérech vozidel a rezidencí."
        />
        <GalleryGrid />
        <FooterCTA />
      </main>
    </>
  );
}