'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { CommandMenu } from '@/components/common/CommandMenu'
import { getWhatsAppUrl } from '@/lib/whatsapp'

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

          <a
            href={getWhatsAppUrl('general')}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary-cobalt"
          >
            <span>Konsultasi WA</span>
            <span className="btn-arrow" aria-hidden="true">→</span>
          </a>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle menu"
          >
            <span className={`hamburger-bar ${mobileMenuOpen ? 'open' : ''}`} />
          </button>
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
            <div className="mobile-cta-wrap">
              <a
                href={getWhatsAppUrl('general')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary-cobalt btn-full"
                onClick={() => setMobileMenuOpen(false)}
              >
                Mulai Konsultasi WhatsApp →
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
