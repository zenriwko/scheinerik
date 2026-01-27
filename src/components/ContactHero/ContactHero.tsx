import ContactForm from "@/components/ContactForm/ContactForm";
import ContactDetails from "@/components/ContactDetails/ContactDetails"
import styles from "./ContactHero.module.css";

export default function ContactHero() {
  return (
    <section className={styles.hero}>
      {/* decorative bg */}
      <div aria-hidden className={styles.bg} />

      <div className={`container ${styles.wrap}`}>
        <div className={styles.text}>
          <h1 className={styles.title}>Konzultace Zdarma</h1>

          <p className={styles.lead}>
            Zajímá vás realizace hvězdného stropu nebo potřebujete nezávaznou
            kalkulaci? Napište nám a ozveme se co nejdříve.
          </p>

          <ContactDetails />

        </div>

        <div className={styles.formCol}>
          <div className={styles.formCard}>
            {/*<ContactForm />*/}
          </div>
        </div>
      </div>
    </section>
  );
}