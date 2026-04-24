'use client'
import { useEffect, useState } from 'react'

const words = ['Experiences', 'Products', 'Systems', 'Interfaces']

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const target = words[wordIndex]
    let timeout: ReturnType<typeof setTimeout>

    if (!deleting && displayed.length < target.length) {
      timeout = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 80)
    } else if (!deleting && displayed.length === target.length) {
      timeout = setTimeout(() => setDeleting(true), 2000)
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40)
    } else if (deleting && displayed.length === 0) {
      setDeleting(false)
      setWordIndex((wordIndex + 1) % words.length)
    }
    return () => clearTimeout(timeout)
  }, [displayed, deleting, wordIndex])

  return (
    <section id="hero" className="grid-bg" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 24px', paddingTop: 64 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%' }}>

        {/* Status badge */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '8px 16px', border: '1px solid var(--border)', borderRadius: 100, marginBottom: 48, background: 'var(--card)' }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block', animation: 'pulseGlow 2s infinite' }} />
          <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, color: 'var(--muted)' }}>AVAILABLE FOR WORK — 2025</span>
        </div>

        {/* Headline */}
        <h1 style={{ fontSize: 'clamp(56px, 10vw, 120px)', fontWeight: 700, lineHeight: 0.95, letterSpacing: '-3px', marginBottom: 32 }}>
          <div>Crafting</div>
          <div style={{ color: 'var(--accent)' }}>Digital</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {displayed}
            <span style={{ display: 'inline-block', width: 4, height: '0.85em', background: 'var(--accent)', animation: 'blink 1s infinite', verticalAlign: 'middle' }} />
          </div>
        </h1>

        {/* Subtitle */}
        <p style={{ fontFamily: 'Space Mono, monospace', fontSize: 14, color: 'var(--muted)', maxWidth: 480, lineHeight: 1.8, marginBottom: 48 }}>
          <span style={{ color: 'var(--accent)' }}>// </span>
          Full-stack software engineer specializing in<br />
          scalable systems, beautiful interfaces & clean code.
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <a href="#projects" className="btn-primary">View Work ↓</a>
          <a href="#contact" className="btn-outline">Let's Talk</a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, color: 'var(--muted)', letterSpacing: 3 }}>SCROLL TO EXPLORE</span>
        <div style={{ width: 1, height: 60, background: 'linear-gradient(to bottom, var(--accent), transparent)' }} />
      </div>
    </section>
  )
}
