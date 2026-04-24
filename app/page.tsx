import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Stats from '@/components/Stats'
import TechTicker from '@/components/TechTicker'
import About from '@/components/About'
import TechStack from '@/components/TechStack'
import Projects from '@/components/Projects'
import Experience from '@/components/Experience'
import Contact from '@/components/Contact'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Stats />
      <TechTicker />
      <About />
      <TechStack />
      <Projects />
      <Experience />
      <Contact />
      <footer style={{
        borderTop: '1px solid var(--border)',
        padding: '32px 24px',
        textAlign: 'center',
        fontFamily: 'Space Mono, monospace',
        fontSize: '13px',
        color: 'var(--muted)',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <span>© 2025 Zelalem Tesfa. All rights reserved.</span>
          <span>Designed & built with ♥ by Zelalem</span>
          <a href="#top" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Back to top ↑</a>
        </div>
      </footer>
    </main>
  )
}
