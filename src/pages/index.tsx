import SEO from "@/components/%SEO/SEO";
import JsonLd from "@/components/%SEO/JsonLd";

import Hero from "@/components/Hero/Hero";
import Services from "@/components/Services/Services";
import GalleryFeatured from "@/components/GalleryFeatured/GalleryFeatured";
import PricingLite from "@/components/PricingLite/PricingLite";
import Timeline from "@/components/Timeline/Timeline";
import FooterCTA from "@/components/FooterCTA/FooterCTA";
import WhyChooseUs from "@/components/WhyChooseUs/WhyChooseUs";

const SITE_URL = "https://www.nocninebe.eu";

export default function HomePage() {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Noční Nebe",
    url: SITE_URL,
    logo: `${SITE_URL}/images/nocni-nebe-logo.png`,
    sameAs: [
      "https://www.instagram.com/johnny_je_tady/"
    ]
  };

  return (
    <>
      <SEO
        title="Hvězdné stropy a hvězdné interiéry"
        description="Noční Nebe vytváří prémiové hvězdné stropy a realistické hvězdné interiéry z optických vláken. Luxusní design, precizní instalace a dlouhá životnost."
        path="/"
      />

      <JsonLd data={orgJsonLd} />

      <Hero />
      <Services />
      <WhyChooseUs />
      <GalleryFeatured />
      <Timeline />
      <PricingLite />
      <FooterCTA />
    </>
  );
}