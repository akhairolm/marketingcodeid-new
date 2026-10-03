# TASK LIST & IMPLEMENTATION PLAN
**Website Company Profile & Portfolio Agency (MarketingCode ID)**
> **Tech Stack:** Next.js 15+/16 (App Router) + Payload CMS 3.x (`^3.85.0`) + Supabase PostgreSQL & Storage  
> **Panduan:** Terverifikasi menggunakan dokumentasi resmi **Context7** dan best practice arsitektur *Unified Next.js Native Payload*.

---

## Ringkasan Alur Eksekusi (Roadmap)

```mermaid
flowchart LR
    A["Fase 1: Setup & Env"] --> B["Fase 2: Payload Collections"]
    B --> C["Fase 3: Design & UI Base"]
    C --> D["Fase 4: Halaman Publik"]
    D --> E["Fase 5: SEO & Schema"]
    E --> F["Fase 6: Build & Deploy"]
```

---

## Fase 1: Environment & Inisialisasi Proyek (Next.js + Payload 3)

Tujuan: Menginisialisasi proyek fullstack terpadu di mana Payload CMS 3 berjalan secara native di dalam Next.js App Router dengan koneksi Supabase PostgreSQL.

- [x] **Task 1.1: Inisialisasi Repositori & Paket Inti (SELESAI)**
  - Menginisialisasi proyek menggunakan `create-payload-app@latest` dengan template `blank` dan `pnpm`.
  - Terpasang versi resmi terbaru:
    - `next`: **16.3.3**
    - `react` & `react-dom`: **19.2.6**
    - `payload`: **3.90.2**
    - `@payloadcms/next`, `@payloadcms/ui`, `@payloadcms/richtext-lexical`: **3.90.2**
    - `@payloadcms/db-postgres`: **3.90.2**
    - `@payloadcms/storage-s3`: **3.90.2**
    - `sharp`: **0.35.4**

- [x] **Task 1.2: Konfigurasi Struktur Folder Standar Next.js App Router (SELESAI)**
  - Terapkan pemisahan rute (*Route Groups*) sesuai rekomendasi Context7:
    ```text
    src/
    ├── app/
    │   ├── (payload)/
    │   │   ├── admin/[[...segments]]/page.tsx   # Admin Panel Payload CMS
    │   │   ├── api/[...slug]/route.ts           # Payload REST/GraphQL Endpoints
    │   │   ├── custom.scss / custom.css
    │   │   └── layout.tsx
    │   └── (frontend)/
    │       ├── layout.tsx                       # Layout utama website publik
    │       ├── page.tsx                         # Landing Page (Beranda)
    │       ├── services/
    │       ├── portfolio/
    │       └── blog/
    ├── collections/                             # Skema tabel Payload CMS
    ├── components/                              # Reusable UI & Layout Components
    ├── lib/                                     # Utility & WhatsApp Helpers
    └── payload.config.ts                        # Konfigurasi utama Payload CMS
    ```

- [ ] **Task 1.3: Konfigurasi Supabase PostgreSQL Adapter**
  - Buat file `.env.local` dan masukkan string koneksi Supabase Connection Pooler:
    ```env
    DATABASE_URL="postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true"
    PAYLOAD_SECRET="your-super-strong-random-payload-secret"
    NEXT_PUBLIC_SERVER_URL="http://localhost:3000"
    ```
  - Konfigurasikan `payload.config.ts` dengan `postgresAdapter` dari `@payloadcms/db-postgres`:
    ```ts
    import { postgresAdapter } from '@payloadcms/db-postgres'
    import { lexicalEditor } from '@payloadcms/richtext-lexical'
    import { buildConfig } from 'payload'
    import sharp from 'sharp'

    export default buildConfig({
      editor: lexicalEditor(),
      collections: [],
      secret: process.env.PAYLOAD_SECRET || '',
      db: postgresAdapter({
        pool: {
          connectionString: process.env.DATABASE_URL,
        },
      }),
      sharp,
    })
    ```

- [ ] **Task 1.4: Konfigurasi Supabase Storage (S3 Protocol)**
  - Aktifkan bucket `media` publik di dashboard Supabase.
  - Konfigurasikan `@payloadcms/storage-s3` pada `payload.config.ts` menggunakan endpoint S3 Supabase (`https://[PROJECT-REF].supabase.co/storage/v1/s3`).

---

## Fase 2: Pemodelan Data & Payload Collections

Tujuan: Membuat skema collection yang terstruktur, aman, dan mudah dikelola melalui Admin Panel.

- [ ] **Task 2.1: Users Collection (Admin)**
  - Buat `src/collections/Users.ts` dengan role `admin` dan autentikasi aktif.
  - Batasi pendaftaran hanya untuk admin (disable public sign-up).

- [ ] **Task 2.2: Services Collection (Master Jasa Agensi)**
  - Buat `src/collections/Services.ts`:
    - Fields: `title` (text, required), `slug` (text, unique, auto-generate), `shortDescription` (textarea), `icon` (text/upload), `content` (lexical rich text), `sortOrder` (number).

- [x] **Task 2.3: Portfolios Collection (Studi Kasus Proyek - SELESAI)**
  - Dibuat `src/collections/Portfolios.ts`:
    - Fields: `title`, `slug` (auto-generated via `beforeValidate`), `status` (`draft` | `published`), `isFeatured`, `completedDate`, `clientName`, `category` (`web`, `app`, `marketing`, `video`), `summary`, `thumbnail`, `duration`, `role`, `liveUrl`, `challenge`, `solution`, `results` (array value & label), `techStack` (array), `content` (lexical rich text), `testimonial` (group: quote, name, role), `gallery` (array media & caption), `metaTitle`, `metaDescription`.

- [x] **Task 2.4: Categories Collection (Kategori Blog - SELESAI)**
  - Dibuat `src/collections/Categories.ts`:
    - Fields: `name` (text, required), `slug` (text, unique, auto-generate), `description`.

- [x] **Task 2.5: Articles Collection (Blog SEO Organik - SELESAI)**
  - Dibuat `src/collections/Articles.ts`:
    - Fields: `title`, `slug` (auto-generate via `beforeValidate`), `status` (`draft` | `published`), `publishedAt` (auto-fill hook on publish), `category` (relationship ke `categories`), `excerpt`, `coverImage` (upload media), `content` (Lexical Rich Text), `tags` (array), `authorName`, `authorRole`, `metaTitle`, `metaDescription`.

- [ ] **Task 2.6: Media Collection**
  - Koleksi `src/collections/Media.ts` aktif dengan upload enabled (`upload: true`), validasi tipe file gambar (PNG, JPG, WebP), dan atribut `alt` text wajib untuk SEO.

- [x] **Task 2.7: Generate ImportMap, Types & Verifikasi Admin (SELESAI)**
  - Dijalankan script `pnpm generate:types` dan `pnpm generate:importmap` dengan semua koleksi terdaftar di `payload.config.ts`.
  - Interface TypeScript `Portfolio`, `Article`, `Category` ter-compile bersih di `src/payload-types.ts`.

---

## Fase 3: Fondasi Frontend & Sistem Desain (Modular & Skimmable - SELESAI)

Tujuan: Menyiapkan tata letak responsif, palet visual, dan komponen CTA WhatsApp yang fleksibel sebelum dipasang styling kustom.

- [x] **Task 3.1: Typography & Global Tokens (SELESAI)**
  - Terapkan standar desain **Hallmark Cobalt**: Space Grotesk (display), Inter (body), dan JetBrains Mono (labels/code).
  - Tentukan variabel CSS native OKLCH: `--color-paper`, `--color-ink`, `--color-accent` (Electric Cobalt), dan `--color-graphite`.

- [x] **Task 3.2: Reusable Layout Components (SELESAI)**
  - `src/components/layout/Navbar.tsx`: Navigasi responsif (Desktop + Mobile drawer) dengan trigger ⌘K Command Menu dan CTA WhatsApp.
  - `src/components/layout/Footer.tsx`: Colophon teknis, tautan layanan, live operational badge, dan copyright.
  - `src/components/common/CommandMenu.tsx`: Interactive command palette ⌘K dengan filter cepat.

- [x] **Task 3.3: Utilitas & Komponen WhatsApp Call-to-Action (SELESAI)**
  - `src/lib/whatsapp.ts`: Helper URL generator dengan pesan kontekstual per layanan dan studi kasus.
  - `src/components/common/FloatingWhatsApp.tsx`: Tombol melayang sudut kanan bawah dengan pulse live dan hover tooltip.

---

## Fase 4: Halaman Publik & Data Integration (Local API)

Tujuan: Mengintegrasikan data Payload CMS 3 ke halaman website Next.js App Router menggunakan *Local API (`getPayload`)* tanpa latensi HTTP.

- [x] **Task 4.1: Homepage (`/`) — NexaCraft Design Implementation (SELESAI)**
  - **Top Floating Capsule Navigation:** Bar kapsul gelap (`#1A1A1E`/90) dengan logo NexaCraft, link anchor navigasi, tombol CTA oranye (`#FF5C28`), dan responsive mobile drawer.
  - **Hero Section:** Social proof badge 3 avatar (`250+ Bisnis yang Bertumbuh`), judul utama dengan aksen warna brand oranye, deskripsi performa tinggi, dan kartu showcase video 16/9 dengan play button modal interaktif.
  - **4 Core Pillars Strip:** Web Development, Mobile App Dev, Digital Marketing, dan UI/UX & Branding.
  - **Metrics Counter Card:** 180+ Website & App Dirilis, Rp 45M+ GMV Klien, 98.6% Kepuasan & Retensi.
  - **Feature Showcase 1 (App Architecture):** Kartu UI simulasi Next.js 16 cache & CDN, Core Web Vitals score 99, sprint task progress, dan notification pill.
  - **Feature Showcase 2 (Growth Chart):** Kartu visual ROI +320% dengan bar chart oranye gradasi bulanan dan metrik CAC turun 42%.
  - **Pilihan Paket Investasi Transparan:** Tabs filter interaktif (Website, Mobile App, Digital Marketing), 3 tingkatan kartu harga dengan highlight tier "Paling Populer" (Business Pro).
  - **Alur Kerja 3 Langkah:** Discovery & Konsultasi, Desain UI & Koding, Peluncuran & Scaling.
  - **Lead Consultation Form:** Form permintaan konsultasi terintegrasi WhatsApp URL generation otomatis dan toast notification konfirmasi.
  - **FAQ Accordion:** Tanya-jawab interaktif mengenai estimasi waktu, 100% kepemilikan source code, garansi 3 bulan, dan alur pelaporan marketing.
  - **Dark Capsule CTA Banner:** Container gelap `#121214` dengan efek glow oranye dan tombol ganda (Konsultasi & Direct WhatsApp).
  - **Footer & Floating WhatsApp:** Footer minimalis dengan link navigasi, ikon sosial media (Instagram, LinkedIn, GitHub), copyright, dan floating WhatsApp CTA widget.

- [ ] **Task 4.2: Halaman Layanan (`/services` & `/services/[slug]`)**
  - Query data dari koleksi `Services`.
  - Halaman detail layanan dilengkapi rincian alur kerja pengerjaan proyek dan tombol CTA WhatsApp bertarget (*"Saya tertarik layanan pembuatan website"*).

- [x] **Task 4.3: Halaman Galeri Portofolio (`/portfolio` & `/portfolio/[slug]`) (SELESAI)**
  - `src/app/(frontend)/portfolio/page.tsx`: Halaman arsip portofolio dengan filter kategori interaktif (Web, Mobile App, Digital Marketing) dan metrik hasil nyata.
  - `src/app/(frontend)/portfolio/[slug]/page.tsx`: Halaman detail studi kasus lengkap dengan hero + spec sheet kartu klien, banner mockup resolusi tinggi, strip metrik hasil (Lighthouse, ROI, dll.), struktur cerita bernomor (Tantangan, Solusi, Tech Stack), galeri mockup proyek, rekomendasi studi kasus terkait, dan CTA konsultasi WhatsApp kontekstual.
  - Fallback aman dengan sample data terkurasi saat koneksi database database belum terisi.

- [x] **Task 4.4: Halaman Blog SEO (`/blog` & `/blog/[slug]`) (SELESAI)**
  - `src/app/(frontend)/blog/page.tsx`: Halaman arsip artikel dengan hero featured story, filter kategori, dan kartu artikel komprehensif.
  - `src/app/(frontend)/blog/[slug]/page.tsx`: Halaman detail artikel editorial dengan reading progress bar di bagian atas layar, informasi penulis + estimasi waktu baca (reading minutes), cover image rasio 16:9, sticky table of contents (TOC) dengan scroll-spy aktif, tombol bagikan artikel (Salin Tautan, WhatsApp, LinkedIn, X), kotak bio penulis, artikel terkait, dan dark CTA banner.

- [x] **Task 4.5: Lexical Rich Text Renderer Component (SELESAI)**
  - Dibuat komponen `src/components/common/RichText.tsx` memanfaatkan `@payloadcms/richtext-lexical/react` dengan konverter custom untuk heading ber-anchor ID otomatis sehingga bersinkronisasi langsung dengan Table of Contents.
  - Styling tipografi artikel panjang (`.prose-article`) diatur dengan rapi di `styles.css`.

---

## Fase 5: Optimasi SEO, Metadata & Schema Markup

Tujuan: Memaksimalkan perolehan traffic organik Google sesuai target PRD.

- [x] **Task 5.1: Dynamic Metadata API (`generateMetadata`) (SELESAI)**
  - Diterapkan `generateMetadata` di setiap halaman dinamis:
    - `/portfolio/[slug]`: Title Tag, Meta Description, OpenGraph tags (article type, image, site name), Twitter summary_large_image card, dan Canonical URL.
    - `/blog/[slug]`: Title Tag, Meta Description, Authors, Keywords/Tags, Published Time, Modified Time, OpenGraph & Twitter Card.

- [ ] **Task 5.2: Dynamic Sitemap & Robots.txt**
  - Buat `src/app/sitemap.ts`: Otomatis meng-query semua slug artikel dan portofolio terkini dari database Supabase via `payload.find()`.
  - Buat `src/app/robots.ts`: Izinkan crawling untuk seluruh halaman publik dan blokir akses crawler ke `/admin` dan `/api`.

- [x] **Task 5.3: Schema Markup JSON-LD (SELESAI)**
  - Pasang script JSON-LD terstruktur:
    - `BreadcrumbList` pada halaman detail portofolio dan blog.
    - `CreativeWork` pada halaman studi kasus portofolio.
    - `BlogPosting` pada halaman detail artikel untuk Google Rich Snippet (author, publisher, headline, image, dates, keywords).

- [ ] **Task 5.4: Optimasi Performa & Gambar**
  - Konfigurasi `next/image` dengan domain Supabase Storage di `next.config.mjs`.
  - Pastikan skor Google Lighthouse: Performance $\ge 90$, SEO $\ge 95$, Accessibility $\ge 95$.

---

## Fase 6: Validasi Build, Keamanan & Deployment

Tujuan: Menjamin aplikasi siap pakai di lingkungan produksi tanpa error runtime.

- [ ] **Task 6.1: Audit Environment Variables & Security**
  - Verifikasi semua secret (`PAYLOAD_SECRET`, Supabase DB password, S3 credentials) aman dan tidak bocor ke git repository (`.gitignore`).
  - Set CORS dan access control pada koleksi Payload agar hanya admin yang bisa melakukan write/update/delete.

- [ ] **Task 6.2: Build Validation Test**
  - Jalankan pengujian build lokal:
    ```bash
    pnpm payload generate:importmap
    pnpm payload generate:types
    pnpm build
    ```
  - Pastikan tidak ada type error atau issue SSR.

- [ ] **Task 6.3: Deployment ke Vercel / VPS**
  - Hubungkan repositori Git ke Vercel.
  - Masukkan seluruh Environment Variables di Vercel Dashboard.
  - Konfigurasikan Supabase connection pooling mode (Transaction mode pada port 6543) agar koneksi database stabil saat scaling serverless.
