# Plan Perbaikan `/jasa-pembuatan-website` — Task Atomic

**Target file utama:** `src/app/(frontend)/jasa-pembuatan-website/page.tsx`
**Prinsip:** Setiap task = 1 unit perubahan kecil, 1 file, 1 blok edit, bisa diverifikasi langsung.
**Aturan setiap task:**
1. Baca kode asli dengan `read` dulu.
2. Edit dengan `edit` (bukan rewrite).
3. Jalankan `pnpm build` setelah 3-5 task.
4. Jangan skip verifikasi.

---

## STATUS KEPUTUSAN AWAL (Konfirmasi User, 22 Okt 2026)

| Keputusan | Status | Dampak |
|-----------|--------|--------|
| Task 4.1 & 4.2 (portfolio toko online real) |  **SKIP** — belum ada klien real | Portfolio tetap 3 card (travel + 2 instansi). Target barter 1 klien UMKM toko online dengan diskon 50-70% paralel. |
| Task 3.3 (bonus stack Rp 850rb) |  **AKTIF** — user sanggup deliver GSC + GA + Copywriting 1 Halaman | Perceived value Paket Katalog naik. Bonus harus benar-benar dikerjakan untuk tiap klien. |
| FASE 7 (split landing page) |  **SKIP SEMENTARA** — tunggu budget Google Ads > Rp 3jt/bulan + 1 klien toko online real | Fokus 1 landing universal dulu dengan optimasi FASE 1-6. |

**Catatan:** Fase 7 tetap dicatat dalam file ini sebagai referensi jangka panjang, dengan tag `[DITUNDA]`.

---

## FASE 1 — QUICK WINS (SEO + MESSAGE MATCH)

### TASK 1.1 — Tambah Eyebrow Badge SEO di Hero

**File:** `src/app/(frontend)/jasa-pembuatan-website/page.tsx`
**Lokasi:** Sekitar baris 878-883 (badge hero existing "Agency Boutique")
**Aksi:** Tambah 1 badge **BARU** di atas badge Agency Boutique.

**Cari blok:**
```tsx
<div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-neutral-200/80 shadow-xs hover:border-orange-200 transition-colors">
  <Store className="w-3.5 h-3.5 text-[#C23605]" />
  <span className="text-xs font-semibold text-neutral-700 tracking-tight">
    Agency Boutique — Fokus Maksimal 10 Klien/Bulan • Melayani Seluruh Indonesia
  </span>
</div>
```

**Ganti jadi:**
```tsx
<div className="space-y-2">
  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#FFF5F0] border border-orange-300/60">
    <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#C23605]">
      Jasa Pembuatan Website, Company Profile &amp; Toko Online Terima Beres
    </span>
  </div>
  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-neutral-200/80 shadow-xs hover:border-orange-200 transition-colors">
    <Store className="w-3.5 h-3.5 text-[#C23605]" />
    <span className="text-xs font-semibold text-neutral-700 tracking-tight">
      Agency Boutique — Fokus Maksimal 10 Klien/Bulan • Melayani Seluruh Indonesia
    </span>
  </div>
</div>
```

**Alasan:** Inject keyword utama "Jasa Pembuatan Website" + "Company Profile" ke above fold. Quality Score Google Ads naik.

**Verifikasi:** Lihat visual — ada 2 badge vertical di hero. Build tetap pass.

---

### TASK 1.2 — Ubah H1 Hero Agar Lebih Universal

**File:** `src/app/(frontend)/jasa-pembuatan-website/page.tsx`
**Lokasi:** Sekitar baris 880-886
**Aksi:** Tambah kata "Bisnis" di H1 agar tidak hanya menolak non-toko.

**Cari:**
```tsx
<h1
  aria-label="Miliki Website & Toko Online Profesional Tanpa Ribet Koding"
  className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#111827] tracking-tight leading-[1.2] sm:leading-[1.14]"
>
  <span className="hidden sm:inline">Miliki </span>Website &amp; Toko Online Profesional{' '}
  <span className="text-[#FF5C28]">Tanpa <span className="hidden sm:inline">Ribet </span>Koding</span>
</h1>
```

**Ganti jadi:**
```tsx
<h1
  aria-label="Miliki Website Bisnis & Toko Online Profesional Tanpa Ribet Koding"
  className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#111827] tracking-tight leading-[1.2] sm:leading-[1.14]"
>
  <span className="hidden sm:inline">Miliki </span>Website Bisnis &amp; Toko Online Profesional{' '}
  <span className="text-[#FF5C28]">Tanpa <span className="hidden sm:inline">Ribet </span>Koding</span>
</h1>
```

**Alasan:** Kata "Bisnis" mencakup Company Profile, Travel, Klinik, B2B — tidak hanya toko.

---

### TASK 1.3 — Ubah CTA Hero Jadi Universal

**File:** `src/app/(frontend)/jasa-pembuatan-website/page.tsx`
**Lokasi:** Sekitar baris 898, 910
**Aksi:** Ganti copy CTA "Konsultasi Rencana Toko" → universal.

**Cari:**
```tsx
href={getWhatsAppDirectUrl('Halo Admin MarketingCode.ID, saya mau konsultasi pembuatan website toko online. Usaha saya: ____')}
```

**Ganti jadi:**
```tsx
href={getWhatsAppDirectUrl('Halo Admin MarketingCode.ID, saya mau konsultasi pembuatan website. Jenis usaha saya: ____')}
```

Lalu cari:
```tsx
<span>Konsultasi Rencana Toko via WhatsApp</span>
```

**Ganti jadi:**
```tsx
<span>Konsultasi Website Gratis via WhatsApp</span>
```

**Alasan:** Pre-fill message + button text tidak lagi menolak prospek non-toko (travel, klinik, kontraktor, B2B).

---

### TASK 1.4 — Ubah CTA Final Section Jadi Universal

**File:** `src/app/(frontend)/jasa-pembuatan-website/page.tsx`
**Lokasi:** Sekitar baris 1750-1764 (Final CTA section)

**Cari:**
```tsx
href={getWhatsAppDirectUrl('Halo Admin MarketingCode.ID, saya ingin diskusi rencana pembuatan website toko saya secara gratis.')}
```

**Ganti jadi:**
```tsx
href={getWhatsAppDirectUrl('Halo Admin MarketingCode.ID, saya ingin diskusi rencana pembuatan website untuk usaha saya secara gratis.')}
```

Lalu cari:
```tsx
<span>Diskusi Rencana Toko via WhatsApp — 100% Gratis</span>
```

**Ganti jadi:**
```tsx
<span>Diskusi Kebutuhan Website via WhatsApp — 100% Gratis</span>
```

---

## FASE 2 — INDUSTRY TARGETING (Pill Badge)

### TASK 2.1 — Tambah Pill Badge "Cocok untuk Berbagai Jenis Usaha"

**File:** `src/app/(frontend)/jasa-pembuatan-website/page.tsx`
**Lokasi:** Setelah section Portfolio Strip (sekitar baris 1193, sebelum pembuka section Pricing)

**Cari penutup section Portfolio Strip** (tag `</section></div>` sebelum section Pricing). Gunakan grep untuk cari `{/* 4. PAKET & HARGA TRANSPARAN` lalu insert blok BARU **sebelum** komentar tersebut.

**Blok BARU untuk insert:**
```tsx
        {/* ============================================================== */}
        {/* INDUSTRY FIT PILLS (SEO + Universal Target)                    */}
        {/* ============================================================== */}
        <div className="relative bg-paper-warm py-10 sm:py-12 border-y border-neutral-200/60">
          <section className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-neutral-200/80 text-[11px] font-bold text-neutral-700 mb-4">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              <span>Cocok untuk Berbagai Jenis Usaha</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm">
              {[
                'Toko Online & Ritel',
                'Company Profile Perusahaan',
                'Landing Page Iklan',
                'Travel & Rental',
                'Klinik & Jasa Profesional',
                'Kuliner & F&B',
                'Fashion & Beauty',
                'Portal & Instansi',
                'Pendidikan & Kursus',
                'Properti & Developer',
              ].map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center px-3 py-1.5 rounded-full bg-white border border-neutral-200/80 text-neutral-700 font-semibold hover:border-[#C23605] hover:text-[#C23605] transition-colors shadow-xs"
                >
                  {item}
                </span>
              ))}
            </div>
          </section>
        </div>
```

**Alasan:** Inject 10 keyword industri sekaligus ke halaman. Tidak merusak estetika. SEO Google Ads naik + perluas target market.

**Verifikasi:** Scroll halaman, lihat pill badge muncul tepat setelah portfolio dan sebelum pricing.

---

## FASE 3 — PRICING ENHANCEMENT

### TASK 3.1 — Tambah Fitur "Gratis Input 10-20 Produk" di Paket Katalog

**File:** `src/app/(frontend)/jasa-pembuatan-website/page.tsx`
**Lokasi:** Array `pricingPackages`, index [1] (Paket Katalog), field `features`

**Cari array features Paket Katalog (sekitar baris 197-206):**
```tsx
features: [
  'Hingga 5–7 Halaman Menu (Beranda, Tentang Kami, Katalog/Layanan, Artikel, Kontak)',
  'Dilengkapi Dashboard Admin Sederhana (Tambah/edit produk & layanan dari HP tanpa koding, praktis & tidak rumit)',
  'Fitur Katalog Produk + Tombol Pesan Otomatis ke WhatsApp (0% Potongan Komisi)',
  'Fitur Artikel & Informasi untuk mempermudah calon pembeli menemukan Anda di Google',
  'Gratis Domain .com / .id & Cloud Server Cepat (Aktif 1 Tahun)',
  'Optimasi Tampilan Ramah Smartphone & Integrasi Peta Lokasi Google Maps',
  'Gratis Video Panduan & Diajari Cara Kelolanya Sampai Bisa',
  'Garansi Pemeliharaan Resmi 1 Tahun Penuh & Keamanan SSL',
],
```

**Ganti jadi:**
```tsx
features: [
  'Hingga 5–7 Halaman Menu (Beranda, Tentang Kami, Katalog/Layanan, Artikel, Kontak)',
  'Dilengkapi Dashboard Admin Sederhana (Tambah/edit produk & layanan dari HP tanpa koding, praktis & tidak rumit)',
  'Fitur Katalog Produk + Tombol Pesan Otomatis ke WhatsApp (0% Potongan Komisi)',
  'Fitur Artikel & Informasi untuk mempermudah calon pembeli menemukan Anda di Google (SEO Friendly)',
  'Gratis Bantu Input 10–20 Produk/Layanan Pertama (Anda cukup kirim foto & deskripsi)',
  'Gratis Domain .com / .id & Cloud Server Cepat + SSL/HTTPS (Aktif 1 Tahun)',
  'Optimasi Mobile Responsive & Fast Loading + Integrasi Peta Lokasi Google Maps',
  'Gratis Video Panduan & Diajari Cara Kelolanya Sampai Bisa',
  'Garansi Pemeliharaan Resmi 1 Tahun Penuh & Keamanan SSL',
],
```

**Alasan:**
- "Gratis Bantu Input 10-20 Produk" = conversion killer dari kompetitor (Resolusiweb).
- Keyword SEO Friendly, SSL/HTTPS, Mobile Responsive, Fast Loading diselipkan ke bullet existing.

---

### TASK 3.2 — Tambah Fitur "Pixel Ready" di Paket Landing

**File:** `src/app/(frontend)/jasa-pembuatan-website/page.tsx`
**Lokasi:** Array `pricingPackages`, index [0] (Paket Landing), field `features`

**Cari:**
```tsx
'Siap Dipasang Pelacak Iklan (Meta Pixel & Google Analytics)',
```

**Ganti jadi:**
```tsx
'Siap Pasang Pixel Iklan (Meta Pixel, TikTok Pixel, Google Tag & Analytics) — Ready untuk Google Ads/Meta Ads',
```

**Alasan:** Keyword "Pixel Iklan", "Google Ads", "Meta Ads", "TikTok" eksplisit → Quality Score iklan + attract advertisers.

---

### TASK 3.3 — Tambah Bonus Stack Visual di Paket Katalog

**File:** `src/app/(frontend)/jasa-pembuatan-website/page.tsx`
**Lokasi:** Array `pricingPackages`, index [1] (Paket Katalog)

**Cari field `topHighlightNote` di paket Katalog (sekitar baris 184):**
```tsx
topHighlightNote: 'Paling Lengkap & Pilihan Utama Mayoritas Klien UMKM',
```

**Tambahkan field BARU di bawahnya:**
```tsx
topHighlightNote: 'Paling Lengkap & Pilihan Utama Mayoritas Klien UMKM',
bonusStack: 'Bonus Senilai Rp 850rb: Setup Google Analytics + Google Search Console + Copywriting Jualan 1 Halaman',
```

Lalu cari render-nya di card pricing (sekitar baris 1236-1241 blok `topHighlightNote`):
```tsx
{item.topHighlightNote && (
  <div className="mb-3 px-3 py-1.5 rounded-xl bg-orange-50 border border-orange-200/80 text-[11px] font-bold text-[#C23605] flex items-center gap-1.5">
    <Sparkles className="w-3.5 h-3.5 shrink-0" />
    <span>{item.topHighlightNote}</span>
  </div>
)}
```

**Tambahkan render BARU tepat di bawahnya:**
```tsx
{item.topHighlightNote && (
  <div className="mb-3 px-3 py-1.5 rounded-xl bg-orange-50 border border-orange-200/80 text-[11px] font-bold text-[#C23605] flex items-center gap-1.5">
    <Sparkles className="w-3.5 h-3.5 shrink-0" />
    <span>{item.topHighlightNote}</span>
  </div>
)}
{item.bonusStack && (
  <div className="mb-3 px-3 py-2 rounded-xl bg-emerald-50 border border-emerald-200/80 text-[11px] text-emerald-900 flex items-start gap-1.5">
    <Sparkles className="w-3.5 h-3.5 shrink-0 mt-0.5 text-emerald-600" />
    <span><strong className="font-bold">BONUS: </strong>{item.bonusStack}</span>
  </div>
)}
```

**Alasan:** Perceived value naik via bonus stacking. Pastikan bonus bisa benar-benar diberikan (jangan fake).

---

### TASK 3.4 — Update TypeScript Interface jika Perlu

**File:** `src/app/(frontend)/jasa-pembuatan-website/page.tsx`

Jika pricingPackages pakai type eksplisit, tambahkan field opsional. Jika tidak (inferred type), skip task ini. Cek dengan grep: `rg "pricingPackages:" src/app/\(frontend\)/jasa-pembuatan-website/page.tsx`

Jika tidak ada type annotation eksplisit, task ini **SKIP**. Lanjut ke task berikutnya.

---

## FASE 4 — PORTFOLIO DIVERSIFICATION

### TASK 4.1 — [SKIP] Siapkan Thumbnail Toko Online Ritel

**Status:**  **SKIP** — klien toko online real belum ada per konfirmasi user.

**Catatan:** Setelah berhasil barter 1 klien UMKM toko online (fashion/F&B/herbal) dengan diskon 50-70% sebagai pertukaran izin tampil portfolio, kembali ke task ini.

**Kriteria barter klien yang ideal:**
- UMKM yang sedang jualan di Shopee/Tokopedia dan terganggu komisi 5-12%.
- Sudah punya foto produk minimum 10 item.
- Mau pose foto + kasih testimoni video 30-detik.
- Mau izin tampil nama + website live sebagai portfolio.

---

### TASK 4.2 — [SKIP] Tambah 1 Card Portfolio Toko Online Ritel

**Status:**  **SKIP** — depend ke Task 4.1.

**Catatan:** Jalankan task ini setelah Task 4.1 selesai (klien real ada + thumbnail `/public/images/porto-4.webp` siap).

Template kode disimpan untuk eksekusi masa depan:

```tsx
{/* Card 4: Toko Online Ritel — AKTIFKAN SETELAH KLIEN REAL ADA */}
<div className="bg-white rounded-3xl border border-neutral-200/80 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col group">
  <div className="relative aspect-[16/10] bg-neutral-100 overflow-hidden">
    <img
      src="/images/porto-4.webp"
      alt="Website Toko Online Ritel UMKM"
      width={360}
      height={225}
      loading="lazy"
      decoding="async"
      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
    />
    <div className="absolute top-3 right-3">
      <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-white/95 backdrop-blur-xs text-neutral-800 px-2.5 py-0.5 rounded-full border border-neutral-200 shadow-xs">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Live
      </span>
    </div>
  </div>
  <div className="p-5 flex-1 flex flex-col justify-between">
    <div>
      <span className="text-[10px] font-bold text-[#C23605] uppercase tracking-wider block mb-1">
        Toko Online &amp; Katalog Produk
      </span>
      <h3 className="font-bold text-base text-neutral-900 leading-snug">
        [GANTI: Nama Toko Klien Real]
      </h3>
      <span className="text-xs font-mono text-neutral-500 mt-1.5 inline-flex items-center gap-1">
        <span>[GANTI: namatoko.com]</span>
        <ExternalLink className="w-2.5 h-2.5 opacity-60" />
      </span>
    </div>
    <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
      <span className="text-emerald-800 font-bold bg-emerald-100/90 px-2.5 py-0.5 rounded-md">
        0% Komisi Marketplace
      </span>
      <span className="text-neutral-500 font-medium">Order via WA</span>
    </div>
  </div>
</div>
```

**PENTING:** Jangan rilis dengan placeholder `[GANTI: ...]`. Harus data real.

---

### TASK 4.3 — Tambah Judul Hint Diversifikasi di Section Portfolio

**Status:**  **TETAP AKTIF** — tidak depend ke klien baru.

**File:** `src/app/(frontend)/jasa-pembuatan-website/page.tsx`
**Lokasi:** Dalam section `#portfolio-klien`, cari subtitle/paragraph pembuka.

**Cari:**
```tsx
<p className="text-xs sm:text-sm text-neutral-600 font-medium max-w-md">
  Didesain responsif mobile-first, cepat diakses dari HP, dan pesanan terhubung langsung ke WhatsApp.
</p>
```

**Ganti jadi:**
```tsx
<p className="text-xs sm:text-sm text-neutral-600 font-medium max-w-md">
  Lintas industri: Travel &amp; Jasa, Portal Instansi, hingga Toko Online UMKM. Didesain responsif mobile-first, cepat diakses dari HP, dan pesanan terhubung langsung ke WhatsApp.
</p>
```

**Alasan:** Walau belum ada card toko online, framing "lintas industri" meyakinkan calon klien bahwa agency serve beragam segmen (termasuk toko online — nanti akan ada contohnya).

---

## FASE 5 — HILANGKAN REDUNDANSI VISUAL

### TASK 5.1 — Audit Dulu, Buktikan Dugaan Redundansi

**AKSI VERIFIKASI (bukan edit):**
```bash
grep -n "porto-1\|porto-2\|porto-3\|porto-4" /Users/ahmadkhairolmaulidi/Documents/Freelance/marketingcodeid-agency/project/src/app/\(frontend\)/jasa-pembuatan-website/page.tsx
grep -rn "porto-1\|porto-2\|porto-3" /Users/ahmadkhairolmaulidi/Documents/Freelance/marketingcodeid-agency/project/src/components/home/TestimonialsSection.tsx
```

Catat apakah thumbnail yang sama (`porto-1.webp`, `porto-2.webp`) muncul di:
- Section Portfolio Strip
- Section TestimonialsSection (variant website)

Jika iya → lanjut Task 5.2. Jika tidak → skip Task 5.2.

---

### TASK 5.2 — Ganti Visual Testimoni Jadi Ringkas (Grid Quote Card)

**File:** `src/components/home/TestimonialsSection.tsx`
**Lokasi:** Bagian render `WEBSITE_STORIES` yang pakai browser frame visual besar.

**Aksi (jika terbukti redundan):** Buat kondisional. Saat `variant === 'website'`, render kartu quote ringkas TANPA browser frame screenshot.

**Template kartu ringkas:**
```tsx
{isWebsite ? (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
    {stories.map((story) => (
      <div key={story.title} className="bg-white rounded-2xl border border-neutral-200/80 p-5 shadow-xs">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-rose-500 text-white font-bold text-xs flex items-center justify-center shrink-0">
            {story.title.substring(0, 2).toUpperCase()}
          </div>
          <div>
            <div className="font-bold text-sm text-neutral-900">{story.title}</div>
            <div className="text-[11px] text-neutral-500">{story.subtitle}</div>
          </div>
        </div>
        <blockquote className="text-xs sm:text-sm text-neutral-700 leading-relaxed italic border-l-2 border-[#FF5C28] pl-3">
          &ldquo;{story.testimonial}&rdquo;
        </blockquote>
        {story.metric && (
          <div className="mt-3 pt-3 border-t border-neutral-100 inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
            <Check className="w-3 h-3" /> {story.metric}
          </div>
        )}
      </div>
    ))}
  </div>
) : (
  // Render existing full browser-frame visual untuk variant default
  /* ... kode existing ... */
)}
```

**CATATAN KEHATI-HATIAN:** Cek dulu interface `TestimonialStory` di file tersebut — field apa yang tersedia (`title`, `subtitle`, `testimonial`, `metric` dll). Sesuaikan field.

**Jika struktur data terlalu beda:** Skip task ini, biarkan existing. Prioritas: TASK 5.3 (reduksi redundansi di sisi Portfolio Strip, bukan Testimoni).

---

### TASK 5.3 — Pastikan Portfolio Strip Pakai Thumbnail Berbeda dari Testimoni

**AKSI MANUAL:** Jika Portfolio Strip dan Testimoni masih share thumbnail yang sama:
- Opsi A: Buat screenshot/thumbnail baru untuk klien yang sama tapi angle berbeda (desktop view vs mobile view).
- Opsi B: Tukar urutan supaya tidak muncul klien yang sama di 2 section berturut-turut.

File gambar: `/public/images/porto-*.webp`.

---

## FASE 6 — COGNITIVE OVERLOAD FIX (ABOVE FOLD MOBILE)

### TASK 6.1 — Audit Konten Above Fold Mobile

**AKSI VERIFIKASI:** Buka halaman di browser mobile viewport (390x844). Hitung berapa elemen muncul di fold mobile sebelum user scroll:

1. Badge "Jasa Pembuatan Website..." (dari Task 1.1)
2. Badge "Agency Boutique"
3. H1
4. Subheading paragraph
5. 2 CTA button
6. Row trust (Domain & Server, 100% Hak Milik, Diajari)
7. Founder card
8. Row trust 2 (Balas <10 menit, Garansi 7 hari, Revisi)
9. Link anchor "Lihat 3 portofolio..."
10. Ecosystem strip

Jika > 7 elemen muncul sebelum scroll → OVERLOAD. Perlu reduksi.

---

### TASK 6.2 — Hilangkan 1 Row Trust Checkmark

**File:** `src/app/(frontend)/jasa-pembuatan-website/page.tsx`
**Lokasi:** Trust Proof row pertama (sekitar baris 920-933)

**Cari blok trust proof pertama:**
```tsx
<div className="pt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-neutral-700 font-medium">
  <span className="flex items-center gap-1.5">
    <Check className="w-4 h-4 text-[#FF5C28]" /> Domain &amp; Server 1 Tahun
  </span>
  <span>•</span>
  <span className="flex items-center gap-1.5">
    <Check className="w-4 h-4 text-[#FF5C28]" /> 100% Hak Milik Tanpa Sewa
  </span>
  <span>•</span>
  <span className="flex items-center gap-1.5">
    <Check className="w-4 h-4 text-[#FF5C28]" /> Diajari Sampai Bisa
  </span>
</div>
```

**Pilihan: HAPUS seluruh blok ini** (karena row trust kedua di bawah founder card sudah mengcover: Balas <10 menit + Garansi + Revisi, yang lebih kuat).

Delete blok tersebut (termasuk semua di dalamnya).

**Alasan:** Mengurangi 1 lapisan stacking vertical. Row trust kedua lebih strategis (speed + guarantee + unlimited revision).

---

### TASK 6.3 — Hilangkan Link "Lihat 3 Portofolio..." dari Hero

**File:** `src/app/(frontend)/jasa-pembuatan-website/page.tsx`
**Lokasi:** Sekitar baris 964-973

**Cari:**
```tsx
{/* Link to Real Client Portfolio */}
<div className="pt-0.5">
  <a
    href="#portfolio-klien"
    className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold text-[#C23605] hover:text-[#9A2B04] transition-colors"
  >
    <span>Lihat 3 portofolio klien live terverifikasi</span>
    <ArrowRight className="w-3 h-3" />
  </a>
</div>
```

**HAPUS seluruh blok ini.**

**Alasan:** User akan natural scroll ke bawah dan temukan portfolio. Link ini redundant + nambah 1 layer di hero fold mobile.

---

## FASE 7 — SPLIT LANDING PAGE [DITUNDA — AKTIFKAN SAAT 3 PRE-REQ TERPENUHI]

**Status keseluruhan Fase 7:**  **DITUNDA SEMENTARA**.

### Pre-requisite yang HARUS dipenuhi sebelum mulai Fase 7

Centang semua dulu, baru boleh lanjut Task 7.1:

- [ ] **PRE-REQ 1:** Spend Google Ads bulanan sudah > Rp 3jt/bulan (minimum Rp 100rb/hari × 30 hari × 2 Ad Group).
- [ ] **PRE-REQ 2:** Sudah ada 1 klien toko online real dengan website live + izin tampil portfolio.
- [ ] **PRE-REQ 3:** Punya waktu 1-2 minggu dedicated untuk rewrite + QA 2 landing page.
- [ ] **PRE-REQ 4:** Siap maintain 2 landing page jangka panjang (update testimoni, FAQ, pricing).

**Jika salah satu belum  → SKIP seluruh Fase 7.** Fokus optimasi Fase 1-6 dulu.

---

### Konteks Strategis (Kenapa Split Landing Page?)

Saat ini **1 halaman** `/jasa-pembuatan-website` menargetkan semua calon klien sekaligus (toko online + company profile + landing page iklan + instansi). Masalah: narasi hero fokus anti-marketplace tapi portfolio fokus travel/instansi → **message mismatch**.

Solusi: pecah jadi **2 halaman terpisah** supaya setiap landing punya message match 100% dengan iklan Google Ads yang mengarah ke sana:

- **Landing A — `/jasa-pembuatan-toko-online`**
  - Target keyword: "jasa toko online", "ecommerce indonesia", "bebas komisi shopee"
  - Hero copy: 100% narasi anti-komisi marketplace (sudah ada)
  - Portfolio: **HANYA** toko online + katalog ritel (butuh klien real dulu!)
  - Problem: 4 pain e-commerce (komisi, perang harga, data dikunci, kredibilitas)

- **Landing B — `/jasa-pembuatan-website`** (yang sekarang, direstructure)
  - Target keyword: "jasa pembuatan website", "company profile", "landing page iklan"
  - Hero copy: fokus multi-industry (travel, klinik, kontraktor, B2B, instansi)
  - Portfolio: travel + instansi + jasa (existing sudah fit)
  - Problem: 4 pain umum bisnis (presence online lemah, susah dipercaya, dll)

**Dampak jika sukses:** Quality Score Google Ads naik → CPC turun 20-40% → konversi per klik naik 15-30%.

---

### TASK 7.1 [DITUNDA] — Gate Decision & Verifikasi Pre-Req

**AKSI MANUAL (bukan kode):** Review 4 pre-req di atas. Jika ada yang belum, STOP dan return beberapa bulan lagi.

Jika semua , baru lanjut Task 7.2.

---

### TASK 7.2 [DITUNDA] — Buat File Landing Page Baru

**File BARU:** `src/app/(frontend)/jasa-pembuatan-toko-online/page.tsx`

**Aksi:** Copy dari `src/app/(frontend)/jasa-pembuatan-website/page.tsx` sebagai starting point. Lalu modifikasi:

1. Metadata title: `"Jasa Pembuatan Toko Online Bebas Komisi Marketplace | MarketingCode.ID"`
2. Metadata description: fokus narasi "0% komisi, 100% hak milik, order langsung WA"
3. Keyword list: `['jasa toko online', 'jasa ecommerce indonesia', 'bikin toko online tanpa komisi', 'web toko online umkm', 'bebas komisi shopee tokopedia']`
4. Canonical URL: `/jasa-pembuatan-toko-online`
5. Hero copy: 100% narasi anti-komisi marketplace (seperti copy existing)
6. Portfolio: HANYA toko online + katalog ritel (TIDAK ada travel/instansi)
7. Problem/Solution: full fokus ke pemain e-commerce (komisi, perang harga, data dikunci, kredibilitas)
8. Breadcrumb schema: Home → Jasa Pembuatan Toko Online

**PENTING:**
- Jangan edit sekarang, baca dulu `page.tsx` existing penuh, copy manual, lalu modifikasi bertahap.
- Pakai git commit sebagai checkpoint sebelum mulai.

---

### TASK 7.3 [DITUNDA] — Rewrite `/jasa-pembuatan-website` Jadi Universal

**File:** `src/app/(frontend)/jasa-pembuatan-website/page.tsx`

Setelah Task 7.2 selesai, modifikasi file ini:

1. Hero copy: fokus Company Profile + Landing Page + Multi-industry. Kurangi dominance narasi marketplace.
2. H1 ganti: *"Miliki Website Bisnis & Company Profile Profesional Tanpa Ribet Koding"* (hilangkan "Toko Online" karena sudah di-handle landing baru).
3. Portfolio: biarkan Travel + Instansi + Jasa (yang existing).
4. Problem/Solution: perluas ke 4 pain universal (bukan hanya anti-marketplace).
   - Problem 01: *"Bisnis Anda Tidak Ketemu di Google Saat Dicari Orang"*
   - Problem 02: *"Pembeli Ragu Transfer Karena Hanya Punya IG/Katalog WA"*
   - Problem 03: *"Pakai Link Bio Gratisan Terlihat Tidak Serius"*
   - Problem 04: *"Butuh Alat Jelaskan Jasa Secara Profesional"*

**PENTING:** Backup file dulu dengan git commit sebelum rewrite.

---

### TASK 7.4 [DITUNDA] — Tambah Interlinking Antar Landing

**Aksi:** Di landing `/jasa-pembuatan-website`, tambah card section:

> *"Fokus Bisnis Anda Jualan Online? → Lihat Paket Khusus Toko Online"*

Dengan link ke `/jasa-pembuatan-toko-online`. Begitu juga sebaliknya di landing toko online:

> *"Butuh Website Profil Perusahaan/Jasa? → Lihat Paket Website Umum"*

Lokasi ideal: di akhir section pricing atau sebelum final CTA.

**Alasan:** SEO link juice + user segmentasi + mencegah bounce user yang salah landing.

---

### TASK 7.5 [DITUNDA] — Setup Google Ads Ad Group Terpisah

**AKSI MANUAL di Google Ads dashboard (bukan kode):**

**Ad Group 1 — Toko Online:**
- Keyword target: `[jasa toko online]`, `[bikin toko online]`, `[web ecommerce]`, `[bebas komisi marketplace]`
- Landing page: `/jasa-pembuatan-toko-online`
- Ad copy: fokus "0% komisi + 100% hak milik"
- Budget: minimum Rp 100rb/hari

**Ad Group 2 — Website Umum:**
- Keyword target: `[jasa pembuatan website]`, `[jasa website company profile]`, `[jasa landing page]`, `[jasa website umkm]`
- Landing page: `/jasa-pembuatan-website`
- Ad copy: fokus "terima beres + professional"
- Budget: minimum Rp 100rb/hari

**Setup conversion tracking:**
- Event: WhatsApp click (floating button + CTA click)
- Goal: minimum 1 WA click per Rp 50rb spend (conversion rate ~2%)

---

## FASE 8 — VERIFIKASI FINAL

### TASK 8.1 — Jalankan Build

```bash
cd /Users/ahmadkhairolmaulidi/Documents/Freelance/marketingcodeid-agency/project
pnpm build
```

**Harus exit code 0.** Jika gagal, baca error, fix, build ulang.

---

### TASK 8.2 — Jalankan Test Integration

```bash
pnpm test:int
```

**Harus 100% pass.** Jika gagal, baca error, fix, test ulang.

---

### TASK 8.3 — Jalankan Lighthouse Audit (sesuai `AGENTS.md`)

**Mode Desktop:**
- Performance > 90
- Accessibility > 90
- Best Practices > 90
- SEO > 90

**Mode Mobile:**
- 4 kategori > 90

**Jika salah satu < 90:** fix, re-build, re-audit. Jangan skip.

---

### TASK 8.4 — Browser Visual Verification

**Buka halaman di 2 viewport:**
1. Desktop 1280x800
2. Mobile 390x844

**Checklist:**
- [ ] Semua CTA WhatsApp pakai nomor `6285128038243`
- [ ] Tidak ada horizontal scroll di mobile
- [ ] Sticky floating button masih bekerja (scroll depth, exit intent, idle)
- [ ] Pill badge industri (10 kategori) tampil rapi di section baru
- [ ] 3 card portfolio tampil (toko online card ditunda — belum ada klien)
- [ ] Badge SEO eyebrow "Jasa Pembuatan Website, Company Profile & Toko Online Terima Beres" tampil di atas H1
- [ ] H1 pakai kata "Website Bisnis & Toko Online"
- [ ] CTA hero + final sudah universal (bukan "Rencana Toko")
- [ ] Bonus stack hijau "BONUS: Setup Google Analytics + GSC + Copywriting Jualan 1 Halaman" tampil di card Paket Katalog
- [ ] Hero fold mobile tidak terlalu padat (max 5-6 elemen sebelum scroll)

---

### TASK 8.5 — Grep Verifikasi Final

**Verifikasi perubahan copy aman:**
```bash
cd /Users/ahmadkhairolmaulidi/Documents/Freelance/marketingcodeid-agency/project

# Pastikan tidak ada lagi "Rencana Toko" di CTA jika sudah universal
grep -n "Rencana Toko" src/app/\(frontend\)/jasa-pembuatan-website/page.tsx

# Pastikan keyword SEO baru masuk
grep -n "Jasa Pembuatan Website" src/app/\(frontend\)/jasa-pembuatan-website/page.tsx
grep -n "SEO Friendly" src/app/\(frontend\)/jasa-pembuatan-website/page.tsx
grep -n "Mobile Responsive\|Fast Loading" src/app/\(frontend\)/jasa-pembuatan-website/page.tsx

# Pastikan pill industri tambah
grep -n "Cocok untuk Berbagai Jenis Usaha" src/app/\(frontend\)/jasa-pembuatan-website/page.tsx
```

**Semua hasil grep harus menampilkan line match.**

---

## URUTAN EKSEKUSI DISARANKAN (REVISI — Task Skip Sudah Ditandai)

**Hari 1 (quick wins SEO + message match, ~2 jam):**
Task 1.1 → 1.2 → 1.3 → 1.4 → `pnpm build` → verify

**Hari 2 (industry targeting + pricing enhancement, ~2 jam):**
Task 2.1 → 3.1 → 3.2 → 3.3 (bonus stack GSC+GA+Copy) → 3.4 → `pnpm build` → verify

**Hari 3 (portfolio hint + redundansi fix, ~2 jam):**
-  Task 4.1 SKIP (klien toko online belum ada)
-  Task 4.2 SKIP (depend Task 4.1)
-  Task 4.3 (hint "lintas industri")
- Task 5.1 → 5.2 (jika redundan) → 5.3
- `pnpm build` → verify

**Hari 4 (cognitive overload fix mobile, ~1 jam):**
Task 6.1 → 6.2 → 6.3 → `pnpm build` → verify mobile viewport 390x844

**Hari 5+ (JANGKA PANJANG, bukan sekarang):**
-  Fase 7 DITUNDA sampai 4 pre-req terpenuhi (lihat section FASE 7)

**Hari final (gate verifikasi):**
Task 8.1 → 8.2 → 8.3 → 8.4 → 8.5

---

## CATATAN UNTUK AI DEVELOPER YANG MENGEKSEKUSI

1. **JANGAN rewrite seluruh file.** Setiap task adalah SATU edit kecil.
2. **BACA DULU dengan `read` tool** sebelum `edit`.
3. **Pakai `edit` dengan `oldString` yang unik.** Jika match multiple, tambahkan context lebih (3-5 baris sekitar).
4. **Setelah 3-5 task, jalankan `pnpm build`.** Jangan tumpuk banyak perubahan tanpa build.
5. **Jika build gagal:** baca error message, fix 1 masalah, build lagi. Jangan panik.
6. **Jangan sentuh file di luar scope task.** Jika task bilang edit `page.tsx`, jangan edit `TestimonialsSection.tsx` kecuali task eksplisit menyebutnya.
7. **Jangan skip verifikasi** Task 8.x. Ini syarat rilis sesuai `AGENTS.md`.
8. **Jika ragu**: tanya user sebelum edit. Jangan asumsi.

---

## REKOMENDASI DILUAR KODE (Checklist Manual)

### Prioritas Sekarang (eksekusi paralel dengan Fase 1-6)
- [ ] **Barter 1 klien UMKM toko online** (fashion/F&B/herbal) dengan diskon 50-70% sebagai pertukaran:
  - Izin tampil portfolio (nama + website live)
  - Foto testimoni + nama lengkap klien
  - Testimoni video 30 detik (opsional)
  - Target: 2-3 minggu ke depan. Setelah ada klien → aktifkan Task 4.1, 4.2.
- [ ] Setup WhatsApp Business auto-reply pesan pertama
- [ ] Daftar Google Business Profile (gratis)
- [ ] Ganti avatar inisial "AK" dengan foto founder real di `/public/images/founder.webp`

### Prioritas Jangka Panjang (gate ke Fase 7)
- [ ] Mulai spend Google Ads minimal Rp 100rb/hari (Rp 3jt/bulan)
- [ ] Collect data konversi per keyword minimum 1 bulan
- [ ] Siapkan content/portfolio untuk 2 landing page terpisah
- [ ] Setelah 4 pre-req Fase 7  → aktifkan Task 7.1-7.5
- [ ] Setup Google Ads Ad Group terpisah:
  - Ad Group 1: `/jasa-pembuatan-website` (keyword Company Profile, Landing Page, Jasa Website Umum)
  - Ad Group 2: `/jasa-pembuatan-toko-online` (keyword Toko Online, Bebas Komisi, Katalog Produk)

### Bonus Deliverable yang WAJIB Dikerjakan Tiap Klien Paket Katalog (Rp 2.190.000)
Berikut 3 bonus yang Anda commit deliver sesuai Task 3.3 — ini bukan janji kosong, harus benar-benar dikerjakan:

- [ ] **Setup Google Analytics 4 (GA4)** — install tracking code `gtag.js` + konfigurasi event dasar (pageview, button click, outbound link, WhatsApp click). Estimasi 1 jam kerja.
- [ ] **Setup Google Search Console (GSC)** — verify domain (DNS TXT atau HTML file), submit `sitemap.xml`, cek initial crawl. Estimasi 30-45 menit kerja.
- [ ] **Copywriting Jualan 1 Halaman** — tulis copy persuasif 1 halaman (headline + sub-headline + 3-5 benefit + CTA) pakai framework PAS/AIDA, berdasarkan brief klien. Estimasi 2-3 jam kerja.

**Catatan penting:** Jika beban kerja terlalu tinggi (overbooked) → tolak klien baru atau naikkan harga paket, JANGAN turunkan kualitas bonus. Reputasi > revenue cepat.

---

**Total task aktif: 20** (Task 4.1 & 4.2 ditunda + 4 task Fase 7 ditunda = 6 task standby)
**Estimasi total waktu eksekusi Fase 1-6: 6-8 jam kerja**
**Estimasi uplift konversi dari baseline Rev 2: +15-25%**

**Timeline realistis:**
- Minggu 1: Fase 1-6 selesai → launch update
- Minggu 2-4: Barter klien toko online real → aktifkan Task 4.1, 4.2
- Bulan 2-3: Collect data Google Ads → gate review Fase 7
- Bulan 3+: Jika pre-req terpenuhi → Fase 7 (split landing page)
