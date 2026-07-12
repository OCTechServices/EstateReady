'use client'

import { useState } from 'react'
import Link from 'next/link'

const QUESTIONS = [
  {
    id: 'q1',
    text: 'Do you have a current will or living trust that reflects your wishes?',
    options: [
      { value: 'yes',      label: 'Yes, and it is up to date' },
      { value: 'outdated', label: 'I have one, but it may be outdated' },
      { value: 'no',       label: 'No — I do not have one' },
    ],
    good: 'yes',
  },
  {
    id: 'q2',
    text: 'Is someone legally authorized to manage your finances and make medical decisions for you if you were incapacitated?',
    options: [
      { value: 'yes',   label: 'Yes — I have a Power of Attorney in place' },
      { value: 'unsure', label: 'I am not sure' },
      { value: 'no',    label: 'No — I do not have one' },
    ],
    good: 'yes',
  },
  {
    id: 'q3',
    text: 'Have you reviewed the beneficiary designations on your retirement accounts and life insurance in the last three years?',
    options: [
      { value: 'yes', label: 'Yes, within the last three years' },
      { value: 'no',  label: 'Not recently — or I am not sure' },
      { value: 'na',  label: 'I do not have retirement accounts or life insurance' },
    ],
    good: 'yes',
  },
]

function getResult(answers: Record<string, string>) {
  const score = QUESTIONS.filter(q => answers[q.id] === q.good).length

  if (score === 3) {
    return {
      level: 'Some elements in place',
      headline: 'You appear to have the foundational documents in place.',
      body: 'That said, most people who believe they are prepared have at least one significant gap — an outdated beneficiary, a missing healthcare directive, or a planning area they have not considered. A full assessment will confirm exactly where you stand and prepare you for a productive conversation with an attorney.',
    }
  }
  if (score === 2) {
    return {
      level: 'One or more gaps identified',
      headline: 'Your answers suggest at least one significant gap in your estate plan.',
      body: 'Most people in this situation are missing one or two documents their family will need. Without them, critical decisions — about your assets, your medical care, or who manages your affairs — may be left to someone else. A full assessment will identify exactly what is missing and tell you what to address first.',
    }
  }
  if (score === 1) {
    return {
      level: 'Meaningful gaps identified',
      headline: 'Your answers suggest your estate plan has meaningful gaps.',
      body: 'People with one "yes" out of three typically lack two or more critical documents. This means that if something happened today, your family would face difficult decisions — and in many cases, a court process — without your clear direction. A full assessment will show you exactly where to start.',
    }
  }
  return {
    level: 'Significant gaps identified',
    headline: 'Based on your answers, your estate appears significantly unprepared.',
    body: 'Most people in this situation are missing every critical planning document. Without a will, a power of attorney, or current beneficiary designations, your family may face a prolonged and costly court process at an already difficult time. A full assessment will show you exactly where to start and what matters most.',
  }
}

export default function QuickCheck() {
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)

  const allAnswered = QUESTIONS.every(q => answers[q.id])
  const result = submitted ? getResult(answers) : null

  return (
    <div style={{ border: '1px solid #D1C9B8' }}>
      {/* Header */}
      <div style={{ borderBottom: '1px solid #D1C9B8', backgroundColor: '#F5F0E8' }} className="px-8 py-5">
        <p style={{ fontFamily: 'var(--font-playfair)' }} className="text-lg font-bold text-navy">
          Three questions &nbsp;·&nbsp; Thirty seconds
        </p>
        <p className="text-sm text-slate-mid mt-0.5">No personal information required.</p>
      </div>

      {!submitted ? (
        <div className="bg-white px-8 py-8">
          <div className="space-y-10">
            {QUESTIONS.map((q, qi) => (
              <div key={q.id}>
                <p className="text-base font-semibold text-navy mb-4 leading-snug">
                  <span style={{ color: '#B5935A' }} className="mr-2 font-bold">{qi + 1}.</span>
                  {q.text}
                </p>
                <div className="space-y-2">
                  {q.options.map((opt) => {
                    const isSelected = answers[q.id] === opt.value
                    return (
                      <label
                        key={opt.value}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          padding: '12px 16px',
                          border: `1px solid ${isSelected ? '#1A4A2E' : '#EDE9DC'}`,
                          backgroundColor: isSelected ? 'rgba(26,74,46,0.05)' : 'white',
                          cursor: 'pointer',
                        }}
                      >
                        <input
                          type="radio"
                          name={q.id}
                          value={opt.value}
                          checked={isSelected}
                          onChange={() => setAnswers(prev => ({ ...prev, [q.id]: opt.value }))}
                          style={{ accentColor: '#1A4A2E', width: '16px', height: '16px', flexShrink: 0 }}
                        />
                        <span className="text-sm text-navy leading-snug">{opt.label}</span>
                      </label>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <button
              onClick={() => { if (allAnswered) setSubmitted(true) }}
              disabled={!allAnswered}
              style={{
                backgroundColor: allAnswered ? '#1A4A2E' : '#EDE9DC',
                color: allAnswered ? 'white' : '#9CA3AF',
                cursor: allAnswered ? 'pointer' : 'not-allowed',
                padding: '14px 32px',
                fontSize: '1rem',
                fontWeight: 600,
                border: 'none',
              }}
            >
              See My Preliminary Finding
            </button>
            {!allAnswered && (
              <p className="text-xs text-slate-mid mt-3">Answer all three questions above to continue.</p>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-white px-8 py-8">
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: '#B5935A' }}
          >
            Your Preliminary Finding &nbsp;·&nbsp; {result!.level}
          </p>
          <p
            style={{ fontFamily: 'var(--font-playfair)', lineHeight: 1.2 }}
            className="text-2xl font-bold text-navy mb-5"
          >
            {result!.headline}
          </p>
          <p className="text-base text-slate-mid leading-relaxed mb-8" style={{ maxWidth: '60ch' }}>
            {result!.body}
          </p>
          <div style={{ borderTop: '1px solid #EDE9DC' }} className="pt-6">
            <p className="text-sm text-slate-mid mb-5">
              A full assessment covers 40 questions across 7 planning areas and delivers
              a personal report with your exact findings and what to do first.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <Link
                href="/intake"
                style={{ backgroundColor: '#1A4A2E', color: 'white', padding: '14px 32px', fontSize: '1rem', fontWeight: 600 }}
                className="hover:bg-navy-light transition-colors text-center"
              >
                Begin Full Assessment — $21
              </Link>
              <button
                onClick={() => { setAnswers({}); setSubmitted(false) }}
                className="text-sm text-slate-mid underline underline-offset-4 hover:text-navy transition-colors sm:pt-3.5"
              >
                Retake
              </button>
            </div>
            <p className="text-xs text-slate-mid mt-5">
              Not legal advice. A preliminary finding based on 3 questions is not a substitute for a full assessment.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
