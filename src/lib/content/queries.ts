import { cache } from 'react'
import { and, desc, eq, ne, sql } from 'drizzle-orm'
import { db } from '@/db'
import { articles, categories, media, portfolios } from '@/db/schema'
import type { ArticleRow, MediaRow, PortfolioRow } from '@/db/schema'
import { readingMinutes } from './markdown'
import { sampleArticles, samplePortfolios } from './sample-data'
import {
  PORTFOLIO_CATEGORY_LABEL,
  type ArticleCard,
  type ArticleItem,
  type ImageAsset,
  type PortfolioCard,
  type PortfolioCategory,
  type PortfolioItem,
  type SitemapEntry,
} from './types'

/**
 * Public content queries. Direct Postgres via Drizzle.
 *
 * Fallback policy:
 * - When `CONTENT_DEMO_MODE === '1'`, the bundled sample content is served
 *   directly and the database is never touched.
 * - Otherwise every query hits the database, empty results stay empty, and
 *   errors propagate so they surface in logs/monitoring instead of being
 *   masked by sample content.
 */

const DEMO = process.env.CONTENT_DEMO_MODE === '1'

const FALLBACK_IMAGE: ImageAsset = {
  url: '/images/placeholder.svg',
  alt: 'MarketingCode.ID',
  width: 1200,
  height: 675,
}

function toImage(row: MediaRow | null, fallbackAlt: string): ImageAsset | null {
  if (!row?.publicUrl) return null
  return {
    url: row.publicUrl,
    alt: row.altText || fallbackAlt,
    width: row.width ?? 1200,
    height: row.height ?? 675,
  }
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

function mapPortfolioCard(row: PortfolioRow, thumb: MediaRow | null): PortfolioCard {
  const category = (row.category as PortfolioCategory | null) ?? 'web'
  return {
    slug: row.slug,
    title: row.title,
    clientName: row.clientName || 'Klien MarketingCode.ID',
    category,
    categoryLabel: PORTFOLIO_CATEGORY_LABEL[category],
    summary: row.summary,
    thumbnail: toImage(thumb, row.title) ?? { ...FALLBACK_IMAGE, alt: row.title },
    completedDate: row.completedDate?.toISOString().slice(0, 10),
    headlineResult: row.results?.[0],
    techStack: row.techStack ?? [],
    isFeatured: row.isFeatured,
  }
}

function portfolioItemToCard(item: PortfolioItem): PortfolioCard {
  return {
    slug: item.slug,
    title: item.title,
    clientName: item.clientName,
    category: item.category,
    categoryLabel: item.categoryLabel,
    summary: item.summary,
    thumbnail: item.thumbnail,
    completedDate: item.completedDate,
    headlineResult: item.results[0],
    techStack: item.techStack,
    isFeatured: item.isFeatured,
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

function mapArticleCard(
  row: Pick<ArticleRow, 'slug' | 'title' | 'excerpt' | 'publishedAt' | 'updatedAt' | 'createdAt' | 'content'>,
  category: { name: string; slug: string } | null,
  cover: MediaRow | null,
): ArticleCard {
  return {
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt || '',
    category: category ?? undefined,
    coverImage: toImage(cover, row.title) ?? { ...FALLBACK_IMAGE, alt: row.title },
    publishedAt: (row.publishedAt ?? row.createdAt).toISOString(),
    updatedAt: row.updatedAt?.toISOString(),
    readingMinutes: readingMinutes(row.content),
  }
}

function articleItemToCard(item: ArticleItem): ArticleCard {
  return {
    slug: item.slug,
    title: item.title,
    excerpt: item.excerpt,
    category: item.category,
    coverImage: item.coverImage,
    publishedAt: item.publishedAt,
    updatedAt: item.updatedAt,
    readingMinutes: item.readingMinutes,
  }
}

/* ------------------------------------------------------------------ */
/* Listing (card projection, deduplicated per request via React cache) */
/* ------------------------------------------------------------------ */

export const getPortfolioCards = cache(async (limit = 100): Promise<PortfolioCard[]> => {
  if (DEMO) return samplePortfolios.slice(0, limit).map(portfolioItemToCard)
  const rows = await db
    .select({ portfolio: portfolios, thumbnail: media })
    .from(portfolios)
    .leftJoin(media, eq(portfolios.thumbnailId, media.id))
    .where(eq(portfolios.status, 'published'))
    .orderBy(desc(portfolios.completedDate))
    .limit(limit)

  return rows.map((r) => mapPortfolioCard(r.portfolio, r.thumbnail))
})

export const getArticleCards = cache(async (limit = 100): Promise<ArticleCard[]> => {
  if (DEMO) return sampleArticles.slice(0, limit).map(articleItemToCard)
  const rows = await db
    .select({
      article: {
        slug: articles.slug,
        title: articles.title,
        excerpt: articles.excerpt,
        content: articles.content,
        publishedAt: articles.publishedAt,
        updatedAt: articles.updatedAt,
        createdAt: articles.createdAt,
      },
      category: categories,
      cover: media,
    })
    .from(articles)
    .leftJoin(categories, eq(articles.categoryId, categories.id))
    .leftJoin(media, eq(articles.coverImageId, media.id))
    .where(eq(articles.status, 'published'))
    .orderBy(desc(articles.publishedAt))
    .limit(limit)

  return rows.map((r) =>
    mapArticleCard(
      r.article,
      r.category ? { name: r.category.name, slug: r.category.slug } : null,
      r.cover,
    ),
  )
})

/* ------------------------------------------------------------------ */
/* Detail (direct slug lookup — not bounded by listing limit)          */
/* ------------------------------------------------------------------ */

export const getPortfolioBySlug = cache(async (slug: string): Promise<PortfolioItem | null> => {
  if (DEMO) return samplePortfolios.find((p) => p.slug === slug) ?? null
  const rows = await db
    .select({ portfolio: portfolios, thumbnail: media })
    .from(portfolios)
    .leftJoin(media, eq(portfolios.thumbnailId, media.id))
    .where(and(eq(portfolios.slug, slug), eq(portfolios.status, 'published')))
    .limit(1)

  if (!rows[0]) return null
  return mapPortfolio(rows[0].portfolio, rows[0].thumbnail)
})

export const getArticleBySlug = cache(async (slug: string): Promise<ArticleItem | null> => {
  if (DEMO) return sampleArticles.find((a) => a.slug === slug) ?? null
  const rows = await db
    .select({ article: articles, category: categories, cover: media })
    .from(articles)
    .leftJoin(categories, eq(articles.categoryId, categories.id))
    .leftJoin(media, eq(articles.coverImageId, media.id))
    .where(and(eq(articles.slug, slug), eq(articles.status, 'published')))
    .limit(1)

  if (!rows[0]) return null
  return mapArticle(
    rows[0].article,
    rows[0].category ? { name: rows[0].category.name, slug: rows[0].category.slug } : null,
    rows[0].cover,
  )
})

/* ------------------------------------------------------------------ */
/* Related (direct, excluding current slug)                            */
/* ------------------------------------------------------------------ */

export const getRelatedPortfolios = cache(
  async (
    currentSlug: string,
    category?: PortfolioCategory,
    limit = 3,
  ): Promise<PortfolioCard[]> => {
    if (DEMO) {
      const candidates = samplePortfolios.filter((p) => p.slug !== currentSlug)
      if (!category) return candidates.slice(0, limit).map(portfolioItemToCard)
      const same = candidates.filter((p) => p.category === category)
      const diff = candidates.filter((p) => p.category !== category)
      return [...same, ...diff].slice(0, limit).map(portfolioItemToCard)
    }
    const rows = await db
      .select({ portfolio: portfolios, thumbnail: media })
      .from(portfolios)
      .leftJoin(media, eq(portfolios.thumbnailId, media.id))
      .where(and(eq(portfolios.status, 'published'), ne(portfolios.slug, currentSlug)))
      .orderBy(
        category
          ? sql`case when ${portfolios.category} = ${category} then 0 else 1 end`
          : desc(portfolios.completedDate),
        desc(portfolios.completedDate),
      )
      .limit(limit)

    return rows.map((r) => mapPortfolioCard(r.portfolio, r.thumbnail))
  },
)

export const getRelatedArticles = cache(
  async (
    currentSlug: string,
    categorySlug?: string | null,
    limit = 3,
  ): Promise<ArticleCard[]> => {
    if (DEMO) {
      const candidates = sampleArticles.filter((a) => a.slug !== currentSlug)
      if (!categorySlug) return candidates.slice(0, limit).map(articleItemToCard)
      const same = candidates.filter((a) => a.category?.slug === categorySlug)
      const diff = candidates.filter((a) => a.category?.slug !== categorySlug)
      return [...same, ...diff].slice(0, limit).map(articleItemToCard)
    }
    const rows = await db
      .select({
        article: {
          slug: articles.slug,
          title: articles.title,
          excerpt: articles.excerpt,
          content: articles.content,
          publishedAt: articles.publishedAt,
          updatedAt: articles.updatedAt,
          createdAt: articles.createdAt,
        },
        category: categories,
        cover: media,
      })
      .from(articles)
      .leftJoin(categories, eq(articles.categoryId, categories.id))
      .leftJoin(media, eq(articles.coverImageId, media.id))
      .where(and(eq(articles.status, 'published'), ne(articles.slug, currentSlug)))
      .orderBy(
        categorySlug
          ? sql`case when ${categories.slug} = ${categorySlug} then 0 else 1 end`
          : desc(articles.publishedAt),
        desc(articles.publishedAt),
      )
      .limit(limit)

    return rows.map((r) =>
      mapArticleCard(
        r.article,
        r.category ? { name: r.category.name, slug: r.category.slug } : null,
        r.cover,
      ),
    )
  },
)

/* ------------------------------------------------------------------ */
/* Static-param + sitemap enumeration (no limit, slug + lastmod only)  */
/* ------------------------------------------------------------------ */

export const getPortfolioSitemapEntries = cache(async (): Promise<SitemapEntry[]> => {
  if (DEMO) return samplePortfolios.map((p) => ({ slug: p.slug, updatedAt: p.completedDate ?? new Date().toISOString() }))
  const rows = await db
    .select({
      slug: portfolios.slug,
      updatedAt: portfolios.updatedAt,
      completedDate: portfolios.completedDate,
    })
    .from(portfolios)
    .where(eq(portfolios.status, 'published'))
    .orderBy(desc(portfolios.completedDate))

  return rows.map((r) => ({
    slug: r.slug,
    updatedAt: (r.updatedAt ?? r.completedDate ?? new Date()).toISOString(),
  }))
})

export const getArticleSitemapEntries = cache(async (): Promise<SitemapEntry[]> => {
  if (DEMO) return sampleArticles.map((a) => ({ slug: a.slug, updatedAt: a.updatedAt ?? a.publishedAt }))
  const rows = await db
    .select({
      slug: articles.slug,
      updatedAt: articles.updatedAt,
      publishedAt: articles.publishedAt,
      createdAt: articles.createdAt,
    })
    .from(articles)
    .where(eq(articles.status, 'published'))
    .orderBy(desc(articles.publishedAt))

  return rows.map((r) => ({
    slug: r.slug,
    updatedAt: (r.updatedAt ?? r.publishedAt ?? r.createdAt).toISOString(),
  }))
})
