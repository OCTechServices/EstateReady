import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  // TODO: Remove impact-site-verification once Impact affiliate verification is complete
  other: {
    'impact-site-verification': '77ac9963-85ba-4e7f-a245-2bf77a5eef5b',
  },
  title: 'EstateReady — Know Where Your Estate Planning Stands',
  description:
    'A 10-minute guided assessment that scores your estate planning readiness and prepares you for a smarter conversation with an attorney. Not legal advice.',
  openGraph: {
    title: 'EstateReady — Know Where Your Estate Planning Stands',
    description:
      'Know where your estate planning stands — before you spend a dollar on attorney time. 40 questions · 7 domains · $21 one-time.',
    siteName: 'EstateReady',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EstateReady — Know Where Your Estate Planning Stands',
    description:
      'Know where your estate planning stands — before you spend a dollar on attorney time.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  )
}
