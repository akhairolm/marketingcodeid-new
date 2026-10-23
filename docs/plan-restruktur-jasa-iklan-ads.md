# Restrukturisasi Layanan Iklan: Halaman `/jasa-iklan-ads` Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Menghapus 4 halaman layanan lama (`/company-profile`, `/landing-page`, `/jasa-iklan-meta-ads`, `/digital-marketing`) dan menggantinya dengan satu halaman baru `/jasa-iklan-ads` yang menjual Google Ads + Meta Ads dengan gaya visual identik `/jasa-pembuatan-website`, lalu menyinkronkan navbar, footer, sitemap, dan link internal.

**Architecture:** Halaman baru adalah satu file `page.tsx` di route group `(frontend)`, memakai kelas root `.website-service` agar seluruh token CSS halaman website (paper, ink-panel, dot-fine, blueprint, frame-ticks, section-rule) aktif. Tiga URL lama menjadi stub `permanentRedirect` tipis, satu URL (`/digital-marketing`) dihapus total tanpa redirect sesuai keputusan pemilik produk. Tidak ada dependency baru.

**Tech Stack:** Next.js 16.3.3 App Router, React 19, TypeScript, Tailwind, lucide-react, Vitest (int), Playwright (e2e), pnpm.

**Spec:** `docs/Analisis Landing Page & Google Ads.md` (bagian 4 halaman 624-626 & 650 rekomendasi kerangka; bagian 767-775 nama route) dan `docs/plan-perbaikan-jasa-pembuatan-website.md` (pola section, copy, dan guardrail anti-klaim palsu).

## Global Constraints

- No emoji di UI, copy, metadata, komentar, maupun commit message (aturan `AGENTS.md`).
- Tidak menambah dependency baru.
- Semua CTA WhatsApp memakai nomor default `6285128038243` lewat helper di `@/lib/whatsapp`.
- Semua CTA WhatsApp: `target="_blank" rel="noopener noreferrer"`.
- Dilarang mengarang angka klaim pemasaran (ROAS, CPA, "ratusan klien", "50+ proyek", rating bintang). Hanya boleh menyebut mekanisme platform, deliverable, dan rentang anggaran iklan yang bersifat panduan umum.
- Section testimoni DILARANG dipakai di halaman ini; testimoni existing adalah proyek sistem/portal, bukan hasil kampanye iklan.
- Harga yang tampil HANYA tiga tier yang sudah ada di `src/components/home/home-data.ts:152-202` (Growth Campaign Rp 3.5jt/bulan, Scale & Performance Rp 7.5jt/bulan, Full Digital Takeover Rp 15jt+/bulan). Dilarang mengarang tier atau angka baru.
- Entry point halaman baru WAJIB: `<div className="website-service min-h-screen font-sans bg-[#FBFBFB] text-[#18181B] antialiased selection:bg-[#FF5C28] selection:text-white">` — tanpa ini semua background custom tidak aktif.
- Semua edit dilakukan dengan `edit` (surgical replace), bukan rewrite file, kecuali task yang memang menyatakan "ganti seluruh isi file" (stub redirect).
- Setelah setiap 3 task, jalankan `pnpm build`. Wajib exit code 0.
- Gate akhir wajib: `pnpm build` (exit 0), `pnpm test:int` (100% pass), Lighthouse Desktop + Mobile 4 kategori > 90, verifikasi visual 1280x800 dan 390x844, tidak ada horizontal scroll.
- Paket manager: `pnpm`. Jangan pakai npm/yarn.

## Keputusan Produk Yang Sudah Dikunci

| Keputusan | Nilai final |
|---|---|
| `/company-profile` | 308 redirect ke `/jasa-pembuatan-website` |
| `/landing-page` | 308 redirect ke `/jasa-pembuatan-website` |
| `/jasa-iklan-meta-ads` | 308 redirect ke `/jasa-iklan-ads` |
| `/digital-marketing` | **Dihapus total, tanpa redirect** (sesuai keputusan user; lihat catatan risiko di Task 10) |
| Pricing halaman baru | Reuse 3 tier `pricingData.ads` |
| Testimoni | Skip; diganti section Garansi + Audit Gratis |
| WhatsApp CTA | `getWhatsAppDirectUrl()` dengan pesan custom per CTA |
| Link artikel lama | Rewrite ke `/jasa-iklan-ads` |

## Struktur File

**Dibuat:**
- `src/app/(frontend)/jasa-iklan-ads/page.tsx` — halaman gabungan Google Ads + Meta Ads
- `tests/int/jasa-iklan-ads.int.spec.ts` — smoke test render halaman baru

**Diubah:**
- `src/app/(frontend)/company-profile/page.tsx` — jadi stub redirect
- `src/app/(frontend)/landing-page/page.tsx` — jadi stub redirect
- `src/app/(frontend)/jasa-iklan-meta-ads/page.tsx` — jadi stub redirect
- `src/components/site/SiteHeader.tsx` — `SERVICE_LINKS` baris 11-17
- `src/components/site/SiteFooter.tsx` — `FOOTER_LINKS` baris 4-13
- `src/components/home/ServicesHub.tsx` — kartu digital marketing baris 14-22
- `src/app/sitemap.ts` — baris 19-20
- `src/db/article-content.ts` — baris 82, 255, 384
- `tests/int/site-header.int.spec.ts` — import halaman `digital-marketing` di baris 14
- `tests/int/services-hub.int.spec.ts` — assertion href baris 25

**Dihapus:**
- `src/app/(frontend)/digital-marketing/page.tsx` (dan folder `digital-marketing/` bila kosong)

---

<!-- CHUNK-MARKER-1 -->

## Blueprint Section Halaman `/jasa-iklan-ads`

Urutan 10 band (ganti warna background supaya tidak monoton). Semua max-width mengikuti `/jasa-pembuatan-website`.

1. **Hero** `bg-paper-cream-glow bg-dot-fine pt-28 sm:pt-36 pb-16 sm:pb-24` — eyebrow badge SEO + H1 + sub + 2 CTA + founder card + trust strip + (opsional) 3 chip platform.
2. **4 Masalah pengiklan pemula** `bg-paper-warm section-rule py-20 sm:py-24` — grid 2x2 kartu, mirip pola `problems` di website.
3. **Panduan pilih platform: Google Ads vs Meta Ads** `bg-paper-right-glow bg-dot-fine py-20 sm:py-24` — 2 kartu berdampingan.
4. **6 Keuntungan nyata saat kerja sama** `bg-paper-warm section-rule py-16 sm:py-20` — grid 3 kolom (reuse pola `solutions` di website).
5. **Pill badge industri cocok** `bg-paper-warm py-10 sm:py-12 border-y border-neutral-200/60`.
6. **Pricing 3 tier** `bg-paper-cream py-20 sm:py-24 overflow-hidden` dengan overlay `bg-blueprint opacity-70` dan `frame-ticks bg-[#FBFBFB]/70` di dalamnya — reuse layout card dari website.
7. **Alur kerja 4 tahap** `bg-ink-panel py-20 sm:py-24 overflow-hidden` (dark).
8. **Garansi + Audit Gratis** `bg-paper-warm section-rule py-20 sm:py-24` (menggantikan testimoni).
9. **FAQ** `bg-paper-cream-left-glow bg-dot-fine py-20 sm:py-24` — `<details>` disclosure, min 6 pertanyaan.
10. **Final CTA banner** `bg-paper-warm py-20 sm:py-24` dengan panel gelap `bg-[#121214]`.

Reusable local components yang disalin verbatim dari `/jasa-pembuatan-website`:
- `SectionMark` (eyebrow § NN · hairline · ikon + label).
- `StatusIcon` (opsional, hanya jika ada tabel komparasi).

Komponen baru yang halaman ini perkenalkan (local scope saja):
- `PlatformComparisonCard` (dua kartu Google vs Meta).
- `GuaranteeStackCard` (section 8).

---

## Kontrak Konten (WAJIB dipatuhi semua task halaman)

### Metadata

```ts
export const metadata: Metadata = {
  title: 'Jasa Iklan Google Ads & Meta Ads Terukur | MarketingCode.ID',
  description:
    'Jasa kelola iklan Google Ads & Meta Ads (Facebook & Instagram) untuk UMKM dan bisnis di seluruh Indonesia. Riset audiens, kreatif iklan, pasang tracking pixel, dan optimasi konversi ke WhatsApp dengan laporan transparan.',
  keywords: [
    'jasa iklan google ads',
    'jasa meta ads',
    'jasa iklan facebook instagram',
    'jasa kelola iklan digital',
    'jasa iklan google ads umkm',
    'jasa iklan whatsapp ctat',
    'jasa pasang meta pixel',
    'jasa iklan performance marketing',
  ],
  alternates: { canonical: '/jasa-iklan-ads' },
  openGraph: {
    title: 'Jasa Iklan Google Ads & Meta Ads Terukur | MarketingCode.ID',
    description:
      'Jasa kelola iklan Google Ads & Meta Ads untuk UMKM dan bisnis di seluruh Indonesia. Riset audiens, kreatif iklan, pasang tracking pixel, dan optimasi konversi ke WhatsApp.',
    url: '/jasa-iklan-ads',
    siteName: 'MarketingCode.ID',
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jasa Iklan Google Ads & Meta Ads Terukur | MarketingCode.ID',
    description:
      'Kelola iklan Google Ads & Meta Ads dengan riset audiens, kreatif, dan tracking pixel yang rapi. Fokus pada leads WhatsApp.',
  },
}
```

### JSON-LD

```tsx
<JsonLd
  data={[
    serviceSchema(
      'Jasa Iklan Google Ads & Meta Ads',
      'Jasa pengelolaan kampanye iklan Google Ads dan Meta Ads (Facebook & Instagram): riset audiens, penyusunan kreatif, pemasangan tracking pixel, dan optimasi konversi ke WhatsApp dengan laporan transparan.',
      '/jasa-iklan-ads'
    ),
    faqSchema(faqs),
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Jasa Iklan Google Ads & Meta Ads', path: '/jasa-iklan-ads' },
    ]),
  ]}
/>
```

### Pesan WhatsApp (persis, jangan diubah tanpa alasan)

- Hero CTA:
  `'Halo Admin MarketingCode.ID, saya mau konsultasi jasa iklan Google Ads / Meta Ads. Jenis usaha saya: ____'`
- Pricing Growth Campaign:
  `'Halo Admin MarketingCode.ID, saya tertarik Paket Growth Campaign (Rp 3.5jt/bulan). Jenis usaha saya: ____'`
- Pricing Scale & Performance:
  `'Halo Admin MarketingCode.ID, saya tertarik Paket Scale & Performance (Rp 7.5jt/bulan). Jenis usaha saya: ____'`
- Pricing Full Digital Takeover:
  `'Halo Admin MarketingCode.ID, saya ingin diskusi Paket Full Digital Takeover (Rp 15jt+/bulan). Kebutuhan saya: ____'`
- Audit gratis (section Garansi):
  `'Halo Admin MarketingCode.ID, saya ingin audit gratis akun iklan Google Ads / Meta Ads saya.'`
- Final CTA:
  `'Halo Admin MarketingCode.ID, saya ingin diskusi rencana iklan untuk usaha saya secara gratis.'`

### Isi 4 Masalah (Section 2)

1. `Iklan Jalan Terus, Chat WhatsApp Sepi` — anggaran habis tapi tidak ada percakapan masuk karena tidak ada alur tindak lanjut setelah klik.
2. `Salah Pilih Platform` — jualan jasa darurat diiklankan di media visual, jualan produk impulsif diiklankan di mesin pencari. Hasilnya biaya klik mahal.
3. `Hanya Tekan Boost Post Tanpa Struktur` — tidak ada tujuan kampanye, tidak ada pixel, tidak ada halaman tujuan. Datanya tidak bisa dibaca ulang.
4. `Tidak Tahu Angka yang Harus Dibaca` — tidak ada pencatatan biaya per percakapan, sehingga keputusan menambah atau menghentikan iklan hanya berdasarkan perasaan.

### Isi 2 Kartu Perbandingan Platform (Section 3)

**Google Ads**
- Cocok saat: orang sudah aktif mencari solusi Anda (niat beli tinggi).
- Kanal: Google Search, Performance Max, YouTube, Display.
- Kata kunci: riset kata kunci, kata kunci negatif, ekstensi iklan.
- Tracking: Google Tag, konversi Google Ads, GA4.

**Meta Ads**
- Cocok saat: produk/jasa butuh ditampilkan lebih dulu ke audiens yang belum mencari.
- Kanal: Facebook Feed, Instagram Feed & Reels, Stories, Audience Network.
- Penargetan: minat, audiens mirip (lookalike), retargeting pengunjung.
- Tracking: Meta Pixel, Conversions API bila diperlukan.

Keduanya ditutup dengan satu baris netral: `Banyak bisnis memakai keduanya secara bergantian sesuai tahap funnel.` Dilarang menulis klaim hasil.

### Isi 6 Keuntungan (Section 4)

1. `Riset Audiens & Kata Kunci Sebelum Anggaran Jalan`
2. `Kreatif Iklan: Copywriting + Desain/Variasi Video Pendek`
3. `Tracking Pixel & Konversi Terpasang Rapi`
4. `Optimasi ke Percakapan WhatsApp, Bukan Hanya Klik`
5. `Laporan Kinerja Berkala yang Bisa Dibaca Pemilik Usaha`
6. `Akses Langsung ke Pengelola Iklan via WhatsApp`

### Isi 3 Tier Pricing (Section 6) — disalin apa adanya dari `home-data.ts:152-202`

Tier 1 `Growth Campaign` — `Rp 3.5jt` `/ bulan` — badge `Mulai Dari` — fitur: Setup Meta Pixel / Google Ads Conversion; Riset Audiens & Target Kata Kunci; Pembuatan 6 Variasi Copywriting & Banner; Laporan Kinerja Mingguan Transparan — catatan `Siklus Evaluasi Mingguan`.

Tier 2 `Scale & Performance` — `Rp 7.5jt` `/ bulan` — badge `PALING DIMINATI` — fitur: Omnichannel Ads: Meta Ads (FB/IG) + Google Search; Tracking Meta CAPI (Server-Side); A/B Testing Copywriting & Creative Visual; Audit & Optimasi Kecepatan Landing Page; Live Reporting Dashboard (Looker Studio) — catatan `Evaluasi & Scaling Harian`.

Tier 3 `Full Digital Takeover` — `Rp 15jt+` `/ bulan` — badge `Fitur Terlengkap` — fitur: Full Funnel Strategy: Awareness, Retargeting, Retention; Dedicated Copywriter, Graphic Designer & Media Buyer; Optimasi On-Page SEO & Struktur Ramah Mesin Pencari; Konsultasi Pertumbuhan Mingguan Bersama Lead Strategist — catatan `Dedicated Squad Mingguan`.

Wajib ada strip keterangan di atas grid: `Biaya ini adalah jasa pengelolaan. Anggaran iklan dibayarkan terpisah langsung dari akun iklan milik Anda.`

### Isi 4 Tahap Alur Kerja (Section 7)

1. `Audit & Diskusi Awal` — cek akun iklan, riwayat kampanye, dan target yang realistis.
2. `Riset & Penyusunan Kreatif` — audiens, kata kunci, penawaran, materi iklan.
3. `Peluncuran & Pemantauan` — kampanye aktif, konversi tercatat, biaya per percakapan dipantau.
4. `Evaluasi & Scaling` — hentikan yang tidak bekerja, tambah anggaran pada yang bekerja.

### Isi Garansi + Audit Gratis (Section 8)

- `Audit Akun Iklan Gratis` — pemeriksaan struktur kampanye, penargetan, dan konversi sebelum kerja sama.
- `Laporan Bisa Dilihat Kapan Saja` — angka biaya, jumlah percakapan, dan hasil per kampanye.
- `Tidak Ada Kontrak Jangka Panjang di Awal` — evaluasi bulanan; lanjut atau hentikan berdasarkan angka.
- `Akses Penuh ke Akun Anda` — akun iklan tetap milik Anda, tidak disandera.

### Isi 6 FAQ (Section 9)

1. `Apakah anggaran iklan sudah termasuk dalam biaya paket?` — Tidak. Biaya paket adalah jasa pengelolaan. Anggaran iklan dibayar terpisah dari akun iklan milik Anda.
2. `Berapa anggaran iklan minimum yang disarankan?` — Sebagai panduan umum, mulai dari sekitar Rp 50.000 per hari. Angka akhir menyesuaikan luas wilayah, tingkat persaingan kata kunci, dan harga produk.
3. `Lebih baik Google Ads atau Meta Ads untuk usaha saya?` — Tergantung niat pembeli. Kalau orang sudah mencari, Google Ads. Kalau perlu ditampilkan lebih dulu, Meta Ads. Banyak bisnis memakai keduanya.
4. `Apakah akun iklan dan datanya tetap milik saya?` — Ya. Akun iklan, pixel, dan data konversi tetap atas nama Anda dan bisa diakses penuh.
5. `Berapa lama hasil mulai terlihat?` — Kampanye biasanya butuh fase pembelajaran beberapa hari sampai data cukup untuk dibaca. Yang bisa dipantau sejak awal adalah biaya per klik dan biaya per percakapan.
6. `Apakah bisa hanya minta dipasangkan tracking pixel saja?` — Bisa didiskusikan. Pemasangan pixel dan konversi tersedia sebagai pekerjaan terpisah maupun bagian dari paket pengelolaan.

Dilarang menambah janji angka hasil pada FAQ.

---

<!-- CHUNK-MARKER-2 -->
---

# TASK LIST

**Total: 22 task + 1 gate verifikasi.** Eksekusi berurutan. Jangan lompat.

| Blok | Task | Isi |
|---|---|---|
| A. Halaman baru | 1-9 | Scaffold, 4 section konten, pricing, alur, garansi, FAQ + CTA |
| B. Migrasi route | 10-13 | Redirect 308, stub halaman lama, hapus digital-marketing |
| C. Sinkronisasi | 14-18 | ServicesHub, navbar, footer, sitemap, link artikel |
| D. Pengujian | 19-21 | Perbaiki test header, int test baru, e2e baru |
| D2. Copy | 22 | Selaraskan label formulir konsultasi |
| E. Gate | Final | Build, test, Lighthouse, verifikasi visual |

**Checkpoint build:** setelah Task 3, 6, 9, 12.
**Checkpoint test:** setelah Task 19, 20, 21.

---

## Task 1: Scaffold Halaman Baru (Metadata + Root Wrapper + Hero)

**Files:**
- Create: `src/app/(frontend)/jasa-iklan-ads/page.tsx`

**Interfaces:**
- Consumes: `getWhatsAppDirectUrl` dari `@/lib/whatsapp`; `JsonLd, faqSchema, serviceSchema, breadcrumbSchema` dari `@/lib/seo`; ikon lucide-react.
- Produces: default export `JasaIklanAdsPage`; array konstanta `faqs`, `problems`, `platforms`, `benefits`, `steps`, `guarantees` di module scope file ini (dipakai task berikutnya di file yang sama).

- [ ] **Step 1: Buat file dengan bagian atas lengkap**

Buat file baru `src/app/(frontend)/jasa-iklan-ads/page.tsx` dengan isi PERSIS:

```tsx
import type { Metadata } from 'next'
import Image from 'next/image'
import {
  Target,
  TrendingUp,
  Search,
  Megaphone,
  BarChart3,
  MessageSquare,
  ShieldCheck,
  Check,
  Clock,
  Sparkles,
  AlertTriangle,
  CircleDollarSign,
  HelpCircle,
  ChevronDown,
  Settings2,
  Users,
  CheckCircle2,
  type LucideIcon,
} from 'lucide-react'
import { getWhatsAppDirectUrl } from '@/lib/whatsapp'
import { JsonLd, faqSchema, serviceSchema, breadcrumbSchema } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Jasa Iklan Google Ads & Meta Ads Terukur | MarketingCode.ID',
  description:
    'Jasa kelola iklan Google Ads & Meta Ads (Facebook & Instagram) untuk UMKM dan bisnis di seluruh Indonesia. Riset audiens, kreatif iklan, pasang tracking pixel, dan optimasi konversi ke WhatsApp dengan laporan transparan.',
  keywords: [
    'jasa iklan google ads',
    'jasa meta ads',
    'jasa iklan facebook instagram',
    'jasa kelola iklan digital',
    'jasa iklan google ads umkm',
    'jasa iklan whatsapp ctat',
    'jasa pasang meta pixel',
    'jasa iklan performance marketing',
  ],
  alternates: { canonical: '/jasa-iklan-ads' },
  openGraph: {
    title: 'Jasa Iklan Google Ads & Meta Ads Terukur | MarketingCode.ID',
    description:
      'Jasa kelola iklan Google Ads & Meta Ads untuk UMKM dan bisnis di seluruh Indonesia. Riset audiens, kreatif iklan, pasang tracking pixel, dan optimasi konversi ke WhatsApp.',
    url: '/jasa-iklan-ads',
    siteName: 'MarketingCode.ID',
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jasa Iklan Google Ads & Meta Ads Terukur | MarketingCode.ID',
    description:
      'Kelola iklan Google Ads & Meta Ads dengan riset audiens, kreatif, dan tracking pixel yang rapi. Fokus pada leads WhatsApp.',
  },
}

const faqs = [
  {
    q: 'Apakah anggaran iklan sudah termasuk dalam biaya paket?',
    a: 'Tidak. Biaya paket adalah jasa pengelolaan. Anggaran iklan dibayar terpisah langsung dari akun iklan milik Anda, sehingga Anda bisa melihat setiap rupiah yang dibelanjakan.',
  },
  {
    q: 'Berapa anggaran iklan minimum yang disarankan?',
    a: 'Sebagai panduan umum, banyak bisnis mulai dari sekitar Rp 50.000 per hari. Angka akhir menyesuaikan luas wilayah penargetan, tingkat persaingan kata kunci, dan harga produk Anda.',
  },
  {
    q: 'Lebih baik Google Ads atau Meta Ads untuk usaha saya?',
    a: 'Tergantung niat pembeli. Kalau orang sudah aktif mencari solusi Anda, Google Ads lebih tepat. Kalau produk atau jasa perlu ditampilkan lebih dulu ke audiens yang belum mencari, Meta Ads lebih tepat. Banyak bisnis memakai keduanya secara bergantian sesuai tahap funnel.',
  },
  {
    q: 'Apakah akun iklan dan datanya tetap milik saya?',
    a: 'Ya. Akun iklan, pixel, dan data konversi tetap atas nama Anda dan bisa Anda akses penuh kapan saja. Kami bekerja di dalam akun milik Anda, bukan menahan akses.',
  },
  {
    q: 'Berapa lama hasil mulai terlihat?',
    a: 'Kampanye umumnya butuh fase pembelajaran beberapa hari sampai data cukup untuk dibaca. Yang bisa dipantau sejak awal adalah biaya per klik dan biaya per percakapan masuk.',
  },
  {
    q: 'Apakah bisa hanya minta dipasangkan tracking pixel saja?',
    a: 'Bisa didiskusikan. Pemasangan pixel dan pencatatan konversi tersedia sebagai pekerjaan terpisah maupun sebagai bagian dari paket pengelolaan.',
  },
]

const problems = [
  {
    number: '01',
    title: 'Iklan Jalan Terus, Chat WhatsApp Sepi',
    desc: 'Anggaran habis setiap hari tapi tidak ada percakapan yang masuk. Biasanya bukan karena iklannya salah platform, tapi karena tidak ada alur yang jelas setelah orang mengklik.',
  },
  {
    number: '02',
    title: 'Salah Pilih Platform',
    desc: 'Jualan jasa darurat diiklankan di media visual, jualan produk impulsif diiklankan di mesin pencari. Hasilnya biaya klik mahal dan orang yang datang tidak sesuai niat.',
  },
  {
    number: '03',
    title: 'Hanya Tekan Boost Post Tanpa Struktur',
    desc: 'Tidak ada tujuan kampanye, tidak ada pixel, tidak ada halaman tujuan. Ketika hasilnya jelek, tidak ada data yang bisa dibaca untuk diperbaiki.',
  },
  {
    number: '04',
    title: 'Tidak Tahu Angka yang Harus Dibaca',
    desc: 'Tidak ada pencatatan biaya per percakapan. Keputusan menambah atau menghentikan iklan akhirnya hanya berdasarkan perasaan, bukan angka.',
  },
]

const platforms: PlatformCard[] = [
  {
    key: 'google',
    name: 'Google Ads',
    icon: Search,
    fitTitle: 'Cocok saat orang sudah aktif mencari solusi',
    fitDesc:
      'Ketika seseorang mengetik kebutuhan Anda di Google, niat belinya sudah tinggi. Kampanye diarahkan untuk menangkap pencarian itu.',
    points: [
      'Kanal: Google Search, Performance Max, YouTube, Display',
      'Kata kunci: riset kata kunci, kata kunci negatif, ekstensi iklan',
      'Tracking: Google Tag, konversi Google Ads, GA4',
    ],
  },
  {
    key: 'meta',
    name: 'Meta Ads',
    icon: Megaphone,
    fitTitle: 'Cocok saat produk perlu ditampilkan lebih dulu',
    fitDesc:
      'Ketika audiens belum mencari, produk atau jasa perlu muncul di feed mereka lebih dulu. Kekuatan Meta Ads ada di penargetan dan kreatif visual.',
    points: [
      'Kanal: Facebook Feed, Instagram Feed & Reels, Stories, Audience Network',
      'Penargetan: minat, audiens mirip (lookalike), retargeting pengunjung',
      'Tracking: Meta Pixel, Conversions API bila diperlukan',
    ],
  },
]

interface PlatformCard {
  key: 'google' | 'meta'
  name: string
  icon: LucideIcon
  fitTitle: string
  fitDesc: string
  points: string[]
}

const benefits = [
  {
    icon: Target,
    title: 'Riset Audiens & Kata Kunci Sebelum Anggaran Jalan',
    desc: 'Penargetan disusun dari data, bukan tebakan. Kata kunci negatif dipasang supaya anggaran tidak habis pada pencarian yang tidak relevan.',
  },
  {
    icon: Sparkles,
    title: 'Kreatif Iklan: Copywriting & Variasi Visual',
    desc: 'Materi iklan disiapkan dalam beberapa variasi supaya bisa diuji. Yang bekerja dilanjutkan, yang tidak bekerja dihentikan.',
  },
  {
    icon: Settings2,
    title: 'Tracking Pixel & Konversi Terpasang Rapi',
    desc: 'Meta Pixel, Google Tag, dan pencatatan konversi dipasang dan diverifikasi. Tanpa ini, data kampanye tidak bisa dibaca.',
  },
  {
    icon: MessageSquare,
    title: 'Optimasi ke Percakapan WhatsApp',
    desc: 'Tujuan kampanye diarahkan ke percakapan, bukan hanya klik. Yang dipantau adalah biaya per percakapan masuk, bukan jumlah tayangan.',
  },
  {
    icon: BarChart3,
    title: 'Laporan Kinerja yang Bisa Dibaca Pemilik Usaha',
    desc: 'Laporan berisi angka biaya, jumlah percakapan, dan hasil per kampanye. Ditulis dengan bahasa yang bisa dipahami, bukan istilah teknis saja.',
  },
  {
    icon: Users,
    title: 'Akses Langsung ke Pengelola Iklan',
    desc: 'Pertanyaan soal performa bisa ditanyakan langsung lewat WhatsApp ke orang yang memegang akun iklan Anda.',
  },
]

const steps = [
  {
    number: '01',
    title: 'Audit & Diskusi Awal',
    desc: 'Pemeriksaan akun iklan, riwayat kampanye, dan target yang realistis sesuai kapasitas bisnis Anda.',
  },
  {
    number: '02',
    title: 'Riset & Penyusunan Kreatif',
    desc: 'Penentuan audiens atau kata kunci, penyusunan penawaran, dan pembuatan materi iklan.',
  },
  {
    number: '03',
    title: 'Peluncuran & Pemantauan',
    desc: 'Kampanye aktif, konversi tercatat, dan biaya per percakapan dipantau harian.',
  },
  {
    number: '04',
    title: 'Evaluasi & Scaling',
    desc: 'Kampanye yang tidak bekerja dihentikan, anggaran ditambah pada yang bekerja berdasarkan angka.',
  },
]

const guarantees = [
  {
    icon: Search,
    title: 'Audit Akun Iklan Gratis',
    desc: 'Pemeriksaan struktur kampanye, penargetan, dan pencatatan konversi sebelum ada kerja sama.',
  },
  {
    icon: BarChart3,
    title: 'Laporan Bisa Dilihat Kapan Saja',
    desc: 'Angka biaya, jumlah percakapan, dan hasil per kampanye dapat Anda lihat tanpa harus menunggu.',
  },
  {
    icon: Clock,
    title: 'Tidak Ada Kontrak Jangka Panjang di Awal',
    desc: 'Evaluasi dilakukan bulanan. Lanjut atau hentikan berdasarkan angka yang terlihat.',
  },
  {
    icon: ShieldCheck,
    title: 'Akses Penuh ke Akun Anda',
    desc: 'Akun iklan tetap milik Anda. Tidak ada akses yang ditahan ketika kerja sama berakhir.',
  },
]

const industryPills = [
  'Toko Online & Ritel',
  'Company Profile Perusahaan',
  'Travel & Rental',
  'Klinik & Jasa Profesional',
  'Kuliner & F&B',
  'Fashion & Beauty',
  'Pendidikan & Kursus',
  'Properti & Developer',
  'Portal & Instansi',
  'Jasa B2B',
]

function SectionMark({
  num,
  icon: Icon,
  eyebrow,
}: {
  num: string
  icon: LucideIcon
  eyebrow: string
}) {
  return (
    <div className="mb-4 flex items-center justify-center gap-2.5 text-neutral-600">
      <span
        aria-hidden="true"
        className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-500"
      >
        § {num}
      </span>
      <span aria-hidden="true" className="h-px w-8 bg-neutral-300" />
      <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-700">
        <Icon aria-hidden="true" className="h-3.5 w-3.5 text-[#C23605]" />
        <span>{eyebrow}</span>
      </span>
    </div>
  )
}
```

- [ ] **Step 2: Tambahkan komponen fungsi utama dengan hero saja**

Tambahkan di bawah `SectionMark`:

```tsx
export default function JasaIklanAdsPage() {
  return (
    <div className="website-service min-h-screen font-sans bg-[#FBFBFB] text-[#18181B] antialiased selection:bg-[#FF5C28] selection:text-white">
      <JsonLd
        data={[
          serviceSchema(
            'Jasa Iklan Google Ads & Meta Ads',
            'Jasa pengelolaan kampanye iklan Google Ads dan Meta Ads (Facebook & Instagram): riset audiens, penyusunan kreatif, pemasangan tracking pixel, dan optimasi konversi ke WhatsApp dengan laporan transparan.',
            '/jasa-iklan-ads'
          ),
          faqSchema(faqs),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Jasa Iklan Google Ads & Meta Ads', path: '/jasa-iklan-ads' },
          ]),
        ]}
      />

      <main className="relative overflow-hidden">
        {/* 1. HERO */}
        <div className="relative bg-paper-cream-glow bg-dot-fine pt-28 sm:pt-36 pb-16 sm:pb-24">
          <section className="relative max-w-6xl mx-auto px-4 sm:px-6">
            <div className="max-w-3xl space-y-6 text-left">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#FFF5F0] border border-orange-300/60">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#C23605]">
                    Jasa Iklan Google Ads &amp; Meta Ads Terukur
                  </span>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-neutral-200/80 shadow-xs">
                  <Megaphone className="w-3.5 h-3.5 text-[#C23605]" />
                  <span className="text-xs font-semibold text-neutral-700 tracking-tight">
                    Agency Boutique — Fokus Maksimal 10 Klien/Bulan
                  </span>
                </div>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#111827] tracking-tight leading-[1.2] sm:leading-[1.14]">
                Iklan Anda Harus Mendatangkan Percakapan,{' '}
                <span className="text-[#FF5C28]">Bukan Hanya Klik</span>
              </h1>

              <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-normal max-w-xl">
                Pengelolaan iklan Google Ads dan Meta Ads untuk bisnis yang ingin mengukur hasilnya dengan angka: biaya per percakapan, jumlah leads, dan laporan yang bisa dibaca. Bukan sekadar menyalakan kampanye lalu ditinggal.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <a
                  href={getWhatsAppDirectUrl(
                    'Halo Admin MarketingCode.ID, saya mau konsultasi jasa iklan Google Ads / Meta Ads. Jenis usaha saya: ____'
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm sm:text-base font-semibold text-white bg-[#D13D00] hover:bg-[#B33400] rounded-full shadow-glow transition-all duration-300 transform hover:-translate-y-1"
                >
                  <Image
                    src="/icons/flaticon/whatsapp.svg"
                    alt=""
                    width={22}
                    height={22}
                    className="w-5 h-5 shrink-0"
                  />
                  <span>Konsultasi Iklan via WhatsApp</span>
                </a>
                <a
                  href="#paket-iklan"
                  className="inline-flex items-center justify-center px-6 py-3.5 text-sm sm:text-base font-semibold text-neutral-800 bg-white hover:border-[#D13D00] border border-neutral-200 rounded-full transition-all duration-300 text-center"
                >
                  <span>Lihat Paket &amp; Biaya</span>
                </a>
              </div>

              <div className="pt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-neutral-700 font-medium">
                <span className="flex items-center gap-1">
                  <Check className="w-4 h-4 text-[#FF5C28]" /> Google Ads &amp; Meta Ads
                </span>
                <span className="text-neutral-300">•</span>
                <span className="flex items-center gap-1">
                  <Check className="w-4 h-4 text-[#FF5C28]" /> Tracking Pixel Terpasang
                </span>
                <span className="text-neutral-300">•</span>
                <span className="flex items-center gap-1">
                  <Check className="w-4 h-4 text-[#FF5C28]" /> Laporan Transparan
                </span>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
```

- [ ] **Step 3: Build**

Run: `pnpm build`
Expected: exit code 0. Route `/jasa-iklan-ads` muncul di output build sebagai `○ (Static)`.

- [ ] **Step 4: Commit**

```bash
git add "src/app/(frontend)/jasa-iklan-ads/page.tsx"
git commit -m "feat(ads): scaffold halaman jasa iklan ads dengan hero"
```

---

## Task 2: Section Masalah (4 Kartu)

**Files:**
- Modify: `src/app/(frontend)/jasa-iklan-ads/page.tsx`

**Interfaces:**
- Consumes: `problems` array dan `SectionMark` dari Task 1.
- Produces: tidak ada export baru.

- [ ] **Step 1: Sisipkan section setelah penutup hero**

Cari blok penutup hero:

```tsx
        </div>
      </main>
    </div>
  )
}
```

Ganti dengan:

```tsx
        </div>

        {/* 2. MASALAH PENGIKLAN PEMULA */}
        <div className="relative bg-paper-warm section-rule py-20 sm:py-24">
          <section className="relative max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <SectionMark num="02" icon={AlertTriangle} eyebrow="Masalah Umum Pengiklan" />
              <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
                Anggaran Habis, Tapi Tidak Ada Percakapan Masuk
              </h2>
              <p className="text-neutral-600 text-sm sm:text-base mt-2 max-w-2xl mx-auto leading-relaxed">
                Empat penyebab paling sering kami temukan saat memeriksa akun iklan pemilik usaha. Jika salah satunya terasa familiar, audit gratis bisa jadi langkah pertama.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {problems.map((item) => (
                <div
                  key={item.number}
                  className="bg-white rounded-3xl p-6 sm:p-7 border border-neutral-200/80 shadow-card hover:border-[#FF5C28] hover:shadow-xl hover:shadow-orange-500/5 transition-all duration-300 group flex flex-col justify-between"
                >
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-700 text-[11px] font-bold mb-3">
                      <span>Masalah {item.number}</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-neutral-900 group-hover:text-[#C23205] transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-600 mt-2 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
```

- [ ] **Step 2: Verifikasi visual di dev server**

Run: `pnpm dev`, buka `http://localhost:3000/jasa-iklan-ads`, scroll ke bawah hero.
Expected: 4 kartu masalah tampil, background cream berpola titik, ada label `§ 02 · MASALAH UMUM PENGIKLAN`.

- [ ] **Step 3: Commit**

```bash
git add "src/app/(frontend)/jasa-iklan-ads/page.tsx"
git commit -m "feat(ads): tambah section empat masalah pengiklan"
```

---

## Task 3: Section Perbandingan Platform Google vs Meta

**Files:**
- Modify: `src/app/(frontend)/jasa-iklan-ads/page.tsx`

**Interfaces:**
- Consumes: `platforms` array (tipe `PlatformCard[]`) dan `SectionMark` dari Task 1.
- Produces: tidak ada export baru.

- [ ] **Step 1: Sisipkan section sebelum `</main>`**

Cari:

```tsx
      </main>
    </div>
  )
}
```

Ganti dengan:

```tsx
        {/* 3. PANDUAN PILIH PLATFORM */}
        <div className="relative bg-paper-right-glow bg-dot-fine py-20 sm:py-24 overflow-hidden">
          <section className="relative max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <SectionMark num="03" icon={Target} eyebrow="Panduan Memilih Platform" />
              <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
                Google Ads atau Meta Ads, Mana yang Lebih Tepat?
              </h2>
              <p className="text-neutral-600 text-sm sm:text-base mt-2 max-w-2xl mx-auto leading-relaxed">
                Keduanya bukan pengganti satu sama lain. Yang menentukan adalah niat pembeli pada tahap itu, bukan mana yang sedang ramai dibicarakan.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {platforms.map((item) => (
                <div
                  key={item.key}
                  className="bg-white rounded-3xl p-6 sm:p-7 border border-neutral-200/80 shadow-card hover:border-[#FF5C28] transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-[#FFF5F0] border border-orange-200/60 flex items-center justify-center text-[#C23605] mb-4">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-neutral-900 leading-snug tracking-tight">
                      {item.name}
                    </h3>
                    <p className="text-sm font-semibold text-[#C23605] mt-2 leading-snug">
                      {item.fitTitle}
                    </p>
                    <p className="text-xs sm:text-sm text-neutral-600 mt-2 leading-relaxed">
                      {item.fitDesc}
                    </p>
                    <ul className="mt-5 pt-5 border-t border-neutral-100 space-y-2.5">
                      {item.points.map((point) => (
                        <li key={point} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-neutral-700">
                          <Check className="w-4 h-4 shrink-0 text-[#FF5C28] mt-0.5" strokeWidth={2.5} />
                          <span className="leading-snug">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-center text-xs sm:text-sm text-neutral-600 font-medium mt-8 max-w-2xl mx-auto">
              Banyak bisnis memakai keduanya secara bergantian sesuai tahap funnel.
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}
```

- [ ] **Step 2: Build (checkpoint pertama)**

Run: `pnpm build`
Expected: exit code 0. Tidak ada error TypeScript.

- [ ] **Step 3: Commit**

```bash
git add "src/app/(frontend)/jasa-iklan-ads/page.tsx"
git commit -m "feat(ads): tambah section perbandingan Google Ads vs Meta Ads"
```

---

## Task 4: Section 6 Keuntungan

**Files:**
- Modify: `src/app/(frontend)/jasa-iklan-ads/page.tsx`

**Interfaces:**
- Consumes: `benefits` array dan `SectionMark` dari Task 1.
- Produces: tidak ada export baru.

- [ ] **Step 1: Sisipkan section sebelum `</main>`**

Cari:

```tsx
      </main>
    </div>
  )
}
```

Ganti dengan:

```tsx
        {/* 4. KEUNTUNGAN KERJA SAMA */}
        <div className="relative bg-paper-warm section-rule py-16 sm:py-20">
          <section className="relative max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <SectionMark num="04" icon={TrendingUp} eyebrow="Yang Anda Dapatkan" />
              <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
                Enam Pekerjaan yang Ditangani, Bukan Dilempar ke Anda
              </h2>
              <p className="text-neutral-600 text-sm sm:text-base mt-2 max-w-2xl mx-auto leading-relaxed">
                Semua poin di bawah ini adalah pekerjaan yang kami lakukan, bukan janji hasil. Hasil akhir tetap bergantung pada produk, harga, dan pasar Anda.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
              {benefits.map((item) => (
                <div
                  key={item.title}
                  className="bg-white rounded-3xl p-6 sm:p-7 border border-neutral-200/80 shadow-card hover:border-[#FF5C28] hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-[#FFF5F0] border border-orange-200/60 flex items-center justify-center text-[#C23605] mb-4">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-neutral-900 leading-snug tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-600 mt-3 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add "src/app/(frontend)/jasa-iklan-ads/page.tsx"
git commit -m "feat(ads): tambah section enam keuntungan kerja sama"
```

---

## Task 5: Section Pill Industri

**Files:**
- Modify: `src/app/(frontend)/jasa-iklan-ads/page.tsx`

**Interfaces:**
- Consumes: `industryPills` array (string[]) dari Task 1.
- Produces: tidak ada export baru.

- [ ] **Step 1: Sisipkan section sebelum `</main>`**

Cari:

```tsx
      </main>
    </div>
  )
}
```

Ganti dengan:

```tsx
        {/* 5. PILL INDUSTRI */}
        <div className="relative bg-paper-warm py-10 sm:py-12 border-y border-neutral-200/60">
          <section className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-neutral-200/80 text-[11px] font-bold text-neutral-700 mb-4">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              <span>Cocok untuk Berbagai Jenis Usaha</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm">
              {industryPills.map((item) => (
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
      </main>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add "src/app/(frontend)/jasa-iklan-ads/page.tsx"
git commit -m "feat(ads): tambah baris pill kategori industri"
```

---

## Task 6: Section Pricing 3 Tier

**Files:**
- Modify: `src/app/(frontend)/jasa-iklan-ads/page.tsx`

**Interfaces:**
- Consumes: `pricingData.ads` dari `@/components/home/home-data` (tipe `PricingTier[]`).
- Produces: tidak ada export baru.

**PENTING:** Jangan menyalin data harga secara manual. Import agar tidak ada drift dengan homepage.

- [ ] **Step 1: Tambah import di bagian atas file**

Cari:

```tsx
import { JsonLd, faqSchema, serviceSchema, breadcrumbSchema } from '@/lib/seo'
```

Ganti dengan:

```tsx
import { JsonLd, faqSchema, serviceSchema, breadcrumbSchema } from '@/lib/seo'
import { pricingData } from '@/components/home/home-data'
```

- [ ] **Step 2: Sisipkan section pricing sebelum `</main>`**

Cari:

```tsx
      </main>
    </div>
  )
}
```

Ganti dengan:

```tsx
        {/* 6. PRICING */}
        <div className="relative bg-paper-cream py-20 sm:py-24 overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-blueprint opacity-70"
          />
          <section id="paket-iklan" className="relative max-w-6xl mx-auto px-4 sm:px-6">
            <div className="frame-ticks bg-[#FBFBFB]/70 px-3 sm:px-8 lg:px-10 py-10 sm:py-14">
              <div className="text-center mb-10">
                <SectionMark num="05" icon={CircleDollarSign} eyebrow="Paket Pengelolaan Iklan" />
                <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
                  Pilih Intensitas Pengelolaan Sesuai Tahap Bisnis
                </h2>
                <p className="text-neutral-600 text-sm sm:text-base mt-2 max-w-2xl mx-auto leading-relaxed">
                  Biaya ini adalah jasa pengelolaan. Anggaran iklan dibayarkan terpisah langsung dari akun iklan milik Anda.
                </p>

                <div className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFF5F0] border border-orange-200/80 text-xs sm:text-sm font-semibold text-[#C23605] shadow-xs text-left">
                  <span className="flex h-2 w-2 rounded-full bg-[#C23605] animate-pulse shrink-0" />
                  <span>Slot Terbatas Bulan Ini: Maksimal 10 klien agar pemantauan kampanye tetap intensif.</span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch text-left">
                {pricingData.ads.map((item) => {
                  const isHighlight = item.isPopular
                  const waMessage = `Halo Admin MarketingCode.ID, saya tertarik ${item.tier} (${item.price}${item.unit}). Jenis usaha saya: ____`

                  return (
                    <div
                      key={item.tier}
                      className={`bg-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative ${
                        isHighlight
                          ? 'border-2 border-[#FF5C28] shadow-xl shadow-orange-500/10 lg:-translate-y-2 lg:scale-[1.02] z-10'
                          : 'border border-neutral-200/80 shadow-card hover:border-orange-200/80 hover:shadow-lg'
                      }`}
                    >
                      {isHighlight && (
                        <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#FF5C28] to-[#EA4510] text-white text-[11px] font-extrabold px-4 py-1 rounded-full uppercase tracking-wider shadow-md flex items-center gap-1.5 whitespace-nowrap z-20">
                          <Sparkles className="w-3 h-3" />
                          <span>Paling Diminati</span>
                        </div>
                      )}

                      <div>
                        {!isHighlight && (
                          <div className="mb-3">
                            <span className="inline-flex items-center text-[11px] font-bold text-neutral-600 bg-neutral-100 border border-neutral-200/80 px-2.5 py-0.5 rounded-full">
                              {item.tier === 'Growth Campaign' ? 'Mulai Dari' : 'Fitur Terlengkap'}
                            </span>
                          </div>
                        )}

                        <h3 className="text-xl font-extrabold text-neutral-900 tracking-tight">
                          {item.tier}
                        </h3>

                        <p className="text-xs sm:text-[13px] text-neutral-600 mt-2.5 leading-relaxed min-h-[44px]">
                          {item.desc}
                        </p>

                        <div className="mt-5 pt-4 border-t border-neutral-100">
                          <div className="flex items-baseline gap-1.5 flex-wrap">
                            <span className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
                              {item.price}
                            </span>
                            <span className="text-xs text-neutral-500 font-medium">{item.unit}</span>
                          </div>
                        </div>

                        <a
                          href={getWhatsAppDirectUrl(waMessage)}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Konsultasi ${item.tier} via WhatsApp`}
                          className={`mt-6 w-full py-3 px-5 font-bold text-xs sm:text-sm rounded-full flex items-center justify-center gap-2 transition-all cursor-pointer ${
                            isHighlight
                              ? 'bg-[#FF5C28] hover:bg-[#EA4510] text-white shadow-glow hover:scale-[1.01]'
                              : 'bg-neutral-900 hover:bg-neutral-800 text-white hover:scale-[1.01]'
                          }`}
                        >
                          <Image
                            src="/icons/flaticon/whatsapp.svg"
                            alt=""
                            width={16}
                            height={16}
                            className="w-4 h-4 shrink-0 object-contain"
                          />
                          <span>{item.btnText}</span>
                        </a>

                        <div className="mt-6 pt-6 border-t border-neutral-100 space-y-3 text-xs sm:text-[13px] text-neutral-700">
                          {item.features.map((feat, idx) => (
                            <div key={idx} className="flex items-start gap-2.5">
                              <div className="w-4 h-4 rounded-full bg-orange-100 text-[#C23605] flex items-center justify-center shrink-0 mt-0.5">
                                <Check className="w-2.5 h-2.5 stroke-[3]" />
                              </div>
                              <span className="leading-snug">
                                {typeof feat === 'string' ? feat : feat.text}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-neutral-100">
                        {item.time && (
                          <div className="text-[11px] text-neutral-600 text-center font-semibold pt-1">
                            {item.time}
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
```

- [ ] **Step 3: Build (checkpoint kedua)**

Run: `pnpm build`
Expected: exit code 0. Tiga kartu harga tampil dengan angka `Rp 3.5jt`, `Rp 7.5jt`, `Rp 15jt+`.

- [ ] **Step 4: Commit**

```bash
git add "src/app/(frontend)/jasa-iklan-ads/page.tsx"
git commit -m "feat(ads): tambah section pricing tiga tier dari pricingData.ads"
```

---

## Task 7: Section Alur Kerja 4 Tahap (Dark Band)

**Files:**
- Modify: `src/app/(frontend)/jasa-iklan-ads/page.tsx`

**Interfaces:**
- Consumes: `steps` array dari Task 1.
- Produces: tidak ada export baru.

- [ ] **Step 1: Sisipkan section sebelum `</main>`**

Cari:

```tsx
      </main>
    </div>
  )
}
```

Ganti dengan:

```tsx
        {/* 7. ALUR KERJA */}
        <div className="relative bg-ink-panel py-20 sm:py-24 overflow-hidden">
          <section className="relative max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b-2 border-white/20">
              <span className="font-semibold text-[11px] sm:text-xs tracking-[0.28em] uppercase text-[#FF5C28]">
                <span aria-hidden="true">§ 06 · </span>Alur Kerja
              </span>
              <span className="font-semibold text-[11px] sm:text-xs tracking-[0.28em] uppercase text-neutral-300">
                Dari Audit Sampai Scaling
              </span>
            </div>

            <div className="mt-10 lg:mt-14 mb-14 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end text-left">
              <h2 className="lg:col-span-8 font-extrabold text-3xl sm:text-4xl lg:text-[3rem] text-white leading-[1.2] tracking-tight">
                Empat tahap, masing-masing punya angka yang dipantau.
              </h2>
              <div className="lg:col-span-4 space-y-3">
                <p className="font-medium text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  Tidak ada tahap yang dilewati. Setiap tahap punya keluaran yang bisa Anda periksa sebelum lanjut ke tahap berikutnya.
                </p>
                <div className="flex items-center gap-3 pt-1">
                  <span className="w-8 h-px bg-[#FF5C28]" />
                  <span className="font-semibold text-[10px] tracking-[0.24em] uppercase text-neutral-300">
                    Terukur &amp; Transparan
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((step, i) => (
                <div
                  key={step.number}
                  className="bg-white border border-neutral-200/80 rounded-3xl p-6 shadow-card hover:border-[#FF5C28] hover:shadow-xl transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-200 text-[#C23605] font-extrabold text-base flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                      {step.number}
                    </div>
                    <h3 className="font-bold text-lg text-neutral-900 leading-snug group-hover:text-[#FF5C28] transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-600 mt-2.5 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                  <div className="mt-5 pt-3 border-t border-neutral-100 flex items-center gap-1.5 text-[11px] font-semibold text-[#C23605]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Tahap {i + 1} dari 4</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add "src/app/(frontend)/jasa-iklan-ads/page.tsx"
git commit -m "feat(ads): tambah section alur kerja empat tahap"
```

---

## Task 8: Section Garansi + Audit Gratis (Pengganti Testimoni)

**Files:**
- Modify: `src/app/(frontend)/jasa-iklan-ads/page.tsx`

**Interfaces:**
- Consumes: `guarantees` array dari Task 1; `getWhatsAppDirectUrl`.
- Produces: tidak ada export baru.

- [ ] **Step 1: Sisipkan section sebelum `</main>`**

Cari:

```tsx
      </main>
    </div>
  )
}
```

Ganti dengan:

```tsx
        {/* 8. GARANSI + AUDIT GRATIS (pengganti testimoni) */}
        <div className="relative bg-paper-warm section-rule py-20 sm:py-24">
          <section className="relative max-w-6xl mx-auto px-4 sm:px-6">
            <div className="bg-gradient-to-br from-[#FFF5F0] via-white to-orange-50/50 rounded-3xl p-8 sm:p-12 border border-orange-200/80 shadow-card">
              <div className="max-w-3xl">
                <div className="mb-3 flex items-center gap-2.5 text-neutral-600">
                  <span
                    aria-hidden="true"
                    className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-500"
                  >
                    § 07
                  </span>
                  <span aria-hidden="true" className="h-px w-8 bg-neutral-300" />
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-700">
                    <ShieldCheck aria-hidden="true" className="h-3.5 w-3.5 text-[#C23605]" />
                    <span>Garansi &amp; Audit Gratis</span>
                  </span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
                  Bisa Diperiksa Sebelum Memutuskan Kerja Sama
                </h2>
                <p className="text-sm sm:text-base text-neutral-600 mt-3 leading-relaxed">
                  Kami tidak menampilkan klaim hasil kampanye yang belum bisa Anda verifikasi. Yang kami tawarkan adalah pemeriksaan akun lebih dulu, akses penuh ke akun Anda, dan laporan yang bisa dibaca sendiri.
                </p>

                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {guarantees.map((item) => (
                    <div
                      key={item.title}
                      className="bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-xs"
                    >
                      <div className="w-9 h-9 rounded-xl bg-orange-100 text-[#C23605] flex items-center justify-center mb-3">
                        <item.icon className="w-4 h-4" />
                      </div>
                      <h3 className="font-bold text-sm text-neutral-900">{item.title}</h3>
                      <p className="text-xs text-neutral-600 mt-1.5 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-orange-200/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <div className="font-bold text-sm text-neutral-900">
                      Mulai dari audit akun iklan Anda, tanpa biaya.
                    </div>
                    <p className="text-xs text-neutral-600 mt-0.5">
                      Sebutkan platform yang dipakai dan kendala yang dirasakan.
                    </p>
                  </div>
                  <a
                    href={getWhatsAppDirectUrl(
                      'Halo Admin MarketingCode.ID, saya ingin audit gratis akun iklan Google Ads / Meta Ads saya.'
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Minta audit akun iklan gratis via WhatsApp"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-orange-50 border border-neutral-300 hover:border-[#C23605] text-[#C23605] text-xs font-bold transition-all shadow-xs shrink-0"
                  >
                    <Image
                      src="/icons/flaticon/whatsapp.svg"
                      alt=""
                      width={16}
                      height={16}
                      className="w-4 h-4 shrink-0"
                    />
                    <span>Minta Audit Gratis</span>
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add "src/app/(frontend)/jasa-iklan-ads/page.tsx"
git commit -m "feat(ads): tambah section garansi dan audit gratis"
```

---

## Task 9: Section FAQ + Final CTA

**Files:**
- Modify: `src/app/(frontend)/jasa-iklan-ads/page.tsx`

**Interfaces:**
- Consumes: `faqs` array dari Task 1; `getWhatsAppDirectUrl`.
- Produces: tidak ada export baru.

- [ ] **Step 1: Sisipkan FAQ dan Final CTA sebelum `</main>`**

Cari:

```tsx
      </main>
    </div>
  )
}
```

Ganti dengan:

```tsx
        {/* 9. FAQ */}
        <div className="relative bg-paper-cream-left-glow bg-dot-fine py-20 sm:py-24 overflow-hidden">
          <section className="relative max-w-3xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-10">
              <SectionMark num="08" icon={HelpCircle} eyebrow="Tanya Jawab" />
              <h2 className="text-3xl font-extrabold text-neutral-900 tracking-tight">
                Pertanyaan yang Sering Diajukan Pemilik Usaha
              </h2>
            </div>

            <div className="space-y-3">
              {faqs.map((faq) => (
                <details
                  key={faq.q}
                  className="bg-white rounded-2xl border border-neutral-200/80 overflow-hidden shadow-xs group"
                >
                  <summary className="w-full px-5 py-4 text-left flex items-center justify-between gap-3 text-xs sm:text-sm font-bold text-neutral-900 hover:text-[#FF5C28] cursor-pointer list-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF5C28]">
                    <h3 className="font-bold min-w-0 flex-1">{faq.q}</h3>
                    <ChevronDown
                      aria-hidden="true"
                      className="h-4 w-4 shrink-0 text-neutral-500 transition-transform duration-200 group-open:rotate-180"
                    />
                  </summary>
                  <div className="px-5 pb-5 text-xs sm:text-sm text-neutral-600 leading-relaxed border-t border-neutral-100 pt-3">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </section>
        </div>

        {/* 10. FINAL CTA */}
        <div className="relative bg-paper-warm py-20 sm:py-24 overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 font-mono text-[18rem] font-bold text-neutral-900/[0.025] select-none leading-none tracking-tighter"
          >
            §
          </div>
          <section className="relative max-w-4xl mx-auto px-4 sm:px-6">
            <div className="bg-[#121214] rounded-3xl p-8 sm:p-12 text-center text-white relative overflow-hidden shadow-2xl border border-neutral-800">
              <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#FF5C28]/20 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 max-w-xl mx-auto space-y-4">
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  Punya Anggaran Iklan yang Ingin Dikelola Lebih Rapi?
                </h2>
                <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
                  Diskusikan jenis usaha, target pasar, dan anggaran yang tersedia. Kami akan memberi gambaran realistis tentang apa yang bisa diukur dari anggaran tersebut, tanpa komitmen awal.
                </p>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={getWhatsAppDirectUrl(
                      'Halo Admin MarketingCode.ID, saya ingin diskusi rencana iklan untuk usaha saya secara gratis.'
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Diskusi rencana iklan via WhatsApp"
                    className="w-full sm:w-auto px-8 py-3.5 bg-[#D13D00] hover:bg-[#B33400] text-white font-bold text-xs sm:text-sm rounded-full shadow-glow transition-all flex items-center justify-center gap-2"
                  >
                    <Image
                      src="/icons/flaticon/whatsapp.svg"
                      alt=""
                      width={18}
                      height={18}
                      className="w-4 h-4 shrink-0 object-contain"
                    />
                    <span>Diskusi Rencana Iklan via WhatsApp</span>
                  </a>
                </div>

                <div className="pt-4 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-[11px] text-neutral-300">
                  <span className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#FF5C28]" /> Google Ads &amp; Meta Ads
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#FF5C28]" /> Audit Akun Gratis
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#FF5C28]" /> Akun Tetap Milik Anda
                  </span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
```

- [ ] **Step 2: Build (checkpoint ketiga)**

Run: `pnpm build`
Expected: exit code 0. Halaman lengkap 10 section.

- [ ] **Step 3: Commit**

```bash
git add "src/app/(frontend)/jasa-iklan-ads/page.tsx"
git commit -m "feat(ads): tambah section FAQ dan final CTA"
```

---

## Task 10: Tambah Tiga Redirect 308 di `next.config.ts`

**Files:**
- Modify: `next.config.ts:9-27`

**Interfaces:**
- Consumes: tidak ada.
- Produces: tiga entri redirect yang dipakai Task 11 & 12.

**LATAR:** Redirect di `next.config.ts` dijalankan sebelum filesystem dan menghasilkan 308 (permanent) yang mempertahankan metode request. Ini jalur utama untuk transfer sinyal SEO.

- [ ] **Step 1: Sisipkan tiga entri redirect**

Cari:

```ts
      {
        source: '/faq',
        destination: '/pertanyaan',
        permanent: true,
      },
    ]
```

Ganti dengan:

```ts
      {
        source: '/faq',
        destination: '/pertanyaan',
        permanent: true,
      },
      {
        source: '/company-profile',
        destination: '/jasa-pembuatan-website',
        permanent: true,
      },
      {
        source: '/landing-page',
        destination: '/jasa-pembuatan-website',
        permanent: true,
      },
      {
        source: '/jasa-iklan-meta-ads',
        destination: '/jasa-iklan-ads',
        permanent: true,
      },
    ]
```

- [ ] **Step 2: Verifikasi tipe**

Run: `pnpm exec tsc --noEmit`
Expected: tidak ada error pada `next.config.ts`.

- [ ] **Step 3: Commit**

```bash
git add next.config.ts
git commit -m "feat(routing): tambah redirect permanen untuk tiga URL layanan lama"
```

---

## Task 11: Ubah `company-profile` dan `landing-page` Jadi Stub Redirect

**Files:**
- Modify: `src/app/(frontend)/company-profile/page.tsx` (ganti SELURUH isi)
- Modify: `src/app/(frontend)/landing-page/page.tsx` (ganti SELURUH isi)

**Interfaces:**
- Consumes: `permanentRedirect` dari `next/navigation`.
- Produces: tidak ada export baru.

**CATATAN:** Task ini mengecilkan file dari ratusan baris menjadi 5 baris. Ini satu-satunya pengecualian aturan "jangan rewrite file", karena tujuannya memang menghapus isi halaman.

- [ ] **Step 1: Ganti isi `company-profile/page.tsx`**

Tulis ulang file `src/app/(frontend)/company-profile/page.tsx` menjadi PERSIS:

```tsx
import { permanentRedirect } from 'next/navigation'

export default function CompanyProfileRedirectPage() {
  permanentRedirect('/jasa-pembuatan-website')
}
```

- [ ] **Step 2: Ganti isi `landing-page/page.tsx`**

Tulis ulang file `src/app/(frontend)/landing-page/page.tsx` menjadi PERSIS:

```tsx
import { permanentRedirect } from 'next/navigation'

export default function LandingPageRedirectPage() {
  permanentRedirect('/jasa-pembuatan-website')
}
```

- [ ] **Step 3: Hapus import yang jadi tidak terpakai**

Tidak ada import lain di kedua file setelah ditulis ulang. Pastikan tidak ada import `Metadata`, `Image`, atau komponen lain yang tersisa.

Run: `pnpm exec tsc --noEmit`
Expected: tidak ada error "unused import" atau "cannot find module" dari kedua file.

- [ ] **Step 4: Commit**

```bash
git add "src/app/(frontend)/company-profile/page.tsx" "src/app/(frontend)/landing-page/page.tsx"
git commit -m "refactor(routing): ubah company-profile dan landing-page jadi stub redirect"
```

---

## Task 12: Ubah `jasa-iklan-meta-ads` Jadi Stub Redirect

**Files:**
- Modify: `src/app/(frontend)/jasa-iklan-meta-ads/page.tsx` (ganti SELURUH isi)

**Interfaces:**
- Consumes: `permanentRedirect` dari `next/navigation`.
- Produces: tidak ada export baru.

- [ ] **Step 1: Ganti isi file**

Tulis ulang `src/app/(frontend)/jasa-iklan-meta-ads/page.tsx` menjadi PERSIS:

```tsx
import { permanentRedirect } from 'next/navigation'

export default function JasaIklanMetaAdsRedirectPage() {
  permanentRedirect('/jasa-iklan-ads')
}
```

- [ ] **Step 2: Verifikasi target redirect sudah ada**

Run: `test -f "src/app/(frontend)/jasa-iklan-ads/page.tsx" && echo "target exists"`
Expected: `target exists`

Jika file target belum ada, JANGAN lanjut. Selesaikan Task 1 sampai 9 dulu.

- [ ] **Step 3: Build (checkpoint keempat)**

Run: `pnpm build`
Expected: exit code 0. Output build tidak lagi memuat route `/company-profile`, `/landing-page`, `/jasa-iklan-meta-ads` sebagai halaman mandiri; `/jasa-iklan-ads` ada.

- [ ] **Step 4: Commit**

```bash
git add "src/app/(frontend)/jasa-iklan-meta-ads/page.tsx"
git commit -m "refactor(routing): arahkan jasa-iklan-meta-ads ke jasa-iklan-ads"
```

---

## Task 13: Hapus Halaman `/digital-marketing`

**Files:**
- Delete: `src/app/(frontend)/digital-marketing/page.tsx`
- Delete: folder `src/app/(frontend)/digital-marketing/` jika kosong

**Interfaces:**
- Consumes: tidak ada.
- Produces: route `/digital-marketing` menjadi 404.

**RISIKO YANG SUDAH DISETUJUI PEMILIK PRODUK:** Halaman ini dihapus TANPA redirect. Dampak:
1. Siapa pun yang menyimpan link lama akan mendapat 404.
2. Sinyal SEO halaman lama tidak dialihkan.
3. Kartu di homepage (`ServicesHub.tsx`) akan mengarah ke 404 sampai Task 14 selesai.

Karena itu **Task 14 WAJIB dieksekusi dalam commit yang sama atau segera setelah task ini**, jangan ditinggalkan.

- [ ] **Step 1: Pastikan kartu homepage dipindahkan di task berikutnya**

Baca `src/components/home/ServicesHub.tsx` baris 14-22 dan catat isinya. Jangan edit di task ini.

- [ ] **Step 2: Hapus file halaman**

```bash
rm "src/app/(frontend)/digital-marketing/page.tsx"
rmdir "src/app/(frontend)/digital-marketing" 2>/dev/null || true
```

- [ ] **Step 3: Pastikan folder benar-benar hilang**

Run: `ls "src/app/(frontend)" | grep -c digital-marketing || true`
Expected: `0`

- [ ] **Step 4: Commit (gabung dengan Task 14 jika memungkinkan)**

```bash
git add -A "src/app/(frontend)/digital-marketing"
git commit -m "refactor(routing): hapus halaman digital-marketing yang digantikan jasa-iklan-ads"
```

---

## Task 14: Perbaiki Kartu Layanan di Homepage (`ServicesHub`)

**Files:**
- Modify: `src/components/home/ServicesHub.tsx:14-22`
- Modify: `tests/int/services-hub.int.spec.ts:21-25`

**Interfaces:**
- Consumes: route `/jasa-iklan-ads` dari Task 1.
- Produces: kartu layanan kedua mengarah ke `/jasa-iklan-ads` dengan judul `Jasa Iklan Google Ads & Meta Ads`.

**WAJIB:** Task ini menyelamatkan homepage dari link 404 setelah Task 13.

- [ ] **Step 1: Ubah objek kartu kedua di `ServicesHub.tsx`**

Cari:

```tsx
  {
    href: '/digital-marketing',
    icon: TrendingUp,
    badge: 'Performance Ads & Leads',
    title: 'Jasa Digital Marketing',
    desc: 'Manajemen kampanye iklan berbayar Meta Ads (Facebook & Instagram) dan Google Ads terukur. Didukung riset audiens, materi kreatif persuasif, tracking pixel anti-bocor, dan optimasi konversi WhatsApp.',
    target: 'Cocok untuk: Akuisisi leads berkualitas, akselerasi order produk/jasa, & scale-up omzet bisnis.',
    cta: 'Lihat Layanan Digital Marketing',
  },
```

Ganti dengan:

```tsx
  {
    href: '/jasa-iklan-ads',
    icon: TrendingUp,
    badge: 'Performance Ads & Leads',
    title: 'Jasa Iklan Google Ads & Meta Ads',
    desc: 'Pengelolaan kampanye iklan berbayar Google Ads dan Meta Ads (Facebook & Instagram) yang terukur. Didukung riset audiens dan kata kunci, materi kreatif, pemasangan tracking pixel, dan optimasi konversi ke WhatsApp.',
    target: 'Cocok untuk: akuisisi leads berkualitas, akselerasi order produk/jasa, dan scale-up omzet bisnis.',
    cta: 'Lihat Layanan Iklan Ads',
  },
```

- [ ] **Step 2: Sesuaikan test `services-hub.int.spec.ts`**

Cari:

```ts
    // 2. Jasa Digital Marketing
    const marketingHeading = screen.getByRole('heading', { level: 3, name: 'Jasa Digital Marketing' })
    expect(marketingHeading).toBeTruthy()
    const marketingLink = screen.getByRole('link', { name: /Lihat Layanan Digital Marketing/i })
    expect(marketingLink.getAttribute('href')).toBe('/digital-marketing')
```

Ganti dengan:

```ts
    // 2. Jasa Iklan Google Ads & Meta Ads
    const marketingHeading = screen.getByRole('heading', { level: 3, name: 'Jasa Iklan Google Ads & Meta Ads' })
    expect(marketingHeading).toBeTruthy()
    const marketingLink = screen.getByRole('link', { name: /Lihat Layanan Iklan Ads/i })
    expect(marketingLink.getAttribute('href')).toBe('/jasa-iklan-ads')
```

- [ ] **Step 3: Jalankan test yang terdampak**

Run: `pnpm exec vitest run tests/int/services-hub.int.spec.ts --config ./vitest.config.mts`
Expected: PASS, 4 test lulus.

- [ ] **Step 4: Commit**

```bash
git add src/components/home/ServicesHub.tsx tests/int/services-hub.int.spec.ts
git commit -m "refactor(home): arahkan kartu layanan iklan ke jasa-iklan-ads"
```

---

## Task 15: Sinkronkan Navbar (`SiteHeader`)

**Files:**
- Modify: `src/components/site/SiteHeader.tsx:11-17`

**Interfaces:**
- Consumes: route `/jasa-iklan-ads`, `/company-profile`, `/landing-page` (redirect), `/jasa-iklan-meta-ads` (redirect).
- Produces: `SERVICE_LINKS` berisi tiga entri: website, mobile, ads.

- [ ] **Step 1: Ganti array `SERVICE_LINKS`**

Cari:

```tsx
export const SERVICE_LINKS = [
  { href: '/jasa-pembuatan-website', label: 'Jasa Pembuatan Website', desc: 'Landing page, toko UMKM, & company profile' },
  { href: '/company-profile', label: 'Website Company Profile', desc: 'Profil usaha kredibel & profesional' },
  { href: '/landing-page', label: 'Landing Page Promosi', desc: 'Fokus konversi penawaran produk/jasa' },
  { href: '/jasa-pembuatan-aplikasi-mobile', label: 'Aplikasi Mobile Android & iOS', desc: 'Sistem aplikasi native & cross-platform' },
  { href: '/jasa-iklan-meta-ads', label: 'Iklan Meta Ads (FB & IG)', desc: 'Manajemen kampanye iklan berorientasi konversi' },
]
```

Ganti dengan:

```tsx
export const SERVICE_LINKS = [
  { href: '/jasa-pembuatan-website', label: 'Jasa Pembuatan Website', desc: 'Landing page, katalog UMKM, & profil usaha' },
  { href: '/jasa-pembuatan-aplikasi-mobile', label: 'Aplikasi Mobile Android & iOS', desc: 'Sistem aplikasi native & cross-platform' },
  { href: '/jasa-iklan-ads', label: 'Iklan Google Ads & Meta Ads', desc: 'Kampanye iklan terukur & konversi WhatsApp' },
]
```

- [ ] **Step 2: Verifikasi tidak ada sisa referensi route lama di header**

Run: `grep -nE "company-profile|landing-page|jasa-iklan-meta-ads|digital-marketing" src/components/site/SiteHeader.tsx || echo "clean"`
Expected: `clean`

- [ ] **Step 3: Commit**

```bash
git add src/components/site/SiteHeader.tsx
git commit -m "refactor(nav): susun ulang menu layanan ke tiga pilar"
```

---

## Task 16: Sinkronkan Footer (`SiteFooter`)

**Files:**
- Modify: `src/components/site/SiteFooter.tsx:4-13`

**Interfaces:**
- Consumes: route `/jasa-iklan-ads`.
- Produces: `FOOTER_LINKS` tanpa dua route lama, dengan satu entri ads baru.

- [ ] **Step 1: Ganti array `FOOTER_LINKS`**

Cari:

```tsx
const FOOTER_LINKS = [
  { href: '/jasa-pembuatan-website', label: 'Jasa Pembuatan Website' },
  { href: '/company-profile', label: 'Company Profile' },
  { href: '/landing-page', label: 'Landing Page' },
  { href: '/jasa-pembuatan-aplikasi-mobile', label: 'Aplikasi Mobile' },
  { href: '/jasa-iklan-meta-ads', label: 'Iklan Meta Ads' },
  { href: '/portfolio', label: 'Portofolio' },
  { href: '/blog', label: 'Blog' },
  { href: '/pertanyaan', label: 'Pertanyaan (FAQ)' },
]
```

Ganti dengan:

```tsx
const FOOTER_LINKS = [
  { href: '/jasa-pembuatan-website', label: 'Jasa Pembuatan Website' },
  { href: '/jasa-pembuatan-aplikasi-mobile', label: 'Aplikasi Mobile' },
  { href: '/jasa-iklan-ads', label: 'Iklan Google Ads & Meta Ads' },
  { href: '/portfolio', label: 'Portofolio' },
  { href: '/blog', label: 'Blog' },
  { href: '/pertanyaan', label: 'Pertanyaan (FAQ)' },
]
```

- [ ] **Step 2: Verifikasi**

Run: `grep -nE "company-profile|landing-page|jasa-iklan-meta-ads|digital-marketing" src/components/site/SiteFooter.tsx || echo "clean"`
Expected: `clean`

- [ ] **Step 3: Commit**

```bash
git add src/components/site/SiteFooter.tsx
git commit -m "refactor(footer): perbarui tautan layanan mengikuti struktur baru"
```

---

## Task 17: Perbarui Sitemap

**Files:**
- Modify: `src/app/sitemap.ts:19-20`

**Interfaces:**
- Consumes: route `/jasa-iklan-ads`.
- Produces: sitemap tanpa `/jasa-iklan-meta-ads` dan tanpa `/digital-marketing`.

- [ ] **Step 1: Ganti dua baris sitemap**

Cari:

```ts
    { url: absoluteUrl('/jasa-iklan-meta-ads'), lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: absoluteUrl('/digital-marketing'), lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
```

Ganti dengan:

```ts
    { url: absoluteUrl('/jasa-iklan-ads'), lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
```

- [ ] **Step 2: Verifikasi tidak ada sisa route lama di sitemap**

Run: `grep -nE "jasa-iklan-meta-ads|digital-marketing|company-profile|landing-page" src/app/sitemap.ts || echo "clean"`
Expected: `clean`

- [ ] **Step 3: Commit**

```bash
git add src/app/sitemap.ts
git commit -m "refactor(seo): ganti entri sitemap ke jasa-iklan-ads"
```

---

## Task 18: Perbarui Tiga Link Artikel Internal

**Files:**
- Modify: `src/db/article-content.ts:82`
- Modify: `src/db/article-content.ts:255`
- Modify: `src/db/article-content.ts:384`

**Interfaces:**
- Consumes: route `/jasa-iklan-ads`.
- Produces: tidak ada link internal yang menuju route redirect.

- [ ] **Step 1: Perbaiki baris 82**

Cari potongan ini di dalam file:

```
Ditambah lagi, tim [Jasa Iklan Meta Ads](/jasa-iklan-meta-ads) bisa menggunakan data dari website tersebut
```

Ganti dengan:

```
Ditambah lagi, tim [Jasa Iklan Google Ads & Meta Ads](/jasa-iklan-ads) bisa menggunakan data dari website tersebut
```

- [ ] **Step 2: Perbaiki baris 255**

Cari:

```
**[Jasa Kelola Iklan Meta Ads Berbasis Konversi](/jasa-iklan-meta-ads)**
```

Ganti dengan:

```
**[Jasa Kelola Iklan Google Ads & Meta Ads Berbasis Konversi](/jasa-iklan-ads)**
```

- [ ] **Step 3: Perbaiki baris 384**

Cari:

```
lewat [Jasa Iklan Meta Ads](/jasa-iklan-meta-ads) (Facebook & Instagram Ads)
```

Ganti dengan:

```
lewat [Jasa Iklan Google Ads & Meta Ads](/jasa-iklan-ads) (Google Ads & Facebook/Instagram Ads)
```

- [ ] **Step 4: Verifikasi seluruh file bersih**

Run: `grep -nE "jasa-iklan-meta-ads|/company-profile|/landing-page|/digital-marketing" src/db/article-content.ts || echo "clean"`
Expected: `clean`

- [ ] **Step 5: Commit**

```bash
git add src/db/article-content.ts
git commit -m "refactor(content): arahkan tautan artikel ke jasa-iklan-ads"
```

---

## Task 19: Perbaiki `site-header.int.spec.ts` (Import Halaman Yang Dihapus)

**Files:**
- Modify: `tests/int/site-header.int.spec.ts:14`
- Modify: `tests/int/site-header.int.spec.ts:77`

**Interfaces:**
- Consumes: halaman `/jasa-iklan-ads` dari Task 1.
- Produces: test header tidak lagi mengimpor modul yang sudah dihapus.

**KENAPA WAJIB:** File test lama mengimpor `@/app/(frontend)/digital-marketing/page`. Setelah Task 13 file itu hilang, seluruh test suite gagal saat import, bukan saat assertion.

- [ ] **Step 1: Ganti import halaman**

Cari:

```ts
import DigitalMarketingPage from '@/app/(frontend)/digital-marketing/page'
```

Ganti dengan:

```ts
import JasaIklanAdsPage from '@/app/(frontend)/jasa-iklan-ads/page'
```

- [ ] **Step 2: Ganti pemakaian di `it.each`**

Cari:

```ts
  it.each([DigitalMarketingPage, VideoEditingPage])('uses only the shared footer for %s', (Page) => {
```

Ganti dengan:

```ts
  it.each([JasaIklanAdsPage, VideoEditingPage])('uses only the shared footer for %s', (Page) => {
```

- [ ] **Step 3: Jalankan test header**

Run: `pnpm exec vitest run tests/int/site-header.int.spec.ts --config ./vitest.config.mts`
Expected: PASS. Tidak ada error "Failed to resolve import".

- [ ] **Step 4: Commit**

```bash
git add tests/int/site-header.int.spec.ts
git commit -m "test(nav): ganti import halaman digital-marketing ke jasa-iklan-ads"
```

---

## Task 20: Tambah Integration Test Halaman Baru

**Files:**
- Create: `tests/int/jasa-iklan-ads.int.spec.ts`

**Interfaces:**
- Consumes: default export `JasaIklanAdsPage` dari `@/app/(frontend)/jasa-iklan-ads/page`.
- Produces: 7 assertion yang mengunci kontrak konten (H1, harga, FAQ, CTA, larangan klaim).

- [ ] **Step 1: Tulis file test**

Buat file `tests/int/jasa-iklan-ads.int.spec.ts` dengan isi PERSIS:

```ts
import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import React from 'react'
import JasaIklanAdsPage from '@/app/(frontend)/jasa-iklan-ads/page'

describe('Halaman /jasa-iklan-ads', () => {
  beforeEach(() => cleanup())

  it('menampilkan H1 yang menyebut percakapan, bukan hanya klik', () => {
    render(React.createElement(JasaIklanAdsPage))
    const h1 = screen.getByRole('heading', { level: 1 })
    expect(h1.textContent).toMatch(/Percakapan/i)
  })

  it('menampilkan ketiga tier harga dari pricingData.ads', () => {
    render(React.createElement(JasaIklanAdsPage))
    expect(screen.getAllByText('Growth Campaign').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Scale & Performance').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Full Digital Takeover').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Rp 3.5jt').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Rp 7.5jt').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Rp 15jt+').length).toBeGreaterThan(0)
  })

  it('menjelaskan bahwa anggaran iklan dibayar terpisah', () => {
    render(React.createElement(JasaIklanAdsPage))
    expect(screen.getByText(/anggaran iklan dibayarkan terpisah/i)).toBeTruthy()
  })

  it('menampilkan enam pertanyaan FAQ', () => {
    const { container } = render(React.createElement(JasaIklanAdsPage))
    const details = container.querySelectorAll('details')
    expect(details.length).toBe(6)
  })

  it('setiap tautan WhatsApp memakai nomor resmi dan target _blank', () => {
    const { container } = render(React.createElement(JasaIklanAdsPage))
    const waLinks = Array.from(
      container.querySelectorAll('a[href^="https://wa.me/"]')
    ) as HTMLAnchorElement[]
    expect(waLinks.length).toBeGreaterThanOrEqual(4)
    for (const link of waLinks) {
      expect(link.getAttribute('href')).toContain('6285128038243')
      expect(link.getAttribute('target')).toBe('_blank')
      expect(link.getAttribute('rel')).toBe('noopener noreferrer')
    }
  })

  it('tidak menampilkan klaim angka hasil kampanye yang tidak terverifikasi', () => {
    const { container } = render(React.createElement(JasaIklanAdsPage))
    const text = container.textContent ?? ''
    expect(text).not.toMatch(/ROAS/i)
    expect(text).not.toMatch(/98%/)
    expect(text).not.toMatch(/50\+ Proyek/i)
    expect(text).not.toMatch(/rating 4\.9/i)
  })

  it('tidak merender section testimoni', () => {
    const { container } = render(React.createElement(JasaIklanAdsPage))
    expect(container.querySelector('#suara-pengguna')).toBeNull()
  })
})
```

- [ ] **Step 2: Jalankan test baru**

Run: `pnpm exec vitest run tests/int/jasa-iklan-ads.int.spec.ts --config ./vitest.config.mts`
Expected: PASS, 7 test lulus.

Jika gagal pada assertion harga, periksa Task 6: pastikan memakai `pricingData.ads` dan bukan array hardcode.

- [ ] **Step 3: Commit**

```bash
git add tests/int/jasa-iklan-ads.int.spec.ts
git commit -m "test(ads): tambah integration test halaman jasa-iklan-ads"
```

---

## Task 21: Tambah Playwright E2E — Redirect & Halaman Baru

**Files:**
- Create: `tests/e2e/jasa-iklan-ads.e2e.spec.ts`

**Interfaces:**
- Consumes: dev server di `http://localhost:3000` (dikelola `playwright.config.ts`).
- Produces: verifikasi redirect 308 dan render halaman baru di dua viewport.

- [ ] **Step 1: Tulis file e2e**

Buat `tests/e2e/jasa-iklan-ads.e2e.spec.ts` dengan isi PERSIS:

```ts
import { test, expect } from '@playwright/test'

const BASE = 'http://localhost:3000'

test.describe('Halaman /jasa-iklan-ads', () => {
  test('tampil di desktop 1280x800 tanpa overflow horizontal', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
    const response = await page.goto(`${BASE}/jasa-iklan-ads`)
    expect(response?.status()).toBe(200)

    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    await expect(page.getByText(/Rp 3\.5jt/).first()).toBeVisible()

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth
    )
    expect(overflow).toBe(true)
  })

  test('tampil di mobile 390x844 tanpa overflow horizontal', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto(`${BASE}/jasa-iklan-ads`)

    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth
    )
    expect(overflow).toBe(true)
  })

  test('tombol WhatsApp mengarah ke nomor resmi', async ({ page }) => {
    await page.goto(`${BASE}/jasa-iklan-ads`)
    const waLinks = page.locator('a[href^="https://wa.me/"]')
    expect(await waLinks.count()).toBeGreaterThanOrEqual(4)

    const firstHref = await waLinks.first().getAttribute('href')
    expect(firstHref).toContain('6285128038243')
  })

  test('URL lama /company-profile dialihkan permanen', async ({ page }) => {
    const response = await page.goto(`${BASE}/company-profile`, { waitUntil: 'commit' })
    expect([301, 308]).toContain(response?.status())
    await page.waitForURL('**/jasa-pembuatan-website')
  })

  test('URL lama /landing-page dialihkan permanen', async ({ page }) => {
    const response = await page.goto(`${BASE}/landing-page`, { waitUntil: 'commit' })
    expect([301, 308]).toContain(response?.status())
    await page.waitForURL('**/jasa-pembuatan-website')
  })

  test('URL lama /jasa-iklan-meta-ads dialihkan ke halaman baru', async ({ page }) => {
    const response = await page.goto(`${BASE}/jasa-iklan-meta-ads`, { waitUntil: 'commit' })
    expect([301, 308]).toContain(response?.status())
    await page.waitForURL('**/jasa-iklan-ads')
  })

  test('URL /digital-marketing menghasilkan 404', async ({ page }) => {
    const response = await page.goto(`${BASE}/digital-marketing`, { waitUntil: 'commit' })
    expect(response?.status()).toBe(404)
  })
})
```

- [ ] **Step 2: Jalankan e2e**

Run: `pnpm test:e2e -- tests/e2e/jasa-iklan-ads.e2e.spec.ts`
Expected: 7 test PASS.

Jika test redirect gagal dengan status 200, cek Task 10 & 11: entri `next.config.ts` harus ada DAN file stub `permanentRedirect` harus ada. Dev server perlu dijalankan ulang setelah `next.config.ts` berubah.

- [ ] **Step 3: Commit**

```bash
git add tests/e2e/jasa-iklan-ads.e2e.spec.ts
git commit -m "test(e2e): verifikasi redirect dan render halaman jasa-iklan-ads"
```

---

## Task 22: Selaraskan Label Opsi di Formulir Konsultasi

**Files:**
- Modify: `src/components/home/ConsultationSection.tsx:9-15`

**Interfaces:**
- Consumes: tidak ada.
- Produces: label opsi `other` menyebut Google Ads & Meta Ads.

**CATATAN:** Ini label copy saja, bukan route. Tidak wajib untuk build lulus, tapi menjaga konsistensi bahasa setelah `/digital-marketing` dihapus.

- [ ] **Step 1: Ganti label opsi terakhir**

Cari:

```tsx
  { value: 'other', label: 'Layanan Lain (Aplikasi Mobile / Meta Ads)', name: 'Layanan Digital Lainnya' },
```

Ganti dengan:

```tsx
  { value: 'other', label: 'Layanan Lain (Aplikasi Mobile / Google Ads / Meta Ads)', name: 'Layanan Digital Lainnya' },
```

- [ ] **Step 2: Verifikasi test konsultasi masih lulus**

Run: `pnpm exec vitest run tests/int/consultation-section.int.spec.ts --config ./vitest.config.mts`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/components/home/ConsultationSection.tsx
git commit -m "chore(copy): selaraskan label opsi layanan pada formulir konsultasi"
```

---

## TASK FINAL — Gate Verifikasi

Semua langkah di bawah WAJIB lulus sebelum merge. Ini syarat dari `AGENTS.md`, bukan opsional.

- [ ] **Gate 1: Build produksi**

Run: `pnpm build`
Expected: exit code 0. Route list memuat `/jasa-iklan-ads`, tidak memuat `/digital-marketing`.

- [ ] **Gate 2: Seluruh integration test**

Run: `pnpm test:int`
Expected: 100% pass, 0 skipped, 0 failed. Perhatikan khususnya `site-header.int.spec.ts` dan `services-hub.int.spec.ts`.

- [ ] **Gate 3: Seluruh e2e test**

Run: `pnpm test:e2e`
Expected: 100% pass.

- [ ] **Gate 4: Server produksi lokal**

Run: `pnpm build && pnpm start`
Expected: server melayani `http://localhost:3000/jasa-iklan-ads` dengan status 200.

- [ ] **Gate 5: Lighthouse Desktop (1280x800)**

Audit `http://localhost:3000/jasa-iklan-ads` mode Desktop.
Expected: Performance > 90, Accessibility > 90, Best Practices > 90, SEO > 90.

- [ ] **Gate 6: Lighthouse Mobile (390x844 emulation)**

Expected: 4 kategori > 90.

Jika salah satu < 90: perbaiki, `pnpm build` ulang, audit ulang. Jangan skip.

- [ ] **Gate 7: Verifikasi browser desktop 1280x800**

Buka `/jasa-iklan-ads`. Periksa:
- [ ] Hero menampilkan eyebrow `Jasa Iklan Google Ads & Meta Ads Terukur`
- [ ] H1 menyebut "Percakapan"
- [ ] 4 kartu masalah tampil
- [ ] 2 kartu platform (Google Ads & Meta Ads) tampil berdampingan
- [ ] Pill industri 10 kategori tampil
- [ ] 3 kartu harga dengan tier benar
- [ ] Section garansi punya tombol "Minta Audit Gratis"
- [ ] FAQ 6 pertanyaan bisa dibuka
- [ ] Navbar menampilkan 3 item layanan (website, mobile, ads)

- [ ] **Gate 8: Verifikasi browser mobile 390x844**

Periksa:
- [ ] Tidak ada horizontal scroll
- [ ] Hamburger membuka drawer, ketiga layanan tampil
- [ ] Floating WhatsApp button terlihat
- [ ] Kartu pricing bertumpuk vertikal dan terbaca

- [ ] **Gate 9: Sapu referensi route lama**

Run:

```bash
grep -rnE "/company-profile|/landing-page|/jasa-iklan-meta-ads|/digital-marketing" \
  src/ tests/ next.config.ts 2>/dev/null | grep -v "permanentRedirect" | grep -v "destination:" || echo "clean"
```

Expected: `clean`. Kemunculan tersisa hanya boleh di file stub (`permanentRedirect('/...')`), `next.config.ts` (`destination`), dan `docs/` (riwayat, di luar scope).

- [ ] **Gate 10: Audit konten database produksi (manual, setelah deploy)**

Jalankan di database produksi untuk menemukan sisa tautan lama di dalam artikel yang dibuat lewat dashboard:

```sql
SELECT slug FROM articles
WHERE content ILIKE '%/jasa-iklan-meta-ads%'
   OR content ILIKE '%/company-profile%'
   OR content ILIKE '%/landing-page%'
   OR content ILIKE '%/digital-marketing%';
```

Jika ada hasil, perbaiki isi artikel lewat dashboard. Redirect `next.config.ts` melindungi tautan yang terlewat, kecuali `/digital-marketing` yang sudah 404.

---

## Catatan Eksekusi Untuk AI Developer

1. **Jangan rewrite file kecuali Task 11, 12, dan 13.** Task lain memakai edit surgical dengan `oldString` unik minimal 3-5 baris konteks.
2. **Baca file target dengan `read` sebelum `edit`.** Jangan mengandalkan nomor baris di plan, karena bisa bergeser setelah task sebelumnya.
3. **Task 13 dan 14 adalah pasangan.** Menghapus `/digital-marketing` tanpa menyelesaikan Task 14 akan meninggalkan link 404 di homepage. Jika eksekusi terhenti di antara keduanya, selesaikan Task 14 lebih dulu daripada melanjutkan ke Task 15.
4. **Setelah mengubah `next.config.ts`, dev server harus direstart.** Perubahan redirect tidak diterapkan pada server yang sedang berjalan.
5. **Jangan menambah angka klaim baru.** Jika terasa perlu menambah kalimat meyakinkan, pilih yang berbasis proses (apa yang dikerjakan), bukan hasil (berapa kenaikan omzet).
6. **Jangan mengubah `src/components/home/home-data.ts`.** Halaman baru hanya membaca `pricingData.ads`; homepage punya tab pricing sendiri yang bergantung pada file itu.
7. **`src/lib/whatsapp.ts` tidak diubah.** Semua pesan WhatsApp memakai `getWhatsAppDirectUrl()` dengan pesan eksplisit di call site.
8. **Jika build gagal pada tipe `PricingFeature`** (fitur bisa `string | PricingFeatureItem`), gunakan pola `typeof feat === 'string' ? feat : feat.text` seperti di Task 6.
9. **Jangan commit sebelum Gate 1 dan 2 lulus.** Gate 4-8 boleh menyusul setelah commit lokal, tapi harus lulus sebelum deploy.

---

## Ringkasan Dampak

| Area | Sebelum | Sesudah |
|---|---|---|
| Halaman layanan | 5 halaman terpisah dengan pesan tumpang tindih | 3 halaman: website, mobile app, iklan ads |
| URL iklan | `/jasa-iklan-meta-ads` (Meta saja) | `/jasa-iklan-ads` (Google + Meta) |
| URL dihapus | `/company-profile`, `/landing-page` | Dialihkan permanen ke `/jasa-pembuatan-website` |
| URL hilang | `/digital-marketing` | 404 (keputusan pemilik produk) |
| Menu layanan | 5 item | 3 item |
| Test coverage halaman iklan | Tidak ada | 7 int test + 7 e2e test |
