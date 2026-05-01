'use client'
import { useState } from 'react'

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<Status>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '14px 16px',
    background: 'var(--card)', border: '1px solid var(--border)',
    borderRadius: 8, color: 'var(--text)', fontSize: 14,
    fontFamily: 'Space Grotesk, sans-serif', outline: 'none',
    transition: 'border-color 0.2s',
  }

  return (
    <section id="contact" style={{ padding: '120px 24px' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}>

        {/* Left */}
        <div>
          <p className="section-label">05 — Contact</p>
          <h2 style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 700, lineHeight: 1.1, marginBottom: 24 }}>
            Let's build<br />something<br />together
          </h2>
          <p style={{ color: 'var(--muted)', marginBottom: 40, fontSize: 15 }}>
            Open to full-time roles, freelance & collaboration.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { icon: '✉', label: 'ztesfa88@gmail.com', href: 'mailto:ztesfa88@gmail.com' },
              { icon: '⌥', label: 'GitHub', href: 'https://github.com/ztesfa88-png' },
              { icon: 'in', label: 'LinkedIn', href: 'https://www.linkedin.com/in/zelalem-tesfa-618a64403' },
              { icon: '↓', label: 'Resume PDF', href: '/resume.docx' },
            ].map(link => (
              <a key={link.label} href={link.href} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                color: 'var(--muted)', textDecoration: 'none', fontSize: 14,
                fontFamily: 'Space Mono, monospace', transition: 'color 0.2s',
              }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
              >
                <span style={{ width: 32, height: 32, border: '1px solid var(--border)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>{link.icon}</span>
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Right — form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <label style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, color: 'var(--muted)', letterSpacing: 2, display: 'block', marginBottom: 8 }}>NAME</label>
              <input
                style={inputStyle} placeholder="Your name" value={form.name} required
                onChange={e => setForm({ ...form, name: e.target.value })}
                onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
                onBlur={e => (e.target.style.borderColor = 'var(--border)')}
              />
            </div>
            <div>
              <label style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, color: 'var(--muted)', letterSpacing: 2, display: 'block', marginBottom: 8 }}>EMAIL</label>
              <input
                type="email" style={inputStyle} placeholder="your@email.com" value={form.email} required
                onChange={e => setForm({ ...form, email: e.target.value })}
                onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
                onBlur={e => (e.target.style.borderColor = 'var(--border)')}
              />
            </div>
          </div>
          <div>
            <label style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, color: 'var(--muted)', letterSpacing: 2, display: 'block', marginBottom: 8 }}>MESSAGE</label>
            <textarea
              rows={6} style={{ ...inputStyle, resize: 'vertical' }} placeholder="Tell me about your project..." value={form.message} required
              onChange={e => setForm({ ...form, message: e.target.value })}
              onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
              onBlur={e => (e.target.style.borderColor = 'var(--border)')}
            />
          </div>

          <button type="submit" className="btn-primary" disabled={status === 'loading'} style={{ alignSelf: 'flex-start', opacity: status === 'loading' ? 0.7 : 1 }}>
            {status === 'loading' ? 'Sending...' : 'Send Message →'}
          </button>

          {status === 'success' && (
            <p style={{ fontFamily: 'Space Mono, monospace', fontSize: 13, color: 'var(--accent)' }}>✓ Message sent! I'll get back to you soon.</p>
          )}
          {status === 'error' && (
            <p style={{ fontFamily: 'Space Mono, monospace', fontSize: 13, color: '#ff4444' }}>✗ Something went wrong. Please try again.</p>
          )}
        </form>
      </div>

      <style suppressHydrationWarning>{`
        @media (max-width: 768px) {
          #contact .container { grid-template-columns: 1fr !important; gap: 48px !important; }
          #contact form > div:first-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
