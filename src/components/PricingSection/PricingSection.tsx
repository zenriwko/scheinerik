import PricingCalc from "@/components/PricingCalc/PricingCalc";
import styles from "./PricingSection.module.css";

export default function PricingSection() {
  return (
    <section className={styles.section}>
      <div className={styles.grid}>
        <div className={styles.calc}>
          <PricingCalc />
        </div>
        <div className={styles.extra}>
          <h2 className={styles.sectionTitle}>Doplňkové služby</h2>
          <p className={styles.subheading}>
            Služby od: <span><a target="_blank" href="https://www.instagram.com/autocalounictvi_pipi/">@autocalounictvi_pipi</a></span>
          </p>
          <ul className={styles.list}>
            <li><span>Čalounění stropu</span><b>3 300 – 3 500 Kč</b></li>
            <li><span>Čalounění sloupků</span><b>300 Kč/ks</b></li>
            <li><span>Lakování dílů interiéru</span><b>Do 3 000 Kč</b></li>
            <li><span>Montáž/Demontáž</span><b>900 Kč</b></li>
          </ul>
        </div>
      </div>
    </section>
  );
}