import { useState } from 'react';
import Link from 'next/link';
import {
  Home, Wrench, Zap, Shield,
  Phone, CheckCircle, ChevronRight,
  Award, ThumbsUp, Clock, Camera,
} from 'lucide-react';
import SEO from '@/components/%SEO/SEO';
import styles from '../demo.module.css';

const ACCENT      = '#f97316';
const ACCENT_SOFT = 'rgba(249, 115, 22, 0.12)';
const ACCENT_GLOW = 'rgba(249, 115, 22, 0.35)';

const services = [
  { Icon: Home,   title: 'Roof Installation', desc: 'Full new-construction and tear-off replacements. Every job includes a written labor warranty.' },
  { Icon: Wrench, title: 'Roof Repair',        desc: 'Single missing shingle or widespread damage — we diagnose fast and fix it right the first time.' },
  { Icon: Zap,    title: 'Storm Damage',       desc: 'Emergency response within 24 hours. We document damage and coordinate directly with your insurer.' },
  { Icon: Shield, title: 'Gutters & Fascia',   desc: 'Seamless gutter fabrication, downspout routing, gutter-guard installs, and fascia replacement.' },
];

const stats = [
  { value: '500+', label: 'Roofs Installed' },
  { value: '15',   label: 'Years in Business' },
  { value: '4.9★', label: 'Average Rating' },
  { value: '100%', label: 'Licensed & Insured' },
];

const features = [
  { Icon: Clock,    title: '24/7 Emergency Response',  desc: "Storms don't keep business hours — and neither do we. Emergency crews on call around the clock." },
  { Icon: Award,    title: 'NRCA-Certified Craftsmen', desc: 'Every installer holds a current NRCA certification, ensuring your job meets the industry\'s highest standards.' },
  { Icon: ThumbsUp, title: 'No-Surprise Quotes',       desc: 'Written estimates are itemized and locked in. We discuss anything unexpected before touching it.' },
];

const steps = [
  { num: '01', title: 'Free Inspection',    desc: 'A certified inspector visits, photographs every issue, and gives you an honest assessment.' },
  { num: '02', title: 'Written Estimate',   desc: 'Clear, itemized quote within 24 hours — materials, labor, and a projected timeline.' },
  { num: '03', title: 'Professional Install', desc: 'Crew arrives on schedule, protects landscaping, works efficiently. Clean-up included.' },
  { num: '04', title: 'Final Walkthrough',  desc: 'We walk the finished job with you and hand over warranty documents before we leave.' },
];

const testimonials = [
  {
    name: 'James M.',
    location: 'Riverside Heights',
    text: '"Peak replaced our 25-year-old roof in a single day. Professional, immaculate clean-up, exact quoted price. Couldn\'t be happier."',
    rating: 5,
  },
  {
    name: 'Sarah K.',
    location: 'Maple District',
    text: '"After the spring hailstorm, Peak had someone at our door within two hours. They worked directly with our adjuster — we paid nothing beyond our deductible."',
    rating: 5,
  },
  {
    name: 'Mike & Lisa T.',
    location: 'Westfield',
    text: '"Peak wasn\'t the cheapest quote, but the inspector took 45 minutes to explain everything. The craftsmanship is worth every penny."',
    rating: 5,
  },
];

const galleryItems = [
  'Asphalt Re-roof',
  'Metal Roof Install',
  'Storm Damage Repair',
  'Seamless Gutters',
  'Commercial Flat Roof',
  'Skylight Install',
];

const NAV_LINKS = [
  { href: '/demo/roofing/services', label: 'Services' },
  { href: '/demo/roofing/process',  label: 'Process' },
  { href: '/demo/roofing/reviews',  label: 'Reviews' },
  { href: '/demo/roofing/faq',      label: 'FAQ' },
  { href: '/demo/roofing/contact',  label: 'Contact' },
];

export default function RoofingDemo() {
  const [heroSent, setHeroSent] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <SEO
        title="Peak Roofing Co. – Demo Site"
        description="Demo website for a roofing company — built by scheinerik.dev to showcase what a professional local business site could look like."
        path="/demo/roofing"
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
              <li key={href}><a href={href}>{label}</a></li>
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

        {/* ── Hero ── */}
        <section className={styles.hero}>
          <div className={styles.heroBg} aria-hidden="true" />
          <div className={styles.heroGrid}>

            {/* Left — text */}
            <div>
              <span className={styles.urgencyPill}>⚡ Spring slots filling fast — only 8 free estimates remaining</span>
              <span className={styles.heroEyebrow}>Licensed &amp; Insured · Serving the Greater Metro Area Since 2009</span>
              <h1 className={styles.heroTitle}>
                Your roof.<br /><em>Done right.</em>
              </h1>
              <p className={styles.heroLead}>
                Expert roofing installation, repair, and storm-damage restoration.
                Fast response, honest quotes, and guaranteed workmanship, every time.
              </p>
              <div className={styles.heroActions}>
                <a href="/demo/roofing/contact" className={styles.btnPrimary}>Get a Free Quote</a>
                <a href="tel:+15550001234" className={styles.btnSecondary}>
                  <Phone size={16} /> (555) 000-1234
                </a>
              </div>
              <div className={styles.trustBadges}>
                {['Licensed & Bonded', 'Fully Insured', 'Free Estimates', '10-Year Warranty'].map((b) => (
                  <span key={b} className={styles.trustBadge}>
                    <CheckCircle size={13} /> {b}
                  </span>
                ))}
              </div>
            </div>

            {/* Right — quote card */}
            <div className={styles.quoteCard}>
              {heroSent ? (
                <div className={styles.quoteCardSuccess}>
                  <CheckCircle size={40} />
                  <strong style={{ color: '#f8fafc', fontSize: '1.1rem' }}>We'll call you shortly!</strong>
                  <p>Our team typically responds within 1–2 business hours.</p>
                </div>
              ) : (
                <>
                  <h2 className={styles.quoteCardTitle}>Get a Free Estimate</h2>
                  <p className={styles.quoteCardSub}>Response within 2 hours · No obligation · No high-pressure sales</p>
                  <form
                    onSubmit={(e) => { e.preventDefault(); setHeroSent(true); }}
                    className={styles.quoteCardFields}
                  >
                    <input className={styles.formInput} type="text" placeholder="Your name" required />
                    <input className={styles.formInput} type="tel" placeholder="Your phone number" required />
                    <select className={styles.formSelect} defaultValue="">
                      <option value="" disabled>What do you need?</option>
                      <option>Roof Inspection</option>
                      <option>Roof Installation</option>
                      <option>Roof Repair</option>
                      <option>Storm Damage Assessment</option>
                      <option>Gutters / Fascia</option>
                      <option>Not sure yet</option>
                    </select>
                    <button
                      type="submit"
                      className={styles.btnPrimary}
                      style={{ width: '100%', justifyContent: 'center' }}
                    >
                      Get My Free Estimate →
                    </button>
                  </form>
                  <p className={styles.quoteCardNote}>🔒 We never share your details. No spam, ever.</p>
                </>
              )}
            </div>
          </div>
        </section>

        {/* ── Trust bar ── */}
        <div className={styles.trustBar}>
          <span className={styles.trustBarLabel}>Certified &amp; trusted by:</span>
          {['NRCA Certified', 'BBB A+ Rated', '4.9★ Google (200+ reviews)', 'GAF Master Elite', 'CertainTeed SELECT'].map((t) => (
            <span key={t} className={styles.trustBarItem}>
              <CheckCircle size={12} /> {t}
            </span>
          ))}
        </div>

        {/* ── Stats ── */}
        <section className={styles.section}>
          <div className={styles.sectionInner}>
            <div className={styles.statsGrid}>
              {stats.map(({ value, label }) => (
                <div key={label}>
                  <span className={styles.statValue}>{value}</span>
                  <span className={styles.statLabel}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Services preview ── */}
        <section className={`${styles.section} ${styles.sectionAlt}`} id="services">
          <div className={styles.sectionInner}>
            <div className={styles.sectionHeader}>
              <span className={styles.eyebrow}>What We Do</span>
              <h2 className={styles.sectionTitle}>Roofing services you can count on</h2>
              <p className={styles.sectionLead}>
                From full replacements to emergency repairs — every aspect of your roof handled
                with the same commitment to quality.
              </p>
            </div>
            <div className={styles.grid}>
              {services.map(({ Icon, title, desc }) => (
                <div key={title} className={styles.card}>
                  <div className={styles.cardIcon}><Icon size={22} /></div>
                  <h3 className={styles.cardTitle}>{title}</h3>
                  <p className={styles.cardDesc}>{desc}</p>
                </div>
              ))}
            </div>
            <div className={styles.sectionMore}>
              <a href="/demo/roofing/services" className={styles.sectionMoreLink}>
                View detailed services, pricing &amp; what's included <ChevronRight size={16} />
              </a>
            </div>
          </div>
        </section>

        {/* ── Why Choose Us ── */}
        <section className={styles.section}>
          <div className={styles.sectionInner}>
            <div className={styles.sectionHeader}>
              <span className={styles.eyebrow}>Why Peak Roofing</span>
              <h2 className={styles.sectionTitle}>The difference is in the details</h2>
              <p className={styles.sectionLead}>
                We've been protecting homes in this region for 15 years because we do things the right
                way — not the easy way.
              </p>
            </div>
            <div className={styles.featureGrid}>
              {features.map(({ Icon, title, desc }) => (
                <div key={title} className={styles.featureCard}>
                  <div className={styles.featureIcon}><Icon size={24} /></div>
                  <h3 className={styles.featureTitle}>{title}</h3>
                  <p className={styles.featureDesc}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Process preview ── */}
        <section className={`${styles.section} ${styles.sectionAlt}`} id="process">
          <div className={styles.sectionInner}>
            <div className={styles.sectionHeader}>
              <span className={styles.eyebrow}>How It Works</span>
              <h2 className={styles.sectionTitle}>Simple, transparent process</h2>
              <p className={styles.sectionLead}>
                No runarounds, no surprises. From your first call to final sign-off in four clear steps.
              </p>
            </div>
            <div className={styles.stepsGrid}>
              {steps.map(({ num, title, desc }) => (
                <div key={num} className={styles.step}>
                  <div className={styles.stepNum}>{num}</div>
                  <h3 className={styles.stepTitle}>{title}</h3>
                  <p className={styles.stepDesc}>{desc}</p>
                </div>
              ))}
            </div>
            <div className={styles.sectionMore}>
              <a href="/demo/roofing/process" className={styles.sectionMoreLink}>
                See the full process with photos &amp; what to expect <ChevronRight size={16} />
              </a>
            </div>
          </div>
        </section>

        {/* ── Reviews preview ── */}
        <section className={styles.section} id="reviews">
          <div className={styles.sectionInner}>
            <div className={styles.sectionHeader}>
              <span className={styles.eyebrow}>Customer Reviews</span>
              <h2 className={styles.sectionTitle}>Homeowners trust Peak Roofing</h2>
              <p className={styles.sectionLead}>
                Don't take our word for it — here's what customers say after working with us.
              </p>
            </div>
            <div className={styles.testimonialsGrid}>
              {testimonials.map(({ name, location, text, rating }) => (
                <div key={name} className={styles.testimonialCard}>
                  <div className={styles.stars}>{'★'.repeat(rating)}</div>
                  <p className={styles.testimonialText}>{text}</p>
                  <div className={styles.testimonialAuthor}>
                    <span className={styles.testimonialName}>{name}</span>
                    <span className={styles.testimonialLocation}>{location}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.sectionMore}>
              <a href="/demo/roofing/reviews" className={styles.sectionMoreLink}>
                See all 200+ reviews from Google, BBB &amp; HomeAdvisor <ChevronRight size={16} />
              </a>
            </div>
          </div>
        </section>

        {/* ── Gallery ── */}
        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <div className={styles.sectionInner}>
            <div className={styles.sectionHeader}>
              <span className={styles.eyebrow}>Our Work</span>
              <h2 className={styles.sectionTitle}>Recent projects</h2>
              <p className={styles.sectionLead}>
                Every roof we install is one we'd put on our own home.
              </p>
            </div>
            <div className={styles.galleryGrid}>
              {galleryItems.map((label) => (
                <div key={label} className={styles.galleryItem}>
                  <div className={styles.imgPlaceholder}>
                    <Camera size={22} />
                    <span className={styles.imgPlaceholderLabel}>Add photo:<br />{label}</span>
                  </div>
                  <div className={styles.galleryOverlay}>
                    <span className={styles.galleryLabel}>{label}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.galleryMore}>
              <p>Showing 6 of 40+ completed projects</p>
              <a href="/demo/roofing/contact" className={styles.btnSecondary}>Get Your Free Quote</a>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className={styles.section}>
          <div className={styles.sectionInner}>
            <div className={styles.ctaBox}>
              <span className={styles.urgencyPill}>⚡ Limited free estimate slots this week</span>
              <h2 className={styles.ctaTitle}>Get your free roof inspection today</h2>
              <p className={styles.ctaLead}>
                Our certified inspector will visit your property, photograph every issue, and give you
                a written assessment — completely free, with no high-pressure sales.
              </p>
              <div className={styles.guaranteeRow}>
                <span className={styles.guaranteeItem}><CheckCircle size={15} /> 10-Year Workmanship Warranty</span>
                <span className={styles.guaranteeItem}><CheckCircle size={15} /> Licensed &amp; Fully Insured</span>
                <span className={styles.guaranteeItem}><CheckCircle size={15} /> No Obligation</span>
              </div>
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
