import Link from 'next/link'
import HeroRibbons from '@/components/HeroRibbons'

export default function CheckoutSuccessPage() {
  return (
    <main className="min-h-screen bg-white flex flex-col relative overflow-hidden">
      <HeroRibbons />

      <header className="border-b border-cream-dark px-6 py-4 relative z-10">
        <div className="max-w-3xl mx-auto">
          <Link href="/" style={{ fontFamily: 'var(--font-playfair)' }} className="text-lg font-bold text-navy hover:text-navy-light transition-colors">
            EstateReady
          </Link>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center px-6 relative z-10">
        <div className="max-w-md text-center">

          <div className="w-12 h-12 bg-navy/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-6 h-6 text-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <p className="text-xs font-semibold text-gold uppercase tracking-widest mb-3">Payment received</p>
          <h1 style={{ fontFamily: 'var(--font-playfair)' }} className="text-3xl font-bold text-navy mb-3 leading-snug">
            Your report is being generated.
          </h1>
          <p className="text-slate-mid text-sm leading-relaxed mb-8">
            We are scoring your responses and generating your recommendation packet.
            This takes about 30 seconds. A secure link to your report will arrive
            in your inbox shortly.
          </p>

          <div className="bg-cream border border-cream-dark rounded-2xl p-6 text-left mb-8">
            <p className="text-xs font-semibold text-slate-mid uppercase tracking-widest mb-4">What to expect</p>
            <div className="space-y-3">
              {[
                'Your report link is unique to you and valid for one year',
                'Check your spam folder if it does not arrive within 2 minutes',
                'Print or save your report before your attorney meeting',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 mt-1.5" />
                  <p className="text-xs text-slate-mid leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <p className="text-xs text-slate-mid">
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
