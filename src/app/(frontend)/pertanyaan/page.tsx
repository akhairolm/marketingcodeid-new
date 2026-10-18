import type { Metadata } from 'next'
import Link from 'next/link'
import { HelpCircle, ChevronRight } from 'lucide-react'
import { AGENCY_FAQS } from '@/data/faqs'
import { FaqClient } from './faq-client'
import { JsonLd, faqSchema, breadcrumbSchema } from '@/lib/seo'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Tanya Jawab & Pertanyaan Umum (FAQ) Seputar Layanan Website',
  description:
    'Kumpulan jawaban pertanyaan yang sering diajukan seputar biaya pembuatan website, waktu pengerjaan, domain & cloud hosting, hak kepemilikan 100%, serta garansi teknis di MarketingCode.ID Kalimantan Selatan.',
  keywords: [
    'faq pembuatan website',
    'pertanyaan website banjarmasin',
    'biaya website kalsel',
    'tanya jawab marketingcode',
    'lama pengerjaan website',
    'jasa website banjarmasin faq',
  ],
  alternates: { canonical: '/pertanyaan' },
  openGraph: {
    title: 'Tanya Jawab & Pertanyaan Umum (FAQ) Seputar Layanan Website | MarketingCode.ID',
    description:
      'Kumpulan jawaban pertanyaan yang sering diajukan seputar biaya pembuatan website, waktu pengerjaan, domain & cloud hosting, serta garansi teknis di MarketingCode.ID.',
    url: '/pertanyaan',
    siteName: 'MarketingCode.ID',
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tanya Jawab & FAQ Layanan Website | MarketingCode.ID',
    description:
      'Informasi lengkap seputar biaya, proses, domain & hosting, serta garansi teknis pembuatan website bersama MarketingCode.ID.',
  },
}

export default function PertanyaanPage() {
  const breadcrumbItems = [
    { name: 'Beranda', path: '/' },
    { name: 'Pertanyaan', path: '/pertanyaan' },
  ]

  const schemaFaqs = AGENCY_FAQS.map((item) => ({
    q: item.q,
    a: item.a,
  }))

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(breadcrumbItems),
          faqSchema(schemaFaqs),
        ]}
      />

      <div className="min-h-screen font-sans bg-[#FBFBFB] text-[#18181B] antialiased">
        <main className="relative bg-grid-pattern pt-28 sm:pt-36 pb-24 overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            {/* Breadcrumb Navigation */}
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex items-center gap-1.5 text-xs text-neutral-500">
                <li>
                  <Link href="/" className="hover:text-neutral-900 transition-colors">
                    Beranda
                  </Link>
                </li>
                <li>
                  <ChevronRight className="w-3.5 h-3.5 text-neutral-400" aria-hidden="true" />
                </li>
                <li className="font-semibold text-neutral-900" aria-current="page">
                  Pertanyaan (FAQ)
                </li>
              </ol>
            </nav>

            {/* Header Hero */}
            <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FFF5F0] border border-orange-200/60 text-[#C23605] text-xs font-bold mb-4 shadow-xs">
                <HelpCircle className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Pusat Informasi &amp; Tanya Jawab</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight leading-tight">
                Pertanyaan yang Sering Diajukan Seputar Layanan Website
              </h1>
              <p className="text-neutral-600 text-sm sm:text-base mt-3 leading-relaxed">
                Jawaban terbuka dan transparan seputar rincian biaya, waktu pengerjaan,
                hak kepemilikan 100%, domain &amp; cloud hosting, hingga garansi pemeliharaan resmi.
              </p>
            </div>

            {/* Interactive FAQ Client Section */}
            <FaqClient faqs={AGENCY_FAQS} />
          </div>
        </main>
      </div>
    </>
  )
}
