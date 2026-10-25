import { generateRefCode } from './ref-code'

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
 * Merekam sesi klik iklan ke backend secara asinkron dan mengembalikan URL WhatsApp
 * yang sudah disisipi kode referensi pendek (Ref: #MC-XXXX).
 * Dilengkapi batas waktu (timeout) 300ms agar calon klien tidak mengalami jeda saat klik.
 */
export async function prepareTrackedWhatsAppUrl(
  baseMessage: string,
  phoneNumber: string = '6285128038243'
): Promise<string> {
  const cleanPhone = phoneNumber.replace(/[^0-9]/g, '')
  let refCode: string = generateRefCode()

  if (typeof window !== 'undefined') {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 300)

      const res = await fetch('/api/ad-tracking/click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sourceUrl: window.location.href,
          searchParams: window.location.search,
          fbp: getCookie('_fbp'),
          fbc: getCookie('_fbc'),
        }),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (res.ok) {
        const data = await res.json()
        if (data?.refCode) {
          refCode = data.refCode
        }
      }
    } catch {
      // Fallback: gunakan refCode yang digenerate lokal jika fetch timeout atau offline
    }
  }

  const finalMessage = appendRefCodeToMessage(baseMessage, refCode)
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(finalMessage)}`
}
