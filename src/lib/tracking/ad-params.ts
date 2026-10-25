import type { AdTrackingParams } from '@/types/offline-conversion'

/**
 * Format string Meta fbc sesuai standar resmi Meta:
 * fb.1.{creation_time_ms}.{fbclid}
 */
export function formatMetaFbc(
  fbclid: string | null | undefined,
  timestampMs?: number
): string | null {
  if (!fbclid) return null
  const cleaned = fbclid.trim()
  if (!cleaned) return null
  const time = timestampMs ?? Date.now()
  return `fb.1.${time}.${cleaned}`
}

/**
 * Ekstraksi parameter iklan dari URL search parameters atau URL string.
 */
export function extractAdParamsFromSearch(
  search: URLSearchParams | string | Record<string, any> | null | undefined,
  existingCookies?: { fbp?: string | null; fbc?: string | null }
): AdTrackingParams {
  let getVal: (key: string) => string | null = () => null

  if (search instanceof URLSearchParams) {
    getVal = (k) => search.get(k) || null
  } else if (typeof search === 'string') {
    const parsed = new URLSearchParams(search.startsWith('?') ? search.slice(1) : search)
    getVal = (k) => parsed.get(k) || null
  } else if (search && typeof search === 'object') {
    getVal = (k) => (search[k] ? String(search[k]) : null)
  }

  const gclid = getVal('gclid')
  const wbraid = getVal('wbraid')
  const gbraid = getVal('gbraid')
  const fbclid = getVal('fbclid')

  const fbp = existingCookies?.fbp || getVal('_fbp')
  const fbc =
    existingCookies?.fbc ||
    getVal('_fbc') ||
    (fbclid ? formatMetaFbc(fbclid) : null)

  return {
    gclid,
    wbraid,
    gbraid,
    fbclid,
    fbc,
    fbp,
  }
}
