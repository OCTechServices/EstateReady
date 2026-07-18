import type { Metadata } from 'next'
import Link from 'next/link'
import FaqAccordion from '@/components/FaqAccordion'
import CompassMark from '@/components/CompassMark'


const TRUST_SIGNALS = [
  'Covers 7 key estate planning areas',
  'Takes about 10 minutes',
  'Personalized readiness report',
  'Educational guidance — not legal advice',
  'Designed to help you prepare before meeting an attorney',
]

const DOMAINS = [
  { n: '01', label: 'Personal & Family Profile',   body: 'Family structure, dependents, marital status, and state of residence.' },
  { n: '02', label: 'Assets & Property',            body: 'Real estate, retirement accounts, business interests, and overall estate value.' },
  { n: '03', label: 'Existing Documents',           body: 'Wills, trusts, powers of attorney, healthcare directives, and advance directives.' },
  { n: '04', label: 'Beneficiary Designations',     body: 'Life insurance, retirement accounts, bank accounts, and transfer-on-death designations.' },
  { n: '05', label: 'Insurance',                    body: 'Life, long-term care, and disability coverage — and how it fits your planning.' },
  { n: '06', label: 'Tax & Legacy Planning',        body: 'Estate tax exposure, gifting strategies, and long-term legacy goals.' },
  { n: '07', label: 'Special Circumstances',        body: 'Business ownership, blended families, special needs dependents, and international assets.' },
]

const STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://willestateready.com/#organization',
      name: 'Will & Estate Ready',
      url: 'https://willestateready.com',
      description:
        'An estate planning readiness assessment tool. Complete a guided questionnaire and receive a personalized scoring report covering 7 key estate planning areas — wills, trusts, powers of attorney, healthcare directives, beneficiary designations, insurance, and tax awareness.',
      logo: 'https://willestateready.com/icon.svg',
    },
    {
      '@type': 'Service',
      '@id': 'https://willestateready.com/#service',
      name: 'Estate Planning Readiness Assessment',
      url: 'https://willestateready.com',
      description:
        'A guided 40-question assessment covering wills, trusts, healthcare directives, powers of attorney, beneficiary designations, insurance, and tax awareness. Receive a personalized readiness report scored across 7 key estate planning areas.',
      provider: { '@id': 'https://willestateready.com/#organization' },
      offers: {
        '@type': 'Offer',
        price: '21.00',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Is this legal advice?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. Will & Estate Ready is not a law firm and does not provide legal advice. We help you understand your own situation clearly — so that when you do sit down with an attorney, you\'re not starting from zero.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is $21 the full cost? No subscription?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '$21, one time. No subscription, no renewal, no upsell. You get one report, accessible for one year via a secure link sent to your email.',
          },
        },
        {
          '@type': 'Question',
          name: 'What happens to my information?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Your responses are used to generate your report — nothing else. We don\'t sell your data, share it with third parties, or use it for marketing. Payment is handled by Stripe. We never see your card.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do I need to already have an attorney?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. Most people use Will & Estate Ready before they have one — to understand what they actually need before they start making calls.',
          },
        },
        {
          '@type': 'Question',
          name: 'What if I don\'t know the answers to some questions?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '"Not sure" is a valid answer. It tells us something useful about your planning readiness. You don\'t need to dig out paperwork or know legal terminology — just answer honestly based on what you know today.',
          },
        },
      ],
    },
  ],
}

export default function Home() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAF8F2' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }}
      />

      {/* ── Nav ─────────────────────────────────────────────────────── */}
      <header style={{ backgroundColor: '#FAF8F2', borderBottom: '1px solid #EDE9DC' }} className="sticky top-0 z-20">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2.5">
            <CompassMark size={26} />
            <span style={{ fontFamily: 'var(--font-playfair)' }} className="text-lg font-bold text-navy">Will &amp; Estate Ready</span>
          </a>
          <div className="flex items-center gap-5">
            <Link href="/sample-report" className="text-sm text-slate-mid hover:text-navy transition-colors hidden sm:block">
              View Sample Report
            </Link>
            <Link href="/intake" className="text-sm font-semibold text-navy border border-navy px-4 py-2 hover:bg-navy hover:text-white transition-colors">
              Start Assessment
            </Link>
          </div>
        </div>
      </header>

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      {/*
        Photo: Unsplash photo-1555041469-a586c61ea9bc (warm green sofa, home interior)
      */}
      <section
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1600&h=900&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 40%',
          minHeight: '600px',
          display: 'flex',
          alignItems: 'flex-end',
        }}
      >
        <div
          style={{ backgroundColor: 'rgba(15, 48, 32, 0.78)', width: '100%' }}
          className="py-16 sm:py-20"
        >
          <div className="max-w-3xl mx-auto px-6">

            <p className="text-sm text-white/60 mb-5 tracking-wide uppercase">
              Know where you stand before you meet an attorney.
            </p>

            <h1
              style={{ fontFamily: 'var(--font-playfair)', lineHeight: 1.1 }}
              className="text-5xl sm:text-7xl font-bold text-white mb-7"
            >
              Understand Your Estate Planning Readiness Before Meeting an Attorney
            </h1>

            <p className="text-xl text-white/80 leading-relaxed mb-8" style={{ maxWidth: '58ch' }}>
              Take a guided assessment covering wills, trusts, healthcare directives, powers of
              attorney, beneficiaries, and asset planning. Receive a personalized readiness report
              that helps you understand potential gaps and prepares you for a more informed
              conversation with an estate planning professional.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-start mb-8">
              <Link
                href="/intake"
                className="bg-white text-navy text-lg font-semibold px-8 py-4 hover:bg-cream transition-colors text-center"
                style={{ borderBottom: '3px solid #B5935A' }}
              >
                Start My Assessment — $21
              </Link>
              <Link
                href="/sample-report"
                className="text-white text-base font-semibold underline underline-offset-4 hover:text-white/70 transition-colors sm:pt-3"
              >
                See a sample report →
              </Link>
            </div>

            {/* Trust signals */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-x-6 sm:gap-y-2">
              {TRUST_SIGNALS.map(s => (
                <p key={s} className="text-sm text-white/70 flex items-center gap-2">
                  <span style={{ color: '#B5935A' }}>✔</span> {s}
                </p>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── Why Estate Planning Feels Complicated ──────────────────── */}
      <section className="bg-white" style={{ borderBottom: '1px solid #EDE9DC' }}>
        <div className="max-w-3xl mx-auto px-6 py-14">
          <h2 style={{ fontFamily: 'var(--font-playfair)' }} className="text-4xl font-bold text-navy mb-4 leading-snug">
            Why estate planning feels complicated
          </h2>
          <p className="text-lg text-slate-mid leading-relaxed mb-10" style={{ maxWidth: '54ch' }}>
            Most families know they need a plan. Few know where to start — or what they&apos;re actually missing.
          </p>
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

      {/* ── Who This Assessment Helps ───────────────────────────────── */}
      <section style={{ backgroundColor: '#FAF8F2', borderBottom: '1px solid #EDE9DC' }}>
        <div className="max-w-3xl mx-auto px-6 py-14">

          <h2 style={{ fontFamily: 'var(--font-playfair)' }} className="text-4xl font-bold text-navy mb-10 leading-snug">
            Who this assessment helps
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

      {/* ── What You'll Learn ───────────────────────────────────────── */}
      <section className="bg-white" style={{ borderBottom: '1px solid #EDE9DC' }}>
        <div className="max-w-3xl mx-auto px-6 py-14">
          <h2 style={{ fontFamily: 'var(--font-playfair)' }} className="text-4xl font-bold text-navy mb-3 leading-snug">
            What you&apos;ll learn
          </h2>
          <p className="text-lg text-slate-mid leading-relaxed mb-10" style={{ maxWidth: '52ch' }}>
            Your responses are evaluated across 7 key estate planning areas to produce a personalized readiness report.
          </p>
          <div className="space-y-5">
            {DOMAINS.map((d) => (
              <div key={d.n} className="flex gap-5 border-b border-cream-dark pb-5 last:border-0 last:pb-0">
                <div
                  className="shrink-0 text-2xl font-bold leading-none"
                  style={{ fontFamily: 'var(--font-playfair)', color: '#B5935A' }}
                >
                  {d.n}
                </div>
                <div>
                  <p className="text-base font-semibold text-navy mb-1">{d.label}</p>
                  <p className="text-sm text-slate-mid leading-relaxed">{d.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What's Included in Your Report ─────────────────────────── */}
      {/*
        Photo: Unsplash photo-1481627834876-b7833e8f5570 (library with Edison bulbs)
      */}
      <section
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1600&h=900&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderBottom: '1px solid #EDE9DC',
        }}
      >
        <div style={{ backgroundColor: 'rgba(250, 248, 242, 0.92)', width: '100%', borderBottom: '1px solid #EDE9DC' }}>
        <div className="max-w-3xl mx-auto px-6 py-14">

          <h2 style={{ fontFamily: 'var(--font-playfair)' }} className="text-4xl font-bold text-navy mb-3 leading-snug">
            What&apos;s included in your report
          </h2>
          <p className="text-lg text-slate-mid leading-relaxed mb-8" style={{ maxWidth: '52ch' }}>
            A personalized estate readiness report, delivered by email, scored across all 7 areas
            with plain-English findings and a prioritized action plan. The following is based on
            a fictional individual.
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
                      <div
                        className="shrink-0 text-xl font-bold leading-none"
                        style={{ fontFamily: 'var(--font-playfair)', color: '#B5935A' }}
                      >
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
              <Link
                href="/sample-report"
                className="text-sm font-semibold text-navy whitespace-nowrap px-4 py-2 hover:bg-navy hover:text-white transition-colors"
                style={{ border: '1px solid #1A4A2E' }}
              >
                See full sample report →
              </Link>
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* ── How It Works ────────────────────────────────────────────── */}
      <section style={{ backgroundColor: '#FAF8F2', borderBottom: '1px solid #EDE9DC' }}>
        <div className="max-w-3xl mx-auto px-6 py-14">
          <h2 style={{ fontFamily: 'var(--font-playfair)' }} className="text-4xl font-bold text-navy mb-3 leading-snug">
            How it works
          </h2>
          <p className="text-lg text-slate-mid mb-10">Simple, private, and straightforward.</p>

          <div className="space-y-8 mb-12">
            {[
              {
                n: '1.',
                title: 'Complete the guided assessment',
                body: 'Answer 40 plain-language questions across 7 estate planning areas. No documents required — answer based on what you know today. Takes about 10 minutes.',
              },
              {
                n: '2.',
                title: 'Receive your personalized readiness report',
                body: 'Your responses are evaluated against established estate planning factors. A secure link to your report is delivered to your email — scored, ranked by priority, and written in plain English.',
              },
              {
                n: '3.',
                title: 'Go into your attorney meeting prepared',
                body: "Share your report with your attorney, use it to ask better questions, or simply understand what you have and what you're missing. The report is yours to keep for one year.",
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

          {/* Trust notes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: 'Not legal advice', body: 'Will & Estate Ready is not a law firm. We provide educational readiness guidance — not legal representation.' },
              { title: '$21, one time', body: 'No subscription, no renewal. Pay once and receive one report, accessible for one year.' },
              { title: 'Payment via Stripe', body: 'We never see or store your card details. Stripe handles all payments securely.' },
              { title: 'Your information stays private', body: 'Your answers are used only to generate your report. We do not sell or share your data.' },
            ].map((item) => (
              <div key={item.title} className="border border-cream-dark bg-white px-5 py-5">
                <p className="text-sm font-semibold text-navy mb-1">{item.title}</p>
                <p className="text-sm text-slate-mid leading-relaxed">{item.body}</p>
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
      {/*
        Photo: Unsplash photo-1570129477492-45c003edd2be (classic New England home, green lawn)
      */}
      <section
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1600&h=900&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
        }}
      >
        <div style={{ backgroundColor: 'rgba(10, 38, 22, 0.84)', width: '100%' }}>
        <div className="max-w-3xl mx-auto px-6 py-20">
          <h2 style={{ fontFamily: 'var(--font-playfair)', lineHeight: 1.15 }} className="text-5xl font-bold text-white mb-4">
            Go into your attorney meeting knowing exactly where you stand.
          </h2>
          <p className="text-xl text-white/80 leading-relaxed mb-10 max-w-lg">
            $21. One report. A clear picture of your estate planning readiness — and a
            far more productive first conversation with an estate planning attorney.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/intake"
              className="bg-white text-navy px-8 py-4 font-semibold hover:bg-cream transition-colors text-lg text-center"
              style={{ borderBottom: '3px solid #B5935A' }}
            >
              Start My Assessment — $21
            </Link>
            <Link href="/sample-report" className="border border-white/40 text-white px-8 py-4 font-medium hover:bg-white/10 transition-colors text-base text-center">
              View a Sample Report
            </Link>
          </div>
          <p className="text-sm text-white/50 mt-6">
            One-time · No subscription · Not legal advice · Secure payment via Stripe
          </p>
        </div>
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
