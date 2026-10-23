import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(__filename)

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/jasa-pembuatan-webiste',
        destination: '/jasa-pembuatan-website',
        permanent: true,
      },
      {
        source: '/website-umkm',
        destination: '/jasa-pembuatan-website',
        permanent: true,
      },
      {
        source: '/faq',
        destination: '/pertanyaan',
        permanent: true,
      },
      {
        source: '/company-profile',
        destination: '/jasa-pembuatan-website',
        permanent: true,
      },
      {
        source: '/landing-page',
        destination: '/jasa-pembuatan-website',
        permanent: true,
      },
      {
        source: '/jasa-iklan-meta-ads',
        destination: '/jasa-iklan-ads',
        permanent: true,
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
      {
        // Sample/fallback content imagery
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  turbopack: {
    root: path.resolve(dirname),
  },
}

export default nextConfig
