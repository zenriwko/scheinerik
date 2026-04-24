import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Code2, Zap, Search, Heart } from 'lucide-react';
import SEO from '@/components/%SEO/SEO';
import JsonLd from '@/components/%SEO/JsonLd';
import TechStack from '@/components/TechStack/TechStack';
import Experience from '@/components/Experience/Experience';
import Contact from '@/components/Contact/Contact';
import styles from './about.module.css';

const values = [
  {
    Icon: Zap,
    title: 'Performance is non-negotiable',
    desc: "I do not consider a project done unless it scores 95+ on Lighthouse. Fast sites rank better, convert better, and keep users. Slow ones do not.",
  },
  {
    Icon: Code2,
    title: 'Code you can actually maintain',
    desc: "Clean architecture, consistent naming, no dead code. Whatever I hand over should be readable and extensible by you or any future developer.",
  },
  {
    Icon: Search,
    title: 'SEO built in from the start',
    desc: 'Structured data, semantic HTML, and fast server-side rendering are part of every project. Not added on after the fact.',
  },
  {
    Icon: Heart,
    title: 'Long-term thinking over quick fixes',
    desc: "I would rather spend an hour getting the architecture right than ship something that breaks in six months. Good software ages well.",
  },
];

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': 'https://scheinerik.dev/#person',
  name: 'Erik Scheinpflug',
  url: 'https://scheinerik.dev',
  image: 'https://scheinerik.dev/og-image.png',
  description:
    'Website developer serving Tampa, FL and clients worldwide. Specialising in Next.js, eCommerce, and SEO-optimised web applications.',
  jobTitle: 'Full-Stack Developer',
  worksFor: { '@type': 'Organization', name: 'Independent' },
  knowsAbout: ['Next.js', 'React', 'TypeScript', 'SEO', 'eCommerce', 'Web Performance'],
  sameAs: [
    'https://github.com/zenriwko',
    'https://www.linkedin.com/in/erik-scheinpflug-5335b8305/',
  ],
};

export default function AboutPage() {
  return (
    <>
      <SEO
        title="Tampa Website Developer – Erik Scheinpflug"
        description="Website developer serving Tampa, FL and US clients — specialising in Next.js, eCommerce, and technical SEO. Remote-first, US-time-zone friendly, fast turnaround."
        path="/about"
      />
      <JsonLd data={personSchema} />

      {/* ── Hero ──────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroGrid}>

            {/* Portrait */}
            <motion.div
              className={styles.portraitWrap}
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            >
              <div className={styles.portraitFrame}>
                <Image
                  src="/images/portrait.webp"
                  alt="Erik Scheinpflug — Full-Stack Developer"
                  fill
                  sizes="(max-width: 768px) 90vw, 420px"
                  className={styles.portrait}
                  priority
                />
              </div>
              <div className={styles.availBadge}>
                <div className={styles.pulse} />
                <span>Available for projects</span>
              </div>
            </motion.div>

            {/* Text */}
            <motion.div
              className={styles.heroText}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            >
              <span className={styles.kicker}>About me</span>
              <h1 className={styles.heroName}>
                Hi, I&apos;m <span className={styles.gradient}>Erik.</span>
              </h1>
              <p className={styles.heroRole}>Full-Stack Developer · eCommerce · SEO</p>
              <p className={styles.heroBio}>
                I build modern web applications with Next.js and TypeScript — from high-performance eCommerce stores to SaaS tools and marketing sites. Serving businesses in Tampa, FL and clients across the US and worldwide.
              </p>
              <p className={styles.heroBio}>
                I care about the details: load times, clean code, search rankings, and experiences that work on every device. Not just checking boxes. Actually caring that the thing works properly.
              </p>
              <div className={styles.heroActions}>
                <a href="#contact" className="button">
                  <span>Work with me</span>
                </a>
                <Link href="/projects" className="button secondary">
                  <span>View my work</span>
                </Link>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── Story ─────────────────────────────────────────── */}
      <section className={styles.story}>
        <div className={styles.container}>
          <div className={styles.storyCols}>
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            >
              <span className={styles.kicker}>Background</span>
              <h2>Where I&apos;m coming from</h2>
              <p>
                I started building websites out of curiosity. Tweaking themes, breaking things, figuring out why they broke. That early obsession with understanding how things work never left.
              </p>
              <p>
                Over the past two years, I have been the full-stack and SEO lead at <a href="https://nextdigitalagency.com" target="_blank" rel="noopener noreferrer" className="link-underline">NEXT Digital Agency</a>, the technical backbone behind client projects ranging from eCommerce platforms to corporate sites. All scored 95 to 100 on Lighthouse.
              </p>
              <p>
                Outside of client work, I build my own products. I am currently developing <a href="https://bahayfind.com/" target="_blank" rel="noopener noreferrer" className="link-underline">BahayFind</a>, a Philippine real estate platform with multi-role auth, Mapbox-powered search, and payment-gated listings.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            >
              <span className={styles.kicker}>How I work</span>
              <h2>Direct, transparent, thorough</h2>
              <p>
                I work directly with clients. No agency layer, no account managers, no miscommunication. You describe the problem, I propose a solution, and we agree on a price before any code is written.
              </p>
              <p>
                I prefer focused projects where quality matters more than volume. I would rather build one excellent site than three mediocre ones. If a project is not a good fit, I will tell you honestly.
              </p>
              <p>
                When a project is done, you own everything: source code, assets, no lock-in. My goal is to hand you something you can run, maintain, and grow on your own.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Values ────────────────────────────────────────── */}
      <section className={styles.values}>
        <div className={styles.container}>
          <div className={styles.valuesHeader}>
            <span className={styles.kicker}>What I believe</span>
            <h2>Principles I work by</h2>
          </div>
          <div className={styles.valuesGrid}>
            {values.map(({ Icon, title, desc }, i) => (
              <motion.div
                key={title}
                className={styles.valueCard}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              >
                <div className={styles.valueIcon}><Icon size={22} /></div>
                <p className={styles.valueTitle}>{title}</p>
                <p className={styles.valueDesc}>{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tech stack ────────────────────────────────────── */}
      <TechStack />

      {/* ── Experience ────────────────────────────────────── */}
      <Experience />

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className={styles.cta}>
        <div className={styles.container}>
          <motion.div
            className={styles.ctaBox}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          >
            <h2 className={styles.ctaTitle}>
              Want to build something together?
            </h2>
            <p className={styles.ctaLead}>
              Check out my services, see my pricing, or just reach out directly.
            </p>
            <div className={styles.ctaActions}>
              <a href="#contact" className="button"><span>Get in touch</span></a>
              <Link href="/services" className="button secondary"><span>View services</span></Link>
              <Link href="/pricing" className="button secondary"><span>See pricing</span></Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Contact ───────────────────────────────────────── */}
      <Contact />
    </>
  );
}
