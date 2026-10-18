import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  ChevronRight,
  Landmark,
  MapPin,
  ShoppingBag,
  Layers,
  Globe,
  CloudUpload,
  HelpCircle,
} from 'lucide-react'
import { getWhatsAppUrl } from '@/lib/whatsapp'
import { JsonLd, faqSchema, serviceSchema, breadcrumbSchema } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Jasa Pembuatan Aplikasi Mobile Android & iOS Kalsel',
  description:
    'Jasa pembuatan aplikasi mobile Android & iOS kustom di Kandangan (HSS) & Kalimantan Selatan. Solusi aplikasi layanan publik instansi, presensi geotagging, & bisnis.',
  keywords: [
    'jasa pembuatan aplikasi mobile kalsel',
    'jasa pembuatan aplikasi android kandangan',
    'developer aplikasi mobile hulu sungai selatan',
    'jasa pembuatan aplikasi instansi kalsel',
    'jasa buat aplikasi android ios banjarmasin',
  ],
  alternates: { canonical: '/jasa-pembuatan-aplikasi-mobile' },
  openGraph: {
    title: 'Jasa Pembuatan Aplikasi Mobile Android & iOS Kalsel | MarketingCode.ID',
    description:
      'Jasa pembuatan aplikasi mobile Android & iOS kustom di Kandangan (HSS) & Kalimantan Selatan. Solusi aplikasi layanan publik instansi, presensi geotagging, & bisnis.',
    url: '/jasa-pembuatan-aplikasi-mobile',
    siteName: 'MarketingCode.ID',
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jasa Pembuatan Aplikasi Mobile Android & iOS Kalsel | MarketingCode.ID',
    description:
      'Jasa pembuatan aplikasi mobile Android & iOS kustom di Kandangan (HSS) & Kalimantan Selatan. Solusi aplikasi instansi & bisnis.',
  },
}

const faqs = [
  {
    q: 'Apakah aplikasi yang dibuat bisa berjalan di HP Android sekaligus iPhone (iOS)?',
    a: 'Ya, kami mengembangkan aplikasi lintas platform yang berjalan mulus di Android maupun iPhone (iOS) secara bersamaan, sehingga menghemat biaya pengembangan tanpa perlu membuat aplikasi dua kali.',
  },
  {
    q: 'Bagaimana dengan proses upload ke Google Play Store dan Apple App Store?',
    a: 'Kami mendampingi proses publikasi dari awal hingga tayang resmi, termasuk penyesuaian kebijakan privasi dan keamanan data (UU PDP), serta revisi teknis bila diperlukan agar aplikasi memenuhi pedoman store.',
  },
  {
    q: 'Apakah sudah termasuk halaman admin (dashboard web) untuk mengelola isi aplikasi?',
    a: 'Betul. Setiap pembuatan aplikasi mobile kustom sudah mencakup pengembangan Backend API dan Dashboard Admin berbasis web untuk mengelola data pengguna, konten, dan laporan.',
  },
  {
    q: 'Apakah melayani diskusi langsung untuk instansi atau perusahaan di Kalimantan Selatan?',
    a: 'Sangat bisa. Tim kami yang berlokasi di Kandangan (HSS) siap melakukan paparan teknis dan diskusi tatap muka ke kantor atau instansi Anda di wilayah Hulu Sungai Selatan, Banua Enam, Banjarbaru, maupun Banjarmasin.',
  },
]

const solusi = [
  {
    icon: Landmark,
    title: 'Aplikasi Layanan Publik & E-Government (Instansi Pemerintah / Daerah)',
    desc: 'Mempermudah masyarakat di daerah mengakses informasi publik, mengurus administrasi, menyampaikan pengaduan warga, hingga memantau program kerja secara transparan lewat smartphone.',
  },
  {
    icon: MapPin,
    title: 'Aplikasi Internal: Presensi Geotagging, Koordinasi, & Kinerja Pegawai',
    desc: 'Dilengkapi fitur validasi titik koordinat lokasi (geofencing/GPS), swafoto real-time, pelaporan aktivitas harian lapangan, serta rekapitulasi kinerja otomatis yang terhubung ke dashboard web admin.',
  },
  {
    icon: ShoppingBag,
    title: 'Aplikasi Komersial: Booking Layanan, Katalog, & Operasional Bisnis',
    desc: 'Tingkatkan loyalitas pelanggan bisnis Anda melalui aplikasi pemesanan layanan, katalog produk interaktif, integrasi pembayaran, serta fitur Push Notification untuk mengirim promo langsung ke layar HP pelanggan.',
  },
]

const keunggulan = [
  {
    icon: Layers,
    title: 'Pengembangan Lintas Platform (Android & iOS) yang Efisien',
    desc: 'Menggunakan teknologi modern yang memungkinkan aplikasi berjalan mulus di perangkat Android maupun iPhone (iOS) dengan performa optimal dan tampilan antarmuka (UI/UX) intuitif.',
  },
  {
    icon: Globe,
    title: 'Integrasi Penuh dengan Dashboard Web & REST API',
    desc: 'Setiap aplikasi mobile yang kami bangun dilengkapi panel kontrol berbasis web (Backend Admin) sehingga Anda dapat memantau data, pengguna, dan laporan secara real-time.',
  },
  {
    icon: CloudUpload,
    title: 'Pendampingan Publikasi Resmi ke Google Play Store & Apple App Store',
    desc: 'Tim kami menangani seluruh proses teknis kompilasi, pengujian keamanan, hingga pengunggahan aplikasi agar tayang secara resmi di Play Store dan App Store.',
  },
]

export default function JasaPembuatanAplikasiMobilePage() {
  return (
    <div className="min-h-screen font-sans bg-[#FBFBFB] text-[#18181B] antialiased selection:bg-[#FF5C28] selection:text-white">
      <JsonLd
        data={[
          serviceSchema(
            'Jasa Pembuatan Aplikasi Mobile (Android & iOS)',
            'Jasa pembuatan aplikasi mobile Android & iOS kustom di Kandangan (HSS) & Kalimantan Selatan: aplikasi layanan publik instansi, presensi geotagging, & aplikasi bisnis.',
            '/jasa-pembuatan-aplikasi-mobile'
          ),
          faqSchema(faqs),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Jasa Pembuatan Aplikasi Mobile', path: '/jasa-pembuatan-aplikasi-mobile' },
          ]),
        ]}
      />


      <main className="pt-28 sm:pt-32 pb-24">
        {/* Hero */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-[#FFF5F0] border border-orange-200/50 text-[#EA4510] text-xs font-semibold mb-4">
            Mobile App Development (Android &amp; iOS)
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#111827] tracking-tight leading-[1.14]">
            Jasa Pembuatan Aplikasi Mobile (Android &amp; iOS) Kustom di Kalimantan Selatan
          </h1>
          <p className="text-base sm:text-lg text-neutral-600 leading-relaxed mt-5 max-w-2xl mx-auto">
            Miliki aplikasi Android dan iPhone resmi atas nama bisnis atau instansi Anda. Kami tangani semuanya dari rancang alur, pembuatan sistem, hingga terbit resmi di Google Play Store dan App Store. Tim lokal kami siap berdiskusi tatap muka di wilayah Kalimantan Selatan.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={getWhatsAppUrl('mobile')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3.5 text-sm sm:text-base font-semibold text-white bg-[#FF5C28] hover:bg-[#EA4510] rounded-full shadow-glow transition-all"
            >
              <Image src="/icons/flaticon/mobile.svg" alt="" width={18} height={18} className="w-4 h-4 mr-2 shrink-0" />
              Diskusikan Rencana Aplikasi Anda via WhatsApp
            </a>
            <a
              href="#solusi-aplikasi"
              className="inline-flex items-center justify-center px-8 py-3.5 text-sm sm:text-base font-semibold text-neutral-800 bg-white border border-neutral-200 hover:border-[#FF5C28] rounded-full transition-all"
            >
              Lihat Solusi Aplikasi
            </a>
          </div>
        </section>


        {/* Solusi Aplikasi Mobile */}
        <section id="solusi-aplikasi" className="max-w-6xl mx-auto px-4 sm:px-6 mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
              Solusi Pengembangan Aplikasi Mobile untuk Instansi dan Bisnis
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {solusi.map((item) => (
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

        {/* Keunggulan Pengembangan */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
              Mengapa Mempercayakan Pembuatan Aplikasi Mobile kepada Tim Kami?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {keunggulan.map((item) => (
              <div key={item.title} className="bg-white rounded-3xl p-6 sm:p-7 border border-neutral-200/80 shadow-card">
                <div className="w-12 h-12 rounded-2xl bg-[#FFF5F0] border border-orange-200/60 flex items-center justify-center text-[#FF5C28] mb-4">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-neutral-900 leading-snug">{item.title}</h3>
                <p className="text-xs text-neutral-500 mt-2 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Garansi Publikasi Toko Aplikasi */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 mt-16">
          <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-5 shadow-xs">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100/90 border border-emerald-300/80 flex items-center justify-center shrink-0 shadow-sm">
              <Image src="/icons/flaticon/guarantee.svg" alt="Garansi Publikasi" width={32} height={32} className="w-8 h-8 object-contain" />
            </div>
            <div className="space-y-1.5 text-center sm:text-left">
              <h3 className="text-base font-bold text-neutral-900">
                Garansi Publikasi Resmi Google Play Store &amp; Apple App Store
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Anda tidak perlu khawatir proses review teknis yang rumit. Tim kami mengawal proses peninjauan Google &amp; Apple, sertifikasi privasi data (UU PDP), hingga aplikasi Anda lolos verifikasi dan siap diunduh oleh masyarakat luas.
              </p>
            </div>
          </div>
        </section>

        {/* Cross-Selling */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 mt-20">
          <div className="bg-[#121214] rounded-3xl p-8 sm:p-10 text-white relative overflow-hidden">
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#FF5C28]/20 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 text-center space-y-4">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Lengkapi Ekosistem Digital Anda
              </h2>
              <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
                Butuh portal web pendamping atau sistem informasi berbasis browser? Lihat juga layanan{' '}
                <Link href="/jasa-pembuatan-website" className="text-[#FF5C28] font-semibold hover:underline">
                  Jasa Pembuatan Website &amp; Sistem Informasi
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
                  href={getWhatsAppUrl('mobile')}
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
              Pertanyaan Umum (FAQ) Jasa Pembuatan Aplikasi Mobile
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
