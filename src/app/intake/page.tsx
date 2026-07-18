'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { DOMAIN_ORDER, QUESTIONS_BY_DOMAIN, DOMAIN_LABELS, Answers, TIER_LABELS, Tier, Domain } from '@/types/questionnaire'
import { calculateScore } from '@/lib/scoring'
import ProgressBar from '@/components/questionnaire/ProgressBar'
import ScoreRing from '@/components/ScoreRing'
import CompassMark from '@/components/CompassMark'

type Step = 'intro' | 'questionnaire' | 'preview' | 'email'

const TIER_PREVIEW_THEME: Record<Tier, { bg: string; text: string; sub: string; ring: string }> = {
  1: { bg: 'bg-tier-1', text: 'text-white', sub: 'text-gold-light',  ring: 'rgba(212,180,131,0.9)' },
  2: { bg: 'bg-tier-2', text: 'text-white', sub: 'text-[#C8D4E8]',   ring: 'rgba(200,212,232,0.9)' },
  3: { bg: 'bg-tier-3', text: 'text-white', sub: 'text-[#F5C8D4]',   ring: 'rgba(245,200,212,0.9)' },
  4: { bg: 'bg-tier-4', text: 'text-white', sub: 'text-gold-light',  ring: 'rgba(212,180,131,0.9)' },
}

const ALL_QUESTIONS = DOMAIN_ORDER.flatMap((d) => QUESTIONS_BY_DOMAIN[d] ?? [])

function scrollTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

export default function IntakePage() {
  const router = useRouter()
  const [step, setStep] = useState<Step>('intro')
  const [questionIndex, setQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Answers>({})
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [domainTransition, setDomainTransition] = useState<{ domain: Domain; n: number; count: number } | null>(null)

  const totalQuestions = ALL_QUESTIONS.length
  const currentQuestion = ALL_QUESTIONS[questionIndex]
  const isLastQuestion = questionIndex === totalQuestions - 1

  function handleAnswer(questionId: string, value: string) {
    setAnswers((prev) => ({ ...prev, [questionId]: value }))
    setTimeout(() => {
      if (isLastQuestion) {
        setStep('preview')
        scrollTop()
        return
      }
      const nextIndex = questionIndex + 1
      const nextQuestion = ALL_QUESTIONS[nextIndex]
      if (nextQuestion.domain !== currentQuestion.domain) {
        const n = DOMAIN_ORDER.indexOf(nextQuestion.domain) + 1
        const count = QUESTIONS_BY_DOMAIN[nextQuestion.domain]?.length ?? 0
        setDomainTransition({ domain: nextQuestion.domain, n, count })
      }
      setQuestionIndex(nextIndex)
      scrollTop()
    }, 350)
  }

  useEffect(() => {
    if (!domainTransition) return
    const id = setTimeout(() => setDomainTransition(null), 9000)
    return () => clearTimeout(id)
  }, [domainTransition])

  function handleBack() {
    if (step === 'email') {
      setStep('preview')
    } else if (step === 'preview') {
      setStep('questionnaire')
      setQuestionIndex(totalQuestions - 1)
    } else if (questionIndex > 0) {
      setQuestionIndex((i) => i - 1)
    }
    scrollTop()
  }

  async function handleSubmit() {
    setEmailError('')
    setError('')

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('Please enter a valid email address.')
      return
    }

    setIsSubmitting(true)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, answers }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error ?? 'Something went wrong. Please try again.')
      }

      const { url } = await res.json()
      router.push(url)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
      setIsSubmitting(false)
    }
  }

  // Calculate preview score
  const { score, tier } = calculateScore(answers)
  const previewTheme = TIER_PREVIEW_THEME[tier]

  return (
    <div className="min-h-screen bg-cream">

      {/* Sticky header */}
      <div className="sticky top-0 z-10 bg-white border-b border-cream-dark shadow-sm">
        <div className="max-w-2xl mx-auto px-6 pt-4 pb-4">
          <div className="flex items-center justify-between mb-4">
            <Link href="/" className="flex items-center gap-2.5">
              <CompassMark size={26} />
              <span style={{ fontFamily: 'var(--font-playfair)' }} className="text-xl font-bold text-navy hover:text-navy-light transition-colors">Will &amp; Estate Ready</span>
            </Link>
            <span className="text-xs text-slate-mid">Estate Planning Assessment</span>
          </div>
          {step !== 'intro' && (
            <ProgressBar
              currentQuestion={step === 'preview' || step === 'email' ? totalQuestions : questionIndex}
              totalQuestions={totalQuestions}
              domain={step === 'questionnaire' ? (currentQuestion?.domain ?? null) : null}
            />
          )}
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-10">

        {/* Intro — orientation card before Q1 */}
        {/*
          Photo: Unsplash photo-1455390582262-044cdead277a (fountain pen writing on paper)
          Dark green overlay at 86% — warm, editorial, conveys "documentation and preparation."
        */}
        {step === 'intro' && (
          <div
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&h=800&q=80)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              overflow: 'hidden',
            }}
          >
            <div style={{ backgroundColor: 'rgba(10, 30, 20, 0.86)' }} className="px-6 sm:px-10 py-14">
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-6"
                style={{ color: '#B5935A' }}
              >
                Estate Planning Assessment
              </p>
              <h1
                style={{ fontFamily: 'var(--font-playfair)', lineHeight: 1.15 }}
                className="text-3xl sm:text-4xl font-bold text-white mb-5"
              >
                You&apos;re in the right place.
              </h1>
              <p className="text-white/75 text-base leading-relaxed mb-8" style={{ maxWidth: '44ch' }}>
                This assessment covers 40 plain-language questions across 7 planning
                areas. Takes about 10 minutes. Answer based on what you know today —
                no paperwork required.
              </p>
              <div className="space-y-3 mb-10">
                {[
                  '40 questions · 7 planning areas · about 10 minutes',
                  'No wrong answers — estimates are perfectly fine',
                  '$21 at the end · No subscription · Your data stays private',
                ].map(item => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: '#B5935A' }} />
                    <p className="text-white/70 text-sm">{item}</p>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setStep('questionnaire')}
                className="bg-white text-navy text-base font-semibold px-8 py-4 hover:bg-cream transition-colors"
                style={{ borderBottom: '3px solid #B5935A' }}
              >
                Begin Assessment →
              </button>
            </div>
          </div>
        )}

        {/* Domain transition card */}
        {step === 'questionnaire' && domainTransition && (
          <div className="overflow-hidden bg-navy-dark">
            <div className="px-8 py-14 text-center">
              <p className="text-[10px] font-bold text-gold uppercase tracking-widest mb-5">
                Domain {domainTransition.n} of {DOMAIN_ORDER.length}
              </p>
              <div className="flex justify-center gap-1.5 mb-8">
                {DOMAIN_ORDER.map((_, i) => (
                  <div
                    key={i}
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: i + 1 === domainTransition.n ? '14px' : '5px',
                      height: '5px',
                      backgroundColor: i + 1 <= domainTransition.n ? '#B5935A' : 'rgba(255,255,255,0.2)',
                    }}
                  />
                ))}
              </div>
              <h2
                style={{ fontFamily: 'var(--font-playfair)', lineHeight: 1.15 }}
                className="text-3xl sm:text-4xl font-bold text-white mb-3"
              >
                {DOMAIN_LABELS[domainTransition.domain]}
              </h2>
              <p className="text-white/50 text-base mb-10">
                {domainTransition.count} questions in this section
              </p>
              <button
                onClick={() => setDomainTransition(null)}
                className="bg-white text-navy px-7 py-3.5 text-sm font-semibold hover:bg-cream transition-colors"
                style={{ borderBottom: '3px solid #B5935A' }}
              >
                Continue →
              </button>
            </div>
          </div>
        )}

        {/* Questionnaire — one question at a time */}
        {step === 'questionnaire' && !domainTransition && currentQuestion && (
          <div>
            {isLastQuestion && (
              <p className="text-xs font-semibold text-gold uppercase tracking-widest mb-3">Last question</p>
            )}
            <div className="bg-white border border-cream-dark p-6 sm:p-8 mb-5">
              <p className="text-navy font-semibold text-lg leading-snug mb-5">{currentQuestion.text}</p>
              {currentQuestion.annotation && (
                <p className="text-xs text-gold bg-gold/10 px-3 py-2 mb-5 leading-relaxed">
                  {currentQuestion.annotation}
                </p>
              )}
              <div className="space-y-2">
                {currentQuestion.options.map((option) => {
                  const selected = answers[currentQuestion.id] === option.value
                  return (
                    <button
                      key={option.value}
                      onClick={() => handleAnswer(currentQuestion.id, option.value)}
                      className={`w-full text-left px-4 py-4 border text-base transition-all ${
                        selected
                          ? 'border-navy bg-navy text-white'
                          : 'border-cream-dark bg-white text-slate-mid hover:border-navy/40 hover:text-navy'
                      }`}
                    >
                      {option.label}
                    </button>
                  )
                })}
              </div>
            </div>
            {questionIndex > 0 && (
              <button
                onClick={handleBack}
                className="text-sm text-slate-mid hover:text-navy transition-colors"
              >
                ← Back
              </button>
            )}
          </div>
        )}

        {/* Tier preview — the conversion moment */}
        {step === 'preview' && (
          <div>
            <div className={`overflow-hidden mb-6 ${previewTheme.bg}`}>
              <div className="px-8 py-10 flex items-start justify-between gap-6">
                <div className="flex-1">
                  <p className={`text-xs font-semibold uppercase tracking-widest mb-3 ${previewTheme.sub}`}>
                    Your Assessment Result
                  </p>
                  <h2
                    style={{ fontFamily: 'var(--font-playfair)', lineHeight: 1.1 }}
                    className={`text-4xl sm:text-5xl font-bold mb-4 ${previewTheme.text}`}
                  >
                    Tier {tier} — {TIER_LABELS[tier]}
                  </h2>
                  <p className={`text-base leading-relaxed mb-6 ${previewTheme.sub}`}>
                    Based on your responses across all 7 domains, your estate planning
                    readiness has been scored at{' '}
                    <strong className={previewTheme.text}>{score} out of 100</strong>.
                  </p>
                  <div className="bg-black/15 px-5 py-5">
                    <p className={`text-xs font-semibold uppercase tracking-widest mb-3 ${previewTheme.sub}`}>
                      Your full report includes
                    </p>
                    <div className="space-y-2">
                      {[
                        'Complete scoring narrative',
                        'Priority action plan — 5 specific steps',
                        'Domain-by-domain findings',
                        'Attorney discussion guide',
                      ].map((item, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <span
                            className="text-xs font-bold tabular-nums shrink-0 mt-0.5"
                            style={{ color: previewTheme.ring }}
                          >
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <p className={`text-sm leading-snug ${previewTheme.sub}`}>{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="shrink-0 hidden sm:block">
                  <ScoreRing score={score} color={previewTheme.ring} />
                </div>
              </div>
              <div className="bg-black/10 px-8 py-3">
                <p className={`text-xs ${previewTheme.sub}`}>
                  Delivered securely to your inbox · Valid for one year
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
              <button
                onClick={handleBack}
                className="text-sm text-slate-mid hover:text-navy transition-colors order-2 sm:order-1"
              >
                ← Review answers
              </button>
              <button
                onClick={() => { setStep('email'); scrollTop() }}
                className="w-full sm:w-auto bg-navy text-white px-8 py-4 text-base font-semibold hover:bg-navy-light transition-colors order-1 sm:order-2"
                style={{ borderBottom: '3px solid #B5935A' }}
              >
                Get My Full Report — $21 →
              </button>
            </div>
          </div>
        )}

        {/* Email + payment */}
        {step === 'email' && (
          <div>
            <h2 style={{ fontFamily: 'var(--font-playfair)', lineHeight: 1.15 }} className="text-3xl font-bold text-navy mb-1">
              Almost done.
            </h2>
            <p className="text-sm text-slate-mid mb-6 leading-relaxed">
              Enter your email to receive your report. After payment, we will send a secure
              link — accessible for one year.
            </p>

            <div className="mb-5">
              <label htmlFor="email" className="block text-sm font-medium text-navy mb-1.5">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); if (emailError) setEmailError('') }}
                placeholder="you@example.com"
                className={`w-full border px-4 py-3 text-base text-navy placeholder-slate-mid/50 focus:outline-none bg-white transition-colors ${
                  emailError
                    ? 'border-[#7A2840] focus:border-[#7A2840] bg-[#FDF2F4]'
                    : 'border-cream-dark focus:border-navy'
                }`}
              />
              {emailError && (
                <p className="text-xs font-medium text-[#7A2840] mt-1.5 flex items-center gap-1.5">
                  <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5 shrink-0">
                    <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm0 3.5a.75.75 0 01.75.75v3a.75.75 0 01-1.5 0v-3A.75.75 0 018 4.5zm0 6.5a.875.875 0 110-1.75.875.875 0 010 1.75z"/>
                  </svg>
                  {emailError}
                </p>
              )}
            </div>

            <p className="text-xs text-slate-mid mb-6 leading-relaxed">
              After payment, we generate your report and send a secure link to your inbox.
              You can access it any time for one year.
            </p>

            {error && <p className="text-xs text-tier-4 mb-4">{error}</p>}

            <div className="flex flex-wrap gap-x-5 gap-y-2 mb-6">
              {['Payment secured by Stripe', 'Data never sold or shared', 'One-time · No subscription'].map((t) => (
                <span key={t} className="flex items-center gap-1.5 text-xs text-slate-mid">
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: '#B5935A' }} />
                  {t}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-5 border-t border-cream-dark">
              <button
                onClick={handleBack}
                className="text-sm text-slate-mid hover:text-navy transition-colors order-2 sm:order-1"
              >
                ← Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`w-full sm:w-auto px-8 py-4 text-base font-semibold transition-all order-1 sm:order-2 ${
                  !isSubmitting
                    ? 'bg-navy text-white hover:bg-navy-light'
                    : 'bg-cream-dark text-slate-mid cursor-not-allowed'
                }`}
                style={!isSubmitting ? { borderBottom: '3px solid #B5935A' } : undefined}
              >
                {isSubmitting ? 'Redirecting to payment…' : 'Pay $21 & Get My Report →'}
              </button>
            </div>

            <p className="text-xs text-slate-mid text-center mt-4">
              Payments processed securely by Stripe · EstateReady does not store card details
            </p>
          </div>
        )}

      </div>
    </div>
  )
}
