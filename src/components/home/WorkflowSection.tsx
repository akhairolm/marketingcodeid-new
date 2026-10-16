import { Route } from 'lucide-react'

const steps = [
  {
    number: '01',
    title: 'Discovery & Konsultasi',
    desc: 'Sampaikan visi, kendala operasional, dan target bisnis Anda. Kami buatkan road-map teknis serta estimasi investasi.',
    isHighlight: false,
  },
  {
    number: '02',
    title: 'Desain UI & Koding',
    desc: 'Tim kami menyusun prototipe interaktif di Figma, lalu diimplementasikan menjadi aplikasi kencang melalui sprint mingguan.',
    isHighlight: true,
  },
  {
    number: '03',
    title: 'Peluncuran & Scaling',
    desc: 'Pengujian menyeluruh (QA), rilis ke server produksi Vercel / App Store, dan aktivasi campaign digital marketing.',
    isHighlight: false,
  },
]

export function WorkflowSection() {
  return (
    <section id="alur-kerja" className="max-w-4xl mx-auto px-4 sm:px-6 mt-28 text-center">
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF5F0] border border-orange-200/50 text-[#C23605] text-xs font-semibold mb-3">
        <Route className="w-3.5 h-3.5" />
        <span>Alur Kerja Rapi</span>
      </div>

      <h2 className="text-3xl font-extrabold text-neutral-900 tracking-tight">
        Tiga Langkah Mudah Memulai Proyek
      </h2>
      <p className="text-neutral-500 text-sm mt-2">
        Transparan dari tahap perumusan ide sampai produk live siap menghasilkan omzet.
      </p>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 relative">
        {steps.map((step) => (
          <div
            key={step.number}
            className="bg-white rounded-3xl p-6 border border-neutral-200/70 shadow-card flex flex-col items-center text-center"
          >
            <div
              className={`w-12 h-12 rounded-full font-extrabold text-sm flex items-center justify-center mb-4 ${
                step.isHighlight
                  ? 'bg-[#D13D00] text-white shadow-glow'
                  : 'bg-[#FFF5F0] text-[#C23605] border border-orange-200'
              }`}
            >
              {step.number}
            </div>
            <h3 className="text-sm font-bold text-neutral-900">{step.title}</h3>
            <p className="text-xs text-neutral-500 mt-2 leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
