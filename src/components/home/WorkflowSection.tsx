import { Route } from 'lucide-react'

const steps = [
  {
    number: '01',
    title: 'Konsultasi Kebutuhan',
    desc: 'Diskusi awal terkait jenis usaha, tujuan pembuatan website, sasaran pelanggan, dan fitur utama yang Anda perlukan.',
    isHighlight: false,
  },
  {
    number: '02',
    title: 'Penawaran & Ruang Lingkup',
    desc: 'Penyusunan rincian ruang lingkup kerja (scope), pilihan paket biaya transparan, serta estimasi jadwal pengerjaan yang disepakati.',
    isHighlight: false,
  },
  {
    number: '03',
    title: 'Perancangan Desain UI/UX',
    desc: 'Pembuatan tata letak halaman yang nyaman dibuka di smartphone maupun laptop, memastikan keterbacaan teks dan posisi tombol CTA jelas.',
    isHighlight: true,
  },
  {
    number: '04',
    title: 'Pengembangan & Integrasi',
    desc: 'Pengkodean website modern dengan kecepatan muat tinggi, integrasi WhatsApp otomatis, serta konfigurasi dashboard admin mandiri.',
    isHighlight: false,
  },
  {
    number: '05',
    title: 'Pengujian & Revisi',
    desc: 'Pengujian performa, verifikasi seluruh link dan tombol pemesanan di berbagai perangkat, serta penyesuaian detail sesuai kuota revisi.',
    isHighlight: false,
  },
  {
    number: '06',
    title: 'Peluncuran & Pendampingan',
    desc: 'Aktivasi domain dan hosting resmi, serah terima kepemilikan aset 100%, panduan pengelolaan, serta garansi pemeliharaan teknis.',
    isHighlight: false,
  },
]

export function WorkflowSection() {
  return (
    <section id="alur-kerja" className="max-w-5xl mx-auto px-4 sm:px-6 mt-28 text-center">
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF5F0] border border-orange-200/50 text-[#C23605] text-xs font-semibold mb-3">
        <Route className="w-3.5 h-3.5" />
        <span>Alur Kerja Rapi &amp; Transparan</span>
      </div>

      <h2 className="text-3xl font-extrabold text-neutral-900 tracking-tight">
        6 Tahapan Kerja Terstruktur dari Diskusi Hingga Website Live
      </h2>
      <p className="text-neutral-500 text-sm mt-2 max-w-xl mx-auto">
        Setiap proses dijalankan secara bertahap dan terukur agar website selesai tepat waktu sesuai spesifikasi yang disepakati.
      </p>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-left">
        {steps.map((step) => (
          <div
            key={step.number}
            className="bg-white rounded-3xl p-6 border border-neutral-200/70 shadow-card flex flex-col justify-between"
          >
            <div>
              <div
                className={`w-11 h-11 rounded-2xl font-extrabold text-sm flex items-center justify-center mb-4 ${
                  step.isHighlight
                    ? 'bg-[#D13D00] text-white shadow-glow'
                    : 'bg-[#FFF5F0] text-[#C23605] border border-orange-200'
                }`}
              >
                {step.number}
              </div>
              <h3 className="text-sm font-bold text-neutral-900">{step.title}</h3>
              <p className="text-xs text-neutral-600 mt-2 leading-relaxed">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
