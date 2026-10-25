const SAFE_CHARS = '23456789ABCDEFGHJKMNPQRSTUVWXYZ'

/**
 * Menghasilkan kode referensi acak pendek yang aman, mudah dibaca, dan tidak ambigu.
 * Contoh hasil: "#MC-9K2A"
 */
export function generateRefCode(prefix = 'MC', length = 4): string {
  let result = ''
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * SAFE_CHARS.length)
    result += SAFE_CHARS[randomIndex]
  }
  return `#${prefix}-${result}`
}

/**
 * Validasi apakah sebuah string memiliki format kode referensi yang valid.
 */
export function isValidRefCode(code: string | null | undefined): boolean {
  if (!code) return false
  const clean = code.trim()
  return /^#?[A-Z0-9]{2,4}-[A-Z0-9]{4,6}$/i.test(clean)
}
