import SEO from "@/components/%SEO/SEO";
import JsonLd from "@/components/%SEO/JsonLd";

import SubHero from "@/components/SubHero/SubHero";
import Pricing from "@/components/Pricing/Pricing";
import PricingSection from "@/components/PricingSection/PricingSection";
import FooterCTA from "@/components/FooterCTA/FooterCTA";

const SITE_URL = "https://www.nocni-nebe.eu";

export default function PricingPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Domů", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Ceník", item: `${SITE_URL}/cenik` },
    ],
  };

  const pricingPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Ceník – Noční Nebe",
    url: `${SITE_URL}/cenik`,
    description:
      "Orientační ceny hvězdných stropů a hvězdných interiérů Noční Nebe včetně kalkulace odhadu dle rozsahu a efektů.",
    isPartOf: {
      "@type": "WebSite",
      name: "Noční Nebe",
      url: SITE_URL,
    },
  };

  return (
    <>
      <SEO
        title="Ceník"
        description="Orientační ceny hvězdných stropů a hvězdných interiérů Noční Nebe. Spočítejte si odhad nákladů podle rozsahu instalace a požadovaných efektů."
        path="/cenik"
      />

      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={pricingPageJsonLd} />

      <main>
        <SubHero
          kicker="Odhad ceny instalace"
          title="Ceník"
          subtitle="Získejte přehled o orientačních cenách našich projektů a spočítejte si odhad nákladů pomocí jednoduché kalkulačky."
        />
        <Pricing />
        <PricingSection />
        <FooterCTA />
      </main>
    </>
  );
}