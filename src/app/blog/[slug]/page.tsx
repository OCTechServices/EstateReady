import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import CompassMark from '@/components/CompassMark'
import { getArticle, getAllSlugs } from '@/lib/blog'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) return {}
  return {
    title: `${article.title} — Will & Estate Ready`,
    description: article.description,
  }
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) return notFound()

  const publishedDate = new Date(article.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  })

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: article.title,
        description: article.description,
        datePublished: article.publishedAt,
        dateModified: article.publishedAt,
        author: {
          '@type': 'Organization',
          name: 'Will & Estate Ready',
          url: 'https://willestateready.com',
        },
        publisher: {
          '@type': 'Organization',
          name: 'Will & Estate Ready',
          url: 'https://willestateready.com',
        },
        url: `https://willestateready.com/blog/${article.slug}`,
      },
      ...(article.faq && article.faq.length > 0
        ? [{
            '@type': 'FAQPage',
            mainEntity: article.faq.map(({ q, a }) => ({
              '@type': 'Question',
              name: q,
              acceptedAnswer: { '@type': 'Answer', text: a },
            })),
          }]
        : []),
    ],
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAF8F2' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

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

      <article className="max-w-3xl mx-auto px-6 py-12">

        {/* Breadcrumb */}
        <p className="text-xs text-slate-mid mb-8">
          <Link href="/blog" className="hover:text-navy transition-colors">Guides</Link>
          <span className="mx-2 text-slate-mid/40">›</span>
          <span>{article.title}</span>
        </p>

        {/* Header */}
        <header className="mb-10">
          <h1
            style={{ fontFamily: 'var(--font-playfair)', lineHeight: 1.15 }}
            className="text-4xl sm:text-5xl font-bold text-navy mb-5"
          >
            {article.title}
          </h1>
          <p className="text-lg text-slate-mid leading-relaxed mb-6" style={{ maxWidth: '54ch' }}>
            {article.description}
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-mid border-t border-cream-dark pt-4">
            <span>{publishedDate}</span>
            <span className="text-slate-mid/30">·</span>
            <span>{article.readTime}</span>
            <span className="text-slate-mid/30">·</span>
            <span>Will &amp; Estate Ready</span>
          </div>
        </header>

        {/* Article body */}
        <div
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* FAQ section */}
        {article.faq && article.faq.length > 0 && (
          <section className="mt-12 border-t border-cream-dark pt-10">
            <h2 style={{ fontFamily: 'var(--font-playfair)' }} className="text-2xl font-bold text-navy mb-6">
              Frequently asked questions
            </h2>
            <div className="space-y-6">
              {article.faq.map(({ q, a }) => (
                <div key={q}>
                  <h3 className="text-base font-semibold text-navy mb-2">{q}</h3>
                  <p className="text-sm text-slate-mid leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Footer disclaimer */}
        <p className="text-xs text-slate-mid/60 mt-12 pt-6 border-t border-cream-dark">
          Will &amp; Estate Ready is not a law firm and does not provide legal advice. This article is for educational and informational purposes only. Consult a licensed estate planning attorney for guidance specific to your situation.
        </p>
      </article>

      <footer className="bg-navy-dark mt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
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
