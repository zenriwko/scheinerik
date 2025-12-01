import styles from "./AboutHealth.module.css";

export default function AboutHealth() {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.inner}`}>
        <h2 className={styles.title}>Vliv na lidské zdraví</h2>
        <p className={styles.intro}>
          Noční nebe ve stropě vašeho auta není jen estetickým prvkem – jeho vliv na vaše zdraví a pohodu může být překvapivě pozitivní.
          Tento luxusní prvek vytváří prostředí, které podporuje relaxaci a duševní klid, což je v dnešním hektickém světě velmi cenné.
        </p>

        <ol className={styles.list}>
          <li>
            <h3>Snížení stresu a úzkosti</h3>
            <p>
              Hvězdné nebe je pro lidskou psychiku přirozeným zdrojem uklidnění. Pohled na noční oblohu má prokazatelný efekt na snížení hladiny stresu,
              napětí a úzkosti. Při delších cestách, zvláště v noci, může jemné světlo optických vláken působit jako přirozený relaxační faktor,
              který vám pomůže udržet klidnou mysl a soustředění.
            </p>
          </li>
          <li>
            <h3>Zlepšení kvality spánku</h3>
            <p>
              Mnozí z nás trpí problémy se spánkem, ať už kvůli pracovnímu stresu nebo narušenému biorytmu. Během nočních cest nebo před spaním může jemné
              a klidné osvětlení v interiéru vozidla přispět k lepší regulaci hormonů, které ovlivňují spánek, jako je melatonin.
              Takto můžete na chvíli „vypnout“ a připravit se na kvalitní odpočinek.
            </p>
          </li>
          <li>
            <h3>Podpora duševní pohody</h3>
            <p>
              Pohled na noční nebe evokuje pocit klidu a harmonie. Tento efekt má pozitivní vliv na vaši psychickou pohodu, zvláště během dlouhých jízd,
              kdy se můžete cítit unavení nebo vystresovaní. Hvězdy na stropě auta přinášejí kousek přírody do vašeho interiéru a mohou vám pomoci v těžkých chvílích,
              když potřebujete zklidnit mysl a na chvíli se odpoutat od každodenního shonu.
            </p>
          </li>
          <li>
            <h3>Podporuje kreativitu a inspiraci</h3>
            <p>
              Jasné, ale jemné světlo optických vláken může také podpořit kreativní myšlení. Při delších cestách, kdy máte prostor pro reflexi,
              vás noční nebe může inspirovat, podpořit vaši představivost a pomoci vám přemýšlet v nových souvislostech.
            </p>
          </li>
        </ol>
      </div>
    </section>
  );
}