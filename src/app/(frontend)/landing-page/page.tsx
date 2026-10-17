import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  Rocket,
  Check,
  ArrowRight,
  ChevronRight,
  Zap,
  Smartphone,
  BarChart,
  ShieldCheck,
  HelpCircle,
  Tag,
} from 'lucide-react'
import { getWhatsAppUrl } from '@/lib/whatsapp'
import { JsonLd, faqSchema, serviceSchema, breadcrumbSchema } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Jasa Pembuatan Landing Page Promosi & Iklan Kalsel | MarketingCode.ID',
  description:
    'Jasa pembuatan landing page berkonversi tinggi untuk promosi produk & iklan Meta/Google Ads di Banjarmasin, Banjarbaru, Kandangan, Kalsel. Cepat, mobile-first, dan terhubung ke WhatsApp.',
  keywords: [
    'jasa pembuatan landing page kalimantan selatan',
    'jasa landing page banjarmasin',
    'jasa landing page banjarbaru',
    'jasa landing page kandangan',
    'jasa landing page iklan meta ads kalsel',
    'landing page konversi tinggi',
  ],
  alternates: { canonical: '/landing-page' },
  openGraph: {
    title: 'Jasa Pembuatan Landing Page Promosi & Iklan Kalsel | MarketingCode.ID',
    description:
      'Jasa pembuatan landing page berkonversi tinggi untuk promosi produk & iklan Meta/Google Ads di Banjarmasin, Banjarbaru, Kandangan, Kalsel. Cepat, mobile-first, dan terhubung ke WhatsApp.',
    url: '/landing-page',
    siteName: 'MarketingCode.ID',
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jasa Pembuatan Landing Page Promosi & Iklan Kalsel | MarketingCode.ID',
    description:
      'Jasa pembuatan landing page berkonversi tinggi untuk promosi produk & iklan di Kalimantan Selatan.',
  },
}

const landingFaqs = [
  {
    q: 'Apa perbedaan landing page dengan website biasa?',
    a: 'Landing page adalah halaman web tunggal yang dirancang khusus untuk memusatkan perhatian pengunjung pada satu tujuan atau aksi tertentu (misalnya memesan produk via WhatsApp atau mengisi formulir). Tidak ada menu navigasi rumit yang mengalihkan perhatian, sehingga tingkat konversinya jauh lebih efektif saat dihubungkan dengan iklan.',
  },
  {
    q: 'Berapa biaya pembuatan landing page di MarketingCode?',
    a: 'Biaya mulai dari Rp 1.500.000 untuk 1 halaman penawaran lengkap yang sudah mobile-first, terpasang pelacak iklan (Meta Pixel & GA4), copywriting terstruktur, dan tombol WhatsApp otomatis.',
  },
  {
    q: 'Berapa lama pengerjaan sebuah landing page?',
    a: 'Pengerjaan berkisar antara 3 sampai 5 hari kerja setelah materi penawaran produk atau jasa telah kami terima.',
  },
  {
    q: 'Apakah sudah bisa langsung dipakai untuk iklan Facebook & Instagram (Meta Ads)?',
    a: 'Ya, seluruh landing page yang kami bangun sudah siap iklan. Kami mengintegrasikan Meta Pixel dan Google Analytics sejak awal agar data pengunjung dapat Anda lacak dengan akurat.',
  },
  {
    q: 'Apakah landing page ini memiliki sistem sewa bulanan?',
    a: 'Tidak. 100% hak milik menjadi milik Anda seutuhnya tanpa biaya langganan bulanan yang menjebak.',
  },
]

const landingPillars = [
  {
    icon: Zap,
    title: 'Waktu Muat Cepat & Ringan',
    desc: 'Pengunjung iklan tidak suka menunggu. Kami mengoptimalkan setiap aset gambar dan skrip agar halaman terbuka instan saat diklik dari medsos.',
  },
  {
    icon: Smartphone,
    title: 'Mobile-First untuk Pengguna HP',
    desc: 'Mayoritas klik iklan berasal dari aplikasi smartphone. Tata letak, ukuran tombol, dan keterbacaan teks disesuaikan khusus untuk layar HP.',
  },
  {
    icon: BarChart,
    title: 'Siap Iklan & Pelacakan Pixel',
    desc: 'Pemasangan kode pelacak Meta Pixel & Google Analytics siap pakai untuk melacak konversi pengunjung dan efektivitas iklan Anda.',
  },
  {
    icon: ShieldCheck,
    title: '100% Hak Milik Tanpa Sewa',
    desc: 'Aset landing page menjadi milik Anda seutuhnya tanpa biaya bulanan tersembunyi yang memberatkan anggaran promosi bisnis.',
  },
]

export default function LandingPageServicePage() {
  return (
    <div className="min-h-screen font-sans bg-[#FBFBFB] text-[#18181B] antialiased selection:bg-[#FF5C28] selection:text-white">
      <JsonLd
        data={[
          serviceSchema(
            'Jasa Pembuatan Landing Page Promosi & Iklan',
            'Jasa pembuatan landing page berkonversi tinggi untuk iklan Meta Ads & Google Ads di Kalimantan Selatan.',
            '/landing-page'
          ),
          faqSchema(landingFaqs),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Jasa Pembuatan Website', path: '/jasa-pembuatan-website' },
            { name: 'Landing Page', path: '/landing-page' },
          ]),
        ]}
      />

      <main className="pt-28 sm:pt-32 pb-24">
        {/* Hero */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF5F0] border border-orange-200/50 text-[#C23605] text-xs font-semibold mb-4">
            <Rocket className="w-3.5 h-3.5" />
            <span>Fokus Konversi Penjualan &amp; Iklan</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#111827] tracking-tight leading-[1.14]">
            Landing Page Promosi Cepat &amp; Berkonversi Tinggi untuk Bisnis Anda
          </h1>

          <p className="text-base sm:text-lg text-neutral-600 leading-relaxed mt-5 max-w-2xl mx-auto">
            Ubah pengunjung dari iklan Facebook, Instagram, TikTok, dan Google menjadi pembeli nyata. Informasi ringkas, penawaran menarik, dan tombol order WhatsApp langsung tanpa distraksi.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={getWhatsAppUrl('website', 'Paket Landing Page Promosi (Rp 1.5jt)')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3.5 text-sm sm:text-base font-semibold text-white bg-[#D13D00] hover:bg-[#B33400] rounded-full shadow-glow transition-all"
            >
              <Image src="/icons/flaticon/chat.svg" alt="" width={18} height={18} className="w-4 h-4 mr-2 shrink-0" />
              Pesan Landing Page via WhatsApp
            </a>
            <a
              href="#paket-landing"
              className="inline-flex items-center justify-center px-8 py-3.5 text-sm sm:text-base font-semibold text-neutral-800 bg-white border border-neutral-200 hover:border-[#D13D00] rounded-full transition-all"
            >
              Lihat Rincian Biaya
            </a>
          </div>

          <p className="text-xs text-neutral-500 mt-4 flex items-center justify-center gap-2">
            <span>Pengerjaan kilat 3 - 5 hari</span>
            <span>•</span>
            <span>Meta Pixel &amp; Google Tag ready</span>
            <span>•</span>
            <span>100% Hak milik tanpa sewa</span>
          </p>
        </section>

        {/* 4 Keunggulan Landing Page */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 mt-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
              Mengapa Landing Page Kami Efektif Menghasilkan Order?
            </h2>
            <p className="text-sm text-neutral-500 mt-2 max-w-xl mx-auto">
              Dibangun khusus untuk performa konversi tinggi tanpa elemen yang memperlambat halaman.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {landingPillars.map((item) => (
              <div key={item.title} className="bg-white rounded-3xl p-6 sm:p-7 border border-neutral-200/80 shadow-card">
                <div className="w-12 h-12 rounded-2xl bg-[#FFF5F0] border border-orange-200/60 flex items-center justify-center text-[#C23605] mb-4">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-neutral-900 leading-snug">{item.title}</h3>
                <p className="text-xs text-neutral-600 mt-2 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Paket Investasi Landing Page */}
        <section id="paket-landing" className="max-w-4xl mx-auto px-4 sm:px-6 mt-20">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF5F0] border border-orange-200/50 text-[#C23605] text-xs font-semibold mb-3">
              <Tag className="w-3.5 h-3.5" />
              <span>Investasi Terjangkau</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
              Paket Landing Page Promosi Produk &amp; Jasa
            </h2>
          </div>

          <div className="bg-white rounded-3xl p-7 sm:p-9 border border-neutral-200/80 shadow-card text-left">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-orange-100 text-[#C23605] mb-2">
                  Kilat &amp; Siap Iklan
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-neutral-900">
                  Landing Page Promosi Penjualan
                </h3>
                <p className="text-xs text-neutral-500 mt-1">
                  1 Halaman penjualan terfokus untuk promo produk tunggal atau pendamping iklan.
                </p>
              </div>
              <div className="flex items-baseline shrink-0">
                <span className="text-3xl font-extrabold text-neutral-900">Rp 1.500.000</span>
                <span className="text-xs text-neutral-500 ml-1.5">/ project</span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-neutral-100 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-neutral-700">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#C23605] shrink-0" />
                <span>1 Halaman Penjualan Terstruktur &amp; Cepat</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#C23605] shrink-0" />
                <span>Mobile Responsive Khusus Layar Smartphone</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#C23605] shrink-0" />
                <span>Tombol Pemesanan Langsung ke WhatsApp</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#C23605] shrink-0" />
                <span>Pemasangan Meta Pixel &amp; Google Analytics</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#C23605] shrink-0" />
                <span>100% Hak Milik Tanpa Biaya Sewa Bulanan</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#C23605] shrink-0" />
                <span>Pengerjaan Cepat: 3 - 5 Hari Kerja</span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-neutral-500">
                Butuh banyak halaman dan katalog produk? Tersedia paket <strong>Website UMKM (Rp 3.5jt)</strong>.
              </span>
              <a
                href={getWhatsAppUrl('website', 'Paket Landing Page Promosi (Rp 1.5jt)')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-3 bg-[#D13D00] hover:bg-[#B33400] text-white font-bold text-xs rounded-full shadow-glow transition-all whitespace-nowrap text-center"
              >
                Pilih Landing Page
              </a>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 mt-20">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF5F0] border border-orange-200/50 text-[#C23605] text-xs font-semibold mb-2">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Tanya Jawab</span>
            </div>
            <h2 className="text-2xl font-extrabold text-neutral-900 tracking-tight">
              Pertanyaan Seputar Pembuatan Landing Page
            </h2>
          </div>
          <div className="space-y-3">
            {landingFaqs.map((faq) => (
              <details key={faq.q} className="bg-white rounded-2xl border border-neutral-200/80 overflow-hidden shadow-xs group">
                <summary className="w-full px-5 py-4 text-left flex items-center justify-between text-xs sm:text-sm font-bold text-neutral-900 hover:text-[#C23605] cursor-pointer list-none">
                  <span>{faq.q}</span>
                </summary>
                <div className="px-5 pb-4 text-xs text-neutral-500 leading-relaxed">{faq.a}</div>
              </details>
            ))}
          </div>
        </section>

        {/* Closing CTA */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 mt-20 text-center">
          <div className="bg-[#121214] rounded-3xl p-8 sm:p-10 text-white relative overflow-hidden">
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              Siap Meluncurkan Landing Page Produk Anda?
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-2 max-w-lg mx-auto">
              Kirimkan ide produk atau penawaran Anda, kami buatkan halaman penjualan yang siap mengonversi klik iklan menjadi orderan WhatsApp.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/jasa-pembuatan-website"
                className="inline-flex items-center px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded-full border border-white/15 transition-all"
              >
                Kembali ke Hub Website
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
              <a
                href={getWhatsAppUrl('website', 'Konsultasi Landing Page Promosi')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-3 bg-[#D13D00] hover:bg-[#B33400] text-white font-bold text-xs rounded-full shadow-glow transition-all"
              >
                Diskusi via WhatsApp
                <ArrowRight className="w-4 h-4 ml-1" />
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
