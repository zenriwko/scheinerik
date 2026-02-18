import styles from "./ContactDetails.module.css";

export default function ContactDetails() {
  return (
      <div className={`container ${styles.grid}`}>
        <div className={styles.block}>
          <h2>Kontakt</h2>
          <p>
            <strong>Telefon:</strong>{" "}
            <a href="tel:+420737758530">+420 737 758 530</a>
            <br />
            <strong>E-mail:</strong>{" "}
            <a href="mailto:info@nocninebe.eu">info@nocninebe.eu</a>
            <br />
            <strong>Sídlo:</strong> Maňákova 811/10, 198 00 Praha 9 – Černý Most
          </p>
        </div>

        <div className={styles.block}>
          <h2>Otevírací doba</h2>
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
  );
}
