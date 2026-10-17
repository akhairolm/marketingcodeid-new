/**
 * WhatsApp CTA Utility for MarketingCode ID Agency
 */

export const DEFAULT_WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '6285128038243'

export type ConsultationContext = 
  | 'general'
  | 'hero'
  | 'website'
  | 'mobile'
  | 'ads'
  | 'marketing'
  | 'video'
  | 'government'
  | 'case-study'
  | 'article'
  | 'floating'

export function getWhatsAppUrl(
  context: ConsultationContext = 'general',
  customSubject?: string,
  phoneNumber: string = DEFAULT_WHATSAPP_NUMBER
): string {
  // Clean phone number (remove +, spaces, dashes)
  const cleanPhone = phoneNumber.replace(/[^0-9]/g, '')

  let message = 'Halo MarketingCode ID, saya ingin tanya-tanya layanan digital untuk usaha/instansi saya.'

  switch (context) {
    case 'hero':
      message = 'Halo MarketingCode ID, saya tertarik konsultasi layanan (Website/Aplikasi/Iklan) untuk wilayah Kalsel.'
      break
    case 'website':
      message = customSubject 
        ? `Halo MarketingCode ID, saya ingin konsultasi terkait paket website: ${customSubject}.`
        : 'Halo MarketingCode ID, saya ingin konsultasi estimasi biaya pembuatan website (Landing Page / Katalog Toko / Instansi).'
      break
    case 'mobile':
      message = customSubject
        ? `Halo MarketingCode ID, saya ingin konsultasi aplikasi mobile: ${customSubject}.`
        : 'Halo MarketingCode ID, saya ada rencana pembuatan aplikasi Android/iOS. Bisa diskusi tahapannya?'
      break
    case 'ads':
      message = customSubject
        ? `Halo MarketingCode ID, saya tertarik paket iklan: ${customSubject}. Bisa bantu audit akun saya?`
        : 'Halo MarketingCode ID, saya mau konsultasi iklan Meta Ads agar chat WhatsApp orderan meningkat. Bisa bantu audit akun saya?'
      break
    case 'marketing':
      message = 'Halo MarketingCode ID, saya ingin konsultasi strategi pemasaran digital lengkap (Google Ads, Meta Ads, SEO) untuk meningkatkan omzet bisnis saya.'
      break
    case 'video':
      message = 'Halo tim video MarketingCode ID, saya punya rekaman video dan ingin diedit menjadi iklan Reels/TikTok berkonversi tinggi. Boleh tahu paket harganya?'
      break
    case 'government':
      message = 'Halo MarketingCode ID, kami dari instansi memerlukan vendor pengembang sistem/aplikasi terpercaya yang patuh SPBE & tertib administrasi BAST. Mohon informasi penawaran resmi.'
      break
    case 'floating':
      message = 'Halo Admin MarketingCode ID, saya sedang melihat website Anda dan ingin konsultasi langsung via WhatsApp.'
      break
    case 'case-study':
      if (customSubject) {
        const lower = customSubject.toLowerCase()
        if (lower.includes('wadai')) {
          message = 'Halo MarketingCode ID, kami dari instansi tertarik dengan sistem aspirasi & aduan seperti Si Wadai. Bisa jadwalkan paparan teknis?'
        } else if (lower.includes('akoor')) {
          message = 'Halo MarketingCode ID, kami ingin konsultasi sistem presensi & kinerja pegawai ASN anti-manipulasi seperti Si Akoor. Boleh minta info detailnya?'
        } else if (lower.includes('ketuk')) {
          message = 'Halo MarketingCode ID, kami tertarik menerapkan sistem buku tamu digital QR Code seperti Si Ketuk Pintu. Bisa kirimkan demo / gambarannya?'
        } else {
          message = `Halo MarketingCode ID, saya melihat studi kasus proyek "${customSubject}" dan tertarik membangun solusi serupa.`
        }
      } else {
        message = 'Halo MarketingCode ID, saya melihat portofolio proyek Anda dan ingin konsultasi pembuatan sistem serupa.'
      }
      break
    case 'article':
      message = customSubject
        ? `Halo MarketingCode ID, saya membaca artikel "${customSubject}" dan ingin konsultasi penerapan solusinya untuk usaha saya.`
        : 'Halo MarketingCode ID, saya membaca artikel di blog Anda dan ingin diskusi lebih lanjut.'
      break
    default:
      if (customSubject) {
        message = `Halo MarketingCode ID, saya ingin tanya terkait: ${customSubject}`
      }
      break
  }

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`
}

