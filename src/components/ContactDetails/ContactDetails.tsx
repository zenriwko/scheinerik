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
            <b>Provozovna (dílna):</b>{" "}
            <a target="_blank" href="">M. Koněva 168/22, 288 02 Nymburk 2</a>
          </p>
        </div>

        <div className={styles.block}>
          <h2>Otevírací doba</h2>
          <ul className={styles.hours}>
            <li>
              Otevírací doba není pevně stanovena. Vše probíhá dle předchozí dohody.
            </li>
          </ul>
        </div>
      </div>
  );
}