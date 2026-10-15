import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  Target,
  Search,
  Filter,
  PieChart,
  TrendingUp,
  CheckCircle2,
  Check,
  MessageCircle,
} from 'lucide-react'
import { getWhatsAppUrl } from '@/lib/whatsapp'
import { JsonLd, serviceSchema, breadcrumbSchema } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Jasa Digital Marketing & Performance Ads Kalimantan Selatan | MarketingCode.ID',
  description:
    'Jasa digital marketing terukur di Kalimantan Selatan: iklan Meta & Google Ads, strategi akuisisi leads WhatsApp, dan optimasi konversi untuk UMKM sampai perusahaan.',
  alternates: { canonical: '/digital-marketing' },
  openGraph: {
    title: 'Jasa Digital Marketing & Performance Ads Kalimantan Selatan',
    description:
      'Jasa digital marketing terukur di Kalimantan Selatan: iklan Meta & Google Ads, strategi akuisisi leads WhatsApp, dan optimasi konversi.',
    url: '/digital-marketing',
    siteName: 'MarketingCode.ID',
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jasa Digital Marketing & Performance Ads Kalimantan Selatan | MarketingCode.ID',
    description:
      'Jasa digital marketing terukur di Kalimantan Selatan: iklan Meta & Google Ads, strategi akuisisi leads WhatsApp, dan optimasi konversi.',
  },
}

export default function DigitalMarketingPage() {
  return (
    <div className="min-h-screen font-sans bg-[#FBFBFB] text-[#18181B] antialiased selection:bg-[#FF5C28] selection:text-white">
      <JsonLd
        data={[
          serviceSchema(
            'Jasa Digital Marketing & Performance Ads',
            'Manajemen kampanye periklanan Meta Ads dan Google Ads berorientasi konversi leads WhatsApp dan omzet bisnis.',
            '/digital-marketing',
          ),
          breadcrumbSchema([
            { name: 'Beranda', path: '/' },
            { name: 'Digital Marketing', path: '/digital-marketing' },
          ]),
        ]}
      />

      <main className="relative bg-grid-pattern pt-32 pb-24 overflow-hidden">
        {/* Hero Section */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center pt-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF5F0] border border-orange-200/50 text-[#EA4510] text-xs font-semibold mb-4">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Performance Marketing & Acquisition</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#111827] tracking-tight leading-[1.15]">
            Digital Marketing Berbasis <span className="text-[#FF5C28]">ROI & Konversi Omzet</span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            Hentikan pemborosan budget iklan tanpa hasil terukur. Kami merancang strategi funnel pemasaran presisi melalui Meta Ads, Google Search, SEO teknis, dan tracking CAPI server-side anti-bocor.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={getWhatsAppUrl('ads')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3.5 text-sm font-semibold text-white bg-[#FF5C28] hover:bg-[#EA4510] rounded-full shadow-glow transition-all transform hover:-translate-y-0.5"
            >
              <span>Audit Akun Iklan Gratis</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </a>
            <div className="flex items-center gap-1.5 text-xs text-neutral-500">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>Analisis komprehensif dalam 24 jam</span>
            </div>
          </div>
        </section>

        {/* 4 Pillars of Marketing */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 mt-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-neutral-200/80 shadow-card">
              <div className="w-12 h-12 rounded-2xl bg-[#FFF5F0] border border-orange-200/60 flex items-center justify-center text-[#FF5C28] mb-4">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900">Meta Ads (Facebook & Instagram)</h3>
              <p className="text-xs text-neutral-500 mt-2 leading-relaxed">
                Penargetan audiens berbasis data perilaku, integrasi Meta Conversions API (CAPI) server-side anti-kebocoran iOS 14+, dan variasi materi visual berkonversi tinggi.
              </p>
              <div className="mt-4 space-y-2 text-xs text-neutral-600">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#FF5C28]" /> Setup CAPI Server Gateway
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#FF5C28]" /> Retargeting & Lookalike Audience
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-neutral-200/80 shadow-card">
              <div className="w-12 h-12 rounded-2xl bg-[#FFF5F0] border border-orange-200/60 flex items-center justify-center text-[#FF5C28] mb-4">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900">Google Ads & Organic SEO</h3>
              <p className="text-xs text-neutral-500 mt-2 leading-relaxed">
                Tangkap calon pembeli yang memiliki intensi beli tinggi melalui Google Search Ads, Performance Max, dan optimasi struktur SEO organik jangka panjang.
              </p>
              <div className="mt-4 space-y-2 text-xs text-neutral-600">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#FF5C28]" /> Riset Kata Kunci Buying Intent
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#FF5C28]" /> Optimasi Skor Kualitas Iklan (Quality Score)
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-neutral-200/80 shadow-card">
              <div className="w-12 h-12 rounded-2xl bg-[#FFF5F0] border border-orange-200/60 flex items-center justify-center text-[#FF5C28] mb-4">
                <Filter className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900">Funnel & CRO Optimization</h3>
              <p className="text-xs text-neutral-500 mt-2 leading-relaxed">
                Memperbaiki alur perjalanan pengunjung dari klik iklan pertama hingga transfer pembayaran, menurunkan rasio bounce, dan meningkatkan persentase konversi.
              </p>
              <div className="mt-4 space-y-2 text-xs text-neutral-600">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#FF5C28]" /> Heatmap & User Session Recording
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#FF5C28]" /> A/B Testing Copywriting & Penawaran
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-neutral-200/80 shadow-card">
              <div className="w-12 h-12 rounded-2xl bg-[#FFF5F0] border border-orange-200/60 flex items-center justify-center text-[#FF5C28] mb-4">
                <PieChart className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900">Live Transparent Analytics</h3>
              <p className="text-xs text-neutral-500 mt-2 leading-relaxed">
                Dashboard monitoring Looker Studio real-time sehingga Anda dapat melihat setiap rupiah biaya iklan dan omzet yang dihasilkan secara transparan 24/7.
              </p>
              <div className="mt-4 space-y-2 text-xs text-neutral-600">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#FF5C28]" /> Dashboard Realtime Looker Studio
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#FF5C28]" /> Laporan Kinerja & Evaluasi Mingguan
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
                Siap Memulai Kampanye Iklan Berkinerja Tinggi?
              </h2>
              <p className="text-neutral-400 text-xs sm:text-sm">
                Diskusikan target omzet Anda bersama lead media buyer kami. Dapatkan road-map strategi tanpa komitmen awal.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={getWhatsAppUrl('ads')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-8 py-3 bg-[#FF5C28] hover:bg-[#EA4510] text-white font-bold text-xs rounded-full shadow-glow transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  Mulai Konsultasi via WhatsApp
                </a>
                <Link
                  href="/"
                  className="w-full sm:w-auto px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded-full border border-white/15 transition-all"
                >
                  Lihat Layanan Lainnya
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
