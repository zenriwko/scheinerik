import SEO from '@/components/%SEO/SEO';
import Contact from '@/components/Contact/Contact';

export default function ContactPage() {
  return (
    <>
      <SEO
        title="Contact – Start Your Web Project Today"
        description="Get in touch to discuss your project. I respond within 24 hours with a clear proposal and fixed price. Custom websites, web apps, and SEO — no agency fees."
        path="/contact"
      />
      <Contact />
    </>
  );
}
