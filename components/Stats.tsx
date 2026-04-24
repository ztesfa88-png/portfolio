'use client'
import { useInView } from 'react-intersection-observer'
import { useEffect, useState } from 'react'

function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const { ref, inView } = useInView({ triggerOnce: true })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = Math.ceil(target / 60)
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(start)
    }, 16)
    return () => clearInterval(timer)
  }, [inView, target])

  return <span ref={ref}>{count}{suffix}</span>
}

const stats = [
  { value: 5, suffix: '+', label: 'YEARS EXP' },
  { value: 40, suffix: '+', label: 'PROJECTS' },
  { value: 99, suffix: '%', label: 'SATISFACTION' },
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
