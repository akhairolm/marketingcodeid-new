# Quality Assurance, Build & Score Gate Rule

Setiap kali agent selesai mengerjakan tugas atau perubahan kode pada project ini:

1. **Build Validation:**
   - Jalankan `pnpm build` untuk memverifikasi bahwa seluruh static page dan dynamic routes ter-render tanpa error.
2. **Integration Tests:**
   - Jalankan `pnpm test:int` dan pastikan seluruh test suite lolos (47/47 tests passing).
3. **Lighthouse Audit Gate (Desktop & Mobile):**
   - Jalankan `pnpm start` dan lakukan audit Google Lighthouse untuk profil Desktop dan Mobile.
   - Skor minimum yang wajib dicapai:
     - Performance: > 90
     - Accessibility: > 90
     - Best Practices: > 90
     - SEO: > 90
   - Jika ada nilai di bawah 90, diagnosa dan perbaiki akar masalahnya sebelum tugas dianggap selesai.
4. **Agentic Browsing & UX Verification:**
   - Lakukan browser testing untuk memastikan:
     - Nomor WhatsApp resmi `6285128038243` dan format pesan kontekstual berfungsi pada semua tombol CTA.
     - Sticky floating WhatsApp button tampil konsisten dan responsif.
     - Tampilan mobile (390px) responsif tanpa kebocoran scroll horizontal.
     - Navigasi hamburger menu mobile berfungsi dengan baik.
5. **No-Emoji Compliance:**
   - Pastikan tidak ada karakter emoji Unicode di seluruh teks UI, kode, maupun metadata. Gunakan icon SVG jika membutuhkan elemen visual.

