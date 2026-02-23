import SEO from "@/components/%SEO/SEO";
import JsonLd from "@/components/%SEO/JsonLd";

import Hero from "@/components/Hero/Hero";
import Services from "@/components/Services/Services";
import GalleryFeatured from "@/components/GalleryFeatured/GalleryFeatured";
import PricingLite from "@/components/PricingLite/PricingLite";
import Timeline from "@/components/Timeline/Timeline";
import FooterCTA from "@/components/FooterCTA/FooterCTA";
import WhyChooseUs from "@/components/WhyChooseUs/WhyChooseUs";

const SITE_URL = "https://scheinerik.dev";

export default function HomePage() {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://scheinerik.dev/#person",
    name: "Erik Scheinpflug",
    url: "https://scheinerik.dev",
    image: "https://scheinerik.dev/og-image.jpg",
    description:
      "Erik Scheinpflug is an ecommerce website developer specialising in high-performance ecommerce platforms, conversion-focused design, and scalable web development solutions.",
    jobTitle: "Ecommerce Website Developer",
    worksFor: {
      "@type": "Organization",
      name: "Independent"
    },
    hasOccupation: {
      "@type": "Occupation",
      name: "Ecommerce Developer",
      occupationLocation: {
        "@type": "Country",
        name: "Global"
      }
    },
    knowsAbout: [
      "Ecommerce Website Development",
      "Shopify Development",
      "WooCommerce Development",
      "Custom Ecommerce Solutions",
      "Conversion Rate Optimisation",
      "Technical SEO",
      "Web Performance Optimisation"
    ],
    sameAs: []
  };

  return (
    <>
      <SEO
        title=""
        description=""
        path="/"
        featuredImage=""
      />

      <JsonLd data={orgJsonLd} />
    </>
  );
}