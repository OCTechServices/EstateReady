import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { getStripe } from '@/lib/stripe'
import { getSupabaseAdmin } from '@/lib/supabase'
import { Answers } from '@/types/questionnaire'

const CheckoutSchema = z.object({
  email: z.string().email(),
  answers: z.record(z.string(), z.string()),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = CheckoutSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
    }

    const { email, answers } = parsed.data as { email: string; answers: Answers }

    // Diagnostic: log which Supabase project is being contacted
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'NOT SET'
    console.log('Supabase URL prefix:', supabaseUrl.slice(0, 40))

    // Create submission record
    const db = getSupabaseAdmin()

    const { data: submission, error: submissionError } = await db
      .from('submissions')
      .insert({ email, status: 'pending_payment' })
      .select('id')
      .single()

    if (submissionError || !submission) {
      console.error('Submission insert error:', submissionError)
      return NextResponse.json({ error: 'Failed to save your responses. Please try again.' }, { status: 500 })
    }

    // Save questionnaire responses
    const { error: responseError } = await db
      .from('questionnaire_responses')
      .insert({
        submission_id: submission.id,
        answers,
        completed_at: new Date().toISOString(),
      })

    if (responseError) {
      console.error('Questionnaire response insert error:', responseError)
      return NextResponse.json({ error: 'Failed to save your responses. Please try again.' }, { status: 500 })
    }

    // Create Stripe Checkout session
    const session = await getStripe().checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: email,
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID!,
          quantity: 1,
        },
      ],
      allow_promotion_codes: true,
      metadata: {
        submission_id: submission.id,
      },
      success_url: `${process.env.NEXT_PUBLIC_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/intake`,
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('Checkout error:', err)
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
