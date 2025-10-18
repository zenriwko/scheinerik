import Link from "next/link";
import styles from "./WhyChooseUs.module.css";

export default function WhyChooseUs() {
  return (
    <section className={`section ${styles.why}`}>
      <div className={`container ${styles.inner}`}>
        <h2>Proč si vybrat právě nás</h2>
        <div className={styles.grid}>
          <div className={styles.card}>
            <div className={styles.icon}>✦</div>
            <h3>Precizní montáž</h3>
            <p>Každý bod instalujeme ručně pro realistický a čistý vzhled.</p>
          </div>
          <div className={styles.card}>
            <div className={styles.icon}>✦</div>
            <h3>Tichá technologie</h3>
            <p>Naše LED moduly jsou tiché, spolehlivé a mají dlouhou životnost.</p>
          </div>
          <div className={styles.card}>
            <div className={styles.icon}>✦</div>
            <h3>Design na míru</h3>
            <p>Každé rozložení hvězd přizpůsobujeme vašemu prostoru a stylu.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
