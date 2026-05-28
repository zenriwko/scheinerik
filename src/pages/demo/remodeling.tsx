import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Home, Zap, Layers, Sun, Waves, Paintbrush, Settings,
  Utensils, Droplet, Leaf,
  Phone, Mail, MapPin, Clock, CheckCircle, ChevronDown, X,
  Shield, Award, ThumbsUp,
} from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import SEO from '@/components/%SEO/SEO';
import styles from './remodeling.module.css';

const NAV_ITEMS = [
  { href: '#services', label: 'Services' },
  { href: '#about',    label: 'About Us' },
  { href: '#faq',      label: 'FAQ' },
  { href: '#contact',  label: 'Contact Us' },
];

const services = [
  { label: 'Landscaping',                  Icon: Leaf,       bg: 'linear-gradient(135deg,#14532d,#166534,#15803d)' },
  { label: 'Hardscaping',                  Icon: Layers,     bg: 'linear-gradient(135deg,#57534e,#44403c,#292524)' },
  { label: 'Roofing',                      Icon: Home,       bg: 'linear-gradient(135deg,#7c2d12,#9a3412,#c2410c)' },
  { label: 'Solar Systems',                Icon: Sun,        bg: 'linear-gradient(135deg,#713f12,#92400e,#b45309)' },
  { label: 'Pools',                        Icon: Waves,      bg: 'linear-gradient(135deg,#0c4a6e,#075985,#0369a1)' },
  { label: 'Flooring',                     Icon: Zap,        bg: 'linear-gradient(135deg,#451a03,#78350f,#92400e)' },
  { label: 'Interior / Exterior Paint',    Icon: Paintbrush, bg: 'linear-gradient(135deg,#312e81,#4338ca,#6d28d9)' },
  { label: 'Windows & Doors Installation', Icon: Settings,   bg: 'linear-gradient(135deg,#1e293b,#334155,#475569)' },
  { label: 'Kitchen Remodeling',           Icon: Utensils,   bg: 'linear-gradient(135deg,#4a1d04,#7c3d12,#9a3412)' },
  { label: 'Bathroom Remodeling',          Icon: Droplet,    bg: 'linear-gradient(135deg,#0e4f6e,#0e7490,#0891b2)' },
];

const whyItems = [
  {
    Icon: Shield,
    subtitle: 'Reliable Experts',
    title: 'Licensed & Insured',
    desc: 'Florida-licensed contractor (CGC1332211) with $2M liability coverage and 15+ years serving Tampa Bay homeowners across 400+ completed projects.',
  },
  {
    Icon: Award,
    subtitle: 'Top Quality',
    title: 'Premium Craftsmanship',
    desc: "We use top-grade materials built for Florida's climate — hurricane-resistant, humidity-proof, and designed to last through Tampa's heat and storm seasons.",
  },
  {
    Icon: ThumbsUp,
    subtitle: 'Convenient',
    title: 'Guidance at Every Step',
    desc: 'Free on-site consultation, transparent fixed-price quotes, and a dedicated project manager who keeps you informed from contract signing to final walkthrough.',
  },
];

const faqs = [
  {
    q: 'What remodeling services does Bay Home Remodeling offer?',
    a: 'We cover the full range of home improvement across Tampa Bay: kitchen and bathroom remodeling, landscaping, hardscaping, pool construction and renovation, roofing, solar panel installation, flooring, interior and exterior painting, and windows and doors installation.',
  },
  {
    q: 'How do remodeling and renovating differ?',
    a: "Renovation typically updates what's already there — new finishes, fixtures, or cosmetic improvements. Remodeling changes the actual structure or layout of a space. We handle both: a simple tile refresh or a complete kitchen gut-and-rebuild.",
  },
  {
    q: 'What steps should I take to plan my project?',
    a: "Start with a free on-site consultation — we walk your home, discuss your goals, and give you honest options within your budget. We then provide a written itemized estimate. Once you approve, we pull all permits and begin on a defined schedule.",
  },
  {
    q: 'How can I verify a contractor is trustworthy?',
    a: "Check their Florida license (ours: CGC1332211), request certificates of insurance, read Google and BBB reviews, and compare written estimates line by line. We're happy to provide references from recently completed Tampa projects.",
  },
  {
    q: 'What is the expected timeline for my project?',
    a: 'Timelines depend on scope: a bathroom renovation typically takes 2–3 weeks, a kitchen remodel 4–8 weeks, and a room addition 8–16 weeks. We provide a week-by-week project schedule before work begins.',
  },
  {
    q: 'Do you handle permits and inspections in Hillsborough County?',
    a: "Yes — we handle all required Hillsborough County building permits, schedule inspections, and manage the approval process from start to finish. You'll never need to contact a permit office yourself.",
  },
  {
    q: 'What sets Bay Home Remodeling apart?',
    a: "We're a Tampa-native company that builds in the community we live in. We specialize in Florida-specific challenges: hurricane-resistant structures, moisture-proof finishes, and outdoor living spaces designed for our climate. Fixed-price quotes, no hidden fees, and a 5-year workmanship warranty on every project.",
  },
];

export default function RemodelingDemo() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formSent, setFormSent] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useScrollReveal();

  useEffect(() => {
    window.scrollTo(0, 0);
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <SEO
        title="Bay Home Remodeling – Tampa FL Demo Site"
        description="Demo website for a Tampa home remodeling company — built by scheinerik.dev to showcase what a professional local business site could look like."
        path="/demo/remodeling"
        noindex
      />

      <div className={styles.page}>

        {/* ── License bar ── */}
        <div className={styles.licBar}>
          <div className={styles.licBarInner}>
            <span>Lic# CGC1332211</span>
            <div className={styles.licBarRight}>
              <a href="tel:+18130001234"><Phone size={12} /> (813) 000-1234</a>
              <a href="mailto:info@bayhomeremodeling.example"><Mail size={12} /> info@bayhomeremodeling.example</a>
            </div>
          </div>
        </div>

        {/* ── Company nav ── */}
        <nav className={`${styles.nav} ${scrolled ? styles.navScrolled : ''}`}>
          <div className={styles.navInner}>
            <a href="#top" className={styles.navLogo}>
              <div className={styles.navLogoIcon}><Home size={20} /></div>
              <span className={styles.navLogoText}>
                Bay Home
                <span className={styles.navLogoSub}>Remodeling</span>
              </span>
            </a>
            <ul className={styles.navLinks}>
              {NAV_ITEMS.map(({ href, label }) => (
                <li key={href}><a href={href}>{label}</a></li>
              ))}
            </ul>
            <div className={styles.navRight}>
              <a href="tel:+18130001234" className={styles.navPhone}>
                <Phone size={14} /> (813) 000-1234
              </a>
              <a href="#contact" className={styles.navBtn}>Request a Quote</a>
            </div>
            <button
              className={styles.hamburger}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
            >
              <span /><span /><span />
            </button>
          </div>
          {menuOpen && (
            <div className={styles.mobileMenu}>
              {NAV_ITEMS.map(({ href, label }) => (
                <a key={href} href={href} className={styles.mobileMenuLink} onClick={() => setMenuOpen(false)}>{label}</a>
              ))}
              <a href="#contact" className={styles.mobileMenuCta} onClick={() => setMenuOpen(false)}>Request a Quote</a>
            </div>
          )}
        </nav>

        {/* ── Hero ── */}
        <section className={styles.hero} id="top">
          <div className={styles.heroBg} aria-hidden="true" />
          <div className={styles.heroContent}>
            <span className={styles.heroEyebrow}>Tampa Bay's Premier Home Remodeling Contractor</span>
            <h1 className={styles.heroTitle}>
              Transform Your Home.<br /><em>Built for Tampa.</em>
            </h1>
            <p className={styles.heroSub}>
              From kitchens and bathrooms to pools and solar — Bay Home Remodeling delivers
              premium renovations on time, on budget, and engineered for Florida's climate.
            </p>
            <div className={styles.heroActions}>
              <a href="#contact" className={styles.btnPrimary}>Get a Free Quote</a>
              <a href="#services" className={styles.btnOutline}>Our Services ↓</a>
            </div>
          </div>
        </section>

        {/* ── Intro ── */}
        <div className={styles.introSection}>
          <div className={styles.inner}>
            <p className={styles.introText}>
              At Bay Home Remodeling, we specialize in transforming Tampa Bay homes into spaces that are beautiful,
              functional, and built to last. Our process integrates thoughtful design, skilled craftsmanship, and
              efficient project management to deliver results on time and within budget. With 15 years of experience
              serving Hillsborough, Pinellas, and Pasco counties, our team ensures every remodel is completed to
              the highest standard — from the first nail to the final walkthrough, within budget and beyond your expectations.
            </p>
          </div>
        </div>

        {/* ── Services ── */}
        <section className={`${styles.section} ${styles.sectionAlt}`} id="services">
          <div className={styles.inner}>
            <h2 className={styles.sectionTitle}>Our Main Services</h2>
            <p className={styles.sectionLead}>
              Bay Home Remodeling offers premier services across every area of your Tampa home —
              all delivered by one trusted, licensed team.
            </p>
            <div className={styles.servicesGrid}>
              {services.map(({ label, Icon, bg }, i) => (
                <div
                  key={label}
                  className={styles.serviceCard}
                  data-reveal
                  style={{ '--reveal-delay': `${i * 50}ms` } as any}
                >
                  <div className={styles.serviceCardBg} style={{ background: bg }} />
                  <div className={styles.serviceCardOverlay}>
                    <Icon size={28} />
                    <span className={styles.serviceCardLabel}>{label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Why choose us ── */}
        <section className={styles.section} id="about">
          <div className={styles.inner}>
            <h2 className={styles.sectionTitle}>Why Choose Bay Home Remodeling</h2>
            <p className={styles.sectionLead}>
              We've built our reputation one project at a time, treating every Tampa home as if it were our own.
            </p>
            <div className={styles.whyGrid}>
              {whyItems.map(({ Icon, subtitle, title, desc }, i) => (
                <div
                  key={title}
                  className={styles.whyCard}
                  data-reveal
                  style={{ '--reveal-delay': `${i * 100}ms` } as any}
                >
                  <div className={styles.whyIconCircle}><Icon size={26} /></div>
                  <p className={styles.whySubtitle}>{subtitle}</p>
                  <h3 className={styles.whyTitle}>{title}</h3>
                  <p className={styles.whyDesc}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA Banner ── */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <p className={styles.ctaBannerText}>
              Call us now: <span>(813) 000-1234</span> for a Free Consultation
            </p>
            <a href="#contact" className={styles.ctaBannerBtn}>Request a Quote</a>
          </div>
        </div>

        {/* ── Designs section ── */}
        <section className={styles.designsSection}>
          <div className={styles.inner}>
            <h2 className={styles.sectionTitle}>Designs Crafted for Tampa's Climate</h2>
            <p className={styles.designsText}>
              Whether you're boosting your home's value before selling, upgrading your outdoor living space for
              Tampa's year-round sunshine, or tackling a full interior remodel — Bay Home Remodeling has the
              expertise to bring your vision to life. We understand Florida's unique challenges: hurricane-resistant
              structures, humidity-proof finishes, and outdoor spaces engineered for heat and storm season.
              From permit to punch-list, we manage every detail so you don't have to.
            </p>
            <a href="#contact" className={styles.designsBtn}>Request a Quote</a>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className={styles.faqSection} id="faq">
          <div className={styles.inner}>
            <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
            <p className={styles.sectionLead}>
              Have a question not listed here? Call us at (813) 000-1234 — we respond within 2 business hours.
            </p>
            <div className={styles.faqList}>
              {faqs.map(({ q, a }, i) => (
                <div key={i} className={styles.faqItem}>
                  <button
                    className={styles.faqQuestion}
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    aria-expanded={openFaq === i}
                  >
                    {q}
                    <ChevronDown
                      size={18}
                      className={openFaq === i ? `${styles.faqChevron} ${styles.faqChevronOpen}` : styles.faqChevron}
                    />
                  </button>
                  {openFaq === i && <p className={styles.faqAnswer}>{a}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Quote / Contact ── */}
        <section className={styles.quoteSection} id="contact">
          <div className={styles.quoteInner}>
            <div className={styles.quoteLeft}>
              <span className={styles.quoteLeftEyebrow}>Free Estimate</span>
              <h2 className={styles.quoteLeftTitle}>Get a Free Quote</h2>
              <p className={styles.quoteLeftText}>
                Begin your journey to transform your Tampa home. Fill in the form and our team
                will reach out within one business day to schedule your free on-site consultation.
              </p>
              <ul className={styles.quoteLeftList}>
                <li><CheckCircle size={16} /> No obligation, no high-pressure sales</li>
                <li><CheckCircle size={16} /> Written itemized estimate within 48 hours</li>
                <li><CheckCircle size={16} /> Licensed, insured, and local to Tampa Bay</li>
                <li><CheckCircle size={16} /> 5-year workmanship warranty on all projects</li>
              </ul>
            </div>
            <div>
              {formSent ? (
                <div className={`${styles.formCard} ${styles.formSuccess}`}>
                  <CheckCircle size={44} />
                  <h3>Message received!</h3>
                  <p>Thanks for reaching out. We'll be in touch within one business day to schedule your free consultation.</p>
                </div>
              ) : (
                <form
                  className={styles.formCard}
                  onSubmit={(e) => { e.preventDefault(); setFormSent(true); }}
                >
                  <h3 className={styles.formCardTitle}>Request a Free Quote</h3>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Service Required</label>
                    <select className={styles.formSelect} defaultValue="">
                      <option value="" disabled>Select a service…</option>
                      <option>Landscaping</option>
                      <option>Hardscaping</option>
                      <option>Roofing</option>
                      <option>Solar Systems</option>
                      <option>Pool Construction / Renovation</option>
                      <option>Flooring</option>
                      <option>Interior / Exterior Paint</option>
                      <option>Windows & Doors Installation</option>
                      <option>Kitchen Remodeling</option>
                      <option>Bathroom Remodeling</option>
                      <option>Other / Not sure</option>
                    </select>
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Name</label>
                    <input className={styles.formInput} type="text" placeholder="Your full name" required />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Phone</label>
                    <input className={styles.formInput} type="tel" placeholder="(813) 000-0000" required />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Email</label>
                    <input className={styles.formInput} type="email" placeholder="you@example.com" required />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Message</label>
                    <textarea
                      className={styles.formTextarea}
                      placeholder="Tell us about your project — which area, what you're hoping to achieve…"
                    />
                  </div>
                  <button type="submit" className={styles.formSubmitBtn}>Submit</button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className={styles.footer}>
          <div className={styles.footerInner}>
            <div className={styles.footerGrid}>
              <div>
                <a href="#top" className={styles.footerLogo}>
                  <div className={styles.footerLogoIcon}><Home size={18} /></div>
                  <span className={styles.footerLogoText}>
                    Bay Home
                    <span className={styles.footerLogoSub}>Remodeling</span>
                  </span>
                </a>
                <p className={styles.footerTagline}>
                  Licensed &amp; insured · Lic# CGC1332211 · Serving Tampa Bay since 2009.
                  Hillsborough · Pinellas · Pasco counties.
                </p>
              </div>
              <div>
                <p className={styles.footerColTitle}>Office Hours</p>
                <div className={styles.footerContactItem}>
                  <Clock size={14} />
                  <span>Mon – Fri: 8:00 am – 6:00 pm<br />Sat: 9:00 am – 3:00 pm</span>
                </div>
                <div className={styles.footerContactItem}>
                  <MapPin size={14} />
                  <span>1234 Bayshore Blvd, Suite 200<br />Tampa, FL 33606</span>
                </div>
              </div>
              <div>
                <p className={styles.footerColTitle}>Contact</p>
                <div className={styles.footerContactItem}>
                  <Phone size={14} />
                  <a href="tel:+18130001234">(813) 000-1234</a>
                </div>
                <div className={styles.footerContactItem}>
                  <Mail size={14} />
                  <a href="mailto:info@bayhomeremodeling.example">info@bayhomeremodeling.example</a>
                </div>
              </div>
            </div>
            <div className={styles.footerBottom}>
              <span>© 2026 Bay Home Remodeling. All rights reserved.</span>
              <span className={styles.footerCredit}>Demo by <a href="https://scheinerik.dev">scheinerik.dev</a></span>
            </div>
          </div>
        </footer>

        {/* ── Back to portfolio ── */}
        <Link href="/" className={styles.backBtn} aria-label="Back to scheinerik.dev">
          <div className={styles.backBtnIcon}><X size={20} /></div>
          <span className={styles.backBtnLabel}>Go back</span>
        </Link>
      </div>
    </>
  );
}
