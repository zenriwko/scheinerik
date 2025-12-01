import Image from "next/image";
import Link from "next/link";
import styles from "./ServicesGrid.module.css";

export default function ServicesGrid() {
  return (
    <section className={`section ${styles.gridSection}`}>
      <div className="container">
        <div className={styles.grid}>
          {/* Automotive */}
          <article className={styles.card}>
            <div className={styles.imageWrap}>
              <Image
                src="/images/hvezdny-strop-auto.webp"
                alt="Hvězdná obloha do auta"
                fill
                sizes="1920px, 1080px"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className={styles.textBlock}>
              <h3>Hvězdný strop do auta</h3>
              <p>
                Dodejte interiéru luxusní vzhled s osvětlením, které připomíná noční oblohu. 
                Každý strop je ručně vyráběn z kvalitního materiálu s desítkami svítících hvězd. 
                Skvělý způsob, jak zvýšit styl, pohodlí i zážitek z jízdy.
              </p>
              <ul>
                <li>Profesionální montáž pro každý vůz</li>
                <li>Volitelné barvy a efekty</li>
                <li>Napájení z elektroinstalace auta</li>
                <li>Ovládání přes aplikaci</li>
              </ul>
              <div className={styles.actions}>
                <Link href="/#kontakt" className="button">
                  <span>Nezávazná poptávka</span>
                </Link>
                <Link href="/#galerie" className="button ghost">
                  <span>Zobrazit více</span>
                </Link>
              </div>
            </div>
          </article>

          {/* Interior / Furniture */}
          <article className={styles.card}>
            <div className={styles.imageWrap}>
              <Image
                src="/images/hvezdne-osvetleni-dekoraci.webp"
                alt="Hvězdná obloha do auta"
                fill
                sizes="1920px, 1080px"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className={styles.textBlock}>
              <h3>Hvězdné osvětlení dekorací</h3>
              <p>
                Optická vlákna integrovaná do nábytku, soch nebo doplňků vytvářejí efekt noční oblohy. 
                Originální detail, který dodá každému předmětu luxusní vzhled.
              </p>
              <ul>
                <li>Optická vlákna s efektem hvězdné oblohy</li>
                <li>Vhodné pro nábytek, doplňky i umělecké objekty</li>
                <li>Možnost volby barvy, jasu a efektu světla</li>
                <li>Profesionální montáž na různé materiály</li>
              </ul>
              <div className={styles.actions}>
                <Link href="/#kontakt" className="button">
                  <span>Nezávazná poptávka</span>
                </Link>
                <Link href="/#galerie" className="button ghost">
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