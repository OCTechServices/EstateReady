'use client'

import { useEffect, useState } from 'react'
import ScoreRing from '@/components/ScoreRing'

const TIERS = [
  {
    n: 1,
    label: 'Foundational',
    score: 24,
    desc: 'Straightforward situation. A basic will and powers of attorney cover most of what you need.',
    bg: '#0F3020',
    accent: '#D4B483',
    ring: 'rgba(212,180,131,0.9)',
  },
  {
    n: 2,
    label: 'Developing',
    score: 48,
    desc: 'Moderate complexity or meaningful gaps. A structured planning session with an attorney is warranted.',
    bg: '#2A3D5C',
    accent: '#C8D4E8',
    ring: 'rgba(200,212,232,0.9)',
  },
  {
    n: 3,
    label: 'Complex',
    score: 72,
    desc: 'High assets, business interests, or circumstances that require custom planning solutions.',
    bg: '#6B1F35',
    accent: '#F5C8D4',
    ring: 'rgba(245,200,212,0.9)',
  },
  {
    n: 4,
    label: 'Urgent',
    score: 91,
    desc: 'Critical gaps combined with high exposure. Attorney engagement is strongly recommended without delay.',
    bg: '#1C1C1E',
    accent: '#D4B483',
    ring: 'rgba(212,180,131,0.9)',
  },
]

type TierData = typeof TIERS[number]

function TierCard({ tier, anim }: { tier: TierData; anim: string }) {
  return (
    <div
      className="absolute inset-0 rounded-2xl overflow-hidden px-7 pt-7 pb-6 flex flex-col justify-between"
      style={{ backgroundColor: tier.bg, animation: anim }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <p
            className="text-[10px] font-bold uppercase tracking-widest mb-3"
            style={{ color: tier.accent, opacity: 0.75 }}
          >
            Tier {tier.n}
          </p>
          <h3
            style={{ fontFamily: 'var(--font-playfair)', color: 'white' }}
            className="text-2xl font-bold mb-3 leading-snug"
          >
            {tier.label}
          </h3>
          <p className="text-sm leading-relaxed" style={{ color: tier.accent, opacity: 0.7 }}>
            {tier.desc}
          </p>
        </div>
        <div className="shrink-0 -mt-1">
          <ScoreRing score={tier.score} color={tier.ring} animate />
        </div>
      </div>

      <div className="flex items-center gap-3 mt-4">
        <div
          className="h-0.5 flex-1 rounded-full"
          style={{ backgroundColor: `${tier.accent}25` }}
        >
          <div
            className="h-full rounded-full"
            style={{ width: `${tier.score}%`, backgroundColor: tier.accent, opacity: 0.55 }}
          />
        </div>
        <p className="text-xs tabular-nums" style={{ color: tier.accent, opacity: 0.55 }}>
          {tier.score} / 100
        </p>
      </div>
    </div>
  )
}

export default function TierCycler() {
  const [cur, setCur] = useState(0)
  const [prev, setPrev] = useState<number | null>(null)

  useEffect(() => {
    const id = setInterval(() => {
      setCur(c => {
        setPrev(c)
        return (c + 1) % TIERS.length
      })
    }, 3200)
    return () => clearInterval(id)
  }, [])

  return (
    <div>
      <p className="text-[10px] font-semibold text-gold uppercase tracking-widest mb-4">
        Where will you land?
      </p>

      <div className="relative" style={{ height: '242px', willChange: 'transform', transform: 'translateZ(0)' }}>
        {prev !== null && (
          <TierCard
            key={`prev-${prev}`}
            tier={TIERS[prev]}
            anim="tier-slide-out 0.45s ease forwards"
          />
        )}
        <TierCard
          key={`cur-${cur}`}
          tier={TIERS[cur]}
          anim="tier-slide-in 0.45s ease forwards"
        />

        {/* Progress dots */}
        <div className="absolute bottom-5 left-7 flex items-center gap-1.5 z-10">
          {TIERS.map((_, i) => (
            <div
              key={i}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === cur ? '14px' : '5px',
                height: '5px',
                backgroundColor: i === cur ? '#B5935A' : 'rgba(255,255,255,0.2)',
              }}
            />
          ))}
        </div>
      </div>

      <p className="text-[10px] text-slate-mid/70 mt-4 leading-relaxed">
        Scored across 40 questions · 7 domains · gap and complexity weighting
      </p>
    </div>
  )
}
