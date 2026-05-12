'use client'

import { useEffect, useState } from 'react'

const ROWS = [
  {
    without: '3 in 4 American households have no will or plan. A court decides everything — guardianship, assets, timing.',
    withText: 'You decide who raises your children and who receives what. On your terms.',
    source: 'Caring.com, 2025',
  },
  {
    without: '1 in 3 parents with minor children have never named a legal guardian.',
    withText: 'Naming a guardian takes one document. Without it, a court decides who raises your children.',
    source: 'Legal Zoom, 2024',
  },
  {
    without: '55% of adults have never discussed their end-of-life wishes with family.',
    withText: 'A clear plan starts that conversation before a crisis forces it — on your terms, not theirs.',
    source: 'Conversation Project',
  },
  {
    without: 'Probate consumes 3–7% of your estate in legal and administrative fees.',
    withText: 'A trust bypasses probate entirely. Assets transfer directly to your family.',
    source: 'Trust & Will',
  },
  {
    without: 'The average estate without a plan spends 16 months in court.',
    withText: 'Taking that step now could save your family 16 months in court — and the cost that comes with it.',
    source: 'EstateExec',
  },
]

export default function ContrastTable() {
  const [cur, setCur] = useState(0)
  const [prev, setPrev] = useState<number | null>(null)

  useEffect(() => {
    const id = setInterval(() => {
      setCur(c => {
        setPrev(c)
        return (c + 1) % ROWS.length
      })
    }, 4200)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="mt-6 rounded-2xl border border-white/15 bg-white/10 overflow-hidden">
      {/* Column headers */}
      <div className="grid grid-cols-2 text-[10px] font-semibold uppercase tracking-widest border-b border-white/15">
        <div className="px-5 py-3 text-white/50">Without a plan</div>
        <div className="px-5 py-3 text-gold border-l border-white/15">With a plan</div>
      </div>

      {/* Single row — slides in/out */}
      <div className="relative overflow-hidden" style={{ minHeight: '96px' }}>
        {prev !== null && (
          <div
            key={`prev-${prev}`}
            className="absolute inset-0 grid grid-cols-2"
            style={{ animation: 'tier-slide-out 0.45s ease forwards' }}
          >
            <RowContent row={ROWS[prev]} side="left" />
            <RowContent row={ROWS[prev]} side="right" />
          </div>
        )}
        <div
          key={`cur-${cur}`}
          className="grid grid-cols-2"
          style={{ animation: 'tier-slide-in 0.45s ease forwards' }}
        >
          <RowContent row={ROWS[cur]} side="left" />
          <RowContent row={ROWS[cur]} side="right" />
        </div>
      </div>

      {/* Progress dots */}
      <div className="flex items-center gap-1.5 px-5 pb-4 pt-1">
        {ROWS.map((_, i) => (
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
  )
}

function RowContent({ row, side }: { row: typeof ROWS[number]; side: 'left' | 'right' }) {
  if (side === 'left') {
    return (
      <div className="px-5 py-4" style={{ borderLeft: '3px solid rgba(180,55,75,0.6)' }}>
        <p className="text-xs leading-relaxed text-white/80">
          {row.without}{' '}
          <span style={{ color: 'rgba(255,255,255,0.28)', fontSize: '10px' }}>— {row.source}</span>
        </p>
      </div>
    )
  }
  return (
    <div className="px-5 py-4" style={{ borderLeft: '1px solid rgba(181,147,90,0.35)' }}>
      <p className="text-xs leading-relaxed font-medium" style={{ color: '#D4B483' }}>
        {row.withText}
      </p>
    </div>
  )
}
