'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { DOMAIN_ORDER, QUESTIONS_BY_DOMAIN, DOMAIN_LABELS, Answers, TIER_LABELS, Tier, Domain } from '@/types/questionnaire'
import { calculateScore } from '@/lib/scoring'
import ProgressBar from '@/components/questionnaire/ProgressBar'
import ScoreRing from '@/components/ScoreRing'
import WaveLines from '@/components/WaveLines'
import HeroRibbons from '@/components/HeroRibbons'

type Step = 'questionnaire' | 'preview' | 'email'

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
  const [step, setStep] = useState<Step>('questionnaire')
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
    const id = setTimeout(() => setDomainTransition(null), 3700)
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
      <div className="sticky top-0 z-10 bg-white border-b border-cream-dark shadow-sm relative">
        <div className="absolute right-0 top-0 bottom-0 w-2/5 overflow-hidden pointer-events-none" aria-hidden="true">
          <HeroRibbons />
        </div>
        <div className="max-w-2xl mx-auto px-6 pt-4 pb-4 relative z-10">
          <div className="flex items-center justify-between mb-4">
            <Link href="/" style={{ fontFamily: 'var(--font-playfair)' }} className="text-xl font-bold text-navy hover:text-navy-light transition-colors">
              EstateReady
            </Link>
            <span className="text-xs text-slate-mid">Estate Planning Assessment</span>
          </div>
          <ProgressBar
            currentQuestion={step === 'preview' || step === 'email' ? totalQuestions : questionIndex}
            totalQuestions={totalQuestions}
            domain={step === 'questionnaire' ? (currentQuestion?.domain ?? null) : null}
          />
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-10">

        {/* Domain transition card */}
        {step === 'questionnaire' && domainTransition && (
          <div className="rounded-2xl overflow-hidden bg-navy-dark relative">
            <WaveLines />
            <div className="relative z-10 px-8 py-12 text-center">
              <p className="text-[10px] font-bold text-gold uppercase tracking-widest mb-5">
                Domain {domainTransition.n} of {DOMAIN_ORDER.length}
              </p>
              <div className="flex justify-center gap-1.5 mb-6">
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
              <h2 style={{ fontFamily: 'var(--font-playfair)' }} className="text-2xl font-bold text-white mb-2">
                {DOMAIN_LABELS[domainTransition.domain]}
              </h2>
              <p className="text-white/50 text-sm mb-8">
                {domainTransition.count} questions in this section
              </p>
              <button
                onClick={() => setDomainTransition(null)}
                className="bg-white text-navy px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-cream transition-colors"
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
            <div className="bg-white rounded-2xl border border-cream-dark p-6 mb-5">
              <p className="text-navy font-semibold text-base leading-snug mb-4">{currentQuestion.text}</p>
              {currentQuestion.annotation && (
                <p className="text-xs text-gold bg-gold/10 rounded-lg px-3 py-2 mb-4 leading-relaxed">
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
                      className={`w-full text-left px-4 py-3 rounded-lg border text-sm transition-all ${
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
            <div className={`rounded-2xl overflow-hidden mb-6 ${previewTheme.bg} relative`}>
              <WaveLines />
              <div className="px-8 py-8 flex items-start justify-between gap-6 relative z-10">
                <div className="flex-1">
                <p className={`text-xs font-semibold uppercase tracking-widest mb-1 ${previewTheme.sub}`}>
                  Your Assessment Result
                </p>
                <h2 style={{ fontFamily: 'var(--font-playfair)' }} className={`text-3xl font-bold mb-2 ${previewTheme.text}`}>
                  Tier {tier} — {TIER_LABELS[tier]}
                </h2>
                <p className={`text-sm leading-relaxed mb-4 ${previewTheme.sub}`}>
                  Based on your responses across all 7 domains, your estate planning readiness
                  has been scored at <strong className={previewTheme.text}>{score} out of 100</strong>.
                </p>
                <div className={`rounded-xl bg-black/15 px-5 py-4 text-sm ${previewTheme.text}`}>
                  <p className="font-semibold mb-2">Your full report includes:</p>
                  <ul className="space-y-1 text-sm">
                    <li className={previewTheme.sub}>✓ Complete scoring narrative</li>
                    <li className={previewTheme.sub}>✓ Priority action plan (5 specific steps)</li>
                    <li className={previewTheme.sub}>✓ Domain-by-domain findings</li>
                    <li className={previewTheme.sub}>✓ Attorney discussion guide</li>
                  </ul>
                </div>
                </div>
                <div className="shrink-0 hidden sm:block">
                  <ScoreRing score={score} color={previewTheme.ring} />
                </div>
              </div>
              <div className="bg-black/10 px-8 py-3 relative z-10">
                <p className={`text-xs ${previewTheme.sub}`}>
                  Delivered securely to your inbox · Valid for one year
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-cream-dark p-6 mb-6">
              <p className="text-sm text-slate-mid leading-relaxed">
                Your assessment is complete. To receive your full EstateReady Report — including
                your complete scoring narrative, priority action plan, and attorney discussion
                guide — enter your email and complete a one-time $21 payment.
              </p>
            </div>

            <div className="flex items-center justify-between">
              <button
                onClick={handleBack}
                className="text-sm text-slate-mid hover:text-navy transition-colors"
              >
                ← Review answers
              </button>
              <button
                onClick={() => { setStep('email'); scrollTop() }}
                className="bg-navy text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-navy-light transition-colors"
              >
                Get My Full Report — $21 →
              </button>
            </div>
          </div>
        )}

        {/* Email + payment */}
        {step === 'email' && (
          <div>
            <h2 style={{ fontFamily: 'var(--font-playfair)' }} className="text-2xl font-bold text-navy mb-1">
              Almost done
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
                className={`w-full border rounded-lg px-4 py-3 text-sm text-navy placeholder-slate-mid/50 focus:outline-none bg-white transition-colors ${
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

            <div className="bg-white rounded-xl border border-cream-dark p-4 mb-6">
              <p className="font-medium text-navy text-sm mb-2">What happens next</p>
              <ol className="space-y-1 list-decimal list-inside text-xs text-slate-mid leading-relaxed">
                <li>You pay $21 via Stripe (secure, one-time — no subscription)</li>
                <li>We score your responses and generate your report</li>
                <li>You receive a secure link to your full report by email</li>
                <li>Access your report any time for up to one year</li>
              </ol>
            </div>

            {error && <p className="text-xs text-tier-4 mb-4">{error}</p>}

            <div className="bg-cream border border-cream-dark rounded-xl px-4 py-3 mb-5">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2.5">
                {[
                  {
                    text: 'Payment secured by Stripe',
                    icon: <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5 shrink-0 text-navy" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>,
                  },
                  {
                    text: 'Your data is never sold or shared',
                    icon: <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5 shrink-0 text-navy" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
                  },
                  {
                    text: 'One-time · No subscription',
                    icon: <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5 shrink-0 text-navy" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
                  },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-navy/10 flex items-center justify-center shrink-0">
                      {item.icon}
                    </div>
                    <span className="text-xs font-medium text-slate-mid">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-5 border-t border-cream-dark">
              <button
                onClick={handleBack}
                className="text-sm text-slate-mid hover:text-navy transition-colors"
              >
                ← Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  !isSubmitting
                    ? 'bg-navy text-white hover:bg-navy-light'
                    : 'bg-cream-dark text-slate-mid cursor-not-allowed'
                }`}
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
