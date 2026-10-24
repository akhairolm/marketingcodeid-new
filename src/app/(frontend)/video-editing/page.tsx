import React from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  Film,
  Clock,
  Globe,
  Sparkles,
} from 'lucide-react'
import { getWhatsAppUrl } from '@/lib/whatsapp'
import { JsonLd, breadcrumbSchema } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Layanan Video Editing & Motion Ads (Dalam Tahap Pengembangan) | MarketingCode.ID',
  description:
    'Layanan video editing dan motion ads saat ini sedang dalam tahap pengembangan. Silakan jelajahi layanan pembuatan website dan aplikasi mobile profesional kami.',
  robots: {
    index: false,
    follow: false,
  },
  alternates: { canonical: '/video-editing' },
}

export default function VideoEditingPage() {
  return (
    <div className="min-h-screen font-sans bg-[#FBFBFB] text-[#18181B] antialiased selection:bg-[#FF5C28] selection:text-white">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Beranda', path: '/' },
            { name: 'Video Editing (Pengembangan)', path: '/video-editing' },
          ]),
        ]}
      />

      <main className="relative bg-grid-pattern pt-32 pb-24 overflow-hidden flex items-center justify-center min-h-[75vh]">
        <section className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF5F0] border border-orange-200/70 text-[#C23605] text-xs font-semibold mb-6">
            <Clock className="w-3.5 h-3.5" />
            <span>Sedang Dalam Tahap Pengembangan</span>
          </div>

          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-white border border-neutral-200/80 shadow-md flex items-center justify-center text-[#FF5C28] mx-auto mb-6">
            <Film className="w-8 h-8 sm:w-10 sm:h-10" />
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-[#111827] tracking-tight leading-[1.2]">
            Layanan Video Editing &amp; Motion Ads Sedang Dipersiapkan
          </h1>

          <p className="mt-4 text-sm sm:text-base text-neutral-600 leading-relaxed max-w-xl mx-auto">
            Saat ini tim teknis MarketingCode.ID sedang memfokuskan kapasitas penuh pada layanan inti
            Pembuatan Website, Aplikasi Mobile, dan Iklan Digital (Meta &amp; Google Ads).
            Layanan video editing akan segera kami luncurkan secara bertahap.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/jasa-pembuatan-website"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#D13D00] hover:bg-[#B33400] rounded-full shadow-glow transition-all"
            >
              <Globe className="w-4 h-4" />
              <span>Lihat Layanan Website</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>

            <a
              href={getWhatsAppUrl('website')}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-neutral-800 bg-white hover:border-[#D13D00] border border-neutral-200 rounded-full transition-all text-center"
            >
              <Image
                src="/icons/flaticon/whatsapp.svg"
                alt=""
                width={18}
                height={18}
                className="w-4 h-4 shrink-0"
              />
              <span>Tanya Ketersediaan via WhatsApp</span>
            </a>
          </div>

          <div className="mt-10 pt-6 border-t border-neutral-200/60 flex items-center justify-center gap-2 text-xs text-neutral-500">
            <Sparkles className="w-3.5 h-3.5 text-[#FF5C28]" />
            <span>Fokus pada kualitas eksekusi terbaik untuk setiap proyek aktif</span>
          </div>
        </section>
      </main>
    </div>
  )
}
