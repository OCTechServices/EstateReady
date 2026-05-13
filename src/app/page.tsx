import type { Metadata } from 'next'
import Link from 'next/link'

// TODO: Remove impact-site-verification once Impact affiliate verification is complete
export const metadata: Metadata = {
  other: {
    'impact-site-verification': '77ac9963-85ba-4e7f-a245-2bf77a5eef5b',
  },
}
import SectionNav from '@/components/SectionNav'
import FloatingCTA from '@/components/FloatingCTA'
import BackToTop from '@/components/BackToTop'
import WaveLines from '@/components/WaveLines'
import ScoreRing from '@/components/ScoreRing'
import TierCycler from '@/components/TierCycler'
import HeroRibbons from '@/components/HeroRibbons'
import ContrastTable from '@/components/ContrastTable'
import DomainGrid from '@/components/DomainGrid'
import FeatureRows from '@/components/FeatureRows'
import FaqAccordion from '@/components/FaqAccordion'
import ShareButton from '@/components/ShareButton'


export default function Home() {
  return (
    <div id="top" className="min-h-screen bg-cream">

      {/* Nav */}
      <header className="bg-white border-b border-cream-dark sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#top" style={{ fontFamily: 'var(--font-playfair)' }} className="text-xl font-bold text-navy hover:text-navy-light transition-colors">
            EstateReady
          </a>
          <div className="flex items-center gap-4">
            <Link href="/sample-report" className="text-sm text-slate-mid hover:text-navy transition-colors hidden sm:block">
              Sample Report
            </Link>
            <Link href="/intake" className="bg-navy text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-navy-light transition-colors">
              Start — $21
            </Link>
          </div>
        </div>
      </header>

      <SectionNav />
      <FloatingCTA />

      {/* Hero */}
      <section className="bg-white border-b border-cream-dark relative overflow-hidden">
        <HeroRibbons />
        <div className="max-w-5xl mx-auto px-6 pt-20 pb-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
            <p className="text-xs font-semibold text-gold uppercase tracking-widest mb-5">
              Estate Planning Assessment
            </p>
            <h1 style={{ fontFamily: 'var(--font-playfair)' }} className="text-4xl sm:text-5xl font-bold text-navy leading-tight mb-6">
              The hardest part of estate planning is not knowing where to start.
            </h1>
            <p className="text-lg text-slate-mid leading-relaxed mb-8">
              EstateReady gives you a clear picture of where your estate planning actually stands —
              before you spend hours researching or hundreds of dollars on attorney time just to
              figure out what you need.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
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
                See What You Get First
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                {
                  label: 'Not legal advice',
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-navy" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      {/* Center pole */}
                      <line x1="12" y1="5" x2="12" y2="20" />
                      {/* Base */}
                      <line x1="8" y1="20" x2="16" y2="20" />
                      {/* Cross beam */}
                      <line x1="3" y1="8" x2="21" y2="8" />
                      {/* Pivot circle */}
                      <circle cx="12" cy="5" r="1.2" fill="currentColor" stroke="none" />
                      {/* Left pan strings */}
                      <line x1="5" y1="8" x2="3" y2="14" />
                      <line x1="5" y1="8" x2="7" y2="14" />
                      {/* Left pan */}
                      <path d="M3 14a2 2 0 004 0" />
                      {/* Right pan strings */}
                      <line x1="19" y1="8" x2="17" y2="14" />
                      <line x1="19" y1="8" x2="21" y2="14" />
                      {/* Right pan */}
                      <path d="M17 14a2 2 0 004 0" />
                    </svg>
                  ),
                },
                {
                  label: 'Secure payment via Stripe',
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-navy" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" />
                      <path d="M7 11V7a5 5 0 0110 0v4" />
                    </svg>
                  ),
                },
                {
                  label: 'No account required',
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-navy" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                      <line x1="18" y1="8" x2="23" y2="13" />
                      <line x1="23" y1="8" x2="18" y2="13" />
                    </svg>
                  ),
                },
                {
                  label: 'About 10 minutes',
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-navy" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  ),
                },
              ].map((item) => (
                <div key={item.label} className="flex flex-col gap-1.5">
                  <div className="w-8 h-8 rounded-lg bg-navy/10 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <p className="text-xs text-slate-mid leading-snug">{item.label}</p>
                </div>
              ))}
            </div>
            </div>

            {/* Right — animated tier cycler */}
            <TierCycler />

          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="bg-cream border-b border-cream-dark">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <p className="text-xs font-semibold text-gold uppercase tracking-widest mb-4">Who this is for</p>
          <h2 style={{ fontFamily: 'var(--font-playfair)' }} className="text-3xl font-bold text-navy mb-10 max-w-xl leading-snug">
            Anyone who knows they should have a plan and isn&apos;t sure what that means.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              {
                quote: "I don't know if my parents have anything in place. I don't even know what questions to ask.",
                who: 'Adult children helping aging parents',
                tag: 'Family planning',
              },
              {
                quote: "I own a home and have kids. I keep meaning to get this sorted. I just don't know where to start.",
                who: 'Parents with young children',
                tag: 'Home & family',
              },
              {
                quote: "I want to simplify my affairs before things get complicated. What do I actually need to do?",
                who: 'Anyone approaching retirement',
                tag: 'Life transition',
              },
            ].map((p) => (
              <div key={p.who} className="bg-white rounded-2xl border border-cream-dark p-7 flex flex-col justify-between gap-6">
                {/* Giant quote mark + quote */}
                <div>
                  <p className="text-gold leading-none select-none mb-3" style={{ fontFamily: 'Georgia, serif', fontSize: '5rem', lineHeight: 1 }}>&ldquo;</p>
                  <p style={{ fontFamily: 'var(--font-playfair)' }} className="text-navy text-lg leading-snug font-medium -mt-4">
                    {p.quote}
                  </p>
                </div>
                {/* Persona badge */}
                <div className="flex flex-col gap-1.5">
                  <span className="inline-flex self-start text-[10px] font-semibold text-gold uppercase tracking-widest bg-gold/10 px-2.5 py-1 rounded-full">
                    {p.tag}
                  </span>
                  <p className="text-xs font-semibold text-slate-mid">{p.who}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The frustration */}
      <section className="bg-navy-dark relative overflow-hidden">
        <WaveLines />
        <div className="max-w-4xl mx-auto px-6 py-10 relative z-10">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold text-gold uppercase tracking-widest mb-3">Why EstateReady exists</p>
            <h2 style={{ fontFamily: 'var(--font-playfair)' }} className="text-3xl font-bold text-white mb-4 leading-tight">
              The process was never designed to tell you what you need.
            </h2>
            <p className="text-white text-sm leading-relaxed mb-3">
              Most people know they should have an estate plan. Very few know what that actually
              means for their specific situation. And the only way to find out has always been to
              pay an attorney $400 an hour to tell you — before they can even begin to help you.
            </p>
            <p className="text-white text-sm leading-relaxed mb-3">
              That&apos;s backwards. You shouldn&apos;t have to spend money to understand what you need
              to spend money on. You shouldn&apos;t need a law degree to know whether you need a will,
              a trust, or something else entirely.
            </p>
            {/* Contrast block */}
            <ContrastTable />
            <p className="text-white/70 text-xs mt-3 leading-relaxed">
              ↳ <span className="text-gold font-semibold">Probate</span> is the court-supervised process of distributing your assets after death.
            </p>

            <p className="text-white text-sm leading-relaxed mt-4">
              EstateReady was built out of that frustration. Ten minutes. Thirty-seven questions.
              A clear, honest picture of where you stand.
            </p>
          </div>
          <div className="flex justify-end mt-4 [&_button]:text-white [&_button]:hover:text-white/70">
            <BackToTop />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="bg-cream border-b border-cream-dark scroll-mt-28 2xl:scroll-mt-20">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <p className="text-xs font-semibold text-gold uppercase tracking-widest mb-2">How it works</p>
          <h2 style={{ fontFamily: 'var(--font-playfair)' }} className="text-3xl font-bold text-navy mb-12 leading-snug">
            Five steps. About ten minutes.
          </h2>

          {/* Workflow — desktop: horizontal with arrows, mobile: vertical */}
          <div className="hidden sm:flex items-start gap-0 mb-12">
            {[
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-navy" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
                    <rect x="9" y="3" width="6" height="4" rx="1" />
                    <path d="M9 12h6M9 16h4" />
                  </svg>
                ),
                step: '01',
                label: 'Answer 40 questions',
                sub: '~10 min · no legal knowledge needed',
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-navy" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="5" width="20" height="14" rx="2" />
                    <path d="M2 10h20" />
                  </svg>
                ),
                step: '02',
                label: 'Pay once — $21',
                sub: 'Stripe checkout · no account needed',
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-navy" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M9.5 9.5c.5-1.5 3.5-1.5 3.5.5 0 1.5-1.5 2-2 3M12 17.5v.5" />
                  </svg>
                ),
                step: '03',
                label: 'AI scores your answers',
                sub: 'Scored and analyzed · tier assigned',
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-navy" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                ),
                step: '04',
                label: 'Report link emailed',
                sub: 'Secure link · accessible for 1 year',
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-navy" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 2L11 13" />
                    <path d="M22 2L15 22L11 13L2 9L22 2Z" />
                  </svg>
                ),
                step: '05',
                label: 'Share with your attorney',
                sub: 'Print, email, or share the link',
              },
            ].map((s, i, arr) => (
              <div key={s.step} className="flex items-start flex-1">
                <div className="flex flex-col items-center flex-1">
                  {/* Icon bubble — pulses when preceding arrow hits it */}
                  <div
                    className="w-14 h-14 rounded-2xl bg-white border flex items-center justify-center mb-3"
                    style={i === 0 || i === 3 ? {
                      animationName: 'card-flow',
                      animationDuration: '4s',
                      animationTimingFunction: 'ease-in-out',
                      animationIterationCount: 'infinite',
                      animationDelay: i === 0 ? '0s' : '2.15s',
                    } : undefined}
                  >
                    {i === 4 ? (
                      <div
                        style={{
                          animationName: 'plane-fly',
                          animationDuration: '4s',
                          animationTimingFunction: 'ease-in',
                          animationIterationCount: 'infinite',
                          animationDelay: `${i * 0.75}s`,
                        }}
                      >
                        {s.icon}
                      </div>
                    ) : s.icon}
                  </div>
                  <p className="text-xs font-semibold text-gold mb-1">{s.step}</p>
                  <p className="text-sm font-semibold text-navy text-center leading-snug mb-1">{s.label}</p>
                  <p className="text-xs text-slate-mid text-center leading-relaxed">{s.sub}</p>
                </div>
                {/* Dot connector between steps */}
                {i < arr.length - 1 && (
                  <div className="shrink-0 w-14 relative" style={{ paddingTop: '20px' }}>
                    {/* Track line */}
                    <div className="w-full h-px bg-gold/20" />
                    {/* Traveling dot */}
                    <div
                      className="absolute w-2 h-2 rounded-full bg-gold"
                      style={{
                        top: '20px',
                        marginTop: '-4px',
                        left: '-5px',
                        willChange: 'transform',
                        boxShadow: '0 0 8px rgba(181,147,90,0.9), 0 0 16px rgba(181,147,90,0.4)',
                        animationName: 'dot-travel',
                        animationDuration: '4s',
                        animationTimingFunction: 'ease-in-out',
                        animationIterationCount: 'infinite',
                        animationDelay: `${i * 0.75 + 0.1}s`,
                      }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile: vertical list */}
          <div className="sm:hidden space-y-6 mb-12">
            {[
              { step: '01', label: 'Answer 40 questions', sub: '~10 min · no legal knowledge needed' },
              { step: '02', label: 'Pay once — $21', sub: 'Stripe checkout · no account needed' },
              { step: '03', label: 'AI scores your answers', sub: 'Scored and analyzed · tier assigned' },
              { step: '04', label: 'Report link emailed', sub: 'Secure link · accessible for 1 year' },
              { step: '05', label: 'Share with your attorney', sub: 'Print, email, or share the link' },
            ].map((s, i, arr) => (
              <div key={s.step} className="flex gap-4 items-start">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-lg bg-white border border-cream-dark flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-gold">{s.step}</span>
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

          {/* What each domain covers */}
          <DomainGrid />
          <div className="flex justify-end mt-6"><BackToTop /></div>
        </div>
      </section>

      {/* What you get + Sample report preview */}
      <section id="what-you-get" className="bg-white border-b border-cream-dark scroll-mt-28 2xl:scroll-mt-20">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <p className="text-xs font-semibold text-gold uppercase tracking-widest mb-4">What&apos;s in the report</p>
          <h2 style={{ fontFamily: 'var(--font-playfair)' }} className="text-3xl font-bold text-navy mb-5 leading-snug">
            Not a checklist. A real picture of your situation.
          </h2>
          <p className="text-slate-mid text-sm leading-relaxed mb-10 max-w-2xl">
            The EstateReady Report is built around the questions estate planning attorneys wish
            their clients had answered before walking through the door. Every finding connects
            to your specific answers. Every recommendation explains why it matters.
          </p>

          {/* Feature rows — diagnostic */}
          <FeatureRows />

          {/* Full-width sample report card */}
          <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            {/* Banner */}
            <div className="bg-gold/10 border-b border-gold/20 px-6 py-2.5 flex items-center justify-between">
              <p className="text-xs font-semibold text-gold">Sample Report · Fictional individual · For illustration only</p>
              <Link href="/sample-report" className="text-xs font-semibold text-navy underline underline-offset-2 hover:text-navy-light transition-colors">
                See full report →
              </Link>
            </div>

            {/* Tier verdict */}
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
              {/* Priority actions */}
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

              {/* Domain findings */}
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
                      : { bar: 'bg-gold',       badge: 'bg-gold text-white',       label: 'Caution',  bg: 'bg-gold/10 border-gold/25'        }
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

      {/* Trust */}
      <section className="bg-navy-dark relative overflow-hidden">
        <WaveLines />
        <div className="max-w-4xl mx-auto px-6 py-16 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
            <div>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest mb-4">Honesty first</p>
              <h2 style={{ fontFamily: 'var(--font-playfair)' }} className="text-3xl font-bold text-white mb-4 leading-snug">
                We give it to you straight.
              </h2>
              <p className="text-white text-sm leading-relaxed mb-3">
                EstateReady is not a law firm. We don&apos;t represent you. We don&apos;t give legal advice.
                What we give you is an honest picture of your estate planning situation — clearly
                scored, clearly explained, with no interest in selling you anything else.
              </p>
              <p className="text-white text-sm leading-relaxed">
                The report is yours to do with as you choose. Most people take it to an attorney.
                Some use it to start a conversation with their family. A few just needed to
                understand where they stood.
              </p>
            </div>
            <div className="space-y-3">
              {[
                { title: 'Payment via Stripe', body: 'We never see or store your card details.' },
                { title: 'No account required', body: 'No login. No stored profile. Your report is a secure link, yours for a year.' },
                { title: 'Your data stays yours', body: 'We don\'t sell it, share it, or market to you with it.' },
                { title: 'Not legal advice — ever', body: 'This is stated clearly, not buried. We mean it.' },
              ].map((item) => (
                <div key={item.title} className="bg-white/10 rounded-xl px-5 py-4">
                  <p className="text-white text-sm font-semibold mb-0.5">{item.title}</p>
                  <p className="text-blue-100 text-xs leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8 [&_button]:text-white [&_button]:hover:text-white/70"><BackToTop /></div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-white border-b border-cream-dark scroll-mt-28 2xl:scroll-mt-20">
        <div className="max-w-3xl mx-auto px-6 py-16">
          <div className="flex justify-end mb-6"><BackToTop /></div>
          <p className="text-xs font-semibold text-gold uppercase tracking-widest mb-8">Common questions</p>
          <FaqAccordion />
          <div className="mt-10 pt-6 border-t border-cream-dark flex items-center gap-2">
            <span className="text-xs text-slate-mid">Know someone who needs this?</span>
            <ShareButton
              url="https://estateready.vercel.app"
              text="Know where your estate planning stands before you spend a dollar on attorney time. 40 questions · $21 · ~10 minutes."
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-navy-dark relative overflow-hidden">
        <WaveLines />
        <div className="max-w-3xl mx-auto px-6 py-20 relative z-10">
          <div className="max-w-xl">
            <h2 style={{ fontFamily: 'var(--font-playfair)' }} className="text-4xl font-bold text-white mb-3 leading-tight">
              Ten minutes to understand what you&apos;ve been putting off for years.
            </h2>
            <p className="text-white text-base leading-relaxed mb-8">
              $21. One report. A clearer picture — and a better first conversation with an attorney.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/intake" className="bg-white text-navy px-7 py-3.5 rounded-lg font-semibold hover:bg-cream transition-colors text-base text-center">
                Start My Assessment — $21
              </Link>
              <Link href="/sample-report" className="border border-white/30 text-white px-7 py-3.5 rounded-lg font-medium hover:bg-white/10 transition-colors text-base text-center">
                See the report first
              </Link>
            </div>
            <p className="text-xs text-white mt-5">
              One-time · No subscription · Not legal advice · Secure payment via Stripe
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy-dark border-t border-white/10 px-6 py-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white">
          <span style={{ fontFamily: 'var(--font-playfair)' }} className="text-white font-semibold">EstateReady</span>
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
