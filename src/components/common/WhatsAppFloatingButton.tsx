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
        <Image
          src="/icons/flaticon/goodbye.svg"
          alt=""
          width={16}
          height={16}
          className="w-4 h-4 shrink-0"
        />
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
        className="flex items-center justify-center transition-all duration-300 transform hover:scale-110 active:scale-95 relative focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 rounded-full cursor-pointer"
      >
        {/* WhatsApp Icon */}
        <Image
          src="/icons/flaticon/whatsapp.svg"
          alt="WhatsApp MarketingCode.ID"
          width={56}
          height={56}
          className="w-14 h-14 shrink-0 object-contain drop-shadow-xl"
        />
      </a>
    </aside>
  )
}
