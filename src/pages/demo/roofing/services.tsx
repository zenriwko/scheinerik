import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Home, Wrench, Zap, Shield, CheckCircle, Phone, X } from 'lucide-react';
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

const services = [
  {
    Icon: Home,
    eyebrow: 'Residential & Commercial',
    title: 'Roof Installation',
    img: '/images/gallery/demo/roofing/service-new-roof-installation.webp',
    desc: 'Whether you\'re building new or replacing a roof that\'s reached the end of its life, Peak Roofing handles every step from tear-off to final inspection. We work with all major materials and help you choose the right system for your climate, home style, and budget.',
    includes: [
      'Complete tear-off and debris removal',
      'Decking inspection and repair as needed',
      'Ice-and-water shield on all eaves and valleys',
      'Synthetic underlayment over full deck',
      'Ridge ventilation system installation',
      'Manufacturer warranty transfer to homeowner',
      '10-year Peak Roofing labor warranty',
    ],
    pricing: 'From $6,500 – $18,000+',
    reverse: false,
  },
  {
    Icon: Wrench,
    eyebrow: 'Leak & Damage Repair',
    title: 'Roof Repair',
    img: '/images/gallery/demo/roofing/service-roof-repair.webp',
    desc: 'A small leak can cause big damage if left unchecked. Our repair team diagnoses the source — not just the symptom — and fixes it with materials that match your existing roof. We provide a written scope of work before any repair begins so you know exactly what you\'re paying for.',
    includes: [
      'Free leak investigation and root-cause diagnosis',
      'Written repair scope before any work starts',
      'Color-matched replacement shingles',
      'Flashing repair and resealing',
      'Skylight re-flashing and resealing',
      'Chimney cap and crown repair',
      '3-year repair warranty on all patched areas',
    ],
    pricing: 'From $350 – $2,500',
    reverse: true,
  },
  {
    Icon: Zap,
    eyebrow: 'Emergency Response',
    title: 'Storm Damage Restoration',
    img: '/images/gallery/demo/roofing/service-storm-damage.webp',
    desc: 'Hail, wind, and falling trees can compromise a roof overnight. We offer 24-hour emergency tarping to stop water intrusion, followed by a full damage assessment and insurance coordination. Our team has handled hundreds of storm claims and knows how to document damage so your adjuster can approve maximum coverage.',
    includes: [
      '24/7 emergency tarping and board-up',
      'Comprehensive photo documentation for insurers',
      'Direct communication with your adjuster',
      'Full replacement or repair — whatever the damage requires',
      'Supplemental claim support if initial settlement is low',
      'Zero out-of-pocket beyond your deductible (in most cases)',
      'We handle permitting and final inspection',
    ],
    pricing: 'Most covered by insurance',
    reverse: false,
  },
  {
    Icon: Shield,
    eyebrow: 'Gutters, Fascia & Soffits',
    title: 'Gutters & Fascia',
    img: '/images/gallery/demo/roofing/service-seamless-gutter-installation.webp',
    desc: 'Gutters and fascia are the first line of defense against water damage to your home\'s structure. We fabricate seamless gutters on-site for a perfect fit, install gutter guards to eliminate clogging, and replace rotted fascia and soffit boards before water reaches your rafters.',
    includes: [
      'Seamless K-style and half-round gutter fabrication',
      'Gutter guard installation (leaf-free systems)',
      'Downspout routing and underground drainage',
      'Rotted fascia board replacement',
      'Soffit repair and ventilation upgrade',
      'All paint-matched to your existing trim color',
      '5-year warranty on gutter systems',
    ],
    pricing: 'From $1,200 – $4,500',
    reverse: true,
  },
];

export default function RoofingServices() {
  const [menuOpen, setMenuOpen] = useState(false);
  useScrollReveal();

  return (
    <>
      <SEO
        title="Services – Peak Roofing Co. Demo"
        description="Detailed roofing services offered by Peak Roofing Co. — a demo site built by scheinerik.dev."
        path="/demo/roofing/services"
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
                <Link href={href} className={href === '/demo/roofing/services' ? styles.companyLinkActive : ''}>
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
              <span>Services</span>
            </div>
            <h1 className={styles.pageHeaderTitle}>Services</h1>
            <p className={styles.pageHeaderSub}>
              Every roofing service we offer — with full details, what's included, and pricing ranges.
            </p>
          </div>
        </div>

        {/* ── Services list ── */}
        <section className={styles.section}>
          <div className={styles.sectionInner}>
            <div className={styles.servicesList}>
              {services.map(({ Icon, eyebrow, title, img, desc, includes, pricing, reverse }, i) => (
                <div
                  key={title}
                  className={reverse ? `${styles.serviceDetailCard} ${styles.serviceReverse}` : styles.serviceDetailCard}
                  data-reveal
                  style={{ '--reveal-delay': `${i * 100}ms` } as any}
                >
                  {/* Image */}
                  <div className={styles.serviceDetailImgWrap}>
                    <Image
                      src={img}
                      alt={title}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 900px) 100vw, 50vw"
                    />
                  </div>

                  {/* Body */}
                  <div>
                    <span className={styles.serviceDetailEyebrow}>{eyebrow}</span>
                    <h2 className={styles.serviceDetailTitle}>{title}</h2>
                    <span className={styles.pricingBadge}>Estimate: {pricing}</span>
                    <p className={styles.serviceDetailDesc}>{desc}</p>
                    <ul className={styles.checklist}>
                      {includes.map((item) => (
                        <li key={item} className={styles.checklistItem}>
                          <CheckCircle size={15} /> {item}
                        </li>
                      ))}
                    </ul>
                    <Link href="/demo/roofing/contact" className={styles.btnPrimary}>
                      Get a {title} Quote
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <div className={styles.sectionInner}>
            <div className={styles.ctaBox} data-reveal>
              <h2 className={styles.ctaTitle}>Not sure what you need?</h2>
              <p className={styles.ctaLead}>
                Start with a free inspection. Our certified inspector will tell you exactly what
                your roof needs — no upsell, no obligation.
              </p>
              <div className={styles.guaranteeRow}>
                <span className={styles.guaranteeItem}><CheckCircle size={15} /> Free on-site inspection</span>
                <span className={styles.guaranteeItem}><CheckCircle size={15} /> Written estimate in 24 hrs</span>
                <span className={styles.guaranteeItem}><CheckCircle size={15} /> No obligation</span>
              </div>
              <div className={styles.ctaActions}>
                <Link href="/demo/roofing/contact" className={styles.btnPrimary}>Book My Free Inspection</Link>
                <Link href="/demo/roofing/process" className={styles.btnSecondary}>See how it works →</Link>
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
