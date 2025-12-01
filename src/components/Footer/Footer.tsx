import styles from "./Footer.module.css";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className={styles.footerSection}>
      <div className={styles.footer}>
        {/* Logo + Text */}
        <div className={styles.footerLogo}>
          <a href="/" className={styles.logoWrapper} aria-label="Magické Nebe - domů">
            <Image
              src="/images/nocni-nebe-logo.png"
              alt="Magické Nebe logo"
              fill
              sizes="120px"
              style={{ objectFit: "contain" }}
              priority
            />
          </a>
          <p>
            Luxusní hvězdná obloha z optických vláken – pro stropy a interiéry aut.
          </p>
        </div>

        {/* Footer navigation */}
        <nav className={styles.footerNav} aria-label="Footer navigace">
          <a href="#galerie">Galerie</a>
          <a href="#sluzby">Služby</a>
          <a href="#cenik">Ceník</a>
          <a href="#kontakt">Kontakt</a>
        </nav>
      </div>
    </footer>
  );
}