import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Phone, CheckCircle, X } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import SEO from '@/components/%SEO/SEO';
import styles from './roofing.module.css';

const ACCENT      = '#f97316';
const ACCENT_SOFT = 'rgba(249, 115, 22, 0.12)';
const ACCENT_GLOW = 'rgba(249, 115, 22, 0.35)';

const NAV_LINKS = [
  { href: '/demo/roofing/services', label: 'Services' },
  { href: '/demo/roofing/process',  label: 'Process' },
  { href: '/demo/roofing/reviews',  label: 'Reviews' },
  { href: '/demo/roofing/faq',      label: 'FAQ' },
  { href: '/demo/roofing/contact',  label: 'Contact' },
];

const faqCategories = [
  {
    id: 'general',
    title: 'General',
    items: [
      {
        q: 'How long does a full roof replacement take?',
        a: "Most residential replacements are completed in one to two days depending on roof size and complexity. We'll give you a precise timeline in your written estimate so you can plan around it.",
      },
      {
        q: 'Do I need to be home during the installation?',
        a: "No — most customers go about their normal day. We\'ll let you know when we arrive and send a photo update at end of day. You do need to be available for the final walkthrough.",
      },
      {
        q: 'Are you licensed and insured?',
        a: "Yes. We carry full general liability ($2M per occurrence) and workers' compensation insurance. Certificates of insurance are available on request before any work begins.",
      },
      {
        q: 'Do you service commercial buildings?',
        a: "Yes — we install and repair commercial flat roofs (TPO, EPDM, modified bitumen) up to 20,000 sq ft. Larger projects are assessed on a case-by-case basis.",
      },
    ],
  },
  {
    id: 'pricing',
    title: 'Pricing & Estimates',
    items: [
      {
        q: 'How much does a new roof cost?',
        a: "A residential roof replacement typically ranges from $6,500 to $18,000+ depending on size, pitch, material choice, and local disposal fees. We provide a free itemized estimate so you know exactly what you\'re paying for before committing.",
      },
      {
        q: 'Do you offer financing?',
        a: "Yes — we partner with two financing providers offering 12-month same-as-cash plans and 36–84 month installment options. Ask about financing when you request your estimate and we\'ll send you the application link.",
      },
      {
        q: 'Will the final bill match the estimate?',
        a: "Yes. Our estimates are fixed-price. If we uncover unexpected structural damage (rotted decking, damaged rafters) during tear-off, we stop, document it, explain the issue, and agree on additional cost before touching it.",
      },
      {
        q: 'Do you offer a price-match guarantee?',
        a: "We don\'t price-match, but we encourage you to compare our written estimates item-for-item. We consistently find customers are comparing different scopes — our estimate is typically more comprehensive, not more expensive.",
      },
    ],
  },
  {
    id: 'materials',
    title: 'Materials',
    items: [
      {
        q: 'What roofing materials do you offer?',
        a: "We install architectural asphalt shingles, impact-resistant shingles (Class 4), standing-seam metal roofing, TPO and EPDM for flat roofs, and natural cedar shake. Our inspector will recommend the best material for your climate, home style, and budget.",
      },
      {
        q: 'Which shingle brands do you use?',
        a: "We are GAF Master Elite and CertainTeed SELECT ShingleMaster certified contractors. We install both brands and can also source Owens Corning and IKO upon request. All materials come with manufacturer warranties.",
      },
      {
        q: 'How long do different roofing materials last?',
        a: "Architectural asphalt shingles: 25–30 years. Impact-resistant shingles: 30–40 years. Standing-seam metal: 40–70 years. Cedar shake: 25–35 years with maintenance. TPO/EPDM (flat): 15–25 years. Actual life depends heavily on ventilation, maintenance, and weather.",
      },
      {
        q: 'Can I upgrade my shingles to impact-resistant for a lower insurance premium?',
        a: "Yes — Class 4 impact-resistant shingles qualify for a premium discount with most insurers. We can provide the documentation your insurance company needs to apply the discount. The upgrade cost is often recovered within 3–5 years of savings.",
      },
    ],
  },
  {
    id: 'insurance',
    title: 'Insurance Claims',
    items: [
      {
        q: 'Do you work with insurance companies for storm damage?',
        a: "Yes — storm damage claims represent a significant portion of our work. We document all damage with photos, provide detailed loss reports, and communicate directly with adjusters to maximize your coverage.",
      },
      {
        q: 'What if my insurance adjuster underestimates the damage?',
        a: "We can provide a supplemental claim with detailed documentation. We\'ve successfully supplemented hundreds of claims. In most cases, the final approved amount covers the full replacement cost minus your deductible.",
      },
      {
        q: 'Can you help me file the insurance claim?',
        a: "We can guide you through the process, help you understand your policy coverage, and document everything needed for a strong claim. We don\'t act as public adjusters, but we\'ve helped hundreds of homeowners navigate this process.",
      },
    ],
  },
  {
    id: 'warranty',
    title: 'Warranties',
    items: [
      {
        q: 'What warranty do you offer on your work?',
        a: "We provide a 10-year workmanship warranty on all installations. If anything fails due to our installation work within 10 years, we return and fix it at no charge. This is documented in writing and transferable to a new homeowner if you sell.",
      },
      {
        q: 'What manufacturer warranty comes with the materials?',
        a: "Manufacturer warranties vary by product — typically 30 years for architectural shingles, lifetime limited for premium lines, and 25+ years for metal. We transfer the manufacturer warranty to you in writing at project completion.",
      },
      {
        q: 'Is your warranty transferable if I sell my home?',
        a: "Yes. Our 10-year labor warranty is transferable to the next homeowner once, at no cost. This is a genuine selling point — buyers appreciate a recent roof with documented warranty coverage.",
      },
    ],
  },
];

export default function RoofingFaq() {
  const [openItem, setOpenItem] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  useScrollReveal();

  const toggle = (key: string) => setOpenItem(openItem === key ? null : key);

  return (
    <>
      <SEO
        title="FAQ – Peak Roofing Co. Demo"
        description="Frequently asked questions for Peak Roofing Co. — a demo site built by scheinerik.dev."
        path="/demo/roofing/faq"
        noindex
      />

      <div
        className={styles.page}
        style={{ '--accent': ACCENT, '--accent-soft': ACCENT_SOFT, '--accent-glow': ACCENT_GLOW } as any}
      >
        {/* ── Company nav ── */}
        <nav className={styles.companyNav}>
          <Link href="/demo/roofing" className={styles.companyLogo}>
            Peak <span className={styles.logoAccent}>Roofing</span>
          </Link>
          <ul className={styles.companyLinks}>
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className={href === '/demo/roofing/faq' ? styles.companyLinkActive : ''}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <div className={styles.navRight}>
            <a href="tel:+15550001234" className={styles.navPhone}>
              <Phone size={15} /> (555) 000-1234
            </a>
            <Link href="/demo/roofing/contact" className={styles.navBtn}>Get a Quote</Link>
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
              {NAV_LINKS.map(({ href, label }) => (
                <Link key={href} href={href} className={styles.mobileMenuLink}>{label}</Link>
              ))}
              <Link href="/demo/roofing/contact" className={styles.mobileMenuCta}>Get a Free Quote</Link>
            </div>
          )}
        </nav>

        {/* ── Page header ── */}
        <div className={styles.pageHeader}>
          <div className={styles.sectionInner}>
            <div className={styles.breadcrumb}>
              <Link href="/demo/roofing">Peak Roofing</Link>
              <span className={styles.breadcrumbSep}>/</span>
              <span>FAQ</span>
            </div>
            <h1 className={styles.pageHeaderTitle}>Frequently Asked Questions</h1>
            <p className={styles.pageHeaderSub}>
              Can't find the answer? Call (555) 000-1234 — we respond within 2 business hours.
            </p>
          </div>
        </div>

        {/* ── FAQ with sidebar ── */}
        <section className={styles.section}>
          <div className={styles.sectionInner}>
            <div className={styles.faqPageLayout}>

              {/* Sidebar */}
              <aside className={styles.faqSidebar}>
                <p className={styles.faqSidebarTitle}>Jump to category</p>
                {faqCategories.map(({ id, title }) => (
                  <a key={id} href={`#faq-${id}`} className={styles.faqSidebarLink}>{title}</a>
                ))}
              </aside>

              {/* FAQ content */}
              <div>
                {faqCategories.map(({ id, title, items }, i) => (
                  <div key={id} id={`faq-${id}`} className={styles.faqCategoryBlock} data-reveal style={{ '--reveal-delay': `${i * 60}ms` } as any}>
                    <p className={styles.faqCategoryTitle}>{title}</p>
                    <div className={styles.faqList}>
                      {items.map(({ q, a }) => {
                        const key = `${id}-${q}`;
                        const isOpen = openItem === key;
                        return (
                          <div key={key} className={isOpen ? `${styles.faqItem} ${styles.faqOpen}` : styles.faqItem}>
                            <button
                              className={styles.faqQuestion}
                              onClick={() => toggle(key)}
                              aria-expanded={isOpen}
                            >
                              {q}
                              <ChevronDown
                                size={18}
                                className={isOpen ? `${styles.faqChevron} ${styles.faqChevronOpen}` : styles.faqChevron}
                              />
                            </button>
                            {isOpen && <p className={styles.faqAnswer}>{a}</p>}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <div className={styles.sectionInner}>
            <div className={styles.ctaBox} data-reveal>
              <h2 className={styles.ctaTitle}>Still have questions?</h2>
              <p className={styles.ctaLead}>
                Call us directly or fill in the contact form — our team responds within 2 hours
                during business hours.
              </p>
              <div className={styles.guaranteeRow}>
                <span className={styles.guaranteeItem}><CheckCircle size={15} /> No obligation</span>
                <span className={styles.guaranteeItem}><CheckCircle size={15} /> Response within 2 hours</span>
                <span className={styles.guaranteeItem}><CheckCircle size={15} /> Free estimates</span>
              </div>
              <div className={styles.ctaActions}>
                <Link href="/demo/roofing/contact" className={styles.btnPrimary}>Send Us a Message</Link>
                <a href="tel:+15550001234" className={styles.btnSecondary}>
                  <Phone size={16} /> (555) 000-1234
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className={styles.companyFooter}>
          <div className={styles.footerGrid}>
            <div>
              <Link href="/demo/roofing" className={styles.footerLogoLink}>Peak <span>Roofing</span> Co.</Link>
              <p className={styles.footerTagline}>Licensed &amp; insured · Serving the greater metro area since 2009.</p>
            </div>
            <div>
              <p className={styles.footerColHeading}>Navigation</p>
              <nav className={styles.footerNavLinks}>
                <Link href="/demo/roofing/services">Services</Link>
                <Link href="/demo/roofing/process">Our Process</Link>
                <Link href="/demo/roofing/reviews">Reviews</Link>
                <Link href="/demo/roofing/faq">FAQ</Link>
                <Link href="/demo/roofing/contact">Get a Quote</Link>
              </nav>
            </div>
            <div>
              <p className={styles.footerColHeading}>Contact</p>
              <div className={styles.footerContactList}>
                <a href="tel:+15550001234" className={styles.footerContactPhone}><Phone size={15} /> (555) 000-1234</a>
                <span className={styles.footerContactMeta}>24/7 for storm emergencies</span>
                <span className={styles.footerContactMeta}>info@peakroofing.example</span>
                <span className={styles.footerContactMeta}>Mon–Fri 7am–6pm · Sat 8am–2pm</span>
              </div>
            </div>
          </div>
          <div className={styles.footerBottom}>
            <span className={styles.footerCopy}>© 2026 Peak Roofing Co. All rights reserved.</span>
            <span className={styles.footerCredit}>Demo by <a href="https://scheinerik.dev">scheinerik.dev</a></span>
          </div>
        </footer>

        {/* ── Back to portfolio ── */}
        <Link href="/" className={styles.backBtn} aria-label="Back to scheinerik.dev">
          <div className={styles.backBtnIcon}><X size={20} /></div>
          <span className={styles.backBtnLabel}>Go back</span>
        </Link>

        {/* ── Mobile sticky call bar ── */}
        <div className={styles.stickyCallBar}>
          <a href="tel:+15550001234" className={styles.stickyCallBtn}>
            <Phone size={18} /> (555) 000-1234
          </a>
          <Link href="/demo/roofing/contact" className={styles.stickyQuoteBtn}>
            Free Estimate →
          </Link>
        </div>
      </div>
    </>
  );
}
