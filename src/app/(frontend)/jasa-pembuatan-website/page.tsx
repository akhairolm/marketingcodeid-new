import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Code2,
  ArrowRight,
  ChevronRight,
  Globe,
  Briefcase,
  Rocket,
  ShieldCheck,
  Search,
  LayoutDashboard,
  HelpCircle,
  MapPin,
  MessageCircle,
  Check,
  Tag,
} from 'lucide-react'
import { getWhatsAppUrl } from '@/lib/whatsapp'
import { JsonLd, faqSchema, serviceSchema, breadcrumbSchema } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Jasa Pembuatan Website Kalimantan Selatan & HSS',
  description:
    'Jasa pembuatan website profesional di Kandangan (HSS) & Kalimantan Selatan. Spesialis sistem informasi instansi, web company profile, travel, & landing page SEO.',
  keywords: [
    'jasa pembuatan website kalimantan selatan',
    'jasa pembuatan website kandangan',
    'jasa bikin web hulu sungai selatan',
    'jasa website hss',
    'jasa pembuatan sistem informasi kalsel',
    'jasa pembuatan landing page kandangan',
    'web developer kalsel',
  ],
  alternates: { canonical: '/jasa-pembuatan-website' },
  openGraph: {
    title: 'Jasa Pembuatan Website Kalimantan Selatan & HSS | MarketingCode.ID',
    description:
      'Jasa pembuatan website profesional di Kandangan (HSS) & Kalimantan Selatan. Spesialis sistem informasi instansi, web company profile, travel, & landing page SEO.',
    url: '/jasa-pembuatan-website',
    siteName: 'MarketingCode.ID',
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jasa Pembuatan Website Kalimantan Selatan & HSS | MarketingCode.ID',
    description:
      'Jasa pembuatan website profesional di Kandangan (HSS) & Kalimantan Selatan. Spesialis sistem informasi instansi, web company profile, & landing page SEO.',
  },
}

const faqs = [
  {
    q: 'Berapa biaya pembuatan website di Kandangan dan Kalimantan Selatan?',
    a: 'Biaya sangat transparan: Paket Landing Page Promosi mulai dari Rp 1,5 Juta, Paket Katalog Produk & Toko UMKM mulai dari Rp 3,5 Juta (sudah termasuk domain .com, cloud hosting 1 tahun, dan panduan admin HP), hingga Paket Sistem Informasi Instansi/Dinas yang disesuaikan dengan Surat Perjanjian Kerja (SPK) dan kelengkapan dokumen BAST resmi.',
  },
  {
    q: 'Berapa lama waktu pengerjaan sebuah website hingga siap online?',
    a: 'Untuk Landing Page Promosi berkisar 3-5 hari kerja, Katalog Produk UMKM dan Company Profile berkisar 7-14 hari kerja, sedangkan Sistem Informasi berbasis web instansi membutuhkan 3-8 minggu tergantung cakupan modul.',
  },
  {
    q: 'Apakah layanan ini sudah termasuk domain, hosting/server, dan garansi maintenance?',
    a: 'Ya, seluruh paket kami sudah mencakup pendaftaran domain (.com / .id), konfigurasi cloud hosting/server cepat, sertifikat SSL HTTPS aman, panduan video/tatap muka pengelolaan admin, serta garansi pemeliharaan teknis resmi.',
  },
]


const kategori = [
  {
    icon: Code2,
    title: 'Sistem Informasi & Portal Aplikasi Berbasis Web (Instansi, Dinas & Enterprise)',
    desc: 'Pengembangan aplikasi web kustom untuk mendukung digitalisasi layanan publik dan operasional internal, seperti e-office, sistem informasi manajemen daerah, pendataan terpadu, buku tamu digital, hingga dashboard pelaporan real-time.',
  },
  {
    icon: Globe,
    title: 'Website Bisnis Spesifik: Tour & Travel, Properti, dan Katalog Produk',
    desc: 'Dirancang khusus untuk mempermudah pelanggan melihat paket layanan, jadwal keberangkatan, simulasi harga, hingga pemesanan langsung yang terintegrasi dengan WhatsApp admin Anda.',
  },
  {
    icon: Briefcase,
    title: 'Website Company Profile Perusahaan, BUMN/BUMD, & Sekolah',
    desc: 'Tingkatkan kepercayaan mitra bisnis, investor, dan masyarakat melalui situs profil resmi berdesain eksklusif yang merepresentasikan profesionalisme organisasi Anda.',
  },
  {
    icon: Rocket,
    title: 'Landing Page Promosi Berkonversi Tinggi',
    desc: 'Halaman penawaran khusus dengan struktur copywriting persuasif dan waktu muat super cepat, sangat efektif untuk mendampingi kampanye iklan Meta Ads dan Google Ads.',
  },
]

const keunggulan = [
  {
    icon: ShieldCheck,
    title: 'Teknologi Modern (Next.js & Laravel) dengan Performa Tinggi',
    desc: 'Kode program yang bersih dan terstruktur memastikan website berjalan ringan di berbagai perangkat smartphone maupun desktop serta mudah dikembangkan di masa depan.',
  },
  {
    icon: Search,
    title: 'Struktur On-Page SEO Friendly Sejak Hari Pertama',
    desc: 'Dilengkapi pengaturan meta tag dinamis, struktur heading semantik, sitemap otomatis, dan optimasi Core Web Vitals agar website Anda lebih cepat ditemukan di halaman pertama Google.',
  },
  {
    icon: LayoutDashboard,
    title: 'Dashboard Admin Mudah Dikelola, Aman, & Bergaransi',
    desc: 'Dilengkapi panel manajemen konten (CMS) yang ramah pengguna, perlindungan keamanan berlapis, serta dukungan teknis dan pelatihan penggunaan bagi tim Anda.',
  },
]

const alur = [
  'Konsultasi & Analisis Kebutuhan',
  'Perancangan Desain UI/UX',
  'Pengembangan (Coding) & Integrasi Sistem',
  'Uji Coba, Pelatihan Admin & Peluncuran',
]

const paketWebsite = [
  {
    tier: 'Paket Landing Page Promosi',
    price: 'Mulai Rp 1,5 Juta',
    desc: '1 Halaman penjualan fokus konversi tinggi. Sangat cocok untuk produk kuliner, fashion, jasa servis, atau pendamping kampanye iklan Meta Ads.',
    isPopular: false,
    features: [
      '1 Halaman Penjualan Fokus Konversi',
      'Terhubung Langsung ke Tombol Order WhatsApp',
      'Terpasang Meta Pixel & Google Analytics',
      'Desain Mobile-First & Waktu Muat < 0.8 Detik',
    ],
    time: 'Pengerjaan: 3 - 5 Hari Kerja',
    btnText: 'Pilih Landing Page',
    subject: 'Paket Landing Page Promosi (Rp 1.5jt)',
  },
  {
    tier: 'Paket Katalog Produk & Bisnis Lokal',
    price: 'Mulai Rp 3,5 Juta',
    desc: 'Website katalog interaktif dengan tombol order WhatsApp otomatis dan dashboard admin mandiri yang mudah dikelola dari smartphone.',
    isPopular: true,
    features: [
      'Katalog Produk + Tombol Order WhatsApp Otomatis',
      'Admin Mandiri: Ganti Foto & Harga dari HP',
      'Gratis Domain .com & Cloud Hosting 1 Tahun',
      'Optimasi SEO Lokal Kalimantan Selatan',
      'Garansi Pemeliharaan & Pendampingan 3 Bulan',
    ],
    time: 'Pengerjaan: 7 - 14 Hari Kerja',
    btnText: 'Pilih Paket Katalog',
    subject: 'Paket Katalog Produk & Bisnis Lokal (Rp 3.5jt)',
  },
  {
    tier: 'Paket Sistem Informasi & Portal Custom',
    price: 'Sesuai Spesifikasi (SPK)',
    desc: 'Sistem informasi manajemen daerah, e-office, buku tamu digital QR Code, pelaporan aduan masyarakat, hingga portal dinas/BUMN.',
    isPopular: false,
    features: [
      'Kepatuhan Standar SPBE & Akuntabilitas BAST',
      'Surat Perjanjian Kerja (SPK) & Faktur Pajak Resmi',
      'Enkripsi Data & Multi-Level Hak Akses Petugas',
      'Pelatihan Langsung Staf Operator (Bimtek di Kantor Anda)',
    ],
    time: 'Timeline Sesuai Dokumen Pengadaan',
    btnText: 'Konsultasi Kebutuhan Instansi',
    subject: 'Paket Sistem Informasi Instansi & Portal Custom',
  },
]

export default function JasaPembuatanWebsitePage() {
  return (
    <div className="min-h-screen font-sans bg-[#FBFBFB] text-[#18181B] antialiased selection:bg-[#FF5C28] selection:text-white">
      <JsonLd
        data={[
          serviceSchema(
            'Jasa Pembuatan Website & Sistem Informasi',
            'Jasa pembuatan website profesional di Kandangan (HSS) & Kalimantan Selatan: sistem informasi instansi, company profile, travel, & landing page SEO friendly.',
            '/jasa-pembuatan-website'
          ),
          faqSchema(faqs),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Jasa Pembuatan Website', path: '/jasa-pembuatan-website' },
          ]),
        ]}
      />


      <main className="pt-28 sm:pt-32 pb-24">
        {/* Hero */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-[#FFF5F0] border border-orange-200/50 text-[#EA4510] text-xs font-semibold mb-4">
            Layanan Web Development &amp; Sistem Informasi
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#111827] tracking-tight leading-[1.14]">
            Jasa Pembuatan Website &amp; Sistem Informasi Profesional di Kalimantan Selatan
          </h1>
          <p className="text-base sm:text-lg text-neutral-600 leading-relaxed mt-5 max-w-2xl mx-auto">
            Tingkatkan omzet toko Anda dengan website yang langsung terhubung ke order WhatsApp, atau hadirkan portal dinas yang tertib administrasi dan lolos uji SPBE. 100% hak milik Anda tanpa sistem sewa. Tim kami siap hadir tatap muka di wilayah Kandangan, Banua Enam, Banjarmasin, Banjarbaru, dan seluruh Kalimantan Selatan.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={getWhatsAppUrl('website')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3.5 text-sm sm:text-base font-semibold text-white bg-[#FF5C28] hover:bg-[#EA4510] rounded-full shadow-glow transition-all"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              💬 Tanya Estimasi Biaya Website via WhatsApp
            </a>
            <a
              href="#paket-website"
              className="inline-flex items-center justify-center px-8 py-3.5 text-sm sm:text-base font-semibold text-neutral-800 bg-white border border-neutral-200 hover:border-[#FF5C28] rounded-full transition-all"
            >
              Lihat Pilihan Paket
            </a>
          </div>
        </section>

        {/* Kategori Layanan */}
        <section id="kategori-layanan" className="max-w-6xl mx-auto px-4 sm:px-6 mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
              Solusi Pembuatan Website Sesuai Kebutuhan Sektor Anda
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {kategori.map((item) => (
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

        {/* Paket Investasi Website */}
        <section id="paket-website" className="max-w-6xl mx-auto px-4 sm:px-6 mt-24">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF5F0] border border-orange-200/50 text-[#EA4510] text-xs font-semibold mb-3">
              <Tag className="w-3.5 h-3.5" />
              <span>Simulasi Investasi Transparan</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
              Pilihan Paket Website Sesuai Kebutuhan Anda
            </h2>
            <p className="text-sm text-neutral-500 mt-2 max-w-xl mx-auto">
              Investasi transparan tanpa biaya sewa tersembunyi. 100% hak milik website menjadi aset mandiri usaha Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {paketWebsite.map((item) => (
              <div
                key={item.tier}
                className={`bg-white rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all ${
                  item.isPopular
                    ? 'border-2 border-[#FF5C28] shadow-xl relative transform md:-translate-y-2'
                    : 'border border-neutral-200/80 shadow-card hover:border-orange-200'
                }`}
              >
                {item.isPopular && (
                  <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 bg-[#FF5C28] text-white text-[11px] font-bold px-3.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    Pilihan Favorit UMKM
                  </div>
                )}

                <div>
                  <span
                    className={`text-xs font-bold uppercase tracking-wider ${
                      item.isPopular ? 'text-[#EA4510]' : 'text-neutral-500'
                    }`}
                  >
                    {item.tier}
                  </span>
                  <div className="mt-3 flex items-baseline">
                    <span className="text-2xl sm:text-3xl font-extrabold text-neutral-900">{item.price}</span>
                  </div>
                  <p className="text-xs text-neutral-500 mt-2.5 leading-relaxed">{item.desc}</p>

                  <a
                    href={getWhatsAppUrl('website', item.subject)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-6 w-full py-2.5 px-4 font-semibold text-xs rounded-full flex items-center justify-center transition-all ${
                      item.isPopular
                        ? 'bg-[#FF5C28] hover:bg-[#EA4510] text-white shadow-glow'
                        : 'bg-neutral-900 hover:bg-black text-white'
                    }`}
                  >
                    {item.btnText}
                  </a>

                  <div className="mt-6 pt-6 border-t border-neutral-100 space-y-2.5 text-xs text-neutral-600">
                    {item.features.map((feat) => (
                      <div key={feat} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-[#EA4510] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-100 text-[11px] text-neutral-500 text-center">
                  {item.time}
                </div>
              </div>
            ))}
          </div>
        </section>


        {/* Keunggulan Teknis */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
              Standar Kualitas &amp; Keunggulan Teknis Website Kami
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

        {/* Alur Kerja */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 mt-24 text-center">
          <h2 className="text-3xl font-extrabold text-neutral-900 tracking-tight">
            Tahapan Pengerjaan Pembuatan Website
          </h2>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {alur.map((step, i) => (
              <div key={step} className="bg-white rounded-3xl p-6 border border-neutral-200/70 shadow-card">
                <div className="w-12 h-12 mx-auto rounded-full bg-[#FFF5F0] text-[#EA4510] font-extrabold text-sm flex items-center justify-center border border-orange-200 mb-4">
                  {i + 1}
                </div>
                <h3 className="text-sm font-bold text-neutral-900 leading-snug">
                  {i + 1}. {step}
                </h3>
              </div>
            ))}
          </div>
        </section>

        {/* Cakupan Wilayah */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 mt-24">
          <div className="bg-gradient-to-br from-neutral-100 to-neutral-200/60 rounded-3xl p-8 sm:p-10 border border-neutral-200/80">
            <div className="flex items-center gap-2 text-[#EA4510] text-xs font-semibold mb-3">
              <MapPin className="w-4 h-4" />
              <span>Local SEO Booster</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
              Area Layanan Pembuatan Website di Kalimantan Selatan
            </h2>
            <p className="text-sm text-neutral-600 leading-relaxed mt-3">
              Sebagai tim pengembang yang berfokus di Kalimantan Selatan, kami siap memberikan layanan konsultasi dan pendampingan pembuatan website untuk klien di Kandangan (Kabupaten Hulu Sungai Selatan / HSS), Rantau (Tapin), Barabai (Hulu Sungai Tengah), Amuntai (Hulu Sungai Utara), Balangan, Tabalong, hingga Banjarbaru dan Banjarmasin.
            </p>
          </div>
        </section>

        {/* Cross-Selling */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 mt-16">
          <div className="bg-[#121214] rounded-3xl p-8 sm:p-10 text-white relative overflow-hidden">
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#FF5C28]/20 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 text-center space-y-4">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Maximize Hasil Website Baru Anda
              </h2>
              <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
                Ingin website baru Anda langsung kebanjiran pengunjung dan calon pembeli potensial? Padukan website Anda dengan layanan{' '}
                <Link href="/jasa-iklan-meta-ads" className="text-[#FF5C28] font-semibold hover:underline">
                  Jasa Kelola Iklan Meta Ads
                </Link>{' '}
                atau kembangkan ekosistem bisnis Anda ke platform smartphone melalui{' '}
                <Link href="/jasa-pembuatan-aplikasi-mobile" className="text-[#FF5C28] font-semibold hover:underline">
                  Jasa Pembuatan Aplikasi Mobile
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
                  href={getWhatsAppUrl('website')}
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
              Pertanyaan Umum (FAQ) Jasa Pembuatan Website
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
