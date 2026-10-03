/**
 * WhatsApp CTA Utility for MarketingCode ID Agency
 */

export const DEFAULT_WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '6281234567890'

export type ConsultationContext = 
  | 'general'
  | 'website'
  | 'mobile'
  | 'ads'
  | 'government'
  | 'case-study'
  | 'article'

export function getWhatsAppUrl(
  context: ConsultationContext = 'general',
  customSubject?: string,
  phoneNumber: string = DEFAULT_WHATSAPP_NUMBER
): string {
  // Clean phone number (remove +, spaces, dashes)
  const cleanPhone = phoneNumber.replace(/[^0-9]/g, '')

  let message = 'Halo MarketingCode ID, saya ingin konsultasi kebutuhan digital untuk bisnis saya.'

  switch (context) {
    case 'website':
      message = 'Halo MarketingCode ID, saya tertarik membuat Website Custom (Company Profile / Web App) dengan performa tinggi. Bisa diskusi estimasi & alurnya?'
      break
    case 'mobile':
      message = 'Halo MarketingCode ID, saya punya kebutuhan pembuatan Aplikasi Mobile (iOS / Android). Boleh jadwalkan sesi konsultasi teknis?'
      break
    case 'ads':
      message = 'Halo MarketingCode ID, saya ingin konsultasi strategi Digital Marketing (Facebook Ads & Google Ads) untuk meningkatkan omzet bisnis saya.'
      break
    case 'government':
      message = 'Halo MarketingCode ID, kami dari instansi/perusahaan memerlukan vendor pengembang aplikasi custom terpercaya. Mohon informasi penawaran & portofolio teknis.'
      break
    case 'case-study':
      message = customSubject 
        ? `Halo MarketingCode ID, saya melihat studi kasus proyek "${customSubject}" dan tertarik membangun solusi serupa untuk bisnis saya.`
        : 'Halo MarketingCode ID, saya melihat portofolio proyek Anda dan ingin konsultasi pembuatan sistem serupa.'
      break
    case 'article':
      message = customSubject
        ? `Halo MarketingCode ID, saya membaca artikel "${customSubject}" dan ingin diskusi lebih lanjut.`
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
