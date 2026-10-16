import React from 'react'
import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google'
import { GoogleAnalytics } from '@next/third-parties/google'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './styles.css'
import { SiteHeader } from '@/components/site/SiteHeader'
import { SiteFooter } from '@/components/site/SiteFooter'
import { SITE_URL } from '@/lib/site'

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '600', '700', '800'],
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500', '600'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'MarketingCode.ID — Solusi Website, Mobile App & Digital Marketing Kalsel',
    template: '%s | MarketingCode.ID',
  },
  description:
    'Digital agency & software house di Kalimantan Selatan. Spesialis jasa pembuatan website kustom, aplikasi mobile Android/iOS, dan manajemen iklan Meta Ads berorientasi konversi.',
  keywords: [
    'MarketingCode.ID',
    'Software House Kalimantan Selatan',
    'Digital Agency Kandangan',
    'Jasa Pembuatan Website Kalsel',
    'Jasa Aplikasi Mobile Android iOS',
    'Jasa Iklan Meta Ads Kalsel',
    'Web Developer Banua Enam',
  ],
  authors: [{ name: 'MarketingCode.ID Digital Agency', url: SITE_URL }],
  creator: 'MarketingCode.ID',
  publisher: 'MarketingCode.ID',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: SITE_URL,
    siteName: 'MarketingCode.ID',
    title: 'MarketingCode.ID — Solusi Website, Mobile App & Digital Marketing Kalsel',
    description:
      'Digital agency & software house di Kalimantan Selatan. Spesialis jasa pembuatan website kustom, aplikasi mobile Android/iOS, dan manajemen iklan Meta Ads berorientasi konversi.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MarketingCode.ID — Solusi Website, Mobile App & Digital Marketing Kalsel',
    description:
      'Digital agency & software house di Kalimantan Selatan. Spesialis jasa pembuatan website kustom, aplikasi mobile Android/iOS, dan manajemen iklan Meta Ads.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`scroll-smooth ${plusJakartaSans.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans bg-[#FBFBFB] text-[#18181B] antialiased selection:bg-[#FF5C28] selection:text-white">
        <SiteHeader />
        {children}
        <SiteFooter />
        {process.env.NEXT_PUBLIC_GA_ID && <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />}
        <SpeedInsights />
      </body>
    </html>
  )
}
