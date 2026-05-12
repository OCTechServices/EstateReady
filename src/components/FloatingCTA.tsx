'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    function onScroll() {
      const pastHero = window.scrollY > 400
      const nearBottom =
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 320
      setVisible(pastHero && !nearBottom)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-40 transition-all duration-300 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <Link
        href="/intake"
        className="flex items-center gap-2 bg-navy text-white text-sm font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-navy-light hover:shadow-xl transition-all"
      >
        <span>Start My Assessment</span>
        <span className="bg-white/20 text-white text-xs font-bold px-2 py-0.5 rounded-full">$21</span>
      </Link>
    </div>
  )
}
