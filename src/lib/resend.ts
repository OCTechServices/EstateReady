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
    from: process.env.RESEND_FROM_EMAIL ?? 'Will & Estate Ready <reports@opcoretech.com>',
    to: email,
    subject: 'Your Estate Readiness Report is Ready',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 40px 20px; background: #FAF8F2; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
          <div style="max-width: 560px; margin: 0 auto;">

            <!-- Header -->
            <div style="background: #1A4A2E; padding: 20px 32px; border-bottom: 3px solid #B5935A;">
              <span style="font-family: Georgia, 'Times New Roman', serif; color: white; font-size: 17px; font-weight: 700; letter-spacing: -0.02em;">
                Will &amp; Estate Ready
              </span>
            </div>

            <!-- Body -->
            <div style="background: white; border: 1px solid #EDE9DC; border-top: none; padding: 40px 32px;">

              <p style="font-size: 11px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #9DA8A0; margin: 0 0 20px;">
                Assessment Report
              </p>

              <p style="font-family: Georgia, 'Times New Roman', serif; font-size: 26px; font-weight: 700; color: #1A4A2E; margin: 0 0 16px; line-height: 1.2;">
                Your estate readiness report is ready.
              </p>

              <p style="font-size: 15px; color: #6B7280; margin: 0 0 32px; line-height: 1.7;">
                Your assessment has been scored across 7 estate planning areas. Your personalized readiness report — including priority action items and domain findings — is ready to view.
              </p>

              <a href="${url}" style="display: inline-block; background: #1A4A2E; color: white; text-decoration: none; padding: 14px 28px; font-size: 14px; font-weight: 600; border-bottom: 3px solid #B5935A;">
                View My Report →
              </a>

              <div style="border-top: 1px solid #EDE9DC; margin: 40px 0 0; padding-top: 24px;">
                <p style="font-size: 12px; color: #9CA3AF; margin: 0 0 8px; line-height: 1.6;">
                  This link is unique to you and valid for one year. Do not share it.<br>
                  If you did not request this report, you can safely ignore this email.
                </p>
                <p style="font-size: 11px; color: #D1D5DB; margin: 0; line-height: 1.6;">
                  Will &amp; Estate Ready is not a law firm and does not provide legal advice.
                  This report is for educational and informational purposes only.
                </p>
              </div>

            </div>

          </div>
        </body>
      </html>
    `,
  })
}
