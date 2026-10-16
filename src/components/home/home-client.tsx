import dynamic from 'next/dynamic'
import { HeroSection } from './HeroSection'
import { ServicesHub } from './ServicesHub'
import { TrustSection } from './TrustSection'
import { FlagshipSection } from './FlagshipSection'
import { PortfolioSection } from './PortfolioSection'
import type { PortfolioProject } from './home-data'

const AccelerationSection = dynamic(() => import('./AccelerationSection').then((m) => m.AccelerationSection))
const PricingSection = dynamic(() => import('./PricingSection').then((m) => m.PricingSection))
const WorkflowSection = dynamic(() => import('./WorkflowSection').then((m) => m.WorkflowSection))
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
        <HeroSection />
        <ServicesHub />
        <TrustSection />
        <FlagshipSection />
        <AccelerationSection />
        <PortfolioSection projects={portfolioHighlights} />
        <PricingSection />
        <WorkflowSection />
        <FaqSection faqs={faqs} />
        <ConsultationSection />
        <FinalCtaSection />
      </main>
    </div>
  )
}
