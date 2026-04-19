'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import SEO from '@/components/%SEO/SEO';
import styles from './index.module.css';

// ─── Project data ─────────────────────────────────────────────────────────────

type Status = 'live' | 'in-progress' | 'case-study';

interface Project {
  title: string;
  category: string;
  year: string;
  status: Status;
  statusLabel: string;
  description: string;
  image: string | null;
  gradient?: string;
  gradientAccent?: string;
  tech: string[];
  href: string;
  external: boolean;
}

const projects: Project[] = [
  {
    title: 'Nocni Nebe',
    category: 'Client Project',
    year: '2026',
    status: 'live',
    statusLabel: 'Live',
    description:
      'Brochure website for an optical fiber ambient lighting brand for car interiors — built on Next.js with a strong focus on performance, mobile UX, and conversion-focused design.',
    image: '/images/projects/nocni-nebe-project.webp',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    href: 'https://nocninebe.eu/',
    external: true,
  },
  {
    title: 'BahayFind',
    category: 'Personal Project',
    year: '2026',
    status: 'in-progress',
    statusLabel: 'In Progress',
    description:
      'Full-scale real estate SaaS with agent dashboards, location-based search powered by Mapbox, payment-gated featured slots, and a multi-role auth system.',
    image: '/images/projects/bahayfind-project.webp',
    tech: ['Next.js', 'Supabase', 'Prisma', 'Mapbox', 'Stripe'],
    href: 'https://bahayfind.com/',
    external: true,
  },
  {
    title: 'Demo Websites',
    category: 'Service Showcase',
    year: '2025',
    status: 'live',
    statusLabel: 'Live',
    description:
      'Standalone demo websites for local businesses — roofing, remodeling, cleaning and more. Browse live demos to see exactly what your site could look like.',
    image: null,
    gradient: 'linear-gradient(145deg, #1a1330 0%, #0e0a1c 100%)',
    gradientAccent: 'radial-gradient(ellipse 70% 60% at 50% 40%, rgba(20,184,166,0.12) 0%, transparent 70%)',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'SEO'],
    href: '/demo',
    external: false,
  },
];

const statusConfig: Record<Status, { label: string; className: string }> = {
  live:         { label: 'Live',        className: styles.badgeLive },
  'in-progress': { label: 'In Progress', className: styles.badgeProgress },
  'case-study':  { label: 'Case Study',  className: styles.badgeCaseStudy },
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function ProjectsPage() {
  return (
    <>
      <SEO
        title="Portfolio – Next.js & Full-Stack Projects"
        description="Web development projects by Erik Scheinpflug — client websites, eCommerce stores, and personal SaaS builds using Next.js, TypeScript, and Supabase."
        path="/projects"
      />

      {/* ── Hero ──────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroBg} aria-hidden="true" />
        <div className={styles.container}>
          <motion.div
            className={styles.heroContent}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className={styles.kicker}>Portfolio</span>
            <h1 className={styles.heroTitle}>
              Selected work
            </h1>
            <p className={styles.heroLead}>
              Real projects built with performance, SEO, and clean code in mind.
              Client work and personal builds I&apos;m proud to ship.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Projects grid ─────────────────────────────────── */}
      <section className={styles.projects}>
        <div className={styles.container}>
          <div className={styles.grid}>
            {projects.map((project, i) => {
              const badge = statusConfig[project.status];
              const isExternal = project.external;
              const CardWrapper = isExternal ? 'a' : Link;
              const wrapperProps = isExternal
                ? { href: project.href, target: '_blank', rel: 'noopener noreferrer' }
                : { href: project.href };

              return (
                <motion.article
                  key={project.title}
                  className={styles.card}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Image / Gradient */}
                  <CardWrapper {...(wrapperProps as any)} className={styles.imageLink} tabIndex={-1} aria-hidden="true">
                    <div className={styles.imageWrapper}>
                      {project.image ? (
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          quality={85}
                          className={styles.image}
                        />
                      ) : (
                        <div className={styles.gradientBg} style={{ background: project.gradient }}>
                          <div className={styles.gradientAccent} style={{ background: project.gradientAccent }} />
                          <span className={styles.gradientLabel}>{project.title.charAt(0)}</span>
                        </div>
                      )}
                      <div className={styles.overlay}>
                        {isExternal
                          ? <ArrowUpRight size={32} className={styles.overlayIcon} />
                          : <ArrowRight size={32} className={styles.overlayIcon} />
                        }
                      </div>
                    </div>
                  </CardWrapper>

                  {/* Content */}
                  <div className={styles.content}>
                    <div className={styles.meta}>
                      <span className={`${styles.badge} ${badge.className}`}>{badge.label}</span>
                      <span className={styles.category}>{project.category} · {project.year}</span>
                    </div>

                    <CardWrapper {...(wrapperProps as any)} className={styles.titleLink}>
                      <h2 className={styles.title}>{project.title}</h2>
                    </CardWrapper>

                    <p className={styles.description}>{project.description}</p>

                    <div className={styles.techRow}>
                      {project.tech.map((t) => (
                        <span key={t} className={styles.pill}>{t}</span>
                      ))}
                    </div>

                    <div className={styles.cardFooter}>
                      <CardWrapper {...(wrapperProps as any)} className={styles.cta}>
                        {isExternal ? (
                          <>View site <ArrowUpRight size={15} /></>
                        ) : (
                          <>View project <ArrowRight size={15} /></>
                        )}
                      </CardWrapper>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>

          {/* More coming note */}
          <motion.div
            className={styles.moreNote}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className={styles.moreDot} />
            <p>More projects in progress — check back soon or <Link href="/contact" className="link-underline">get in touch</Link> to discuss yours.</p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
