import type { ServiceCategory, InitialHppItemInput } from '@/types/financial'

export interface PackagePreset {
  category: ServiceCategory
  name: string
  label: string
  defaultSellingPrice: number
  description: string
  defaultHppItems: InitialHppItemInput[]
}

export const PACKAGE_PRESETS: PackagePreset[] = [
  // Kategori: Website
  {
    category: 'website',
    name: 'Landing Page & Iklan',
    label: 'Website - Landing Page & Iklan (Rp 1.190.000)',
    defaultSellingPrice: 1190000,
    description: '1 Halaman konversi tinggi langsung terhubung ke WhatsApp dan tracking iklan',
    defaultHppItems: [
      {
        category: 'hosting',
        description: 'Hosting Cloud SSD 1 Tahun',
        amount: 200000,
        notes: 'Alokasi resource landing page',
      },
      {
        category: 'domain',
        description: 'Registrasi Domain .com / .id 1 Tahun',
        amount: 150000,
      },
    ],
  },
  {
    category: 'website',
    name: 'Web Katalog, Profil & Blog',
    label: 'Website - Web Katalog, Profil & Blog (Rp 2.190.000)',
    defaultSellingPrice: 2190000,
    description: 'Hingga 5 halaman dinamis, manajemen produk/katalog, artikel blog, dan CMS',
    defaultHppItems: [
      {
        category: 'hosting',
        description: 'Hosting Cloud SSD 1 Tahun (Paket Bisnis)',
        amount: 350000,
      },
      {
        category: 'domain',
        description: 'Registrasi Domain .com / .id 1 Tahun',
        amount: 150000,
      },
      {
        category: 'license',
        description: 'Lisensi Theme & Asset Icon Resmi',
        amount: 150000,
      },
    ],
  },
  {
    category: 'website',
    name: 'Company Profile Pro / Toko Online',
    label: 'Website - Company Profile Pro / Toko Online (Rp 3.490.000)',
    defaultSellingPrice: 3490000,
    description: 'Hingga 10 halaman, integrasi database, form kustom, dan optimasi performa tinggi',
    defaultHppItems: [
      {
        category: 'hosting',
        description: 'Cloud VPS High Performance 1 Tahun',
        amount: 500000,
      },
      {
        category: 'domain',
        description: 'Registrasi Domain .com / .id 1 Tahun',
        amount: 200000,
      },
      {
        category: 'tools',
        description: 'Integrasi Payment Gateway & Setup Tools API',
        amount: 300000,
      },
    ],
  },

  // Kategori: Iklan Digital (Ads)
  {
    category: 'ads',
    name: 'Starter Trial 14 Hari',
    label: 'Iklan - Starter Trial 14 Hari (Rp 790.000)',
    defaultSellingPrice: 790000,
    description: 'Uji coba iklan Meta Ads atau Google Ads 14 hari kerja',
    defaultHppItems: [
      {
        category: 'other',
        description: 'Alokasi Saldo Iklan (Ad Spend 14 Hari)',
        amount: 500000,
      },
      {
        category: 'tools',
        description: 'Setup Tracking Pixel & Riset Target Audiens',
        amount: 100000,
      },
    ],
  },
  {
    category: 'ads',
    name: 'Growth 30 Hari',
    label: 'Iklan - Growth 30 Hari (Rp 1.490.000)',
    defaultSellingPrice: 1490000,
    description: 'Kampanye iklan akselerasi penjualan 30 hari penuh',
    defaultHppItems: [
      {
        category: 'other',
        description: 'Alokasi Saldo Iklan (Ad Spend 30 Hari)',
        amount: 1000000,
      },
    ],
  },
  {
    category: 'ads',
    name: 'Omnichannel Scale',
    label: 'Iklan - Omnichannel Scale (Rp 2.890.000)',
    defaultSellingPrice: 2890000,
    description: 'Manajemen kampanye simultan Meta Ads dan Google Ads multi-target',
    defaultHppItems: [
      {
        category: 'other',
        description: 'Alokasi Saldo Iklan Multi-Platform',
        amount: 2000000,
      },
    ],
  },

  // Kategori: Mobile App
  {
    category: 'mobile',
    name: 'MVP Mobile Starter',
    label: 'Mobile App - MVP Mobile Starter (Rp 18.000.000)',
    defaultSellingPrice: 18000000,
    description: 'Aplikasi Android & iOS React Native untuk validasi model bisnis',
    defaultHppItems: [
      {
        category: 'hosting',
        description: 'Server Cloud Backend API (1 Tahun)',
        amount: 1500000,
      },
      {
        category: 'license',
        description: 'Aset UI/UX Komponen & Lisensi Plugin',
        amount: 1000000,
      },
    ],
  },
  {
    category: 'mobile',
    name: 'Full Commercial App',
    label: 'Mobile App - Full Commercial App (Rp 35.000.000)',
    defaultSellingPrice: 35000000,
    description: 'Aplikasi skala komersial dengan payment gateway, notifikasi push, dan analytics',
    defaultHppItems: [
      {
        category: 'hosting',
        description: 'Dedicated Cloud Database & Backend Server (1 Tahun)',
        amount: 3000000,
      },
      {
        category: 'tools',
        description: 'Integrasi Payment Gateway, Push Notification & SDK',
        amount: 1000000,
      },
    ],
  },

  // Kategori: Custom
  {
    category: 'custom',
    name: 'Paket Kustom / Layanan Khusus',
    label: 'Custom - Paket Kustom / Layanan Khusus',
    defaultSellingPrice: 0,
    description: 'Layanan kustom dengan harga jual dan rincian pos HPP yang ditentukan bebas',
    defaultHppItems: [],
  },
]

export function getPackagePresets(category?: ServiceCategory): PackagePreset[] {
  if (!category) return PACKAGE_PRESETS
  return PACKAGE_PRESETS.filter((p) => p.category === category)
}

export function getPackagePreset(category: ServiceCategory, name: string): PackagePreset | undefined {
  return PACKAGE_PRESETS.find((p) => p.category === category && p.name === name)
}
