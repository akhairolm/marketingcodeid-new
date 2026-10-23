import type { Metadata } from 'next'
import Image from 'next/image'
import {
  Target,
  TrendingUp,
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
  type LucideIcon,
} from 'lucide-react'
import { getWhatsAppDirectUrl } from '@/lib/whatsapp'
import { JsonLd, faqSchema, serviceSchema, breadcrumbSchema } from '@/lib/seo'

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
    a: 'Tidak. Biaya paket adalah jasa pengelolaan. Anggaran iklan dibayar terpisah langsung dari akun iklan milik Anda, sehingga Anda bisa melihat setiap rupiah yang dibelanjakan.',
  },
  {
    q: 'Berapa anggaran iklan minimum yang disarankan?',
    a: 'Sebagai panduan umum, banyak bisnis mulai dari sekitar Rp 50.000 per hari. Angka akhir menyesuaikan luas wilayah penargetan, tingkat persaingan kata kunci, dan harga produk Anda.',
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
        <div className="relative bg-paper-cream-glow bg-dot-fine pt-28 sm:pt-36 pb-16 sm:pb-24">
          <section className="relative max-w-6xl mx-auto px-4 sm:px-6">
            <div className="max-w-3xl space-y-6 text-left">
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

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#111827] tracking-tight leading-[1.2] sm:leading-[1.14]">
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
              {problems.map((item) => (
                <div
                  key={item.number}
                  className="bg-white rounded-3xl p-6 sm:p-7 border border-neutral-200/80 shadow-card hover:border-[#FF5C28] hover:shadow-xl hover:shadow-orange-500/5 transition-all duration-300 group flex flex-col justify-between"
                >
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-700 text-[11px] font-bold mb-3">
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
      </main>
    </div>
  )
}
