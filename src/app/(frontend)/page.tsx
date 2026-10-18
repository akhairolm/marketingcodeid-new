import type { Metadata } from 'next'
import HomePageClient from '@/components/home/home-client'
import { JsonLd, orgSchema } from '@/lib/seo'
import { getFeaturedPortfolioCards } from '@/lib/content/queries'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Jasa Pembuatan Website Profesional Kalimantan Selatan | MarketingCode.ID',
  description:
    'Jasa pembuatan website profesional untuk UMKM dan bisnis di Banjarmasin, Banjarbaru, Kandangan, dan Kalimantan Selatan. Cepat, mobile-friendly, dan 100% hak milik tanpa biaya sewa.',
  keywords: [
    'jasa pembuatan website kalimantan selatan',
    'jasa website banjarmasin',
    'jasa website banjarbaru',
    'jasa website kandangan',
    'jasa website umkm kalsel',
    'jasa company profile kalsel',
    'web developer kalimantan selatan',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Jasa Pembuatan Website Profesional Kalimantan Selatan | MarketingCode.ID',
    description:
      'Jasa pembuatan website profesional untuk UMKM dan bisnis di Banjarmasin, Banjarbaru, Kandangan, dan Kalimantan Selatan. Cepat, mobile-friendly, dan 100% hak milik tanpa biaya sewa.',
    url: '/',
    siteName: 'MarketingCode.ID',
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jasa Pembuatan Website Profesional Kalimantan Selatan | MarketingCode.ID',
    description:
      'Jasa pembuatan website profesional untuk UMKM dan bisnis di Banjarmasin, Banjarbaru, Kandangan, dan Kalimantan Selatan.',
  },
}

export default async function Page() {
  const portfolioItems = await getFeaturedPortfolioCards(4)
  const portfolioHighlights = portfolioItems.map((item) => ({
    slug: item.slug,
    title: item.title,
    client: item.clientName,
    category: item.category,
    categoryLabel: item.categoryLabel,
    techStack: item.techStack,
    description: item.summary,
    highlight: item.headlineResult
      ? `${item.headlineResult.value} · ${item.headlineResult.label}`
      : item.summary.slice(0, 40),
    image: item.thumbnail?.url ?? '',
    imageAlt: item.thumbnail?.alt ?? `Portofolio ${item.title}`,
  }))

  return (
    <>
      <JsonLd data={[orgSchema]} />
      <HomePageClient portfolioHighlights={portfolioHighlights} />
    </>
  )
}

