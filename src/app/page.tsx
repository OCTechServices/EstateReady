import type { Metadata } from 'next'
import Link from 'next/link'

// TODO: Remove impact-site-verification once Impact affiliate verification is complete
export const metadata: Metadata = {
  other: {
    'impact-site-verification': '77ac9963-85ba-4e7f-a245-2bf77a5eef5b',
  },
}

import FaqAccordion from '@/components/FaqAccordion'
import QuickCheck from '@/components/QuickCheck'

export default function Home() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAF8F2' }}>

      {/* ── Nav ─────────────────────────────────────────────────────── */}
      <header style={{ backgroundColor: '#FAF8F2', borderBottom: '1px solid #EDE9DC' }} className="sticky top-0 z-20">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#top" style={{ fontFamily: 'var(--font-playfair)' }} className="text-lg font-bold text-navy">
            Will &amp; Estate Ready
          </a>
          <div className="flex items-center gap-5">
            <Link href="/sample-report" className="text-sm text-slate-mid hover:text-navy transition-colors hidden sm:block">
              View Sample Report
            </Link>
            <Link href="/intake" className="text-sm font-semibold text-navy border border-navy px-4 py-2 hover:bg-navy hover:text-white transition-colors">
              Begin Assessment
            </Link>
          </div>
        </div>
      </header>

      {/* ── Hero — full-bleed photo ─────────────────────────────────── */}
      {/*
        Photo: Unsplash photo-1555041469-a586c61ea9bc (warm green sofa, home interior)
        To swap: replace the backgroundImage URL below with any Unsplash/image URL.
      */}
      <section
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1600&h=900&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 40%',
          minHeight: '580px',
          display: 'flex',
          alignItems: 'flex-end',
        }}
      >
        {/* Dark overlay — navy-dark at 78% opacity so photo reads through warmly */}
        <div
          style={{ backgroundColor: 'rgba(15, 48, 32, 0.78)', width: '100%' }}
          className="py-16 sm:py-20"
        >
          <div className="max-w-3xl mx-auto px-6">

            <p className="text-sm text-white/60 mb-6 tracking-wide uppercase">
              Estate Planning Assessment
            </p>

            <h1
              style={{ fontFamily: 'var(--font-playfair)', lineHeight: 1.1 }}
              className="text-5xl sm:text-7xl font-bold text-white mb-7"
            >
              If something happened to you today, would your family know what to do?
            </h1>

            <p className="text-xl text-white/80 leading-relaxed mb-8" style={{ maxWidth: '54ch' }}>
              In about ten minutes, you answer 40 plain-language questions and receive
              a personal report that tells you exactly where your estate planning
              stands — and what to do first.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-start mb-8">
              <Link
                href="/intake"
                className="bg-white text-navy text-lg font-semibold px-8 py-4 hover:bg-cream transition-colors text-center"
              >
                Begin My Assessment — $21
              </Link>
              <Link
                href="/sample-report"
                className="text-white/80 text-base font-medium underline underline-offset-4 hover:text-white transition-colors sm:pt-3"
              >
                View a sample report first →
              </Link>
            </div>

            <p className="text-sm text-white/50">
              $21 one-time &nbsp;·&nbsp; No subscription &nbsp;·&nbsp; Not legal advice &nbsp;·&nbsp; Payment via Stripe
            </p>

          </div>
        </div>
      </section>

      {/* ── Three facts ─────────────────────────────────────────────── */}
      <section className="bg-white" style={{ borderTop: '1px solid #EDE9DC', borderBottom: '1px solid #EDE9DC' }}>
        <div className="max-w-3xl mx-auto px-6 py-14">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-0 sm:divide-x divide-cream-dark">
            {[
              {
                stat: '3 in 4',
                body: 'American households have no will, no trust, and no estate plan of any kind.',
                source: 'Caring.com, 2025',
              },
              {
                stat: '16 months',
                body: 'The average time an estate without a plan spends going through probate court.',
                source: 'EstateExec',
              },
              {
                stat: '$400 / hr',
                body: 'Average estate attorney rate — before they can even begin to tell you what you need.',
                source: 'National average',
              },
            ].map((item) => (
              <div key={item.stat} className="sm:px-10 first:sm:pl-0 last:sm:pr-0">
                <p style={{ fontFamily: 'var(--font-playfair)' }} className="text-5xl font-bold text-navy mb-3 leading-none">
                  {item.stat}
                </p>
                <p className="text-base text-slate-mid leading-relaxed mb-2">{item.body}</p>
                <p className="text-xs text-slate-mid/60">— {item.source}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Quick Check ─────────────────────────────────────────────── */}
      <section style={{ backgroundColor: '#FAF8F2', borderBottom: '1px solid #EDE9DC' }}>
        <div className="max-w-3xl mx-auto px-6 py-14">
          <h2 style={{ fontFamily: 'var(--font-playfair)' }} className="text-4xl font-bold text-navy mb-3 leading-snug">
            How prepared are you?
          </h2>
          <p className="text-lg text-slate-mid mb-8">
            Three questions. Thirty seconds. A preliminary read on where you stand.
          </p>
          <QuickCheck />
        </div>
      </section>

      {/* ── Sample Report ───────────────────────────────────────────── */}
      <section style={{ backgroundColor: '#FAF8F2', borderBottom: '1px solid #EDE9DC' }}>
        <div className="max-w-3xl mx-auto px-6 py-14">

          <h2 style={{ fontFamily: 'var(--font-playfair)' }} className="text-4xl font-bold text-navy mb-3 leading-snug">
            Here is what you receive.
          </h2>
          <p className="text-lg text-slate-mid leading-relaxed mb-8" style={{ maxWidth: '52ch' }}>
            A personal report, delivered by email, that scores your estate planning
            across 7 areas and tells you exactly what to do — in plain English.
            The following is a sample based on a fictional individual.
          </p>

          <div style={{ border: '1px solid #D1C9B8', overflow: 'hidden' }}>
            {/* Sample label */}
            <div style={{ backgroundColor: '#F5F0E8', borderBottom: '1px solid #D1C9B8' }} className="px-6 py-3">
              <p className="text-xs font-semibold text-slate-mid uppercase tracking-widest">
                Sample Report &nbsp;·&nbsp; Fictional individual &nbsp;·&nbsp; For illustration only
              </p>
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
                    const s = f.severity === 'critical'
                      ? { bar: 'bg-[#7A2840]', badge: 'bg-[#7A2840] text-white', label: 'Critical', bg: 'bg-[#FDF2F4] border-[#E8C4CC]' }
                      : { bar: 'bg-gold',       badge: 'bg-gold text-white',       label: 'Caution',  bg: 'bg-gold/10 border-gold/25' }
                    return (
                      <div key={i} className={`border flex overflow-hidden ${s.bg}`}>
                        <div className={`w-1.5 shrink-0 ${s.bar}`} />
                        <div className="px-4 py-3">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 ${s.badge}`}>{s.label}</span>
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

            {/* Report footer */}
            <div style={{ borderTop: '1px solid #EDE9DC', backgroundColor: '#F5F0E8' }} className="px-6 py-4 flex items-center justify-between gap-4">
              <p className="text-sm text-slate-mid">Print it. Email it. Bring it to your attorney.</p>
              <Link href="/sample-report" className="text-sm font-semibold text-navy underline underline-offset-2 hover:text-navy-light whitespace-nowrap">
                See full sample report →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Does this describe you ──────────────────────────────────── */}
      <section className="bg-white" style={{ borderBottom: '1px solid #EDE9DC' }}>
        <div className="max-w-3xl mx-auto px-6 py-14">

          <h2 style={{ fontFamily: 'var(--font-playfair)' }} className="text-4xl font-bold text-navy mb-10 leading-snug">
            Does this describe you?
          </h2>

          <div className="space-y-8">
            <div style={{ borderLeft: '3px solid #B5935A', paddingLeft: '1.5rem' }}>
              <p style={{ fontFamily: 'var(--font-playfair)' }} className="text-xl text-navy leading-relaxed font-medium mb-2">
                &ldquo;I know I should have a will. I&apos;ve been saying that for years.
                I just don&apos;t know what I actually need or where to start.&rdquo;
              </p>
              <p className="text-sm text-slate-mid">Homeowners with a spouse or family</p>
            </div>

            <div style={{ borderLeft: '3px solid #B5935A', paddingLeft: '1.5rem' }}>
              <p style={{ fontFamily: 'var(--font-playfair)' }} className="text-xl text-navy leading-relaxed font-medium mb-2">
                &ldquo;My parents are getting older and I have no idea what they have
                in place — or what questions to even ask them.&rdquo;
              </p>
              <p className="text-sm text-slate-mid">Adult children helping aging parents</p>
            </div>

            <div style={{ borderLeft: '3px solid #B5935A', paddingLeft: '1.5rem' }}>
              <p style={{ fontFamily: 'var(--font-playfair)' }} className="text-xl text-navy leading-relaxed font-medium mb-2">
                &ldquo;I want to get my affairs in order before I retire.
                I just don&apos;t want my family to have to figure it all out later.&rdquo;
              </p>
              <p className="text-sm text-slate-mid">Anyone approaching or in retirement</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Before you begin ────────────────────────────────────────── */}
      <section style={{ backgroundColor: '#FAF8F2', borderBottom: '1px solid #EDE9DC' }}>
        <div className="max-w-3xl mx-auto px-6 py-14">

          <h2 style={{ fontFamily: 'var(--font-playfair)' }} className="text-4xl font-bold text-navy mb-3 leading-snug">
            Before you begin.
          </h2>
          <p className="text-lg text-slate-mid mb-10">Four things you should know.</p>

          <div className="space-y-8">
            {[
              {
                n: '1.',
                title: 'This is not legal advice.',
                body: 'Will & Estate Ready is not a law firm and does not represent you in any way. What we provide is an honest, documented picture of where your estate planning stands — scored clearly and explained in plain English. What you do with it is your decision.',
              },
              {
                n: '2.',
                title: 'The cost is $21, one time. No subscription, no renewal.',
                body: 'You pay once and receive one report, accessible for one year via a secure link sent to your email. There is no account to create, no profile to maintain, and no ongoing charges of any kind.',
              },
              {
                n: '3.',
                title: 'Your payment is handled by Stripe.',
                body: 'We never see or store your card details. Stripe processes all payments securely — the same technology used by Amazon, Target, and major financial institutions. You will see "Will & Estate Ready" on your statement.',
              },
              {
                n: '4.',
                title: 'Your information stays private.',
                body: 'Your answers are used only to generate your report. We do not sell your data, share it with third parties, or use it to market to you. Your responses are not stored beyond what is required to deliver your report.',
              },
            ].map((item) => (
              <div key={item.n} className="flex gap-6">
                <span style={{ fontFamily: 'var(--font-playfair)' }} className="text-2xl font-bold text-gold shrink-0 mt-0.5 w-8">
                  {item.n}
                </span>
                <div style={{ borderTop: '1px solid #EDE9DC' }} className="flex-1 pt-6">
                  <p className="text-lg font-semibold text-navy mb-2">{item.title}</p>
                  <p className="text-base text-slate-mid leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────── */}
      <section className="bg-white" style={{ borderBottom: '1px solid #EDE9DC' }}>
        <div className="max-w-3xl mx-auto px-6 py-14">
          <h2 style={{ fontFamily: 'var(--font-playfair)' }} className="text-4xl font-bold text-navy mb-10">
            Common questions
          </h2>
          <FaqAccordion />
        </div>
      </section>

      {/* ── Final CTA ───────────────────────────────────────────────── */}
      <section className="bg-navy-dark">
        <div className="max-w-3xl mx-auto px-6 py-20">
          <h2 style={{ fontFamily: 'var(--font-playfair)', lineHeight: 1.15 }} className="text-5xl font-bold text-white mb-4">
            Ten minutes to understand what you&apos;ve been putting off for years.
          </h2>
          <p className="text-xl text-white/80 leading-relaxed mb-10 max-w-lg">
            $21. One report. A clear picture of where your family stands — and a
            far better first conversation with an estate planning attorney.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/intake" className="bg-white text-navy px-8 py-4 font-semibold hover:bg-cream transition-colors text-lg text-center">
              Begin My Assessment — $21
            </Link>
            <Link href="/sample-report" className="border border-white/40 text-white px-8 py-4 font-medium hover:bg-white/10 transition-colors text-base text-center">
              View a Sample Report
            </Link>
          </div>
          <p className="text-sm text-white/50 mt-6">
            One-time · No subscription · Not legal advice · Secure payment via Stripe
          </p>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────── */}
      <footer className="bg-navy-dark" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="max-w-3xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p style={{ fontFamily: 'var(--font-playfair)' }} className="text-white font-semibold mb-1">Will &amp; Estate Ready</p>
            <p className="text-sm text-white/50">An estate planning readiness assessment. Not a law firm.</p>
          </div>
          <div className="flex items-center gap-6 text-sm text-white/50">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link>
          </div>
        </div>
      </footer>

    </div>
  )
}
