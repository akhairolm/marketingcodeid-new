'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { CommandMenu } from '@/components/common/CommandMenu'
import { getWhatsAppUrl } from '@/lib/whatsapp'
import { ArrowRight, Menu, X } from 'lucide-react'

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="site-header">
      <div className="header-container">
        {/* Brand Wordmark */}
        <Link href="/" className="brand-wordmark">
          <span className="brand-symbol">/</span>
          <span className="brand-name">MARKETINGCODE</span>
          <span className="brand-suffix">.ID</span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="desktop-nav" aria-label="Navigasi Utama">
          <a href="#services" className="nav-link">Layanan</a>
          <a href="#portfolio" className="nav-link">Studi Kasus</a>
          <a href="#protocol" className="nav-link">Alur Kerja</a>
          <a href="#faq" className="nav-link">FAQ</a>
        </nav>

        {/* Right Actions: Command Menu & CTA */}
        <div className="header-actions">
          <CommandMenu />

          <Button
            asChild
            className="btn-primary-cobalt hidden sm:inline-flex h-9 text-xs font-semibold"
          >
            <a
              href={getWhatsAppUrl('general')}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Konsultasi WA</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-0.5" />
            </a>
          </Button>

          {/* Mobile Hamburger Button */}
          <Button
            variant="outline"
            size="icon"
            className="sm:hidden h-9 w-9 border-[var(--color-rule)] bg-transparent text-[var(--color-ink)]"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer">
          <nav className="mobile-nav">
            <a
              href="#services"
              className="mobile-nav-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              01. Layanan & Solusi
            </a>
            <a
              href="#portfolio"
              className="mobile-nav-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              02. Portofolio Terpilih
            </a>
            <a
              href="#protocol"
              className="mobile-nav-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              03. Alur Kerja (Protokol)
            </a>
            <a
              href="#faq"
              className="mobile-nav-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              04. FAQ & Transparansi
            </a>
            <div className="mobile-cta-wrap pt-2">
              <Button asChild className="btn-primary-cobalt w-full h-10">
                <a
                  href={getWhatsAppUrl('general')}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>Mulai Konsultasi WhatsApp</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </a>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
