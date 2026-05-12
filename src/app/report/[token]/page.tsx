import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getSupabaseAdmin } from '@/lib/supabase'
import { TIER_LABELS, TIER_DESCRIPTIONS, Tier } from '@/types/questionnaire'
import { ReportRecommendations } from '@/lib/report'
import PrintButton from '@/components/PrintButton'
import ScoreRing from '@/components/ScoreRing'
import WaveLines from '@/components/WaveLines'

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
            EstateReady
          </Link>
          <PrintButton />
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">

        {/* Tier verdict card */}
        <div className={`rounded-2xl overflow-hidden ${theme.bg} print:border print:border-gray-300`}>
          <div className="px-8 py-8 flex items-center justify-between gap-6">
            <div className="flex-1">
              <p className={`text-xs font-semibold uppercase tracking-widest mb-1 ${theme.subtext}`}>
                Assessment Result
              </p>
              <h1 className={`text-3xl font-bold mb-2 ${theme.text}`}>
                Tier {tier} — {TIER_LABELS[tier]}
              </h1>
              <p className={`text-sm leading-relaxed ${theme.subtext}`}>
                {TIER_DESCRIPTIONS[tier]}
              </p>
            </div>
            <div className="shrink-0">
              <ScoreRing score={report.score} color="rgba(255,255,255,0.9)" />
            </div>
          </div>
          <div className={`bg-black/10 px-8 py-3 flex items-center justify-between`}>
            <p className={`text-xs ${theme.subtext}`}>Generated {generatedDate}</p>
            <p className={`text-xs ${theme.subtext}`}>EstateReady Assessment Report</p>
          </div>
        </div>

        {/* Narrative */}
        <div className="bg-white rounded-2xl border border-gray-100 px-8 py-7">
          <h2 className="text-xs font-semibold text-slate-mid uppercase tracking-widest mb-4">
            Assessment Summary
          </h2>
          <div className="space-y-3">
            {rec.narrative?.split('\n').filter(Boolean).map((para, i) => (
              <p key={i} className="text-gray-700 text-sm leading-relaxed">{para}</p>
            ))}
          </div>
        </div>

        {/* Priority actions */}
        <div className="bg-white rounded-2xl border border-gray-100 px-8 py-7">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-5">
            Priority Actions
          </h2>
          <div className="space-y-4">
            {rec.priority_actions?.map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="shrink-0 w-8 h-8 rounded-full bg-gray-900 text-white text-xs font-bold flex items-center justify-center mt-0.5">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div className="flex-1 border-b border-gray-50 pb-4 last:border-0 last:pb-0">
                  <p className="text-sm font-semibold text-gray-900 mb-1 leading-snug">{item.action}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{item.reason}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Domain findings */}
        {orderedFindings.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 px-8 py-7">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                Domain Findings
              </h2>
              <div className="flex items-center gap-2">
                {criticalFindings.length > 0 && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#7A2840]/10 border border-[#7A2840]/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#7A2840]" />
                    <span className="text-[10px] font-semibold uppercase tracking-wide text-[#7A2840]">{criticalFindings.length} critical</span>
                  </span>
                )}
                {cautionFindings.length > 0 && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gold/10 border border-gold/25">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                    <span className="text-[10px] font-semibold uppercase tracking-wide text-gold">{cautionFindings.length} caution</span>
                  </span>
                )}
                {infoFindings.length > 0 && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-mid/10 border border-slate-mid/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-mid" />
                    <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-mid">{infoFindings.length} note</span>
                  </span>
                )}
              </div>
            </div>
            <div className="space-y-3">
              {orderedFindings.map((finding, i) => {
                const style = SEVERITY_STYLE[finding.severity] ?? SEVERITY_STYLE.info
                return (
                  <div key={i} className={`rounded-xl border flex overflow-hidden ${style.bg}`}>
                    <div className={`w-1 shrink-0 ${style.bar}`} />
                    <div className="px-4 py-3 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs font-semibold uppercase tracking-wide ${style.labelText}`}>
                          {style.label}
                        </span>
                        <span className="text-gray-300 text-xs">·</span>
                        <span className="text-xs font-medium text-gray-700">{finding.label}</span>
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed">{finding.finding}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Attorney CTA */}
        <div className={`${theme.bg} rounded-2xl px-8 py-8 text-center relative overflow-hidden`}>
          <WaveLines />
          <div className="relative z-10">
            <p className={`text-xs font-semibold uppercase tracking-widest mb-2 ${theme.subtext}`}>
              Your next step
            </p>
            <h2 className={`text-xl font-bold mb-2 ${theme.text}`}>
              Take this report to an estate planning attorney.
            </h2>
            <p className={`text-sm leading-relaxed mb-6 max-w-md mx-auto ${theme.subtext}`}>
              Print it, email it, or share the link. Hand it to your attorney at the start
              of your first meeting — it will save you both time and give you a more
              productive conversation from the moment you sit down.
            </p>
            <div className="flex items-center justify-center gap-3 flex-wrap [&_button]:text-white [&_button]:hover:text-white/70">
              <PrintButton />
              <a
                href={`mailto:?subject=My EstateReady Report&body=View my estate planning assessment: ${process.env.NEXT_PUBLIC_URL}/report/${token}`}
                className="inline-flex items-center bg-white text-navy px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-cream transition-colors"
              >
                Email to Attorney →
              </a>
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-400 text-center pb-4">
          EstateReady · Not a law firm · Not legal advice · For informational purposes only
        </p>
      </div>
    </div>
  )
}
