import dynamic from 'next/dynamic'
import { HeroSection } from './HeroSection'
import { ServicesHub } from './ServicesHub'
import { PortfolioSection } from './PortfolioSection'
import { PricingSection } from './PricingSection'
import { WorkflowSection } from './WorkflowSection'
import { TrustSection } from './TrustSection'
import type { PortfolioProject } from './home-data'

const FlagshipSection = dynamic(() => import('./FlagshipSection').then((m) => m.FlagshipSection))
const FinalCtaSection = dynamic(() => import('./FinalCtaSection').then((m) => m.FinalCtaSection))


export default function HomePageClient({
  portfolioHighlights,
}: {
  faqs?: { q: string; a: string }[]
  portfolioHighlights: PortfolioProject[]
}) {
  return (
    <div className="min-h-screen font-sans bg-[#FBFBFB] text-[#18181B] antialiased selection:bg-[#FF5C28] selection:text-white">
      <main className="relative bg-grid-pattern pt-28 sm:pt-32 pb-20 overflow-hidden">
        {/* 1. Hero */}
        <HeroSection />

        {/* 2. Pilih Layanan Sesuai Kebutuhan */}
        <ServicesHub />

        {/* 3. Portofolio & Studi Kasus Nyata */}
        <PortfolioSection projects={portfolioHighlights} />

        {/* 4. Paket & Harga Transparan */}
        <PricingSection />

        {/* 5. Cara Kerja 6 Langkah Terstruktur */}
        <WorkflowSection />

        {/* 6. Alasan Memilih MarketingCode (Nilai Pembeda Jujur & Nyata) */}
        <TrustSection />

        {/* 7. Arsitektur Teknis */}
        <FlagshipSection />

        {/* 8. Final Closing Banner */}
        <FinalCtaSection />
      </main>
    </div>
  )
}

