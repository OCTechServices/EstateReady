import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { getSupabaseAdmin } from '@/lib/supabase'
import { TIER_LABELS, Tier } from '@/types/questionnaire'
import type { ReportRecommendations } from '@/lib/report'

let _anthropic: Anthropic | null = null
function getAnthropic(): Anthropic {
  if (!_anthropic) {
    if (!process.env.ANTHROPIC_API_KEY) throw new Error('ANTHROPIC_API_KEY is not set')
    _anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  }
  return _anthropic
}

export async function POST(req: NextRequest) {
  let body: { token?: unknown; messages?: unknown } | null = null
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const { token, messages } = body ?? {}

  if (typeof token !== 'string' || !Array.isArray(messages)) {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  if (messages.length > 20) {
    return NextResponse.json(
      { error: 'Conversation limit reached. Reload the page to start a new session.' },
      { status: 429 },
    )
  }

  // Validate message shape — drop anything malformed
  const cleaned = messages.filter(
    (m): m is { role: 'user' | 'assistant'; content: string } =>
      typeof m === 'object' &&
      m !== null &&
      (m.role === 'user' || m.role === 'assistant') &&
      typeof m.content === 'string' &&
      m.content.trim().length > 0,
  )

  if (cleaned.length === 0) {
    return NextResponse.json({ error: 'No valid messages.' }, { status: 400 })
  }

  // Validate token and fetch report
  const db = getSupabaseAdmin()

  const { data: submission } = await db
    .from('submissions')
    .select('id, access_token_expires_at')
    .eq('access_token', token)
    .single()

  if (!submission) {
    return NextResponse.json({ error: 'Invalid token.' }, { status: 403 })
  }
  if (new Date(submission.access_token_expires_at) < new Date()) {
    return NextResponse.json({ error: 'This report link has expired.' }, { status: 403 })
  }

  const { data: report } = await db
    .from('reports')
    .select('score, tier, recommendations')
    .eq('submission_id', submission.id)
    .single()

  if (!report) {
    return NextResponse.json({ error: 'Report not found.' }, { status: 404 })
  }

  const tier = report.tier as Tier
  const rec = report.recommendations as ReportRecommendations

  const systemPrompt = `You are a helpful assistant for Will & Estate Ready, an estate planning readiness assessment service. A user has completed their personalized assessment and you are here to help them understand their results and take next steps.

Their assessment results:
Score: ${report.score} out of 100
Planning tier: Tier ${tier} — ${TIER_LABELS[tier]}

Assessment narrative:
${rec.narrative ?? 'Not available'}

Priority actions:
${rec.priority_actions?.map((a, i) => `${i + 1}. ${a.action}\n   Why: ${a.reason}`).join('\n') ?? 'None listed'}

Domain findings:
${rec.domain_findings?.map(f => `${f.label} (${f.severity}): ${f.finding}`).join('\n') ?? 'None listed'}

Guidelines:
- Answer questions about their specific findings clearly and in plain English — no legal jargon
- You are NOT providing legal advice. For anything requiring legal judgment, always recommend consulting a licensed estate planning attorney
- Be warm, clear, and direct — estate planning is stressful and users need clarity, not more complexity
- Keep responses concise: 2–3 short paragraphs at most
- If asked about something not covered in their report, acknowledge the limitation honestly and suggest they raise it with an attorney`

  try {
    const response = await getAnthropic().messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 512,
      system: systemPrompt,
      messages: cleaned,
    })

    const text = response.content[0]?.type === 'text' ? response.content[0].text : ''
    return NextResponse.json({ message: text })
  } catch (err) {
    console.error('report-chat error:', err)
    return NextResponse.json({ error: 'Failed to generate a response. Please try again.' }, { status: 500 })
  }
}
