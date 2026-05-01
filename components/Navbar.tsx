'use client'
import { useState, useEffect } from 'react'

const links = ['About', 'Projects', 'Experience', 'Contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav id="top" style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      padding: '0 24px',
      background: scrolled ? 'rgba(10,10,10,0.9)' : 'transparent',
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
          <a href="#contact" className="btn-primary" style={{ padding: '8px 20px', fontSize: 12 }}>HIRE ME →</a>
          <a href="/resume.docx" download className="btn-outline" style={{ padding: '8px 20px', fontSize: 12 }}>Resume ↓</a>
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)} style={{
          display: 'none', background: 'none', border: 'none', color: 'var(--text)',
          fontSize: 24, cursor: 'pointer',
        }} className="hamburger" aria-label="Toggle menu">
          {menuOpen ? '✕' : '☰'}
        </button>
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
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: block !important; }
        }
      `}</style>
    </nav>
  )
}
