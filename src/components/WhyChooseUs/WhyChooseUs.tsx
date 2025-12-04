import Link from "next/link";
import styles from "./WhyChooseUs.module.css";

export default function WhyChooseUs() {
  return (
    <section className={`section ${styles.why}`}>
      <div className={`container ${styles.inner}`}>
        <h2>Proč právě my</h2>
        <h3>Prémiové zpracování, které je vidět</h3>

        <p className={styles.intro}>
          Specializujeme se na optické hvězdné stropy a ambientní osvětlení.
          Každý projekt plánujeme individuálně, aby přesně odpovídal vašemu vozu,
          interiéru i rozpočtu.
        </p>

        <div className={styles.grid}>
          
          {/* 1) Premium Systems */}
          <div className={styles.card}>
            <div className={styles.icon}>
              <svg viewBox="0 0 12 12">
                <path
                  fill="currentColor"
                  d="M3 1h1.046L2.997 4H1.191l1.362-2.724A.5.5 0 0 1 3 1ZM1.227 5l3.014 4.687L2.97 5H1.227Zm2.779 0l1.53 5.645a.48.48 0 0 0 .928 0L7.998 5H4.006Zm5.028 0L7.76 9.685L10.773 5h-1.74Zm1.775-1H9.006l-1.05-3H9a.5.5 0 0 1 .448.276L10.809 4ZM7.947 4h-3.89l1.048-3h1.79l1.052 3Z"
                />
              </svg>
            </div>
            <h5>Prémiové optické systémy</h5>
            <p>Používáme kvalitní optická vlákna a osvětlení s dlouhou životností a nízkou spotřebou.</p>
          </div>

          {/* 2) Custom Design */}
          <div className={styles.card}>
            <div className={styles.icon}>
              <svg viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M2 6c0-1.505.78-3.08 2-4c0 .845.69 2 2 2a3 3 0 0 1 3 3c0 .386-.079.752-.212 1.091a74.515 74.515 0 0 1 2.191 1.808l-2.08 2.08a75.852 75.852 0 0 1-1.808-2.191A2.977 2.977 0 0 1 6 10c-2.21 0-4-1.79-4-4zm12.152 6.848l1.341-1.341A4.446 4.446 0 0 0 17.5 12A4.5 4.5 0 0 0 22 7.5c0-.725-.188-1.401-.493-2.007L18 9l-2-2l3.507-3.507A4.446 4.446 0 0 0 17.5 3A4.5 4.5 0 0 0 13 7.5c0 .725.188 1.401.493 2.007L3 20l2 2l6.848-6.848a68.562 68.562 0 0 0 5.977 5.449l1.425 1.149l1.5-1.5l-1.149-1.425a68.562 68.562 0 0 0-5.449-5.977z"
                />
              </svg>
            </div>
            <h5>Plně zakázkový design</h5>
            <p>Hustota hvězd, barvy, animace i umístění přizpůsobíme vašemu vkusu a stylu interiéru.</p>
          </div>

          {/* 3) Professional Installation */}
          <div className={styles.card}>
            <div className={styles.icon}>
              <svg viewBox="0 0 64 64">
                <path
                  fill="currentColor"
                  d="M56 34.8h-3.9V9.6c0-4.2-3.3-7.6-7.3-7.8H13.2C6.9 1.7 1.8 7 1.8 13.5v4.3c0 2 1.7 3.7 3.7 3.7H12v26.7c0 3.5 2.9 6.4 6.5 6.4h3.7v5.1c0 1 .5 1.8 1.4 2.3q.6.3 1.2.3c.5 0 1-.1 1.4-.4l4.6-3l4.5 2.9l.2.1c.9.4 1.8.4 2.6-.1s1.2-1.3 1.2-2.2v-5H56c3.4 0 6.3-2.8 6.3-6.3V41c0-3.4-2.9-6.2-6.3-6.2M6.3 13.5c0-4 3.1-7.3 6.9-7.3h22.7c-.6 1.2-1 2.6-1 4.1V17H6.3zm24.4 31c-3.7 0-6.6-2.9-6.6-6.5s3-6.5 6.6-6.5s6.6 2.9 6.6 6.5s-2.9 6.5-6.6 6.5m1.7 10.1c-1-.7-2.3-.7-3.4 0l-2.4 1.6v-8c1.3.5 2.7.8 4.1.8c1.5 0 2.9-.3 4.1-.8v8zm6.9-4.5v-5.2c1.6-1.9 2.5-4.3 2.5-6.9c0-6.1-5-11-11.1-11s-11.1 4.9-11.1 11c0 2.6.9 5.1 2.5 7v5.1h-3.7c-1.1 0-2-.8-2-1.9V21.5h19.2c2 0 3.7-1.7 3.7-3.7v-7.4c0-2.2 1.5-3.9 3.5-4.1h1.5c1.8 0 3.2 1.5 3.2 3.3v40.5zm18.5-1.8c0 1-.8 1.8-1.8 1.8h-3.9V39.3H56c1 0 1.8.8 1.8 1.8z"
                />
              </svg>
            </div>
            <h5>Profesionální montáž</h5>
            <p>Čistá práce bez poškození čalounění či nábytku. Kabeláž chytře skrytá v konstrukci.</p>
          </div>

          {/* 4) Consultation */}
          <div className={styles.card}>
            <div className={styles.icon}>
              <svg viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M5 18v3.766l1.515-.909L11.277 18H16c1.103 0 2-.897 2-2V8c0-1.103-.897-2-2-2H4c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2h1zM4 8h12v8h-5.277L7 18.234V16H4V8z"/>
                <path
                  fill="currentColor"
                  d="M20 2H8c-1.103 0-2 .897-2 2h12c1.103 0 2 .897 2 2v8c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2z"/>
              </svg>
            </div>
            <h5>Konzultace předem</h5>
            <p>Vysvětlíme možnosti, doporučíme řešení a připravíme cenovou nabídku před instalací.</p>
          </div>

        </div>
      </div>
    </section>
  );
}