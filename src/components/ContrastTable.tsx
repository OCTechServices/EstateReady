const ROWS = [
  {
    without: '3 in 4 American households have no will or plan. A court decides everything — guardianship, assets, timing.',
    with: 'You decide who raises your children and who receives what. On your terms.',
    source: 'Caring.com, 2025',
  },
  {
    without: '1 in 3 parents with minor children have never named a legal guardian.',
    with: 'Naming a guardian takes one document. Without it, a court decides who raises your children.',
    source: 'LegalZoom, 2024',
  },
  {
    without: '55% of adults have never discussed their end-of-life wishes with family.',
    with: 'A clear plan starts that conversation before a crisis forces it — on your terms, not theirs.',
    source: 'The Conversation Project',
  },
  {
    without: 'Probate consumes 3–7% of your estate in legal and administrative fees.',
    with: 'A trust bypasses probate entirely. Assets transfer directly to your family.',
    source: 'Trust & Will',
  },
  {
    without: 'The average estate without a plan spends 16 months in court.',
    with: 'Taking that step now could save your family 16 months in court — and the cost that comes with it.',
    source: 'EstateExec',
  },
]

export default function ContrastTable() {
  return (
    <div className="mt-6 rounded-lg border border-white/15 bg-white/10 overflow-hidden">
      <div className="grid grid-cols-2 text-[10px] font-semibold uppercase tracking-widest border-b border-white/15">
        <div className="px-5 py-3 text-white/50">Without a plan</div>
        <div className="px-5 py-3 text-gold border-l border-white/15">With a plan</div>
      </div>
      <div className="divide-y divide-white/10">
        {ROWS.map((row, i) => (
          <div key={i} className="grid grid-cols-2">
            <div className="px-5 py-4" style={{ borderLeft: '3px solid rgba(180,55,75,0.6)' }}>
              <p className="text-xs leading-relaxed text-white/80">{row.without}</p>
              <p className="text-[10px] text-white/40 mt-1.5">— {row.source}</p>
            </div>
            <div className="px-5 py-4 border-l border-white/15">
              <p className="text-xs leading-relaxed font-medium" style={{ color: '#D4B483' }}>
                {row.with}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
