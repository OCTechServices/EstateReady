import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getSupabaseAdmin } from '@/lib/supabase'
import { TIER_LABELS, TIER_DESCRIPTIONS, Tier } from '@/types/questionnaire'
import { ReportRecommendations } from '@/lib/report'
import PrintButton from '@/components/PrintButton'
import ScoreRing from '@/components/ScoreRing'
import ReportChat from '@/components/ReportChat'

const TIER_THEME: Record<Tier, {
  bg: string
  border: string
  text: string
  subtext: string
  ring: string
  badge: string
  badgeText: string
}> = {
  1: {
    bg: 'bg-[#0F3020]',
    border: 'border-[#2D6A4F]',
    text: 'text-white',
    subtext: 'text-gold-light',
    ring: 'rgba(212,180,131,0.9)',
    badge: 'bg-[#071A10]',
    badgeText: 'text-gold-light',
  },
  2: {
    bg: 'bg-[#2A3D5C]',
    border: 'border-[#6A84A8]',
    text: 'text-white',
    subtext: 'text-[#C8D4E8]',
    ring: 'rgba(200,212,232,0.9)',
    badge: 'bg-[#1E2E45]',
    badgeText: 'text-[#C8D4E8]',
  },
  3: {
    bg: 'bg-[#6B1F35]',
    border: 'border-[#C47A8A]',
    text: 'text-white',
    subtext: 'text-[#F5C8D4]',
    ring: 'rgba(245,200,212,0.9)',
    badge: 'bg-[#4A1526]',
    badgeText: 'text-[#F5C8D4]',
  },
  4: {
    bg: 'bg-[#1C1C1E]',
    border: 'border-gray-700',
    text: 'text-white',
    subtext: 'text-gold-light',
    ring: 'rgba(212,180,131,0.9)',
    badge: 'bg-gray-800',
    badgeText: 'text-gold-light',
  },
}

const SEVERITY_STYLE: Record<string, { bar: string; label: string; labelText: string; bg: string }> = {
  critical: { bar: 'bg-[#7A2840]', label: 'Critical', labelText: 'text-[#7A2840]', bg: 'bg-[#FDF2F4] border-[#E8C4CC]' },
  caution:  { bar: 'bg-gold',      label: 'Caution',  labelText: 'text-gold',       bg: 'bg-gold/10 border-gold/25'     },
  info:     { bar: 'bg-slate-mid', label: 'Note',     labelText: 'text-slate-mid',  bg: 'bg-cream border-cream-dark'    },
}

interface Props {
  params: Promise<{ token: string }>
}

export default async function ReportPage({ params }: Props) {
  const { token } = await params
  const db = getSupabaseAdmin()

  const { data: submission } = await db
    .from('submissions')
    .select('id, status, access_token_expires_at, email')
    .eq('access_token', token)
    .single()

  if (!submission) return notFound()

  const isExpired = new Date(submission.access_token_expires_at) < new Date()
  if (isExpired) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <h1 className="text-xl font-semibold text-gray-900 mb-2">This link has expired.</h1>
          <p className="text-sm text-gray-500">
            Report links are valid for one year. Contact{' '}
            <a href="mailto:support@opcoretech.com" className="underline">support@opcoretech.com</a>{' '}
            to request a new link.
          </p>
        </div>
      </main>
    )
  }

  if (submission.status === 'processing' || submission.status === 'paid') {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <div className="w-8 h-8 border-2 border-gray-200 border-t-gray-800 rounded-full animate-spin mx-auto mb-4" />
          <h1 className="text-xl font-semibold text-gray-900 mb-2">Generating your report…</h1>
          <p className="text-sm text-gray-500">This takes about 30 seconds. Refresh the page in a moment.</p>
        </div>
      </main>
    )
  }

  const { data: report } = await db
    .from('reports')
    .select('score, tier, recommendations, generated_at')
    .eq('submission_id', submission.id)
    .single()

  if (!report) return notFound()

  const tier = report.tier as Tier
  const theme = TIER_THEME[tier]
  const rec = report.recommendations as ReportRecommendations
  const generatedDate = new Date(report.generated_at).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  })

  const criticalFindings = rec.domain_findings?.filter(f => f.severity === 'critical') ?? []
  const cautionFindings  = rec.domain_findings?.filter(f => f.severity === 'caution')  ?? []
  const infoFindings     = rec.domain_findings?.filter(f => f.severity === 'info')     ?? []
  const orderedFindings  = [...criticalFindings, ...cautionFindings, ...infoFindings]

  return (
    <div className="min-h-screen bg-cream">
      {/* Top bar */}
      <header className="bg-white border-b border-cream-dark px-6 py-4 print:hidden">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/" style={{ fontFamily: 'var(--font-playfair)' }} className="text-base font-bold text-navy tracking-tight">
            Will &amp; Estate Ready
          </Link>
          <PrintButton />
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">

        {/* Tier verdict card */}
        <div className={`overflow-hidden ${theme.bg} print:border print:border-gray-300`}>
          <div className="px-8 py-10 flex items-start justify-between gap-6">
            <div className="flex-1">
              <p className={`text-xs font-semibold uppercase tracking-widest mb-3 ${theme.subtext}`}>
                Assessment Result
              </p>
              <h1
                style={{ fontFamily: 'var(--font-playfair)', lineHeight: 1.1 }}
                className={`text-4xl sm:text-5xl font-bold mb-4 ${theme.text}`}
              >
                Tier {tier} — {TIER_LABELS[tier]}
              </h1>
              <p className={`text-base leading-relaxed ${theme.subtext}`}>
                {TIER_DESCRIPTIONS[tier]}
              </p>
            </div>
            <div className="shrink-0">
              <ScoreRing score={report.score} color="rgba(255,255,255,0.9)" />
            </div>
          </div>
          <div className="bg-black/10 px-8 py-3 flex items-center justify-between">
            <p className={`text-xs ${theme.subtext}`}>Generated {generatedDate}</p>
            <p className={`text-xs ${theme.subtext}`}>Will &amp; Estate Ready Assessment Report</p>
          </div>
        </div>

        {/* Critical alert banner — only renders when critical findings exist */}
        {criticalFindings.length > 0 && (
          <div style={{ backgroundColor: '#3D0F1E', borderLeft: '6px solid #7A2840' }} className="px-8 py-8">
            <p className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: '#F5C8D4' }}>
              {criticalFindings.length} Critical {criticalFindings.length === 1 ? 'Gap' : 'Gaps'} Found
            </p>
            <p
              style={{ fontFamily: 'var(--font-playfair)', lineHeight: 1.15 }}
              className="text-2xl sm:text-3xl font-bold text-white mb-4"
            >
              If something happened today, your family would face serious obstacles.
            </p>
            <p className="text-base leading-relaxed" style={{ color: 'rgba(245,200,212,0.85)' }}>
              Your assessment identified {criticalFindings.length} critical {criticalFindings.length === 1 ? 'gap' : 'gaps'} — areas where missing documents or no planning could leave the people you care about without legal authority or clear direction at the worst possible time.
            </p>
          </div>
        )}

        {/* Narrative */}
        <div className="bg-white border border-cream-dark overflow-hidden">
          <div className="px-8 py-5 border-b border-cream-dark">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-mid">Assessment Summary</p>
          </div>
          <div className="px-8 py-7 space-y-4">
            {rec.narrative?.split('\n').filter(Boolean).map((para, i) => (
              <p key={i} className="text-gray-700 text-base leading-relaxed">{para}</p>
            ))}
          </div>
        </div>

        {/* Priority actions */}
        <div className="bg-white border border-cream-dark overflow-hidden">
          <div className="px-8 py-5 border-b border-cream-dark flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-mid">Priority Actions</p>
            <p className="text-xs text-slate-mid hidden sm:block">Ordered by urgency — start with #1</p>
          </div>

          {/* Action #1 — hero treatment */}
          {rec.priority_actions?.[0] && (
            <div style={{ backgroundColor: '#0F3020' }} className="px-8 py-8">
              <div className="flex items-center gap-3 mb-5">
                <span
                  style={{ fontFamily: 'var(--font-playfair)', color: '#B5935A' }}
                  className="text-2xl font-bold"
                >
                  01
                </span>
                <span
                  className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1"
                  style={{ backgroundColor: '#B5935A', color: 'white' }}
                >
                  Act First
                </span>
              </div>
              <p className="text-xl sm:text-2xl font-bold text-white mb-3 leading-snug">
                {rec.priority_actions[0].action}
              </p>
              <p className="text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>
                {rec.priority_actions[0].reason}
              </p>
            </div>
          )}

          {/* Actions #2 onward */}
          <div className="divide-y divide-cream-dark">
            {rec.priority_actions?.slice(1).map((item, i) => (
              <div key={i} className="flex gap-5 px-8 py-6">
                <span
                  className="text-xl font-bold tabular-nums shrink-0 pt-0.5 w-7"
                  style={{ color: 'rgba(181,147,90,0.7)', fontFamily: 'var(--font-playfair)' }}
                >
                  {String(i + 2).padStart(2, '0')}
                </span>
                <div className="w-px self-stretch bg-gold/20 shrink-0" />
                <div className="flex-1">
                  <p className="text-base font-semibold text-gray-900 mb-1.5 leading-snug">{item.action}</p>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.reason}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Domain findings */}
        {orderedFindings.length > 0 && (
          <div className="bg-white border border-cream-dark overflow-hidden">
            <div className="px-8 py-5 border-b border-cream-dark flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-mid">Domain Findings</p>
              <div className="flex items-center gap-2 flex-wrap">
                {criticalFindings.length > 0 && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#7A2840]/10 border border-[#7A2840]/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#7A2840]" />
                    <span className="text-[10px] font-semibold uppercase tracking-wide text-[#7A2840]">{criticalFindings.length} critical</span>
                  </span>
                )}
                {cautionFindings.length > 0 && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gold/10 border border-gold/25">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                    <span className="text-[10px] font-semibold uppercase tracking-wide text-gold">{cautionFindings.length} caution</span>
                  </span>
                )}
                {infoFindings.length > 0 && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-mid/10 border border-slate-mid/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-mid" />
                    <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-mid">{infoFindings.length} note</span>
                  </span>
                )}
              </div>
            </div>
            <div className="divide-y divide-[#E8C4CC]">
              {orderedFindings.map((finding, i) => {
                const style = SEVERITY_STYLE[finding.severity] ?? SEVERITY_STYLE.info
                const isCritical = finding.severity === 'critical'
                return isCritical ? (
                  <div key={i} className="flex overflow-hidden" style={{ backgroundColor: '#F5E8EC' }}>
                    <div className="shrink-0 bg-[#7A2840]" style={{ width: '6px' }} />
                    <div className="px-6 py-6 flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 bg-[#7A2840] text-white">
                          Critical
                        </span>
                        <span className="text-base font-bold text-gray-900">{finding.label}</span>
                      </div>
                      <p className="text-base text-gray-800 leading-relaxed font-medium">{finding.finding}</p>
                    </div>
                  </div>
                ) : (
                  <div key={i} className={`flex overflow-hidden ${style.bg}`}>
                    <div className={`w-1.5 shrink-0 ${style.bar}`} />
                    <div className="px-6 py-5 flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-xs font-bold uppercase tracking-widest ${style.labelText}`}>
                          {style.label}
                        </span>
                        <span className="text-gray-300 text-xs">·</span>
                        <span className="text-sm font-semibold text-gray-800">{finding.label}</span>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">{finding.finding}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Attorney CTA */}
        <div className={`${theme.bg} overflow-hidden`}>
          <div className="px-8 py-10 text-center">
            <p className={`text-xs font-semibold uppercase tracking-widest mb-3 ${theme.subtext}`}>
              Your next step
            </p>
            <h2
              style={{ fontFamily: 'var(--font-playfair)', lineHeight: 1.2 }}
              className={`text-3xl font-bold mb-4 ${theme.text}`}
            >
              Take this report to an estate planning attorney.
            </h2>
            <p className={`text-base leading-relaxed mb-8 max-w-md mx-auto ${theme.subtext}`}>
              Print it, email it, or share the link. Hand it to your attorney at the start
              of your first meeting — it will save you both time and give you a more
              productive conversation from the moment you sit down.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap [&_button]:text-white [&_button]:hover:text-white/70">
              <PrintButton />
              <a
                href={`mailto:?subject=My Will & Estate Ready Report&body=View my estate planning assessment: ${process.env.NEXT_PUBLIC_URL}/report/${token}`}
                className="inline-flex items-center bg-white text-navy px-6 py-3 text-sm font-semibold hover:bg-cream transition-colors"
                style={{ borderBottom: '3px solid #B5935A' }}
              >
                Email to Attorney →
              </a>
            </div>
          </div>
        </div>

        {/* Resources — where to go from here */}
        {/*
          TODO: Replace href values with affiliate URLs once approved:
          - Policygenius: swap for affiliate tracking URL from their program
          - LegalZoom: swap for affiliate tracking URL from their program
          - ACTEC: public directory, no affiliate needed
        */}
        <div className="bg-white border border-cream-dark overflow-hidden">
          <div className="px-6 py-4 border-b border-cream-dark">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-mid">Where to go from here</p>
          </div>
          <div className="divide-y divide-cream-dark">
            {[
              {
                n: '01',
                label: 'Review your life insurance',
                desc: 'Compare policies and identify coverage gaps in minutes — no agent required.',
                cta: 'Explore on Policygenius →',
                href: 'https://www.policygenius.com/life-insurance/',
              },
              {
                n: '02',
                label: 'Draft documents yourself',
                desc: 'Wills, trusts, and powers of attorney — online, without an attorney.',
                cta: 'Start on LegalZoom →',
                href: 'https://www.legalzoom.com/personal/estate-planning/',
              },
              {
                n: '03',
                label: 'Find a certified estate planning attorney',
                desc: 'The ACTEC directory lists attorneys who specialize in trusts and estates.',
                cta: 'Search ACTEC Directory →',
                href: 'https://www.actec.org/member-directory/',
              },
            ].map((r) => (
              <div key={r.n} className="flex items-start gap-5 px-6 py-5">
                <span
                  className="text-xl font-bold tabular-nums shrink-0 pt-0.5 w-7"
                  style={{ color: 'rgba(181,147,90,0.6)', fontFamily: 'var(--font-playfair)' }}
                >
                  {r.n}
                </span>
                <div className="w-px self-stretch bg-gold/20 shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-navy mb-0.5">{r.label}</p>
                  <p className="text-xs text-slate-mid leading-relaxed mb-2">{r.desc}</p>
                  <a
                    href={r.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-navy underline underline-offset-2 hover:text-navy-light transition-colors"
                  >
                    {r.cta}
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="px-6 py-3 bg-cream border-t border-cream-dark">
            <p className="text-[10px] text-slate-mid">
              Will &amp; Estate Ready is not affiliated with these services unless noted. Links are provided for your convenience only.
            </p>
          </div>
        </div>

        {/* Q&A agent */}
        <ReportChat token={token} />

        <p className="text-xs text-gray-400 text-center pb-4">
          Will &amp; Estate Ready · Not a law firm · Not legal advice · For informational purposes only
        </p>
      </div>
    </div>
  )
}
