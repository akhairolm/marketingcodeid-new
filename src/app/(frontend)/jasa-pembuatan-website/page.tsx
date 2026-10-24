import type { Metadata } from 'next'
import Image from 'next/image'
import {
  Globe,
  Store,
  ShoppingBag,
  Smartphone,
  Search,
  MessageSquare,
  ShieldCheck,
  Check,
  X,
  Circle,
  Clock,
  Sparkles,
  Star,
  Tag,
  ArrowRight,
  TrendingDown,
  Lock,
  AlertTriangle,
  Receipt,
  ShieldAlert,
  Percent,
  HelpCircle,
  Users,
  CheckCircle2,
  ChevronDown,
  ExternalLink,
  type LucideIcon,
} from 'lucide-react'
import { getWhatsAppUrl, getWhatsAppDirectUrl } from '@/lib/whatsapp'
import { JsonLd, faqSchema, serviceSchema, breadcrumbSchema } from '@/lib/seo'
import { TestimonialsSection } from '@/components/home/TestimonialsSection'

export const metadata: Metadata = {
  title: 'Jasa Pembuatan Website & Toko Online Profesional | MarketingCode.ID',
  description:
    'Jasa pembuatan website & toko online profesional untuk UMKM & bisnis di seluruh Indonesia. Terima beres tanpa ribet koding, order otomatis ke WhatsApp, dan 100% hak milik tanpa sewa bulanan.',
  keywords: [
    'jasa pembuatan website',
    'jasa bikin website toko online',
    'jasa website umkm indonesia',
    'jasa pembuatan landing page',
    'jasa bikin web toko online',
    'buat website tanpa koding',
    'jasa web developer profesional',
  ],
  alternates: { canonical: '/jasa-pembuatan-website' },
  openGraph: {
    title: 'Jasa Pembuatan Website & Toko Online Profesional | MarketingCode.ID',
    description:
      'Jasa pembuatan website & toko online profesional untuk UMKM & bisnis di seluruh Indonesia. Terima beres tanpa ribet koding, order otomatis ke WhatsApp, dan 100% hak milik tanpa sewa bulanan.',
    url: '/jasa-pembuatan-website',
    siteName: 'MarketingCode.ID',
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jasa Pembuatan Website & Toko Online Profesional | MarketingCode.ID',
    description:
      'Jasa pembuatan website & toko online profesional untuk UMKM & bisnis di seluruh Indonesia. Terima beres tanpa ribet koding, order langsung ke WhatsApp.',
  },
}

const faqs = [
  {
    q: 'Apakah ada sistem sewa bulanan yang mengikat?',
    a: 'Sama sekali tidak ada biaya sewa bulanan. Website, nama domain, data produk, dan seluruh aset adalah 100% hak milik Anda seutuhnya. Pada tahun kedua dan seterusnya, Anda hanya membayar biaya perpanjangan tahunan standar untuk domain dan server yang sangat terjangkau.',
  },
  {
    q: 'Apakah biaya paket sudah termasuk nama domain (.com) dan server hosting?',
    a: 'Ya, seluruh paket kami sudah termasuk pendaftaran nama domain resmi (.com / .id) dan server berkecepatan tinggi selama 1 tahun pertama. Tidak ada biaya tambahan tersembunyi.',
  },
  {
    q: 'Bagaimana dengan jaminan kepuasan & garansi purna jual?',
    a: 'Kami memberikan garansi pemeliharaan resmi selama 1 tahun penuh yang mencakup perbaikan bug, pembaruan keamanan, dan monitoring server. Selain itu, kami memberikan garansi 7 hari uang kembali jika konsep awal website terbukti tidak sesuai dengan kesepakatan brief. Anda aman 100% tanpa risiko.',
  },
  {
    q: 'Berapa lama waktu yang dibutuhkan hingga website siap digunakan?',
    a: 'Untuk Paket Landing Page Promosi berkisar 3 - 5 hari kerja, Paket Website Toko UMKM berkisar 7 - 14 hari kerja, dan Paket Company Profile Pro berkisar 10 - 21 hari kerja setelah materi foto produk dan informasi usaha kami terima.',
  },
  {
    q: 'Saya gaptek dan tidak paham koding, apakah saya bisa mengelola website ini?',
    a: 'Tentu saja bisa. Kami menyediakan panel admin yang sangat simpel dan bisa dibuka langsung dari layar HP atau laptop. Anda dapat menambah foto produk baru, mengganti harga promo, atau memperbarui informasi usaha semudah mengunggah status di WhatsApp atau media sosial. Tim kami juga memberikan video panduan dan siap mengajari Anda sampai benar-benar bisa.',
  },
  {
    q: 'Bagaimana alur pemesanan produk oleh pembeli di website saya?',
    a: 'Setiap produk yang Anda pajang dilengkapi tombol pesan WhatsApp. Begitu calon pembeli mengklik tombol tersebut, aplikasi WhatsApp mereka otomatis terbuka dengan pesan pemesanan yang rapi mencantumkan nama barang, varian, dan jumlah yang dipilih. Anda tinggal membalas total transfer dan ongkos kirim seperti biasa tanpa ribet.',
  },
  {
    q: 'Bagaimana proses pengerjaan jika lokasi saya berada di luar kota atau luar pulau?',
    a: 'Seluruh proses pengerjaan kami lakukan 100% online secara profesional. Kami melayani klien UMKM dan pebisnis dari Sumatra, Jawa, Kalimantan, Sulawesi, hingga Papua. Koordinasi konsep, pengiriman materi foto produk, hingga serah terima dilakukan dengan mudah via chat WhatsApp atau Google Meet.',
  },
]

const problems = [
  {
    number: '01',
    title: 'Marketplace Memotong Margin Anda',
    desc: 'Rp 1.500.000+ lenyap tiap omzet Rp 10 juta hanya untuk potongan komisi 5–12% dan biaya admin. Makin keras Anda jualan, margin keuntungan bersih Anda justru makin tergerus setiap bulannya.',
  },
  {
    number: '02',
    title: 'Bersaing di Rak yang Sama dengan Ratusan Kompetitor',
    desc: 'Di marketplace, pembeli sangat mudah berpaling ke toko lain hanya karena beda harga seribu rupiah. Nama toko dan nilai brand unik Anda tenggelam tanpa pernah diingat pembeli.',
  },
  {
    number: '03',
    title: 'Data Pembeli Dikunci & Bukan Milik Anda',
    desc: 'Kontak WhatsApp dan nomor pembeli disensor oleh platform. Saat merilis produk baru atau promo hari raya, Anda tidak bisa menghubungi pelanggan lama untuk repeat order gratis.',
  },
  {
    number: '04',
    title: 'Website Asal-Asalan Terlihat Kurang Meyakinkan',
    desc: 'Menggunakan template murahan atau link bio gratisan membuat pembeli ragu transfer dan mempertanyakan keaslian toko Anda. Kepercayaan pembeli hilang sebelum transaksi terjadi.',
  },
]

const solutions = [
  {
    icon: Globe,
    title: 'Alamat Toko Resmi Milik Sendiri (.com / .id)',
    desc: 'Pembeli langsung mengingat nama brand Anda sendiri. Toko Anda terlihat lebih resmi, terpercaya, dan berkelas di mata calon pembeli.',
  },
  {
    icon: ShoppingBag,
    title: 'Tampilan Rapi Sesuai Karakter Produk',
    desc: 'Desain dirancang khusus mengikuti karakter jualan Anda. Terasa nyaman, elegan, dan sangat memikat saat dibuka lewat smartphone.',
  },
  {
    icon: MessageSquare,
    title: 'Pemesanan Otomatis ke WhatsApp (0% Potongan)',
    desc: 'Pembeli klik beli, format pesanan otomatis terisi di chat WhatsApp Anda. Semua uang pembayaran 100% masuk ke rekening Anda tanpa potongan admin.',
  },
  {
    icon: Smartphone,
    title: 'Bisa Ganti Foto & Harga dari Layar HP',
    desc: 'Disediakan panel admin yang sangat simpel. Tambah menu baru, ubah harga diskon, atau tandai stok habis semudah membuat status WhatsApp.',
  },
  {
    icon: Search,
    title: 'Gampang Ditemukan Calon Pembeli di Google',
    desc: 'Struktur website sudah disiapkan agar nama toko dan produk Anda mudah muncul saat calon pembeli mencari nama produk Anda di Google.',
  },
  {
    icon: ShieldCheck,
    title: 'Didampingi Tim Ramah via WhatsApp',
    desc: 'Tidak perlu takut bingung atau gaptek. Tim kami standby mendampingi dan siap membantu jika Anda butuh panduan cara menggunakannya.',
  },
]

const pricingPackages = [
  {
    tier: 'Landing Page Konversi',
    badgeTop: 'Hemat & Cepat Jadi',
    originalPrice: 'Rp 1.850.000',
    price: 'Rp 1.190.000',
    unit: 'Bayar sekali • Terima beres',
    desc: 'Cocok untuk promosi 1 produk/jasa unggulan & kampanye iklan (Meta/Google Ads) yang fokus mengarahkan prospek langsung ke WhatsApp.',
    isPopular: false,
    btnText: 'Pesan Paket Landing',
    ariaLabel: 'Pesan Paket Landing Page Konversi via WhatsApp',
    directUrl: getWhatsAppDirectUrl(
      'Halo Admin MarketingCode.ID, saya mau ambil Paket Landing Page Konversi (Rp 1.190.000). Nama usaha saya: ____',
    ),
    subject: 'Paket Landing Page Promosi (Rp 1.190.000)',
    features: [
      '1 Halaman Panjang (Single Page) dengan susunan penawaran persuasif',
      'Tampilan Sangat Cepat & Ringan dibuka di HP (Loading < 2 detik)',
      'Terima Beres Tanpa Repot (Tidak perlu pusing kelola dashboard sendiri)',
      'Gratis Domain .com & Cloud Server Resmi (Aktif 1 Tahun)',
      'Tombol Pemesanan Langsung ke WhatsApp & Formulir Prospek',
      'Siap Pasang Pixel Iklan (Meta Pixel, TikTok Pixel, Google Tag & Analytics) — Ready untuk Google Ads/Meta Ads',
      'Gratis Bantu Update Ringan (Ganti teks/foto promo hingga 2x setelah rilis)',
      'Garansi Pemeliharaan Resmi & Sertifikat Keamanan SSL',
    ],
    limitationNote: 'Catatan: Tidak termasuk dashboard admin mandiri & multi-halaman blog SEO',
    renewal: 'Perpanjangan tahun ke-2 hanya Rp 600rb/thn (Domain & Server)',
    time: 'Siap Rilis: 3 - 5 Hari Kerja (Cocok untuk Launching Cepat)',
  },
  {
    tier: 'Web Katalog, Profil & Blog',
    badgeTop: 'PALING DIMINATI',
    topHighlightNote: 'Paling Lengkap & Pilihan Utama Mayoritas Klien UMKM',
    bonusStack:
      'Bonus Senilai Rp 850rb: Setup Google Analytics + Google Search Console + Copywriting Jualan 1 Halaman',
    originalPrice: 'Rp 3.200.000',
    price: 'Rp 2.190.000',
    unit: 'Bayar sekali • Bisa kelola mandiri',
    installmentNote:
      'Opsi bertahap: DP 50% di muka & 50% setelah website siap rilis (Rp 1.095.000 x 2)',
    desc: 'Solusi ideal untuk UMKM, toko lokal, kuliner, fashion, & usaha jasa yang ingin memiliki katalog produk, profil usaha, serta artikel informasi yang bisa diedit sendiri.',
    isPopular: true,
    btnText: 'Pesan Paket Katalog',
    ariaLabel: 'Pesan Paket Web Katalog, Profil & Blog via WhatsApp',
    directUrl: getWhatsAppDirectUrl(
      'Halo Admin MarketingCode.ID, saya mau ambil Paket Web Katalog, Profil & Blog (Rp 2.190.000). Nama usaha saya: ____',
    ),
    subject: 'Paket Web UMKM & Katalog (Rp 2.190.000)',
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
    renewal: 'Perpanjangan tahun ke-2 hanya Rp 750rb/thn (Domain & Server)',
    time: 'Pengerjaan Detail: 7 - 14 Hari Kerja (Setiap Halaman & Produk Dioptimasi)',
  },
  {
    tier: 'Company Profile Pro / Toko Online',
    badgeTop: 'Fitur Terlengkap',
    originalPrice: 'Rp 5.500.000',
    price: 'Rp 3.490.000',
    unit: 'Bayar sekali • Sistem skala bisnis',
    desc: 'Dirancang untuk perusahaan (PT/CV/B2B) yang butuh kredibilitas tinggi atau toko online dengan sistem transaksi otomatis (Payment Gateway).',
    isPopular: false,
    btnText: 'Pesan Paket Pro',
    ariaLabel: 'Konsultasi Paket Company Profile Pro / Toko Online via WhatsApp',
    directUrl: getWhatsAppDirectUrl(
      'Halo Admin MarketingCode.ID, saya tertarik konsultasi Paket Company Profile Pro / Toko Online (Rp 3.490.000). Kebutuhan saya: ____',
    ),
    subject: 'Paket Company Profile Pro / Toko Online (Rp 3.490.000)',
    features: [
      'Hingga 12+ Halaman Eksklusif dengan Desain Kustom Elegan & Representatif',
      'Bebas Pilih Fokus Mode Sistem:',
      '• Mode Toko Online: Pembayaran otomatis (QRIS, Transfer Bank, E-Wallet) & Hitung Ongkir Otomatis',
      '• Mode Profil Perusahaan: Profil Resmi Perusahaan, Portofolio Proyek Klien, Izin Legalitas, & Tombol Unduh Profil PDF',
      'Dashboard Admin Lengkap (CMS) untuk mengelola seluruh halaman & data produk',
      'Gratis Domain .com / .id / .co.id & High-Performance Server (Aktif 1 Tahun)',
      'Riset Kata Kunci Dasar & Setup Pengaturan Ramah Google',
      'Prioritas Bantuan Pendampingan & Training Tim',
    ],
    limitationNote:
      'Catatan: Mode Payment Gateway memerlukan registrasi akun gerbang pembayaran resmi (Midtrans/Xendit) atas nama usaha Anda (kami dampingi setup teknisnya).',
    renewal: 'Perpanjangan tahun ke-2 menyesuaikan kapasitas server',
    time: 'Build Mendalam: 10 - 21 Hari Kerja (Desain & Arsitektur Kustom)',
  },
]

const steps = [
  {
    number: '01',
    title: 'Konsultasi Santai via WhatsApp',
    desc: 'Ceritakan jenis usaha dan produk yang ingin Anda tampilkan. Kami berikan rekomendasi paket yang paling pas dan hemat biaya.',
  },
  {
    number: '02',
    title: 'Kirim Foto & Rincian Produk',
    desc: 'Cukup kirimkan materi foto produk, harga, dan nomor WhatsApp toko Anda dengan mudah lewat chat WA atau Google Drive.',
  },
  {
    number: '03',
    title: 'Tim Kami Kerjakan Semuanya',
    desc: 'Kami susun tampilan profesional, tata letak produk yang menarik, kata-kata penawaran meyakinkan, dan tombol pemesanan WhatsApp.',
  },
  {
    number: '04',
    title: 'Website Siap Pakai & Serah Terima',
    desc: 'Website resmi tayang dan siap jualan. Kami serahkan seluruh akses 100% milik Anda dan kami ajari cara pakainya sampai mahir.',
  },
]

const comparisonRows = [
  {
    number: '01',
    criteria: 'Biaya per transaksi penjualan',
    marketingCode: { status: 'check', text: 'Gratis (0% Potongan Admin)' },
    marketplace: { status: 'cross', text: 'Dipotong komisi 5–12% per order' },
    diy: { status: 'neutral', text: 'Gratis (tapi ada biaya gateway)' },
  },
  {
    number: '02',
    criteria: 'Alamat nama toko sendiri (.com / .id)',
    marketingCode: { status: 'check', text: 'Termasuk resmi milik sendiri' },
    marketplace: { status: 'cross', text: 'Numpang alamat nama marketplace' },
    diy: { status: 'cross', text: 'Harus beli domain terpisah' },
  },
  {
    number: '03',
    criteria: 'Kepemilikan data pembeli & kontak',
    marketingCode: { status: 'check', text: '100% Milik Anda untuk repeat order' },
    marketplace: { status: 'cross', text: 'Dikunci & disensor oleh platform' },
    diy: { status: 'neutral', text: 'Milik Anda (harus atur sendiri)' },
  },
  {
    number: '04',
    criteria: 'Perlu keahlian teknis / koding',
    marketingCode: { status: 'check', text: 'Tidak perlu, kami siapkan terima beres' },
    marketplace: { status: 'neutral', text: 'Tidak, tapi fitur sangat terbatas' },
    diy: { status: 'cross', text: 'Tinggi (pusing hosting & koding plugin)' },
  },
  {
    number: '05',
    criteria: 'Bantuan & pendampingan tim',
    marketingCode: { status: 'check', text: 'Langsung chat tim WhatsApp kami' },
    marketplace: { status: 'cross', text: 'Antrean tiket & robot CS otomatis' },
    diy: { status: 'cross', text: 'Cari solusi sendiri di forum internet' },
  },
  {
    number: '06',
    criteria: 'Kemudahan ditemukan di Google',
    marketingCode: { status: 'check', text: 'Sudah disiapkan ramah Google' },
    marketplace: { status: 'cross', text: 'Hanya bersaing di dalam aplikasi' },
    diy: { status: 'cross', text: 'Perlu pengaturan teknis manual' },
  },
  {
    number: '07',
    criteria: 'Transparansi biaya',
    marketingCode: { status: 'check', text: 'Bayar sekali (100% aset hak milik)' },
    marketplace: { status: 'cross', text: 'Potongan komisi terus bertambah' },
    diy: { status: 'cross', text: 'Banyak biaya langganan dolar bulanan' },
  },
  {
    number: '08',
    criteria: 'Kebebasan modifikasi koding mandiri',
    marketingCode: {
      status: 'check',
      text: 'Melalui dashboard admin simpel & opsi request kustom',
    },
    marketplace: { status: 'cross', text: 'Sistem dikunci mati oleh platform' },
    diy: { status: 'check', text: 'Bebas utak-atik koding (jika menguasai teknis)' },
  },
]

function StatusIcon({ status }: { status: 'check' | 'cross' | 'neutral' }) {
  if (status === 'check') {
    return <Check className="w-4 h-4 shrink-0 text-[#FF5C28]" strokeWidth={2.5} />
  }
  if (status === 'cross') {
    return <X className="w-4 h-4 shrink-0 text-neutral-500" strokeWidth={2.5} />
  }
  return <Circle className="w-3.5 h-3.5 shrink-0 text-neutral-500" strokeWidth={2.5} />
}

function ProblemMarginMockup() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      {/* Top Floating Deductions Badges */}
      <div className="relative z-10 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-2 w-full px-2">
        <span className="bg-white px-2.5 py-1 rounded-full border border-neutral-200/90 shadow-xs flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold text-neutral-700">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF5C28]" />
          Komisi 6.5%
        </span>
        <span className="bg-white px-2.5 py-1 rounded-full border border-neutral-200/90 shadow-xs flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold text-neutral-700">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
          Layanan 4%
        </span>
        <span className="bg-white px-2.5 py-1 rounded-full border border-neutral-200/90 shadow-xs flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold text-neutral-700">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
          Iklan 5%
        </span>
      </div>

      {/* Subtle connector stem */}
      <div className="w-px h-3 bg-neutral-300 mx-auto mb-1.5" />

      {/* Central Elevated Card */}
      <div className="relative z-10 w-full max-w-[270px] xs:max-w-[285px] sm:max-w-[320px] bg-white rounded-2xl p-3.5 sm:p-4 border border-neutral-200/80 shadow-md transition-transform duration-300 group-hover:scale-[1.02]">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-6 rounded-lg bg-[#FFF5F0] border border-orange-200/60 flex items-center justify-center text-[#FF5C28]">
              <Receipt className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-bold text-neutral-800">Simulasi Marketplace</span>
          </div>
          <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-red-50 border border-red-200/70 text-red-600 text-[10px] font-bold">
            <TrendingDown className="w-2.5 h-2.5" />
            -15.5% Cut
          </span>
        </div>

        <div className="bg-neutral-50 rounded-xl p-2.5 border border-neutral-100">
          <div className="flex items-baseline justify-between">
            <span className="text-[10px] text-neutral-600 font-medium">Omzet Kotor Toko:</span>
            <span className="text-xs sm:text-sm font-extrabold text-neutral-900">
              Rp 10.000.000
            </span>
          </div>

          {/* Cut visual bar */}
          <div className="h-2 w-full rounded-full bg-neutral-200 flex overflow-hidden my-2">
            <div className="w-[84.5%] bg-emerald-500" />
            <div className="w-[15.5%] bg-gradient-to-r from-[#FF5C28] to-red-500" />
          </div>

          <div className="flex items-center justify-between text-[10px]">
            <span className="text-emerald-700 font-semibold">Bersih: Rp 8.450.000</span>
            <span className="text-red-600 font-bold">Potongan: Rp 1.550.000</span>
          </div>
        </div>

        <div className="mt-2.5 pt-2 border-t border-neutral-100 flex items-center justify-center">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-neutral-50 border border-neutral-200/60 text-neutral-700 text-[10px] font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
            Makin banyak terjual, potongan makin besar
          </span>
        </div>
      </div>
    </div>
  )
}

function ProblemCompetitorMockup() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      {/* Top Search Pill */}
      <div className="relative z-10 mb-2">
        <div className="bg-white px-3 py-1 rounded-full border border-neutral-200/90 shadow-xs flex items-center gap-1.5 text-[11px] text-neutral-700">
          <Search className="w-3 h-3 text-[#FF5C28]" />
          <span className="text-neutral-500 font-normal">Cari:</span>
          <span className="font-semibold text-neutral-800">&quot;Produk Jualan Anda&quot;</span>
        </div>
      </div>

      {/* Subtle connector stem */}
      <div className="w-px h-3 bg-neutral-300 mx-auto mb-1.5" />

      {/* Central Shelf Comparison Card */}
      <div className="relative z-10 w-full max-w-[270px] xs:max-w-[285px] sm:max-w-[320px] bg-white rounded-2xl p-2.5 sm:p-3 border border-neutral-200/80 shadow-md space-y-1.5 transition-transform duration-300 group-hover:scale-[1.02]">
        {/* Competitor 1 */}
        <div className="flex items-center justify-between p-1.5 sm:p-2 rounded-xl bg-neutral-50/90 border border-neutral-200/50">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-orange-100 text-orange-700 font-bold text-[10px] flex items-center justify-center shrink-0">
              T1
            </div>
            <div>
              <div className="font-bold text-neutral-800 text-[11px] leading-tight">
                Toko Banting Harga
              </div>
              <div className="text-[9px] text-neutral-500 flex items-center gap-1">
                <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400 shrink-0" />
                <span>4.8 • Terjual 2rb+</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-extrabold text-neutral-900 text-xs">Rp 88.500</div>
            <span className="text-[9px] font-bold text-emerald-800 bg-emerald-100/90 px-1.5 py-0.5 rounded">
              Termurah
            </span>
          </div>
        </div>

        {/* Competitor 2 */}
        <div className="flex items-center justify-between p-1.5 sm:p-2 rounded-xl bg-neutral-50/90 border border-neutral-200/50">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 font-bold text-[10px] flex items-center justify-center shrink-0">
              T2
            </div>
            <div>
              <div className="font-bold text-neutral-800 text-[11px] leading-tight">
                Grosir Murah Jaya
              </div>
              <div className="text-[9px] text-neutral-500 flex items-center gap-1">
                <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400 shrink-0" />
                <span>4.7 • Beda Rp 500</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-extrabold text-neutral-900 text-xs">Rp 89.000</div>
            <span className="text-[9px] font-bold text-amber-900 bg-amber-100/90 px-1.5 py-0.5 rounded">
              Perang Harga
            </span>
          </div>
        </div>

        {/* Your Store */}
        <div className="flex items-center justify-between p-1.5 sm:p-2 rounded-xl bg-[#FFF5F0]/80 border border-orange-200/80">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-[#FF5C28] text-white font-bold text-[10px] flex items-center justify-center shrink-0">
              Anda
            </div>
            <div>
              <div className="font-bold text-neutral-900 text-[11px] leading-tight">
                Brand &amp; Toko Anda
              </div>
              <div className="text-[9px] text-orange-700 font-medium">Kualitas Asli Terjamin</div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-extrabold text-neutral-900 text-xs">Rp 95.000</div>
            <span className="text-[9px] font-bold text-red-600 bg-red-50 px-1 py-0.2 rounded">
              Tersisih Harga
            </span>
          </div>
        </div>

        {/* Bottom Tag */}
        <div className="pt-1 flex items-center justify-between text-[10px] text-neutral-500 px-1">
          <span className="flex items-center gap-1 text-red-600 font-medium">
            <AlertTriangle className="w-3 h-3 text-red-500" />
            Pembeli pindah demi Rp 500
          </span>
          <span className="text-neutral-500">250+ toko serupa</span>
        </div>
      </div>
    </div>
  )
}

function ProblemDataLockedMockup() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      {/* Top Floating Buyer Avatars */}
      <div className="relative z-10 flex items-center justify-center gap-2 mb-2">
        <div className="flex -space-x-1.5">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 text-white font-bold text-[10px] sm:text-xs flex items-center justify-center shadow-xs border-2 border-white ring-1 ring-neutral-200/60">
            BS
          </div>
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-rose-500 to-orange-400 text-white font-bold text-[10px] sm:text-xs flex items-center justify-center shadow-xs border-2 border-white ring-1 ring-neutral-200/60">
            RN
          </div>
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-indigo-500 to-blue-500 text-white font-bold text-[10px] sm:text-xs flex items-center justify-center shadow-xs border-2 border-white ring-1 ring-neutral-200/60">
            DA
          </div>
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-teal-500 to-emerald-500 text-white font-bold text-[10px] sm:text-xs flex items-center justify-center shadow-xs border-2 border-white ring-1 ring-neutral-200/60">
            MY
          </div>
        </div>
        <span className="text-[10px] font-semibold text-neutral-700 bg-white px-2.5 py-0.5 rounded-full border border-neutral-200/80 shadow-xs">
          Pelanggan Marketplace
        </span>
      </div>

      {/* Subtle connector stem */}
      <div className="w-px h-3 bg-neutral-300 mx-auto mb-1.5" />

      {/* Central Locked Modal Card */}
      <div className="relative z-10 w-full max-w-[270px] xs:max-w-[285px] sm:max-w-[320px] bg-white rounded-2xl p-3.5 sm:p-4 border border-neutral-200/80 shadow-md transition-transform duration-300 group-hover:scale-[1.02]">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-neutral-100">
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-6 rounded-lg bg-[#FFF5F0] border border-orange-200/60 flex items-center justify-center text-[#FF5C28]">
              <Lock className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-bold text-neutral-800">Data Pelanggan</span>
          </div>
          <span className="text-[10px] font-bold text-red-600 bg-red-50 border border-red-200/70 px-2 py-0.5 rounded-full">
            DIKUNCI
          </span>
        </div>

        <div className="space-y-1.5 text-xs">
          <div className="flex items-center justify-between py-1 px-2.5 rounded-lg bg-neutral-50 border border-neutral-200/50">
            <span className="text-neutral-600 text-[11px] font-medium">No. WhatsApp:</span>
            <span className="font-mono text-neutral-600 text-[11px] tracking-wider flex items-center gap-1.5 font-semibold">
              0812-****-****
              <span className="text-[9px] bg-red-100 text-red-700 px-1.5 py-0.2 rounded font-sans font-bold">
                Sensor
              </span>
            </span>
          </div>
          <div className="flex items-center justify-between py-1 px-2.5 rounded-lg bg-neutral-50 border border-neutral-200/50">
            <span className="text-neutral-600 text-[11px] font-medium">Email Kontak:</span>
            <span className="font-mono text-neutral-600 text-[11px] tracking-wider flex items-center gap-1.5 font-semibold">
              b***@*****com
              <span className="text-[9px] bg-neutral-200/80 text-neutral-700 px-1.5 py-0.2 rounded font-sans font-bold">
                Kunci
              </span>
            </span>
          </div>
        </div>

        <div className="mt-2.5 pt-2 border-t border-neutral-100 flex items-center justify-center">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-neutral-50 border border-neutral-200/60 text-neutral-700 text-[10px] font-medium">
            <ShieldAlert className="w-3.5 h-3.5 text-[#FF5C28]" />
            Nol database untuk repeat order sendiri
          </span>
        </div>
      </div>
    </div>
  )
}

function ProblemCredibilityMockup() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      {/* Top Floating Format Chips */}
      <div className="relative z-10 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-2 w-full px-2">
        <span className="bg-white px-2.5 py-1 rounded-full border border-neutral-200/90 shadow-xs flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold text-neutral-700">
          <X className="w-2.5 h-2.5 text-red-500 stroke-[3]" /> .blogspot.xyz
        </span>
        <span className="bg-white px-2.5 py-1 rounded-full border border-neutral-200/90 shadow-xs flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold text-neutral-700">
          <X className="w-2.5 h-2.5 text-red-500 stroke-[3]" /> Tanpa SSL
        </span>
        <span className="bg-white px-2.5 py-1 rounded-full border border-neutral-200/90 shadow-xs flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold text-neutral-700">
          <AlertTriangle className="w-2.5 h-2.5 text-amber-500" /> Loading 6.8s
        </span>
      </div>

      {/* Subtle connector stem */}
      <div className="w-px h-3 bg-neutral-300 mx-auto mb-1.5" />

      {/* Central Elevated Browser / Trust Card */}
      <div className="relative z-10 w-full max-w-[270px] xs:max-w-[285px] sm:max-w-[320px] bg-white rounded-2xl p-3 sm:p-3.5 border border-neutral-200/80 shadow-md transition-transform duration-300 group-hover:scale-[1.02]">
        {/* Miniature Address Bar */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-neutral-100/90 border border-neutral-200 text-[10px] mb-2.5">
          <AlertTriangle className="w-3 h-3 text-red-500 shrink-0" />
          <span className="text-red-700 font-mono truncate font-semibold">
            tokoanda.gratisan.net
          </span>
          <span className="ml-auto text-[9px] font-bold bg-red-100 text-red-800 px-1.5 py-0.5 rounded shrink-0">
            Tidak Aman
          </span>
        </div>

        {/* Content Skeleton & Warning Banner */}
        <div className="p-2 sm:p-2.5 rounded-xl bg-orange-50/90 border border-orange-200/80 text-[11px] text-orange-950 font-medium flex items-center gap-2">
          <div className="w-5 h-5 rounded-lg bg-[#FF5C28] text-white flex items-center justify-center shrink-0 text-xs font-bold shadow-xs">
            !
          </div>
          <span className="text-[10px] sm:text-[11px] leading-snug">
            <strong className="text-[#C23205]">78% pembeli ragu transfer</strong> dan langsung
            keluar halaman
          </span>
        </div>

        <div className="mt-2.5 pt-2 border-t border-neutral-100 flex items-center justify-center">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-neutral-50 border border-neutral-200/60 text-neutral-700 text-[10px] font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Butuh Domain Resmi (.com) agar Dipercaya
          </span>
        </div>
      </div>
    </div>
  )
}

const solutionGradients = [
  'bg-gradient-to-br from-[#FF7A45] to-[#FF5C28] shadow-orange-500/25',
  'bg-gradient-to-br from-[#FB7185] to-[#E11D48] shadow-rose-500/25',
  'bg-gradient-to-br from-[#34D399] to-[#059669] shadow-emerald-500/25',
  'bg-gradient-to-br from-[#FBBF24] to-[#D97706] shadow-amber-500/25',
  'bg-gradient-to-br from-[#38BDF8] to-[#2563EB] shadow-blue-500/25',
  'bg-gradient-to-br from-[#A78BFA] to-[#7C3AED] shadow-purple-500/25',
]

function SolutionDomainMockup() {
  return (
    <div className="relative w-full h-full flex flex-col justify-between">
      <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
        <span className="text-[11px] font-bold text-neutral-700">Status Domain Toko</span>
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          Aktif 1 Tahun
        </span>
      </div>

      <div className="space-y-2 py-1">
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-neutral-50 border border-neutral-200/80 shadow-xs">
          <Lock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span className="text-xs font-bold text-neutral-900 font-mono truncate">
            tokosaya.com
          </span>
          <span className="ml-auto text-[9px] font-bold bg-neutral-200/70 text-neutral-700 px-1.5 py-0.2 rounded shrink-0">
            SSL Resmi
          </span>
        </div>

        <div className="flex items-center justify-between text-[10px] text-neutral-600 px-1">
          <span className="text-emerald-700 font-medium flex items-center gap-1">
            <Check className="w-3 h-3 stroke-[3]" />
            <span>100% Hak Milik Anda</span>
          </span>
          <span className="text-neutral-600 font-medium">DNS Cloudflare</span>
        </div>
      </div>

      <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-[10px] text-neutral-700">
        <span className="font-medium">Toko terlihat profesional &amp; resmi</span>
        <span className="font-bold text-neutral-900">Bebas Subdomain</span>
      </div>
    </div>
  )
}

function SolutionDesignMockup() {
  return (
    <div className="relative w-full h-full flex flex-col justify-between">
      <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
        <span className="text-[11px] font-bold text-neutral-700">Preview Katalog HP</span>
        <span className="text-[10px] font-bold text-rose-800 bg-rose-100/90 border border-rose-200 px-2 py-0.5 rounded-full">
          Responsif 100%
        </span>
      </div>

      <div className="flex items-center gap-2.5 p-2 rounded-xl bg-neutral-50 border border-neutral-200/80">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-rose-100 to-orange-100 border border-rose-200/60 flex items-center justify-center text-rose-600 shrink-0 font-bold text-xs">
          Foto
        </div>
        <div className="min-w-0 flex-1">
          <div className="font-bold text-neutral-900 text-[11px] truncate">
            Kemeja Linen Signature
          </div>
          <div className="text-[10px] text-neutral-600 font-medium">Rp 149.000 • Stok Ready</div>
        </div>
        <span className="text-[9px] font-bold bg-[#D13D00] text-white px-2 py-1 rounded-lg shrink-0">
          Order
        </span>
      </div>

      <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-[10px] text-neutral-700">
        <span className="flex items-center gap-0.5 text-amber-500 font-semibold">
          <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
          <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
          <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
          <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
          <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
          <span className="ml-1 text-neutral-800 text-[10px]">4.9</span>
        </span>
        <span className="text-neutral-700 font-medium">Tampilan Elegan di Smartphone</span>
      </div>
    </div>
  )
}

function SolutionWhatsAppMockup() {
  return (
    <div className="relative w-full h-full flex flex-col justify-between">
      <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
        <span className="text-[11px] font-bold text-neutral-700">WhatsApp Checkout</span>
        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
          0% Potongan
        </span>
      </div>

      <div className="bg-emerald-50/70 p-2.5 rounded-xl border border-emerald-200/70 text-[10px] text-emerald-950 space-y-1">
        <div className="font-bold text-emerald-900 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
          Format Otomatis Rapi:
        </div>
        <p className="font-mono text-[9px] text-emerald-800 leading-tight">
          &quot;Halo Kak, saya mau pesan 1x Kemeja Linen (L) ke Jakarta. Total: Rp 149.000...&quot;
        </p>
      </div>

      <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-[10px] text-neutral-700">
        <span className="text-emerald-700 font-bold">100% Uang ke Rekening Anda</span>
        <span className="text-neutral-600 font-medium">Tanpa Biaya Admin</span>
      </div>
    </div>
  )
}

function SolutionMobileAdminMockup() {
  return (
    <div className="relative w-full h-full flex flex-col justify-between">
      <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
        <span className="text-[11px] font-bold text-neutral-700">Panel Kelola Toko</span>
        <span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
          Bisa Lewat HP
        </span>
      </div>

      <div className="p-2.5 rounded-xl bg-neutral-50 border border-neutral-200/80 space-y-1.5 text-xs">
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-neutral-600 font-medium">Harga Produk:</span>
          <span className="font-bold text-neutral-900 text-[11px]">Rp 149.000</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-neutral-600 font-medium">Status Stok:</span>
          <span className="inline-flex items-center gap-1 text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded">
            ● Tersedia (Ready)
          </span>
        </div>
      </div>

      <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-[10px] text-neutral-700">
        <span className="text-neutral-800 font-medium">+ Tambah Foto Semudah Update Story</span>
      </div>
    </div>
  )
}

function SolutionGoogleSeoMockup() {
  return (
    <div className="relative w-full h-full flex flex-col justify-between">
      <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
        <span className="text-[11px] font-bold text-neutral-700">Google Search Result</span>
        <span className="text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">
          SEO Friendly
        </span>
      </div>

      <div className="p-2 rounded-xl bg-neutral-50 border border-neutral-200/80 space-y-1">
        <div className="text-[9px] text-neutral-600 font-mono truncate">
          tokosaya.com › katalog
        </div>
        <div className="text-[11px] font-bold text-blue-700 leading-tight">
          Toko Resmi Jualan Anda — Katalog &amp; Promo
        </div>
        <div className="text-[9px] text-neutral-600 line-clamp-1">
          Koleksi terlengkap, pesan langsung via WhatsApp resmi...
        </div>
      </div>

      <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-[10px] text-neutral-700">
        <span className="text-emerald-700 font-semibold flex items-center gap-1">
          <Check className="w-3 h-3 stroke-[3]" />
          <span>Terindeks Otomatis di Google</span>
        </span>
      </div>
    </div>
  )
}

function SolutionSupportMockup() {
  return (
    <div className="relative w-full h-full flex flex-col justify-between">
      <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
        <span className="text-[11px] font-bold text-neutral-700">Layanan Pendampingan</span>
        <span className="text-[10px] font-bold text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-full">
          Respon Cepat
        </span>
      </div>

      <div className="p-2.5 rounded-xl bg-purple-50/70 border border-purple-200/70 text-[10px] text-purple-950 space-y-1">
        <div className="font-bold text-purple-900 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>Support MarketingCode.ID:</span>
        </div>
        <p className="text-[9px] text-purple-800 leading-tight">
          &quot;Halo Kak! Ada yang perlu dibantu untuk update produk atau panduan website?&quot;
        </p>
      </div>

      <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-[10px] text-neutral-700">
        <span className="text-neutral-800 font-semibold">Siap Pandu Sampai Bisa</span>
        <span className="text-neutral-600 font-medium">Gratis Konsultasi</span>
      </div>
    </div>
  )
}

/* Mono eyebrow: decorative § NN · hairline · Icon + original eyebrow. */
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

export default function JasaPembuatanWebsitePage() {
  return (
    <div className="website-service min-h-screen font-sans bg-[#FBFBFB] text-[#18181B] antialiased selection:bg-[#FF5C28] selection:text-white">
      <JsonLd
        data={[
          serviceSchema(
            'Jasa Pembuatan Website & Toko Online Profesional',
            'Jasa pembuatan website & toko online profesional untuk UMKM & bisnis di seluruh Indonesia. Terima beres tanpa ribet koding, order otomatis ke WhatsApp, dan 100% hak milik tanpa sewa bulanan.',
            '/jasa-pembuatan-website',
          ),
          faqSchema(faqs),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Jasa Pembuatan Website', path: '/jasa-pembuatan-website' },
          ]),
        ]}
      />

      <main className="relative overflow-hidden">
        {/* ============================================================== */}
        {/* 1. HERO SECTION                                                */}
        {/* ============================================================== */}
        <div className="relative bg-paper-cream-glow bg-dot-fine pt-28 sm:pt-36 pb-16 sm:pb-24">
          <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <link
              rel="preload"
              as="image"
              href="/images/hero-illustration.avif"
              type="image/avif"
              media="(min-width: 641px)"
              fetchPriority="high"
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-12 items-center">
              <div className="lg:col-span-6 xl:col-span-6 space-y-6 text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FFF5F0] border border-orange-200/80 shadow-xs">
                  <Store className="w-3.5 h-3.5 text-[#C23605]" />
                  <span className="text-xs font-semibold text-[#C23605] tracking-tight">
                    Jasa Pembuatan Website &amp; Toko Online • Melayani Seluruh Indonesia
                  </span>
                </div>

                <h1
                  aria-label="Miliki Website Bisnis & Toko Online Profesional Tanpa Ribet Koding"
                  className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#111827] tracking-tight leading-[1.2] sm:leading-[1.14]"
                >
                  <span className="hidden sm:inline">Miliki </span>Website Bisnis &amp; Toko Online
                  Profesional{' '}
                  <span className="text-[#FF5C28]">
                    Tanpa <span className="hidden sm:inline">Ribet </span>Koding
                  </span>
                </h1>

                <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-normal max-w-xl">
                  Bebas dari potongan komisi marketplace yang makin tinggi. Pajang produk Anda
                  secara rapi, dan pembeli bisa langsung memesan via WhatsApp dalam satu klik.
                  Terima beres, siap pakai dari HP tanpa perlu paham koding.
                </p>

                {/* CTA Buttons */}
                <div className="pt-2 flex flex-col items-start gap-3">
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                    <a
                      href={getWhatsAppDirectUrl(
                        'Halo Admin MarketingCode.ID, saya mau konsultasi pembuatan website. Jenis usaha saya: ____',
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 text-sm sm:text-base font-semibold text-white bg-[#D13D00] hover:bg-[#B33400] rounded-full shadow-glow transition-all duration-300 transform hover:-translate-y-1 whitespace-nowrap"
                    >
                      <Image
                        src="/icons/flaticon/whatsapp.svg"
                        alt=""
                        width={20}
                        height={20}
                        className="w-5 h-5 shrink-0"
                      />
                      <span>Konsultasi via WhatsApp</span>
                    </a>
                    <a
                      href="#paket-harga"
                      className="inline-flex items-center justify-center px-6 py-3.5 text-sm sm:text-base font-semibold text-neutral-800 bg-white hover:border-[#D13D00] border border-neutral-200 rounded-full transition-all duration-300 text-center whitespace-nowrap"
                    >
                      <span>Lihat Paket &amp; Biaya</span>
                    </a>
                  </div>

                  {/* Founder Personal Touch Card */}
                  <div className="pt-3 border-t border-neutral-200/70 mt-2 flex items-center gap-3.5 bg-white/70 backdrop-blur-xs p-3.5 rounded-2xl border border-neutral-200/70 max-w-xl">
                    <div className="relative w-11 h-11 rounded-full overflow-hidden shadow-sm ring-2 ring-white shrink-0 bg-neutral-100">
                      <Image
                        src="/images/avatars/ahmad-khairol-m.webp"
                        alt="Ahmad Khairol M. - Lead Developer & Founder"
                        width={44}
                        height={44}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-left">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-xs sm:text-sm text-neutral-900">
                          Dikerjakan Langsung oleh Ahmad Khairol M.
                        </span>
                        <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.5 rounded font-semibold">
                          Lead Developer
                        </span>
                      </div>
                      <p className="text-[11px] sm:text-xs text-neutral-600 mt-0.5 leading-snug">
                        Full-stack web dev (5+ thn) • Ditangani personal &amp; terarah, bukan
                        diserahkan ke tim lepas pemula.
                      </p>
                    </div>
                  </div>

                  {/* 3 Real Guarantees Strip */}
                  <div className="pt-1 flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-1.5 text-xs text-neutral-700 font-medium">
                    <span className="flex items-center gap-1 text-[11px] sm:text-xs">
                      <Clock className="w-3.5 h-3.5 text-[#C23605]" /> Balas chat &lt; 10 menit
                    </span>
                    <span className="text-neutral-300">•</span>
                    <span className="flex items-center gap-1 text-[11px] sm:text-xs">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#C23605]" /> Garansi 7 hari uang
                      kembali
                    </span>
                    <span className="text-neutral-300">•</span>
                    <span className="flex items-center gap-1 text-[11px] sm:text-xs">
                      <Sparkles className="w-3.5 h-3.5 text-[#C23605]" /> Revisi desain sampai puas
                    </span>
                  </div>
                </div>
              </div>

              {/* Hero Visual Image */}
              <div className="lg:col-span-6 xl:col-span-6 flex justify-center lg:justify-end items-center">
                <div className="relative w-full max-w-lg sm:max-w-xl lg:max-w-none">
                  <div
                    className="absolute -inset-6 bg-gradient-to-tr from-[#38bdf8]/15 via-[#FF5C28]/10 to-transparent rounded-full blur-3xl -z-10"
                    aria-hidden="true"
                  />
                  <picture>
                    <source
                      media="(max-width: 640px)"
                      srcSet="/images/hero-illustration-mobile.avif"
                      type="image/avif"
                    />
                    <source
                      media="(max-width: 640px)"
                      srcSet="/images/hero-illustration-mobile.webp"
                      type="image/webp"
                    />
                    <source srcSet="/images/hero-illustration.avif" type="image/avif" />
                    <source srcSet="/images/hero-illustration.webp" type="image/webp" />
                    <img
                      src="/images/hero-illustration.png"
                      alt="Layanan Pembuatan Website dan Toko Online MarketingCode.ID"
                      title="Website Toko Online Profesional MarketingCode.ID"
                      width={1024}
                      height={682}
                      loading="eager"
                      fetchPriority="high"
                      decoding="async"
                      className="w-full h-auto object-contain drop-shadow-2xl hover:scale-[1.02] transition-transform duration-500 ease-out"
                    />
                  </picture>
                </div>
              </div>
            </div>

            {/* Ecosystem Strip (Kanal Penjualan) Redesigned Banner */}
            <div className="mt-8 sm:mt-12 bg-white/95 rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-neutral-200/90 shadow-md shadow-neutral-900/5 max-w-5xl mx-auto">
              <div className="flex items-center justify-between gap-2 pb-3 mb-3.5 border-b border-neutral-100">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-neutral-800">
                    Ekosistem Toko Mandiri Anda
                  </span>
                </div>
                <span className="text-[10px] sm:text-xs font-bold text-[#C23605] bg-[#FFF5F0] border border-orange-200/70 px-2.5 py-0.5 rounded-full">
                  Multi-Kanal Terpadu
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                {/* Channel 1: Marketplace */}
                <div className="bg-neutral-50/90 hover:bg-neutral-50 rounded-xl p-3 border border-neutral-200/70 flex flex-col justify-between transition-all group">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0">
                        <Store className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded-md">
                        Tetap Jalan
                      </span>
                    </div>
                    <div className="font-bold text-neutral-900 text-xs sm:text-sm">
                      Shopee &amp; Tokopedia
                    </div>
                    <p className="text-[11px] text-neutral-600 mt-1 leading-snug">
                      Tetap aktif menjaring calon pembeli baru dari luar.
                    </p>
                  </div>
                </div>

                {/* Channel 2: Social Media */}
                <div className="bg-neutral-50/90 hover:bg-neutral-50 rounded-xl p-3 border border-neutral-200/70 flex flex-col justify-between transition-all group">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0">
                        <Smartphone className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[9px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-1.5 py-0.5 rounded-md">
                        Kanal Promosi
                      </span>
                    </div>
                    <div className="font-bold text-neutral-900 text-xs sm:text-sm">
                      Instagram &amp; TikTok
                    </div>
                    <p className="text-[11px] text-neutral-600 mt-1 leading-snug">
                      Konten &amp; link bio diarahkan langsung ke web toko.
                    </p>
                  </div>
                </div>

                {/* Channel 3: Official Store & WA (Hero Pillar) */}
                <div className="bg-gradient-to-br from-[#FFF7ED] to-[#FFEDD5] rounded-xl p-3 border-2 border-[#FF5C28]/40 shadow-xs flex flex-col justify-between relative overflow-hidden group">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-6 h-6 rounded-lg bg-[#FF5C28] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                        <ShoppingBag className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[9px] font-extrabold text-[#C23605] bg-white border border-orange-300 px-1.5 py-0.5 rounded-md shadow-xs">
                        Order 0% Potongan
                      </span>
                    </div>
                    <div className="font-extrabold text-[#C23605] text-xs sm:text-sm">
                      Website &amp; WhatsApp
                    </div>
                    <p className="text-[11px] text-neutral-700 mt-1 leading-snug font-medium">
                      Semua transaksi 100% masuk rekening Anda tanpa komisi.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-3.5 pt-2.5 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-600">
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  Kombinasi terbaik: pembeli tetap banyak, keuntungan 100% milik Anda
                </span>
              </div>
            </div>
          </section>
        </div>

        {/* ============================================================== */}
        {/* 2. MASALAH NYATA UMKM                                          */}
        {/* ============================================================== */}
        <div className="relative bg-paper-warm section-rule py-20 sm:py-24">
          <section className="relative max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <SectionMark num="02" icon={Percent} eyebrow="Tantangan Bisnis Saat Ini" />
              <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
                Sebagian Besar Pemilik Usaha Mengalami 4 Hal Ini
              </h2>
              <p className="text-neutral-600 text-sm sm:text-base mt-2 max-w-2xl mx-auto leading-relaxed">
                Jika Anda merasakan hal yang sama, memiliki website sendiri adalah langkah terbaik
                berikutnya untuk mengamankan keuntungan dan masa depan usaha Anda.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {problems.map((item, idx) => (
                <div
                  key={item.number}
                  className="bg-white rounded-3xl p-3.5 sm:p-4 border border-neutral-200/80 shadow-card hover:border-[#FF5C28] hover:shadow-xl hover:shadow-orange-500/5 transition-all duration-300 flex flex-col justify-between group"
                >
                  {/* Visual Preview Area (Mockup with Circuit Wireframe - Reference Design) */}
                  <div className="relative h-64 sm:h-72 rounded-2xl bg-[#F8F9FB] border border-neutral-200/60 overflow-hidden flex flex-col items-center justify-center p-3 sm:p-4 select-none">
                    {idx === 0 && <ProblemMarginMockup />}
                    {idx === 1 && <ProblemCompetitorMockup />}
                    {idx === 2 && <ProblemDataLockedMockup />}
                    {idx === 3 && <ProblemCredibilityMockup />}
                  </div>

                  {/* Text Content Area */}
                  <div className="px-3 sm:px-4 pt-4 sm:pt-5 pb-2 sm:pb-3">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-700 text-[11px] font-bold mb-2.5">
                      <span>Tantangan {item.number}</span>
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

        {/* ============================================================== */}
        {/* 3. 6 KEUNTUNGAN LANGSUNG AKTIF                                 */}
        {/* ============================================================== */}
        <div className="relative bg-paper-right-glow bg-dot-fine py-20 sm:py-24 overflow-hidden">
          <section className="relative max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <SectionMark num="03" icon={Sparkles} eyebrow="Keuntungan Nyata Sejak Hari Pertama" />
              <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
                6 Hal yang Langsung Aktif di Website Toko Anda
              </h2>
              <p className="text-neutral-600 text-sm sm:text-base mt-2 max-w-2xl mx-auto leading-relaxed">
                Bukan janji kosong atau fitur tambahan berbayar. Seluruh fondasi ini kami siapkan
                lengkap sejak awal agar toko Anda langsung siap jualan.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
              {solutions.map((item, idx) => (
                <div
                  key={item.title}
                  className="bg-[#F8F7F4] rounded-3xl p-6 sm:p-7 border border-neutral-200/70 shadow-sm hover:shadow-xl hover:border-orange-300 transition-all duration-300 group flex flex-col justify-between"
                >
                  <div>
                    {/* Top Squircle Icon with 3D Gradient */}
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-md ${solutionGradients[idx]}`}
                    >
                      <item.icon className="w-6 h-6" />
                    </div>

                    {/* Title directly below icon */}
                    <h3 className="text-xl font-bold text-neutral-900 group-hover:text-[#C23205] transition-colors leading-snug tracking-tight mt-4 sm:mt-5 mb-5 sm:mb-6">
                      {item.title}
                    </h3>

                    {/* Middle Elevated White Mockup */}
                    <div className="relative bg-white rounded-2xl p-4 sm:p-5 border border-neutral-200/80 shadow-xs min-h-[200px] flex flex-col justify-between group-hover:scale-[1.01] transition-transform duration-300">
                      {idx === 0 && <SolutionDomainMockup />}
                      {idx === 1 && <SolutionDesignMockup />}
                      {idx === 2 && <SolutionWhatsAppMockup />}
                      {idx === 3 && <SolutionMobileAdminMockup />}
                      {idx === 4 && <SolutionGoogleSeoMockup />}
                      {idx === 5 && <SolutionSupportMockup />}
                    </div>
                  </div>

                  {/* Bottom Description */}
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mt-4 sm:mt-5">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* ============================================================== */}
        {/* HASIL KARYA WEBSITE TERPILIH (PROVEN REAL RESULTS)             */}
        {/* ============================================================== */}
        <div className="relative bg-paper-warm section-rule py-16 sm:py-20 overflow-hidden">
          <section className="relative max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2.5 mb-8 px-1">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200/80 text-[#C23605] text-[11px] font-bold">
                  <ExternalLink className="w-3 h-3" />
                  <span>Hasil Karya Website Nyata</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 mt-2 tracking-tight">
                  Contoh Website &amp; Toko Klien yang Sudah Mengudara
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-neutral-600 font-medium max-w-md">
                Lintas industri: Travel &amp; Jasa, Portal Instansi, hingga Toko Online UMKM.
                Didesain responsif mobile-first, cepat diakses dari HP, dan pesanan terhubung
                langsung ke WhatsApp.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* Card 1: AGAN TRANS */}
              <div className="bg-white rounded-3xl border border-neutral-200/80 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col group">
                <div className="relative aspect-[16/10] bg-neutral-100 overflow-hidden">
                  <img
                    src="/images/porto-2.webp"
                    alt="Website Travel Bandung Bali AGAN TRANS"
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
                      Travel &amp; Booking WhatsApp
                    </span>
                    <h3 className="font-bold text-base text-neutral-900 leading-snug">
                      AGAN TRANS (Travel Bandung Bali)
                    </h3>
                    <a
                      href="https://travelbandungbali.id/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-neutral-500 hover:text-[#C23605] mt-1.5 inline-flex items-center gap-1 transition-colors"
                      title="Kunjungi travelbandungbali.id"
                    >
                      <span>travelbandungbali.id</span>
                      <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                    </a>
                  </div>
                  <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
                    <span className="text-emerald-800 font-bold bg-emerald-100/90 px-2.5 py-0.5 rounded-md">
                      +320% Booking Tiket WA
                    </span>
                    <span className="text-neutral-500 font-medium">Google #1</span>
                  </div>
                </div>
              </div>

              {/* Card 2: Youthpreneur */}
              <div className="bg-white rounded-3xl border border-neutral-200/80 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col group">
                <div className="relative aspect-[16/10] bg-neutral-100 overflow-hidden">
                  <img
                    src="/images/porto-1.webp"
                    alt="Platform Inkubasi Wirausaha Dispora Tapin"
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
                      Portal Wirausaha &amp; UMKM
                    </span>
                    <h3 className="font-bold text-base text-neutral-900 leading-snug">
                      Youthpreneur Dispora Kab. Tapin
                    </h3>
                    <a
                      href="https://youthpreneur.tapinkab.go.id/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-neutral-500 hover:text-[#C23605] mt-1.5 inline-flex items-center gap-1 transition-colors"
                      title="Kunjungi youthpreneur.tapinkab.go.id"
                    >
                      <span>youthpreneur.tapinkab.go.id</span>
                      <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                    </a>
                  </div>
                  <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
                    <span className="text-emerald-800 font-bold bg-emerald-100/90 px-2.5 py-0.5 rounded-md">
                      900+ Usaha Terdata
                    </span>
                    <span className="text-neutral-500 font-medium">Akses Cepat HP</span>
                  </div>
                </div>
              </div>

              {/* Card 3: Si Akoor */}
              <div className="bg-white rounded-3xl border border-neutral-200/80 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col group">
                <div className="relative aspect-[16/10] bg-neutral-100 overflow-hidden">
                  <img
                    src="/images/porto-3.webp"
                    alt="Sistem Informasi Si Akoor Sekretariat DPRD"
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
                      Sistem Informasi &amp; Portal
                    </span>
                    <h3 className="font-bold text-base text-neutral-900 leading-snug">
                      Si Akoor Sekretariat DPRD
                    </h3>
                    <a
                      href="https://siakoor.tapinkab.go.id/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-neutral-500 hover:text-[#C23605] mt-1.5 inline-flex items-center gap-1 transition-colors"
                      title="Kunjungi siakoor.tapinkab.go.id"
                    >
                      <span>siakoor.tapinkab.go.id</span>
                      <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                    </a>
                  </div>
                  <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
                    <span className="text-emerald-800 font-bold bg-emerald-100/90 px-2.5 py-0.5 rounded-md">
                      100% Akurat Presisi
                    </span>
                    <span className="text-neutral-500 font-medium">GPS Geofencing</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

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

        {/* ============================================================== */}
        {/* 4. PAKET & HARGA TRANSPARAN (HOMEPAGE BENCHMARK)                */}
        {/* ============================================================== */}
        <div className="relative bg-paper-cream py-20 sm:py-24 overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-blueprint opacity-70"
          />
          <section id="paket-harga" className="relative max-w-6xl mx-auto px-4 sm:px-6">
            <div className="frame-ticks bg-[#FBFBFB]/70 px-3 sm:px-8 lg:px-10 py-10 sm:py-14">
              <div className="text-center mb-10">
                <SectionMark num="04" icon={Tag} eyebrow="Pilihan Paket Transparan" />
                <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
                  Investasi Transparan Sesuai Skala Usaha Anda
                </h2>
                <p className="text-neutral-600 text-sm sm:text-base mt-2 max-w-2xl mx-auto leading-relaxed">
                  Bayar sekali tanpa biaya sewa sistem bulanan. Sudah termasuk nama domain resmi
                  (.com / .id), cloud server cepat 1 tahun pertama, dan garansi pemeliharaan resmi.
                </p>

                {/* Honest Boutique Scarcity Trigger */}
                <div className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFF5F0] border border-orange-200/80 text-xs sm:text-sm font-semibold text-[#C23605] shadow-xs text-left">
                  <span className="flex h-2 w-2 rounded-full bg-[#C23605] animate-pulse shrink-0" />
                  <span>
                    Slot Terbatas Bulan Ini: Maksimal 10 klien per bulan demi pengerjaan teliti
                    &amp; pendampingan intensif.
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch text-left">
                {pricingPackages.map((item) => {
                  const isHighlight = item.isPopular

                  return (
                    <div
                      key={item.tier}
                      className={`bg-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative ${
                        isHighlight
                          ? 'border-2 border-[#FF5C28] shadow-xl shadow-orange-500/10 lg:-translate-y-2 lg:scale-[1.02] z-10'
                          : 'border border-neutral-200/80 shadow-card hover:border-orange-200/80 hover:shadow-lg'
                      }`}
                    >
                      {/* Decoy Top Badge */}
                      {isHighlight && (
                        <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#FF5C28] to-[#EA4510] text-white text-[11px] font-extrabold px-4 py-1 rounded-full uppercase tracking-wider shadow-md flex items-center gap-1.5 whitespace-nowrap z-20">
                          <Sparkles className="w-3 h-3" />
                          <span>{item.badgeTop}</span>
                        </div>
                      )}

                      <div>
                        <div className="h-8 flex items-center mb-3">
                          {item.topHighlightNote ? (
                            <div className="px-3 py-1 rounded-xl bg-orange-50 border border-orange-200/80 text-[11px] font-bold text-[#C23605] flex items-center gap-1.5">
                              <Sparkles className="w-3.5 h-3.5 shrink-0" />
                              <span>{item.topHighlightNote}</span>
                            </div>
                          ) : item.badgeTop ? (
                            <span className="inline-flex items-center text-[11px] font-bold text-neutral-600 bg-neutral-100 border border-neutral-200/80 px-2.5 py-0.5 rounded-full">
                              {item.badgeTop}
                            </span>
                          ) : null}
                        </div>

                        <h3 className="text-xl font-extrabold text-neutral-900 tracking-tight min-h-[3.25rem] flex items-center">
                          {item.tier}
                        </h3>

                        <p className="text-xs sm:text-[13px] text-neutral-600 mt-2 leading-relaxed min-h-[58px]">
                          {item.desc}
                        </p>

                        {/* Price with anchoring */}
                        <div className="mt-5 pt-4 border-t border-neutral-100 min-h-[120px] flex flex-col justify-between">
                          <div>
                            {item.originalPrice && (
                              <div className="flex flex-col-reverse items-center gap-2 mb-1">
                                <span className="text-xs sm:text-sm text-neutral-500 line-through font-medium">
                                  {item.originalPrice}
                                </span>
                                <span className="text-[10px] font-bold text-[#C23605] bg-[#FFF5F0] border border-orange-200/60 px-2 py-0.5 rounded-full">
                                  Promo Bulan Ini (Maks. 10 Slot)
                                </span>
                              </div>
                            )}
                            <div className="flex items-baseline gap-1.5 flex-wrap">
                              <span className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
                                {item.price}
                              </span>
                              <span className="text-xs text-neutral-500 font-medium">
                                {item.unit}
                              </span>
                            </div>
                          </div>
                          <div className="mt-2 min-h-[28px] flex items-center">
                            {item.installmentNote ? (
                              <div className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 rounded-lg flex items-center gap-1.5 w-full">
                                <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                                <span className="leading-tight">{item.installmentNote}</span>
                              </div>
                            ) : (
                              <span className="text-[11px] text-neutral-400 font-medium pl-0.5">
                                Pembayaran bertahap DP 50% tersedia
                              </span>
                            )}
                          </div>
                        </div>

                        {/* CTA Button */}
                        <a
                          href={item.directUrl || getWhatsAppUrl('website', item.subject)}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={item.ariaLabel || `Pesan Paket via WhatsApp (${item.tier})`}
                          className={`mt-5 w-full py-3 px-5 font-bold text-xs sm:text-sm rounded-full flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
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

                        {item.bonusStack && (
                          <div className="mt-4 px-3 py-2 rounded-xl bg-emerald-50 border border-emerald-200/80 text-[11px] text-emerald-900 flex items-start gap-1.5 shadow-xs">
                            <Sparkles className="w-3.5 h-3.5 shrink-0 mt-0.5 text-emerald-600" />
                            <span>
                              <strong className="font-bold">BONUS: </strong>
                              {item.bonusStack}
                            </span>
                          </div>
                        )}

                        {/* Feature Checklist */}
                        <div className="mt-6 pt-6 border-t border-neutral-100 space-y-3 text-xs sm:text-[13px] text-neutral-700">
                          {item.features.map((feat, idx) => (
                            <div key={idx} className="flex items-start gap-2.5">
                              <div className="w-4 h-4 rounded-full bg-orange-100 text-[#C23605] flex items-center justify-center shrink-0 mt-0.5">
                                <Check className="w-2.5 h-2.5 stroke-[3]" />
                              </div>
                              <span className="leading-snug">{feat}</span>
                            </div>
                          ))}
                        </div>

                        {/* Optional Limitation Note */}
                        {item.limitationNote && (
                          <div className="mt-4 p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/80 text-[11px] text-amber-900 leading-snug">
                            {item.limitationNote}
                          </div>
                        )}
                      </div>

                      {/* Card Footer info */}
                      <div className="mt-6 pt-4 border-t border-neutral-100 space-y-1.5">
                        {item.renewal && (
                          <div className="text-[11px] text-neutral-500 flex items-start gap-1.5 bg-neutral-50 p-2 rounded-xl border border-neutral-100">
                            <Clock className="w-3.5 h-3.5 text-neutral-500 shrink-0 mt-0.5" />
                            <span className="leading-tight">{item.renewal}</span>
                          </div>
                        )}
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

              {/* Flexible Payment Terms Banner (Section 3.2 point 3) */}
              <div className="mt-6 max-w-4xl mx-auto p-4 rounded-2xl bg-white border border-neutral-200/90 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-start sm:items-center gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5 sm:mt-0" />
                  <div>
                    <span className="font-bold text-neutral-900">
                      Skema Pembayaran Fleksibel &amp; Aman:{' '}
                    </span>
                    <span className="text-neutral-600">
                      Tersedia opsi pembayaran DP 50% di awal saat kesepakatan pengerjaan, dan sisa
                      pelunasan 50% setelah website selesai diverifikasi serta siap mengudara.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* ============================================================== */}
        {/* SUARA PENGGUNA (BUKTI & TESTIMONI KLIEN REAL)                  */}
        {/* ============================================================== */}
        <div className="relative bg-paper-warm section-rule py-20 sm:py-24 overflow-hidden">
          <TestimonialsSection variant="website" className="mt-0" />
        </div>

        {/* ============================================================== */}
        {/* 5. ALUR KERJA TERIMA BERES                                     */}
        {/* ============================================================== */}
        <div className="relative bg-ink-panel py-20 sm:py-24 overflow-hidden">
          <section className="relative max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b-2 border-white/20">
              <span className="font-semibold text-[11px] sm:text-xs tracking-[0.28em] uppercase text-[#FF5C28]">
                <span aria-hidden="true">§ 05 · </span>Alur Pengerjaan
              </span>
              <span className="font-semibold text-[11px] sm:text-xs tracking-[0.28em] uppercase text-neutral-300">
                Proses Mudah &amp; Terima Beres
              </span>
            </div>

            <div className="mt-10 lg:mt-14 mb-14 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end text-left">
              <h2 className="lg:col-span-8 font-extrabold text-3xl sm:text-4xl lg:text-[3rem] text-white leading-[1.2] tracking-tight">
                Alur pembuatan mudah, Anda cukup kirim materi produk lewat chat.
              </h2>
              <div className="lg:col-span-4 space-y-3">
                <p className="font-medium text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  Tidak ada proses rumit yang menyita waktu Anda. Cukup sediakan foto barang dan
                  daftar harga, sisanya tim kami yang selesaikan sampai siap pakai.
                </p>
                <div className="flex items-center gap-3 pt-1">
                  <span className="w-8 h-px bg-[#FF5C28]" />
                  <span className="font-semibold text-[10px] tracking-[0.24em] uppercase text-neutral-300">
                    Praktis, Cepat &amp; Transparan
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

        {/* ============================================================== */}
        {/* 6. LAYANAN PURNA JUAL (SETELAH LIVE TIDAK DITINGGAL)            */}
        {/* ============================================================== */}
        <div className="relative bg-paper-warm section-rule py-20 sm:py-24">
          <section className="relative max-w-6xl mx-auto px-4 sm:px-6">
            <div className="bg-gradient-to-br from-[#FFF5F0] via-white to-orange-50/50 rounded-3xl p-8 sm:p-12 border border-orange-200/80 shadow-card">
              <div className="max-w-3xl">
                <div className="mb-3 flex items-center gap-2.5 text-neutral-600">
                  <span
                    aria-hidden="true"
                    className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-500"
                  >
                    § 06
                  </span>
                  <span aria-hidden="true" className="h-px w-8 bg-neutral-300" />
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-700">
                    <Users aria-hidden="true" className="h-3.5 w-3.5 text-[#C23605]" />
                    <span>Komitmen Layanan Purna Jual</span>
                  </span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
                  Setelah Website Live, Anda Tidak Ditinggal Sendirian
                </h2>
                <p className="text-sm sm:text-base text-neutral-600 mt-3 leading-relaxed">
                  Banyak pemilik usaha ragu membuat website karena takut tidak bisa
                  mengoperasikannya atau ditinggal begitu saja oleh pembuatnya. Di MarketingCode.ID,
                  kami mendampingi Anda sampai benar-benar lancar.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
                <div className="bg-white p-6 rounded-2xl border border-neutral-200/80 shadow-xs flex flex-col justify-between">
                  <div>
                    <span className="w-8 h-8 rounded-xl bg-orange-100 text-[#C23605] font-bold text-xs flex items-center justify-center mb-3">
                      01
                    </span>
                    <h3 className="font-bold text-base text-neutral-900">
                      Jalur Chat WhatsApp Langsung
                    </h3>
                    <p className="text-xs sm:text-[13px] text-neutral-500 mt-2 leading-relaxed">
                      Terhubung langsung dengan developer &amp; tim teknis. Bukan bot otomatis atau
                      antrean tiket yang lama dibalas.
                    </p>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-neutral-200/80 shadow-xs flex flex-col justify-between">
                  <div>
                    <span className="w-8 h-8 rounded-xl bg-orange-100 text-[#C23605] font-bold text-xs flex items-center justify-center mb-3">
                      02
                    </span>
                    <h3 className="font-bold text-base text-neutral-900">Bantuan Update Ringan</h3>
                    <p className="text-xs sm:text-[13px] text-neutral-500 mt-2 leading-relaxed">
                      Mau ganti banner promo, ubah info kontak, atau update harga? Cukup chat kami,
                      kami bantu pengerjaannya.
                    </p>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-neutral-200/80 shadow-xs flex flex-col justify-between">
                  <div>
                    <span className="w-8 h-8 rounded-xl bg-orange-100 text-[#C23605] font-bold text-xs flex items-center justify-center mb-3">
                      03
                    </span>
                    <h3 className="font-bold text-base text-neutral-900">
                      Garansi 1 Tahun &amp; 7 Hari Uang Kembali
                    </h3>
                    <p className="text-xs sm:text-[13px] text-neutral-500 mt-2 leading-relaxed">
                      Garansi pemeliharaan 1 tahun penuh, monitoring server, dan garansi 7 hari uang
                      kembali jika konsep awal tidak sesuai brief.
                    </p>
                  </div>
                </div>
              </div>

              {/* Mini-CTA for Section 6 */}
              <div className="mt-8 pt-6 border-t border-orange-200/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="font-bold text-sm text-neutral-900">
                    Punya pertanyaan spesifik seputar garansi &amp; layanan purna jual?
                  </div>
                  <p className="text-xs text-neutral-600 mt-0.5">
                    Diskusikan kebutuhan toko Anda langsung dengan developer kami tanpa ragu.
                  </p>
                </div>
                <a
                  href={getWhatsAppDirectUrl(
                    'Halo Admin MarketingCode.ID, saya ingin tanya detail garansi dan layanan purna jual website.',
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Tanya Garansi dan Purna Jual via WhatsApp"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-orange-50 border border-neutral-300 hover:border-[#C23605] text-[#C23605] text-xs font-bold transition-all shadow-xs shrink-0 whitespace-nowrap"
                >
                  <Image
                    src="/icons/flaticon/whatsapp.svg"
                    alt=""
                    width={16}
                    height={16}
                    className="w-4 h-4 shrink-0"
                  />
                  <span>Tanya Garansi via WhatsApp</span>
                </a>
              </div>
            </div>
          </section>
        </div>

        {/* ============================================================== */}
        {/* 7. TABEL KOMPARASI (KENAPA WEBSITE SENDIRI MENANG)             */}
        {/* ============================================================== */}
        <div className="relative bg-paper-right-glow py-20 sm:py-24 overflow-hidden">
          <section className="relative max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b-2 border-neutral-900">
              <span className="font-semibold text-[11px] sm:text-xs tracking-[0.28em] uppercase text-[#FF5C28]">
                <span aria-hidden="true">§ 07 · </span>Perbandingan
              </span>
              <span className="font-semibold text-[11px] sm:text-xs tracking-[0.28em] uppercase text-neutral-500">
                MarketingCode.ID vs Solusi Lain
              </span>
            </div>

            <div className="mt-8 sm:mt-12 mb-8 sm:mb-12 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end">
              <div className="lg:col-span-8 space-y-3">
                <h2 className="text-3xl sm:text-4xl lg:text-[3rem] font-extrabold text-neutral-900 leading-[1.2] tracking-tight">
                  Kenapa website toko sendiri jauh lebih menguntungkan jangka panjang.
                </h2>
              </div>
              <div className="lg:col-span-4 space-y-3">
                <p className="font-medium text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  Marketplace cocok untuk pelengkap. Tapi untuk membangun aset bisnis yang kuat dan
                  bebas potongan komisi, website sendiri adalah investasi paling aman.
                </p>
              </div>
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block bg-white border border-neutral-200/90 rounded-3xl overflow-hidden shadow-card">
              <div className="grid grid-cols-[1.4fr_1fr_1fr_1fr] border-b-2 border-neutral-900">
                <div className="p-5 lg:p-6 font-semibold text-[11px] tracking-[0.28em] uppercase text-neutral-500 flex items-center">
                  Kriteria Pembanding
                </div>
                <div className="p-5 lg:p-6 border-l border-neutral-200 bg-neutral-900 text-white">
                  <div className="font-extrabold text-lg lg:text-xl leading-tight text-white">
                    MarketingCode.ID
                  </div>
                  <div className="font-semibold text-[10px] tracking-[0.22em] uppercase mt-1 text-[#FF5C28]">
                    Website Milik Sendiri • Terima Beres
                  </div>
                </div>
                <div className="p-5 lg:p-6 border-l border-neutral-200">
                  <div className="font-extrabold text-lg lg:text-xl leading-tight text-neutral-900">
                    Marketplace
                  </div>
                  <div className="font-semibold text-[10px] tracking-[0.22em] uppercase mt-1 text-neutral-500">
                    Shopee / Tokopedia • Bagus Tes Pasar
                  </div>
                </div>
                <div className="p-5 lg:p-6 border-l border-neutral-200">
                  <div className="font-extrabold text-lg lg:text-xl leading-tight text-neutral-900">
                    Bikin Sendiri (DIY)
                  </div>
                  <div className="font-semibold text-[10px] tracking-[0.22em] uppercase mt-1 text-neutral-500">
                    WordPress / Wix • Bagus Belajar Koding
                  </div>
                </div>
              </div>

              {comparisonRows.map((row, idx) => (
                <div
                  key={row.number}
                  className={`grid grid-cols-[1.4fr_1fr_1fr_1fr] ${
                    idx !== comparisonRows.length - 1 ? 'border-b border-neutral-200/80' : ''
                  }`}
                >
                  <div className="p-5 lg:p-6 flex items-center gap-3">
                    <span className="font-semibold text-[10px] tracking-[0.22em] uppercase text-[#FF5C28] min-w-[2rem]">
                      {row.number}
                    </span>
                    <span className="font-semibold text-sm lg:text-base text-neutral-900">
                      {row.criteria}
                    </span>
                  </div>

                  <div className="p-5 lg:p-6 border-l border-neutral-200 flex items-center gap-2.5 bg-[#FF5C28]/5">
                    <StatusIcon
                      status={row.marketingCode.status as 'check' | 'cross' | 'neutral'}
                    />
                    <span className="text-sm leading-snug font-semibold text-neutral-900">
                      {row.marketingCode.text}
                    </span>
                  </div>

                  <div className="p-5 lg:p-6 border-l border-neutral-200 flex items-center gap-2.5">
                    <StatusIcon status={row.marketplace.status as 'check' | 'cross' | 'neutral'} />
                    <span className="text-sm leading-snug font-medium text-neutral-600">
                      {row.marketplace.text}
                    </span>
                  </div>

                  <div className="p-5 lg:p-6 border-l border-neutral-200 flex items-center gap-2.5">
                    <StatusIcon status={row.diy.status as 'check' | 'cross' | 'neutral'} />
                    <span className="text-sm leading-snug font-medium text-neutral-600">
                      {row.diy.text}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Stacked View */}
            <div className="md:hidden space-y-4">
              <div className="rounded-3xl p-6 border bg-neutral-900 border-[#FF5C28] text-white shadow-xl">
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/15">
                  <div>
                    <div className="font-extrabold text-lg text-white">MarketingCode.ID</div>
                    <div className="font-semibold text-[10px] tracking-[0.22em] uppercase text-[#FF5C28]">
                      Website Milik Sendiri
                    </div>
                  </div>
                  <span className="text-[10px] tracking-wider uppercase font-bold bg-[#C23605] text-white px-2.5 py-1 rounded-full">
                    Pilihan Terbaik
                  </span>
                </div>
                <ul className="space-y-3.5">
                  {comparisonRows.map((row) => (
                    <li key={row.number} className="flex items-start gap-3">
                      <StatusIcon
                        status={row.marketingCode.status as 'check' | 'cross' | 'neutral'}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-xs text-white/60">{row.criteria}</div>
                        <div className="font-medium text-sm text-white mt-0.5">
                          {row.marketingCode.text}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-3xl p-6 border bg-white border-neutral-200 text-neutral-900 shadow-sm">
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-neutral-200">
                  <div>
                    <div className="font-extrabold text-lg text-neutral-900">Marketplace</div>
                    <div className="font-semibold text-[10px] tracking-[0.22em] uppercase text-neutral-500">
                      Shopee / Tokopedia • Bagus Tes Pasar
                    </div>
                  </div>
                </div>
                <ul className="space-y-3.5">
                  {comparisonRows.map((row) => (
                    <li key={row.number} className="flex items-start gap-3">
                      <StatusIcon
                        status={row.marketplace.status as 'check' | 'cross' | 'neutral'}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-xs text-neutral-500">{row.criteria}</div>
                        <div className="font-medium text-sm text-neutral-800 mt-0.5">
                          {row.marketplace.text}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-3xl p-6 border bg-white border-neutral-200 text-neutral-900 shadow-sm">
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-neutral-200">
                  <div>
                    <div className="font-extrabold text-lg text-neutral-900">
                      Bikin Sendiri (DIY)
                    </div>
                    <div className="font-semibold text-[10px] tracking-[0.22em] uppercase text-neutral-500">
                      WordPress / Wix • Bagus Belajar Koding
                    </div>
                  </div>
                </div>
                <ul className="space-y-3.5">
                  {comparisonRows.map((row) => (
                    <li key={row.number} className="flex items-start gap-3">
                      <StatusIcon status={row.diy.status as 'check' | 'cross' | 'neutral'} />
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-xs text-neutral-500">{row.criteria}</div>
                        <div className="font-medium text-sm text-neutral-800 mt-0.5">
                          {row.diy.text}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </div>

        {/* ============================================================== */}
        {/* 8. JANGKAUAN LAYANAN NASIONAL (SELURUH INDONESIA)              */}
        {/* ============================================================== */}
        <div className="relative bg-ink-panel py-20 sm:py-24 overflow-hidden">
          <section className="relative max-w-6xl mx-auto px-4 sm:px-6">
            <div className="rounded-3xl p-6 sm:p-10 border border-white/15 bg-transparent space-y-8">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="max-w-2xl space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      aria-hidden="true"
                      className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-neutral-300"
                    >
                      § 08
                    </span>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.08] border border-white/15 text-orange-200 text-xs font-semibold">
                      <Globe aria-hidden="true" className="w-3.5 h-3.5" />
                      <span>Melayani Klien Seluruh Indonesia</span>
                    </div>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    Solusi Website &amp; Toko Online untuk Pengusaha di Seluruh Indonesia
                  </h2>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed pt-1">
                    Seluruh proses konsultasi, pengiriman materi produk, hingga serah terima website
                    dapat dilakukan 100% online secara profesional dan transparan via WhatsApp.
                  </p>
                </div>
                <a
                  href={getWhatsAppDirectUrl(
                    'Halo Admin MarketingCode.ID, saya ingin cek ketersediaan slot pengerjaan website untuk bulan ini.',
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Cek Ketersediaan Slot Bulan Ini via WhatsApp"
                  className="inline-flex items-center px-7 py-3.5 bg-[#D13D00] hover:bg-[#B33400] text-white font-bold text-xs sm:text-sm rounded-full shadow-glow transition-all whitespace-nowrap shrink-0 self-start lg:self-center"
                >
                  <span>Cek Slot Pengerjaan Bulan Ini</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </div>

              {/* 4 Region Coverage Grid (Section 3.10) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-4 border-t border-white/10 text-xs">
                <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1">
                  <span className="font-bold text-orange-300 uppercase tracking-wider text-[10px] block">
                    Wilayah Barat
                  </span>
                  <div className="font-extrabold text-white text-sm">Sumatera &amp; Kepulauan</div>
                  <p className="text-[11px] text-neutral-300 leading-snug">
                    Medan, Palembang, Pekanbaru, Padang, Lampung, Batam
                  </p>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1">
                  <span className="font-bold text-orange-300 uppercase tracking-wider text-[10px] block">
                    Wilayah Utama
                  </span>
                  <div className="font-extrabold text-white text-sm">Jawa &amp; Bali</div>
                  <p className="text-[11px] text-neutral-300 leading-snug">
                    Jabodetabek, Bandung, Semarang, Jogja, Surabaya, Denpasar
                  </p>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1">
                  <span className="font-bold text-orange-300 uppercase tracking-wider text-[10px] block">
                    Wilayah Tengah
                  </span>
                  <div className="font-extrabold text-white text-sm">Kalimantan</div>
                  <p className="text-[11px] text-neutral-300 leading-snug">
                    Banjarmasin, Balikpapan, Samarinda, Pontianak, IKN
                  </p>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1">
                  <span className="font-bold text-orange-300 uppercase tracking-wider text-[10px] block">
                    Wilayah Timur
                  </span>
                  <div className="font-extrabold text-white text-sm">Sulawesi, NTB &amp; Papua</div>
                  <p className="text-[11px] text-neutral-300 leading-snug">
                    Makassar, Manado, Mataram, Kupang, Ambon, Jayapura
                  </p>
                </div>
              </div>

              {/* 3 Process Assurance Badges */}
              <div className="pt-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-neutral-300 font-medium">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Pengerjaan 100%
                  Online &amp; Terpantau
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Review Preview
                  Interaktif Sebelum Rilis
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Garansi
                  Pemeliharaan 1 Tahun Penuh
                </span>
              </div>
            </div>
          </section>
        </div>

        {/* ============================================================== */}
        {/* 9. TANYA JAWAB (FAQ) RAMAH PEMILIK USAHA                       */}
        {/* ============================================================== */}
        <div className="relative bg-paper-cream-left-glow bg-dot-fine py-20 sm:py-24 overflow-hidden">
          <section className="relative max-w-3xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-10">
              <SectionMark num="09" icon={HelpCircle} eyebrow="Tanya Jawab Seputar Layanan" />
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

        {/* ============================================================== */}
        {/* 10. FINAL CLOSING CTA BANNER                                   */}
        {/* ============================================================== */}
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
                  Siap Bikin Usaha Anda Naik Kelas &amp; Terlihat Lebih Profesional?
                </h2>
                <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
                  Diskusikan rencana toko online Anda bersama tim kami sekarang secara gratis.
                  Dapatkan saran paket yang paling pas dengan anggaran usaha Anda tanpa komitmen
                  awal.
                </p>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={getWhatsAppDirectUrl(
                      'Halo Admin MarketingCode.ID, saya ingin diskusi rencana pembuatan website untuk usaha saya secara gratis.',
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Diskusi Kebutuhan Website via WhatsApp — 100% Gratis"
                    className="w-full sm:w-auto px-8 py-3.5 bg-[#D13D00] hover:bg-[#B33400] text-white font-bold text-xs sm:text-sm rounded-full shadow-glow transition-all flex items-center justify-center gap-2"
                  >
                    <Image
                      src="/icons/flaticon/whatsapp.svg"
                      alt=""
                      width={18}
                      height={18}
                      className="w-4 h-4 shrink-0 object-contain"
                    />
                    <span>Diskusi Kebutuhan Website via WhatsApp — 100% Gratis</span>
                  </a>
                </div>

                <div className="pt-4 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-[11px] text-neutral-300">
                  <span className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#FF5C28]" /> 100% Hak Milik Tanpa Sewa
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#FF5C28]" /> Gratis Domain &amp; Server 1
                    Tahun
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#FF5C28]" /> Garansi Pendampingan Resmi
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
