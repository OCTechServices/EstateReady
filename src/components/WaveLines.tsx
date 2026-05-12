const W = 1400
const H = 220
const LINE_COUNT = 18

function generateWavePath(yBase: number, amplitude: number, frequency: number, phaseShift: number): string {
  const points: string[] = []
  const steps = 140
  for (let i = 0; i <= steps; i++) {
    const x = (i / steps) * W
    const y = yBase + amplitude * Math.sin((i / steps) * frequency * Math.PI * 2 + phaseShift)
    points.push(i === 0 ? `M ${x.toFixed(1)},${y.toFixed(1)}` : `L ${x.toFixed(1)},${y.toFixed(1)}`)
  }
  return points.join(' ')
}

export default function WaveLines() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true" style={{ willChange: 'transform', transform: 'translateZ(0)' }}>
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid slice"
      >
        {Array.from({ length: LINE_COUNT }, (_, i) => {
          const yBase = (H / (LINE_COUNT + 1)) * (i + 1)
          const amplitude = 10 + (i % 4) * 4
          const frequency = 1.4 + (i % 3) * 0.3
          const phase = (i / LINE_COUNT) * Math.PI * 2
          const opacity = 0.08 + (i / LINE_COUNT) * 0.22
          const duration = 7 + (i % 5) * 1.2
          const delay = -(i * 0.6)
          const direction = i % 2 === 0 ? 'normal' : 'reverse'

          return (
            <path
              key={i}
              d={generateWavePath(yBase, amplitude, frequency, phase)}
              fill="none"
              stroke={`rgba(181, 147, 90, ${opacity.toFixed(2)})`}
              strokeWidth="1.2"
              style={{
                animationName: 'wave-drift',
                animationDuration: `${duration}s`,
                animationTimingFunction: 'ease-in-out',
                animationIterationCount: 'infinite',
                animationDirection: direction,
                animationDelay: `${delay}s`,
              }}
            />
          )
        })}
      </svg>
    </div>
  )
}
