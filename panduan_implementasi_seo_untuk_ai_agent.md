# Spesifikasi Implementasi SEO Organik & Struktur Halaman (Instructions for AI Agent)

## 1. Konteks & Instruksi Utama untuk AI Agent
Dokumen ini adalah cetak biru (*blueprint*) implementasi SEO On-Page, Arsitektur Silo, Copywriting, dan Technical SEO untuk project Next.js ini. 

**Tugas Anda (AI Agent):**
1. **Inspeksi Struktur Project Terlebih Dahulu:** Periksa struktur folder di dalam `src/app/`, komponen UI yang sudah ada (`src/components/`), serta identitas *brand* (misalnya `MarketingCode` atau nama agensi yang digunakan di dalam `PRD.md` / `CLAUDE.md`).
2. **Pertahankan Desain Visual & UI/UX:** Jangan merusak gaya visual, tema Tailwind CSS, atau komponen `shadcn/ui` yang sudah ada. Lakukan pembaruan pada **Metadata Next.js**, **Hierarki Tag HTML (`<h1>`, `<h2>`, `<h3>`)**, **Konten Teks (Copywriting)**, **Internal Linking (`next/link`)**, dan **JSON-LD Structured Data**.
3. **Validasi Penamaan Route (Penting):**
   - Pastikan keempat rute utama berikut tersedia dan menggunakan ejaan URL (*slug*) yang tepat:
     1. `/` (Homepage)
     2. `/jasa-pembuatan-website` *(Periksa apakah ada folder typo `/jasa-pembuatan-webiste`. Jika ada, ubah namanya menjadi `/jasa-pembuatan-website` dan tambahkan redirect permanen 308 di `next.config.ts` dari `/jasa-pembuatan-webiste` ke `/jasa-pembuatan-website`)*.
     3. `/jasa-pembuatan-aplikasi-mobile`
     4. `/jasa-iklan-meta-ads`

---

## 2. Profil Bisnis & Target Geografis (Entitas SEO Lokal)
Gunakan entitas bisnis berikut secara konsisten pada Metadata, teks halaman, Footer, dan JSON-LD Schema:
- **Jenis Bisnis:** Digital Agency & Software House (Jasa Pembuatan Website, Aplikasi Mobile Android/iOS, Manajemen Iklan Meta Ads & Google Ads, serta Video Editing).
- **Lokasi Utama (Hyper-Local Target):** Kandangan, Kabupaten Hulu Sungai Selatan (HSS), Kalimantan Selatan.
- **Cakupan Layanan Regional (Service Area):** Kandangan (HSS), Rantau (Tapin), Barabai (HST), Amuntai (HSU), Paringin (Balangan), Tanjung (Tabalong) — *Wilayah Banua Enam*, serta Banjarbaru dan Banjarmasin (Kalimantan Selatan).
- **Strategi SEO:** Piramida *Bottom-Up* (menguasai kata kunci kompetisi rendah di tingkat kabupaten/provinsi, solusi spesifik instansi/OPD, serta vertikal industri & teknologi).

---

## 3. Matriks Pemetaan Keyword (Anti-Kanibalisasi)
Setiap halaman memiliki target kata kunci tersendiri. **Jangan mencampuradukkan fokus `<h1>` dan `<title>` antar halaman.**

| Halaman (Route) | Fokus Utama (Primary Keyword) | Keyword Turunan (Secondary / Long-Tail) | Entitas Semantik (LSI) yang Wajib Masuk ke Konten |
| :--- | :--- | :--- | :--- |
| **`/` (Homepage)** | `software house kalimantan selatan`, `digital agency kandangan hss` | `agensi pembuatan aplikasi dan digital marketing kalsel`, `konsultan it hulu sungai selatan` | Kandangan, Hulu Sungai Selatan, Banua Enam, Kalimantan Selatan, Transformasi Digital, Web Development, Performance Marketing |
| **`/jasa-pembuatan-website`** | `jasa pembuatan website kalimantan selatan`, `jasa pembuatan website kandangan` | `jasa pembuatan sistem informasi instansi kalsel`, `jasa bikin web hulu sungai selatan`, `jasa pembuatan website travel dan company profile`, `web developer laravel next js kalsel` | Sistem Informasi Berbasis Web, Website Dinas/OPD, Landing Page Konversi Tinggi, SEO Friendly, Custom Web Application, Dashboard Admin |
| **`/jasa-pembuatan-aplikasi-mobile`** | `jasa pembuatan aplikasi mobile kalsel`, `jasa pembuatan aplikasi android kandangan` | `jasa pembuatan aplikasi instansi pemerintah kalsel`, `jasa buat aplikasi presensi dan kinerja pegawai`, `developer aplikasi android ios banua enam` | Aplikasi Android & iOS, Geotagging / Geofencing, Sistem Layanan Publik, E-Government, UI/UX Modern, Integrasi REST API, Play Store & App Store |
| **`/jasa-iklan-meta-ads`** | `jasa iklan meta ads`, `jasa iklan facebook instagram kalsel` | `jasa iklan meta ads click to whatsapp`, `jasa pasang iklan fb ig untuk umkm dan travel`, `jasa optimasi leads whatsapp meta ads` | Facebook Ads, Instagram Ads, Click-to-WhatsApp (CTWA), Meta Pixel, Retargeting, ROAS, Konversi Leads, Video Reels Ads |

---

## 4. Spesifikasi Detail Per Halaman

> **Catatan Variabel:** Ganti `[Nama Brand]` dengan nama resmi agensi yang tertulis di kode/konfigurasi project saat ini (contoh: `MarketingCode`).

---

### HALAMAN 1: Homepage (`/`)
**File Target:** `src/app/page.tsx` (atau file page utama pada route group marketing).

#### A. Next.js Metadata (`export const metadata: Metadata`)
- **Title:** `Software House & Digital Agency Kalimantan Selatan | [Nama Brand]`
- **Description:** `Agensi pembuatan website, aplikasi mobile Android/iOS, dan iklan Meta Ads di Kandangan, HSS, Kalimantan Selatan. Solusi digital kustom untuk instansi, UMKM, & perusahaan.`
- **Keywords:** `["software house kalimantan selatan", "digital agency kandangan", "jasa it hulu sungai selatan", "jasa pembuatan website kalsel", "jasa aplikasi mobile kalsel", "jasa meta ads kalsel"]`
- **Alternates Canonical:** `/`

#### B. Struktur Heading & Copywriting On-Page
Pastikan hanya ada **SATU tag `<h1>`** di halaman ini. Gunakan struktur semantik berikut:

1. **Hero Section:**
   - **Badge / Eyebrow Text:** `Partner Transformasi Digital & Pertumbuhan Bisnis Anda`
   - **`<h1>`:** `Solusi Pembuatan Website, Aplikasi Mobile & Digital Marketing di Kalimantan Selatan`
   - **Deskripsi Hero (`<p>`):** `Kami membantu instansi pemerintah, perusahaan, dan pelaku usaha di Kandangan (Hulu Sungai Selatan), Banua Enam, hingga seluruh Kalimantan Selatan membangun sistem teknologi kustom dan mendatangkan prospek berkualitas melalui strategi periklanan terukur.`
   - **CTA Utama:** Tombol konsultasi WhatsApp & tombol lihat layanan.

2. **Seksi Layanan Utama (Silo Hub - WAJIB ADA INTERNAL LINK):**
   - **`<h2>`:** `Layanan Solusi Digital Terintegrasi Kami`
   - **Deskripsi Seksi:** `Mulai dari pembangunan infrastruktur sistem berbasis web dan mobile hingga akuisisi pelanggan melalui iklan digital dan konten kreatif.`
   - **Kartu Layanan 1 (`<h3>`):** `Jasa Pembuatan Website & Sistem Informasi`
     - *Deskripsi:* `Pengembangan website company profile, landing page promosi, situs tour & travel, hingga sistem informasi berbasis web kustom untuk instansi dan perusahaan.`
     - *Internal Link (`<Link href="/jasa-pembuatan-website">`)* dengan Anchor Text: `Lihat Layanan Pembuatan Website`
   - **Kartu Layanan 2 (`<h3>`):** `Jasa Pembuatan Aplikasi Mobile (Android & iOS)`
     - *Deskripsi:* `Perancangan dan pembuatan aplikasi mobile kustom untuk layanan publik instansi, presensi pegawai berbasis lokasi (geotagging), dan operasional bisnis.`
     - *Internal Link (`<Link href="/jasa-pembuatan-aplikasi-mobile">`)* dengan Anchor Text: `Lihat Layanan Aplikasi Mobile`
   - **Kartu Layanan 3 (`<h3>`):** `Jasa Kelola Iklan Meta Ads (Facebook & Instagram)`
     - *Deskripsi:* `Manajemen kampanye iklan Facebook dan Instagram berbasis data yang difokuskan untuk menghasilkan prospek (Click-to-WhatsApp) dan konversi penjualan.`
     - *Internal Link (`<Link href="/jasa-iklan-meta-ads">`)* dengan Anchor Text: `Lihat Layanan Meta Ads`
   - **Kartu Layanan 4 (`<h3>`):** `Jasa Google Ads & Produksi Video Kreatif`
     - *Deskripsi:* `Optimasi iklan pencarian Google untuk menangkap calon pembeli siap transaksi serta jasa video editing profesional untuk materi iklan Reels, TikTok, dan profil korporat.`

3. **Seksi Keunggulan / Value Proposition:**
   - **`<h2>`:** `Mengapa Instansi dan Bisnis di Kalimantan Selatan Memilih Kami?`
   - **Poin 1 (`<h3>`):** `Pengembangan Kustom dengan Teknologi Modern & Aman`
     - *Teks:* `Dibangun menggunakan arsitektur modern (Next.js, Laravel, Flutter/React Native) yang menjamin kecepatan muat tinggi, keamanan data, dan kemudahan pengembangan jangka panjang.`
   - **Poin 2 (`<h3>`):** `Strategi Pemasaran Berfokus pada Konversi & ROAS`
     - *Teks:* `Kami tidak sekadar mengejar tayangan atau klik kosong. Setiap kampanye iklan dirancang untuk menghasilkan kontak prospek nyata ke WhatsApp dan peningkatan omzet.`
   - **Poin 3 (`<h3>`):** `Siap Diskusi Tatap Muka di Kandangan, HSS & Area Kalimantan Selatan`
     - *Teks:* `Berbasis di Kandangan, Kabupaten Hulu Sungai Selatan, tim kami siap melakukan koordinasi langsung (onsite meeting) maupun daring untuk wilayah Banua Enam, Banjarbaru, Banjarmasin, dan seluruh Indonesia.`

4. **Seksi Portofolio & Studi Kasus:**
   - **`<h2>`:** `Portofolio Proyek & Studi Kasus Terpilih`
   - *Instruksi AI:* Pastikan setiap gambar di portofolio memiliki atribut `alt` deskriptif yang memuat kata kunci (contoh: `alt="Portofolio pembuatan website sistem informasi di Kalimantan Selatan"`).

5. **Seksi FAQ Homepage:**
   - **`<h2>`:** `Pertanyaan Umum (FAQ) Seputar Layanan Kami`
   - **Item 1 (`<h3>`):** `Apakah melayani pengerjaan proyek di luar Kandangan dan Hulu Sungai Selatan?`
     - *Jawaban:* `Ya. Selain melayani tatap muka langsung di area Kandangan (HSS) dan Banua Enam (Tapin, Barabai/HST, Amuntai/HSU, Balangan, Tabalong), kami juga menangani klien di Banjarbaru, Banjarmasin, serta berbagai kota di seluruh Indonesia secara online maupun onsite.`
   - **Item 2 (`<h3>`):** `Apakah website dan aplikasi yang dibuat bisa disesuaikan dengan kebutuhan spesifik instansi atau perusahaan?`
     - *Jawaban:* `Tentu. Kami mengkhususkan diri pada pengembangan sistem kustom (tailor-made) yang mengikuti alur kerja, regulasi instansi/dinas, maupun proses bisnis unik perusahaan Anda.`
   - **Item 3 (`<h3>`):** `Bagaimana cara memulai konsultasi pembuatan aplikasi atau kampanye iklan digital?`
     - *Jawaban:* `Anda dapat menghubungi tim kami melalui tombol WhatsApp yang tersedia untuk menjadwalkan sesi diskusi kebutuhan dan estimasi anggaran secara gratis.`

---

### HALAMAN 2: Jasa Pembuatan Website (`/jasa-pembuatan-website`)
**File Target:** `src/app/jasa-pembuatan-website/page.tsx`

#### A. Next.js Metadata (`export const metadata: Metadata`)
- **Title:** `Jasa Pembuatan Website Kalimantan Selatan & HSS | [Nama Brand]`
- **Description:** `Jasa pembuatan website profesional di Kandangan (HSS) & Kalimantan Selatan. Spesialis sistem informasi instansi, web company profile, travel, & landing page SEO.`
- **Keywords:** `["jasa pembuatan website kalimantan selatan", "jasa pembuatan website kandangan", "jasa bikin web hulu sungai selatan", "jasa website hss", "jasa pembuatan sistem informasi kalsel", "jasa pembuatan landing page kandangan", "web developer kalsel"]`
- **Alternates Canonical:** `/jasa-pembuatan-website`

#### B. Struktur Heading & Copywriting On-Page
1. **Hero Section:**
   - **Badge:** `Layanan Web Development & Sistem Informasi`
   - **`<h1>`:** `Jasa Pembuatan Website & Sistem Informasi Profesional di Kalimantan Selatan`
   - **Deskripsi Hero (`<p>`):** `Bangun kredibilitas bisnis dan efisiensi kerja instansi Anda dengan website yang cepat, aman, mobile-friendly, dan teroptimasi SEO. Melayani wilayah Kandangan (Hulu Sungai Selatan), Banua Enam, Banjarmasin, Banjarbaru, dan seluruh Indonesia.`

2. **Seksi Kategori Layanan Website:**
   - **`<h2>`:** `Solusi Pembuatan Website Sesuai Kebutuhan Sektor Anda`
   - **Item 1 (`<h3>`):** `Sistem Informasi & Portal Aplikasi Berbasis Web (Instansi, Dinas & Enterprise)`
     - *Deskripsi:* `Pengembangan aplikasi web kustom untuk mendukung digitalisasi layanan publik dan operasional internal, seperti e-office, sistem informasi manajemen daerah, pendataan terpadu, buku tamu digital, hingga dashboard pelaporan real-time.`
   - **Item 2 (`<h3>`):** `Website Bisnis Spesifik: Tour & Travel, Properti, dan Katalog Produk`
     - *Deskripsi:* `Dirancang khusus untuk mempermudah pelanggan melihat paket layanan, jadwal keberangkatan, simulasi harga, hingga pemesanan langsung yang terintegrasi dengan WhatsApp admin Anda.`
   - **Item 3 (`<h3>`):** `Website Company Profile Perusahaan, BUMN/BUMD, & Sekolah`
     - *Deskripsi:* `Tingkatkan kepercayaan mitra bisnis, investor, dan masyarakat melalui situs profil resmi berdesain eksklusif yang merepresentasikan profesionalisme organisasi Anda.`
   - **Item 4 (`<h3>`):** `Landing Page Promosi Berkonversi Tinggi`
     - *Deskripsi:* `Halaman penawaran khusus dengan struktur copywriting persuasif dan waktu muat super cepat, sangat efektif untuk mendampingi kampanye iklan Meta Ads dan Google Ads.`

3. **Seksi Keunggulan Teknis:**
   - **`<h2>`:** `Standar Kualitas & Keunggulan Teknis Website Kami`
   - **Item 1 (`<h3>`):** `Teknologi Modern (Next.js & Laravel) dengan Performa Tinggi`
     - *Deskripsi:* `Kode program yang bersih dan terstruktur memastikan website berjalan ringan di berbagai perangkat smartphone maupun desktop serta mudah dikembangkan di masa depan.`
   - **Item 2 (`<h3>`):** `Struktur On-Page SEO Friendly Sejak Hari Pertama`
     - *Deskripsi:* `Dilengkapi pengaturan meta tag dinamis, struktur heading semantik, sitemap otomatis, dan optimasi Core Web Vitals agar website Anda lebih cepat ditemukan di halaman pertama Google.`
   - **Item 3 (`<h3>`):** `Dashboard Admin Mudah Dikelola, Aman, & Bergaransi`
     - *Deskripsi:* `Dilengkapi panel manajemen konten (CMS) yang ramah pengguna, perlindungan keamanan berlapis, serta dukungan teknis dan pelatihan penggunaan bagi tim Anda.`

4. **Seksi Alur Kerja:**
   - **`<h2>`:** `Tahapan Pengerjaan Pembuatan Website`
   - **Langkah (`<h3>`):** `1. Konsultasi & Analisis Kebutuhan` -> `2. Perancangan Desain UI/UX` -> `3. Pengembangan (Coding) & Integrasi Sistem` -> `4. Uji Coba, Pelatihan Admin & Peluncuran`

5. **Seksi Cakupan Wilayah (Local SEO Booster):**
   - **`<h2>`:** `Area Layanan Pembuatan Website di Kalimantan Selatan`
   - **Paragraf:** `Sebagai tim pengembang yang berfokus di Kalimantan Selatan, kami siap memberikan layanan konsultasi dan pendampingan pembuatan website untuk klien di Kandangan (Kabupaten Hulu Sungai Selatan / HSS), Rantau (Tapin), Barabai (Hulu Sungai Tengah), Amuntai (Hulu Sungai Utara), Balangan, Tabalong, hingga Banjarbaru dan Banjarmasin.`

6. **Seksi Cross-Selling (Internal Link Silo):**
   - *Konten Kotak Info / CTA:* `Ingin website baru Anda langsung kebanjiran pengunjung dan calon pembeli potensial? Padukan website Anda dengan layanan ` **<Link href="/jasa-iklan-meta-ads">Jasa Kelola Iklan Meta Ads</Link>** ` atau kembangkan ekosistem bisnis Anda ke platform smartphone melalui ` **<Link href="/jasa-pembuatan-aplikasi-mobile">Jasa Pembuatan Aplikasi Mobile</Link>** ` kami.`

7. **Seksi FAQ Jasa Website:**
   - **`<h2>`:** `Pertanyaan Umum (FAQ) Jasa Pembuatan Website`
   - **Q1 (`<h3>`):** `Berapa biaya pembuatan website di Kandangan dan Kalimantan Selatan?`
     - *A1:* `Biaya pembuatan website disesuaikan dengan tingkat kompleksitas fitur, mulai dari paket terjangkau untuk Landing Page dan Company Profile UMKM, hingga pengembangan kustom untuk Sistem Informasi Instansi atau Perusahaan. Hubungi kami untuk mendapatkan rincian penawaran resmi.`
   - **Q2 (`<h3>`):** `Berapa lama waktu pengerjaan sebuah website hingga siap online?`
     - *A2:* `Untuk Landing Page dan Company Profile standar berkisar antara 5 hingga 14 hari kerja. Sedangkan untuk Sistem Informasi berbasis web dengan fitur kustom membutuhkan waktu sekitar 3 hingga 8 minggu tergantung cakupan modul.`
   - **Q3 (`<h3>`):** `Apakah layanan ini sudah termasuk domain, hosting/server, dan garansi maintenance?`
     - *A3:* `Ya, paket pembuatan website kami dapat mencakup pendaftaran domain (.com, .id, .co.id, dll), konfigurasi cloud server/hosting, sertifikat SSL (HTTPS), panduan pengelolaan admin, serta garansi pemeliharaan teknis.`

---

### HALAMAN 3: Jasa Aplikasi Mobile (`/jasa-pembuatan-aplikasi-mobile`)
**File Target:** `src/app/jasa-pembuatan-aplikasi-mobile/page.tsx`

#### A. Next.js Metadata (`export const metadata: Metadata`)
- **Title:** `Jasa Pembuatan Aplikasi Mobile Android & iOS Kalsel | [Nama Brand]`
- **Description:** `Jasa pembuatan aplikasi mobile Android & iOS kustom di Kandangan (HSS) & Kalimantan Selatan. Solusi aplikasi layanan publik instansi, presensi geotagging, & bisnis.`
- **Keywords:** `["jasa pembuatan aplikasi mobile kalsel", "jasa pembuatan aplikasi android kandangan", "developer aplikasi mobile hulu sungai selatan", "jasa pembuatan aplikasi instansi kalsel", "jasa buat aplikasi android ios banjarmasin"]`
- **Alternates Canonical:** `/jasa-pembuatan-aplikasi-mobile`

#### B. Struktur Heading & Copywriting On-Page
1. **Hero Section:**
   - **Badge:** `Mobile App Development (Android & iOS)`
   - **`<h1>`:** `Jasa Pembuatan Aplikasi Mobile (Android & iOS) Kustom di Kalimantan Selatan`
   - **Deskripsi Hero (`<p>`):** `Hadirkan layanan instansi dan kemudahan transaksi bisnis langsung di genggaman pengguna. Kami merancang dan mengembangkan aplikasi Android dan iOS yang cepat, stabil, dan terintegrasi penuh dengan sistem basis data terpusat.`

2. **Seksi Solusi Aplikasi Mobile:**
   - **`<h2>`:** `Solusi Pengembangan Aplikasi Mobile untuk Instansi dan Bisnis`
   - **Item 1 (`<h3>`):** `Aplikasi Layanan Publik & E-Government (Instansi Pemerintah / Daerah)`
     - *Deskripsi:* `Mempermudah masyarakat di daerah mengakses informasi publik, mengurus administrasi, menyampaikan pengaduan warga, hingga memantau program kerja secara transparan lewat smartphone.`
   - **Item 2 (`<h3>`):** `Aplikasi Internal: Presensi Geotagging, Koordinasi, & Kinerja Pegawai`
     - *Deskripsi:* `Dilengkapi fitur validasi titik koordinat lokasi (geofencing/GPS), swafoto real-time, pelaporan aktivitas harian lapangan, serta rekapitulasi kinerja otomatis yang terhubung ke dashboard web admin.`
   - **Item 3 (`<h3>`):** `Aplikasi Komersial: Booking Layanan, Katalog, & Operasional Bisnis`
     - *Deskripsi:* `Tingkatkan loyalitas pelanggan bisnis Anda melalui aplikasi pemesanan layanan, katalog produk interaktif, integrasi pembayaran, serta fitur Push Notification untuk mengirim promo langsung ke layar HP pelanggan.`

3. **Seksi Keunggulan Pengembangan:**
   - **`<h2>`:** `Mengapa Mempercayakan Pembuatan Aplikasi Mobile kepada Tim Kami?`
   - **Item 1 (`<h3>`):** `Pengembangan Lintas Platform (Android & iOS) yang Efisien`
     - *Deskripsi:* `Menggunakan teknologi modern yang memungkinkan aplikasi berjalan mulus di perangkat Android maupun iPhone (iOS) dengan performa optimal dan tampilan antarmuka (UI/UX) intuitif.`
   - **Item 2 (`<h3>`):** `Integrasi Penuh dengan Dashboard Web & REST API`
     - *Deskripsi:* `Setiap aplikasi mobile yang kami bangun dilengkapi panel kontrol berbasis web (Backend Admin) sehingga Anda dapat memantau data, pengguna, dan laporan secara real-time.`
   - **Item 3 (`<h3>`):** `Pendampingan Publikasi Resmi ke Google Play Store & Apple App Store`
     - *Deskripsi:* `Tim kami menangani seluruh proses teknis kompilasi, pengujian keamanan, hingga pengunggahan aplikasi agar tayang secara resmi di Play Store dan App Store.`

4. **Seksi Cross-Selling (Internal Link Silo):**
   - *Konten Kotak Info / CTA:* `Butuh portal web pendamping atau sistem informasi berbasis browser? Lihat juga layanan ` **<Link href="/jasa-pembuatan-website">Jasa Pembuatan Website & Sistem Informasi</Link>** ` kami.`

5. **Seksi FAQ Jasa Aplikasi Mobile:**
   - **`<h2>`:** `Pertanyaan Umum (FAQ) Jasa Pembuatan Aplikasi Mobile`
   - **Q1 (`<h3>`):** `Apakah aplikasi yang dibuat bisa berjalan di HP Android sekaligus iPhone (iOS)?`
     - *A1:* `Ya, kami dapat mengembangkan aplikasi untuk platform Android saja maupun lintas platform (Android dan iOS sekaligus) sesuai dengan target pengguna dan anggaran proyek Anda.`
   - **Q2 (`<h3>`):** `Apakah sudah termasuk halaman admin (dashboard web) untuk mengelola isi aplikasi?`
     - *A2:* `Betul. Setiap pembuatan aplikasi mobile kustom sudah mencakup pengembangan Backend API dan Dashboard Admin berbasis web untuk mengelola data pengguna, konten, dan laporan.`
   - **Q3 (`<h3>`):** `Apakah melayani diskusi langsung untuk instansi atau perusahaan di Kalimantan Selatan?`
     - *A3:* `Sangat bisa. Tim kami yang berlokasi di Kandangan (HSS) siap melakukan paparan teknis dan diskusi langsung ke kantor atau instansi Anda di wilayah Hulu Sungai Selatan, Banua Enam, Banjarbaru, maupun Banjarmasin.`

---

### HALAMAN 4: Jasa Iklan Meta Ads (`/jasa-iklan-meta-ads`)
**File Target:** `src/app/jasa-iklan-meta-ads/page.tsx`

#### A. Next.js Metadata (`export const metadata: Metadata`)
- **Title:** `Jasa Iklan Meta Ads (FB & IG) Fokus Konversi WA | [Nama Brand]`
- **Description:** `Jasa kelola iklan Meta Ads (Facebook & Instagram Ads) profesional di Kalimantan Selatan. Optimasi kampanye Click-to-WhatsApp untuk banjir prospek & closing.`
- **Keywords:** `["jasa iklan meta ads", "jasa iklan facebook instagram kalsel", "jasa digital marketing kandangan hss", "jasa iklan meta ads click to whatsapp", "jasa pasang iklan fb ig umkm", "agensi meta ads kalimantan selatan"]`
- **Alternates Canonical:** `/jasa-iklan-meta-ads`

#### B. Struktur Heading & Copywriting On-Page
1. **Hero Section:**
   - **Badge:** `Performance Marketing — Facebook & Instagram Ads`
   - **`<h1>`:** `Jasa Kelola Iklan Meta Ads (Facebook & Instagram) Berbasis Konversi & Prospek`
   - **Deskripsi Hero (`<p>`):** `Berhenti membakar anggaran iklan hanya untuk klik dan tayangan tanpa hasil. Kami membantu bisnis Anda mendatangkan chat calon pembeli potensial ke WhatsApp dan meningkatkan penjualan melalui manajemen kampanye Meta Ads yang terukur.`

2. **Seksi Masalah Klien (Pain Points):**
   - **`<h2>`:** `Kendala Beriklan yang Sering Dialami Pemilik Bisnis`
   - **Item 1 (`<h3>`):** `Anggaran Iklan Habis Banyak Tapi Minim Chat Masuk ke WhatsApp`
     - *Deskripsi:* `Hanya menekan tombol "Promosikan/Boost Post" di aplikasi membuat iklan tayang ke audiens yang salah dan tidak memiliki niat membeli.`
   - **Item 2 (`<h3>`):** `Prospek yang Masuk Kurang Berkualitas (Hanya Sekadar Tanya)`
     - *Deskripsi:* `Tanpa penyaringan audiens, copywriting yang tepat, dan pelacakan sinyal konversi, tim CS Anda akan kelelahan melayani chat yang tidak berujung transaksi.`
   - **Item 3 (`<h3>`):** `Tidak Punya Waktu Mengurus Teknis Ads Manager & Materi Video Iklan`
     - *Deskripsi:* `Mengatur struktur kampanye, membaca metrik CPR/ROAS, hingga membuat desain dan video iklan yang menarik perhatian membutuhkan keahlian khusus.`

3. **Seksi Strategi & Solusi Kami:**
   - **`<h2>`:** `Strategi Optimasi Meta Ads yang Kami Terapkan untuk Bisnis Anda`
   - **Item 1 (`<h3>`):** `Optimasi Kampanye Click-to-WhatsApp (CTWA) & Pelacakan Konversi`
     - *Deskripsi:* `Kami mengarahkan algoritma Meta untuk mencari profil pengguna yang paling berpotensi menghubungi WhatsApp Anda dan melakukan pembelian.`
   - **Item 2 (`<h3>`):** `Riset Audiens Presisi, Retargeting, & Integrasi Meta Pixel`
     - *Deskripsi:* `Menjangkau calon pelanggan berdasarkan lokasi geografis, minat spesifik, hingga menargetkan ulang (retargeting) orang yang pernah mengunjungi website atau berinteraksi dengan akun Anda.`
   - **Item 3 (`<h3>`):** `Pembuatan Materi Kreatif (Ad Copy & Video Editing Reels/Stories)`
     - *Deskripsi:* `Didukung tim kreatif internal, kami membantu menyiapkan struktur pesan iklan dan pengeditan video pendek vertikal yang mampu menghentikan scroll pengguna di Facebook dan Instagram.`
   - **Item 4 (`<h3>`):** `Laporan Performa Transparan & Optimasi Anggaran Berkala`
     - *Deskripsi:* `Evaluasi rutin terhadap biaya per hasil (Cost Per Result), rasio klik (CTR), dan alokasi anggaran pada materi iklan yang terbukti paling menghasilkan konversi.`

4. **Seksi Cross-Selling (Internal Link Silo):**
   - *Konten Kotak Info / CTA:* `Ingin melipatgandakan rasio konversi iklan Anda dengan halaman penawaran khusus yang terpasang Meta Pixel? Gunakan juga layanan ` **<Link href="/jasa-pembuatan-website">Jasa Pembuatan Landing Page & Website</Link>** ` kami.`

5. **Seksi FAQ Jasa Meta Ads:**
   - **`<h2>`:** `Pertanyaan Umum (FAQ) Jasa Iklan Meta Ads`
   - **Q1 (`<h3>`):** `Berapa minimal anggaran iklan (ad spend) untuk mulai menggunakan jasa Meta Ads ini?`
     - *A1:* `Anggaran iklan sangat fleksibel dan dapat dimulai dari skala uji coba (testing) harian yang terukur sesuai kapasitas bisnis atau UMKM Anda, kemudian ditingkatkan (scaling) seiring ditemukannya pola kampanye yang menghasilkan profit.`
   - **Q2 (`<h3>`):** `Apakah materi gambar dan video iklan disiapkan oleh tim agensi?`
     - *A2:* `Ya, kami menyediakan layanan terintegrasi mulai dari penyusunan naskah iklan (copywriting), desain visual, hingga video editing untuk materi iklan Reels dan Stories agar performa kampanye maksimal.`
   - **Q3 (`<h3>`):** `Bisnis apa saja yang cocok menggunakan layanan Meta Ads ini?`
     - *A3:* `Layanan ini sangat efektif untuk bisnis lokal maupun nasional seperti Agen Tour & Travel/Umroh, Klinik Kecantikan & Kesehatan, Properti, Kuliner, Pendidikan/Pelatihan, Otomotif, hingga UMKM dan Toko Online di Kalimantan Selatan maupun seluruh Indonesia.`

---

## 5. Spesifikasi JSON-LD Structured Data (Wajib Dipasang)
Buat komponen atau helper JSON-LD dan sisipkan `<script type="application/ld+json">` pada keempat halaman:

1. **Pada Homepage (`/`):**
   - Gunakan tipe `@type: "ProfessionalService"` (atau `"LocalBusiness"`).
   - Sertakan properti `address`:
     ```json
     "address": {
       "@type": "PostalAddress",
       "addressLocality": "Kandangan",
       "addressRegion": "Kalimantan Selatan",
       "addressCountry": "ID"
     }
     ```
   - Sertakan properti `areaServed`: `["Kandangan", "Hulu Sungai Selatan", "Rantau", "Barabai", "Amuntai", "Banjarbaru", "Banjarmasin", "Kalimantan Selatan", "Indonesia"]`.
   - Sertakan juga schema `@type: "FAQPage"` yang memuat 3 pertanyaan FAQ di Homepage.

2. **Pada Ketiga Halaman Layanan (`/jasa-pembuatan-website`, `/jasa-pembuatan-aplikasi-mobile`, `/jasa-iklan-meta-ads`):**
   - Sertakan schema `@type: "Service"` dengan `serviceType`, `provider` (merujuk ke bisnis utama di Kandangan, Kalimantan Selatan), dan `areaServed`.
   - Sertakan schema `@type: "FAQPage"` yang sesuai dengan daftar pertanyaan dan jawaban pada masing-masing halaman.
   - Sertakan schema `@type: "BreadcrumbList"` (Home -> Nama Layanan).

---

## 6. Sitemap & Robots.txt (Next.js App Router)
Pastikan file berikut ada dan terkonfigurasi di dalam `src/app/`:
1. **`src/app/sitemap.ts`:** Memuat daftar URL statis utama (`/`, `/jasa-pembuatan-website`, `/jasa-pembuatan-aplikasi-mobile`, `/jasa-iklan-meta-ads`) dengan `priority` (`1.0` untuk `/`, `0.9` untuk halaman layanan utama) dan `changeFrequency: 'weekly'`.
2. **`src/app/robots.ts`:** Mengizinkan indeksasi (`allow: '/'`) dan menunjuk ke lokasi `sitemap.xml`.

---

## 7. Checklist Verifikasi Akhir untuk AI Agent
Sebelum menyelesaikan tugas, jalankan pemeriksaan berikut:
- [ ] Pastikan setiap halaman (`page.tsx`) tepat memiliki **1 elemen `<h1>`**.
- [ ] Pastikan urutan heading berjenjang rapi (`<h1>` -> `<h2>` -> `<h3>`) tanpa melompati level heading.
- [ ] Pastikan kartu layanan di Homepage memiliki `<Link>` aktif ke `/jasa-pembuatan-website`, `/jasa-pembuatan-aplikasi-mobile`, dan `/jasa-iklan-meta-ads`.
- [ ] Pastikan ketiga halaman layanan memiliki tautan silang (*cross-selling internal link*) satu sama lain dan tautan kembali ke Homepage.
- [ ] Jalankan `pnpm build` atau pemeriksaan TypeScript (`tsc --noEmit`) untuk memastikan tidak ada *error* kompilasi.