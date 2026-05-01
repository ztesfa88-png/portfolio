'use client'
import { useEffect, useState, useRef } from 'react'

function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState<number | null>(null)
  const ref = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated.current) return
        hasAnimated.current = true
        observer.disconnect()

        let start = 0
        const steps = 60
        const step = Math.max(1, Math.ceil(target / steps))
        const interval = Math.floor(1200 / steps)
        const timer = setInterval(() => {
          start += step
          if (start >= target) {
            setCount(target)
            clearInterval(timer)
          } else {
            setCount(start)
          }
        }, interval)
      },
      { threshold: 0, rootMargin: '0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target])

  return (
    <span ref={ref}>
      {count === null ? target : count}{suffix}
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
