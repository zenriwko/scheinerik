'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Mail, Phone, MapPin, Instagram } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>

          {/* LOGO + BIO */}
          <div className={styles.brand}>
            <Link href="/" className={styles.logoWrapper}>
              <Image
                src="/images/scheinerik-logo.png"
                alt="ScheinErik.dev"
                fill
                sizes="140px"
                style={{ objectFit: 'contain' }}
                priority
              />
            </Link>
            <p className={styles.bio}>
              Full-Stack & SEO Developer<br />
              Building fast, beautiful and conversion-focused digital experiences.
            </p>
          </div>

          {/* NAVIGATION */}
          <div className={styles.nav}>
            <h4>Navigation</h4>
            <nav>
              <Link href="#projects">Projects</Link>
              <Link href="#experience">Experience</Link>
              <Link href="#about">About</Link>
              <Link href="#contact">Contact</Link>
            </nav>
          </div>

          {/* CONTACT */}
          <div className={styles.contact}>
            <h4>Contact</h4>
            <div className={styles.contactInfo}>
              <a href="mailto:erik@scheinpflug.dev">
                <Mail size={20} /> erik@scheinpflug.dev
              </a>
              <div>
                <MapPin size={20} /> Mladá Boleslav, Czech Republic
              </div>
            </div>
          </div>

          {/* SOCIAL + LEGAL */}
          <div className={styles.socialLegal}>
            <div className={styles.social}>
              <a
                href="https://instagram.com/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </a>
            </div>

            <div className={styles.legal}>
              <Link href="/obchodni-podminky">Obchodní podmínky</Link>
              <Link href="/ochrana-osobnich-udaju">Ochrana osobních údajů</Link>
            </div>

            <p className={styles.copyright}>
              © {currentYear} scheinerik.dev • All rights reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}