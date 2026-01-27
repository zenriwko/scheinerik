"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./CookieBanner.module.css";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    window.dispatchEvent(new Event("cookie-consent-accepted"));
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem("cookieConsent", "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className={styles.wrap} role="dialog" aria-live="polite" aria-label="Nastavení cookies">
      <div className={styles.card}>
        <div className={styles.textBlock}>
          <p className={styles.title}>Cookies</p>
          <p className={styles.text}>
            Používáme nezbytné cookies pro správné fungování webu. Analytické a marketingové cookies
            (Google Analytics, Meta Pixel) spouštíme pouze s vaším souhlasem.
          </p>

          <div className={styles.links}>
            <Link href="/ochrana-osobnich-udaju" className={styles.link}>
              Ochrana osobních údajů
            </Link>
            <span className={styles.dot}>•</span>
            <Link href="/obchodni-podminky" className={styles.link}>
              Obchodní podmínky
            </Link>
          </div>
        </div>

        <div className={styles.actions}>
          <button type="button" className={styles.decline} onClick={decline}>
            Odmítnout
          </button>
          <button type="button" className={`button white ${styles.accept}`} onClick={accept}>
            Souhlasím
          </button>
        </div>
      </div>
    </div>
  );
}