import { ImageResponse } from 'next/og'

export const alt = 'EstateReady — Know Where Your Estate Planning Stands'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const DOMAINS = [
  { label: 'Asset Titling',          status: 'Critical', garnet: true  },
  { label: 'Healthcare Directives',  status: 'Caution',  garnet: false },
  { label: 'Will & Trust',           status: 'Caution',  garnet: false },
  { label: 'Beneficiary',            status: 'Info',     garnet: false },
]

export default function OGImage() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', fontFamily: 'Georgia, serif', background: '#0F3020', padding: 24 }}>

        {/* Card fills canvas */}
        <div style={{ display: 'flex', flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', border: '1px solid rgba(181,147,90,0.25)', borderRadius: 20, overflow: 'hidden' }}>

          {/* Ribbon accents inside card */}
          <div style={{ position: 'absolute', top: '-200px', right: '-40px',  width: '180px', height: '1100px', background: 'rgba(181,147,90,0.07)', borderRadius: '90px', transform: 'rotate(-21deg)', display: 'flex' }} />
          <div style={{ position: 'absolute', top: '-240px', right: '140px',  width: '120px', height: '1100px', background: 'rgba(45,106,79,0.10)',  borderRadius: '70px', transform: 'rotate(-21deg)', display: 'flex' }} />
          <div style={{ position: 'absolute', top: '-220px', right: '280px',  width: '80px',  height: '1100px', background: 'rgba(107,31,53,0.09)',  borderRadius: '55px', transform: 'rotate(-21deg)', display: 'flex' }} />
          <div style={{ position: 'absolute', top: '-260px', left: '-60px',   width: '120px', height: '1100px', background: 'rgba(181,147,90,0.05)', borderRadius: '70px', transform: 'rotate(-21deg)', display: 'flex' }} />
          <div style={{ position: 'absolute', top: '-240px', left: '80px',    width: '70px',  height: '1100px', background: 'rgba(45,106,79,0.07)',  borderRadius: '45px', transform: 'rotate(-21deg)', display: 'flex' }} />

          {/* Eyebrow */}
          <span style={{ color: '#D4B483', fontSize: 11, fontWeight: 700, letterSpacing: '0.26em', textTransform: 'uppercase', marginBottom: 10 }}>
            Estate Planning Assessment
          </span>

          {/* Wordmark */}
          <span style={{ color: 'white', fontSize: 56, fontWeight: 700, lineHeight: 1, letterSpacing: '-0.02em', marginBottom: 32 }}>
            EstateReady
          </span>

          {/* Score ring */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: 130, height: 130, borderRadius: '50%', border: '7px solid #B5935A', marginBottom: 28 }}>
            <span style={{ color: '#D4B483', fontSize: 44, fontWeight: 700, lineHeight: 1 }}>69</span>
            <span style={{ color: 'rgba(212,180,131,0.80)', fontSize: 12, lineHeight: 1, marginTop: 4 }}>/ 100</span>
          </div>

          {/* Tier label */}
          <span style={{ color: 'white', fontSize: 24, fontWeight: 700, letterSpacing: '-0.01em', marginBottom: 8 }}>
            Tier 3 — Complex
          </span>

          {/* Tier description */}
          <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: 14, lineHeight: 1.5, marginBottom: 32, textAlign: 'center' }}>
            Significant complexity requiring structured planning and professional guidance.
          </span>

          {/* Domain pills row */}
          <div style={{ display: 'flex', flexDirection: 'row', marginBottom: 36 }}>
            {DOMAINS.map((d, i) => (
              <div
                key={d.label}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginLeft: i === 0 ? 0 : 10,
                  background: d.garnet ? 'rgba(180,55,75,0.28)' : d.status === 'Caution' ? 'rgba(181,147,90,0.22)' : 'rgba(74,99,85,0.24)',
                  borderRadius: 24,
                  padding: '7px 16px',
                }}
              >
                <div style={{ display: 'flex', width: 5, height: 5, borderRadius: '50%', background: d.garnet ? '#F5B4BE' : d.status === 'Caution' ? '#D4B483' : '#96B4A5', marginRight: 7 }} />
                <span style={{ color: 'rgba(255,255,255,0.88)', fontSize: 13 }}>{d.label}</span>
                <span style={{ color: d.garnet ? '#F5B4BE' : d.status === 'Caution' ? '#D4B483' : '#96B4A5', fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginLeft: 8 }}>
                  {d.status}
                </span>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div style={{ display: 'flex', width: 40, height: 1, background: 'rgba(181,147,90,0.35)', marginBottom: 20 }} />

          {/* Tagline + stats */}
          <span style={{ color: 'rgba(255,255,255,0.80)', fontSize: 13, marginBottom: 14, textAlign: 'center' }}>
            A clear, honest picture of your estate planning — and exactly what to do next.
          </span>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            {['37 questions', '$21 one-time', '~10 minutes'].map((s, i) => (
              <div key={s} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: i === 0 ? 0 : 20 }}>
                <div style={{ display: 'flex', width: 3, height: 3, borderRadius: '50%', background: '#B5935A', marginRight: 7 }} />
                <span style={{ color: 'rgba(255,255,255,0.70)', fontSize: 12 }}>{s}</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    ),
    { ...size }
  )
}
