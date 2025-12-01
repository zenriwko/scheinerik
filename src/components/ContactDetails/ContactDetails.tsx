import styles from "./ContactDetails.module.css";

export default function ContactDetails() {
  return (
    <section className={styles.details}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.block}>
          <h3>Kontakt</h3>
          <p>
            <strong>Telefon:</strong>{" "}
            <a href="tel:+420777123456">+420 777 123 456</a>
            <br />
            <strong>E-mail:</strong>{" "}
            <a href="mailto:info@nocninebe.cz">info@nocninebe.cz</a>
            <br />
            <strong>Sídlo:</strong> Praha, Česká republika
          </p>
        </div>

        <div className={styles.block}>
          <h3>Otevírací doba</h3>
          <ul className={styles.hours}>
            <li>
              <span>Pondělí – Pátek:</span> 9:00 – 18:00
            </li>
            <li>
              <span>Sobota:</span> dle dohody
            </li>
            <li>
              <span>Neděle:</span> zavřeno
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
