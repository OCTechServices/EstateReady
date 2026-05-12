'use client'

export default function BackToTop() {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="text-xs font-medium text-slate-mid underline underline-offset-2 hover:text-navy transition-colors"
    >
      ↑ Back to top
    </button>
  )
}
