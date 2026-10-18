import { ShieldCheck, Smartphone, Sliders, FileCheck2, MapPin } from 'lucide-react'

const reasons = [
  {
    icon: ShieldCheck,
    title: 'Ruang Lingkup & Biaya Jelas di Awal (100% Hak Milik)',
    desc: 'Tidak ada biaya sewa sistem bulanan yang mengunci operasional bisnis Anda. Website dan kode sepenuhnya menjadi aset milik Anda, dengan biaya perpanjangan domain & hosting standar di tahun berikutnya.',
  },
  {
    icon: Smartphone,
    title: 'Tampilan Mobile-First & Waktu Muat Cepat',
    desc: 'Mayoritas calon pembeli membuka website melalui smartphone. Kami memastikan tata letak proporsional, teks mudah dibaca, dan tombol WhatsApp selalu mudah diakses.',
  },
  {
    icon: Sliders,
    title: 'Bisa Dikelola Sendiri Tanpa Perlu Paham Koding',
    desc: 'Kami menyediakan panduan pengelolaan mandiri. Anda atau tim dapat dengan mudah memperbarui foto produk, mengubah harga promo, dan menambah informasi kapan saja.',
  },
  {
    icon: FileCheck2,
    title: 'Proses Revisi, Pengujian & Serah Terima yang Rapi',
    desc: 'Setiap proyek melewati tahap pengujian fungsional dan memiliki alokasi revisi yang disepakati bersama sebelum website resmi diluncurkan ke publik.',
  },
  {
    icon: MapPin,
    title: 'Tim Lokal Kalimantan Selatan Siap Diskusi Tatap Muka',
    desc: 'Berbasis di Kandangan (HSS), kami siap bertemu langsung untuk diskusi kebutuhan di wilayah Banua Enam, Banjarbaru, Banjarmasin, dan seluruh Kalimantan Selatan.',
  },
]

export function TrustSection() {
  return (
    <section id="alasan-memilih" className="max-w-4xl mx-auto px-4 sm:px-6 mt-20 sm:mt-24 text-center">
      <span className="text-xs font-bold text-neutral-600 uppercase tracking-wider">
        Komitmen Layanan
      </span>
      <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight max-w-xl mx-auto mt-1">
        Alasan Memilih MarketingCode untuk Pembuatan Website Bisnis Anda
      </h2>
      <p className="text-neutral-500 text-sm mt-2 max-w-lg mx-auto">
        Prinsip kerja profesional yang transparan, mengutamakan kepuasan klien, dan bebas dari janji muluk tanpa dasar.
      </p>

      <div className="mt-8 bg-white border border-neutral-200/70 rounded-3xl p-6 sm:p-8 shadow-card grid grid-cols-1 gap-6 divide-y divide-neutral-100 text-left">
        {reasons.map((r, i) => (
          <div key={r.title} className={i === 0 ? 'pt-1' : 'pt-5'}>
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#FFF5F0] border border-orange-200/60 flex items-center justify-center text-[#C23605] shrink-0 mt-0.5">
                <r.icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-neutral-900">{r.title}</h3>
                <p className="text-xs text-neutral-600 mt-1.5 leading-relaxed">{r.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
