import Link from 'next/link'
import { Globe, TrendingUp, Smartphone, ChevronRight } from 'lucide-react'

const services = [
  {
    href: '/jasa-pembuatan-website',
    icon: Globe,
    badge: 'Website & Landing Page',
    title: 'Jasa Pembuatan Website',
    desc: 'Pembuatan website profesional berkecepatan tinggi, mobile-friendly, dan dioptimasi SEO. Melayani landing page promosi, web profil UMKM, company profile korporat, hingga sistem web dinamis.',
    target: 'Cocok untuk: UMKM, profil bisnis B2B, toko online, instansi, & landing page promosi.',
    cta: 'Lihat Layanan Website',
  },
  {
    href: '/jasa-iklan-ads',
    icon: TrendingUp,
    badge: 'Performance Ads & Leads',
    title: 'Jasa Iklan Google Ads & Meta Ads',
    desc: 'Pengelolaan kampanye iklan berbayar Google Ads dan Meta Ads (Facebook & Instagram) yang terukur. Didukung riset audiens dan kata kunci, materi kreatif, pemasangan tracking pixel, dan optimasi konversi ke WhatsApp.',
    target: 'Cocok untuk: akuisisi leads berkualitas, akselerasi order produk/jasa, dan scale-up omzet bisnis.',
    cta: 'Lihat Layanan Iklan Ads',
  },
  {
    href: '/jasa-pembuatan-aplikasi-mobile',
    icon: Smartphone,
    badge: 'Android & iOS App',
    title: 'Jasa Pembuatan Mobile App',
    desc: 'Pengembangan aplikasi mobile modern untuk platform Android & iOS. Solusi aplikasi bisnis, sistem booking, presensi geotagging, e-commerce, hingga portal layanan publik instansi pemerintah.',
    target: 'Cocok untuk: Startup, instansi pemerintah, sistem loyalitas, & operasional bisnis lapangan.',
    cta: 'Lihat Layanan Mobile App',
  },
]

export function ServicesHub() {
  return (
    <section id="layanan-utama" aria-label="Layanan Utama" className="max-w-6xl mx-auto px-4 sm:px-6 mt-16 sm:mt-20">
      <div className="text-center mb-10">
        <span className="text-xs font-bold text-neutral-600 uppercase tracking-wider">
          Pilihan Layanan Sesuai Kebutuhan
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight mt-1">
          Solusi Digital Terpadu untuk Pertumbuhan Bisnis Anda
        </h2>
        <p className="text-neutral-500 text-sm mt-2 max-w-2xl mx-auto leading-relaxed">
          Setiap bisnis memiliki kebutuhan berbeda. Kami menyediakan 3 pilar layanan utama untuk membangun kehadiran digital yang kredibel, terpercaya, dan menghasilkan konversi nyata.
        </p>
      </div>

      {/* 3 Core Agency Services */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
        {services.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className="bg-white rounded-3xl p-6 sm:p-7 border border-neutral-200/80 shadow-card hover:border-[#FF5C28] hover:shadow-lg transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#FFF5F0] border border-orange-200/60 flex items-center justify-center text-[#C23605] mb-4 shadow-xs group-hover:scale-110 transition-transform">
                <card.icon className="w-6 h-6" />
              </div>
              <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-orange-50 text-[#C23605] mb-2 border border-orange-200/70">
                {card.badge}
              </span>
              <h3 className="text-xl font-bold text-neutral-900 leading-snug group-hover:text-[#C23605] transition-colors">
                {card.title}
              </h3>
              <p className="text-xs sm:text-[13px] text-neutral-600 mt-2.5 leading-relaxed">{card.desc}</p>
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
