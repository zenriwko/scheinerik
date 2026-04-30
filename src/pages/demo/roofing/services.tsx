import { useState } from 'react';
import Link from 'next/link';
import { Home, Wrench, Zap, Shield, CheckCircle, Camera, Phone } from 'lucide-react';
import SEO from '@/components/%SEO/SEO';
import styles from '../demo.module.css';

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
    photoLabel: 'New roof installation — crew on site',
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
    photoLabel: 'Roofer repairing damaged shingles',
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
    photoLabel: 'Tarped roof after storm damage',
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
    photoLabel: 'Seamless gutter installation',
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
        {/* ── Notice bar ── */}
        <div className={styles.notice}>
          <Link href="/" className={styles.noticeBack}>← scheinerik.dev</Link>
          <div className={styles.noticeMeta}>
            <span>This is a demo site — not a real business.</span>
            <Link href="/pricing" className={styles.noticeLink}>Get one like this →</Link>
          </div>
        </div>

        {/* ── Company nav ── */}
        <nav className={styles.companyNav}>
          <a href="/demo/roofing" className={styles.companyLogo}>
            Peak <span className={styles.logoAccent}>Roofing</span>
          </a>
          <ul className={styles.companyLinks}>
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <a href={href} className={href === '/demo/roofing/services' ? styles.companyLinkActive : ''}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <div className={styles.navRight}>
            <a href="/demo/roofing/contact" className={styles.navBtn}>Get a Quote</a>
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
                <a key={href} href={href} className={styles.mobileMenuLink}>{label}</a>
              ))}
              <a href="/demo/roofing/contact" className={styles.mobileMenuCta}>Get a Free Quote</a>
            </div>
          )}
        </nav>

        {/* ── Page header ── */}
        <div className={styles.pageHeader}>
          <div className={styles.sectionInner}>
            <div className={styles.breadcrumb}>
              <a href="/demo/roofing">Peak Roofing</a>
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
              {services.map(({ Icon, eyebrow, title, photoLabel, desc, includes, pricing, reverse }) => (
                <div
                  key={title}
                  className={reverse ? `${styles.serviceDetailCard} ${styles.serviceReverse}` : styles.serviceDetailCard}
                >
                  {/* Image */}
                  <div className={styles.serviceDetailImgWrap}>
                    <div className={styles.imgPlaceholder}>
                      <Camera size={28} />
                      <span className={styles.imgPlaceholderLabel}>Add photo:<br />{photoLabel}</span>
                    </div>
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
                    <a href="/demo/roofing/contact" className={styles.btnPrimary}>
                      Get a {title} Quote
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <div className={styles.sectionInner}>
            <div className={styles.ctaBox}>
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
                <a href="/demo/roofing/contact" className={styles.btnPrimary}>Book My Free Inspection</a>
                <a href="/demo/roofing/process" className={styles.btnSecondary}>See how it works →</a>
              </div>
            </div>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className={styles.companyFooter}>
          <span className={styles.footerLogo}>Peak Roofing Co.</span>
          <span className={styles.footerCopy}>© 2026 Peak Roofing Co. All rights reserved.</span>
          <span className={styles.footerCredit}>
            Demo built by <a href="https://scheinerik.dev">scheinerik.dev</a>
          </span>
        </footer>

        {/* ── Mobile sticky call bar ── */}
        <div className={styles.stickyCallBar}>
          <a href="tel:+15550001234" className={styles.stickyCallBtn}>
            <Phone size={18} /> (555) 000-1234
          </a>
          <a href="/demo/roofing/contact" className={styles.stickyQuoteBtn}>
            Free Estimate →
          </a>
        </div>
      </div>
    </>
  );
}
