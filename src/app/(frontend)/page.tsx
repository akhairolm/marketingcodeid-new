import React from 'react'
import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { HeroBlueprint } from '@/components/home/HeroBlueprint'
import { FloatingWhatsApp } from '@/components/common/FloatingWhatsApp'
import { getWhatsAppUrl } from '@/lib/whatsapp'

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
  // Graceful Local API query (Fallback if Supabase DB is offline or initial setup)
  let liveProjectsCount = 0
  let isDbConnected = false

  try {
    const headers = await getHeaders()
    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })
    const { totalDocs } = await payload.find({
      collection: 'users',
      limit: 1,
    })
    liveProjectsCount = totalDocs
    isDbConnected = true
  } catch (_err) {
    // Database connection pending (waiting for Supabase credentials in .env.local)
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
                <a
                  href={getWhatsAppUrl('general')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary-cobalt btn-large"
                >
                  <span>Mulai Konsultasi WhatsApp</span>
                  <span className="btn-arrow" aria-hidden="true">→</span>
                </a>

                <a href="#services" className="btn-secondary-hairline btn-large">
                  <span>Lihat Solusi Kami</span>
                  <span className="btn-arrow" aria-hidden="true">↓</span>
                </a>
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
              <div className="bridge-card">
                <div className="bridge-num">01</div>
                <h3 className="bridge-title">Punya Bisnis tapi Belum Memiliki Website</h3>
                <p className="bridge-desc">
                  Calon klien Anda mencari kredibilitas di Google sebelum membeli. Kami bangunkan website berdesain premium, cepat, dan teroptimasi SEO agar bisnis Anda langsung terlihat berkelas dan profesional.
                </p>
                <a
                  href={getWhatsAppUrl('website')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bridge-link"
                >
                  Konsultasi Pembuatan Website →
                </a>
              </div>

              <div className="bridge-card">
                <div className="bridge-num">02</div>
                <h3 className="bridge-title">Ingin Iklan Digital tapi Bingung Setup Teknis</h3>
                <p className="bridge-desc">
                  Iklan bukan sekadar pasang budget lalu buang uang. Kami rancang funnel terpadu dari Meta Ads & Google Ads langsung terhubung ke WhatsApp bisnis Anda, lengkap dengan tracking Meta CAPI server-side anti-bocor.
                </p>
                <a
                  href={getWhatsAppUrl('ads')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bridge-link"
                >
                  Konsultasi Strategi Ads & Funnel →
                </a>
              </div>

              <div className="bridge-card">
                <div className="bridge-num">03</div>
                <h3 className="bridge-title">Instansi & B2B yang Butuh Aplikasi Custom</h3>
                <p className="bridge-desc">
                  Tidak memiliki tim developer internal? Kami menjadi mitra teknologi teknis Anda. Siap dengan kontrak kerja resmi (SPK/Invoice), arsitektur modular teruji, dan penyerahan kode sumber 100% ke pihak Anda.
                </p>
                <a
                  href={getWhatsAppUrl('government')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bridge-link"
                >
                  Konsultasi Kebutuhan Aplikasi Instansi →
                </a>
              </div>
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
              <article className="bento-cell cell-2x2">
                <div className="cell-badge">PILLAR UTAMA · WEB CUSTOM</div>
                <h3 className="cell-title">Next.js 16 & Payload CMS 3 Architecture</h3>
                <p className="cell-desc">
                  Kombinasi fullstack terkini di dunia web engineering. Memberikan Anda website company profile berkecepatan instan (Lighthouse 95+) dengan CMS Admin Panel intuitif yang tertanam langsung tanpa perlu sewa hosting CMS terpisah.
                </p>

                <div className="cell-features-list">
                  <div className="feature-item">
                    <span className="feature-check">✓</span>
                    <span><strong>Server-Side Rendering (SSR) & ISR:</strong> Google mengindeks artikel Anda secara instan.</span>
                  </div>
                  <div className="feature-item">
                    <span className="feature-check">✓</span>
                    <span><strong>Payload 3 Native CMS:</strong> Tulis artikel SEO dan kelola portofolio tanpa coding.</span>
                  </div>
                  <div className="feature-item">
                    <span className="feature-check">✓</span>
                    <span><strong>Supabase PostgreSQL:</strong> Database relational cloud tangguh kelas enterprise.</span>
                  </div>
                  <div className="feature-item">
                    <span className="feature-check">✓</span>
                    <span><strong>Zero Bloatware:</strong> Tidak ada plugin rapuh yang rawan dibobol hacker.</span>
                  </div>
                </div>

                <div className="cell-cta">
                  <a
                    href={getWhatsAppUrl('website')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cell-link"
                  >
                    Diskusikan Proyek Website Custom →
                  </a>
                </div>
              </article>

              {/* Tile 2: 1x1 (Mobile Apps) */}
              <article className="bento-cell cell-1x1">
                <div className="cell-badge">APLIKASI MOBILE</div>
                <h3 className="cell-title">Cross-Platform iOS & Android</h3>
                <p className="cell-desc">
                  Satu basis kode untuk hadir di Play Store dan App Store sekaligus. Animasi 60 FPS, push notification, dan integrasi backend realtime.
                </p>
                <a
                  href={getWhatsAppUrl('mobile')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cell-link"
                >
                  Konsultasi Mobile App →
                </a>
              </article>

              {/* Tile 3: 1x1 (Digital Marketing) */}
              <article className="bento-cell cell-1x1">
                <div className="cell-badge">DIGITAL ADS ENGINE</div>
                <h3 className="cell-title">Meta & Google Ads Berkonversi</h3>
                <p className="cell-desc">
                  Menjangkau calon pembeli yang benar-benar siap bayar. Funnel langsung diarahkan ke chat WhatsApp dengan tracking konversi terpasang akurat.
                </p>
                <a
                  href={getWhatsAppUrl('ads')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cell-link"
                >
                  Diskusi Strategi Iklan →
                </a>
              </article>

              {/* Tile 4: 2x1 (Full Ownership) */}
              <article className="bento-cell cell-2x1">
                <div className="cell-badge">KEPEMILIKAN PENUH</div>
                <h3 className="cell-title">100% Hak Milik Source Code & Cloud Klien</h3>
                <p className="cell-desc">
                  Tidak ada istilah Anda disandera oleh vendor. Repositori GitHub diserahkan ke akun Anda, akun Vercel dan Supabase atas nama Anda sendiri. Anda bebas mengembangkan sistem bersama siapa saja di masa depan.
                </p>
                <div className="cell-tags">
                  <span className="tech-chip">GitHub Handover</span>
                  <span className="tech-chip">No Vendor Lock-in</span>
                  <span className="tech-chip">Dokumentasi API Lengkap</span>
                </div>
              </article>

              {/* Tile 5: 1x1 (Direct Dev) */}
              <article className="bento-cell cell-1x1">
                <div className="cell-badge">TANPA PERANTARA</div>
                <h3 className="cell-title">Direct Dev Communication</h3>
                <p className="cell-desc">
                  Bicara langsung dengan developer teknis yang membangun aplikasi Anda via WhatsApp. Tidak ada sales rep yang menjanjikan hal mustahil.
                </p>
                <div className="live-status-pill">
                  <span className="live-dot-green" />
                  <span>WhatsApp Selalu Terbuka</span>
                </div>
              </article>
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
                <div key={index} className="project-card">
                  <div className="project-card-header">
                    <span className="project-category">{project.category}</span>
                    <span className="project-highlight">{project.highlight}</span>
                  </div>

                  <h3 className="project-title">{project.title}</h3>
                  <div className="project-client">Klien: {project.client}</div>

                  <p className="project-desc">{project.description}</p>

                  <div className="project-stack">
                    {project.techStack.map((tech, tIdx) => (
                      <span key={tIdx} className="stack-badge">{tech}</span>
                    ))}
                  </div>

                  <div className="project-actions">
                    <a
                      href={getWhatsAppUrl('case-study', project.title)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-project-inquire"
                    >
                      <span>Ingin Sistem Serupa? Diskusi via WA</span>
                      <span className="arrow" aria-hidden="true">→</span>
                    </a>
                  </div>
                </div>
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
              <div className="step-card">
                <div className="step-number">PHASE 01</div>
                <h3 className="step-title">Diskusi WhatsApp 15–30 Menit</h3>
                <p className="step-desc">
                  Kirimkan ide atau masalah bisnis Anda. Kami bantu bedah fitur esensial (MVP), estimasi biaya transparan, dan jadwal pengerjaan tanpa jargon rumit.
                </p>
              </div>

              <div className="step-card">
                <div className="step-number">PHASE 02</div>
                <h3 className="step-title">Desain UI & Arsitektur Database</h3>
                <p className="step-desc">
                  Penyusunan alur pengguna, struktur database Supabase, dan desain halaman web modern responsif yang disepakati sebelum kode ditulis.
                </p>
              </div>

              <div className="step-card">
                <div className="step-number">PHASE 03</div>
                <h3 className="step-title">Development & Staging Link</h3>
                <p className="step-desc">
                  Proses koding menggunakan Next.js 16 + Payload CMS 3. Anda mendapatkan tautan preview staging berkala untuk memantau kemajuan secara langsung.
                </p>
              </div>

              <div className="step-card">
                <div className="step-number">PHASE 04</div>
                <h3 className="step-title">Deploy ke Vercel & Handover</h3>
                <p className="step-desc">
                  Peluncuran ke domain utama Anda, panduan penggunaan CMS admin, dan penyerahan hak akses repositori GitHub 100% tanpa ikatan tersembunyi.
                </p>
              </div>
            </div>

            <div className="protocol-cta-box">
              <div className="protocol-cta-text">
                <strong>Ingin mengetahui estimasi biaya untuk kebutuhan Anda?</strong>
                <p>Kirimkan brief singkat, dan kami berikan respon estimasi langsung di hari yang sama.</p>
              </div>
              <a
                href={getWhatsAppUrl('general')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary-cobalt btn-large"
              >
                Mulai Diskusi WhatsApp Sekarang →
              </a>
            </div>
          </div>
        </section>

        {/* ========================================================
            TRANSPARENT FAQ (Conversational Q&A)
        ======================================================== */}
        <section id="faq" className="faq-section">
          <div className="section-container">
            <div className="section-header-hairline">
              <span className="section-tag">04 / TRANSPARANSI & PERTANYAAN</span>
              <h2 className="section-title">Pertanyaan yang Sering Diajukan</h2>
            </div>

            <div className="faq-grid">
              <div className="faq-item">
                <h3 className="faq-q">Berapa lama rata-rata pembuatan website atau aplikasi?</h3>
                <p className="faq-a">
                  Untuk website company profile custom (Next.js + Payload CMS) umumnya membutuhkan waktu <strong>7 hingga 14 hari kerja</strong>. Untuk aplikasi web custom atau aplikasi mobile dengan kompleksitas lebih tinggi, berkisar antara <strong>3 hingga 6 minggu</strong>.
                </p>
              </div>

              <div className="faq-item">
                <h3 className="faq-q">Mengapa memilih Next.js & Payload daripada WordPress template?</h3>
                <p className="faq-a">
                  WordPress menggunakan plugin pihak ketiga yang sering konflik, lambat, dan rentan celah keamanan. Next.js dan Payload CMS memberikan waktu muat instan (sub-detik), skor Google SEO sangat tinggi, dan CMS modern yang ringan tanpa beban plugin tidak penting.
                </p>
              </div>

              <div className="faq-item">
                <h3 className="faq-q">Apakah saya mendapatkan seluruh source code proyek?</h3>
                <p className="faq-a">
                  <strong>Ya, 100%.</strong> Seluruh source code proyek akan diserahkan dan dipush ke akun GitHub Anda. Kami tidak membatasi atau mengunci kepemilikan kode Anda.
                </p>
              </div>

              <div className="faq-item">
                <h3 className="faq-q">Apakah biaya deploy di Vercel dan Supabase mahal?</h3>
                <p className="faq-a">
                  Untuk skala kecil hingga menengah, kuota gratis (*free tier*) Vercel dan Supabase sudah sangat mencukupi kebutuhan operasional harian. Biaya langganan hanya meningkat jika traffic website Anda sudah mencapai puluhan ribu pengunjung per bulan.
                </p>
              </div>

              <div className="faq-item">
                <h3 className="faq-q">Bagaimana jika saya belum punya logo, tulisan, atau gambar produk?</h3>
                <p className="faq-a">
                  Jangan khawatir. Kami membantu perapian struktur teks copywriting, pemilihan gambar lisensi resmi berkualitas tinggi, dan tata letak materi sehingga Anda tidak perlu pusing menyiapkan semuanya dari awal.
                </p>
              </div>

              <div className="faq-item">
                <h3 className="faq-q">Bagaimana sistem pembayaran dan garansinya?</h3>
                <p className="faq-a">
                  Sistem pembayaran bertahap (Down Payment 50% saat kesepakatan, dan pelunasan 50% setelah proyek selesai dan siap live). Kami memberikan garansi perbaikan bug dan pendampingan teknis gratis setelah serah terima.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            FINAL CALL TO ACTION BANNER
        ======================================================== */}
        <section className="cta-banner-section">
          <div className="section-container">
            <div className="cta-banner-card">
              <div className="cta-tag">SIAP MELANGKAH LEBIH MAJU</div>
              <h2 className="cta-banner-title">
                Bangun Solusi Digital Anda Bersama Partner Teknis yang Mengerti Kode dan Konversi.
              </h2>
              <p className="cta-banner-desc">
                Konsultasikan kebutuhan website custom, aplikasi mobile, atau strategi iklan Anda langsung dengan lead engineer kami tanpa perantara sales.
              </p>
              <div className="cta-actions">
                <a
                  href={getWhatsAppUrl('general')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary-cobalt btn-huge"
                >
                  <span>Chat Langsung di WhatsApp</span>
                  <span className="arrow" aria-hidden="true">→</span>
                </a>
              </div>
              <div className="cta-footer-note">
                ⚡ Respon cepat · Diskusi terbuka · Estimasi gratis tanpa komitmen
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  )
}
