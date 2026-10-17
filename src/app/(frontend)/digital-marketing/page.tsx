import React from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
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
            Strategi Pemasaran Digital: <span className="text-[#FF5C28]">Iklan Tepat Sasaran &amp; Konversi Omzet</span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            Jangan biarkan biaya promosi terbuang tanpa hasil. Kami bantu bisnis Anda ditemukan calon pembeli yang siap belanja di Google dan media sosial, lalu mengarahkannya langsung ke WhatsApp Anda dengan hasil yang terukur.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={getWhatsAppUrl('marketing')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-semibold text-white bg-[#FF5C28] hover:bg-[#EA4510] rounded-full shadow-glow transition-all transform hover:-translate-y-0.5"
            >
              <Image src="/icons/flaticon/dashboard.svg" alt="" width={18} height={18} className="w-4 h-4 shrink-0" />
              <span>Dapatkan Audit Akun Iklan Gratis via WhatsApp</span>
              <ArrowRight className="w-4 h-4 ml-1" />
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
              <h3 className="text-lg font-bold text-neutral-900">Meta Ads (Facebook &amp; Instagram)</h3>
              <p className="text-xs text-neutral-500 mt-2 leading-relaxed">
                Penargetan audiens pembeli potensial di Instagram &amp; Facebook, pelacakan hasil iklan yang akurat, serta materi video dan banner yang langsung mengarahkan calon pembeli ke chat WhatsApp Anda.
              </p>
              <div className="mt-4 space-y-2 text-xs text-neutral-600">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#FF5C28]" /> Setup Pelacakan Konversi Akurat
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#FF5C28]" /> Target Audiens Minat Beli Tinggi
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-neutral-200/80 shadow-card">
              <div className="w-12 h-12 rounded-2xl bg-[#FFF5F0] border border-orange-200/60 flex items-center justify-center text-[#FF5C28] mb-4">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900">Google Ads &amp; SEO Lokal</h3>
              <p className="text-xs text-neutral-500 mt-2 leading-relaxed">
                Jangkau calon pelanggan yang memang sedang aktif mencari produk atau jasa Anda di Google Search pada saat mereka butuh dan siap bertransaksi.
              </p>
              <div className="mt-4 space-y-2 text-xs text-neutral-600">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#FF5C28]" /> Riset Kata Kunci Pembeli Siap Transaksi
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#FF5C28]" /> Tampil di Halaman Pertama Google
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-neutral-200/80 shadow-card">
              <div className="w-12 h-12 rounded-2xl bg-[#FFF5F0] border border-orange-200/60 flex items-center justify-center text-[#FF5C28] mb-4">
                <Filter className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900">Funnel &amp; Optimasi Konversi (CRO)</h3>
              <p className="text-xs text-neutral-500 mt-2 leading-relaxed">
                Memperbaiki alur perjalanan calon pembeli: dari klik iklan pertama hingga mantap chat WhatsApp, mengurangi chat PHP, dan mendongkrak rasio penutupan penjualan (closing).
              </p>
              <div className="mt-4 space-y-2 text-xs text-neutral-600">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#FF5C28]" /> Evaluasi &amp; Perbaikan Alur Chat WA
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#FF5C28]" /> Uji Coba Naskah Penawaran Promo
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-neutral-200/80 shadow-card">
              <div className="w-12 h-12 rounded-2xl bg-[#FFF5F0] border border-orange-200/60 flex items-center justify-center text-[#FF5C28] mb-4">
                <PieChart className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900">Laporan Transparan yang Mudah Dipahami</h3>
              <p className="text-xs text-neutral-500 mt-2 leading-relaxed">
                Laporan berkala yang jelas dan tanpa istilah rumit: Anda bisa melihat dengan pasti berapa rupiah biaya promosi yang keluar dan berapa jumlah orderan yang masuk setiap minggunya.
              </p>
              <div className="mt-4 space-y-2 text-xs text-neutral-600">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#FF5C28]" /> Laporan Mingguan Terbuka &amp; Jelas
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#FF5C28]" /> Evaluasi &amp; Rekomendasi Pertumbuhan
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

    </div>
  )
}
