'use client';

import { motion } from 'framer-motion';
import styles from './Hero.module.css';

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13 } },
};

const item = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease } },
};

export default function Hero() {
  return (
    <section className={styles.hero}>
      <motion.div
        className={styles.container}
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <motion.span className={styles.kicker} variants={item}>
          Full-Stack Developer · Next.js · SEO
        </motion.span>

        <motion.h1 variants={item}>Erik Scheinpflug</motion.h1>

        <motion.div className={styles.textWrapper} variants={item}>
          <p>
            I build modern web applications with React and Next.js, focused on performance,
            scalability, and long-term code maintainability.
          </p>

          <p>
            Every project is designed strategically — with emphasis on clean architecture,
            speed optimization, and maximum technical quality.
          </p>
        </motion.div>

        <motion.div className={styles.ctaGroup} variants={item}>
          <a href="#contact" className="button">
            Book a consultation
          </a>

          <a href="/projects" className="button secondary">
            View my work
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
