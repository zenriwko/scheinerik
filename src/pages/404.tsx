import Link from 'next/link';
import SEO from '@/components/%SEO/SEO';
import styles from './404.module.css';

export default function NotFoundPage() {
  return (
    <>
      <SEO
        title="404 – Page Not Found"
        description="This page doesn't exist. Head back to the homepage."
        path="/404"
        noindex
      />
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <span className={styles.code}>404</span>
          <h1 className={styles.title}>Page not found</h1>
          <p className={styles.message}>
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <div className={styles.actions}>
            <Link href="/" className="button">Back to Home</Link>
            <Link href="/projects" className="button secondary">View Projects</Link>
          </div>
        </div>
      </div>
    </>
  );
}
