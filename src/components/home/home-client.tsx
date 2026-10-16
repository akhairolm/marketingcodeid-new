import { HeroSection } from './HeroSection'
import { ServicesHub } from './ServicesHub'
import { TrustSection } from './TrustSection'
import { FlagshipSection } from './FlagshipSection'
import { AccelerationSection } from './AccelerationSection'
import { PortfolioSection } from './PortfolioSection'
import { PricingSection } from './PricingSection'
import { WorkflowSection } from './WorkflowSection'
import { FaqSection } from './FaqSection'
import { ConsultationSection } from './ConsultationSection'
import { FinalCtaSection } from './FinalCtaSection'
import type { PortfolioProject } from './home-data'

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
