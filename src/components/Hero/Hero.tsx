import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <span className={styles.kicker}>
          eCommerce websites & modern web applications
        </span>

        <h1>Erik Scheinpflug</h1>

        <div className={styles.textWrapper}>
          <p>
            I build modern web applications with React and Next.js, focused on performance, 
            scalability, and long-term code maintainability.
          </p>

          <p>
            Every project is designed strategically — with emphasis on clean architecture, 
            speed optimization, and maximum technical quality.
          </p>
        </div>

        <div className={styles.ctaGroup}>
          <a href="#contact" className="button">
            Book a consultation
          </a>

          <a href="/projects" className="button secondary">
            View my work
          </a>
        </div>
      </div>
    </section>
  );
}