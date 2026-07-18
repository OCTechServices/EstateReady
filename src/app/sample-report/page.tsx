import Link from 'next/link'
import ScoreRing from '@/components/ScoreRing'
import CompassMark from '@/components/CompassMark'

const PRIORITY_ACTIONS = [
  {
    action: 'Establish a revocable living trust that addresses your LLC interest.',
    reason: 'You own an LLC with no trust structure in place. Without one, your business interest passes through probate upon your death — freezing operations, exposing ownership to court oversight, and creating a difficult transition for co-members or heirs. A properly drafted trust, coordinated with your operating agreement, resolves this.',
  },
  {
    action: 'Execute a financial power of attorney and healthcare power of attorney.',
    reason: 'You currently have no one legally authorized to manage your finances or make medical decisions if you are incapacitated. As a business owner, this gap is particularly acute — there is no default mechanism to keep operations running or personal finances managed if you cannot act.',
  },
  {
    action: 'Review and update all beneficiary designations.',
    reason: 'Your retirement accounts and life insurance beneficiary designations have not been reviewed in over three years. These designations pass assets outside of probate — and outside of your will. If they are outdated, assets may not reach the right people regardless of what your estate plan says.',
  },
  {
    action: 'Name a guardian for your minor children in a will.',
    reason: 'You have minor children and no will in place. Without a documented guardian designation, a court will determine who raises your children if both parents are unable to do so. This is the most personal decision in your estate plan — and it should be yours to make.',
  },
  {
    action: 'Evaluate life insurance ownership structure.',
    reason: 'You own your life insurance personally. At your asset level, this means the death benefit is included in your taxable estate. An Irrevocable Life Insurance Trust (ILIT) can remove this from your estate entirely — potentially significant as your estate grows.',
  },
]

const DOMAIN_FINDINGS = [
  { severity: 'critical', label: 'Business Ownership',       finding: 'LLC interest with no trust, no successor designation, and no confirmed operating agreement provisions for incapacity or death. Highest-severity finding in this assessment.' },
  { severity: 'critical', label: 'Existing Documents',       finding: 'No will, no trust, no financial POA, no healthcare POA, and no advance directive. Complete absence of estate planning infrastructure.' },
  { severity: 'critical', label: 'Beneficiary Designations', finding: 'Retirement account and life insurance designations not reviewed in 3+ years. POD/TOD status on bank accounts is unknown.' },
  { severity: 'caution',  label: 'Insurance Structure',      finding: 'Life insurance owned personally rather than through an ILIT. At your asset level, this creates unnecessary estate tax inclusion risk.' },
  { severity: 'caution',  label: 'Asset Titling',            finding: 'Primary assets titled solely in your name. Without a trust, these pass through probate — a time-consuming and public process that a revocable trust eliminates.' },
  { severity: 'info',     label: 'Tax Awareness',            finding: 'You were aware of the 2025 federal estate tax exemption sunset. At your current asset level you are below the threshold, but business appreciation could change this over time.' },
]

const criticalCount = DOMAIN_FINDINGS.filter(f => f.severity === 'critical').length

export default function SampleReportPage() {
  return (
    <div className="min-h-screen bg-cream">

      <header className="bg-white border-b border-cream-dark sticky top-0 z-20">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <CompassMark size={26} />
            <span style={{ fontFamily: 'var(--font-playfair)' }} className="text-xl font-bold text-navy hover:text-navy-light transition-colors">Will &amp; Estate Ready</span>
          </Link>
          <Link
            href="/intake"
            className="bg-navy text-white text-sm font-semibold px-5 py-2.5 hover:bg-navy-light transition-colors"
            style={{ borderBottom: '3px solid #B5935A' }}
          >
            Start My Assessment — $21
          </Link>
        </div>
      </header>

      {/* Sample banner */}
      <div className="bg-gold/15 border-b border-gold/30 px-6 py-3 text-center sticky top-[61px] z-10">
        <p className="text-sm text-navy font-medium">
          This is a sample report for a fictional individual.
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">

        {/* Report header */}
        <div>
          <p className="text-xs text-slate-mid uppercase tracking-wider mb-0.5">Will &amp; Estate Ready — Assessment Report</p>
          <p className="text-xs text-slate-mid">Sample · Generated for illustration purposes only</p>
        </div>

        {/* Tier verdict */}
        <div className="overflow-hidden bg-tier-3">
          <div className="px-8 py-8 flex items-center justify-between gap-6">
            <div className="flex-1">
              <p className="text-xs font-semibold text-amber-100 uppercase tracking-widest mb-1">Assessment Result</p>
              <h1 style={{ fontFamily: 'var(--font-playfair)' }} className="text-4xl sm:text-5xl font-bold text-white mb-3">
                Tier 3 — Complex
              </h1>
              <p className="text-amber-100 text-base leading-relaxed">
                Your estate involves significant complexity — high asset value, business interests,
                or special circumstances that require careful planning.
              </p>
            </div>
            <div className="shrink-0">
              <ScoreRing score={68} color="rgba(255,255,255,0.9)" />
            </div>
          </div>
          <div className="bg-black/10 px-8 py-3 flex items-center justify-between">
            <p className="text-xs text-amber-100">Sample Report · For Illustration Only</p>
            <p className="text-xs text-amber-100">Will &amp; Estate Ready Assessment Report</p>
          </div>
        </div>

        {/* Critical alert banner */}
        <div style={{ backgroundColor: '#3D0F1E', borderLeft: '6px solid #7A2840' }} className="px-8 py-8">
          <p className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: '#F5C8D4' }}>
            {criticalCount} Critical Gaps Found
          </p>
          <p style={{ fontFamily: 'var(--font-playfair)', lineHeight: 1.15 }} className="text-2xl sm:text-3xl font-bold text-white mb-4">
            If something happened today, your family would face serious obstacles.
          </p>
          <p className="text-sm leading-relaxed" style={{ color: '#F5C8D4' }}>
            Three of your six domain findings are rated Critical. These are not administrative gaps — they are real legal vulnerabilities that affect what happens to your family, your business, and your assets.
          </p>
        </div>

        {/* Narrative */}
        <div className="bg-white border border-cream-dark px-8 py-7">
          <h2 className="text-xs font-semibold text-slate-mid uppercase tracking-widest mb-4">Assessment Summary</h2>
          <div className="space-y-3 text-gray-700 text-base leading-relaxed">
            <p>
              Based on your completed intake assessment, your estate planning situation carries meaningful
              complexity that warrants structured attention. At 47, married with minor children in a community
              property state, with an estate valued between $1M–$5M that includes real estate, retirement
              accounts, and an LLC interest, you are operating without several foundational legal instruments
              that your situation specifically requires.
            </p>
            <p>
              Your most significant exposure is the combination of business ownership without a trust structure
              and beneficiary designations that have not been reviewed in over three years. These are not minor
              gaps — they represent real legal and financial risk to your family in the event of your
              incapacity or death.
            </p>
            <p>
              The encouraging news is that your situation, while complex, is well-defined and very plannable.
              You do not have contested assets, special-needs dependents, or cross-border complications. A
              focused planning engagement with an estate attorney — informed by the findings in this report —
              can address your most critical gaps efficiently.
            </p>
          </div>
        </div>

        {/* Priority actions */}
        <div className="bg-white border border-cream-dark px-8 py-7">
          <h2 className="text-xs font-semibold text-slate-mid uppercase tracking-widest mb-6">Priority Actions</h2>

          {/* Action #1 hero */}
          <div className="mb-6" style={{ backgroundColor: '#0F3020' }}>
            <div className="px-6 py-6">
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5"
                  style={{ backgroundColor: '#B5935A', color: '#fff' }}
                >
                  Act First
                </span>
              </div>
              <p style={{ fontFamily: 'var(--font-playfair)' }} className="text-xl sm:text-2xl font-bold text-white mb-3 leading-snug">
                {PRIORITY_ACTIONS[0].action}
              </p>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)' }}>
                {PRIORITY_ACTIONS[0].reason}
              </p>
            </div>
          </div>

          {/* Actions 2–5 */}
          <div className="space-y-6">
            {PRIORITY_ACTIONS.slice(1).map((item, i) => (
              <div key={i} className="flex gap-5 border-b border-cream-dark pb-6 last:border-0 last:pb-0">
                <div
                  className="shrink-0 text-2xl font-bold leading-none"
                  style={{ fontFamily: 'var(--font-playfair)', color: '#B5935A' }}
                >
                  {String(i + 2).padStart(2, '0')}
                </div>
                <div className="flex-1">
                  <p className="text-base font-semibold text-navy mb-1.5 leading-snug">{item.action}</p>
                  <p className="text-sm text-slate-mid leading-relaxed">{item.reason}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Domain findings */}
        <div className="bg-white border border-cream-dark px-8 py-7">
          <h2 className="text-xs font-semibold text-slate-mid uppercase tracking-widest mb-5">Domain Findings</h2>
          <div className="space-y-3">
            {DOMAIN_FINDINGS.map((f, i) => {
              const isCritical = f.severity === 'critical'
              const isCaution  = f.severity === 'caution'
              return (
                <div
                  key={i}
                  className="flex overflow-hidden"
                  style={
                    isCritical
                      ? { backgroundColor: '#FDF2F4', borderLeft: '6px solid #7A2840' }
                      : isCaution
                      ? { backgroundColor: 'rgba(181,147,90,0.08)', borderLeft: '4px solid #B5935A' }
                      : { backgroundColor: '#F5F2EA', borderLeft: '4px solid #9DA8A0' }
                  }
                >
                  <div className="px-4 py-4 flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5"
                        style={
                          isCritical
                            ? { backgroundColor: '#7A2840', color: '#fff' }
                            : isCaution
                            ? { backgroundColor: '#B5935A', color: '#fff' }
                            : { backgroundColor: '#9DA8A0', color: '#fff' }
                        }
                      >
                        {isCritical ? 'Critical' : isCaution ? 'Caution' : 'Note'}
                      </span>
                      <span className="text-sm font-semibold text-navy">{f.label}</span>
                    </div>
                    <p className={`leading-relaxed ${isCritical ? 'text-base font-medium text-navy' : 'text-sm text-slate-mid'}`}>
                      {f.finding}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-tier-3 px-8 py-10 text-center">
          <p className="text-xs font-semibold text-[#F5C8D4] uppercase tracking-widest mb-3">Your next step</p>
          <h2 style={{ fontFamily: 'var(--font-playfair)' }} className="text-3xl font-bold text-white mb-3">
            Ready to see your real results?
          </h2>
          <p className="text-base text-[#F5C8D4] leading-relaxed mb-8 max-w-md mx-auto">
            This sample is based on a fictional individual. Your report will be specific to your situation —
            scored across all 7 domains with personalized findings and a priority action plan.
          </p>
          <Link
            href="/intake"
            className="inline-flex items-center bg-white text-tier-3 px-8 py-4 text-sm font-semibold hover:bg-cream transition-colors"
            style={{ borderBottom: '3px solid #B5935A' }}
          >
            Start My Assessment — $21 →
          </Link>
          <p className="text-xs text-[#F5C8D4]/70 mt-5">One-time · ~10 minutes · Not legal advice</p>
        </div>

        <p className="text-xs text-slate-mid text-center pb-4">
          Will &amp; Estate Ready · Not a law firm · Not legal advice · For informational purposes only
        </p>
      </div>
    </div>
  )
}
