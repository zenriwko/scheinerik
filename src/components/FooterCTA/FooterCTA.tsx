import styles from "./FooterCTA.module.css";

export default function FooterCTA() {
  return (
    <section className={styles.cta}>
      <div className={styles.inner}>

        {/* LEFT: Reviews / Trust */}
        <div className={styles.column}>
          <h3 className={styles.heading}>Co o nás říkají zákazníci</h3>

          <div className={styles.review}>
            <p>„Vynikající, precizní instalace, vypadá to luxusně a dává to autu úplně jinou atmosféru. Pán milý a ochotný, profesionální přístup. Rozhodně doporučuji🙏“</p>
            <span>— Michal M.</span>
          </div>

          <div className={styles.review}>
            <p>„Super práce, za skvělou cenu. 100% doporučuji“</p>
            <span>— Patricie F.</span>
          </div>

          <div className={styles.review}>
            <p>„Absolutní Topka mít vlastní nebe stále na cestách“</p>
            <span>— Jana B.</span>
          </div>
        </div>

        {/* RIGHT: CTA */}
        <div className={styles.column}>
          <h3 className={styles.heading}>Chcete hvězdný efekt i ve vašem voze?</h3>
          <p className={styles.subheading}>
            Rádi připravíme návrh i celou realizaci. Kontaktujte nás ještě dnes.
          </p>

          <div className={styles.buttons}>
            <a href="/kontakt/" className={`button white`}>
              <span>Nezávazná poptávka</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}