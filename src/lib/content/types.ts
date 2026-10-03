import type { Article } from '@/payload-types'

/**
 * View-model types consumed by the public pages.
 * Both Payload documents and the bundled sample data are mapped into these
 * shapes, so pages never depend on where the content came from.
 */

export type RichTextData = Article['content']

export interface ImageAsset {
  url: string
  alt: string
  width?: number
  height?: number
}

export type PortfolioCategory = 'web' | 'app' | 'marketing' | 'video'

export const PORTFOLIO_CATEGORY_LABEL: Record<PortfolioCategory, string> = {
  web: 'Web Development',
  app: 'Mobile Application',
  marketing: 'Digital Marketing',
  video: 'Video Editing',
}

export interface PortfolioResult {
  value: string
  label: string
}

export interface PortfolioItem {
  slug: string
  title: string
  clientName: string
  category: PortfolioCategory
  categoryLabel: string
  summary: string
  thumbnail: ImageAsset
  duration?: string
  role?: string
  liveUrl?: string
  completedDate?: string
  challenge?: string
  solution?: string
  results: PortfolioResult[]
  techStack: string[]
  content?: RichTextData | null
  testimonial?: { quote: string; name?: string; role?: string }
  gallery: { image: ImageAsset; caption?: string }[]
  isFeatured: boolean
  metaTitle?: string
  metaDescription?: string
}

export interface ArticleCategory {
  name: string
  slug: string
}

export interface ArticleItem {
  slug: string
  title: string
  excerpt: string
  category?: ArticleCategory
  coverImage: ImageAsset
  content: RichTextData
  tags: string[]
  authorName: string
  authorRole?: string
  publishedAt: string
  updatedAt?: string
  readingMinutes: number
  metaTitle?: string
  metaDescription?: string
}

export interface TocHeading {
  id: string
  text: string
  level: 2 | 3
}
