import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ZELALEM.DEV — Full-Stack Engineer',
  description: 'Full-stack software engineer specializing in scalable systems, beautiful interfaces & clean code.',
  keywords: ['software engineer', 'full-stack', 'react', 'nextjs', 'typescript'],
  openGraph: {
    title: 'ZELALEM.DEV — Full-Stack Engineer',
    description: 'Crafting Digital Experiences',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="noise">{children}</body>
    </html>
  )
}
