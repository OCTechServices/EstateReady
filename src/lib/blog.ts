export interface BlogArticle {
  slug: string
  title: string
  description: string
  publishedAt: string // ISO date string
  readTime: string
  content: string // HTML string
  faq?: { q: string; a: string }[]
}

// Registry — import each article and add to this array.
// Order determines listing order on /blog.
import { article as whatHappensWithoutWill } from '@/content/blog/what-happens-if-you-die-without-a-will'
import { article as estateChecklist } from '@/content/blog/estate-planning-checklist'
import { article as powerOfAttorney } from '@/content/blog/what-is-a-power-of-attorney'
import { article as guardianForChildren } from '@/content/blog/how-to-name-a-guardian-for-your-children'
import { article as livingTrustVsWill } from '@/content/blog/living-trust-vs-will'
import { article as beneficiaryMistakes } from '@/content/blog/beneficiary-designation-mistakes'
import { article as healthcareDirective } from '@/content/blog/what-is-a-healthcare-directive'
import { article as estateplanningCost } from '@/content/blog/how-much-does-estate-planning-cost'

export const ARTICLES: BlogArticle[] = [
  whatHappensWithoutWill,
  estateChecklist,
  powerOfAttorney,
  guardianForChildren,
  livingTrustVsWill,
  beneficiaryMistakes,
  healthcareDirective,
  estateplanningCost,
]

export function getArticle(slug: string): BlogArticle | undefined {
  return ARTICLES.find((a) => a.slug === slug)
}

export function getAllSlugs(): string[] {
  return ARTICLES.map((a) => a.slug)
}
