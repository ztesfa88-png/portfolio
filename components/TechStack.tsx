
'use client'

import { useInView } from 'react-intersection-observer'
import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiPython,
  SiPostgresql,
  SiMongodb,
  SiPhp,
  SiOpenjdk,
  SiFlutter,
  SiDart,
} from 'react-icons/si'

const stack = [
  { icon: SiJavascript, name: 'JavaScript', level: 82, color: '#F7DF1E' },
  { icon: SiTypescript, name: 'TypeScript', level: 88, color: '#3178C6' },
  { icon: SiReact, name: 'React / Next.js', level: 85, color: '#61DAFB', extraIcon: SiNextdotjs },
  { icon: SiNodedotjs, name: 'Node.js', level: 80, color: '#68A063' },
  { icon: SiPython, name: 'Python', level: 80, color: '#3776AB' },
  { icon: SiPostgresql, name: 'PostgreSQL', level: 78, color: '#4169E1' },
  { icon: SiMongodb, name: 'MongoDB', level: 75, color: '#47A248' },
  { icon: SiPhp, name: 'PHP', level: 70, color: '#777BB4' },
  { icon: SiOpenjdk, name: 'Java', level: 78, color: '#F89820' },
  { icon: SiFlutter, name: 'Flutter / Dart', level: 82, color: '#54C5F8', extraIcon: SiDart },
]

export default function TechStack() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section
      style={{
        padding: '80px 24px',
        background: 'var(--bg2)',
        borderTop: '1px solid var(--border)',
      }}
    >
      <div className="container">
        <p className="section-label" style={{ textAlign: 'center' }}>
          02 — Tech Stack
        </p>

        <div
          ref={ref}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: 16,
            marginTop: 48,
          }}
        >
          {stack.map((item, i) => {
            const Icon = item.icon
            const ExtraIcon = item.extraIcon

            return (
              <div
                key={item.name}
                style={{
                  border: '1px solid var(--border)',
                  borderRadius: 12,
                  padding: 24,
                  background: 'var(--card)',
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'none' : 'translateY(20px)',
                  transition: `opacity 0.6s ease ${i * 80}ms, transform 0.6s ease ${i * 80}ms, border-color 0.2s`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = item.color
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border)'
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 12,
                    marginBottom: 20,
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      minWidth: 0,
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 5,
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={30} color={item.color} />
                      {ExtraIcon && (
                        <ExtraIcon
                          size={22}
                          color={item.name === 'React / Next.js' ? '#FFFFFF' : '#54C5F8'}
                        />
                      )}
                    </div>

                    <span
                      style={{
                        fontWeight: 600,
                        fontSize: 16,
                      }}
                    >
                      {item.name}
                    </span>
                  </div>

                  <span
                    style={{
                      fontFamily: 'Space Mono, monospace',
                      fontSize: 13,
                      fontWeight: 700,
                      color: item.color,
                      flexShrink: 0,
                    }}
                  >
                    {item.level}%
                  </span>
                </div>

                <div
                  style={{
                    height: 6,
                    background: 'var(--border)',
                    borderRadius: 99,
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      borderRadius: 99,
                      background: `linear-gradient(90deg, ${item.color}, var(--accent2))`,
                      width: inView ? `${item.level}%` : '0%',
                      transition: `width 1s ease ${i * 100}ms`,
                    }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
