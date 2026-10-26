# Plan Implementasi: Offline Conversion Meta Ads dan Google Ads di Dashboard MarketingCode.ID

Dokumen ini merangkum rencana arsitektur dan langkah teknis implementasi fitur **Offline Conversion Tracking** untuk Meta Ads dan Google Ads pada sistem Dashboard MarketingCode.ID.

---

## 1. Latar Belakang dan Tujuan

### Permasalahan
Saat ini kampanye periklanan (Meta Ads dan Google Ads) mengarahkan calon klien dari Landing Page menuju percakapan WhatsApp. Transaksi dan pembayaran terjadi di dalam WhatsApp (*offline* dari sudut pandang browser).
Akibatnya:
1. Algoritma periklanan Meta dan Google hanya mencatat konversi mikro (*Click WhatsApp*), tanpa mengetahui pengguna mana yang berlanjut menjadi *Qualified Lead* atau *Closing Transaksi*.
2. Algoritma *Smart Bidding* (Maximize Conversions / Target ROAS) tidak optimal karena mengoptimasi ke arah pengklik biasa, bukan pembeli riil.

### Solusi
Membangun modul **Offline Conversion** di Dashboard yang mengintegrasikan:
1. **Menu Offline Conversion Meta Ads** (`/dashboard/offline-conversion/meta`)
2. **Menu Offline Conversion Google Ads** (`/dashboard/offline-conversion/google`)

Dengan arsitektur **Passive Webhook Listener** (Read-Only) pada WhatsApp, kode referensi pendek (*Short Reference Code*) di landing page, serta integrasi langsung ke **Meta Conversions API (CAPI)** dan **Google Ads API (Click Conversions)**.

---

## 2. Arsitektur Alur Data End-to-End

```
[ Pengunjung di Landing Page ]
          |
          | 1. Simpan gclid, fbclid, fbp, fbc, IP, User-Agent ke Database
          | 2. Generate kode referensi pendek (contoh: Ref: #MC-9K2A)
          v
[ Tombol WhatsApp di Landing Page ] -> Pre-filled: "Halo Admin, saya tertarik layanan X (Ref: #MC-9K2A)"
          |
          | 3. Calon klien kirim pesan chat ke nomor CS
          v
[ WhatsApp Business CS (HP / WA Web) ]
          |
          | 4. Unofficial WA Listener (Read-Only) mendeteksi pesan masuk
          v
[ Webhook Ingestion API ]
          |
          | 5. Ekstraksi kode #MC-9K2A dan nomor HP pengirim
          | 6. Cocokkan ke database -> Status berubah jadi "LEAD_RECEIVED"
          v
[ Dashboard MarketingCode.ID ]
          |
          | 7. Klien closing -> CS ubah status jadi "CLOSING" & masukkan nominal transaksi
          v
+-----------------------------+-----------------------------+
|                             |                             |
v                             v                             v
[ Meta Conversions API ]      [ Google Ads Conversion API ]  [ Log Internal ]
- action_source: website      - gclid / wbraid / gbraid      - Status pengiriman
- fbc, fbp, IP, User-Agent    - SHA-256 Hashed Phone         - Respon & Error API
- SHA-256 Hashed Phone        - Conversion Value (IDR)
- Event: Purchase / Lead      - Conversion Action Name
```

---

## 3. Struktur Antarmuka Pengguna (UI) di Dashboard

### Integrasi Navigasi Sidebar
Pada file [src/components/dashboard/sidebar-nav.tsx](file:///Users/ahmadkhairolmaulidi/Documents/Freelance/marketingcodeid-agency/project/src/components/dashboard/sidebar-nav.tsx), ditambahkan grup navigasi baru:

```typescript
// Tambahan grup navigasi pada sidebar-nav.tsx
const conversionNavItems = [
  {
    title: 'Meta Ads Conversion',
    href: '/dashboard/offline-conversion/meta',
    icon: Target, // Icon Lucide
  },
  {
    title: 'Google Ads Conversion',
    href: '/dashboard/offline-conversion/google',
    icon: TrendingUp, // Icon Lucide
  },
]
```

---

### Menu 1: Meta Ads Offline Conversion (`/dashboard/offline-conversion/meta`)

1. **Halaman Utama Ringkasan (`/dashboard/offline-conversion/meta/page.tsx`):**
   - **Kartu Metrik:** Total Sesi Klik, Total Lead WA Masuk, Total Closing Terkirim ke Meta, dan Rata-rata Event Match Quality (EMQ).
   - **Tabel Riwayat Konversi:**
     - Tanggal & Waktu
     - Kode Referensi (`#MC-XXXX`)
     - Nomor WhatsApp (format masking: `0812****789`)
     - Nilai Transaksi (IDR)
     - Parameter Meta: `fbc`, `fbp`
     - Status Pengiriman CAPI (`Terkirim`, `Pending`, `Gagal`)
     - Aksi: Tombol `Kirim Ulang` jika terjadi kegagalan jaringan.
2. **Formulir Manual Trigger Closing:**
   - Modal atau halaman form untuk mencari prospek berdasarkan kode referensi atau nomor WA, memasukkan nilai transaksi, dan menembakkan event `Purchase` ke Meta CAPI seketika.
3. **Pengaturan Kredensial Meta CAPI (`/dashboard/offline-conversion/meta/settings/page.tsx`):**
   - Meta Pixel ID / Dataset ID
   - System User Access Token (tersimpan terenkripsi)
   - Test Event Code (untuk verifikasi langsung di Meta Events Manager)
   - Toggle Otomatis Kirim Event `Lead` saat chat pertama masuk.

---

### Menu 2: Google Ads Offline Conversion (`/dashboard/offline-conversion/google`)

1. **Halaman Utama Ringkasan (`/dashboard/offline-conversion/google/page.tsx`):**
   - **Kartu Metrik:** Total GCLID Tertangkap, Total Konversi Closing, Akurasi Enhanced Conversions for Leads, Nilai Konversi Tercatat (IDR).
   - **Tabel Riwayat Konversi:**
     - Tanggal Klik & Tanggal Closing
     - GCLID / WBRAID / GBRAID
     - Nama Conversion Action (contoh: `Closing_WhatsApp_Sales`)
     - Nilai Konversi (IDR)
     - Status Upload API (`Success`, `Processing`, `Error`)
     - Tombol Ekspor CSV (format template resmi Google Ads Offline Conversion Upload untuk cadangan manual).
2. **Formulir Manual Upload / Rekonsiliasi:**
   - Input manual data transaksi yang memiliki kode referensi / GCLID.
3. **Pengaturan Google Ads API (`/dashboard/offline-conversion/google/settings/page.tsx`):**
   - Google Ads Customer ID (format: `xxx-xxx-xxxx`)
   - Conversion Action Name
   - Developer Token & OAuth2 Credentials (Client ID, Client Secret, Refresh Token)
   - Pengaturan Enhanced Conversions (Normalisasi nomor E.164 + SHA-256).

---

## 4. Desain Skema Database (Drizzle ORM & PostgreSQL)

Sistem database project menggunakan PostgreSQL dengan Drizzle ORM pada file [src/db/schema.ts](file:///Users/ahmadkhairolmaulidi/Documents/Freelance/marketingcodeid-agency/project/src/db/schema.ts). Berikut model data yang dirancang:

### 1. Tabel Sesi Klik Iklan (`ad_click_sessions`)
Menyimpan data pengunjung saat mengklik tombol WhatsApp di Landing Page.
- `id`: uuid (Primary Key)
- `ref_code`: varchar(20) - Unik (contoh: `#MC-8F21`)
- `source_url`: text - URL landing page tempat tombol diklik
- `gclid`: text - Google Click Identifier
- `wbraid`: text - Google iOS Web Identifier
- `gbraid`: text - Google iOS App Identifier
- `fbclid`: text - Facebook Click Identifier
- `fbc`: text - Formatted cookie `fb.1.{timestamp}.{fbclid}`
- `fbp`: text - Meta browser cookie `_fbp`
- `ip_address`: varchar(45)
- `user_agent`: text
- `phone_number`: varchar(30) - Nomor pengirim setelah chat diterima
- `phone_hash`: text - Hash SHA-256 dari nomor E.164
- `status`: varchar(20) - Nilai: `CLICKED`, `LEAD_RECEIVED`, `WON`, `LOST`
- `created_at`: timestamp with timezone
- `updated_at`: timestamp with timezone

### 2. Tabel Log Konversi Offline (`offline_conversions`)
Menyimpan transaksi closing yang dilaporkan oleh CS.
- `id`: uuid (Primary Key)
- `session_id`: uuid - Foreign key ke `ad_click_sessions`
- `platform`: varchar(20) - `META`, `GOOGLE`, atau `BOTH`
- `event_name`: varchar(50) - `Lead`, `Purchase`, `QualifiedLead`
- `conversion_value`: numeric(15, 2) - Nilai penjualan dalam Rupiah
- `currency`: varchar(10) - Default: `IDR`
- `conversion_time`: timestamp with timezone
- `created_by`: uuid - Foreign key ke tabel `users` (CS yang menandai)
- `created_at`: timestamp with timezone

### 3. Tabel Log Pengiriman API (`conversion_api_logs`)
Mencatat setiap payload dan respons dari Meta Graph API dan Google Ads API untuk audit dan debugging.
- `id`: uuid (Primary Key)
- `conversion_id`: uuid - Foreign key ke `offline_conversions`
- `platform`: varchar(20) - `META` atau `GOOGLE`
- `request_payload`: jsonb - Data yang dikirim (nomor HP telah di-hash)
- `response_status`: integer - HTTP status code
- `response_payload`: jsonb - Respons resmi dari platform iklan
- `is_success`: boolean
- `error_message`: text
- `created_at`: timestamp with timezone

### 4. Tabel Kredensial Platform Iklan (`ad_platform_configs`)
- `id`: uuid (Primary Key)
- `platform`: varchar(20) - Unik (`META` atau `GOOGLE`)
- `credentials_encrypted`: jsonb - Token dan identitas akun
- `is_active`: boolean
- `updated_at`: timestamp with timezone

---

## 5. Rincian Teknis Integrasi

### A. Format dan Sanitasi Data Meta CAPI
1. **action_source: "website"**:
   Karena jalur konversi adalah Landing Page -> WhatsApp, konversi dilaporkan sebagai konversi website dengan payload:
   - `client_user_agent` & `client_ip_address`
   - `fbc`: Memastikan format `fb.1.{timestamp_ms}.{fbclid}`
   - `fbp`: Mengambil cookie `_fbp`
   - `ph` (Phone Number): Normalisasi format internasional E.164 (misal: `+6285128038243`), bersihkan spasi/tanda hubung, lalu di-hash menggunakan algoritma SHA-256 huruf kecil.
2. **Event Match Quality (EMQ):**
   Dengan menyertakan `fbc` + `fbp` + IP + User Agent + Hashed Phone, skor EMQ di Meta Events Manager dijamin mencapai estimasi 8.0 - 9.3 dari 10.

### B. Format dan Sanitasi Data Google Ads Offline Conversion
1. **Parameter Pencocokan:**
   - Parameter utama: `gclid` (atau `wbraid` / `gbraid` untuk lalu lintas privasi iOS).
   - Parameter pendukung: **Enhanced Conversions for Leads** dengan nomor WhatsApp yang di-hash SHA-256 (`+628...`).
2. **Conversion Time Window:**
   - Google menerima upload konversi dalam kurun waktu hingga 90 hari sejak klik terjadi (rekomendasi ideal dalam 1-7 hari agar Smart Bidding segera belajar).
3. **Penyediaan Ekspor Format Resmi CSV:**
   - Menghasilkan file CSV standar Google Ads Offline Conversion (*Parameters: Google Click ID, Conversion Name, Conversion Time, Conversion Value, Conversion Currency*) yang siap diimpor langsung lewat UI Google Ads jika koneksi API sedang dalam pemeliharaan.

### C. Keamanan WhatsApp (Zero-Ban Risk Architecture)
1. **Murni Passive Listener:**
   - Unofficial API (seperti instance WAHA self-hosted di Docker) dihubungkan via QR Code Linked Device.
   - Instance API **hanya** bertugas menerima event webhook pesan masuk (`message.received`).
   - Tidak ada fitur auto-reply atau broadcast otomatis yang dijalankan lewat unofficial API tersebut.
   - Di mata server Meta, aktivitas nomor 100% pasif layaknya CS membuka WhatsApp Web biasa.

---

## 6. Tahapan Pelaksanaan Implementasi (Roadmap)

### Fase 1: Database & Fondasi Model
1. Menambahkan definisi tabel pada [src/db/schema.ts](file:///Users/ahmadkhairolmaulidi/Documents/Freelance/marketingcodeid-agency/project/src/db/schema.ts).
2. Menjalankan migrasi database via Drizzle (`pnpm drizzle-kit generate` & `pnpm drizzle-kit push`).

### Fase 2: Pelacakan di Landing Page
1. Membuat utilitas penangkap parameter URL (`gclid`, `fbclid`, `_fbp`, dsb.) dan pembuat kode referensi pendek di frontend.
2. Membuat endpoint Server Action `/api/ad-tracking/click` untuk mencatat klik WhatsApp sebelum mengarahkan ke link `https://wa.me/...`.

### Fase 3: Webhook Receiver untuk WhatsApp
1. Membangun API Route `/api/webhooks/whatsapp` yang aman dengan token otorisasi.
2. Logika ekstraksi kode referensi `#MC-XXXX` dan pencocokan otomatis ke tabel `ad_click_sessions`.

### Fase 4: Integrasi Modul Meta Ads CAPI
1. Membuat modul client Graph API Meta di `src/lib/integrations/meta-capi.ts`.
2. Membangun halaman antarmuka [Meta Ads Offline Conversion](file:///Users/ahmadkhairolmaulidi/Documents/Freelance/marketingcodeid-agency/project/src/app/(dashboard)/dashboard/(main)/offline-conversion/meta/page.tsx).
3. Membangun fitur test event langsung ke Meta Events Manager.

### Fase 5: Integrasi Modul Google Ads Conversion
1. Membuat modul Google Ads Conversion Service di `src/lib/integrations/google-ads.ts`.
2. Membangun halaman antarmuka [Google Ads Offline Conversion](file:///Users/ahmadkhairolmaulidi/Documents/Freelance/marketingcodeid-agency/project/src/app/(dashboard)/dashboard/(main)/offline-conversion/google/page.tsx).
3. Membangun generator ekspor CSV siap pakai untuk Google Ads Data Manager.

### Fase 6: Validasi Mutu dan Pengujian
1. Menambahkan pengujian integrasi (`tests/int/offline-conversion.int.spec.ts`) untuk validasi hashing SHA-256, formatting `fbc`, dan penanganan error.
2. Memastikan seluruh rangkaian pengujian lulus 100% via `pnpm test:int` dan kompilasi bersih via `pnpm build`.

---

## 7. Dokumen Breakdown Tugas Eksekusi

Rincian task teknis yang siap dieksekusi langkah demi langkah oleh AI agent tersedia pada:
[docs/tasks-offline-conversion-meta-google-ads.md](file:///Users/ahmadkhairolmaulidi/Documents/Freelance/marketingcodeid-agency/project/docs/tasks-offline-conversion-meta-google-ads.md)

