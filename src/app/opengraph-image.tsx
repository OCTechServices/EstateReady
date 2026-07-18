import { ImageResponse } from 'next/og'

export const alt = 'Will & Estate Ready — Estate Planning Readiness Assessment'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const FINDINGS = [
  { label: 'Existing Documents',       status: 'Critical', critical: true  },
  { label: 'Beneficiary Designations', status: 'Critical', critical: true  },
  { label: 'Insurance Structure',      status: 'Caution',  critical: false },
  { label: 'Tax Awareness',            status: 'Note',     critical: false },
]

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          fontFamily: 'Georgia, serif',
          background: '#1A4A2E',
          position: 'relative',
        }}
      >
        {/* Gold top accent bar */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 5, background: '#B5935A', display: 'flex' }} />

        {/* Left panel */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: '52%',
            padding: '60px 64px',
          }}
        >
          {/* Compass mark */}
          <svg width="42" height="42" viewBox="0 0 32 32" style={{ marginBottom: 20, display: 'flex' }}>
            <rect width="32" height="32" fill="#1A4A2E" />
            <circle cx="16" cy="16" r="11.5" fill="none" stroke="#B5935A" strokeWidth="1.5" />
            <path d="M16 5L20 16L16 14L12 16Z" fill="#B5935A" />
            <path d="M16 27L20 16L16 18L12 16Z" fill="none" stroke="#B5935A" strokeWidth="1.25" />
            <circle cx="16" cy="16" r="1.75" fill="#1A4A2E" stroke="#B5935A" strokeWidth="1" />
          </svg>

          {/* Eyebrow */}
          <span
            style={{
              color: '#B5935A',
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              marginBottom: 22,
              display: 'flex',
            }}
          >
            Estate Planning Readiness Assessment
          </span>

          {/* Wordmark */}
          <span
            style={{
              color: 'white',
              fontSize: 56,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              marginBottom: 28,
              display: 'flex',
            }}
          >
            Will &amp; Estate Ready
          </span>

          {/* Tagline */}
          <span
            style={{
              color: 'rgba(255,255,255,0.72)',
              fontSize: 22,
              lineHeight: 1.45,
              marginBottom: 48,
              maxWidth: 480,
              display: 'flex',
            }}
          >
            Know where you stand before you meet an attorney.
          </span>

          {/* Gold divider */}
          <div style={{ width: 48, height: 2, background: '#B5935A', marginBottom: 36, display: 'flex' }} />

          {/* Trust signals */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {['Covers 7 key estate planning areas', '~10 minutes · $21 one-time', 'Educational guidance, not legal advice'].map((s) => (
              <div key={s} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <div style={{ width: 5, height: 5, background: '#B5935A', marginRight: 12, display: 'flex', flexShrink: 0 }} />
                <span style={{ color: 'rgba(255,255,255,0.60)', fontSize: 14, display: 'flex' }}>{s}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right panel — sample report card */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: '48%',
            padding: '60px 56px 60px 0',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(181,147,90,0.22)',
              overflow: 'hidden',
            }}
          >
            {/* Card header */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '18px 24px',
                borderBottom: '1px solid rgba(181,147,90,0.15)',
              }}
            >
              <span style={{ color: 'rgba(255,255,255,0.50)', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', display: 'flex' }}>
                Sample Report
              </span>
              <span style={{ color: '#B5935A', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', display: 'flex' }}>
                Tier 3 — Complex
              </span>
            </div>

            {/* Score row */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                padding: '24px 24px 20px',
                gap: 20,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  border: '4px solid #B5935A',
                  flexShrink: 0,
                }}
              >
                <span style={{ color: '#D4B483', fontSize: 28, fontWeight: 700, lineHeight: 1, display: 'flex' }}>68</span>
                <span style={{ color: 'rgba(212,180,131,0.70)', fontSize: 10, marginTop: 2, display: 'flex' }}>/ 100</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ color: 'white', fontSize: 18, fontWeight: 700, lineHeight: 1.2, marginBottom: 6, display: 'flex' }}>
                  Assessment Complete
                </span>
                <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: 12, lineHeight: 1.4, display: 'flex' }}>
                  3 critical gaps identified
                </span>
              </div>
            </div>

            {/* Findings */}
            <div style={{ display: 'flex', flexDirection: 'column', padding: '0 24px 24px' }}>
              <span style={{ color: 'rgba(255,255,255,0.40)', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 12, display: 'flex' }}>
                Domain Findings
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {FINDINGS.map((f) => (
                  <div
                    key={f.label}
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      padding: '8px 12px',
                      background: f.critical ? 'rgba(122,40,64,0.30)' : 'rgba(181,147,90,0.12)',
                      borderLeft: `3px solid ${f.critical ? '#7A2840' : '#B5935A'}`,
                      gap: 10,
                    }}
                  >
                    <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: 12, flex: 1, display: 'flex' }}>{f.label}</span>
                    <span
                      style={{
                        color: f.critical ? '#F5B4BE' : f.status === 'Caution' ? '#D4B483' : 'rgba(255,255,255,0.45)',
                        fontSize: 10,
                        fontWeight: 700,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        display: 'flex',
                      }}
                    >
                      {f.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Vertical divider */}
        <div
          style={{
            position: 'absolute',
            left: '52%',
            top: 60,
            bottom: 60,
            width: 1,
            background: 'rgba(181,147,90,0.15)',
            display: 'flex',
          }}
        />
      </div>
    ),
    { ...size }
  )
}
