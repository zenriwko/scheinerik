import type { ReactNode } from "react";
import Image from "next/image";
import styles from "./SubServiceHero.module.css";

type CTA = {
  href: string;
  label: string;
  variant?: "primary" | "secondary";
};

type HeroImage = {
  src: string;
  alt: string;
};

interface SubServiceHeroProps {
  pill?: string;
  title: string;
  subtitle?: string;
  lead: ReactNode;
  metaItems?: string[];
  primaryCta?: CTA;
  secondaryCta?: CTA;
  image: HeroImage;
}

export default function SubServiceHero({
  pill,
  title,
  subtitle,
  lead,
  metaItems,
  primaryCta,
  secondaryCta,
  image,
}: SubServiceHeroProps) {
  return (
    <section className={`section ${styles.hero}`}>
      <div className={`container ${styles.heroInner}`}>
        <div className={styles.heroContent}>
          {pill && <span className={styles.pill}>{pill}</span>}
          <h1>{title}</h1>
          {subtitle && <h2>{subtitle}</h2>}

          <p className={styles.lead}>{lead}</p>

          {metaItems && metaItems.length > 0 && (
            <ul className={styles.metaList}>
              {metaItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}

          {(primaryCta || secondaryCta) && (
            <div className={styles.heroActions}>
              {primaryCta && (
                <a
                  href={primaryCta.href}
                  className="button"
                >
                  <span>{primaryCta.label}</span>
                </a>
              )}

               {secondaryCta && (
                  <a
                    href={secondaryCta.href}
                    className="button ghost"
                  >
                    <span>{secondaryCta.label}</span>
                  </a>
                )}
            </div>
          )}
        </div>

        <div className={styles.heroImageWrapper}>
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className={styles.heroImage}
            priority
          />
        </div>
      </div>
    </section>
  );
}