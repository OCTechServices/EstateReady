const RIBBONS = [
  {
    // Tier 1 — forest green — far right
    color: '#0F3020',
    path: 'M 1420,-80 C 1480,130 1340,310 1300,470 C 1270,580 1310,600 1280,700',
    width: 32,
    opacity: 0.30,
    duration: 17,
    delay: 0,
    direction: 'normal' as const,
  },
  {
    // Tier 2 — blue — second from right
    color: '#2A3D5C',
    path: 'M 1230,-110 C 1310,80 1150,270 1110,430 C 1070,550 1110,570 1080,700',
    width: 24,
    opacity: 0.28,
    duration: 21,
    delay: -6,
    direction: 'reverse' as const,
  },
  {
    // Tier 3 — garnet — middle
    color: '#6B1F35',
    path: 'M 1060,-70 C 1130,120 980,310 950,460 C 920,570 960,590 930,700',
    width: 18,
    opacity: 0.26,
    duration: 19,
    delay: -11,
    direction: 'normal' as const,
  },
  {
    // Tier 4 — near-black — furthest left
    color: '#1C1C1E',
    path: 'M 900,-90 C 970,100 820,290 790,450 C 760,570 800,590 770,700',
    width: 12,
    opacity: 0.22,
    duration: 24,
    delay: -4,
    direction: 'reverse' as const,
  },
]

export default function HeroRibbons() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true" style={{ willChange: 'transform', transform: 'translateZ(0)' }}>
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1440 600"
        preserveAspectRatio="xMaxYMid slice"
      >
        <defs>
          {RIBBONS.map((r, i) => (
            <linearGradient
              key={i}
              id={`hrg${i}`}
              gradientUnits="userSpaceOnUse"
              x1={1440}
              y1={0}
              x2={700}
              y2={600}
            >
              <stop offset="0%" stopColor={r.color} stopOpacity={r.opacity} />
              <stop offset="100%" stopColor={r.color} stopOpacity={0} />
            </linearGradient>
          ))}
        </defs>

        {RIBBONS.map((r, i) => (
          <path
            key={i}
            d={r.path}
            fill="none"
            stroke={`url(#hrg${i})`}
            strokeWidth={r.width}
            style={{
              animationName: 'wave-drift',
              animationDuration: `${r.duration}s`,
              animationTimingFunction: 'ease-in-out',
              animationIterationCount: 'infinite',
              animationDirection: r.direction,
              animationDelay: `${r.delay}s`,
            }}
          />
        ))}
      </svg>
    </div>
  )
}
