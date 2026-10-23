import dynamic from 'next/dynamic'
import { HeroSection } from './HeroSection'
import { ServicesHub } from './ServicesHub'
import { PricingSection } from './PricingSection'
import { WorkflowSection } from './WorkflowSection'
import { ComparisonSection } from './ComparisonSection'
import type { ArticleCard as ArticleCardType } from '@/lib/content/types'

const TestimonialsSection = dynamic(() =>
  import('./TestimonialsSection').then((m) => m.TestimonialsSection),
)
const HomeBlogSection = dynamic(() =>
  import('./HomeBlogSection').then((m) => m.HomeBlogSection),
)
const FinalCtaSection = dynamic(() => import('./FinalCtaSection').then((m) => m.FinalCtaSection))

export interface HomePageClientProps {
  articles?: ArticleCardType[]
  /** @deprecated Kept for test compatibility */
  portfolioHighlights?: unknown[]
  /** @deprecated Kept for test compatibility */
  faqs?: unknown[]
}

export default function HomePageClient({ articles = [] }: HomePageClientProps) {

  return (
    <div className="min-h-screen font-sans bg-[#FBFBFB] text-[#18181B] antialiased selection:bg-[#FF5C28] selection:text-white">
      <main className="relative overflow-hidden">
        {/* ============================================================== */}
        {/* 1. Hero Section                                                */}
        {/* ============================================================== */}
        <div className="relative bg-paper-cream-glow bg-dot-fine pt-28 sm:pt-36 pb-20 sm:pb-28 overflow-hidden section-rule">
          {/* Ambient Chromatic Orbs */}
          <div
            className="absolute top-12 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-[#FF5C28]/12 via-amber-400/8 to-transparent rounded-full blur-3xl pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-gradient-to-tr from-sky-400/12 to-transparent rounded-full blur-3xl pointer-events-none"
            aria-hidden="true"
          />
          <HeroSection />
        </div>

        {/* ============================================================== */}
        {/* 2. Pilih Layanan Sesuai Kebutuhan (3 Layanan Utama)            */}
        {/* ============================================================== */}
        <div className="relative py-24 sm:py-32 bg-gradient-to-b from-[#FFFDFB] via-[#FFF9F2] to-[#FFFDFB] section-rule overflow-hidden">
          <div className="absolute inset-0 bg-dot-fine opacity-70 pointer-events-none" aria-hidden="true" />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-orange-400/5 rounded-full blur-3xl pointer-events-none"
            aria-hidden="true"
          />
          <ServicesHub />
        </div>

        {/* ============================================================== */}
        {/* 3. Paket & Harga Transparan                                    */}
        {/* ============================================================== */}
        <div className="relative py-24 sm:py-32 bg-[#FBFBFB] bg-dot-fine section-rule overflow-hidden">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-48 bg-gradient-to-b from-orange-500/8 via-amber-400/5 to-transparent rounded-full blur-2xl pointer-events-none"
            aria-hidden="true"
          />
          <PricingSection />
        </div>

        {/* ============================================================== */}
        {/* 4. Suara Pengguna (Cerita & Pengalaman Klien)                  */}
        {/* ============================================================== */}
        <div className="relative py-24 sm:py-32 bg-paper-warm section-rule overflow-hidden">
          <div className="absolute inset-0 bg-blueprint opacity-35 pointer-events-none" aria-hidden="true" />
          <TestimonialsSection className="mt-0" />
        </div>

        {/* ============================================================== */}
        {/* 5. Alur Kerja (08 · Proses)                                    */}
        {/* ============================================================== */}
        <div className="relative py-24 sm:py-32 bg-gradient-to-b from-[#FAF7F2] via-[#F6F3EC] to-[#F2EFE7] section-rule overflow-hidden">
          <div className="absolute inset-0 bg-dot-fine opacity-60 pointer-events-none" aria-hidden="true" />
          <WorkflowSection />
        </div>

        {/* ============================================================== */}
        {/* 6. Perbandingan Solusi (08 · Perbandingan)                     */}
        {/* ============================================================== */}
        <div className="relative py-24 sm:py-32 bg-[#FBFBFB] bg-dot-fine section-rule overflow-hidden">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-60 bg-orange-500/5 rounded-full blur-3xl pointer-events-none"
            aria-hidden="true"
          />
          <ComparisonSection />
        </div>

        {/* ============================================================== */}
        {/* 7. Artikel & Edukasi Bisnis                                    */}
        {/* ============================================================== */}
        <div className="relative py-24 sm:py-32 bg-gradient-to-b from-[#F5F2EB] via-[#FAF8F5] to-[#FBFBFB] section-rule overflow-hidden">
          <HomeBlogSection articles={articles} />
        </div>

        {/* ============================================================== */}
        {/* 8. Final Closing Banner                                        */}
        {/* ============================================================== */}
        <div className="relative py-20 sm:py-28 bg-[#0B0D12] text-white section-rule border-neutral-900 overflow-hidden">
          <div className="absolute inset-0 bg-dot-fine opacity-20 pointer-events-none" aria-hidden="true" />
          <div
            className="absolute -top-20 left-1/2 -translate-x-1/2 w-[700px] h-64 bg-[#FF5C28]/15 rounded-full blur-3xl pointer-events-none"
            aria-hidden="true"
          />
          <FinalCtaSection />
        </div>
      </main>
    </div>
  )
}
