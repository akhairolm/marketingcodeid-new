import { Code, Code2, Palette, Smartphone, Check } from 'lucide-react'

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
    </section>
  )
}

