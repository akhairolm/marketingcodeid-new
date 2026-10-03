import { lx, readingMinutes } from './lexical'
import type { ArticleItem, PortfolioItem } from './types'

/**
 * Sample content shown while the CMS is unreachable or still empty.
 * Once Portfolios / Articles are published in Payload (/admin), the pages
 * switch to CMS data automatically — nothing here needs to be deleted.
 */

const img = (id: string, alt: string, w = 1600) => ({
  url: `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`,
  alt,
  width: w,
  height: Math.round((w * 9) / 16),
})

/* ------------------------------------------------------------------ */
/* Portfolios                                                          */
/* ------------------------------------------------------------------ */

export const samplePortfolios: PortfolioItem[] = [
  {
    slug: 'warehouse-stock-inventory-erp',
    title: 'Warehouse & Stock Inventory ERP',
    clientName: 'Distribusi Logistik B2B',
    category: 'web',
    categoryLabel: 'Custom Web Application',
    summary:
      'Sistem pencatatan inventaris multi-gudang real-time dengan batch FIFO/LIFO, audit trail mutasi, dan dashboard visual low-stock alert.',
    thumbnail: img('photo-1586528116311-ad8dd3c8310d', 'Rak gudang distribusi dengan stok barang tersusun'),
    duration: '10 minggu',
    role: 'Analisis proses, Desain UI, Full-stack development',
    completedDate: '2026-06-01',
    challenge:
      'Stok tersebar di beberapa gudang dan dicatat lewat spreadsheet terpisah. Tim admin menghabiskan waktu berjam-jam setiap minggu untuk rekap manual, dan selisih stok baru ketahuan saat barang sudah dipesan pelanggan.',
    solution:
      'Kami membangun aplikasi web internal dengan satu sumber data untuk semua gudang. Setiap mutasi barang tercatat lengkap dengan pelaku dan waktunya, batch keluar mengikuti aturan FIFO/LIFO per SKU, dan dashboard menyorot item yang mendekati batas minimum agar tim pembelian bisa bertindak lebih awal.',
    results: [
      { value: '0 jam', label: 'Rekap stok manual per minggu' },
      { value: '100%', label: 'Mutasi tercatat dengan audit trail' },
    ],
    techStack: ['Next.js 16', 'Payload CMS 3', 'Supabase PostgreSQL', 'Tailwind CSS'],
    content: lx.doc(
      lx.h3('Alur kerja yang dipetakan ulang'),
      lx.p(
        'Sebelum menulis kode, kami duduk bersama kepala gudang dan tim admin untuk memetakan alur barang masuk, transfer antar gudang, hingga barang keluar. Hasilnya menjadi dasar struktur data dan hak akses setiap peran.',
      ),
      lx.ul(
        ['Role terpisah untuk admin gudang, supervisor, dan manajemen'],
        ['Scan barcode via kamera ponsel untuk penerimaan barang'],
        ['Ekspor laporan mutasi ke Excel untuk kebutuhan akuntansi'],
      ),
    ),
    gallery: [
      { image: img('photo-1551288049-bebda4e38f71', 'Dashboard analitik stok dan grafik pergerakan barang', 1200), caption: 'Dashboard ringkasan stok lintas gudang' },
      { image: img('photo-1553413077-190dd305871c', 'Petugas gudang memeriksa barang di rak', 1200), caption: 'Penerimaan barang dengan scan barcode' },
    ],
    isFeatured: true,
  },
  {
    slug: 'brand-showcase-e-catalog',
    title: 'High-Converting Brand Showcase & E-Catalog',
    clientName: 'Consumer Brand & Retail',
    category: 'web',
    categoryLabel: 'Company Profile & E-Catalog',
    summary:
      'Website katalog interaktif ultra-cepat dengan waktu muat 0.8 detik. Dilengkapi integrasi pesan WhatsApp otomatis sesuai produk yang dilihat.',
    thumbnail: img('photo-1460925895917-afdab827c52f', 'Laptop menampilkan grafik performa website'),
    duration: '4 minggu',
    role: 'Desain UI/UX, Frontend, Integrasi WhatsApp',
    completedDate: '2026-04-01',
    challenge:
      'Website lama lambat dibuka di ponsel dan tidak punya jalur yang jelas dari melihat produk ke bertanya harga. Banyak pengunjung datang dari iklan, lalu pergi sebelum menghubungi tim sales.',
    solution:
      'Katalog dibangun ulang dengan Next.js App Router dan gambar teroptimasi di edge. Setiap halaman produk punya tombol WhatsApp yang otomatis menyertakan nama dan varian produk, sehingga tim sales langsung tahu konteks percakapan.',
    results: [
      { value: '99', label: 'Skor Lighthouse Performance' },
      { value: '3.4x', label: 'Peningkatan konversi ke chat WhatsApp' },
      { value: '0.8 dtk', label: 'Waktu muat halaman katalog' },
    ],
    techStack: ['Next.js App Router', 'Tailwind CSS', 'WhatsApp Pipeline', 'Vercel Edge'],
    gallery: [
      { image: img('photo-1522542550221-31fd19575a2d', 'Sketsa wireframe dan palet warna di meja desain', 1200), caption: 'Eksplorasi wireframe & arah visual' },
      { image: img('photo-1517694712202-14dd9538aa97', 'Laptop dengan kode frontend terbuka', 1200), caption: 'Implementasi komponen katalog' },
    ],
    isFeatured: true,
  },
  {
    slug: 'client-service-portal-mobile-booking',
    title: 'Client Service Portal & Mobile Booking Engine',
    clientName: 'Jasa Profesional & Medis',
    category: 'app',
    categoryLabel: 'Mobile Application (iOS/Android)',
    summary:
      'Aplikasi pemesanan jadwal konsultasi, pembayaran invoice gateway otomatis, dan tracking status pengerjaan proyek transparan untuk klien.',
    thumbnail: img('photo-1512941937669-90a1b58e7e9c', 'Ponsel menampilkan aplikasi pemesanan jadwal'),
    duration: '8 minggu',
    role: 'Product discovery, Desain aplikasi, Flutter & API',
    completedDate: '2026-02-01',
    challenge:
      'Penjadwalan konsultasi dilakukan lewat chat dan telepon, sehingga sering terjadi jadwal bentrok dan tagihan terlambat dikirim. Klien juga tidak punya cara untuk memantau status layanan mereka.',
    solution:
      'Kami merancang aplikasi mobile lintas platform untuk booking jadwal, pembayaran invoice melalui payment gateway, dan notifikasi status. Admin mengelola slot dan tagihan dari dashboard web yang terhubung ke API yang sama.',
    results: [
      { value: '4.9', label: 'Rating aplikasi di store' },
      { value: 'Otomatis', label: 'Onboarding & penagihan klien' },
    ],
    techStack: ['Flutter Cross-Platform', 'REST API Node.js', 'PostgreSQL', 'Cloudflare CDN'],
    gallery: [
      { image: img('photo-1551650975-87deedd944c3', 'Beberapa layar aplikasi mobile di atas meja', 1200), caption: 'Alur booking & pembayaran' },
    ],
    isFeatured: false,
  },
  {
    slug: 'omnichannel-performance-ads-scaling',
    title: 'Omnichannel Performance Ads Scaling',
    clientName: 'Fashion & Skincare E-Commerce',
    category: 'marketing',
    categoryLabel: 'Digital Marketing & Ads',
    summary:
      'Eksekusi kampanye iklan berbasis ROI dengan testing copywriting agresif, tracking server-side anti-bocor, dan dashboard live reporting mingguan.',
    thumbnail: img('photo-1551288049-bebda4e38f71', 'Dashboard performa kampanye iklan'),
    duration: 'Retainer 6 bulan',
    role: 'Strategi media, Tracking CAPI, Kreatif & reporting',
    completedDate: '2026-08-01',
    challenge:
      'Biaya iklan terus naik sementara data konversi di Meta Ads tidak sinkron dengan pesanan di toko. Tim tidak tahu iklan mana yang sebenarnya menghasilkan penjualan.',
    solution:
      'Tracking dipindahkan ke server-side lewat Meta Conversions API dan event Google Ads yang tervalidasi. Setelah data bersih, kami menjalankan testing copywriting dan kreatif secara terstruktur, lalu memindahkan budget ke kombinasi yang terbukti menghasilkan pembelian.',
    results: [
      { value: '+320%', label: 'Pertumbuhan ROI iklan' },
      { value: '-42%', label: 'Biaya akuisisi pelanggan (CAC)' },
    ],
    techStack: ['Meta Conversions API (CAPI)', 'Google Search Ads', 'Looker Studio', 'CRO Landing Page'],
    gallery: [
      { image: img('photo-1504868584819-f8e8b4b6d7e3', 'Grafik pertumbuhan dan laporan analitik', 1200), caption: 'Laporan mingguan di Looker Studio' },
      { image: img('photo-1432888498266-38ffec3eaf0a', 'Meja kerja dengan laptop analitik dan catatan', 1200), caption: 'Sesi evaluasi kreatif & copywriting' },
    ],
    isFeatured: true,
  },
]

/* ------------------------------------------------------------------ */
/* Articles                                                            */
/* ------------------------------------------------------------------ */

const webTech = { name: 'Web Tech', slug: 'web-tech' }
const marketing = { name: 'Digital Marketing', slug: 'digital-marketing' }
const mobile = { name: 'Mobile App', slug: 'mobile-app' }

const rawArticles: Omit<ArticleItem, 'readingMinutes'>[] = [
  {
    slug: 'biaya-membuat-website-bisnis',
    title: 'Berapa Biaya Membuat Website Bisnis? Ini Komponen yang Menentukan Harganya',
    excerpt:
      'Harga pembuatan website bisa berbeda puluhan juta rupiah untuk kebutuhan yang terlihat mirip. Pahami komponen biayanya supaya Anda bisa membandingkan penawaran dengan adil.',
    category: webTech,
    coverImage: img('photo-1498050108023-c5249f4df085', 'Laptop dengan kode website di meja kerja'),
    tags: ['Website', 'Budget', 'UMKM'],
    authorName: 'Tim MarketingCode.ID',
    authorRole: 'Web Development',
    publishedAt: '2026-09-22T09:00:00.000Z',
    content: lx.doc(
      lx.p(
        'Pertanyaan pertama yang hampir selalu muncul saat konsultasi adalah, ',
        lx.i('"berapa biayanya?"'),
        ' Jawaban jujurnya: tergantung. Tapi "tergantung" tidak membantu Anda menyusun anggaran. Artikel ini merinci komponen yang benar-benar memengaruhi harga, agar Anda bisa membaca penawaran vendor dengan lebih percaya diri.',
      ),
      lx.h2('1. Jumlah dan jenis halaman'),
      lx.p(
        'Landing page tunggal untuk satu produk jauh lebih sederhana dibanding website company profile dengan delapan halaman, blog, dan katalog. Yang menambah biaya bukan sekadar jumlah halaman, melainkan berapa banyak ',
        lx.b('template unik'),
        ' yang harus didesain dan dibangun.',
      ),
      lx.h2('2. Desain custom atau template'),
      lx.p(
        'Template siap pakai memangkas waktu desain, tetapi sering membawa kode berlebih yang memperlambat website. Desain custom membutuhkan sesi riset dan prototipe, namun hasilnya selaras dengan brand dan alur konversi yang Anda inginkan.',
      ),
      lx.h2('3. Fitur dinamis dan CMS'),
      lx.p('Komponen berikut biasanya menambah ruang lingkup pekerjaan secara signifikan:'),
      lx.ul(
        ['CMS agar tim Anda bisa mengubah konten tanpa developer'],
        ['Katalog produk dengan filter dan pencarian'],
        ['Integrasi WhatsApp, payment gateway, atau sistem internal'],
        ['Area login untuk pelanggan atau mitra'],
      ),
      lx.h2('4. Biaya berulang yang sering terlupa'),
      lx.p(
        'Domain, hosting, layanan email, dan pemeliharaan adalah biaya tahunan. Tanyakan sejak awal apa saja yang sudah termasuk dalam paket dan berapa biaya perpanjangannya di tahun kedua.',
      ),
      lx.quote(
        'Penawaran termurah belum tentu paling hemat jika website harus dibangun ulang dalam setahun karena lambat dan sulit dikembangkan.',
      ),
      lx.h2('Cara membandingkan penawaran'),
      lx.ol(
        ['Minta rincian fitur per halaman, bukan hanya total harga.'],
        ['Pastikan kepemilikan source code dan akses hosting ada di tangan Anda.'],
        ['Tanyakan masa garansi dan apa yang terjadi setelahnya.'],
      ),
      lx.p(
        'Jika Anda masih ragu menentukan cakupan yang tepat, tim kami bisa membantu menyusun daftar kebutuhan dan estimasi biaya tanpa komitmen di awal.',
      ),
    ),
  },
  {
    slug: 'meta-conversions-api-pixel-tidak-cukup',
    title: 'Meta Conversions API: Kenapa Pixel Saja Tidak Lagi Cukup',
    excerpt:
      'Pembatasan cookie dan privasi di browser membuat banyak konversi tidak terekam oleh Pixel. Conversions API mengirim data langsung dari server agar algoritma iklan tetap belajar dengan benar.',
    category: marketing,
    coverImage: img('photo-1432888498266-38ffec3eaf0a', 'Meja kerja dengan laptop berisi data analitik iklan'),
    tags: ['Meta Ads', 'Tracking', 'CAPI'],
    authorName: 'Tim MarketingCode.ID',
    authorRole: 'Performance Marketing',
    publishedAt: '2026-09-08T09:00:00.000Z',
    content: lx.doc(
      lx.p(
        'Jika angka pembelian di Ads Manager selalu lebih kecil dibanding pesanan yang masuk, Anda tidak sendirian. Sejak browser dan sistem operasi memperketat pelacakan, Meta Pixel yang berjalan di browser kehilangan sebagian sinyal konversi.',
      ),
      lx.h2('Apa itu Conversions API?'),
      lx.p(
        'Conversions API (CAPI) adalah cara mengirim event seperti ',
        lx.b('Purchase'),
        ' atau ',
        lx.b('Lead'),
        ' langsung dari server Anda ke Meta. Karena tidak bergantung pada browser pengunjung, event tetap terkirim meski ada ad blocker atau pembatasan cookie.',
      ),
      lx.h2('Dampaknya ke performa iklan'),
      lx.p(
        'Algoritma Meta mengoptimalkan iklan berdasarkan data konversi yang diterimanya. Data yang bolong membuat algoritma menargetkan orang yang salah, sehingga biaya per hasil naik.',
      ),
      lx.ul(
        ['Atribusi lebih akurat untuk keputusan alokasi budget'],
        ['Audiens retargeting dan lookalike yang lebih lengkap'],
        ['Kualitas pencocokan event (Event Match Quality) meningkat'],
      ),
      lx.h2('Pixel dan CAPI bekerja bersama'),
      lx.p(
        'CAPI bukan pengganti Pixel. Praktik terbaiknya adalah menjalankan keduanya dengan ',
        lx.b('event_id'),
        ' yang sama, agar Meta bisa menghapus duplikasi dan menyimpan satu event yang paling lengkap.',
      ),
      lx.h3('Checklist implementasi'),
      lx.ol(
        ['Tentukan event bisnis yang benar-benar penting (bukan semua klik).'],
        ['Kirim parameter pelanggan yang di-hash, seperti email dan nomor telepon.'],
        ['Gunakan event_id untuk deduplikasi dengan Pixel.'],
        ['Pantau Event Match Quality di Events Manager setiap minggu.'],
      ),
      lx.quote('Iklan yang bagus tidak akan menolong jika data yang dipakai algoritma untuk belajar salah.'),
      lx.p(
        'Implementasi CAPI bisa dilakukan lewat integrasi platform e-commerce, server-side tagging, atau kode custom. Pilihannya bergantung pada stack website dan seberapa detail data yang ingin Anda kirim.',
      ),
    ),
  },
  {
    slug: 'nextjs-vs-wordpress-company-profile',
    title: 'Next.js vs WordPress untuk Website Company Profile',
    excerpt:
      'WordPress unggul dalam ekosistem plugin, Next.js unggul dalam performa dan fleksibilitas. Mana yang cocok untuk bisnis Anda? Kami bandingkan dari sisi yang paling berpengaruh.',
    category: webTech,
    coverImage: img('photo-1555066931-4365d14bab8c', 'Layar monitor dengan kode pemrograman'),
    tags: ['Next.js', 'WordPress', 'Performa'],
    authorName: 'Tim MarketingCode.ID',
    authorRole: 'Web Development',
    publishedAt: '2026-08-25T09:00:00.000Z',
    content: lx.doc(
      lx.p(
        'Dua pilihan ini sama-sama bisa menghasilkan website company profile yang baik. Perbedaannya ada pada cara website dibangun, dirawat, dan dikembangkan di masa depan.',
      ),
      lx.h2('Performa dan Core Web Vitals'),
      lx.p(
        'Next.js merender halaman di server atau saat build, lalu mengirim HTML yang ringan ke browser. WordPress bisa cepat juga, tetapi biasanya membutuhkan plugin cache dan optimasi tambahan, terutama jika tema dan plugin yang dipakai berat.',
      ),
      lx.h2('Kemudahan mengelola konten'),
      lx.p(
        'WordPress terkenal ramah untuk editor konten. Di sisi Next.js, kebutuhan ini dipenuhi oleh headless CMS seperti ',
        lx.b('Payload CMS'),
        ', yang memberi panel admin modern dengan struktur konten yang bisa disesuaikan per bisnis.',
      ),
      lx.h2('Keamanan dan pemeliharaan'),
      lx.ul(
        ['WordPress: update rutin core, tema, dan plugin wajib dilakukan'],
        ['Next.js + headless CMS: permukaan serangan lebih kecil karena frontend terpisah dari admin'],
      ),
      lx.h2('Kapan memilih yang mana?'),
      lx.p(
        'Pilih WordPress jika Anda butuh website cepat jadi dengan anggaran terbatas dan fitur standar. Pilih Next.js jika performa, SEO teknis, dan rencana pengembangan fitur custom menjadi prioritas.',
      ),
      lx.quote('Teknologi terbaik adalah yang paling sesuai dengan tujuan bisnis dan kemampuan tim Anda merawatnya.'),
    ),
  },
  {
    slug: 'tanda-bisnis-butuh-aplikasi-mobile',
    title: '5 Tanda Bisnis Anda Sudah Butuh Aplikasi Mobile Sendiri',
    excerpt:
      'Tidak semua bisnis perlu aplikasi. Tapi ada sinyal yang jelas kapan website dan chat saja sudah tidak cukup untuk melayani pelanggan dengan baik.',
    category: mobile,
    coverImage: img('photo-1551650975-87deedd944c3', 'Beberapa layar aplikasi mobile'),
    tags: ['Mobile App', 'Flutter', 'Strategi'],
    authorName: 'Tim MarketingCode.ID',
    authorRole: 'Mobile Development',
    publishedAt: '2026-08-11T09:00:00.000Z',
    content: lx.doc(
      lx.p(
        'Membangun aplikasi mobile adalah investasi besar. Sebelum memutuskan, perhatikan apakah bisnis Anda menunjukkan tanda-tanda berikut.',
      ),
      lx.h2('1. Pelanggan bertransaksi berulang kali'),
      lx.p(
        'Jika pelanggan memesan setiap minggu atau setiap bulan, aplikasi memberi akses satu ketuk dan menyimpan riwayat mereka, sehingga proses pemesanan jauh lebih cepat.',
      ),
      lx.h2('2. Tim kewalahan membalas chat yang sama'),
      lx.p(
        'Pertanyaan soal jadwal, status pesanan, atau tagihan bisa dijawab otomatis oleh aplikasi lewat notifikasi dan halaman status.',
      ),
      lx.h2('3. Anda butuh fitur perangkat'),
      lx.p('Beberapa kebutuhan hanya optimal di aplikasi native atau cross-platform:'),
      lx.ul(['Push notification'], ['Kamera dan scan barcode'], ['Lokasi real-time'], ['Mode offline']),
      lx.h2('4. Loyalitas menjadi prioritas'),
      lx.p(
        'Program poin, membership, dan promo personal lebih efektif ketika aplikasi Anda ada di layar utama ponsel pelanggan.',
      ),
      lx.h2('5. Proses internal masih manual'),
      lx.p(
        'Aplikasi tidak selalu untuk pelanggan. Tim lapangan, kurir, atau teknisi juga bisa bekerja lebih rapi dengan aplikasi internal yang terhubung ke sistem pusat.',
      ),
      lx.quote('Mulailah dari satu alur yang paling sering dipakai, bukan dari daftar fitur sepanjang mungkin.'),
      lx.p(
        'Jika dua atau lebih tanda di atas terasa familiar, ini saat yang tepat untuk mendiskusikan MVP aplikasi yang fokus pada alur terpenting bisnis Anda.',
      ),
    ),
  },
]

export const sampleArticles: ArticleItem[] = rawArticles.map((a) => ({
  ...a,
  readingMinutes: readingMinutes(a.content),
}))
