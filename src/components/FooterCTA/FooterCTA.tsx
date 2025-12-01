import styles from "./FooterCTA.module.css";

export default function FooterCTA() {
  return (
    <section className={styles.cta}>
      <div className={styles.inner}>

        {/* LEFT: Reviews / Trust */}
        <div className={styles.column}>
          <h3 className={styles.heading}>Co o nás říkají zákazníci</h3>

          <div className={styles.review}>
            <p>„Perfektní práce, hvězdný strop vypadá úžasně. Naprostá spokojenost.“</p>
            <span>— Martin K.</span>
          </div>

          <div className={styles.review}>
            <p>„Rychlá domluva, precizní zpracování a skvělý výsledek.“</p>
            <span>— Tomáš B.</span>
          </div>

          <div className={styles.review}>
            <p>„Auto působí jako úplně jiný svět. Doporučuji všem milovníkům detailů.“</p>
            <span>— Andrea L.</span>
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