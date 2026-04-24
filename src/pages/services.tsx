import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Layers, ShoppingCart, Puzzle, Gauge, Search, Lightbulb,
  MessageCircle, Zap, TrendingUp, Code2, BadgeCheck, Shield,
  ChevronDown, ArrowRight,
} from 'lucide-react';
import SEO from '@/components/%SEO/SEO';
import Contact from '@/components/Contact/Contact';
import styles from './services.module.css';

// ─── Services data ───────────────────────────────────────────────────────────

const services = [
  {
    id: 'nextjs-react',
    Icon: Layers,
    title: 'Next.js & React Applications',
    description:
      'Full-stack modern web applications built with Next.js and React — from high-converting marketing sites to complex, data-driven SaaS dashboards. I work with the App Router, React Server Components, TypeScript, and production-grade deployment pipelines to ship code that is fast, maintainable, and built to scale.',
    tech: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Prisma', 'Supabase', 'PostgreSQL', 'Vercel'],
    useCases: [
      'SaaS applications & user dashboards',
      'Corporate & marketing websites',
      'Internal tools & admin portals',
      'Blogs, content & documentation platforms',
    ],
  },
  {
    id: 'ecommerce',
    Icon: ShoppingCart,
    title: 'eCommerce Solutions',
    description:
      'Custom online stores engineered to convert — whether it\'s a Shopify-powered storefront, a WooCommerce setup, or a fully headless custom store. I focus on the details that directly impact revenue: fast load times, a clean checkout flow, polished mobile UX, and rock-solid payment integration from day one.',
    tech: ['Next.js', 'Shopify', 'WooCommerce', 'Stripe', 'PayPal', 'Supabase', 'Cloudflare'],
    useCases: [
      'Physical & digital product stores',
      'Subscription & membership platforms',
      'B2B ordering & wholesale portals',
      'Headless commerce with custom UI',
    ],
  },
  {
    id: 'integrations',
    Icon: Puzzle,
    title: 'Custom Integrations & APIs',
    description:
      'Connect your product to any external service — CRMs, payment gateways, analytics platforms, email tools, data pipelines, and beyond. I build clean, type-safe API layers that are straightforward to test, maintain, and extend as your requirements grow.',
    tech: ['REST', 'GraphQL', 'tRPC', 'Stripe', 'Supabase', 'Airtable', 'Resend', 'Webhooks'],
    useCases: [
      'CRM & ERP connections',
      'Payment & billing automation',
      'Email & notification pipelines',
      'Data sync & third-party API bridges',
    ],
  },
  {
    id: 'performance',
    Icon: Gauge,
    title: 'Performance & Technical Optimisation',
    description:
      'Slow sites lose rankings and customers. I audit your codebase, identify the bottlenecks, and fix them — from image handling and JavaScript bundles to server response times, caching strategy, and Core Web Vitals across every page type.',
    tech: ['Lighthouse', 'WebPageTest', 'Next.js Image', 'CDN', 'Bundle Analysis', 'Caching'],
    useCases: [
      'Core Web Vitals & Lighthouse improvements',
      'Full-site speed audits & remediation',
      'Image & asset pipeline optimisation',
      'SSR migration from legacy SPAs',
    ],
  },
  {
    id: 'seo',
    Icon: Search,
    title: 'SEO Optimisation',
    description:
      'Technical SEO that earns rankings — not keyword stuffing, but the foundational work that search engines actually reward: structured data, semantic HTML, server-side rendering for full crawlability, properly optimised meta, clean URL architecture, and fast page delivery.',
    tech: ['Schema.org', 'Next.js SSR/SSG', 'Google Search Console', 'Sitemap', 'robots.txt', 'OpenGraph'],
    useCases: [
      'Technical SEO audits & fixes',
      'New builds optimised from day one',
      'eCommerce product & category SEO',
      'Site migrations without ranking drops',
    ],
  },
  {
    id: 'consulting',
    Icon: Lightbulb,
    title: 'Consulting & Strategy',
    description:
      'Before you commit to a build, it\'s worth talking to someone who\'s shipped it before. I offer technical consultations, architecture reviews, stack decisions, and migration planning — giving you a clear, honest path forward before a single line of code is written.',
    tech: ['Architecture Planning', 'Code Reviews', 'Stack Evaluation', 'Documentation', 'Roadmapping'],
    useCases: [
      'Architecture & tech stack decisions',
      'Legacy-to-modern migration planning',
      'Pre-build scoping & roadmapping',
      'Code reviews & technical audits',
    ],
  },
];

// ─── Why work with me ────────────────────────────────────────────────────────

const reasons = [
  {
    Icon: MessageCircle,
    title: 'Direct line to the developer',
    desc: 'No account managers, no junior devs. You work directly with me from brief to delivery — faster feedback, fewer misunderstandings.',
  },
  {
    Icon: Zap,
    title: 'Performance is the baseline',
    desc: 'Every project targets Lighthouse 95+. Speed isn\'t a checkbox or an upsell — it\'s baked into how I build by default.',
  },
  {
    Icon: TrendingUp,
    title: 'SEO from the first commit',
    desc: 'Structured data, semantic HTML, and server-side rendering are part of the process on every project — not an add-on after the fact.',
  },
  {
    Icon: Code2,
    title: 'Clean, readable code',
    desc: 'The handover is clean enough for you or your team to maintain, extend, or revisit years later. No spaghetti, no dead code.',
  },
  {
    Icon: BadgeCheck,
    title: 'Fixed price, no surprises',
    desc: 'You agree a price before work starts. If scope changes, I flag it and re-quote before continuing. No unexpected invoices.',
  },
  {
    Icon: Shield,
    title: 'Full ownership on delivery',
    desc: 'Complete source code handover. No platform lock-in, no ongoing dependency on me unless you choose it.',
  },
];

// ─── FAQ ─────────────────────────────────────────────────────────────────────

const faqs = [
  {
    q: 'What technologies do you primarily work with?',
    a: 'My primary stack is Next.js, React, TypeScript, Tailwind CSS, Supabase/PostgreSQL, and Prisma — deployed on Vercel or Cloudflare. For clients who need it I also work with WordPress and WooCommerce. On codebase projects I adapt to what\'s already in place rather than forcing a rewrite.',
  },
  {
    q: 'Do you handle design as well as development?',
    a: "I build to a design or design brief you provide. If you don't have a designer, I can work from a reference site or mood board — my projects have a consistent visual direction informed by strong layout and typography principles. For projects needing a full brand identity or complex UI system, I'll recommend collaborating with a specialist designer.",
  },
  {
    q: 'Can you work on an existing codebase?',
    a: "Yes. I regularly step into existing projects for performance improvements, new features, or full rewrites. I'll start with a codebase audit to understand what's there before quoting or starting work — no assumptions.",
  },
  {
    q: 'Do you offer ongoing maintenance after launch?',
    a: "Yes. Some clients prefer a monthly retainer for regular updates, feature additions, and maintenance. Others prefer a clean handover and manage things themselves. Both are fine — I'll document the codebase clearly either way so you're never stuck.",
  },
  {
    q: 'What size projects do you typically take on?',
    a: "I work across a wide range — from a $250 single-page site to multi-month custom SaaS builds. The common thread is focused projects where quality matters. If your project genuinely needs a full agency team, I'll tell you that honestly rather than over-promise and under-deliver.",
  },
  {
    q: 'Do you work with clients in Tampa, FL and the US?',
    a: "Yes — I work fully remote and serve clients in Tampa, FL, across the US, and internationally. I'm comfortable with US time zones, communicate in English, and accept payments in USD. Being remote means you get a senior developer without the local agency markup.",
  },
];

// ─── Component ───────────────────────────────────────────────────────────────

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

export default function ServicesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <SEO
        title="Website Development Services Tampa FL – Next.js & eCommerce"
        description="Custom website development services in Tampa, FL — Next.js, eCommerce, performance optimisation, and technical SEO. Fast, clean, and built to rank from day one."
        path="/services"
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
            <span className={styles.kicker}>Services</span>
            <h1 className={styles.heroTitle}>
              Tampa website development,
              <br />
              <span className={styles.gradient}>built to convert.</span>
            </h1>
            <p className={styles.heroLead}>
              Serving businesses in Tampa, FL and across the US. Clean code, Lighthouse 95+, SEO from day one — no templates, no bloat, just a site that works as hard as your business.
            </p>
            <div className={styles.heroActions}>
              <a href="#contact" className="button">
                <span>Start a project</span>
              </a>
              <Link href="/pricing" className="button secondary">
                <span>See pricing</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Services ──────────────────────────────────────── */}
      <section className={styles.services} id="services-list">
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.kicker}>What I build</span>
            <h2>Six areas of expertise</h2>
            <p className={styles.sectionLead}>
              Every service below is something I deliver end-to-end — design to deployment,
              with no handoffs to someone less experienced.
            </p>
          </div>

          <div className={styles.servicesGrid}>
            {services.map((svc, i) => (
              <motion.div
                key={svc.id}
                id={svc.id}
                className={styles.serviceCard}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                variants={cardVariants}
              >
                {/* Icon + Title */}
                <div className={styles.cardHeader}>
                  <div className={styles.iconWrap}>
                    <svc.Icon size={26} />
                  </div>
                  <h3 className={styles.cardTitle}>{svc.title}</h3>
                </div>

                {/* Description */}
                <p className={styles.cardDesc}>{svc.description}</p>

                {/* Tech pills */}
                <div className={styles.techRow}>
                  {svc.tech.map((t) => (
                    <span key={t} className={styles.pill}>{t}</span>
                  ))}
                </div>

                <div className={styles.sep} />

                {/* Use cases */}
                <ul className={styles.useCases}>
                  {svc.useCases.map((uc) => (
                    <li key={uc}>
                      <ArrowRight size={14} className={styles.arrowIcon} />
                      {uc}
                    </li>
                  ))}
                </ul>

                {/* Card CTA */}
                <a href="#contact" className={styles.cardCta}>
                  Discuss this project <ArrowRight size={15} />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why work with me ──────────────────────────────── */}
      <section className={styles.reasons}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.kicker}>Why me</span>
            <h2>What makes working with me different</h2>
            <p className={styles.sectionLead}>
              Not an agency, not a freelance marketplace profile. A single, accountable developer
              who cares about long-term quality over short-term output.
            </p>
          </div>

          <div className={styles.reasonsGrid}>
            {reasons.map(({ Icon, title, desc }, i) => (
              <motion.div
                key={title}
                className={styles.reasonCard}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              >
                <div className={styles.reasonIcon}>
                  <Icon size={22} />
                </div>
                <p className={styles.reasonTitle}>{title}</p>
                <p className={styles.reasonDesc}>{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA strip ─────────────────────────────────────── */}
      <section className={styles.ctaStrip}>
        <div className={styles.container}>
          <motion.div
            className={styles.ctaBox}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          >
            <p className={styles.ctaEyebrow}>Ready when you are</p>
            <h2 className={styles.ctaHeading}>
              Have a project in mind?
              <br />
              <span className={styles.gradient}>Let&apos;s build it.</span>
            </h2>
            <p className={styles.ctaLead}>
              Tell me what you&apos;re trying to build. I&apos;ll come back with a clear proposal, timeline, and fixed price — no obligation.
            </p>
            <div className={styles.ctaActions}>
              <a href="#contact" className="button">
                <span>Get in touch</span>
              </a>
              <Link href="/pricing" className="button secondary">
                <span>View pricing</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────── */}
      <section className={styles.faq}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.kicker}>FAQ</span>
            <h2>Questions about working together</h2>
            <p className={styles.sectionLead}>
              Anything not covered here? <a href="#contact" className="link-underline">Just ask.</a>
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
