import { useState } from 'react';
import Link from 'next/link';
import {
  Home, Building, Star, Truck,
  Phone, Mail, Clock,
  CheckCircle, ChevronDown,
  Shield, Leaf, CalendarCheck,
} from 'lucide-react';
import SEO from '@/components/%SEO/SEO';
import styles from './demo.module.css';

const ACCENT      = '#06b6d4';
const ACCENT_SOFT = 'rgba(6, 182, 212, 0.12)';
const ACCENT_GLOW = 'rgba(6, 182, 212, 0.35)';

const services = [
  {
    Icon: Home,
    title: 'Residential Cleaning',
    desc: 'Weekly, bi-weekly, or one-off home cleans. We bring all equipment and supplies — you come back to a spotless, fresh-smelling home.',
  },
  {
    Icon: Building,
    title: 'Commercial Cleaning',
    desc: 'Office cleaning before or after business hours. Consistent quality, flexible scheduling, and no disruption to your team\'s workflow.',
  },
  {
    Icon: Star,
    title: 'Deep Cleaning',
    desc: 'A thorough top-to-bottom clean for homes that need a reset — appliances, baseboards, grout, blinds, and everything in between.',
  },
  {
    Icon: Truck,
    title: 'Move-In / Move-Out',
    desc: 'Leave or arrive to a perfectly clean space. We coordinate with landlords and agents for hassle-free property handovers.',
  },
];

const stats = [
  { value: '1,200+', label: 'Happy Clients' },
  { value: '8',      label: 'Years Experience' },
  { value: 'Same-Day', label: 'Booking Available' },
  { value: '100%',   label: 'Eco-Friendly Products' },
];

const features = [
  {
    Icon: Shield,
    title: 'Vetted & Background-Checked',
    desc: 'Every SparkClean team member undergoes a full background check and two weeks of in-house training before entering a client\'s home. You can trust who we send.',
  },
  {
    Icon: Leaf,
    title: 'Eco-Friendly Products Only',
    desc: 'We use only certified non-toxic, biodegradable cleaning products. Safe for children, pets, and the environment — without compromising on results.',
  },
  {
    Icon: CalendarCheck,
    title: 'Flexible Scheduling',
    desc: 'Book online or by phone, any day of the week. Same-day slots available most days. Recurring clients get priority scheduling and a consistent team.',
  },
];

const steps = [
  {
    num: '01',
    title: 'Get a Quote',
    desc: 'Tell us your property size and what you need. We give you a transparent, all-inclusive price in under 60 seconds — no hidden fees, ever.',
  },
  {
    num: '02',
    title: 'Book Your Slot',
    desc: 'Choose your date and time online or by phone. We confirm within the hour. Same-day and next-day availability for most services.',
  },
  {
    num: '03',
    title: 'We Clean',
    desc: 'Your assigned team arrives on time with all equipment. We follow a thorough checklist for every room and check in with you before leaving.',
  },
  {
    num: '04',
    title: 'Satisfaction Guaranteed',
    desc: 'Not happy with any part of the clean? Call us within 24 hours and we\'ll return to make it right at no extra charge. No questions asked.',
  },
];

const testimonials = [
  {
    name: 'Amanda H.',
    location: 'Riverside District',
    text: '"I\'ve been using SparkClean for fortnightly cleans for over a year. Same team every visit, always thorough, always on time. My house genuinely smells different after they leave — in the best way possible."',
    rating: 5,
  },
  {
    name: 'Marcus L.',
    location: 'Downtown Office',
    text: '"We switched our office cleaning contract to SparkClean six months ago. The difference was immediate — our staff actually commented on how much cleaner the bathrooms and kitchen were. Professional, reliable, and reasonably priced."',
    rating: 5,
  },
  {
    name: 'Sophie & David W.',
    location: 'Greenfield Lane',
    text: '"Used SparkClean for our move-out deep clean. Our letting agent said it was the cleanest handover they\'d seen all year and we got our full deposit back. Absolutely worth every penny."',
    rating: 5,
  },
];

const galleryItems = [
  { label: 'Spotless Modern Kitchen',   gradient: 'linear-gradient(135deg, #021a1e 0%, #010d10 100%)' },
  { label: 'Deep-Cleaned Bathroom',     gradient: 'linear-gradient(135deg, #041a22 0%, #020e14 100%)' },
  { label: 'Office Common Area',        gradient: 'linear-gradient(135deg, #021520 0%, #010a12 100%)' },
  { label: 'Post-Move-Out Clean',       gradient: 'linear-gradient(135deg, #061a1a 0%, #031010 100%)' },
  { label: 'Family Living Room Clean',  gradient: 'linear-gradient(135deg, #041a1a 0%, #020e0e 100%)' },
  { label: 'Commercial Lobby',          gradient: 'linear-gradient(135deg, #031520 0%, #010d16 100%)' },
];

const faqs = [
  {
    q: 'Do I need to be home during the clean?',
    a: "No — most of our regular clients aren't home. Many provide a key or door code. All SparkClean staff are background-checked and insured, so you can leave with complete peace of mind.",
  },
  {
    q: 'What products do you use?',
    a: 'We use only certified eco-friendly, non-toxic cleaning products. They\'re highly effective and safe for children, pets, and people with allergies or sensitivities. If you have specific requirements, just let us know when booking.',
  },
  {
    q: 'How long does a standard clean take?',
    a: 'A standard 3-bedroom house takes approximately 2.5–3.5 hours with a two-person team. Deep cleans and first-time cleans take longer. We\'ll give you an accurate time estimate when you book.',
  },
  {
    q: 'Can I book a recurring clean?',
    a: 'Yes — weekly, fortnightly, and monthly recurring bookings are available. Recurring clients save up to 15% versus one-off rates, and we assign a consistent team so they learn your home over time.',
  },
  {
    q: 'What if I need to reschedule?',
    a: 'We ask for 24 hours\' notice to reschedule at no charge. Cancellations within 24 hours may incur a small fee. We try to be flexible — just give us a call and we\'ll sort it out.',
  },
];

export default function CleaningDemo() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formSent, setFormSent] = useState(false);

  return (
    <>
      <SEO
        title="SparkClean – Demo Site"
        description="Demo website for a cleaning service — built by scheinerik.dev to showcase what a professional local business site could look like."
        path="/demo/cleaning"
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
            Spark<span className={styles.logoAccent}>Clean</span>
          </a>
          <ul className={styles.companyLinks}>
            <li><a href="#services">Services</a></li>
            <li><a href="#process">How It Works</a></li>
            <li><a href="#reviews">Reviews</a></li>
            <li><a href="#faq">FAQ</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
          <a href="#contact" className={styles.navBtn}>Book a Clean</a>
        </nav>

        {/* ── Hero ── */}
        <section className={styles.hero}>
          <div className={styles.heroBg} aria-hidden="true" />
          <div className={styles.heroContent}>
            <span className={styles.heroEyebrow}>Eco-Friendly · Vetted Staff · Same-Day Booking Available</span>
            <h1 className={styles.heroTitle}>
              A cleaner home.<br /><em>Every time.</em>
            </h1>
            <p className={styles.heroLead}>
              Professional cleaning for homes and offices — delivered by a trained, vetted team
              using only eco-friendly products. Reliable, thorough, and always on time.
            </p>
            <div className={styles.heroActions}>
              <a href="#contact" className={styles.btnPrimary}>Book a Clean</a>
              <a href="#services" className={styles.btnSecondary}>See Services ↓</a>
            </div>
            <div className={styles.trustBadges}>
              {['Insured & Bonded', 'Background Checked', 'Eco Products', 'Satisfaction Guarantee'].map((b) => (
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
              <span className={styles.eyebrow}>What We Offer</span>
              <h2 className={styles.sectionTitle}>Cleaning services for every situation</h2>
              <p className={styles.sectionLead}>
                From a regular weekly clean to a full deep clean before you move — we handle it all.
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
              <span className={styles.eyebrow}>Why SparkClean</span>
              <h2 className={styles.sectionTitle}>Clean you can count on</h2>
              <p className={styles.sectionLead}>
                We&apos;ve been trusted by over 1,200 clients because we consistently do what we promise.
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
              <h2 className={styles.sectionTitle}>Booked in minutes, spotless by evening</h2>
              <p className={styles.sectionLead}>
                From first enquiry to a clean home — four steps and you&apos;re done.
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
              <h2 className={styles.sectionTitle}>Clients love SparkClean</h2>
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
              <span className={styles.eyebrow}>Before & After</span>
              <h2 className={styles.sectionTitle}>The SparkClean difference</h2>
              <p className={styles.sectionLead}>
                Results that speak for themselves — every clean, every time.
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
              <p>Over 500 five-star cleans completed this year</p>
              <a href="#contact" className={styles.btnSecondary}>Book Your Clean</a>
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
              <h2 className={styles.sectionTitle}>Ready for a cleaner space?</h2>
              <p className={styles.sectionLead}>
                Same-day bookings available for most services. Fill in the form and we&apos;ll confirm your slot within the hour.
              </p>
            </div>
            <div className={styles.contactGrid}>

              {/* Contact info */}
              <div className={styles.contactInfo}>
                <div className={styles.contactInfoItem}>
                  <div className={styles.contactInfoIcon}><Phone size={20} /></div>
                  <div>
                    <span className={styles.contactInfoLabel}>Phone</span>
                    <span className={styles.contactInfoValue}>(555) 000-9012</span>
                    <span className={styles.contactInfoValueMuted}>Same-day slots available</span>
                  </div>
                </div>
                <div className={styles.contactInfoItem}>
                  <div className={styles.contactInfoIcon}><Mail size={20} /></div>
                  <div>
                    <span className={styles.contactInfoLabel}>Email</span>
                    <span className={styles.contactInfoValue}>hello@sparkclean.example</span>
                  </div>
                </div>
                <div className={styles.contactInfoItem}>
                  <div className={styles.contactInfoIcon}><Clock size={20} /></div>
                  <div>
                    <span className={styles.contactInfoLabel}>Operating Hours</span>
                    <span className={styles.contactInfoValue}>Mon – Sat, 7 am – 8 pm</span>
                    <span className={styles.contactInfoValueMuted}>Sun 9 am – 5 pm</span>
                  </div>
                </div>
              </div>

              {/* Form */}
              {formSent ? (
                <div className={styles.formSuccess}>
                  <CheckCircle size={40} />
                  <h3>Booking request received!</h3>
                  <p>We&apos;ll confirm your slot within the hour.</p>
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
                      <option>Residential Cleaning</option>
                      <option>Commercial Cleaning</option>
                      <option>Deep Cleaning</option>
                      <option>Move-In / Move-Out</option>
                      <option>Other / Not sure</option>
                    </select>
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Message</label>
                    <textarea
                      className={styles.formTextarea}
                      placeholder="Tell us about your property — size, any specific areas of focus, preferred date…"
                    />
                  </div>
                  <div className={styles.formSubmit}>
                    <button type="submit" className={styles.btnPrimary}>
                      Book a Clean
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className={styles.companyFooter}>
          <span className={styles.footerLogo}>SparkClean</span>
          <span className={styles.footerCopy}>© 2026 SparkClean. All rights reserved.</span>
          <span className={styles.footerCredit}>
            Demo built by <a href="https://scheinerik.dev">scheinerik.dev</a>
          </span>
        </footer>
      </div>
    </>
  );
}
