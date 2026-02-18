import SEO from "@/components/%SEO/SEO";
import JsonLd from "@/components/%SEO/JsonLd";

import SubHero from "@/components/SubHero/SubHero";
import ProjectsGrid from "@/components/ProjectsGrid/ProjectsGrid";
import FooterCTA from "@/components/FooterCTA/FooterCTA";

const SITE_URL = "https://nocninebe.eu";

export default function NasePracePage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Domů", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Naše práce", item: `${SITE_URL}/nase-prace` },
    ],
  };

  const portfolioJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Naše práce – Noční Nebe",
    url: `${SITE_URL}/nase-prace`,
    description:
      "Ukázky realizací hvězdných stropů a hvězdných interiérů Noční Nebe z automobilových i rezidenčních projektů.",
    isPartOf: {
      "@type": "WebSite",
      name: "Noční Nebe",
      url: SITE_URL,
    },
  };

  return (
    <>
      <SEO
        title="Naše práce"
        description="Ukázky realizací hvězdných stropů a hvězdných interiérů Noční Nebe. Prohlédněte si vybrané projekty z rezidenčních i automobilových instalací."
        path="/nase-prace"
      />

      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={portfolioJsonLd} />

      <main>
        <SubHero
          kicker="Ukázky našich realizací"
          title="NAŠE PRÁCE"
          subtitle="Prohlédněte si vybrané projekty, od luxusních rezidenčních stropů až po precizní instalace v interiérech automobilů."
        />
        <ProjectsGrid />
        <FooterCTA />
      </main>
    </>
  );
}