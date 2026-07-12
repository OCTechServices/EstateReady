import type { Metadata } from 'next'
import Link from 'next/link'

// TODO: Remove impact-site-verification once Impact affiliate verification is complete
export const metadata: Metadata = {
  other: {
    'impact-site-verification': '77ac9963-85ba-4e7f-a245-2bf77a5eef5b',
  },
}

import FaqAccordion from '@/components/FaqAccordion'

export default function Home() {
  return (
    <div id="top" className="min-h-screen bg-white">

      {/* ── Nav ─────────────────────────────────────────────────────── */}
      <header className="bg-white border-b border-cream-dark sticky top-0 z-20">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#top" style={{ fontFamily: 'var(--font-playfair)' }} className="text-xl font-bold text-navy">
            Will &amp; Estate Ready
          </a>
          <div className="flex items-center gap-4">
            <Link href="/sample-report" className="text-sm text-slate-mid hover:text-navy transition-colors hidden sm:block">
              View Sample Report
            </Link>
            <Link href="/intake" className="bg-navy text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-navy-light transition-colors">
              Begin Assessment
            </Link>
          </div>
        </div>
      </header>

      {/* ── Hero ────────────────────────────────────────────────────── */}
      <section className="bg-white border-b border-cream-dark">
        <div className="max-w-4xl mx-auto px-6 pt-16 pb-14">

          <h1 style={{ fontFamily: 'var(--font-playfair)' }} className="text-5xl sm:text-6xl font-bold text-navy leading-tight mb-6 max-w-3xl">
            Know where your estate planning stands — before you spend a dollar on attorney time.
          </h1>

          <p className="text-lg text-slate-mid leading-relaxed max-w-2xl mb-4">
            Answer 40 plain-language questions. Receive a personal report that scores your
            estate planning across 7 areas and tells you exactly what you need to do first.
          </p>
          <p className="text-base text-slate-mid border-l-2 border-gold pl-4 mb-10 max-w-xl leading-relaxed">
            Built around the questions estate planning attorneys ask every new client.
            Not legal advice. A preparation tool.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-start gap-4 mb-8">
            <Link
              href="/intake"
              className="bg-navy text-white px-8 py-4 rounded-lg font-semibold hover:bg-navy-light transition-colors text-lg text-center"
            >
              Start My Assessment — $21
            </Link>
            <Link
              href="/sample-report"
              className="text-navy text-base font-medium underline underline-offset-4 hover:text-navy-light transition-colors sm:pt-3.5"
            >
              View a Sample Report →
            </Link>
          </div>

          {/* Process — inline, no dedicated section needed */}
          <div className="flex flex-wrap gap-x-8 gap-y-2 mb-8 text-sm text-slate-mid">
            <span><strong className="text-navy font-semibold">1.</strong> Answer 40 questions (~10 min)</span>
            <span><strong className="text-navy font-semibold">2.</strong> Pay once — $21 via Stripe</span>
            <span><strong className="text-navy font-semibold">3.</strong> Receive your report by email</span>
            <span><strong className="text-navy font-semibold">4.</strong> Share with your attorney</span>
          </div>

          <p className="text-sm text-slate-mid">
            Not legal advice &nbsp;·&nbsp; No account required &nbsp;·&nbsp; No subscription &nbsp;·&nbsp; Secure payment via Stripe
          </p>
        </div>
      </section>

      {/* ── Sample Report ───────────────────────────────────────────── */}
      <section className="bg-cream border-b border-cream-dark">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <h2 style={{ fontFamily: 'var(--font-playfair)' }} className="text-3xl font-bold text-navy mb-2 leading-snug">
            Here is what you receive.
          </h2>
          <p className="text-base text-slate-mid mb-8 max-w-xl leading-relaxed">
            Every finding is tied to your specific answers. Every recommendation explains why it matters.
          </p>

          <div className="rounded-lg border border-gray-200 overflow-hidden shadow-sm">
            <div className="bg-gold/10 border-b border-gold/20 px-6 py-2.5">
              <p className="text-xs font-semibold text-gold">Sample Report · Fictional individual · For illustration only</p>
            </div>

            {/* Tier banner */}
            <div className="bg-tier-3 px-8 py-7 flex items-center justify-between gap-6">
              <div>
                <p className="text-xs font-semibold text-amber-100 uppercase tracking-widest mb-1">Your Assessment Result</p>
                <h3 style={{ fontFamily: 'var(--font-playfair)' }} className="text-2xl font-bold text-white mb-1">
                  Tier 3 — Complex
                </h3>
                <p className="text-amber-100 text-base leading-relaxed max-w-md">
                  Your estate involves significant complexity that requires careful planning and structured attention.
                </p>
              </div>
              <div className="shrink-0 text-right hidden sm:block">
                <p style={{ fontFamily: 'var(--font-playfair)' }} className="text-5xl font-bold text-white leading-none">68</p>
                <p className="text-amber-100/70 text-sm mt-1">of 100</p>
              </div>
            </div>

            {/* Priority Actions + Findings */}
            <div className="bg-white grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-cream-dark">
              <div className="px-7 py-6">
                <p className="text-xs font-semibold text-slate-mid uppercase tracking-widest mb-5">Priority Actions</p>
                <div className="space-y-5">
                  {[
                    {
                      n: '01',
                      action: 'Establish a revocable living trust that addresses your LLC interest.',
                      reason: 'Without one, your business interest passes through probate — freezing operations and exposing ownership to court oversight.',
                    },
                    {
                      n: '02',
                      action: 'Execute a financial power of attorney and healthcare power of attorney.',
                      reason: 'No one is currently authorized to manage your finances or make medical decisions if you are incapacitated.',
                    },
                  ].map((item) => (
                    <div key={item.n} className="flex gap-4">
                      <div className="shrink-0 w-8 h-8 rounded-full bg-navy text-white text-xs font-bold flex items-center justify-center mt-0.5">
                        {item.n}
                      </div>
                      <div className="border-b border-cream-dark pb-5 last:border-0 last:pb-0 flex-1">
                        <p className="text-sm font-semibold text-navy mb-1 leading-snug">{item.action}</p>
                        <p className="text-sm text-slate-mid leading-relaxed">{item.reason}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="px-7 py-6">
                <p className="text-xs font-semibold text-slate-mid uppercase tracking-widest mb-5">Domain Findings</p>
                <div className="space-y-3">
                  {[
                    {
                      severity: 'critical',
                      label: 'Existing Documents',
                      finding: 'No will, no trust, no financial POA, no healthcare POA. Complete absence of estate planning infrastructure.',
                    },
                    {
                      severity: 'critical',
                      label: 'Beneficiary Designations',
                      finding: 'Retirement account and life insurance designations not reviewed in 3+ years.',
                    },
                    {
                      severity: 'caution',
                      label: 'Insurance Structure',
                      finding: 'Life insurance owned personally — creates unnecessary estate tax inclusion risk at your asset level.',
                    },
                  ].map((f, i) => {
                    const style = f.severity === 'critical'
                      ? { bar: 'bg-[#7A2840]', badge: 'bg-[#7A2840] text-white', label: 'Critical', bg: 'bg-[#FDF2F4] border-[#E8C4CC]' }
                      : { bar: 'bg-gold',       badge: 'bg-gold text-white',       label: 'Caution',  bg: 'bg-gold/10 border-gold/25' }
                    return (
                      <div key={i} className={`rounded-lg border flex overflow-hidden ${style.bg}`}>
                        <div className={`w-1.5 shrink-0 ${style.bar}`} />
                        <div className="px-4 py-3">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded ${style.badge}`}>{style.label}</span>
                            <span className="text-sm font-semibold text-navy">{f.label}</span>
                          </div>
                          <p className="text-sm text-slate-mid leading-relaxed">{f.finding}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            <div className="border-t border-cream-dark bg-cream/50 px-6 py-4 flex items-center justify-between gap-4">
              <p className="text-sm text-slate-mid">Print it. Email it. Bring it to your attorney.</p>
              <Link href="/sample-report" className="text-sm font-semibold text-navy underline underline-offset-2 hover:text-navy-light transition-colors whitespace-nowrap">
                See full sample report →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Who it's for ────────────────────────────────────────────── */}
      <section className="bg-white border-b border-cream-dark">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <h2 style={{ fontFamily: 'var(--font-playfair)' }} className="text-2xl font-bold text-navy mb-8 max-w-xl leading-snug">
            You don&apos;t need to have it figured out to begin.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                quote: "I don't know if my parents have anything in place. I don't even know what questions to ask.",
                who: 'Adult children helping aging parents',
              },
              {
                quote: "I own a home and have kids. I keep meaning to get this sorted. I just don't know where to start.",
                who: 'Homeowners with a family',
              },
              {
                quote: "I want to get my affairs in order before things get complicated. What do I actually need to do?",
                who: 'Anyone approaching retirement',
              },
            ].map((p) => (
              <div key={p.who} className="border-l-2 border-gold pl-5 py-1">
                <p style={{ fontFamily: 'var(--font-playfair)' }} className="text-navy text-lg leading-snug font-medium mb-3">
                  &ldquo;{p.quote}&rdquo;
                </p>
                <p className="text-xs font-semibold text-slate-mid uppercase tracking-wide">{p.who}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What we owe you ─────────────────────────────────────────── */}
      <section className="bg-cream border-b border-cream-dark">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <h2 style={{ fontFamily: 'var(--font-playfair)' }} className="text-2xl font-bold text-navy mb-8">
            What we will — and won&apos;t — tell you.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                title: 'Not legal advice — ever',
                body: 'Will & Estate Ready is not a law firm. We do not represent you. We give you an honest picture of your situation, clearly scored and explained. What you do with it is your decision.',
              },
              {
                title: '$21, one time. No subscription.',
                body: 'One payment. One report. No renewal, no account, no ongoing charges. Your report is yours for one year via a secure link sent to your email.',
              },
              {
                title: 'Your payment is handled by Stripe.',
                body: 'We never see or store your card details. Stripe processes all payments. It is the same technology used by Amazon, Target, and your bank.',
              },
              {
                title: 'Your information stays private.',
                body: 'Your answers are used to generate your report — nothing else. We do not sell your data, share it, or use it for marketing. Ever.',
              },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-lg border border-cream-dark px-6 py-5">
                <p className="text-navy text-base font-semibold mb-1">{item.title}</p>
                <p className="text-slate-mid text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────── */}
      <section className="bg-white border-b border-cream-dark">
        <div className="max-w-3xl mx-auto px-6 py-14">
          <h2 style={{ fontFamily: 'var(--font-playfair)' }} className="text-2xl font-bold text-navy mb-8">
            Common questions
          </h2>
          <FaqAccordion />
        </div>
      </section>

      {/* ── Final CTA ───────────────────────────────────────────────── */}
      <section className="bg-navy-dark">
        <div className="max-w-3xl mx-auto px-6 py-20">
          <div className="max-w-xl">
            <h2 style={{ fontFamily: 'var(--font-playfair)' }} className="text-4xl font-bold text-white mb-3 leading-tight">
              Ten minutes to understand what you&apos;ve been putting off for years.
            </h2>
            <p className="text-white/80 text-lg leading-relaxed mb-8">
              $21. One report. A clearer picture of your situation — and a better first conversation with an attorney.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/intake" className="bg-white text-navy px-7 py-4 rounded-lg font-semibold hover:bg-cream transition-colors text-lg text-center">
                Start My Assessment — $21
              </Link>
              <Link href="/sample-report" className="border border-white/30 text-white px-7 py-4 rounded-lg font-medium hover:bg-white/10 transition-colors text-base text-center">
                View a Sample Report
              </Link>
            </div>
            <p className="text-sm text-white/50 mt-5">
              One-time · No subscription · Not legal advice · Secure payment via Stripe
            </p>
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────── */}
      <footer className="bg-navy-dark border-t border-white/10 px-6 py-8">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/60">
          <div className="text-center sm:text-left">
            <span style={{ fontFamily: 'var(--font-playfair)' }} className="text-white font-semibold block mb-1">Will &amp; Estate Ready</span>
            <span>An estate planning readiness assessment. Not a law firm.</span>
          </div>
          <span className="text-xs">Not legal advice · For informational purposes only</span>
          <div className="flex gap-4 text-xs">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link>
          </div>
        </div>
      </footer>

    </div>
  )
}
