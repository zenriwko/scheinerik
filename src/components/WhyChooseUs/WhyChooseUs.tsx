import Link from "next/link";
import styles from "./WhyChooseUs.module.css";

export default function WhyChooseUs() {
  return (
    <section className={`section ${styles.why}`}>
      <div className={`container ${styles.inner}`}>
        <h2>Proč právě my</h2>
        <h3>Prémiové zpracování, které je vidět</h3>
        <p>Specializujeme se na optické hvězdné stropy a ambientní osvětlení. Každý projekt plánujeme individuálně, aby přesně odpovídal vašemu vozu, interiéru i rozpočtu.</p>
        <div className={styles.grid}>
          <div className={styles.card}>
            <div className={styles.icon}>✦</div>
            <h4>Prémiové optické systémy</h4>
            <p>Používáme kvalitní optická vlákna a osvětlení s dlouhou životností a nízkou spotřebou.</p>
          </div>
          <div className={styles.card}>
            <div className={styles.icon}>✦</div>
            <h4>Plně zakázkový design</h4>
            <p>Hustota hvězd, barvy, animace i umístění přizpůsobíme vašemu vkusu a stylu interiéru.</p>
          </div>
          <div className={styles.card}>
            <div className={styles.icon}>✦</div>
            <h4>Profesionální montáž</h4>
            <p>Čistá práce bez poškození čalounění či nábytku. Kabeláž chytře skrytá v konstrukci.</p>
          </div>
          <div className={styles.card}>
            <div className={styles.icon}>✦</div>
            <h4>Konzultace předem</h4>
            <p>Vysvětlíme možnosti, doporučíme řešení a připravíme cenovou nabídku před instalací.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
