'use client'

import { useState } from 'react'
import { HelpCircle, Plus, Minus } from 'lucide-react'

export function FaqSection({ faqs }: { faqs: { q: string; a: string }[] }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <section id="faq" className="max-w-3xl mx-auto px-4 sm:px-6 mt-28">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF5F0] border border-orange-200/50 text-[#C23605] text-xs font-semibold mb-3">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Tanya Jawab</span>
        </div>
        <h2 className="text-3xl font-extrabold text-neutral-900 tracking-tight">
          Pertanyaan Umum (FAQ) Seputar Layanan Kami
        </h2>
        <p className="text-neutral-500 text-sm mt-1">Semua hal yang perlu Anda ketahui sebelum bermitra bersama kami.</p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openFaq === idx
          const btnId = `faq-trigger-${idx}`
          const panelId = `faq-panel-${idx}`

          return (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-neutral-200/80 overflow-hidden shadow-xs transition-all"
            >
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenFaq(isOpen ? null : idx)}
                className="w-full px-5 py-4 text-left flex items-center justify-between text-xs sm:text-sm font-bold text-neutral-900 hover:text-[#C23605] cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#D13D00] transition-colors"
              >
                <span className="font-bold pr-4">{faq.q}</span>
                {isOpen ? (
                  <Minus className="w-4 h-4 text-[#C23605] shrink-0" aria-hidden="true" />
                ) : (
                  <Plus className="w-4 h-4 text-neutral-500 shrink-0" aria-hidden="true" />
                )}
              </button>
              {isOpen && (
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  className="px-5 pb-4 text-sm text-neutral-600 leading-relaxed animate-in fade-in"
                >
                  {faq.a}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
