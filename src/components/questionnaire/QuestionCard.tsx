import { useEffect, useRef } from 'react'
import { Question } from '@/types/questionnaire'

interface QuestionCardProps {
  question: Question
  selectedValue: string | undefined
  onSelect: (questionId: string, value: string) => void
  isNext: boolean // true if this is the next unanswered question
}

export default function QuestionCard({ question, selectedValue, onSelect, isNext }: QuestionCardProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isNext && !selectedValue && ref.current) {
      setTimeout(() => {
        ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }, 300)
    }
  }, [isNext, selectedValue])

  return (
    <div
      ref={ref}
      id={`question-${question.id}`}
      className={`mb-6 rounded-2xl border p-5 transition-all duration-300 ${
        isNext && !selectedValue
          ? 'border-navy/30 bg-white shadow-sm'
          : selectedValue
          ? 'border-cream-dark bg-cream'
          : 'border-cream-dark bg-white opacity-60'
      }`}
    >
      <p className="text-navy font-medium mb-1 leading-snug text-sm">{question.text}</p>
      {question.annotation && (
        <p className="text-xs text-gold bg-gold/10 rounded-lg px-3 py-2 mb-3 leading-relaxed">
          {question.annotation}
        </p>
      )}
      <div className="space-y-2 mt-3">
        {question.options.map((option) => {
          const selected = selectedValue === option.value
          return (
            <button
              key={option.value}
              onClick={() => onSelect(question.id, option.value)}
              className={`w-full text-left px-4 py-2.5 rounded-lg border text-sm transition-all ${
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
  )
}
