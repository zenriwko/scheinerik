import SEO from '@/components/%SEO/SEO';
import Contact from '@/components/Contact/Contact';

export default function ContactPage() {
  return (
    <>
      <SEO
        title="Contact a Tampa Website Developer"
        description="Get in touch to discuss your Tampa website project. I respond within 24 hours with a clear proposal and fixed price, no agency fees."
        path="/contact"
      />
      <Contact asPage />
    </>
  );
}
