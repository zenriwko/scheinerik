'use client';

import { useRef, useEffect } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, Loader2, CheckCircle } from 'lucide-react';
import styles from './Contact.module.css';

export default function Contact() {
  const [state, handleSubmit] = useForm('mgoryjpb');

  // ── Time gate: block submissions under 4 s (bots submit instantly) ──────────
  const mountTime = useRef(0);

  useEffect(() => {
    mountTime.current = Date.now();
  }, []);

  // ── Custom submit: run bot checks before handing off to Formspree ───────────
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 1. Honeypot — bots fill hidden fields, humans don't
    const honeypot = (e.currentTarget.elements.namedItem('website') as HTMLInputElement | null);
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
          <h2>Ready to build something exceptional?</h2>
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
                  required
                  disabled={state.submitting}
                  className={styles.input}
                />
                <ValidationError field="name" errors={state.errors} className={styles.fieldError} />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="contact-email" className={styles.inputLabel}>Email</label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  required
                  disabled={state.submitting}
                  className={styles.input}
                />
                <ValidationError field="email" errors={state.errors} className={styles.fieldError} />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="contact-message" className={styles.inputLabel}>Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  placeholder="Tell me about your project..."
                  rows={6}
                  required
                  disabled={state.submitting}
                  className={styles.textarea}
                />
                <ValidationError field="message" errors={state.errors} className={styles.fieldError} />
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
