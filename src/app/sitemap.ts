import type { MetadataRoute } from 'next'
import { absoluteUrl } from '@/lib/site'
import { getArticles, getPortfolios } from '@/lib/content/queries'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articles, portfolios] = await Promise.all([
    getArticles().catch(() => []),
    getPortfolios().catch(() => []),
  ])

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl('/'),
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: absoluteUrl('/jasa-pembuatan-website'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: absoluteUrl('/jasa-pembuatan-aplikasi-mobile'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: absoluteUrl('/jasa-iklan-meta-ads'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: absoluteUrl('/digital-marketing'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: absoluteUrl('/video-editing'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: absoluteUrl('/portfolio'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: absoluteUrl('/blog'),
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
  ]

  const portfolioRoutes: MetadataRoute.Sitemap = portfolios.map((p) => ({
    url: absoluteUrl(`/portfolio/${p.slug}`),
    lastModified: p.completedDate ? new Date(p.completedDate) : new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const articleRoutes: MetadataRoute.Sitemap = articles.map((a) => ({
    url: absoluteUrl(`/blog/${a.slug}`),
    lastModified: a.updatedAt ? new Date(a.updatedAt) : a.publishedAt ? new Date(a.publishedAt) : new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  return [...staticRoutes, ...portfolioRoutes, ...articleRoutes]
}

