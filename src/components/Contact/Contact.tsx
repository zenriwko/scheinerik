'use client';

import { useRef, useEffect, useState } from 'react';
import { useForm } from '@formspree/react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, Loader2, CheckCircle } from 'lucide-react';
import styles from './Contact.module.css';

type FieldErrors = { name?: string; email?: string; message?: string };

type ContactProps = {
  // This component is reused as a bottom-of-page CTA on the homepage and
  // /about (which already have their own h1 higher up the page), and as the
  // entire content of the standalone /contact route (which otherwise has no
  // h1 at all). Set this when rendering it as that standalone page so it
  // gets a real h1 instead of an h2, without changing how it looks.
  asPage?: boolean;
};

export default function Contact({ asPage = false }: ContactProps) {
  const [state, handleSubmit] = useForm('mgoryjpb');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  // ── Time gate: block submissions under 4 s (bots submit instantly) ──────────
  const mountTime = useRef(0);

  useEffect(() => {
    mountTime.current = Date.now();
  }, []);

  // ── Custom submit: validate, run bot checks, hand off to Formspree ──────────
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    const name    = (form.elements.namedItem('name')    as HTMLInputElement).value.trim();
    const email   = (form.elements.namedItem('email')   as HTMLInputElement).value.trim();
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value.trim();

    const errors: FieldErrors = {};
    if (!name)    errors.name    = 'Please enter your name.';
    if (!email)   errors.email   = 'Please enter your email.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
                  errors.email   = 'Please enter a valid email address.';
    if (!message) errors.message = 'Please enter a message.';

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});

    // 1. Honeypot — bots fill hidden fields, humans don't
    const honeypot = (form.elements.namedItem('website') as HTMLInputElement | null);
    if (honeypot?.value) return;

    // 2. Time gate — require at least 4 seconds (silent, no error shown)
    if (Date.now() - mountTime.current < 4000) return;

    handleSubmit(e);
  };

  return (
    <section className={styles.contact} id="contact">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.kicker}>Let&apos;s work together</span>
          {asPage ? (
            <h1 className={styles.pageHeading}>Ready to build something exceptional?</h1>
          ) : (
            <h2>Ready to build something exceptional?</h2>
          )}
          <p className={styles.lead}>
            I&apos;m currently available for new projects — from high-performance websites to complete digital solutions.
          </p>
        </div>

        <div className={styles.content}>
          {/* Contact Info */}
          <motion.div
            className={styles.info}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className={styles.infoItem}>
              <Mail size={28} />
              <div>
                <p className={styles.label}>Email</p>
                <a href="mailto:scheinerik@gmail.com" className={styles.value}>
                  scheinerik@gmail.com
                </a>
              </div>
            </div>

            <div className={styles.infoItem}>
              <MapPin size={28} />
              <div>
                <p className={styles.label}>Location</p>
                <p className={styles.value}>
                  Serving Tampa, FL and worldwide
                  <br />
                  <span className={styles.note}>Open to remote work worldwide</span>
                </p>
              </div>
            </div>
          </motion.div>

          {/* Success state */}
          {state.succeeded ? (
            <motion.div
              className={styles.successCard}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <CheckCircle size={52} className={styles.successIcon} />
              <h3>Message sent!</h3>
              <p>Thanks for reaching out. I&apos;ll get back to you within 24 hours.</p>
            </motion.div>
          ) : (
            <motion.form
              className={styles.form}
              onSubmit={onSubmit}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              noValidate
            >
              {/* Honeypot — visually hidden, bots fill it, humans don't */}
              <div className={styles.honeypot} aria-hidden="true">
                <label htmlFor="website">Leave this empty</label>
                <input
                  id="website"
                  name="website"
                  type="text"
                  autoComplete="off"
                  tabIndex={-1}
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="contact-name" className={styles.inputLabel}>Name</label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  disabled={state.submitting}
                  className={`${styles.input} ${fieldErrors.name ? styles.inputError : ''}`}
                  onChange={() => fieldErrors.name && setFieldErrors(e => ({ ...e, name: undefined }))}
                />
                {fieldErrors.name && <span className={styles.fieldError}>{fieldErrors.name}</span>}
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="contact-email" className={styles.inputLabel}>Email</label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  disabled={state.submitting}
                  className={`${styles.input} ${fieldErrors.email ? styles.inputError : ''}`}
                  onChange={() => fieldErrors.email && setFieldErrors(e => ({ ...e, email: undefined }))}
                />
                {fieldErrors.email && <span className={styles.fieldError}>{fieldErrors.email}</span>}
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="contact-message" className={styles.inputLabel}>Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  placeholder="Tell me about your project..."
                  rows={6}
                  disabled={state.submitting}
                  className={`${styles.textarea} ${fieldErrors.message ? styles.inputError : ''}`}
                  onChange={() => fieldErrors.message && setFieldErrors(e => ({ ...e, message: undefined }))}
                />
                {fieldErrors.message && <span className={styles.fieldError}>{fieldErrors.message}</span>}
              </div>

              <button
                type="submit"
                disabled={state.submitting}
                className={styles.submit}
              >
                {state.submitting ? (
                  <>
                    <Loader2 size={20} className={styles.spin} />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send size={20} />
                  </>
                )}
              </button>
            </motion.form>
          )}
        </div>
      </div>
    </section>
  );
}
