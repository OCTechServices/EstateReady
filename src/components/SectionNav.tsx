'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const SCROLL_SECTIONS = [
  { id: 'how-it-works', label: 'How it Works', n: '01' },
  { id: 'what-you-get', label: 'What You Get', n: '02' },
  { id: 'faq', label: 'FAQ', n: '03' },
]

export default function SectionNav() {
  const [active, setActive] = useState<string>('')

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    SCROLL_SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id)
        },
        { rootMargin: '-30% 0px -50% 0px', threshold: 0 }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach((obs) => obs.disconnect())
  }, [])

  function scrollTo(id: string) {
    const el = document.getElementById(id)
    if (!el) return
    const offset = 120 // header + sticky nav bar
    const top = el.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top, behavior: 'smooth' })
  }

  return (
    <>
      {/* Desktop: fixed right nav card */}
      <nav className="hidden 2xl:block fixed right-6 top-1/2 -translate-y-1/2 z-30">
        <div className="bg-white border border-cream-dark rounded-2xl shadow-sm overflow-hidden w-56">
          <p className="text-[10px] font-semibold text-slate-mid uppercase tracking-widest px-4 pt-4 pb-2">
            On this page
          </p>

          {SCROLL_SECTIONS.map(({ id, label, n }) => {
            const isActive = active === id
            return (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`w-full text-left px-4 py-3 flex items-center gap-3 transition-all border-t border-cream-dark group ${
                  isActive ? 'bg-navy' : 'hover:bg-cream'
                }`}
              >
                <span className={`text-xs font-bold tabular-nums shrink-0 ${isActive ? 'text-gold' : 'text-gold/60'}`}>
                  {n}
                </span>
                <span className={`text-xs font-medium leading-snug ${isActive ? 'text-white' : 'text-navy'}`}>
                  {label}
                </span>
                {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-gold shrink-0" />}
              </button>
            )
          })}

          {/* 04 — direct link */}
          <Link
            href="/intake"
            className="w-full text-left px-4 py-3 flex items-center gap-3 border-t border-cream-dark transition-colors"
            style={{ backgroundColor: '#5C3519' }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#7A4A26')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#5C3519')}
          >
            <span className="text-xs font-bold tabular-nums shrink-0 text-gold">04</span>
            <span className="text-xs font-semibold text-white leading-snug">Take My Assessment</span>
            <span className="ml-auto text-white/60 text-xs">→</span>
          </Link>
        </div>
      </nav>

      {/* Mobile + mid-desktop: sticky top bar */}
      <nav className="2xl:hidden sticky top-[61px] z-30 bg-white border-b border-cream-dark">
        <div className="flex justify-center flex-wrap">
          {SCROLL_SECTIONS.map(({ id, label, n }) => {
            const isActive = active === id
            return (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`flex-shrink-0 flex items-center justify-center gap-1.5 px-4 py-3 text-xs font-medium border-b-2 transition-all ${
                  isActive
                    ? 'text-navy border-gold bg-cream'
                    : 'text-slate-mid border-transparent hover:text-navy hover:bg-cream'
                }`}
              >
                <span className={`font-bold ${isActive ? 'text-gold' : 'text-gold/50'}`}>{n}</span>
                {label}
              </button>
            )
          })}
          <Link
            href="/intake"
            className="flex-shrink-0 flex items-center justify-center gap-1.5 px-4 py-3 text-xs font-semibold border-b-2 border-transparent transition-all"
            style={{ color: '#5C3519' }}
          >
            <span className="font-bold" style={{ color: '#B5935A' }}>04</span>
            Take My Assessment
          </Link>
        </div>
      </nav>
    </>
  )
}
