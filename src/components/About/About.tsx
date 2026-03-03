import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from './About.module.css';

export default function About() {
  return (
    <section className={styles.about}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Left column – text */}
          <motion.div
            className={styles.content}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className={styles.kicker}>ABOUT ME</span>
            <h2>
              I build <span className={styles.gradient}>modern</span>, fast, and scalable web experiences
            </h2>

            <div className={styles.text}>
              <p>
                Hi, I’m Erik — a full-stack developer focused on creating clean, performant, and maintainable applications using Next.js, TypeScript, and modern tooling.
              </p>
              <p>
                I care deeply about <strong>developer experience</strong>, <strong>performance</strong>, and <strong>long-term code quality</strong>. Whether it's shipping fast prototypes or building production-grade systems that scale to thousands of users, I enjoy solving real problems with elegant solutions.
              </p>
              <p>
                Currently based in Manila, I work remotely with clients and teams worldwide — from startups to established products — helping turn ideas into reliable, user-loved software.
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
            transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
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