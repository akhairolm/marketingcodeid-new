'use client'

import Image from 'next/image'
import Link from 'next/link'
import { getWhatsAppUrl } from '@/lib/whatsapp'
import { trackWhatsAppClick } from '@/lib/analytics'

export function HeroSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 lg:pt-12">
      <link
        rel="preload"
        as="image"
        href="/images/hero-illustration-mobile.webp"
        type="image/webp"
        media="(max-width: 640px)"
        fetchPriority="high"
      />
      <link
        rel="preload"
        as="image"
        href="/images/hero-illustration.webp"
        type="image/webp"
        media="(min-width: 641px)"
        fetchPriority="high"
      />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-12 items-center">
        <div className="lg:col-span-6 xl:col-span-6 space-y-6 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-neutral-200/80 shadow-xs hover:border-orange-200 transition-colors">
            <span className="text-xs font-semibold text-neutral-700 tracking-tight">
              Jasa Pembuatan Website · Kalimantan Selatan
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold text-[#111827] tracking-tight leading-[1.14]">
            Website Profesional untuk <span className="text-[#FF5C28]">UMKM &amp; Bisnis</span> yang
            Ingin Tampil Lebih Dipercaya
          </h1>

          <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-normal max-w-xl">
            Kami membantu bisnis menampilkan layanan, produk, dan informasi penting melalui website
            yang rapi, responsif, dan memudahkan calon pelanggan menghubungi Anda. Mulai dari
            landing page sederhana hingga company profile bisnis di Banjarmasin, Banjarbaru,
            Kandangan, dan seluruh Kalimantan Selatan.
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
                  src="/icons/flaticon/whatsapp.svg"
                  alt=""
                  width={24}
                  height={24}
                  className="w-6 h-6 shrink-0"
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
          </div>
        </div>

        <div className="lg:col-span-6 xl:col-span-6 flex justify-center lg:justify-end items-center">
          <div className="relative w-full max-w-lg sm:max-w-xl lg:max-w-none">
            <div
              className="absolute -inset-6 bg-gradient-to-tr from-[#38bdf8]/15 via-[#FF5C28]/10 to-transparent rounded-full blur-3xl -z-10"
              aria-hidden="true"
            />
            <picture>
              <source
                media="(max-width: 640px)"
                srcSet="/images/hero-illustration-mobile.webp"
                type="image/webp"
              />
              <source srcSet="/images/hero-illustration.webp" type="image/webp" />
              <img
                src="/images/hero-illustration.png"
                alt="Solusi Pembuatan Website, Aplikasi Mobile, dan Optimasi Digital MarketingCode.ID Kalimantan Selatan"
                title="Layanan Digital MarketingCode.ID Kalimantan Selatan"
                width={1024}
                height={682}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="w-full h-auto object-contain drop-shadow-2xl hover:scale-[1.02] transition-transform duration-500 ease-out"
              />
            </picture>
          </div>
        </div>
      </div>
    </section>
  )
}
