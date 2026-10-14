export interface PortfolioProject {
  slug: string
  title: string
  client: string
  category: 'web' | 'app' | 'marketing'
  categoryLabel: string
  techStack: string[]
  description: string
  highlight: string
  image: string
}

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: 'warehouse-stock-inventory-erp',
    title: 'Warehouse & Stock Inventory ERP',
    client: 'Distribusi Logistik B2B',
    category: 'web',
    categoryLabel: 'Custom Web Application',
    techStack: ['Next.js 16', 'Drizzle ORM', 'Supabase PostgreSQL', 'Tailwind CSS'],
    description:
      'Sistem pencatatan inventaris multi-gudang real-time dengan batch FIFO/LIFO, audit trail mutasi, dan dashboard visual low-stock alert.',
    highlight: '0ms Rekap Manual · 100% Data Integritas',
    image:
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
  },
  {
    slug: 'brand-showcase-e-catalog',
    title: 'High-Converting Brand Showcase & E-Catalog',
    client: 'Consumer Brand & Retail',
    category: 'web',
    categoryLabel: 'Company Profile & E-Catalog',
    techStack: ['Next.js App Router', 'Tailwind CSS', 'WhatsApp Pipeline', 'Vercel Edge'],
    description:
      'Website katalog interaktif ultra-cepat dengan waktu muat 0.8 detik. Dilengkapi integrasi pesan WhatsApp otomatis sesuai produk yang dilihat.',
    highlight: 'Score Lighthouse 99 · Konversi 3.4x',
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
  },
  {
    slug: 'client-service-portal-mobile-booking',
    title: 'Client Service Portal & Mobile Booking Engine',
    client: 'Jasa Profesional & Medis',
    category: 'app',
    categoryLabel: 'Mobile Application (iOS/Android)',
    techStack: ['Flutter Cross-Platform', 'REST API Node.js', 'PostgreSQL', 'Cloudflare CDN'],
    description:
      'Aplikasi pemesanan jadwal konsultasi, pembayaran invoice gateway otomatis, dan tracking status pengerjaan proyek transparan untuk klien.',
    highlight: 'Automated Client Onboarding · 4.9 App Rating',
    image:
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80',
  },
  {
    slug: 'omnichannel-performance-ads-scaling',
    title: 'Omnichannel Performance Ads Scaling',
    client: 'Fashion & Skincare E-Commerce',
    category: 'marketing',
    categoryLabel: 'Digital Marketing & Ads',
    techStack: ['Meta Conversions API (CAPI)', 'Google Search Ads', 'Looker Studio', 'CRO Landing Page'],
    description:
      'Eksekusi kampanye iklan berbasis ROI dengan testing copywriting agresif, tracking server-side anti-bocor, dan dashboard live reporting mingguan.',
    highlight: '+320% ROI Growth · CAC Turun 42%',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
  },
]

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
      tier: 'Starter UMKM',
      price: 'Rp 4.9jt',
      unit: '/ project',
      desc: 'Solusi landing page kilat dengan konversi tinggi untuk promosi produk unggulan.',
      isPopular: false,
      btnText: 'Pilih Paket Starter',
      ctaContext: 'website',
      features: [
        '1 High-Converting Landing Page',
        'Mobile Responsive & Fast Speed',
        'Free Domain .com & Cloud Hosting 1 Th',
        'Integrasi WhatsApp & Meta Pixel',
      ],
      time: 'Pengerjaan: 5 - 7 Hari Kerja',
    },
    {
      tier: 'Business Pro',
      price: 'Rp 12.5jt',
      unit: '/ project',
      desc: 'Website korporat atau portal katalog dinamis lengkap dengan CMS mandiri.',
      isPopular: true,
      btnText: 'Pilih Paket Business',
      ctaContext: 'website',
      features: [
        'Hingga 8 Halaman Custom Desain',
        'Content Management System (CMS)',
        'On-Page SEO Optimization Pro',
        'Setup Google Analytics & Heatmap',
        'Garansi Maintenance 3 Bulan',
      ],
      time: 'Pengerjaan: 14 - 21 Hari Kerja',
    },
    {
      tier: 'Enterprise & App',
      price: 'Rp 28jt+',
      unit: '/ custom',
      desc: 'Aplikasi mobile iOS/Android, SaaS web app, atau platform e-commerce kompleks.',
      isPopular: false,
      btnText: 'Hubungi Tim Sales',
      ctaContext: 'website',
      features: [
        'Full Custom Tech Stack (Next.js/Node/Flutter)',
        'Database & Server Dedicated AWS/GCP',
        'Multi-role User & Payment Gateway',
        'SLA Uptime 99.9% & Dedicated PM',
      ],
      time: 'Timeline Disesuaikan Scope Project',
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
