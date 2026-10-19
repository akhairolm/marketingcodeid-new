import { Clock, CheckCircle2 } from 'lucide-react'

interface ProcessStep {
  id: number
  number: string
  title: string
  desc: string
  duration: string
  output: string
}

const steps: ProcessStep[] = [
  {
    id: 1,
    number: '01',
    title: 'Konsultasi & Pemilihan Solusi',
    desc: 'Diskusikan model bisnis, target audiens, dan kebutuhan fitur Anda. Kami berikan rekomendasi jenis website dan paket investasi paling efisien tanpa biaya terselubung.',
    duration: '± 15 Menit',
    output: 'Rekomendasi paket & ruang lingkup kerja disepakati',
  },
  {
    id: 2,
    number: '02',
    title: 'Perancangan UI/UX & Struktur',
    desc: 'Penyusunan tata letak visual modern, copywriting persuasif, navigasi mobile-first, dan penataan katalog/layanan agar nyaman diakses pelanggan dari HP.',
    duration: '1 - 3 Hari Kerja',
    output: 'Konsep desain & copywriting disetujui',
  },
  {
    id: 3,
    number: '03',
    title: 'Coding & Integrasi Sistem',
    desc: 'Pengembangan arsitektur web berkecepatan tinggi, integrasi WhatsApp order otomatis, setup formulir leads, aktivasi server cloud, dan konfigurasi Meta Pixel/GA.',
    duration: '3 - 7 Hari Kerja',
    output: 'Website fungsional & siap tahap uji coba',
  },
  {
    id: 4,
    number: '04',
    title: 'Review Akhir & Go Live',
    desc: 'Uji responsivitas lintas browser dan perangkat, penyerahan akses dashboard admin, serah terima aset 100% hak milik, dan aktivasi garansi pemeliharaan resmi.',
    duration: 'Live & Bergaransi',
    output: 'Website resmi tayang & 100% hak milik Anda',
  },
]

export function WorkflowSection() {
  return (
    <section
      id="alur-kerja"
      aria-label="Alur Proses Pengerjaan"
      className="max-w-6xl mx-auto px-4 sm:px-6 mt-24 sm:mt-28"
    >
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b-2 border-neutral-900">
        <span className="font-semibold text-[11px] sm:text-xs tracking-[0.28em] uppercase text-[#FF5C28]">
          § 08 · Proses
        </span>
        <span className="font-semibold text-[11px] sm:text-xs tracking-[0.28em] uppercase text-neutral-500">
          Dari Konsultasi ke Website Live &amp; Bergaransi
        </span>
      </div>

      {/* Main Title & Description Grid */}
      <div className="mt-10 lg:mt-14 mb-14 lg:mb-16 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end text-left">
        <h2 className="lg:col-span-8 font-extrabold text-3xl sm:text-4xl lg:text-[3.25rem] text-neutral-900 leading-[1.25] sm:leading-[1.2] lg:leading-[1.18] tracking-tight">
          Alur kerja terstruktur,{' '}
          <span className="italic font-medium">website &amp; sistem live</span>{' '}
          tepat waktu tanpa kendala teknis.
        </h2>



        <div className="lg:col-span-4 space-y-4">
          <p className="font-medium text-xs sm:text-sm text-neutral-600 leading-relaxed">
            Tidak ada proses yang membingungkan atau antrean lama. Setiap tahapan terpantau jelas
            dengan jadwal terukur, serah terima aset 100%, serta garansi pendampingan resmi.
          </p>
          <div className="flex items-center gap-3 pt-1">
            <span className="w-8 h-px bg-[#FF5C28]" />
            <span className="font-semibold text-[10px] tracking-[0.24em] uppercase text-neutral-500">
              Transparan, Cepat &amp; Bergaransi
            </span>
          </div>
        </div>
      </div>

      {/* 4 Process Step Cards with Connecting Dashed Line */}
      <div className="relative">
        {/* Dashed Connecting Line for Desktop */}
        <div
          aria-hidden="true"
          className="hidden lg:block absolute top-10 left-[calc(12.5%-12px)] right-[calc(12.5%-12px)] h-0 border-t-[2px] border-dashed border-[#FF5C28]/50"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 relative">
          {steps.map((step) => (
            <div key={step.id} className="relative flex flex-col gap-5">
              {/* Top Step Number Circle */}
              <div className="relative w-20 h-20 flex items-center justify-center z-10 bg-white self-center">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full bg-orange-50/70 border-2 border-dashed border-[#FF5C28]"
                />
                <div aria-hidden="true" className="absolute -inset-1 rounded-full" />
                <span className="relative font-extrabold text-2xl text-neutral-900">
                  {step.number}
                </span>
              </div>

              {/* Step Card Body */}
              <div className="bg-white border border-neutral-200/90 rounded-2xl p-5 lg:p-6 flex-1 flex flex-col gap-4 hover:border-[#FF5C28] hover:shadow-lg transition-all text-left shadow-card group">
                {/* Duration & Counter Header */}
                <div className="flex items-center gap-2 pb-3 border-b border-neutral-100">
                  <Clock className="w-3 h-3 text-[#FF5C28] shrink-0" />
                  <span className="font-semibold text-[10px] tracking-[0.2em] uppercase text-neutral-600 whitespace-nowrap">
                    {step.duration}
                  </span>
                  <span className="flex-1 h-px bg-neutral-100" />
                  <span className="font-bold text-[10px] tracking-[0.2em] uppercase text-[#FF5C28] shrink-0">
                    {step.number}/04
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-bold text-lg lg:text-xl text-neutral-900 leading-tight group-hover:text-[#FF5C28] transition-colors">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="font-medium text-xs sm:text-[13px] text-neutral-600 leading-relaxed flex-1">
                  {step.desc}
                </p>

                {/* Output Deliverable */}
                <div className="flex items-start gap-2 pt-3 border-t border-neutral-100">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#FF5C28] shrink-0 mt-0.5" />
                  <span className="font-semibold text-[11px] text-neutral-900 leading-snug">
                    {step.output}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
