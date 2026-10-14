import React from 'react'
import type { Metadata } from 'next'
import { BookOpen } from 'lucide-react'
import { getArticles } from '@/lib/content/queries'
import { getWhatsAppUrl } from '@/lib/whatsapp'
import { SITE_NAME, absoluteUrl } from '@/lib/site'
import { CtaBanner } from '@/components/site/CtaBanner'
import { BlogFilterGrid } from '@/components/blog/BlogFilterGrid'

export const revalidate = 60

const title = `Blog & Insight Digital | ${SITE_NAME}`
const description =
  'Artikel praktis seputar pembuatan website, aplikasi mobile, dan digital marketing untuk membantu bisnis Anda mengambil keputusan teknologi yang tepat.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: absoluteUrl('/blog') },
  openGraph: { title, description, url: absoluteUrl('/blog'), siteName: SITE_NAME, locale: 'id_ID', type: 'website' },
}

export default async function BlogIndexPage() {
  const articles = await getArticles()

  return (
    <div className="min-h-screen">
      <main className="relative pt-28 sm:pt-32 pb-24 overflow-hidden">
        <div aria-hidden className="absolute inset-x-0 top-0 h-[520px] bg-grid-pattern [mask-image:linear-gradient(to_bottom,black,transparent)] pointer-events-none" />

        <section className="relative max-w-3xl mx-auto px-4 sm:px-6 pt-8 text-center animate-fade-up">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF5F0] border border-orange-200/50 text-[#EA4510] text-xs font-semibold">
            <BookOpen className="w-3.5 h-3.5" />
            Blog &amp; Insight
          </span>
          <h1 className="mt-5 text-4xl sm:text-5xl font-extrabold text-[#111827] tracking-tight leading-[1.12]">
            Wawasan Digital untuk <span className="text-[#FF5C28]">Keputusan Bisnis</span> yang Lebih Tepat
          </h1>
          <p className="mt-5 text-base sm:text-lg text-neutral-600 leading-relaxed">
            Panduan praktis seputar website, aplikasi mobile, dan iklan digital — ditulis dari pengalaman mengerjakan
            proyek klien.
          </p>
        </section>

        <section className="relative max-w-6xl mx-auto px-4 sm:px-6 mt-14">
          <BlogFilterGrid articles={articles} />
        </section>

        <div className="mt-24">
          <CtaBanner
            title="Punya Pertanyaan yang Belum Terjawab?"
            description="Tanyakan langsung ke tim kami. Konsultasi awal gratis dan tanpa komitmen."
            whatsappHref={getWhatsAppUrl('article')}
            secondary={{ href: '/portfolio', label: 'Lihat Studi Kasus' }}
          />
        </div>
      </main>
    </div>
  )
}
