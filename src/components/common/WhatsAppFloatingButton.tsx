'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { getWhatsAppUrl, getWhatsAppDirectUrl } from '@/lib/whatsapp'
import { trackWhatsAppClick } from '@/lib/analytics'

export function WhatsAppFloatingButton() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [hasExitIntent, setHasExitIntent] = useState(false)
  const [isIdle, setIsIdle] = useState(false)

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 350)
          ticking = false
        })
        ticking = true
      }
    }

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 10 && !hasExitIntent) {
        setHasExitIntent(true)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)

    // Mobile & Desktop Idle Timer (25 seconds)
    let idleTimer: NodeJS.Timeout
    const resetIdle = () => {
      setIsIdle(false)
      clearTimeout(idleTimer)
      idleTimer = setTimeout(() => {
        setIsIdle(true)
      }, 25000)
    }

    const events = ['touchstart', 'scroll', 'mousemove', 'keydown']
    events.forEach((evt) => window.addEventListener(evt, resetIdle, { passive: true }))
    resetIdle()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('mouseleave', handleMouseLeave)
      clearTimeout(idleTimer)
      events.forEach((evt) => window.removeEventListener(evt, resetIdle))
    }
  }, [hasExitIntent])

  // Context-aware WhatsApp target URL
  let waUrl = getWhatsAppUrl('floating')
  let tooltipText = 'Konsultasi Online Cepat'

  if (pathname?.includes('/jasa-pembuatan-website')) {
    waUrl = getWhatsAppDirectUrl(
      'Halo Admin MarketingCode.ID, saya sedang melihat halaman jasa pembuatan website dan ingin konsultasi pembuatan website.'
    )
    if (hasExitIntent) {
      tooltipText = 'Ada pertanyaan sebelum pergi? Chat WA kami'
    } else if (isIdle) {
      tooltipText = 'Mau tanya estimasi biaya & slot? Chat WA'
    } else if (isScrolled) {
      tooltipText = 'Tanya Kebutuhan Website (Balas < 10 Mnt)'
    } else {
      tooltipText = 'Konsultasi Website Bisnis'
    }
  } else if (hasExitIntent) {
    tooltipText = 'Konsultasi Gratis via WhatsApp'
  } else if (isIdle) {
    tooltipText = 'Butuh bantuan? Chat admin di sini'
  } else if (isScrolled) {
    tooltipText = 'Online • Balas < 10 Menit'
  }

  return (
    <aside
      aria-label="Kontak Cepat WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex items-center gap-2 group print:hidden select-none"
    >
      {/* Tooltip Badge */}
      <span
        className={`hidden sm:inline-flex items-center gap-1.5 bg-white text-neutral-800 text-xs font-semibold px-3.5 py-1.5 rounded-full shadow-lg border transition-all duration-300 group-hover:shadow-xl group-hover:border-emerald-300 ${
          hasExitIntent
            ? 'border-emerald-500 ring-2 ring-emerald-400/40 animate-pulse'
            : isScrolled
              ? 'border-emerald-200/90 shadow-emerald-500/10'
              : 'border-neutral-200/80'
        }`}
      >
        <span className="relative flex h-2 w-2 shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        <span>{tooltipText}</span>
      </span>

      {/* Main WhatsApp Bubble Button */}
      <a
        id="floating-whatsapp-btn"
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={async (e) => {
          trackWhatsAppClick({ position: 'floating_button', service: 'floating' })
          if (typeof window !== 'undefined') {
            e.preventDefault()
            const message = pathname?.includes('/jasa-pembuatan-website')
              ? 'Halo Admin MarketingCode.ID, saya sedang melihat halaman jasa pembuatan website dan ingin konsultasi pembuatan website.'
              : 'Halo Admin MarketingCode.ID, saya sedang melihat website Anda dan ingin konsultasi langsung via WhatsApp.'
            const { prepareTrackedWhatsAppUrl } = await import('@/lib/tracking/client-tracker')
            const trackedUrl = await prepareTrackedWhatsAppUrl(message)
            window.open(trackedUrl, '_blank', 'noopener,noreferrer')
          }
        }}
        aria-label="Chat WhatsApp dengan Admin MarketingCode.ID"
        className={`flex items-center justify-center transition-all duration-300 transform hover:scale-110 active:scale-95 relative focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 rounded-full cursor-pointer ${
          isIdle ? 'animate-bounce' : ''
        }`}
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
