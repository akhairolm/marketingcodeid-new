import React from 'react'
import Link from 'next/link'

const FOOTER_LINKS = [
  { href: '/jasa-pembuatan-website', label: 'Jasa Pembuatan Website' },
  { href: '/website-umkm', label: 'Website UMKM' },
  { href: '/company-profile', label: 'Company Profile' },
  { href: '/landing-page', label: 'Landing Page' },
  { href: '/jasa-pembuatan-aplikasi-mobile', label: 'Aplikasi Mobile' },
  { href: '/jasa-iklan-meta-ads', label: 'Iklan Meta Ads' },
  { href: '/portfolio', label: 'Portofolio' },
  { href: '/blog', label: 'Blog' },
]

export function SiteFooter() {
  return (
    <footer className="bg-white border-t border-neutral-200/80 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center space-y-6">
        <Link href="/" className="flex items-center gap-2.5" aria-label="MarketingCode.ID — Beranda">
          <span className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#FF5C28] to-[#EA4510] flex items-center justify-center text-white font-black text-lg shadow-glow">
            M
          </span>
          <span className="font-extrabold tracking-tight text-xl text-neutral-900">
            MarketingCode<span className="text-[#D13D00]">.ID</span>
          </span>
        </Link>

        <p className="text-xs text-neutral-600 max-w-sm">
          Membantu wirausahawan, agensi, dan perusahaan bertumbuh dengan teknologi web modern, aplikasi mobile, dan
          strategi pemasaran berbasis konversi.
        </p>

        <nav aria-label="Navigasi footer" className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs font-semibold text-neutral-600">
          {FOOTER_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="whitespace-nowrap hover:text-[#C23605] transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="pt-4 border-t border-neutral-100 w-full flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-neutral-600">
          <span>&copy; {new Date().getFullYear()} MarketingCode.ID Digital Agency. Hak Cipta Dilindungi.</span>
        </div>
      </div>
    </footer>
  )
}
