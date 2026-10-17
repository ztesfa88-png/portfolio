'use client'
import { useState, useEffect } from 'react'

const links = ['About', 'Projects', 'Experience', 'Contact']

const SunIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <circle cx="9" cy="9" r="3.5" />
    <line x1="9" y1="1" x2="9" y2="3" />
    <line x1="9" y1="15" x2="9" y2="17" />
    <line x1="1" y1="9" x2="3" y2="9" />
    <line x1="15" y1="9" x2="17" y2="9" />
    <line x1="3.05" y1="3.05" x2="4.46" y2="4.46" />
    <line x1="13.54" y1="13.54" x2="14.95" y2="14.95" />
    <line x1="14.95" y1="3.05" x2="13.54" y2="4.46" />
    <line x1="4.46" y1="13.54" x2="3.05" y2="14.95" />
  </svg>
)

const MoonIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15.5 10.5A7 7 0 0 1 7.5 2.5a7 7 0 0 0 8 8z" />
  </svg>
)

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')

  useEffect(() => {
    const saved = localStorage.getItem('theme') as 'dark' | 'light' | null
    const initial = saved ?? 'dark'
    setTheme(initial)
    document.documentElement.setAttribute('data-theme', initial)
  }, [])

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.setAttribute('data-theme', next)
    localStorage.setItem('theme', next)
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isDark = theme === 'dark'

  return (
    <nav id="top" style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      padding: '0 24px',
      background: scrolled ? (isDark ? 'rgba(10,10,10,0.9)' : 'rgba(245,245,245,0.9)') : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border)' : 'none',
      transition: 'all 0.3s',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href="#top" style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700, fontSize: 18, color: 'var(--text)', textDecoration: 'none' }}>
          ZELALEM<span style={{ color: 'var(--accent)' }}>.DEV</span>
        </a>

        {/* Desktop links */}
        <div style={{ display: 'flex', gap: 32, alignItems: 'center' }} className="desktop-nav">
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} style={{
              fontFamily: 'Space Mono, monospace', fontSize: 13, color: 'var(--muted)',
              textDecoration: 'none', transition: 'color 0.2s',
            }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
            >{l}</a>
          ))}

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            style={{
              background: 'var(--card)',
              border: '1px solid var(--border)',
              borderRadius: 8,
              width: 36, height: 36,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--text)',
              transition: 'border-color 0.2s',
              flexShrink: 0,
            }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>

          <a href="#contact" className="btn-primary" style={{ padding: '8px 20px', fontSize: 12 }}>HIRE ME →</a>
          <a href="/resume.docx" download className="btn-outline" style={{ padding: '8px 20px', fontSize: 12 }}>Resume ↓</a>
        </div>

        {/* Mobile right side: theme toggle + hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }} className="mobile-controls">
          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            style={{
              background: 'var(--card)',
              border: '1px solid var(--border)',
              borderRadius: 8,
              width: 36, height: 36,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--text)',
            }}
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>
          <button onClick={() => setMenuOpen(!menuOpen)} style={{
            background: 'none', border: 'none', color: 'var(--text)',
            fontSize: 24, cursor: 'pointer',
          }} className="hamburger" aria-label="Toggle menu">
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          background: 'var(--bg2)', borderBottom: '1px solid var(--border)',
          padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 16,
        }}>
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              style={{ fontFamily: 'Space Mono, monospace', fontSize: 14, color: 'var(--text)', textDecoration: 'none' }}
            >{l}</a>
          ))}
          <a href="#contact" className="btn-primary" style={{ textAlign: 'center' }} onClick={() => setMenuOpen(false)}>HIRE ME →</a>
          <a href="/resume.docx" download className="btn-outline" style={{ textAlign: 'center' }} onClick={() => setMenuOpen(false)}>Resume ↓</a>
        </div>
      )}

      <style suppressHydrationWarning>{`
        .mobile-controls { display: none !important; }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-controls { display: flex !important; }
        }
      `}</style>
    </nav>
  )
}
