import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={`container ${styles.heroWrap}`}>
        <span className={styles.kicker}>Optická vlákna • ČR &amp; EU</span>
        <h1>Noční Nebe</h1>
        <p className={styles.sub}>
          Od roku 2018 vytváříme realistické hvězdné nebe do interiérů automobilů pomocí precizně instalovaných optických vláken.
        </p>
          
        <p className={styles.sub}>
          Každý projekt je navržen individuálně s důrazem na čistý design, dlouhou životnost a dokonalý vizuální efekt.
        </p>
        <div className={styles.actions}>
          <a href="/nase-prace/" className={`button`}>
            <span>Naše práce</span>
          </a>
          <a href="/kontakt/" className={`button ghost`}>
            <span>Napište nám</span>
          </a>
        </div>
      </div>
    </section>
  );
}
