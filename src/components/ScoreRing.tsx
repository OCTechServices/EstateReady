'use client'

import { useEffect, useState } from 'react'

interface ScoreRingProps {
  score: number
  color: string
  animate?: boolean
}

export default function ScoreRing({ score, color, animate = false }: ScoreRingProps) {
  const radius = 54
  const circumference = 2 * Math.PI * radius
  const filled = (score / 100) * circumference
  const targetOffset = circumference - filled

  // Start empty when animate=true so we can transition in on mount
  const [offset, setOffset] = useState(animate ? circumference : targetOffset)

  useEffect(() => {
    if (!animate) return
    // Double RAF ensures the initial empty state is painted before transition fires
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setOffset(targetOffset))
    })
    return () => cancelAnimationFrame(id)
  }, [animate, circumference, targetOffset])

  return (
    <svg viewBox="0 0 120 120" className="w-28 h-28 shrink-0">
      <circle cx="60" cy="60" r={radius} fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="10" />
      <circle
        cx="60"
        cy="60"
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={animate ? offset : targetOffset}
        transform="rotate(-90 60 60)"
        style={animate ? { transition: 'stroke-dashoffset 0.65s ease' } : undefined}
      />
      <text x="60" y="55" textAnchor="middle" fontSize="22" fontWeight="700" fill={color}>
        {score}
      </text>
      <text x="60" y="71" textAnchor="middle" fontSize="10" fill={color}>
        out of 100
      </text>
    </svg>
  )
}
