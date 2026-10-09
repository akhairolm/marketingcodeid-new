'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  Menu,
  X,
  ArrowRight,
  CheckCircle2,
  Play,
  Code2,
  Smartphone,
  TrendingUp,
  Palette,
  BellRing,
  Code,
  Check,
  ChevronRight,
  BarChart3,
  Target,
  Search,
  Filter,
  PieChart,
  ArrowUpRight,
  Tag,
  Route,
  MailCheck,
  HelpCircle,
  Plus,
  Minus,
  MessageCircle,
  Film,
  Sparkles,
  ExternalLink,
} from 'lucide-react'
import { getWhatsAppUrl } from '@/lib/whatsapp'

function InstagramIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  )
}

function LinkedinIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect width="4" height="12" x="2" y="9"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  )
}

function GithubIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
      <path d="M9 18c-4.51 2-5-2-7-2"/>
    </svg>
  )
}

interface PortfolioProject {
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

export default function HomePage() {
  // Mobile Menu State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Video Modal State
  const [videoModalOpen, setVideoModalOpen] = useState(false)

  // Pricing Tab Filter State
  const [pricingTab, setPricingTab] = useState<'web' | 'app' | 'ads'>('web')

  // Portfolio Category Filter State
  const [portfolioFilter, setPortfolioFilter] = useState<'all' | 'web' | 'app' | 'marketing'>('all')

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  // Toast Notification State
  const [toastOpen, setToastOpen] = useState(false)

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'web',
    notes: '',
  })

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Show toast notification
    setToastOpen(true)

    // Prepare WhatsApp message
    const serviceName =
      formData.service === 'web'
        ? 'Website Development'
        : formData.service === 'app'
        ? 'Mobile App Development'
        : formData.service === 'marketing'
        ? 'Digital Marketing (Ads & SEO)'
        : 'Solusi Komprehensif (Web + App + Marketing)'

    const waText = `Halo MarketingCode.ID, saya ${formData.name} (${formData.email}) ingin konsultasi terkait ${serviceName}. Detail rencana: ${formData.notes || '-'}`

    // Automatically trigger WhatsApp redirect after brief moment
    setTimeout(() => {
      window.open(`https://wa.me/6281234567890?text=${encodeURIComponent(waText)}`, '_blank')
    }, 1000)

    // Reset Form
    setFormData({ name: '', email: '', service: 'web', notes: '' })

    // Auto dismiss toast after 4s
    setTimeout(() => {
      setToastOpen(false)
    }, 4000)
  }

  // Portfolio Projects Data
  const portfolioProjects: PortfolioProject[] = [
    {
      slug: 'warehouse-stock-inventory-erp',
      title: 'Warehouse & Stock Inventory ERP',
      client: 'Distribusi Logistik B2B',
      category: 'web',
      categoryLabel: 'Custom Web Application',
      techStack: ['Next.js 16', 'Drizzle ORM', 'Supabase PostgreSQL', 'Tailwind CSS'],
      description: 'Sistem pencatatan inventaris multi-gudang real-time dengan batch FIFO/LIFO, audit trail mutasi, dan dashboard visual low-stock alert.',
      highlight: '0ms Rekap Manual · 100% Data Integritas',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
    },
    {
      slug: 'brand-showcase-e-catalog',
      title: 'High-Converting Brand Showcase & E-Catalog',
      client: 'Consumer Brand & Retail',
      category: 'web',
      categoryLabel: 'Company Profile & E-Catalog',
      techStack: ['Next.js App Router', 'Tailwind CSS', 'WhatsApp Pipeline', 'Vercel Edge'],
      description: 'Website katalog interaktif ultra-cepat dengan waktu muat 0.8 detik. Dilengkapi integrasi pesan WhatsApp otomatis sesuai produk yang dilihat.',
      highlight: 'Score Lighthouse 99 · Konversi 3.4x',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    },
    {
      slug: 'client-service-portal-mobile-booking',
      title: 'Client Service Portal & Mobile Booking Engine',
      client: 'Jasa Profesional & Medis',
      category: 'app',
      categoryLabel: 'Mobile Application (iOS/Android)',
      techStack: ['Flutter Cross-Platform', 'REST API Node.js', 'PostgreSQL', 'Cloudflare CDN'],
      description: 'Aplikasi pemesanan jadwal konsultasi, pembayaran invoice gateway otomatis, dan tracking status pengerjaan proyek transparan untuk klien.',
      highlight: 'Automated Client Onboarding · 4.9 App Rating',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80',
    },
    {
      slug: 'omnichannel-performance-ads-scaling',
      title: 'Omnichannel Performance Ads Scaling',
      client: 'Fashion & Skincare E-Commerce',
      category: 'marketing',
      categoryLabel: 'Digital Marketing & Ads',
      techStack: ['Meta Conversions API (CAPI)', 'Google Search Ads', 'Looker Studio', 'CRO Landing Page'],
      description: 'Eksekusi kampanye iklan berbasis ROI dengan testing copywriting agresif, tracking server-side anti-bocor, dan dashboard live reporting mingguan.',
      highlight: '+320% ROI Growth · CAC Turun 42%',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    },
  ]

  const filteredProjects =
    portfolioFilter === 'all'
      ? portfolioProjects
      : portfolioProjects.filter((p) => p.category === portfolioFilter)

  // Pricing Data per Category
  const pricingData = {
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

  const faqs = [
    {
      q: 'Berapa lama estimasi pembuatan website atau aplikasi?',
      a: 'Landing page sederhana umumnya selesai dalam 5-7 hari kerja. Website korporat 2-3 minggu, dan aplikasi mobile custom antara 1 hingga 3 bulan tergantung kompleksitas fitur yang diinginkan.',
    },
    {
      q: 'Apakah saya memegang kepemilikan penuh atas kode (source code)?',
      a: 'Ya, 100%! Setelah pelunasan proyek, seluruh hak cipta source code, aset desain Figma, dan akses server diserahkan sepenuhnya kepada perusahaan Anda tanpa ada sistem sewa tersembunyi.',
    },
    {
      q: 'Bagaimana garansi dan pemeliharaan (maintenance) setelah rilis?',
      a: 'Kami memberikan garansi perbaikan bug dan pemeliharaan gratis selama 1 hingga 3 bulan (tergantung paket). Kami juga menyediakan opsi retainer tahunan untuk update berkala dan optimasi server.',
    },
    {
      q: 'Bagaimana alur kerja jasa digital marketing dan laporannya?',
      a: 'Kami melakukan audit akun iklan & SEO terlebih dahulu, membuat rancangan materi kreatif dan copywriting, lalu melakukan testing audiens. Anda akan menerima dashboard live reporting dan evaluasi berkala setiap minggu.',
    },
  ]

  return (
    <div className="min-h-screen font-sans bg-[#FBFBFB] text-[#18181B] antialiased selection:bg-[#FF5C28] selection:text-white">
      {/* ========================================================
          TOP FLOATING CAPSULE NAVIGATION
      ======================================================== */}
      <header className="fixed top-5 inset-x-0 z-50 flex justify-center px-4">
        <nav className="w-full max-w-4xl bg-[#1A1A1E]/90 backdrop-blur-md text-white px-5 py-2.5 rounded-full flex items-center justify-between shadow-2xl border border-white/10 transition-all duration-300">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#FF5C28] to-[#EA4510] flex items-center justify-center text-white font-extrabold text-sm shadow-glow group-hover:scale-105 transition-transform tracking-tight">
              M
            </div>
            <span className="font-bold tracking-tight text-base text-white">
              MarketingCode<span className="text-[#FF5C28]">.ID</span>
            </span>
          </Link>

          {/* Desktop Menu Links */}
          <div className="hidden md:flex items-center gap-6 text-xs font-medium tracking-wide text-neutral-300">
            <a href="#web-services" className="hover:text-white transition-colors">Layanan Utama</a>
            <a href="#akselerasi" className="hover:text-white transition-colors">Skalakan Bisnis</a>
            <Link href="/portfolio" className="hover:text-white transition-colors">Portofolio</Link>
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <a href="#harga" className="hover:text-white transition-colors">Investasi</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </div>

          {/* Action Button */}
          <div className="flex items-center gap-3">
            <a
              href="#konsultasi"
              className="bg-[#FF5C28] hover:bg-[#EA4510] text-white text-xs font-semibold px-4 py-2 rounded-full shadow-glow transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Konsultasi Gratis
            </a>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
              className="md:hidden text-neutral-300 hover:text-white p-1 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-4 top-20 z-40 bg-[#1A1A1E] text-white p-6 rounded-3xl shadow-2xl border border-white/10 flex flex-col gap-4 text-center md:hidden transition-all animate-in fade-in slide-in-from-top-4">
          <a
            href="#web-services"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 hover:text-[#FF5C28] transition-colors"
          >
            Layanan Utama
          </a>
          <a
            href="#akselerasi"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 hover:text-[#FF5C28] transition-colors"
          >
            Skalakan Bisnis
          </a>
          <Link
            href="/portfolio"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 hover:text-[#FF5C28] transition-colors"
          >
            Portofolio &amp; Studi Kasus
          </Link>
          <Link
            href="/blog"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 hover:text-[#FF5C28] transition-colors"
          >
            Blog &amp; Insight
          </Link>
          <a
            href="#harga"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 hover:text-[#FF5C28] transition-colors"
          >
            Investasi
          </a>
          <a
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 hover:text-[#FF5C28] transition-colors"
          >
            FAQ
          </a>
          <a
            href="#konsultasi"
            onClick={() => setMobileMenuOpen(false)}
            className="bg-[#FF5C28] hover:bg-[#EA4510] text-white font-semibold py-2.5 rounded-full mt-2"
          >
            Jadwalkan Diskusi Proyek
          </a>
        </div>
      )}

      {/* ========================================================
          MAIN CONTENT AREA
      ======================================================== */}
      <main className="relative bg-grid-pattern pt-28 sm:pt-32 pb-20 overflow-hidden">
        {/* ========================================================
            1. HERO SECTION (Container Flex/Grid 2 Kolom di Desktop, Stack di Mobile)
        ======================================================== */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Kolom 1 (Dominan) */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Social Proof Badge with Avatars */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-neutral-200/80 shadow-xs hover:border-orange-200 transition-colors">
                <div className="flex -space-x-2">
                  <img
                    className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover"
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80"
                    alt="Client 1"
                  />
                  <img
                    className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover"
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80"
                    alt="Client 2"
                  />
                  <img
                    className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover"
                    src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=80&q=80"
                    alt="Client 3"
                  />
                </div>
                <span className="text-xs font-semibold text-neutral-700 tracking-tight">
                  Bergabung bersama <span className="text-[#FF5C28]">250+ Bisnis</span> yang Bertumbuh
                </span>
              </div>

              {/* Headline Utama H1 (Web & Mobile App) */}
              <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold text-[#111827] tracking-tight leading-[1.14]">
                Kembangkan Bisnis Anda Melalui <span className="text-[#FF5C28]">Website</span> &amp;{' '}
                <span className="text-[#FF5C28]">Aplikasi Mobile</span>
              </h1>

              {/* Deskripsi Penawaran */}
              <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-normal max-w-xl">
                Kami merancang ekosistem digital performa tinggi: arsitektur kode modern, mobile app yang intuitif, serta strategi pemasaran berbasis konversi nyata untuk melipatgandakan omzet bisnis Anda.
              </p>

              {/* CTA Konversi */}
              <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <a
                  href="#konsultasi"
                  className="inline-flex items-center justify-center px-8 py-3.5 text-sm sm:text-base font-semibold text-white bg-[#FF5C28] hover:bg-[#EA4510] rounded-full shadow-glow transition-all duration-300 transform hover:-translate-y-1"
                >
                  <span>Mulai Konsultasi Gratis</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>

                <div className="flex items-center gap-1.5 text-xs text-neutral-500">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Estimasi proposal &amp; audit arsitektur dalam 24 jam</span>
                </div>
              </div>
            </div>

            {/* Kolom 2: Komponen Visual / Mockup Proyek Utama */}
            <div className="lg:col-span-5">
              <div className="relative bg-neutral-900 rounded-3xl overflow-hidden shadow-2xl border border-neutral-200/80 aspect-[16/10] sm:aspect-[4/3] group">
                {/* Background Cover Mockup */}
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
                  alt="MarketingCode ID Team Working"
                  className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />

                {/* Play Button Icon Modal Trigger */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => setVideoModalOpen(true)}
                    aria-label="Putar Video Showreel"
                    className="w-16 h-16 sm:w-20 sm:h-20 bg-white/90 hover:bg-white text-[#FF5C28] rounded-full flex items-center justify-center shadow-2xl backdrop-blur-md transition-all duration-300 transform hover:scale-110 group-hover:shadow-glow cursor-pointer"
                  >
                    <Play className="w-7 h-7 fill-[#FF5C28] text-[#FF5C28] translate-x-0.5" />
                  </button>
                </div>

                {/* Floating Micro Badges inside Video Preview */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs">
                  <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[11px]">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Showreel Agensi 2026</span>
                  </div>
                  <span className="bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] text-white">
                    1:45 Min
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            2. TRAFFIC ROUTER GRID (Tepat di bawah Hero, Grid 3 Kolom)
        ======================================================== */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 mt-16 sm:mt-20">
          <div className="text-center mb-8">
            <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
              Pusat Layanan &amp; Navigasi Solusi
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight mt-1">
              Pilih Solusi yang Sesuai dengan Kebutuhan Bisnis Anda
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Fokus Web & Mobile App */}
            <a
              href="#web-services"
              className="bg-white rounded-3xl p-6 sm:p-7 border border-neutral-200/80 shadow-card hover:border-[#FF5C28] transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#FFF5F0] border border-orange-200/60 flex items-center justify-center text-[#FF5C28] mb-4 shadow-xs group-hover:scale-110 transition-transform">
                  <Code2 className="w-6 h-6" />
                </div>
                <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-orange-50 text-[#EA4510] mb-2 border border-orange-100">
                  Layanan Inti
                </span>
                <h3 className="text-lg font-bold text-neutral-900 leading-snug group-hover:text-[#FF5C28] transition-colors">
                  Web &amp; Mobile App Development
                </h3>
                <p className="text-xs text-neutral-500 mt-2 leading-relaxed">
                  Pengembangan website Next.js 16 kencang, dashboard admin custom mandiri, dan aplikasi mobile Flutter iOS &amp; Android siap rilis.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs font-semibold text-[#FF5C28]">
                <span>Lihat Detail Solusi Web &amp; App</span>
                <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </a>

            {/* Card 2: Fokus Digital Marketing */}
            <Link
              href="/digital-marketing"
              className="bg-white rounded-3xl p-6 sm:p-7 border border-neutral-200/80 shadow-card hover:border-[#FF5C28] transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#FFF5F0] border border-orange-200/60 flex items-center justify-center text-[#FF5C28] mb-4 shadow-xs group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-orange-50 text-[#EA4510] mb-2 border border-orange-100">
                  Pertumbuhan Omzet
                </span>
                <h3 className="text-lg font-bold text-neutral-900 leading-snug group-hover:text-[#FF5C28] transition-colors">
                  Digital Marketing &amp; Performance Ads
                </h3>
                <p className="text-xs text-neutral-500 mt-2 leading-relaxed">
                  Akuisisi pelanggan tertarget melalui Meta Ads, Google Search, SEO organik, dan tracking CAPI server-side anti-bocor.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs font-semibold text-[#FF5C28]">
                <span>Pelajari Digital Marketing</span>
                <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Card 3: Fokus Video Editing */}
            <Link
              href="/video-editing"
              className="bg-white rounded-3xl p-6 sm:p-7 border border-neutral-200/80 shadow-card hover:border-[#FF5C28] transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#FFF5F0] border border-orange-200/60 flex items-center justify-center text-[#FF5C28] mb-4 shadow-xs group-hover:scale-110 transition-transform">
                  <Film className="w-6 h-6" />
                </div>
                <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-orange-50 text-[#EA4510] mb-2 border border-orange-100">
                  Konten Kreatif
                </span>
                <h3 className="text-lg font-bold text-neutral-900 leading-snug group-hover:text-[#FF5C28] transition-colors">
                  Creative Video Editing &amp; Motion
                </h3>
                <p className="text-xs text-neutral-500 mt-2 leading-relaxed">
                  Produksi materi video iklan vertikal (TikTok/Reels/Shorts) berdaya pikat tinggi dan company showreel berstandar sinematik.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs font-semibold text-[#FF5C28]">
                <span>Pelajari Video Editing</span>
                <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </section>

        {/* ========================================================
            3. TRUST & SOCIAL PROOF STRIP (Pembatas Transisi Antar-Bagian)
        ======================================================== */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 mt-20 sm:mt-24 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight max-w-xl mx-auto">
            Kinerja Teruji Membantu Ekosistem Bisnis Melejit
          </h2>
          <p className="text-neutral-500 text-sm mt-2">Dukungan teknologi solid &amp; eksekusi pemasaran presisi</p>

          <div className="mt-8 bg-white border border-neutral-200/70 rounded-3xl p-6 sm:p-8 shadow-card grid grid-cols-1 sm:grid-cols-3 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-neutral-100">
            <div className="flex flex-col items-center py-2 sm:py-0">
              <span className="text-3xl sm:text-4xl font-extrabold text-neutral-900">180+</span>
              <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mt-1">Website &amp; App Dirilis</span>
            </div>

            <div className="flex flex-col items-center py-2 sm:py-0">
              <span className="text-3xl sm:text-4xl font-extrabold text-neutral-900">Rp 45M+</span>
              <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mt-1">GMV Klien Tergenerate</span>
            </div>

            <div className="flex flex-col items-center py-2 sm:py-0">
              <span className="text-3xl sm:text-4xl font-extrabold text-neutral-900">98.6%</span>
              <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mt-1">Kepuasan &amp; Retensi Klien</span>
            </div>
          </div>
        </section>

        {/* ========================================================
            4. DETAIL LAYANAN UTAMA (Flagship Breakdown: Web & Mobile App)
        ======================================================== */}
        <section id="web-services" className="max-w-6xl mx-auto px-4 sm:px-6 mt-28">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF5F0] border border-orange-200/50 text-[#EA4510] text-xs font-semibold mb-3">
              <Code className="w-3.5 h-3.5" />
              <span>Flagship Solutions</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
              Spesialisasi Web &amp; Mobile App Berperforma Tinggi
            </h2>
            <p className="text-neutral-500 text-sm mt-2 max-w-2xl mx-auto">
              Setiap solusi dirancang khusus dari baris kode pertama untuk kecepatan instan, keamanan data menyeluruh, dan 100% kepemilikan source code tanpa sistem sewa.
            </p>
          </div>

          {/* 3 Pillar Cards: Landing Page, Custom Web & CMS, Mobile App */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Landing Page */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-neutral-200/80 shadow-card flex flex-col justify-between hover:border-orange-200 transition-all">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#FFF5F0] border border-orange-200/60 flex items-center justify-center text-[#FF5C28] mb-4">
                  <Palette className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold text-[#FF5C28] uppercase tracking-wider">Kilat &amp; Konversi</span>
                <h3 className="text-lg font-bold text-neutral-900 mt-1">High-Converting Landing Page</h3>
                <p className="text-xs text-neutral-500 mt-2 leading-relaxed">
                  Solusi halaman promosi tunggal ultra-responsif yang dirancang untuk kampanye iklan berkonversi tinggi dan peluncuran produk cepat.
                </p>

                <div className="mt-5 space-y-2.5 text-xs text-neutral-600">
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#FF5C28]" /> Waktu muat sub-detik (&lt; 0.8s)
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#FF5C28]" /> Integrasi Meta Pixel &amp; Google Tag
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#FF5C28]" /> WhatsApp CTA Auto-Dispatch
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-neutral-100 text-[11px] text-neutral-400">
                Pengerjaan: 5 - 7 Hari Kerja
              </div>
            </div>

            {/* Card 2: Custom Web Application & CMS (Flagship) */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-[#FF5C28] shadow-xl relative flex flex-col justify-between transform md:-translate-y-2">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#FF5C28] text-white text-[10px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                Flagship Agensi
              </div>
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#FF5C28] text-white flex items-center justify-center mb-4 shadow-glow">
                  <Code2 className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold text-[#FF5C28] uppercase tracking-wider">Enterprise Architecture</span>
                <h3 className="text-lg font-bold text-neutral-900 mt-1">Custom Web Platform &amp; CMS</h3>
                <p className="text-xs text-neutral-500 mt-2 leading-relaxed">
                  Aplikasi web korporat, dashboard internal, atau portal SaaS menggunakan Next.js 16 (App Router) dan dashboard admin custom.
                </p>

                <div className="mt-5 space-y-2.5 text-xs text-neutral-700 font-medium">
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#FF5C28]" /> Full-stack Next.js 16 &amp; React 19
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#FF5C28]" /> Dashboard Admin Fullstack Custom
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#FF5C28]" /> PostgreSQL Supabase Database
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#FF5C28]" /> 100% Hak Akses Repositori GitHub
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-neutral-100 text-[11px] text-[#FF5C28] font-semibold">
                Pengerjaan: 14 - 21 Hari Kerja
              </div>
            </div>

            {/* Card 3: Mobile Application */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-neutral-200/80 shadow-card flex flex-col justify-between hover:border-orange-200 transition-all">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#FFF5F0] border border-orange-200/60 flex items-center justify-center text-[#FF5C28] mb-4">
                  <Smartphone className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold text-[#FF5C28] uppercase tracking-wider">iOS &amp; Android Dual Store</span>
                <h3 className="text-lg font-bold text-neutral-900 mt-1">Cross-Platform Mobile App</h3>
                <p className="text-xs text-neutral-500 mt-2 leading-relaxed">
                  Pengembangan aplikasi mobile modern dengan Flutter cross-platform untuk e-commerce, booking engine, dan interaksi pengguna intensif.
                </p>

                <div className="mt-5 space-y-2.5 text-xs text-neutral-600">
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#FF5C28]" /> Single Codebase Android &amp; iOS
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#FF5C28]" /> Integrasi Payment Gateway &amp; Auth
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#FF5C28]" /> Bantuan Publikasi ke Play/App Store
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-neutral-100 text-[11px] text-neutral-400">
                Pengerjaan: 3 - 6 Minggu
              </div>
            </div>
          </div>

          {/* Interactive UI Mockup (Sprint 04 & Architecture Showcase) */}
          <div className="mt-16 bg-gradient-to-br from-neutral-100 to-neutral-200/60 p-6 sm:p-8 rounded-3xl border border-neutral-200/80 shadow-soft">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 bg-white rounded-2xl p-5 shadow-card border border-neutral-100">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-400" />
                    <span className="w-3 h-3 rounded-full bg-amber-400" />
                    <span className="w-3 h-3 rounded-full bg-emerald-400" />
                    <span className="text-xs font-medium text-neutral-400 ml-2">App Architecture • Sprint 04</span>
                  </div>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#FFF5F0] text-[#EA4510] font-semibold border border-orange-100">
                    On Schedule
                  </span>
                </div>

                <div className="mt-4 space-y-3">
                  <div className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-100">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-neutral-800">Optimasi Kecepatan Core Web Vitals</h4>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">Score 99</span>
                    </div>
                    <p className="text-[11px] text-neutral-500 mt-1">Restrukturisasi cache &amp; CDN Next.js untuk loading time &lt; 0.8s.</p>
                    <div className="mt-3 flex items-center justify-between text-[11px] text-neutral-400">
                      <div className="flex -space-x-1.5">
                        <span className="w-5 h-5 rounded-full bg-[#FF5C28] text-white flex items-center justify-center text-[9px] font-bold">FE</span>
                        <span className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center text-[9px] font-bold">BE</span>
                      </div>
                      <span>4 Subtasks selesai</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-white border border-neutral-200/70 rounded-xl shadow-xs">
                    <div className="w-8 h-8 rounded-full bg-[#FF5C28] flex items-center justify-center text-white shrink-0">
                      <BellRing className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-neutral-800 truncate">Mobile App iOS &amp; Android Ready</p>
                      <p className="text-[10px] text-neutral-400">Build stabil siap diunggah ke Play Store &amp; App Store</p>
                    </div>
                    <span className="text-[10px] text-neutral-400">Just now</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 space-y-4">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight leading-snug">
                  Teknologi Modular yang Skalabel, Cepat &amp; Aman
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  Kami mengintegrasikan ekosistem teknologi terbaru agar produk Anda tahan uji di masa depan tanpa terbebani plugin yang memperlambat website.
                </p>

                <div className="pt-2 flex flex-wrap gap-2">
                  <span className="px-3 py-1.5 bg-white border border-neutral-200 rounded-full text-xs font-medium text-neutral-700 flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#FF5C28]" /> Next.js 16 &amp; React 19
                  </span>
                  <span className="px-3 py-1.5 bg-white border border-neutral-200 rounded-full text-xs font-medium text-neutral-700 flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#FF5C28]" /> Dashboard Admin Custom
                  </span>
                  <span className="px-3 py-1.5 bg-white border border-neutral-200 rounded-full text-xs font-medium text-neutral-700 flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#FF5C28]" /> Supabase Managed PostgreSQL
                  </span>
                  <span className="px-3 py-1.5 bg-white border border-neutral-200 rounded-full text-xs font-medium text-neutral-700 flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#FF5C28]" /> 100% Source Code Ownership
                  </span>
                </div>

                <div className="pt-2">
                  <a
                    href="#konsultasi"
                    className="inline-flex items-center text-xs font-bold text-white bg-[#FF5C28] hover:bg-[#EA4510] px-5 py-2.5 rounded-full transition-all shadow-sm"
                  >
                    Konsultasikan Solusi Teknis
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            5. ACCELERATION / CROSS-SELL SECTION ("Skalakan Website Anda")
        ======================================================== */}
        <section id="akselerasi" className="max-w-6xl mx-auto px-4 sm:px-6 mt-28">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF5F0] border border-orange-200/50 text-[#EA4510] text-xs font-semibold mb-3">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Growth &amp; Acceleration</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
              Skalakan Website Anda dengan Pemasaran &amp; Konten Kreatif
            </h2>
            <p className="text-neutral-500 text-sm mt-2 max-w-2xl mx-auto">
              Website hebat membutuhkan traffic pembeli dan materi video memikat. Padukan arsitektur digital Anda dengan strategi akuisisi teruji untuk melipatgandakan return on investment (ROI).
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Card 1: Digital Marketing */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/80 shadow-card flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#FFF5F0] border border-orange-200/60 flex items-center justify-center text-[#FF5C28]">
                      <BarChart3 className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-neutral-900">Digital Marketing &amp; Performance Ads</h3>
                      <span className="text-xs text-neutral-400">Kampanye Berbasis ROI &amp; Penjualan Nyata</span>
                    </div>
                  </div>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-200">
                    +320% ROI
                  </span>
                </div>

                <p className="text-xs text-neutral-600 mt-4 leading-relaxed">
                  Lupakan anggaran iklan yang terbuang sia-sia. Spesialis digital marketing kami memanfaatkan tracking CAPI server-side, riset kata kunci Google Ads intensi beli tinggi, dan optimasi alur funnel.
                </p>

                {/* Growth Chart Simulation Mini */}
                <div className="mt-5 p-4 bg-neutral-50 rounded-2xl border border-neutral-100">
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="text-[10px] text-neutral-400 font-semibold uppercase">Total Penjualan Klien</span>
                    <span className="text-sm font-black text-neutral-900">Rp 842.500.000</span>
                  </div>
                  <div className="flex items-end justify-between h-20 px-2 gap-2 border-b border-neutral-200/70 pb-2">
                    <div className="w-full flex flex-col items-center gap-1">
                      <div className="w-full bg-orange-100 rounded-t h-6" />
                      <span className="text-[9px] text-neutral-400">Bln 1</span>
                    </div>
                    <div className="w-full flex flex-col items-center gap-1">
                      <div className="w-full bg-orange-200 rounded-t h-9" />
                      <span className="text-[9px] text-neutral-400">Bln 2</span>
                    </div>
                    <div className="w-full flex flex-col items-center gap-1">
                      <div className="w-full bg-orange-300 rounded-t h-12" />
                      <span className="text-[9px] text-neutral-400">Bln 3</span>
                    </div>
                    <div className="w-full flex flex-col items-center gap-1">
                      <div className="w-full bg-orange-400 rounded-t h-15" />
                      <span className="text-[9px] text-neutral-400">Bln 4</span>
                    </div>
                    <div className="w-full flex flex-col items-center gap-1">
                      <div className="w-full bg-[#FF5C28] rounded-t h-18 shadow-glow" />
                      <span className="text-[9px] font-bold text-[#EA4510]">Bln 5</span>
                    </div>
                  </div>
                  <div className="mt-2 text-[11px] text-neutral-500 flex justify-between">
                    <span>Biaya Akuisisi (CAC): <strong>Turun 42%</strong></span>
                    <span className="text-emerald-600 font-semibold">Scaling Positif</span>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-2 text-xs text-neutral-600">
                  <div className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#FF5C28]" /> Meta &amp; Google Ads</div>
                  <div className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#FF5C28]" /> Organic SEO Rank #1</div>
                  <div className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#FF5C28]" /> Funnel Sales Audit</div>
                  <div className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#FF5C28]" /> Transparent Analytics</div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-neutral-100">
                <Link
                  href="/digital-marketing"
                  className="w-full py-3 px-5 bg-[#FF5C28] hover:bg-[#EA4510] text-white font-bold text-xs rounded-full shadow-glow flex items-center justify-center gap-2 transition-all"
                >
                  <span>Jelajahi Layanan Digital Marketing</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Card 2: Creative Video Editing */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/80 shadow-card flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#FFF5F0] border border-orange-200/60 flex items-center justify-center text-[#FF5C28]">
                      <Film className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-neutral-900">Creative Video Editing &amp; Motion</h3>
                      <span className="text-xs text-neutral-400">Konten Penjualan Hook &amp; Retensi Tinggi</span>
                    </div>
                  </div>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-orange-50 text-[#EA4510] border border-orange-200">
                    Hook 3 Detik
                  </span>
                </div>

                <p className="text-xs text-neutral-600 mt-4 leading-relaxed">
                  Tingkatkan retensi audiens dengan materi video berstandar tinggi. Dari video iklan ads vertikal (TikTok/Reels) yang memicu klik hingga company showreel yang membangun kredibilitas instan.
                </p>

                {/* Video Editor Mockup Mini Card */}
                <div className="mt-5 p-4 bg-neutral-900 text-white rounded-2xl border border-neutral-800 relative overflow-hidden">
                  <div className="flex items-center justify-between text-xs pb-3 border-b border-neutral-800">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                      <span className="text-[11px] font-mono text-neutral-300">Format 9:16 Vertical Ads</span>
                    </div>
                    <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full text-neutral-300">4K 60fps Master</span>
                  </div>

                  <div className="py-4 text-center">
                    <Sparkles className="w-8 h-8 text-[#FF5C28] mx-auto mb-2" />
                    <h4 className="text-xs font-bold text-white">Dynamic Transitions &amp; Sound Design</h4>
                    <p className="text-[11px] text-neutral-400 mt-0.5">Dirancang spesifik untuk algoritma FYP dan click conversion rate tinggi</p>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-neutral-400 pt-2 border-t border-neutral-800">
                    <span>Platform: TikTok • Reels • Shorts</span>
                    <span className="text-emerald-400 font-semibold">+280% Watch Retention</span>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-2 text-xs text-neutral-600">
                  <div className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#FF5C28]" /> TikTok &amp; Reels Ads</div>
                  <div className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#FF5C28]" /> Corporate Showreel</div>
                  <div className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#FF5C28]" /> Kinetic Typography &amp; SFX</div>
                  <div className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#FF5C28]" /> Monthly Retainer Squad</div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-neutral-100">
                <Link
                  href="/video-editing"
                  className="w-full py-3 px-5 bg-neutral-900 hover:bg-black text-white font-bold text-xs rounded-full flex items-center justify-center gap-2 transition-all"
                >
                  <span>Jelajahi Layanan Video Editing</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            6. PORTFOLIO & CASE STUDIES (Hasil Kerja Nyata dengan Filter Kategori)
        ======================================================== */}
        <section id="portfolio" className="max-w-6xl mx-auto px-4 sm:px-6 mt-28">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF5F0] border border-orange-200/50 text-[#EA4510] text-xs font-semibold mb-3">
              <Route className="w-3.5 h-3.5" />
              <span>Studi Kasus &amp; Portofolio</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
              Hasil Kerja Nyata yang Telah Beroperasi
            </h2>
            <p className="text-neutral-500 text-sm mt-2 max-w-2xl mx-auto">
              Setiap proyek dibangun dengan arsitektur bersih, performa tinggi, dan terbukti menghasilkan dampak bisnis nyata bagi klien kami.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex justify-center mb-10">
            <div className="bg-neutral-100 p-1.5 rounded-full inline-flex border border-neutral-200 overflow-x-auto max-w-full">
              <button
                type="button"
                onClick={() => setPortfolioFilter('all')}
                className={`px-4 sm:px-5 py-2 text-xs rounded-full transition-all cursor-pointer whitespace-nowrap ${
                  portfolioFilter === 'all'
                    ? 'font-bold bg-white text-neutral-900 shadow-xs'
                    : 'font-semibold text-neutral-600 hover:text-neutral-900'
                }`}
              >
                Semua Proyek
              </button>
              <button
                type="button"
                onClick={() => setPortfolioFilter('web')}
                className={`px-4 sm:px-5 py-2 text-xs rounded-full transition-all cursor-pointer whitespace-nowrap ${
                  portfolioFilter === 'web'
                    ? 'font-bold bg-white text-neutral-900 shadow-xs'
                    : 'font-semibold text-neutral-600 hover:text-neutral-900'
                }`}
              >
                Web Development
              </button>
              <button
                type="button"
                onClick={() => setPortfolioFilter('app')}
                className={`px-4 sm:px-5 py-2 text-xs rounded-full transition-all cursor-pointer whitespace-nowrap ${
                  portfolioFilter === 'app'
                    ? 'font-bold bg-white text-neutral-900 shadow-xs'
                    : 'font-semibold text-neutral-600 hover:text-neutral-900'
                }`}
              >
                Mobile Application
              </button>
              <button
                type="button"
                onClick={() => setPortfolioFilter('marketing')}
                className={`px-4 sm:px-5 py-2 text-xs rounded-full transition-all cursor-pointer whitespace-nowrap ${
                  portfolioFilter === 'marketing'
                    ? 'font-bold bg-white text-neutral-900 shadow-xs'
                    : 'font-semibold text-neutral-600 hover:text-neutral-900'
                }`}
              >
                Digital Marketing
              </button>
            </div>
          </div>

          {/* Portfolio Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl overflow-hidden border border-neutral-200/80 shadow-card hover:border-[#FF5C28] transition-all group flex flex-col justify-between"
              >
                <div>
                  {/* Thumbnail Image */}
                  <Link href={`/portfolio/${item.slug}`} className="block aspect-[16/9] w-full overflow-hidden relative bg-neutral-100">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold px-3 py-1 rounded-full border border-white/20">
                      {item.categoryLabel}
                    </div>
                  </Link>

                  <div className="p-6 sm:p-7">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-semibold text-neutral-400">Klien: {item.client}</span>
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {item.highlight}
                      </span>
                    </div>

                    <Link href={`/portfolio/${item.slug}`} className="block">
                      <h3 className="text-xl font-bold text-neutral-900 group-hover:text-[#FF5C28] transition-colors">
                        {item.title}
                      </h3>
                    </Link>

                    <p className="text-xs text-neutral-600 mt-2.5 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Tech Stack Pills */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {item.techStack.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-1 bg-neutral-50 border border-neutral-200 rounded-lg text-[11px] font-medium text-neutral-600"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 flex flex-col sm:flex-row gap-2.5">
                  <Link
                    href={`/portfolio/${item.slug}`}
                    className="flex-1 py-2.5 px-4 bg-[#18181B] hover:bg-black text-white text-xs font-semibold rounded-full flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap"
                  >
                    <span>Lihat Studi Kasus</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <a
                    href={getWhatsAppUrl('case-study', item.title)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-4 bg-neutral-50 hover:bg-[#FFF5F0] hover:text-[#EA4510] border border-neutral-200 text-neutral-700 text-xs font-semibold rounded-full flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap"
                  >
                    <span>Diskusi via WA</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Link to Full Portfolio Archive */}
          <div className="mt-10 text-center">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-neutral-200/80 hover:border-[#FF5C28] text-xs font-bold text-neutral-800 hover:text-[#FF5C28] shadow-card transition-all transform hover:-translate-y-0.5"
            >
              <span>Lihat Seluruh Portofolio &amp; Studi Kasus</span>
              <ArrowRight className="w-4 h-4 text-[#FF5C28]" />
            </Link>
          </div>

          {/* Pricing / Investment Options (Integrated into Section 6 Flow) */}
          <div id="harga" className="mt-24 pt-8">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF5F0] border border-orange-200/50 text-[#EA4510] text-xs font-semibold mb-3">
                <Tag className="w-3.5 h-3.5" />
                <span>Pilihan Paket Transparan</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
                Paket Investasi Transparan Sesuai Skala Bisnis
              </h2>
              <p className="text-neutral-500 text-sm mt-2 max-w-lg mx-auto">
                Pilih paket yang paling pas untuk akselerasi bisnis Anda. Tersedia garansi performa dan purna jual.
              </p>

              {/* Pricing Category Tabs */}
              <div className="mt-8 flex justify-center">
                <div className="bg-neutral-100 p-1.5 rounded-full inline-flex border border-neutral-200">
                  <button
                    type="button"
                    onClick={() => setPricingTab('web')}
                    className={`px-5 py-2 text-xs rounded-full transition-all cursor-pointer ${
                      pricingTab === 'web'
                        ? 'font-bold bg-white text-neutral-900 shadow-xs'
                        : 'font-semibold text-neutral-600 hover:text-neutral-900'
                    }`}
                  >
                    Website Development
                  </button>
                  <button
                    type="button"
                    onClick={() => setPricingTab('app')}
                    className={`px-5 py-2 text-xs rounded-full transition-all cursor-pointer ${
                      pricingTab === 'app'
                        ? 'font-bold bg-white text-neutral-900 shadow-xs'
                        : 'font-semibold text-neutral-600 hover:text-neutral-900'
                    }`}
                  >
                    Mobile Application
                  </button>
                  <button
                    type="button"
                    onClick={() => setPricingTab('ads')}
                    className={`px-5 py-2 text-xs rounded-full transition-all cursor-pointer ${
                      pricingTab === 'ads'
                        ? 'font-bold bg-white text-neutral-900 shadow-xs'
                        : 'font-semibold text-neutral-600 hover:text-neutral-900'
                    }`}
                  >
                    Digital Marketing
                  </button>
                </div>
              </div>
            </div>

            {/* 3 Tier Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              {pricingData[pricingTab].map((item, idx) => (
                <div
                  key={idx}
                  className={`bg-white rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all ${
                    item.isPopular
                      ? 'border-2 border-[#FF5C28] shadow-xl relative transform md:-translate-y-2'
                      : 'border border-neutral-200/80 shadow-card hover:border-orange-200'
                  }`}
                >
                  {item.isPopular && (
                    <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 bg-[#FF5C28] text-white text-[11px] font-bold px-3.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                      Paling Populer
                    </div>
                  )}

                  <div>
                    <span
                      className={`text-xs font-bold uppercase tracking-wider ${
                        item.isPopular ? 'text-[#FF5C28]' : 'text-neutral-400'
                      }`}
                    >
                      {item.tier}
                    </span>
                    <div className="mt-3 flex items-baseline">
                      <span className="text-3xl font-extrabold text-neutral-900">{item.price}</span>
                      <span className="text-xs text-neutral-400 ml-1.5">{item.unit}</span>
                    </div>
                    <p className="text-xs text-neutral-500 mt-2">{item.desc}</p>

                    <a
                      href={getWhatsAppUrl(item.ctaContext as any, `${item.tier} (${item.price})`)}
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

                    {/* Checklist */}
                    <div className="mt-6 pt-6 border-t border-neutral-100 space-y-2.5 text-xs text-neutral-600">
                      {item.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-[#FF5C28] shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-neutral-100 text-[11px] text-neutral-400 text-center">
                    {item.time}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================
            7. FINAL LEAD CAPTURE & CTA (Alur Kerja, Form Kontak, FAQ, Dark CTA)
        ======================================================== */}
        {/* Getting Started 3-Step Process */}
        <section id="alur-kerja" className="max-w-4xl mx-auto px-4 sm:px-6 mt-28 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF5F0] border border-orange-200/50 text-[#EA4510] text-xs font-semibold mb-3">
            <Route className="w-3.5 h-3.5" />
            <span>Alur Kerja Rapi</span>
          </div>

          <h2 className="text-3xl font-extrabold text-neutral-900 tracking-tight">
            Tiga Langkah Mudah Memulai Proyek
          </h2>
          <p className="text-neutral-500 text-sm mt-2">
            Transparan dari tahap perumusan ide sampai produk live siap menghasilkan omzet.
          </p>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            <div className="bg-white rounded-3xl p-6 border border-neutral-200/70 shadow-card flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-[#FFF5F0] text-[#EA4510] font-extrabold text-sm flex items-center justify-center border border-orange-200 mb-4">
                01
              </div>
              <h3 className="text-sm font-bold text-neutral-900">Discovery &amp; Konsultasi</h3>
              <p className="text-xs text-neutral-500 mt-2 leading-relaxed">
                Sampaikan visi, kendala operasional, dan target bisnis Anda. Kami buatkan road-map teknis serta estimasi investasi.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-neutral-200/70 shadow-card flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-[#FF5C28] text-white font-extrabold text-sm flex items-center justify-center shadow-glow mb-4">
                02
              </div>
              <h3 className="text-sm font-bold text-neutral-900">Desain UI &amp; Koding</h3>
              <p className="text-xs text-neutral-500 mt-2 leading-relaxed">
                Tim kami menyusun prototipe interaktif di Figma, lalu diimplementasikan menjadi aplikasi kencang melalui sprint mingguan.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-neutral-200/70 shadow-card flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-[#FFF5F0] text-[#EA4510] font-extrabold text-sm flex items-center justify-center border border-orange-200 mb-4">
                03
              </div>
              <h3 className="text-sm font-bold text-neutral-900">Peluncuran &amp; Scaling</h3>
              <p className="text-xs text-neutral-500 mt-2 leading-relaxed">
                Pengujian menyeluruh (QA), rilis ke server produksi Vercel / App Store, dan aktivasi campaign digital marketing.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="max-w-3xl mx-auto px-4 sm:px-6 mt-28">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF5F0] border border-orange-200/50 text-[#EA4510] text-xs font-semibold mb-3">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Tanya Jawab</span>
            </div>
            <h2 className="text-3xl font-extrabold text-neutral-900 tracking-tight">
              Pertanyaan yang Sering Diajukan
            </h2>
            <p className="text-neutral-500 text-sm mt-1">Semua hal yang perlu Anda ketahui sebelum bermitra bersama kami.</p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-neutral-200/80 overflow-hidden shadow-xs transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between text-xs sm:text-sm font-bold text-neutral-900 hover:text-[#FF5C28] cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {openFaq === idx ? (
                    <Minus className="w-4 h-4 text-[#FF5C28] shrink-0" />
                  ) : (
                    <Plus className="w-4 h-4 text-neutral-400 shrink-0" />
                  )}
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-4 text-xs text-neutral-500 leading-relaxed animate-in fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Lead Capture Form Section */}
        <section id="konsultasi" className="max-w-xl mx-auto px-4 sm:px-6 mt-28 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF5F0] border border-orange-200/50 text-[#EA4510] text-xs font-semibold mb-3">
            <MailCheck className="w-3.5 h-3.5" />
            <span>Konsultasi Proyek</span>
          </div>

          <h2 className="text-3xl font-extrabold text-neutral-900 tracking-tight">
            Klaim Diskusi &amp; Audit Website Gratis
          </h2>
          <p className="text-neutral-500 text-xs sm:text-sm mt-2">
            Isi formulir singkat ini, tim konsultan senior kami akan menganalisis kebutuhan Anda dan mengirimkan proposal dalam 24 jam.
          </p>

          <div className="mt-8 bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/80 shadow-card text-left">
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">Nama Lengkap</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Budi Pratama"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full text-xs px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#FF5C28] focus:border-transparent transition-all bg-neutral-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">Alamat Email Bisnis</label>
                <input
                  type="email"
                  required
                  placeholder="budi@perusahaan.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full text-xs px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#FF5C28] focus:border-transparent transition-all bg-neutral-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">Layanan yang Dibutuhkan</label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full text-xs px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#FF5C28] focus:border-transparent transition-all bg-neutral-50/50"
                >
                  <option value="web">Pembuatan Website Baru / Redesign (Next.js &amp; Custom Dashboard)</option>
                  <option value="app">Pengembangan Mobile App (iOS / Android)</option>
                  <option value="marketing">Digital Marketing (Meta Ads, Google, SEO)</option>
                  <option value="all">Solusi Komprehensif (Web + App + Marketing)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">Ceritakan Singkat Rencana Anda</label>
                <textarea
                  rows={3}
                  placeholder="Jelaskan kebutuhan fitur atau target yang ingin dicapai..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full text-xs px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#FF5C28] focus:border-transparent transition-all bg-neutral-50/50"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#FF5C28] hover:bg-[#EA4510] text-white font-bold text-xs rounded-full shadow-glow transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer"
              >
                Kirim Permintaan Konsultasi
              </button>

              <p className="text-[11px] text-center text-neutral-400 mt-2">
                Privasi Anda terjamin. Kami tidak pernah membagikan email atau mengirim spam.
              </p>
            </form>
          </div>
        </section>

        {/* Dark Capsule Final CTA Card */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 mt-28">
          <div className="bg-[#121214] rounded-3xl p-8 sm:p-12 text-center text-white relative overflow-hidden shadow-2xl border border-neutral-800">
            {/* Subtle Glow Effect */}
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#FF5C28]/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-xl mx-auto space-y-4">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Siap Membangun Solusi Digital Terbaik Anda Hari Ini?
              </h2>
              <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
                Diskusikan ide Anda bersama lead developer dan digital marketer kami. Dapatkan saran arsitektur tanpa komitmen awal.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href="#konsultasi"
                  className="w-full sm:w-auto px-8 py-3 bg-[#FF5C28] hover:bg-[#EA4510] text-white font-bold text-xs rounded-full shadow-glow transition-all"
                >
                  Jadwalkan Konsultasi Sekarang
                </a>
                <a
                  href={getWhatsAppUrl('general')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded-full border border-white/15 transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  Chat via WhatsApp
                </a>
              </div>

              <div className="pt-4 flex items-center justify-center gap-6 text-[11px] text-neutral-400">
                <span className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#FF5C28]" /> Tanpa Kontrak Mengikat
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#FF5C28]" /> NDA &amp; Proteksi Ide
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ========================================================
          FOOTER (Colophon & Copyright)
      ======================================================== */}
      <footer className="bg-white border-t border-neutral-200/80 py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center space-y-6">
          {/* Brand Logo Center */}
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#FF5C28] to-[#EA4510] flex items-center justify-center text-white font-black text-lg shadow-glow">
              M
            </div>
            <span className="font-extrabold tracking-tight text-xl text-neutral-900">
              MarketingCode<span className="text-[#FF5C28]">.ID</span>
            </span>
          </div>

          <p className="text-xs text-neutral-500 max-w-sm">
            Membantu wirausahawan, agensi, dan perusahaan bertumbuh pesat dengan teknologi web modern, aplikasi mobile, dan strategi pemasaran konversi tinggi.
          </p>

          {/* Pill Nav Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-neutral-600">
            <a href="#web-services" className="hover:text-[#FF5C28] transition-colors">Layanan Utama</a>
            <a href="#akselerasi" className="hover:text-[#FF5C28] transition-colors">Skalakan Bisnis</a>
            <Link href="/portfolio" className="hover:text-[#FF5C28] transition-colors">Portofolio</Link>
            <Link href="/blog" className="hover:text-[#FF5C28] transition-colors">Blog</Link>
            <a href="#harga" className="hover:text-[#FF5C28] transition-colors">Investasi</a>
            <a href="#faq" className="hover:text-[#FF5C28] transition-colors">FAQ</a>
          </div>

          {/* Social Media Icons */}
          <div className="flex items-center gap-4 text-neutral-400">
            <a
              href="#"
              className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center hover:text-[#FF5C28] hover:border-[#FF5C28] transition-colors"
              aria-label="Instagram"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center hover:text-[#FF5C28] hover:border-[#FF5C28] transition-colors"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center hover:text-[#FF5C28] hover:border-[#FF5C28] transition-colors"
              aria-label="GitHub"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
          </div>

          <div className="pt-4 border-t border-neutral-100 w-full flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-400">
            <span>&copy; 2026 MarketingCode.ID Digital Agency. Hak Cipta Dilindungi.</span>
            <div className="flex gap-4 mt-2 sm:mt-0">
              <a href="#" className="hover:underline">Kebijakan Privasi</a>
              <a href="#" className="hover:underline">Syarat &amp; Ketentuan</a>
            </div>
          </div>
        </div>
      </footer>

      {/* ========================================================
          VIDEO DEMO MODAL DIALOG
      ======================================================== */}
      {videoModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setVideoModalOpen(false)}
        >
          <div
            className="bg-neutral-900 rounded-3xl max-w-2xl w-full p-4 border border-white/10 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setVideoModalOpen(false)}
              className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-white text-neutral-900 flex items-center justify-center font-bold shadow-lg hover:bg-neutral-200 cursor-pointer"
              aria-label="Tutup Video Modal"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="aspect-video bg-black rounded-2xl flex flex-col items-center justify-center text-center p-6 text-white">
              <Film className="w-12 h-12 text-[#FF5C28] mb-3" />
              <h4 className="text-base font-bold">Video Showreel MarketingCode.ID</h4>
              <p className="text-xs text-neutral-400 mt-1 max-w-md">
                Cuplikan sprint desain UI/UX, pengkodean backend Next.js 16 &amp; dashboard custom, serta live tracking dashboard iklan Meta &amp; Google.
              </p>
              <span className="mt-4 px-3 py-1 bg-white/10 rounded-full text-[10px] text-neutral-300">
                Durasi: 1 Menit 45 Detik
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          NOTIFICATION TOAST BOX
      ======================================================== */}
      <div
        className={`fixed bottom-6 right-6 z-50 bg-white border border-emerald-200 text-neutral-800 p-4 rounded-2xl shadow-xl flex items-center gap-3 transition-all duration-300 ${
          toastOpen ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0 pointer-events-none'
        }`}
      >
        <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
          <Check className="w-4 h-4" />
        </div>
        <div>
          <h5 className="text-xs font-bold text-neutral-900">Permintaan Terkirim!</h5>
          <p className="text-[11px] text-neutral-500">Membuka WhatsApp untuk terhubung dengan konsultan senior...</p>
        </div>
      </div>
    </div>
  )
}
