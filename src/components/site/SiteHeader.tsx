'use client'

import React, { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { getWhatsAppUrl } from '@/lib/whatsapp'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { href: '/', label: 'Beranda' },
  { href: '/jasa-pembuatan-website', label: 'Website' },
  { href: '/jasa-pembuatan-aplikasi-mobile', label: 'Aplikasi Mobile' },
  { href: '/jasa-iklan-meta-ads', label: 'Meta Ads' },
  { href: '/portfolio', label: 'Portofolio' },
  { href: '/blog', label: 'Blog' },
]

function isActive(pathname: string, href: string) {
  if (href === '/' || href.startsWith('/#')) return false
  return pathname === href || pathname.startsWith(`${href}/`)
}

/** Floating capsule navigation shared by interior pages (portfolio, blog). */
export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const closeDrawer = useCallback(() => setOpen(false), [])

  // Close the mobile drawer whenever the route changes.
  useEffect(() => closeDrawer, [closeDrawer, pathname])

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  return (
    <>
      <header className="fixed top-5 inset-x-0 z-50 flex justify-center px-4">
        <nav
          aria-label="Navigasi utama"
          className="w-full max-w-4xl bg-[#1A1A1E]/90 backdrop-blur-md text-white pl-5 pr-2.5 py-2.5 rounded-full flex items-center justify-between shadow-2xl border border-white/10"
        >
          <Link href="/" className="flex items-center gap-2.5 group shrink-0" aria-label="MarketingCode.ID — Beranda">
            <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#FF5C28] to-[#EA4510] flex items-center justify-center text-white font-extrabold text-sm shadow-glow group-hover:scale-105 transition-transform">
              M
            </span>
            <span className="font-bold tracking-tight text-base whitespace-nowrap hidden min-[420px]:inline">
              MarketingCode<span className="text-[#FF5C28]">.ID</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1 text-xs font-medium tracking-wide">
            {NAV_LINKS.map((link) => {
              const active = isActive(pathname, link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'px-3.5 py-2 rounded-full whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5C28]',
                    active ? 'bg-white/10 text-white' : 'text-neutral-300 hover:text-white',
                  )}
                >
                  {link.label}
                </Link>
              )
            })}
          </div>

          <div className="flex items-center gap-2">
            <a
              id="header-cta-whatsapp"
              href={getWhatsAppUrl('general')}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#FF5C28] hover:bg-[#EA4510] text-white text-xs font-semibold px-4 py-2.5 min-h-[40px] flex items-center rounded-full shadow-glow whitespace-nowrap transition-all hover:-translate-y-0.5 active:translate-y-0"
            >
              Konsultasi Gratis
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Tutup menu' : 'Buka menu'}
              aria-expanded={open}
              className="md:hidden text-neutral-300 hover:text-white p-2.5 -mr-1 rounded-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5C28]"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </header>

      {open && (
        <>
          <div
            aria-hidden
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
            onClick={closeDrawer}
          />
          <div className="fixed inset-x-4 top-20 z-50 bg-[#1A1A1E] text-white p-4 rounded-3xl shadow-2xl border border-white/10 flex flex-col gap-1 md:hidden animate-fade-up">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  'py-3 px-4 rounded-2xl text-sm transition-colors',
                  isActive(pathname, link.href) ? 'bg-white/10 text-white' : 'text-neutral-300 hover:text-[#FF5C28]',
                )}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={getWhatsAppUrl('general')}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="mt-2 py-3 px-4 rounded-2xl text-sm font-semibold text-center bg-[#FF5C28] hover:bg-[#EA4510] text-white transition-colors"
            >
              Konsultasi Gratis
            </a>
          </div>
        </>
      )}
    </>
  )
}
