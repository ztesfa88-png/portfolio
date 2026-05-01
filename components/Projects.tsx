'use client'
import { useInView } from 'react-intersection-observer'

const projects = [
  {
    num: '001', type: 'MOBILE APP', emoji: '🎤',
    title: 'Campus Talent Show App',
    desc: 'A cross-platform mobile app for campus talent show registration and live voting. Students register as participants or voters, browse event listings, and cast real-time votes. Built with Flutter and Supabase Realtime so leaderboards update instantly without polling.',
    tags: ['Flutter', 'Dart', 'Supabase', 'Riverpod', 'PostgreSQL', 'Realtime'],
    live: '#', github: 'https://github.com/ztesfa88-png/campus_talent-show-flutter-app',
  },
  {
    num: '002', type: 'AI / PYTHON TOOL', emoji: '🔍',
    title: 'Plagiarism Checker',
    desc: 'A web-based plagiarism detection tool that compares documents and text for similarity using NLP techniques. Computes cosine similarity across tokenised text, highlights matching passages, and presents results through a clean HTML/CSS interface.',
    tags: ['Python', 'NLP', 'HTML', 'CSS'],
    live: '#', github: 'https://github.com/ztesfa88-png/Plagiarism-Checker',
  },
  {
    num: '003', type: 'DESKTOP APP', emoji: '🏥',
    title: 'Hospital Management System',
    desc: 'A full-featured desktop application for managing hospital operations — patient records, doctor scheduling, appointments, and billing. Built with Java and JavaFX with a relational database backend and role-based access for staff and admins.',
    tags: ['Java', 'JavaFX', 'OOP', 'MySQL', 'Desktop App'],
    live: '#', github: 'https://github.com/ztesfa88-png/HMS',
  },
  {
    num: '004', type: 'WEB APP', emoji: '💼',
    title: 'Personal Portfolio',
    desc: 'This portfolio — a full-stack Next.js app with animated UI, scroll-triggered counters, a working contact form via Nodemailer, and CI/CD deployment on Vercel. Built with TypeScript throughout for type safety.',
    tags: ['Next.js', 'TypeScript', 'React', 'Nodemailer', 'Vercel'],
    live: 'https://portfolio-seven-lac-26.vercel.app', github: 'https://github.com/ztesfa88-png/portfolio',
  },
]

function ProjectCard({ p, i }: { p: typeof projects[0]; i: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <div ref={ref} style={{
      border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden',
      background: 'var(--card)', display: 'grid', gridTemplateColumns: '1fr auto',
      opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(40px)',
      transition: `all 0.7s ease ${i * 150}ms`,
    }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
      onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
    >
      <div style={{ padding: 32 }}>
        <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
          <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, color: 'var(--muted)' }}>{p.num}</span>
          <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, color: 'var(--accent)', background: 'rgba(0,255,136,0.08)', padding: '2px 10px', borderRadius: 100 }}>{p.type}</span>
        </div>
        <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12, lineHeight: 1.3 }}>{p.title}</h3>
        <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.8, marginBottom: 20 }}>{p.desc}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
          {p.tags.map(t => <span key={t} className="tag">{t}</span>)}
        </div>
        <div style={{ display: 'flex', gap: 16 }}>
          {p.live !== '#' && (
            <a href={p.live} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: '8px 20px', fontSize: 12 }}>↗ Live Demo</a>
          )}
          <a href={p.github} target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ padding: '8px 20px', fontSize: 12 }}>⌥ GitHub</a>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40, fontSize: 64, background: 'rgba(255,255,255,0.02)' }}>
        {p.emoji}
      </div>
    </div>
  )
}

export default function Projects() {
  return (
    <section id="projects" style={{ padding: '120px 24px' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 64, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <p className="section-label">03 — Projects</p>
            <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 700 }}>Selected work</h2>
          </div>
          <a href="https://github.com/ztesfa88-png" target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'Space Mono, monospace', fontSize: 13, color: 'var(--accent)', textDecoration: 'none' }}>View all projects →</a>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {projects.map((p, i) => <ProjectCard key={p.num} p={p} i={i} />)}
        </div>
      </div>
    </section>
  )
}
