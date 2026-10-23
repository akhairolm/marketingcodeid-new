'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Sparkles,
  Check,
  CircleDollarSign,
  Layers,
  Code2,
  ArrowRight,
  Info,
} from 'lucide-react'
import { getWhatsAppDirectUrl } from '@/lib/whatsapp'

export interface AdsTierItem {
  tier: string
  price: string
  unit: string
  badgeTop?: string
  isPopular?: boolean
  desc: string
  adSpendNotice: string
  features: string[]
  creativeNote: string
  time: string
  btnText: string
}

const allInTiers: AdsTierItem[] = [
  {
    tier: 'Trial 14 Hari',
    price: 'Rp 1.290.000',
    unit: '/ 14 hari',
    badgeTop: 'Uji Coba Cepat',
    isPopular: false,
    desc: 'Pengujian pasar awal tanpa risiko besar. Saldo iklan dan setup teknis sudah kami siapkan lengkap.',
    adSpendNotice: 'Sudah termasuk saldo iklan Rp 500.000 + pajak resmi',
    features: [
      'Termasuk saldo iklan Rp 500.000 + PPN 11% platform',
      'Setup Google Tag atau Meta Pixel di website',
      'Riset kata kunci atau audiens minat awal',
      '2 variasi visual ad creative & copywriting',
      'Pemantauan harian selama 14 hari kampanye',
      'Laporan evaluasi performa akhir masa uji coba',
    ],
    creativeNote: 'Visual ad creative & copywriting diolah dari foto/info produk dasar milik klien',
    time: 'Masa Uji Coba 14 Hari',
    btnText: 'Coba Paket Trial 14 Hari',
  },
  {
    tier: 'Growth 30 Hari',
    price: 'Rp 2.490.000',
    unit: '/ bulan',
    badgeTop: 'Paling Diminati',
    isPopular: true,
    desc: 'Paket terfavorit UMKM untuk menjaga aliran percakapan WhatsApp masuk stabil setiap hari.',
    adSpendNotice: 'Sudah termasuk saldo iklan Rp 1.000.000 + pajak resmi',
    features: [
      'Termasuk saldo iklan Rp 1.000.000 + PPN 11% platform',
      'Pilihan 1 Platform: Meta Ads (IG/FB) atau Google Ads',
      'Setup & audit tracking konversi event WhatsApp',
      'Riset mendalam kata kunci negatif & audiens minat',
      '4 variasi visual ad creative & copywriting persuasif',
      'Optimasi mingguan (matikan ad boncos, perkuat ad juara)',
      'Laporan kinerja mingguan & bulanan via WhatsApp',
    ],
    creativeNote: 'Visual ad creative & copywriting diolah dari foto/info produk dasar milik klien',
    time: 'Evaluasi & Scaling Mingguan',
    btnText: 'Pilih Paket Growth 30 Hari',
  },
  {
    tier: 'Scale Omnichannel',
    price: 'Rp 3.990.000',
    unit: '/ bulan',
    badgeTop: 'Multi-Platform',
    isPopular: false,
    desc: 'Integrasi Google Search dan Meta Ads Retargeting untuk bisnis yang siap ekspansi omzet.',
    adSpendNotice: 'Sudah termasuk saldo iklan Rp 2.000.000 + pajak resmi',
    features: [
      'Termasuk saldo iklan Rp 2.000.000 + PPN 11% platform',
      'Kombinasi 2 Platform: Google Ads + Meta Ads (IG/FB)',
      'Tracking server-side (Meta CAPI / GTM) anti-bocor',
      '6 variasi visual ad creative & copywriting berkala',
      'Audit & optimasi konversi landing page (CRO)',
      'Pemantauan intensif harian & scaling kampanye',
      'Konsultasi pertumbuhan rutin via WhatsApp',
    ],
    creativeNote: 'Visual ad creative & copywriting diolah dari foto/info produk dasar milik klien',
    time: 'Evaluasi & Scaling Harian',
    btnText: 'Pilih Paket Omnichannel',
  },
]

const feeOnlyTiers: AdsTierItem[] = [
  {
    tier: 'Starter Trial 14 Hari',
    price: 'Rp 790.000',
    unit: '/ 14 hari',
    badgeTop: 'Mulai Dari',
    isPopular: false,
    desc: 'Uji coba jasa optimasi iklan dan perapian tracking dengan anggaran saldo yang fleksibel.',
    adSpendNotice: 'Rekomendasi saldo: mulai Rp 30.000 – Rp 50.000/hari',
    features: [
      'Setup Meta Pixel atau Google Tag di website',
      'Riset audiens target atau kata kunci pencarian',
      '2 variasi visual ad creative & ad copywriting',
      'Pengelolaan intensif selama 14 hari pertama',
      'Laporan evaluasi hasil & rekomendasi langkah lanjut',
      'Akun iklan dan seluruh data 100% milik Anda',
    ],
    creativeNote: 'Visual ad creative & copywriting diolah dari foto/info produk dasar milik klien',
    time: 'Masa Uji Coba 14 Hari',
    btnText: 'Mulai Uji Coba 14 Hari',
  },
  {
    tier: 'Growth 1 Platform',
    price: 'Rp 1.490.000',
    unit: '/ bulan',
    badgeTop: 'Paling Diminati',
    isPopular: true,
    desc: 'Pengelolaan penuh 1 platform iklan dengan pemantauan biaya per percakapan harian.',
    adSpendNotice: 'Rekomendasi saldo: mulai Rp 30.000 – Rp 100.000/hari',
    features: [
      'Pilihan 1 Platform: Meta Ads (IG/FB) atau Google Ads',
      'Setup tracking konversi & pencatatan klik tombol WhatsApp',
      'Riset kata kunci negatif & penyaringan audiens boncos',
      '4 variasi visual ad creative & copywriting teruji',
      'Optimasi mingguan berkelanjutan (bidding & targeting)',
      'Laporan kinerja mingguan via Looker Studio / WhatsApp',
    ],
    creativeNote: 'Visual ad creative & copywriting diolah dari foto/info produk dasar milik klien',
    time: 'Evaluasi & Scaling Mingguan',
    btnText: 'Pilih Growth 1 Platform',
  },
  {
    tier: 'Scale Omnichannel',
    price: 'Rp 2.900.000',
    unit: '/ bulan',
    badgeTop: 'Fitur Terlengkap',
    isPopular: false,
    desc: 'Pengelolaan gabungan Google Search dan Meta Ads untuk mendominasi pasar dari dua arah.',
    adSpendNotice: 'Rekomendasi saldo: mulai Rp 100.000+/hari',
    features: [
      'Pengelolaan 2 Platform: Meta Ads (FB/IG) + Google Ads',
      'Strategi retargeting & funnel terpadu (menghantui prospek)',
      'Setup server-side tracking (Meta CAPI / GA4)',
      '6 variasi visual ad creative & copywriting variatif',
      'Audit kecepatan & rekomendasi konversi landing page',
      'Akses konsultasi langsung dengan pengelola akun',
    ],
    creativeNote: 'Visual ad creative & copywriting diolah dari foto/info produk dasar milik klien',
    time: 'Evaluasi & Scaling Harian',
    btnText: 'Pilih Omnichannel Ads',
  },
]

export function AdsPricingSection() {
  const [pricingMode, setPricingMode] = useState<'all-in' | 'fee-only'>('all-in')
  const activeTiers = pricingMode === 'all-in' ? allInTiers : feeOnlyTiers

  return (
    <div className="relative bg-paper-cream py-20 sm:py-24 overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-blueprint opacity-70"
      />
      <section id="paket-iklan" className="relative max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6">
        <div className="frame-ticks bg-[#FBFBFB]/70 px-3 sm:px-8 lg:px-10 py-10 sm:py-14">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF5F0] border border-orange-200/50 text-[#C23605] text-xs font-semibold mb-3">
              <CircleDollarSign className="w-3.5 h-3.5" />
              <span>Paket Pengelolaan Iklan Terukur</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
              Pilih Skema Pengelolaan Sesuai Kesiapan Bisnis
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base mt-2 max-w-2xl mx-auto leading-relaxed">
              Tersedia paket terima beres (sudah termasuk alokasi saldo iklan &amp; pajak platform) maupun paket jasa pengelolaan murni bila Anda ingin mengontrol saldo di akun sendiri.
            </p>

            {/* Toggle Switcher */}
            <div className="mt-8 flex justify-center">
              <div
                role="tablist"
                aria-label="Skema pembayaran iklan"
                className="bg-neutral-100 p-1.5 rounded-full inline-flex border border-neutral-200 shadow-xs max-w-full"
              >
                <button
                  id="tab-all-in"
                  type="button"
                  role="tab"
                  aria-selected={pricingMode === 'all-in'}
                  aria-controls="panel-all-in"
                  tabIndex={pricingMode === 'all-in' ? 0 : -1}
                  onClick={() => setPricingMode('all-in')}
                  className={`px-4 sm:px-6 py-2.5 text-xs sm:text-sm rounded-full transition-all cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#FF5C28] ${
                    pricingMode === 'all-in'
                      ? 'font-bold bg-white text-neutral-900 shadow-xs'
                      : 'font-semibold text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  All-In Terima Beres (Include Saldo)
                </button>
                <button
                  id="tab-fee-only"
                  type="button"
                  role="tab"
                  aria-selected={pricingMode === 'fee-only'}
                  aria-controls="panel-fee-only"
                  tabIndex={pricingMode === 'fee-only' ? 0 : -1}
                  onClick={() => setPricingMode('fee-only')}
                  className={`px-4 sm:px-6 py-2.5 text-xs sm:text-sm rounded-full transition-all cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#FF5C28] ${
                    pricingMode === 'fee-only'
                      ? 'font-bold bg-white text-neutral-900 shadow-xs'
                      : 'font-semibold text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  Jasa Pengelolaan Saja (Saldo Mandiri)
                </button>
              </div>
            </div>

            <p className="text-xs text-neutral-500 mt-3 font-medium">
              {pricingMode === 'all-in'
                ? 'Semua paket di bawah sudah termasuk estimasi saldo iklan aktif dan PPN 11% platform resmi.'
                : 'Biaya di bawah adalah jasa tenaga teknis & optimasi. Saldo iklan dibayar terpisah dari kartu/akun Anda.'}
            </p>

            <div className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFF5F0] border border-orange-200/80 text-xs sm:text-sm font-semibold text-[#C23605] shadow-xs text-left">
              <span className="flex h-2 w-2 rounded-full bg-[#C23605] animate-pulse shrink-0" />
              <span>Slot Terbatas Bulan Ini: Maksimal 10 klien agar pemantauan kampanye tetap intensif.</span>
            </div>
          </div>

          {/* Cards Grid */}
          <div
            id={pricingMode === 'all-in' ? 'panel-all-in' : 'panel-fee-only'}
            role="tabpanel"
            aria-labelledby={pricingMode === 'all-in' ? 'tab-all-in' : 'tab-fee-only'}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch text-left"
          >
            {activeTiers.map((item) => {
              const isHighlight = item.isPopular
              const waMessage = `Halo Admin MarketingCode.ID, saya tertarik paket iklan ${item.tier} (${item.price}${item.unit}) skema ${
                pricingMode === 'all-in' ? 'All-In Terima Beres' : 'Jasa Saja'
              }. Jenis usaha saya: ____`

              return (
                <div
                  key={item.tier}
                  className={`bg-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative ${
                    isHighlight
                      ? 'border-2 border-[#FF5C28] shadow-xl shadow-orange-500/10 lg:-translate-y-2 lg:scale-[1.02] z-10'
                      : 'border border-neutral-200/80 shadow-card hover:border-orange-200/80 hover:shadow-lg'
                  }`}
                >
                  {isHighlight && (
                    <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#FF5C28] to-[#EA4510] text-white text-[11px] font-extrabold px-4 py-1 rounded-full uppercase tracking-wider shadow-md flex items-center gap-1.5 whitespace-nowrap z-20">
                      <Sparkles className="w-3 h-3" />
                      <span>{item.badgeTop || 'Paling Diminati'}</span>
                    </div>
                  )}

                  <div>
                    {!isHighlight && item.badgeTop && (
                      <div className="mb-3">
                        <span className="inline-flex items-center text-[11px] font-bold text-neutral-600 bg-neutral-100 border border-neutral-200/80 px-2.5 py-0.5 rounded-full">
                          {item.badgeTop}
                        </span>
                      </div>
                    )}

                    <h3 className="text-xl font-extrabold text-neutral-900 tracking-tight">
                      {item.tier}
                    </h3>

                    <p className="text-xs sm:text-[13px] text-neutral-600 mt-2.5 leading-relaxed min-h-[44px]">
                      {item.desc}
                    </p>

                    {/* Price Block */}
                    <div className="mt-5 pt-4 border-t border-neutral-100">
                      <div className="flex items-baseline gap-1.5 flex-wrap">
                        <span className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
                          {item.price}
                        </span>
                        <span className="text-xs text-neutral-500 font-medium">{item.unit}</span>
                      </div>
                      <div className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#C23605] bg-[#FFF5F0] border border-orange-200/60 px-2.5 py-1 rounded-md">
                        <Info className="w-3 h-3 shrink-0" />
                        <span>{item.adSpendNotice}</span>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <a
                      href={getWhatsAppDirectUrl(waMessage)}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Konsultasi ${item.tier} via WhatsApp`}
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

                    {/* Features List */}
                    <div className="mt-6 pt-6 border-t border-neutral-100 space-y-3 text-xs sm:text-[13px] text-neutral-700">
                      {item.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2.5">
                          <div className="w-4 h-4 rounded-full bg-orange-100 text-[#C23605] flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </div>
                          <span className="leading-snug">{feat}</span>
                        </div>
                      ))}
                    </div>

                    {/* Creative Boundary Note */}
                    <div className="mt-4 pt-3 border-t border-dashed border-neutral-200 text-[11px] text-neutral-500 leading-relaxed italic">
                      Catatan: {item.creativeNote}.
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-neutral-100">
                    <div className="text-[11px] text-neutral-600 text-center font-semibold pt-1">
                      {item.time}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* High-Conversion Add-on / Bundling Banner */}
          <div className="mt-12 sm:mt-16 pt-10 border-t border-neutral-200/80">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 text-left">
              {/* Card 1: Bundling Website + Iklan */}
              <div className="bg-gradient-to-br from-[#FFF9F6] to-white rounded-3xl p-6 sm:p-8 border border-orange-200/80 shadow-card flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF5F0] border border-orange-300 text-[#C23605] text-[11px] font-bold uppercase tracking-wider mb-4">
                    <Layers className="w-3.5 h-3.5" />
                    <span>Paket Bundling Hemat</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-neutral-900 tracking-tight">
                    Landing Page Konversi + Kelola Iklan 1 Bulan
                  </h3>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-extrabold text-[#C23605] tracking-tight">
                      Mulai Rp 2.290.000
                    </span>
                    <span className="text-xs text-neutral-500 font-medium">
                      (Hemat Rp 390.000)
                    </span>
                  </div>
                  <p className="text-xs sm:text-[13px] text-neutral-600 mt-3 leading-relaxed">
                    Belum punya website? Solusi komplit: dibuatkan Landing Page cepat siap iklan (domain &amp; server 1 tahun), dipasang tracking pixel WhatsApp, dan langsung dikelola iklannya selama 1 bulan.
                  </p>
                </div>

                <div className="mt-6 pt-5 border-t border-orange-100 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <a
                    href={getWhatsAppDirectUrl(
                      'Halo Admin MarketingCode.ID, saya tertarik Paket Bundling Landing Page + Iklan 1 Bulan (Mulai Rp 2.290.000). Usaha saya: ____'
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold text-white bg-[#D13D00] hover:bg-[#B33400] rounded-full shadow-glow transition-all"
                  >
                    <Image
                      src="/icons/flaticon/whatsapp.svg"
                      alt=""
                      width={16}
                      height={16}
                      className="w-4 h-4 shrink-0"
                    />
                    <span>Konsultasi Paket Bundling</span>
                  </a>
                  <Link
                    href="/jasa-pembuatan-website"
                    className="inline-flex items-center justify-center gap-1 text-xs sm:text-sm font-semibold text-neutral-700 hover:text-[#D13D00] px-3 py-2 transition-colors text-center"
                  >
                    <span>Detail Paket Website</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Card 2: Jasa Setup Tracking Saja */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/80 shadow-card flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-700 text-[11px] font-bold uppercase tracking-wider mb-4">
                    <Code2 className="w-3.5 h-3.5" />
                    <span>Jasa Setup Sekali Bayar</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-neutral-900 tracking-tight">
                    Jasa Pemasangan Tracking &amp; Pixel Saja
                  </h3>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
                      Rp 490.000
                    </span>
                    <span className="text-xs text-neutral-500 font-medium">
                      (Sekali bayar, terima beres)
                    </span>
                  </div>
                  <p className="text-xs sm:text-[13px] text-neutral-600 mt-3 leading-relaxed">
                    Sudah punya website dan ingin beriklan sendiri tapi bingung pasang pelacak? Kami bantu setup Google Tag Manager, Meta Pixel + CAPI, GA4, dan verifikasi event tombol WhatsApp agar data kampanye Anda tercatat rapi.
                  </p>
                </div>

                <div className="mt-6 pt-5 border-t border-neutral-100 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <a
                    href={getWhatsAppDirectUrl(
                      'Halo Admin MarketingCode.ID, saya ingin pesan Jasa Setup Tracking & Pixel Saja (Rp 490.000). Website saya: ____'
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold text-white bg-neutral-900 hover:bg-neutral-800 rounded-full transition-all"
                  >
                    <Image
                      src="/icons/flaticon/whatsapp.svg"
                      alt=""
                      width={16}
                      height={16}
                      className="w-4 h-4 shrink-0"
                    />
                    <span>Pesan Setup Tracking Saja</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
