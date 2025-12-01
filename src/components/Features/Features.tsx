import { useEffect, useRef } from "react";
import styles from "./Features.module.css";

interface Feature {
  title: string;
  text: string;
}

const FEATURES: Feature[] = [
  {
    title: "Luxusní atmosféra",
    text: "Proměňuje interiér v prémiový prostor plný klidu, světla a jedinečnosti.",
  },
  {
    title: "Energeticky úsporné",
    text: "LED projektory a vlákna spotřebují minimum energie a vydrží roky.",
  },
  {
    title: "Tichý provoz",
    text: "Žádné ventilátory ani hluk – světelný efekt je naprosto tichý.",
  },
  {
    title: "Bezúdržbový systém",
    text: "Vlákna nevyžadují servis – instalace zůstává dokonalá i po letech.",
  },
  {
    title: "Plná přizpůsobitelnost",
    text: "Vyberte si hustotu hvězd, barvy i světelné efekty podle stylu interiéru.",
  },
  {
    title: "Univerzální použití",
    text: "Vhodné pro auta, obývací pokoje i domácí kina – čistá a rychlá montáž.",
  },
];

export default function Features() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const items = Array.from(
      section.querySelectorAll<HTMLElement>(`.${styles.featureItem}`)
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.inView);
          }
        });
      },
      { threshold: 0.15 }
    );

    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="features" className={styles.featuresSection}>
      <div className={styles.featuresContainer}>
        {/* LEFT COLUMN */}
        <aside className={styles.leftCol}>
          <h2 className={styles.sectionTitle}>Výhody hvězdného stropu</h2>
          <p className={styles.sectionIntro}>
            Efekt Nočního Nebe není jen o kráse. Každá instalace přináší praktické benefity,
            které zlepšují atmosféru, komfort i styl vašeho prostoru.
          </p>
        </aside>

        {/* RIGHT COLUMN — Futuristic timeline */}
        <div className={styles.timeline}>
          {FEATURES.map(({ title, text }) => (
            <div key={title} className={styles.featureItem}>
              <div className={styles.dot}></div>
              <div className={styles.textBlock}>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}