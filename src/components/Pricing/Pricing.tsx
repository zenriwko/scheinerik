import styles from "./Pricing.module.css";

export default function Pricing() {
  return (
    <section className={`container ${styles.pricing}`}>
      <h3 className={styles.sectionTitle}>Základní varianty</h3>
      <ul className={styles.list}>
        <li><span>Jednobarevné noční nebe</span><b>10 000 Kč</b></li>
        <li><span>Programovatelné noční nebe</span><b>15 000 Kč</b></li>
        <li><span>Příplatek combi/SUV</span><b>+ 3 000 Kč</b></li>
      </ul>

      <h3 className={styles.sectionTitle}>Příplatkové možnosti</h3>
      <ul className={styles.list}>
        <li><span>Reálná obloha</span><b>4 000 Kč</b></li>
        <li><span>Noční nebe do dekoru</span><b>od 4 000 Kč</b></li>
        <li><span>Logo z hvězd</span><b>4 000 Kč</b></li>
        <li><span>Padající hvězda (animace)</span><b>4 500 Kč</b></li>
      </ul>

      <h3 className={styles.sectionTitle}>Montáž a servis</h3>
      <ul className={styles.list}>
        <li><span>Termoizolace střechy (Sedan/Coupe)</span><b>3 000 Kč</b></li>
        <li><span>Termoizolace střechy (Combi/SUV)</span><b>4 000 Kč</b></li>
        <li><span>Vyvezení/vyzvednutí auta</span><b>Cena Paliva</b></li>
      </ul>

      <p className={styles.note}>
        Uvedené ceny jsou bez DPH. <br />
      </p>
    </section>
  );
}
