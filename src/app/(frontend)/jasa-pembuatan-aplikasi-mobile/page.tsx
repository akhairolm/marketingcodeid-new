import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  Smartphone,
  Check,
  X,
  ArrowRight,
  ShieldCheck,
  Clock,
  Sparkles,
  MapPin,
  Camera,
  Bell,
  Sliders,
  Database,
  Globe,
  Layers,
  ShoppingBag,
  CalendarCheck,
  Landmark,
  FileCheck,
  ExternalLink,
  ChevronDown,
  AlertTriangle,
  Monitor,
  CheckCircle2,
  Lock,
  Headphones,
  Zap,
} from 'lucide-react'
import { getWhatsAppDirectUrl } from '@/lib/whatsapp'
import { JsonLd, faqSchema, serviceSchema, breadcrumbSchema } from '@/lib/seo'
import { MobilePricingSection } from '@/components/mobile-app/MobilePricingSection'

export const metadata: Metadata = {
  title: 'Jasa Pembuatan Aplikasi Mobile Android & iOS Kustom | MarketingCode.ID',
  description:
    'Jasa pembuatan aplikasi mobile Android, iOS, & PWA profesional. Lengkap dengan Web Admin Dashboard, UI/UX Prototype sebelum koding, pendampingan Google Play Store, & garansi pemeliharaan 1 tahun.',
  keywords: [
    'jasa pembuatan aplikasi mobile',
    'jasa buat aplikasi android ios',
    'developer aplikasi mobile indonesia',
    'jasa pembuatan aplikasi toko online',
    'jasa pembuatan aplikasi instansi',
    'aplikasi presensi gps geofencing',
    'jasa buat aplikasi flutter react native',
    'jasa konversi web ke aplikasi',
  ],
  alternates: { canonical: '/jasa-pembuatan-aplikasi-mobile' },
  openGraph: {
    title: 'Jasa Pembuatan Aplikasi Mobile Android & iOS Kustom | MarketingCode.ID',
    description:
      'Jasa pembuatan aplikasi mobile Android, iOS, & PWA profesional. Lengkap dengan Web Admin Dashboard, UI/UX Prototype, pendampingan Google Play Store, & garansi 1 tahun.',
    url: '/jasa-pembuatan-aplikasi-mobile',
    siteName: 'MarketingCode.ID',
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jasa Pembuatan Aplikasi Mobile Android & iOS Kustom | MarketingCode.ID',
    description:
      'Jasa pembuatan aplikasi mobile Android, iOS, & PWA profesional. Lengkap dengan Web Admin Dashboard, UI/UX Prototype, pendampingan Google Play Store, & garansi 1 tahun.',
  },
}

const faqs = [
  {
    q: 'Apa bedanya paket Mobile Web-App (PWA) dengan aplikasi Android & iOS di Play Store?',
    a: 'Mobile Web-App (PWA) adalah aplikasi berbasis web modern yang dapat langsung dipasang ke home screen HP pengguna langsung dari browser tanpa perlu mengunduh lewat Google Play Store atau menunggu persetujuan review. Biayanya jauh lebih hemat dan cepat selesai. Sedangkan aplikasi Android & iOS murni dibangun dengan Flutter/React Native, didaftarkan resmi ke Google Play Store & Apple App Store, serta memiliki integrasi fitur perangkat keras ponsel yang lebih mendalam.',
  },
  {
    q: 'Apakah aplikasi yang dibuat bisa berjalan di HP Android sekaligus iPhone (iOS)?',
    a: 'Ya, pada Paket Android & iOS Cross-Platform dan Enterprise, kami menggunakan teknologi lintas platform modern (Flutter / React Native). Satu basis kode yang kami bangun dapat berjalan mulus di ribuan tipe smartphone Android maupun iPhone (iOS) secara bersamaan, sehingga menghemat biaya dan waktu hingga 60% dibanding menyewa developer terpisah.',
  },
  {
    q: 'Apakah biaya paket sudah termasuk Dashboard Admin untuk mengelola isi aplikasi?',
    a: 'Sudah pasti. Setiap aplikasi yang kami bangun selalu dilengkapi dengan Dashboard Admin berbasis web. Melalui dashboard ini (bisa dibuka dari laptop atau HP), Anda dapat menambah produk, memproses pesanan, memantau absensi pegawai, mengelola pengguna, dan mengunduh laporan berkala tanpa perlu menyentuh kode pemrograman.',
  },
  {
    q: 'Bagaimana dengan akun Google Play Store dan Apple App Store? Apakah dibantu sampai tayang?',
    a: 'Ya, tim kami mendampingi seluruh proses teknis publikasi ke Google Play Store dan Apple App Store. Kami membantu penyiapan file rilis (.aab / .ipa), penyusunan kebijakan privasi data sesuai standar regulasi UU PDP, tangkapan layar promosi (mockup screens), hingga aplikasi Anda disetujui (approved) dan siap diunduh masyarakat luas.',
  },
  {
    q: 'Bagaimana sistem pembayarannya? Apakah bisa bertahap (DP)?',
    a: 'Sangat bisa. Kami menerapkan skema pembayaran bertahap yang aman dan adil: Down Payment (DP) 50% di awal setelah ruang lingkup fitur disepakati, dan pelunasan 50% sisanya dilakukan setelah aplikasi selesai diuji coba (User Acceptance Testing) dan siap dipublikasikan.',
  },
  {
    q: 'Bagaimana jika saya belum punya dokumen spesifikasi teknis dan baru punya gambaran ide saja?',
    a: 'Tidak masalah. Kami menyediakan sesi konsultasi gratis di awal. Cukup ceritakan masalah bisnis, sistem kerja, atau ide yang ingin diwujudkan lewat WhatsApp. Tim kami akan membantu memetakan daftar fitur inti, menyusun alur penggunaan aplikasi, hingga membuatkan prototype visualnya terlebih dahulu sebelum kontrak dimulai.',
  },
  {
    q: 'Apakah melayani pembuatan aplikasi untuk perusahaan atau instansi di luar Kalimantan Selatan?',
    a: 'Tentu saja. Kami melayani klien bisnis, UMKM, korporasi, hingga instansi pemerintah di seluruh wilayah Indonesia secara profesional. Seluruh koordinasi alur, presentasi prototype desain layar, hingga serah terima dapat dilakukan secara terstruktur via Google Meet, Zoom, dan WhatsApp grup khusus proyek.',
  },
]

const problemCards = [
  {
    number: '01',
    title: 'Harga Software House Melambung karena Dihitung 2 Kali',
    desc: 'Banyak vendor memisahkan biaya koding Android dan iOS ke dalam dua tim berbeda sehingga biaya membengkak hingga puluhan juta rupiah. Padahal dengan teknologi cross-platform modern, keduanya bisa dibangun sekaligus dengan biaya jauh lebih hemat.',
    badge: 'Biaya Tak Wajar',
  },
  {
    number: '02',
    title: 'Aplikasi Sudah Jadi, Tapi Ditolak Google Play Store / App Store',
    desc: 'Sekadar membungkus website biasa menjadi file APK murahan akan langsung ditolak oleh sistem keamanan Google dan Apple dengan alasan pelanggaran kebijakan WebView Spam. Aplikasi wajib memiliki fungsi native nyata dan standar arsitektur resmi.',
    badge: 'Gagal Tayang',
  },
  {
    number: '03',
    title: 'Tampilan Rumit & Berat Saat Dibuka di HP Spesifikasi Rendah',
    desc: 'Aplikasi yang memakan memori berlebih dan memiliki menu berbelit-belit membuat pelanggan malas memesan dan staf lapangan kembali menggunakan cara manual di kertas atau grup WhatsApp. Pengguna akhirnya memilih uninstal.',
    badge: 'Pengguna Frustrasi',
  },
  {
    number: '04',
    title: 'Ditinggal Developer Saat Ada Pembaruan OS Android / iOS',
    desc: 'Sistem operasi smartphone diperbarui secara berkala setiap tahun. Tanpa dokumentasi kode yang bersih, akses server milik sendiri, dan garansi pemeliharaan, aplikasi Anda berisiko rusak total hanya dalam hitungan beberapa bulan.',
    badge: 'Tanpa Jaminan',
  },
]

const useCases = [
  {
    icon: ShoppingBag,
    title: 'Aplikasi Katalog, Toko Online & Loyalty Member',
    target: 'Ritel, Fashion, F&B, Distributor, & Brand D2C',
    desc: 'Pelanggan dapat memesan produk, mengecek poin loyalitas member, menerima info promo lewat Push Notification di layar HP, dan membayar otomatis via QRIS/VA atau langsung terhubung ke WhatsApp penjual.',
    highlight: 'Retensi Pelanggan & Repeat Order Tinggi',
  },
  {
    icon: CalendarCheck,
    title: 'Aplikasi Booking, Travel, Klinik & Jasa',
    target: 'Travel Hiace/Bus, Klinik Kesehatan, Salon, & Jasa Panggilan',
    desc: 'Pemilihan jadwal layanan, kursi perjalanan/rute, nomor antrean periksa klinik, atau pemanggilan teknisi langsung dari smartphone lengkap dengan notifikasi pengingat otomatis ke WhatsApp pelanggan.',
    highlight: 'Otomasi Jadwal & Nol Double Booking',
  },
  {
    icon: MapPin,
    title: 'Aplikasi Internal: Presensi GPS & Laporan Lapangan',
    target: 'Perusahaan Operasional, Sales Lapangan, & Instansi',
    desc: 'Validasi kehadiran di radius kantor/titik kerja (anti fake-GPS), unggah foto bukti kerja langsung dari kamera HP, serta rekapitulasi data kehadiran dan kinerja pegawai secara instan tanpa kertas.',
    highlight: 'Disiplin Kerja & 100% Bebas Kertas',
  },
  {
    icon: Landmark,
    title: 'Aplikasi Layanan Publik, Direktori & Sistem Daerah',
    target: 'Instansi Pemerintah (OPD), Asosiasi, & Komunitas',
    desc: 'Portal pelayanan warga, pengaduan masyarakat berbasis titik koordinat peta, direktori UMKM daerah, hingga sistem informasi organisasi yang mudah diakses warga kapan pun dan di mana pun.',
    highlight: 'Standar SPBE & Transparansi Layanan',
  },
]

const deliverables = [
  {
    icon: Sliders,
    title: 'Desain Layar Interaktif (Prototype UI/UX) Sebelum Koding',
    desc: 'Anda bisa melihat dan mencoba alur klik tampilan layar aplikasi langsung di smartphone Anda sebelum satu baris kode pemrograman ditulis.',
  },
  {
    icon: Monitor,
    title: 'Dashboard Admin Berbasis Web untuk Kelola Data',
    desc: 'Setiap aplikasi dilengkapi panel kontrol di komputer atau browser HP untuk memantau transaksi, mengelola data pengguna, dan mengunduh laporan PDF/Excel.',
  },
  {
    icon: Camera,
    title: 'Akses Fitur Smartphone Penuh (GPS, Kamera, Notifikasi)',
    desc: 'Mendukung pemindaian QR Code/kamera, penguncian titik koordinat geofencing GPS akurat, dan pengiriman pesan Push Notification langsung ke layar kunci pengguna.',
  },
  {
    icon: Zap,
    title: 'Arsitektur Cepat & Hemat Kuota (Cross-Platform / PWA)',
    desc: 'Dibangun dengan teknologi modern (Flutter / React Native / PWA) yang menghasilkan aplikasi ringan, lancar, dan hemat baterai di beragam tipe HP.',
  },
  {
    icon: Globe,
    title: 'Pendampingan Rilis ke Google Play Store & App Store',
    desc: 'Kami bantu menyiapkan aset grafis toko aplikasi, dokumen kebijakan privasi UU PDP, hingga proses peninjauan resmi sampai aplikasi tayang di Play Store.',
  },
  {
    icon: ShieldCheck,
    title: '100% Hak Milik Sistem & Garansi Pemeliharaan 1 Tahun',
    desc: 'Database, akun server, dan seluruh kode sumber menjadi aset resmi Anda seutuhnya, dilindungi jaminan perbaikan bug dan pendampingan teknis selama 1 tahun.',
  },
]

const caseStudies = [
  {
    title: 'Si Akoor — Presensi Apel Geotagging GPS Radius 25m',
    client: 'Sekretariat DPRD Kabupaten Tapin',
    category: 'Aplikasi Presensi & Kepegawaian Instansi',
    image: '/images/porto-3.webp',
    imageAlt: 'Sistem Informasi Apel dan Koordinasi Si Akoor Sekretariat DPRD Tapin',
    results: [
      { label: 'Akurasi Presensi', value: 'Radius 25m' },
      { label: 'Efisiensi Administrasi', value: '100% Paperless' },
      { label: 'Proteksi Manipulasi', value: 'Anti-Fake GPS' },
    ],
    desc: 'Transformasi absensi apel pagi manual berbasis kertas menjadi aplikasi mobile responsif dengan validasi koordinat GPS radius kantor ketat 25 meter. Dilengkapi disposisi arahan pimpinan dan rekapitulasi data kehadiran otomatis.',
    link: '/portfolio/si-akoor-presensi-kinerja-pegawai',
  },
  {
    title: 'AGAN TRANS — Reservasi Tiket & Booking Rute Mobile-First',
    client: 'travelbandungbali.id (AGAN TRANS)',
    category: 'Aplikasi Komersial Booking & Travel',
    image: '/images/porto-2.webp',
    imageAlt: 'Website Layanan Sewa Hiace dan Travel Bandung Bali AGAN TRANS',
    results: [
      { label: 'Kenaikan Reservasi', value: '+320% via HP' },
      { label: 'Konversi Chat WA', value: '1-Klik Booking' },
      { label: 'Kecepatan Muat', value: 'Di Bawah 1.5s' },
    ],
    desc: 'Sistem pemesanan tiket perjalanan antarkota mobile-first yang memudahkan penumpang memilih armada Hiace, jadwal perjalanan, dan langsung menyelesaikan reservasi melalui integrasi WhatsApp terstruktur.',
    link: '/portfolio/agan-trans-travel-bandung-bali',
  },
  {
    title: 'Youthpreneur — Portal Pendataan & Pembinaan Wirausaha',
    client: 'Dispora Kabupaten Tapin',
    category: 'Portal Mobile Layanan Publik',
    image: '/images/porto-1.webp',
    imageAlt: 'Portal Pendataan Wirausaha Pemuda Youthpreneur Dispora Tapin',
    results: [
      { label: 'Wirausaha Terdata', value: '900+ Pemuda' },
      { label: 'Akses Layanan', value: '100% Mobile' },
      { label: 'Sinkronisasi Data', value: 'Real-Time' },
    ],
    desc: 'Aplikasi web portal yang mempermudah pemuda wirausaha mendaftarkan profil usaha, mengakses kurasi bantuan modal, dan menerima pengumuman program pembinaan langsung dari smartphone mereka.',
    link: '/portfolio/youthpreneur-dispora-tapin',
  },
  {
    title: 'Pentas Japin — Evaluasi Kinerja Digital Pegawai ASN & Non-ASN',
    client: 'Bagian Organisasi Setda Kab. Tapin',
    category: 'Sistem Evaluasi Kinerja Pegawai (E-Gov)',
    image: '/images/porto-4.webp',
    imageAlt: 'Aplikasi Pentas Japin Penilaian Kinerja Terintegrasi Setda Tapin',
    results: [
      { label: 'Kecepatan Rekapitulasi', value: '3x Lebih Cepat' },
      { label: 'Objektivitas Nilai', value: '100% Terukur' },
      { label: 'Arsip Berkas', value: 'Digital Terpusat' },
    ],
    desc: 'Sistem evaluasi kinerja aparatur pemerintah daerah yang memangkas birokrasi rekapitulasi penilaian bulanan menjadi instan dan transparan, tanpa beban berkas kertas berulang.',
    link: '/portfolio/pentas-japin-setda-tapin',
  },
]

const comparisonCriteria = [
  {
    kriteria: 'Biaya Pengembangan',
    marketingCode: 'Hemat & Masuk Akal (1 basis kode Flutter untuk Android & iOS)',
    softwareHouse: 'Sangat Mahal (Sering dihitung 2x lipat untuk tim Android + iOS)',
    freelancer: 'Terlihat murah di awal, sering membengkak karena revisi tak berujung',
  },
  {
    kriteria: 'Desain Layar Sebelum Koding',
    marketingCode: 'Termasuk (Prototype Interaktif bisa dicoba di HP sebelum koding)',
    softwareHouse: 'Dikenakan biaya desain terpisah yang cukup mahal',
    freelancer: 'Langsung koding tanpa desain, hasil akhir sering tidak sesuai harapan',
  },
  {
    kriteria: 'Kelengkapan Dashboard Admin',
    marketingCode: 'Termasuk Terima Beres (Web Dashboard untuk kelola data)',
    softwareHouse: 'Sering menjadi biaya modul tambahan backend tersendiri',
    freelancer: 'Sering tidak ada dashboard, pemilik bisnis harus edit database langsung',
  },
  {
    kriteria: 'Jaminan Rilis ke Toko Aplikasi',
    marketingCode: 'Didampingi Penuh sampai disetujui Google Play Store',
    softwareHouse: 'Didampingi sesuai kontrak proyek korporat',
    freelancer: 'Sering ditolak Google/Apple karena masalah kebijakan WebView spam',
  },
  {
    kriteria: 'Kepemilikan Data & Source Code',
    marketingCode: '100% Hak Milik Klien seutuhnya tanpa royalti',
    softwareHouse: 'Tergantung klausul kepemilikan lisensi vendor',
    freelancer: 'Rawan terkunci di akun pribadi freelancer jika terjadi selisih paham',
  },
  {
    kriteria: 'Garansi & Dukungan Pasca-Rilis',
    marketingCode: 'Garansi Resmi 1 Tahun Penuh & Jalur WhatsApp Langsung',
    softwareHouse: 'Membutuhkan biaya kontrak retainer bulanan yang tinggi',
    freelancer: 'Sering sulit dihubungi saat aplikasi mengalami kendala teknis',
  },
  {
    kriteria: 'Komunikasi & Konsultasi',
    marketingCode: 'Langsung dengan Lead Developer (Ahmad Khairul M.)',
    softwareHouse: 'Birokrasi panjang melewati banyak lapis manajemen proyek',
    freelancer: 'Sering tidak menepati komitmen waktu dan alur koordinasi',
  },
]

const workflowSteps = [
  {
    num: '01',
    title: 'Diskusi Alur & Pemetaan Fitur',
    desc: 'Ceritakan kebutuhan masalah kerja atau ide aplikasi Anda lewat WhatsApp. Kami bantu susunkan pemetaan fitur inti yang paling efisien tanpa fitur sia-sia.',
  },
  {
    num: '02',
    title: 'Desain Layar Interaktif (Prototype UI/UX)',
    desc: 'Kami rancang antarmuka visual layar demi layar yang bisa Anda klik dan uji coba langsung di smartphone untuk memastikan alur kerja disepakati bersama.',
  },
  {
    num: '03',
    title: 'Pengembangan Aplikasi & Dashboard Web',
    desc: 'Kami membangun aplikasi mobile sekaligus database dan panel admin pusat dengan laporan progres berkala yang transparan dan terukur.',
  },
  {
    num: '04',
    title: 'Uji Coba (QA), Rilis Store & Pendampingan',
    desc: 'Pengujian menyeluruh di berbagai tipe HP, publikasi ke Google Play Store, panduan pengelolaan dashboard admin, serta pengaktifan garansi resmi 1 tahun.',
  },
]

const industryPills = [
  'Presensi & HRD Pegawai',
  'Booking & Travel Antarkota',
  'Katalog & Toko Online',
  'Layanan Publik & OPD Daerah',
  'Klinik & Jadwal Kesehatan',
  'Logistik & Kurir Pengiriman',
  'Pendidikan & E-Learning',
  'Komunitas & Koperasi Simpan Pinjam',
]

export default function JasaPembuatanAplikasiMobilePage() {
  return (
    <div className="min-h-screen font-sans bg-[#FBFBFB] text-[#18181B] antialiased selection:bg-[#FF5C28] selection:text-white">
      <JsonLd
        data={[
          serviceSchema(
            'Jasa Pembuatan Aplikasi Mobile (Android, iOS & PWA)',
            'Jasa pembuatan aplikasi mobile Android, iOS, & PWA profesional. Lengkap dengan Web Admin Dashboard, UI/UX Prototype, pendampingan Google Play Store, & garansi pemeliharaan 1 tahun.',
            '/jasa-pembuatan-aplikasi-mobile'
          ),
          faqSchema(faqs),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Jasa Pembuatan Aplikasi Mobile', path: '/jasa-pembuatan-aplikasi-mobile' },
          ]),
        ]}
      />

      <main className="relative overflow-hidden">
        {/* ============================================================== */}
        {/* SECTION 1: HERO SECTION                                        */}
        {/* ============================================================== */}
        <div className="relative bg-paper-cream-glow bg-dot-fine pt-28 sm:pt-36 pb-20 sm:pb-28 overflow-hidden section-rule">
          {/* Ambient Chromatic Orbs */}
          <div
            className="absolute top-12 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-[#FF5C28]/15 via-amber-400/10 to-transparent rounded-full blur-3xl pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-gradient-to-tr from-sky-400/12 to-transparent rounded-full blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-12 items-center">
              {/* Left Column: Copy & Actions */}
              <div className="lg:col-span-6 xl:col-span-7 space-y-6 text-left">
                {/* Eyebrow Badge */}
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FFF5F0] border border-orange-200/80 shadow-xs">
                    <Smartphone className="w-3.5 h-3.5 text-[#C23605]" />
                    <span className="text-xs font-semibold text-[#C23605] tracking-tight">
                      Jasa Pembuatan Aplikasi Android, iOS &amp; Web-App • Terima Beres Se-Indonesia
                    </span>
                  </div>
                </div>

                {/* H1 Headline */}
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#111827] tracking-tight leading-[1.2] sm:leading-[1.14]">
                  Hadirkan Layanan Bisnis &amp; Sistem Kerja Anda{' '}
                  <span className="text-[#FF5C28]">Langsung di Genggaman HP</span>
                </h1>

                {/* Sub-headline */}
                <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-normal max-w-xl">
                  Bangun aplikasi Android, iOS, atau Web-App kustom yang cepat, mudah digunakan, dan langsung terhubung dengan Dashboard Admin pusat. Mulai dari aplikasi booking, katalog &amp; order pelanggan, hingga presensi GPS dan layanan instansi—terima beres tanpa perlu tim IT sendiri.
                </p>

                {/* Dual CTA Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                  <a
                    href={getWhatsAppDirectUrl(
                      'Halo MarketingCode.ID, saya ingin konsultasi rencana pembuatan aplikasi mobile (Android/iOS/PWA) untuk bisnis/instansi saya.'
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm sm:text-base font-semibold text-white bg-[#D13D00] hover:bg-[#B33400] rounded-full shadow-glow transition-all duration-300 transform hover:-translate-y-1 whitespace-nowrap"
                  >
                    <Image
                      src="/icons/flaticon/whatsapp.svg"
                      alt=""
                      width={20}
                      height={20}
                      className="w-5 h-5 shrink-0"
                    />
                    <span>Konsultasi Aplikasi via WhatsApp</span>
                  </a>
                  <a
                    href="#paket-harga-aplikasi"
                    className="inline-flex items-center justify-center px-6 py-3.5 text-sm sm:text-base font-semibold text-neutral-800 bg-white hover:border-[#D13D00] border border-neutral-200 rounded-full transition-all duration-300 text-center whitespace-nowrap"
                  >
                    <span>Lihat Paket &amp; Estimasi Biaya</span>
                  </a>
                </div>

                {/* Founder Personal Touch Card */}
                <div className="pt-3 border-t border-neutral-200/70 mt-2 flex items-center gap-3.5 bg-white/80 backdrop-blur-xs p-3.5 rounded-2xl border border-neutral-200/80 max-w-xl shadow-xs">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#FF5C28] to-amber-500 text-white font-extrabold flex items-center justify-center text-sm shadow-sm ring-2 ring-white shrink-0">
                    AK
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-xs sm:text-sm text-neutral-900">
                        Dikerjakan &amp; Diawasi Langsung oleh Ahmad Khairol M.
                      </span>
                      <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.5 rounded font-semibold">
                        Lead Developer • Aktif Menerima Proyek
                      </span>
                    </div>
                    <p className="text-[11px] sm:text-xs text-neutral-600 mt-0.5 leading-snug">
                      Arsitektur aplikasi dirancang rapi sejak awal, didampingi dari perancangan alur tampilan (UI/UX) hingga siap diunduh pengguna.
                    </p>
                  </div>
                </div>

                {/* 3 Real Trust Points */}
                <div className="pt-1 flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-1.5 text-xs text-neutral-700 font-medium">
                  <span className="flex items-center gap-1 text-[11px] sm:text-xs">
                    <Check className="w-3.5 h-3.5 text-[#C23605]" /> Termasuk Dashboard Admin Web
                  </span>
                  <span className="text-neutral-300">•</span>
                  <span className="flex items-center gap-1 text-[11px] sm:text-xs">
                    <Check className="w-3.5 h-3.5 text-[#C23605]" /> Pendampingan Rilis Play Store
                  </span>
                  <span className="text-neutral-300">•</span>
                  <span className="flex items-center gap-1 text-[11px] sm:text-xs">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#C23605]" /> Garansi Pemeliharaan 1 Tahun
                  </span>
                </div>
              </div>

              {/* Right Column: Interactive Smartphone Mockup & Floating Cards */}
              <div className="lg:col-span-6 xl:col-span-5 flex justify-center lg:justify-end items-center">
                <div className="relative w-full max-w-[340px] sm:max-w-[380px] py-6">
                  {/* Background Ambient Glow */}
                  <div
                    className="absolute -inset-4 bg-gradient-to-tr from-[#FF5C28]/20 via-amber-500/15 to-transparent rounded-full blur-3xl -z-10"
                    aria-hidden="true"
                  />

                  {/* Smartphone Frame Container */}
                  <div className="relative mx-auto w-[280px] sm:w-[310px] bg-neutral-900 rounded-[44px] p-3 shadow-2xl border-4 border-neutral-800 ring-1 ring-white/20">
                    {/* Speaker & Dynamic Island */}
                    <div className="absolute top-5 left-1/2 -translate-x-1/2 w-24 h-4 bg-black rounded-full z-30 flex items-center justify-center">
                      <div className="w-2.5 h-2.5 bg-neutral-800 rounded-full mr-2" />
                      <div className="w-2 h-2 bg-neutral-900 rounded-full" />
                    </div>

                    {/* Smartphone Screen Content */}
                    <div className="relative bg-white rounded-[36px] overflow-hidden pt-8 pb-5 px-4 text-left border border-neutral-100 flex flex-col justify-between min-h-[440px]">
                      {/* Top Bar Mockup */}
                      <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                        <div className="flex items-center gap-1.5">
                          <div className="w-6 h-6 rounded-lg bg-[#FF5C28] text-white flex items-center justify-center text-[10px] font-bold">
                            MC
                          </div>
                          <div>
                            <div className="text-[11px] font-extrabold text-neutral-900 leading-tight">
                              Si Akoor Mobile
                            </div>
                            <div className="text-[9px] text-neutral-500">Presensi &amp; Layanan</div>
                          </div>
                        </div>
                        <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                          Online
                        </span>
                      </div>

                      {/* Map Geofencing Card Mockup */}
                      <div className="mt-3 p-3 rounded-2xl bg-gradient-to-b from-orange-50/70 to-neutral-50 border border-orange-200/60 space-y-2">
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="font-semibold text-neutral-700 flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-[#FF5C28]" />
                            Radius GPS Kantor: 25m
                          </span>
                          <span className="font-bold text-emerald-600 bg-emerald-100/80 px-1.5 py-0.2 rounded text-[9px]">
                            Akurat
                          </span>
                        </div>
                        <div className="h-16 w-full rounded-xl bg-neutral-200/80 relative overflow-hidden flex items-center justify-center border border-neutral-300/50">
                          <div className="w-10 h-10 rounded-full bg-[#FF5C28]/20 animate-ping absolute" />
                          <div className="w-5 h-5 rounded-full bg-[#FF5C28] text-white flex items-center justify-center z-10 shadow-sm">
                            <MapPin className="w-3 h-3" />
                          </div>
                          <span className="absolute bottom-1 right-1.5 text-[8px] bg-black/60 text-white px-1.5 py-0.2 rounded font-mono">
                            Lat: -2.9351 | Long: 115.1482
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-[10px] pt-0.5">
                          <span className="text-neutral-500">Status Kehadiran:</span>
                          <span className="font-bold text-neutral-900">100% Terverifikasi</span>
                        </div>
                      </div>

                      {/* Micro Quick Actions */}
                      <div className="grid grid-cols-2 gap-2 mt-3">
                        <div className="p-2 rounded-xl bg-neutral-50 border border-neutral-200/70 text-left">
                          <div className="w-6 h-6 rounded-lg bg-orange-100 text-[#C23605] flex items-center justify-center mb-1">
                            <Camera className="w-3.5 h-3.5" />
                          </div>
                          <div className="text-[10px] font-bold text-neutral-800">Foto Kerja</div>
                          <div className="text-[8px] text-neutral-500">Real-time kamera</div>
                        </div>
                        <div className="p-2 rounded-xl bg-neutral-50 border border-neutral-200/70 text-left">
                          <div className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center mb-1">
                            <Bell className="w-3.5 h-3.5" />
                          </div>
                          <div className="text-[10px] font-bold text-neutral-800">Push Notif</div>
                          <div className="text-[8px] text-neutral-500">Info pimpinan</div>
                        </div>
                      </div>

                      {/* Bottom Button inside phone */}
                      <div className="mt-3 pt-2 border-t border-neutral-100">
                        <div className="w-full py-2 rounded-xl bg-[#D13D00] text-white text-[11px] font-bold text-center shadow-xs">
                          Kirim Laporan &amp; Presensi
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floating Card 1: Android & iOS Ready */}
                  <div className="absolute -top-1 -right-2 sm:-right-6 bg-white/95 backdrop-blur-md p-2.5 sm:p-3 rounded-2xl border border-neutral-200/90 shadow-lg text-left max-w-[170px] z-20">
                    <div className="flex items-center gap-1.5 text-[#FF5C28] text-[10px] font-extrabold uppercase">
                      <Smartphone className="w-3 h-3" />
                      <span>Android &amp; iOS</span>
                    </div>
                    <div className="text-[11px] font-bold text-neutral-900 mt-0.5 leading-tight">
                      1 Pengembangan untuk Semua HP
                    </div>
                  </div>

                  {/* Floating Card 2: Akses Fitur HP Aktif */}
                  <div className="absolute top-1/2 -left-3 sm:-left-8 -translate-y-1/2 bg-white/95 backdrop-blur-md p-2.5 sm:p-3 rounded-2xl border border-neutral-200/90 shadow-lg text-left max-w-[175px] z-20">
                    <div className="flex items-center gap-1.5 text-emerald-700 text-[10px] font-extrabold uppercase">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>Fitur Hardware HP</span>
                    </div>
                    <div className="text-[11px] font-bold text-neutral-900 mt-0.5 leading-tight">
                      Kamera, GPS Geofencing, &amp; Push Notif
                    </div>
                  </div>

                  {/* Floating Card 3: Dashboard Web Sync */}
                  <div className="absolute -bottom-2 -right-2 sm:-right-4 bg-white/95 backdrop-blur-md p-2.5 sm:p-3 rounded-2xl border border-neutral-200/90 shadow-lg text-left max-w-[175px] z-20">
                    <div className="flex items-center gap-1.5 text-blue-700 text-[10px] font-extrabold uppercase">
                      <Database className="w-3 h-3 text-blue-600" />
                      <span>Sync Real-Time</span>
                    </div>
                    <div className="text-[11px] font-bold text-neutral-900 mt-0.5 leading-tight">
                      Terhubung Dashboard Admin Pusat
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Ecosystem Approach Strip (Pilih Pendekatan Sesuai Anggaran) */}
            <div className="mt-12 sm:mt-16 bg-white/95 backdrop-blur-xs rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-neutral-200/90 shadow-md max-w-5xl mx-auto">
              <div className="flex items-center justify-between gap-2 pb-3 mb-4 border-b border-neutral-100">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-neutral-800">
                    PILIH PENDEKATAN TEKNOLOGI SESUAI ANGGARAN &amp; KEBUTUHAN ANDA
                  </span>
                </div>
                <span className="text-[10px] sm:text-xs font-bold text-[#C23605] bg-[#FFF5F0] border border-orange-200/70 px-2.5 py-0.5 rounded-full">
                  Solusi Fleksibel
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                {/* Approach 1 */}
                <div className="p-3.5 rounded-2xl bg-neutral-50/80 border border-neutral-200/60 space-y-1.5">
                  <div className="font-bold text-neutral-900 text-xs sm:text-sm flex items-center justify-between">
                    <span>Mobile Web-App (PWA)</span>
                    <span className="text-[9px] bg-neutral-200 text-neutral-700 px-1.5 py-0.2 rounded font-bold">
                      Cepat &amp; Hemat
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-600 leading-relaxed">
                    Langsung dipasang dari browser ke layar HP tanpa antrean review toko aplikasi. Ideal untuk katalog toko, komunitas, atau prototipe awal usaha.
                  </p>
                </div>

                {/* Approach 2 */}
                <div className="p-3.5 rounded-2xl bg-[#FFF5F0] border border-orange-200/80 space-y-1.5 relative">
                  <div className="font-bold text-[#C23605] text-xs sm:text-sm flex items-center justify-between">
                    <span>Android &amp; iOS Cross-Platform</span>
                    <span className="text-[9px] bg-[#FF5C28] text-white px-1.5 py-0.2 rounded font-bold">
                      Paling Diminati
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-700 leading-relaxed">
                    Satu basis kode Flutter / React Native untuk Android &amp; iPhone sekaligus. Akses fitur kamera/GPS penuh dan siap rilis resmi di Play Store.
                  </p>
                </div>

                {/* Approach 3 */}
                <div className="p-3.5 rounded-2xl bg-neutral-50/80 border border-neutral-200/60 space-y-1.5">
                  <div className="font-bold text-neutral-900 text-xs sm:text-sm flex items-center justify-between">
                    <span>Custom Ecosystem &amp; Enterprise</span>
                    <span className="text-[9px] bg-blue-100 text-blue-800 px-1.5 py-0.2 rounded font-bold">
                      Skala Besar
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-600 leading-relaxed">
                    Dirancang untuk beban transaksi ribuan pengguna, payment gateway otomatis, proteksi geofencing presisi, dan regulasi kepatuhan data SPBE instansi.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* ============================================================== */}
        {/* SECTION 2: 4 MASALAH UTAMA & MICRO-UI SIMULASI (PAIN POINTS)  */}
        {/* ============================================================== */}
        <section className="relative py-24 sm:py-32 bg-paper-cream-center-glow bg-dot-fine section-rule overflow-hidden">
          {/* Top Hairline Gradient & Ambient Light */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#FF5C28]/40 to-transparent pointer-events-none" aria-hidden="true" />
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-60 bg-red-500/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FFF5F0] border border-orange-200/80 mb-4 shadow-xs">
                <AlertTriangle className="w-3.5 h-3.5 text-[#C23605]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#C23605]">
                  01 / KENAPA BANYAK PROYEK APLIKASI GAGAL?
                </span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#111827] tracking-tight leading-tight">
                Ingin Buat Aplikasi, Tapi Sering Terbentur 4 Masalah Ini
              </h2>

              <p className="mt-4 text-sm sm:text-base text-neutral-600 leading-relaxed">
                Banyak pemilik usaha dan instansi menunda pembuatan aplikasi—atau kecewa setelah keluar biaya puluhan juta—karena empat kendala klasik di bawah ini:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Problem 1: Software House Mahal */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/90 shadow-card flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-extrabold text-[#C23605] tracking-wider uppercase bg-[#FFF5F0] px-2.5 py-1 rounded-md border border-orange-200/60">
                    Masalah 01
                  </span>
                  <span className="text-[10px] font-bold text-red-600 bg-red-50 border border-red-200/70 px-2 py-0.5 rounded-full">
                    Biaya Membengkak
                  </span>
                </div>
                <h3 className="text-lg font-bold text-neutral-900 leading-snug">
                  Harga Software House Melambung karena Dihitung 2 Kali
                </h3>
                <p className="text-xs text-neutral-600 mt-2.5 leading-relaxed">
                  Banyak agensi konvensional memisahkan biaya koding Android dan iPhone dengan dua tim programmer berbeda sehingga penawaran meroket hingga Rp 75 Juta+. Padahal dengan arsitektur cross-platform modern, aplikasi Android &amp; iOS bisa dibangun sekaligus dengan biaya jauh lebih hemat.
                </p>
              </div>

              {/* Micro-UI 1 */}
              <div className="mt-6 pt-4 border-t border-neutral-100 bg-neutral-50 rounded-2xl p-4 border border-neutral-200/60 space-y-2">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-neutral-500 font-medium">Koding Android Terpisah:</span>
                  <span className="font-bold text-neutral-800">Rp 30.000.000</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-neutral-500 font-medium">Koding iOS Terpisah:</span>
                  <span className="font-bold text-neutral-800">Rp 30.000.000</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-neutral-500 font-medium">Backend &amp; Dashboard:</span>
                  <span className="font-bold text-neutral-800">Rp 15.000.000</span>
                </div>
                <div className="pt-2 border-t border-neutral-200 flex items-center justify-between text-xs">
                  <span className="font-bold text-red-600">Total Software House:</span>
                  <span className="font-extrabold text-red-600">Rp 75.000.000 (Overbudget)</span>
                </div>
                <div className="pt-1 text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
                  <Check className="w-3 h-3 text-emerald-600 stroke-[3]" />
                  <span>Solusi Kami: 1 Basis Kode Modern Mulai Rp 3.490.000</span>
                </div>
              </div>
            </div>

            {/* Problem 2: Ditolak Toko Aplikasi */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/90 shadow-card flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-extrabold text-[#C23605] tracking-wider uppercase bg-[#FFF5F0] px-2.5 py-1 rounded-md border border-orange-200/60">
                    Masalah 02
                  </span>
                  <span className="text-[10px] font-bold text-red-600 bg-red-50 border border-red-200/70 px-2 py-0.5 rounded-full">
                    Gagal Tayang
                  </span>
                </div>
                <h3 className="text-lg font-bold text-neutral-900 leading-snug">
                  Aplikasi Sudah Jadi, Tapi Ditolak Google Play Store &amp; App Store
                </h3>
                <p className="text-xs text-neutral-600 mt-2.5 leading-relaxed">
                  Banyak jasa murah yang sekadar membungkus website biasa ke file APK (WebView kasar). Akibatnya aplikasi langsung ditolak mentah-mentah saat peninjauan Google &amp; Apple karena melanggar kebijakan &apos;Minimum Functionality&apos; atau &apos;WebView Spam&apos;.
                </p>
              </div>

              {/* Micro-UI 2 */}
              <div className="mt-6 pt-4 border-t border-neutral-100 bg-red-50/70 rounded-2xl p-4 border border-red-200/70 space-y-2">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-red-800 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
                    Status Peninjauan Toko Aplikasi:
                  </span>
                  <span className="font-extrabold text-red-700 bg-red-200/80 px-2 py-0.5 rounded text-[10px]">
                    REJECTED
                  </span>
                </div>
                <p className="text-[10px] text-red-700 leading-tight">
                  Alasan: Policy 4.2 Minimum Functionality. Aplikasi hanya memuat tautan web tanpa fungsi mobile native.
                </p>
                <div className="pt-1 text-[10px] text-emerald-800 font-semibold flex items-center gap-1">
                  <Check className="w-3 h-3 text-emerald-600 stroke-[3]" />
                  <span>Solusi Kami: Standar Kode Native &amp; Pendampingan Sampai Lolos</span>
                </div>
              </div>
            </div>

            {/* Problem 3: Lemot & Sulit Dipakai */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/90 shadow-card flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-extrabold text-[#C23605] tracking-wider uppercase bg-[#FFF5F0] px-2.5 py-1 rounded-md border border-orange-200/60">
                    Masalah 03
                  </span>
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200/70 px-2 py-0.5 rounded-full">
                    Pengguna Kabur
                  </span>
                </div>
                <h3 className="text-lg font-bold text-neutral-900 leading-snug">
                  Tampilan Rumit &amp; Berat Saat Dibuka di HP Spesifikasi Rendah
                </h3>
                <p className="text-xs text-neutral-600 mt-2.5 leading-relaxed">
                  Aplikasi yang memakan RAM tinggi dan memiliki menu berbelit-belit membuat pelanggan malas memesan dan pegawai lapangan kembali mencatat manual di kertas atau grup WhatsApp. Pengguna akhirnya memilih uninstal.
                </p>
              </div>

              {/* Micro-UI 3 */}
              <div className="mt-6 pt-4 border-t border-neutral-100 bg-neutral-50 rounded-2xl p-4 border border-neutral-200/60 space-y-2">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-neutral-600 font-medium">Durasi Membuka Aplikasi:</span>
                  <span className="font-bold text-amber-700">12 Detik (Terlalu Lambat)</span>
                </div>
                <div className="h-2 w-full rounded-full bg-neutral-200 overflow-hidden">
                  <div className="h-full w-[85%] bg-amber-500 rounded-full" />
                </div>
                <div className="flex items-center justify-between text-[10px] text-neutral-500">
                  <span>Dampak: Staf mengeluh bingung</span>
                  <span className="text-red-600 font-bold">Uninstal Rate 64%</span>
                </div>
                <div className="pt-1 text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
                  <Check className="w-3 h-3 text-emerald-600 stroke-[3]" />
                  <span>Solusi Kami: Desain UI/UX Ringan &amp; Prototipe Sebelum Koding</span>
                </div>
              </div>
            </div>

            {/* Problem 4: Ditinggal Pengembang */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/90 shadow-card flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-extrabold text-[#C23605] tracking-wider uppercase bg-[#FFF5F0] px-2.5 py-1 rounded-md border border-orange-200/60">
                    Masalah 04
                  </span>
                  <span className="text-[10px] font-bold text-red-600 bg-red-50 border border-red-200/70 px-2 py-0.5 rounded-full">
                    Tanpa Garansi
                  </span>
                </div>
                <h3 className="text-lg font-bold text-neutral-900 leading-snug">
                  Ditinggal Developer Saat Ada Pembaruan OS Android / iOS
                </h3>
                <p className="text-xs text-neutral-600 mt-2.5 leading-relaxed">
                  Sistem operasi smartphone diperbarui setiap tahun. Tanpa dokumentasi rapi, akun server milik Anda sendiri, dan garansi pemeliharaan, aplikasi berisiko macet (crash) total dan pengembang lepas tidak bisa dihubungi lagi.
                </p>
              </div>

              {/* Micro-UI 4 */}
              <div className="mt-6 pt-4 border-t border-neutral-100 bg-neutral-50 rounded-2xl p-4 border border-neutral-200/60 space-y-2">
                <div className="p-2 rounded-xl bg-white border border-neutral-200 text-left space-y-1">
                  <div className="text-[10px] text-neutral-500">Chat ke Developer Lama:</div>
                  <div className="text-[11px] font-medium text-neutral-800">
                    &quot;Mas, aplikasinya error force close di Android terbaru, bisa dibantu?&quot;
                  </div>
                  <div className="text-[9px] text-neutral-400 flex items-center justify-end gap-1">
                    <span>Centang Satu • Tidak Dibalas</span>
                  </div>
                </div>
                <div className="pt-1 text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
                  <Check className="w-3 h-3 text-emerald-600 stroke-[3]" />
                  <span>Solusi Kami: Garansi 1 Tahun Penuh &amp; 100% Hak Milik Akses</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

        {/* ============================================================== */}
        {/* SECTION 3: 4 SOLUSI APLIKASI TEPAT GUNA (USE-CASE CARDS)       */}
        {/* ============================================================== */}
        <section className="relative py-24 sm:py-32 bg-gradient-to-b from-[#FFFDFB] via-[#FFF8F2] to-[#FFFDFB] section-rule overflow-hidden">
          <div className="absolute inset-0 bg-dot-fine opacity-70 pointer-events-none" aria-hidden="true" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-orange-400/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FFF5F0] border border-orange-200/80 mb-4 shadow-xs">
                <Sliders className="w-3.5 h-3.5 text-[#C23605]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#C23605]">
                  02 / SOLUSI APLIKASI TEPAT GUNA
                </span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#111827] tracking-tight leading-tight">
                Aplikasi Apa yang Sedang Dibutuhkan Bisnis atau Instansi Anda?
              </h2>

              <p className="mt-4 text-sm sm:text-base text-neutral-600 leading-relaxed">
                Kami tidak sekadar membuat koding, kami merancang solusi operasional nyata yang langsung menjawab kendala di lapangan:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {useCases.map((useCase) => (
                <div
                  key={useCase.title}
                  className="bg-white rounded-3xl p-6 border border-neutral-200/80 shadow-card hover:border-orange-300 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-[#FFF5F0] border border-orange-200/70 text-[#FF5C28] flex items-center justify-center mb-4 shadow-xs">
                      <useCase.icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block mb-1">
                      Target: {useCase.target}
                    </span>
                    <h3 className="text-base font-bold text-neutral-900 leading-snug">
                      {useCase.title}
                    </h3>
                    <p className="text-xs text-neutral-600 mt-2.5 leading-relaxed">
                      {useCase.desc}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-neutral-100">
                    <span className="text-[10px] font-bold text-[#C23605] bg-[#FFF5F0] px-2.5 py-1 rounded-full block text-center border border-orange-200/60">
                      {useCase.highlight}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* SECTION 4: 6 KOMPONEN ALL-IN-ONE DELIVERABLES                  */}
        {/* ============================================================== */}
        <div className="relative py-24 sm:py-32 bg-paper-warm section-rule overflow-hidden">
          <div className="absolute inset-0 bg-blueprint opacity-35 pointer-events-none" aria-hidden="true" />
          <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FFF5F0] border border-orange-200/80 mb-4 shadow-xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C23605]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#C23605]">
                  03 / STANDAR PENGERJAAN TERIMA BERES
                </span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#111827] tracking-tight leading-tight">
                Bukan Sekadar File Aplikasi, Anda Mendapatkan Sistem yang Utuh
              </h2>

              <p className="mt-4 text-sm sm:text-base text-neutral-600 leading-relaxed">
                Seluruh proyek aplikasi yang kami bangun dilengkapi dengan fondasi teknis lengkap agar bisnis dan operasional Anda bisa langsung melangkah tanpa pusing urusan server atau koding:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {deliverables.map((item) => (
                <div
                  key={item.title}
                  className="bg-white rounded-3xl p-6 sm:p-7 border border-neutral-200/90 shadow-card hover:border-orange-200 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#FFF5F0] border border-orange-200/70 text-[#FF5C28] flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-neutral-900 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-neutral-600 mt-2.5 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* ============================================================== */}
        {/* SECTION 5: BUKTI PORTOFOLIO & STUDI KASUS NYATA                */}
        {/* ============================================================== */}
        <div className="relative py-24 sm:py-32 bg-ink-panel text-white section-rule border-neutral-800 overflow-hidden">
          {/* Top hairline amber glow */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#FF5C28]/40 to-transparent pointer-events-none" aria-hidden="true" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#FF5C28]/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

          <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 mb-4 shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-orange-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-orange-300">
                  04 / BUKTI NYATA DI LAPANGAN
                </span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Sistem &amp; Aplikasi yang Sudah Digunakan Ratusan Pengguna
              </h2>

              <p className="mt-4 text-sm sm:text-base text-neutral-300 leading-relaxed">
                Kami telah membuktikan rekam jejak dalam membangun sistem operasional, presensi GPS, hingga pemesanan komersial di Kalimantan Selatan dan sekitarnya:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {caseStudies.map((study) => (
                <div
                  key={study.title}
                  className="bg-neutral-900/90 rounded-3xl overflow-hidden border border-neutral-800 hover:border-neutral-700 shadow-2xl flex flex-col justify-between transition-all duration-300"
                >
                  <div>
                    {/* Image Preview */}
                    <div className="relative h-56 sm:h-64 w-full bg-neutral-950 overflow-hidden">
                      <Image
                        src={study.image}
                        alt={study.imageAlt}
                        fill
                        className="object-cover object-top hover:scale-105 transition-transform duration-500 opacity-90"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-xs text-white text-[10px] font-bold px-3 py-1 rounded-full border border-white/20">
                        {study.client}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 sm:p-7">
                      <span className="text-[11px] font-bold text-orange-400 uppercase tracking-wider block mb-1">
                        {study.category}
                      </span>
                      <h3 className="text-lg sm:text-xl font-bold text-white leading-snug">
                        {study.title}
                      </h3>
                      <p className="text-xs text-neutral-300 mt-2.5 leading-relaxed">
                        {study.desc}
                      </p>

                      {/* Results Metrics */}
                      <div className="grid grid-cols-3 gap-2 mt-5 pt-4 border-t border-neutral-800 text-center">
                        {study.results.map((res) => (
                          <div key={res.label} className="p-2 rounded-xl bg-neutral-950/70 border border-neutral-800">
                            <div className="text-xs sm:text-sm font-extrabold text-[#FF5C28]">
                              {res.value}
                            </div>
                            <div className="text-[9px] text-neutral-400 mt-0.5 leading-tight">
                              {res.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-2">
                    <Link
                      href={study.link}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-400 hover:text-orange-300 transition-colors"
                    >
                      <span>Lihat Detail Studi Kasus</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Industry Pills */}
            <div className="mt-12 text-center">
              <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider block mb-4">
                Sektor &amp; Industri yang Telah Kami Layani:
              </span>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {industryPills.map((pill) => (
                  <span
                    key={pill}
                    className="px-3.5 py-1.5 rounded-full bg-neutral-900/90 border border-neutral-800 text-neutral-300 text-xs font-medium shadow-xs"
                  >
                    {pill}
                  </span>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* ============================================================== */}
        {/* SECTION 6: TABEL HARGA TRANSPARAN 3 TIER + 2 BANNER TAMBAHAN   */}
        {/* ============================================================== */}
        <MobilePricingSection />

        {/* ============================================================== */}
        {/* SECTION 7: ALUR KERJA 4 LANGKAH TRANSPARAN (ANTI-DRAMA)        */}
        {/* ============================================================== */}
        <div className="relative py-24 sm:py-32 bg-gradient-to-b from-[#FAF7F2] via-[#F6F3EC] to-[#F2EFE7] section-rule overflow-hidden">
          <div className="absolute inset-0 bg-dot-fine opacity-60 pointer-events-none" aria-hidden="true" />
          <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FFF5F0] border border-orange-200/80 mb-4 shadow-xs">
                <Clock className="w-3.5 h-3.5 text-[#C23605]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#C23605]">
                  06 / TAHAPAN PENGEMBANGAN TERUKUR
                </span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#111827] tracking-tight leading-tight">
                Anda Bisa Melihat Bentuk Aplikasinya Sebelum Kami Mulai Koding
              </h2>

              <p className="mt-4 text-sm sm:text-base text-neutral-600 leading-relaxed">
                Kami menerapkan proses yang terstruktur dan transparan agar Anda tidak perlu cemas hasil akhir melenceng dari kesepakatan:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {workflowSteps.map((step) => (
                <div
                  key={step.num}
                  className="bg-white rounded-3xl p-6 sm:p-7 border border-neutral-200/90 shadow-card flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-2xl bg-neutral-900 text-white font-extrabold flex items-center justify-center text-sm mb-4">
                      {step.num}
                    </div>
                    <h3 className="text-base font-bold text-neutral-900 leading-snug">
                      {step.title}
                    </h3>
                    <p className="text-xs text-neutral-600 mt-2.5 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                  <div className="mt-5 pt-3 border-t border-neutral-100 flex items-center gap-1.5 text-[10px] text-[#C23605] font-semibold">
                    <Check className="w-3 h-3 stroke-[3]" />
                    <span>Transparan &amp; Terukur</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* ============================================================== */}
        {/* SECTION 8: TABEL KOMPARASI 3 ARAH                             */}
        {/* ============================================================== */}
        <section className="relative py-24 sm:py-32 bg-[#FBFBFB] bg-dot-fine section-rule overflow-hidden">
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FFF5F0] border border-orange-200/80 mb-4 shadow-xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C23605]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#C23605]">
                  07 / PERBANDINGAN STANDAR LAYANAN
                </span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#111827] tracking-tight leading-tight">
                Kenapa Membangun Aplikasi di MarketingCode.ID Lebih Aman &amp; Efisien?
              </h2>

              <p className="mt-4 text-sm sm:text-base text-neutral-600 leading-relaxed">
                Bandingkan langsung standar pengerjaan kami dengan agensi software house konvensional maupun pengembang lepas biasa:
              </p>
            </div>

            {/* Comparison Table */}
            <div className="overflow-x-auto rounded-3xl border border-neutral-200/90 shadow-card bg-white">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-neutral-200 bg-neutral-50/80">
                    <th className="py-4 px-5 font-extrabold text-neutral-900 w-1/4">
                      Kriteria Penilaian
                    </th>
                    <th className="py-4 px-5 font-extrabold text-[#C23605] bg-[#FFF5F0] w-1/3 border-x border-orange-200/60">
                      MarketingCode.ID
                    </th>
                    <th className="py-4 px-5 font-bold text-neutral-700 w-1/5">
                      Software House Konvensional
                    </th>
                    <th className="py-4 px-5 font-bold text-neutral-700 w-1/5">
                      Freelancer Lepas / Murahan
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {comparisonCriteria.map((row) => (
                    <tr key={row.kriteria} className="hover:bg-neutral-50/50 transition-colors">
                      <td className="py-4 px-5 font-bold text-neutral-900 align-top">
                        {row.kriteria}
                      </td>
                      <td className="py-4 px-5 bg-orange-50/30 font-medium text-neutral-900 align-top border-x border-orange-200/60">
                        <div className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-[#FF5C28] stroke-[3] shrink-0 mt-0.5" />
                          <span>{row.marketingCode}</span>
                        </div>
                      </td>
                      <td className="py-4 px-5 text-neutral-600 align-top">
                        {row.softwareHouse}
                      </td>
                      <td className="py-4 px-5 text-neutral-500 align-top">
                        {row.freelancer}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* SECTION 9: FAQ 7 PERTANYAAN STRATEGIS & FINAL CTA             */}
        {/* ============================================================== */}
        <div className="relative py-24 sm:py-32 bg-gradient-to-b from-[#F5F2EB] via-[#FAF8F5] to-[#FBFBFB] section-rule overflow-hidden">
          <section className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FFF5F0] border border-orange-200/80 mb-3 shadow-xs">
                <Headphones className="w-3.5 h-3.5 text-[#C23605]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#C23605]">
                  Tanya Jawab Seputar Aplikasi
                </span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#111827] tracking-tight">
                Pertanyaan Umum (FAQ) Pembuatan Aplikasi Mobile
              </h2>
              <p className="mt-3 text-xs sm:text-sm text-neutral-600">
                Jawaban transparan untuk hal-hal yang paling sering ditanyakan calon klien kami:
              </p>
            </div>

            <div className="space-y-3.5">
              {faqs.map((faq) => (
                <details
                  key={faq.q}
                  className="bg-white rounded-2xl border border-neutral-200/90 overflow-hidden shadow-xs group transition-all"
                >
                  <summary className="w-full px-5 py-4 text-left flex items-center justify-between text-xs sm:text-sm font-bold text-neutral-900 hover:text-[#FF5C28] cursor-pointer list-none">
                    <span>{faq.q}</span>
                    <ChevronDown className="w-4 h-4 text-neutral-400 group-open:rotate-180 transition-transform shrink-0 ml-3" />
                  </summary>
                  <div className="px-5 pb-5 text-xs text-neutral-600 leading-relaxed border-t border-neutral-100 pt-3">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>

            {/* Final CTA Card */}
            <div className="mt-16 bg-[#121214] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden text-center shadow-xl">
              <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#FF5C28]/25 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 space-y-4 max-w-2xl mx-auto">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-orange-300 text-xs font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>KONSULTASI GRATIS TANPA KOMITMEN</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                  Wujudkan Aplikasi Mobile Impian Bisnis atau Instansi Anda
                </h2>
                <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
                  Diskusikan masalah operasional atau konsep aplikasi Anda langsung bersama Ahmad Khairol M. Kami siap membantu memetakan modul, membuat prototype alur, dan memberikan rekomendasi teknologi yang paling efisien.
                </p>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={getWhatsAppDirectUrl(
                      'Halo MarketingCode.ID, saya ingin diskusi rencana pembuatan aplikasi mobile. Bisnis/instansi saya: ____'
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#D13D00] hover:bg-[#B33400] text-white font-bold text-xs sm:text-sm rounded-full shadow-glow transition-all"
                  >
                    <Image
                      src="/icons/flaticon/whatsapp.svg"
                      alt=""
                      width={18}
                      height={18}
                      className="w-4 h-4 shrink-0"
                    />
                    <span>Diskusikan Ide Aplikasi Anda via WhatsApp</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </a>
                </div>

                <div className="pt-2 text-[10px] text-neutral-400 flex items-center justify-center gap-2">
                  <span>Respon cepat di hari kerja</span>
                  <span>•</span>
                  <span>Keramahan &amp; transparansi teknis 100%</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
