import ContactForm from "@/components/ContactForm/ContactForm";
import styles from "./ContactHero.module.css";

export default function ContactHero() {
  return (
    <section className={styles.hero}>
      <div className={`container ${styles.wrap}`}>
        <div className={styles.text}>
          <h1>Kontaktujte nás</h1>
          <p>
            Zajímá vás realizace hvězdného stropu nebo potřebujete nezávaznou
            kalkulaci? Napište nám a ozveme se vám co nejdříve.
          </p>
          <ul className={styles.highlights}>
            <li>📞 Konzultace zdarma</li>
            <li>📍 Instalace po celé ČR</li>
            <li>💡 Individuální přístup</li>
          </ul>
        </div>

        <div className={styles.form}>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}