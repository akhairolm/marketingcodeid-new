import React from 'react'
import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google'
import '@/app/(frontend)/styles.css'

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
  title: 'MarketingCode Console — Custom Agency Dashboard',
  description:
    'Dashboard admin fullstack Next.js untuk mengelola portofolio, artikel, kategori, dan media agensi.',
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${plusJakartaSans.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans bg-zinc-50 text-zinc-900 antialiased selection:bg-[#FF5C28] selection:text-white">
        {children}
      </body>
    </html>
  )
}
