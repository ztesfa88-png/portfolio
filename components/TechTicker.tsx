'use client'
const techs = ['React ✦', 'Node.js ✦', 'TypeScript ✦', 'Next.js ✦', 'PostgreSQL ✦', 'Docker ✦', 'AWS ✦', 'GraphQL ✦', 'Python ✦', 'Redis ✦']

export default function TechTicker() {
  const doubled = [...techs, ...techs]
  return (
    <div style={{ overflow: 'hidden', borderBottom: '1px solid var(--border)', padding: '16px 0', background: 'var(--bg2)' }}>
      <div style={{ display: 'flex', animation: 'ticker 20s linear infinite', width: 'max-content' }}>
        {doubled.map((t, i) => (
          <span key={i} style={{
            fontFamily: 'Space Mono, monospace', fontSize: 13, color: 'var(--muted)',
            padding: '0 24px', whiteSpace: 'nowrap', transition: 'color 0.2s',
          }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
          >{t}</span>
        ))}
      </div>
    </div>
  )
}
