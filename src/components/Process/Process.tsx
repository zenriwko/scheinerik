import styles from './Process.module.css';

export default function Process1() {
  return (
    <section id="process" className={`section ${styles.processSection}`}>
      <div className={`container ${styles.process}`}>
        <div className={styles.pText}>
          <h2 className="reveal">Rezidence &amp; Showroom</h2>
          <p className={`lead reveal ${styles.intro}`}>
            Stropy v ložnici, obýváku, wellness nebo kině. Scény, stmívání a chytrá automatizace.
          </p>
          <div className={`${styles.timeline} reveal`}>
            <div className={styles.step}>
              <div className={styles.num}>1</div>
              <div>
                <strong>Návrh</strong><br />
                Krátká konzultace, fotky prostoru a rozměry. Připravím kompozici hvězd.
              </div>
            </div>
            <div className={styles.step}>
              <div className={styles.num}>2</div>
              <div>
                <strong>Vzorek</strong><br />
                Ukázka třpytu a tónu světla na místě. Doladíme hustotu a charakter oblohy.
              </div>
            </div>
            <div className={styles.step}>
              <div className={styles.num}>3</div>
              <div>
                <strong>Instalace</strong><br />
                Čistá práce s ochranou povrchů. Tiché zdroje schované mimo zrak.
              </div>
            </div>
            <div className={styles.step}>
              <div className={styles.num}>4</div>
              <div>
                <strong>Scény</strong><br />
                Statický třpyt, jemné vlnění, mlhoviny. Integrace do stávajícího osvětlení.
              </div>
            </div>
            <div className={styles.step}>
              <div className={styles.num}>5</div>
              <div>
                <strong>Servis</strong><br />
                „Konzultant na telefonu“ – kdykoli potřebujete, přijedu doladit.
              </div>
            </div>
          </div>
        </div>
        <div className={`${styles.pMedia} reveal`}>
          <img
            src="https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?q=80&w=1600&auto=format&fit=crop"
            alt="Luxusní interiér se stropem s hvězdnou oblohou"
          />
        </div>
      </div>
    </section>
  );
}