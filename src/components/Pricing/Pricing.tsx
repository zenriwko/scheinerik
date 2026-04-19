'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import styles from './Pricing.module.css';

const checkIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const plans = [
  {
    name: 'Static Website',
    price: '$250',
    priceNote: 'base price',
    description: 'A custom, branded website built for speed and search engine visibility — ideal for portfolios, landing pages, and small businesses.',
    features: [
      'Custom branded design',
      'Fully SEO optimized',
      'Mobile & responsive',
      'Lighthouse 95+ performance',
      'Contact form integration',
      'Core Web Vitals ready',
    ],
    cta: 'Get Started',
    ctaHref: '/#contact',
    featured: false,
  },
  {
    name: 'eCommerce',
    price: 'From $300',
    priceNote: 'depends on inventory & features',
    description: 'A full online store with product catalog, checkout, and payments — price scales with the size of your inventory and integrations needed.',
    features: [
      'Everything in Static',
      'Product catalog & variants',
      'Shopping cart & checkout',
      'Payment gateway integration',
      'Inventory management',
      'Order & customer dashboard',
    ],
    cta: 'Get Started',
    ctaHref: '/#contact',
    featured: true,
    badge: 'Most Popular',
  },
  {
    name: 'Custom Project',
    price: 'Let\'s talk',
    priceNote: 'quote based on scope',
    description: 'Web apps, internal tools, API integrations, dashboards, or anything outside the boxes above — reach out and I\'ll put together a tailored proposal.',
    features: [
      'Web applications & tools',
      'Custom dashboards & portals',
      'API & third-party integrations',
      'SaaS & subscription platforms',
      'Complex data workflows',
      'Ongoing retainer available',
    ],
    cta: 'Get a Quote',
    ctaHref: '/#contact',
    featured: false,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

export default function Pricing() {
  return (
    <section className={styles.pricing} id="pricing">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.kicker}>Pricing</span>
          <h2>Simple, transparent pricing</h2>
          <p className={styles.lead}>
            Fixed base prices, no hidden fees. Every project is custom-built — so the final price reflects your exact needs.
          </p>
        </div>

        <div className={styles.grid}>
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              className={`${styles.card} ${plan.featured ? styles.featured : ''}`}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={cardVariants}
            >
              {plan.badge && (
                <span className={styles.badge}>{plan.badge}</span>
              )}

              <div className={styles.cardTop}>
                <h3 className={styles.planName}>{plan.name}</h3>
                <div className={styles.priceRow}>
                  <span className={styles.price}>{plan.price}</span>
                </div>
                <span className={styles.priceNote}>{plan.priceNote}</span>
                <p className={styles.description}>{plan.description}</p>
              </div>

              <div className={styles.divider} />

              <ul className={styles.features}>
                {plan.features.map((feature) => (
                  <li key={feature}>
                    <span className={styles.check}>{checkIcon}</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href={plan.ctaHref}
                className={`button${plan.featured ? '' : ' secondary'}`}
              >
                <span>{plan.cta}</span>
              </Link>
            </motion.div>
          ))}
        </div>

        <p className={styles.note}>
          All prices are starting points — final cost depends on scope, complexity, and timeline. Not sure which fits?{' '}
          <Link href="/#contact" className="link-underline">Drop me a message</Link> and we'll figure it out together.
        </p>
      </div>
    </section>
  );
}
