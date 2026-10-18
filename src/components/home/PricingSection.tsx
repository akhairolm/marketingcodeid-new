'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Tag, Check, ArrowRight } from 'lucide-react'
import { getWhatsAppUrl } from '@/lib/whatsapp'
import { trackWhatsAppClick } from '@/lib/analytics'
import { pricingData } from './home-data'

const TABS = [
  { value: 'web', label: 'Website Development (Utama)' },
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
          Pilih paket yang paling pas untuk akselerasi bisnis Anda. Tersedia garansi pemeliharaan teknis dan serah terima aset 100%.
        </p>

        <div className="mt-8 flex justify-center">
          <div
            role="tablist"
            aria-label="Kategori paket harga"
            className="bg-neutral-100 p-1.5 rounded-full inline-flex border border-neutral-200"
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
                className={`px-4 sm:px-5 py-2 text-xs rounded-full transition-all cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#D13D00] ${
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

      <div
        id={`pricing-tabpanel-${tab}`}
        role="tabpanel"
        aria-labelledby={`pricing-tab-${tab}`}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left"
      >
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
                Paling Diminati
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
                onClick={() =>
                  trackWhatsAppClick({
                    position: 'pricing_card',
                    packageTitle: item.tier,
                    service: item.ctaContext,
                  })
                }
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

      <div className="mt-6 p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-xs text-amber-950 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-left">
        <p className="leading-relaxed">
          <span className="font-bold">Ketentuan Domain &amp; Cloud Hosting:</span> Domain (.com/.id) dan cloud hosting berkecepatan tinggi gratis selama 1 tahun pertama untuk paket UMKM &amp; Company Profile. Pada tahun berikutnya berlaku biaya perpanjangan tahunan standar tanpa biaya sewa sistem.
        </p>
        <span className="shrink-0 text-[11px] font-semibold text-amber-800 bg-amber-100/90 px-2.5 py-1 rounded-full w-fit">
          100% Hak Milik
        </span>
      </div>

      {tab === 'web' && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
          <div className="p-5 bg-white border border-neutral-200/80 rounded-2xl shadow-card flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">Layanan Pendukung</span>
              <h4 className="text-sm font-bold text-neutral-900 mt-1">Aplikasi Mobile (Android &amp; iOS)</h4>
              <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                Pengembangan aplikasi cross-platform Flutter untuk presensi, e-government, dan booking operasional. Mulai Rp 18 Juta.
              </p>
            </div>
            <Link
              href="/jasa-pembuatan-aplikasi-mobile"
              className="inline-flex items-center text-xs font-bold text-[#D13D00] hover:underline mt-3"
            >
              <span>Pelajari Layanan Mobile App</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </div>
          <div className="p-5 bg-white border border-neutral-200/80 rounded-2xl shadow-card flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">Layanan Pendukung</span>
              <h4 className="text-sm font-bold text-neutral-900 mt-1">Manajemen Iklan Meta Ads</h4>
              <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                Setup riset audiens tertarget, Meta Pixel, video Reels promosi, dan optimasi Click-to-WhatsApp. Mulai Rp 3,5 Juta/bln.
              </p>
            </div>
            <Link
              href="/jasa-iklan-meta-ads"
              className="inline-flex items-center text-xs font-bold text-[#D13D00] hover:underline mt-3"
            >
              <span>Pelajari Layanan Meta Ads</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </div>
        </div>
      )}

      <div className="mt-8 bg-neutral-50 rounded-2xl p-5 sm:p-6 border border-neutral-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
        <div>
          <h4 className="text-xs sm:text-sm font-bold text-neutral-900">
            Butuh Portal Instansi, Sistem Kustom, atau Integrasi Khusus?
          </h4>
          <p className="text-xs text-neutral-500 mt-1">
            Tersedia skema penawaran resmi dengan Surat Perjanjian Kerja (SPK), standar SPBE, dan kelengkapan administrasi BAST.
          </p>
        </div>
        <a
          href={getWhatsAppUrl('website', 'Konsultasi Sistem Kustom / Instansi')}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            trackWhatsAppClick({
              position: 'pricing_custom_system',
              service: 'custom',
            })
          }
          className="whitespace-nowrap px-5 py-2.5 bg-white hover:bg-neutral-100 text-neutral-800 border border-neutral-300 font-semibold text-xs rounded-full transition-all shrink-0"
        >
          Konsultasi Kustom
        </a>
      </div>
    </div>
  )
}
