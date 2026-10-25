/**
 * Ekstraksi kode referensi pelacakan dari teks pesan WhatsApp.
 * Contoh input: "Halo Admin, saya tertarik paket website (Ref: #MC-9K2A)"
 * Output: "#MC-9K2A"
 */
export function extractRefCodeFromMessage(messageText: string | null | undefined): string | null {
  if (!messageText) return null

  // Format 1: (Ref: #MC-XXXX) atau Ref: #MC-XXXX atau Ref: MC-XXXX
  const refMatch = messageText.match(/Ref:\s*#?([A-Za-z0-9]{2,4}-[A-Za-z0-9]{4,6})/i)
  if (refMatch && refMatch[1]) {
    const rawCode = refMatch[1].toUpperCase()
    return rawCode.startsWith('#') ? rawCode : `#${rawCode}`
  }

  // Format 2: Tag standalone #MC-XXXX
  const hashMatch = messageText.match(/#(MC-[A-Za-z0-9]{4,6})/i)
  if (hashMatch && hashMatch[1]) {
    return `#${hashMatch[1].toUpperCase()}`
  }

  return null
}

/**
 * Normalisasi nomor telepon pengirim ke format internasional standar E.164 (misal: +628123456789).
 */
export function normalizePhoneNumberE164(rawPhone: string | null | undefined): string {
  if (!rawPhone) return ''

  // Hapus identifier whatsapp jid (@s.whatsapp.net, @c.us, dsb.)
  let cleaned = rawPhone.replace(/@.*$/, '').trim()

  // Hapus karakter non-digit selain tanda tambah
  cleaned = cleaned.replace(/[^0-9+]/g, '')

  // Hilangkan tanda + di awal terlebih dahulu untuk standardisasi
  if (cleaned.startsWith('+')) {
    cleaned = cleaned.slice(1)
  }

  // Jika berawalan '08', ubah menjadi '628'
  if (cleaned.startsWith('0')) {
    cleaned = '62' + cleaned.slice(1)
  }

  // Jika belum berawalan 62 dan panjang nomor lokal Indonesia (misal 812...)
  if (cleaned.startsWith('8')) {
    cleaned = '62' + cleaned
  }

  return `+${cleaned}`
}
