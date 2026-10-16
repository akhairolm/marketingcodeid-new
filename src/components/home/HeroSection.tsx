'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Play, X, Film, ArrowRight } from 'lucide-react'

export function HeroSection() {
  const [videoModalOpen, setVideoModalOpen] = useState(false)

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        <div className="lg:col-span-7 space-y-6 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-neutral-200/80 shadow-xs hover:border-orange-200 transition-colors">
            <span className="text-xs font-semibold text-neutral-700 tracking-tight">
              Partner Transformasi Digital &amp; Pertumbuhan Bisnis Anda
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold text-[#111827] tracking-tight leading-[1.14]">
            Solusi Pembuatan <span className="text-[#FF5C28]">Website</span>,{' '}
            <span className="text-[#FF5C28]">Aplikasi Mobile</span> &amp; Digital Marketing di Kalimantan Selatan
          </h1>

          <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-normal max-w-xl">
            Kami membantu instansi pemerintah, perusahaan, dan pelaku usaha di Kandangan (Hulu Sungai Selatan), Banua Enam, hingga seluruh Kalimantan Selatan membangun sistem teknologi kustom dan mendatangkan prospek berkualitas melalui strategi periklanan terukur.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <a
              href="#konsultasi"
              className="inline-flex items-center justify-center px-8 py-3.5 text-sm sm:text-base font-semibold text-white bg-[#FF5C28] hover:bg-[#EA4510] rounded-full shadow-glow transition-all duration-300 transform hover:-translate-y-1"
            >
              <span>Mulai Konsultasi Gratis</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </a>
            <Link
              href="#web-services"
              className="inline-flex items-center justify-center px-8 py-3.5 text-sm sm:text-base font-semibold text-neutral-800 bg-white hover:border-[#FF5C28] border border-neutral-200 rounded-full transition-all duration-300"
            >
              <span>Lihat Layanan Kami</span>
            </Link>
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
              <source
                srcSet="/images/hero-team.webp"
                type="image/webp"
              />
              <img
                src="/images/hero-team.webp"
                alt="Tim Developer dan Digital Marketing MarketingCode.ID di Kalimantan Selatan"
                title="Tim Digital Agency & Software House MarketingCode.ID"
                width={1200}
                height={800}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </picture>

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />

            <div className="absolute inset-0 flex items-center justify-center">
              <button
                type="button"
                onClick={() => setVideoModalOpen(true)}
                aria-label="Putar Video Showreel Agensi MarketingCode.ID"
                className="w-16 h-16 sm:w-20 sm:h-20 bg-white/90 hover:bg-white text-[#FF5C28] rounded-full flex items-center justify-center shadow-2xl backdrop-blur-md transition-all duration-300 transform hover:scale-110 group-hover:shadow-glow cursor-pointer"
              >
                <Play className="w-7 h-7 fill-[#FF5C28] text-[#FF5C28] translate-x-0.5" />
              </button>
            </div>

            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs">
              <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[11px]">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Showreel Agensi 2026</span>
              </div>
              <span className="bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] text-white">
                1:45 Min
              </span>
            </div>
          </div>
        </div>
      </div>

      {videoModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setVideoModalOpen(false)}
        >
          <div
            className="bg-neutral-900 rounded-3xl max-w-2xl w-full p-4 border border-white/10 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setVideoModalOpen(false)}
              className="absolute top-2 right-2 w-10 h-10 rounded-full bg-white text-neutral-900 flex items-center justify-center font-bold shadow-lg hover:bg-neutral-200 cursor-pointer"
              aria-label="Tutup Video Modal"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="aspect-video bg-black rounded-2xl flex flex-col items-center justify-center text-center p-6 text-white">
              <Film className="w-12 h-12 text-[#FF5C28] mb-3" />
              <h4 className="text-base font-bold">Video Showreel MarketingCode.ID</h4>
              <p className="text-xs text-neutral-400 mt-1 max-w-md">
                Cuplikan sprint desain UI/UX, pengkodean backend Next.js 16 &amp; dashboard custom, serta live tracking dashboard iklan Meta &amp; Google.
              </p>
              <span className="mt-4 px-3 py-1 bg-white/10 rounded-full text-[10px] text-neutral-300">
                Durasi: 1 Menit 45 Detik
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
