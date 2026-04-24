import SEO from "@/components/%SEO/SEO";
import JsonLd from "@/components/%SEO/JsonLd";

import Hero from "@/components/Hero/Hero";
import About from "@/components/About/About";
import TechStack from "@/components/TechStack/TechStack";
import Services from '@/components/Services/Services';
import Pricing from '@/components/Pricing/Pricing';
import Experience from "@/components/Experience/Experience";
import Projects from "@/components/Projects/Projects";
import Contact from "@/components/Contact/Contact";

const SITE_URL = "https://scheinerik.dev";

export default function HomePage() {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://scheinerik.dev/#business",
    name: "Erik Scheinpflug – Website Developer",
    url: "https://scheinerik.dev",
    image: "https://scheinerik.dev/og-image.jpg",
    description:
      "Website developer serving Tampa, FL and clients worldwide. Specialising in fast, custom Next.js websites, eCommerce solutions, and technical SEO — built to rank and convert.",
    priceRange: "$199–$300+/month",
    areaServed: [
      { "@type": "City", "name": "Tampa", "addressRegion": "FL", "addressCountry": "US" },
      { "@type": "State", "name": "Florida", "addressCountry": "US" },
      { "@type": "Country", "name": "United States" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Web Development Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Static Website Development Tampa" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "eCommerce Website Development Tampa" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Custom Web Application Development" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Technical SEO Optimisation" } },
      ],
    },
    founder: {
      "@type": "Person",
      "@id": "https://scheinerik.dev/#person",
      name: "Erik Scheinpflug",
      jobTitle: "Website Developer",
      sameAs: [
        "https://github.com/zenriwko",
        "https://www.linkedin.com/in/erik-scheinpflug-5335b8305/",
      ],
    },
    knowsAbout: [
      "Website Development Tampa",
      "Next.js Development",
      "eCommerce Website Development",
      "Custom Website Design",
      "Technical SEO",
      "Web Performance Optimisation",
      "React Development",
      "TypeScript",
    ],
    sameAs: [
      'https://github.com/zenriwko',
      'https://www.linkedin.com/in/erik-scheinpflug-5335b8305/',
    ]
  };

  return (
    <>
      <SEO
        title="Website Developer Tampa FL – Fast, Custom & SEO-Optimised"
        description="Tampa website developer specialising in fast, custom Next.js websites and eCommerce stores. Serving businesses in Tampa, FL and the US. Static sites from $199/month."
        path="/"
        featuredImage="/og-image.png"
      />

      <Hero />
      <About />
      <TechStack />
      <Services />
      <Pricing />
      <Experience />
      <Projects />
      <Contact />

      <JsonLd data={orgJsonLd} />
    </>
  );
}