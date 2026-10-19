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
      <main className="relative bg-grid-pattern pt-28 sm:pt-32 pb-20 overflow-hidden">
        {/* 1. Hero */}
        <HeroSection />

        {/* 2. Pilih Layanan Sesuai Kebutuhan (3 Layanan Utama) */}
        <ServicesHub />

        {/* 3. Paket & Harga Transparan */}
        <PricingSection />

        {/* 4. Suara Pengguna (Cerita & Pengalaman Klien) */}
        <TestimonialsSection />

        {/* 5. Alur Kerja (08 · Proses) */}
        <WorkflowSection />

        {/* 6. Perbandingan Solusi (08 · Perbandingan) */}
        <ComparisonSection />

        {/* 7. Artikel & Edukasi Bisnis (Menggantikan Flagship Solutions) */}
        <HomeBlogSection articles={articles} />

        {/* 8. Final Closing Banner */}
        <FinalCtaSection />
      </main>
    </div>
  )
}
