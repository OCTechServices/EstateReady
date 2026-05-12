import { Resend } from 'resend'

let _resend: Resend | null = null

function getResend(): Resend {
  if (!_resend) {
    if (!process.env.RESEND_API_KEY) throw new Error('RESEND_API_KEY is not set')
    _resend = new Resend(process.env.RESEND_API_KEY)
  }
  return _resend
}

export async function sendMagicLink(email: string, token: string): Promise<void> {
  const url = `${process.env.NEXT_PUBLIC_URL}/report/${token}`

  await getResend().emails.send({
    from: 'EstateReady <reports@estateready.com>',
    to: email,
    subject: 'Your EstateReady Report is Ready',
    html: `
      <!DOCTYPE html>
      <html>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f9fafb; margin: 0; padding: 40px 20px;">
          <div style="max-width: 560px; margin: 0 auto; background: white; border-radius: 12px; padding: 40px; border: 1px solid #e5e7eb;">
            <p style="font-size: 18px; font-weight: 600; color: #111827; margin: 0 0 8px;">Your report is ready.</p>
            <p style="font-size: 14px; color: #6b7280; margin: 0 0 32px; line-height: 1.6;">
              Your EstateReady assessment has been scored and your recommendation packet is waiting for you.
            </p>
            <a href="${url}" style="display: inline-block; background: #111827; color: white; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-size: 14px; font-weight: 500;">
              View My Report →
            </a>
            <p style="font-size: 12px; color: #9ca3af; margin: 32px 0 0; line-height: 1.6;">
              This link is unique to you and valid for one year. Do not share it.<br />
              If you did not request this report, you can safely ignore this email.
            </p>
            <hr style="border: none; border-top: 1px solid #f3f4f6; margin: 24px 0;" />
            <p style="font-size: 11px; color: #d1d5db; margin: 0;">
              EstateReady is not a law firm and does not provide legal advice.
              This report is for informational purposes only.
            </p>
          </div>
        </body>
      </html>
    `,
  })
}
