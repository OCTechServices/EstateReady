import { QUESTIONS, Answers, ScoringResult, Tier } from '@/types/questionnaire'

// Hard escalator rules — trigger regardless of numeric score
const ESCALATORS: { id: string; conditions: Array<{ questionId: string; value: string }> }[] = [
  {
    id: 'no_will_minor_children',
    conditions: [
      { questionId: 'ED1', value: 'none' },
      { questionId: 'PF5', value: 'minor_only' },
    ],
  },
  {
    id: 'no_will_minor_children_both',
    conditions: [
      { questionId: 'ED1', value: 'none' },
      { questionId: 'PF5', value: 'both' },
    ],
  },
  {
    id: 'minor_direct_beneficiary',
    conditions: [{ questionId: 'BD4', value: 'yes' }],
  },
  {
    id: 'special_needs_dependent',
    conditions: [{ questionId: 'PF7', value: 'yes' }],
  },
  {
    id: 'business_owner_no_trust',
    conditions: [
      { questionId: 'AS5', value: 'llc_partnership' },
      { questionId: 'ED2', value: 'none' },
    ],
  },
  {
    id: 'business_corp_no_trust',
    conditions: [
      { questionId: 'AS5', value: 'corp' },
      { questionId: 'ED2', value: 'none' },
    ],
  },
]

// Tier 3 escalators — floor score at 56 if triggered
const TIER_3_ESCALATORS: Array<{ questionId: string; value: string }[]> = [
  [{ questionId: 'PF4', value: 'no' }], // Non-citizen spouse
  [
    { questionId: 'AS2', value: 'multiple_including_out_of_state' },
    { questionId: 'ED2', value: 'none' },
  ], // Out-of-state property + no trust
  [
    { questionId: 'PF5', value: 'prior_relationship' },
    { questionId: 'ED2', value: 'none' },
  ], // Blended family + no trust
]

function matchesConditions(
  conditions: Array<{ questionId: string; value: string }>,
  answers: Answers
): boolean {
  return conditions.every((c) => answers[c.questionId] === c.value)
}

export function calculateScore(answers: Answers): ScoringResult {
  let totalGap = 0
  let totalComplexity = 0
  let maxGap = 0
  let maxComplexity = 0

  for (const question of QUESTIONS) {
    const answerValue = answers[question.id]
    if (!answerValue) continue

    const option = question.options.find((o) => o.value === answerValue)
    if (!option) continue

    totalGap += option.gapScore
    totalComplexity += option.complexityScore
    maxGap += 2
    maxComplexity += 2
  }

  // Normalize to 0–100: gap weighted 60%, complexity 40%
  const gapNorm = maxGap > 0 ? (totalGap / maxGap) * 100 : 0
  const complexityNorm = maxComplexity > 0 ? (totalComplexity / maxComplexity) * 100 : 0
  let score = Math.round(gapNorm * 0.6 + complexityNorm * 0.4)

  // Check Tier 4 hard escalators
  const triggeredEscalators: string[] = []
  for (const escalator of ESCALATORS) {
    if (matchesConditions(escalator.conditions, answers)) {
      triggeredEscalators.push(escalator.id)
    }
  }

  if (triggeredEscalators.length > 0) {
    score = Math.max(score, 76) // floor at Tier 4
  }

  // Check Tier 3 escalators
  for (const conditions of TIER_3_ESCALATORS) {
    if (matchesConditions(conditions, answers)) {
      score = Math.max(score, 56) // floor at Tier 3
      break
    }
  }

  score = Math.min(100, score)

  const tier: Tier =
    score >= 76 ? 4 :
    score >= 56 ? 3 :
    score >= 26 ? 2 : 1

  return { score, tier, escalators: triggeredEscalators }
}
