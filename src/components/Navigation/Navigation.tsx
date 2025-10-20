import { useState } from "react";
import styles from "./Navigation.module.css";
import Image from "next/image";
import Link from "next/link";

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  return (
    <header className={styles.nav}>
      <div className={`container ${styles.inner}`}>
        {/* Logo */}
        <Link
          href="/"
          className={styles.logoWrapper}
          aria-label="Magické Nebe - domů"
        >
          <Image
            src="/images/nocni-nebe-logo.png"
            alt="Magické Nebe logo"
            fill
            sizes="120px"
            style={{ objectFit: "contain" }}
            priority
          />
        </Link>

        {/* Hamburger (mobile only) */}
        <button
          className={`${styles.hamburger} ${menuOpen ? styles.active : ""}`}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>

        {/* Desktop navigation */}
        <nav className={styles.navigation} aria-label="Hlavní navigace">
          <ul>
            <li><Link href="/sluzby">Služby</Link></li>
            <li><Link href="/galerie">Galerie</Link></li>
            <li><Link href="/nase-prace">Naše Práce</Link></li>
            <li><Link href="/o-nas">O Nás</Link></li>
          </ul>
        </nav>

        {/* Desktop CTA buttons */}
        <div className={styles.ctaInline}>
          <Link className="button" href="/cenik"><span>Ceník</span></Link>
          <Link className="button ghost" href="/kontakt"><span>Nezávazná poptávka</span></Link>
        </div>
      </div>

      {/* Full-screen mobile overlay */}
      {menuOpen && (
        <div className={styles.overlay}>
          <ul>
            <li><Link href="/sluzby" onClick={() => setMenuOpen(false)}>Služby</Link></li>
            <li><Link href="/galerie" onClick={() => setMenuOpen(false)}>Galerie</Link></li>
            <li><Link href="/nase-prace" onClick={() => setMenuOpen(false)}>Naše Práce</Link></li>
            <li><Link href="/o-nas" onClick={() => setMenuOpen(false)}>O Nás</Link></li>
          </ul>
          <div className={styles.overlayCTA}>
            <Link className="button" href="/cenik" onClick={() => setMenuOpen(false)}>
              <span>Ceník</span>
            </Link>
            <Link className="button ghost" href="/kontakt" onClick={() => setMenuOpen(false)}>
              <span>Nezávazná poptávka</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}