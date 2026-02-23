import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={`container ${styles.heroWrap}`}>
        <span className={styles.kicker}>eCommerce website development &amp;</span>
        <h1>Erik Scheinpflug</h1>
        <p className={styles.sub}>
          Vytvářím moderní webové aplikace v Reactu a Next.js zaměřené na výkon, škálovatelnost a dlouhodobou udržitelnost kódu.
        </p>

        <p className={styles.sub}>
          Každý projekt je navržen strategicky – s důrazem na čistou architekturu, optimalizaci rychlosti a maximální technickou kvalitu.
        </p>
      </div>
    </section>
  );
}
