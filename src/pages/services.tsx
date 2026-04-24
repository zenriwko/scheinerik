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

// --- Services data ---

const services = [
  {
    id: 'nextjs-react',
    Icon: Layers,
    title: 'Next.js and React Applications',
    description:
      'Full-stack modern web apps built with Next.js and React. From high-converting marketing sites to complex SaaS dashboards, I use the App Router, React Server Components, TypeScript, and solid deployment pipelines to ship code that is fast, maintainable, and ready to grow.',
    tech: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Prisma', 'Supabase', 'PostgreSQL', 'Vercel'],
    useCases: [
      'SaaS applications and user dashboards',
      'Corporate and marketing websites',
      'Internal tools and admin portals',
      'Blogs, content, and documentation platforms',
    ],
  },
  {
    id: 'ecommerce',
    Icon: ShoppingCart,
    title: 'eCommerce Solutions',
    description:
      'Custom online stores built to convert. Shopify, WooCommerce, or a fully custom store: I focus on the things that drive revenue. Fast load times, a smooth checkout, great mobile UX, and solid payment integration from day one.',
    tech: ['Next.js', 'Shopify', 'WooCommerce', 'Stripe', 'PayPal', 'Supabase', 'Cloudflare'],
    useCases: [
      'Physical and digital product stores',
      'Subscription and membership platforms',
      'B2B ordering and wholesale portals',
      'Headless commerce with custom UI',
    ],
  },
  {
    id: 'integrations',
    Icon: Puzzle,
    title: 'Custom Integrations and APIs',
    description:
      'Connect your product to any external service. CRMs, payment gateways, analytics, email tools, data pipelines, and more. I build clean, type-safe API layers that are easy to test, maintain, and grow with your needs.',
    tech: ['REST', 'GraphQL', 'tRPC', 'Stripe', 'Supabase', 'Airtable', 'Resend', 'Webhooks'],
    useCases: [
      'CRM and ERP connections',
      'Payment and billing automation',
      'Email and notification pipelines',
      'Data sync and third-party API bridges',
    ],
  },
  {
    id: 'performance',
    Icon: Gauge,
    title: 'Performance and Technical Optimization',
    description:
      'Slow sites lose rankings and customers. I audit your codebase, find the bottlenecks, and fix them. That includes image handling, JavaScript bundles, server response times, caching, and Core Web Vitals on every page.',
    tech: ['Lighthouse', 'WebPageTest', 'Next.js Image', 'CDN', 'Bundle Analysis', 'Caching'],
    useCases: [
      'Core Web Vitals and Lighthouse improvements',
      'Full-site speed audits and fixes',
      'Image and asset pipeline optimization',
      'SSR migration from legacy SPAs',
    ],
  },
  {
    id: 'seo',
    Icon: Search,
    title: 'SEO Optimization',
    description:
      'Technical SEO that earns real rankings. Not keyword stuffing. The foundational work search engines actually reward: structured data, semantic HTML, server-side rendering, clean URLs, optimized meta tags, and fast page delivery.',
    tech: ['Schema.org', 'Next.js SSR/SSG', 'Google Search Console', 'Sitemap', 'robots.txt', 'OpenGraph'],
    useCases: [
      'Technical SEO audits and fixes',
      'New builds optimized from day one',
      'eCommerce product and category SEO',
      'Site migrations without ranking drops',
    ],
  },
  {
    id: 'consulting',
    Icon: Lightbulb,
    title: 'Consulting and Strategy',
    description:
      'Before you commit to a build, talk to someone who has shipped it before. I offer technical consultations, architecture reviews, stack decisions, and migration planning. You get a clear, honest path forward before any code is written.',
    tech: ['Architecture Planning', 'Code Reviews', 'Stack Evaluation', 'Documentation', 'Roadmapping'],
    useCases: [
      'Architecture and tech stack decisions',
      'Legacy-to-modern migration planning',
      'Pre-build scoping and roadmapping',
      'Code reviews and technical audits',
    ],
  },
];

// --- Why work with me ---

const reasons = [
  {
    Icon: MessageCircle,
    title: 'Direct line to the developer',
    desc: 'No account managers, no junior devs. You work directly with me from start to finish. Faster feedback and fewer misunderstandings.',
  },
  {
    Icon: Zap,
    title: 'Performance is the baseline',
    desc: 'Every project targets Lighthouse 95+. Speed is not a checkbox or an upsell. It is built into how I work by default.',
  },
  {
    Icon: TrendingUp,
    title: 'SEO from the first commit',
    desc: 'Structured data, semantic HTML, and server-side rendering are part of every project. Not an add-on after the fact.',
  },
  {
    Icon: Code2,
    title: 'Clean, readable code',
    desc: 'The handover is clean enough for you or your team to maintain, update, or revisit years later. No messy code, no dead ends.',
  },
  {
    Icon: BadgeCheck,
    title: 'Fixed price, no surprises',
    desc: 'You agree on a price before work starts. If scope changes, I will flag it and re-quote before continuing. No surprise invoices.',
  },
  {
    Icon: Shield,
    title: 'Full ownership on delivery',
    desc: 'Complete source code handover. No platform lock-in, no ongoing dependency on me unless you choose it.',
  },
];

// --- FAQ ---

const faqs = [
  {
    q: 'What technologies do you primarily work with?',
    a: 'My main stack is Next.js, React, TypeScript, Tailwind CSS, Supabase, PostgreSQL, and Prisma, deployed on Vercel or Cloudflare. I also work with WordPress and WooCommerce when needed. On existing codebases, I adapt to what is already there rather than forcing a rewrite.',
  },
  {
    q: 'Do you handle design as well as development?',
    a: "I build from a design or design brief you provide. If you do not have a designer, I can work from a reference site or mood board. My projects have a consistent visual direction with strong layouts and typography. For full brand identities or complex UI systems, I will recommend a specialist designer.",
  },
  {
    q: 'Can you work on an existing codebase?',
    a: "Yes. I regularly work on existing projects for performance improvements, new features, or full rewrites. I start with a codebase review to understand what is there before quoting. No assumptions.",
  },
  {
    q: 'Do you offer ongoing maintenance after launch?',
    a: "Yes. Some clients prefer a monthly retainer for updates, new features, and maintenance. Others prefer a clean handover and manage things on their own. Both work. I will document the codebase clearly either way so you are never stuck.",
  },
  {
    q: 'What size projects do you typically take on?',
    a: "I work on all sizes, from a single-page site to multi-month custom SaaS builds. The common thread is focused projects where quality matters. If your project genuinely needs a full agency, I will tell you honestly rather than overpromise.",
  },
  {
    q: 'Do you work with clients in Tampa, FL and the US?',
    a: "Yes. I work fully remote and serve clients in Tampa, FL, across the US, and internationally. I am comfortable with US time zones, communicate in English, and accept payments in USD. Being remote means you get a senior developer without the local agency markup.",
  },
];

// --- Component ---

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
        title="Website Development Services Tampa FL – Next.js and eCommerce"
        description="Custom website development services in Tampa, FL. Next.js, eCommerce, performance optimization, and technical SEO. Fast, clean, and built to rank from day one."
        path="/services"
      />

      {/* Hero */}
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
              Serving businesses in Tampa, FL and across the US. Clean code, Lighthouse 95+, SEO from day one. No templates, no bloat. Just a site that works as hard as your business.
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

      {/* Services */}
      <section className={styles.services} id="services-list">
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.kicker}>What I build</span>
            <h2>Six areas of expertise</h2>
            <p className={styles.sectionLead}>
              Every service below is something I deliver end-to-end, from design to deployment,
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
                <div className={styles.cardHeader}>
                  <div className={styles.iconWrap}>
                    <svc.Icon size={26} />
                  </div>
                  <h3 className={styles.cardTitle}>{svc.title}</h3>
                </div>

                <p className={styles.cardDesc}>{svc.description}</p>

                <div className={styles.techRow}>
                  {svc.tech.map((t) => (
                    <span key={t} className={styles.pill}>{t}</span>
                  ))}
                </div>

                <div className={styles.sep} />

                <ul className={styles.useCases}>
                  {svc.useCases.map((uc) => (
                    <li key={uc}>
                      <ArrowRight size={14} className={styles.arrowIcon} />
                      {uc}
                    </li>
                  ))}
                </ul>

                <a href="#contact" className={styles.cardCta}>
                  Discuss this project <ArrowRight size={15} />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why work with me */}
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

      {/* CTA strip */}
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
              Tell me what you&apos;re trying to build. I will get back to you with a clear proposal, timeline, and fixed price. No obligation.
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

      {/* FAQ */}
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

      {/* Contact */}
      <Contact />
    </>
  );
}
