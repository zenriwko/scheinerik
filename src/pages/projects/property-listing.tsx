import { useState } from "react";
 
interface Task {
  label: string;
  tags: string[];
  done: boolean;
}
 
interface Phase {
  id: number;
  title: string;
  weeks: string;
  color: string;
  tasks: Task[];
}
 
interface TagStyle {
  bg: string;
  color: string;
}
 
const phases: Phase[] = [
  {
    id: 1,
    title: "Phase 1 — Foundation",
    weeks: "Weeks 1–4",
    color: "#14b8a6",
    tasks: [
      { label: "Next.js 14 + Tailwind + shadcn/ui setup", tags: ["FE", "INFRA"], done: false },
      { label: "Turborepo monorepo + GitHub Actions CI", tags: ["INFRA"], done: false },
      { label: "Supabase/Neon PostgreSQL provisioned", tags: ["BE", "INFRA"], done: false },
      { label: "Vercel project + preview deploys linked", tags: ["INFRA"], done: false },
      { label: "Prisma schema: users, agents, listings, locations, inquiries, featured_slots", tags: ["BE"], done: false },
      { label: "PSGC location data seeded (region → province → city → barangay)", tags: ["BE"], done: false },
      { label: "NextAuth.js v5: buyer / agent / admin roles + middleware", tags: ["BE", "FE"], done: false },
      { label: "UI component library: listing card, search bar, nav, form inputs", tags: ["FE"], done: false },
      { label: "Cloudflare R2 bucket for photo uploads", tags: ["INFRA"], done: false },
    ],
  },
  {
    id: 2,
    title: "Phase 2 — Core Listings",
    weeks: "Weeks 5–10",
    color: "#6366f1",
    tasks: [
      { label: "Listing CRUD API (create, edit, delete, status)", tags: ["BE"], done: false },
      { label: "Photo upload + reorder (R2 presigned URLs)", tags: ["BE", "FE"], done: false },
      { label: "Search endpoint: location, price, type, beds filters", tags: ["BE"], done: false },
      { label: "Search results page with filter drawer", tags: ["FE"], done: false },
      { label: "Listing detail page (photos, specs, agent info)", tags: ["FE"], done: false },
      { label: "Mapbox integration: pin clusters on search map", tags: ["FS"], done: false },
      { label: "Listing detail map (single pin + neighbourhood)", tags: ["FE"], done: false },
      { label: "SEO: dynamic meta, OG images, sitemap.xml, robots.txt", tags: ["FE", "BE"], done: false },
      { label: "Mobile responsiveness audit on all pages", tags: ["FE"], done: false },
    ],
  },
  {
    id: 3,
    title: "Phase 3 — Agents & Users",
    weeks: "Weeks 11–16",
    color: "#10b981",
    tasks: [
      { label: "Agent profile pages (listings, bio, license no.)", tags: ["FE", "BE"], done: false },
      { label: "Agent verification flow (admin-approved)", tags: ["BE", "FE"], done: false },
      { label: "Buyer saved listings / favourites", tags: ["FS"], done: false },
      { label: "Inquiry system: buyer contacts agent via listing", tags: ["FS"], done: false },
      { label: "Resend email notifications (inquiry received, status updates)", tags: ["BE"], done: false },
      { label: "Semaphore SMS alerts for new inquiries", tags: ["BE"], done: false },
      { label: "PayMongo integration for featured listing payments", tags: ["FS"], done: false },
      { label: "Featured listing slot management (start/end dates)", tags: ["BE", "FE"], done: false },
    ],
  },
  {
    id: 4,
    title: "Phase 4 — Admin & Monetisation",
    weeks: "Weeks 17–22",
    color: "#22d3ee",
    tasks: [
      { label: "Admin dashboard: listing moderation queue", tags: ["FE", "BE"], done: false },
      { label: "Admin: user management, agent approval", tags: ["FE", "BE"], done: false },
      { label: "Admin: revenue reports + featured slot overview", tags: ["FE", "BE"], done: false },
      { label: "Mortgage calculator (BSP-based PH rates)", tags: ["FE"], done: false },
      { label: "Homepage featured slots + developer project pages", tags: ["FE", "BE"], done: false },
      { label: "Redis/Upstash caching for search results", tags: ["BE", "INFRA"], done: false },
      { label: "Analytics integration (Plausible or GA4)", tags: ["INFRA"], done: false },
    ],
  },
  {
    id: 5,
    title: "Phase 5 — QA & Launch",
    weeks: "Weeks 23–26",
    color: "#a5b4fc",
    tasks: [
      { label: "End-to-end testing (Playwright: search, inquiry, payment)", tags: ["FS"], done: false },
      { label: "Load testing (k6): 1K concurrent users on search", tags: ["INFRA"], done: false },
      { label: "Core Web Vitals audit + image optimisation pass", tags: ["FE"], done: false },
      { label: "Security review: auth, file upload, SQL injection", tags: ["BE"], done: false },
      { label: "Soft launch to 50 pilot agents (feedback round)", tags: ["FS"], done: false },
      { label: "Bug fixes + performance tuning from soft launch", tags: ["FS"], done: false },
      { label: "Public launch + BetterStack uptime monitoring live", tags: ["INFRA"], done: false },
    ],
  },
];
 
const TAG_STYLES: Record<string, TagStyle> = {
  FE:    { bg: "rgba(99,102,241,0.15)",  color: "#a5b4fc" },
  BE:    { bg: "rgba(20,184,166,0.15)",  color: "#5eead4" },
  FS:    { bg: "rgba(16,185,129,0.15)",  color: "#6ee7b7" },
  INFRA: { bg: "rgba(245,158,11,0.15)",  color: "#fcd34d" },
};
 
// map phase color hex to its rgb for rgba usage
function hexToRgb(hex: string): string {
  const map: Record<string, string> = {
    "#14b8a6": "20,184,166",
    "#6366f1": "99,102,241",
    "#10b981": "16,185,129",
    "#22d3ee": "34,211,238",
    "#a5b4fc": "165,180,252",
  };
  return map[hex] ?? "148,163,184";
}
 
export default function PropertyProjectPlan() {
  const [openPhases, setOpenPhases] = useState<Record<number, boolean>>({ 1: true });
  const [hoverPhase, setHoverPhase] = useState<number | null>(null);
 
  const togglePhase = (id: number): void =>
    setOpenPhases((prev) => ({ ...prev, [id]: !prev[id] }));
 
  const totalTasks = phases.reduce((s, p) => s + p.tasks.length, 0);
  const doneTasks = phases.reduce((s, p) => s + p.tasks.filter((t) => t.done).length, 0);
  const pct = Math.round((doneTasks / totalTasks) * 100);
 
  const phasePct = (phase: Phase): number => {
    const done = phase.tasks.filter((t) => t.done).length;
    return Math.round((done / phase.tasks.length) * 100);
  };
 
  return (
    <div style={{
      background: "linear-gradient(180deg, #0a0f1c 0%, #05070f 100%)",
      minHeight: "100vh",
      fontFamily: "'Inter', 'SF Pro Display', system-ui, sans-serif",
      padding: "32px 16px",
      color: "#cbd5e1",
    }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
 
        {/* Header */}
        <div style={{ marginBottom: 28, paddingBottom: 24, borderBottom: "1px solid rgba(148,163,184,0.1)" }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#f8fafc", marginBottom: 6, letterSpacing: "-0.3px" }}>
            <span style={{ color: "#14b8a6" }}>PH</span> Property Listing — Project Plan
          </h1>
          <p style={{ fontSize: 13, color: "#94a3b8" }}>26 weeks · 3-dev team · Next.js + Supabase + Mapbox</p>
        </div>
 
        {/* Summary cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 20 }}>
          {[
            { label: "Total weeks", val: "26",      accent: "#14b8a6" },
            { label: "Total tasks",  val: totalTasks, accent: "#6366f1" },
            { label: "Completed",    val: doneTasks,  accent: "#10b981" },
            { label: "Progress",     val: `${pct}%`,  accent: "#22d3ee" },
          ].map((m) => (
            <div key={m.label} style={{
              background: "#111827",
              border: "1px solid rgba(148,163,184,0.12)",
              borderRadius: 10,
              padding: "14px 12px",
              textAlign: "center",
            }}>
              <div style={{ fontSize: 24, fontWeight: 700, color: m.accent, lineHeight: 1 }}>{m.val}</div>
              <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 5 }}>{m.label}</div>
            </div>
          ))}
        </div>
 
        {/* Global progress bar */}
        <div style={{ height: 4, borderRadius: 2, background: "rgba(148,163,184,0.12)", overflow: "hidden", marginBottom: 24 }}>
          <div style={{
            height: "100%",
            width: `${pct}%`,
            background: "linear-gradient(135deg, #14b8a6 0%, #22d3ee 100%)",
            borderRadius: 2,
            transition: "width 0.4s",
          }} />
        </div>
 
        {/* Legend */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center", marginBottom: 16 }}>
          {Object.entries(TAG_STYLES).map(([tag, s]) => (
            <span key={tag} style={{ fontSize: 11, padding: "3px 8px", borderRadius: 8, background: s.bg, color: s.color, fontWeight: 500 }}>
              {tag}
            </span>
          ))}
          <span style={{ fontSize: 11, color: "#475569", marginLeft: 4 }}>· update done: true in code to mark complete</span>
        </div>
 
        {/* Phases */}
        {phases.map((phase) => {
          const pp = phasePct(phase);
          const isOpen = !!openPhases[phase.id];
          const isHov = hoverPhase === phase.id;
          const rgb = hexToRgb(phase.color);
 
          return (
            <div
              key={phase.id}
              style={{
                border: `1px solid ${isOpen || isHov ? `rgba(${rgb},0.3)` : "rgba(148,163,184,0.12)"}`,
                borderRadius: 12,
                overflow: "hidden",
                marginBottom: 8,
                transition: "border-color 0.2s",
              }}
            >
              {/* Phase header */}
              <div
                onClick={() => togglePhase(phase.id)}
                onMouseEnter={() => setHoverPhase(phase.id)}
                onMouseLeave={() => setHoverPhase(null)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "13px 16px",
                  cursor: "pointer",
                  userSelect: "none",
                  background: isOpen
                    ? `rgba(${rgb},0.07)`
                    : isHov ? "#1a2337" : "#111827",
                  transition: "background 0.15s",
                }}
              >
                <span style={{
                  width: 9, height: 9, borderRadius: "50%",
                  background: phase.color, flexShrink: 0,
                  boxShadow: isOpen ? `0 0 8px ${phase.color}90` : "none",
                  transition: "box-shadow 0.2s",
                }} />
                <span style={{ fontSize: 14, fontWeight: 600, color: "#f8fafc", flex: 1 }}>{phase.title}</span>
                <span style={{ fontSize: 11, color: "#64748b", whiteSpace: "nowrap" }}>{phase.weeks}</span>
                <div style={{ width: 64, height: 3, borderRadius: 2, background: "rgba(148,163,184,0.12)", overflow: "hidden", flexShrink: 0 }}>
                  <div style={{ height: "100%", width: `${pp}%`, background: phase.color, borderRadius: 2, transition: "width 0.4s" }} />
                </div>
                <span style={{ fontSize: 11, color: pp > 0 ? phase.color : "#64748b", minWidth: 28, textAlign: "right" }}>{pp}%</span>
                <span style={{
                  fontSize: 9, color: "#475569",
                  transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
                  transition: "transform 0.2s",
                  flexShrink: 0,
                }}>▶</span>
              </div>
 
              {/* Tasks */}
              {isOpen && (
                <div style={{ borderTop: "1px solid rgba(148,163,184,0.08)" }}>
                  {phase.tasks.map((task, ti) => (
                    <div
                      key={ti}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 10,
                        padding: "9px 16px",
                        background: task.done ? "rgba(16,185,129,0.04)" : "transparent",
                        borderBottom: ti < phase.tasks.length - 1
                          ? "1px solid rgba(148,163,184,0.06)"
                          : "none",
                      }}
                    >
                      {/* Checkbox */}
                      <div style={{
                        width: 16, height: 16, borderRadius: 4,
                        flexShrink: 0, marginTop: 2,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        background: task.done ? phase.color : "transparent",
                        border: task.done ? "none" : "1.5px solid rgba(148,163,184,0.25)",
                        boxShadow: task.done ? `0 0 8px ${phase.color}60` : "none",
                      }}>
                        {task.done && (
                          <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                            <path d="M1 3.5L3.5 6L8 1" stroke="#0a0f1c" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </div>
 
                      {/* Label + tags */}
                      <div style={{ flex: 1 }}>
                        <span style={{
                          fontSize: 13,
                          color: task.done ? "#475569" : "#cbd5e1",
                          textDecoration: task.done ? "line-through" : "none",
                          lineHeight: 1.5,
                        }}>
                          {task.label}
                        </span>
                        <span style={{ marginLeft: 6 }}>
                          {task.tags.map((tag) => (
                            <span key={tag} style={{
                              fontSize: 10,
                              padding: "1px 6px",
                              borderRadius: 6,
                              marginLeft: 3,
                              background: TAG_STYLES[tag]?.bg,
                              color: TAG_STYLES[tag]?.color,
                              fontWeight: 500,
                            }}>
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
        <div style={{
          marginTop: 20,
          padding: "12px 16px",
          background: "#111827",
          borderRadius: 10,
          border: "1px solid rgba(148,163,184,0.12)",
          fontSize: 12,
          color: "#64748b",
          lineHeight: 1.7,
        }}>
          <span style={{ color: "#94a3b8", fontWeight: 500 }}>Stack: </span>
          {["Next.js 14","Tailwind","shadcn/ui","Supabase","Prisma","NextAuth.js","Mapbox","Cloudflare R2","PayMongo","Resend","Semaphore"].map((s, i, arr) => (
            <span key={s}>
              <span style={{ color: "#14b8a6" }}>{s}</span>
              {i < arr.length - 1 && <span style={{ color: "#1e293b" }}> · </span>}
            </span>
          ))}
        </div>
 
      </div>
    </div>
  );
}