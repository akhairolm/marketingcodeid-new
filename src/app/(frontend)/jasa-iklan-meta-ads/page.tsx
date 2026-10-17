import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  ChevronRight,
  AlertTriangle,
  Target,
  Video,
  BarChart3,
  HelpCircle,
  MessageCircle,
} from 'lucide-react'
import { getWhatsAppUrl } from '@/lib/whatsapp'
import { JsonLd, faqSchema, serviceSchema, breadcrumbSchema } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Jasa Iklan Meta Ads (FB & IG) Fokus Konversi WA',
  description:
    'Jasa kelola iklan Meta Ads (Facebook & Instagram Ads) profesional di Kalimantan Selatan. Optimasi kampanye Click-to-WhatsApp untuk banjir prospek & closing.',
  keywords: [
    'jasa iklan meta ads',
    'jasa iklan facebook instagram kalsel',
    'jasa digital marketing kandangan hss',
    'jasa iklan meta ads click to whatsapp',
    'jasa pasang iklan fb ig umkm',
    'agensi meta ads kalimantan selatan',
  ],
  alternates: { canonical: '/jasa-iklan-meta-ads' },
  openGraph: {
    title: 'Jasa Iklan Meta Ads (FB & IG) Fokus Konversi WA | MarketingCode.ID',
    description:
      'Jasa kelola iklan Meta Ads (Facebook & Instagram Ads) profesional di Kalimantan Selatan. Optimasi kampanye Click-to-WhatsApp untuk banjir prospek & closing.',
    url: '/jasa-iklan-meta-ads',
    siteName: 'MarketingCode.ID',
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jasa Iklan Meta Ads (FB & IG) Fokus Konversi WA | MarketingCode.ID',
    description:
      'Jasa kelola iklan Meta Ads profesional di Kalimantan Selatan. Optimasi kampanye Click-to-WhatsApp untuk konversi & penjualan.',
  },
}

const faqs = [
  {
    q: 'Berapa minimal anggaran iklan (ad spend) untuk mulai menggunakan jasa Meta Ads ini?',
    a: 'Anggaran iklan sangat fleksibel dan dapat dimulai dari Rp 50.000/hari (skala uji coba/testing terukur). Setelah menemukan kombinasi materi video dan audiens yang terbukti menghasilkan chat orderan WhatsApp dengan biaya murah (low CPR), barulah anggaran dinaikkan secara bertahap (scaling).',
  },
  {
    q: 'Apakah materi gambar dan video iklan disiapkan oleh tim agensi?',
    a: 'Ya, kami menyediakan layanan terintegrasi mulai dari penyusunan naskah iklan (copywriting), desain visual, hingga video editing untuk materi iklan Reels dan Stories agar performa kampanye maksimal.',
  },
  {
    q: 'Bisnis apa saja yang cocok menggunakan layanan Meta Ads ini?',
    a: 'Layanan ini sangat efektif untuk bisnis lokal maupun nasional seperti Agen Tour & Travel/Umroh, Klinik Kecantikan & Kesehatan, Properti, Kuliner, Pendidikan/Pelatihan, Otomotif, hingga UMKM dan Toko Online di Kalimantan Selatan maupun seluruh Indonesia.',
  },
]


const painPoints = [
  {
    icon: AlertTriangle,
    title: 'Anggaran Iklan Habis Banyak Tapi Minim Chat Masuk ke WhatsApp',
    desc: 'Hanya menekan tombol "Promosikan/Boost Post" di aplikasi membuat iklan tayang ke audiens yang salah dan tidak memiliki niat membeli.',
  },
  {
    icon: HelpCircle,
    title: 'Prospek yang Masuk Kurang Berkualitas (Hanya Sekadar Tanya)',
    desc: 'Tanpa penyaringan audiens, copywriting yang tepat, dan pelacakan sinyal konversi, tim CS Anda akan kelelahan melayani chat yang tidak berujung transaksi.',
  },
  {
    icon: Target,
    title: 'Tidak Punya Waktu Mengurus Teknis Ads Manager & Materi Video Iklan',
    desc: 'Mengatur struktur kampanye, membaca metrik CPR/ROAS, hingga membuat desain dan video iklan yang menarik perhatian membutuhkan keahlian khusus.',
  },
]

const strategi = [
  {
    icon: MessageCircle,
    title: 'Optimasi Kampanye Click-to-WhatsApp (CTWA) & Pelacakan Konversi',
    desc: 'Kami mengarahkan algoritma Meta untuk mencari profil pengguna yang paling berpotensi menghubungi WhatsApp Anda dan melakukan pembelian.',
  },
  {
    icon: Target,
    title: 'Riset Audiens Presisi, Retargeting, & Integrasi Meta Pixel',
    desc: 'Menjangkau calon pelanggan berdasarkan lokasi geografis, minat spesifik, hingga menargetkan ulang (retargeting) orang yang pernah mengunjungi website atau berinteraksi dengan akun Anda.',
  },
  {
    icon: Video,
    title: 'Pembuatan Materi Kreatif (Ad Copy & Video Editing Reels/Stories)',
    desc: 'Didukung tim kreatif internal, kami membantu menyiapkan struktur pesan iklan dan pengeditan video pendek vertikal yang mampu menghentikan scroll pengguna di Facebook dan Instagram.',
  },
  {
    icon: BarChart3,
    title: 'Laporan Performa Transparan & Optimasi Anggaran Berkala',
    desc: 'Evaluasi rutin terhadap biaya per hasil (Cost Per Result), rasio klik (CTR), dan alokasi anggaran pada materi iklan yang terbukti paling menghasilkan konversi.',
  },
]

export default function JasaIklanMetaAdsPage() {
  return (
    <div className="min-h-screen font-sans bg-[#FBFBFB] text-[#18181B] antialiased selection:bg-[#FF5C28] selection:text-white">
      <JsonLd
        data={[
          serviceSchema(
            'Jasa Kelola Iklan Meta Ads (Facebook & Instagram)',
            'Jasa kelola iklan Meta Ads (Facebook & Instagram Ads) profesional di Kalimantan Selatan. Optimasi kampanye Click-to-WhatsApp untuk banjir prospek & closing.',
            '/jasa-iklan-meta-ads'
          ),
          faqSchema(faqs),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Jasa Iklan Meta Ads', path: '/jasa-iklan-meta-ads' },
          ]),
        ]}
      />


      <main className="pt-28 sm:pt-32 pb-24">
        {/* Hero */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-[#FFF5F0] border border-orange-200/50 text-[#EA4510] text-xs font-semibold mb-4">
            Performance Marketing — Facebook &amp; Instagram Ads
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#111827] tracking-tight leading-[1.14]">
            Jasa Kelola Iklan Meta Ads (Facebook &amp; Instagram) Berbasis Konversi &amp; Prospek
          </h1>
          <p className="text-base sm:text-lg text-neutral-600 leading-relaxed mt-5 max-w-2xl mx-auto">
            Berhenti membakar anggaran iklan hanya untuk klik dan tayangan tanpa hasil. Kami membantu bisnis Anda mendatangkan chat calon pembeli potensial ke WhatsApp dan meningkatkan penjualan melalui manajemen kampanye Meta Ads yang terukur.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={getWhatsAppUrl('ads')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3.5 text-sm sm:text-base font-semibold text-white bg-[#FF5C28] hover:bg-[#EA4510] rounded-full shadow-glow transition-all"
            >
              <Image src="/icons/flaticon/dashboard.svg" alt="" width={18} height={18} className="w-4 h-4 mr-2 shrink-0" />
              Dapatkan Audit Akun Iklan Gratis via WhatsApp
            </a>
            <a
              href="#strategi"
              className="inline-flex items-center justify-center px-8 py-3.5 text-sm sm:text-base font-semibold text-neutral-800 bg-white border border-neutral-200 hover:border-[#FF5C28] rounded-full transition-all"
            >
              Lihat Strategi Kami
            </a>
          </div>
        </section>

        {/* Pain Points */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
              Kendala Beriklan yang Sering Dialami Pemilik Bisnis
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {painPoints.map((item) => (
              <div key={item.title} className="bg-white rounded-3xl p-6 sm:p-7 border border-neutral-200/80 shadow-card">
                <div className="w-12 h-12 rounded-2xl bg-red-50 border border-red-200/60 flex items-center justify-center text-red-500 mb-4">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-neutral-900 leading-snug">{item.title}</h3>
                <p className="text-xs text-neutral-500 mt-2 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Strategi & Solusi */}
        <section id="strategi" className="max-w-6xl mx-auto px-4 sm:px-6 mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
              Strategi Optimasi Meta Ads yang Kami Terapkan untuk Bisnis Anda
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {strategi.map((item) => (
              <div key={item.title} className="bg-white rounded-3xl p-6 sm:p-7 border border-neutral-200/80 shadow-card hover:border-orange-200 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-[#FFF5F0] border border-orange-200/60 flex items-center justify-center text-[#FF5C28] mb-4">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-neutral-900 leading-snug">{item.title}</h3>
                <p className="text-xs text-neutral-500 mt-2 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Transparansi Modal Iklan */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 mt-24">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/80 shadow-card">
            <div className="flex items-center gap-2 text-[#EA4510] text-xs font-semibold mb-2">
              <Target className="w-4 h-4" />
              <span>Transparansi Biaya &amp; Anggaran</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
              Berapa Modal untuk Mulai Beriklan?
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 mt-2 leading-relaxed">
              Kami menjunjung transparansi 100%. Saldo iklan dibayarkan langsung ke akun Meta Anda tanpa markup tersembunyi.
            </p>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 bg-neutral-50 rounded-2xl border border-neutral-100">
                <h3 className="text-sm font-bold text-neutral-900">1. Anggaran Iklan (Ad Spend ke Meta)</h3>
                <p className="text-xs text-neutral-600 mt-1.5 leading-relaxed">
                  Mulai dari <strong>Rp 50.000 / hari</strong> (sekitar Rp 1,5 juta / bulan). Dana ini dibayarkan langsung dari rekening/kartu Anda ke akun Meta Ads pribadi atau bisnis Anda.
                </p>
              </div>
              <div className="p-5 bg-[#FFF5F0] rounded-2xl border border-orange-200/60">
                <h3 className="text-sm font-bold text-neutral-900">2. Jasa Manajemen &amp; Kreatif Agensi</h3>
                <p className="text-xs text-neutral-600 mt-1.5 leading-relaxed">
                  Mencakup riset target pasar lokal Kalimantan Selatan, pembuatan materi video/desain iklan, copywriting penawaran, dan pemantauan performa harian agar terhindar dari boncos.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Cross-Selling */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 mt-16">
          <div className="bg-[#121214] rounded-3xl p-8 sm:p-10 text-white relative overflow-hidden">
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#FF5C28]/20 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 text-center space-y-4">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Lipatgandakan Konversi Iklan Anda
              </h2>
              <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
                Ingin melipatgandakan rasio konversi iklan Anda dengan halaman penawaran khusus yang terpasang Meta Pixel? Gunakan juga layanan{' '}
                <Link href="/jasa-pembuatan-website" className="text-[#FF5C28] font-semibold hover:underline">
                  Jasa Pembuatan Landing Page &amp; Website
                </Link>{' '}
                kami.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="/"
                  className="inline-flex items-center px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded-full border border-white/15 transition-all"
                >
                  Kembali ke Beranda
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
                <a
                  href={getWhatsAppUrl('ads')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-8 py-3 bg-[#FF5C28] hover:bg-[#EA4510] text-white font-bold text-xs rounded-full shadow-glow transition-all"
                >
                  Mulai Konsultasi
                  <ArrowRight className="w-4 h-4 ml-1" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 mt-24">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF5F0] border border-orange-200/50 text-[#EA4510] text-xs font-semibold mb-3">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Tanya Jawab</span>
            </div>
            <h2 className="text-3xl font-extrabold text-neutral-900 tracking-tight">
              Pertanyaan Umum (FAQ) Jasa Iklan Meta Ads
            </h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <details key={faq.q} className="bg-white rounded-2xl border border-neutral-200/80 overflow-hidden shadow-xs group">
                <summary className="w-full px-5 py-4 text-left flex items-center justify-between text-xs sm:text-sm font-bold text-neutral-900 hover:text-[#FF5C28] cursor-pointer list-none">
                  <h3 className="font-bold">{faq.q}</h3>
                </summary>
                <div className="px-5 pb-4 text-xs text-neutral-500 leading-relaxed">{faq.a}</div>
              </details>
            ))}
          </div>
        </section>

      </main>
    </div>
  )
}
