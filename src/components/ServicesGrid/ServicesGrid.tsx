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
                src="/images/auto-stars.jpg"
                alt="Hvězdná obloha do auta"
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className={styles.textBlock}>
              <h2>Hvězdná Obloha do Auta</h2>
              <p>
                Proměňte interiér svého vozu v noční oblohu s ovládáním přes
                aplikaci nebo dálkový ovladač. Každý světelný bod je ručně
                instalován pro realistický efekt.
              </p>
              <ul>
                <li>Instalace do většiny vozidel</li>
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
                src="/images/interior-stars.jpg"
                alt="Hvězdná dekorace interiér"
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className={styles.textBlock}>
              <h2>Hvězdná Dekorace a Panely</h2>
              <p>
                Instalujeme hvězdné panely do stropů, nábytku i stěn.
                Designové světlo pro interiéry domů, kin, wellness zón nebo
                kaváren.
              </p>
              <ul>
                <li>Montáž do sádrokartonu i panelů</li>
                <li>Rozložení hvězd dle prostoru</li>
                <li>Propojení s akustickými panely</li>
                <li>Plně přizpůsobitelné barvy světla</li>
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