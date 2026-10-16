'use client'

import { useState } from 'react'
import { Tag, Check } from 'lucide-react'
import { getWhatsAppUrl } from '@/lib/whatsapp'
import { pricingData } from './home-data'

const TABS = [
  { value: 'web', label: 'Website Development' },
  { value: 'app', label: 'Mobile Application' },
  { value: 'ads', label: 'Digital Marketing' },
] as const

export function PricingSection() {
  const [tab, setTab] = useState<(typeof TABS)[number]['value']>('web')

  return (
    <div id="harga" className="max-w-5xl mx-auto mt-24 pt-8">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF5F0] border border-orange-200/50 text-[#C23605] text-xs font-semibold mb-3">
          <Tag className="w-3.5 h-3.5" />
          <span>Pilihan Paket Transparan</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
          Paket Investasi Transparan Sesuai Skala Bisnis
        </h2>
        <p className="text-neutral-500 text-sm mt-2 max-w-lg mx-auto">
          Pilih paket yang paling pas untuk akselerasi bisnis Anda. Tersedia garansi performa dan purna jual.
        </p>

        <div className="mt-8 flex justify-center">
          <div className="bg-neutral-100 p-1.5 rounded-full inline-flex border border-neutral-200">
            {TABS.map((t) => (
              <button
                key={t.value}
                type="button"
                onClick={() => setTab(t.value)}
                className={`px-5 py-2 text-xs rounded-full transition-all cursor-pointer ${
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
        {pricingData[tab].map((item) => (
          <div
            key={item.tier}
            className={`bg-white rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all ${
              item.isPopular
                ? 'border-2 border-[#D13D00] shadow-xl relative transform md:-translate-y-2'
                : 'border border-neutral-200/80 shadow-card hover:border-orange-200'
            }`}
          >
            {item.isPopular && (
              <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 bg-[#D13D00] text-white text-[11px] font-bold px-3.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                Paling Populer
              </div>
            )}

            <div>
              <span
                className={`text-xs font-bold uppercase tracking-wider ${
                  item.isPopular ? 'text-[#C23605]' : 'text-neutral-500'
                }`}
              >
                {item.tier}
              </span>
              <div className="mt-3 flex items-baseline">
                <span className="text-3xl font-extrabold text-neutral-900">{item.price}</span>
                <span className="text-xs text-neutral-500 ml-1.5">{item.unit}</span>
              </div>
              <p className="text-xs text-neutral-500 mt-2">{item.desc}</p>

              <a
                href={getWhatsAppUrl(item.ctaContext, `${item.tier} (${item.price})`)}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-6 w-full py-2.5 px-4 font-semibold text-xs rounded-full flex items-center justify-center transition-all ${
                  item.isPopular
                    ? 'bg-[#D13D00] hover:bg-[#B33400] text-white shadow-glow'
                    : 'bg-neutral-900 hover:bg-black text-white'
                }`}
              >
                {item.btnText}
              </a>

              <div className="mt-6 pt-6 border-t border-neutral-100 space-y-2.5 text-xs text-neutral-600">
                {item.features.map((feat) => (
                  <div key={feat} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#C23605] shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-100 text-[11px] text-neutral-500 text-center">
              {item.time}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
