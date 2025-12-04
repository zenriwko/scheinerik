import type { ReactNode } from "react";
import styles from "./SubServiceTwoColBullet.module.css";

interface Props {
  title: string;
  text: ReactNode;
  bullets: string[];
}

export default function SubServiceTwoColBullet({ title, text, bullets }: Props) {
  return (
    <section className={`section ${styles.sectionAlt}`}>
      <div className="container">
        <div className={styles.twoCol}>
          <div>
            <h2>{title}</h2>
            <p>{text}</p>
          </div>
          <div className={styles.bulletBox}>
            <ul>
              {bullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
