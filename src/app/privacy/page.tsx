import Link from 'next/link'

export const metadata = {
  title: 'Privacy Policy — EstateReady',
  description: 'How EstateReady collects, uses, and protects your information.',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-cream">
      <header className="bg-white border-b border-cream-dark">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" style={{ fontFamily: 'var(--font-playfair)' }} className="text-xl font-bold text-navy hover:text-navy-light transition-colors">
            EstateReady
          </Link>
          <Link href="/" className="text-sm text-slate-mid hover:text-navy transition-colors">
            ← Back to home
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-16">
        <p className="text-xs font-semibold text-gold uppercase tracking-widest mb-4">Legal</p>
        <h1 style={{ fontFamily: 'var(--font-playfair)' }} className="text-4xl font-bold text-navy mb-2">
          Privacy Policy
        </h1>
        <p className="text-sm text-slate-mid mb-12">Last updated: May 2026</p>

        <div className="space-y-10 text-navy/80 leading-relaxed">

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-navy">What we collect</h2>
            <p>
              When you use EstateReady, we collect the following information:
            </p>
            <ul className="list-disc list-outside ml-5 space-y-1.5 text-sm">
              <li><strong className="text-navy">Email address</strong> — used to deliver your report access link. We do not create user accounts; your email is the sole identifier tied to your submission.</li>
              <li><strong className="text-navy">Questionnaire responses</strong> — the answers you provide across 40 questions in 7 domains. These are used to generate your assessment report.</li>
              <li><strong className="text-navy">Payment information</strong> — processed entirely by Stripe. We do not store card numbers or payment credentials.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-navy">How we use your information</h2>
            <ul className="list-disc list-outside ml-5 space-y-1.5 text-sm">
              <li>To generate your scored estate planning assessment report.</li>
              <li>To send you a one-time magic link via email so you can access your report.</li>
              <li>To process your $21 payment securely through Stripe.</li>
            </ul>
            <p className="text-sm">
              We do not use your information for marketing, profiling, or any purpose beyond delivering the service you paid for.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-navy">Third-party services</h2>
            <p className="text-sm">EstateReady uses the following third-party services to operate:</p>
            <ul className="list-disc list-outside ml-5 space-y-1.5 text-sm">
              <li><strong className="text-navy">Stripe</strong> — payment processing. Your payment data is governed by <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:text-navy transition-colors">Stripe&apos;s Privacy Policy</a>.</li>
              <li><strong className="text-navy">Supabase</strong> — secure database storage of your submission and report data.</li>
              <li><strong className="text-navy">Resend</strong> — transactional email delivery of your report access link.</li>
              <li><strong className="text-navy">Anthropic (Claude)</strong> — AI-generated narrative content within your report. Your questionnaire responses are transmitted to Anthropic&apos;s API to generate report text.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-navy">Data retention</h2>
            <p className="text-sm">
              Your report access link is valid for one year. Your submission data is retained to allow re-access to your report during that period. We do not retain data beyond what is necessary to provide the service.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-navy">We do not sell your data</h2>
            <p className="text-sm">
              We do not sell, rent, or share your personal information with third parties for advertising or commercial purposes. Full stop.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-navy">Your rights</h2>
            <p className="text-sm">
              You may request deletion of your data at any time by emailing <a href="mailto:support@opcoretech.com" className="underline hover:text-navy transition-colors">support@opcoretech.com</a>. We will remove your submission, questionnaire responses, and report from our systems within 30 days.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-navy">Contact</h2>
            <p className="text-sm">
              Questions about this policy? Email us at <a href="mailto:support@opcoretech.com" className="underline hover:text-navy transition-colors">support@opcoretech.com</a>.
            </p>
          </section>

        </div>
      </main>

      <footer className="border-t border-cream-dark px-6 py-6 mt-8">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-mid">
          <span>Not a law firm · Not legal advice · For informational purposes only</span>
          <div className="flex gap-4">
            <Link href="/disclaimer" className="hover:text-navy transition-colors">Disclaimer</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
