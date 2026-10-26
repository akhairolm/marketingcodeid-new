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

  {
    category: 'website',
    name: 'Website Ruko Digital UMKM',
    label: 'Website - Ruko Digital UMKM (Rp 1.500.000)',
    defaultSellingPrice: 1500000,
    description: 'Solusi website instan UMKM bebas potongan komisi, cloud server, dan tombol order WhatsApp',
    defaultHppItems: [
      {
        category: 'hosting',
        description: 'Hosting Cloud SSD 1 Tahun',
        amount: 250000,
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
    name: 'Pemeliharaan & Maintenance Web (1 Tahun)',
    label: 'Website - Pemeliharaan & Maintenance (Rp 600.000)',
    defaultSellingPrice: 600000,
    description: 'Perpanjangan domain, server cloud, pemeliharaan teknis berkala, dan backup rutin',
    defaultHppItems: [
      {
        category: 'hosting',
        description: 'Perpanjangan Server Cloud & SSL 1 Tahun',
        amount: 250000,
      },
      {
        category: 'domain',
        description: 'Perpanjangan Domain .com / .id 1 Tahun',
        amount: 150000,
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
  {
    category: 'mobile',
    name: 'Custom Enterprise App',
    label: 'Mobile App - Custom Enterprise App (Rp 65.000.000)',
    defaultSellingPrice: 65000000,
    description: 'Arsitektur skala besar, integrasi ERP/CRM internal perusahaan, biometrik & offline sync',
    defaultHppItems: [
      {
        category: 'hosting',
        description: 'Dedicated Cloud High-Availability Server (1 Tahun)',
        amount: 5000000,
      },
      {
        category: 'tools',
        description: 'Integrasi API Enterprise, Keamanan & QA Spesifikasi',
        amount: 3000000,
      },
    ],
  },

  // Kategori: Video & Konten Kreatif (Custom)
  {
    category: 'custom',
    name: 'Video Editing & Motion Ads (5 Video)',
    label: 'Video - Paket 5 Video Iklan (Rp 1.500.000)',
    defaultSellingPrice: 1500000,
    description: '5 Video iklan Reels/TikTok/Shorts konversi tinggi dengan hook 3 detik',
    defaultHppItems: [
      {
        category: 'tools',
        description: 'Lisensi Audio Berlisensi, Template Motion & Asset Stock',
        amount: 300000,
      },
    ],
  },
  {
    category: 'custom',
    name: 'Video Editing Retainer Bulanan (15 Video)',
    label: 'Video - Retainer Bulanan 15 Video (Rp 3.500.000)',
    defaultSellingPrice: 3500000,
    description: 'Pengelolaan 15 video konten dan iklan media sosial per bulan terstruktur',
    defaultHppItems: [
      {
        category: 'tools',
        description: 'Lisensi Audio Komersial, Render Cloud & Aset Efek Khusus',
        amount: 700000,
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

export const CUSTOM_PACKAGES_STORAGE_KEY = 'mc_custom_packages'

export function getCustomPackagesFromStorage(): PackagePreset[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(CUSTOM_PACKAGES_STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function saveCustomPackageToStorage(preset: PackagePreset): PackagePreset[] {
  if (typeof window === 'undefined') return []
  try {
    const current = getCustomPackagesFromStorage()
    const filtered = current.filter((p) => p.name.trim().toLowerCase() !== preset.name.trim().toLowerCase())
    const updated = [...filtered, preset]
    window.localStorage.setItem(CUSTOM_PACKAGES_STORAGE_KEY, JSON.stringify(updated))
    return updated
  } catch {
    return []
  }
}

export function deleteCustomPackageFromStorage(packageName: string): PackagePreset[] {
  if (typeof window === 'undefined') return []
  try {
    const current = getCustomPackagesFromStorage()
    const updated = current.filter((p) => p.name !== packageName)
    window.localStorage.setItem(CUSTOM_PACKAGES_STORAGE_KEY, JSON.stringify(updated))
    return updated
  } catch {
    return []
  }
}

export function getPackagePresets(category?: ServiceCategory, customPackages: PackagePreset[] = []): PackagePreset[] {
  const all = [...PACKAGE_PRESETS, ...customPackages]
  if (!category) return all
  return all.filter((p) => p.category === category)
}

export function getPackagePreset(
  category: ServiceCategory,
  name: string,
  customPackages: PackagePreset[] = []
): PackagePreset | undefined {
  const all = [...PACKAGE_PRESETS, ...customPackages]
  return all.find((p) => p.category === category && p.name === name)
}

export function findPackageByName(
  name: string,
  customPackages: PackagePreset[] = []
): PackagePreset | undefined {
  const all = [...PACKAGE_PRESETS, ...customPackages]
  return all.find((p) => p.name === name)
}
