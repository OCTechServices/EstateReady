'use client'

import { useState } from 'react'

interface Props {
  url?: string
  title?: string
  text?: string
  variant?: 'light' | 'dark'
}

export default function ShareButton({
  url,
  title = 'EstateReady — Know Where Your Estate Planning Stands',
  text = 'Know where your estate planning stands before you spend a dollar on attorney time.',
  variant = 'light',
}: Props) {
  const [copied, setCopied] = useState(false)

  const shareUrl = url ?? (typeof window !== 'undefined' ? window.location.href : '')

  async function handleShare() {
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url: shareUrl })
      } catch {
        // user dismissed — no-op
      }
      return
    }
    // Fallback: copy to clipboard
    await navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const muted = variant === 'dark' ? 'text-white/50 hover:text-white/80' : 'text-slate-mid hover:text-navy'
  const label = variant === 'dark' ? 'text-white/70 hover:text-white' : 'text-slate-mid hover:text-navy'

  return (
    <div className="flex items-center gap-4">
      {/* Share / copy link */}
      <button
        onClick={handleShare}
        className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${label}`}
      >
        {copied ? (
          <>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8l3.5 3.5 6.5-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Link copied
          </>
        ) : (
          <>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <circle cx="12" cy="3" r="1.75" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="12" cy="13" r="1.75" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="4"  cy="8" r="1.75" stroke="currentColor" strokeWidth="1.5" />
              <path d="M10.3 4l-4.6 2.5M10.3 12l-4.6-2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            Share
          </>
        )}
      </button>

      <span className={`text-xs ${muted} select-none`}>·</span>

      {/* Email */}
      <a
        href={`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${text}\n\n${shareUrl}`)}`}
        className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${label}`}
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <rect x="1.5" y="3.5" width="13" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
          <path d="M1.5 5.5l6.5 4 6.5-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
        Email a friend
      </a>
    </div>
  )
}
