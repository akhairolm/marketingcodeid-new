import { Code, Code2, Palette, Smartphone, Check, BellRing, ChevronRight } from 'lucide-react'

const pillars = [
  {
    icon: Palette,
    badge: 'Kilat & Konversi',
    title: 'Landing Page Promosi & Penjualan',
    desc: 'Halaman penawaran produk tunggal yang sangat ringan dan terbukti efektif mengubah pengunjung iklan menjadi chat pemesanan WhatsApp.',
    features: [
      'Waktu muat super cepat (< 0.8 detik)',
      'Terpasang pelacak iklan Meta Pixel & Google Tag',
      'Tombol order otomatis terhubung ke WhatsApp',
      'Desain menarik & persuasif sesuai produk Anda',
    ],
    time: 'Pengerjaan: 5 - 7 Hari Kerja',
    isFlagship: false,
  },
  {
    icon: Code2,
    badge: 'Sistem & Portal Instansi',
    title: 'Website Bisnis & Portal Custom',
    desc: 'Website perusahaan, katalog produk online, atau portal sistem informasi instansi yang aman, cepat, dan bisa dikelola sendiri tanpa perlu paham koding.',
    features: [
      '100% Hak Milik Anda Seutuhnya (Tanpa Biaya Sewa)',
      'Dashboard Admin Mudah Dikelola Langsung dari HP',
      'Penyimpanan Data Toko Aman di Cloud Anti-Hilang',
      'Garansi Pemeliharaan & Pendampingan Resmi',
    ],
    time: 'Pengerjaan: 14 - 21 Hari Kerja',
    isFlagship: true,
  },
  {
    icon: Smartphone,
    badge: 'Android & iPhone (iOS)',
    title: 'Aplikasi Mobile Resmi',
    desc: 'Aplikasi smartphone resmi untuk mempermudah layanan publik dinas, presensi pegawai berkoordinat GPS, maupun sistem booking operasional bisnis.',
    features: [
      'Satu kali buat, langsung jalan di Android & iPhone',
      'Fitur notifikasi promo langsung ke layar HP pelanggan',
      'Pendampingan publikasi resmi ke Play Store & App Store',
      'Terhubung langsung ke sistem database & dashboard admin',
    ],
    time: 'Pengerjaan: 3 - 6 Minggu',
    isFlagship: false,
  },
]

const techChips = [
  '100% Hak Milik Tanpa Sewa',
  'Dashboard Admin Praktis di HP',
  'Penyimpanan Cloud Aman Anti-Hilang',
  'Garansi Pemeliharaan Resmi',
]


export function FlagshipSection() {
  return (
    <section id="web-services" className="max-w-6xl mx-auto px-4 sm:px-6 mt-28">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF5F0] border border-orange-200/50 text-[#C23605] text-xs font-semibold mb-3">
          <Code className="w-3.5 h-3.5" />
          <span>Flagship Solutions</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
          Spesialisasi Web &amp; Mobile App Berperforma Tinggi
        </h2>
        <p className="text-neutral-500 text-sm mt-2 max-w-2xl mx-auto">
          Setiap solusi dirancang khusus dari baris kode pertama untuk kecepatan instan, keamanan data menyeluruh, dan 100% kepemilikan source code tanpa sistem sewa.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pillars.map((pillar) => (
          <div
            key={pillar.title}
            className={`bg-white rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all ${
              pillar.isFlagship
                ? 'border-2 border-[#D13D00] shadow-xl relative transform md:-translate-y-2'
                : 'border border-neutral-200/80 shadow-card hover:border-orange-200'
            }`}
          >
            {pillar.isFlagship && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#D13D00] text-white text-[10px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                Flagship Agensi
              </div>
            )}
            <div>
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${
                  pillar.isFlagship
                    ? 'bg-[#D13D00] text-white shadow-glow'
                    : 'bg-[#FFF5F0] border border-orange-200/60 text-[#C23605]'
                }`}
              >
                <pillar.icon className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold text-[#C23605] uppercase tracking-wider">{pillar.badge}</span>
              <h3 className="text-lg font-bold text-neutral-900 mt-1">{pillar.title}</h3>
              <p className="text-xs text-neutral-500 mt-2 leading-relaxed">{pillar.desc}</p>

              <div
                className={`mt-5 space-y-2.5 text-xs ${
                  pillar.isFlagship ? 'text-neutral-700 font-medium' : 'text-neutral-600'
                }`}
              >
                {pillar.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#C23605]" /> {feature}
                  </div>
                ))}
              </div>
            </div>
            <div
              className={`mt-6 pt-4 border-t border-neutral-100 text-[11px] ${
                pillar.isFlagship ? 'text-[#C23605] font-semibold' : 'text-neutral-500'
              }`}
            >
              {pillar.time}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 bg-gradient-to-br from-neutral-100 to-neutral-200/60 p-6 sm:p-8 rounded-3xl border border-neutral-200/80 shadow-soft">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 bg-white rounded-2xl p-5 shadow-card border border-neutral-100">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-400" />
                <span className="w-3 h-3 rounded-full bg-amber-400" />
                <span className="w-3 h-3 rounded-full bg-emerald-400" />
                <span className="text-xs font-medium text-neutral-500 ml-2">App Architecture • Sprint 04</span>
              </div>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#FFF5F0] text-[#C23605] font-semibold border border-orange-200">
                On Schedule
              </span>
            </div>

            <div className="mt-4 space-y-3">
              <div className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-100">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-neutral-800">Optimasi Kecepatan &amp; Core Web Vitals</h4>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">Performa Optimal</span>
                </div>
                <p className="text-[11px] text-neutral-500 mt-1">Optimasi struktur cache &amp; kompresi aset Next.js untuk akses cepat dan hemat kuota pengguna.</p>
                <div className="mt-3 flex items-center justify-between text-[11px] text-neutral-500">
                  <div className="flex -space-x-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#D13D00] text-white flex items-center justify-center text-[9px] font-bold">FE</span>
                    <span className="w-5 h-5 rounded-full bg-blue-700 text-white flex items-center justify-center text-[9px] font-bold">BE</span>
                  </div>
                  <span>4 Subtasks selesai</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-white border border-neutral-200/70 rounded-xl shadow-xs">
                <div className="w-8 h-8 rounded-full bg-[#D13D00] flex items-center justify-center text-white shrink-0">
                  <BellRing className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-neutral-800 truncate">Mobile App iOS &amp; Android Ready</p>
                  <p className="text-[10px] text-neutral-500">Build stabil siap diunggah ke Play Store &amp; App Store</p>
                </div>
                <span className="text-[10px] text-neutral-500">Just now</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight leading-snug">
              Teknologi Modular yang Skalabel, Cepat &amp; Aman
            </h3>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Kami mengintegrasikan ekosistem teknologi terbaru agar produk Anda tahan uji di masa depan tanpa terbebani plugin yang memperlambat website.
            </p>

            <div className="pt-2 flex flex-wrap gap-2">
              {techChips.map((chip) => (
                <span
                  key={chip}
                  className="px-3 py-1.5 bg-white border border-neutral-200 rounded-full text-xs font-medium text-neutral-700 flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5 text-[#C23605]" /> {chip}
                </span>
              ))}
            </div>

            <div className="pt-2">
              <a
                href="#konsultasi"
                className="inline-flex items-center text-xs font-bold text-white bg-[#D13D00] hover:bg-[#B33400] px-5 py-2.5 rounded-full transition-all shadow-sm"
              >
                Konsultasikan Solusi Teknis
                <ChevronRight className="w-4 h-4 ml-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
