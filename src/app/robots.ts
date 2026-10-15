import type { MetadataRoute } from 'next'
import { absoluteUrl } from '@/lib/site'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/api/media/'],
        disallow: ['/dashboard/', '/api/', '/login'],
      },
    ],
    sitemap: absoluteUrl('/sitemap.xml'),
  }
}
