import type { Metadata } from 'next'
import { Outfit, DM_Serif_Display } from 'next/font/google'
import './globals.css'
import SmoothScrollProvider from '@/components/SmoothScrollProvider'
import CursorFollower from '@/components/CursorFollower'
import PageLoader from '@/components/PageLoader'

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
})

const dmSerif = DM_Serif_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  style: ['normal', 'italic'],
  weight: '400',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'OffsideJersey — Wear Football History',
  description:
    'The world\'s most exclusive football jersey archive. Rare jerseys, legendary moments, authentic football culture. Shop Messi, Ronaldo, Beckham, Zidane and more.',
  keywords: ['football jerseys', 'rare football kits', 'Messi jersey', 'Ronaldo jersey', 'authentic football shirts', 'vintage football kits'],
  openGraph: {
    title: 'OffsideJersey — Wear Football History',
    description: 'Rare jerseys. Legendary moments. Authentic football culture.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${outfit.variable} ${dmSerif.variable}`}>
      <body className="font-[var(--font-outfit)] antialiased">
        <PageLoader />
        <CursorFollower />
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
