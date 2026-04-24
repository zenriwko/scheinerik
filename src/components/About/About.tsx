import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from './About.module.css';

export default function About() {
  return (
    <section className={styles.about} id="about">
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Left column – text */}
          <motion.div
            className={styles.content}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          >
            <span className={styles.kicker}>ABOUT ME</span>
            <h2>
              Tampa website developer — <span className={styles.gradient}>fast, custom, and built to rank</span>
            </h2>

            <div className={styles.text}>
              <p>
                Hi, I’m Erik — a website developer serving businesses in Tampa, FL and across the US. I build fast, custom websites and web apps using Next.js and TypeScript, with no templates and no bloat.
              </p>
              <p>
                I care deeply about <strong>performance</strong>, <strong>SEO</strong>, and <strong>long-term results</strong>. Every site I build scores 95+ on Lighthouse and is structured to rank — from day one.
              </p>
              <p>
                Working directly with Tampa businesses and US clients worldwide — no agency layer, no account managers. Just clean, fast websites that convert.
              </p>
            </div>

            <div className={styles.cta}>
              <a href="#contact" className="button">
                Let’s build something together
              </a>
            </div>
          </motion.div>

          {/* Right column – image / visual */}
          <motion.div
            className={styles.imageWrapper}
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          >
            <div className={styles.imageFrame}>
              <Image
                src="/images/portrait.webp"
                alt="Erik Scheinpflug – Full-Stack Developer"
                className={styles.image}
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 45vw, 480px"
                width={480}          // ← placeholder / intrinsic width of your image
                height={600}
              />
            </div>

            {/* Optional floating badge / accent */}
            <div className={styles.badge}>
              <span>Available for freelance</span>
              <div className={styles.pulse} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}