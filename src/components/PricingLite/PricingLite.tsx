import Link from "next/link";
import styles from "./PricingLite.module.css";

export default function PricingLite() {
  return (
    <section className="section">
      <h2>Ceník</h2>
      <h3>Orientační ceny instalací</h3>

      <div className={`container ${styles.pricingLite}`}>
        <div className={styles.left}>
          <p>
            Přesná cena závisí na typu vozu a zvolených příplatkových možnostech.
            <br /><br />
            Po zaslání fotek a krátkého popisu připravíme nezávaznou kalkulaci.
          </p>
        </div>

        <div className={styles.right}>
          <div className={styles.pricingCard}>
            <h4>Programovatelné noční nebe</h4>
            <span className={styles.price}>18 000 Kč</span>
            <p>Základní instalace hvězdného stropu s programovatelným efektem.</p>
          </div>

          <div className={styles.pricingCard}>
            <h4>Dekor / ks</h4>
            <span className={styles.price}>2 500 Kč</span>
            <p>Světelné prvky do interiéru vozidla z optických vláken.</p>
          </div>

          <Link href="/cenik" className="button secondary">
            <span>Zobrazit kompletní ceník</span>
          </Link>
        </div>
      </div>
    </section>
  );
}