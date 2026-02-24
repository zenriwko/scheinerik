"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import styles from "./Navigation.module.css";
import Image from "next/image";
import Link from "next/link";

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <header className={styles.nav}>
      <div className={`container ${styles.inner}`}>

        {/* Logo */}
        <Link
          href="/"
          className={styles.logoWrapper}
          aria-label=""
        >
          <Image
            src="/images/scheinerik-logo.png"
            alt="scheinerik logo"
            fill
            sizes="120px"
            style={{ objectFit: "contain" }}
            priority
          />
        </Link>

        {/* Hamburger (mobile only) */}
        <button
          className={`${styles.hamburger} ${menuOpen ? styles.active : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
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
            <li>
              <Link
                href="/"
                className={isActive("/sluzby") ? styles.activeLink : ""}
              >
                2
              </Link>
            </li>
          </ul>
        </nav>

        {/* Desktop CTA buttons */}
        <div className={styles.ctaInline}>
          <Link
            href="/cenik"
            className={`button ${isActive("/cenik") ? "active" : ""}`}
          >
            <span>Ceník</span>
          </Link>

          <Link
            href="/kontakt"
            className={`button ghost ${isActive("/kontakt") ? "active" : ""}`}
          >
            <span>Kontakt</span>
          </Link>
        </div>
      </div>

      {/* Full-screen mobile overlay */}
      {menuOpen && (
        <div className={styles.overlay}>
          <ul>
            <li>
              <Link
                href="/sluzby"
                className={isActive("/sluzby") ? styles.activeLink : ""}
                onClick={() => setMenuOpen(false)}
              >
                Služby
              </Link>
            </li>
            <li>
              <Link
                href="/galerie"
                className={isActive("/galerie") ? styles.activeLink : ""}
                onClick={() => setMenuOpen(false)}
              >
                Galerie
              </Link>
            </li>
            <li>
              <Link
                href="/nase-prace"
                className={isActive("/nase-prace") ? styles.activeLink : ""}
                onClick={() => setMenuOpen(false)}
              >
                Naše Práce
              </Link>
            </li>
            <li>
              <Link
                href="/o-nas"
                className={isActive("/o-nas") ? styles.activeLink : ""}
                onClick={() => setMenuOpen(false)}
              >
                O Nás
              </Link>
            </li>
          </ul>

          <div className={styles.overlayCTA}>
            <Link
              className="button"
              href="/cenik"
              onClick={() => setMenuOpen(false)}
            >
              <span>Ceník</span>
            </Link>
            <Link
              className="button ghost"
              href="/kontakt"
              onClick={() => setMenuOpen(false)}
            >
              <span>Kontakt</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}