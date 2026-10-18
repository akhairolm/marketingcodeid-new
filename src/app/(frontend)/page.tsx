import type { Metadata } from 'next'
import HomePageClient from '@/components/home/home-client'
import { JsonLd, orgSchema, faqSchema } from '@/lib/seo'
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

const homeFaqs = [
  {
    q: 'Berapa biaya pembuatan website di MarketingCode?',
    a: 'Biaya pembuatan website sangat transparan: mulai dari Rp 1,5 Juta untuk Landing Page Promosi, Rp 3,5 Juta untuk Website Katalog UMKM, hingga Rp 5,5 Juta untuk Company Profile Bisnis. Untuk kebutuhan portal instansi atau sistem kustom, biaya disesuaikan dengan Surat Perjanjian Kerja (SPK) resmi.',
  },
  {
    q: 'Berapa lama waktu pengerjaan website hingga siap online?',
    a: 'Waktu pengerjaan berkisar antara 3 - 5 hari kerja untuk Landing Page, 7 - 14 hari kerja untuk Website UMKM, dan 10 - 21 hari kerja untuk Company Profile. Waktu pengerjaan bergantung pada kelengkapan materi dan kecepatan koordinasi revisi.',
  },
  {
    q: 'Apakah biaya sudah termasuk domain dan cloud hosting?',
    a: 'Ya, untuk paket Website UMKM (domain .com) dan Company Profile (domain .com atau .id) sudah termasuk pendaftaran nama domain dan cloud hosting berkecepatan tinggi selama 1 tahun pertama. Pada tahun berikutnya, Anda hanya membayar biaya perpanjangan domain dan cloud hosting tahunan standar tanpa biaya sewa sistem bulanan.',
  },
  {
    q: 'Apakah klien harus menyediakan seluruh materi tulisan dan foto sendiri?',
    a: 'Jika Anda sudah memiliki foto produk, profil, atau logo, tim kami akan mengolah dan menatanya ke dalam website. Jika belum lengkap, kami siap membantu menyusun struktur teks dasar dan memilih visual pendukung yang relevan dengan bidang usaha Anda.',
  },
  {
    q: 'Apakah website dapat dikelola sendiri setelah selesai dibuat?',
    a: 'Tentu bisa. Kami menyediakan dashboard admin yang praktis dan mudah diakses langsung dari smartphone atau laptop. Kami juga memberikan panduan singkat agar Anda atau staf dapat menambah foto produk, mengganti harga, dan memperbarui informasi secara mandiri tanpa paham koding.',
  },
  {
    q: 'Apakah bisa menambahkan fitur khusus atau aplikasi mobile di masa depan?',
    a: 'Bisa. Website dibangun dengan arsitektur modern (Next.js) yang modular sehingga dapat ditingkatkan sewaktu-waktu, misalnya integrasi payment gateway, sistem booking, atau dikembangkan menjadi aplikasi mobile Android & iOS.',
  },
  {
    q: 'Apakah tersedia garansi pemeliharaan dan dukungan teknis?',
    a: 'Ya, seluruh paket mencakup garansi pemeliharaan teknis resmi untuk memastikan website tetap online, aman dari bug fungsional, dan tombol pemesanan WhatsApp berjalan normal.',
  },
  {
    q: 'Apakah MarketingCode melayani klien di luar Banjarmasin dan Kandangan?',
    a: 'Ya. Selain siap berdiskusi tatap muka di area Kandangan (HSS), Banua Enam (Tapin, HST, HSU, Balangan, Tabalong), Banjarbaru, dan Banjarmasin, kami juga melayani klien dari berbagai kota di seluruh Indonesia secara daring melalui WhatsApp dan Google Meet.',
  },
]

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
      <JsonLd data={[orgSchema, faqSchema(homeFaqs)]} />
      <HomePageClient faqs={homeFaqs} portfolioHighlights={portfolioHighlights} />
    </>
  )
}
