import React from 'react'
import type { Metadata } from 'next'
import { Route } from 'lucide-react'
import { getPortfolioCards } from '@/lib/content/queries'
import { getWhatsAppUrl } from '@/lib/whatsapp'
import { SITE_NAME, absoluteUrl } from '@/lib/site'
import { CtaBanner } from '@/components/site/CtaBanner'
import { PortfolioFilterGrid } from '@/components/portfolio/PortfolioFilterGrid'

import { JsonLd, breadcrumbSchema } from '@/lib/seo'

export const revalidate = 60

const title = 'Portofolio Proyek & Studi Kasus'
const description =
  'Kumpulan proyek website, aplikasi mobile, dan kampanye digital marketing yang telah kami kerjakan — lengkap dengan tantangan, solusi, dan hasilnya.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: absoluteUrl('/portfolio') },
  openGraph: {
    title,
    description,
    url: absoluteUrl('/portfolio'),
    siteName: SITE_NAME,
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
}

export default async function PortfolioIndexPage() {
  const items = await getPortfolioCards()

  return (
    <div className="min-h-screen">
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Beranda', path: '/' },
          { name: 'Portofolio', path: '/portfolio' },
        ])}
      />
      <main className="relative pt-28 sm:pt-32 pb-24 overflow-hidden">
        <div aria-hidden className="absolute inset-x-0 top-0 h-[520px] bg-grid-pattern [mask-image:linear-gradient(to_bottom,black,transparent)] pointer-events-none" />

        <section className="relative max-w-3xl mx-auto px-4 sm:px-6 pt-8 text-center animate-fade-up">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF5F0] border border-orange-200/50 text-[#EA4510] text-xs font-semibold">
            <Route className="w-3.5 h-3.5" />
            Studi Kasus &amp; Portofolio
          </span>
          <h1 className="mt-5 text-4xl sm:text-5xl font-extrabold text-[#111827] tracking-tight leading-[1.12]">
            Hasil Kerja Nyata yang <span className="text-[#FF5C28]">Telah Beroperasi</span>
          </h1>
          <p className="mt-5 text-base sm:text-lg text-neutral-600 leading-relaxed">
            Setiap proyek dimulai dari masalah bisnis yang spesifik. Buka studi kasusnya untuk melihat tantangan, solusi,
            dan teknologi yang kami pakai.
          </p>
        </section>

        <section className="relative max-w-6xl mx-auto px-4 sm:px-6 mt-14">
          <PortfolioFilterGrid items={items} />
        </section>

        <div className="mt-24">
          <CtaBanner
            title="Proyek Anda Bisa Jadi Studi Kasus Berikutnya"
            description="Ceritakan kebutuhan Anda — kami bantu petakan solusi, estimasi waktu, dan investasinya tanpa komitmen awal."
            whatsappHref={getWhatsAppUrl('case-study')}
            secondary={{ href: '/blog', label: 'Baca Artikel Kami' }}
          />
        </div>
      </main>
    </div>
  )
}
