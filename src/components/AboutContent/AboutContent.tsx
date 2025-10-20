import styles from './AboutContent.module.css';

export default function AboutContent() {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.wrap}`}>
        <div className={styles.text}>
          <p>
            Naše firma vznikla v roce 2016 s cílem přinést do světa automobilového designu
            něco jedinečného a luxusního – noční nebe do stropů vozidel. Díky našim
            inovativním technologiím a preciznímu řemeslnému zpracování jsme schopni vytvořit
            dokonalý efekt hvězdné oblohy, který každý interiér posune na novou úroveň.
          </p>
          <p>
            Každý náš produkt je výsledkem dlouholetých zkušeností a neustálého zlepšování.
            Používáme vysoce kvalitní optická vlákna a vlastní technologie, které zajišťují
            dlouhou životnost a bezproblémovou funkčnost. Naše práce je pro nás víc než jen
            výroba – je to umění, které přináší do vašich vozidel nádech exkluzivity a magie.
          </p>
        </div>

        <div className={styles.image}>
          <img src="https://picsum.photos/1920/1080" alt="Showroom Noční Nebe" />
        </div>
      </div>
    </section>
  );
}