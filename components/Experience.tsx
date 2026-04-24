'use client'
import { useInView } from 'react-intersection-observer'

const jobs = [
  {
    period: '2022 — PRESENT',
    title: 'Senior Software Engineer',
    company: 'Acme Corp',
    location: 'Remote',
    desc: 'Led architecture of a microservices platform handling 5M+ daily active users. Reduced API latency by 40% through caching strategies. Mentored a team of 4 junior engineers. Drove adoption of TypeScript across all frontend codebases.',
  },
  {
    period: '2020 — 2022',
    title: 'Full-Stack Engineer',
    company: 'StartupXYZ',
    location: 'Berlin, DE',
    desc: 'Built and shipped the core product from zero to 50k users in 18 months. Designed the database schema and REST API, developed the React frontend, and set up CI/CD pipelines on AWS.',
  },
  {
    period: '2019 — 2020',
    title: 'Junior Developer',
    company: 'DigitalAgency',
    location: 'London, UK',
    desc: 'Developed e-commerce solutions for 20+ clients using React and Node.js. Improved page load performance by 60% through code splitting and lazy loading optimizations.',
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
        <p className="section-label">04 — Experience</p>
        <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 700, marginBottom: 64 }}>Where I've worked</h2>
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
