'use client'

import { useEffect } from 'react'
import { Question, Answers, DOMAIN_LABELS, Domain } from '@/types/questionnaire'
import QuestionCard from './QuestionCard'

interface DomainStepProps {
  domain: Domain
  questions: Question[]
  answers: Answers
  onAnswer: (questionId: string, value: string) => void
  onNext: () => void
  onBack: () => void
  isFirst: boolean
  isLast: boolean
  isSubmitting: boolean
}

export default function DomainStep({
  domain,
  questions,
  answers,
  onAnswer,
  onNext,
  onBack,
  isFirst,
  isLast,
  isSubmitting,
}: DomainStepProps) {
  const firstUnansweredIndex = questions.findIndex((q) => !answers[q.id])
  const allAnswered = firstUnansweredIndex === -1

  // Auto-advance to next domain when all questions answered
  useEffect(() => {
    if (allAnswered) {
      const timeout = setTimeout(() => {
        const el = document.getElementById('domain-next-btn')
        el?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }, 400)
      return () => clearTimeout(timeout)
    }
  }, [allAnswered])

  function handleSelect(questionId: string, value: string) {
    onAnswer(questionId, value)
    // After answering, scroll to next unanswered question
    const currentIndex = questions.findIndex((q) => q.id === questionId)
    const nextQuestion = questions[currentIndex + 1]
    if (nextQuestion && !answers[nextQuestion.id]) {
      setTimeout(() => {
        document.getElementById(`question-${nextQuestion.id}`)?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        })
      }, 350)
    }
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-navy mb-1" style={{ fontFamily: 'var(--font-playfair)' }}>
        {DOMAIN_LABELS[domain]}
      </h2>
      <p className="text-xs text-slate-mid mb-6">
        {questions.length} question{questions.length !== 1 ? 's' : ''} · Select one answer per question
      </p>

      <div>
        {questions.map((question, index) => (
          <QuestionCard
            key={question.id}
            question={question}
            selectedValue={answers[question.id]}
            onSelect={handleSelect}
            isNext={index === firstUnansweredIndex || (firstUnansweredIndex === -1 && index === questions.length - 1)}
          />
        ))}
      </div>

      <div id="domain-next-btn" className="flex items-center justify-between mt-6 pt-6 border-t border-cream-dark">
        {!isFirst ? (
          <button
            onClick={onBack}
            className="text-sm text-slate-mid hover:text-navy transition-colors"
          >
            ← Back
          </button>
        ) : (
          <div />
        )}
        <button
          onClick={onNext}
          disabled={!allAnswered || isSubmitting}
          className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
            allAnswered && !isSubmitting
              ? 'bg-navy text-white hover:bg-navy-light'
              : 'bg-cream-dark text-slate-mid cursor-not-allowed'
          }`}
        >
          {isSubmitting ? 'Saving…' : isLast ? 'See My Results →' : 'Next Section →'}
        </button>
      </div>
    </div>
  )
}
