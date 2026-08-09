"use client";

import { useRef, useState } from "react";
import { usePathname } from "next/navigation";
import styles from "./Navigation.module.css";
import Image from "next/image";
import Link from "next/link";

// Free standalone tools, grouped under one "Tools" nav entry — add future
// tools here rather than growing the top-level nav list.
const TOOLS = [{ href: "/mockup", label: "Mockup Generator" }];

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;
  const isToolsActive = TOOLS.some((t) => isActive(t.href));

  const openTools = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setToolsOpen(true);
  };
  const scheduleCloseTools = () => {
    closeTimer.current = setTimeout(() => setToolsOpen(false), 150);
  };

  return (
    <header className={styles.nav}>
      <div className={`container ${styles.inner}`}>

        {/* Logo */}
        <Link href="/" className={styles.logoWrapper} aria-label="Home">
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
        <nav className={styles.navigation} aria-label="Main navigation">
          <ul>
            <li>
              <Link
                href="/services"
                className={isActive("/services") ? styles.activeLink : ""}
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                href="/pricing"
                className={isActive("/pricing") ? styles.activeLink : ""}
              >
                Pricing
              </Link>
            </li>
            <li>
              <Link
                href="/projects"
                className={isActive("/projects") ? styles.activeLink : ""}
              >
                Projects
              </Link>
            </li>
            <li>
              <Link
                href="/demo"
                className={isActive("/demo") ? styles.activeLink : ""}
              >
                Demos
              </Link>
            </li>
            <li
              className={styles.dropdown}
              onMouseEnter={openTools}
              onMouseLeave={scheduleCloseTools}
            >
              <button
                type="button"
                className={`${styles.dropdownTrigger} ${isToolsActive ? styles.activeLink : ""}`}
                onClick={() => setToolsOpen((v) => !v)}
                aria-haspopup="true"
                aria-expanded={toolsOpen}
              >
                Tools
              </button>
              {toolsOpen && (
                <ul className={styles.dropdownMenu}>
                  {TOOLS.map((tool) => (
                    <li key={tool.href}>
                      <Link
                        href={tool.href}
                        className={isActive(tool.href) ? styles.activeLink : ""}
                        onClick={() => setToolsOpen(false)}
                      >
                        {tool.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            <li>
              <Link
                href="/about"
                className={isActive("/about") ? styles.activeLink : ""}
              >
                About
              </Link>
            </li>
          </ul>
        </nav>

        {/* Desktop CTA */}
        <div className={styles.ctaInline}>
          <Link
            href="/contact"
            className={`button${isActive("/contact") ? " active" : ""}`}
          >
            <span>Contact</span>
          </Link>
        </div>
      </div>

      {/* Full-screen mobile overlay */}
      {menuOpen && (
        <div className={styles.overlay}>
          <ul>
            <li>
              <Link
                href="/services"
                className={isActive("/services") ? styles.activeLink : ""}
                onClick={() => setMenuOpen(false)}
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                href="/pricing"
                className={isActive("/pricing") ? styles.activeLink : ""}
                onClick={() => setMenuOpen(false)}
              >
                Pricing
              </Link>
            </li>
            <li>
              <Link
                href="/projects"
                className={isActive("/projects") ? styles.activeLink : ""}
                onClick={() => setMenuOpen(false)}
              >
                Projects
              </Link>
            </li>
            <li>
              <Link
                href="/demo"
                className={isActive("/demo") ? styles.activeLink : ""}
                onClick={() => setMenuOpen(false)}
              >
                Demos
              </Link>
            </li>
            <li className={styles.overlayToolsGroup}>
              <span className={styles.overlayToolsLabel}>Tools</span>
              <ul className={styles.overlayToolsList}>
                {TOOLS.map((tool) => (
                  <li key={tool.href}>
                    <Link
                      href={tool.href}
                      className={isActive(tool.href) ? styles.activeLink : ""}
                      onClick={() => setMenuOpen(false)}
                    >
                      {tool.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li>
              <Link
                href="/about"
                className={isActive("/about") ? styles.activeLink : ""}
                onClick={() => setMenuOpen(false)}
              >
                About
              </Link>
            </li>
          </ul>

          <div className={styles.overlayCTA}>
            <Link className="button" href="/contact" onClick={() => setMenuOpen(false)}>
              <span>Contact</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
