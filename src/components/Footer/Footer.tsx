import styles from "./Footer.module.css";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className={styles.footerSection}>
      <div className={styles.footer}>

        {/* LOGO + DESCRIPTION */}
        <div className={styles.footerLogo}>
          <a href="/" className={styles.logoWrapper} aria-label="">
            <Image
              src="/images/scheinerik-logo.png"
              alt="scheinerik logo"
              fill
              sizes="120px"
              style={{ objectFit: "contain" }}
              priority
            />
          </a>
          <p>
            © scheinerik.dev<br></br><br></br>
          </p>
          <p>
            Creating ecommerce websites.
          </p>
          <p>
            <Link href="/obchodni-podminky/">Obchodní Podmínky</Link> | <Link href="/ochrana-osobnich-udaju/">Ochrana Osobních Údajů</Link>
          </p>
        </div>

        {/* CONTACT INFO */}
        <div className={styles.footerContact}>
          <h4>Kontaktní údaje</h4>
          <ul>
            <li><b></b><br></br>
            <a target="_blank" href=""></a></li>
            <br></br>
            <li><a href="tel:"></a></li>
            <li><a href="mailto:"></a></li>
            <li><a href="#"></a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div className={styles.footerContact}>
          <h4>Sledujte nás</h4>
          {/* Google Review Banner */}
          <a
            href=""
            target="_blank"
            rel="noopener noreferrer"
            className={styles.googleReview}
          >
            <div className={styles.googleReviewInner}>
              <svg width="52" height="52" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><g fill="none" fillRule="evenodd" clipRule="evenodd"><path fill="#F44336" d="M7.209 1.061c.725-.081 1.154-.081 1.933 0a6.57 6.57 0 0 1 3.65 1.82a100 100 0 0 0-1.986 1.93q-1.876-1.59-4.188-.734q-1.696.78-2.362 2.528a78 78 0 0 1-2.148-1.658a.26.26 0 0 0-.16-.027q1.683-3.245 5.26-3.86" opacity=".987"/><path fill="#FFC107" d="M1.946 4.92q.085-.013.161.027a78 78 0 0 0 2.148 1.658A7.6 7.6 0 0 0 4.04 7.99q.037.678.215 1.331L2 11.116Q.527 8.038 1.946 4.92" opacity=".997"/><path fill="#448AFF" d="M12.685 13.29a26 26 0 0 0-2.202-1.74q1.15-.812 1.396-2.228H8.122V6.713q3.25-.027 6.497.055q.616 3.345-1.423 6.032a7 7 0 0 1-.51.49" opacity=".999"/><path fill="#43A047" d="M4.255 9.322q1.23 3.057 4.51 2.854a3.94 3.94 0 0 0 1.718-.626q1.148.812 2.202 1.74a6.62 6.62 0 0 1-4.027 1.684a6.4 6.4 0 0 1-1.02 0Q3.82 14.524 2 11.116z" opacity="1"/></g></svg>

              <span className={styles.googleText}>
                Klikněte a zanechte nám recenzi na <strong>Google</strong>
              </span>
            </div>
          </a>
          <div className={styles.socialRow}>

            {/* Instagram */}
            <a
              href=""
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialItem}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>

            {/* Facebook 
            <a
              href="https://facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialItem}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="#fff" d="M12 2.04c-5.5 0-10 4.49-10 10.02c0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89c1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02Z"/></svg>
            </a>
            */}
            {/* TikTok 
            <a
              href="https://tiktok.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialItem}
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.8 2h3.2c.2 1.6 1.4 3 3 3.4v3.2c-1.1-.1-2.1-.4-3-.9v6.6c0 6.1-6.7 9.5-11.8 5.8C2.1 17.3 3.3 9.7 9.1 8.4v3.4c-.8.3-1.5.8-2 1.5-.9 1.3-.6 3.2.8 4.1 2 1.3 4.6-.2 4.6-2.5V2z" />
              </svg>
            </a>
            */}

            {/* YouTube 
            <a
              href="https://youtube.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialItem}
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.54 6.42a2.8 2.8 0 0 0-2-2C18.9 4 12 4 12 4s-6.9 0-8.54.42a2.8 2.8 0 0 0-2 2A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.8 2.8 0 0 0 2 2C5.1 20 12 20 12 20s6.9 0 8.54-.42a2.8 2.8 0 0 0 2-2A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM10 15.5v-7l6 3.5-6 3.5z" />
              </svg>
            </a>
            */}

          </div>
        </div>

        {/* NAVIGATION */}
        <div className={styles.footerNavigation}>
          <h4>Website Development</h4>

          <nav className={styles.footerNav} aria-label="Footer navigace">
            <Link
              href=""
            >
              › Local Business
            </Link>

            <Link
              href=""
            >
              › eCommerce
            </Link>
          </nav>
        </div>
      
      </div>

    </footer>
  );
}