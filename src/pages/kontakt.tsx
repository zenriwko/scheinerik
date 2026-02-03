import SEO from "@/components/%SEO/SEO";
import JsonLd from "@/components/%SEO/JsonLd";

import ContactHero from "@/components/ContactHero/ContactHero";

const SITE_URL = "https://www.nocni-nebe.eu";

export default function ContactPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Domů", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Kontakt", item: `${SITE_URL}/kontakt` },
    ],
  };

  const contactPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Kontakt – Noční Nebe",
    url: `${SITE_URL}/kontakt`,
    about: {
      "@type": "Organization",
      name: "Noční Nebe",
      url: SITE_URL,
    },
  };

  return (
    <>
      <SEO
        title="Kontakt"
        description="Kontaktujte Noční Nebe a získejte nezávaznou konzultaci k hvězdnému stropu nebo interiéru. Rádi vám připravíme řešení na míru."
        path="/kontakt"
      />

      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={contactPageJsonLd} />

      <main>
        <ContactHero />
      </main>
    </>
  );
}