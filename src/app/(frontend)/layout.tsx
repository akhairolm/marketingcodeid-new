import React from 'react'
import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google'
import './styles.css'

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500', '600'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'NexaCraft Agency — Solusi Website, Mobile App & Digital Marketing',
  description:
    'Kami merancang ekosistem digital performa tinggi: dari arsitektur kode modern, mobile app yang intuitif, hingga strategi akuisisi pelanggan berbasis konversi nyata.',
  keywords: [
    'NexaCraft Agency',
    'Jasa Pembuatan Website',
    'Mobile App Dev iOS Android',
    'Digital Marketing Ads',
    'Next.js Agency',
    'UI UX Design',
  ],
  authors: [{ name: 'NexaCraft Digital Agency' }],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`scroll-smooth ${plusJakartaSans.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans bg-[#FBFBFB] text-[#18181B] antialiased selection:bg-[#FF5C28] selection:text-white">
        {children}
      </body>
    </html>
  )
}
