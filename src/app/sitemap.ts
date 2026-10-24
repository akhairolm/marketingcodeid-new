import type { MetadataRoute } from 'next'
import { absoluteUrl } from '@/lib/site'
import { getArticleSitemapEntries, getPortfolioSitemapEntries } from '@/lib/content/queries'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // No catch: a failing enumeration must fail the response so a partial
  // sitemap is never cached as a success. ponytail: enumerate-all assumes
  // <50k URLs; split into /sitemap/<n>.xml when a collection exceeds that.
  const [articles, portfolios] = await Promise.all([
    getArticleSitemapEntries(),
    getPortfolioSitemapEntries(),
  ])

  const now = new Date()
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl('/'), lastModified: now, changeFrequency: 'daily', priority: 1.0 },
    { url: absoluteUrl('/jasa-pembuatan-website'), lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: absoluteUrl('/jasa-pembuatan-aplikasi-mobile'), lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: absoluteUrl('/jasa-iklan-ads'), lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: absoluteUrl('/portfolio'), lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: absoluteUrl('/blog'), lastModified: now, changeFrequency: 'daily', priority: 0.8 },
  ]

  const portfolioRoutes: MetadataRoute.Sitemap = portfolios.map((p) => ({
    url: absoluteUrl(`/portfolio/${p.slug}`),
    lastModified: new Date(p.updatedAt),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const articleRoutes: MetadataRoute.Sitemap = articles.map((a) => ({
    url: absoluteUrl(`/blog/${a.slug}`),
    lastModified: new Date(a.updatedAt),
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  return [...staticRoutes, ...portfolioRoutes, ...articleRoutes]
}
