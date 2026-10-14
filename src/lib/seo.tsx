import { SITE_NAME, SITE_URL, absoluteUrl } from './site'

export const BRAND = SITE_NAME
export const WA_URL = 'https://wa.me/6281234567890'

/** Escapes `</script` breakout and U+2028/2029 for safe JSON-in-script embedding. */
export function jsonLdString(data: object): string {
  return JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
}

export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLdString(data) }}
    />
  )
}

export const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: BRAND,
  url: SITE_URL,
  description:
    'Agensi pembuatan website, aplikasi mobile Android/iOS, dan iklan Meta Ads di Kandangan, HSS, Kalimantan Selatan.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Kandangan',
    addressRegion: 'Kalimantan Selatan',
    addressCountry: 'ID',
  },
  areaServed: [
    'Kandangan',
    'Hulu Sungai Selatan',
    'Rantau',
    'Barabai',
    'Amuntai',
    'Banjarbaru',
    'Banjarmasin',
    'Kalimantan Selatan',
    'Indonesia',
  ],
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

export function serviceSchema(serviceType: string, description: string, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: serviceType,
    serviceType,
    description,
    url: absoluteUrl(path),
    provider: { ...orgSchema, '@id': absoluteUrl('/#organization') },
    areaServed: [
      'Kandangan',
      'Hulu Sungai Selatan',
      'Rantau',
      'Barabai',
      'Amuntai',
      'Banjarbaru',
      'Banjarmasin',
      'Kalimantan Selatan',
      'Indonesia',
    ],
  }
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}
