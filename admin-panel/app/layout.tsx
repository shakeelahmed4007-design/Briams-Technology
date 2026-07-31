import './globals.css'
import { ReactNode } from 'react'
import { Inter, Outfit, IBM_Plex_Mono } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap', fallback: ['system-ui', 'sans-serif'] })
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit', display: 'swap', fallback: ['sans-serif'] })
const mono = IBM_Plex_Mono({ weight: '400', subsets: ['latin'], variable: '--font-mono', display: 'swap', fallback: ['monospace'] })

export const metadata = {
  title: 'Briams Admin',
  description: 'Admin panel for Briams & CureVirtual'
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-brand="briams" className={`${inter.variable} ${outfit.variable} ${mono.variable}`}>
      <body className="font-body antialiased min-h-screen bg-bg text-text-primary">
        {children}
      </body>
    </html>
  )
}
