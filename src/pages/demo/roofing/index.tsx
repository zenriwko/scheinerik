import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import {
  Home, Wrench, Zap, Shield,
  Phone, CheckCircle, ChevronRight,
  Award, ThumbsUp, Clock, X, Star,
} from 'lucide-react';
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
  { Icon: Star,     title: 'Transferable 10-Year Warranty', desc: 'Our labor warranty covers the full decade and transfers to the next homeowner — a genuine selling point when you move.' },
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
  { label: 'Asphalt Re-roof',      src: '/images/gallery/demo/roofing/project-asphalt-re-roof.webp' },
  { label: 'Metal Roof Install',   src: '/images/gallery/demo/roofing/project-metal-roof-install.webp' },
  { label: 'Storm Damage Repair',  src: '/images/gallery/demo/roofing/project-storm-damage-repair.webp' },
  { label: 'Seamless Gutters',     src: '/images/gallery/demo/roofing/project-seamless-gutters.webp' },
  { label: 'Commercial Flat Roof', src: '/images/gallery/demo/roofing/project-commercial-flat-roof.webp' },
  { label: 'Skylight Install',     src: '/images/gallery/demo/roofing/project-skylight-install.webp' },
];

export default function RoofingDemo() {
  const [heroSent, setHeroSent] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useScrollReveal();

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
        {/* ── Company nav ── */}
        <nav className={styles.companyNav}>
          <Link href="/demo/roofing" className={styles.companyLogo}>
            Peak <span className={styles.logoAccent}>Roofing</span>
          </Link>
          <ul className={styles.companyLinks}>
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}><Link href={href}>{label}</Link></li>
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

        {/* ── Hero ── */}
        <section className={styles.hero}>
          <div className={styles.heroImgWrap} aria-hidden="true">
            <Image
              src="/images/gallery/demo/roofing/hero_roofing.webp"
              alt=""
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>
          <div className={styles.heroBg} aria-hidden="true" />
          <div className={styles.heroGrid}>

            {/* Left — text */}
            <div>
              <span className={styles.heroEyebrow}>Licensed &amp; Insured · Serving the Greater Metro Area Since 2009</span>
              <h1 className={styles.heroTitle}>
                Your roof.<br /><em>Done right.</em>
              </h1>
              <p className={styles.heroLead}>
                Expert roofing installation, repair, and storm-damage restoration.
                Fast response, honest quotes, and guaranteed workmanship, every time.
              </p>
              <div className={styles.heroActions}>
                <Link href="/demo/roofing/contact" className={styles.btnPrimary}>Get a Free Quote</Link>
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

        {/* ── Stats ── */}
        <div className={styles.statsBand}>
          <div className={styles.sectionInner}>
            <div className={styles.statsGrid}>
              {stats.map(({ value, label }, i) => (
                <div key={label} data-reveal style={{ '--reveal-delay': `${i * 80}ms` } as any}>
                  <span className={styles.statValue}>{value}</span>
                  <span className={styles.statLabel}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Services preview ── */}
        <section className={`${styles.section} ${styles.sectionAlt}`} id="services">
          <div className={styles.sectionInner}>
            <div className={styles.sectionHeader} data-reveal>
              <span className={styles.eyebrow}>What We Do</span>
              <h2 className={styles.sectionTitle}>Roofing services you can count on</h2>
              <p className={styles.sectionLead}>
                From full replacements to emergency repairs — every aspect of your roof handled
                with the same commitment to quality.
              </p>
            </div>
            <div className={styles.grid}>
              {services.map(({ Icon, title, desc }, i) => (
                <div key={title} className={styles.card} data-reveal style={{ '--reveal-delay': `${i * 80}ms` } as any}>
                  <div className={styles.cardIcon}><Icon size={22} /></div>
                  <h3 className={styles.cardTitle}>{title}</h3>
                  <p className={styles.cardDesc}>{desc}</p>
                </div>
              ))}
            </div>
            <div className={styles.sectionMore}>
              <Link href="/demo/roofing/services" className={styles.sectionMoreLink}>
                View detailed services, pricing &amp; what's included <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* ── Why Choose Us ── */}
        <section className={styles.section}>
          <div className={styles.sectionInner}>
            <div className={styles.featureSplit}>
              <div className={styles.featureSplitHeader} data-reveal>
                <span className={styles.eyebrow}>Why Peak Roofing</span>
                <h2 className={styles.sectionTitle}>The difference is in the details</h2>
                <p className={styles.sectionLead}>
                  15 years protecting homes because we do things the right way — not the easy way.
                </p>
                <Link href="/demo/roofing/process" className={styles.sectionMoreLink} style={{ marginTop: '1.5rem' }}>
                  See how we work <ChevronRight size={16} />
                </Link>
              </div>
              <div className={styles.featureGrid}>
                {features.map(({ Icon, title, desc }, i) => (
                  <div key={title} className={styles.featureCard} data-reveal style={{ '--reveal-delay': `${i * 80}ms` } as any}>
                    <div className={styles.featureIcon}><Icon size={24} /></div>
                    <div>
                      <h3 className={styles.featureTitle}>{title}</h3>
                      <p className={styles.featureDesc}>{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Process preview ── */}
        <section className={`${styles.section} ${styles.sectionAlt}`} id="process">
          <div className={styles.sectionInner}>
            <div className={styles.sectionHeader} data-reveal>
              <span className={styles.eyebrow}>How It Works</span>
              <h2 className={styles.sectionTitle}>Simple, transparent process</h2>
              <p className={styles.sectionLead}>
                No runarounds, no surprises. From your first call to final sign-off in four clear steps.
              </p>
            </div>
            <div className={styles.stepsGrid}>
              {steps.map(({ num, title, desc }, i) => (
                <div key={num} className={styles.step} data-reveal style={{ '--reveal-delay': `${i * 80}ms` } as any}>
                  <div className={styles.stepNum}>{num}</div>
                  <h3 className={styles.stepTitle}>{title}</h3>
                  <p className={styles.stepDesc}>{desc}</p>
                </div>
              ))}
            </div>
            <div className={styles.sectionMore}>
              <Link href="/demo/roofing/process" className={styles.sectionMoreLink}>
                See the full process with photos &amp; what to expect <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* ── Reviews preview ── */}
        <section className={styles.section} id="reviews">
          <div className={styles.sectionInner}>
            <div className={styles.sectionHeader} data-reveal>
              <span className={styles.eyebrow}>Customer Reviews</span>
              <h2 className={styles.sectionTitle}>Homeowners trust Peak Roofing</h2>
              <p className={styles.sectionLead}>
                Don't take our word for it — here's what customers say after working with us.
              </p>
            </div>
            <div className={styles.testimonialsGrid}>
              {testimonials.map(({ name, location, text, rating }, i) => (
                <div key={name} className={styles.testimonialCard} data-reveal style={{ '--reveal-delay': `${i * 80}ms` } as any}>
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
              <Link href="/demo/roofing/reviews" className={styles.sectionMoreLink}>
                See all 200+ reviews from Google, BBB &amp; HomeAdvisor <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* ── Gallery ── */}
        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <div className={styles.sectionInner}>
            <div className={styles.galleryMore} style={{ marginTop: 0, marginBottom: '1.5rem' }}>
              <h2 className={styles.sectionTitle} style={{ margin: 0 }}>Recent projects</h2>
              <Link href="/demo/roofing/contact" className={styles.btnSecondary}>Get a free quote</Link>
            </div>
            <div className={styles.galleryGrid}>
              {galleryItems.map(({ label, src }, i) => (
                <div key={label} className={styles.galleryItem} data-reveal style={{ '--reveal-delay': `${i * 60}ms` } as any}>
                  <Image
                    src={src}
                    alt={label}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 760px) 50vw, 33vw"
                  />
                  <div className={styles.galleryOverlay}>
                    <span className={styles.galleryLabel}>{label}</span>
                  </div>
                </div>
              ))}
            </div>
            <p style={{ marginTop: '1.25rem', fontSize: '0.875rem', color: '#64748b' }}>
              Showing 6 of 40+ completed projects
            </p>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className={styles.section}>
          <div className={styles.sectionInner}>
            <div className={styles.ctaBox} data-reveal>
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
                <Link href="/demo/roofing/contact" className={styles.btnPrimary}>Get My Free Estimate</Link>
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
