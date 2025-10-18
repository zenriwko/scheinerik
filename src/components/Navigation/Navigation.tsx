import styles from "./Navigation.module.css";
import Image from "next/image";
import Link from "next/link";

export default function Navigation() {
  return (
    <header className={styles.nav}>
      <div className={`container ${styles.inner}`}>
        {/* Logo */}
        <Link href="/" className={styles.logoWrapper} aria-label="Magické Nebe - domů">
          <Image
            src="/images/nocni-nebe-logo.png"
            alt="Magické Nebe logo"
            fill
            sizes="120px"
            style={{ objectFit: "contain" }}
            priority
          />
        </Link>

        {/* Main navigation */}
        <nav className={styles.navigation} aria-label="Hlavní navigace">
          <ul>
            <li>
              <Link href="/sluzby">Služby</Link>
            </li>
            <li>
              <Link href="/galerie">Galerie</Link>
            </li>
            <li>
              <Link href="/nase-prace">Naše Práce</Link>
            </li>
            <li>
              <Link href="/o-nas">O Nás</Link>
            </li>
          </ul>
        </nav>

        {/* CTA buttons */}
        <div className={styles.ctaInline}>
          <Link className={`button`} href="/cenik">
            <span>Ceník</span>
          </Link>
          <Link className={`button ghost`} href="/kontakt">
            <span>Nezávazná poptávka</span>
          </Link>
        </div>
      </div>
    </header>
  );
}