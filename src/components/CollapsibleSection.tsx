'use client'

import { useState } from 'react'

interface CollapsibleSectionProps {
  title: string
  children: React.ReactNode
  headerRight?: React.ReactNode
  defaultOpen?: boolean
}

export default function CollapsibleSection({
  title,
  children,
  headerRight,
  defaultOpen = true,
}: CollapsibleSectionProps) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="bg-white rounded-2xl border border-gray-100 px-8 py-7">
      {/* Header — clickable on mobile, static on desktop */}
      <div className="flex items-center justify-between mb-0">
        <button
          className="flex items-center gap-2 text-left md:cursor-default w-full"
          onClick={() => setOpen(o => !o)}
        >
          <h2 className="text-xs font-semibold text-slate-mid uppercase tracking-widest flex-1">
            {title}
          </h2>
          {/* Chevron — mobile only */}
          <svg
            viewBox="0 0 10 10"
            className="w-3 h-3 shrink-0 transition-transform duration-300 md:hidden"
            style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          >
            <path d="M2 3.5l3 3 3-3" />
          </svg>
        </button>
        {headerRight && (
          <div className="ml-3 shrink-0">{headerRight}</div>
        )}
      </div>

      {/* Content */}
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out md:overflow-visible md:max-h-none md:opacity-100"
        style={{ maxHeight: open ? '2000px' : '0px', opacity: open ? 1 : 0 }}
      >
        <div className="mt-4">{children}</div>
      </div>
    </div>
  )
}
