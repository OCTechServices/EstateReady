'use client'

import { useEffect, useState } from 'react'

const DOMAINS = [
  {
    label: 'Personal Situation',
    desc: 'Marital status, dependents, and health factors that shape your planning requirements.',
  },
  {
    label: 'Assets & Estate Size',
    desc: 'Real estate, investments, retirement accounts, and overall estate value relative to tax thresholds.',
  },
  {
    label: 'Existing Documents',
    desc: 'Current wills, trusts, healthcare directives, and powers of attorney — and whether they are up to date.',
  },
  {
    label: 'Beneficiary Designations',
    desc: 'Named beneficiaries on life insurance, retirement accounts, and transfer-on-death assets.',
  },
  {
    label: 'Insurance',
    desc: 'Life, disability, and long-term care coverage that may affect your family\'s financial exposure.',
  },
  {
    label: 'Tax Exposure',
    desc: 'Estate tax thresholds, gifting strategies, and business ownership implications.',
  },
  {
    label: 'Special Circumstances',
    desc: 'Blended families, minor children, special needs beneficiaries, or active business interests.',
  },
]

export default function DomainGrid() {
  const [active, setActive] = useState(0)
  const [entered, setEntered] = useState(false)

  useEffect(() => {
    const entryId = setTimeout(() => setEntered(true), 100)
    const intervalId = setInterval(() => setActive(a => (a + 1) % DOMAINS.length), 4000)
    return () => {
      clearTimeout(entryId)
      clearInterval(intervalId)
    }
  }, [])

  return (
    <div className="bg-white rounded-2xl border border-cream-dark p-7 relative overflow-hidden">
      {/* Tier color ribbon background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <svg width="100%" height="100%" viewBox="0 0 600 240" preserveAspectRatio="xMaxYMid slice">
          <defs>
            {[
              { id: 'dg0', color: '#0F3020' },
              { id: 'dg1', color: '#2A3D5C' },
              { id: 'dg2', color: '#6B1F35' },
              { id: 'dg3', color: '#1C1C1E' },
            ].map(g => (
              <linearGradient key={g.id} id={g.id} gradientUnits="userSpaceOnUse" x1="600" y1="0" x2="300" y2="240">
                <stop offset="0%" stopColor={g.color} stopOpacity="0.30" />
                <stop offset="100%" stopColor={g.color} stopOpacity="0" />
              </linearGradient>
            ))}
          </defs>
          {[
            { grad: 'dg0', path: 'M 620,-20 C 650,50 580,120 560,180 C 545,220 560,230 550,270', w: 18, dur: 17, delay: 0 },
            { grad: 'dg1', path: 'M 520,-30 C 560,40 480,120 460,175 C 445,220 460,230 445,270', w: 14, dur: 21, delay: -5 },
            { grad: 'dg2', path: 'M 420,-20 C 455,50 375,125 358,178 C 342,222 355,232 342,270', w: 10, dur: 19, delay: -9 },
            { grad: 'dg3', path: 'M 320,-25 C 355,45 275,120 258,175 C 242,220 255,230 242,270', w: 7,  dur: 23, delay: -3 },
          ].map((r, i) => (
            <path
              key={i}
              d={r.path}
              fill="none"
              stroke={`url(#${r.grad})`}
              strokeWidth={r.w}
              style={{
                animationName: 'wave-drift',
                animationDuration: `${r.dur}s`,
                animationTimingFunction: 'ease-in-out',
                animationIterationCount: 'infinite',
                animationDelay: `${r.delay}s`,
                animationDirection: i % 2 === 0 ? 'normal' : 'reverse',
              }}
            />
          ))}
        </svg>
      </div>
      <div className="relative z-10 flex items-center justify-between mb-6">
        <p style={{ fontFamily: 'var(--font-playfair)' }} className="text-navy font-semibold text-lg">
          The 7 domains covered in the assessment
        </p>
        <span className="inline-flex self-start text-[10px] font-semibold text-gold uppercase tracking-widest bg-gold/10 px-2.5 py-1 rounded-full shrink-0">
          40 questions
        </span>
      </div>

      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-2">
        {DOMAINS.map((d, i) => {
          const isActive = active === i
          return (
            <div
              key={d.label}
              className="flex items-center gap-2 px-2.5 py-2 rounded-lg"
              style={{
                backgroundColor: isActive ? 'rgba(181,147,90,0.09)' : 'transparent',
                opacity: entered ? 1 : 0,
                transform: entered ? 'translateY(0)' : 'translateY(6px)',
                transition: `opacity 0.4s ease ${i * 0.06}s, transform 0.4s ease ${i * 0.06}s, background-color 0.35s`,
              }}
            >
              <div
                className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold"
                style={{
                  backgroundColor: isActive ? '#B5935A' : 'rgba(181,147,90,0.12)',
                  color: isActive ? 'white' : '#B5935A',
                  boxShadow: isActive ? '0 0 7px rgba(181,147,90,0.65)' : 'none',
                  transition: 'background-color 0.35s, box-shadow 0.35s, color 0.35s',
                }}
              >
                {i + 1}
              </div>
              <span
                className="text-xs leading-snug"
                style={{
                  color: isActive ? '#1A4A2E' : '#4A6355',
                  fontWeight: isActive ? 600 : 500,
                  transition: 'color 0.35s',
                }}
              >
                {d.label}
              </span>
            </div>
          )
        })}
      </div>

      {/* Active domain description — crossfades on each change */}
      <div className="relative z-10 mt-5 pt-4 border-t border-cream-dark min-h-[36px] flex items-center">
        <p
          key={active}
          className="text-xs text-slate-mid leading-relaxed"
          style={{ animation: 'fade-in 0.4s ease forwards' }}
        >
          <span className="text-gold font-semibold">{DOMAINS[active].label}:</span>{' '}
          {DOMAINS[active].desc}
        </p>
      </div>
    </div>
  )
}
