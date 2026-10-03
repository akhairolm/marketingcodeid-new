'use client'

import React, { useState } from 'react'
import {
  Layers,
  Menu,
  X,
  ArrowRight,
  CheckCircle2,
  Play,
  Sparkles,
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
} from 'lucide-react'
import { getWhatsAppUrl } from '@/lib/whatsapp'
import { FloatingWhatsApp } from '@/components/common/FloatingWhatsApp'

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

export default function HomePage() {
  // Mobile Menu State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Video Modal State
  const [videoModalOpen, setVideoModalOpen] = useState(false)

  // Pricing Tab Filter State
  const [pricingTab, setPricingTab] = useState<'web' | 'app' | 'ads'>('web')

  // FAQ Accordion State (single open or multiple)
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

    const waText = `Halo NexaCraft / MarketingCode ID, saya ${formData.name} (${formData.email}) ingin konsultasi terkait ${serviceName}. Detail rencana: ${formData.notes || '-'}`

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
          'Full Custom Tech Stack (Node/Laravel/Next)',
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
          TOP FLOATING CAPSULE NAVIGATION (Sesuai Referensi)
      ======================================================== */}
      <header className="fixed top-5 inset-x-0 z-50 flex justify-center px-4">
        <nav className="w-full max-w-4xl bg-[#1A1A1E]/90 backdrop-blur-md text-white px-5 py-2.5 rounded-full flex items-center justify-between shadow-2xl border border-white/10 transition-all duration-300">
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-full bg-[#FF5C28] flex items-center justify-center text-white shadow-glow group-hover:scale-105 transition-transform">
              <Layers className="w-4 h-4" />
            </div>
            <span className="font-bold tracking-tight text-base text-white">
              Nexa<span className="text-[#FF5C28]">Craft</span>
            </span>
          </a>

          {/* Desktop Menu Links */}
          <div className="hidden md:flex items-center gap-7 text-xs font-medium tracking-wide text-neutral-300">
            <a href="#layanan" className="hover:text-white transition-colors">Layanan</a>
            <a href="#fitur" className="hover:text-white transition-colors">Keunggulan</a>
            <a href="#alur-kerja" className="hover:text-white transition-colors">Cara Kerja</a>
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
              className="md:hidden text-neutral-300 hover:text-white p-1"
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
            href="#layanan"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 hover:text-[#FF5C28] transition-colors"
          >
            Layanan
          </a>
          <a
            href="#fitur"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 hover:text-[#FF5C28] transition-colors"
          >
            Keunggulan
          </a>
          <a
            href="#alur-kerja"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 hover:text-[#FF5C28] transition-colors"
          >
            Cara Kerja
          </a>
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
      <main className="relative bg-grid-pattern pt-32 pb-20 overflow-hidden">
        {/* ========================================================
            HERO SECTION
        ======================================================== */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 text-center pt-8">
          {/* Social Proof Badge with Avatars */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-neutral-200/80 shadow-sm mb-6 hover:border-orange-200 transition-colors">
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

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#111827] tracking-tight leading-[1.15] max-w-4xl mx-auto">
            Kembangkan Bisnis Anda Melalui <span className="text-[#FF5C28]">Website</span>,{' '}
            <span className="text-[#FF5C28]">Aplikasi</span> &{' '}
            <span className="text-[#FF5C28]">Digital Marketing</span>
          </h1>

          {/* Subheadline */}
          <p className="mt-6 text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed font-normal">
            Kami merancang ekosistem digital performa tinggi: dari arsitektur kode modern, mobile app yang intuitif, hingga strategi akuisisi pelanggan berbasis konversi nyata.
          </p>

          {/* CTA Button & Hand-drawn Indicator */}
          <div className="mt-8 flex flex-col items-center justify-center relative">
            <a
              href="#konsultasi"
              className="inline-flex items-center justify-center px-8 py-3.5 text-sm sm:text-base font-semibold text-white bg-[#FF5C28] hover:bg-[#EA4510] rounded-full shadow-glow transition-all duration-300 transform hover:-translate-y-1"
            >
              <span>Mulai Konsultasi Gratis</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </a>

            {/* Social Proof Microtext */}
            <div className="mt-3 flex items-center gap-1.5 text-xs text-neutral-500">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>Estimasi proposal & audit arsitektur dalam waktu 24 jam kerja</span>
            </div>
          </div>

          {/* Hero Video / Interactive Showcase Card */}
          <div className="mt-12 relative max-w-4xl mx-auto">
            <div className="relative bg-neutral-900 rounded-3xl overflow-hidden shadow-2xl border border-neutral-200/80 aspect-[16/9] sm:aspect-[21/10] group">
              {/* Background Cover Mockup */}
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80"
                alt="Agency Team Working"
                className="w-full h-full object-cover opacity-75 group-hover:scale-105 transition-transform duration-700 ease-out"
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
              <div className="absolute bottom-5 left-5 right-5 flex flex-wrap items-center justify-between text-white text-xs gap-3">
                <div className="flex items-center gap-2 bg-black/50 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Sedang Mengerjakan 12 Proyek Aktif</span>
                </div>
                <div className="hidden sm:flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
                  <span>Stack: Next.js 16 • Payload CMS 3 • Meta & Google Ads</span>
                </div>
              </div>
            </div>

            {/* Center Floating Brand Icon Beneath Video */}
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
              <div className="w-12 h-12 rounded-full bg-white shadow-md border border-neutral-100 flex items-center justify-center text-[#FF5C28]">
                <Sparkles className="w-6 h-6" />
              </div>
            </div>
          </div>

          {/* 4 Core Pillars Strip */}
          <div id="layanan" className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 pt-8">
            {/* Item 1 */}
            <div className="flex flex-col items-center text-center p-4 rounded-2xl hover:bg-white/80 transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-[#FFF5F0] border border-orange-200/60 flex items-center justify-center text-[#FF5C28] mb-3 shadow-sm group-hover:scale-110 transition-transform">
                <Code2 className="w-6 h-6" />
              </div>
              <h2 className="text-sm font-bold text-neutral-900 leading-snug">Web Development</h2>
              <p className="text-xs text-neutral-500 mt-1">Next.js 16 & Payload CMS 3</p>
            </div>

            {/* Item 2 */}
            <div className="flex flex-col items-center text-center p-4 rounded-2xl hover:bg-white/80 transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-[#FFF5F0] border border-orange-200/60 flex items-center justify-center text-[#FF5C28] mb-3 shadow-sm group-hover:scale-110 transition-transform">
                <Smartphone className="w-6 h-6" />
              </div>
              <h2 className="text-sm font-bold text-neutral-900 leading-snug">Mobile App Dev</h2>
              <p className="text-xs text-neutral-500 mt-1">iOS & Android Hybrid</p>
            </div>

            {/* Item 3 */}
            <div className="flex flex-col items-center text-center p-4 rounded-2xl hover:bg-white/80 transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-[#FFF5F0] border border-orange-200/60 flex items-center justify-center text-[#FF5C28] mb-3 shadow-sm group-hover:scale-110 transition-transform">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h2 className="text-sm font-bold text-neutral-900 leading-snug">Digital Marketing</h2>
              <p className="text-xs text-neutral-500 mt-1">Meta & Google Ads CAPI</p>
            </div>

            {/* Item 4 */}
            <div className="flex flex-col items-center text-center p-4 rounded-2xl hover:bg-white/80 transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-[#FFF5F0] border border-orange-200/60 flex items-center justify-center text-[#FF5C28] mb-3 shadow-sm group-hover:scale-110 transition-transform">
                <Palette className="w-6 h-6" />
              </div>
              <h2 className="text-sm font-bold text-neutral-900 leading-snug">UI/UX & Branding</h2>
              <p className="text-xs text-neutral-500 mt-1">Konversi & Estetika Tinggi</p>
            </div>
          </div>
        </section>

        {/* ========================================================
            METRICS COUNTER SECTION
        ======================================================== */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 mt-24 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight max-w-xl mx-auto">
            Kinerja Teruji Membantu Ekosistem Bisnis Melejit
          </h2>
          <p className="text-neutral-500 text-sm mt-2">Dukungan teknologi solid & eksekusi pemasaran presisi</p>

          <div className="mt-8 bg-white border border-neutral-200/70 rounded-3xl p-6 sm:p-8 shadow-card grid grid-cols-1 sm:grid-cols-3 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-neutral-100">
            <div className="flex flex-col items-center py-2 sm:py-0">
              <span className="text-3xl sm:text-4xl font-extrabold text-neutral-900">180+</span>
              <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mt-1">Website & App Dirilis</span>
            </div>

            <div className="flex flex-col items-center py-2 sm:py-0">
              <span className="text-3xl sm:text-4xl font-extrabold text-neutral-900">Rp 45M+</span>
              <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mt-1">GMV Klien Tergenerate</span>
            </div>

            <div className="flex flex-col items-center py-2 sm:py-0">
              <span className="text-3xl sm:text-4xl font-extrabold text-neutral-900">98.6%</span>
              <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mt-1">Kepuasan & Retensi Klien</span>
            </div>
          </div>
        </section>

        {/* ========================================================
            FEATURE SHOWCASE 1: WEB & APP DEV UI SIMULATION
        ======================================================== */}
        <section id="fitur" className="max-w-5xl mx-auto px-4 sm:px-6 mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: Interactive UI Card Mockup */}
            <div className="lg:col-span-6 bg-gradient-to-br from-neutral-100 to-neutral-200/60 p-6 rounded-3xl border border-neutral-200/80 shadow-soft">
              <div className="bg-white rounded-2xl p-5 shadow-card border border-neutral-100">
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
                    <p className="text-[11px] text-neutral-500 mt-1">Restrukturisasi cache & CDN Next.js untuk loading time &lt; 0.8s.</p>
                    <div className="mt-3 flex items-center justify-between text-[11px] text-neutral-400">
                      <div className="flex -space-x-1.5">
                        <span className="w-5 h-5 rounded-full bg-[#FF5C28] text-white flex items-center justify-center text-[9px] font-bold">FE</span>
                        <span className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center text-[9px] font-bold">BE</span>
                      </div>
                      <span>4 Subtasks selesai</span>
                    </div>
                  </div>

                  {/* Push Notification Simulated Pill */}
                  <div className="flex items-center gap-3 p-3 bg-white border border-neutral-200/70 rounded-xl shadow-sm">
                    <div className="w-8 h-8 rounded-full bg-[#FF5C28] flex items-center justify-center text-white shrink-0">
                      <BellRing className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-neutral-800 truncate">Mobile App iOS & Android Ready</p>
                      <p className="text-[10px] text-neutral-400">Build stabil siap diunggah ke Play Store & App Store</p>
                    </div>
                    <span className="text-[10px] text-neutral-400">Just now</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Content Description */}
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF5F0] border border-orange-200/50 text-[#EA4510] text-xs font-semibold">
                <Code className="w-3.5 h-3.5" />
                <span>Engineering & Design Excellence</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight leading-snug">
                Teknologi Modular yang Skalabel, Cepat & Aman
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Kami tidak menggunakan template murahan. Setiap baris kode dirancang spesifik untuk kecepatan loading tinggi, proteksi keamanan data, dan siap menangani jutaan pengunjung tanpa lag.
              </p>

              {/* Feature Pills */}
              <div className="pt-2 flex flex-wrap gap-2">
                <span className="px-3 py-1.5 bg-white border border-neutral-200 rounded-full text-xs font-medium text-neutral-700 flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#FF5C28]" /> Next.js 16 & React 19
                </span>
                <span className="px-3 py-1.5 bg-white border border-neutral-200 rounded-full text-xs font-medium text-neutral-700 flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#FF5C28]" /> Payload CMS 3 Native
                </span>
                <span className="px-3 py-1.5 bg-white border border-neutral-200 rounded-full text-xs font-medium text-neutral-700 flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#FF5C28]" /> Supabase Managed Postgres
                </span>
                <span className="px-3 py-1.5 bg-white border border-neutral-200 rounded-full text-xs font-medium text-neutral-700 flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#FF5C28]" /> 100% Client Source Code Ownership
                </span>
              </div>

              <div className="pt-3">
                <a
                  href="#konsultasi"
                  className="inline-flex items-center text-xs font-bold text-white bg-[#FF5C28] hover:bg-[#EA4510] px-5 py-2.5 rounded-full transition-all shadow-sm"
                >
                  Jelajahi Solusi Teknis
                  <ChevronRight className="w-4 h-4 ml-1" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            FEATURE SHOWCASE 2: DIGITAL MARKETING & DATA ROI
        ======================================================== */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 mt-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: Text Content */}
            <div className="lg:col-span-6 space-y-4 order-2 lg:order-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF5F0] border border-orange-200/50 text-[#EA4510] text-xs font-semibold">
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Growth & Conversion</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight leading-snug">
                Kampanye Berbasis ROI: Bukan Sekadar Klik, Tapi Omzet
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Lupakan anggaran iklan yang terbuang sia-sia. Spesialis digital marketing kami memanfaatkan tracking presisi, A/B testing copywriting, dan landing page conversion-focused untuk mengonversi prospek menjadi pembeli setia.
              </p>

              {/* 4 Bullet Mini-Cards */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 bg-white border border-neutral-200/80 rounded-2xl flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-[#FFF5F0] flex items-center justify-center text-[#FF5C28] shrink-0">
                    <Target className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-neutral-800">Meta & Google Ads</span>
                </div>

                <div className="p-3 bg-white border border-neutral-200/80 rounded-2xl flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-[#FFF5F0] flex items-center justify-center text-[#FF5C28] shrink-0">
                    <Search className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-neutral-800">Organic SEO Rank #1</span>
                </div>

                <div className="p-3 bg-white border border-neutral-200/80 rounded-2xl flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-[#FFF5F0] flex items-center justify-center text-[#FF5C28] shrink-0">
                    <Filter className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-neutral-800">Funnel Sales Audit</span>
                </div>

                <div className="p-3 bg-white border border-neutral-200/80 rounded-2xl flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-[#FFF5F0] flex items-center justify-center text-[#FF5C28] shrink-0">
                    <PieChart className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-neutral-800">Transparent Analytics</span>
                </div>
              </div>
            </div>

            {/* Right: Visual Growth Chart Mockup */}
            <div className="lg:col-span-6 bg-gradient-to-br from-neutral-100 to-neutral-200/60 p-6 rounded-3xl border border-neutral-200/80 shadow-soft order-1 lg:order-2">
              <div className="bg-white rounded-2xl p-5 shadow-card border border-neutral-100">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">Total Penjualan Klien</span>
                    <h4 className="text-2xl font-black text-neutral-900 mt-0.5">Rp 842.500.000</h4>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-200">
                      <TrendingUp className="w-3 h-3 mr-1" /> +320% ROI
                    </span>
                  </div>
                </div>

                {/* Bar Chart Simulation with Orange Accents */}
                <div className="mt-6 flex items-end justify-between h-32 pt-4 px-2 gap-2 border-b border-neutral-100">
                  <div className="w-full flex flex-col items-center gap-1.5">
                    <div className="w-full bg-orange-100 rounded-t-md h-12" />
                    <span className="text-[10px] text-neutral-400">Bln 1</span>
                  </div>
                  <div className="w-full flex flex-col items-center gap-1.5">
                    <div className="w-full bg-orange-200 rounded-t-md h-16" />
                    <span className="text-[10px] text-neutral-400">Bln 2</span>
                  </div>
                  <div className="w-full flex flex-col items-center gap-1.5">
                    <div className="w-full bg-orange-300 rounded-t-md h-20" />
                    <span className="text-[10px] text-neutral-400">Bln 3</span>
                  </div>
                  <div className="w-full flex flex-col items-center gap-1.5">
                    <div className="w-full bg-orange-400 rounded-t-md h-24" />
                    <span className="text-[10px] text-neutral-400">Bln 4</span>
                  </div>
                  <div className="w-full flex flex-col items-center gap-1.5">
                    <div className="w-full bg-[#FF5C28] rounded-t-md h-28 shadow-glow" />
                    <span className="text-[10px] font-bold text-[#EA4510]">Bln 5</span>
                  </div>
                </div>

                {/* Footer metric tag */}
                <div className="mt-4 flex items-center justify-between text-xs text-neutral-500">
                  <span>Biaya Akuisisi (CAC): <strong>Turun 42%</strong></span>
                  <a
                    href={getWhatsAppUrl('ads')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#FF5C28] font-semibold flex items-center gap-1 hover:underline"
                  >
                    Lihat Laporan Studi Kasus <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            PRICING / SERVICE PACKAGES SECTION
        ======================================================== */}
        <section id="harga" className="max-w-5xl mx-auto px-4 sm:px-6 mt-28 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF5F0] border border-orange-200/50 text-[#EA4510] text-xs font-semibold mb-3">
            <Tag className="w-3.5 h-3.5" />
            <span>Pilihan Paket Fleksibel</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
            Paket Investasi Transparan Sesuai Skala Bisnis
          </h2>
          <p className="text-neutral-500 text-sm mt-2 max-w-lg mx-auto">
            Pilih paket yang paling pas untuk akselerasi bisnis Anda. Tersedia garansi performa dan purna jual.
          </p>

          {/* Category Filter Tabs */}
          <div className="mt-8 flex justify-center">
            <div className="bg-neutral-100 p-1.5 rounded-full inline-flex border border-neutral-200">
              <button
                type="button"
                onClick={() => setPricingTab('web')}
                className={`px-5 py-2 text-xs rounded-full transition-all cursor-pointer ${
                  pricingTab === 'web'
                    ? 'font-bold bg-white text-neutral-900 shadow-sm'
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
                    ? 'font-bold bg-white text-neutral-900 shadow-sm'
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
                    ? 'font-bold bg-white text-neutral-900 shadow-sm'
                    : 'font-semibold text-neutral-600 hover:text-neutral-900'
                }`}
              >
                Digital Marketing
              </button>
            </div>
          </div>

          {/* 3 Tier Pricing Cards */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
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
        </section>

        {/* ========================================================
            GETTING STARTED 3-STEP PROCESS
        ======================================================== */}
        <section id="alur-kerja" className="max-w-4xl mx-auto px-4 sm:px-6 mt-28 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF5F0] border border-orange-200/50 text-[#EA4510] text-xs font-semibold mb-3">
            <Route className="w-3.5 h-3.5" />
            <span>Alur Kerja Rapi</span>
          </div>

          <h2 className="text-3xl font-extrabold text-neutral-900 tracking-tight">
            Tiga Langkah Mudah Memulai Proyek
          </h2>
          <p className="text-neutral-500 text-sm mt-2">
            Transparan dari tahap perumusan ide sampai produk live siap menghasilkan.
          </p>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Step 1 */}
            <div className="bg-white rounded-3xl p-6 border border-neutral-200/70 shadow-card flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-[#FFF5F0] text-[#EA4510] font-extrabold text-sm flex items-center justify-center border border-orange-200 mb-4">
                01
              </div>
              <h3 className="text-sm font-bold text-neutral-900">Discovery & Konsultasi</h3>
              <p className="text-xs text-neutral-500 mt-2 leading-relaxed">
                Sampaikan visi, kendala operasional, dan target bisnis Anda. Kami buatkan road-map teknis serta estimasi investasi.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-3xl p-6 border border-neutral-200/70 shadow-card flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-[#FF5C28] text-white font-extrabold text-sm flex items-center justify-center shadow-glow mb-4">
                02
              </div>
              <h3 className="text-sm font-bold text-neutral-900">Desain UI & Koding</h3>
              <p className="text-xs text-neutral-500 mt-2 leading-relaxed">
                Tim kami menyusun prototipe interaktif di Figma, lalu diimplementasikan menjadi aplikasi kencang melalui sprint mingguan.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-3xl p-6 border border-neutral-200/70 shadow-card flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-[#FFF5F0] text-[#EA4510] font-extrabold text-sm flex items-center justify-center border border-orange-200 mb-4">
                03
              </div>
              <h3 className="text-sm font-bold text-neutral-900">Peluncuran & Scaling</h3>
              <p className="text-xs text-neutral-500 mt-2 leading-relaxed">
                Pengujian menyeluruh (QA), rilis ke server produksi atau App Store, dan aktivasi campaign digital marketing.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================
            CONSULTATION FORM SECTION
        ======================================================== */}
        <section id="konsultasi" className="max-w-xl mx-auto px-4 sm:px-6 mt-28 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF5F0] border border-orange-200/50 text-[#EA4510] text-xs font-semibold mb-3">
            <MailCheck className="w-3.5 h-3.5" />
            <span>Konsultasi Proyek</span>
          </div>

          <h2 className="text-3xl font-extrabold text-neutral-900 tracking-tight">
            Klaim Diskusi & Audit Website Gratis
          </h2>
          <p className="text-neutral-500 text-xs sm:text-sm mt-2">
            Isi form singkat ini, tim konsultan senior kami akan menganalisis kebutuhan Anda dan mengirimkan proposal dalam 24 jam.
          </p>

          {/* Clean White Form Box */}
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
                  <option value="web">Pembuatan Website Baru / Redesign (Next.js & Payload)</option>
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

        {/* ========================================================
            FREQUENTLY ASKED QUESTIONS
        ======================================================== */}
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
                className="bg-white rounded-2xl border border-neutral-200/80 overflow-hidden shadow-sm transition-all"
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

        {/* ========================================================
            DARK CAPSULE CTA CARD (Sesuai Referensi)
        ======================================================== */}
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
                  <Check className="w-3.5 h-3.5 text-[#FF5C28]" /> NDA & Proteksi Ide
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ========================================================
          FOOTER (Sesuai Referensi)
      ======================================================== */}
      <footer className="bg-white border-t border-neutral-200/80 py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center space-y-6">
          {/* Brand Icon Center */}
          <div className="w-10 h-10 rounded-full bg-[#FF5C28] flex items-center justify-center text-white shadow-glow">
            <Layers className="w-5 h-5" />
          </div>

          <p className="text-xs text-neutral-500 max-w-sm">
            Membantu wirausahawan, agensi, dan perusahaan bertumbuh pesat dengan teknologi web modern, aplikasi mobile, dan strategi pemasaran konversi tinggi.
          </p>

          {/* Pill Nav Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-neutral-600">
            <a href="#layanan" className="hover:text-[#FF5C28] transition-colors">Layanan</a>
            <a href="#fitur" className="hover:text-[#FF5C28] transition-colors">Fitur</a>
            <a href="#harga" className="hover:text-[#FF5C28] transition-colors">Harga</a>
            <a href="#alur-kerja" className="hover:text-[#FF5C28] transition-colors">Proses</a>
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
            <span>&copy; 2026 NexaCraft Digital Agency (MarketingCode ID). Hak Cipta Dilindungi.</span>
            <div className="flex gap-4 mt-2 sm:mt-0">
              <a href="#" className="hover:underline">Kebijakan Privasi</a>
              <a href="#" className="hover:underline">Syarat & Ketentuan</a>
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
              <h4 className="text-base font-bold">Video Showreel NexaCraft Digital Agency</h4>
              <p className="text-xs text-neutral-400 mt-1 max-w-md">
                Cuplikan sprint desain UI/UX, pengkodean backend Next.js & Payload CMS, dan live tracking dashboard iklan Meta & Google.
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

      {/* Floating WhatsApp CTA */}
      <FloatingWhatsApp />
    </div>
  )
}
