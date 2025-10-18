import styles from './Contact.module.css';

export default function Contact() {
  return (
    <section id="kontakt" className={`section ${styles.cta}`}>
      <div className={`container ${styles.contact}`}>
        <h2 className="reveal">Zaujalo vás to?</h2>
        <p className={`lead reveal ${styles.leadText}`}>
          Pošlete rozměry, pár fotek a představu hustoty hvězd. Přijedu s ukázkou a během 24&nbsp;hodin pošlu kalkulaci.
        </p>
        <div
          className={`${styles.actions} reveal`}
          style={{ justifyContent: 'center', marginTop: '8px' }}
        >
          <a className={`button`} href="#">
            <span>Napsat e-mail</span>
          </a>
          <a
            className={`button ghost`}
            href="#"
            target="_blank"
            rel="noopener"
          >
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}