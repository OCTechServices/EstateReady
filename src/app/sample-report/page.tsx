import Link from 'next/link'
import ScoreRing from '@/components/ScoreRing'
import WaveLines from '@/components/WaveLines'
import HeroRibbons from '@/components/HeroRibbons'
import ShareButton from '@/components/ShareButton'

export default function SampleReportPage() {
  return (
    <div className="min-h-screen bg-cream">

      <header className="bg-white border-b border-cream-dark sticky top-0 z-20 relative">
        <div className="absolute right-0 top-0 bottom-0 w-2/5 overflow-hidden pointer-events-none" aria-hidden="true">
          <HeroRibbons />
        </div>
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between relative z-10">
          <Link href="/" style={{ fontFamily: 'var(--font-playfair)' }} className="text-xl font-bold text-navy hover:text-navy-light transition-colors">
            EstateReady
          </Link>
          <div className="flex items-center gap-4">
            <ShareButton
              url="https://estateready.vercel.app/sample-report"
              text="See what an EstateReady assessment looks like — a real scoring report you can take to an attorney."
            />
            <Link href="/intake" className="bg-navy text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-navy-light transition-colors">
              Start My Assessment — $21
            </Link>
          </div>
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
          <p className="text-xs text-slate-mid uppercase tracking-wider mb-0.5">EstateReady Assessment Report</p>
          <p className="text-xs text-slate-mid">Sample — Generated for illustration purposes only</p>
        </div>

        {/* Tier verdict */}
        <div className="rounded-2xl overflow-hidden bg-tier-3">
          <div className="px-8 py-8 flex items-center justify-between gap-6">
            <div className="flex-1">
              <p className="text-xs font-semibold text-amber-100 uppercase tracking-widest mb-1">Assessment Result</p>
              <h1 style={{ fontFamily: 'var(--font-playfair)' }} className="text-3xl font-bold text-white mb-2">
                Tier 3 — Complex
              </h1>
              <p className="text-amber-100 text-sm leading-relaxed">
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
            <p className="text-xs text-amber-100">EstateReady Assessment Report</p>
          </div>
        </div>

        {/* Narrative */}
        <div className="bg-white rounded-2xl border border-cream-dark px-8 py-7">
          <h2 className="text-xs font-semibold text-slate-mid uppercase tracking-widest mb-4">Assessment Summary</h2>
          <div className="space-y-3 text-gray-700 text-sm leading-relaxed">
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
        <div className="bg-white rounded-2xl border border-cream-dark px-8 py-7">
          <h2 className="text-xs font-semibold text-slate-mid uppercase tracking-widest mb-5">Priority Actions</h2>
          <div className="space-y-5">
            {[
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
            ].map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="shrink-0 w-8 h-8 rounded-full bg-navy text-white text-xs font-bold flex items-center justify-center mt-0.5">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div className="flex-1 border-b border-cream-dark pb-5 last:border-0 last:pb-0">
                  <p className="text-sm font-semibold text-navy mb-1 leading-snug">{item.action}</p>
                  <p className="text-xs text-slate-mid leading-relaxed">{item.reason}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Domain findings */}
        <div className="bg-white rounded-2xl border border-cream-dark px-8 py-7">
          <h2 className="text-xs font-semibold text-slate-mid uppercase tracking-widest mb-5">Domain Findings</h2>
          <div className="space-y-3">
            {[
              { severity: 'critical', label: 'Business Ownership', finding: 'LLC interest with no trust, no successor designation, and no confirmed operating agreement provisions for incapacity or death. Highest-severity finding in this assessment.' },
              { severity: 'critical', label: 'Existing Documents', finding: 'No will, no trust, no financial POA, no healthcare POA, and no advance directive. Complete absence of estate planning infrastructure.' },
              { severity: 'critical', label: 'Beneficiary Designations', finding: 'Retirement account and life insurance designations not reviewed in 3+ years. POD/TOD status on bank accounts is unknown.' },
              { severity: 'caution', label: 'Insurance Structure', finding: 'Life insurance owned personally rather than through an ILIT. At your asset level, this creates unnecessary estate tax inclusion risk.' },
              { severity: 'caution', label: 'Asset Titling', finding: 'Primary assets titled solely in your name. Without a trust, these pass through probate — a time-consuming and public process that a revocable trust eliminates.' },
              { severity: 'info', label: 'Tax Awareness', finding: 'You were aware of the 2025 federal estate tax exemption sunset. At your current asset level you are below the threshold, but business appreciation could change this over time.' },
            ].map((f, i) => {
              const style = f.severity === 'critical'
                ? { bar: 'bg-[#7A2840]', badge: 'bg-[#7A2840] text-white', label: 'Critical', bg: 'bg-[#FDF2F4] border-[#E8C4CC]' }
                : f.severity === 'caution'
                ? { bar: 'bg-gold',       badge: 'bg-gold text-white',       label: 'Caution',  bg: 'bg-gold/10 border-gold/25'         }
                : { bar: 'bg-slate-mid',  badge: 'bg-slate-mid text-white',  label: 'Note',     bg: 'bg-cream border-cream-dark'        }
              return (
                <div key={i} className={`rounded-xl border flex overflow-hidden ${style.bg}`}>
                  <div className={`w-1.5 shrink-0 ${style.bar}`} />
                  <div className="px-4 py-4 flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded ${style.badge}`}>{style.label}</span>
                      <span className="text-sm font-semibold text-navy">{f.label}</span>
                    </div>
                    <p className="text-xs text-slate-mid leading-relaxed">{f.finding}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-tier-3 rounded-2xl px-8 py-8 text-center relative overflow-hidden">
          <WaveLines />
          <div className="relative z-10">
            <p className="text-xs font-semibold text-[#F5C8D4] uppercase tracking-widest mb-2">Your next step</p>
            <h2 style={{ fontFamily: 'var(--font-playfair)' }} className="text-xl font-bold text-white mb-2">
              Ready to see your real results?
            </h2>
            <p className="text-sm text-[#F5C8D4] leading-relaxed mb-6 max-w-md mx-auto">
              This sample is based on a fictional individual. Your report will be specific to your situation —
              scored across all 7 domains with personalized findings and a priority action plan.
            </p>
            <Link
              href="/intake"
              className="inline-flex items-center bg-white text-tier-3 px-6 py-3 rounded-lg text-sm font-semibold hover:bg-cream transition-colors"
            >
              Start My Assessment — $21 →
            </Link>
            <p className="text-xs text-[#F5C8D4]/70 mt-4">One-time · ~10 minutes · Not legal advice</p>
          </div>
        </div>

        <p className="text-xs text-slate-mid text-center pb-4">
          EstateReady · Not a law firm · Not legal advice · For informational purposes only
        </p>
      </div>
    </div>
  )
}
