import styles from './AboutPhilosophy.module.css';

export default function AboutPhilosophy() {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.wrap}`}>
        <div className={styles.heading}>
          <h2>Naše Filozofie</h2>
          <h3>Co Dělá Naše Instalace Výjimečnými</h3>
          <p>
            Spojujeme řemeslnou preciznost, moderní technologie a estetiku — výsledkem je hvězdná obloha,
            která přináší do interiérů nádech luxusu a klidu.
          </p>
        </div>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h4>Precizní Detaily</h4>
            <p>
              Každá hvězda je umístěna ručně s důrazem na rytmus, trajektorii a přirozený kontrast světla.
            </p>
          </div>
          <div className={styles.card}>
            <h4>Luxusní Materiály</h4>
            <p>
              Používáme nejkvalitnější optická vlákna a komponenty s dlouhou životností a bezúdržbovým provozem.
            </p>
          </div>
          <div className={styles.card}>
            <h4>Individuální Přístup</h4>
            <p>
              Každý projekt je jedinečný — přizpůsobujeme hustotu hvězd, barvy a efekty dle vašeho prostoru.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}