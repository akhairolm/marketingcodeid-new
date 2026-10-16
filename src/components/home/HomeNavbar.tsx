'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronRight } from 'lucide-react'

const SERVICE_LINKS = [
  { href: '/jasa-pembuatan-website', label: 'Jasa Pembuatan Website' },
  { href: '/jasa-pembuatan-aplikasi-mobile', label: 'Jasa Pembuatan Aplikasi Mobile' },
  { href: '/jasa-iklan-meta-ads', label: 'Jasa Iklan Meta Ads' },
]

const PAGE_LINKS = [
  { href: '/portfolio', label: 'Portofolio' },
  { href: '/blog', label: 'Blog' },
]

const MOBILE_PAGE_LINKS = [
  { href: '/portfolio', label: 'Portofolio & Studi Kasus' },
  { href: '/blog', label: 'Blog & Insight' },
]

const ANCHOR_LINKS = [
  { href: '#akselerasi', label: 'Skalakan Bisnis' },
  { href: '#harga', label: 'Investasi' },
  { href: '#faq', label: 'FAQ' },
]

export function HomeNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false)

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false)
        setServicesDropdownOpen(false)
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    if (!mobileMenuOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [mobileMenuOpen])

  return (
    <>
      <header className="fixed top-5 inset-x-0 z-50 flex justify-center px-4">
        <nav aria-label="Navigasi utama" className="w-full max-w-4xl bg-[#1A1A1E]/90 backdrop-blur-md text-white px-5 py-2.5 rounded-full flex items-center justify-between shadow-2xl border border-white/10 transition-all duration-300">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#FF5C28] to-[#EA4510] flex items-center justify-center text-white font-extrabold text-sm shadow-glow group-hover:scale-105 transition-transform tracking-tight">
              M
            </div>
            <span className="font-bold tracking-tight text-base text-white hidden min-[420px]:inline">
              MarketingCode<span className="text-[#FF5C28]">.ID</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6 text-xs font-medium tracking-wide text-neutral-300">
            <div
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button
                type="button"
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                aria-expanded={servicesDropdownOpen}
                aria-haspopup="true"
                className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
              >
                Layanan Utama
                <ChevronRight className={`w-3 h-3 transition-transform ${servicesDropdownOpen ? 'rotate-90' : ''}`} />
              </button>
              {servicesDropdownOpen && (
                <div className="absolute left-0 top-full pt-3 z-50">
                  <div className="w-56 bg-[#1A1A1E] border border-white/10 rounded-2xl shadow-2xl p-2 flex flex-col animate-in fade-in slide-in-from-top-2 duration-200">
                    {SERVICE_LINKS.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setServicesDropdownOpen(false)}
                        className="px-3 py-2.5 rounded-xl text-xs text-neutral-300 hover:text-white hover:bg-white/10 transition-colors"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <a href="#akselerasi" className="hover:text-white transition-colors">Skalakan Bisnis</a>
            {PAGE_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-white transition-colors">
                {link.label}
              </Link>
            ))}
            <a href="#harga" className="hover:text-white transition-colors">Investasi</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="#konsultasi"
              className="bg-[#FF5C28] hover:bg-[#EA4510] text-white text-xs font-semibold px-4 py-2.5 min-h-[40px] flex items-center rounded-full shadow-glow whitespace-nowrap transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Konsultasi Gratis
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
              aria-expanded={mobileMenuOpen}
              className="md:hidden text-neutral-300 hover:text-white p-2.5 -mr-1 rounded-full cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </header>

      {mobileMenuOpen && (
        <>
          <div
            aria-hidden
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-x-4 top-20 z-50 bg-[#1A1A1E] text-white p-6 rounded-3xl shadow-2xl border border-white/10 flex flex-col gap-4 text-center md:hidden transition-all animate-in fade-in slide-in-from-top-4">
          {SERVICE_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-[#FF5C28] transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="#akselerasi"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 hover:text-[#FF5C28] transition-colors"
          >
            Skalakan Bisnis
          </a>
          {MOBILE_PAGE_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-[#FF5C28] transition-colors"
            >
              {link.label}
            </Link>
          ))}
          {ANCHOR_LINKS.filter((l) => l.href !== '#akselerasi').map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-[#FF5C28] transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#konsultasi"
            onClick={() => setMobileMenuOpen(false)}
            className="bg-[#FF5C28] hover:bg-[#EA4510] text-white font-semibold py-2.5 rounded-full mt-2"
          >
            Jadwalkan Diskusi Proyek
          </a>
        </div>
        </>
      )}
    </>
  )
}
