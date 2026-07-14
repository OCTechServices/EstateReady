import { DOMAIN_LABELS, DOMAIN_ORDER, Domain } from '@/types/questionnaire'

const DOMAIN_REASSURANCE: Record<Domain, string> = {
  personal_family:           'There are no wrong answers. Estimates are perfectly fine.',
  assets:                    "You don't need exact figures — broad ranges work well here.",
  existing_documents:        'Not sure if a document exists? That\'s useful information too.',
  beneficiary_designations:  'Most people haven\'t reviewed these recently. You\'re not alone.',
  insurance:                 'Answer based on what you know today — no need to dig out paperwork.',
  tax_legacy:                "You don't need to understand tax law. Just answer honestly.",
  special_circumstances:     'This section personalizes your report. Answer what feels comfortable.',
}

interface ProgressBarProps {
  currentQuestion: number
  totalQuestions: number
  domain: Domain | null
}

export default function ProgressBar({ currentQuestion, totalQuestions, domain }: ProgressBarProps) {
  const isComplete = currentQuestion >= totalQuestions
  const percent = Math.round((currentQuestion / totalQuestions) * 100)
  const label = domain ? DOMAIN_LABELS[domain] : 'Almost done'
  const reassurance = domain ? DOMAIN_REASSURANCE[domain] : null

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm font-bold text-navy" style={{ fontFamily: 'var(--font-playfair)' }}>{label}</span>
        <span className="text-xs text-slate-mid">
          {isComplete ? 'Complete' : `${currentQuestion + 1} / ${totalQuestions}`}
        </span>
      </div>
      <div className="w-full bg-cream-dark rounded-full h-1.5 mb-1.5">
        <div
          className="bg-navy h-1.5 rounded-full transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
      <div className="flex items-center gap-1.5 mt-2">
        {DOMAIN_ORDER.map((d, i) => {
          const currentIdx = domain ? DOMAIN_ORDER.indexOf(domain) : -1
          const isDone    = i < currentIdx
          const isCurrent = i === currentIdx
          return (
            <div
              key={d}
              className="rounded-full transition-all duration-300"
              style={{
                width:           isCurrent ? '14px' : '5px',
                height:          '5px',
                backgroundColor: isCurrent ? '#B5935A' : isDone ? 'rgba(181,147,90,0.45)' : '#EDE9DC',
              }}
              title={DOMAIN_LABELS[d]}
            />
          )
        })}
        {domain && (
          <span className="text-[10px] text-slate-mid ml-1">
            {DOMAIN_ORDER.indexOf(domain) + 1} of {DOMAIN_ORDER.length}
          </span>
        )}
      </div>

      {reassurance && (
        <p className="text-xs text-slate-mid mt-1.5">{reassurance}</p>
      )}
    </div>
  )
}
