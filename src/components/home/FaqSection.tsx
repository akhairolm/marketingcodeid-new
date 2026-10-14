'use client'

import { useState } from 'react'
import { HelpCircle, Plus, Minus } from 'lucide-react'

export function FaqSection({ faqs }: { faqs: { q: string; a: string }[] }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <section id="faq" className="max-w-3xl mx-auto px-4 sm:px-6 mt-28">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF5F0] border border-orange-200/50 text-[#EA4510] text-xs font-semibold mb-3">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Tanya Jawab</span>
        </div>
        <h2 className="text-3xl font-extrabold text-neutral-900 tracking-tight">
          Pertanyaan Umum (FAQ) Seputar Layanan Kami
        </h2>
        <p className="text-neutral-500 text-sm mt-1">Semua hal yang perlu Anda ketahui sebelum bermitra bersama kami.</p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl border border-neutral-200/80 overflow-hidden shadow-xs transition-all"
          >
            <button
              type="button"
              onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
              className="w-full px-5 py-4 text-left flex items-center justify-between text-xs sm:text-sm font-bold text-neutral-900 hover:text-[#FF5C28] cursor-pointer"
            >
              <h3 className="font-bold">{faq.q}</h3>
              {openFaq === idx ? (
                <Minus className="w-4 h-4 text-[#FF5C28] shrink-0" />
              ) : (
                <Plus className="w-4 h-4 text-neutral-400 shrink-0" />
              )}
            </button>
            {openFaq === idx && (
              <div className="px-5 pb-4 text-xs text-neutral-500 leading-relaxed animate-in fade-in">{faq.a}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
