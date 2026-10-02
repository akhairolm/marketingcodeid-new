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

- [ ] **Task 2.3: Portfolios Collection (Studi Kasus Proyek)**
  - Buat `src/collections/Portfolios.ts`:
    - Fields: `title`, `slug`, `clientName`, `service` (relationship ke `Services`), `description`, `techStack` (array teks atau badges), `thumbnail` (upload relationship ke `Media`), `gallery` (array upload), `liveUrl` (url), `isFeatured` (boolean), `completedDate` (date).

- [ ] **Task 2.4: Categories Collection (Kategori Blog)**
  - Buat `src/collections/Categories.ts`:
    - Fields: `name` (text, required), `slug` (text, unique).

- [ ] **Task 2.5: Articles Collection (Blog SEO Organik)**
  - Buat `src/collections/Articles.ts`:
    - Fields: `title`, `slug`, `category` (relationship ke `Categories`), `content` (Lexical Rich Text), `coverImage` (relationship ke `Media`), `metaTitle` (text), `metaDescription` (textarea), `status` (select: `draft` / `published`), `publishedAt` (date).
    - Tambahkan hooks untuk otomatis mengisi slug dari judul (`beforeValidate` hook).

- [ ] **Task 2.6: Media Collection**
  - Buat `src/collections/Media.ts` dengan upload aktif (`upload: true`), validasi tipe file gambar (PNG, JPG, WebP), dan atribut `alt` text wajib untuk kebutuhan SEO.

- [ ] **Task 2.7: Generate ImportMap, Types & Verifikasi Admin**
  - Jalankan script `pnpm payload generate:types` dan `pnpm payload generate:importmap`.
  - Akses `http://localhost:3000/admin`, lakukan registrasi akun Admin perdana, dan lakukan uji input data contoh (sample data).

---

## Fase 3: Fondasi Frontend & Sistem Desain (Modular & Skimmable)

Tujuan: Menyiapkan tata letak responsif, palet visual, dan komponen CTA WhatsApp yang fleksibel sebelum dipasang styling kustom.

- [ ] **Task 3.1: Typography & Global Tokens**
  - Konfigurasikan font variable pada Next.js `next/font/google` (misal: Geist, Inter, atau JetBrains Mono).
  - Tentukan variabel CSS untuk warna identitas (Primary, Accent, Background Neutral, Surface, Text Color).

- [ ] **Task 3.2: Reusable Layout Components**
  - Buat `src/components/layout/Navbar.tsx`: Navigasi responsif (Desktop link + Mobile drawer menu) dengan CTA WhatsApp.
  - Buat `src/components/layout/Footer.tsx`: Info agensi, tautan navigasi, daftar layanan, dan hak cipta.
  - Buat `src/components/ui/Badge.tsx`, `src/components/ui/Button.tsx`, `src/components/ui/Card.tsx`.

- [ ] **Task 3.3: Utilitas & Komponen WhatsApp Call-to-Action**
  - Buat helper generator URL WhatsApp: `src/lib/whatsapp.ts`:
    ```ts
    export function getWhatsAppUrl(phone: string, message: string) {
      return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
    }
    ```
  - Buat `src/components/common/FloatingWhatsApp.tsx`: Tombol mengambang di pojok kanan bawah dengan animasi halus dan badge notifikasi visual.
  - Buat `src/components/common/ConsultationBanner.tsx`: Section CTA besar di akhir setiap halaman.

---

## Fase 4: Halaman Publik & Data Integration (Local API)

Tujuan: Mengintegrasikan data Payload CMS 3 ke halaman website Next.js App Router menggunakan *Local API (`getPayload`)* tanpa latensi HTTP.

- [ ] **Task 4.1: Homepage (`/`)**
  - **Hero Section:** Judul persuasif, value proposition, dan tombol CTA utama ke WhatsApp.
  - **Service Highlights:** Kartu 3 layanan utama (Website Custom, Mobile App, Ads).
  - **Featured Case Studies:** 3–6 studi kasus portofolio pilihan.
  - **Latest Insights (Blog):** 3 artikel terbaru untuk pancingan SEO.
  - **Agency Values / Why Choose Us:** Kelebihan agensi (custom code, performa tinggi, support terdedikasi).

- [ ] **Task 4.2: Halaman Layanan (`/services` & `/services/[slug]`)**
  - Query data dari koleksi `Services`.
  - Halaman detail layanan dilengkapi rincian alur kerja pengerjaan proyek dan tombol CTA WhatsApp bertarget (*"Saya tertarik layanan pembuatan website"*).

- [ ] **Task 4.3: Halaman Galeri Portofolio (`/portfolio` & `/portfolio/[slug]`)**
  - Halaman arsip dengan filter kategori/layanan.
  - Halaman detail studi kasus: Tampilan mockup besar, tantangan klien, solusi yang dibangun, tech stack yang dipakai, dan tombol live demo.

- [ ] **Task 4.4: Halaman Blog SEO (`/blog` & `/blog/[slug]`)**
  - Daftar artikel dengan paginasi atau infinite scroll.
  - Detail artikel lengkap dengan tanggal terbit, nama penulis, cover image, dan estimasi waktu baca (*reading time*).

- [ ] **Task 4.5: Lexical Rich Text Renderer Component**
  - Buat komponen `src/components/common/RichText.tsx` untuk me-render data JSON Lexical dari Payload 3 menjadi elemen HTML semantik (H2, H3, Paragraph, CodeBlock, Quote, Image).

---

## Fase 5: Optimasi SEO, Metadata & Schema Markup

Tujuan: Memaksimalkan perolehan traffic organik Google sesuai target PRD.

- [ ] **Task 5.1: Dynamic Metadata API (`generateMetadata`)**
  - Terapkan `generateMetadata` di setiap halaman dinamis (`/portfolio/[slug]` dan `/blog/[slug]`):
    - Title Tag: `[Judul Artikel] | MarketingCode ID`
    - Meta Description terambil langsung dari field `metaDescription`.
    - OpenGraph Tags & Twitter Card dengan gambar thumbnail otomatis.

- [ ] **Task 5.2: Dynamic Sitemap & Robots.txt**
  - Buat `src/app/sitemap.ts`: Otomatis meng-query semua slug artikel dan portofolio terkini dari database Supabase via `payload.find()`.
  - Buat `src/app/robots.ts`: Izinkan crawling untuk seluruh halaman publik dan blokir akses crawler ke `/admin` dan `/api`.

- [ ] **Task 5.3: Schema Markup JSON-LD**
  - Pasang script JSON-LD terstruktur:
    - `ProfessionalService` / `Organization` pada Homepage.
    - `BlogPosting` pada halaman detail artikel untuk Google Rich Snippet.

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
