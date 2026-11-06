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
 * menggunakan fetch dengan keepalive agar tidak terputus saat perpindahan halaman.
 */
export function dispatchAdClickTracking(refCode: string): void {
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
    }

    // Menggunakan keepalive: true agar browser tetap menyelesaikan pengiriman data
    // meskipun pengguna langsung dialihkan ke aplikasi WhatsApp
    fetch('/api/ad-tracking/click', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch((err) => {
      console.warn('[client-tracker] Failed to dispatch tracking payload:', err)
    })
  } catch (err) {
    console.warn('[client-tracker] Tracking dispatch error:', err)
  }

  // Picu event Contact pada Meta Pixel browser untuk pelacakan Lead WhatsApp instan
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    try {
      window.fbq('track', 'Contact', {
        content_name: 'WhatsApp Click',
        ref_code: refCode,
      })
    } catch {
      // Abaikan
    }
  }

  // Picu event generate_lead pada Google Analytics 4
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    try {
      window.gtag('event', 'generate_lead', {
        event_category: 'engagement',
        event_label: 'WhatsApp Click',
        value: 0,
        currency: 'IDR',
        ref_code: refCode,
      })
    } catch {
      // Abaikan
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
