import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'
import { sendMagicLink } from '@/lib/resend'

export async function POST(req: NextRequest) {
  const adminSecret = process.env.ADMIN_SECRET
  if (!adminSecret) {
    return NextResponse.json({ error: 'ADMIN_SECRET not configured' }, { status: 500 })
  }

  const authHeader = req.headers.get('authorization')
  if (authHeader !== `Bearer ${adminSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json().catch(() => null)
  const submissionId = body?.submission_id
  if (!submissionId) {
    return NextResponse.json({ error: 'Missing submission_id' }, { status: 400 })
  }

  const db = getSupabaseAdmin()

  const { data: submission, error: subError } = await db
    .from('submissions')
    .select('email, access_token, status')
    .eq('id', submissionId)
    .single()

  if (subError || !submission) {
    return NextResponse.json({ error: 'Submission not found' }, { status: 404 })
  }

  const { data: report } = await db
    .from('reports')
    .select('id')
    .eq('submission_id', submissionId)
    .single()

  if (!report) {
    return NextResponse.json({ error: 'Report not ready — cannot send link yet' }, { status: 409 })
  }

  try {
    await sendMagicLink(submission.email, submission.access_token)
    return NextResponse.json({ ok: true, email: submission.email })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: `Email send failed: ${message}` }, { status: 500 })
  }
}
