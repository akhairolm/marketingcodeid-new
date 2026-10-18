'use client'

import React, { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown } from 'lucide-react'
import { getWhatsAppUrl } from '@/lib/whatsapp'
import { trackWhatsAppClick } from '@/lib/analytics'
import { cn } from '@/lib/utils'

export const SERVICE_LINKS = [
  { href: '/website-umkm', label: 'Website UMKM & Katalog', desc: 'Solusi website praktis terhubung WhatsApp' },
  { href: '/company-profile', label: 'Website Company Profile', desc: 'Profil usaha kredibel & profesional' },
  { href: '/landing-page', label: 'Landing Page Promosi', desc: 'Fokus konversi penawaran produk/jasa' },
  { href: '/jasa-pembuatan-website', label: 'Jasa Website Lengkap (Hub)', desc: 'Pusat solusi & arsitektur web modern' },
  { href: '/jasa-pembuatan-aplikasi-mobile', label: 'Aplikasi Mobile Android & iOS', desc: 'Sistem aplikasi native & cross-platform' },
  { href: '/jasa-iklan-meta-ads', label: 'Iklan Meta Ads (FB & IG)', desc: 'Manajemen kampanye iklan berorientasi konversi' },
]

export const NAV_LINKS = [
  { href: '/', label: 'Beranda' },
  { href: '/portfolio', label: 'Portofolio' },
  { href: '/blog', label: 'Blog' },
]

/** Unified navbar rendered consistently across all public pages (no smooth scrolls/anchors). */
export function SiteHeader() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false)

  const closeAll = useCallback(() => {
    setMobileMenuOpen(false)
    setServicesDropdownOpen(false)
  }, [])

  // Close drawers/menus on route change
  useEffect(() => {
    closeAll()
  }, [closeAll, pathname])

  // Close on Escape key
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeAll()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [closeAll])

  // Lock body scroll while mobile drawer is open
  useEffect(() => {
    if (!mobileMenuOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [mobileMenuOpen])

  const isServicesActive = SERVICE_LINKS.some(
    (item) => pathname === item.href || pathname.startsWith(`${item.href}/`),
  )

  return (
    <>
      <header className="fixed top-5 inset-x-0 z-50 flex justify-center px-4">
        <nav
          aria-label="Navigasi utama"
          className="w-full max-w-4xl bg-[#1A1A1E]/90 backdrop-blur-md text-white pl-5 pr-2.5 py-2.5 rounded-full flex items-center justify-between shadow-2xl border border-white/10 transition-all duration-300"
        >
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group shrink-0"
            aria-label="MarketingCode.ID — Beranda"
          >
            <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#FF5C28] to-[#EA4510] flex items-center justify-center text-white font-extrabold text-sm shadow-glow group-hover:scale-105 transition-transform">
              M
            </span>
            <span className="font-bold tracking-tight text-base whitespace-nowrap hidden min-[420px]:inline text-white">
              MarketingCode<span className="text-[#FF5C28]">.ID</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1 text-xs font-medium tracking-wide">
            {/* Beranda */}
            <Link
              href="/"
              aria-current={pathname === '/' ? 'page' : undefined}
              className={cn(
                'px-3.5 py-2 rounded-full whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5C28]',
                pathname === '/' ? 'bg-white/10 text-white font-semibold' : 'text-neutral-300 hover:text-white',
              )}
            >
              Beranda
            </Link>

            {/* Layanan Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button
                type="button"
                onClick={() => setServicesDropdownOpen((v) => !v)}
                aria-expanded={servicesDropdownOpen}
                aria-haspopup="true"
                className={cn(
                  'px-3.5 py-2 rounded-full whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5C28]',
                  isServicesActive || servicesDropdownOpen
                    ? 'bg-white/10 text-white font-semibold'
                    : 'text-neutral-300 hover:text-white',
                )}
              >
                <span>Layanan</span>
                <ChevronDown
                  className={cn(
                    'w-3.5 h-3.5 transition-transform duration-200',
                    servicesDropdownOpen && 'rotate-180',
                  )}
                />
              </button>

              {servicesDropdownOpen && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 z-50 w-72">
                  <div className="bg-[#1A1A1E] border border-white/10 rounded-2xl shadow-2xl p-2 flex flex-col gap-1 backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200">
                    {SERVICE_LINKS.map((link) => {
                      const active = pathname === link.href || pathname.startsWith(`${link.href}/`)
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setServicesDropdownOpen(false)}
                          className={cn(
                            'px-3 py-2 rounded-xl text-xs transition-colors flex flex-col text-left',
                            active
                              ? 'bg-white/15 text-white font-semibold'
                              : 'text-neutral-300 hover:text-white hover:bg-white/10',
                          )}
                        >
                          <span className="font-medium text-neutral-100">{link.label}</span>
                          <span className="text-[10px] text-neutral-400 mt-0.5">{link.desc}</span>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Portofolio */}
            <Link
              href="/portfolio"
              aria-current={pathname.startsWith('/portfolio') ? 'page' : undefined}
              className={cn(
                'px-3.5 py-2 rounded-full whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5C28]',
                pathname.startsWith('/portfolio')
                  ? 'bg-white/10 text-white font-semibold'
                  : 'text-neutral-300 hover:text-white',
              )}
            >
              Portofolio
            </Link>

            {/* Blog */}
            <Link
              href="/blog"
              aria-current={pathname.startsWith('/blog') ? 'page' : undefined}
              className={cn(
                'px-3.5 py-2 rounded-full whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5C28]',
                pathname.startsWith('/blog')
                  ? 'bg-white/10 text-white font-semibold'
                  : 'text-neutral-300 hover:text-white',
              )}
            >
              Blog
            </Link>
          </div>

          {/* Right Action: CTA & Mobile Hamburger */}
          <div className="flex items-center gap-2">
            <a
              id="header-cta-whatsapp"
              href={getWhatsAppUrl('website')}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick({ position: 'header', service: 'website' })}
              className="bg-[#D13D00] hover:bg-[#B33400] text-white text-xs font-semibold px-4 py-2.5 min-h-[40px] flex items-center rounded-full shadow-glow whitespace-nowrap transition-all hover:-translate-y-0.5 active:translate-y-0"
            >
              Konsultasi Website
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label={mobileMenuOpen ? 'Tutup menu' : 'Buka menu'}
              aria-expanded={mobileMenuOpen}
              className="md:hidden text-neutral-300 hover:text-white p-2.5 -mr-1 rounded-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5C28]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <>
          <div
            aria-hidden
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
            onClick={closeAll}
          />
          <div className="fixed inset-x-4 top-20 z-50 bg-[#1A1A1E] text-white p-5 rounded-3xl shadow-2xl border border-white/10 flex flex-col gap-1.5 md:hidden animate-fade-up max-h-[85vh] overflow-y-auto">
            {/* Beranda */}
            <Link
              href="/"
              onClick={closeAll}
              className={cn(
                'py-2.5 px-4 rounded-2xl text-sm transition-colors font-medium',
                pathname === '/' ? 'bg-white/10 text-white font-bold' : 'text-neutral-300 hover:text-white',
              )}
            >
              Beranda
            </Link>

            {/* Layanan Header Label */}
            <div className="px-4 pt-3 pb-1 text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
              Layanan Digital
            </div>

            {/* Layanan Sublinks */}
            <div className="flex flex-col gap-1 pl-2">
              {SERVICE_LINKS.map((link) => {
                const active = pathname === link.href || pathname.startsWith(`${link.href}/`)
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeAll}
                    className={cn(
                      'py-2 px-3.5 rounded-xl text-xs transition-colors',
                      active ? 'bg-white/15 text-white font-semibold' : 'text-neutral-300 hover:text-[#FF5C28]',
                    )}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </div>

            <div className="border-t border-white/10 my-2" />

            {/* Portofolio */}
            <Link
              href="/portfolio"
              onClick={closeAll}
              className={cn(
                'py-2.5 px-4 rounded-2xl text-sm transition-colors font-medium',
                pathname.startsWith('/portfolio')
                  ? 'bg-white/10 text-white font-bold'
                  : 'text-neutral-300 hover:text-white',
              )}
            >
              Portofolio &amp; Studi Kasus
            </Link>

            {/* Blog */}
            <Link
              href="/blog"
              onClick={closeAll}
              className={cn(
                'py-2.5 px-4 rounded-2xl text-sm transition-colors font-medium',
                pathname.startsWith('/blog') ? 'bg-white/10 text-white font-bold' : 'text-neutral-300 hover:text-white',
              )}
            >
              Blog &amp; Insight
            </Link>

            {/* CTA Button */}
            <a
              href={getWhatsAppUrl('website')}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeAll}
              className="mt-3 py-3 px-4 rounded-full text-sm font-semibold text-center bg-[#D13D00] hover:bg-[#B33400] text-white shadow-glow transition-all"
            >
              Konsultasi Website via WhatsApp
            </a>
          </div>
        </>
      )}
    </>
  )
}
