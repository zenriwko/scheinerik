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
    sameAs: [
      'https://github.com/zenriwko',
      'https://www.linkedin.com/in/erik-scheinpflug-5335b8305/',
    ]
  };

  return (
    <>
      <SEO
        title="Erik Scheinpflug – Next.js Developer & SEO"
        description="Next.js developer building fast, SEO-optimised websites and web applications. Based in Czech Republic, available to clients worldwide. Static sites from $199."
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