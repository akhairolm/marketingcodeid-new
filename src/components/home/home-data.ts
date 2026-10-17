import type { PortfolioCategory } from '@/lib/content/types'

export interface PortfolioProject {
  slug: string
  title: string
  client: string
  category: PortfolioCategory
  categoryLabel: string
  techStack: string[]
  description: string
  highlight: string
  image: string
}

export interface PricingTier {
  tier: string
  price: string
  unit: string
  desc: string
  isPopular: boolean
  btnText: string
  ctaContext: 'website' | 'mobile' | 'ads'
  features: string[]
  time: string
}

export const pricingData: Record<'web' | 'app' | 'ads', PricingTier[]> = {
  web: [
    {
      tier: 'Landing Page Promosi',
      price: 'Rp 1.5jt',
      unit: '/ project',
      desc: 'Halaman penawaran kilat fokus konversi tinggi untuk promosi produk atau pendamping iklan Meta Ads.',
      isPopular: false,
      btnText: 'Pilih Landing Page',
      ctaContext: 'website',
      features: [
        '1 Halaman Penjualan Fokus Konversi',
        'Mobile Responsive & Waktu Muat < 0.8s',
        'Tombol Order Otomatis Langsung ke WhatsApp',
        'Pemasangan Meta Pixel & Google Analytics',
      ],
      time: 'Pengerjaan: 3 - 5 Hari Kerja',
    },
    {
      tier: 'Katalog & Toko UMKM',
      price: 'Rp 3.5jt',
      unit: '/ project',
      desc: 'Website katalog produk interaktif dengan tombol order WhatsApp otomatis dan dashboard admin mandiri.',
      isPopular: true,
      btnText: 'Pilih Paket Katalog',
      ctaContext: 'website',
      features: [
        'Katalog Produk + Tombol Order WA Otomatis',
        'Admin Mandiri: Ganti Foto & Harga dari HP',
        'Free Domain .com & Cloud Hosting 1 Tahun',
        'On-Page SEO Lokal Kalimantan Selatan',
        'Garansi Pemeliharaan & Pendampingan',
      ],
      time: 'Pengerjaan: 7 - 14 Hari Kerja',
    },
    {
      tier: 'Sistem Instansi & Portal Custom',
      price: 'Rp 8.5jt+',
      unit: '/ custom',
      desc: 'Sistem informasi manajemen daerah, e-office, buku tamu QR, pelaporan aduan, atau portal korporat.',
      isPopular: false,
      btnText: 'Konsultasi Kebutuhan',
      ctaContext: 'website',
      features: [
        'Kepatuhan Standar SPBE & Akuntabilitas BAST',
        'Surat Perjanjian Kerja (SPK) & Faktur Pajak Resmi',
        'Dashboard Admin Terpusat & Enkripsi Data',
        'Pelatihan Staf Operator (Bimtek Tatap Muka Kalsel)',
      ],
      time: 'Timeline Sesuai Dokumen Spesifikasi',
    },
  ],

  app: [
    {
      tier: 'MVP Mobile Starter',
      price: 'Rp 18jt',
      unit: '/ project',
      desc: 'Aplikasi mobile esensial untuk validasi pasar dengan fitur utama yang siap pakai.',
      isPopular: false,
      btnText: 'Pilih MVP Mobile',
      ctaContext: 'mobile',
      features: [
        'Flutter Cross-Platform (Android & iOS)',
        'Autentikasi User (Google & Email)',
        'Integrasi REST API & Cloud Database',
        'Push Notification Setup',
      ],
      time: 'Pengerjaan: 3 - 4 Minggu',
    },
    {
      tier: 'Full Commercial App',
      price: 'Rp 35jt',
      unit: '/ project',
      desc: 'Solusi lengkap e-commerce atau booking service siap terbit di App Store & Play Store.',
      isPopular: true,
      btnText: 'Pilih Commercial App',
      ctaContext: 'mobile',
      features: [
        'Dual Platform: iOS App Store & Android Play Store',
        'Payment Gateway Terintegrasi (Midtrans/Xendit)',
        'Dashboard Admin Web untuk Pengelolaan Data',
        'Tracking Analytics & Crash Reporting',
        'Garansi & Bantuan Review App Store',
      ],
      time: 'Pengerjaan: 6 - 8 Minggu',
    },
    {
      tier: 'Custom Enterprise App',
      price: 'Rp 65jt+',
      unit: '/ custom',
      desc: 'Arsitektur skala besar dengan integrasi sistem internal perusahaan dan keamanan biometrik.',
      isPopular: false,
      btnText: 'Konsultasi Enterprise',
      ctaContext: 'mobile',
      features: [
        'Microservices Architecture & Offline-First Sync',
        'Enkripsi Data End-to-End & Biometrik',
        'Integrasi ERP/CRM Perusahaan Eksisting',
        'Dedicated QA & Stress Testing 50k CCU',
      ],
      time: 'Timeline Sesuai Dokumen Spesifikasi',
    },
  ],
  ads: [
    {
      tier: 'Growth Campaign',
      price: 'Rp 3.5jt',
      unit: '/ bulan',
      desc: 'Paket manajemen Meta Ads atau Google Ads untuk akselerasi leads produk UMKM.',
      isPopular: false,
      btnText: 'Pilih Paket Growth',
      ctaContext: 'ads',
      features: [
        'Setup Meta Pixel / Google Ads Conversion',
        'Riset Audiens & Target Kata Kunci',
        'Pembuatan 6 Variasi Copywriting & Banner',
        'Laporan Kinerja Mingguan Transparan',
      ],
      time: 'Siklus Evaluasi Mingguan',
    },
    {
      tier: 'Scale & Performance',
      price: 'Rp 7.5jt',
      unit: '/ bulan',
      desc: 'Manajemen multi-channel (Meta + Google) dengan A/B testing dan optimasi CRO landing page.',
      isPopular: true,
      btnText: 'Pilih Scale Ads',
      ctaContext: 'ads',
      features: [
        'Omnichannel Ads: Meta Ads (FB/IG) + Google Search',
        'Tracking Meta CAPI (Server-Side) Anti-Bocor',
        'A/B Testing Copywriting & Creative Visual',
        'Audit & Optimasi Kecepatan Landing Page',
        'Live Reporting Dashboard (Looker Studio)',
      ],
      time: 'Evaluasi & Scaling Harian',
    },
    {
      tier: 'Full Digital Takeover',
      price: 'Rp 15jt+',
      unit: '/ bulan',
      desc: 'Tim digital marketing dedicated untuk brand yang menargetkan omzet miliaran rupiah.',
      isPopular: false,
      btnText: 'Diskusi Retainer',
      ctaContext: 'ads',
      features: [
        'Full Funnel Strategy: Awareness, Retargeting, Retention',
        'Dedicated Copywriter, Graphic Designer & Media Buyer',
        'Optimasi SEO Organik Halaman 1 Google',
        'Konsultasi Pertumbuhan Mingguan Bersama Lead Strategist',
      ],
      time: 'Dedicated Squad Mingguan',
    },
  ],
}
