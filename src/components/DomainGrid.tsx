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
    desc: "Life, disability, and long-term care coverage that may affect your family's financial exposure.",
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
  return (
    <div className="divide-y divide-cream-dark border border-cream-dark rounded-lg overflow-hidden">
      {DOMAINS.map((d, i) => (
        <div key={d.label} className="flex gap-5 px-6 py-4 bg-white">
          <span className="shrink-0 w-6 h-6 rounded-full bg-navy text-white text-xs font-bold flex items-center justify-center mt-0.5">
            {i + 1}
          </span>
          <div>
            <p className="text-sm font-semibold text-navy mb-0.5">{d.label}</p>
            <p className="text-xs text-slate-mid leading-relaxed">{d.desc}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
