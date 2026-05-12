import Anthropic from '@anthropic-ai/sdk'
import { QUESTIONS, Answers, TIER_LABELS, TIER_DESCRIPTIONS, Tier } from '@/types/questionnaire'
import { calculateScore } from '@/lib/scoring'

export interface DomainFinding {
  domain: string
  label: string
  finding: string
  severity: 'info' | 'caution' | 'critical'
}

export interface PriorityAction {
  action: string
  reason: string
}

export interface ReportRecommendations {
  narrative: string
  priority_actions: PriorityAction[]
  domain_findings: DomainFinding[]
}

let _anthropic: Anthropic | null = null

function getAnthropic(): Anthropic {
  if (!_anthropic) {
    if (!process.env.ANTHROPIC_API_KEY) throw new Error('ANTHROPIC_API_KEY is not set')
    _anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  }
  return _anthropic
}

function buildAnswerSummary(answers: Answers): string {
  return QUESTIONS.map((q) => {
    const answer = answers[q.id]
    if (!answer) return null
    const option = q.options.find((o) => o.value === answer)
    return `[${q.id}] ${q.text}\n  → ${option?.label ?? answer}`
  })
    .filter(Boolean)
    .join('\n\n')
}

export async function generateReport(answers: Answers): Promise<{
  score: number
  tier: Tier
  recommendations: ReportRecommendations
}> {
  const { score, tier, escalators } = calculateScore(answers)
  const tierLabel = TIER_LABELS[tier]
  const tierDescription = TIER_DESCRIPTIONS[tier]
  const answerSummary = buildAnswerSummary(answers)

  const escalatorNote =
    escalators.length > 0
      ? `\nCritical escalators triggered: ${escalators.join(', ')}. These represent situations requiring immediate attorney engagement.`
      : ''

  const prompt = `You are a senior estate planning consultant preparing a professional assessment report for a client. The client has completed a structured intake questionnaire. Based on their responses, generate a clear, empathetic, and actionable report.

ASSESSMENT RESULTS:
- Score: ${score}/100
- Tier: ${tier} — ${tierLabel}
- Tier meaning: ${tierDescription}${escalatorNote}

CLIENT RESPONSES:
${answerSummary}

Generate a JSON report with exactly this structure:
{
  "narrative": "A 2–3 paragraph professional summary of the client's estate planning situation. Acknowledge their current state honestly, explain what the tier means for them specifically, and convey the importance of taking action without being alarmist. Tone: direct, professional, empathetic. Do NOT say 'legal advice' or imply this is a substitute for an attorney.",
  "priority_actions": [
    {
      "action": "Specific action the client should take",
      "reason": "Why this matters — connect it to their specific answers"
    }
  ],
  "domain_findings": [
    {
      "domain": "domain_key",
      "label": "Human-readable domain name",
      "finding": "1–2 sentence finding for this domain based on their answers",
      "severity": "info | caution | critical"
    }
  ]
}

Rules:
- priority_actions: 3–5 items, ordered by urgency. Be specific to their answers.
- domain_findings: one entry per domain that has a notable finding. Skip domains with no gaps.
- severity: "critical" = immediate action needed, "caution" = should address soon, "info" = worth noting
- Do not use generic advice. Every sentence should connect to their actual responses.
- Return only valid JSON. No markdown, no explanation outside the JSON.`

  const message = await getAnthropic().messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 2000,
    messages: [{ role: 'user', content: prompt }],
  })

  const content = message.content[0]
  if (content.type !== 'text') throw new Error('Unexpected Claude response type')

  // Strip markdown code fences if Claude wraps the response
  const raw = content.text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim()
  const recommendations: ReportRecommendations = JSON.parse(raw)

  return { score, tier, recommendations }
}
