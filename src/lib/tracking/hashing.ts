import { createHash } from 'crypto'

/**
 * Enkripsi string menjadi SHA-256 (huruf kecil) sesuai standar Meta CAPI dan Google Enhanced Conversions.
 */
export function hashSha256(input: string | null | undefined): string | null {
  if (!input) return null
  const cleaned = input.trim().toLowerCase()
  if (!cleaned) return null
  return createHash('sha256').update(cleaned).digest('hex')
}
