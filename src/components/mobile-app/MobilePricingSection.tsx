import Image from 'next/image'
import {
  Sparkles,
  Check,
  Smartphone,
  ArrowRight,
  ShieldCheck,
  Clock,
  FileText,
  RefreshCw,
} from 'lucide-react'
import { getWhatsAppDirectUrl } from '@/lib/whatsapp'

export interface MobileTierItem {
  tier: string
  price: string
  unit: string
  badgeTop?: string
  isPopular?: boolean
  target: string
  time: string
  desc: string
  features: string[]
  whatsappMessage: string
  btnText: string
}

const mobileTiers: MobileTierItem[] = [
  {
    tier: 'Mobile Web-App (PWA) & APK',
    price: 'Rp 3.490.000',
    unit: 'sekali bayar',
    badgeTop: 'Paling Cepat & Hemat',
    isPopular: false,
    target: 'UMKM, Katalog Produk, Bisnis Ritel, & Sistem Internal Sederhana',
    time: 'Estimasi: 7 – 14 Hari Kerja',
    desc: 'Solusi cerdas bagi bisnis yang butuh aplikasi siap install di smartphone tanpa harus melalui antrean review toko aplikasi.',
    features: [
      'Bisa di-install langsung dari browser ke home screen HP (PWA)',
      'Termasuk file master .APK untuk perangkat Android',
      'Dashboard Admin Web untuk mengelola data & konten mandiri',
      'Termasuk Domain resmi (.com/.id) & Cloud Server 1 tahun',
      'Desain mobile-first responsif hingga 5–7 modul tampilan',
      'Tombol pemesanan produk/layanan langsung terhubung ke WhatsApp',
      'Akses data offline dasar & waktu loading super cepat',
      'Garansi pemeliharaan & perbaikan bug selama 1 tahun penuh',
    ],
    whatsappMessage:
      'Halo MarketingCode.ID, saya tertarik dengan Paket 1: Mobile Web-App (PWA) & APK (Rp 3.490.000). Bisnis saya: ____',
    btnText: 'Pilih Paket Web-App (PWA)',
  },
  {
    tier: 'Android & iOS Cross-Platform',
    price: 'Rp 7.900.000',
    unit: 'sekali bayar',
    badgeTop: 'Paling Diminati',
    isPopular: true,
    target: 'Bisnis Berkembang, Aplikasi Booking, Klinik, Ekspedisi, & Instansi',
    time: 'Estimasi: 3 – 5 Minggu',
    desc: 'Aplikasi mobile utuh berbasis Flutter / React Native dengan 1 basis kode efisien yang berjalan mulus di Android & iPhone sekaligus.',
    features: [
      '1 Basis kode untuk Android & iOS sekaligus (Cross-Platform modern)',
      'Desain Layar Interaktif (Prototype UI/UX) sebelum proses koding',
      'Akses fitur smartphone: Kamera, GPS Geofencing, & Push Notifikasi',
      'Sistem login akun pengguna / pelanggan & riwayat aktivitas',
      'Dashboard Admin Berbasis Web lengkap + REST API terpusat',
      'Pendampingan teknis & publikasi resmi ke Google Play Store',
      'Penyusunan dokumen kebijakan privasi & standar kepatuhan UU PDP',
      'Garansi pemeliharaan, bug-fixing, & konsultasi 1 tahun penuh',
    ],
    whatsappMessage:
      'Halo MarketingCode.ID, saya ingin memesan Paket 2: Android & iOS Cross-Platform (Rp 7.900.000). Rencana aplikasi saya: ____',
    btnText: 'Pilih Paket Cross-Platform',
  },
  {
    tier: 'Custom Ecosystem & Enterprise',
    price: 'Mulai Rp 14.900.000',
    unit: 'sesuai modul',
    badgeTop: 'Skala Besar & Kompleks',
    isPopular: false,
    target: 'Perusahaan Korporat, E-Commerce, HRIS Presensi GPS, & Layanan Publik OPD',
    time: 'Estimasi: 6 – 10 Minggu',
    desc: 'Pengembangan ekosistem aplikasi mobile custom dengan arsitektur data terukur, integrasi payment gateway, dan otomasi operasional penuh.',
    features: [
      'Arsitektur mobile performa tinggi (Full Custom Cross-Platform / Native)',
      'Integrasi Payment Gateway resmi (QRIS, Virtual Account Bank, E-Wallet)',
      'Fitur Presensi Geofencing GPS akurat dengan proteksi anti fake-GPS',
      'Multi-role hak akses admin (Super Admin, Operator Lapangan, Pimpinan)',
      'Modul rekapitulasi data & ekspor laporan otomatis (PDF/Excel)',
      'Pendampingan rilis resmi di Google Play Store & Apple App Store',
      'High-Performance Cloud Server kapasitas tinggi & backup otomatis',
      'Garansi prioritas, SLA responsif, & pendampingan teknis 1 tahun',
    ],
    whatsappMessage:
      'Halo MarketingCode.ID, saya ingin diskusi kebutuhan Paket 3: Custom Mobile Ecosystem & Enterprise. Kebutuhan sistem/aplikasi saya: ____',
    btnText: 'Konsultasi Paket Enterprise',
  },
]

export function MobilePricingSection() {
  return (
    <section id="paket-harga-aplikasi" className="relative py-24 sm:py-32 bg-paper-cream-glow bg-dot-fine section-rule overflow-hidden">
      {/* Ambient Spotlight Halo behind pricing cards */}
      <div
        className="absolute top-12 left-1/2 -translate-x-1/2 w-[800px] h-96 bg-gradient-to-b from-[#FF5C28]/12 via-amber-400/6 to-transparent rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FFF5F0] border border-orange-200/80 mb-4 shadow-xs">
            <Smartphone className="w-3.5 h-3.5 text-[#C23605]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#C23605]">
              05 / INVESTASI PENGEMBANGAN APLIKASI
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#111827] tracking-tight leading-tight">
            Pilih Skema Pengembangan Sesuai Skala &amp; Kebutuhan Anda
          </h2>

          <p className="mt-4 text-sm sm:text-base text-neutral-600 leading-relaxed">
            Transparan sejak awal tanpa biaya tersembunyi. Seluruh paket sudah termasuk perancangan antarmuka (UI/UX), Dashboard Admin Web, Cloud Server tahun pertama, dan garansi pemeliharaan resmi selama 1 tahun penuh.
          </p>
        </div>

        {/* 3 Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {mobileTiers.map((tier) => (
            <div
              key={tier.tier}
              className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                tier.isPopular
                  ? 'bg-white border-2 border-[#FF5C28] shadow-xl shadow-orange-500/10 ring-4 ring-orange-500/5 lg:-translate-y-2'
                  : 'bg-white border border-neutral-200/90 shadow-card hover:border-orange-200'
              }`}
            >
              {/* Popular Badge */}
              {tier.badgeTop && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] font-extrabold tracking-wide uppercase shadow-sm ${
                      tier.isPopular
                        ? 'bg-[#FF5C28] text-white'
                        : 'bg-neutral-900 text-white'
                    }`}
                  >
                    {tier.isPopular && <Sparkles className="w-3 h-3 text-amber-300" />}
                    {tier.badgeTop}
                  </span>
                </div>
              )}

              <div>
                {/* Header Card */}
                <div className="pt-2">
                  <h3 className="text-lg sm:text-xl font-bold text-neutral-900 leading-snug">
                    {tier.tier}
                  </h3>
                  <p className="text-xs text-neutral-500 mt-2 min-h-[38px] leading-relaxed">
                    {tier.desc}
                  </p>
                </div>

                {/* Price Display */}
                <div className="mt-5 pb-5 border-b border-neutral-100">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight">
                      {tier.price}
                    </span>
                    <span className="text-xs text-neutral-500 font-medium">/{tier.unit}</span>
                  </div>
                  <div className="mt-2.5 flex items-center gap-2 text-[11px] font-semibold text-[#C23605] bg-[#FFF5F0] px-2.5 py-1 rounded-lg w-fit">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{tier.time}</span>
                  </div>
                  <div className="mt-2 text-[11px] text-neutral-600 bg-neutral-50 p-2 rounded-lg border border-neutral-200/60 leading-tight">
                    <strong className="text-neutral-800">Target Ideal:</strong> {tier.target}
                  </div>
                </div>

                {/* Features List */}
                <div className="mt-6 space-y-3">
                  <span className="text-xs font-bold text-neutral-900 uppercase tracking-wider block">
                    Komponen &amp; Fitur yang Didapat:
                  </span>
                  <ul className="space-y-2.5">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-xs text-neutral-700 leading-relaxed">
                        <div className="w-4 h-4 rounded-full bg-orange-50 border border-orange-200/80 text-[#FF5C28] flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Card Footer CTA */}
              <div className="mt-8 pt-6 border-t border-neutral-100">
                <a
                  href={getWhatsAppDirectUrl(tier.whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 shadow-sm ${
                    tier.isPopular
                      ? 'bg-[#D13D00] hover:bg-[#B33400] text-white shadow-glow hover:-translate-y-0.5'
                      : 'bg-neutral-900 hover:bg-neutral-800 text-white hover:-translate-y-0.5'
                  }`}
                >
                  <Image
                    src="/icons/flaticon/whatsapp.svg"
                    alt=""
                    width={18}
                    height={18}
                    className="w-4 h-4 shrink-0"
                  />
                  <span>{tier.btnText}</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
                </a>
                <p className="text-[10px] text-center text-neutral-500 mt-2.5 flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  <span>Garansi Resmi 1 Tahun • 100% Hak Milik Sistem</span>
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 2 Bottom Add-On Cards */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card Left: Web to App Conversion */}
          <div className="bg-gradient-to-br from-neutral-900 to-neutral-950 text-white rounded-3xl p-6 sm:p-8 border border-neutral-800 shadow-lg relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF5C28]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-orange-300 text-[11px] font-bold">
                <RefreshCw className="w-3.5 h-3.5" />
                <span>KONVERSI WEB KE APLIKASI</span>
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                Sudah Punya Website? Ubah Jadi Aplikasi Mobile Siap Install
              </h3>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Toko online, portal berita, atau sistem berbasis website Anda dapat kami konversikan menjadi aplikasi Android &amp; PWA lengkap dengan ikon di layar smartphone pengguna dan notifikasi promo.
              </p>
              <div className="pt-2 flex items-baseline gap-2">
                <span className="text-xs text-neutral-400">Investasi Mulai:</span>
                <span className="text-xl sm:text-2xl font-extrabold text-[#FF7A45]">Rp 1.990.000</span>
                <span className="text-[10px] text-neutral-400 font-medium">/ pengerjaan 5–7 hari</span>
              </div>
            </div>

            <div className="relative z-10 pt-6 mt-4 border-t border-white/10">
              <a
                href={getWhatsAppDirectUrl(
                  'Halo MarketingCode.ID, saya sudah punya website dan ingin mengubahnya menjadi aplikasi mobile (Konversi Web to App Rp 1.990.000). Alamat website saya: ____'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#FF5C28] hover:bg-[#EA4510] text-white text-xs font-bold transition-all shadow-glow"
              >
                <Image
                  src="/icons/flaticon/whatsapp.svg"
                  alt=""
                  width={16}
                  height={16}
                  className="w-3.5 h-3.5 shrink-0"
                />
                <span>Konsultasi Konversi Website</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </a>
            </div>
          </div>

          {/* Card Right: Custom KAK & RAB Instansi */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/90 shadow-card flex flex-col justify-between">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/70 text-emerald-800 text-[11px] font-bold">
                <FileText className="w-3.5 h-3.5" />
                <span>KHUSUS INSTANSI &amp; KORPORAT</span>
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold text-neutral-900 leading-snug">
                Butuh Penyusunan Spesifikasi Teknis (KAK/RAB) atau Fitur Kustom?
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Kami siap membantu tim teknis instansi pemerintah atau manajemen korporasi memetakan arsitektur modul, diagram alur, spesifikasi KAK (Kerangka Acuan Kerja), dan estimasi RAB pengadaan resmi.
              </p>
              <div className="pt-2 flex items-baseline gap-2">
                <span className="text-xs text-neutral-500">Sesi Diskusi &amp; Telaah:</span>
                <span className="text-lg sm:text-xl font-extrabold text-emerald-700">Konsultasi &amp; Pemetaan Gratis</span>
              </div>
            </div>

            <div className="pt-6 mt-4 border-t border-neutral-100">
              <a
                href={getWhatsAppDirectUrl(
                  'Halo MarketingCode.ID, kami dari instansi/perusahaan ingin diskusi teknis terkait penyusunan KAK/RAB atau fitur kustom aplikasi mobile.'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold transition-all"
              >
                <Image
                  src="/icons/flaticon/whatsapp.svg"
                  alt=""
                  width={16}
                  height={16}
                  className="w-3.5 h-3.5 shrink-0"
                />
                <span>Jadwalkan Diskusi KAK/RAB</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
