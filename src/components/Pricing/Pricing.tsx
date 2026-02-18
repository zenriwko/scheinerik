import styles from "./Pricing.module.css";

export default function Pricing() {
  return (
    <section className={`container ${styles.pricing}`}>
      
      <h3 className={styles.sectionTitle}>Hlavní instalace</h3>
      <ul className={styles.list}>
        <li>
          <span>Programovatelné noční nebe</span>
          <b>18 000 Kč</b>
        </li>
      </ul>

      <h3 className={styles.sectionTitle}>Úprava podle typu vozidla</h3>
      <ul className={styles.list}>
        <li>
          <span>Combi / SUV</span>
          <b>+ 3 500 Kč</b>
        </li>
        <li>
          <span>Šíbr</span>
          <b>+ 4 500 Kč</b>
        </li>
      </ul>

      <h3 className={styles.sectionTitle}>Rozšíření & designové prvky</h3>
      <ul className={styles.list}>
        <li><span>Padající hvězda</span><b>+ 5 000 Kč</b></li>
        <li><span>Reálná obloha</span><b>+ 5 000 Kč</b></li>
        <li><span>Dekor / ks</span><b>+ 2 500 Kč</b></li>
        <li><span>Dekor Smart</span><b>+ 4 000 Kč</b></li>
        <li><span>Logo z hvězd</span><b>+ 5 000 Kč</b></li>
        <li><span>Ambient Smart</span><b>+ 12 000 Kč</b></li>
      </ul>

      <h3 className={styles.sectionTitle}>Technické úpravy</h3>
      <ul className={styles.list}>
        <li>
          <span>Termoizolace</span>
          <b>+ 3 500 Kč</b>
        </li>
      </ul>

      <p className={styles.note}>
        Uvedené ceny jsou bez DPH (bez faktury) nejsem plátce DPH.
      </p>

    </section>
  );
}