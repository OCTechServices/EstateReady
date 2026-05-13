import { ImageResponse } from 'next/og'
import { getSupabaseAdmin } from '@/lib/supabase'
import { TIER_LABELS, TIER_DESCRIPTIONS, Tier } from '@/types/questionnaire'
import { ReportRecommendations } from '@/lib/report'

export const alt = 'My EstateReady Assessment Result'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const TIER_COLORS: Record<number, { bg: string; cardBg: string; accent: string; accentMuted: string; pill: string; pillText: string }> = {
  1: { bg: '#071A10', cardBg: '#0F3020', accent: '#D4B483', accentMuted: 'rgba(212,180,131,0.55)', pill: 'rgba(212,180,131,0.18)', pillText: 'rgba(212,180,131,0.90)' },
  2: { bg: '#111B28', cardBg: '#2A3D5C', accent: '#C8D4E8', accentMuted: 'rgba(200,212,232,0.55)', pill: 'rgba(200,212,232,0.15)', pillText: 'rgba(200,212,232,0.90)' },
  3: { bg: '#1A0810', cardBg: '#6B1F35', accent: '#F5C8D4', accentMuted: 'rgba(245,200,212,0.55)', pill: 'rgba(245,200,212,0.15)', pillText: 'rgba(245,200,212,0.90)' },
  4: { bg: '#0D0D0E', cardBg: '#1C1C1E', accent: '#D4B483', accentMuted: 'rgba(212,180,131,0.55)', pill: 'rgba(212,180,131,0.18)', pillText: 'rgba(212,180,131,0.90)' },
}

const SEVERITY_COLOR: Record<string, { bg: string; text: string }> = {
  critical: { bg: 'rgba(180,55,75,0.22)', text: 'rgba(245,150,168,0.90)' },
  caution:  { bg: 'rgba(181,147,90,0.20)', text: 'rgba(212,180,131,0.90)' },
  info:     { bg: 'rgba(74,99,85,0.22)',   text: 'rgba(150,180,165,0.85)' },
}

interface Props {
  params: Promise<{ token: string }>
}

export default async function ReportOGImage({ params }: Props) {
  const { token } = await params
  const db = getSupabaseAdmin()

  const { data: submission } = await db
    .from('submissions')
    .select('id, status')
    .eq('access_token', token)
    .single()

  // Fallback to generic image if report not ready
  if (!submission || submission.status !== 'complete') {
    return fallbackImage()
  }

  const { data: report } = await db
    .from('reports')
    .select('score, tier, recommendations')
    .eq('submission_id', submission.id)
    .single()

  if (!report) return fallbackImage()

  const tier = report.tier as Tier
  const score = report.score as number
  const recs = report.recommendations as ReportRecommendations
  const theme = TIER_COLORS[tier] ?? TIER_COLORS[1]
  const tierLabel = TIER_LABELS[tier]
  const tierDesc = TIER_DESCRIPTIONS[tier]
  const findings = (recs?.domain_findings ?? []).slice(0, 4)

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Georgia, serif',
          background: theme.bg,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle ribbon accents in tier color */}
        <div style={{ position: 'absolute', top: '-200px', right: '-40px',  width: '160px', height: '1100px', background: `${theme.cardBg}22`, borderRadius: '80px', transform: 'rotate(-21deg)' }} />
        <div style={{ position: 'absolute', top: '-240px', right: '130px',  width: '110px', height: '1100px', background: `${theme.cardBg}18`, borderRadius: '60px', transform: 'rotate(-21deg)' }} />
        <div style={{ position: 'absolute', top: '-220px', right: '260px',  width: '70px',  height: '1100px', background: 'rgba(181,147,90,0.06)',              borderRadius: '45px', transform: 'rotate(-21deg)' }} />

        {/* Main card */}
        <div
          style={{
            width: 1040,
            background: 'rgba(255,255,255,0.04)',
            border: `1px solid ${theme.accentMuted}`,
            borderRadius: 24,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          {/* Top: wordmark + score */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '32px 48px 28px 48px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <p style={{ color: '#B5935A', fontSize: 11, fontWeight: 700, letterSpacing: '0.24em', textTransform: 'uppercase', margin: '0 0 10px 0' }}>
                Estate Planning Assessment
              </p>
              <p style={{ color: 'white', fontSize: 52, fontWeight: 700, margin: 0, lineHeight: 1, letterSpacing: '-0.02em' }}>
                EstateReady
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div
                style={{
                  width: 96,
                  height: 96,
                  borderRadius: '50%',
                  border: `6px solid ${theme.accentMuted}`,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span style={{ color: theme.accent, fontSize: 30, fontWeight: 700, lineHeight: 1 }}>{score}</span>
                <span style={{ color: theme.accentMuted, fontSize: 9, lineHeight: 1, marginTop: 3 }}>/ 100</span>
              </div>
              <span style={{ color: theme.accentMuted, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 6 }}>Score</span>
            </div>
          </div>

          {/* Middle: tier + domain findings */}
          <div style={{ display: 'flex', padding: '28px 48px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
            {/* Tier */}
            <div style={{ display: 'flex', flexDirection: 'column', width: 320, paddingRight: 48 }}>
              <p style={{ color: theme.accentMuted, fontSize: 10, fontWeight: 700, letterSpacing: '0.20em', textTransform: 'uppercase', margin: '0 0 10px 0' }}>
                Assessment Result
              </p>
              <p style={{ color: theme.accent, fontSize: 26, fontWeight: 700, margin: '0 0 8px 0', lineHeight: 1.1 }}>
                Tier {tier} — {tierLabel}
              </p>
              <p style={{ color: 'rgba(255,255,255,0.50)', fontSize: 13, margin: 0, lineHeight: 1.6 }}>
                {tierDesc}
              </p>
            </div>

            {/* Domain findings */}
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
              <p style={{ color: 'rgba(255,255,255,0.30)', fontSize: 10, fontWeight: 700, letterSpacing: '0.20em', textTransform: 'uppercase', margin: '0 0 12px 0' }}>
                Domain Findings
              </p>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {findings.map((d, i) => {
                  const sc = SEVERITY_COLOR[d.severity] ?? SEVERITY_COLOR.info
                  return (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 9, marginBottom: 9, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <span style={{ color: 'rgba(255,255,255,0.70)', fontSize: 13 }}>{d.label}</span>
                      <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: sc.text, background: sc.bg, padding: '3px 10px', borderRadius: 20 }}>
                        {d.severity.charAt(0).toUpperCase() + d.severity.slice(1)}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Bottom: tagline + stats */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '22px 48px', background: 'rgba(0,0,0,0.18)' }}>
            <p style={{ color: 'rgba(255,255,255,0.50)', fontSize: 14, margin: 0, lineHeight: 1.5 }}>
              A clear, honest picture of your estate planning — and exactly what to do next.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#B5935A' }} />
              <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 12 }}>estateready.vercel.app</span>
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}

function fallbackImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Georgia, serif',
          background: '#0F3020',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <p style={{ color: '#B5935A', fontSize: 12, fontWeight: 700, letterSpacing: '0.24em', textTransform: 'uppercase', margin: '0 0 16px 0' }}>
            Estate Planning Assessment
          </p>
          <p style={{ color: 'white', fontSize: 72, fontWeight: 700, margin: 0, letterSpacing: '-0.03em' }}>
            EstateReady
          </p>
        </div>
      </div>
    ),
    { ...size }
  )
}
