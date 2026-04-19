import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import SEO from '@/components/%SEO/SEO';
import styles from './index.module.css';

const demos = [
  {
    slug: 'roofing',
    name: 'Peak Roofing Co.',
    type: 'Roofing Company',
    description:
      'A conversion-focused site for a local roofing business — services, trust signals, and a clear call to action built around getting quote requests.',
    accent: '#f97316',
    accentSoft: 'rgba(249, 115, 22, 0.14)',
  },
  {
    slug: 'remodeling',
    name: 'Craft Renovations',
    type: 'Remodeling Contractor',
    description:
      'A professional home renovation site showcasing kitchen, bathroom, and full-home remodeling with a warm, trustworthy aesthetic.',
    accent: '#d97706',
    accentSoft: 'rgba(217, 119, 6, 0.14)',
  },
  {
    slug: 'cleaning',
    name: 'SparkClean',
    type: 'Cleaning Service',
    description:
      'A modern cleaning service site with service tiers, same-day booking emphasis, and a clean, professional look that builds instant trust.',
    accent: '#06b6d4',
    accentSoft: 'rgba(6, 182, 212, 0.14)',
  },
];

export default function DemoIndexPage() {
  return (
    <>
      <SEO
        title="Demo Websites – Local Business Site Examples"
        description="Browse live demo websites built for local businesses — roofing, cleaning, remodeling, and more. See exactly what your site could look like before you commit."
        path="/demo"
      />

      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className={styles.heroBg} aria-hidden="true" />
        <div className={styles.container}>
          <motion.div
            className={styles.heroContent}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          >
            <span className={styles.kicker}>Demo Sites</span>
            <h1 className={styles.heroTitle}>
              See your site<br />before you commit.
            </h1>
            <p className={styles.heroLead}>
              Browse live demos for local businesses. Each one is a fully-built, standalone website —
              designed to convert, optimised for search, and ready to customise for your brand.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Demo grid ── */}
      <section className={styles.gridSection}>
        <div className={styles.container}>
          <div className={styles.grid}>
            {demos.map((demo, i) => (
              <motion.div
                key={demo.slug}
                className={styles.card}
                style={{ borderColor: `${demo.accent}22` } as any}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              >
                <div
                  className={styles.cardVisual}
                  style={{
                    background: `radial-gradient(ellipse 70% 60% at 50% 40%, ${demo.accentSoft} 0%, transparent 70%), #0c1420`,
                  }}
                >
                  <span className={styles.cardLetter} style={{ color: demo.accent }}>
                    {demo.name.charAt(0)}
                  </span>
                </div>
                <div className={styles.cardBody}>
                  <span className={styles.cardType}>{demo.type}</span>
                  <h2 className={styles.cardTitle}>{demo.name}</h2>
                  <p className={styles.cardDesc}>{demo.description}</p>
                  <Link
                    href={`/demo/${demo.slug}`}
                    className={styles.cardCta}
                    style={{ color: demo.accent }}
                  >
                    View demo <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p
            className={styles.bottomNote}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Like what you see?{' '}
            <Link href="/contact" className="link-underline">Get in touch</Link>
            {' '}to start your own.
          </motion.p>
        </div>
      </section>
    </>
  );
}
