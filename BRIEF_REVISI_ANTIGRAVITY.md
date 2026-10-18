# Brief Revisi MarketingCode.ID untuk Antigravity

## Instruksi utama

Audit ulang temuan di bawah terhadap kondisi repository terkini, lalu kerjakan revisi yang terverifikasi. Jangan berhenti pada rencana. Pertahankan identitas visual existing dan gunakan perubahan sekecil mungkin yang menyelesaikan masalah.

Baca `AGENTS.md` dan instruksi repository sebelum bekerja. Jangan commit atau push tanpa permintaan pengguna. Jangan membaca, menyalin, atau menampilkan isi file rahasia seperti `.env` dalam laporan.

## Konteks bisnis

- Prioritas enam bulan: website UMKM dan company profile untuk bisnis kecil-menengah di Kalimantan Selatan.
- Wilayah utama: Kandangan, Banua Enam, Banjarbaru, dan Banjarmasin.
- Brand tetap agency multi-layanan. Aplikasi mobile, pengelolaan iklan, dan sistem custom tetap tersedia sebagai layanan pendukung.
- Tujuan utama website: menghasilkan konsultasi WhatsApp berkualitas.
- Nomor WhatsApp resmi: `6285128038243`.
- Pertahankan karakter desain, warna, font, komponen, dan struktur route existing. Tidak perlu redesign total.
- Percakapan referensi: https://chatgpt.com/share/6ad35da8-e6cc-83ec-a4f3-bd2a77072d28

## Batas perubahan

- Verifikasi pemakaian komponen sebelum mengubahnya; file yang ada belum tentu dipakai route aktif.
- Jangan menghapus route, direktori, konten pengguna, atau file produksi secara massal.
- Jangan membuat testimoni, proyek klien, logo klien, statistik, hasil bisnis, atau legalitas rekaan.
- Jangan menambah dependency jika native platform atau dependency existing sudah mencukupi.
- Jangan mengubah autentikasi, database, atau dashboard di luar kebutuhan revisi yang terbukti.
- Jangan menyatakan seluruh pekerjaan selesai bila ada pemeriksaan wajib yang gagal atau belum dijalankan.
- Nomor baris berikut berasal dari audit sebelumnya; cari ulang lokasi aktual.

## P0 — Perbaiki sebelum dipakai untuk traffic berbayar

### 1. Showreel kosong dan aksesibilitas modal

**File:** `src/components/home/HeroSection.tsx`, sekitar baris 113–163.

**Temuan:** tombol putar dan label durasi `1:45` membuka modal teks, bukan video.

**Tindakan:**

- Periksa apakah ada video showreel asli dalam aset project.
- Bila tersedia, hubungkan video sebenarnya dan pastikan kontrol pemutaran dapat digunakan.
- Bila tidak tersedia, ganti interaksi tersebut dengan visual proyek nyata dan CTA studi kasus. Hapus tombol putar, label showreel, dan durasi yang tidak memiliki sumber nyata.
- Jangan mengganti placeholder dengan video atau foto stok yang diklaim sebagai tim/proyek sendiri.
- Jika modal tetap diperlukan, gunakan dialog existing yang aksesibel: nama dialog, fokus awal, focus trap, Escape, pengembalian fokus, dan scroll lock.

**Kriteria selesai:** tidak ada tombol yang menjanjikan video tetapi hanya membuka deskripsi. Semua interaksi dapat digunakan dengan keyboard.

### 2. Form konsultasi WhatsApp memberi status sukses palsu

**File:** `src/components/home/ConsultationSection.tsx`, sekitar baris 29–47 dan 182–183.

**Temuan:** toast “Permintaan Terkirim!” muncul sebelum pengiriman; WhatsApp dibuka melalui timer; isian langsung dihapus. Form tidak mengirim ke backend.

**Tindakan:**

- Hilangkan timer sebelum navigasi WhatsApp. Navigasi harus berasal langsung dari aksi submit pengguna.
- Gunakan alur navigasi/link native yang sederhana dan andal. Jika membuka tab baru, cegah akses opener dan tangani kegagalan pembukaan tanpa kehilangan isian.
- Pertahankan isian form; jangan menghapusnya hanya karena WhatsApp dibuka.
- Ganti pesan sukses menjadi instruksi jujur, misalnya: “Lanjutkan pengiriman pesan di WhatsApp.” Jangan mengklaim pesan sudah dikirim atau diterima.
- Validasi nama setelah trim dan nomor telepon dengan aturan masuk akal. Jangan menerima input yang hanya berisi spasi. Sediakan pesan error yang dapat diakses.
- Pertahankan pesan WhatsApp yang memuat layanan, nama usaha, dan kebutuhan pengguna.
- Pertahankan jalur chat langsung tanpa form.
- Jangan menambahkan backend penyimpanan lead hanya untuk memperbaiki alur ini.

**Kriteria selesai:** satu submit membuka tujuan WhatsApp benar; tidak ada status terkirim palsu; isian tidak hilang; input tidak valid tertolak.

### 3. Rincian paket dan biaya berulang

**File utama:**

- `src/components/home/home-data.ts`
- `src/components/home/PricingSection.tsx`
- `src/app/(frontend)/page.tsx`
- `src/app/(frontend)/website-umkm/page.tsx`
- `src/app/(frontend)/company-profile/page.tsx`
- `src/app/(frontend)/landing-page/page.tsx`

**Tindakan:**

- Cocokkan harga, durasi, domain, hosting, dashboard, dan garansi di seluruh halaman terkait.
- Perbaiki perbedaan domain: paket UMKM menyebut `.com`, tetapi FAQ homepage menyebut `.com` atau `.id` untuk kedua paket.
- Jelaskan bahwa kepemilikan website bukan berarti domain/hosting gratis selamanya.
- Perjelas cakupan paket: halaman/produk awal, putaran revisi, masa garansi, dukungan, input materi, copywriting, foto, integrasi, serta biaya perpanjangan.
- Gunakan angka dan ketentuan yang sudah disetujui dalam sumber project. Jangan mengarang kebijakan komersial.
- Bila ketentuan belum tersedia, gunakan copy jujur “ditetapkan dalam penawaran/SPK sebelum pengerjaan” dan catat keputusan bisnis yang masih perlu dikonfirmasi.
- Ganti “garansi performa” yang kabur dengan cakupan teknis yang benar-benar ditawarkan.

**Kriteria selesai:** tidak ada pertentangan antarhalaman atau kesan bahwa seluruh biaya operasional sudah termasuk selamanya.

### 4. Klaim berlebihan atau belum terverifikasi

| Lokasi awal | Klaim | Tindakan |
| --- | --- | --- |
| `src/app/(frontend)/website-umkm/page.tsx:124` | “Kebanjiran Order WhatsApp” | Ganti dengan manfaat yang dapat dipenuhi, misalnya kemudahan memilih produk dan memesan lewat WhatsApp. |
| `src/components/home/TrustSection.tsx:12` | “Lebih dari 80% calon pembeli…” | Hapus persentase jika tidak ada sumber relevan yang bisa diverifikasi. |
| `src/components/home/home-data.ts:128` | “Stress Testing 50k CCU” | Jangan jadikan jaminan paket umum; kaitkan pengujian beban dengan spesifikasi dan anggaran proyek. |
| `src/components/home/home-data.ts:178` | “Optimasi SEO Organik Halaman 1 Google” | Jelaskan pekerjaan SEO tanpa menjanjikan peringkat. |
| `src/components/home/ServicesHub.tsx:126` | “Legalitas resmi, SPK & faktur pajak” | Periksa bukti/status usaha. Jangan menjanjikan faktur pajak tanpa dasar. |

Periksa juga klaim kepatuhan SPBE, keamanan, dukungan, ROI/ROAS, dan hasil bisnis pada halaman yang disentuh. Jangan menganggap klaim salah tanpa pemeriksaan; pertahankan bila bukti memadai. Jika tidak ada bukti, gunakan deskripsi ruang lingkup yang netral dan catat kebutuhan konfirmasi.

## P1 — Pertajam fokus dan bukti penjualan

### 5. Homepage fokus website

**File:** `src/components/home/PricingSection.tsx`, `src/components/home/home-client.tsx`, komponen pendukung yang benar-benar dipakai.

- Jadikan tiga paket website sebagai penawaran harga utama homepage.
- Ringkas aplikasi mobile, iklan, dan sistem custom menjadi bagian pendukung dengan tautan halaman layanan existing.
- Pertahankan akses ke layanan tersebut; jangan menghapus route atau informasi bisnis yang masih digunakan.
- Kurangi pengulangan pilihan audiens, layanan, dan CTA yang menyampaikan pesan sama.
- Pertahankan CTA utama konsisten dan kontekstual: konsultasi website melalui WhatsApp.
- Jangan membuat halaman harga baru hanya karena belum ada route `/harga`; anchor existing dapat tetap dipakai bila mencukupi.

### 6. Portofolio unggulan harus dikurasi

**File:** `src/app/(frontend)/page.tsx`, `src/lib/content/queries.ts`, `src/components/home/PortfolioSection.tsx`.

**Temuan:** homepage mengambil empat proyek terbaru, sedangkan judul menyebut proyek “terpilih”. Data sudah memiliki `isFeatured`.

- Gunakan penanda unggulan existing untuk kurasi homepage bila sesuai struktur data.
- Prioritaskan bukti relevan bagi calon pembeli website UMKM/company profile.
- Jangan memprioritaskan berdasarkan tebak-tebakan judul atau mengubah konten database diam-diam.
- Bila belum ada proyek unggulan, tentukan fallback yang jelas dan tidak menghasilkan section kosong tanpa penjelasan.
- Pertahankan perilaku listing dan detail portofolio lain.
- Tampilkan masalah, solusi, dan hasil yang benar-benar tersedia. Jangan memaksakan statistik hasil jika tidak ada datanya.
- Demo harus dilabeli sebagai demo, bukan proyek klien.

### 7. Pengukuran CTA WhatsApp

**File awal:** `src/app/(frontend)/layout.tsx`, `src/lib/whatsapp.ts`, komponen CTA aktif.

**Temuan:** bootstrap GA sudah ada bila `NEXT_PUBLIC_GA_ID` diatur; event khusus CTA belum ditemukan dalam kode yang diaudit.

- Periksa mekanisme tracking existing sebelum menambah kode agar tidak terjadi duplikasi event.
- Tambahkan event klik WhatsApp konsisten dengan parameter non-pribadi: posisi CTA, layanan, paket jika ada, dan path halaman.
- Jangan mengirim nama, telepon, isi kebutuhan, atau URL WhatsApp berisi pesan pengguna sebagai parameter event custom.
- Tracking tidak boleh memblokir navigasi atau menyebabkan error saat GA tidak aktif/belum termuat.
- Jangan mengklaim klik sebagai pesan terkirim atau lead berkualitas.
- Dokumentasikan nama event dan cara memeriksanya. Aktivasi konversi di akun GA/Ads dilaporkan terpisah jika akses akun tidak tersedia.

### 8. FAQ dan kontrol interaktif

**File awal:** `src/components/home/FaqSection.tsx`.

- Gunakan accordion existing atau native `<details>/<summary>` sesuai pola project.
- Bila tetap custom, lengkapi `aria-expanded`, `aria-controls`, ID panel stabil, dan struktur heading yang valid.
- Periksa state aktif filter/tab yang disentuh agar terbaca assistive technology.
- Pastikan fokus keyboard terlihat dan kontrol bisa dioperasikan tanpa mouse.

## Pengujian dan acceptance gate

Ikuti protokol repository. Hasil audit sebelumnya: `pnpm test:int` lulus 47 test dalam 8 file; ini baseline historis, bukan bukti untuk hasil revisi.

1. Jalankan `pnpm build`; wajib exit code 0.
2. Jalankan `pnpm test:int`; seluruh test wajib lulus.
3. Tambahkan pemeriksaan regresi yang bermakna untuk perubahan non-trivial, terutama submit konsultasi dan pemilihan portofolio unggulan. Gunakan fasilitas test existing.
4. Jalankan `pnpm start` atau server produksi lokal; pastikan halaman merespons.
5. Jalankan Lighthouse Desktop dan Mobile pada homepage serta halaman layanan prioritas yang berubah. Performance, Accessibility, Best Practices, dan SEO masing-masing wajib **> 90** menurut `AGENTS.md`. Simpan skor dan lokasi laporan. Jika belum terpenuhi, perbaiki dan uji ulang.
6. Lakukan browsing interaktif, memakai browser subagent bila tersedia, pada Desktop `1280x800` dan Mobile `390x844`.
7. Periksa tambahan lebar `320`, `375`, `414`, dan `768` px untuk overflow, CTA terpotong, tab harga, dan pembungkusan teks.
8. Uji menu mobile, navigasi, sticky WhatsApp, anchor harga/portofolio/konsultasi, form valid dan invalid, dialog jika masih ada, serta FAQ dengan keyboard.
9. Pastikan CTA menuju nomor resmi `6285128038243`. Jangan mengirim pesan nyata saat pengujian.
10. Periksa console error dan horizontal scroll. Jangan menutupi masalah layout hanya dengan overflow clipping.

Jika tool browser, Lighthouse, aset asli, atau informasi bisnis tidak tersedia, laporkan blocker spesifik. Jangan membuat skor, bukti pengujian, atau kebijakan pengganti rekaan. Selesaikan bagian lain yang tidak terblokir.

## Output akhir yang diminta

- Ringkasan perubahan dan daftar file yang diubah.
- Hasil `pnpm build`, `pnpm test:int`, dan pemeriksaan regresi.
- Skor Lighthouse Desktop/Mobile per URL serta lokasi laporan.
- Hasil browsing desktop/mobile, termasuk alur WhatsApp dan keyboard.
- Daftar keputusan bisnis yang masih perlu konfirmasi: aset showreel, rincian revisi/garansi, biaya perpanjangan, legalitas, dan kurasi proyek jika belum tersedia.
- Temuan tersisa atau blocker, dengan jujur membedakan selesai, belum terverifikasi, dan menunggu informasi.
