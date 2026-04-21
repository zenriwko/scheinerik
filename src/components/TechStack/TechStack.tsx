'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from './TechStack.module.css';

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

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
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.9, ease }}
      >
        <span className={styles.kicker}>CURRENT STACK</span>
        <h2>Tools I build production apps with — every day</h2>
        <p className={styles.lead}>
          Modern, type-safe, performant stack focused on developer experience, fast iteration, strong SEO and long-term scalability.
        </p>
      </motion.div>

      <motion.div
        className={styles.marqueeContainer}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8, delay: 0.2, ease }}
      >
        <div className={styles.track}>
          {tools.map((tool, i) => <ToolItem key={i} tool={tool} />)}
          {tools.map((tool, i) => <ToolItem key={`dup-${i}`} tool={tool} />)}
        </div>
      </motion.div>
    </section>
  );
}
