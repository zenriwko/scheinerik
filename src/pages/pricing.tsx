import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronDown, Code2, Shield, Smartphone, Search, Zap, HeartHandshake } from 'lucide-react';
import SEO from '@/components/%SEO/SEO';
import Contact from '@/components/Contact/Contact';
import styles from './pricing.module.css';

// ─── Data ───────────────────────────────────────────────────────────────────

const plans = [
  {
    name: 'Static Website',
    price: '$199',
    priceNote: '/month',
    description:
      'A custom, branded website built for speed and search engine visibility — ideal for portfolios, landing pages, and growing businesses.',
    features: [
      'Custom branded design — no templates or page builders',
      'Up to 5 pages included',
      'Fully SEO optimized — meta tags, schema markup, sitemap',
      'Mobile & responsive on all devices',
      'Lighthouse performance score 95+',
      'Contact form integration',
      'Google Analytics & Tag Manager setup',
      '3 rounds of revision included',
      'Source code & full ownership on delivery',
      'Ongoing updates — content, features, and improvements every month',
    ],
    cta: 'Get Started',
    ctaHref: '#contact',
    featured: false,
  },
  {
    name: 'eCommerce',
    price: 'From $300',
    priceNote: '/month — scales with scope',
    description:
      'A full online store with catalog, checkout, and payments. Final price depends on the number of products and integrations needed.',
    features: [
      'Everything in Static Website',
      'Product catalog & variant management',
      'Shopping cart & secure checkout flow',
      'Payment gateway — Stripe, PayPal, or similar',
      'Customer account & order history portal',
      'Inventory & stock level management',
      'Discount codes & promotional rules',
      'Automated order notification emails',
      '5 rounds of revision included',
      'Ongoing updates — new products, features, and improvements monthly',
    ],
    cta: 'Get Started',
    ctaHref: '#contact',
    featured: false,
  },
  {
    name: 'Custom Project',
    price: "Let's talk",
    priceNote: 'quote based on your scope',
    description:
      'Web apps, internal tools, dashboards, SaaS products, or API-heavy integrations — anything outside the boxes above gets a fully tailored proposal.',
    features: [
      'Full discovery & scoping session',
      'Web applications & internal tools',
      'Custom dashboards & data portals',
      'Third-party API & CRM integrations',
      'SaaS & subscription platforms',
      'Complex business logic & workflows',
      'Authentication & role-based access',
      'Dedicated project management',
      'Revision rounds agreed in the proposal',
      'Ongoing retainer available',
    ],
    cta: 'Get a Quote',
    ctaHref: '#contact',
    featured: false,
  },
];

const guarantees = [
  {
    Icon: Code2,
    title: 'No templates',
    desc: 'Every project is coded from scratch — no page builders, WordPress themes, or cookie-cutter solutions.',
  },
  {
    Icon: Shield,
    title: 'You own everything',
    desc: 'Full source code handover on delivery. Your project, your IP — zero lock-in to me or any platform.',
  },
  {
    Icon: Smartphone,
    title: 'Mobile first',
    desc: 'Designed and tested on real devices. Looks great and performs well on every screen size.',
  },
  {
    Icon: Search,
    title: 'SEO ready',
    desc: 'Semantic HTML, structured data, sitemaps, fast rendering — built for search engines from day one.',
  },
  {
    Icon: Zap,
    title: 'Clear timelines',
    desc: 'Agreed delivery dates, no endless back-and-forth. You always know exactly where the project stands.',
  },
  {
    Icon: HeartHandshake,
    title: 'Always improving',
    desc: 'Your site is never "done". Every month brings updates, improvements, and new features as your business grows.',
  },
];

const steps = [
  {
    num: '01',
    title: 'Get in touch',
    desc: 'Send me a message with your idea, goals, and rough budget. No lengthy forms — just tell me what you need.',
  },
  {
    num: '02',
    title: 'Receive a proposal',
    desc: "I'll send a clear scope document with a fixed price and delivery timeline before any work begins. No surprises.",
  },
  {
    num: '03',
    title: 'Build & review',
    desc: "I build with regular check-ins at agreed milestones. You review, give feedback, and we iterate together.",
  },
  {
    num: '04',
    title: 'Launch',
    desc: 'I handle deployment, DNS, and final QA checks. You go live owning the code and everything it runs on.',
  },
];

const faqs = [
  {
    q: "What's included in the base price?",
    a: "The base price covers the core scope listed in each plan — design, development, SEO basics, and handover. Add-ons like extra pages beyond the included count, advanced animations, multi-language support, or specific third-party integrations are quoted as line items before work starts.",
  },
  {
    q: 'What does the monthly fee cover?',
    a: "The monthly fee covers your website in full — hosting, ongoing development, and continuous improvements. Every month your site gets updated: new content, feature additions, design tweaks, performance tuning, and anything else that keeps it sharp. You're not paying for a finished product that sits still — you're paying for a website that keeps getting better.",
  },
  {
    q: 'How long does a typical project take?',
    a: 'A static website usually takes 1–2 weeks from kickoff to launch. eCommerce projects range from 2–4 weeks depending on inventory size and integrations. Custom projects are scoped individually — a realistic timeline is always agreed before work begins.',
  },
  {
    q: 'How many revisions are included?',
    a: 'Static plans include 3 rounds; eCommerce includes 5. A "round" means a single batch of collected feedback reviewed together — not individual back-and-forth changes. Additional rounds beyond what\'s included are billed at an hourly rate agreed upfront.',
  },
  {
    q: 'What if my requirements grow mid-project?',
    a: "Scope changes happen and that's completely fine. I'll flag anything outside the agreed scope early and send a revised quote before continuing. You'll never receive an unexpected invoice — everything is agreed in writing first.",
  },
  {
    q: 'Can I pay in installments?',
    a: "Yes. Projects are typically split 50% upfront to begin and 50% on delivery. For longer custom engagements we can agree on a milestone-based payment schedule. Accepted: bank transfer, PayPal, or Stripe.",
  },
];

// ─── Page Component ──────────────────────────────────────────────────────────

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <SEO
        title="Web Development Pricing – From $199/month"
        description="Monthly plans for custom websites and web apps. Static sites from $199/month, eCommerce from $300/month. Ongoing updates included — your site keeps improving every month."
        path="/pricing"
      />

      {/* ── Hero ──────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroBg} aria-hidden="true" />
        <div className={styles.container}>
          <motion.div
            className={styles.heroContent}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          >
            <span className={styles.kicker}>Pricing</span>
            <h1 className={styles.heroTitle}>
              Simple, transparent
              <br />
              <span className={styles.gradient}>pricing.</span>
            </h1>
            <p className={styles.heroLead}>
              Monthly plans, no hidden fees. Your website is custom-built and continuously
              updated — it grows with your business, not just sits there after launch.
            </p>
            <div className={styles.heroActions}>
              <a href="#plans" className="button">
                <span>View plans</span>
              </a>
              <a href="#contact" className="button secondary">
                <span>Get a quote</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Plans ─────────────────────────────────────────── */}
      <section className={styles.plans} id="plans">
        <div className={styles.container}>
          <div className={styles.plansGrid}>
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                className={`${styles.card} ${plan.featured ? styles.featured : ''}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              >
                <div className={styles.cardHead}>
                  <h3 className={styles.planName}>{plan.name}</h3>
                  <span className={styles.price}>{plan.price}</span>
                  <span className={styles.priceNote}>{plan.priceNote}</span>
                  <p className={styles.planDesc}>{plan.description}</p>
                </div>

                <div className={styles.sep} />

                <ul className={styles.featureList}>
                  {plan.features.map((f) => (
                    <li key={f}>
                      <Check size={15} className={styles.checkIcon} />
                      {f}
                    </li>
                  ))}
                </ul>

                <a href={plan.ctaHref} className={`button${plan.featured ? '' : ' secondary'} ${styles.cardCta}`}>
                  <span>{plan.cta}</span>
                </a>
              </motion.div>
            ))}
          </div>

          <p className={styles.plansNote}>
            All prices are monthly and include ongoing updates. Final rate depends on scope and complexity.
            Not sure which fits? <a href="#contact" className="link-underline">Drop me a message</a> and we&apos;ll figure it out.
          </p>
        </div>
      </section>

      {/* ── What's Always Included ────────────────────────── */}
      <section className={styles.guarantees}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.kicker}>Every project</span>
            <h2>What&apos;s always included</h2>
            <p className={styles.sectionLead}>
              Regardless of which plan you choose, these are non-negotiables on every project I take on.
            </p>
          </div>
          <div className={styles.guaranteesGrid}>
            {guarantees.map(({ Icon, title, desc }, i) => (
              <motion.div
                key={title}
                className={styles.guaranteeCard}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              >
                <div className={styles.guaranteeIcon}>
                  <Icon size={24} />
                </div>
                <p className={styles.guaranteeTitle}>{title}</p>
                <p className={styles.guaranteeDesc}>{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ───────────────────────────────────────── */}
      <section className={styles.process}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.kicker}>How it works</span>
            <h2>From idea to launch</h2>
            <p className={styles.sectionLead}>
              A straightforward four-step process so you always know where things stand.
            </p>
          </div>
          <div className={styles.stepsGrid}>
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                className={styles.step}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              >
                <span className={styles.stepNum}>{step.num}</span>
                <p className={styles.stepTitle}>{step.title}</p>
                <p className={styles.stepDesc}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────── */}
      <section className={styles.faq}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.kicker}>FAQ</span>
            <h2>Common questions</h2>
            <p className={styles.sectionLead}>
              Everything you need to know before getting started.
            </p>
          </div>
          <div className={styles.faqList}>
            {faqs.map((item, i) => (
              <div key={i} className={styles.faqItem}>
                <button
                  className={styles.faqQuestion}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  <span>{item.q}</span>
                  <ChevronDown
                    size={20}
                    className={`${styles.chevron} ${openFaq === i ? styles.chevronOpen : ''}`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <p className={styles.faqAnswer}>{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ───────────────────────────────────────── */}
      <Contact />
    </>
  );
}
