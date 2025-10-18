import styles from './Pricing.module.css';

export default function Pricing() {
  return (
    <section id="pricing" className={`section ${styles.pricingSection}`}>
      <div className="container">
        <h2 className="reveal">Rozpočty &amp; balíčky</h2>
        <p className={`lead reveal ${styles.intro}`}>
          Každý projekt je unikát. Níže orientační rámce – finální cenu určují rozměry, hustota hvězd,
          typ podkladu a umístění techniky.
        </p>

        <div className={styles.pricing} style={{ marginTop: '18px' }}>
          <div className={`${styles.tier} reveal`}>
            <h3>Automotive</h3>
            <div className={styles.price}>od 12&nbsp;000&nbsp;Kč</div>
            <ul>
              <li>300–800 hvězd, jemný třpyt</li>
              <li>Skryté zdroje, dálkové ovládání</li>
              <li>Instalace 1 den</li>
            </ul>
            <div>
              <a className={`${styles.button} ${styles.ghost}`} href="#">
                <span>Chci kalkulaci</span>
              </a>
            </div>
          </div>

          <div className={`${styles.tier} ${styles.best} reveal`}>
            <h3>Rezidenční</h3>
            <div className={styles.price}>typicky 30–150&nbsp;000&nbsp;Kč</div>
            <ul>
              <li>Hvězdný strop 6–25 m²</li>
              <li>Scény, mlhoviny, stmívání</li>
              <li>Instalace 1–2 dny</li>
            </ul>
            <div>
              <a className={styles.button} href="#">
                <span>Domluvit návštěvu</span>
              </a>
            </div>
          </div>

          <div className={`${styles.tier} reveal`}>
            <h3>Showroom / Hotel</h3>
            <div className={styles.price}>na dotaz</div>
            <ul>
              <li>Větší metráže, více zón</li>
              <li>Chytrá integrace &amp; DMX</li>
              <li>Provoz mimo otevírací dobu</li>
            </ul>
            <div>
              <a className={`${styles.button} ${styles.ghost}`} href="#">
                <span>Probrat projekt</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}