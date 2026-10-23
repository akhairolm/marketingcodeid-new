# Analisa UX/UI & Daya Jual Halaman `/jasa-pembuatan-website`

**File yang dianalisis:** `src/app/(frontend)/jasa-pembuatan-website/page.tsx` (1657 baris)
**Tanggal analisa:** 22 Oktober 2026
**Fokus:** Prinsip best practice UX/UI + efektivitas copywriting/CRO (daya jual)

---

## 1. Ringkasan Eksekutif

Halaman sudah sangat matang secara struktur. Alur persuasi klasik (Problem → Solution → Proof → Pricing → Process → Comparison → FAQ → CTA) tersaji lengkap dengan dukungan visual mockup custom, SEO schema (Service, FAQ, Breadcrumb), dan optimasi gambar (`picture` + preload AVIF/WebP). Secara copywriting halaman **menjual** — angle "bebas komisi marketplace + 100% hak milik" konsisten di seluruh section.

Namun terdapat **beberapa kelemahan UX/UI dan CRO yang menahan konversi**, terutama di sisi:
- Hierarki visual pricing (badge "PALING DIMINATI" belum cukup dominan vs 2 kompetitor paket).
- Social proof lemah di hero (tidak ada angka klien, rating, logo).
- Form friction (hanya WhatsApp — tidak ada tangkap lead silent/form).
- Aksesibilitas warna beberapa teks di luar WCAG AA.
- Beberapa micro-copy CTA generik ("Konsultasi Gratis" muncul 7+ kali tanpa variasi niat).

**Rating keseluruhan:**
- UX/UI best practice: **7.5 / 10**
- Daya jual (CRO/copy): **8 / 10**
- Peluang uplift konversi dari rekomendasi di bawah: **estimasi +25–40%**.

---

## 2. Hal-Hal yang Sudah Baik (Pertahankan)

### 2.1. Struktur Narasi
- Urutan 10 section mengikuti alur persuasi AIDA + PAS (Problem-Agitate-Solve) yang teruji.
- Section "Ekosistem Toko Mandiri" di hero (Shopee + IG/TikTok + Website) **brilliant** — menghilangkan objection "takut lepas marketplace" yang biasa jadi penghambat UMKM.

### 2.2. Pricing Transparency
- Tiga tier klasik (Good/Better/Best) dengan paket tengah di-highlight — anchoring psikologi sudah tepat.
- Mencantumkan **harga coret + harga promo + harga perpanjangan tahun ke-2** → transparansi biaya tersembunyi (poin unik yang menjawab objection utama).
- Setiap paket ada estimasi waktu pengerjaan → ekspektasi jelas.

### 2.3. Visual Craftsmanship
- Setiap problem/solution punya mockup custom (bukan stock icon) — tingkat polish tinggi, membedakan dari kompetitor template-based.
- Konsistensi warna brand (`#FF5C28` / `#C23605`) terjaga di seluruh section.
- Section mark berupa `§ 01 · § 02 ·` dengan hairline divider memberi karakter editorial yang premium.

### 2.4. Technical SEO
- `JsonLd` dengan `serviceSchema`, `faqSchema`, `breadcrumbSchema` lengkap.
- Metadata `openGraph`, `twitter`, `canonical` tersedia.
- Keywords long-tail Indonesia (`jasa pembuatan website umkm indonesia`, `buat website tanpa koding`) sesuai search intent.

### 2.5. Mobile-First
- Mockup komparasi punya versi `md:hidden` stacked view.
- Responsif font-size di hero (`text-3xl sm:text-5xl`) dan padding.

---

## 3. Masalah UX/UI (dan Rekomendasi Perbaikan)

### 3.1.  KRITIS — Hero Butuh Trust Signal, Tapi Agency Masih Baru (Belum Punya Angka Klien Besar)

**Konteks nyata:** Agency baru mulai. Klien masih sedikit (bisa jadi 3–10 klien). Membual "500+ klien" = fatal (user Indonesia pintar cross-check IG/portfolio, sekali ketahuan bohong, trust hancur permanen).

**Prinsip:** Jangan pakai social proof yang belum punya. Pakai **credibility stacking** dari aset yang MEMANG dimiliki. Startup agency terbaik menang bukan karena angka klien, tapi karena **transparansi + kesan "founder-led service"** (lebih personal, lebih dipercaya daripada agency besar yang tak kenal nama).

**Rekomendasi — Pakai salah satu atau kombinasi dari 7 angle berikut (sesuai yang bisa dibuktikan hari ini):**

#### A. **Founder Signature / Face Credibility** (paling kuat untuk agency baru)
Tambah di bawah hero CTA — foto founder + nama + 1 kalimat positioning:
```
[Foto Bulat Founder]  Dikerjakan Langsung oleh [Nama Founder]
                      Full-stack Developer • 5+ tahun pengalaman web dev
                      "Setiap website saya tangani personal, bukan diserahkan ke tim pemula."
```
Ini **mengubah agency anonim jadi orang nyata**. User Indonesia sangat sensitif ke human-touch — mereka lebih mau transfer ke "orang" daripada ke "PT".

#### B. **Portfolio Mini Strip (bukan angka, tapi hasil nyata)**
Tampilkan 3–5 thumbnail website klien real yang pernah dibuat (meski cuma 3). Format:
```
[thumb1.jpg]  [thumb2.jpg]  [thumb3.jpg]
tokojaya.com  bakerykayla.id  azkafashion.com
Fashion       F&B              Fashion
```
3 contoh real **lebih meyakinkan** daripada klaim "100+ klien" tanpa bukti.

#### C. **Transparansi Status Startup (Honest Positioning)**
Terbalik dari intuisi, honesty **menjual**. Ganti badge hero jadi:
```
 Agency Boutique — Fokus Melayani 10 Klien UMKM per Bulan
```
Angle: "sedikit klien = perhatian penuh ke tiap klien". Ini target UMKM yang **takut jadi klien ke-500 yang diabaikan**.

#### D. **Guarantee Stack sebagai Pengganti Testimoni**
Belum punya testimoni? Lawan dengan garansi yang berani:
```
 Garansi Uang Kembali 7 Hari
 Revisi Desain Hingga Anda Puas
 Website Live atau Uang Kembali 100%
```
Risk reversal = conversion lift tanpa butuh social proof.

#### E. **Response Time sebagai Social Proof Alternatif**
Agency besar sering lambat respon. Jadikan ini keunggulan:
```
 Rata-rata Balas Chat < 10 menit (jam kerja)
```
Mudah dibuktikan (user langsung chat & cek).

#### F. **Testimoni Mikro dari Klien yang Ada (3 cukup, asal real)**
Daripada klaim 120+ klien palsu, tampilkan **3 testimoni real** dengan:
- Nama lengkap klien
- Foto klien (minta izin, kasih diskon kecil sebagai pertukaran)
- Nama & jenis usaha
- Link ke website hasil karya (bukti verifikasi)

**3 testimoni real + foto + link > 500 testimoni anonim.**

#### G. **Teknologi/Stack sebagai Trust Signal**
Tampilkan logo tech yang dipakai (Next.js, Vercel, Cloudflare, PayloadCMS):
```
Dibangun dengan: [Next.js logo] [Vercel logo] [Cloudflare logo]
Teknologi yang sama digunakan oleh Nike, TikTok, dan ribuan brand global.
```
Borrow credibility dari teknologi, bukan dari klien.

#### Kombinasi Rekomendasi Final untuk Hero:
```
[Hero CTA buttons]
──────────────────────────────────
[Foto Founder]  Dikerjakan langsung oleh Ahmad Khairol M.
                Full-stack Developer • 5+ tahun

 Balas chat < 10 menit  •   Garansi 7 hari uang kembali  •   Revisi sampai puas
```
Lalu di section baru di bawah hero, tambahkan **"Karya Terbaru Kami"** = 3 thumbnail portfolio real.

**Prioritas:** TINGGI. Dampak: +10–20% trust lift tanpa klaim palsu.

** WAJIB JUJUR:** Jangan pernah pakai angka klien/rating fiktif. Sekali ketahuan, Google review bisa dibanjiri 1-star dan recovery butuh 2+ tahun.

---

### 3.2.  KRITIS — Pricing Tengah (Decoy) Kurang Dominan
**Masalah:** Paket tengah "Web Katalog, Profil & Blog" sudah di-highlight dengan `scale-[1.02]` dan border `#FF5C28`, tapi harga paket Landing (Rp 1.190.000) jauh lebih murah → user price-sensitive akan tetap pilih landing. Decoy effect belum maksimal karena **selisih fitur paket Landing vs paket Katalog belum di-eksplisitkan secara visual**.

**Rekomendasi:**
1. Pada paket Landing, tambah **limitation note** halus di akhir fitur:
   ```
    Tidak termasuk: Dashboard admin mandiri, multi-halaman, blog SEO
   ```
2. Pada paket Katalog, tambah 1 bullet pembeda eksplisit di paling atas:
   ```
    "Fitur paling lengkap dengan harga paling masuk akal — 70% klien UMKM pilih paket ini"
   ```
3. Pertimbangkan **cicilan 2x** untuk paket tengah → "Rp 2.190.000 atau cicil 2x Rp 1.095.000".

**Prioritas:** TINGGI. Dampak: shift revenue mix ke paket tengah (margin lebih baik).

---

### 3.3.  SEDANG — Section Problem Tidak Memiliki Agitation yang Kuat
**Masalah:** 4 problem card di section "Tantangan Bisnis Saat Ini" sudah bagus visualnya, tapi copy belum cukup **menyakitkan secara emosional**. Contoh:
> "Komisi per transaksi makin tinggi (5–12%)..."

Ini fakta, bukan agitation. User butuh dirasakan **kerugian pribadinya**.

**Rekomendasi — Rewrite ke Loss Framing:**
- Problem 01: *"Rp 1.550.000 Hilang Tiap Omzet Rp 10 Juta — Setiap. Bulan. Terus-menerus."*
- Problem 03: *"Pelanggan Loyal Anda Jadi 'Milik' Marketplace, Bukan Milik Anda — Mereka Tidak Bisa Anda Hubungi Ulang Saat Promo Lebaran."*

Angka harus **personal + recurring + tidak bisa di-reverse** (prinsip loss aversion).

**Prioritas:** SEDANG. Dampak: +5–10% konversi di bawah fold.

---

### 3.4.  SEDANG — Terlalu Banyak CTA Serupa, Hilang Niat
**Masalah:** Teks CTA "Konsultasi Gratis via WhatsApp" / "Konsultasi Gratis" muncul **minimal 7 kali** dengan micro-copy identik. User kelelahan (CTA blindness) + tidak paham perbedaan niat tiap CTA.

**Rekomendasi — Variasi Niat sesuai Konteks:**
| Section | CTA Lama | CTA Baru (lebih spesifik) |
|---------|----------|---------------------------|
| Hero | Konsultasi Gratis via WhatsApp | **Chat Admin: "Saya Mau Website Toko"** |
| Pricing Landing | Konsultasi Gratis | **Ambil Paket Landing (Rp 1.190.000)** |
| Pricing Katalog | Konsultasi Gratis | **Pesan Paket Katalog Sekarang** |
| Pricing Pro | Konsultasi Gratis | **Diskusi Kustomisasi Pro** |
| Section 8 (Nasional) | Mulai Konsultasi Online | **Cek Ketersediaan Slot Bulan Ini** |
| Final CTA | Mulai Konsultasi Gratis via WhatsApp | **Diskusi Rencana Toko Saya — 100% Gratis** |

**Prioritas:** SEDANG. Dampak: +5–8% click-through CTA.

---

### 3.5.  SEDANG — Tidak Ada Scarcity / Urgency Trigger
**Masalah:** Tidak ada elemen urgency sama sekali. Harga coret saja tidak cukup — user tidak tahu promo "sampai kapan".

**Rekomendasi:**
Tambah strip tipis di atas section pricing:
```
 Promo Spesial Oktober: Diskon Rp 660rb + Gratis Desain Logo (3 slot tersisa)
```
**Hati-hati:** harus jujur. Jangan pakai fake countdown. Pakai scarcity nyata (slot pengerjaan, limited bonus per bulan).

**Prioritas:** SEDANG. Dampak: +10–15% urgency-driven conversion.

---

### 3.6.  SEDANG — FAQ di Bawah Sendirian, Terlalu Dekat Final CTA
**Masalah:** FAQ memakai `<details>` native (bagus untuk accessibility), tapi urutan nomor FAQ **belum di-prioritize by objection weight**. FAQ paling krusial ("Apakah ada sewa bulanan?") ada di nomor 5 — padahal ini objection terkuat yang menahan konversi.

**Rekomendasi — Reorder FAQ by Decision Weight:**
1. (lama #5) **Sewa bulanan?** → naikkan ke #1
2. (lama #3) **Domain & hosting termasuk?** → #2
3. (lama #6) **Berapa lama?** → #3
4. (lama #1) **Saya gaptek?** → #4
5. (lama #2) **Alur pemesanan pembeli?** → #5
6. (lama #4) **Luar kota?** → #6

Pertimbangkan juga **tambah FAQ "Garansi uang kembali?"** — ini objection diam yang jarang ditanya tapi berpengaruh besar.

**Prioritas:** SEDANG. Dampak: +3–5% konversi.

---

### 3.7.  RINGAN — Kontras Beberapa Teks Berpotensi Gagal WCAG AA
**Masalah:**
- `text-neutral-400` pada background putih (muncul di `item.time` dan harga coret) — contrast ratio diperkirakan < 4.5:1.
- `text-neutral-500` pada background cream/dot — borderline.
- Teks `text-[9px]` dan `text-[10px]` di mockup — di bawah ukuran minimum readable mobile (12px).

**Rekomendasi:**
- Ganti `text-neutral-400` → `text-neutral-500` atau `text-neutral-600` di konteks informasi penting (harga coret boleh tetap 400 karena dekoratif/strike-through).
- Minimum font-size di mockup: `text-[11px]` (bukan 9–10px). Jika space sempit, kurangi info; jangan kurangi ukuran font di bawah 11px.
- Jalankan audit `axe-core` / Lighthouse Accessibility → target > 90.

**Prioritas:** RINGAN tapi WAJIB (sudah ada aturan di `AGENTS.md` project: Accessibility > 90).

---

### 3.8.  RINGAN — Hero H1 Terlalu Panjang di Mobile
**Masalah:**
```
"Miliki Website & Toko Online Profesional Tanpa Ribet Koding"
```
Di mobile (`text-3xl`), heading ini pecah ke 3 baris → occupy terlalu banyak viewport, mendorong CTA ke bawah fold.

**Rekomendasi:**
- Mobile H1 (short): *"Website Toko Online Profesional. Tanpa Koding."*
- Desktop H1 (long): tetap seperti sekarang.
- Implementasi: pakai `<span className="hidden sm:inline">...</span>` untuk kata tambahan.

**Prioritas:** RINGAN. Dampak: hero fold mobile lebih padat.

---

### 3.9.  RINGAN — Section "Layanan Purna Jual" Terlalu Pasif
**Masalah:** Section 6 (Komitmen Purna Jual) berisi 3 kartu generic ("Jalur Chat", "Bantuan Update", "Panduan"). Tidak ada CTA di akhir section. User baca → selesai → scroll ke bawah tanpa action.

**Rekomendasi:**
Tambah mini-CTA di akhir section 6:
```
Punya pertanyaan spesifik soal purna jual? → Tanya tim via WhatsApp [button]
```
Atau tambah **durasi garansi eksplisit** di salah satu kartu: *"Garansi pemeliharaan **1 tahun penuh**, tanpa biaya tambahan."*

**Prioritas:** RINGAN.

---

### 3.10.  RINGAN — Section "Jangkauan Nasional" Repetitif dengan Hero
**Masalah:** Section 8 mengulang "melayani seluruh Indonesia" yang sudah ada di hero badge. Nilai tambahnya minim (hanya narasi).

**Rekomendasi (pilih salah satu):**
a) **Ganti dengan peta Indonesia visual** menunjukkan dot/titik kota yang sudah dilayani (butuh data).
b) **Ganti dengan 3-4 testimoni singkat per region** (Jakarta, Surabaya, Makassar, Medan) → bukti nyata jangkauan.
c) **Hapus section**, pindahkan 1 kalimat ke FAQ #4 saja.

Opsi (b) paling impactful.

**Prioritas:** RINGAN.

---

## 4. Masalah Daya Jual (Copywriting/CRO)

### 4.1.  SEDANG — Optimalkan WhatsApp Flow (Jangan Paksa Email)

**Konteks nyata:** Orang Indonesia **tidak nyaman transaksi via email**. Email di Indonesia dipakai untuk kerja formal / notifikasi marketplace, bukan untuk tanya-tanya jasa. Mendorong email form = memaksa behavior yang tidak natural = bounce lebih tinggi, bukan lebih rendah.

**Prinsip baru:** WhatsApp-first adalah **keputusan yang benar** untuk market Indonesia. Fokus ke **mengoptimalkan WhatsApp funnel** supaya lebih banyak traffic lewat gerbang ini, dan supaya WhatsApp bisa berperan ganda (chat + silent lead capture).

#### A. **WhatsApp Chat Pre-Fill Message yang Terdiferensiasi per Intent**
Saat ini pre-fill message mungkin generik ("Konsultasi Jasa Pembuatan Website"). Ganti jadi pre-fill yang **mengkualifikasi lead otomatis**:

Hero CTA → `?text=Halo%20Admin,%20saya%20tertarik%20bikin%20website.%20Jenis%20usaha%20saya:%20____%20Budget:%20____`

Pricing Katalog CTA → `?text=Halo%20Admin,%20saya%20mau%20ambil%20Paket%20Katalog%20Rp%202.190.000.%20Nama%20saya:%20____`

Final CTA → `?text=Halo%20Admin,%20saya%20masih%20ragu/butuh%20konsultasi%20sebelum%20pesan.%20Pertanyaan%20saya:%20____`

**Dampak:** User tinggal isi titik-titik → kirim. Zero friction. Anda langsung tahu intent + bisa segmentasi balasan.

#### B. **WhatsApp Click-to-Chat sebagai "Soft Lead Capture"**
WhatsApp Business API bisa auto-reply pesan pertama. Setup:
```
Auto-reply:
"Halo! Terima kasih chat MarketingCode.ID 
Admin akan balas < 10 menit (jam 08:00–22:00 WIB).

Sambil nunggu, nama kaka siapa & jenis usahanya apa?
(Biar admin siapkan rekomendasi yang pas)"
```
Ini **menangkap data lead silent** (nomor WA + nama + jenis usaha) meski user tidak jadi beli. Database WhatsApp = aset marketing jangka panjang (broadcast promo, retargeting).

#### C. **Floating WhatsApp Button yang Konteks-Aware**
Pastikan sticky WA button sudah ada (sesuai `AGENTS.md` project). Enhance dengan:
- **Scroll depth trigger:** Setelah user scroll > 50%, button membesar + muncul teks "Butuh bantuan? Chat admin"
- **Exit intent (desktop):** Saat kursor ke atas (hendak close tab), popup WhatsApp muncul: "Tunggu! Ada pertanyaan sebelum pergi?"
- **Idle timer (mobile):** Setelah user diam 30 detik, bounce animation di WA button untuk re-engage.

#### D. **"WhatsApp Business Profile" sebagai Trust Builder**
Pastikan nomor WA `6285128038243` sudah:
- Centang hijau (WhatsApp Business verified) jika memungkinkan — ini **trust signal paling kuat** di Indonesia
- Profile picture pakai logo MarketingCode.ID
- Katalog produk WA Business terisi (list paket)
- Deskripsi bio jelas + link web

Saat user klik CTA → langsung lihat profile professional → **trust lift besar sebelum chat dimulai**.

#### E. **Alternatif Lead Capture yang Natural untuk Indonesia (Bukan Email):**
Jika tetap ingin lead capture di luar WA:
1. **WA Broadcast Opt-in:** "Mau dapat promo & tips bisnis via WhatsApp? Kirim 'DAFTAR' ke [nomor]" → opt-in natural, 100% buka rate.
2. **Instagram DM:** "Follow @marketingcode.id untuk tips gratis + DM jika mau konsultasi". IG lebih natural untuk UMKM Indonesia daripada email.
3. **Google Form (bukan email form inline):** Kalau mau capture form, pakai Google Form yang terbuka di tab baru. Orang Indonesia familiar dengan Google Form (bukan intimidating seperti inline form).

#### F. **Hapus Rekomendasi Lead Magnet PDF via Email**
Rekomendasi awal (download PDF via email form) **batal**. Ganti dengan:
```
"Mau Tips Bikin Toko Online yang Laris?
Chat admin WA → kirim 'TIPS' → kami kirim PDF langsung ke WhatsApp"
```
Zero email, 100% konteks Indonesia-friendly.

**Prioritas:** SEDANG (sebelumnya KRITIS → turun karena approach lead capture email salah untuk market ini).

**Dampak gabungan A–F:** +15–25% WhatsApp conversion rate + build WhatsApp database untuk long-term marketing.

---

### 4.2.  SEDANG — Testimoni Section Numpang Komponen Homepage
**Masalah:** Section testimoni memakai `<TestimonialsSection />` dari homepage — kemungkinan isi testimoni-nya generic/umum, bukan testimoni spesifik klien website.

**Rekomendasi:**
Buat varian **`<TestimonialsSection variant="website" />`** yang hanya menampilkan testimoni klien jasa website (dengan foto, nama, kota, jenis usaha, dan — kalau boleh — screenshot website hasilnya).

Idealnya testimoni mengandung:
- Angka (contoh: "Omzet naik 2.3x dalam 4 bulan")
- Problem spesifik yang dipecahkan ("Dulu komisi Shopee makan 15% margin, sekarang 0%")
- Nama + foto + nama bisnis

**Prioritas:** SEDANG. Dampak besar untuk kredibilitas.

---

### 4.3.  SEDANG — Garansi Lemah / Tidak Spesifik
**Masalah:** Istilah "Garansi Pemeliharaan Resmi" muncul di pricing tapi tidak ada halaman detail / tooltip menjelaskan garansi apa, berapa lama, apa saja yang di-cover.

**Rekomendasi:**
Tambah tooltip atau mini-section "Garansi" dengan spesifik:
```
 Garansi 1 Tahun Pemeliharaan (Bug fix, update plugin)
 Garansi 7 Hari Uang Kembali Jika Tidak Sesuai Brief
 Garansi Keamanan SSL Resmi (Enkripsi data pembeli)
```

**Prioritas:** SEDANG. Risk reversal mengurangi friction pembelian.

---

### 4.4.  SEDANG — "Pengerjaan 3–5 Hari" vs "7–14 Hari" Belum Dijelaskan Kenapa
**Masalah:** User lihat selisih waktu dan selisih harga, tapi tidak paham **kenapa paket lebih mahal butuh lebih lama**. Secara psikologis: lama = ribet = mahal (negatif).

**Rekomendasi:**
Reframe sebagai nilai, bukan beban:
- Landing Page: *"Siap Rilis 3–5 Hari — Cocok untuk Launching Cepat"*
- Katalog: *"Pengerjaan Detail 7–14 Hari — Setiap Produk Dioptimasi"*
- Pro: *"Build Mendalam 10–21 Hari — Desain Kustom per Perusahaan"*

**Prioritas:** SEDANG.

---

### 4.5.  RINGAN — Section Komparasi Kolom "DIY (Wix/WordPress)" Terlalu Negatif
**Masalah:** Tabel komparasi menampilkan DIY sebagai kompetitor yang **selalu kalah** di 6/7 kriteria. User savvy akan curiga ini bias.

**Rekomendasi:**
Berikan **1 keunggulan DIY** untuk credibility (fair comparison):
- Kriteria baru: "Kontrol 100% atas kode" → DIY  check, MarketingCode.ID: ○ neutral (bisa request custom), Marketplace:  cross.

Lebih kredibel = lebih dipercaya.

**Prioritas:** RINGAN.

---

### 4.6.  RINGAN — Harga "Hemat Promo" Tidak Punya Konteks
**Masalah:** Badge "Hemat Promo" muncul tapi user tidak tahu promo sampai kapan atau untuk siapa.

**Rekomendasi:**
Ganti badge → "Promo Bulan Ini" atau "Harga Launching" + tooltip menjelaskan harga normal akan kembali ke `originalPrice` setelah tanggal X.

**Prioritas:** RINGAN.

---

## 5. Rekomendasi Prioritas Implementasi (Disesuaikan untuk Agency Baru)

### Sprint 1 (Dampak Tinggi, Effort Rendah, Realistis untuk Startup) — Target 1–2 hari kerja
1. **Hero credibility stack tanpa klaim palsu (3.1):**
   - Tambah foto + nama founder + 1 kalimat positioning personal.
   - Tambah 3 trust strip baru: ` Balas < 10 menit` · ` Garansi 7 hari uang kembali` · ` Revisi sampai puas`.
2. **Setup WhatsApp pre-fill message terdiferensiasi per CTA (4.1-A)** — tinggal update parameter `?text=` di `getWhatsAppUrl`, zero effort development.
3. **Setup auto-reply WhatsApp Business (4.1-B)** — 15 menit setup di app WhatsApp Business, langsung tangkap data lead silent.
4. **Pastikan WhatsApp Business Profile professional (4.1-D)** — foto, bio, katalog paket terisi.
5. Reorder FAQ by decision weight (3.6).
6. Variasi micro-copy CTA (3.4).
7. Perbaiki kontras `text-neutral-400` (3.7).

**Estimasi uplift konversi: +20–30%** (lebih tinggi dari estimasi awal karena WhatsApp optimization yang tepat sasaran untuk market Indonesia).

### Sprint 2 (Dampak Tinggi, Effort Sedang) — Target 3–5 hari kerja
8. **Portfolio Mini Strip** di bawah hero (3.1-B): 3 thumbnail klien real + link ke website hasilnya. Ini menggantikan "angka klien palsu" dengan "bukti karya real".
9. **Guarantee Stack explicit** section (3.1-D + 4.3): buat section "Jaminan Kami" dengan 3 garansi berani.
10. **Testimoni Mikro 3 klien real** dengan foto + nama + jenis usaha + link web (3.1-F / 4.2) — minta ke 3 klien pertama, kasih diskon kecil sebagai pertukaran.
11. Reframe problem copy ke loss aversion (3.3).
12. Explicit limitation note di paket Landing (3.2).
13. Reframe durasi pengerjaan sebagai nilai (4.4).
14. Scarcity jujur: "Agency Boutique — Fokus Melayani 10 Klien per Bulan" (3.1-C + 3.5).

**Estimasi uplift tambahan: +15–20%**

### Sprint 3 (Jangka Panjang) — Target 1–2 minggu
15. **Floating WhatsApp button scroll/exit-intent trigger** (4.1-C) — perlu komponen React custom, impact besar.
16. **WhatsApp Broadcast Opt-in** campaign ("ketik DAFTAR untuk tips bisnis gratis") → bangun database WA (4.1-E).
17. Peta/testimoni per region (3.10) — tunggu klien dari beragam kota dulu.
18. A/B test pricing table variant.
19. Verifikasi WhatsApp Business green tick (butuh dokumen bisnis, proses 2–4 minggu).

---

## 5.1. Strategi "Startup Trust Hack" — Checklist Khusus Agency Baru

Karena baru mulai dan klien masih sedikit, berikut taktik yang terbukti efektif untuk membangun trust tanpa modal besar:

### Taktik A — Content as Proof
- Bikin **1 blog post per minggu** di `/blog` tentang kasus klien yang pernah dikerjakan (dengan izin). Format: "Bagaimana [Nama Toko] Lepas dari Komisi Shopee 10% dan Hemat Rp X per Bulan". Blog post ini = **testimoni panjang + SEO + bukti ekspertise sekaligus**.
- Dalam 3 bulan, 12 blog post = portofolio tanpa harus klaim angka klien.

### Taktik B — Public Before/After
- Setiap klien yang website-nya live, publish **before/after screenshot** di IG + landing page section "Karya Terbaru".
- Visual before/after lebih persuasive daripada testimoni teks.

### Taktik C — Open Pricing + Open Process
- Sudah dilakukan (pricing transparan). Tambah "**Live Process Timeline**" per klien: tampilkan 1 case study dengan tanggal konkret ("Day 1: Brief diterima. Day 3: Desain draft. Day 7: Live.") → transparansi radikal = trust radikal.

### Taktik D — Founder Personal Branding
- Buat profile LinkedIn + IG founder yang aktif. Link dari footer web.
- Pembeli UMKM Indonesia **cek personal pemilik agency** sebelum transfer besar. Jika LinkedIn/IG founder kosong/sepi = red flag.

### Taktik E — Paid Testimonial Investment (Realistis untuk Startup)
- Ambil 5 klien pertama dengan **diskon 30-40%** sebagai pertukaran: izin tampilkan foto, nama, testimoni video (durasi 30 detik), dan link ke website hasilnya.
- Investment Rp 1-2 juta untuk 5 testimoni video real = **puluhan juta omzet lanjutan** dari trust yang terbangun.

### Taktik F — Garansi Agresif sebagai Pengganti Reputasi
- Agency besar jarang berani kasih "garansi uang kembali 100%" karena volume klien banyak.
- Agency kecil **justru harus berani** — risk-nya kecil karena klien sedikit, upside-nya besar (differensiasi vs agency besar).
- "Garansi 7 hari uang kembali 100%" = **mengalahkan ketiadaan social proof**.

### Taktik G — Pin Review Google Business Profile
- Daftarkan Google Business Profile (gratis).
- 3-5 review bintang 5 dari klien real sudah cukup muncul di Google Maps saat orang search "jasa pembuatan website [kota]".
- Google review = trust signal paling dipercaya di Indonesia.

---

## 6. Checklist Verifikasi Pasca-Implementasi

Sesuai `AGENTS.md` project:
- [ ] `pnpm build` exit code 0
- [ ] `pnpm test:int` 100% pass
- [ ] Lighthouse Desktop: Performance / A11y / Best Practices / SEO > 90
- [ ] Lighthouse Mobile: 4 kategori > 90
- [ ] Browser verification 1280x800 + 390x844
- [ ] Semua link WhatsApp pakai nomor `6285128038243`
- [ ] Tidak ada horizontal scroll di mobile
- [ ] Sticky CTA / floating button masih berfungsi

---

## 7. Kesimpulan

Halaman `/jasa-pembuatan-website` sudah berada di **tier atas** dalam industri jasa website Indonesia — struktur persuasi lengkap, visual craftsmanship tinggi, SEO rapi, dan positioning (0% komisi, hak milik) sangat tajam.

Yang menahan dari **menjadi tier S (konversi > 10%)** adalah:
1. **Belum ada credibility stack yang pas untuk agency baru** — bukan "angka klien besar", tapi founder-face + portfolio real + garansi berani.
2. **WhatsApp funnel belum dioptimasi** — pre-fill message generik, belum ada auto-reply, belum ada scroll/exit-intent trigger.
3. **Decoy pricing belum optimal** — paket tengah masih kalah pricing dari paket Landing.
4. **Problem agitation masih faktual, belum emosional**.

**Catatan penting untuk agency baru:**
- **Jangan pakai angka klien palsu** — sekali ketahuan, trust hancur permanen. Pakai Taktik Startup Trust Hack (Section 5.1).
- **WhatsApp-first adalah keputusan yang benar** untuk market Indonesia. Jangan paksa email form (bounce). Fokus optimalkan WhatsApp funnel.
- **Garansi berani** adalah senjata terkuat agency baru untuk mengalahkan agency besar yang punya reputasi tapi tidak berani kasih garansi.

Fokus Sprint 1 (WhatsApp optimization + founder credibility) akan memberikan uplift terbesar dengan effort paling kecil dan paling realistis untuk startup. Ukur dengan Google Analytics event tracking per CTA + jumlah inbound chat WA per hari.

