import type { ReactNode } from "react";
import styles from "./SubServiceCardGrid.module.css";

interface Card {
  title: string;
  text: ReactNode;
}

interface Props {
  title: string;          // H2
  subtitle?: string;      // H3 (optional)
  intro?: string;         // intro paragraph
  cards: Card[];
}

export default function SubServiceCardGrid({ title, subtitle, intro, cards }: Props) {
  return (
    <section className={`section ${styles.sectionCards}`}>
      <div className="container">

        {/* Headings */}
        <h2>{title}</h2>
        {subtitle && <h3 className={styles.subtitle}>{subtitle}</h3>}

        {/* Intro paragraph */}
        {intro && <p className={styles.sectionIntro}>{intro}</p>}

        {/* Cards grid */}
        <div className={styles.grid}>
          {cards.map((card) => (
            <article className={styles.card} key={card.title}>
              <h4>{card.title}</h4>
              <p>{card.text}</p>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}