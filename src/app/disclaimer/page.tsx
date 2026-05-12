import Link from 'next/link'

export const metadata = {
  title: 'Disclaimer — EstateReady',
  description: 'EstateReady is an informational tool, not a law firm. Read our full disclaimer.',
}

export default function DisclaimerPage() {
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
          Disclaimer
        </h1>
        <p className="text-sm text-slate-mid mb-12">Last updated: May 2026</p>

        <div className="space-y-10 text-navy/80 leading-relaxed">

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-navy">Not legal advice</h2>
            <p className="text-sm">
              EstateReady is an informational assessment tool. The content, scoring, recommendations, and report generated through this service do <strong className="text-navy">not</strong> constitute legal advice and should not be relied upon as such. No attorney-client relationship is formed by using this service.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-navy">Not a law firm</h2>
            <p className="text-sm">
              EstateReady is not a law firm and is not affiliated with any law firm. We do not provide legal services, and no part of this service should be interpreted as the practice of law. Your results are for educational and organizational purposes only.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-navy">Purpose of the assessment</h2>
            <p className="text-sm">
              The EstateReady assessment is designed to help individuals understand the general complexity of their estate planning situation and identify areas that may warrant attention. It is intended to help you have a more informed, productive first conversation with a licensed estate planning attorney — not to replace that conversation.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-navy">Consult a professional</h2>
            <p className="text-sm">
              Estate planning involves legally complex decisions that vary by state, jurisdiction, family structure, and individual circumstance. We strongly encourage you to consult a licensed estate planning attorney before making any decisions based on the information provided in your report.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-navy">Accuracy and completeness</h2>
            <p className="text-sm">
              The accuracy of your assessment depends entirely on the accuracy of your responses. EstateReady makes no representations or warranties regarding the completeness, accuracy, or fitness for purpose of your results. Results may not reflect recent changes in law or your specific legal circumstances.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-navy">No guarantee of outcomes</h2>
            <p className="text-sm">
              EstateReady makes no guarantees about the outcomes of any estate planning decisions made in connection with your assessment results. Use of this service is at your own discretion and risk.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-navy">AI-generated content</h2>
            <p className="text-sm">
              Portions of your report narrative are generated using an AI language model (Anthropic Claude). While we design the prompts and structure carefully, AI-generated content may contain errors or omissions. It should be treated as a starting point for discussion, not a definitive legal assessment.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-navy">Contact</h2>
            <p className="text-sm">
              Questions? Email us at <a href="mailto:support@opcoretech.com" className="underline hover:text-navy transition-colors">support@opcoretech.com</a>.
            </p>
          </section>

        </div>
      </main>

      <footer className="border-t border-cream-dark px-6 py-6 mt-8">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-mid">
          <span>Not a law firm · Not legal advice · For informational purposes only</span>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-navy transition-colors">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
