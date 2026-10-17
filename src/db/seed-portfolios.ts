import 'dotenv/config'
import { eq } from 'drizzle-orm'
import { db } from './index'
import { portfolios } from './schema'

/**
 * Seed real portfolio case studies (Si Ketuk Pintu, Si Akoor, Si Wadai)
 * from client documentation PDFs. Pain points -> challenge, app -> solution.
 * ponytail: static seed script — run via `npx tsx src/db/seed-portfolios.ts`.
 * Re-running updates existing rows by slug (idempotent upsert).
 */

const items = [
  {
    title: 'Si Ketuk Pintu — Sistem Buku Tamu Digital & Pengendalian Akses Kantor Dinas',
    slug: 'si-ketuk-pintu-sistem-kunjungan-tamu',
    status: 'published',
    isFeatured: true,
    completedDate: new Date('2025-11-15'),
    clientName: 'Instansi Pemerintah Daerah (Kantor Dinas & OPD)',
    category: 'web',
    summary:
      'Sistem buku tamu digital dan manajemen kunjungan dinas interaktif dengan verifikasi tiket QR Code, notifikasi pejabat, dan arsip digital siap audit kepatuhan standar pelayanan KemenPAN-RB.',
    duration: '6 minggu',
    role: 'Pengembangan Sistem SPBE, Keamanan Data UU PDP, Bimtek & BAST',
    challenge:
      'Penerimaan tamu di lingkungan kantor dinas pemerintah masih menggunakan buku tulis konvensional di meja resepsionis. Petugas pos keamanan kesulitan memverifikasi kepastian janji temu, tamu sering datang tanpa identitas terverifikasi sehingga mengganggu agenda pimpinan, dan dinas tidak memiliki arsip digital terverifikasi untuk rekapitulasi laporan akuntabilitas kinerja.',
    solution:
      'Si Ketuk Pintu memindahkan seluruh alur kunjungan instansi ke ekosistem digital: pemohon mengajukan kunjungan resmi lewat alur 4 langkah terverifikasi (data instansi, maksud audiensi, daftar rombongan, dan berkas pengantar), menerima tiket digital ber-QR Code unik, dan memantau persetujuan pejabat secara real-time. Petugas pos/resepsionis memindai QR Code tamu saat kedatangan untuk check-in instan. Seluruh riwayat kunjungan tersimpan dalam arsip digital yang dapat diekspor ke format PDF/Excel resmi untuk kebutuhan BAST pengadaan dan inspeksi kepatuhan.',
    results: [
      { value: 'Standar KemenPAN', label: 'Buku tamu digital ramah kepatuhan pelayanan publik' },
      { value: 'Tiket QR Code', label: 'Verifikasi instan tamu resmi & scanner pos dinas' },
      { value: '100% Arsip Rapi', label: 'Rekapitulasi kunjungan terverifikasi tanpa buku fisik' },
      { value: 'Bimtek Tuntas', label: 'Pendampingan operator front office & berita acara BAST' },
    ],
    techStack: ['Arsitektur SPBE', 'React 19 & Next.js', 'QR Scanner Pos Pengamanan', 'Ekspor Laporan jsPDF', 'Validasi Data Zod', 'Kepatuhan UU PDP'],
    content: null,
  },
  {
    title: 'Si Akoor — Portal Presensi Geofencing & Kinerja Pegawai Terintegrasi TPP',
    slug: 'si-akoor-presensi-kinerja-pegawai',
    status: 'published',
    isFeatured: true,
    completedDate: new Date('2025-12-20'),
    clientName: 'Instansi Pemerintah Daerah (Badan Kepegawaian & SDM)',
    category: 'web',
    summary:
      'Portal presensi multi-device berbasis validasi geofencing radius kantor (anti-mock/fake GPS), kalkulasi jam kerja efektif TPP, dan audit trail siap pemeriksaan Inspektorat Daerah & BPK.',
    duration: '5 minggu',
    role: 'Rancang Bangun Sistem, Keamanan Audit Trail, Dokumentasi BAST & KAK',
    challenge:
      'Pencatatan kehadiran pegawai instansi masih mengandalkan mesin fingerprint fisik yang sering antre atau rekapitulasi manual di spreadsheet yang rentan manipulasi koordinat lokasi (fake GPS). Tim kepegawaian membutuhkan waktu berhari-hari di awal bulan hanya untuk merekap jam kerja sebagai syarat pencairan Tambahan Penghasilan Pegawai (TPP), dengan risiko tinggi temuan ketidaksesuaian saat uji petik audit berkala.',
    solution:
      'Si Akoor menghadirkan portal presensi responsif yang dapat diakses dari smartphone, tablet, atau desktop dengan login terpusat. Dilengkapi validasi radius koordinat GPS ketat dengan proteksi mock location, integrasi perhitungan jam efektif kerja untuk parameter TPP, serta audit logging terstruktur pada level database. Sistem menjamin transparansi data presensi ASN/Non-ASN, memangkas waktu rekap bulanan menjadi instan, dan dilengkapi berkas uji fungsi untuk kelancaran BAST.',
    results: [
      { value: 'Anti-Fake GPS', label: 'Validasi radius lokasi kantor akurat anti-manipulasi' },
      { value: 'Kalkulasi TPP', label: 'Rekap jam efektif & potongan kinerja otomatis' },
      { value: 'Audit-Ready', label: 'Audit logging terstruktur siap uji petik BPK/Inspektorat' },
      { value: 'BAST & Bimtek', label: 'Buku panduan operasional & pendampingan tim SDM' },
    ],
    techStack: ['React 19 Responsive Portal', 'PostgreSQL Audit Logging', 'Geofencing Anti-Spoof', 'Kalkulasi Otomatis TPP', 'Drizzle ORM', 'Winston Logger'],
    content: null,
  },
  {
    title: 'Si Wadai — Platform Aspirasi Reses & Pengaduan Masyarakat Terintegrasi SPBE',
    slug: 'si-wadai-aspirasi-aduan-masyarakat',
    status: 'published',
    isFeatured: true,
    completedDate: new Date('2026-01-25'),
    clientName: 'DPRD Kabupaten & Pemerintah Daerah (Layanan Aspirasi Publik)',
    category: 'web',
    summary:
      'Platform layanan publik SPBE untuk penyerapan aspirasi reses dapil DPRD, pengaduan warga berbasis validasi peta geolokasi GPS anti-laporan fiktif, survei IKM, dan ekspor bahan sidang paripurna.',
    duration: '7 minggu',
    role: 'Pengembangan Solusi SPBE, Integrasi Geolocation, Pelaporan Paripurna',
    challenge:
      'Aspirasi reses dapil dan aduan masyarakat selama ini tersebar di pesan WhatsApp pribadi anggota dewan dan berkas fisik yang rawan terselip. Sekretariat dewan kesulitan memverifikasi keabsahan titik lokus laporan di lapangan, tidak ada jejak audit disposisi penanganan antar komisi, serta penyusunan buku laporan rekapitulasi untuk rapat paripurna memakan waktu berminggu-minggu.',
    solution:
      'Si Wadai mentransformasi seluruh alur aspirasi publik sesuai kerangka arsitektur SPBE nasional: formulir aspirasi dapil 2 langkah dengan validasi identitas NIK e-KTP (prinsip UU PDP), unggah bukti foto dengan penanda koordinat GPS presisi untuk memastikan lokus fisik kejadian, serta modul survei Indeks Kepuasan Masyarakat (IKM) terstandar PermenPAN-RB. Sekretariat dan pimpinan dapat memantau tiket melalui 4 tab dashboard (Overview, Aduan, Aspirasi, IKM) dan mengekspor rekap eksekutif siap cetak untuk sidang paripurna.',
    results: [
      { value: 'SPBE Compliant', label: 'Tata kelola digital selaras arsitektur SPBE nasional' },
      { value: 'Validasi GPS & NIK', label: 'Verifikasi lokus akurat & eliminasi aduan fiktif' },
      { value: '1-Klik Paripurna', label: 'Ekspor laporan rekapitulasi bahan sidang paripurna' },
      { value: 'Survei IKM', label: 'Pengukuran indeks kepuasan publik terintegrasi PermenPAN' },
    ],
    techStack: ['Next.js & React 19', 'Geolocation Verification API', 'PostgreSQL Database', 'Ekspor Dokumen Paripurna', 'Zod Data Validation', 'Dashboard Eksekutif'],
    content: null,
  },
]

async function seed() {
  for (const item of items) {
    const existing = await db.select({ id: portfolios.id }).from(portfolios).where(eq(portfolios.slug, item.slug)).limit(1)
    if (existing.length > 0) {
      await db.update(portfolios).set({ ...item, updatedAt: new Date() }).where(eq(portfolios.slug, item.slug))
      console.log(`updated: ${item.slug}`)
    } else {
      await db.insert(portfolios).values(item)
      console.log(`inserted: ${item.slug}`)
    }
  }
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
