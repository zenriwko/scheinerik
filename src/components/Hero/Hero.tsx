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

        <motion.h1 variants={item}>Website Developer Tampa, FL</motion.h1>

        <motion.div className={styles.textWrapper} variants={item}>
          <p>
            I build fast, custom websites and web apps for businesses in Tampa, FL and across the US — using Next.js and React, focused on performance, SEO, and long-term results.
          </p>

          <p>
            No templates, no agencies. Direct, transparent, and built to rank — from a clean $199/month static site to a full eCommerce store.
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
