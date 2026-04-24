'use client'
import { useInView } from 'react-intersection-observer'

const stack = [
  { icon: '⚛️', name: 'React', level: 95 },
  { icon: '🟢', name: 'Node.js', level: 90 },
  { icon: '📘', name: 'TypeScript', level: 92 },
  { icon: '🐘', name: 'PostgreSQL', level: 85 },
  { icon: '🐳', name: 'Docker', level: 80 },
  { icon: '☁️', name: 'AWS', level: 78 },
]

export default function TechStack() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section style={{ padding: '80px 24px', background: 'var(--bg2)', borderTop: '1px solid var(--border)' }}>
      <div className="container">
        <p className="section-label" style={{ textAlign: 'center' }}>02 — Tech Stack</p>
        <div ref={ref} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginTop: 48 }}>
          {stack.map((item, i) => (
            <div key={item.name} style={{
              border: '1px solid var(--border)', borderRadius: 12, padding: 24,
              background: 'var(--card)', transition: 'border-color 0.2s',
              opacity: inView ? 1 : 0,
              transform: inView ? 'none' : 'translateY(20px)',
              transitionDelay: `${i * 80}ms`,
              transitionProperty: 'opacity, transform, border-color',
              transitionDuration: '0.6s',
            }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: 28 }}>{item.icon}</span>
                  <span style={{ fontWeight: 600, fontSize: 16 }}>{item.name}</span>
                </div>
                <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, color: 'var(--accent)' }}>{item.level}%</span>
              </div>
              <div style={{ height: 4, background: 'var(--border)', borderRadius: 2, overflow: 'hidden' }}>
                <div style={{
                  height: '100%', borderRadius: 2,
                  background: 'linear-gradient(90deg, var(--accent), var(--accent2))',
                  width: inView ? `${item.level}%` : '0%',
                  transition: `width 1s ease ${i * 100}ms`,
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
