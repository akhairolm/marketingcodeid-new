import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  Store,
  Check,
  ArrowRight,
  ChevronRight,
  Smartphone,
  ShieldCheck,
  Search,
  Sliders,
  HelpCircle,
  MapPin,
  Tag,
} from 'lucide-react'
import { getWhatsAppUrl } from '@/lib/whatsapp'
import { JsonLd, faqSchema, serviceSchema, breadcrumbSchema } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Jasa Pembuatan Website UMKM & Toko Online Kalimantan Selatan | MarketingCode.ID',
  description:
    'Jasa pembuatan website katalog produk dan toko UMKM di Banjarmasin, Banjarbaru, Kandangan, dan Kalimantan Selatan. Dilengkapi tombol order WhatsApp otomatis dan dashboard admin mandiri dari HP.',
  keywords: [
    'jasa pembuatan website umkm kalimantan selatan',
    'jasa website umkm banjarmasin',
    'jasa website umkm banjarbaru',
    'jasa website toko online kalsel',
    'jasa katalog produk whatsapp kalsel',
    'bikin web toko kandangan',
  ],
  alternates: { canonical: '/website-umkm' },
  openGraph: {
    title: 'Jasa Pembuatan Website UMKM & Toko Online Kalimantan Selatan | MarketingCode.ID',
    description:
      'Jasa pembuatan website katalog produk dan toko UMKM di Banjarmasin, Banjarbaru, Kandangan, dan Kalimantan Selatan. Dilengkapi tombol order WhatsApp otomatis dan dashboard admin mandiri dari HP.',
    url: '/website-umkm',
    siteName: 'MarketingCode.ID',
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jasa Pembuatan Website UMKM & Toko Online Kalimantan Selatan | MarketingCode.ID',
    description:
      'Jasa pembuatan website katalog produk & toko UMKM di Banjarmasin, Banjarbaru, Kandangan, dan Kalimantan Selatan.',
  },
}

const umkmFaqs = [
  {
    q: 'Apakah saya harus mengerti koding untuk mengelola website UMKM?',
    a: 'Tidak sama sekali. Kami menyediakan panel admin yang dirancang khusus agar mudah digunakan dari layar smartphone. Anda dapat menambah foto produk, mengubah harga diskon, atau memperbarui kontak usaha secara mandiri semudah mengunggah status media sosial.',
  },
  {
    q: 'Apakah website ini sudah termasuk nama domain dan hosting?',
    a: 'Ya, paket Website UMKM & Katalog Produk sudah mencakup pendaftaran domain (.com) dan cloud hosting berkecepatan tinggi selama 1 tahun pertama. Pada tahun berikutnya, Anda hanya membayar biaya perpanjangan domain dan hosting standar tahunan tanpa biaya sewa sistem tambahan.',
  },
  {
    q: 'Bagaimana alur pemesanan produk oleh pelanggan di website?',
    a: 'Setiap produk pada katalog memiliki tombol order WhatsApp. Saat pelanggan mengklik tombol tersebut, aplikasi WhatsApp mereka akan langsung terbuka dengan pesan pemesanan otomatis yang mencantumkan nama dan rincian produk yang dipilih.',
  },
  {
    q: 'Berapa lama proses pembuatan website UMKM hingga siap pakai?',
    a: 'Pengerjaan berkisar antara 7 hingga 14 hari kerja setelah data usaha dan materi produk (foto dan deskripsi ringkas) kami terima secara lengkap.',
  },
  {
    q: 'Apakah tim MarketingCode siap berdiskusi langsung di tempat?',
    a: 'Ya, tim kami berbasis di Kandangan dan siap bertemu langsung untuk sesi konsultasi atau pelatihan penggunaan di area Banua Enam, Banjarbaru, Banjarmasin, dan sekitarnya.',
  },
]

const umkmFeatures = [
  {
    icon: Smartphone,
    title: 'Mobile-First & Ramah Pelanggan',
    desc: 'Dioptimalkan untuk kenyamanan navigasi layar sentuh smartphone, waktu muat cepat, dan tampilan visual produk yang tajam.',
  },
  {
    icon: Sliders,
    title: 'Kelola Produk & Harga Mandiri dari HP',
    desc: 'Panel admin sederhana tanpa koding. Ganti foto produk promo, ubah status stok, atau tambah menu baru kapan pun Anda inginkan.',
  },
  {
    icon: Search,
    title: 'Terdaftar di Google & Integrasi Google Maps',
    desc: 'Struktur On-Page SEO lokal yang membantu toko Anda lebih gampang ditemukan calon pelanggan di Banjarmasin, Banjarbaru, dan Kalsel.',
  },
  {
    icon: ShieldCheck,
    title: '100% Hak Milik Tanpa Biaya Sewa Bulanan',
    desc: 'Domain, file website, dan database menjadi milik Anda seutuhnya tanpa sistem sewa bulanan yang mengunci operasional toko Anda.',
  },
]

export default function WebsiteUmkmPage() {
  return (
    <div className="min-h-screen font-sans bg-[#FBFBFB] text-[#18181B] antialiased selection:bg-[#FF5C28] selection:text-white">
      <JsonLd
        data={[
          serviceSchema(
            'Jasa Pembuatan Website UMKM & Toko Online',
            'Jasa pembuatan website katalog produk dan toko UMKM di Kalimantan Selatan dengan tombol order WhatsApp otomatis dan dashboard admin HP.',
            '/website-umkm'
          ),
          faqSchema(umkmFaqs),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Jasa Pembuatan Website', path: '/jasa-pembuatan-website' },
            { name: 'Website UMKM', path: '/website-umkm' },
          ]),
        ]}
      />

      <main className="pt-28 sm:pt-32 pb-24">
        {/* Hero */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF5F0] border border-orange-200/50 text-[#C23605] text-xs font-semibold mb-4">
            <Store className="w-3.5 h-3.5" />
            <span>Solusi Khusus UMKM &amp; Bisnis Lokal</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#111827] tracking-tight leading-[1.14]">
            Bantu Usaha UMKM Anda Tampil Lebih Profesional &amp; Kebanjiran Order WhatsApp
          </h1>

          <p className="text-base sm:text-lg text-neutral-600 leading-relaxed mt-5 max-w-2xl mx-auto">
            Hadirkan etalase digital yang memajang profil usaha, katalog produk, dan daftar harga secara rapi. Pelanggan dapat memilih produk dan memesan langsung via WhatsApp dalam sekali klik.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={getWhatsAppUrl('website', 'Paket Website UMKM (Rp 3.5jt)')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3.5 text-sm sm:text-base font-semibold text-white bg-[#D13D00] hover:bg-[#B33400] rounded-full shadow-glow transition-all"
            >
              <Image src="/icons/flaticon/chat.svg" alt="" width={18} height={18} className="w-4 h-4 mr-2 shrink-0" />
              Konsultasi Website UMKM via WhatsApp
            </a>
            <a
              href="#paket-umkm"
              className="inline-flex items-center justify-center px-8 py-3.5 text-sm sm:text-base font-semibold text-neutral-800 bg-white border border-neutral-200 hover:border-[#D13D00] rounded-full transition-all"
            >
              Lihat Rincian Biaya
            </a>
          </div>

          <p className="text-xs text-neutral-500 mt-4 flex items-center justify-center gap-2">
            <span>Free domain &amp; hosting 1 tahun</span>
            <span>•</span>
            <span>Garansi pemeliharaan resmi</span>
            <span>•</span>
            <span>Bisa tatap muka di Kalsel</span>
          </p>
        </section>

        {/* Keunggulan untuk UMKM */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 mt-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
              Kenapa Pemilik UMKM Memilih Website MarketingCode?
            </h2>
            <p className="text-sm text-neutral-500 mt-2 max-w-xl mx-auto">
              Solusi praktis yang langsung menjawab kendala operasional pedagang dan pemilik usaha lokal.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {umkmFeatures.map((item) => (
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

        {/* Paket Investasi UMKM */}
        <section id="paket-umkm" className="max-w-4xl mx-auto px-4 sm:px-6 mt-20">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF5F0] border border-orange-200/50 text-[#C23605] text-xs font-semibold mb-3">
              <Tag className="w-3.5 h-3.5" />
              <span>Paket Hemat &amp; Lengkap</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
              Investasi Website UMKM &amp; Katalog Produk
            </h2>
            <p className="text-sm text-neutral-500 mt-2">
              Paket all-in-one tanpa biaya tambahan yang membingungkan.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-7 sm:p-9 border-2 border-[#D13D00] shadow-xl relative text-left">
            <div className="inline-block bg-[#D13D00] text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 shadow-sm">
              Paket Paling Diminati UMKM
            </div>

            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-neutral-900">
                  Website Katalog &amp; Toko Online UMKM
                </h3>
                <p className="text-xs text-neutral-500 mt-1">
                  Solusi digital komprehensif untuk mendongkrak penjualan langsung via WhatsApp.
                </p>
              </div>
              <div className="flex items-baseline shrink-0">
                <span className="text-3xl font-extrabold text-neutral-900">Rp 3.500.000</span>
                <span className="text-xs text-neutral-500 ml-1.5">/ project</span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-neutral-100 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-neutral-700">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#C23605] shrink-0" />
                <span>Katalog Produk + Tombol Order WhatsApp</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#C23605] shrink-0" />
                <span>Dashboard Admin Mandiri (Akses dari HP)</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#C23605] shrink-0" />
                <span>Gratis Domain .com Resmi 1 Tahun</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#C23605] shrink-0" />
                <span>Gratis Cloud Hosting Cepat 1 Tahun</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#C23605] shrink-0" />
                <span>Optimasi SEO Lokal Kalimantan Selatan</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#C23605] shrink-0" />
                <span>100% Hak Milik Tanpa Biaya Sewa Bulanan</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#C23605] shrink-0" />
                <span>Garansi Pemeliharaan &amp; Bantuan Teknis</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#C23605] shrink-0" />
                <span>Waktu Pengerjaan: 7 - 14 Hari Kerja</span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-neutral-500">
                Punya kebutuhan halaman promosi tunggal? Tersedia paket <strong>Landing Page Promosi (Rp 1.5jt)</strong>.
              </span>
              <a
                href={getWhatsAppUrl('website', 'Paket Website UMKM (Rp 3.5jt)')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-3 bg-[#D13D00] hover:bg-[#B33400] text-white font-bold text-xs rounded-full shadow-glow transition-all whitespace-nowrap text-center"
              >
                Pilih Paket Website UMKM
              </a>
            </div>
          </div>
        </section>

        {/* Local Area */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 mt-20">
          <div className="bg-gradient-to-br from-neutral-100 to-neutral-200/60 rounded-3xl p-7 sm:p-9 border border-neutral-200/80">
            <div className="flex items-center gap-2 text-[#C23605] text-xs font-semibold mb-2">
              <MapPin className="w-4 h-4" />
              <span>Cakupan Layanan UMKM</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-neutral-900 tracking-tight">
              Melayani UMKM di Seluruh Kalimantan Selatan
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mt-2">
              Kami siap melayani kebutuhan website bisnis UMKM di Banjarmasin, Banjarbaru, Martapura, Kandangan (HSS), Rantau (Tapin), Barabai (HST), Amuntai (HSU), Paringin (Balangan), Tanjung (Tabalong), Pelaihari (Tanah Laut), Batulicin, hingga Kotabaru.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 mt-20">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF5F0] border border-orange-200/50 text-[#C23605] text-xs font-semibold mb-2">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Tanya Jawab UMKM</span>
            </div>
            <h2 className="text-2xl font-extrabold text-neutral-900 tracking-tight">
              Pertanyaan yang Sering Diajukan Pemilik UMKM
            </h2>
          </div>
          <div className="space-y-3">
            {umkmFaqs.map((faq) => (
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
              Mulai Hadirkan Website untuk Usaha Anda Sekarang
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-2 max-w-lg mx-auto">
              Konsultasikan produk dan usaha Anda bersama tim kami. Dapatkan saran tata letak dan estimasi gratis tanpa ikatan.
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
                href={getWhatsAppUrl('website', 'Konsultasi Website UMKM')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-3 bg-[#D13D00] hover:bg-[#B33400] text-white font-bold text-xs rounded-full shadow-glow transition-all"
              >
                Chat via WhatsApp
                <ArrowRight className="w-4 h-4 ml-1" />
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
