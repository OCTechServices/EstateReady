'use client'

import { useEffect, useState } from 'react'

const ITEMS = [
  { label: 'Planning Tier',             desc: 'Foundational through Urgent — an honest read of where you stand.' },
  { label: 'Priority Actions',          desc: 'Specific steps, ordered by urgency, tied to your actual answers.' },
  { label: 'Domain Findings',           desc: 'What\'s in place, what\'s missing, what\'s at risk — by category.' },
  { label: 'Attorney Discussion Guide', desc: 'What to bring up in your first meeting.' },
]

export default function FeatureRows() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setActive(a => (a + 1) % ITEMS.length), 2000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="border border-cream-dark rounded-2xl overflow-hidden divide-y divide-cream-dark mb-12">
      {ITEMS.map((item, i) => {
        const isActive = active === i
        return (
          <div
            key={item.label}
            className="flex items-start gap-5 px-6 py-5 transition-colors duration-500"
            style={{ backgroundColor: isActive ? '#FAF8F2' : 'white' }}
          >
            <span
              className="text-xl font-bold tabular-nums shrink-0 pt-0.5 w-7 transition-colors duration-500"
              style={{ color: isActive ? '#B5935A' : 'rgba(181,147,90,0.35)' }}
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <div className="w-px self-stretch bg-gold/20 shrink-0" />
            <div className="flex-1">
              <p
                className="text-sm font-bold mb-1 transition-colors duration-500"
                style={{ fontFamily: 'var(--font-playfair)', color: isActive ? '#1A4A2E' : '#4A6355' }}
              >
                {item.label}
              </p>
              <p className="text-xs text-slate-mid leading-relaxed">{item.desc}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
