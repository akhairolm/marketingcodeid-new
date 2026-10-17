'use client'

import React from 'react'
import { getWhatsAppUrl } from '@/lib/whatsapp'

export function WhatsAppFloatingButton() {
  const waUrl = getWhatsAppUrl('floating')

  return (
    <aside
      aria-label="Kontak Cepat WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex items-center gap-2 group print:hidden select-none"
    >
      {/* Tooltip Badge */}
      <span className="hidden sm:inline-flex items-center gap-1.5 bg-white text-neutral-800 text-xs font-semibold px-3.5 py-1.5 rounded-full shadow-lg border border-neutral-200/80 transition-all duration-300 group-hover:shadow-xl group-hover:border-emerald-300">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        👋 Konsultasi Online Cepat
      </span>

      {/* Main WhatsApp Bubble Button */}
      <a
        id="floating-whatsapp-btn"
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat WhatsApp dengan Admin MarketingCode.ID"
        className="flex items-center justify-center w-14 h-14 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 active:scale-95 relative focus:outline-none focus:ring-4 focus:ring-emerald-300"
      >
        {/* Radar Ping Effect */}
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500" />
        </span>

        {/* WhatsApp Icon */}
        <svg
          className="w-7 h-7 fill-current"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
        </svg>
      </a>
    </aside>
  )
}
