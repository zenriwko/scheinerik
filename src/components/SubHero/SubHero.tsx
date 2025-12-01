import styles from "./SubHero.module.css";

interface HeroProps {
  kicker?: string;
  title: string;
  subtitle?: string;
  background?: string; // optional custom background image or gradient
  align?: "center" | "left"; // optional layout control
}

export default function SubHero({
  kicker,
  title,
  subtitle,
  background,
  align = "center",
}: HeroProps) {
  const heroStyle = background
    ? { backgroundImage: `url(${background})` }
    : undefined;

  return (
    <section
      className={`${styles.hero} ${align === "left" ? styles.left : ""}`}
      style={heroStyle}
    >
      <div className={`${styles.wrap}`}>
        {kicker && <span className={styles.kicker}>{kicker}</span>}
        <h1 className={styles.title}>{title}</h1>
        {subtitle && <p className={styles.sub}>{subtitle}</p>}
      </div>
    </section>
  );
}