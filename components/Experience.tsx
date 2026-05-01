'use client'
import { useInView } from 'react-intersection-observer'

const jobs = [
  {
    period: '2024 — PRESENT',
    title: 'Freelance Full-Stack Developer',
    company: 'Self-Employed',
    location: 'Remote',
    desc: 'Building web applications and tools for clients across various industries. Delivered projects end-to-end — from requirements and architecture through deployment. Stack: Next.js, TypeScript, Node.js, PostgreSQL, and Vercel.',
  },
  {
    period: '2023 — 2024',
    title: 'Flutter Mobile Developer',
    company: 'Campus Project — Talent Show App',
    location: 'Wolkite, Ethiopia',
    desc: 'Designed and built a full-featured campus talent show platform used for live event voting and participant management. Integrated Supabase for real-time updates and PostgreSQL for persistent data. Stack: Flutter, Dart, Supabase, Riverpod.',
  },
  {
    period: '2022 — 2023',
    title: 'Junior Developer (Academic & Personal Projects)',
    company: 'University / Open Source',
    location: 'Wolkite, Ethiopia',
    desc: 'Developed a hospital management system in Java/JavaFX and a Python-based plagiarism checker with NLP. Focused on OOP design, database modelling, and building clean desktop and web interfaces.',
  },
]

function JobItem({ job, i }: { job: typeof jobs[0]; i: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <div ref={ref} style={{
      display: 'grid', gridTemplateColumns: '200px 1fr', gap: 40,
      padding: '40px 0', borderBottom: '1px solid var(--border)',
      opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateX(-30px)',
      transition: `all 0.7s ease ${i * 150}ms`,
    }}>
      <div>
        <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, color: 'var(--accent)', marginBottom: 8 }}>{job.period}</div>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)', marginTop: 4 }} />
      </div>
      <div>
        <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>{job.title}</h3>
        <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 13, color: 'var(--muted)', marginBottom: 16 }}>
          {job.company} — {job.location}
        </div>
        <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.8 }}>{job.desc}</p>
      </div>
    </div>
  )
}

export default function Experience() {
  return (
    <section id="experience" style={{ padding: '120px 24px', background: 'var(--bg2)', borderTop: '1px solid var(--border)' }}>
      <div className="container">
        <p className="section-label">04 — Background</p>
        <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 700, marginBottom: 64 }}>Education & project work</h2>
        <div>
          {jobs.map((job, i) => <JobItem key={i} job={job} i={i} />)}
        </div>
      </div>

      <style suppressHydrationWarning>{`
        @media (max-width: 640px) {
          #experience .container > div > div { grid-template-columns: 1fr !important; gap: 16px !important; }
        }
      `}</style>
    </section>
  )
}
