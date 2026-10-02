import React from 'react'
import type { Metadata } from 'next'
import './styles.css'

export const metadata: Metadata = {
  title: 'MarketingCode ID — Custom Web, Mobile App & Digital Marketing Agency',
  description:
    'Agensi pengembangan website custom performa tinggi (Next.js 16 & Payload CMS 3), aplikasi mobile, dan strategi digital marketing (Meta & Google Ads). Konsultasi langsung via WhatsApp.',
  keywords: [
    'Jasa Pembuatan Website Custom',
    'Next.js Agency Indonesia',
    'Aplikasi Mobile iOS Android',
    'Digital Marketing Ads',
    'Jasa Website Instansi Pemerintahan',
    'Payload CMS Developer',
  ],
  authors: [{ name: 'MarketingCode ID' }],
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="id">
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}

