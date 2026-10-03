import { cache } from 'react'
import { getPayload, type Payload } from 'payload'
import config from '@payload-config'
import type { Article, Category, Media, Portfolio } from '@/payload-types'
import { readingMinutes } from './lexical'
import { sampleArticles, samplePortfolios } from './sample-data'
import {
  PORTFOLIO_CATEGORY_LABEL,
  type ArticleItem,
  type ImageAsset,
  type PortfolioItem,
} from './types'

/**
 * Data access for the public portfolio & blog pages.
 *
 * Strategy: query Payload via the Local API. If the database is unreachable
 * or a collection has no published documents yet, fall back to the bundled
 * sample content so the pages always render.
 */

const PAYLOAD_TIMEOUT_MS = 5000
const RETRY_BACKOFF_MS = 30_000
let payloadUnavailableUntil = 0
let warned = false

const FALLBACK_IMAGE: ImageAsset = {
  url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80',
  alt: 'Ilustrasi proyek digital MarketingCode.ID',
  width: 1600,
  height: 900,
}

async function withPayload<T>(run: (payload: Payload) => Promise<T>): Promise<T | null> {
  if (Date.now() < payloadUnavailableUntil) return null

  try {
    const payload = await Promise.race([
      getPayload({ config }),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('Payload init timeout')), PAYLOAD_TIMEOUT_MS),
      ),
    ])
    return await run(payload)
  } catch (error) {
    payloadUnavailableUntil = Date.now() + RETRY_BACKOFF_MS
    if (!warned) {
      warned = true
      console.warn(
        '[content] Payload CMS tidak dapat diakses, menampilkan data contoh.',
        error instanceof Error ? error.message : error,
      )
    }
    return null
  }
}

/* ------------------------------------------------------------------ */
/* Mappers                                                             */
/* ------------------------------------------------------------------ */

function toImage(media: number | Media | null | undefined, fallbackAlt: string): ImageAsset | null {
  if (!media || typeof media === 'number' || !media.url) return null
  return {
    url: media.url,
    alt: media.alt || fallbackAlt,
    width: media.width ?? undefined,
    height: media.height ?? undefined,
  }
}

function mapPortfolio(doc: Portfolio): PortfolioItem {
  return {
    slug: doc.slug || String(doc.id),
    title: doc.title,
    clientName: doc.clientName,
    category: doc.category,
    categoryLabel: PORTFOLIO_CATEGORY_LABEL[doc.category],
    summary: doc.summary,
    thumbnail: toImage(doc.thumbnail, doc.title) ?? { ...FALLBACK_IMAGE, alt: doc.title },
    duration: doc.duration ?? undefined,
    role: doc.role ?? undefined,
    liveUrl: doc.liveUrl ?? undefined,
    completedDate: doc.completedDate ?? undefined,
    challenge: doc.challenge ?? undefined,
    solution: doc.solution ?? undefined,
    results: (doc.results ?? []).map(({ value, label }) => ({ value, label })),
    techStack: (doc.techStack ?? []).map((t) => t.name),
    content: doc.content ?? null,
    testimonial: doc.testimonial?.quote
      ? {
          quote: doc.testimonial.quote,
          name: doc.testimonial.name ?? undefined,
          role: doc.testimonial.role ?? undefined,
        }
      : undefined,
    gallery: (doc.gallery ?? [])
      .map((g) => {
        const image = toImage(g.image, g.caption || doc.title)
        return image ? { image, caption: g.caption ?? undefined } : null
      })
      .filter((g): g is NonNullable<typeof g> => g !== null),
    isFeatured: Boolean(doc.isFeatured),
    metaTitle: doc.metaTitle ?? undefined,
    metaDescription: doc.metaDescription ?? undefined,
  }
}

function mapArticle(doc: Article): ArticleItem {
  const category =
    doc.category && typeof doc.category === 'object'
      ? { name: (doc.category as Category).name, slug: (doc.category as Category).slug || '' }
      : undefined

  return {
    slug: doc.slug || String(doc.id),
    title: doc.title,
    excerpt: doc.excerpt,
    category,
    coverImage: toImage(doc.coverImage, doc.title) ?? { ...FALLBACK_IMAGE, alt: doc.title },
    content: doc.content,
    tags: (doc.tags ?? []).map((t) => t.tag),
    authorName: doc.authorName || 'Tim MarketingCode.ID',
    authorRole: doc.authorRole ?? undefined,
    publishedAt: doc.publishedAt || doc.createdAt,
    updatedAt: doc.updatedAt,
    readingMinutes: readingMinutes(doc.content),
    metaTitle: doc.metaTitle ?? undefined,
    metaDescription: doc.metaDescription ?? undefined,
  }
}

/* ------------------------------------------------------------------ */
/* Public queries (deduplicated per request via React cache)           */
/* ------------------------------------------------------------------ */

export const getPortfolios = cache(async (): Promise<PortfolioItem[]> => {
  const docs = await withPayload(async (payload) => {
    const res = await payload.find({
      collection: 'portfolios',
      where: { status: { equals: 'published' } },
      sort: '-completedDate',
      depth: 1,
      limit: 100,
    })
    return res.docs
  })

  if (docs && docs.length > 0) return docs.map(mapPortfolio)
  return samplePortfolios
})

export const getPortfolioBySlug = cache(async (slug: string): Promise<PortfolioItem | null> => {
  const all = await getPortfolios()
  return all.find((p) => p.slug === slug) ?? null
})

export const getArticles = cache(async (): Promise<ArticleItem[]> => {
  const docs = await withPayload(async (payload) => {
    const res = await payload.find({
      collection: 'articles',
      where: { status: { equals: 'published' } },
      sort: '-publishedAt',
      depth: 1,
      limit: 100,
    })
    return res.docs
  })

  if (docs && docs.length > 0) return docs.map(mapArticle)
  return sampleArticles
})

export const getArticleBySlug = cache(async (slug: string): Promise<ArticleItem | null> => {
  const all = await getArticles()
  return all.find((a) => a.slug === slug) ?? null
})
