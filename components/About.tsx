'use client'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'

const skills = ['React / Next.js', 'Node.js', 'TypeScript', 'Python', 'PostgreSQL', 'MongoDB', 'Docker', 'AWS / GCP', 'GraphQL', 'Redis', 'REST APIs', 'CI/CD']

export default function About() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="about" ref={ref} style={{ padding: '120px 24px', opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(40px)', transition: 'all 0.8s ease' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}>

        <div>
          <p className="section-label">01 — About Me</p>
          <h2 style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 700, lineHeight: 1.1, marginBottom: 32 }}>
            Engineer by<br />trade, creator<br />by passion
          </h2>
          <p style={{ color: 'var(--muted)', lineHeight: 1.9, marginBottom: 24, fontSize: 15 }}>
            I'm Zelalem, a software engineer with 5+ years crafting high-performance web applications.
            I bridge the gap between design and engineering — writing clean code that users actually love to use.
          </p>
          <p style={{ color: 'var(--muted)', lineHeight: 1.9, fontSize: 15 }}>
            My stack lives in the JavaScript ecosystem, but I'm comfortable across the full stack:
            from database schemas to pixel-perfect UIs and cloud infrastructure.
          </p>
        </div>

        <div>
          {/* Profile photo */}
          <div style={{ position: 'relative', marginBottom: 32 }}>
            <div style={{
              width: '100%', maxWidth: 320, margin: '0 auto',
              borderRadius: 16, overflow: 'hidden',
              border: '1px solid var(--border)',
              position: 'relative', aspectRatio: '3/4',
            }}>
              <Image
                src="/profile.jpg"
                alt="Zelalem Tesfa"
                fill
                style={{ objectFit: 'cover', objectPosition: 'top' }}
                priority
              />
              {/* Accent corner */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                padding: '24px 20px 20px',
                background: 'linear-gradient(to top, rgba(0,0,0,0.85), transparent)',
              }}>
                <div style={{ fontWeight: 700, fontSize: 16 }}>Zelalem Tesfa</div>
                <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, color: 'var(--accent)', marginTop: 4 }}>Full-Stack Engineer</div>
              </div>
            </div>
            {/* Decorative accent border */}
            <div style={{
              position: 'absolute', top: 12, left: 12,
              width: '100%', maxWidth: 320,
              aspectRatio: '3/4',
              border: '2px solid var(--accent)',
              borderRadius: 16,
              zIndex: -1,
              opacity: 0.3,
            }} />
          </div>

          {/* Status card */}
          <div style={{ border: '1px solid var(--border)', borderRadius: 12, padding: 20, marginBottom: 24, background: 'var(--card)', display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block', flexShrink: 0, animation: 'pulseGlow 2s infinite' }} />
            <div>
              <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, color: 'var(--muted)', letterSpacing: 3, marginBottom: 2 }}>CURRENT STATUS</div>
              <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 13, color: 'var(--accent)' }}>Open to Opportunities</div>
            </div>
          </div>

          <p className="section-label">CORE SKILLS</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {skills.map(s => (
              <span key={s} className="tag">{s}</span>
            ))}
          </div>
        </div>
      </div>

      <style suppressHydrationWarning>{`
        @media (max-width: 768px) {
          #about .container { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  )
}
