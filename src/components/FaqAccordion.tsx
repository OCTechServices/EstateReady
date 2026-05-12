'use client'

import { useState } from 'react'
import type { ReactNode } from 'react'

const FAQS: { q: string; a: ReactNode }[] = [
  {
    q: 'Is this legal advice?',
    a: <>No. EstateReady is not a law firm and does not provide legal advice. <strong className="text-navy">We help you understand your own situation clearly</strong> — so that when you do sit down with an attorney, you&apos;re not starting from zero.</>,
  },
  {
    q: 'Is $21 the full cost? No subscription?',
    a: <>$21, one time. <strong className="text-navy">No subscription, no renewal, no upsell.</strong> You get one report, accessible for one year via a secure link sent to your email.</>,
  },
  {
    q: 'What happens to my information?',
    a: <>Your responses are used to generate your report — nothing else. <strong className="text-navy">We don&apos;t sell your data, share it with third parties, or use it for marketing.</strong> Payment is handled by Stripe. We never see your card.</>,
  },
  {
    q: 'Do I need to already have an attorney?',
    a: <>No. Most people use EstateReady before they have one — to understand what they actually need before they start making calls.</>,
  },
  {
    q: 'What if I don\'t know the answers to some questions?',
    a: <>&ldquo;Not sure&rdquo; is a valid answer. It tells us something useful about your planning readiness. You don&apos;t need to dig out paperwork or know legal terminology — <strong className="text-navy">just answer honestly based on what you know today.</strong></>,
  },
]

export default function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="space-y-2">
      {FAQS.map((faq, i) => {
        const isOpen = open === i
        return (
          <div
            key={faq.q}
            className="border border-cream-dark rounded-xl overflow-hidden transition-colors duration-200"
            style={{ backgroundColor: isOpen ? '#FAF8F2' : 'white' }}
          >
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left"
            >
              <h3 className="text-sm font-semibold text-navy leading-snug">{faq.q}</h3>
              <div
                className="shrink-0 w-5 h-5 rounded-full border border-cream-dark flex items-center justify-center transition-colors duration-200"
                style={{ backgroundColor: isOpen ? '#B5935A' : 'transparent', borderColor: isOpen ? '#B5935A' : undefined }}
              >
                <svg
                  viewBox="0 0 10 10"
                  className="w-2.5 h-2.5 transition-transform duration-300"
                  style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                  fill="none"
                  stroke={isOpen ? 'white' : '#B5935A'}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                >
                  <path d="M2 3.5l3 3 3-3" />
                </svg>
              </div>
            </button>

            <div
              className="overflow-hidden transition-all duration-300 ease-in-out"
              style={{ maxHeight: isOpen ? '200px' : '0px', opacity: isOpen ? 1 : 0 }}
            >
              <p className="text-slate-mid text-sm leading-relaxed px-6 pb-5">{faq.a}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
