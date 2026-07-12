import type { Metadata } from 'next'
import Link from 'next/link'

// TODO: Remove impact-site-verification once Impact affiliate verification is complete
export const metadata: Metadata = {
  other: {
    'impact-site-verification': '77ac9963-85ba-4e7f-a245-2bf77a5eef5b',
  },
}

import ScoreRing from '@/components/ScoreRing'
import ContrastTable from '@/components/ContrastTable'
import DomainGrid from '@/components/DomainGrid'
import FeatureRows from '@/components/FeatureRows'
import FaqAccordion from '@/components/FaqAccordion'
import ShareButton from '@/components/ShareButton'
import BackToTop from '@/components/BackToTop'


export default function Home() {
  return (
    <div id="top" className="min-h-screen bg-cream">

      {/* Nav */}
      <header className="bg-white border-b border-cream-dark sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#top" style={{ fontFamily: 'var(--font-playfair)' }} className="text-xl font-bold text-navy hover:text-navy-light transition-colors">
            Will &amp; Estate Ready
          </a>
          <div className="flex items-center gap-4">
            <Link href="/sample-report" className="text-sm text-slate-mid hover:text-navy transition-colors hidden sm:block">
              View Sample Report
            </Link>
            <Link href="/intake" className="bg-navy text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-navy-light transition-colors">
              Start — $21
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-white border-b border-cream-dark">
        <div className="max-w-5xl mx-auto px-6 pt-20 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Left — editorial text */}
            <div>
              <h1 style={{ fontFamily: 'var(--font-playfair)' }} className="text-4xl sm:text-5xl font-bold text-navy leading-tight mb-6">
                The hardest part of estate planning is not knowing where to start.
              </h1>
              <p className="text-lg text-slate-mid leading-relaxed mb-8">
                Before you hire an attorney, you should know what you need.
                Will &amp; Estate Ready gives you a clear picture of where your estate planning
                stands — in plain language, in about ten minutes.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-10">
                <Link
                  href="/intake"
                  className="bg-navy text-white px-7 py-3.5 rounded-lg font-semibold hover:bg-navy-light transition-colors text-base text-center"
                >
                  Start My Assessment — $21
                </Link>
                <Link
                  href="/sample-report"
                  className="border border-navy/20 text-navy px-7 py-3.5 rounded-lg font-medium hover:bg-navy/5 transition-colors text-base text-center"
                >
                  View a Sample Report
                </Link>
              </div>

              {/* Trust row */}
              <div className="flex flex-wrap gap-x-6 gap-y-3">
                {[
                  'Not legal advice',
                  'Secure payment via Stripe',
                  'No account required',
                  'About 10 minutes',
                ].map((item) => (
                  <p key={item} className="text-xs text-slate-mid flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-gold inline-block" />
                    {item}
                  </p>
                ))}
              </div>
            </div>

            {/* Right — static report preview */}
            <div className="hidden lg:block">
              <div className="border border-cream-dark rounded-2xl overflow-hidden bg-white shadow-sm">
                <div className="bg-navy px-6 py-4 border-b border-navy-light">
                  <p style={{ fontFamily: 'var(--font-playfair)' }} className="text-white font-semibold text-base">
                    Your Estate Readiness Report
                  </p>
                  <p className="text-gold text-xs mt-0.5">Delivered by secure link · Yours for one year</p>
                </div>
                <div className="p-6">
                  <p className="text-xs font-semibold text-slate-mid uppercase tracking-widest mb-4">What your report covers</p>
                  <div className="space-y-3.5">
                    {[
                      'A readiness score across 7 planning areas',
                      'Specific findings for your situation',
                      'Prioritized next steps — in plain language',
                      'Prepared for your first attorney conversation',
                      'Document and beneficiary review checklist',
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-3">
                        <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 text-gold mt-0.5 shrink-0">
                          <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.2" />
                          <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <p className="text-sm text-navy leading-relaxed">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="border-t border-cream-dark px-6 py-4 bg-cream">
                  <p className="text-xs text-slate-mid">
                    One-time · $21 · No subscription · No account required
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Credibility bar */}
      <section className="bg-cream border-b border-cream-dark">
        <div className="max-w-5xl mx-auto px-6 py-5">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-2">
            {[
              { value: '7', label: 'Planning areas reviewed' },
              { value: '40', label: 'Guided questions' },
              { value: '~10 min', label: 'To complete' },
              { value: '$21', label: 'One-time · no subscription' },
              { value: '1 year', label: 'Report access' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2 text-center sm:text-left">
                <span style={{ fontFamily: 'var(--font-playfair)' }} className="text-lg font-bold text-navy">{item.value}</span>
                <span className="text-xs text-slate-mid">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="bg-white border-b border-cream-dark">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <p className="text-xs font-semibold text-gold uppercase tracking-widest mb-4">Who this is for</p>
          <h2 style={{ fontFamily: 'var(--font-playfair)' }} className="text-3xl font-bold text-navy mb-10 max-w-xl leading-snug">
            Anyone who knows they should have a plan — and isn&apos;t sure what that means.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                quote: "I don't know if my parents have anything in place. I don't even know what questions to ask.",
                who: 'Adult children helping aging parents',
              },
              {
                quote: "I own a home and have kids. I keep meaning to get this sorted. I just don't know where to start.",
                who: 'Parents with young children',
              },
              {
                quote: "I want to simplify my affairs before things get complicated. What do I actually need to do?",
                who: 'Anyone approaching retirement',
              },
            ].map((p) => (
              <div key={p.who} className="border-l-2 border-gold pl-6 py-2">
                <p style={{ fontFamily: 'var(--font-playfair)' }} className="text-navy text-lg leading-snug font-medium mb-4">
                  &ldquo;{p.quote}&rdquo;
                </p>
                <p className="text-xs font-semibold text-slate-mid uppercase tracking-wide">{p.who}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why this exists */}
      <section className="bg-navy-dark">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold text-gold uppercase tracking-widest mb-3">Why this exists</p>
            <h2 style={{ fontFamily: 'var(--font-playfair)' }} className="text-3xl font-bold text-white mb-4 leading-tight">
              The process was never designed to tell you what you need.
            </h2>
            <p className="text-white/80 text-sm leading-relaxed mb-3">
              Most people know they should have an estate plan. Very few know what that actually
              means for their specific situation. And the only way to find out has always been to
              pay an attorney $400 an hour to tell you — before they can even begin to help you.
            </p>
            <p className="text-white/80 text-sm leading-relaxed mb-3">
              That&apos;s backwards. You shouldn&apos;t have to spend money to understand what you need
              to spend money on. You shouldn&apos;t need a law degree to know whether you need a will,
              a trust, or something else entirely.
            </p>
            <ContrastTable />
            <p className="text-white/50 text-xs mt-3 leading-relaxed">
              ↳ <span className="text-gold font-semibold">Probate</span> is the court-supervised process of distributing your assets after death.
            </p>
            <p className="text-white/80 text-sm leading-relaxed mt-4">
              Will &amp; Estate Ready was built out of that frustration. Ten minutes. Forty questions.
              A clear, honest picture of where you stand.
            </p>
          </div>
          <div className="flex justify-end mt-6 [&_button]:text-white [&_button]:hover:text-white/70">
            <BackToTop />
          </div>
        </div>
      </section>

      {/* Seven areas we review */}
      <section id="how-it-works" className="bg-cream border-b border-cream-dark scroll-mt-28">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <p className="text-xs font-semibold text-gold uppercase tracking-widest mb-2">The assessment</p>
          <h2 style={{ fontFamily: 'var(--font-playfair)' }} className="text-3xl font-bold text-navy mb-3 leading-snug">
            Seven areas. Forty questions. One honest picture.
          </h2>
          <p className="text-slate-mid text-sm leading-relaxed mb-10 max-w-2xl">
            Each area of your estate is reviewed independently, then combined into a single
            readiness score and set of recommendations specific to your situation.
          </p>

          {/* How it works — static numbered steps */}
          <div className="hidden sm:grid sm:grid-cols-5 gap-6 mb-14">
            {[
              { step: '01', label: 'Answer 40 questions', sub: '~10 min · no legal knowledge needed' },
              { step: '02', label: 'Pay once — $21', sub: 'Stripe checkout · no account needed' },
              { step: '03', label: 'Your answers are scored across 7 planning areas', sub: 'Each area reviewed independently' },
              { step: '04', label: 'Report link emailed', sub: 'Secure link · accessible for 1 year' },
              { step: '05', label: 'Share with your attorney', sub: 'Print, email, or share the link' },
            ].map((s) => (
              <div key={s.step} className="flex flex-col">
                <div className="w-8 h-8 rounded-full bg-navy text-white text-xs font-bold flex items-center justify-center mb-3">
                  {s.step}
                </div>
                <p className="text-sm font-semibold text-navy leading-snug mb-1">{s.label}</p>
                <p className="text-xs text-slate-mid leading-relaxed">{s.sub}</p>
              </div>
            ))}
          </div>

          {/* Mobile: vertical list */}
          <div className="sm:hidden space-y-6 mb-12">
            {[
              { step: '01', label: 'Answer 40 questions', sub: '~10 min · no legal knowledge needed' },
              { step: '02', label: 'Pay once — $21', sub: 'Stripe checkout · no account needed' },
              { step: '03', label: 'Your answers are scored across 7 planning areas', sub: 'Each area reviewed independently' },
              { step: '04', label: 'Report link emailed', sub: 'Secure link · accessible for 1 year' },
              { step: '05', label: 'Share with your attorney', sub: 'Print, email, or share the link' },
            ].map((s, i, arr) => (
              <div key={s.step} className="flex gap-4 items-start">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-navy text-white text-xs font-bold flex items-center justify-center shrink-0">
                    {s.step}
                  </div>
                  {i < arr.length - 1 && <div className="w-px h-8 bg-cream-dark mt-2" />}
                </div>
                <div className="pt-1.5">
                  <p className="text-sm font-semibold text-navy leading-snug">{s.label}</p>
                  <p className="text-xs text-slate-mid leading-relaxed mt-0.5">{s.sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Seven areas grid */}
          <p className="text-xs font-semibold text-gold uppercase tracking-widest mb-5">Seven areas we review</p>
          <DomainGrid />
          <div className="flex justify-end mt-6"><BackToTop /></div>
        </div>
      </section>

      {/* What's in the report */}
      <section id="what-you-get" className="bg-white border-b border-cream-dark scroll-mt-28">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <p className="text-xs font-semibold text-gold uppercase tracking-widest mb-4">What&apos;s in the report</p>
          <h2 style={{ fontFamily: 'var(--font-playfair)' }} className="text-3xl font-bold text-navy mb-5 leading-snug">
            Not a checklist. A real picture of your situation.
          </h2>
          <p className="text-slate-mid text-sm leading-relaxed mb-10 max-w-2xl">
            The Will &amp; Estate Ready Report is built around the questions estate planning attorneys
            wish their clients had answered before walking through the door. Every finding connects
            to your specific answers. Every recommendation explains why it matters.
          </p>

          <FeatureRows />

          {/* Sample report card */}
          <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-sm mt-10">
            <div className="bg-gold/10 border-b border-gold/20 px-6 py-2.5 flex items-center justify-between">
              <p className="text-xs font-semibold text-gold">Sample Report · Fictional individual · For illustration only</p>
              <Link href="/sample-report" className="text-xs font-semibold text-navy underline underline-offset-2 hover:text-navy-light transition-colors">
                See full report →
              </Link>
            </div>

            <div className="bg-tier-3 px-8 py-7 flex items-center justify-between gap-6">
              <div>
                <p className="text-xs font-semibold text-amber-100 uppercase tracking-widest mb-1">Assessment Result</p>
                <h3 style={{ fontFamily: 'var(--font-playfair)' }} className="text-2xl font-bold text-white mb-1">
                  Tier 3 — Complex
                </h3>
                <p className="text-amber-100 text-sm leading-relaxed max-w-md">
                  Your estate involves significant complexity that requires careful planning and structured attention.
                </p>
              </div>
              <div className="shrink-0">
                <ScoreRing score={68} color="rgba(255,255,255,0.9)" />
              </div>
            </div>

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
                        <p className="text-xs text-slate-mid leading-relaxed">{item.reason}</p>
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
                      <div key={i} className={`rounded-xl border flex overflow-hidden ${style.bg}`}>
                        <div className={`w-1.5 shrink-0 ${style.bar}`} />
                        <div className="px-4 py-3">
                          <div className="flex items-center gap-2 mb-1">
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
            </div>
          </div>
        </div>
      </section>

      {/* Transparency */}
      <section className="bg-cream border-b border-cream-dark">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
            <div>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest mb-4">Honesty first</p>
              <h2 style={{ fontFamily: 'var(--font-playfair)' }} className="text-3xl font-bold text-navy mb-4 leading-snug">
                We give it to you straight.
              </h2>
              <p className="text-slate-mid text-sm leading-relaxed mb-3">
                Will &amp; Estate Ready is not a law firm. We don&apos;t represent you. We don&apos;t give legal advice.
                What we give you is an honest picture of your estate planning situation — clearly
                scored, clearly explained, with no interest in selling you anything else.
              </p>
              <p className="text-slate-mid text-sm leading-relaxed">
                The report is yours to do with as you choose. Most people take it to an attorney.
                Some use it to start a conversation with their family. A few just needed to
                understand where they stood.
              </p>
            </div>
            <div className="space-y-3">
              {[
                { title: 'Payment via Stripe', body: 'We never see or store your card details.' },
                { title: 'No account required', body: 'No login. No stored profile. Your report is a secure link, yours for a year.' },
                { title: 'Your data stays yours', body: "We don't sell it, share it, or market to you with it." },
                { title: 'Not legal advice — ever', body: 'This is stated clearly, not buried. We mean it.' },
              ].map((item) => (
                <div key={item.title} className="bg-white rounded-xl border border-cream-dark px-5 py-4">
                  <p className="text-navy text-sm font-semibold mb-0.5">{item.title}</p>
                  <p className="text-slate-mid text-xs leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8"><BackToTop /></div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-white border-b border-cream-dark scroll-mt-28">
        <div className="max-w-3xl mx-auto px-6 py-16">
          <p className="text-xs font-semibold text-gold uppercase tracking-widest mb-8">Common questions</p>
          <FaqAccordion />
          <div className="mt-10 pt-6 border-t border-cream-dark flex items-center gap-2">
            <span className="text-xs text-slate-mid">Know someone who needs this?</span>
            <ShareButton
              url="https://willestateready.com"
              text="Know where your estate planning stands before you spend a dollar on attorney time. 40 questions · $21 · ~10 minutes."
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-navy-dark">
        <div className="max-w-3xl mx-auto px-6 py-20">
          <div className="max-w-xl">
            <h2 style={{ fontFamily: 'var(--font-playfair)' }} className="text-4xl font-bold text-white mb-3 leading-tight">
              Ten minutes to understand what you&apos;ve been putting off for years.
            </h2>
            <p className="text-white/80 text-base leading-relaxed mb-8">
              $21. One report. A clearer picture — and a better first conversation with an attorney.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/intake" className="bg-white text-navy px-7 py-3.5 rounded-lg font-semibold hover:bg-cream transition-colors text-base text-center">
                Start My Assessment — $21
              </Link>
              <Link href="/sample-report" className="border border-white/30 text-white px-7 py-3.5 rounded-lg font-medium hover:bg-white/10 transition-colors text-base text-center">
                View a Sample Report
              </Link>
            </div>
            <p className="text-xs text-white/50 mt-5">
              One-time · No subscription · Not legal advice · Secure payment via Stripe
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy-dark border-t border-white/10 px-6 py-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/60">
          <span style={{ fontFamily: 'var(--font-playfair)' }} className="text-white font-semibold">Will &amp; Estate Ready</span>
          <span>Not a law firm · Not legal advice · For informational purposes only</span>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link>
          </div>
        </div>
      </footer>

    </div>
  )
}
