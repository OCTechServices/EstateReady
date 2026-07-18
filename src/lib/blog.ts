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
// Order determines listing order (newest first).
import { article as whatHappensWithoutWill } from '@/content/blog/what-happens-if-you-die-without-a-will'

export const ARTICLES: BlogArticle[] = [
  whatHappensWithoutWill,
]

export function getArticle(slug: string): BlogArticle | undefined {
  return ARTICLES.find((a) => a.slug === slug)
}

export function getAllSlugs(): string[] {
  return ARTICLES.map((a) => a.slug)
}
