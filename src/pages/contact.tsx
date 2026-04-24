import SEO from '@/components/%SEO/SEO';
import Contact from '@/components/Contact/Contact';

export default function ContactPage() {
  return (
    <>
      <SEO
        title="Contact a Tampa Website Developer – scheinerik.dev"
        description="Get in touch to discuss your Tampa website project. I respond within 24 hours with a clear proposal and fixed price. Custom websites, eCommerce, and SEO — no agency fees."
        path="/contact"
      />
      <Contact />
    </>
  );
}
