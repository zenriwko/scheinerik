import SEO from "@/components/%SEO/SEO";
import JsonLd from "@/components/%SEO/JsonLd";

import Hero from "@/components/Hero/Hero";
import Services from "@/components/Services/Services";
import GalleryFeatured from "@/components/GalleryFeatured/GalleryFeatured";
import PricingLite from "@/components/PricingLite/PricingLite";
import Timeline from "@/components/Timeline/Timeline";
import FooterCTA from "@/components/FooterCTA/FooterCTA";
import WhyChooseUs from "@/components/WhyChooseUs/WhyChooseUs";

const SITE_URL = "https://nocninebe.eu";

export default function HomePage() {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}#organization`,
    name: "Noční Nebe",
    url: SITE_URL,
    logo: `${SITE_URL}/images/nocni-nebe-logo.png`,
    image: `${SITE_URL}/images/featuredImages/nocni-nebe-featured.webp`,
    description:
      "Noční Nebe se specializuje na návrh a instalaci prémiových hvězdných stropů a interiérů z optických vláken pro domácnosti i automobily v České republice.",
    telephone: "+420737758530",
    email: "info@nocninebe.eu",
    address: {
      "@type": "PostalAddress",
      streetAddress: "M. Koněva 168/22",
      addressLocality: "Nymburk",
      postalCode: "288 02",
      addressCountry: "CZ"
    },
    areaServed: {
      "@type": "Country",
      name: "Czech Republic"
    },
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
        featuredImage="/images/featuredImages/nocni-nebe-featured.webp"
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