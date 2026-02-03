import SEO from "@/components/%SEO/SEO";
import JsonLd from "@/components/%SEO/JsonLd";

import SubHero from "@/components/SubHero/SubHero";
import Services from "@/components/Services/Services";
import WhyChooseUs from "@/components/WhyChooseUs/WhyChooseUs";
import FooterCTA from "@/components/FooterCTA/FooterCTA";

const SITE_URL = "https://www.nocni-nebe.eu";

export default function ServicesPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Domů",
        item: `${SITE_URL}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Služby",
        item: `${SITE_URL}/sluzby`,
      },
    ],
  };

  const servicesPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Služby",
    url: `${SITE_URL}/sluzby`,
    description:
      "Přehled služeb Noční Nebe: hvězdné stropy a hvězdné interiéry z optických vláken pro auta i interiéry.",
    isPartOf: {
      "@type": "WebSite",
      name: "Noční Nebe",
      url: SITE_URL,
    },
    hasPart: [
      {
        "@type": "WebPage",
        name: "Hvězdný strop do auta",
        url: `${SITE_URL}/sluzby/automobily/hvezdny-strop`,
      },
      {
        "@type": "WebPage",
        name: "Hvězdný interiér do auta",
        url: `${SITE_URL}/sluzby/automobily/hvezdny-interier`,
      },
      {
        "@type": "WebPage",
        name: "Hvězdné nebe do nábytku",
        url: `${SITE_URL}/sluzby/nabytek`,
      },
    ],
  };

  return (
    <>
      <SEO
        title="Služby"
        description="Kompletní realizace hvězdných stropů z optických vláken do interiérů i vozidel. Individuální návrh, precizní montáž a prémiový výsledek."
        path="/sluzby"
      />

      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={servicesPageJsonLd} />

      <main>
        <SubHero
          kicker="Hvězdná Obloha na Míru"
          title="Služby"
          subtitle="Specializujeme se na instalaci hvězdných stropů z optických vláken do
            interiérů i vozidel. Každý projekt vytváříme individuálně – precizní
            montáž, moderní technologie a nadčasový design."
        />
        <Services />
        <WhyChooseUs />
        <FooterCTA />
      </main>
    </>
  );
}