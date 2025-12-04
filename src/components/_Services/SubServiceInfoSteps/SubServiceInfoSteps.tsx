import type { ReactNode } from "react";
import styles from "./SubServiceInfoSteps.module.css";

interface Step {
  title: string;
  text: ReactNode;
}

interface Props {
  title: string;               // H2
  subtitle?: string;           // H3 (optional)
  paragraphs: ReactNode[];
  steps: Step[];
}

export default function SubServiceInfoSteps({
  title,
  subtitle,
  paragraphs,
  steps,
}: Props) {
  return (
    <section className={`section ${styles.sectionAlt}`}>
      <div className={`container ${styles.twoCol}`}>

        {/* LEFT COLUMN */}
        <div>
          <h2>{title}</h2>

          {subtitle && <h3>{subtitle}</h3>}

          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        {/* RIGHT COLUMN – Steps */}
        <div className={styles.steps}>
          {steps.map((step, idx) => (
            <div className={styles.step} key={step.title}>
              <span className={styles.stepNumber}>{idx + 1}</span>
              <h4>{step.title}</h4>
              <p>{step.text}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}