import Link from 'next/link'

export default function CheckoutSuccessPage() {
  return (
    <main className="min-h-screen bg-cream flex flex-col">

      <header className="bg-white border-b border-cream-dark px-6 py-4">
        <div className="max-w-3xl mx-auto">
          <Link href="/" style={{ fontFamily: 'var(--font-playfair)' }} className="text-lg font-bold text-navy hover:text-navy-light transition-colors">
            Will &amp; Estate Ready
          </Link>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="max-w-md w-full">

          <div className="w-12 h-12 bg-navy flex items-center justify-center mx-auto mb-6">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <p className="text-xs font-semibold text-gold uppercase tracking-widest mb-3 text-center">Payment received</p>
          <h1 style={{ fontFamily: 'var(--font-playfair)' }} className="text-4xl sm:text-5xl font-bold text-navy mb-4 leading-snug text-center">
            Your report is being generated.
          </h1>
          <p className="text-slate-mid text-base leading-relaxed mb-8 text-center">
            We are scoring your responses and generating your recommendation packet.
            This takes about 30 seconds. A secure link to your report will arrive
            in your inbox shortly.
          </p>

          <div className="bg-white border border-cream-dark p-6 mb-8">
            <p className="text-xs font-semibold text-slate-mid uppercase tracking-widest mb-4">What to expect</p>
            <div className="space-y-4">
              {[
                'Your report link is unique to you and valid for one year',
                'Check your spam folder if it does not arrive within 2 minutes',
                'Print or save your report before your attorney meeting',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 shrink-0 mt-2" style={{ backgroundColor: '#B5935A' }} />
                  <p className="text-sm text-slate-mid leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <p className="text-sm text-slate-mid text-center">
            Questions? Contact us at{' '}
            <a href="mailto:support@opcoretech.com" className="text-gold hover:text-navy transition-colors underline underline-offset-2">
              support@opcoretech.com
            </a>
          </p>
        </div>
      </div>
    </main>
  )
}
