'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'
import { getWhatsAppUrl } from '@/lib/whatsapp'
import { trackWhatsAppClick } from '@/lib/analytics'

export function HeroSection() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-10">
      <link
        rel="preload"
        as="image"
        href="/images/hero-team-mobile.webp"
        type="image/webp"
        media="(max-width: 640px)"
        fetchPriority="high"
      />
      <link
        rel="preload"
        as="image"
        href="/images/hero-team.webp"
        type="image/webp"
        media="(min-width: 641px)"
        fetchPriority="high"
      />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        <div className="lg:col-span-7 space-y-6 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-neutral-200/80 shadow-xs hover:border-orange-200 transition-colors">
            <span className="text-xs font-semibold text-neutral-700 tracking-tight">
              Jasa Pembuatan Website · Kalimantan Selatan
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold text-[#111827] tracking-tight leading-[1.14]">
            Website Profesional untuk <span className="text-[#FF5C28]">UMKM &amp; Bisnis</span> yang Ingin Tampil Lebih Dipercaya
          </h1>

          <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-normal max-w-xl">
            Kami membantu bisnis menampilkan layanan, produk, dan informasi penting melalui website yang rapi, responsif, dan memudahkan calon pelanggan menghubungi Anda. Mulai dari landing page sederhana hingga company profile bisnis di Banjarmasin, Banjarbaru, Kandangan, dan seluruh Kalimantan Selatan.
          </p>

          <div className="pt-2 flex flex-col items-start gap-3">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
              <a
                href={getWhatsAppUrl('website')}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick({ position: 'hero_primary', service: 'website' })}
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm sm:text-base font-semibold text-white bg-[#D13D00] hover:bg-[#B33400] rounded-full shadow-glow transition-all duration-300 transform hover:-translate-y-1"
              >
                <Image
                  src="/icons/flaticon/chat.svg"
                  alt=""
                  width={22}
                  height={22}
                  className="w-5 h-5 shrink-0"
                />
                <span>Konsultasi Website via WhatsApp</span>
              </a>
              <Link
                href="#portfolio"
                className="inline-flex items-center justify-center px-6 py-3.5 text-sm sm:text-base font-semibold text-neutral-800 bg-white hover:border-[#D13D00] border border-neutral-200 rounded-full transition-all duration-300 text-center"
              >
                <span>Lihat Portofolio</span>
              </Link>
            </div>
            <p className="text-xs sm:text-sm text-neutral-500 flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="inline-flex items-center gap-1">
                <Image
                  src="/icons/flaticon/quick.svg"
                  alt=""
                  width={14}
                  height={14}
                  className="w-3.5 h-3.5 shrink-0"
                />
                Konsultasi awal tanpa biaya
              </span>
              <span>•</span>
              <span>Siap diskusi tatap muka di Kalsel</span>
              <span>•</span>
              <span>100% Hak Milik Tanpa Biaya Sewa</span>
            </p>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="relative bg-neutral-900 rounded-3xl overflow-hidden shadow-2xl border border-neutral-200/80 aspect-[16/10] sm:aspect-[4/3] group">
            <picture>
              <source
                media="(max-width: 640px)"
                srcSet="/images/hero-team-mobile.webp"
                type="image/webp"
              />
              <source srcSet="/images/hero-team.webp" type="image/webp" />
              <img
                src="/images/hero-team.webp"
                alt="Pratinjau rancangan website modern dan responsif untuk UMKM Kalimantan Selatan"
                title="Website Modern & Responsif MarketingCode.ID"
                width={1200}
                height={800}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="w-full h-full object-cover opacity-75 group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </picture>

            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/30" />

            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-white">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs font-medium mb-3">
                <Sparkles className="w-3.5 h-3.5 text-[#FF5C28]" />
                <span>Next.js · Mobile First · Cepat</span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold tracking-tight max-w-xs text-white">
                Rancangan Website Terstruktur &amp; Ramah Pelanggan
              </h2>
              <p className="text-xs text-neutral-300 mt-2 max-w-xs leading-relaxed">
                Katalog produk teratur, tampilan ringan di ponsel, dan tombol pemesanan WhatsApp langsung.
              </p>
              <Link
                href="#portfolio"
                className="mt-4 inline-flex items-center gap-1.5 px-5 py-2.5 bg-white hover:bg-neutral-100 text-neutral-900 text-xs font-bold rounded-full shadow-lg transition-all transform hover:scale-105"
              >
                <span>Eksplorasi Studi Kasus</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#D13D00]" />
              </Link>
            </div>

            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs">
              <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[11px]">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Standar Modern Web 2026</span>
              </div>
              <span className="bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] text-white">
                Kalimantan Selatan
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
