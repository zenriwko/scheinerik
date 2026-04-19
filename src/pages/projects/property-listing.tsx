'use client';

import { useState } from 'react';
import SEO from '@/components/%SEO/SEO';
import styles from './property-listing.module.css';

interface Task  { label: string; tags: string[]; done: boolean; }
interface Phase { id: number; title: string; weeks: string; color: string; tasks: Task[]; }
interface TagStyle { bg: string; color: string; }

const phases: Phase[] = [
  {
    id: 1,
    title: 'Phase 1 — Foundation',
    weeks: 'Weeks 1–4',
    color: '#14b8a6',
    tasks: [
      { label: 'Next.js 14 + Tailwind + shadcn/ui setup',                                    tags: ['FE','INFRA'], done: false },
      { label: 'Turborepo monorepo + GitHub Actions CI',                                       tags: ['INFRA'],      done: false },
      { label: 'Supabase/Neon PostgreSQL provisioned',                                         tags: ['BE','INFRA'], done: false },
      { label: 'Vercel project + preview deploys linked',                                      tags: ['INFRA'],      done: false },
      { label: 'Prisma schema: users, agents, listings, locations, inquiries, featured_slots', tags: ['BE'],         done: false },
      { label: 'PSGC location data seeded (region → province → city → barangay)',             tags: ['BE'],         done: false },
      { label: 'NextAuth.js v5: buyer / agent / admin roles + middleware',                     tags: ['BE','FE'],    done: false },
      { label: 'UI component library: listing card, search bar, nav, form inputs',            tags: ['FE'],         done: false },
      { label: 'Cloudflare R2 bucket for photo uploads',                                       tags: ['INFRA'],      done: false },
    ],
  },
  {
    id: 2,
    title: 'Phase 2 — Core Listings',
    weeks: 'Weeks 5–10',
    color: '#6366f1',
    tasks: [
      { label: 'Listing CRUD API (create, edit, delete, status)',               tags: ['BE'],      done: false },
      { label: 'Photo upload + reorder (R2 presigned URLs)',                     tags: ['BE','FE'], done: false },
      { label: 'Search endpoint: location, price, type, beds filters',          tags: ['BE'],      done: false },
      { label: 'Search results page with filter drawer',                         tags: ['FE'],      done: false },
      { label: 'Listing detail page (photos, specs, agent info)',               tags: ['FE'],      done: false },
      { label: 'Mapbox integration: pin clusters on search map',                tags: ['FS'],      done: false },
      { label: 'Listing detail map (single pin + neighbourhood)',               tags: ['FE'],      done: false },
      { label: 'SEO: dynamic meta, OG images, sitemap.xml, robots.txt',        tags: ['FE','BE'], done: false },
      { label: 'Mobile responsiveness audit on all pages',                      tags: ['FE'],      done: false },
    ],
  },
  {
    id: 3,
    title: 'Phase 3 — Agents & Users',
    weeks: 'Weeks 11–16',
    color: '#10b981',
    tasks: [
      { label: 'Agent profile pages (listings, bio, license no.)',                          tags: ['FE','BE'], done: false },
      { label: 'Agent verification flow (admin-approved)',                                   tags: ['BE','FE'], done: false },
      { label: 'Buyer saved listings / favourites',                                          tags: ['FS'],      done: false },
      { label: 'Inquiry system: buyer contacts agent via listing',                          tags: ['FS'],      done: false },
      { label: 'Resend email notifications (inquiry received, status updates)',             tags: ['BE'],      done: false },
      { label: 'Semaphore SMS alerts for new inquiries',                                    tags: ['BE'],      done: false },
      { label: 'PayMongo integration for featured listing payments',                        tags: ['FS'],      done: false },
      { label: 'Featured listing slot management (start/end dates)',                        tags: ['BE','FE'], done: false },
    ],
  },
  {
    id: 4,
    title: 'Phase 4 — Admin & Monetisation',
    weeks: 'Weeks 17–22',
    color: '#22d3ee',
    tasks: [
      { label: 'Admin dashboard: listing moderation queue',                    tags: ['FE','BE'],    done: false },
      { label: 'Admin: user management, agent approval',                       tags: ['FE','BE'],    done: false },
      { label: 'Admin: revenue reports + featured slot overview',              tags: ['FE','BE'],    done: false },
      { label: 'Mortgage calculator (BSP-based PH rates)',                     tags: ['FE'],         done: false },
      { label: 'Homepage featured slots + developer project pages',            tags: ['FE','BE'],    done: false },
      { label: 'Redis/Upstash caching for search results',                     tags: ['BE','INFRA'], done: false },
      { label: 'Analytics integration (Plausible or GA4)',                     tags: ['INFRA'],      done: false },
    ],
  },
  {
    id: 5,
    title: 'Phase 5 — QA & Launch',
    weeks: 'Weeks 23–26',
    color: '#a5b4fc',
    tasks: [
      { label: 'End-to-end testing (Playwright: search, inquiry, payment)',     tags: ['FS'],    done: false },
      { label: 'Load testing (k6): 1K concurrent users on search',             tags: ['INFRA'], done: false },
      { label: 'Core Web Vitals audit + image optimisation pass',              tags: ['FE'],    done: false },
      { label: 'Security review: auth, file upload, SQL injection',            tags: ['BE'],    done: false },
      { label: 'Soft launch to 50 pilot agents (feedback round)',              tags: ['FS'],    done: false },
      { label: 'Bug fixes + performance tuning from soft launch',              tags: ['FS'],    done: false },
      { label: 'Public launch + BetterStack uptime monitoring live',           tags: ['INFRA'], done: false },
    ],
  },
];

const TAG_STYLES: Record<string, TagStyle> = {
  FE:    { bg: 'rgba(99,102,241,0.15)',  color: '#a5b4fc' },
  BE:    { bg: 'rgba(20,184,166,0.15)',  color: '#5eead4' },
  FS:    { bg: 'rgba(16,185,129,0.15)',  color: '#6ee7b7' },
  INFRA: { bg: 'rgba(245,158,11,0.15)', color: '#fcd34d' },
};

const RGB: Record<string, string> = {
  '#14b8a6': '20,184,166',
  '#6366f1': '99,102,241',
  '#10b981': '16,185,129',
  '#22d3ee': '34,211,238',
  '#a5b4fc': '165,180,252',
};

export default function PropertyProjectPlan() {
  const [openPhases, setOpenPhases] = useState<Record<number, boolean>>({ 1: true });
  const [hoverPhase, setHoverPhase] = useState<number | null>(null);

  const toggle = (id: number) =>
    setOpenPhases((p) => ({ ...p, [id]: !p[id] }));

  const totalTasks = phases.reduce((s, p) => s + p.tasks.length, 0);
  const doneTasks  = phases.reduce((s, p) => s + p.tasks.filter((t) => t.done).length, 0);
  const pct        = Math.round((doneTasks / totalTasks) * 100);
  const phasePct   = (phase: Phase) =>
    Math.round((phase.tasks.filter((t) => t.done).length / phase.tasks.length) * 100);

  return (
    <>
      <SEO
        title="Property Listing SaaS – Project Roadmap"
        description="Full development roadmap for a Philippine property listing SaaS — multi-role auth, Mapbox search, PayMongo payments, built with Next.js and Supabase."
        path="/projects/property-listing"
      />

      <div className={styles.wrapper}>
        <div className={styles.container}>

          {/* Header */}
          <div className={styles.header}>
            <h1 className={styles.title}>
              <span className={styles.titleAccent}>PH</span> Property Listing — Project Plan
            </h1>
            <p className={styles.subtitle}>26 weeks · 3-dev team · Next.js + Supabase + Mapbox</p>
          </div>

          {/* Summary cards */}
          <div className={styles.summaryGrid}>
            {[
              { label: 'Total weeks', val: '26',        accent: '#14b8a6' },
              { label: 'Total tasks',  val: totalTasks,  accent: '#6366f1' },
              { label: 'Completed',    val: doneTasks,   accent: '#10b981' },
              { label: 'Progress',     val: `${pct}%`,   accent: '#22d3ee' },
            ].map((m) => (
              <div
                key={m.label}
                className={styles.summaryCard}
                style={{ '--accent': m.accent } as React.CSSProperties}
              >
                <div className={styles.summaryVal}>{m.val}</div>
                <div className={styles.summaryLabel}>{m.label}</div>
              </div>
            ))}
          </div>

          {/* Global progress bar */}
          <div className={styles.globalBar}>
            <div className={styles.globalBarFill} style={{ width: `${pct}%` }} />
          </div>

          {/* Legend */}
          <div className={styles.legend}>
            {Object.entries(TAG_STYLES).map(([tag, s]) => (
              <span key={tag} className={styles.legendTag} style={{ background: s.bg, color: s.color }}>
                {tag}
              </span>
            ))}
            <span className={styles.legendNote}>· set done: true in code to mark complete</span>
          </div>

          {/* Phases */}
          {phases.map((phase) => {
            const pp     = phasePct(phase);
            const isOpen = !!openPhases[phase.id];
            const isHov  = hoverPhase === phase.id;
            const rgb    = RGB[phase.color] ?? '148,163,184';

            return (
              <div
                key={phase.id}
                className={`${styles.phase} ${isOpen || isHov ? styles.phaseActive : ''}`}
                style={{
                  '--phase-color':  phase.color,
                  '--phase-glow':   `${phase.color}90`,
                  '--phase-border': `rgba(${rgb}, 0.3)`,
                  '--phase-bg':     `rgba(${rgb}, 0.07)`,
                } as React.CSSProperties}
              >
                {/* Phase header */}
                <div
                  className={[
                    styles.phaseHeader,
                    isOpen          ? styles.phaseHeaderOpen : '',
                    isHov && !isOpen ? styles.phaseHeaderHov : '',
                  ].join(' ')}
                  onClick={() => toggle(phase.id)}
                  onMouseEnter={() => setHoverPhase(phase.id)}
                  onMouseLeave={() => setHoverPhase(null)}
                >
                  <span
                    className={`${styles.dot} ${isOpen ? styles.dotGlow : ''}`}
                    style={{ background: phase.color }}
                  />
                  <span className={styles.phaseTitle}>{phase.title}</span>
                  <span className={styles.phaseWeeks}>{phase.weeks}</span>
                  <div className={styles.phaseBar}>
                    <div
                      className={styles.phaseBarFill}
                      style={{ width: `${pp}%`, background: phase.color }}
                    />
                  </div>
                  <span
                    className={styles.phasePct}
                    style={pp > 0 ? { color: phase.color } : undefined}
                  >
                    {pp}%
                  </span>
                  <span className={`${styles.arrow} ${isOpen ? styles.arrowOpen : ''}`}>▶</span>
                </div>

                {/* Tasks */}
                {isOpen && (
                  <div className={styles.tasks}>
                    {phase.tasks.map((task, ti) => (
                      <div
                        key={ti}
                        className={[
                          styles.task,
                          task.done ? styles.taskDone : '',
                          ti < phase.tasks.length - 1 ? styles.taskBorder : '',
                        ].join(' ')}
                      >
                        <div className={`${styles.checkbox} ${task.done ? styles.checkboxDone : ''}`}>
                          {task.done && (
                            <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                              <path d="M1 3.5L3.5 6L8 1" stroke="#0a0f1c" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </div>
                        <div className={styles.taskContent}>
                          <span className={`${styles.taskLabel} ${task.done ? styles.taskLabelDone : ''}`}>
                            {task.label}
                          </span>
                          <span className={styles.taskTags}>
                            {task.tags.map((tag) => (
                              <span
                                key={tag}
                                className={styles.tag}
                                style={{ background: TAG_STYLES[tag]?.bg, color: TAG_STYLES[tag]?.color }}
                              >
                                {tag}
                              </span>
                            ))}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {/* Footer */}
          <div className={styles.footer}>
            <span className={styles.footerStack}>Stack: </span>
            {['Next.js 14','Tailwind','shadcn/ui','Supabase','Prisma','NextAuth.js','Mapbox','Cloudflare R2','PayMongo','Resend','Semaphore'].map((s, i, arr) => (
              <span key={s}>
                <span className={styles.footerTech}>{s}</span>
                {i < arr.length - 1 && <span className={styles.footerDot}> · </span>}
              </span>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}
