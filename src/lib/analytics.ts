/**
 * Lightweight, privacy-respecting client analytics for MarketingCode.ID
 * Non-PII WhatsApp CTA click tracker.
 */

export interface WhatsAppClickParams {
  position: string
  service?: string
  packageTitle?: string
  path?: string
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

export function trackWhatsAppClick(params: WhatsAppClickParams): void {
  if (typeof window === 'undefined') return

  try {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'whatsapp_click', {
        cta_position: params.position || 'unknown',
        service_category: params.service || 'general',
        package_name: params.packageTitle || 'none',
        page_path: params.path || window.location.pathname,
      })
    }
  } catch {
    // Non-blocking: fail silently if analytics is blocked or unavailable
  }
}
