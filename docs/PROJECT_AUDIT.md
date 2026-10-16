# Audit kode, SEO, dan performa MarketingCode.ID

Tanggal: 16 Oktober 2026. Baseline: `aeb95ba`.

## Ruang lingkup dan batasan

Audit statis atas Next.js 16.3.3 / React 19, komponen publik dan dashboard, query Drizzle, metadata, sitemap, serta endpoint media. PR ini hanya dokumentasi; tidak mengubah aplikasi, dependensi, database, maupun konfigurasi deployment.

Belum dilakukan: Lighthouse, pengukuran Core Web Vitals pengguna nyata, pemeriksaan Search Console, analisis bundle hasil build, EXPLAIN pada database produksi, serta pengujian lint/build/integrasi/E2E. Karena itu, dampak performa di bawah adalah risiko berdasarkan kode, bukan angka benchmark. Status indeks database produksi belum diverifikasi. File rahasia tidak diperlukan untuk rekomendasi ini.

## Ringkasan

Fondasi yang sudah baik: pemisahan dashboard dan frontend, validasi input Zod, sanitasi rich text, hashing password, metadata dinamis, canonical, sitemap, robots, serta JSON-LD. Fokus perbaikan bukan mengganti stack: benahi kebenaran query dan fallback produksi, kurangi payload klien, lalu ukur sebelum optimasi lebih jauh.

Prioritas: **P1** = kebenaran konten/pengalaman pengguna, **P2** = efisiensi dan maintainability, **P3** = penyempurnaan setelah pengukuran. Tidak ada klaim insiden produksi atau celah keamanan kritis dari audit ini.

## Temuan dan tindakan

### 1. P1 — Detail dan sitemap bergantung pada 100 konten terbaru

**Bukti:** `src/lib/content/queries.ts:108–155`; `src/app/sitemap.ts:6–8`.

Listing artikel dan portofolio memakai `limit(100)`. Fungsi `getArticleBySlug` dan `getPortfolioBySlug` mencari slug dalam hasil listing tersebut. Konten published di luar 100 hasil dapat menghasilkan `null` pada detail dan hilang dari sitemap. Ini bukan N+1 query; masalahnya adalah penggunaan query listing sebagai sumber detail dan enumerasi sitemap.

**Tindakan:**
- Query detail langsung memakai slug **dan** status published, dengan limit satu.
- Pisahkan query sitemap: proyeksikan slug dan timestamp; enumerasi seluruh konten published, dengan pagination bila diperlukan.
- Pertahankan pagination pada listing, bukan menjadikannya pembatas detail.

**Kriteria selesai:** seed lebih dari 100 artikel/portofolio; detail item tertua tetap 200, seluruh URL published masuk sitemap, draft tetap tidak dapat diakses publik.

### 2. P1 — Fallback data contoh dapat tampil sebagai konten produksi

**Bukti:** `src/lib/content/queries.ts:31–40,119–120,140–149`.

Error query menghasilkan fallback contoh; hasil query kosong juga menghasilkan contoh. Sudah ada `console.warn` untuk error, jadi bukan tanpa logging. Namun kondisi database kosong dan database gagal dapat menghasilkan halaman contoh yang terlihat valid dan berpotensi terindeks.

**Tindakan:** batasi sample data ke mode demo/development eksplisit. Hasil kosong yang valid tetap kosong. Tentukan perilaku kegagalan produksi: respons gagal terkontrol atau stale cache yang memang dirancang, disertai alert. Jangan mengubah seluruh halaman kosong menjadi error.

**Kriteria selesai:** test membedakan database kosong, database gagal, dan demo; sitemap produksi tidak berisi slug contoh yang tidak diterbitkan.

### 3. P1 — Header homepage dan footer landing page ganda

**Bukti:** `src/app/(frontend)/layout.tsx:76–78`, `src/components/home/home-client.tsx:24`, `src/components/site/SiteHeader.tsx:25–45`, `src/components/home/HomeNavbar.tsx:45`; `src/app/(frontend)/digital-marketing/page.tsx:200–202`; `src/app/(frontend)/video-editing/page.tsx:199–201`.

Layout merender `SiteHeader`, homepage merender `HomeNavbar`; keduanya fixed pada posisi serupa. `SiteHeader` tidak memiliki pengecualian render homepage. Dua landing page juga memiliki footer lokal di samping footer layout.

**Tindakan:** pilih satu sumber header dan footer. Pertahankan tautan anchor/dropdown homepage saat menyatukan navigasi; hapus footer lokal yang redundan.

**Kriteria selesai:** pemeriksaan DOM dan visual mobile/desktop menunjukkan satu navigasi utama dan satu footer situs; menu keyboard, fokus, serta tautan homepage tetap bekerja.

### 4. P2 — Isi artikel dan detail portofolio dikirim ke komponen filter klien

**Bukti:** `src/lib/content/queries.ts:62–77,92`; `src/app/(frontend)/blog/page.tsx:66`; `src/app/(frontend)/portfolio/page.tsx:66`; `src/components/blog/BlogFilterGrid.tsx:1–8`; `src/components/portfolio/PortfolioFilterGrid.tsx:1–11`.

Objek lengkap melewati batas Server Component ke Client Component, padahal kartu tidak membutuhkan body artikel atau detail studi kasus. Payload bertambah mengikuti panjang konten.

**Tindakan:** proyeksikan field kartu sebelum mengirim props; bila bermanfaat, pilih field tersebut langsung dalam query listing. Tambahkan pagination ketika volume konten membutuhkannya, bukan mengirim seluruh katalog untuk filter lokal.

**Kriteria selesai:** body konten tidak muncul dalam payload listing; bandingkan ukuran transfer sebelum/sesudah dengan dataset sama. Pencarian/filter tetap benar.

### 5. P2 — Query listing belum memiliki deklarasi indeks yang sesuai

**Bukti:** `src/db/schema.ts:49–84,95–120`; `src/lib/content/queries.ts:114–116,135–137`.

Schema memiliki primary key dan unique constraint, tetapi tidak mendeklarasikan indeks khusus untuk filter status dan pengurutan tanggal. Dampaknya bergantung jumlah data dan query plan; bukan alasan memberi prioritas darurat pada tabel kecil.

**Tindakan:** ukur menggunakan `EXPLAIN (ANALYZE, BUFFERS)` pada data representatif. Pertimbangkan indeks `(status, publishedAt)` untuk artikel dan `(status, completedDate)` untuk portofolio, atau partial index published sesuai hasil ukur. Periksa indeks produksi sebelum membuat migrasi.

**Kriteria selesai:** migrasi dapat direview, tidak menggandakan indeks yang ada, dan query plan/waktu eksekusi sebelum-sesudah terdokumentasi.

### 6. P2 — Endpoint media menampung seluruh file sebelum mengirim

**Bukti:** `src/app/api/media/[id]/route.ts:26–34`.

`transformToByteArray()` membaca penuh objek; pembuatan `Uint8Array` berikutnya menambah salinan. Penggunaan memori meningkat pada request bersamaan. Route sudah memiliki `public, max-age=31536000, immutable`; klaim bahwa route tidak memiliki cache tidak benar.

**Tindakan:** evaluasi streaming body S3 ke respons. Pertahankan Content-Type, kebijakan cache, penanganan objek hilang, dan error. Evaluasi conditional GET/CDN berdasarkan pola trafik; jangan mengganti ke URL bertanda tangan tanpa menilai masa berlaku dan akses storage.

**Kriteria selesai:** tipe konten dan byte file tetap benar; error storage tertangani; ukur memori serta waktu byte pertama pada file besar dan request bersamaan.

### 7. P2 — Riwayat tanggal publikasi hilang saat kembali ke draft

**Bukti:** `src/app/(dashboard)/dashboard/(main)/artikel/actions.ts:33–38,83–91`.

Save sebagai draft mengisi `publishedAt: null`. Republish tanpa tanggal kemudian memakai waktu baru. Ini perlu keputusan produk: apakah tanggal merepresentasikan publikasi pertama atau publikasi terbaru? Edit biasa tidak selalu mereset tanggal karena form mengirim nilai tanggal sebelumnya.

**Tindakan:** tentukan semantik tanggal; jika publikasi pertama, pertahankan timestamp saat unpublish dan set otomatis hanya saat publikasi pertama. Gunakan `updatedAt` untuk pembaruan.

**Kriteria selesai:** test draft baru, publish pertama, edit published, unpublish, republish, dan tanggal manual.

### 8. P2 — Duplikasi komponen dan struktur halaman layanan

**Bukti:** `src/components/portfolio/PortfolioCard.tsx`; `src/components/home/PortfolioSection.tsx:17–84`; `src/app/(frontend)/page.tsx:55–66`; halaman `jasa-pembuatan-website/page.tsx`, `jasa-iklan-meta-ads/page.tsx`, dan `jasa-pembuatan-aplikasi-mobile/page.tsx` di `src/app/(frontend)/`.

Kartu portofolio memiliki bentuk data berbeda antara homepage dan listing; halaman layanan memiliki struktur berulang.

**Tindakan:** mulai dari kartu bersama dengan field minimal. Ekstrak bagian halaman layanan hanya ketika struktur dan kebutuhan aksesibilitas memang sama; pertahankan copy serta metadata per layanan. Hindari framework konfigurasi besar untuk tiga halaman.

**Kriteria selesai:** duplikasi berkurang tanpa menghilangkan perbedaan konten, heading, canonical, atau interaksi tiap halaman.

## SEO: pertahankan fondasi, ukur hasil

Metadata dan JSON-LD bukan pengganti konten yang relevan maupun jaminan rich result. Urutan rekomendasi:

1. **P1:** benahi detail/sitemap dan fallback produksi di atas; keduanya berdampak langsung pada URL serta konten yang dapat diindeks.
2. **P2:** validasi HTML hasil render untuk title, description, canonical absolut, OG image, robots, heading, dan JSON-LD pada homepage, satu halaman layanan, artikel, serta portofolio. Gunakan Search Console dan validator structured data; simpan hasil, bukan menganggap schema lengkap berarti valid.
3. **P2:** tinjau alt text gambar berdasarkan konteks. Gunakan deskripsi bermakna pada gambar informatif dan `alt=""` pada dekorasi. Jangan mewajibkan alt nonkosong untuk semua gambar.
4. **P3:** evaluasi FAQ yang hardcoded pada `src/app/(frontend)/blog/[slug]/page.tsx:115–155`. Pindahkan ke model konten hanya bila editor membutuhkan FAQ per artikel. Markup harus sesuai konten yang terlihat; rich result tidak dijamin.
5. **P3:** periksa konsistensi informasi bisnis, tautan internal, dan konten layanan berdasarkan query nyata Search Console. `/digital-marketing` dan `/video-editing` sudah menerima tautan dari `src/components/home/AccelerationSection.tsx:85,146`; keduanya bukan orphan page berdasarkan kode.

Tidak direkomendasikan tanpa kebutuhan: menambah hreflang pada situs satu bahasa, mengganti CreativeWork ke SoftwareApplication untuk semua portofolio, menambahkan rating yang tidak memiliki bukti, atau menambahkan SearchAction hanya untuk mengejar tampilan Google.

## Rencana pengukuran performa

- Jalankan lint, TypeScript check, build, tes integrasi, dan E2E pada lingkungan aman dengan database pengujian. Catat versi runtime dan hasil aktual.
- Ukur build produksi untuk homepage, blog listing/detail, dan portfolio listing/detail pada profil mobile yang sama. Catat median beberapa run: LCP, CLS, TBT sebagai indikator laboratorium, ukuran transfer, serta request gambar. INP dinilai dari data pengguna nyata ketika tersedia.
- Periksa elemen LCP sebelum mengganti gambar atau preload. Hero memakai sumber eksternal; self-hosting bukan otomatis lebih cepat karena jalur optimasi/cache perlu diukur.
- Analisis bundle publik terpisah dari dashboard sebelum memindahkan editor atau menambah dynamic import. Dependensi dashboard tidak otomatis masuk bundle homepage.
- Uji query dan media menggunakan data representatif. Jangan menaikkan cache TTL atau mengurangi validasi sesi semata-mata untuk mengejar angka.

## Urutan PR tindak lanjut

| Urutan | Cakupan | Verifikasi utama |
| --- | --- | --- |
| 1 | Query slug, sitemap independen, kebijakan fallback | >100 item, draft tidak bocor, DB kosong/gagal |
| 2 | Header/footer tunggal | DOM, keyboard, mobile/desktop |
| 3 | Props kartu minimal | Ukuran payload, filter, tampilan |
| 4 | Semantik tanggal publikasi | Siklus draft/publish/unpublish |
| 5 | Streaming media dan indeks setelah baseline | Byte/error/cache, memori, query plan |
| 6 | Konsolidasi komponen dan penyempurnaan SEO | Regression UI, metadata, validator |

Pisahkan perubahan perilaku dan refactor agar review serta rollback mudah. Tidak ada dependency baru yang diperlukan untuk memulai perbaikan utama.
