import { motion } from 'framer-motion';
import styles from './Experience.module.css';

export default function Experience() {
  return (
    <section className={styles.experience} id="experience">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.kicker}>EXPERIENCE</span>
          <h2>Where I make the biggest impact</h2>
          <p className={styles.lead}>
            Over 2+ years as the SEO &amp; WordPress backbone of a fast-growing digital agency
          </p>
        </div>

        <motion.div
          className={styles.card}
        >
          <div className={styles.meta}>
            <h3 className={styles.role}>Full-Stack &amp; SEO Lead Developer</h3>
            <div className={styles.companyInfo}>
              <span className={styles.company}><a className="link-underline" href="https://nextdigitalagency.com" target='_blank'>NEXT Digital Agency</a></span>
              <span className={styles.period}>• 2023 – Present (2+ years)</span>
            </div>
            <span className={styles.location}>
              Remote • Mladá Boleslav, Czech Republic
            </span>
          </div>

          <ul className={styles.description}>
            <li>Technical backbone of the entire agency — responsible for architecture, performance, and successful delivery of all major client projects.</li>
            <li>Lead WordPress &amp; Magento 2 developer: building and maintaining custom themes, plugins, and high-performance e-commerce &amp; corporate websites scoring 95–100 on Lighthouse.</li>
            <li>SEO specialist driving real growth: Technical SEO, Core Web Vitals optimization, schema markup, and content strategy that boosted organic traffic by 80–300% for key clients.</li>
            <li>Full-stack development with modern stack (Next.js, TypeScript, Supabase, Prisma) for custom internal tools and client SaaS products.</li>
            <li>Mentor junior developers, collaborate closely with designers and project managers, and ensure every project is fast, scalable, secure, and SEO-optimized.</li>
          </ul>

          {/* New button */}
          <a href="https://nextdigitalagency.com/our-work/" target="_blank" className="button">
            View NEXT Digital Agency Projects →
          </a>
        </motion.div>
      </div>
    </section>
  );
}