import type { Metadata } from 'next'
import Image from 'next/image'
import {
  Target,
  TrendingUp,
  TrendingDown,
  Search,
  Megaphone,
  BarChart3,
  MessageSquare,
  ShieldCheck,
  Check,
  Clock,
  Sparkles,
  AlertTriangle,
  CircleDollarSign,
  HelpCircle,
  ChevronDown,
  Settings2,
  Users,
  CheckCircle2,
  MousePointerClick,
  ZapOff,
  Activity,
  Coins,
  type LucideIcon,
} from 'lucide-react'
import { getWhatsAppDirectUrl } from '@/lib/whatsapp'
import { JsonLd, faqSchema, serviceSchema, breadcrumbSchema } from '@/lib/seo'
import { AdsPricingSection } from '@/components/ads/AdsPricingSection'

export const metadata: Metadata = {
  title: 'Jasa Iklan Google Ads & Meta Ads Terukur | MarketingCode.ID',
  description:
    'Jasa kelola iklan Google Ads & Meta Ads (Facebook & Instagram) untuk UMKM dan bisnis di seluruh Indonesia. Riset audiens, kreatif iklan, pasang tracking pixel, dan optimasi konversi ke WhatsApp dengan laporan transparan.',
  keywords: [
    'jasa iklan google ads',
    'jasa meta ads',
    'jasa iklan facebook instagram',
    'jasa kelola iklan digital',
    'jasa iklan google ads umkm',
    'jasa iklan whatsapp ctat',
    'jasa pasang meta pixel',
    'jasa iklan performance marketing',
  ],
  alternates: { canonical: '/jasa-iklan-ads' },
  openGraph: {
    title: 'Jasa Iklan Google Ads & Meta Ads Terukur | MarketingCode.ID',
    description:
      'Jasa kelola iklan Google Ads & Meta Ads untuk UMKM dan bisnis di seluruh Indonesia. Riset audiens, kreatif iklan, pasang tracking pixel, dan optimasi konversi ke WhatsApp.',
    url: '/jasa-iklan-ads',
    siteName: 'MarketingCode.ID',
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jasa Iklan Google Ads & Meta Ads Terukur | MarketingCode.ID',
    description:
      'Kelola iklan Google Ads & Meta Ads dengan riset audiens, kreatif, dan tracking pixel yang rapi. Fokus pada leads WhatsApp.',
  },
}

const faqs = [
  {
    q: 'Apakah anggaran iklan sudah termasuk dalam biaya paket?',
    a: 'Tersedia dua pilihan skema: Paket All-In (sudah mencakup alokasi saldo iklan aktif dan pajak platform PPN 11% untuk kemudahan terima beres) dan Paket Jasa Pengelolaan Saja (anggaran iklan dibayar terpisah langsung dari akun iklan milik Anda).',
  },
  {
    q: 'Berapa anggaran iklan yang disarankan?',
    a: 'Pada paket All-In, saldo iklan sudah dialokasikan di dalam paket (Rp 500.000 pada paket uji coba 14 hari, dan Rp 1.000.000 pada paket growth 30 hari). Jika Anda memilih paket Jasa Pengelolaan Saja, kami menyarankan mulai dari Rp 30.000 – Rp 50.000 per hari untuk pengujian awal.',
  },
  {
    q: 'Lebih baik Google Ads atau Meta Ads untuk usaha saya?',
    a: 'Tergantung niat pembeli. Kalau orang sudah aktif mencari solusi Anda, Google Ads lebih tepat. Kalau produk atau jasa perlu ditampilkan lebih dulu ke audiens yang belum mencari, Meta Ads lebih tepat. Banyak bisnis memakai keduanya secara bergantian sesuai tahap funnel.',
  },
  {
    q: 'Apakah akun iklan dan datanya tetap milik saya?',
    a: 'Ya. Akun iklan, pixel, dan data konversi tetap atas nama Anda dan bisa Anda akses penuh kapan saja. Kami bekerja di dalam akun milik Anda, bukan menahan akses.',
  },
  {
    q: 'Berapa lama hasil mulai terlihat?',
    a: 'Kampanye umumnya butuh fase pembelajaran beberapa hari sampai data cukup untuk dibaca. Yang bisa dipantau sejak awal adalah biaya per klik dan biaya per percakapan masuk.',
  },
  {
    q: 'Apakah bisa hanya minta dipasangkan tracking pixel saja?',
    a: 'Bisa didiskusikan. Pemasangan pixel dan pencatatan konversi tersedia sebagai pekerjaan terpisah maupun sebagai bagian dari paket pengelolaan.',
  },
]

const problems = [
  {
    number: '01',
    title: 'Iklan Jalan Terus, Chat WhatsApp Sepi',
    desc: 'Anggaran habis setiap hari tapi tidak ada percakapan yang masuk. Biasanya bukan karena iklannya salah platform, tapi karena tidak ada alur yang jelas setelah orang mengklik.',
  },
  {
    number: '02',
    title: 'Salah Pilih Platform',
    desc: 'Jualan jasa darurat diiklankan di media visual, jualan produk impulsif diiklankan di mesin pencari. Hasilnya biaya klik mahal dan orang yang datang tidak sesuai niat.',
  },
  {
    number: '03',
    title: 'Hanya Tekan Boost Post Tanpa Struktur',
    desc: 'Tidak ada tujuan kampanye, tidak ada pixel, tidak ada halaman tujuan. Ketika hasilnya jelek, tidak ada data yang bisa dibaca untuk diperbaiki.',
  },
  {
    number: '04',
    title: 'Tidak Tahu Angka yang Harus Dibaca',
    desc: 'Tidak ada pencatatan biaya per percakapan. Keputusan menambah atau menghentikan iklan akhirnya hanya berdasarkan perasaan, bukan angka.',
  },
]

const platforms: PlatformCard[] = [
  {
    key: 'google',
    name: 'Google Ads',
    icon: Search,
    fitTitle: 'Cocok saat orang sudah aktif mencari solusi',
    fitDesc:
      'Ketika seseorang mengetik kebutuhan Anda di Google, niat belinya sudah tinggi. Kampanye diarahkan untuk menangkap pencarian itu.',
    points: [
      'Kanal: Google Search, Performance Max, YouTube, Display',
      'Kata kunci: riset kata kunci, kata kunci negatif, ekstensi iklan',
      'Tracking: Google Tag, konversi Google Ads, GA4',
    ],
  },
  {
    key: 'meta',
    name: 'Meta Ads',
    icon: Megaphone,
    fitTitle: 'Cocok saat produk perlu ditampilkan lebih dulu',
    fitDesc:
      'Ketika audiens belum mencari, produk atau jasa perlu muncul di feed mereka lebih dulu. Kekuatan Meta Ads ada di penargetan dan kreatif visual.',
    points: [
      'Kanal: Facebook Feed, Instagram Feed & Reels, Stories, Audience Network',
      'Penargetan: minat, audiens mirip (lookalike), retargeting pengunjung',
      'Tracking: Meta Pixel, Conversions API bila diperlukan',
    ],
  },
]

interface PlatformCard {
  key: 'google' | 'meta'
  name: string
  icon: LucideIcon
  fitTitle: string
  fitDesc: string
  points: string[]
}

const benefits = [
  {
    icon: Target,
    title: 'Riset Audiens & Kata Kunci Sebelum Anggaran Jalan',
    desc: 'Penargetan disusun dari data, bukan tebakan. Kata kunci negatif dipasang supaya anggaran tidak habis pada pencarian yang tidak relevan.',
  },
  {
    icon: Sparkles,
    title: 'Kreatif Iklan: Copywriting & Variasi Visual',
    desc: 'Materi iklan disiapkan dalam beberapa variasi supaya bisa diuji. Yang bekerja dilanjutkan, yang tidak bekerja dihentikan.',
  },
  {
    icon: Settings2,
    title: 'Tracking Pixel & Konversi Terpasang Rapi',
    desc: 'Meta Pixel, Google Tag, dan pencatatan konversi dipasang dan diverifikasi. Tanpa ini, data kampanye tidak bisa dibaca.',
  },
  {
    icon: MessageSquare,
    title: 'Optimasi ke Percakapan WhatsApp',
    desc: 'Tujuan kampanye diarahkan ke percakapan, bukan hanya klik. Yang dipantau adalah biaya per percakapan masuk, bukan jumlah tayangan.',
  },
  {
    icon: BarChart3,
    title: 'Laporan Kinerja yang Bisa Dibaca Pemilik Usaha',
    desc: 'Laporan berisi angka biaya, jumlah percakapan, dan hasil per kampanye. Ditulis dengan bahasa yang bisa dipahami, bukan istilah teknis saja.',
  },
  {
    icon: Users,
    title: 'Akses Langsung ke Pengelola Iklan',
    desc: 'Pertanyaan soal performa bisa ditanyakan langsung lewat WhatsApp ke orang yang memegang akun iklan Anda.',
  },
]

const steps = [
  {
    number: '01',
    title: 'Audit & Diskusi Awal',
    desc: 'Pemeriksaan akun iklan, riwayat kampanye, dan target yang realistis sesuai kapasitas bisnis Anda.',
  },
  {
    number: '02',
    title: 'Riset & Penyusunan Kreatif',
    desc: 'Penentuan audiens atau kata kunci, penyusunan penawaran, dan pembuatan materi iklan.',
  },
  {
    number: '03',
    title: 'Peluncuran & Pemantauan',
    desc: 'Kampanye aktif, konversi tercatat, dan biaya per percakapan dipantau harian.',
  },
  {
    number: '04',
    title: 'Evaluasi & Scaling',
    desc: 'Kampanye yang tidak bekerja dihentikan, anggaran ditambah pada yang bekerja berdasarkan angka.',
  },
]

const guarantees = [
  {
    icon: Search,
    title: 'Audit Akun Iklan Gratis',
    desc: 'Pemeriksaan struktur kampanye, penargetan, dan pencatatan konversi sebelum ada kerja sama.',
  },
  {
    icon: BarChart3,
    title: 'Laporan Bisa Dilihat Kapan Saja',
    desc: 'Angka biaya, jumlah percakapan, dan hasil per kampanye dapat Anda lihat tanpa harus menunggu.',
  },
  {
    icon: Clock,
    title: 'Tidak Ada Kontrak Jangka Panjang di Awal',
    desc: 'Evaluasi dilakukan bulanan. Lanjut atau hentikan berdasarkan angka yang terlihat.',
  },
  {
    icon: ShieldCheck,
    title: 'Akses Penuh ke Akun Anda',
    desc: 'Akun iklan tetap milik Anda. Tidak ada akses yang ditahan ketika kerja sama berakhir.',
  },
]

const industryPills = [
  'Toko Online & Ritel',
  'Company Profile Perusahaan',
  'Travel & Rental',
  'Klinik & Jasa Profesional',
  'Kuliner & F&B',
  'Fashion & Beauty',
  'Pendidikan & Kursus',
  'Properti & Developer',
  'Portal & Instansi',
  'Jasa B2B',
]

function SectionMark({
  num,
  icon: Icon,
  eyebrow,
}: {
  num: string
  icon: LucideIcon
  eyebrow: string
}) {
  return (
    <div className="mb-4 flex items-center justify-center gap-2.5 text-neutral-600">
      <span
        aria-hidden="true"
        className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-500"
      >
        § {num}
      </span>
      <span aria-hidden="true" className="h-px w-8 bg-neutral-300" />
      <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-700">
        <Icon aria-hidden="true" className="h-3.5 w-3.5 text-[#C23605]" />
        <span>{eyebrow}</span>
      </span>
    </div>
  )
}

function ProblemFunnelLeakMockup() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      {/* Top Floating Metrics Badges */}
      <div className="relative z-10 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-2 w-full px-2">
        <span className="bg-white px-2.5 py-1 rounded-full border border-neutral-200/90 shadow-xs flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold text-neutral-700">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
          Tayangan: 12.400
        </span>
        <span className="bg-white px-2.5 py-1 rounded-full border border-neutral-200/90 shadow-xs flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold text-neutral-700">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          Klik Iklan: 480
        </span>
        <span className="bg-white px-2.5 py-1 rounded-full border border-neutral-200/90 shadow-xs flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold text-red-600">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
          Chat Masuk: 0
        </span>
      </div>

      {/* Connector stem */}
      <div className="w-px h-3 bg-neutral-300 mx-auto mb-1.5" />

      {/* Central Elevated Card */}
      <div className="relative z-10 w-full max-w-[270px] xs:max-w-[285px] sm:max-w-[320px] bg-white rounded-2xl p-3.5 sm:p-4 border border-neutral-200/80 shadow-md transition-transform duration-300 group-hover:scale-[1.02]">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-6 rounded-lg bg-[#FFF5F0] border border-orange-200/60 flex items-center justify-center text-[#FF5C28]">
              <TrendingDown className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-bold text-neutral-800">Alur Konversi Iklan</span>
          </div>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-50 border border-red-200/70 text-red-600 text-[10px] font-bold">
            <AlertTriangle className="w-2.5 h-2.5" />
            Bocor di Alur
          </span>
        </div>

        <div className="bg-neutral-50 rounded-xl p-2.5 border border-neutral-100 space-y-2">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-neutral-500 font-medium">Pengunjung Mengklik</span>
            <span className="font-bold text-neutral-800">480 Orang</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-neutral-200 overflow-hidden">
            <div className="h-full w-full bg-blue-500 rounded-full" />
          </div>

          <div className="flex items-center justify-between text-[11px] pt-1">
            <span className="text-neutral-500 font-medium">Halaman Tujuan Terbuka</span>
            <span className="font-bold text-amber-700">120 Orang (Lambat)</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-neutral-200 overflow-hidden">
            <div className="h-full w-[25%] bg-amber-500 rounded-full" />
          </div>

          <div className="flex items-center justify-between text-[11px] pt-1">
            <span className="text-neutral-500 font-medium">Tombol Chat Ditekan</span>
            <span className="font-bold text-red-600">0 Percakapan</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-neutral-200 overflow-hidden">
            <div className="h-full w-[2%] bg-red-500 rounded-full" />
          </div>
        </div>

        <div className="mt-2.5 pt-2 border-t border-neutral-100 flex items-center justify-center">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-neutral-50 border border-neutral-200/60 text-neutral-700 text-[10px] font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
            Anggaran habis, kontak WhatsApp tetap sunyi
          </span>
        </div>
      </div>
    </div>
  )
}

function ProblemPlatformMismatchMockup() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      {/* Top Search & Browse Pills */}
      <div className="relative z-10 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-2 w-full px-2">
        <span className="bg-white px-2.5 py-1 rounded-full border border-neutral-200/90 shadow-xs flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold text-neutral-700">
          <Search className="w-3 h-3 text-[#FF5C28]" />
          Niat Cari Cepat
        </span>
        <span className="text-neutral-400 text-xs">vs</span>
        <span className="bg-white px-2.5 py-1 rounded-full border border-neutral-200/90 shadow-xs flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold text-neutral-700">
          <Megaphone className="w-3 h-3 text-blue-600" />
          Scroll Santai
        </span>
      </div>

      {/* Connector stem */}
      <div className="w-px h-3 bg-neutral-300 mx-auto mb-1.5" />

      {/* Central Comparison Card */}
      <div className="relative z-10 w-full max-w-[270px] xs:max-w-[285px] sm:max-w-[320px] bg-white rounded-2xl p-2.5 sm:p-3 border border-neutral-200/80 shadow-md space-y-1.5 transition-transform duration-300 group-hover:scale-[1.02]">
        {/* Skenario Salah Saluran */}
        <div className="p-2 rounded-xl bg-red-50/60 border border-red-200/60">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-bold text-red-700 uppercase tracking-wider flex items-center gap-1">
              <AlertTriangle className="w-3 h-3 text-red-500" />
              Salah: Jasa Darurat di Feed
            </span>
            <span className="text-[9px] bg-red-200/80 text-red-800 font-bold px-1.5 py-0.2 rounded">
              Feed Sosmed
            </span>
          </div>
          <p className="text-[10px] text-neutral-600 leading-tight">
            Orang sedang scroll santai, tidak butuh tukang darurat. Biaya klik terbuang percuma.
          </p>
        </div>

        {/* Skenario Saluran Tepat */}
        <div className="p-2 rounded-xl bg-emerald-50/60 border border-emerald-200/60">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              Tepat: Google Search
            </span>
            <span className="text-[9px] bg-emerald-200/80 text-emerald-800 font-bold px-1.5 py-0.2 rounded">
              High Intent
            </span>
          </div>
          <p className="text-[10px] text-neutral-600 leading-tight">
            Muncul persis saat orang mencari solusi darurat. Niat beli tinggi dan siap hubungi.
          </p>
        </div>

        <div className="pt-1 flex items-center justify-between text-[10px] text-neutral-500 px-1">
          <span className="flex items-center gap-1 text-red-600 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
            Biaya klik terbuang sia-sia
          </span>
          <span className="text-neutral-500">Miskomunikasi Audiens</span>
        </div>
      </div>
    </div>
  )
}

function ProblemBoostPostMockup() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      {/* Top Floating Badges */}
      <div className="relative z-10 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-2 w-full px-2">
        <span className="bg-white px-2.5 py-1 rounded-full border border-neutral-200/90 shadow-xs flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold text-neutral-700">
          <MousePointerClick className="w-3 h-3 text-[#FF5C28]" />
          Tombol Bawaan Aplikasi
        </span>
        <span className="bg-white px-2.5 py-1 rounded-full border border-neutral-200/90 shadow-xs flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold text-amber-700">
          <AlertTriangle className="w-3 h-3 text-amber-500" />
          Tanpa Ads Manager
        </span>
      </div>

      {/* Connector stem */}
      <div className="w-px h-3 bg-neutral-300 mx-auto mb-1.5" />

      {/* Central Elevated Card */}
      <div className="relative z-10 w-full max-w-[270px] xs:max-w-[285px] sm:max-w-[320px] bg-white rounded-2xl p-3.5 sm:p-4 border border-neutral-200/80 shadow-md transition-transform duration-300 group-hover:scale-[1.02]">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-neutral-100">
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-6 rounded-lg bg-orange-100 text-[#FF5C28] flex items-center justify-center">
              <ZapOff className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-bold text-neutral-800">Setelan Boost Post</span>
          </div>
          <span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200/70 px-2 py-0.5 rounded-full">
            Fitur Terbatas
          </span>
        </div>

        <div className="space-y-1.5 text-xs">
          <div className="flex items-center justify-between py-1 px-2.5 rounded-lg bg-neutral-50 border border-neutral-200/50">
            <span className="text-neutral-600 text-[11px] font-medium">Target Audiens:</span>
            <span className="font-semibold text-neutral-700 text-[11px] flex items-center gap-1">
              Otomatis
              <span className="text-[9px] bg-red-100 text-red-700 px-1.5 py-0.2 rounded font-bold">
                Acak
              </span>
            </span>
          </div>
          <div className="flex items-center justify-between py-1 px-2.5 rounded-lg bg-neutral-50 border border-neutral-200/50">
            <span className="text-neutral-600 text-[11px] font-medium">Tracking Pixel:</span>
            <span className="font-semibold text-red-600 text-[11px] flex items-center gap-1">
              Tidak Ada
              <span className="text-[9px] bg-neutral-200/80 text-neutral-700 px-1.5 py-0.2 rounded font-bold">
                0 Data
              </span>
            </span>
          </div>
          <div className="flex items-center justify-between py-1 px-2.5 rounded-lg bg-neutral-50 border border-neutral-200/50">
            <span className="text-neutral-600 text-[11px] font-medium">Hasil Iklan:</span>
            <span className="font-semibold text-neutral-700 text-[11px]">Banyak Likes, Nol Order</span>
          </div>
        </div>

        <div className="mt-2.5 pt-2 border-t border-neutral-100 flex items-center justify-center">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-neutral-50 border border-neutral-200/60 text-neutral-700 text-[10px] font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            Hanya membakar uang demi metrik semu
          </span>
        </div>
      </div>
    </div>
  )
}

function ProblemNoDataMockup() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      {/* Top Floating Badges */}
      <div className="relative z-10 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-2 w-full px-2">
        <span className="bg-white px-2.5 py-1 rounded-full border border-neutral-200/90 shadow-xs flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold text-neutral-700">
          <HelpCircle className="w-3 h-3 text-amber-500" />
          Evaluasi Tanpa Data
        </span>
        <span className="bg-white px-2.5 py-1 rounded-full border border-neutral-200/90 shadow-xs flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold text-red-600">
          <Coins className="w-3 h-3 text-red-500" />
          Biaya per Chat: Buta
        </span>
      </div>

      {/* Connector stem */}
      <div className="w-px h-3 bg-neutral-300 mx-auto mb-1.5" />

      {/* Central Elevated Card */}
      <div className="relative z-10 w-full max-w-[270px] xs:max-w-[285px] sm:max-w-[320px] bg-white rounded-2xl p-3.5 sm:p-4 border border-neutral-200/80 shadow-md transition-transform duration-300 group-hover:scale-[1.02]">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-neutral-100">
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-6 rounded-lg bg-red-50 border border-red-200/60 flex items-center justify-center text-red-600">
              <Activity className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-bold text-neutral-800">Laporan Akun Tanpa Tracking</span>
          </div>
          <span className="text-[10px] font-bold text-red-600 bg-red-50 border border-red-200/70 px-2 py-0.5 rounded-full">
            DATA KOSONG
          </span>
        </div>

        <div className="space-y-1.5 text-xs">
          <div className="flex items-center justify-between py-1 px-2.5 rounded-lg bg-neutral-50 border border-neutral-200/50">
            <span className="text-neutral-600 text-[11px] font-medium">Biaya per Percakapan:</span>
            <span className="font-mono text-neutral-400 text-[11px] font-bold">
              Tidak Terukur (—)
            </span>
          </div>
          <div className="flex items-center justify-between py-1 px-2.5 rounded-lg bg-neutral-50 border border-neutral-200/50">
            <span className="text-neutral-600 text-[11px] font-medium">Iklan Mana yang Cuan:</span>
            <span className="font-semibold text-neutral-700 text-[11px] flex items-center gap-1">
              Hanya Perasaan
              <span className="text-[9px] bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded font-bold">
                Firasat
              </span>
            </span>
          </div>
          <div className="flex items-center justify-between py-1 px-2.5 rounded-lg bg-neutral-50 border border-neutral-200/50">
            <span className="text-neutral-600 text-[11px] font-medium">Aksi Selanjutnya:</span>
            <span className="font-semibold text-red-600 text-[11px]">Ragu Lanjut / Matikan</span>
          </div>
        </div>

        <div className="mt-2.5 pt-2 border-t border-neutral-100 flex items-center justify-center">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-neutral-50 border border-neutral-200/60 text-neutral-700 text-[10px] font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
            Keputusan bisnis bergantung pada tebakan
          </span>
        </div>
      </div>
    </div>
  )
}

export default function JasaIklanAdsPage() {
  return (
    <div className="website-service min-h-screen font-sans bg-[#FBFBFB] text-[#18181B] antialiased selection:bg-[#FF5C28] selection:text-white">
      <JsonLd
        data={[
          serviceSchema(
            'Jasa Iklan Google Ads & Meta Ads',
            'Jasa pengelolaan kampanye iklan Google Ads dan Meta Ads (Facebook & Instagram): riset audiens, penyusunan kreatif, pemasangan tracking pixel, dan optimasi konversi ke WhatsApp dengan laporan transparan.',
            '/jasa-iklan-ads'
          ),
          faqSchema(faqs),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Jasa Iklan Google Ads & Meta Ads', path: '/jasa-iklan-ads' },
          ]),
        ]}
      />

      <main className="relative overflow-hidden">
        {/* 1. HERO */}
        <div className="relative bg-paper-cream-glow bg-dot-fine pt-28 sm:pt-36 pb-16 sm:pb-24 overflow-hidden">
          <section className="relative max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-12 items-center">
              <div className="lg:col-span-5 xl:col-span-5 space-y-6 text-left">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#FFF5F0] border border-orange-300/60">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#C23605]">
                      Jasa Iklan Google Ads &amp; Meta Ads Terukur
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-neutral-200/80 shadow-xs">
                    <Megaphone className="w-3.5 h-3.5 text-[#C23605]" />
                    <span className="text-xs font-semibold text-neutral-700 tracking-tight">
                      Agency Boutique — Fokus Maksimal 10 Klien/Bulan
                    </span>
                  </div>
                </div>

                <h1 className="text-2xl sm:text-4xl lg:text-[2.75rem] xl:text-5xl font-extrabold text-[#111827] tracking-tight leading-[1.2] sm:leading-[1.12]">
                  Iklan Anda Harus Mendatangkan Percakapan,{' '}
                  <span className="text-[#FF5C28]">Bukan Hanya Klik</span>
                </h1>

                <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-normal max-w-xl">
                  Pengelolaan iklan Google Ads dan Meta Ads untuk bisnis yang ingin mengukur hasilnya dengan angka: biaya per percakapan, jumlah leads, dan laporan yang bisa dibaca. Bukan sekadar menyalakan kampanye lalu ditinggal.
                </p>

                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <a
                    href={getWhatsAppDirectUrl(
                      'Halo Admin MarketingCode.ID, saya mau konsultasi jasa iklan Google Ads / Meta Ads. Jenis usaha saya: ____'
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm sm:text-base font-semibold text-white bg-[#D13D00] hover:bg-[#B33400] rounded-full shadow-glow transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <Image
                      src="/icons/flaticon/whatsapp.svg"
                      alt=""
                      width={22}
                      height={22}
                      className="w-5 h-5 shrink-0"
                    />
                    <span>Konsultasi Iklan via WhatsApp</span>
                  </a>
                  <a
                    href="#paket-iklan"
                    className="inline-flex items-center justify-center px-6 py-3.5 text-sm sm:text-base font-semibold text-neutral-800 bg-white hover:border-[#D13D00] border border-neutral-200 rounded-full transition-all duration-300 text-center"
                  >
                    <span>Lihat Paket &amp; Biaya</span>
                  </a>
                </div>

                <div className="pt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-neutral-700 font-medium">
                  <span className="flex items-center gap-1">
                    <Check className="w-4 h-4 text-[#FF5C28]" /> Google Ads &amp; Meta Ads
                  </span>
                  <span className="text-neutral-300">•</span>
                  <span className="flex items-center gap-1">
                    <Check className="w-4 h-4 text-[#FF5C28]" /> Tracking Pixel Terpasang
                  </span>
                  <span className="text-neutral-300">•</span>
                  <span className="flex items-center gap-1">
                    <Check className="w-4 h-4 text-[#FF5C28]" /> Laporan Transparan
                  </span>
                </div>
              </div>

              <div className="lg:col-span-7 xl:col-span-7 flex justify-center lg:justify-end items-center">
                <div className="relative w-full max-w-lg sm:max-w-xl lg:max-w-2xl xl:max-w-none lg:scale-105 xl:scale-110 lg:origin-right">
                  <div
                    className="absolute -inset-6 bg-gradient-to-tr from-[#38bdf8]/15 via-[#FF5C28]/10 to-transparent rounded-full blur-3xl -z-10"
                    aria-hidden="true"
                  />
                  <Image
                    src="/images/jasa-ads-hero.webp"
                    alt="Layanan Pengelolaan Iklan Google Ads dan Meta Ads Terukur MarketingCode.ID"
                    title="Jasa Iklan Google Ads & Meta Ads MarketingCode.ID"
                    width={1024}
                    height={683}
                    priority
                    sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 60vw, 750px"
                    className="w-full h-auto object-contain drop-shadow-2xl hover:scale-[1.02] transition-transform duration-500 ease-out"
                  />
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* 2. MASALAH PENGIKLAN PEMULA */}
        <div className="relative bg-paper-warm section-rule py-20 sm:py-24">
          <section className="relative max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <SectionMark num="02" icon={AlertTriangle} eyebrow="Masalah Umum Pengiklan" />
              <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
                Anggaran Habis, Tapi Tidak Ada Percakapan Masuk
              </h2>
              <p className="text-neutral-600 text-sm sm:text-base mt-2 max-w-2xl mx-auto leading-relaxed">
                Empat penyebab paling sering kami temukan saat memeriksa akun iklan pemilik usaha. Jika salah satunya terasa familiar, audit gratis bisa jadi langkah pertama.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {problems.map((item, idx) => (
                <div
                  key={item.number}
                  className="bg-white rounded-3xl p-3.5 sm:p-4 border border-neutral-200/80 shadow-card hover:border-[#FF5C28] hover:shadow-xl hover:shadow-orange-500/5 transition-all duration-300 flex flex-col justify-between group"
                >
                  {/* Visual Preview Area */}
                  <div className="relative h-64 sm:h-72 rounded-2xl bg-[#F8F9FB] border border-neutral-200/60 overflow-hidden flex flex-col items-center justify-center p-3 sm:p-4 select-none">
                    {idx === 0 && <ProblemFunnelLeakMockup />}
                    {idx === 1 && <ProblemPlatformMismatchMockup />}
                    {idx === 2 && <ProblemBoostPostMockup />}
                    {idx === 3 && <ProblemNoDataMockup />}
                  </div>

                  {/* Text Content Area */}
                  <div className="px-3 sm:px-4 pt-4 sm:pt-5 pb-2 sm:pb-3">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-50 border border-red-200/70 text-red-700 text-[11px] font-bold mb-2.5">
                      <AlertTriangle className="w-3 h-3 text-red-500" />
                      <span>Masalah {item.number}</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-neutral-900 group-hover:text-[#C23205] transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-600 mt-2 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
        {/* 3. PANDUAN PILIH PLATFORM */}
        <div className="relative bg-paper-right-glow bg-dot-fine py-20 sm:py-24 overflow-hidden">
          <section className="relative max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <SectionMark num="03" icon={Target} eyebrow="Panduan Memilih Platform" />
              <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
                Google Ads atau Meta Ads, Mana yang Lebih Tepat?
              </h2>
              <p className="text-neutral-600 text-sm sm:text-base mt-2 max-w-2xl mx-auto leading-relaxed">
                Keduanya bukan pengganti satu sama lain. Yang menentukan adalah niat pembeli pada tahap itu, bukan mana yang sedang ramai dibicarakan.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {platforms.map((item) => (
                <div
                  key={item.key}
                  className="bg-white rounded-3xl p-6 sm:p-7 border border-neutral-200/80 shadow-card hover:border-[#FF5C28] transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-[#FFF5F0] border border-orange-200/60 flex items-center justify-center text-[#C23605] mb-4">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-neutral-900 leading-snug tracking-tight">
                      {item.name}
                    </h3>
                    <p className="text-sm font-semibold text-[#C23605] mt-2 leading-snug">
                      {item.fitTitle}
                    </p>
                    <p className="text-xs sm:text-sm text-neutral-600 mt-2 leading-relaxed">
                      {item.fitDesc}
                    </p>
                    <ul className="mt-5 pt-5 border-t border-neutral-100 space-y-2.5">
                      {item.points.map((point) => (
                        <li key={point} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-neutral-700">
                          <Check className="w-4 h-4 shrink-0 text-[#FF5C28] mt-0.5" strokeWidth={2.5} />
                          <span className="leading-snug">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-center text-xs sm:text-sm text-neutral-600 font-medium mt-8 max-w-2xl mx-auto">
              Banyak bisnis memakai keduanya secara bergantian sesuai tahap funnel.
            </p>
          </section>
        </div>
        {/* 4. KEUNTUNGAN KERJA SAMA */}
        <div className="relative bg-paper-warm section-rule py-16 sm:py-20">
          <section className="relative max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <SectionMark num="04" icon={TrendingUp} eyebrow="Yang Anda Dapatkan" />
              <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
                Enam Pekerjaan yang Ditangani, Bukan Dilempar ke Anda
              </h2>
              <p className="text-neutral-600 text-sm sm:text-base mt-2 max-w-2xl mx-auto leading-relaxed">
                Semua poin di bawah ini adalah pekerjaan yang kami lakukan, bukan janji hasil. Hasil akhir tetap bergantung pada produk, harga, dan pasar Anda.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
              {benefits.map((item) => (
                <div
                  key={item.title}
                  className="bg-white rounded-3xl p-6 sm:p-7 border border-neutral-200/80 shadow-card hover:border-[#FF5C28] hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-[#FFF5F0] border border-orange-200/60 flex items-center justify-center text-[#C23605] mb-4">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-neutral-900 leading-snug tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-600 mt-3 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
        {/* 5. PILL INDUSTRI */}
        <div className="relative bg-paper-warm py-10 sm:py-12 border-y border-neutral-200/60">
          <section className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-neutral-200/80 text-[11px] font-bold text-neutral-700 mb-4">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              <span>Cocok untuk Berbagai Jenis Usaha</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm">
              {industryPills.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center px-3 py-1.5 rounded-full bg-white border border-neutral-200/80 text-neutral-700 font-semibold hover:border-[#C23605] hover:text-[#C23605] transition-colors shadow-xs"
                >
                  {item}
                </span>
              ))}
            </div>
          </section>
        </div>
        {/* 6. PRICING */}
        <AdsPricingSection />
        {/* 7. ALUR KERJA */}
        <div className="relative bg-ink-panel py-20 sm:py-24 overflow-hidden">
          <section className="relative max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b-2 border-white/20">
              <span className="font-semibold text-[11px] sm:text-xs tracking-[0.28em] uppercase text-[#FF5C28]">
                <span aria-hidden="true">§ 06 · </span>Alur Kerja
              </span>
              <span className="font-semibold text-[11px] sm:text-xs tracking-[0.28em] uppercase text-neutral-300">
                Dari Audit Sampai Scaling
              </span>
            </div>

            <div className="mt-10 lg:mt-14 mb-14 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end text-left">
              <h2 className="lg:col-span-8 font-extrabold text-3xl sm:text-4xl lg:text-[3rem] text-white leading-[1.2] tracking-tight">
                Empat tahap, masing-masing punya angka yang dipantau.
              </h2>
              <div className="lg:col-span-4 space-y-3">
                <p className="font-medium text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  Tidak ada tahap yang dilewati. Setiap tahap punya keluaran yang bisa Anda periksa sebelum lanjut ke tahap berikutnya.
                </p>
                <div className="flex items-center gap-3 pt-1">
                  <span className="w-8 h-px bg-[#FF5C28]" />
                  <span className="font-semibold text-[10px] tracking-[0.24em] uppercase text-neutral-300">
                    Terukur &amp; Transparan
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((step, i) => (
                <div
                  key={step.number}
                  className="bg-white border border-neutral-200/80 rounded-3xl p-6 shadow-card hover:border-[#FF5C28] hover:shadow-xl transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-200 text-[#C23605] font-extrabold text-base flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                      {step.number}
                    </div>
                    <h3 className="font-bold text-lg text-neutral-900 leading-snug group-hover:text-[#FF5C28] transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-600 mt-2.5 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                  <div className="mt-5 pt-3 border-t border-neutral-100 flex items-center gap-1.5 text-[11px] font-semibold text-[#C23605]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Tahap {i + 1} dari 4</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
        {/* 8. GARANSI + AUDIT GRATIS (pengganti testimoni) */}
        <div className="relative bg-paper-warm section-rule py-20 sm:py-24">
          <section className="relative max-w-6xl mx-auto px-4 sm:px-6">
            <div className="bg-gradient-to-br from-[#FFF5F0] via-white to-orange-50/50 rounded-3xl p-8 sm:p-12 border border-orange-200/80 shadow-card">
              <div className="max-w-3xl">
                <div className="mb-3 flex items-center gap-2.5 text-neutral-600">
                  <span
                    aria-hidden="true"
                    className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-500"
                  >
                    § 07
                  </span>
                  <span aria-hidden="true" className="h-px w-8 bg-neutral-300" />
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-700">
                    <ShieldCheck aria-hidden="true" className="h-3.5 w-3.5 text-[#C23605]" />
                    <span>Garansi &amp; Audit Gratis</span>
                  </span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
                  Bisa Diperiksa Sebelum Memutuskan Kerja Sama
                </h2>
                <p className="text-sm sm:text-base text-neutral-600 mt-3 leading-relaxed">
                  Kami tidak menampilkan klaim hasil kampanye yang belum bisa Anda verifikasi. Yang kami tawarkan adalah pemeriksaan akun lebih dulu, akses penuh ke akun Anda, dan laporan yang bisa dibaca sendiri.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                {guarantees.map((item) => (
                  <div
                    key={item.title}
                    className="bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-9 h-9 rounded-xl bg-orange-100 text-[#C23605] flex items-center justify-center mb-3">
                        <item.icon className="w-4 h-4" />
                      </div>
                      <h3 className="font-bold text-sm text-neutral-900">{item.title}</h3>
                      <p className="text-xs text-neutral-600 mt-1.5 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-orange-200/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="font-bold text-sm text-neutral-900">
                    Mulai dari audit akun iklan Anda, tanpa biaya.
                  </div>
                  <p className="text-xs text-neutral-600 mt-0.5">
                    Sebutkan platform yang dipakai dan kendala yang dirasakan.
                  </p>
                </div>
                <a
                  href={getWhatsAppDirectUrl(
                    'Halo Admin MarketingCode.ID, saya ingin audit gratis akun iklan Google Ads / Meta Ads saya.'
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Minta audit akun iklan gratis via WhatsApp"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-orange-50 border border-neutral-300 hover:border-[#C23605] text-[#C23605] text-xs font-bold transition-all shadow-xs shrink-0 whitespace-nowrap"
                >
                  <Image
                    src="/icons/flaticon/whatsapp.svg"
                    alt=""
                    width={16}
                    height={16}
                    className="w-4 h-4 shrink-0"
                  />
                  <span>Minta Audit Gratis</span>
                </a>
              </div>
            </div>
          </section>
        </div>
        {/* 9. FAQ */}
        <div className="relative bg-paper-cream-left-glow bg-dot-fine py-20 sm:py-24 overflow-hidden">
          <section className="relative max-w-3xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-10">
              <SectionMark num="08" icon={HelpCircle} eyebrow="Tanya Jawab" />
              <h2 className="text-3xl font-extrabold text-neutral-900 tracking-tight">
                Pertanyaan yang Sering Diajukan Pemilik Usaha
              </h2>
            </div>

            <div className="space-y-3">
              {faqs.map((faq) => (
                <details
                  key={faq.q}
                  className="bg-white rounded-2xl border border-neutral-200/80 overflow-hidden shadow-xs group"
                >
                  <summary className="w-full px-5 py-4 text-left flex items-center justify-between gap-3 text-xs sm:text-sm font-bold text-neutral-900 hover:text-[#FF5C28] cursor-pointer list-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF5C28]">
                    <h3 className="font-bold min-w-0 flex-1">{faq.q}</h3>
                    <ChevronDown
                      aria-hidden="true"
                      className="h-4 w-4 shrink-0 text-neutral-500 transition-transform duration-200 group-open:rotate-180"
                    />
                  </summary>
                  <div className="px-5 pb-5 text-xs sm:text-sm text-neutral-600 leading-relaxed border-t border-neutral-100 pt-3">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </section>
        </div>

        {/* 10. FINAL CTA */}
        <div className="relative bg-paper-warm py-20 sm:py-24 overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 font-mono text-[18rem] font-bold text-neutral-900/[0.025] select-none leading-none tracking-tighter"
          >
            §
          </div>
          <section className="relative max-w-4xl mx-auto px-4 sm:px-6">
            <div className="bg-[#121214] rounded-3xl p-8 sm:p-12 text-center text-white relative overflow-hidden shadow-2xl border border-neutral-800">
              <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#FF5C28]/20 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 max-w-xl mx-auto space-y-4">
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  Punya Anggaran Iklan yang Ingin Dikelola Lebih Rapi?
                </h2>
                <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
                  Diskusikan jenis usaha, target pasar, dan anggaran yang tersedia. Kami akan memberi gambaran realistis tentang apa yang bisa diukur dari anggaran tersebut, tanpa komitmen awal.
                </p>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={getWhatsAppDirectUrl(
                      'Halo Admin MarketingCode.ID, saya ingin diskusi rencana iklan untuk usaha saya secara gratis.'
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Diskusi rencana iklan via WhatsApp"
                    className="w-full sm:w-auto px-8 py-3.5 bg-[#D13D00] hover:bg-[#B33400] text-white font-bold text-xs sm:text-sm rounded-full shadow-glow transition-all flex items-center justify-center gap-2"
                  >
                    <Image
                      src="/icons/flaticon/whatsapp.svg"
                      alt=""
                      width={18}
                      height={18}
                      className="w-4 h-4 shrink-0 object-contain"
                    />
                    <span>Diskusi Rencana Iklan via WhatsApp</span>
                  </a>
                </div>

                <div className="pt-4 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-[11px] text-neutral-300">
                  <span className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#FF5C28]" /> Google Ads &amp; Meta Ads
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#FF5C28]" /> Audit Akun Gratis
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#FF5C28]" /> Akun Tetap Milik Anda
                  </span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
