'use client'
import { useInView } from 'react-intersection-observer'
import { useEffect, useState, useRef } from 'react'

function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const hasAnimated = useRef(false)
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0, rootMargin: '0px 0px -10px 0px' })

  useEffect(() => {
    if (!inView || hasAnimated.current) return
    hasAnimated.current = true
    let start = 0
    const duration = 1200 // ms
    const steps = 60
    const step = Math.max(1, Math.ceil(target / steps))
    const interval = Math.floor(duration / steps)
    const timer = setInterval(() => {
      start += step
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(start)
      }
    }, interval)
    return () => clearInterval(timer)
  }, [inView, target])

  // Show target as fallback if observer never fires (SSR / no JS)
  return (
    <span ref={ref}>
      {count === 0 && !inView ? target : count}{suffix}
    </span>
  )
}

const stats = [
  { value: 3, suffix: '+', label: 'YEARS EXP' },
  { value: 10, suffix: '+', label: 'PROJECTS' },
  { value: 100, suffix: '%', label: 'SATISFACTION' },
]

export default function Stats() {
  return (
    <div style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: 'var(--card)' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', padding: '48px 24px' }}>
        {stats.map((s, i) => (
          <div key={i} style={{
            textAlign: 'center',
            borderRight: i < stats.length - 1 ? '1px solid var(--border)' : 'none',
            padding: '16px',
          }}>
            <div style={{ fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 700, color: 'var(--accent)', fontFamily: 'Space Mono, monospace', lineHeight: 1 }}>
              <Counter target={s.value} suffix={s.suffix} />
            </div>
            <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, color: 'var(--muted)', letterSpacing: 3, marginTop: 8 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
