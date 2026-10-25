'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Tag, Check, Clock, Sparkles } from 'lucide-react'
import { getWhatsAppUrl } from '@/lib/whatsapp'
import { trackWhatsAppClick } from '@/lib/analytics'
import { pricingData, type PricingFeatureItem } from './home-data'

const TABS = [
  { value: 'web', label: 'Website Development (Utama)' },
  { value: 'app', label: 'Mobile Application' },
  { value: 'ads', label: 'Digital Marketing' },
] as const

function isFeatureItem(feat: unknown): feat is PricingFeatureItem {
  return typeof feat === 'object' && feat !== null && 'text' in feat
}

export function PricingSection() {
  const [tab, setTab] = useState<(typeof TABS)[number]['value']>('web')

  return (
    <section
      id="harga"
      aria-label="Paket Harga Investasi"
      className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6"
    >
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF5F0] border border-orange-200/50 text-[#C23605] text-xs font-semibold mb-3">
          <Tag className="w-3.5 h-3.5" />
          <span>Pilihan Paket Transparan</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
          Paket Investasi Transparan Sesuai Skala Bisnis
        </h2>
        <p className="text-neutral-500 text-sm mt-2 max-w-xl mx-auto leading-relaxed">
          Investasi terukur tanpa biaya sewa sistem bulanan. Tersedia garansi pemeliharaan teknis
          resmi, server cepat, dan serah terima aset 100% hak milik.
        </p>

        {/* Tab Switcher */}
        <div className="mt-8 flex justify-center">
          <div
            role="tablist"
            aria-label="Kategori paket harga"
            className="bg-neutral-100 p-1.5 rounded-full inline-flex border border-neutral-200 shadow-xs"
          >
            {TABS.map((t) => (
              <button
                key={t.value}
                id={`pricing-tab-${t.value}`}
                type="button"
                role="tab"
                aria-selected={tab === t.value}
                aria-controls={`pricing-tabpanel-${t.value}`}
                tabIndex={tab === t.value ? 0 : -1}
                onClick={() => setTab(t.value)}
                className={`px-4 sm:px-5 py-2 text-xs rounded-full transition-all cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#FF5C28] ${
                  tab === t.value
                    ? 'font-bold bg-white text-neutral-900 shadow-xs'
                    : 'font-semibold text-neutral-600 hover:text-neutral-900'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div
        id={`pricing-tabpanel-${tab}`}
        role="tabpanel"
        aria-labelledby={`pricing-tab-${tab}`}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch text-left pt-3"
      >
        {pricingData[tab].map((item) => {
          const isHighlight = item.isPopular

          return (
            <div
              key={item.tier}
              className={`bg-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative ${
                isHighlight
                  ? 'border-2 border-[#FF5C28] shadow-xl shadow-orange-500/10 lg:-translate-y-2 lg:scale-[1.02] z-10'
                  : 'border border-neutral-200/80 shadow-card hover:border-orange-200/80 hover:shadow-lg'
              }`}
            >
              {/* Top Decoy Badge for Popular Package */}
              {isHighlight && (
                <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#FF5C28] to-[#EA4510] text-white text-[11px] font-extrabold px-4 py-1 rounded-full uppercase tracking-wider shadow-md flex items-center gap-1.5 whitespace-nowrap z-20">
                  <Sparkles className="w-3 h-3" />
                  <span>{item.badgeTop || 'xsPALING DIMINATI'}</span>
                </div>
              )}

              <div>
                {/* Standard Badge for non-popular items */}
                {!isHighlight && item.badgeTop && (
                  <div className="mb-3">
                    <span className="inline-flex items-center text-[11px] font-bold text-neutral-600 bg-neutral-100 border border-neutral-200/80 px-2.5 py-0.5 rounded-full">
                      {item.badgeTop}
                    </span>
                  </div>
                )}

                {/* Tier Name */}
                <h3 className="text-xl font-extrabold text-neutral-900 tracking-tight">
                  {item.tier}
                </h3>

                {/* Target Description */}
                <p className="text-xs sm:text-[13px] text-neutral-600 mt-2.5 leading-relaxed min-h-[44px]">
                  {item.desc}
                </p>

                {/* Price Anchoring */}
                <div className="mt-5 pt-4 border-t border-neutral-100">
                  {item.originalPrice && (
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs sm:text-sm text-neutral-400 line-through font-medium">
                        {item.originalPrice}
                      </span>
                      <span className="text-[10px] font-bold text-[#C23605] bg-[#FFF5F0] border border-orange-200/60 px-2 py-0.5 rounded-full">
                        Hemat Promo
                      </span>
                    </div>
                  )}
                  <div className="flex items-baseline gap-1.5 flex-wrap">
                    <span className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
                      {item.price}
                    </span>
                    <span className="text-xs text-neutral-500 font-medium">{item.unit}</span>
                  </div>
                </div>

                {/* CTA Button */}
                <a
                  href={getWhatsAppUrl(item.ctaContext, `${item.tier} (${item.price})`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={async (e) => {
                    trackWhatsAppClick({
                      position: 'pricing_card',
                      packageTitle: item.tier,
                      service: item.ctaContext,
                    })
                    if (typeof window !== 'undefined') {
                      e.preventDefault()
                      const subject = `${item.tier} (${item.price})`
                      const baseMsg = `Halo MarketingCode ID, saya ingin konsultasi terkait paket website: ${subject}.`
                      const { prepareTrackedWhatsAppUrl } = await import('@/lib/tracking/client-tracker')
                      const trackedUrl = await prepareTrackedWhatsAppUrl(baseMsg)
                      window.open(trackedUrl, '_blank', 'noopener,noreferrer')
                    }
                  }}
                  className={`mt-6 w-full py-3 px-5 font-bold text-xs sm:text-sm rounded-full flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    isHighlight
                      ? 'bg-[#FF5C28] hover:bg-[#EA4510] text-white shadow-glow hover:scale-[1.01]'
                      : 'bg-neutral-900 hover:bg-neutral-800 text-white hover:scale-[1.01]'
                  }`}
                >
                  <Image
                    src="/icons/flaticon/whatsapp.svg"
                    alt=""
                    width={16}
                    height={16}
                    className="w-4 h-4 shrink-0 object-contain"
                  />
                  <span>{item.btnText}</span>
                </a>

                {/* Feature List */}
                <div className="mt-6 pt-6 border-t border-neutral-100 space-y-3 text-xs sm:text-[13px] text-neutral-700">
                  {item.features.map((feat, idx) => {
                    if (isFeatureItem(feat)) {
                      return (
                        <div key={idx} className="space-y-2">
                          <div className="flex items-start gap-2.5">
                            <div className="w-4 h-4 rounded-full bg-orange-100 text-[#C23605] flex items-center justify-center shrink-0 mt-0.5">
                              <Check className="w-2.5 h-2.5 stroke-[3]" />
                            </div>
                            <span className="font-semibold text-neutral-900 leading-snug">
                              {feat.text}
                            </span>
                          </div>
                          {feat.subItems && feat.subItems.length > 0 && (
                            <ul className="pl-6 space-y-1.5 text-xs text-neutral-600">
                              {feat.subItems.map((sub, sIdx) => (
                                <li
                                  key={sIdx}
                                  className="flex items-start gap-2 bg-neutral-50/80 p-2 rounded-lg border border-neutral-100 leading-relaxed"
                                >
                                  <span className="text-[#FF5C28] font-bold shrink-0">•</span>
                                  <span>{sub}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      )
                    }

                    return (
                      <div key={idx} className="flex items-start gap-2.5">
                        <div className="w-4 h-4 rounded-full bg-orange-100 text-[#C23605] flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                        <span className="leading-snug">{feat}</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Card Footer: Renewal info & Timeline */}
              <div className="mt-6 pt-4 border-t border-neutral-100 space-y-1.5">
                {item.renewal && (
                  <div className="text-[11px] text-neutral-500 flex items-start gap-1.5 bg-neutral-50 p-2 rounded-xl border border-neutral-100">
                    <Clock className="w-3.5 h-3.5 text-neutral-400 shrink-0 mt-0.5" />
                    <span className="leading-tight">{item.renewal}</span>
                  </div>
                )}
                {item.time && (
                  <div className="text-[11px] text-neutral-400 text-center font-medium pt-1">
                    {item.time}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
