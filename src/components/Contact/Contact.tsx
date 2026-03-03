'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import styles from './Contact.module.css';

export default function Contact() {
  return (
    <section className={styles.contact} id="contact">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.kicker}>LET’S WORK TOGETHER</span>
          <h2>Ready to build something exceptional?</h2>
          <p className={styles.lead}>
            I’m currently available for new projects — from high-performance websites to complete digital solutions.
          </p>
        </div>

        <div className={styles.content}>
          {/* Contact Info */}
          <motion.div
            className={styles.info}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >
            <div className={styles.infoItem}>
              <Mail size={28} />
              <div>
                <p className={styles.label}>Email</p>
                <a href="mailto:hello@scheinerik.dev" className={styles.value}>
                  hello@scheinerik.dev
                </a>
              </div>
            </div>

            <div className={styles.infoItem}>
              <MapPin size={28} />
              <div>
                <p className={styles.label}>Based in</p>
                <p className={styles.value}>
                  Mladá Boleslav, Czech Republic
                  <br />
                  <span className={styles.note}>Open to remote work worldwide</span>
                </p>
              </div>
            </div>
          </motion.div>

          {/* Modern Glass Form */}
          <motion.form
            className={styles.form}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15 }}
          >
            <div className={styles.inputGroup}>
              <input type="text" placeholder="Your name" required className={styles.input} />
            </div>
            <div className={styles.inputGroup}>
              <input type="email" placeholder="Your email" required className={styles.input} />
            </div>
            <div className={styles.inputGroup}>
              <textarea
                placeholder="Tell me about your project..."
                rows={6}
                required
                className={styles.textarea}
              />
            </div>

            <button type="submit" className={styles.submit}>
              Send Message
              <Send size={20} />
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}