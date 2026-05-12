import { NextRequest, NextResponse, after } from 'next/server'
import { getStripe } from '@/lib/stripe'
import { getSupabaseAdmin } from '@/lib/supabase'
import { generateReport } from '@/lib/report'
import { sendMagicLink } from '@/lib/resend'

async function processReport(submissionId: string, email: string) {
  const db = getSupabaseAdmin()

  // Guard against duplicate processing
  const { data: existing } = await db
    .from('reports')
    .select('id')
    .eq('submission_id', submissionId)
    .single()

  if (existing) {
    console.log('Report already exists for submission:', submissionId)
    return
  }

  const { data: response, error: fetchError } = await db
    .from('questionnaire_responses')
    .select('answers')
    .eq('submission_id', submissionId)
    .single()

  if (fetchError || !response) {
    console.error('Failed to fetch questionnaire response:', fetchError)
    return
  }

  let reportData
  try {
    reportData = await generateReport(response.answers)
  } catch (err) {
    console.error('Report generation failed:', err)
    await db.from('submissions').update({ status: 'paid' }).eq('id', submissionId)
    return
  }

  const { error: reportError } = await db.from('reports').insert({
    submission_id: submissionId,
    score: reportData.score,
    tier: reportData.tier,
    recommendations: reportData.recommendations,
  })

  if (reportError) {
    console.error('Failed to save report:', reportError)
    return
  }

  const { data: submission } = await db
    .from('submissions')
    .select('access_token')
    .eq('id', submissionId)
    .single()

  if (!submission?.access_token) {
    console.error('Failed to fetch access token for submission:', submissionId)
    return
  }

  try {
    await sendMagicLink(email, submission.access_token)
  } catch (err) {
    console.error('Failed to send magic link:', err)
  }

  await db.from('submissions').update({ status: 'complete' }).eq('id', submissionId)
  console.log('Report complete for submission:', submissionId)
}

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')

  if (!sig) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 })
  }

  let event
  try {
    event = getStripe().webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('Webhook signature verification failed:', message)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type !== 'checkout.session.completed') {
    return NextResponse.json({ received: true })
  }

  const session = event.data.object
  const submissionId = session.metadata?.submission_id
  const email = session.customer_email

  if (!submissionId || !email) {
    console.error('Missing submission_id or email in session metadata')
    return NextResponse.json({ error: 'Missing metadata' }, { status: 400 })
  }

  const db = getSupabaseAdmin()

  const { error: updateError } = await db
    .from('submissions')
    .update({
      status: 'processing',
      stripe_session_id: session.id,
      paid_at: new Date().toISOString(),
    })
    .eq('id', submissionId)

  if (updateError) {
    console.error('Failed to update submission:', updateError)
    return NextResponse.json({ error: 'DB update failed' }, { status: 500 })
  }

  // Respond to Stripe immediately — process report in background
  after(async () => {
    await processReport(submissionId, email)
  })

  return NextResponse.json({ received: true })
}
