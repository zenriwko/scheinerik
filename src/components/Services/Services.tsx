import Image from "next/image";
import styles from "./Services.module.css";

export default function Services() {
  return (
    <section id="services" className={`section ${styles.services}`}>
      <div className={`container ${styles.inner}`}>
        <h2>Služby</h2>
        <h3>Optické instalace</h3>

        <p className={`reveal ${styles.intro}`}>
          Instalujeme optická vlákna do automobilů a interiérových prvků.
          Zaměřujeme se výhradně na hvězdné stropy v autech a dekorativní
          osvětlení pro nábytek a předměty, jako jsou panely, vitríny,
          barové pulty nebo menší doplňky.
        </p>

        <div className={styles.galleryGrid}>

          {/* === Card 1 === */}
          <article className={`${styles.card} ${styles.t1} reveal`}>
            <div className={styles.imageWrap}>
              <Image
                src="/images/hvezdny-strop-auto.webp"
                alt="Hvězdná obloha do auta"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className={styles.image}
                priority
              />
            </div>

            {/* TEXT BELOW IMAGE */}
            <div className={styles.blurb}>
              <h4>Hvězdný strop do automobilu</h4>
              <p>
                Instalace optických vláken přímo do stropního čalounění vozu.
                Efekt hvězdné oblohy v různých variantách s možností animací.
              </p>
              <ul>
                <li>Vhodné pro sedany, SUV a dodávky</li>
                <li>Twinkle efekt a jemné světelné animace</li>
                <li>Jednobarevné nebo vícebarevné režimy</li>
                <li>Možnost programovatelného ovládání</li>
              </ul>
            </div>
          </article>

          {/* === Card 2 === */}
          <article className={`${styles.card} ${styles.t1} reveal`}>
            <div className={styles.imageWrap}>
              <Image
                src="/images/hvezdne-osvetleni-dekoraci.webp"
                alt="Hvězdné osvětlení dekorací"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className={styles.image}
                priority
              />
            </div>

            {/* TEXT BELOW IMAGE */}
            <div className={styles.blurb}>
              <h4>Hvězdné osvětlení dekorací</h4>
              <p>
                Zabudování optických vláken do nábytku, interiérových prvků a
                dekorací. Ideální pro panely, vitríny, police, barové pulty
                nebo menší designové doplňky.
              </p>
              <ul>
                <li>Ambientní jemné světlo bez viditelného zdroje</li>
                <li>Možnost vícebarevných efektů</li>
                <li>Vhodné pro nábytek, předměty i menší doplňky</li>
              </ul>
            </div>
          </article>

        </div>
      </div>
    </section>
  );
}