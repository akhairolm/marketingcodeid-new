/**
 * Convert any string into a URL-safe slug.
 * "Strategi SEO 2026: Panduan Lengkap!" -> "strategi-seo-2026-panduan-lengkap"
 */
export function slugify(input: string): string {
  return input
    .toString()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/&/g, '-dan-')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
