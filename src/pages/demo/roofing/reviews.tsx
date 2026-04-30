import { useState } from 'react';
import Link from 'next/link';
import { CheckCircle, Phone, Play, Camera } from 'lucide-react';
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

const platforms = [
  { name: 'Google',      score: '4.9★', count: '184 reviews' },
  { name: 'BBB',         score: 'A+',   count: 'Accredited' },
  { name: 'HomeAdvisor', score: '4.8★', count: '37 reviews' },
  { name: 'Yelp',        score: '4.7★', count: '24 reviews' },
];

const reviews = [
  {
    name: 'James M.',
    location: 'Riverside Heights',
    service: 'Roof Replacement',
    text: '"Peak Roofing replaced our 25-year-old asphalt roof in a single day. The crew was professional, the clean-up was immaculate, and the price came in exactly as quoted. Couldn\'t be happier — highly recommend to anyone in the area."',
    rating: 5,
  },
  {
    name: 'Sarah K.',
    location: 'Maple District',
    service: 'Storm Damage',
    text: '"After the spring hailstorm, Peak had someone at our door within two hours. They worked directly with our insurance adjuster and we paid nothing out of pocket beyond our deductible. Exceptional service in a stressful situation."',
    rating: 5,
  },
  {
    name: 'Mike & Lisa T.',
    location: 'Westfield',
    service: 'Roof Replacement',
    text: '"We got three quotes. Peak wasn\'t the cheapest, but the inspector took 45 minutes to explain everything and gave us options no one else mentioned. The craftsmanship is worth every penny. The roof looks incredible."',
    rating: 5,
  },
  {
    name: 'Carol B.',
    location: 'Northgate',
    service: 'Roof Repair',
    text: '"Had a leak around my chimney flashing that two other companies \'fixed\' and then returned. Peak diagnosed it in 20 minutes, showed me photos of the real problem, and fixed it properly. Zero issues in the two years since."',
    rating: 5,
  },
  {
    name: 'David F.',
    location: 'Lakeview',
    service: 'Gutter Installation',
    text: '"Just had seamless gutters and gutter guards installed. The crew was quick, tidy, and explained every decision. The gutters fit like they were made for the house — because they were, fabricated on-site. Excellent work."',
    rating: 5,
  },
  {
    name: 'Anita R.',
    location: 'Southfield',
    service: 'Roof Replacement',
    text: '"I was nervous about such a big project but the Peak team put me at ease from day one. They sent photo updates throughout the day, cleaned up better than I expected, and the new roof looks beautiful. Five stars without hesitation."',
    rating: 5,
  },
  {
    name: 'Tom & Jennifer V.',
    location: 'East Hills',
    service: 'Storm Damage',
    text: '"A branch took out a large section of our roof during the October storm. Peak had emergency tarps on within four hours of my call. The repair crew came two days later and matched the shingles perfectly. You\'d never know it happened."',
    rating: 5,
  },
  {
    name: 'Robert C.',
    location: 'Old Town',
    service: 'Roof Replacement',
    text: '"Used Peak for a full replacement on my rental property. They worked around my tenant\'s schedule, finished in one day, and the permit and inspection were handled entirely by them. Made a complicated job completely hassle-free."',
    rating: 5,
  },
  {
    name: 'Maria S.',
    location: 'Cedar Park',
    service: 'Roof Repair',
    text: '"My elderly mother\'s roof had a leak she\'d been ignoring for too long. The Peak inspector was patient, kind, and thorough — he explained everything clearly so she understood what needed doing. Honest company, fair price, great work."',
    rating: 5,
  },
];

export default function RoofingReviews() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <SEO
        title="Reviews – Peak Roofing Co. Demo"
        description="Customer reviews for Peak Roofing Co. — a demo site built by scheinerik.dev."
        path="/demo/roofing/reviews"
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
                <a href={href} className={href === '/demo/roofing/reviews' ? styles.companyLinkActive : ''}>
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
              <span>Reviews</span>
            </div>
            <h1 className={styles.pageHeaderTitle}>Customer Reviews</h1>
            <p className={styles.pageHeaderSub}>
              4.9 stars across 245 verified reviews on Google, BBB, and HomeAdvisor.
            </p>
          </div>
        </div>

        {/* ── Rating aggregate ── */}
        <section className={styles.section}>
          <div className={styles.sectionInner}>

            <div className={styles.ratingAggregate}>
              <div>
                <div className={styles.ratingBig}>4.9</div>
                <div className={styles.ratingStarsBig}>★★★★★</div>
                <div className={styles.ratingCount}>Based on 245 verified reviews</div>
              </div>
              <div className={styles.ratingDivider} />
              <div className={styles.ratingPlatforms}>
                {platforms.map(({ name, score, count }) => (
                  <div key={name} className={styles.ratingPlatformBadge}>
                    <span className={styles.ratingPlatformName}>{name}</span>
                    <span className={styles.ratingPlatformScore}>{score}</span>
                    <span className={styles.ratingPlatformCount}>{count}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginLeft: 'auto' }}>
                <div className={styles.trustBadge} style={{ display: 'flex', gap: '0.4rem' }}>
                  <CheckCircle size={13} /> 96% would recommend to a friend
                </div>
              </div>
            </div>

            {/* Video testimonial placeholder */}
            <div className={styles.videoTestimonialWrap}>
              <div className={styles.sectionHeader} style={{ marginBottom: '1.5rem' }}>
                <span className={styles.eyebrow}>Video Review</span>
                <h2 className={styles.sectionTitle}>Hear it from a customer</h2>
              </div>
              <div className={styles.videoPlaceholder}>
                <div className={styles.videoPlayBtn}><Play size={26} fill="white" /></div>
                <span className={styles.videoLabel}>
                  Add video: Customer testimonial<br />
                  e.g. homeowner filmed after project completion
                </span>
                <div style={{ position: 'absolute', bottom: '1rem', left: '1.5rem' }}>
                  <div className={styles.stars} style={{ fontSize: '0.875rem' }}>★★★★★</div>
                  <span style={{ fontSize: '0.8rem', color: '#475569' }}>James M. · Riverside Heights · Roof Replacement</span>
                </div>
              </div>
            </div>

            {/* All reviews grid */}
            <div className={styles.sectionHeader}>
              <span className={styles.eyebrow}>All Reviews</span>
              <h2 className={styles.sectionTitle}>What customers are saying</h2>
            </div>
            <div className={styles.reviewsGridFull}>
              {reviews.map(({ name, location, service, text, rating }) => (
                <div key={name} className={styles.testimonialCard}>
                  <div className={styles.stars}>{'★'.repeat(rating)}</div>
                  <p className={styles.testimonialText}>{text}</p>
                  <div className={styles.testimonialAuthor}>
                    <span className={styles.testimonialName}>{name}</span>
                    <span className={styles.testimonialLocation}>{location} · {service}</span>
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
              <h2 className={styles.ctaTitle}>Join 500+ satisfied homeowners</h2>
              <p className={styles.ctaLead}>
                Start with a free, no-obligation roof inspection. Most customers receive their
                written estimate within 24 hours.
              </p>
              <div className={styles.ctaActions}>
                <a href="/demo/roofing/contact" className={styles.btnPrimary}>Get My Free Estimate</a>
                <a href="tel:+15550001234" className={styles.btnSecondary}>
                  <Phone size={16} /> (555) 000-1234
                </a>
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
