import Link from 'next/link'
import { Code2, Smartphone, TrendingUp, Film, ChevronRight } from 'lucide-react'

const cards = [
  {
    href: '/jasa-pembuatan-website',
    icon: Code2,
    badge: 'Layanan Inti',
    title: 'Jasa Pembuatan Website & Sistem Informasi',
    desc: 'Pengembangan website company profile, landing page promosi, situs tour & travel, hingga sistem informasi berbasis web kustom untuk instansi dan perusahaan.',
    cta: 'Lihat Layanan Pembuatan Website',
  },
  {
    href: '/jasa-pembuatan-aplikasi-mobile',
    icon: Smartphone,
    badge: 'Android & iOS',
    title: 'Jasa Pembuatan Aplikasi Mobile (Android & iOS)',
    desc: 'Perancangan dan pembuatan aplikasi mobile kustom untuk layanan publik instansi, presensi pegawai berbasis lokasi (geotagging), dan operasional bisnis.',
    cta: 'Lihat Layanan Aplikasi Mobile',
  },
  {
    href: '/jasa-iklan-meta-ads',
    icon: TrendingUp,
    badge: 'Facebook & Instagram',
    title: 'Jasa Kelola Iklan Meta Ads (Facebook & Instagram)',
    desc: 'Manajemen kampanye iklan Facebook dan Instagram berbasis data yang difokuskan untuk menghasilkan prospek (Click-to-WhatsApp) dan konversi penjualan.',
    cta: 'Lihat Layanan Meta Ads',
  },
  {
    href: '/digital-marketing',
    icon: Film,
    badge: 'Konten Kreatif',
    title: 'Jasa Google Ads & Produksi Video Kreatif',
    desc: 'Optimasi iklan pencarian Google untuk menangkap calon pembeli siap transaksi serta jasa video editing profesional untuk materi iklan Reels, TikTok, dan profil korporat.',
    cta: 'Pelajari Layanan Marketing & Video',
  },
]

export function ServicesHub() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 mt-16 sm:mt-20">
      <div className="text-center mb-8">
        <span className="text-xs font-bold text-neutral-600 uppercase tracking-wider">
          Partner Transformasi Digital &amp; Pertumbuhan Bisnis Anda
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight mt-1">
          Layanan Solusi Digital Terintegrasi Kami
        </h2>
        <p className="text-neutral-500 text-sm mt-2 max-w-2xl mx-auto">
          Mulai dari pembangunan infrastruktur sistem berbasis web dan mobile hingga akuisisi pelanggan melalui iklan digital dan konten kreatif.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="bg-white rounded-3xl p-6 sm:p-7 border border-neutral-200/80 shadow-card hover:border-[#FF5C28] transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#FFF5F0] border border-orange-200/60 flex items-center justify-center text-[#FF5C28] mb-4 shadow-xs group-hover:scale-110 transition-transform">
                <card.icon className="w-6 h-6" />
              </div>
              <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-orange-50 text-[#EA4510] mb-2 border border-orange-100">
                {card.badge}
              </span>
              <h3 className="text-lg font-bold text-neutral-900 leading-snug group-hover:text-[#FF5C28] transition-colors">
                {card.title}
              </h3>
              <p className="text-xs text-neutral-500 mt-2 leading-relaxed">{card.desc}</p>
            </div>
            <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs font-semibold text-[#FF5C28]">
              <span>{card.cta}</span>
              <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
