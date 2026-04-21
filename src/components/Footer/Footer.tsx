'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Mail, MapPin, Github, Linkedin } from 'lucide-react';
import styles from './Footer.module.css';

const navLinks = [
  { label: 'Services',  href: '/services' },
  { label: 'Pricing',   href: '/pricing' },
  { label: 'Projects',  href: '/projects' },
  { label: 'Demos',     href: '/demo' },
  { label: 'About',     href: '/about' },
  { label: 'Contact',   href: '/contact' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>

        {/* ── Main columns ── */}
        <div className={styles.grid}>

          {/* Brand */}
          <div className={styles.brand}>
            <Link href="/" className={styles.logoWrapper} aria-label="Home">
              <Image
                src="/images/scheinerik-logo.png"
                alt="scheinerik.dev"
                fill
                sizes="140px"
                style={{ objectFit: 'contain' }}
                priority
              />
            </Link>
            <p className={styles.bio}>
              Full-stack developer focused on performance,
              clean code, and sites that actually convert.
            </p>
            <div className={styles.socials}>
              <a
                href="https://github.com/zenriwko"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className={styles.socialIcon}
              >
                <Github size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/erik-scheinpflug-5335b8305/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className={styles.socialIcon}
              >
                <Linkedin size={18} />
              </a>
              <a
                href="mailto:scheinerik@gmail.com"
                aria-label="Email"
                className={styles.socialIcon}
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className={styles.col}>
            <h4 className={styles.colHeading}>Navigation</h4>
            <nav className={styles.navLinks}>
              {navLinks.map(({ label, href }) => (
                <Link key={href} href={href}>{label}</Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className={styles.col}>
            <h4 className={styles.colHeading}>Contact</h4>
            <div className={styles.contactList}>
              <a href="mailto:scheinerik@gmail.com" className={styles.contactRow}>
                <Mail size={15} />
                scheinerik@gmail.com
              </a>
              <div className={styles.contactRow}>
                <MapPin size={15} />
                Czech Republic
              </div>
            </div>
            <div className={styles.availability}>
              <span className={styles.availDot} />
              Available for new projects
            </div>
          </div>

        </div>

        {/* ── Bottom bar ── */}
        <div className={styles.bottom}>
          <span className={styles.copyright}>
            © {currentYear} scheinerik.dev — All rights reserved
          </span>
          <span className={styles.stack}>
            Built with Next.js &amp; deployed on Vercel
          </span>
        </div>

      </div>
    </footer>
  );
}
