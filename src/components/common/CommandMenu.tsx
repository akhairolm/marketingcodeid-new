'use client'

import React, { useState, useEffect } from 'react'
import { getWhatsAppUrl, ConsultationContext } from '@/lib/whatsapp'

interface CommandItem {
  id: string
  title: string
  category: 'Layanan' | 'Aksi Cepat' | 'Navigasi'
  shortcut?: string
  action: () => void
}

export function CommandMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen((prev) => !prev)
      } else if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleConsult = (context: ConsultationContext) => {
    window.open(getWhatsAppUrl(context), '_blank')
    setIsOpen(false)
  }

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
    setIsOpen(false)
  }

  const items: CommandItem[] = [
    {
      id: 'wa-general',
      title: 'Konsultasi WhatsApp via Lead Developer',
      category: 'Aksi Cepat',
      shortcut: 'WA',
      action: () => handleConsult('general'),
    },
    {
      id: 'wa-web',
      title: 'Konsultasi Pembuatan Website Custom',
      category: 'Layanan',
      action: () => handleConsult('website'),
    },
    {
      id: 'wa-mobile',
      title: 'Konsultasi Aplikasi Mobile (iOS / Android)',
      category: 'Layanan',
      action: () => handleConsult('mobile'),
    },
    {
      id: 'wa-ads',
      title: 'Konsultasi Kampanye Facebook & Google Ads',
      category: 'Layanan',
      action: () => handleConsult('ads'),
    },
    {
      id: 'nav-bento',
      title: 'Lihat Layanan & Solusi Utama (Bento Grid)',
      category: 'Navigasi',
      action: () => scrollTo('services'),
    },
    {
      id: 'nav-case-studies',
      title: 'Lihat Studi Kasus Portofolio Terpilih',
      category: 'Navigasi',
      action: () => scrollTo('portfolio'),
    },
    {
      id: 'nav-protocol',
      title: 'Lihat Protokol Pengerjaan & Alur Proyek',
      category: 'Navigasi',
      action: () => scrollTo('protocol'),
    },
    {
      id: 'nav-faq',
      title: 'Tanya Jawab Seputar Harga & Kepemilikan Kode',
      category: 'Navigasi',
      action: () => scrollTo('faq'),
    },
  ]

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    item.category.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      <button
        type="button"
        className="cmd-trigger-btn"
        onClick={() => setIsOpen(true)}
        aria-label="Buka Command Menu"
      >
        <span className="cmd-search-icon">⌘</span>
        <span className="cmd-label">Cari aksi cepat...</span>
        <kbd className="cmd-kbd">⌘K</kbd>
      </button>

      {isOpen && (
        <div className="cmd-backdrop" onClick={() => setIsOpen(false)}>
          <div
            className="cmd-dialog"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className="cmd-header">
              <span className="cmd-icon">⚡</span>
              <input
                type="text"
                className="cmd-input"
                placeholder="Ketik layanan, navigasi, atau hubungi dev..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                autoFocus
              />
              <button
                type="button"
                className="cmd-close"
                onClick={() => setIsOpen(false)}
              >
                ESC
              </button>
            </div>

            <div className="cmd-list">
              {filteredItems.length === 0 ? (
                <div className="cmd-empty">Tidak ada aksi yang sesuai.</div>
              ) : (
                filteredItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className="cmd-item"
                    onClick={item.action}
                  >
                    <span className="cmd-item-category">{item.category}</span>
                    <span className="cmd-item-title">{item.title}</span>
                    {item.shortcut && (
                      <span className="cmd-item-shortcut">{item.shortcut}</span>
                    )}
                  </button>
                ))
              )}
            </div>

            <div className="cmd-footer">
              <span>MarketingCode ID · Direct WhatsApp Pipeline</span>
              <span>Gunakan ESC untuk menutup</span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
