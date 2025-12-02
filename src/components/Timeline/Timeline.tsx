import styles from "./Timeline.module.css";

export default function Timeline() {
  const steps = [
    {
      id: 1,
      icon: "1",
      title: "Úvodní konzultace",
      text: "Pošlete nám fotku vozu nebo místa instalace a stručný popis vaší představy. Projdeme společně možnosti a rozsah.",
    },
    {
      id: 2,
      icon: "2",
      title: "Návrh a cenová nabídka",
      text: "Navrhneme rozložení hvězd, typ ovládání i barev a připravíme orientační cenovou kalkulaci včetně termínu realizace.",
    },
    {
      id: 3,
      icon: "3",
      title: "Příprava a instalace",
      text: "Zajistíme materiál a domluvíme termín montáže. Instalace probíhá s maximálním ohledem na interiér a čistotu.",
    },
    {
      id: 4,
      icon: "4",
      title: "Testování a předání",
      text: "Po dokončení vše otestujeme, vysvětlíme ovládání a společně doladíme detaily, jako je jas nebo konkrétní efekty.",
    },
  ];

  return (
    <section className={styles.story}>
      <div className={`container ${styles.inner}`}>
        <h2>Jak to probíhá</h2>
        <h3>Jednoduchý proces od poptávky po hotové hvězdné nebe</h3>
        <p className={styles.intro}>Celý proces nastavujeme tak, aby byl co nejjednodušší. Vše vám vysvětlíme, doporučíme nejlepší řešení a následně se postaráme o montáž.</p>

        <div className={styles.timeline}>
        {steps.map((step, index) => (
          <div key={step.id} className={`${styles.step} ${styles[`delay${index}`]}`}>
            <div className={styles.orb}>
              <span className={styles.icon}>{step.icon}</span>
            </div>
            <div className={styles.text}>
              <h4>{step.title}</h4>
              <p>{step.text}</p>
            </div>
          </div>
          ))}
        </div>
      </div>
    </section>
  );
}
