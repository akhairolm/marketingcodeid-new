import Link from 'next/link'
import { Store, Building2, Rocket, ChevronRight } from 'lucide-react'

const websiteTypes = [
  {
    href: '/website-umkm',
    icon: Store,
    badge: 'Paling Diminati UMKM',
    title: 'Website UMKM & Toko Online',
    desc: 'Tampilkan profil usaha, etalase produk, layanan, lokasi, dan kontak dalam website yang mudah diakses pelanggan lewat HP serta langsung terhubung ke order WhatsApp.',
    target: 'Cocok untuk: Kuliner, fashion, retail, jasa servis, bengkel, dan toko lokal.',
    cta: 'Lihat Paket Website UMKM',
  },
  {
    href: '/company-profile',
    icon: Building2,
    badge: 'Kredibilitas B2B & Korporat',
    title: 'Website Company Profile Bisnis',
    desc: 'Perkenalkan perusahaan, layanan, pengalaman, dan portofolio melalui website yang tertata untuk meyakinkan calon klien, mitra bisnis, supplier, dan investor.',
    target: 'Cocok untuk: Kontraktor, distributor, konsultan, klinik, agensi, dan perusahaan.',
    cta: 'Lihat Layanan Company Profile',
  },
  {
    href: '/landing-page',
    icon: Rocket,
    badge: 'Fokus Konversi Iklan',
    title: 'Landing Page Promosi & Iklan',
    desc: 'Fokuskan satu produk, layanan, atau promosi dalam satu halaman dengan informasi ringkas, waktu muat super cepat, dan ajakan bertindak (CTA) yang jelas.',
    target: 'Cocok untuk: Iklan Meta Ads / Google Ads, promo musiman, & produk unggulan tunggal.',
    cta: 'Lihat Layanan Landing Page',
  },
]

export function ServicesHub() {
  return (
    <section id="layanan-website" className="max-w-6xl mx-auto px-4 sm:px-6 mt-16 sm:mt-20">
      <div className="text-center mb-10">
        <span className="text-xs font-bold text-neutral-600 uppercase tracking-wider">
          Pilihan Website Sesuai Kebutuhan
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight mt-1">
          Pilih Jenis Website yang Tepat untuk Bisnis Anda
        </h2>
        <p className="text-neutral-500 text-sm mt-2 max-w-2xl mx-auto">
          Setiap bisnis memiliki tujuan berbeda. Pilih struktur website yang dirancang khusus untuk mempermudah operasional dan mendatangkan pelanggan baru.
        </p>
      </div>

      {/* 3 Core Website Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {websiteTypes.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className="bg-white rounded-3xl p-6 sm:p-7 border border-neutral-200/80 shadow-card hover:border-[#D13D00] transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#FFF5F0] border border-orange-200/60 flex items-center justify-center text-[#C23605] mb-4 shadow-xs group-hover:scale-110 transition-transform">
                <card.icon className="w-6 h-6" />
              </div>
              <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-orange-50 text-[#C23605] mb-2 border border-orange-200">
                {card.badge}
              </span>
              <h3 className="text-lg font-bold text-neutral-900 leading-snug group-hover:text-[#C23605] transition-colors">
                {card.title}
              </h3>
              <p className="text-xs text-neutral-600 mt-2.5 leading-relaxed">{card.desc}</p>
              <div className="mt-4 pt-3 border-t border-neutral-100">
                <p className="text-[11px] text-neutral-500 font-medium">{card.target}</p>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs font-bold text-[#C23605]">
              <span>{card.cta}</span>
              <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

