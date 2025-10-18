import styles from './Features.module.css';

export default function Features() {
  return (
    <section id="features" className={`section ${styles.featuresSection}`}>
      <div className={`container ${styles.features}`}>
        <h2 className="reveal">
          Proč právě <span>Noční Nebe</span>
        </h2>
        <p className={`lead reveal ${styles.intro}`}>
          Prémiové materiály, čistá práce a osobní přístup. Každá hvězda je položena ručně – s důrazem
          na trajektorii, rytmus a kompozici.
        </p>
        <div className={`grid ${styles.featureCards}`}>
          <div className={`${styles.feature} reveal`}>
            <div className={styles.icon}>✨</div>
            <h3>Bespoke design</h3>
            <p>
              Návrh hvězdného vzoru na míru interiéru – souhvězdí, mlhoviny, gradienty.
            </p>
          </div>
          <div className={`${styles.feature} reveal`}>
            <div className={styles.icon}>🔇</div>
            <h3>Tichý &amp; bezpečný provoz</h3>
            <p>
              Spolehlivé zdroje, tiché projektory, bezúdržbové vlákno. Certifikované komponenty.
            </p>
          </div>
          <div className={`${styles.feature} reveal`}>
            <div className={styles.icon}>🧹</div>
            <h3>Čistá instalace</h3>
            <p>
              Minimalizace prachu, ochrana povrchů a přesné dokončení – bez kompromisů.
            </p>
          </div>
          <div className={`${styles.feature} reveal`}>
            <div className={styles.icon}>🕰️</div>
            <h3>Diskrétní termíny</h3>
            <p>
              Večerní/ víkendové realizace dle přání. Většina projektů hotová do 1–2 dní.
            </p>
          </div>
          <div className={`${styles.feature} reveal`}>
            <div className={styles.icon}>🛡️</div>
            <h3>Záruka &amp; péče</h3>
            <p>
              Rozšířená záruka a následný servis. Možnost pravidelného re-tuningu třpytu.
            </p>
          </div>
          <div className={`${styles.feature} reveal`}>
            <div className={styles.icon}>📐</div>
            <h3>Precizní detail</h3>
            <p>
              Neviditelné spoje, rovnoměrná luminance, čisté průniky vláken.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
