import styles from "./FixedButtons.module.css";

export default function FixedButtons() {
  return (
    <div className={styles.fixedButtons}>
      {/* --- Contact Button --- */}
      <a href="#contact" className={styles.fixedBtn} aria-label="Napište nám">
        <span className={styles.iconWrap}>
          <svg
          className={styles.icon}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m7 9 5 3.5L17 9" />
          <path d="M2 17V7a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2Z" />
        </svg>
        </span>
        <span className={styles.label}>Napište nám</span>
      </a>

      {/* --- Call Button --- */}
      <a href="#call" className={styles.fixedBtn} aria-label="Zavolejte nám">
        <span className={styles.iconWrap}>
          <svg
          className={styles.icon}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M1 2h8.58l1.49 6.69-1.86 1.86a14 14 0 0 0 4.24 4.24l1.86-1.86L22 14.42V23h-1a20 20 0 0 1-10.85-3.2 20 20 0 0 1-5.95-5.95A20 20 0 0 1 1 3zm2.03 2a18 18 0 0 0 2.85 8.76 18 18 0 0 0 5.36 5.36A18 18 0 0 0 20 20.97v-4.95l-4.05-.9-2.18 2.18-.66-.38a16 16 0 0 1-6.03-6.03l-.38-.66 2.18-2.18L7.98 4z" />
        </svg>
        </span>
        <span className={styles.label}>Zavolejte nám</span>
      </a>

      {/* --- Instagram Button --- */}
      <a href="#instagram" className={styles.fixedBtn} aria-label="Sledujte nás">
        <span className={styles.iconWrap}>
          <svg
          className={styles.icon}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M17.34 5.46a1.2 1.2 0 1 0 1.2 1.2a1.2 1.2 0 0 0-1.2-1.2Zm4.6 2.42a7.59 7.59 0 0 0-.46-2.43a4.94 4.94 0 0 0-1.16-1.77a4.7 4.7 0 0 0-1.77-1.15a7.3 7.3 0 0 0-2.43-.47C15.06 2 14.72 2 12 2s-3.06 0-4.12.06a7.3 7.3 0 0 0-2.43.47a4.78 4.78 0 0 0-1.77 1.15a4.7 4.7 0 0 0-1.15 1.77a7.3 7.3 0 0 0-.47 2.43C2 8.94 2 9.28 2 12s0 3.06.06 4.12a7.3 7.3 0 0 0 .47 2.43a4.7 4.7 0 0 0 1.15 1.77a4.78 4.78 0 0 0 1.77 1.15a7.3 7.3 0 0 0 2.43.47C8.94 22 9.28 22 12 22s3.06 0 4.12-.06a7.3 7.3 0 0 0 2.43-.47a4.7 4.7 0 0 0 1.77-1.15a4.85 4.85 0 0 0 1.16-1.77a7.59 7.59 0 0 0 .46-2.43c0-1.06.06-1.4.06-4.12s0-3.06-.06-4.12ZM20.14 16a5.61 5.61 0 0 1-.34 1.86a3.06 3.06 0 0 1-.75 1.15a3.19 3.19 0 0 1-1.15.75a5.61 5.61 0 0 1-1.86.34c-1 .05-1.37.06-4 .06s-3 0-4-.06a5.73 5.73 0 0 1-1.94-.3a3.27 3.27 0 0 1-1.1-.75a3 3 0 0 1-.74-1.15a5.54 5.54 0 0 1-.4-1.9c0-1-.06-1.37-.06-4s0-3 .06-4a5.54 5.54 0 0 1 .35-1.9A3 3 0 0 1 5 5a3.14 3.14 0 0 1 1.1-.8A5.73 5.73 0 0 1 8 3.86c1 0 1.37-.06 4-.06s3 0 4 .06a5.61 5.61 0 0 1 1.86.34a3.06 3.06 0 0 1 1.19.8a3.06 3.06 0 0 1 .75 1.1a5.61 5.61 0 0 1 .34 1.9c.05 1 .06 1.37.06 4s-.01 3-.06 4ZM12 6.87A5.13 5.13 0 1 0 17.14 12A5.12 5.12 0 0 0 12 6.87Zm0 8.46A3.33 3.33 0 1 1 15.33 12A3.33 3.33 0 0 1 12 15.33Z" />
        </svg>
        </span>
        <span className={styles.label}>Sledujte nás</span>
      </a>
    </div>
  );
}
