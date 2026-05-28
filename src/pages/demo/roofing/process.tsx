import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle, Phone, X } from 'lucide-react';
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

const steps = [
  {
    num: '01',
    title: 'Free Roof Inspection',
    img: '/images/gallery/demo/roofing/process-inspector-on-roof.webp',
    desc: 'One of our NRCA-certified inspectors visits your property at a time that suits you. They walk the entire roof, check flashings, valleys, soffits, gutters, and the attic if accessible.',
    note: '⏱ Typical inspection takes 45–60 minutes. You\'ll receive a verbal summary before the inspector leaves.',
    details: [
      'Full photographic documentation of every issue found',
      'Attic moisture and ventilation check (if accessible)',
      'Gutter and drainage inspection included',
      'Honest assessment — we\'ll tell you if repair is enough',
    ],
  },
  {
    num: '02',
    title: 'Written Estimate Delivery',
    img: '/images/gallery/demo/roofing/process-homeowner-estimate.webp',
    desc: 'Within 24 hours of the inspection, you\'ll receive a detailed written estimate by email. It\'s line-by-line: every material specified by brand and grade, every labor task priced individually, and a projected start-to-finish timeline.',
    note: '📋 Our estimates are fixed-price. The number on page one is the number on the final invoice — unless you change the scope.',
    details: [
      'Line-item pricing — no lumped "labor + materials" totals',
      'Material brand and grade specified for every item',
      'Two or three material options with price comparisons',
      'Projected start date and completion timeline',
    ],
  },
  {
    num: '03',
    title: 'Professional Installation',
    img: '/images/gallery/demo/roofing/process-installation.webp',
    desc: 'Our crew arrives at the agreed start time, introduces themselves, and begins protecting your property. Landscaping and garden beds are covered with tarps. A magnetic roller sweeps the yard for nails twice — once mid-day and once at wrap-up.',
    note: '🏠 Most residential replacements are completed in one to two days. You don\'t need to be home, but you\'re welcome to check in any time.',
    details: [
      'On-time arrival or you\'ll be notified at least 2 hours in advance',
      'Tarps protect all landscaping and hardscaping',
      'Magnetic nail sweep — morning, midday, and end of day',
      'Daily site clean-up; no materials left in yard overnight',
    ],
  },
  {
    num: '04',
    title: 'Final Walkthrough & Warranty',
    img: '/images/gallery/demo/roofing/process-job-done.webp',
    desc: 'Before we close out the job, the project lead walks the finished roof with you. Every flashing is pointed out, every ridge vent shown, every detail explained. Any punch-list items are resolved same-day.',
    note: '📄 You\'ll receive your Peak Roofing 10-year labor warranty certificate and the manufacturer\'s material warranty transfer document before we leave the site.',
    details: [
      'On-site walkthrough with the project lead',
      'All punch-list items resolved before final payment',
      '10-year Peak Roofing labor warranty certificate',
      'Manufacturer material warranty transferred to you in writing',
    ],
  },
];

const processFaqs = [
  {
    q: 'Do I need to be home during the installation?',
    a: "No — most customers go about their day as normal. We\'ll let you know when we arrive and send a photo update at the end of each day. You do need to be available for the final walkthrough.",
  },
  {
    q: 'What happens if it rains during my scheduled install?',
    a: 'We monitor forecasts closely and will reschedule if conditions look unsafe. If rain comes unexpectedly mid-job, we secure everything with tarps and resume as soon as it\'s safe — typically the same day.',
  },
  {
    q: 'How long does the whole process take, start to finish?',
    a: 'From your first call to a completed roof: inspection in 1–3 days, estimate within 24 hours, materials ordered and delivery typically 3–7 business days after you sign, then 1–2 days of installation. Most projects are complete roof-to-warranty within 2–3 weeks of signing.',
  },
];

export default function RoofingProcess() {
  const [menuOpen, setMenuOpen] = useState(false);
  useScrollReveal();

  return (
    <>
      <SEO
        title="Our Process – Peak Roofing Co. Demo"
        description="How Peak Roofing Co. works — a demo site built by scheinerik.dev."
        path="/demo/roofing/process"
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
                <Link href={href} className={href === '/demo/roofing/process' ? styles.companyLinkActive : ''}>
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
              <span>Process</span>
            </div>
            <h1 className={styles.pageHeaderTitle}>Our Process</h1>
            <p className={styles.pageHeaderSub}>
              From free inspection to warranty certificate — four steps, honest timelines, no runarounds.
            </p>
          </div>
        </div>

        {/* ── Process timeline ── */}
        <section className={styles.section}>
          <div className={styles.sectionInner}>
            <div className={styles.processTimeline}>
              {steps.map(({ num, title, img, desc, note, details }, i) => (
                <div key={num} className={styles.processStepFull} data-reveal style={{ '--reveal-delay': `${i * 100}ms` } as any}>
                  <div className={styles.processStepLeft}>
                    <div className={styles.processStepNum}>{num}</div>
                    {i < steps.length - 1 && <div className={styles.processStepLine} />}
                  </div>
                  <div className={styles.processStepBody}>
                    <h2 className={styles.processStepTitle}>{title}</h2>
                    <p className={styles.processStepDesc}>{desc}</p>
                    <div className={styles.processStepNote}>{note}</div>
                    <ul className={styles.checklist}>
                      {details.map((d) => (
                        <li key={d} className={styles.checklistItem}>
                          <CheckCircle size={15} /> {d}
                        </li>
                      ))}
                    </ul>
                    <div className={styles.processImgWrap}>
                      <Image
                        src={img}
                        alt={title}
                        fill
                        style={{ objectFit: 'cover' }}
                        sizes="(max-width: 900px) 100vw, 640px"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Process FAQs ── */}
        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <div className={styles.sectionInner}>
            <div className={styles.sectionHeader} data-reveal>
              <span className={styles.eyebrow}>Quick Answers</span>
              <h2 className={styles.sectionTitle}>Common process questions</h2>
            </div>
            <div className={styles.faqList}>
              {processFaqs.map(({ q, a }, i) => (
                <div key={q} className={styles.faqItem} data-reveal style={{ '--reveal-delay': `${i * 60}ms` } as any}>
                  <div className={styles.faqQuestion} style={{ cursor: 'default' }}>{q}</div>
                  <p className={styles.faqAnswer}>{a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className={styles.section}>
          <div className={styles.sectionInner}>
            <div className={styles.ctaBox} data-reveal>
              <h2 className={styles.ctaTitle}>Ready to get started?</h2>
              <p className={styles.ctaLead}>
                Step one is free and takes less than an hour — book your inspection today and
                we'll have a written estimate in your inbox within 24 hours.
              </p>
              <div className={styles.ctaActions}>
                <Link href="/demo/roofing/contact" className={styles.btnPrimary}>Book My Free Inspection</Link>
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
