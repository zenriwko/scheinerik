import { useState } from 'react';
import Link from 'next/link';
import { Phone, Mail, Clock, AlertTriangle, MapPin, CheckCircle, X } from 'lucide-react';
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

export default function RoofingContact() {
  const [formSent, setFormSent] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useScrollReveal();

  return (
    <>
      <SEO
        title="Contact – Peak Roofing Co. Demo"
        description="Get a free estimate from Peak Roofing Co. — a demo site built by scheinerik.dev."
        path="/demo/roofing/contact"
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
                <Link href={href} className={href === '/demo/roofing/contact' ? styles.companyLinkActive : ''}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <div className={styles.navRight}>
            <a href="tel:+15550001234" className={styles.navPhone}>
              <Phone size={15} /> (555) 000-1234
            </a>
            <a href="#form" className={styles.navBtn}>Get a Quote</a>
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
              <a href="#form" className={styles.mobileMenuCta}>Get a Free Quote</a>
            </div>
          )}
        </nav>

        {/* ── Page header ── */}
        <div className={styles.pageHeader}>
          <div className={styles.sectionInner}>
            <div className={styles.breadcrumb}>
              <Link href="/demo/roofing">Peak Roofing</Link>
              <span className={styles.breadcrumbSep}>/</span>
              <span>Contact</span>
            </div>
            <h1 className={styles.pageHeaderTitle}>Get a Free Estimate</h1>
            <p className={styles.pageHeaderSub}>
              Fill in the form and we'll schedule a free on-site inspection. Written estimate within 24 hours.
            </p>
          </div>
        </div>

        {/* ── Main contact section ── */}
        <section className={styles.section} id="form">
          <div className={styles.sectionInner}>
            <div className={styles.contactPageGrid}>

              {/* Left — info + map */}
              <div>
                <div className={styles.contactInfo}>
                  <div className={styles.contactInfoItem} data-reveal style={{ '--reveal-delay': '0ms' } as any}>
                    <div className={styles.contactInfoIcon}><Phone size={20} /></div>
                    <div>
                      <span className={styles.contactInfoLabel}>Phone</span>
                      <span className={styles.contactInfoValue}>(555) 000-1234</span>
                      <span className={styles.contactInfoValueMuted}>24/7 for emergencies</span>
                    </div>
                  </div>
                  <div className={styles.contactInfoItem} data-reveal style={{ '--reveal-delay': '80ms' } as any}>
                    <div className={styles.contactInfoIcon}><Mail size={20} /></div>
                    <div>
                      <span className={styles.contactInfoLabel}>Email</span>
                      <span className={styles.contactInfoValue}>info@peakroofing.example</span>
                      <span className={styles.contactInfoValueMuted}>Response within 2 hours</span>
                    </div>
                  </div>
                  <div className={styles.contactInfoItem} data-reveal style={{ '--reveal-delay': '160ms' } as any}>
                    <div className={styles.contactInfoIcon}><Clock size={20} /></div>
                    <div>
                      <span className={styles.contactInfoLabel}>Office Hours</span>
                      <span className={styles.contactInfoValue}>Mon – Fri, 7 am – 6 pm</span>
                      <span className={styles.contactInfoValueMuted}>Sat 8 am – 2 pm</span>
                    </div>
                  </div>
                  <div className={styles.contactInfoItem} data-reveal style={{ '--reveal-delay': '240ms' } as any}>
                    <div className={styles.contactInfoIcon}><MapPin size={20} /></div>
                    <div>
                      <span className={styles.contactInfoLabel}>Service Area</span>
                      <span className={styles.contactInfoValue}>Greater Metro Area</span>
                      <span className={styles.contactInfoValueMuted}>30-mile radius from city center</span>
                    </div>
                  </div>
                </div>

                {/* Map */}
                <div className={styles.mapEmbed} data-reveal>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d496079.95393893577!2d-82.58411991807492!3d27.89951465169533!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88c2b782b3b9d1e1%3A0xa75f1389af96b463!2sTampa%2C%20FL%2C%20USA!5e0!3m2!1sen!2sph!4v1779914029145!5m2!1sen!2sph"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Peak Roofing service area — Tampa, FL"
                  />
                </div>

                {/* Emergency box */}
                <div className={styles.emergencyBox} data-reveal>
                  <AlertTriangle size={22} className={styles.emergencyBoxIcon} />
                  <div className={styles.emergencyBoxText}>
                    <strong>Roof emergency?</strong>
                    <span>Call (555) 000-1234 — we answer 24 hours a day, 7 days a week. Emergency tarping available within 4 hours in most service areas.</span>
                  </div>
                </div>
              </div>

              {/* Right — full form */}
              <div data-reveal>
                {formSent ? (
                  <div className={styles.formSuccess}>
                    <CheckCircle size={44} />
                    <h3>Message received!</h3>
                    <p>We'll review your request and be in touch within one business day to schedule your free inspection.</p>
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
                        <input className={styles.formInput} type="tel" placeholder="(555) 000-0000" required />
                      </div>
                    </div>
                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Service needed</label>
                        <select className={styles.formSelect} defaultValue="">
                          <option value="" disabled>Select a service…</option>
                          <option>Roof Inspection</option>
                          <option>Roof Installation</option>
                          <option>Roof Repair</option>
                          <option>Storm Damage Assessment</option>
                          <option>Gutters / Fascia</option>
                          <option>Other / Not sure</option>
                        </select>
                      </div>
                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Property type</label>
                        <select className={styles.formSelect} defaultValue="">
                          <option value="" disabled>Select…</option>
                          <option>Single-family home</option>
                          <option>Multi-unit residential</option>
                          <option>Commercial building</option>
                          <option>Other</option>
                        </select>
                      </div>
                    </div>
                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Preferred contact</label>
                        <select className={styles.formSelect} defaultValue="">
                          <option value="" disabled>Select…</option>
                          <option>Phone call</option>
                          <option>Text message</option>
                          <option>Email</option>
                          <option>Any</option>
                        </select>
                      </div>
                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Best time to reach you</label>
                        <select className={styles.formSelect} defaultValue="">
                          <option value="" disabled>Select…</option>
                          <option>Morning (7 am – 12 pm)</option>
                          <option>Afternoon (12 pm – 5 pm)</option>
                          <option>Evening (5 pm – 7 pm)</option>
                          <option>Any time</option>
                        </select>
                      </div>
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Tell us about your roof</label>
                      <textarea
                        className={styles.formTextarea}
                        placeholder="Age of roof, material, what you're seeing (leak, missing shingles, storm damage)… Any details help us prepare for the inspection."
                        rows={5}
                      />
                    </div>
                    <div className={styles.formSubmit}>
                      <button type="submit" className={styles.btnPrimary} style={{ width: '100%', justifyContent: 'center' }}>
                        Request My Free Inspection
                      </button>
                    </div>
                    <p style={{ fontSize: '0.75rem', color: '#64748b', textAlign: 'center', marginTop: '0.75rem', lineHeight: 1.4 }}>
                      🔒 We never share your details. No spam, no high-pressure sales calls.
                    </p>
                  </form>
                )}
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
          <a href="#form" className={styles.stickyQuoteBtn}>
            Free Estimate →
          </a>
        </div>
      </div>
    </>
  );
}
