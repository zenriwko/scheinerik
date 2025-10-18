import styles from './Timeline.module.css';

export default function Timeline() {
  return (
    <section id="timeline" className={`section ${styles.timelineSection}`}>
      <div className={`container ${styles.timeline}`}>
        <div className={`${styles.tMedia} reveal`} aria-label="Automotive galerie">
          <img
            src="https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=1600&auto=format&fit=crop"
            alt="Interiér vozu s hvězdným stropem"
          />
        </div>
        <div className={styles.tText}>
          <h2 className="reveal">Časová osa projektů</h2>
          <p className="lead reveal">
            Každý projekt má svůj vlastní rytmus, ale všechny probíhají rychle, čistě a s respektem k prostoru.
          </p>
          <ul className={`${styles.timelineList} reveal`}>
            <li className={styles.step}>
              <div className={styles.num}>A</div>
              <div>
                <strong>Automotive noční nebe</strong>
                <br />
                Instalace do interiéru vozu trvá obvykle 1–2 dny, v závislosti na složitosti modelu a detailu designu.
              </div>
            </li>
            <li className={styles.step}>
              <div className={styles.num}>B</div>
              <div>
                <strong>Hvězdné nebe v rezidenci</strong>
                <br />
                U rezidenčních prostor (ložnice, obývací pokoj, domácí kino) počítejte s časem 2–4 dny, v závislosti
                na velikosti plochy a počtu světelných scén.
              </div>
            </li>
            <li className={styles.step}>
              <div className={styles.num}>C</div>
              <div>
                <strong>Hvězdné nebe showroomy</strong>
                <br />
                Pro větší komerční prostory, showroomy a studia se realizace pohybuje kolem 5–7 dnů, vždy s ohledem
                na specifika prostoru a požadavky na efekt.
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
