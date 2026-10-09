'use client'

import React, { useState, useEffect } from 'react'
import { getWhatsAppUrl, ConsultationContext } from '@/lib/whatsapp'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Search, Sparkles, Laptop, Smartphone, TrendingUp, Compass, MessageSquare } from 'lucide-react'

interface CommandItem {
  id: string
  title: string
  category: 'Layanan' | 'Aksi Cepat' | 'Navigasi'
  shortcut?: string
  icon: React.ReactNode
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
      icon: <MessageSquare className="w-4 h-4 text-emerald-500" />,
      action: () => handleConsult('general'),
    },
    {
      id: 'wa-web',
      title: 'Konsultasi Pembuatan Website Custom (Next.js & Custom Dashboard)',
      category: 'Layanan',
      icon: <Laptop className="w-4 h-4 text-[var(--color-accent)]" />,
      action: () => handleConsult('website'),
    },
    {
      id: 'wa-mobile',
      title: 'Konsultasi Aplikasi Mobile (iOS / Android)',
      category: 'Layanan',
      icon: <Smartphone className="w-4 h-4 text-purple-500" />,
      action: () => handleConsult('mobile'),
    },
    {
      id: 'wa-ads',
      title: 'Konsultasi Kampanye Facebook & Google Ads',
      category: 'Layanan',
      icon: <TrendingUp className="w-4 h-4 text-amber-500" />,
      action: () => handleConsult('ads'),
    },
    {
      id: 'nav-bento',
      title: 'Lihat Layanan & Solusi Utama (Bento Grid)',
      category: 'Navigasi',
      icon: <Compass className="w-4 h-4 text-gray-500" />,
      action: () => scrollTo('services'),
    },
    {
      id: 'nav-case-studies',
      title: 'Lihat Studi Kasus Portofolio Terpilih',
      category: 'Navigasi',
      icon: <Sparkles className="w-4 h-4 text-amber-500" />,
      action: () => scrollTo('portfolio'),
    },
    {
      id: 'nav-protocol',
      title: 'Lihat Protokol Pengerjaan & Alur Proyek',
      category: 'Navigasi',
      icon: <Compass className="w-4 h-4 text-gray-500" />,
      action: () => scrollTo('protocol'),
    },
    {
      id: 'nav-faq',
      title: 'Tanya Jawab Seputar Harga & Kepemilikan Kode',
      category: 'Navigasi',
      icon: <Compass className="w-4 h-4 text-gray-500" />,
      action: () => scrollTo('faq'),
    },
  ]

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    item.category.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="cmd-trigger-btn h-9 gap-2 border-[var(--color-rule)] bg-[var(--color-paper-subtle)] text-[var(--color-ink-muted)] hover:border-[var(--color-accent)]"
        onClick={() => setIsOpen(true)}
      >
        <Search className="w-3.5 h-3.5" />
        <span className="cmd-label text-xs">Cari aksi cepat...</span>
        <kbd className="cmd-kbd text-[10px]">⌘K</kbd>
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-lg p-0 overflow-hidden bg-[var(--color-paper-card)] border-[var(--color-rule)] shadow-2xl">
          <DialogHeader className="p-0 border-b border-[var(--color-rule)]">
            <div className="flex items-center px-4 py-3 gap-2">
              <Search className="w-4 h-4 text-[var(--color-accent)] shrink-0" />
              <input
                type="text"
                className="w-full bg-transparent border-0 outline-none text-sm text-[var(--color-ink)] placeholder:text-[var(--color-ink-faint)]"
                placeholder="Ketik layanan, navigasi, atau hubungi dev..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                autoFocus
              />
            </div>
            <DialogTitle className="sr-only">Command Menu MarketingCode ID</DialogTitle>
          </DialogHeader>

          <div className="max-h-[340px] overflow-y-auto p-2 flex flex-col gap-1">
            {filteredItems.length === 0 ? (
              <div className="p-6 text-center text-sm text-[var(--color-ink-muted)]">
                Tidak ada aksi yang sesuai.
              </div>
            ) : (
              filteredItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className="flex items-center justify-between p-2.5 rounded-md hover:bg-[var(--color-accent-subtle)] text-left transition-colors group cursor-pointer border border-transparent hover:border-[var(--color-accent)]/20"
                  onClick={item.action}
                >
                  <div className="flex items-center gap-3">
                    <span className="shrink-0">{item.icon}</span>
                    <div>
                      <span className="text-xs uppercase font-mono tracking-wider text-[var(--color-accent)] block mb-0.5">
                        {item.category}
                      </span>
                      <span className="text-sm font-medium text-[var(--color-ink)] block">
                        {item.title}
                      </span>
                    </div>
                  </div>
                  {item.shortcut && (
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-[var(--color-paper-subtle)] border border-[var(--color-rule)] text-[var(--color-ink-muted)]">
                      {item.shortcut}
                    </span>
                  )}
                </button>
              ))
            )}
          </div>

          <div className="flex items-center justify-between px-4 py-2.5 border-t border-[var(--color-rule)] bg-[var(--color-paper-subtle)] text-[11px] font-mono text-[var(--color-ink-faint)]">
            <span>MarketingCode ID · Direct WhatsApp Pipeline</span>
            <span>Tekan ESC untuk menutup</span>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
