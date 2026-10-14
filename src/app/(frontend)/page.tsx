import type { Metadata } from 'next'
import HomePageClient from '@/components/home/home-client'
import { JsonLd, orgSchema, faqSchema } from '@/lib/seo'
import { getPortfolios } from '@/lib/content/queries'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Software House & Digital Agency Kalimantan Selatan | MarketingCode.ID',
  description:
    'Agensi pembuatan website, aplikasi mobile Android/iOS, dan iklan Meta Ads di Kandangan, HSS, Kalimantan Selatan. Solusi digital kustom untuk instansi, UMKM, & perusahaan.',
  keywords: [
    'software house kalimantan selatan',
    'digital agency kandangan',
    'jasa it hulu sungai selatan',
    'jasa pembuatan website kalsel',
    'jasa aplikasi mobile kalsel',
    'jasa meta ads kalsel',
  ],
  alternates: { canonical: '/' },
}

const homeFaqs = [
  {
    q: 'Apakah melayani pengerjaan proyek di luar Kandangan dan Hulu Sungai Selatan?',
    a: 'Ya. Selain melayani tatap muka langsung di area Kandangan (HSS) dan Banua Enam (Tapin, Barabai/HST, Amuntai/HSU, Balangan, Tabalong), kami juga menangani klien di Banjarbaru, Banjarmasin, serta berbagai kota di seluruh Indonesia secara online maupun onsite.',
  },
  {
    q: 'Apakah website dan aplikasi yang dibuat bisa disesuaikan dengan kebutuhan spesifik instansi atau perusahaan?',
    a: 'Tentu. Kami mengkhususkan diri pada pengembangan sistem kustom (tailor-made) yang mengikuti alur kerja, regulasi instansi/dinas, maupun proses bisnis unik perusahaan Anda.',
  },
  {
    q: 'Bagaimana cara memulai konsultasi pembuatan aplikasi atau kampanye iklan digital?',
    a: 'Anda dapat menghubungi tim kami melalui tombol WhatsApp yang tersedia untuk menjadwalkan sesi diskusi kebutuhan dan estimasi anggaran secara gratis.',
  },
]

export default async function Page() {
  const portfolioItems = await getPortfolios()
  const portfolioHighlights = portfolioItems.slice(0, 4).map((item) => ({
    slug: item.slug,
    title: item.title,
    client: item.clientName,
    category: item.category as 'web' | 'app' | 'marketing',
    categoryLabel: item.categoryLabel,
    techStack: item.techStack,
    description: item.summary,
    highlight: item.results[0] ? `${item.results[0].value} · ${item.results[0].label}` : item.summary.slice(0, 40),
    image: item.thumbnail?.url ?? '',
    imageAlt: item.thumbnail?.alt ?? `Portofolio ${item.title}`,
  }))

  return (
    <>
      <JsonLd data={[orgSchema, faqSchema(homeFaqs)]} />
      <HomePageClient faqs={homeFaqs} portfolioHighlights={portfolioHighlights} />
    </>
  )
}
