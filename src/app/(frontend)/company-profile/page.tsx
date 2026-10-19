import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  Building2,
  Check,
  ArrowRight,
  ChevronRight,
  ShieldCheck,
  FileText,
  Search,
  HelpCircle,
  MapPin,
  Tag,
} from 'lucide-react'

import { getWhatsAppUrl } from '@/lib/whatsapp'
import { JsonLd, faqSchema, serviceSchema, breadcrumbSchema } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Jasa Pembuatan Website Company Profile Perusahaan Kalsel | MarketingCode.ID',
  description:
    'Jasa pembuatan website company profile bisnis, kontraktor, B2B, dan perusahaan di Banjarmasin, Banjarbaru, dan Kalimantan Selatan. Representatif, bergaransi, dan legalitas resmi.',
  keywords: [
    'jasa pembuatan website company profile kalimantan selatan',
    'jasa website company profile banjarmasin',
    'jasa website perusahaan banjarbaru',
    'jasa web company profile kalsel',
    'jasa website b2b kandangan',
    'pembuatan web profil kontraktor kalsel',
  ],
  alternates: { canonical: '/company-profile' },
  openGraph: {
    title: 'Jasa Pembuatan Website Company Profile Perusahaan Kalsel | MarketingCode.ID',
    description:
      'Jasa pembuatan website company profile bisnis, kontraktor, B2B, dan perusahaan di Banjarmasin, Banjarbaru, dan Kalimantan Selatan. Representatif, bergaransi, dan legalitas resmi.',
    url: '/company-profile',
    siteName: 'MarketingCode.ID',
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jasa Pembuatan Website Company Profile Perusahaan Kalsel | MarketingCode.ID',
    description:
      'Jasa pembuatan website company profile bisnis dan perusahaan di Kalimantan Selatan.',
  },
}

const companyFaqs = [
  {
    q: 'Berapa biaya pembuatan website company profile perusahaan?',
    a: 'Paket Company Profile Bisnis standar kami mulai dari Rp 5.500.000 untuk struktur lengkap (Profil Perusahaan, Layanan/Produk B2B, Portofolio Proyek, Tim, dan Formulir Penawaran/Kontak). Untuk kebutuhan arsitektur khusus atau portal skala korporat, kami menyediakan proposal penawaran resmi dengan SPK.',
  },
  {
    q: 'Berapa lama estimasi pengerjaan website company profile?',
    a: 'Waktu pengerjaan berkisar antara 10 hingga 21 hari kerja, tergantung pada kelengkapan materi profil, struktur halaman, dan tahapan revisi desain antarmuka.',
  },
  {
    q: 'Apakah MarketingCode dapat menerbitkan invoice resmi dan Surat Perjanjian Kerja (SPK)?',
    a: 'Ya. Kami melayani kerja sama formal untuk perusahaan swasta, badan usaha, maupun instansi dengan kelengkapan kontrak kerja tertulis (SPK), invoice penagihan resmi, dan Berita Acara Serah Terima (BAST).',
  },
  {
    q: 'Apakah website company profile sudah ramah SEO Google?',
    a: 'Ya, seluruh halaman disusun mengikuti kaidah On-Page SEO (struktur heading semantik, meta tag dinamis, sitemap XML, dan schema markup Organization) agar nama perusahaan Anda mudah ditemukan di Google.',
  },
  {
    q: 'Apakah kami mendapatkan source code dan akses admin seutuhnya?',
    a: 'Tentu. 100% kepemilikan aset menjadi milik perusahaan Anda tanpa biaya sewa sistem bulanan. Kami menyerahkan akses admin CMS dan repositori/hosting sesuai kesepakatan.',
  },
]

const companyPillars = [
  {
    icon: Building2,
    title: 'Desain Representatif & Elegan',
    desc: 'Mencerminkan nilai profesionalisme perusahaan Anda dengan komposisi visual yang tertata rapi di hadapan klien dan mitra kerja.',
  },
  {
    icon: FileText,
    title: 'Struktur Informasi B2B Lengkap',
    desc: 'Halaman profil korporat, bidang layanan, portofolio proyek, legalitas usaha, formulir permintaan penawaran, serta integrasi kontak.',
  },
  {
    icon: Search,
    title: 'Optimasi SEO & Kecepatan Akses',
    desc: 'Dibangun dengan teknologi Next.js yang menjamin performa cepat saat dibuka mitra bisnis serta ramah mesin pencari Google.',
  },
  {
    icon: ShieldCheck,
    title: 'Tertib Legalitas & Garansi Resmi',
    desc: 'Didukung dokumen perjanjian kerja resmi (SPK), serah terima transparan (BAST), dan garansi pemeliharaan teknis berkelanjutan.',
  },
]

export default function CompanyProfilePage() {
  return (
    <div className="min-h-screen font-sans bg-[#FBFBFB] text-[#18181B] antialiased selection:bg-[#FF5C28] selection:text-white">
      <JsonLd
        data={[
          serviceSchema(
            'Jasa Pembuatan Website Company Profile',
            'Jasa pembuatan website company profile bisnis dan perusahaan di Kalimantan Selatan dengan desain representatif dan legalitas resmi.',
            '/company-profile'
          ),
          faqSchema(companyFaqs),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Jasa Pembuatan Website', path: '/jasa-pembuatan-website' },
            { name: 'Company Profile', path: '/company-profile' },
          ]),
        ]}
      />

      <main className="pt-28 sm:pt-32 pb-24">
        {/* Hero */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF5F0] border border-orange-200/50 text-[#C23605] text-xs font-semibold mb-4">
            <Building2 className="w-3.5 h-3.5" />
            <span>Kredibilitas Bisnis &amp; B2B</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#111827] tracking-tight leading-[1.14]">
            Website Company Profile Representatif untuk Membangun Kredibilitas Bisnis Anda
          </h1>

          <p className="text-base sm:text-lg text-neutral-600 leading-relaxed mt-5 max-w-2xl mx-auto">
            Perkenalkan perusahaan, legalitas, layanan, dan rekam jejak proyek Anda melalui website yang tertata profesional. Yakinkan calon klien, mitra korporat, dan investor sejak pandangan pertama.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={getWhatsAppUrl('website', 'Konsultasi Company Profile Perusahaan')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3.5 text-sm sm:text-base font-semibold text-white bg-[#D13D00] hover:bg-[#B33400] rounded-full shadow-glow transition-all"
            >
              <Image src="/icons/flaticon/chat.svg" alt="" width={18} height={18} className="w-4 h-4 mr-2 shrink-0" />
              Konsultasi Company Profile via WhatsApp
            </a>
            <Link
              href="/portfolio"
              className="inline-flex items-center justify-center px-8 py-3.5 text-sm sm:text-base font-semibold text-neutral-800 bg-white border border-neutral-200 hover:border-[#D13D00] rounded-full transition-all"
            >
              Lihat Contoh Portofolio
            </Link>
          </div>

          <p className="text-xs text-neutral-500 mt-4 flex items-center justify-center gap-2">
            <span>Kontrak kerja &amp; SPK resmi</span>
            <span>•</span>
            <span>100% Hak milik tanpa sewa</span>
            <span>•</span>
            <span>Pertemuan tatap muka di Kalsel</span>
          </p>
        </section>

        {/* 4 Pilar Company Profile */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 mt-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
              Standar Kualitas Website Company Profile Kami
            </h2>
            <p className="text-sm text-neutral-500 mt-2 max-w-xl mx-auto">
              Dirancang untuk memenuhi ekspektasi bisnis modern dan audiens profesional.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {companyPillars.map((item) => (
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

        {/* Paket Investasi Company Profile */}
        <section id="paket-company" className="max-w-4xl mx-auto px-4 sm:px-6 mt-20">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF5F0] border border-orange-200/50 text-[#C23605] text-xs font-semibold mb-3">
              <Tag className="w-3.5 h-3.5" />
              <span>Transparansi Biaya</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
              Paket Investasi Website Company Profile
            </h2>
          </div>

          <div className="bg-white rounded-3xl p-7 sm:p-9 border border-neutral-200/80 shadow-card text-left">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-blue-100 text-blue-800 mb-2">
                  Company Profile Bisnis &amp; Korporat
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-neutral-900">
                  Paket Lengkap Company Profile
                </h3>
                <p className="text-xs text-neutral-500 mt-1">
                  Website representatif untuk perusahaan yang ingin memperluas jangkauan mitra kerja dan tender.
                </p>
              </div>
              <div className="flex items-baseline shrink-0">
                <span className="text-3xl font-extrabold text-neutral-900">Rp 5.500.000</span>
                <span className="text-xs text-neutral-500 ml-1.5">/ project</span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-neutral-100 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-neutral-700">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#C23605] shrink-0" />
                <span>Halaman Profil, Visi-Misi, Tim, &amp; Legalitas</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#C23605] shrink-0" />
                <span>Katalog Layanan &amp; Portofolio Proyek Klien</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#C23605] shrink-0" />
                <span>Formulir Permintaan Penawaran &amp; Kontak WhatsApp</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#C23605] shrink-0" />
                <span>Gratis Domain (.com / .id) &amp; Cloud Hosting 1 Tahun Pertama</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#C23605] shrink-0" />
                <span>Optimasi On-Page SEO Google &amp; Kecepatan Akses</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#C23605] shrink-0" />
                <span>100% Hak Milik Source Code &amp; Panel Admin</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#C23605] shrink-0" />
                <span>Surat Perjanjian Kerja (SPK) &amp; Invoice Resmi</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#C23605] shrink-0" />
                <span>Garansi Pemeliharaan Teknis &amp; Panduan Staf</span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-neutral-500">
                Pengerjaan: 10 - 21 Hari Kerja • Koordinasi berkala via WhatsApp &amp; Onsite.
              </span>
              <a
                href={getWhatsAppUrl('website', 'Paket Company Profile (Rp 5.5jt)')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-3 bg-[#D13D00] hover:bg-[#B33400] text-white font-bold text-xs rounded-full shadow-glow transition-all whitespace-nowrap text-center"
              >
                Pilih Paket Company Profile
              </a>
            </div>
          </div>
        </section>

        {/* Local Area */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 mt-20">
          <div className="bg-gradient-to-br from-neutral-100 to-neutral-200/60 rounded-3xl p-7 sm:p-9 border border-neutral-200/80">
            <div className="flex items-center gap-2 text-[#C23605] text-xs font-semibold mb-2">
              <MapPin className="w-4 h-4" />
              <span>Jangkauan Bisnis Kalimantan Selatan</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-neutral-900 tracking-tight">
              Siap Pertemuan Tatap Muka di Kalimantan Selatan
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mt-2">
              Untuk kebutuhan presentasi proyek, penandatanganan SPK, atau pendampingan teknis, tim kami siap hadir langsung di Banjarmasin, Banjarbaru, Kandangan, Barabai, Rantau, Tanjung, Batulicin, dan wilayah Kalsel lainnya.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 mt-20">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF5F0] border border-orange-200/50 text-[#C23605] text-xs font-semibold mb-2">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Tanya Jawab Perusahaan</span>
            </div>
            <h2 className="text-2xl font-extrabold text-neutral-900 tracking-tight">
              Pertanyaan Seputar Website Company Profile
            </h2>
          </div>
          <div className="space-y-3">
            {companyFaqs.map((faq) => (
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
              Konsultasikan Website Company Profile Perusahaan Anda
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-2 max-w-lg mx-auto">
              Tim kami siap membantu menyusun struktur halaman profil bisnis yang paling pas dengan sasaran pasar Anda.
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
                href={getWhatsAppUrl('website', 'Konsultasi Company Profile')}
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
