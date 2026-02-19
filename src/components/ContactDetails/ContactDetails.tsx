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
            <a target="_blank" href="https://www.google.com/maps/place/No%C4%8Dn%C3%AD+Nebe/@50.1904256,15.048888,17z/data=!3m1!4b1!4m6!3m5!1s0x470bf900677a9a19:0xe15525dead222b7b!8m2!3d50.1904256!4d15.048888!16s%2Fg%2F11wwt_hzv_?hl=en-PH&entry=ttu&g_ep=EgoyMDI2MDIxNi4wIKXMDSoASAFQAw%3D%3D">M. Koněva 168/22, 288 02 Nymburk 2</a>
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