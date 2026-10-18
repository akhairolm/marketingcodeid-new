export interface FaqItem {
  q: string
  a: string
  category?: 'biaya' | 'proses' | 'teknis' | 'umum'
}

export const AGENCY_FAQS: FaqItem[] = [
  {
    category: 'biaya',
    q: 'Berapa biaya pembuatan website di MarketingCode?',
    a: 'Biaya pembuatan website sangat transparan: mulai dari Rp 1,5 Juta untuk Landing Page Promosi, Rp 3,5 Juta untuk Website Katalog UMKM, hingga Rp 5,5 Juta untuk Company Profile Bisnis. Untuk kebutuhan portal instansi atau sistem aplikasi kustom, rincian biaya disusun secara terbuka dalam Surat Perjanjian Kerja (SPK) resmi.',
  },
  {
    category: 'proses',
    q: 'Berapa lama waktu pengerjaan website hingga siap online?',
    a: 'Waktu pengerjaan berkisar antara 3 - 5 hari kerja untuk Landing Page Promosi, 7 - 14 hari kerja untuk Website UMKM & Katalog, dan 10 - 21 hari kerja untuk Company Profile Bisnis. Timeline pengerjaan dipengaruhi oleh kelengkapan materi profil usaha dan kecepatan konfirmasi revisi dari pihak Anda.',
  },
  {
    category: 'teknis',
    q: 'Apakah biaya sudah termasuk domain dan cloud hosting?',
    a: 'Ya, untuk paket Website UMKM (domain .com) dan Company Profile (domain .com atau .id) sudah termasuk pendaftaran nama domain serta cloud hosting berkecepatan tinggi selama 1 tahun pertama. Pada tahun berikutnya, Anda hanya membayar biaya perpanjangan domain dan cloud hosting tahunan standar tanpa biaya sewa sistem bulanan.',
  },
  {
    category: 'proses',
    q: 'Apakah klien harus menyediakan seluruh materi tulisan dan foto sendiri?',
    a: 'Jika Anda sudah memiliki foto produk, profil bisnis, atau logo, tim kami akan mengolah dan menatanya ke dalam struktur visual website. Jika materi belum lengkap, kami siap membantu menyusun copywriting dasar dan memilihkan aset visual penunjang yang relevan dengan bidang usaha Anda.',
  },
  {
    category: 'teknis',
    q: 'Apakah website dapat dikelola sendiri setelah selesai dibuat?',
    a: 'Tentu bisa. Kami menyediakan dashboard admin yang praktis dan responsif untuk diakses langsung lewat smartphone maupun laptop. Kami juga memberikan panduan ringkas agar Anda atau staf dapat mengunggah produk baru, memperbarui harga, dan mengganti kontak secara mandiri tanpa paham koding.',
  },
  {
    category: 'teknis',
    q: 'Apakah bisa menambahkan fitur khusus atau aplikasi mobile di masa depan?',
    a: 'Bisa. Seluruh website dibangun dengan fondasi arsitektur modern (Next.js) yang modular. Kapan pun bisnis Anda berkembang, fitur baru seperti payment gateway, formulir reservasi online, hingga integrasi ke aplikasi mobile Android & iOS dapat ditambahkan tanpa merombak sistem dari nol.',
  },
  {
    category: 'teknis',
    q: 'Apakah tersedia garansi pemeliharaan dan dukungan teknis?',
    a: 'Ya, setiap paket mencakup garansi pemeliharaan teknis resmi. Kami menjamin website Anda tetap online lancar, terproteksi dari bug fungsional, dan seluruh tombol interaksi seperti pemesanan WhatsApp berjalan optimal.',
  },
  {
    category: 'umum',
    q: 'Apakah MarketingCode melayani klien di luar Banjarmasin dan Kandangan?',
    a: 'Tentu saja. Selain siap berdiskusi tatap muka di area Kandangan (HSS), Banua Enam (Tapin, HST, HSU, Balangan, Tabalong), Banjarbaru, dan Banjarmasin, kami telah menangani berbagai proyek klien dari seluruh penjuru Indonesia secara daring melalui WhatsApp dan Google Meet.',
  },
  {
    category: 'umum',
    q: 'Bagaimana status kepemilikan aset website setelah serah terima?',
    a: '100% Hak Milik Anda. Kami tidak menerapkan skema sewa bulanan. Seluruh akses kepemilikan domain, dashboard admin website, dan aset digital akan diserahkan penuh kepada Anda setelah proyek tuntas.',
  },
  {
    category: 'proses',
    q: 'Bagaimana cara memulai pemesanan website di MarketingCode?',
    a: 'Cukup hubungi kami melalui WhatsApp resmi di 0851-2803-8243 atau klik tombol konsultasi di website. Tim kami akan mendengarkan kebutuhan usaha Anda, memberikan saran jenis website terbaik, estimasi waktu, serta penawaran resmi tanpa komitmen awal yang mengikat.',
  },
]
