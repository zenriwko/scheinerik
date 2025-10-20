import styles from "./Services.module.css";

export default function Services() {
  return (
    <section id="services" className={`section ${styles.services}`}>
      <div className={`container ${styles.services}`}>
        <h2 className="reveal">Kde všude lze využít naše řešení</h2>
        <p className={`lead reveal ${styles.intro}`}>
          Výběr realizací. Fotografie lze nahradit snímky z Instagramu – zrnitá estetika,
          kontrastní kompozice, hvězdný třpyt a tmavé interiéry.
        </p>

        <div className={styles.galleryGrid}>
          <article className={`${styles.card} ${styles.t1} reveal`} aria-label="Strop - hvězdná obloha">
            <div
              className={styles.img}
              style={{
                backgroundImage:
                  "url('https://picsum.photos/1920/1080?random=1')",
              }}
            />
            <div className={styles.fade}></div>
            <span className={styles.label}>Rezidence</span>
          </article>

          <article className={`${styles.card} ${styles.t1} reveal`} aria-label="Interiér vozu - hvězdná obloha">
            <div
              className={styles.img}
              style={{
                backgroundImage:
                  "url('https://picsum.photos/1920/1080?random=3')",
              }}
            />
            <div className={styles.fade}></div>
            <span className={styles.label}>Automotive</span>
          </article>

          <article className={`${styles.card} ${styles.t2} reveal`} aria-label="Domácí kino - optická vlákna">
            <div
              className={styles.img}
              style={{
                backgroundImage:
                  "url('https://picsum.photos/1920/1080?random=5')",
              }}
            />
            <div className={styles.fade}></div>
            <span className={styles.label}>Domácí Kino</span>
          </article>

          <article className={`${styles.card} ${styles.t2} reveal`} aria-label="Showroom - hvězdný strop">
            <div
              className={styles.img}
              style={{
                backgroundImage:
                  "url('https://picsum.photos/1920/1080?random=7')",
              }}
            />
            <div className={styles.fade}></div>
            <span className={styles.label}>Showroom</span>
          </article>

          <article className={`${styles.card} ${styles.t2} reveal`} aria-label="Detail vláken">
            <div
              className={styles.img}
              style={{
                backgroundImage:
                  "url('https://picsum.photos/1920/1080?random=8')",
              }}
            />
            <div className={styles.fade}></div>
            <span className={styles.label}>Detail</span>
          </article>
        </div>
      </div>
    </section>
  );
}
