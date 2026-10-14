import type { MetadataRoute } from 'next'
import { absoluteUrl } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl('/'), priority: 1.0, changeFrequency: 'weekly' },
    { url: absoluteUrl('/jasa-pembuatan-website'), priority: 0.9, changeFrequency: 'weekly' },
    { url: absoluteUrl('/jasa-pembuatan-aplikasi-mobile'), priority: 0.9, changeFrequency: 'weekly' },
    { url: absoluteUrl('/jasa-iklan-meta-ads'), priority: 0.9, changeFrequency: 'weekly' },
  ]
}
