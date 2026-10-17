import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'MarketingCode.ID — Software House & Digital Agency',
    short_name: 'MarketingCode.ID',
    description:
      'Digital agency & software house di Kalimantan Selatan. Spesialis jasa pembuatan website kustom, aplikasi mobile Android/iOS, dan manajemen iklan Meta Ads.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0F0F12',
    theme_color: '#FF5C28',
    icons: [
      {
        src: '/icon/192',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon/512',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
