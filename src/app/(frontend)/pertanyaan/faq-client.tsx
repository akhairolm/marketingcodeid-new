'use client'

import React, { useMemo, useState } from 'react'
import {
  HelpCircle,
  Plus,
  Minus,
  Search,
  X,
  MessageCircle,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react'
import type { FaqItem } from '@/data/faqs'
import { getWhatsAppUrl } from '@/lib/whatsapp'
import { trackWhatsAppClick } from '@/lib/analytics'
import { cn } from '@/lib/utils'

const CATEGORIES: { key: string; label: string }[] = [
  { key: 'semua', label: 'Semua Pertanyaan' },
  { key: 'biaya', label: 'Biaya & Paket' },
  { key: 'proses', label: 'Proses Pengerjaan' },
  { key: 'teknis', label: 'Hosting & Teknis' },
  { key: 'umum', label: 'Umum & Layanan' },
]

export function FaqClient({ faqs }: { faqs: FaqItem[] }) {
  const [activeCategory, setActiveCategory] = useState<string>('semua')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [openFaq, setOpenFaq] = useState<number | null>(0) // First open by default

  const filteredFaqs = useMemo(() => {
    return faqs.filter((faq) => {
      const matchesCategory =
        activeCategory === 'semua' || faq.category === activeCategory
      const query = searchQuery.trim().toLowerCase()
      if (!query) return matchesCategory

      const matchesQuery =
        faq.q.toLowerCase().includes(query) || faq.a.toLowerCase().includes(query)
      return matchesCategory && matchesQuery
    })
  }, [faqs, activeCategory, searchQuery])

  return (
    <div className="space-y-8">
      {/* Search Bar & Category Filters */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 border border-neutral-200/80 shadow-card">
        {/* Search Input */}
        <div className="relative mb-5">
          <Search
            className="w-5 h-5 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2"
            aria-hidden="true"
          />
          <input
            id="faq-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Ketik kata kunci pertanyaan... (cth: domain, biaya, revisi)"
            className="w-full pl-12 pr-10 py-3.5 bg-neutral-50 border border-neutral-200 rounded-2xl text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-hidden focus:ring-2 focus:ring-[#D13D00] focus:bg-white transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              aria-label="Hapus kata kunci pencarian"
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 p-1 rounded-full cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div
          role="tablist"
          aria-label="Filter kategori pertanyaan"
          className="flex flex-wrap gap-2"
        >
          {CATEGORIES.map((cat) => {
            const isSelected = activeCategory === cat.key
            return (
              <button
                key={cat.key}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => {
                  setActiveCategory(cat.key)
                  setOpenFaq(null)
                }}
                className={cn(
                  'px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer border',
                  isSelected
                    ? 'bg-[#1A1A1E] text-white border-[#1A1A1E] shadow-sm'
                    : 'bg-neutral-100/80 hover:bg-neutral-200/70 text-neutral-700 border-transparent',
                )}
              >
                {cat.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Accordion Questions List */}
      <div className="space-y-3.5">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq, idx) => {
            const isOpen = openFaq === idx
            const btnId = `faq-item-trigger-${idx}`
            const panelId = `faq-item-panel-${idx}`

            return (
              <div
                key={faq.q}
                className={cn(
                  'bg-white rounded-2xl border transition-all shadow-xs',
                  isOpen
                    ? 'border-[#D13D00]/50 ring-1 ring-[#D13D00]/20'
                    : 'border-neutral-200/80 hover:border-neutral-300',
                )}
              >
                <button
                  id={btnId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full px-5 sm:px-6 py-4 sm:py-5 text-left flex items-start justify-between gap-4 cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#D13D00] rounded-2xl transition-colors"
                >
                  <span className="text-sm sm:text-base font-bold text-neutral-900 pr-2">
                    {faq.q}
                  </span>
                  <span
                    className={cn(
                      'w-7 h-7 rounded-xl flex items-center justify-center shrink-0 mt-0.5 transition-colors',
                      isOpen
                        ? 'bg-[#FFF5F0] text-[#D13D00]'
                        : 'bg-neutral-100 text-neutral-500',
                    )}
                  >
                    {isOpen ? (
                      <Minus className="w-4 h-4" aria-hidden="true" />
                    ) : (
                      <Plus className="w-4 h-4" aria-hidden="true" />
                    )}
                  </span>
                </button>
                {isOpen && (
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={btnId}
                    className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-neutral-600 leading-relaxed border-t border-neutral-100 animate-in fade-in"
                  >
                    {faq.a}
                  </div>
                )}
              </div>
            )
          })
        ) : (
          <div className="bg-white rounded-3xl p-10 text-center border border-neutral-200/80 shadow-card">
            <HelpCircle className="w-10 h-10 text-neutral-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-neutral-900">
              Pertanyaan Tidak Ditemukan
            </h3>
            <p className="text-xs text-neutral-500 mt-1 max-w-sm mx-auto">
              Tidak ada jawaban yang cocok dengan kata kunci &quot;{searchQuery}&quot;.
              Silakan reset filter atau tanyakan langsung kepada kami.
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('')
                  setActiveCategory('semua')
                }}
                className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-xs font-bold text-neutral-700 rounded-full transition-colors cursor-pointer"
              >
                Reset Pencarian
              </button>
              <a
                href={getWhatsAppUrl('website')}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackWhatsAppClick({
                    position: 'faq_empty_state',
                    service: 'website',
                  })
                }
                className="px-4 py-2 bg-[#D13D00] hover:bg-[#B33400] text-xs font-bold text-white rounded-full transition-colors inline-flex items-center gap-1.5 shadow-sm"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                Tanya Tim via WhatsApp
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Assurance Trust Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
        <div className="bg-white/80 backdrop-blur-xs p-4 rounded-2xl border border-neutral-200/70 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200/60 flex items-center justify-center text-[#D13D00] shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-neutral-900">100% Hak Milik</h4>
            <p className="text-[11px] text-neutral-500">Tanpa biaya sewa sistem bulanan</p>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-xs p-4 rounded-2xl border border-neutral-200/70 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200/60 flex items-center justify-center text-emerald-600 shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-neutral-900">Garansi Teknis Resmi</h4>
            <p className="text-[11px] text-neutral-500">Perbaikan bug &amp; pendampingan</p>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-xs p-4 rounded-2xl border border-neutral-200/70 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200/60 flex items-center justify-center text-blue-600 shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-neutral-900">SPK Resmi Tersedia</h4>
            <p className="text-[11px] text-neutral-500">Perjanjian hitam di atas putih</p>
          </div>
        </div>
      </div>

      {/* Final Question WhatsApp Banner */}
      <div className="bg-[#1A1A1E] text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl border border-white/10 mt-10">
        <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-[#FF5C28]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-[11px] font-bold text-[#FF5C28] uppercase tracking-wider">
              Konsultasi Cepat &amp; Gratis
            </span>
            <h3 className="text-lg sm:text-xl font-extrabold text-white">
              Punya Pertanyaan Khusus Terkait Proyek Anda?
            </h3>
            <p className="text-xs text-neutral-300 max-w-lg leading-relaxed">
              Tim konsultan kami siap berdiskusi detail mengenai struktur fitur, estimasi
              biaya, dan alur pengerjaan website yang tepat untuk usaha Anda.
            </p>
          </div>

          <a
            id="faq-page-whatsapp-cta"
            href={getWhatsAppUrl('website')}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackWhatsAppClick({
                position: 'faq_page_banner',
                service: 'website',
              })
            }
            className="bg-[#D13D00] hover:bg-[#B33400] text-white text-xs font-bold px-6 py-3.5 rounded-full shadow-glow whitespace-nowrap inline-flex items-center gap-2 hover:-translate-y-0.5 active:translate-y-0 transition-all shrink-0"
          >
            <MessageCircle className="w-4 h-4" />
            Tanya Tim via WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}
