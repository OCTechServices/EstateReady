const ITEMS = [
  {
    label: 'Planning Tier',
    desc: 'Foundational through Urgent — an honest read of where you stand.',
  },
  {
    label: 'Priority Actions',
    desc: 'Specific steps, ordered by urgency, tied to your actual answers.',
  },
  {
    label: 'Domain Findings',
    desc: "What's in place, what's missing, what's at risk — by category.",
  },
  {
    label: 'Attorney Discussion Guide',
    desc: 'What to bring up in your first meeting.',
  },
]

export default function FeatureRows() {
  return (
    <div className="border border-cream-dark rounded-lg overflow-hidden divide-y divide-cream-dark mb-12">
      {ITEMS.map((item, i) => (
        <div key={item.label} className="flex items-start gap-5 px-6 py-5 bg-white">
          <span
            className="text-xl font-bold tabular-nums shrink-0 pt-0.5 w-7"
            style={{ color: 'rgba(181,147,90,0.6)', fontFamily: 'var(--font-playfair)' }}
          >
            {String(i + 1).padStart(2, '0')}
          </span>
          <div className="w-px self-stretch bg-gold/20 shrink-0" />
          <div className="flex-1">
            <p
              className="text-sm font-bold mb-1 text-navy"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              {item.label}
            </p>
            <p className="text-xs text-slate-mid leading-relaxed">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
