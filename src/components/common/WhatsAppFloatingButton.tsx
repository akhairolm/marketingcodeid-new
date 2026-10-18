'use client'

import React from 'react'
import Image from 'next/image'
import { getWhatsAppUrl } from '@/lib/whatsapp'
import { trackWhatsAppClick } from '@/lib/analytics'

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
        <Image src="/icons/flaticon/goodbye.svg" alt="" width={16} height={16} className="w-4 h-4 shrink-0" />
        Konsultasi Online Cepat
      </span>

      {/* Main WhatsApp Bubble Button */}
      <a
        id="floating-whatsapp-btn"
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackWhatsAppClick({ position: 'floating_button', service: 'floating' })}
        aria-label="Chat WhatsApp dengan Admin MarketingCode.ID"
        className="flex items-center justify-center w-14 h-14 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 active:scale-95 relative focus:outline-none focus:ring-4 focus:ring-emerald-300"
      >
        {/* Radar Ping Effect */}
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500" />
        </span>

        {/* WhatsApp Icon */}
        <Image
          src="/icons/flaticon/whatsapp.svg"
          alt=""
          width={36}
          height={36}
          className="w-9 h-9 shrink-0 object-contain"
        />
      </a>
    </aside>
  )
}
