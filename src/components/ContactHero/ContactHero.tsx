import ContactForm from "@/components/ContactForm/ContactForm";
import styles from "./ContactHero.module.css";

export default function ContactHero() {
  return (
    <section className={styles.hero}>
      {/* decorative bg */}
      <div aria-hidden className={styles.bg} />

      <div className={`container ${styles.wrap}`}>
        <div className={styles.text}>
          <span className={styles.kicker}>Jsme tu pro vás</span>
          <h1 className={styles.title}>Kontaktujte nás</h1>

          <p className={styles.lead}>
            Zajímá vás realizace hvězdného stropu nebo potřebujete nezávaznou
            kalkulaci? Napište nám a ozveme se co nejdříve.
          </p>

          <ul className={styles.highlights}>
            <li>📞 Konzultace zdarma</li>
            <li>📍 Instalace po celé ČR</li>
            <li>💡 Individuální přístup</li>
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