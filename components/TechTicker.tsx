const techs = ['React ✦', 'Node.js ✦', 'TypeScript ✦','Flutter ✦', 'Next.js ✦', 'PostgreSQL ✦', 'AWS ✦', 'Python ✦']

export default function TechTicker() {
  return (
    <div style={{ borderBottom: '1px solid var(--border)', padding: '16px 0', background: 'var(--bg2)' }}>
      <ul
        className="container"
        aria-label="Technologies"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 12,
          listStyle: 'none',
        }}
      >
        {techs.map((tech) => (
          <li key={tech} className="tag">{tech}</li>
        ))}
      </ul>
    </div>
  )
}
