import { generateRefCode } from './ref-code'
import { getPersistedAdParams } from './ad-storage'
import { DEFAULT_WHATSAPP_NUMBER } from '@/lib/whatsapp'

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(new RegExp('(^|;\\s*)' + name + '=([^;]+)'))
  return match ? decodeURIComponent(match[2]) : null
}

export function appendRefCodeToMessage(baseMessage: string, refCode: string): string {
  const clean = baseMessage.trim()
  if (clean.includes('(Ref:')) return clean
  return `${clean} (Ref: ${refCode})`
}

/**
 * Mengirimkan data pelacakan sesi ke endpoint /api/ad-tracking/click
 * menggunakan sendBeacon / fetch keepalive agar data tidak pernah terputus
 * saat browser membuka aplikasi WhatsApp.
 */
export function dispatchAdClickTracking(
  refCode: string,
  options?: { phoneNumber?: string }
): void {
  if (typeof window === 'undefined') return

  try {
    const persisted = getPersistedAdParams() || {}
    const searchParams = window.location.search

    const payload = {
      refCode,
      sourceUrl: window.location.href,
      searchParams,
      gclid: persisted.gclid || null,
      fbclid: persisted.fbclid || null,
      wbraid: persisted.wbraid || null,
      gbraid: persisted.gbraid || null,
      fbp: getCookie('_fbp'),
      fbc: getCookie('_fbc') || persisted.fbc || null,
      phoneNumber: options?.phoneNumber || null,
    }

    const payloadStr = JSON.stringify(payload)
    const origin =
      typeof window !== 'undefined' &&
      window.location &&
      window.location.origin &&
      window.location.origin !== 'null'
        ? window.location.origin
        : ''
    const endpoint = origin ? `${origin}/api/ad-tracking/click` : '/api/ad-tracking/click'

    if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
      const blob = new Blob([payloadStr], { type: 'application/json' })
      navigator.sendBeacon(endpoint, blob)
    } else if (typeof fetch === 'function') {
      try {
        fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: payloadStr,
          keepalive: true,
        }).catch(() => {
          // Non-blocking
        })
      } catch {
        // Abaikan
      }
    }
  } catch (err) {
    console.warn('[client-tracker] Tracking dispatch error:', err)
  }

  // Picu event Contact & Lead pada Meta Pixel browser untuk mencakup kedua format konversi Meta
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    try {
      window.fbq('track', 'Contact', {
        content_name: 'WhatsApp Click',
        ref_code: refCode,
      })
      window.fbq('track', 'Lead', {
        content_name: 'WhatsApp Lead',
        ref_code: refCode,
      })
    } catch {
      // Abaikan jika pixel terblokir adblocker
    }
  }

  // Picu event whatsapp_click & generate_lead pada Google Analytics 4 / Google Tag
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    try {
      window.gtag('event', 'whatsapp_click', {
        event_category: 'engagement',
        event_label: 'WhatsApp Click',
        ref_code: refCode,
      })
      window.gtag('event', 'generate_lead', {
        event_category: 'engagement',
        event_label: 'WhatsApp Click',
        value: 0,
        currency: 'IDR',
        ref_code: refCode,
      })
    } catch {
      // Abaikan jika gtag terblokir adblocker
    }
  }
}

/**
 * Merekam sesi klik iklan ke backend dan mengembalikan URL WhatsApp
 * yang sudah disisipi kode referensi pendek (Ref: #MC-XXXX).
 */
export async function prepareTrackedWhatsAppUrl(
  baseMessage: string,
  phoneNumber: string = DEFAULT_WHATSAPP_NUMBER
): Promise<string> {
  const cleanPhone = phoneNumber.replace(/[^0-9]/g, '')
  const refCode: string = generateRefCode()

  // Kirim payload pelacakan ke backend secara asinkron
  dispatchAdClickTracking(refCode)

  const finalMessage = appendRefCodeToMessage(baseMessage, refCode)
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(finalMessage)}`
}
