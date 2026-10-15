import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  Film,
  Sparkles,
  Smartphone,
  Play,
  CheckCircle2,
  Check,
  MessageCircle,
} from 'lucide-react'
import { getWhatsAppUrl } from '@/lib/whatsapp'
import { JsonLd, serviceSchema, breadcrumbSchema } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Jasa Video Editing & Motion Ads Profesional | MarketingCode.ID',
  description:
    'Jasa video editing iklan, reels, dan motion graphics untuk bisnis di Kalimantan Selatan. Materi iklan yang meningkatkan konversi Meta Ads dan konten sosial media Anda.',
  alternates: { canonical: '/video-editing' },
  openGraph: {
    title: 'Jasa Video Editing & Motion Ads Profesional',
    description:
      'Jasa video editing iklan, reels, dan motion graphics untuk bisnis di Kalimantan Selatan. Materi iklan yang meningkatkan konversi Meta Ads.',
    url: '/video-editing',
    siteName: 'MarketingCode.ID',
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jasa Video Editing & Motion Ads Profesional | MarketingCode.ID',
    description:
      'Jasa video editing iklan, reels, dan motion graphics untuk bisnis di Kalimantan Selatan.',
  },
}

export default function VideoEditingPage() {
  return (
    <div className="min-h-screen font-sans bg-[#FBFBFB] text-[#18181B] antialiased selection:bg-[#FF5C28] selection:text-white">
      <JsonLd
        data={[
          serviceSchema(
            'Jasa Video Editing & Motion Ads',
            'Produksi dan editing materi video kreatif untuk iklan Reels, TikTok, dan video profil korporat dengan daya pikat tinggi.',
            '/video-editing',
          ),
          breadcrumbSchema([
            { name: 'Beranda', path: '/' },
            { name: 'Video Editing', path: '/video-editing' },
          ]),
        ]}
      />

      <main className="relative bg-grid-pattern pt-32 pb-24 overflow-hidden">
        {/* Hero Section */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center pt-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF5F0] border border-orange-200/50 text-[#EA4510] text-xs font-semibold mb-4">
            <Film className="w-3.5 h-3.5" />
            <span>Creative Video & Motion Production</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#111827] tracking-tight leading-[1.15]">
            Konten Video Kreatif dengan <span className="text-[#FF5C28]">Retensi & Hook Tinggi</span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            Tangkap perhatian audiens dalam 3 detik pertama. Kami memproduksi materi video iklan vertikal untuk TikTok, Instagram Reels, dan YouTube Shorts yang dirancang spesifik untuk meningkatkan konversi dan engagement.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={getWhatsAppUrl('general', 'Video Editing Project')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3.5 text-sm font-semibold text-white bg-[#FF5C28] hover:bg-[#EA4510] rounded-full shadow-glow transition-all transform hover:-translate-y-0.5"
            >
              <span>Diskusikan Konsep Video</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </a>
            <div className="flex items-center gap-1.5 text-xs text-neutral-500">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>Revisi transparan & pengerjaan cepat</span>
            </div>
          </div>
        </section>

        {/* 4 Video Services Pillars */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 mt-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-neutral-200/80 shadow-card">
              <div className="w-12 h-12 rounded-2xl bg-[#FFF5F0] border border-orange-200/60 flex items-center justify-center text-[#FF5C28] mb-4">
                <Smartphone className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900">Short-Form Ads (TikTok & Reels)</h3>
              <p className="text-xs text-neutral-500 mt-2 leading-relaxed">
                Video format 9:16 vertikal dengan hook psikologis, transisi dinamis, kinetic typography, dan storytelling yang terbukti meningkatkan click-through rate (CTR).
              </p>
              <div className="mt-4 space-y-2 text-xs text-neutral-600">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#FF5C28]" /> Hook 3 Detik Pertama Anti-Skip
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#FF5C28]" /> Caption Dinamis & Sound Effects SFX
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-neutral-200/80 shadow-card">
              <div className="w-12 h-12 rounded-2xl bg-[#FFF5F0] border border-orange-200/60 flex items-center justify-center text-[#FF5C28] mb-4">
                <Play className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900">Company Showreel & Explainer</h3>
              <p className="text-xs text-neutral-500 mt-2 leading-relaxed">
                Video profil perusahaan dan demonstrasi produk berstandar sinematik yang membangun rasa percaya instan bagi calon klien korporat Anda.
              </p>
              <div className="mt-4 space-y-2 text-xs text-neutral-600">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#FF5C28]" /> Color Grading Sinematik Pro
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#FF5C28]" /> Voice Over & Audio Mastering Jernih
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-neutral-200/80 shadow-card">
              <div className="w-12 h-12 rounded-2xl bg-[#FFF5F0] border border-orange-200/60 flex items-center justify-center text-[#FF5C28] mb-4">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900">Motion Graphics & 2D Animation</h3>
              <p className="text-xs text-neutral-500 mt-2 leading-relaxed">
                Animasi logo, infografis data produk bergerak, dan visualisasi fitur aplikasi yang membuat materi promosi Anda terlihat sangat modern.
              </p>
              <div className="mt-4 space-y-2 text-xs text-neutral-600">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#FF5C28]" /> UI Mockup Screencast Animation
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#FF5C28]" /> Custom Brand Element Animation
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-neutral-200/80 shadow-card">
              <div className="w-12 h-12 rounded-2xl bg-[#FFF5F0] border border-orange-200/60 flex items-center justify-center text-[#FF5C28] mb-4">
                <Film className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900">Social Media Content Retainer</h3>
              <p className="text-xs text-neutral-500 mt-2 leading-relaxed">
                Paket bulanan rutin (15-30 video/bulan) siap posting untuk menjaga konsistensi kehadiran brand Anda di algoritma TikTok dan Instagram.
              </p>
              <div className="mt-4 space-y-2 text-xs text-neutral-600">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#FF5C28]" /> Batch Recording & Rapid Editing
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#FF5C28]" /> Thumbnail Cover & Copywriting Caption
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Card */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 mt-20">
          <div className="bg-[#121214] rounded-3xl p-8 sm:p-12 text-center text-white relative overflow-hidden shadow-2xl border border-neutral-800">
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#FF5C28]/20 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 max-w-xl mx-auto space-y-4">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Mulai Buat Video yang Mengubah Penonton Jadi Pembeli
              </h2>
              <p className="text-neutral-400 text-xs sm:text-sm">
                Kirimkan materi mentah (raw footage) atau diskusikan konsep kreatif bersama video editor kami.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={getWhatsAppUrl('general', 'Video Editing Order')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-8 py-3 bg-[#FF5C28] hover:bg-[#EA4510] text-white font-bold text-xs rounded-full shadow-glow transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  Chat Konsultasi Video
                </a>
                <Link
                  href="/"
                  className="w-full sm:w-auto px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded-full border border-white/15 transition-all"
                >
                  Kembali ke Home
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-neutral-200/80 py-8 text-center text-xs text-neutral-400">
        &copy; 2026 MarketingCode.ID Digital Agency. Hak Cipta Dilindungi.
      </footer>
    </div>
  )
}
