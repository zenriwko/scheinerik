import ContactForm from "@/components/ContactForm/ContactForm";
import styles from "./ContactHero.module.css";

export default function ContactHero() {
  return (
    <section className={styles.hero}>
      {/* decorative bg */}
      <div aria-hidden className={styles.bg} />

      <div className={`container ${styles.wrap}`}>
        <div className={styles.text}>
          <h2 className={styles.title}>Konzultace Zdarma</h2>

          <p className={styles.lead}>
            Zajímá vás realizace hvězdného stropu nebo potřebujete nezávaznou
            kalkulaci? Napište nám a ozveme se co nejdříve.
          </p>

          <ul className={styles.highlights}>
            <li className={`${styles.primary}`}>
              <a href="/cenik" className={styles.fullLink}>
                <span className={styles.icon} aria-hidden="true">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--secondary)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M10 13a5 5 0 0 0 7.07 0l3.54-3.54a5 5 0 0 0-7.07-7.07L11 4" />
                    <path d="M14 11a5 5 0 0 0-7.07 0l-3.54 3.54a5 5 0 0 0 7.07 7.07L13 20" />
                  </svg>
                </span>
                <span>Transparentní ceny</span>
              </a>
            </li>

            <li>
              <span className={styles.icon}>📍</span>
              <span>Instalace po celé ČR</span>
            </li>

            <li>
              <span className={styles.icon}>💡</span>
              <span>Individuální přístup</span>
            </li>
          </ul>

        </div>

        <div className={styles.formCol}>
          <div className={styles.formCard}>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}