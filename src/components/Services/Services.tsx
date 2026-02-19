import Link from "next/link";
import styles from "./Services.module.css";

export default function Services() {
  return (
    <section id="services" className={`section ${styles.services}`}>
      <div className={`container ${styles.inner}`}>
        <h2>Hvězdné instalace do automobilů</h2>
        <h3>Optická vlákna do stropu a interiéru vozidel</h3>

        <p className={styles.intro}>
          Zaměřujeme se hlavně na <strong>instalace optických vláken do stropů
          a interiérových prvků automobilů</strong>.
        </p>

        <div className={styles.cards}>

          {/* CARD 1 — STARLIGHT ROOF */}
          <article className={styles.card}>
            <div className={styles.imageWrapper}>
              <img
                src="/images/gallery/nn_roof_8.webp"
                alt="Instalace optických vláken do stropu automobilu"
                className={styles.image}
              />
            </div>

            <div className={styles.content}>
              <div className={styles.text}>
              <div className={styles.badges}>
                <span className={styles.badgePrimary}>Nejčastější služba</span>
              </div>
              <h4>Noční obloha do stropu auta</h4>
              <p>
                Integrace optických vláken přímo do stropního čalounění.
                Efekt hvězdné oblohy s jemnými animacemi nebo twinkle efektem.
              </p>
              <ul>
                <li>Realistická hvězdná obloha</li>
                <li>Twinkle efekt a světelné animace</li>
                <li>Jednobarevné i vícebarevné režimy (RGBW)</li>
                <li>Možnost individuálního rozložení hvězd</li>
              </ul>
              </div>
              <div className={styles.actions}>
                <Link href="/kontakt" className="button">
                  <span>Nezávazná poptávka</span>
                </Link>
                <Link href="/sluzby/automobily/hvezdny-strop" className="button ghost">
                  <span>Zobrazit více</span>
                </Link>
              </div>
            </div>
          </article>

          {/* CARD 2 — INTERIOR PANELS */}
          <article className={styles.card}>
            <div className={styles.imageWrapper}>
              <img
                src="/images/gallery/nn_interior_1.webp"
                alt="Optická vlákna v interiéru automobilu"
                className={styles.image}
              />
            </div>

            <div className={styles.content}>
              <div className={styles.text}>
              <div className={styles.badges}>
                <span className={styles.badgeSecondary}>Rozšíření interiéru</span>
              </div>

              <h4>Noční nebe v dekoru auta</h4>
              <p>
                Optická vlákna instalujeme také do <strong>bočních panelů,
                sloupků, dveřních výplní, podsvětlení čalounění</strong> nebo jiných částí
                interiéru. Ideální doplněk k hvězdnému stropu.
              </p>

              <ul>
                <li>Ambientní podsvětlení panelů</li>
                <li>Možnost přesné volby jasu a barvy</li>
                <li>Dekorativní linky a body světla</li>
                <li>Kompatibilní se všemi typy vozidel</li>
              </ul>
              </div>
              <div className={styles.actions}>
                <Link href="/kontakt" className="button">
                  <span>Nezávazná poptávka</span>
                </Link>
                <Link href="/sluzby/automobily/hvezdny-interier" className="button ghost">
                  <span>Zobrazit více</span>
                </Link>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}