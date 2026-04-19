import { useState } from 'react';
import Link from 'next/link';
import {
  Hammer, Layers, Building, Settings,
  Phone, Mail, Clock,
  CheckCircle, ChevronDown,
  Award, ThumbsUp, Ruler,
} from 'lucide-react';
import SEO from '@/components/%SEO/SEO';
import styles from './demo.module.css';

const ACCENT      = '#d97706';
const ACCENT_SOFT = 'rgba(217, 119, 6, 0.12)';
const ACCENT_GLOW = 'rgba(217, 119, 6, 0.35)';

const services = [
  {
    Icon: Hammer,
    title: 'Kitchen Remodeling',
    desc: 'Custom kitchen transformations — cabinets, countertops, layouts, and full gut-and-rebuild projects. We design for how you actually cook.',
  },
  {
    Icon: Layers,
    title: 'Bathroom Renovation',
    desc: 'From a simple refresh to a luxury ensuite — tiling, fixtures, vanities, and wet-room installs. Completed on schedule, no mess left behind.',
  },
  {
    Icon: Building,
    title: 'Basement Finishing',
    desc: 'Turn unused basement space into livable square footage: home offices, gyms, entertainment rooms, or in-law suites — fully up to code.',
  },
  {
    Icon: Settings,
    title: 'Room Additions',
    desc: 'Expand your home with a new bedroom, sunroom, or open-plan extension. Fully permitted, structurally engineered, and built to last.',
  },
];

const stats = [
  { value: '300+', label: 'Projects Completed' },
  { value: '12',   label: 'Years in Business' },
  { value: '4.8★', label: 'Average Rating' },
  { value: '100%', label: 'Licensed & Insured' },
];

const features = [
  {
    Icon: Clock,
    title: 'On-Schedule, Every Time',
    desc: 'We build detailed project timelines before the first nail is pulled. You get weekly progress updates and a dedicated project manager on every job.',
  },
  {
    Icon: Award,
    title: 'Premium Materials Only',
    desc: 'We partner with leading suppliers to bring you commercial-grade cabinetry, tile, and fixtures at competitive prices — quality you can feel for decades.',
  },
  {
    Icon: ThumbsUp,
    title: 'No Surprise Invoices',
    desc: 'Our contracts are itemised and fixed. If we uncover something unexpected mid-project, we stop, explain it, and agree on the path before proceeding.',
  },
];

const steps = [
  {
    num: '01',
    title: 'Free Consultation',
    desc: 'We visit your home, walk the space with you, and listen to your goals. No pressure, no pitch — just an honest conversation about what\'s possible.',
  },
  {
    num: '02',
    title: 'Design & Quote',
    desc: 'Our designer creates a 3D concept and we deliver a fully itemised quote within 48 hours. Every material, every labour cost, no hidden line items.',
  },
  {
    num: '03',
    title: 'Build & Manage',
    desc: 'Our crews arrive on day one and follow a structured schedule. You get a daily update and a point of contact you can actually reach.',
  },
  {
    num: '04',
    title: 'Final Walkthrough',
    desc: 'We tour the finished space together. Any punch-list items are resolved before we leave — and your 5-year workmanship warranty starts the day you sign off.',
  },
];

const testimonials = [
  {
    name: 'Rachel & Tom D.',
    location: 'Elmwood Park',
    text: '"Craft Renovations turned our dated 1990s kitchen into something we genuinely love. They kept to the timeline, the crew was respectful of our home, and the end result was better than the 3D render. Highly recommend."',
    rating: 5,
  },
  {
    name: 'Kevin B.',
    location: 'Northgate',
    text: '"Had my basement finished by Craft last spring. They handled permits, framing, electrical, drywall, and flooring — one crew, one contract, no coordination headaches. Professional from start to finish."',
    rating: 5,
  },
  {
    name: 'Priya S.',
    location: 'Lakeshore Drive',
    text: '"The bathroom renovation went over our initial budget — but only because we chose to upgrade the tile halfway through. Craft were upfront about every cost before touching anything. That kind of honesty is rare."',
    rating: 5,
  },
];

const galleryItems = [
  { label: 'Modern Kitchen Remodel',    gradient: 'linear-gradient(135deg, #3d2005 0%, #1a0d02 100%)' },
  { label: 'Master Bath Renovation',    gradient: 'linear-gradient(135deg, #1a1205 0%, #0e0b03 100%)' },
  { label: 'Open-Plan Living Addition', gradient: 'linear-gradient(135deg, #2e1a05 0%, #1a0f03 100%)' },
  { label: 'Finished Basement Suite',   gradient: 'linear-gradient(135deg, #0d1a1a 0%, #051210 100%)' },
  { label: 'Ensuite Wet Room',          gradient: 'linear-gradient(135deg, #0a0f1e 0%, #050810 100%)' },
  { label: 'Sunroom Extension',         gradient: 'linear-gradient(135deg, #1a1505 0%, #100e04 100%)' },
];

const faqs = [
  {
    q: 'How long does a kitchen remodel take?',
    a: 'A standard kitchen remodel runs 4–8 weeks depending on scope. A full gut-and-rebuild with custom cabinetry typically takes 8–12 weeks. We give you a week-by-week schedule before any work starts.',
  },
  {
    q: 'Do I need to move out during renovation?',
    a: 'For most projects — no. We section off the work area, use dust barriers, and restore access to your home every evening. For major structural additions, we\'ll advise you honestly if temporary relocation would be more comfortable.',
  },
  {
    q: 'Do you handle permits and inspections?',
    a: 'Yes. We pull all required building permits, schedule inspections, and manage the approval process from start to finish. You never have to chase a permit office.',
  },
  {
    q: 'Can you work with my own design or architect?',
    a: 'Absolutely. We can build from your existing plans or collaborate with your architect. Our team handles the construction management — you keep full creative control.',
  },
  {
    q: 'What warranty do you offer on the work?',
    a: 'All Craft Renovations projects include a 5-year workmanship warranty. Materials carry their own manufacturer warranties, which we transfer to you in writing at project completion.',
  },
];

export default function RemodelingDemo() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formSent, setFormSent] = useState(false);

  return (
    <>
      <SEO
        title="Craft Renovations – Demo Site"
        description="Demo website for a home remodeling company — built by scheinerik.dev to showcase what a professional local business site could look like."
        path="/demo/remodeling"
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
          <a href="#" className={styles.companyLogo}>
            Craft <span className={styles.logoAccent}>Renovations</span>
          </a>
          <ul className={styles.companyLinks}>
            <li><a href="#services">Services</a></li>
            <li><a href="#process">Process</a></li>
            <li><a href="#reviews">Reviews</a></li>
            <li><a href="#faq">FAQ</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
          <a href="#contact" className={styles.navBtn}>Free Consultation</a>
        </nav>

        {/* ── Hero ── */}
        <section className={styles.hero}>
          <div className={styles.heroBg} aria-hidden="true" />
          <div className={styles.heroContent}>
            <span className={styles.heroEyebrow}>Family-Owned · 12 Years in Business · Greater Metro Area</span>
            <h1 className={styles.heroTitle}>
              Spaces you love.<br /><em>Crafted to last.</em>
            </h1>
            <p className={styles.heroLead}>
              Full-home remodeling from the kitchen to the basement. We bring your vision to life
              with premium materials, skilled tradespeople, and a process built around your schedule.
            </p>
            <div className={styles.heroActions}>
              <a href="#contact" className={styles.btnPrimary}>Book a Free Consultation</a>
              <a href="#services" className={styles.btnSecondary}>Our Services ↓</a>
            </div>
            <div className={styles.trustBadges}>
              {['Licensed & Bonded', 'Fully Insured', 'Free Estimates', '5-Year Warranty'].map((b) => (
                <span key={b} className={styles.trustBadge}>
                  <CheckCircle size={13} />
                  {b}
                </span>
              ))}
            </div>
          </div>
        </section>

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

        {/* ── Services ── */}
        <section className={`${styles.section} ${styles.sectionAlt}`} id="services">
          <div className={styles.sectionInner}>
            <div className={styles.sectionHeader}>
              <span className={styles.eyebrow}>What We Build</span>
              <h2 className={styles.sectionTitle}>Renovation services for every room</h2>
              <p className={styles.sectionLead}>
                Whether it&apos;s one room or the whole house — we handle it from first sketch to final walkthrough.
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
          </div>
        </section>

        {/* ── Why Choose Us ── */}
        <section className={styles.section}>
          <div className={styles.sectionInner}>
            <div className={styles.sectionHeader}>
              <span className={styles.eyebrow}>Why Craft Renovations</span>
              <h2 className={styles.sectionTitle}>The difference is in the details</h2>
              <p className={styles.sectionLead}>
                We&apos;ve been transforming homes for 12 years because we do things the right way —
                not the fast way.
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

        {/* ── Process ── */}
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
          </div>
        </section>

        {/* ── Testimonials ── */}
        <section className={styles.section} id="reviews">
          <div className={styles.sectionInner}>
            <div className={styles.sectionHeader}>
              <span className={styles.eyebrow}>Customer Reviews</span>
              <h2 className={styles.sectionTitle}>Homeowners trust Craft Renovations</h2>
              <p className={styles.sectionLead}>
                Don&apos;t take our word for it — here&apos;s what customers say after working with us.
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
          </div>
        </section>

        {/* ── Gallery ── */}
        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <div className={styles.sectionInner}>
            <div className={styles.sectionHeader}>
              <span className={styles.eyebrow}>Our Work</span>
              <h2 className={styles.sectionTitle}>Recent projects</h2>
              <p className={styles.sectionLead}>
                Every space we build is one we&apos;d be proud to live in ourselves.
              </p>
            </div>
            <div className={styles.galleryGrid}>
              {galleryItems.map(({ label, gradient }) => (
                <div key={label} className={styles.galleryItem}>
                  <div className={styles.galleryBg} style={{ background: gradient }} />
                  <div className={styles.galleryOverlay}>
                    <span className={styles.galleryLabel}>{label}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.galleryMore}>
              <p>Showing 6 of 30+ completed projects</p>
              <a href="#contact" className={styles.btnSecondary}>Book a Free Consultation</a>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className={styles.section} id="faq">
          <div className={styles.sectionInner}>
            <div className={styles.sectionHeader}>
              <span className={styles.eyebrow}>FAQ</span>
              <h2 className={styles.sectionTitle}>Common questions answered</h2>
              <p className={styles.sectionLead}>
                Still unsure? Call us directly — we&apos;re happy to walk you through anything.
              </p>
            </div>
            <div className={styles.faqList}>
              {faqs.map(({ q, a }, i) => (
                <div
                  key={i}
                  className={openFaq === i ? `${styles.faqItem} ${styles.faqOpen}` : styles.faqItem}
                >
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
                  {openFaq === i && (
                    <p className={styles.faqAnswer}>{a}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Contact ── */}
        <section className={`${styles.section} ${styles.sectionAlt}`} id="contact">
          <div className={styles.sectionInner}>
            <div className={styles.sectionHeader}>
              <span className={styles.eyebrow}>Get in Touch</span>
              <h2 className={styles.sectionTitle}>Ready to start your renovation?</h2>
              <p className={styles.sectionLead}>
                Fill in the form and we&apos;ll get back to you within one business day.
              </p>
            </div>
            <div className={styles.contactGrid}>

              {/* Contact info */}
              <div className={styles.contactInfo}>
                <div className={styles.contactInfoItem}>
                  <div className={styles.contactInfoIcon}><Phone size={20} /></div>
                  <div>
                    <span className={styles.contactInfoLabel}>Phone</span>
                    <span className={styles.contactInfoValue}>(555) 000-5678</span>
                    <span className={styles.contactInfoValueMuted}>Mon – Fri, 7 am – 6 pm</span>
                  </div>
                </div>
                <div className={styles.contactInfoItem}>
                  <div className={styles.contactInfoIcon}><Mail size={20} /></div>
                  <div>
                    <span className={styles.contactInfoLabel}>Email</span>
                    <span className={styles.contactInfoValue}>hello@craftrenovations.example</span>
                  </div>
                </div>
                <div className={styles.contactInfoItem}>
                  <div className={styles.contactInfoIcon}><Ruler size={20} /></div>
                  <div>
                    <span className={styles.contactInfoLabel}>Free Estimate</span>
                    <span className={styles.contactInfoValue}>On-site within 48 hours</span>
                    <span className={styles.contactInfoValueMuted}>No obligation</span>
                  </div>
                </div>
              </div>

              {/* Form */}
              {formSent ? (
                <div className={styles.formSuccess}>
                  <CheckCircle size={40} />
                  <h3>Message received!</h3>
                  <p>Thanks for reaching out. We&apos;ll get back to you within one business day.</p>
                </div>
              ) : (
                <form
                  className={styles.contactForm}
                  onSubmit={(e) => { e.preventDefault(); setFormSent(true); }}
                >
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>First name</label>
                      <input className={styles.formInput} type="text" placeholder="Jane" required />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Last name</label>
                      <input className={styles.formInput} type="text" placeholder="Smith" required />
                    </div>
                  </div>
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Email</label>
                      <input className={styles.formInput} type="email" placeholder="jane@example.com" required />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Phone</label>
                      <input className={styles.formInput} type="tel" placeholder="(555) 000-0000" />
                    </div>
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Service needed</label>
                    <select className={styles.formSelect} defaultValue="">
                      <option value="" disabled>Select a service…</option>
                      <option>Kitchen Remodeling</option>
                      <option>Bathroom Renovation</option>
                      <option>Basement Finishing</option>
                      <option>Room Addition</option>
                      <option>Other / Not sure</option>
                    </select>
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Message</label>
                    <textarea
                      className={styles.formTextarea}
                      placeholder="Tell us about your project — which room, rough size, what you&apos;re hoping to achieve…"
                    />
                  </div>
                  <div className={styles.formSubmit}>
                    <button type="submit" className={styles.btnPrimary}>
                      Send Message
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className={styles.companyFooter}>
          <span className={styles.footerLogo}>Craft Renovations</span>
          <span className={styles.footerCopy}>© 2026 Craft Renovations. All rights reserved.</span>
          <span className={styles.footerCredit}>
            Demo built by <a href="https://scheinerik.dev">scheinerik.dev</a>
          </span>
        </footer>
      </div>
    </>
  );
}
