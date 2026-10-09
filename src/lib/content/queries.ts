import { cache } from 'react'
import { desc, eq } from 'drizzle-orm'
import { db } from '@/db'
import { articles, categories, media, portfolios } from '@/db/schema'
import type { ArticleRow, MediaRow, PortfolioRow } from '@/db/schema'
import { readingMinutes } from './markdown'
import { sampleArticles, samplePortfolios } from './sample-data'
import {
  PORTFOLIO_CATEGORY_LABEL,
  type ArticleItem,
  type ImageAsset,
  type PortfolioCategory,
  type PortfolioItem,
} from './types'

/**
 * Data access for the public portfolio & blog pages.
 *
 * Strategy: query Postgres directly via Drizzle. If the database is
 * unreachable or has no published documents yet, fall back to the bundled
 * sample content so the pages always render.
 */

const FALLBACK_IMAGE: ImageAsset = {
  url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80',
  alt: 'Ilustrasi proyek digital MarketingCode.ID',
  width: 1600,
  height: 900,
}

async function safeQuery<T>(run: () => Promise<T[]>): Promise<T[] | null> {
  try {
    return await run()
  } catch (error) {
    console.warn(
      '[content] Database tidak dapat diakses, menampilkan data contoh.',
      error instanceof Error ? error.message : error,
    )
    return null
  }
}

function toImage(row: MediaRow | null, fallbackAlt: string): ImageAsset | null {
  if (!row?.publicUrl) return null
  return { url: row.publicUrl, alt: row.altText || fallbackAlt }
}

function mapPortfolio(row: PortfolioRow, thumb: MediaRow | null): PortfolioItem {
  const category = (row.category as PortfolioCategory | null) ?? 'web'
  return {
    slug: row.slug,
    title: row.title,
    clientName: row.clientName || 'Klien MarketingCode.ID',
    category,
    categoryLabel: PORTFOLIO_CATEGORY_LABEL[category],
    summary: row.summary,
    thumbnail: toImage(thumb, row.title) ?? { ...FALLBACK_IMAGE, alt: row.title },
    duration: row.duration ?? undefined,
    role: row.role ?? undefined,
    liveUrl: row.liveUrl ?? undefined,
    completedDate: row.completedDate?.toISOString().slice(0, 10),
    challenge: row.challenge ?? undefined,
    solution: row.solution ?? undefined,
    results: row.results ?? [],
    techStack: row.techStack ?? [],
    content: row.content ?? null,
    testimonial: row.testimonialQuote
      ? {
          quote: row.testimonialQuote,
          name: row.testimonialName ?? undefined,
          role: row.testimonialRole ?? undefined,
        }
      : undefined,
    gallery: [],
    isFeatured: row.isFeatured,
    metaTitle: row.metaTitle ?? undefined,
    metaDescription: row.metaDescription ?? undefined,
  }
}

function mapArticle(
  row: ArticleRow,
  category: { name: string; slug: string } | null,
  cover: MediaRow | null,
): ArticleItem {
  return {
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt || '',
    category: category ?? undefined,
    coverImage: toImage(cover, row.title) ?? { ...FALLBACK_IMAGE, alt: row.title },
    content: row.content,
    tags: row.tags ?? [],
    authorName: row.authorName || 'Tim MarketingCode.ID',
    authorRole: row.authorRole ?? undefined,
    publishedAt: (row.publishedAt ?? row.createdAt).toISOString(),
    updatedAt: row.updatedAt?.toISOString(),
    readingMinutes: readingMinutes(row.content),
    metaTitle: row.metaTitle ?? undefined,
    metaDescription: row.metaDescription ?? undefined,
  }
}

/* ------------------------------------------------------------------ */
/* Public queries (deduplicated per request via React cache)           */
/* ------------------------------------------------------------------ */

export const getPortfolios = cache(async (): Promise<PortfolioItem[]> => {
  const rows = await safeQuery(() =>
    db
      .select({ portfolio: portfolios, thumbnail: media })
      .from(portfolios)
      .leftJoin(media, eq(portfolios.thumbnailId, media.id))
      .where(eq(portfolios.status, 'published'))
      .orderBy(desc(portfolios.completedDate))
      .limit(100),
  )

  if (rows && rows.length > 0) return rows.map((r) => mapPortfolio(r.portfolio, r.thumbnail))
  return samplePortfolios
})

export const getPortfolioBySlug = cache(async (slug: string): Promise<PortfolioItem | null> => {
  const all = await getPortfolios()
  return all.find((p) => p.slug === slug) ?? null
})

export const getArticles = cache(async (): Promise<ArticleItem[]> => {
  const rows = await safeQuery(() =>
    db
      .select({ article: articles, category: categories, cover: media })
      .from(articles)
      .leftJoin(categories, eq(articles.categoryId, categories.id))
      .leftJoin(media, eq(articles.coverImageId, media.id))
      .where(eq(articles.status, 'published'))
      .orderBy(desc(articles.publishedAt))
      .limit(100),
  )

  if (rows && rows.length > 0) {
    return rows.map((r) =>
      mapArticle(
        r.article,
        r.category ? { name: r.category.name, slug: r.category.slug } : null,
        r.cover,
      ),
    )
  }
  return sampleArticles
})

export const getArticleBySlug = cache(async (slug: string): Promise<ArticleItem | null> => {
  const all = await getArticles()
  return all.find((a) => a.slug === slug) ?? null
})
