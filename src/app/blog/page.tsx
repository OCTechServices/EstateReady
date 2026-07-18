import type { Metadata } from 'next'
import Link from 'next/link'
import CompassMark from '@/components/CompassMark'
import { ARTICLES } from '@/lib/blog'

export const metadata: Metadata = {
  title: 'Estate Planning Guides — Will & Estate Ready',
  description:
    'Plain-English guides on wills, trusts, powers of attorney, beneficiary designations, and estate planning. Written to help you understand what you have, what you need, and what to do next.',
}

export default function BlogIndex() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAF8F2' }}>
      <header style={{ backgroundColor: '#FAF8F2', borderBottom: '1px solid #EDE9DC' }} className="sticky top-0 z-20">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <CompassMark size={24} />
            <span style={{ fontFamily: 'var(--font-playfair)' }} className="text-base font-bold text-navy tracking-tight">Will &amp; Estate Ready</span>
          </Link>
          <Link href="/intake" className="text-sm font-semibold text-navy border border-navy px-4 py-2 hover:bg-navy hover:text-white transition-colors">
            Start Assessment
          </Link>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-12">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-mid mb-4">Estate Planning Guides</p>
        <h1 style={{ fontFamily: 'var(--font-playfair)' }} className="text-5xl font-bold text-navy mb-4 leading-tight">
          Know what you have.<br />Know what you need.
        </h1>
        <p className="text-lg text-slate-mid leading-relaxed mb-12" style={{ maxWidth: '52ch' }}>
          Plain-English guides on wills, trusts, powers of attorney, and estate planning — written to help you understand your situation before you meet an attorney.
        </p>

        <div className="space-y-px">
          {ARTICLES.map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="group flex items-start justify-between gap-6 bg-white border border-cream-dark px-6 py-6 hover:border-navy transition-colors"
            >
              <div className="flex-1">
                <p className="text-xs text-slate-mid mb-2">{article.readTime}</p>
                <h2 className="text-base font-semibold text-navy leading-snug mb-2 group-hover:underline underline-offset-2">
                  {article.title}
                </h2>
                <p className="text-sm text-slate-mid leading-relaxed line-clamp-2">{article.description}</p>
              </div>
              <span className="text-gold shrink-0 mt-1 text-lg">→</span>
            </Link>
          ))}
        </div>

        <div className="mt-12 bg-navy px-8 py-8" style={{ borderBottom: '3px solid #B5935A' }}>
          <p className="text-xs font-semibold uppercase tracking-widest text-gold-light mb-3">Ready to see where you stand?</p>
          <p style={{ fontFamily: 'var(--font-playfair)' }} className="text-2xl font-bold text-white mb-3 leading-snug">
            Get your personalized estate readiness report.
          </p>
          <p className="text-white/70 text-sm leading-relaxed mb-6">
            40 questions · 7 domains · plain-English findings and a prioritized action plan. $21, one time.
          </p>
          <Link
            href="/intake"
            className="inline-block bg-white text-navy text-sm font-semibold px-6 py-3 hover:bg-cream transition-colors"
            style={{ borderBottom: '2px solid #B5935A' }}
          >
            Start My Assessment →
          </Link>
        </div>
      </div>

      <footer className="bg-navy-dark mt-16" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="max-w-3xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p style={{ fontFamily: 'var(--font-playfair)' }} className="text-white font-semibold mb-1">Will &amp; Estate Ready</p>
            <p className="text-sm text-white/50">An estate planning readiness assessment. Not a law firm.</p>
          </div>
          <div className="flex items-center gap-6 text-sm text-white/50">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
