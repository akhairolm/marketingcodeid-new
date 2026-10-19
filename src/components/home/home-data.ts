export interface PricingFeatureItem {
  text: string
  subItems?: string[]
}


export type PricingFeature = string | PricingFeatureItem

export interface PricingTier {
  tier: string
  badgeTop?: string
  originalPrice?: string
  price: string
  unit: string
  desc: string
  isPopular: boolean
  btnText: string
  ctaContext: 'website' | 'mobile' | 'ads'
  features: PricingFeature[]
  renewal?: string
  time?: string
}

export const pricingData: Record<'web' | 'app' | 'ads', PricingTier[]> = {
  web: [
    {
      tier: 'Landing Page Konversi',
      badgeTop: 'Hemat & Cepat Jadi',
      originalPrice: 'Rp 1.850.000',
      price: 'Rp 1.190.000',
      unit: 'Bayar sekali • Terima beres',
      desc: 'Cocok untuk promosi 1 produk/jasa unggulan & kampanye iklan (Meta/Google Ads) yang fokus mengarahkan prospek ke WhatsApp.',
      isPopular: false,
      btnText: 'Pesan Landing Page',
      ctaContext: 'website',
      features: [
        '1 Halaman Panjang (Single Page) dengan struktur copywriting persuasif',
        'Arsitektur Statis Ultra-Cepat (Loading < 2 detik, ringan di HP & aman)',
        'Terima Beres Tanpa Repot (Tidak perlu pusing kelola dashboard sendiri)',
        'Gratis Domain .com & Cloud Server (Aktif 1 Tahun)',
        'Integrasi Tombol CTA WhatsApp & Formulir Prospek',
        'Siap Dipasang Meta Pixel & Google Analytics untuk iklan',
        'Gratis Bantu Update Ringan (Ganti teks/foto promo hingga 2x setelah rilis)',
        'Garansi Maintenance & SSL Keamanan',
      ],
      renewal: 'Perpanjangan tahun ke-2 hanya Rp 600rb/thn (Domain & Server)',
      time: 'Pengerjaan: 3 - 5 Hari Kerja',
    },
    {
      tier: 'Web Katalog, Profil & Blog',
      badgeTop: 'PALING DIMINATI',
      originalPrice: 'Rp 3.200.000',
      price: 'Rp 2.190.000',
      unit: 'Bayar sekali • Bisa kelola mandiri',
      desc: 'Solusi ideal untuk UMKM, toko lokal, & usaha jasa yang ingin memiliki katalog produk, profil usaha, serta artikel SEO yang bisa diedit sendiri.',
      isPopular: true,
      btnText: 'Ambil Paket UMKM Sekarang',
      ctaContext: 'website',
      features: [
        'Hingga 5–7 Halaman Menu (Beranda, Tentang, Katalog/Layanan, Blog, Kontak)',
        'Dilengkapi Dashboard Admin Mudah (Tambah/edit produk & layanan semudah upload sosmed)',
        'Fitur Katalog & Order Otomatis ke WhatsApp (0% potongan komisi admin)',
        'Fitur Blog / Artikel untuk mendongkrak peringkat SEO di Google',
        'Gratis Domain .com / .id & Cloud Server (Aktif 1 Tahun)',
        'Optimasi On-Page SEO Dasar & Integrasi Peta Lokasi Google Maps',
        'Gratis Video Panduan / Training Admin sampai bisa',
        'Garansi Maintenance 1 Tahun & SSL',
      ],
      renewal: 'Perpanjangan tahun ke-2 hanya Rp 750rb/thn (Domain & Server)',
      time: 'Pengerjaan: 7 - 14 Hari Kerja',
    },
    {
      tier: 'Company Profile Pro / Toko Online',
      badgeTop: 'Fitur Terlengkap',
      originalPrice: 'Rp 5.500.000',
      price: 'Rp 3.490.000',
      unit: 'Bayar sekali • Sistem skala bisnis',
      desc: 'Dirancang untuk perusahaan (PT/CV/B2B) yang butuh kredibilitas tinggi atau toko online dengan pembayaran otomatis (Payment Gateway).',
      isPopular: false,
      btnText: 'Konsultasi Paket Pro',
      ctaContext: 'website',
      features: [
        'Hingga 12+ Halaman Eksklusif dengan Desain UI/UX Kustom Korporat',
        {
          text: 'Bebas Pilih Fokus Mode Sistem:',
          subItems: [
            'Mode E-Commerce: Integrasi Payment Gateway (Bayar otomatis via QRIS, Virtual Account Bank, E-Wallet) & Hitung Ongkir',
            'Mode Korporat: Company Profile Eksklusif (Portofolio Proyek, Klien, Karir, & Unduh Company Profile PDF)',
          ],
        },
        'Dashboard Admin Lengkap (CMS) untuk kelola seluruh halaman & data',
        'Gratis Domain .com / .co.id / .id & High-Performance Server (1 Tahun)',
        'Riset Keyword Dasar & Setup SEO Teknis',
        'Prioritas Support Teknis & Training Tim',
      ],
      renewal: 'Perpanjangan tahun ke-2 menyesuaikan kapasitas server',
      time: 'Pengerjaan: 10 - 21 Hari Kerja',
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
        'Bantuan Penyesuaian Kebijakan App Store',
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
        'Dedicated QA & Pengujian Kinerja Sesuai Spesifikasi',
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
      desc: 'Tim digital marketing terpadu untuk percepatan skala bisnis dan multichannel marketing.',
      isPopular: false,
      btnText: 'Diskusi Retainer',
      ctaContext: 'ads',
      features: [
        'Full Funnel Strategy: Awareness, Retargeting, Retention',
        'Dedicated Copywriter, Graphic Designer & Media Buyer',
        'Optimasi On-Page SEO & Struktur Ramah Mesin Pencari',
        'Konsultasi Pertumbuhan Mingguan Bersama Lead Strategist',
      ],
      time: 'Dedicated Squad Mingguan',
    },
  ],
}
