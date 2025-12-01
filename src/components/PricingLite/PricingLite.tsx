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
            Přesná cena vždy závisí na typu vozu nebo interiéru, počtu hvězd, způsobu ovládání a náročnosti montáže. Níže najdete orientační rozpětí, abyste získali představu o investici.
            <br></br>
            Po zaslání několika fotek a stručného popisu vám připravíme nezávaznou a přesnější kalkulaci.
          </p>
        </div>
        <div className={styles.right}>
          <div className={styles.pricingCard}>
            <h4>Hvězdný strop do auta</h4>
            <span className={styles.price}>od 12 000 Kč</span>
            <p>Základní instalace pro osobní vůz s efektem hvězdné oblohy a možností změny barvy světla.</p>
          </div>
          <div className={styles.pricingCard}>
            <h4>Optické osvětlení nábytku</h4>
            <span className={styles.price}>od 4 500 Kč</span>
            <p>Dekorativní ambientní osvětlení nábytkových sestav, polic nebo vitrín podle rozsahu instalace.</p>
          </div>
          <Link href="/cenik" className="button secondary">
            <span>Zobrazit ceník</span>
          </Link>
        </div>
      </div>
    </section>
  );
}