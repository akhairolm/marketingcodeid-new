import { formatMetaFbc } from './ad-params'

export interface PersistedAdParams {
  gclid?: string | null
  wbraid?: string | null
  gbraid?: string | null
  fbclid?: string | null
  fbc?: string | null
  utmSource?: string | null
  utmMedium?: string | null
  utmCampaign?: string | null
  utmTerm?: string | null
  utmContent?: string | null
  landingUrl?: string | null
  firstSeenAt?: number
  lastSeenAt?: number
}

const STORAGE_KEY = 'mc_ad_tracking_data_v1'
const NINETY_DAYS_MS = 90 * 24 * 60 * 60 * 1000

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(new RegExp('(^|;\\s*)' + name + '=([^;]+)'))
  return match ? decodeURIComponent(match[2]) : null
}

function setCookie(name: string, value: string, days: number = 90) {
  if (typeof document === 'undefined') return
  const date = new Date()
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
  const secure = typeof window !== 'undefined' && window.location.protocol === 'https:' ? '; Secure' : ''
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${date.toUTCString()}; path=/; SameSite=Lax${secure}`
}

/**
 * Membaca parameter iklan yang tersimpan di localStorage / cookies.
 * Masa kedaluwarsa 90 hari sesuai standar Google Ads dan Meta Ads.
 */
export function getPersistedAdParams(): PersistedAdParams | null {
  if (typeof window === 'undefined') return null

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed: PersistedAdParams = JSON.parse(raw)
      const now = Date.now()
      if (parsed.lastSeenAt && now - parsed.lastSeenAt < NINETY_DAYS_MS) {
        return parsed
      }
      // Sudah kedaluwarsa
      window.localStorage.removeItem(STORAGE_KEY)
    }
  } catch {
    // Abaikan jika localStorage diblokir / private mode
  }

  // Fallback: baca dari cookies 1st-party jika ada
  const cookieGclid = getCookie('_mc_gclid')
  const cookieFbclid = getCookie('_mc_fbclid')
  const cookieFbc = getCookie('_fbc')

  if (cookieGclid || cookieFbclid || cookieFbc) {
    return {
      gclid: cookieGclid,
      fbclid: cookieFbclid,
      fbc: cookieFbc,
      lastSeenAt: Date.now(),
    }
  }

  return null
}

/**
 * Menyimpan parameter iklan dari URL landing pengunjung ke localStorage dan cookies.
 */
export function persistAdParamsFromUrl(urlString?: string): PersistedAdParams | null {
  if (typeof window === 'undefined') return null

  try {
    const targetUrl = urlString || window.location.href
    const parsedUrl = new URL(targetUrl, window.location.origin)
    const searchParams = parsedUrl.searchParams

    const gclid = searchParams.get('gclid') || null
    const wbraid = searchParams.get('wbraid') || null
    const gbraid = searchParams.get('gbraid') || null
    const fbclid = searchParams.get('fbclid') || null

    const utmSource = searchParams.get('utm_source') || null
    const utmMedium = searchParams.get('utm_medium') || null
    const utmCampaign = searchParams.get('utm_campaign') || null
    const utmTerm = searchParams.get('utm_term') || null
    const utmContent = searchParams.get('utm_content') || null

    const hasNewAdParams = Boolean(
      gclid || wbraid || gbraid || fbclid || utmSource || utmCampaign
    )

    const existing = getPersistedAdParams() || {}
    const now = Date.now()

    // Jika tidak ada parameter baru dan data lama masih ada, pertahankan data lama
    if (!hasNewAdParams) {
      return Object.keys(existing).length > 0 ? existing : null
    }

    const merged: PersistedAdParams = {
      gclid: gclid || existing.gclid || null,
      wbraid: wbraid || existing.wbraid || null,
      gbraid: gbraid || existing.gbraid || null,
      fbclid: fbclid || existing.fbclid || null,
      fbc: fbclid ? formatMetaFbc(fbclid, now) : existing.fbc || null,
      utmSource: utmSource || existing.utmSource || null,
      utmMedium: utmMedium || existing.utmMedium || null,
      utmCampaign: utmCampaign || existing.utmCampaign || null,
      utmTerm: utmTerm || existing.utmTerm || null,
      utmContent: utmContent || existing.utmContent || null,
      landingUrl: existing.landingUrl || targetUrl,
      firstSeenAt: existing.firstSeenAt || now,
      lastSeenAt: now,
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(merged))

    // Set first party cookies sebagai cadangan
    if (merged.gclid) setCookie('_mc_gclid', merged.gclid)
    if (merged.fbclid) setCookie('_mc_fbclid', merged.fbclid)
    if (merged.fbc) setCookie('_fbc', merged.fbc)

    return merged
  } catch (err) {
    console.error('[ad-storage] Failed to persist ad params:', err)
    return null
  }
}

/**
 * Menghapus parameter yang tersimpan (untuk keperluan pengetesan)
 */
export function clearPersistedAdParams(): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.removeItem(STORAGE_KEY)
  } catch {
    // Abaikan
  }
}
