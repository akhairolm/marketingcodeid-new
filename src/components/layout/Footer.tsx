import React from 'react'
import Link from 'next/link'
import { getWhatsAppUrl } from '@/lib/whatsapp'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="footer-container">
        {/* Top Colophon Row */}
        <div className="footer-top-grid">
          <div className="footer-col-brand">
            <Link href="/" className="brand-wordmark">
              <span className="brand-symbol">/</span>
              <span className="brand-name">MARKETINGCODE</span>
              <span className="brand-suffix">.ID</span>
            </Link>
            <p className="footer-tagline">
              Bespoke Software Engineering & High-Converting Digital Marketing.
              Membantu pemilik bisnis dan instansi mewujudkan solusi digital tanpa perantara.
            </p>
            <div className="footer-status-pill">
              <span className="status-indicator-live" />
              <span>Status: Menerima Proyek Klien Baru (Q4)</span>
            </div>
          </div>

          <div className="footer-col">
            <div className="footer-col-header">SOLUSI UTAMA</div>
            <ul className="footer-links">
              <li>
                <a href={getWhatsAppUrl('website')} target="_blank" rel="noopener noreferrer">
                  Website Custom (Next.js & Payload)
                </a>
              </li>
              <li>
                <a href={getWhatsAppUrl('mobile')} target="_blank" rel="noopener noreferrer">
                  Aplikasi Mobile (iOS & Android)
                </a>
              </li>
              <li>
                <a href={getWhatsAppUrl('ads')} target="_blank" rel="noopener noreferrer">
                  Digital Marketing (Facebook & Google Ads)
                </a>
              </li>
              <li>
                <a href={getWhatsAppUrl('government')} target="_blank" rel="noopener noreferrer">
                  Pengadaan Aplikasi Instansi & B2B
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <div className="footer-col-header">NAVIGASI & AKSES</div>
            <ul className="footer-links">
              <li><a href="#services">Layanan & Keunggulan</a></li>
              <li><a href="#portfolio">Studi Kasus Proyek</a></li>
              <li><a href="#protocol">Protokol Pengerjaan</a></li>
              <li><a href="#faq">Transparansi & FAQ</a></li>
              <li>
                <Link href="/admin" target="_blank" className="footer-admin-link">
                  CMS Admin Portal →
                </Link>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <div className="footer-col-header">HUBUNGI DEVELOPER</div>
            <p className="footer-contact-info">
              Konsultasi langsung tanpa tim sales perantara:
            </p>
            <a
              href={getWhatsAppUrl('general')}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-wa-badge"
            >
              <span className="wa-icon-small">💬</span>
              <span>WhatsApp: +62 812-3456-7890</span>
            </a>
            <div className="footer-meta-notes">
              Respons cepat: Senin – Sabtu (08.00 – 21.00 WIB)
            </div>
          </div>
        </div>

        {/* Bottom Baseline Bar */}
        <div className="footer-bottom-bar">
          <div className="footer-copy">
            © {currentYear} MarketingCode ID. All rights reserved. 100% Client Source Code Ownership.
          </div>
          <div className="footer-tech-stack">
            <span>Built with Next.js 16</span>
            <span className="dot">•</span>
            <span>Payload CMS 3</span>
            <span className="dot">•</span>
            <span>Supabase PostgreSQL</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
