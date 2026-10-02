import React from 'react'
import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { HeroBlueprint } from '@/components/home/HeroBlueprint'
import { FloatingWhatsApp } from '@/components/common/FloatingWhatsApp'
import { getWhatsAppUrl } from '@/lib/whatsapp'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  ArrowRight,
  ArrowDown,
  Check,
  ShieldCheck,
  Zap,
  Code2,
  Smartphone,
  LineChart,
  Terminal,
  MessageSquare,
  Sparkles,
} from 'lucide-react'

export const dynamic = 'force-dynamic'

interface FeaturedProject {
  title: string
  client: string
  category: string
  techStack: string[]
  description: string
  highlight: string
}

export default async function HomePage() {
  // Graceful Local API query (Fallback if Supabase DB is offline during setup)
  let isDbConnected = false

  try {
    const headers = await getHeaders()
    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })
    await payload.find({
      collection: 'users',
      limit: 1,
    })
    isDbConnected = true
  } catch (_err) {
    isDbConnected = false
  }

  const featuredProjects: FeaturedProject[] = [
    {
      title: 'Warehouse & Stock Inventory ERP',
      client: 'Distribusi Logistik B2B',
      category: 'Custom Web Application',
      techStack: ['Next.js 16', 'Payload CMS 3', 'Supabase PostgreSQL', 'Drizzle ORM'],
      description: 'Sistem pencatatan stok multi-rak real-time dengan nomor batch FIFO/LIFO, audit trail mutasi barang, dan dashboard visual low-stock alert.',
      highlight: '0ms Rekap Manual · 100% Data Integritas',
    },
    {
      title: 'High-Converting Brand Showcase & Product Catalog',
      client: 'Consumer Brand & Retail',
      category: 'Company Profile & E-Catalog',
      techStack: ['Next.js App Router', 'Tailwind CSS', 'Dynamic WhatsApp CTA', 'Vercel Edge'],
      description: 'Website katalog interaktif ultra-cepat dengan waktu muat 0.8 detik. Dilengkapi integrasi pesan WhatsApp otomatis sesuai produk yang dilihat pengunjung.',
      highlight: 'Score Lighthouse 99 · Conversion 3.4x',
    },
    {
      title: 'Client Service Portal & Booking Engine',
      client: 'Jasa Profesional & Konsultan',
      category: 'Web & Mobile Application',
      techStack: ['Next.js', 'React Server Actions', 'PostgreSQL', 'Cloudflare CDN'],
      description: 'Portal pemesanan jadwal konsultasi, pembayaran invoice, dan dashboard status pengerjaan proyek transparan yang dapat diakses klien.',
      highlight: 'Automated Client Onboarding',
    },
  ]

  const faqs = [
    {
      q: 'Berapa lama rata-rata pembuatan website atau aplikasi?',
      a: 'Untuk website company profile custom (Next.js 16 + Payload CMS 3) umumnya membutuhkan waktu 7 hingga 14 hari kerja. Untuk aplikasi web custom atau aplikasi mobile dengan kompleksitas lebih tinggi, berkisar antara 3 hingga 6 minggu.',
    },
    {
      q: 'Mengapa memilih Next.js & Payload daripada WordPress template?',
      a: 'WordPress menggunakan plugin pihak ketiga yang sering konflik, lambat, dan rentan celah keamanan. Next.js dan Payload CMS memberikan waktu muat instan (sub-detik), skor Google SEO sangat tinggi, dan CMS modern yang ringan tanpa beban plugin tidak penting.',
    },
    {
      q: 'Apakah saya mendapatkan seluruh source code proyek?',
      a: 'Ya, 100%. Seluruh source code proyek akan diserahkan dan dipush ke akun GitHub Anda. Kami tidak membatasi atau mengunci kepemilikan kode Anda (Zero Vendor Lock-in).',
    },
    {
      q: 'Apakah biaya deploy di Vercel dan Supabase mahal?',
      a: 'Untuk skala kecil hingga menengah, kuota gratis (free tier) Vercel dan Supabase sudah sangat mencukupi kebutuhan operasional harian. Biaya langganan hanya meningkat jika traffic website Anda sudah mencapai puluhan ribu pengunjung per bulan.',
    },
    {
      q: 'Bagaimana jika saya belum punya logo, tulisan, atau gambar produk?',
      a: 'Jangan khawatir. Kami membantu perapian struktur teks copywriting, pemilihan gambar lisensi resmi berkualitas tinggi, dan tata letak materi sehingga Anda tidak perlu pusing menyiapkan semuanya dari awal.',
    },
    {
      q: 'Bagaimana sistem pembayaran dan garansinya?',
      a: 'Sistem pembayaran bertahap (Down Payment 50% saat kesepakatan, dan pelunasan 50% setelah proyek selesai dan siap live). Kami memberikan garansi perbaikan bug dan pendampingan teknis gratis setelah serah terima.',
    },
  ]

  return (
    <div className="site-wrapper">
      <Navbar />

      <main className="main-content">
        {/* ========================================================
            HERO SECTION (Asymmetric Hallmark Cobalt Layout)
        ======================================================== */}
        <section className="hero-section">
          <div className="section-container hero-grid">
            <div className="hero-content">
              <div className="hero-eyebrow">
                <span className="eyebrow-symbol">●</span>
                <span className="eyebrow-text">MARKETINGCODE ID · BESPOKE DIGITAL AGENCY</span>
              </div>

              <h1 className="hero-title">
                Website Custom, Aplikasi Mobile, dan Iklan Berkonversi Tinggi.
              </h1>

              <p className="hero-lede">
                Kami membangun solusi digital kustom menggunakan <strong>Next.js 16 & Payload CMS 3</strong> untuk 
                pemilik bisnis dan instansi yang membutuhkan sistem cepat, kredibel, dan menjadi <strong>100% hak milik Anda</strong> tanpa biaya langganan software vendor perantara.
              </p>

              <div className="hero-cta-group">
                <Button asChild size="lg" className="btn-primary-cobalt">
                  <a
                    href={getWhatsAppUrl('general')}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>Mulai Konsultasi WhatsApp</span>
                    <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>

                <Button asChild variant="outline" size="lg" className="btn-secondary-hairline">
                  <a href="#services">
                    <span>Lihat Solusi Kami</span>
                    <ArrowDown className="w-4 h-4 ml-1.5" />
                  </a>
                </Button>
              </div>

              <div className="hero-trust-metrics">
                <div className="trust-item">
                  <span className="trust-dot live" />
                  <span className="trust-label">Direct Lead Dev Access (No Sales Pitch)</span>
                </div>
                <div className="trust-item">
                  <span className="trust-dot live" />
                  <span className="trust-label">100% Full Source Code Handover</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Blueprint Interactive Instrument */}
            <div className="hero-interactive">
              <HeroBlueprint />
            </div>
          </div>
        </section>

        {/* ========================================================
            PROBLEM-SOLUTION BRIDGES (Audience Specific)
        ======================================================== */}
        <section className="bridges-section">
          <div className="section-container">
            <div className="section-header-hairline">
              <span className="section-tag">01 / SIAPA YANG KAMI BANTU</span>
              <h2 className="section-title">Solusi Nyata untuk 3 Kebutuhan Kritis</h2>
            </div>

            <div className="bridges-grid">
              <Card className="bridge-card">
                <CardHeader className="p-0 mb-4">
                  <div className="bridge-num font-mono text-3xl font-bold text-[var(--color-accent)] mb-2">01</div>
                  <CardTitle className="bridge-title text-xl font-semibold">Punya Bisnis tapi Belum Memiliki Website</CardTitle>
                </CardHeader>
                <CardContent className="p-0 flex-1">
                  <CardDescription className="bridge-desc text-sm text-[var(--color-ink-muted)] leading-relaxed mb-6">
                    Calon klien Anda mencari kredibilitas di Google sebelum membeli. Kami bangunkan website berdesain premium, cepat, dan teroptimasi SEO agar bisnis Anda langsung terlihat berkelas dan profesional.
                  </CardDescription>
                </CardContent>
                <CardFooter className="p-0">
                  <a
                    href={getWhatsAppUrl('website')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bridge-link text-sm font-semibold text-[var(--color-accent)] inline-flex items-center gap-1 group"
                  >
                    <span>Konsultasi Pembuatan Website</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </CardFooter>
              </Card>

              <Card className="bridge-card">
                <CardHeader className="p-0 mb-4">
                  <div className="bridge-num font-mono text-3xl font-bold text-[var(--color-accent)] mb-2">02</div>
                  <CardTitle className="bridge-title text-xl font-semibold">Ingin Iklan Digital tapi Bingung Setup Teknis</CardTitle>
                </CardHeader>
                <CardContent className="p-0 flex-1">
                  <CardDescription className="bridge-desc text-sm text-[var(--color-ink-muted)] leading-relaxed mb-6">
                    Iklan bukan sekadar pasang budget lalu buang uang. Kami rancang funnel terpadu dari Meta Ads & Google Ads langsung terhubung ke WhatsApp bisnis Anda, lengkap dengan tracking Meta CAPI server-side anti-bocor.
                  </CardDescription>
                </CardContent>
                <CardFooter className="p-0">
                  <a
                    href={getWhatsAppUrl('ads')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bridge-link text-sm font-semibold text-[var(--color-accent)] inline-flex items-center gap-1 group"
                  >
                    <span>Konsultasi Strategi Ads & Funnel</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </CardFooter>
              </Card>

              <Card className="bridge-card">
                <CardHeader className="p-0 mb-4">
                  <div className="bridge-num font-mono text-3xl font-bold text-[var(--color-accent)] mb-2">03</div>
                  <CardTitle className="bridge-title text-xl font-semibold">Instansi & B2B yang Butuh Aplikasi Custom</CardTitle>
                </CardHeader>
                <CardContent className="p-0 flex-1">
                  <CardDescription className="bridge-desc text-sm text-[var(--color-ink-muted)] leading-relaxed mb-6">
                    Tidak memiliki tim developer internal? Kami menjadi mitra teknologi teknis Anda. Siap dengan kontrak kerja resmi (SPK/Invoice), arsitektur modular teruji, dan penyerahan kode sumber 100% ke pihak Anda.
                  </CardDescription>
                </CardContent>
                <CardFooter className="p-0">
                  <a
                    href={getWhatsAppUrl('government')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bridge-link text-sm font-semibold text-[var(--color-accent)] inline-flex items-center gap-1 group"
                  >
                    <span>Konsultasi Aplikasi Instansi</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* ========================================================
            THE BENTO GRID (Core Capabilities & Pillars)
        ======================================================== */}
        <section id="services" className="bento-section">
          <div className="section-container">
            <div className="section-header-hairline">
              <span className="section-tag">02 / KAPABILITAS UTAMA</span>
              <h2 className="section-title">Arsitektur Modern untuk Pertumbuhan Bisnis</h2>
              <p className="section-subtitle">
                Kami menolak penggunaan template siap pakai lambat seperti WordPress berat. Seluruh kode ditulis custom untuk menghasilkan skor performa tertinggi.
              </p>
            </div>

            <div className="bento-grid">
              {/* Tile 1: 2x2 Anchor (Web Custom) */}
              <Card className="bento-cell cell-2x2">
                <CardHeader className="p-0 mb-4">
                  <Badge variant="outline" className="w-fit text-[11px] font-mono tracking-wider text-[var(--color-accent)] border-[var(--color-accent)]/30 mb-2">
                    PILLAR UTAMA · WEB CUSTOM
                  </Badge>
                  <CardTitle className="cell-title text-2xl font-bold">Next.js 16 & Payload CMS 3 Architecture</CardTitle>
                  <CardDescription className="cell-desc text-sm text-[var(--color-ink-muted)] leading-relaxed">
                    Kombinasi fullstack terkini di dunia web engineering. Memberikan Anda website company profile berkecepatan instan (Lighthouse 95+) dengan CMS Admin Panel intuitif yang tertanam langsung tanpa perlu sewa hosting CMS terpisah.
                  </CardDescription>
                </CardHeader>

                <CardContent className="p-0">
                  <div className="cell-features-list flex flex-col gap-3 mb-6">
                    <div className="feature-item flex items-start gap-2.5 text-sm">
                      <Check className="w-4 h-4 text-[var(--color-accent)] shrink-0 mt-0.5" />
                      <span><strong>Server-Side Rendering (SSR) & ISR:</strong> Google mengindeks artikel Anda secara instan.</span>
                    </div>
                    <div className="feature-item flex items-start gap-2.5 text-sm">
                      <Check className="w-4 h-4 text-[var(--color-accent)] shrink-0 mt-0.5" />
                      <span><strong>Payload 3 Native CMS:</strong> Tulis artikel SEO dan kelola portofolio tanpa coding.</span>
                    </div>
                    <div className="feature-item flex items-start gap-2.5 text-sm">
                      <Check className="w-4 h-4 text-[var(--color-accent)] shrink-0 mt-0.5" />
                      <span><strong>Supabase PostgreSQL:</strong> Database relational cloud tangguh kelas enterprise.</span>
                    </div>
                    <div className="feature-item flex items-start gap-2.5 text-sm">
                      <Check className="w-4 h-4 text-[var(--color-accent)] shrink-0 mt-0.5" />
                      <span><strong>Zero Bloatware:</strong> Tidak ada plugin rapuh yang rawan dibobol hacker.</span>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="p-0 mt-auto">
                  <a
                    href={getWhatsAppUrl('website')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cell-link text-sm font-semibold text-[var(--color-accent)] inline-flex items-center gap-1 group"
                  >
                    <span>Diskusikan Proyek Website Custom</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </CardFooter>
              </Card>

              {/* Tile 2: 1x1 (Mobile Apps) */}
              <Card className="bento-cell cell-1x1">
                <CardHeader className="p-0 mb-3">
                  <Badge variant="outline" className="w-fit text-[11px] font-mono tracking-wider text-[var(--color-accent)] border-[var(--color-accent)]/30 mb-2">
                    APLIKASI MOBILE
                  </Badge>
                  <CardTitle className="cell-title text-xl font-bold">Cross-Platform iOS & Android</CardTitle>
                </CardHeader>
                <CardContent className="p-0 flex-1">
                  <p className="cell-desc text-sm text-[var(--color-ink-muted)] leading-relaxed mb-4">
                    Satu basis kode untuk hadir di Play Store dan App Store sekaligus. Animasi 60 FPS, push notification, dan integrasi backend realtime.
                  </p>
                </CardContent>
                <CardFooter className="p-0">
                  <a
                    href={getWhatsAppUrl('mobile')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cell-link text-sm font-semibold text-[var(--color-accent)] inline-flex items-center gap-1 group"
                  >
                    <span>Konsultasi Mobile App</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </CardFooter>
              </Card>

              {/* Tile 3: 1x1 (Digital Marketing) */}
              <Card className="bento-cell cell-1x1">
                <CardHeader className="p-0 mb-3">
                  <Badge variant="outline" className="w-fit text-[11px] font-mono tracking-wider text-[var(--color-accent)] border-[var(--color-accent)]/30 mb-2">
                    DIGITAL ADS ENGINE
                  </Badge>
                  <CardTitle className="cell-title text-xl font-bold">Meta & Google Ads Berkonversi</CardTitle>
                </CardHeader>
                <CardContent className="p-0 flex-1">
                  <p className="cell-desc text-sm text-[var(--color-ink-muted)] leading-relaxed mb-4">
                    Menjangkau calon pembeli yang benar-benar siap bayar. Funnel langsung diarahkan ke chat WhatsApp dengan tracking konversi terpasang akurat.
                  </p>
                </CardContent>
                <CardFooter className="p-0">
                  <a
                    href={getWhatsAppUrl('ads')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cell-link text-sm font-semibold text-[var(--color-accent)] inline-flex items-center gap-1 group"
                  >
                    <span>Diskusi Strategi Iklan</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </CardFooter>
              </Card>

              {/* Tile 4: 2x1 (Full Ownership) */}
              <Card className="bento-cell cell-2x1">
                <CardHeader className="p-0 mb-3">
                  <Badge variant="outline" className="w-fit text-[11px] font-mono tracking-wider text-[var(--color-accent)] border-[var(--color-accent)]/30 mb-2">
                    KEPEMILIKAN PENUH
                  </Badge>
                  <CardTitle className="cell-title text-xl font-bold">100% Hak Milik Source Code & Cloud Klien</CardTitle>
                </CardHeader>
                <CardContent className="p-0 flex-1">
                  <p className="cell-desc text-sm text-[var(--color-ink-muted)] leading-relaxed mb-4">
                    Tidak ada istilah Anda disandera oleh vendor. Repositori GitHub diserahkan ke akun Anda, akun Vercel dan Supabase atas nama Anda sendiri. Anda bebas mengembangkan sistem bersama siapa saja di masa depan.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="font-mono text-xs font-normal">GitHub Handover</Badge>
                    <Badge variant="secondary" className="font-mono text-xs font-normal">No Vendor Lock-in</Badge>
                    <Badge variant="secondary" className="font-mono text-xs font-normal">Dokumentasi API Lengkap</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Tile 5: 1x1 (Direct Dev) */}
              <Card className="bento-cell cell-1x1">
                <CardHeader className="p-0 mb-3">
                  <Badge variant="outline" className="w-fit text-[11px] font-mono tracking-wider text-[var(--color-accent)] border-[var(--color-accent)]/30 mb-2">
                    TANPA PERANTARA
                  </Badge>
                  <CardTitle className="cell-title text-xl font-bold">Direct Dev Communication</CardTitle>
                </CardHeader>
                <CardContent className="p-0 flex-1">
                  <p className="cell-desc text-sm text-[var(--color-ink-muted)] leading-relaxed mb-4">
                    Bicara langsung dengan developer teknis yang membangun aplikasi Anda via WhatsApp. Tidak ada sales rep yang menjanjikan hal mustahil.
                  </p>
                </CardContent>
                <CardFooter className="p-0">
                  <Badge className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-300 font-mono text-xs gap-1.5 py-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
                    <span>WhatsApp Selalu Terbuka</span>
                  </Badge>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* ========================================================
            FEATURED CASE STUDIES
        ======================================================== */}
        <section id="portfolio" className="portfolio-section">
          <div className="section-container">
            <div className="section-header-hairline">
              <span className="section-tag">03 / STUDI KASUS TERPILIH</span>
              <h2 className="section-title">Hasil Kerja Nyata yang Telah Beroperasi</h2>
              <p className="section-subtitle">
                Setiap proyek dibangun dengan arsitektur bersih, performa tinggi, dan fokus pada target bisnis klien.
              </p>
            </div>

            <div className="projects-grid">
              {featuredProjects.map((project, index) => (
                <Card key={index} className="project-card">
                  <CardHeader className="p-0 mb-4">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-mono font-semibold text-[var(--color-accent)] uppercase">
                        {project.category}
                      </span>
                      <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[11px] font-mono">
                        {project.highlight}
                      </Badge>
                    </div>
                    <CardTitle className="project-title text-xl font-bold">{project.title}</CardTitle>
                    <div className="text-xs font-mono text-[var(--color-ink-faint)]">Klien: {project.client}</div>
                  </CardHeader>

                  <CardContent className="p-0 flex-1">
                    <p className="project-desc text-sm text-[var(--color-ink-muted)] leading-relaxed mb-5">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.techStack.map((tech, tIdx) => (
                        <Badge key={tIdx} variant="secondary" className="font-mono text-xs font-normal">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>

                  <CardFooter className="p-0">
                    <Button asChild variant="outline" className="w-full justify-between h-10 border-[var(--color-rule)] hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-white transition-all">
                      <a
                        href={getWhatsAppUrl('case-study', project.title)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="text-xs font-semibold">Ingin Sistem Serupa? Diskusi via WA</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================
            THE DARK GRAPHITE BAND: PROTOKOL KERJA
            (Cobalt's signature light -> dark -> light rhythm)
        ======================================================== */}
        <section id="protocol" className="protocol-band">
          <div className="section-container">
            <div className="protocol-header">
              <span className="protocol-tag">PROTOKOL PENGERJAAN</span>
              <h2 className="protocol-title">Alur Kerja Terbuka Tanpa Kejutan Biaya</h2>
              <p className="protocol-subtitle">
                Dari percakapan WhatsApp pertama hingga peluncuran di domain Anda, setiap tahapan tercatat transparan.
              </p>
            </div>

            <div className="protocol-steps">
              <Card className="step-card bg-[var(--color-graphite-card)] border-[var(--color-graphite-border)] text-white">
                <CardHeader className="p-0 mb-3">
                  <div className="step-number text-xs font-mono font-bold text-[#60a5fa] tracking-wider mb-2">PHASE 01</div>
                  <CardTitle className="step-title text-lg font-semibold text-white">Diskusi WhatsApp 15–30 Menit</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="step-desc text-sm text-[var(--color-graphite-muted)] leading-relaxed">
                    Kirimkan ide atau masalah bisnis Anda. Kami bantu bedah fitur esensial (MVP), estimasi biaya transparan, dan jadwal pengerjaan tanpa jargon rumit.
                  </p>
                </CardContent>
              </Card>

              <Card className="step-card bg-[var(--color-graphite-card)] border-[var(--color-graphite-border)] text-white">
                <CardHeader className="p-0 mb-3">
                  <div className="step-number text-xs font-mono font-bold text-[#60a5fa] tracking-wider mb-2">PHASE 02</div>
                  <CardTitle className="step-title text-lg font-semibold text-white">Desain UI & Arsitektur Database</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="step-desc text-sm text-[var(--color-graphite-muted)] leading-relaxed">
                    Penyusunan alur pengguna, struktur database Supabase, dan desain halaman web modern responsif yang disepakati sebelum kode ditulis.
                  </p>
                </CardContent>
              </Card>

              <Card className="step-card bg-[var(--color-graphite-card)] border-[var(--color-graphite-border)] text-white">
                <CardHeader className="p-0 mb-3">
                  <div className="step-number text-xs font-mono font-bold text-[#60a5fa] tracking-wider mb-2">PHASE 03</div>
                  <CardTitle className="step-title text-lg font-semibold text-white">Development & Staging Link</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="step-desc text-sm text-[var(--color-graphite-muted)] leading-relaxed">
                    Proses koding menggunakan Next.js 16 + Payload CMS 3. Anda mendapatkan tautan preview staging berkala untuk memantau kemajuan secara langsung.
                  </p>
                </CardContent>
              </Card>

              <Card className="step-card bg-[var(--color-graphite-card)] border-[var(--color-graphite-border)] text-white">
                <CardHeader className="p-0 mb-3">
                  <div className="step-number text-xs font-mono font-bold text-[#60a5fa] tracking-wider mb-2">PHASE 04</div>
                  <CardTitle className="step-title text-lg font-semibold text-white">Deploy ke Vercel & Handover</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="step-desc text-sm text-[var(--color-graphite-muted)] leading-relaxed">
                    Peluncuran ke domain utama Anda, panduan penggunaan CMS admin, dan penyerahan hak akses repositori GitHub 100% tanpa ikatan tersembunyi.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="protocol-cta-box">
              <div className="protocol-cta-text">
                <strong className="text-lg text-white block mb-1">Ingin mengetahui estimasi biaya untuk kebutuhan Anda?</strong>
                <p className="text-sm text-[var(--color-graphite-muted)]">Kirimkan brief singkat, dan kami berikan respon estimasi langsung di hari yang sama.</p>
              </div>
              <Button asChild size="lg" className="btn-primary-cobalt">
                <a
                  href={getWhatsAppUrl('general')}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Mulai Diskusi WhatsApp Sekarang</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* ========================================================
            TRANSPARENT FAQ (shadcn ui Accordion)
        ======================================================== */}
        <section id="faq" className="faq-section">
          <div className="section-container">
            <div className="section-header-hairline">
              <span className="section-tag">04 / TRANSPARANSI & PERTANYAAN</span>
              <h2 className="section-title">Pertanyaan yang Sering Diajukan</h2>
            </div>

            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full flex flex-col gap-3">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="border border-[var(--color-rule)] rounded-lg bg-[var(--color-paper-card)] px-5 py-1"
                  >
                    <AccordionTrigger className="text-left font-display font-semibold text-base text-[var(--color-ink)] hover:text-[var(--color-accent)] hover:no-underline py-4">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-[var(--color-ink-muted)] leading-relaxed pt-1 pb-4">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* ========================================================
            FINAL CALL TO ACTION BANNER
        ======================================================== */}
        <section className="cta-banner-section">
          <div className="section-container">
            <Card className="cta-banner-card bg-[var(--color-paper-card)] border-[var(--color-rule)] shadow-sm">
              <CardHeader className="p-0 mb-4 text-center">
                <Badge variant="outline" className="w-fit mx-auto font-mono text-xs text-[var(--color-accent)] border-[var(--color-accent)]/30 mb-3">
                  SIAP MELANGKAH LEBIH MAJU
                </Badge>
                <CardTitle className="cta-banner-title text-3xl sm:text-4xl font-bold">
                  Bangun Solusi Digital Anda Bersama Partner Teknis yang Mengerti Kode dan Konversi.
                </CardTitle>
                <CardDescription className="cta-banner-desc text-base text-[var(--color-ink-muted)] max-w-xl mx-auto mt-3">
                  Konsultasikan kebutuhan website custom, aplikasi mobile, atau strategi iklan Anda langsung dengan lead engineer kami tanpa perantara sales.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 flex justify-center">
                <Button asChild size="lg" className="btn-primary-cobalt h-12 px-8 text-base">
                  <a
                    href={getWhatsAppUrl('general')}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>Chat Langsung di WhatsApp</span>
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </a>
                </Button>
              </CardContent>
              <CardFooter className="p-0 justify-center mt-5">
                <div className="cta-footer-note font-mono text-xs text-[var(--color-ink-faint)]">
                  ⚡ Respon cepat · Diskusi terbuka · Estimasi gratis tanpa komitmen
                </div>
              </CardFooter>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  )
}
