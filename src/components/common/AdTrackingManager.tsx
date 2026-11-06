'use client'

import { useEffect, Suspense } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { persistAdParamsFromUrl } from '@/lib/tracking/ad-storage'
import { generateRefCode } from '@/lib/tracking/ref-code'
import { dispatchAdClickTracking, appendRefCodeToMessage } from '@/lib/tracking/client-tracker'

function AdTrackingCore() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // 1. Simpan parameter iklan saat URL dimuat atau berubah
  useEffect(() => {
    if (typeof window === 'undefined') return
    persistAdParamsFromUrl(window.location.href)
  }, [pathname, searchParams])

  // 2. Pasang global click listener untuk menangkap semua tautan WhatsApp
  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleWhatsAppLinkClick = (event: MouseEvent) => {
      const target = (event.target as HTMLElement)?.closest?.(
        'a[href*="wa.me"], a[href*="api.whatsapp.com"]'
      ) as HTMLAnchorElement | null

      if (!target || !target.href) return

      const rawHref = target.href

      // Jangan cegat jika URL sudah memuat kode referensi (sudah diproses sebelumnya)
      if (
        rawHref.includes('(Ref:') ||
        rawHref.includes('%28Ref%3A') ||
        rawHref.includes('%23MC-') ||
        rawHref.includes('#MC-')
      ) {
        return
      }

      // Cegat navigasi default untuk menyuntikkan kode referensi
      event.preventDefault()
      event.stopPropagation()

      try {
        const url = new URL(rawHref)
        const currentText = url.searchParams.get('text') || ''
        const refCode = generateRefCode()

        const updatedMessage = appendRefCodeToMessage(currentText, refCode)
        url.searchParams.set('text', updatedMessage)
        const updatedHref = url.toString()

        // Rekam sesi iklan ke database & kirim event Meta / GA4
        dispatchAdClickTracking(refCode)

        // Buka tautan WhatsApp
        const isBlank = target.target === '_blank' || target.rel?.includes('noopener')
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

        if (isBlank && !isMobile) {
          const newWindow = window.open(updatedHref, '_blank', 'noopener,noreferrer')
          // Jika popup diblokir oleh browser, alihkan di tab yang sama
          if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
            window.location.href = updatedHref
          }
        } else {
          window.location.href = updatedHref
        }
      } catch (err) {
        console.warn('[AdTrackingManager] Error intercepting WhatsApp link, opening original href:', err)
        window.location.href = rawHref
      }
    }

    // Gunakan capture: true agar tertangkap sebelum handler lokal lain
    document.addEventListener('click', handleWhatsAppLinkClick, { capture: true })

    return () => {
      document.removeEventListener('click', handleWhatsAppLinkClick, { capture: true })
    }
  }, [])

  return null
}

export function AdTrackingManager() {
  return (
    <Suspense fallback={null}>
      <AdTrackingCore />
    </Suspense>
  )
}
