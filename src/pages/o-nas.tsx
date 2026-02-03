import SEO from "@/components/%SEO/SEO";
import JsonLd from "@/components/%SEO/JsonLd";

import SubHero from "@/components/SubHero/SubHero";
import AboutContent from "@/components/AboutContent/AboutContent";
import AboutPhilosophy from "@/components/AboutPhilosophy/AboutPhilosophy";
import AboutHealth from "@/components/AboutHealth/AboutHealth";
import FooterCTA from "@/components/FooterCTA/FooterCTA";

const SITE_URL = "https://www.nocni-nebe.eu";

export default function AboutPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Domů", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "O nás", item: `${SITE_URL}/o-nas` },
    ],
  };

  const aboutPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "O nás – Noční Nebe",
    url: `${SITE_URL}/o-nas`,
    about: {
      "@type": "Organization",
      name: "Noční Nebe",
      url: SITE_URL,
    },
  };

  return (
    <>
      <SEO
        title="O nás"
        description="Noční Nebe se specializuje na prémiové hvězdné stropy a hvězdné interiéry z optických vláken. Individuální návrh, precizní instalace a dlouhá životnost."
        path="/o-nas"
      />

      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={aboutPageJsonLd} />

      <main>
        <SubHero
          kicker="Náš příběh"
          title="O NÁS"
          subtitle="Jsme odborníci na vytváření nezapomenutelných zážitků — přinášíme luxusní hvězdnou oblohu do interiérů vozidel i prostorů."
        />
        <AboutContent />
        <AboutPhilosophy />
        <AboutHealth />
        <FooterCTA />
      </main>
    </>
  );
}