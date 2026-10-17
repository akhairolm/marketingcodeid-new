import dynamic from 'next/dynamic'
import { HeroSection } from './HeroSection'
import { ServicesHub } from './ServicesHub'
import { PortfolioSection } from './PortfolioSection'
import { PricingSection } from './PricingSection'
import { WorkflowSection } from './WorkflowSection'
import { TrustSection } from './TrustSection'
import type { PortfolioProject } from './home-data'

const FlagshipSection = dynamic(() => import('./FlagshipSection').then((m) => m.FlagshipSection))
const AccelerationSection = dynamic(() => import('./AccelerationSection').then((m) => m.AccelerationSection))
const FaqSection = dynamic(() => import('./FaqSection').then((m) => m.FaqSection))
const ConsultationSection = dynamic(() => import('./ConsultationSection').then((m) => m.ConsultationSection))
const FinalCtaSection = dynamic(() => import('./FinalCtaSection').then((m) => m.FinalCtaSection))

export default function HomePageClient({
  faqs,
  portfolioHighlights,
}: {
  faqs: { q: string; a: string }[]
  portfolioHighlights: PortfolioProject[]
}) {
  return (
    <div className="min-h-screen font-sans bg-[#FBFBFB] text-[#18181B] antialiased selection:bg-[#FF5C28] selection:text-white">
      <main className="relative bg-grid-pattern pt-28 sm:pt-32 pb-20 overflow-hidden">
        {/* 1. Hero */}
        <HeroSection />

        {/* 2 & 3. Pilih Layanan Sesuai Kebutuhan & Jalur Audiens */}
        <ServicesHub />

        {/* 4. Portofolio & Studi Kasus Nyata */}
        <PortfolioSection projects={portfolioHighlights} />

        {/* 5. Paket & Harga Transparan */}
        <PricingSection />

        {/* 6. Cara Kerja 6 Langkah Terstruktur */}
        <WorkflowSection />

        {/* 7. Alasan Memilih MarketingCode (Nilai Pembeda Jujur & Nyata) */}
        <TrustSection />

        {/* 8. Arsitektur Teknis & Layanan Pendukung (Mobile & Ads) */}
        <FlagshipSection />
        <AccelerationSection />

        {/* 9. FAQ Lengkap */}
        <FaqSection faqs={faqs} />

        {/* 10. Formulir Konsultasi Proyek & Kontak WhatsApp */}
        <ConsultationSection />

        {/* 11. Final Closing Banner */}
        <FinalCtaSection />
      </main>
    </div>
  )
}
