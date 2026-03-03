'use client';

import Image from 'next/image';
import styles from './TechStack.module.css';

const tools = [
  { name: 'Next.js',          icon: '/icons/nextjs-original-wordmark.svg',     category: 'Framework' },
  { name: 'React',            icon: '/icons/react-original-wordmark.svg',      category: 'Library'   },
  { name: 'TypeScript',       icon: '/icons/typescript-plain.svg',             category: 'Language'  },
  { name: 'Tailwind CSS',     icon: '/icons/tailwindcss-plain-wordmark.svg',   category: 'Styling'   },
  { name: 'Framer Motion',    icon: '/icons/framermotion-original-wordmark.svg', category: 'Animation' },
  { name: 'Supabase',         icon: '/icons/supabase-plain-wordmark.svg',      category: 'Backend/DB' },
  { name: 'PostgreSQL',       icon: '/icons/postgresql-plain-wordmark.svg',    category: 'Database'  },
  { name: 'tRPC',             icon: '/icons/trpc-plain-wordmark.svg',          category: 'API'       },
  { name: 'Prisma',           icon: '/icons/prisma-original-wordmark.svg',     category: 'ORM'       },
  { name: 'Vercel',           icon: '/icons/vercel-original-wordmark.svg',     category: 'Hosting'   },
  { name: 'Cloudflare',       icon: '/icons/cloudflare-plain-wordmark.svg',    category: 'CDN/Security' },
  { name: 'Vitest',           icon: '/icons/vitest-plain.svg',                 category: 'Testing'   },
  { name: 'Playwright',       icon: '/icons/playwright-plain.svg',             category: 'E2E'       },
  { name: 'ESLint',           icon: '/icons/eslint-plain-wordmark.svg',        category: 'Linting'   },
];

const ToolItem = ({ tool }: { tool: (typeof tools)[0] }) => (
  <div className={styles.item}>
    <div className={styles.iconWrapper}>
      <Image
        src={tool.icon}
        alt={`${tool.name} logo`}
        width={64}
        height={64}
        className={styles.icon}
      />
    </div>
    <span className={styles.name}>{tool.name}</span>
  </div>
);

export default function TechStack() {
  return (
    <section className={styles.stack}>
      <div className={styles.header}>
        <span className={styles.kicker}>CURRENT STACK</span>
        <h2>Tools I build production apps with — every day</h2>
        <p className={styles.lead}>
          Modern, type-safe, performant stack focused on developer experience, fast iteration, strong SEO and long-term scalability.
        </p>
      </div>

      <div className={styles.marqueeContainer}>
        <div className={styles.track}>
          {/* First copy */}
          {tools.map((tool, i) => <ToolItem key={i} tool={tool} />)}
          {/* Second copy – perfect seamless loop */}
          {tools.map((tool, i) => <ToolItem key={`dup-${i}`} tool={tool} />)}
        </div>
      </div>
    </section>
  );
}