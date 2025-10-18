import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={`container ${styles.heroWrap}`}>
        <span className={styles.kicker}>Optická vlákna • ČR &amp; EU</span>
        <h1>Noční Nebe</h1>
        <p className={styles.sub}>
          Luxusní hvězdná obloha z optických vláken – pro stropy a interiéry aut.
        </p>
        <div className={styles.actions}>
          <a href="#" className={`button`}>
            <span>Prohlédnout galerii</span>
          </a>
          <a href="#" className={`button ghost`}>
            <span>Domluvit konzultaci</span>
          </a>
        </div>
      </div>
    </section>
  );
}
