// components/sections/Projects.tsx
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import styles from './Projects.module.css';

export default function Projects() {
  return (
    <section className={styles.projects} id="projects">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.kicker}>PROJECTS</span>
          <h2>Selected work</h2>
          <p className={styles.lead}>
            Real client results built with performance, SEO and clean code in mind.
          </p>
        </div>

        <motion.a
          href="https://nocninebe.eu/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.cardLink}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.02 }}
        >
          <div className={styles.card}>
            <div className={styles.imageWrapper}>
              <Image
                src="images/projects/nocni-nebe-project.webp"
                alt="Nocni Nebe – optical fiber ambient lighting for car interiors"
                fill
                sizes="(max-width: 768px) 100vw, 100vw"
                quality={85}
                className={styles.image}
                priority
              />
              <div className={styles.hoverOverlay}>
                <ArrowUpRight size={36} className={styles.externalIcon} />
              </div>
            </div>

            <div className={styles.textContent}>
              <h3 className={styles.title}>Nocni Nebe</h3>
              <p className={styles.description}>
                Custom optical cable system for spectacular ambient lighting inside cars — modern brochure website built on Next.js, fast loading, perfectly optimized for SEO and conversions.
              </p>
            </div>
          </div>
        </motion.a>
      </div>
    </section>
  );
}