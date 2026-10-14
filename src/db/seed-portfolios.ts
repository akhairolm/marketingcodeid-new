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
    title: 'Si Ketuk Pintu — Sistem Kunjungan Tamu & Buku Tamu Digital',
    slug: 'si-ketuk-pintu-sistem-kunjungan-tamu',
    status: 'published',
    isFeatured: true,
    completedDate: new Date('2025-11-15'),
    clientName: 'Instansi Pemerintah (Kantor Dinas/OPD)',
    category: 'web',
    summary:
      'Aplikasi buku tamu digital dengan pengajuan kunjungan multi-langkah, token kunjungan berbasis QR Code, dan portal admin untuk verifikasi, penjadwalan ulang, hingga arsip permohonan.',
    duration: '6 minggu',
    role: 'Full-stack Development (Next.js, QR Scanner, PDF Ticketing)',
    challenge:
      'Proses kunjungan tamu ke kantor instansi masih manual: buku tamu fisik, tamu harus datang tanpa kepastian jadwal, petugas kesulitan memverifikasi dan melacak riwayat kunjungan, serta rekap data pengunjung untuk pelaporan memakan waktu lama dan rawan hilang.',
    solution:
      'Si Ketuk Pintu memindahkan seluruh alur ke digital: tamu mengajukan kunjungan lewat formulir 4 langkah (data instansi, detail kunjungan, daftar tamu, dokumen), menerima token + QR Code tiket, memantau status permohonan real-time. Petugas memverifikasi via portal admin, melakukan reschedule bila perlu, dan memindai QR tamu saat kedatangan. Semua permohonan terarsip otomatis dan siap diekspor laporan (jsPDF).',
    results: [
      { value: '4 Langkah', label: 'Formulir pengajuan terstruktur' },
      { value: 'QR Code', label: 'Tiket kunjungan + scanner petugas' },
      { value: 'Real-time', label: 'Status: menunggu / disetujui / ditolak' },
      { value: 'PDF Export', label: 'Rekap & arsip laporan otomatis' },
    ],
    techStack: ['React 19', 'TypeScript', 'Tailwind CSS', 'html5-qrcode', 'jsPDF', 'Zod'],
    content: null,
  },
  {
    title: 'Si Akoor — Aplikasi Presensi & Kinerja Pegawai Berbasis Web',
    slug: 'si-akoor-presensi-kinerja-pegawai',
    status: 'published',
    isFeatured: true,
    completedDate: new Date('2025-12-20'),
    clientName: 'Instansi Pemerintah (Manajemen SDM)',
    category: 'web',
    summary:
      'Portal presensi pegawai multi-device (desktop/tablet/smartphone) dengan dashboard admin terpusat untuk memantau kehadiran dan kinerja pegawai secara real-time.',
    duration: '5 minggu',
    role: 'Full-stack Development (Drizzle ORM, PostgreSQL, Logging)',
    challenge:
      'Rekap presensi pegawai dilakukan manual dan tersebar di berbagai perangkat, sehingga pimpinan sulit memantau kedisiplinan secara akurat, data rawan dimanipulasi, dan penyusunan laporan kinerja bulanan memakan waktu berhari-hari.',
    solution:
      'Si Akoor menyediakan portal presensi responsif yang bisa diakses dari desktop, tablet, dan smartphone dengan login terpusat. Seluruh rekam jejak kehadiran tersimpan di database PostgreSQL (Drizzle ORM) dengan logging terstruktur (Winston + SSH2 untuk operasional server), sehingga rekapitulasi kinerja otomatis, transparan, dan audit-friendly melalui dashboard admin.',
    results: [
      { value: 'Multi-Device', label: 'Desktop, tablet & smartphone responsif' },
      { value: 'Terpusat', label: 'Dashboard admin real-time' },
      { value: 'Audit Trail', label: 'Logging terstruktur anti-manipulasi' },
      { value: 'Otomatis', label: 'Rekap kinerja tanpa input manual' },
    ],
    techStack: ['React 19', 'React Router 7', 'Drizzle ORM', 'PostgreSQL', 'Zod', 'Winston'],
    content: null,
  },
  {
    title: 'Si Wadai — Platform Aspirasi & Aduan Masyarakat DPRD',
    slug: 'si-wadai-aspirasi-aduan-masyarakat',
    status: 'published',
    isFeatured: true,
    completedDate: new Date('2026-01-25'),
    clientName: 'DPRD Kabupaten (Layanan Publik Digital)',
    category: 'web',
    summary:
      'Platform layanan publik untuk menampung aspirasi dapil DPRD, aduan masyarakat berbasis peta (geolocation), dan survei IKM — lengkap dengan tiket pelacakan status dan dashboard admin rekapitulasi.',
    duration: '7 minggu',
    role: 'Full-stack Development (Geolocation, Survey IKM, Ticketing)',
    challenge:
      'Aspirasi dan aduan warga diterima lewat grup WhatsApp dan lisan sehingga mudah terlupa, tidak bisa diprioritaskan, sulit diverifikasi keberadaan lokusnya, dan masyarakat tidak bisa memantau perkapan aduannya. Rekapitulasi untuk rapat evaluasi pun manual.',
    solution:
      'Si Wadai menghadirkan formulir aspirasi dapil 2 langkah dengan verifikasi e-KTP, aduan masyarakat dengan unggah bukti (e-KTP & foto aduan) plus penanda peta GPS, serta survei Indeks Kepuasan Masyarakat. Setiap laporan mendapat tiket yang bisa dilacak statusnya, dan dashboard admin menyediakan tab Overview, Aduan, Aspirasi, dan IKM dengan audit status tiket — semua data terekap otomatis.',
    results: [
      { value: 'GPS + e-KTP', label: 'Verifikasi lokus & identitas pelapor' },
      { value: 'Tiket Digital', label: 'Lacak status aduan/aspirasi real-time' },
      { value: 'Survei IKM', label: 'Pengukuran kepuasan terintegrasi' },
      { value: '4 Tab Admin', label: 'Overview, aduan, aspirasi & IKM' },
    ],
    techStack: ['React 19', 'React Router 7', 'Drizzle ORM', 'PostgreSQL', 'Geolocation API', 'Zod'],
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
