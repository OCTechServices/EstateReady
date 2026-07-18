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
  title: 'Will & Estate Ready — Estate Planning Readiness Assessment',
  description:
    'A guided assessment covering wills, trusts, healthcare directives, powers of attorney, and beneficiary designations. Receive a personalized readiness report that prepares you for a more informed conversation with an estate planning attorney. $21 one-time.',
  openGraph: {
    title: 'Will & Estate Ready — Estate Planning Readiness Assessment',
    description:
      'Understand your estate planning readiness before meeting an attorney. Personalized report covering 7 key areas. $21 one-time.',
    siteName: 'Will & Estate Ready',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Will & Estate Ready — Estate Planning Readiness Assessment',
    description:
      'Understand your estate planning readiness before meeting an attorney. Personalized report covering 7 key areas.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  )
}
