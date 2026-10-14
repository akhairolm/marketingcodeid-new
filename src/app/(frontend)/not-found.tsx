import React from 'react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 relative pt-40 pb-28 overflow-hidden">
        <div aria-hidden className="absolute inset-0 bg-grid-pattern [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)] pointer-events-none" />
        <div className="relative max-w-xl mx-auto px-4 text-center">
          <p className="font-mono text-xs tracking-[0.2em] text-[#FF5C28]">ERROR 404</p>
          <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight text-neutral-900">Halaman tidak ditemukan</h1>
          <p className="mt-4 text-neutral-600 leading-relaxed">
            Tautan yang Anda buka mungkin sudah dipindahkan atau tidak pernah ada. Coba mulai dari salah satu halaman berikut.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="w-full sm:w-auto px-6 py-3 bg-[#FF5C28] hover:bg-[#EA4510] text-white text-sm font-semibold rounded-full shadow-glow transition-colors whitespace-nowrap"
            >
              Ke Beranda
            </Link>
            <Link
              href="/portfolio"
              className="w-full sm:w-auto px-6 py-3 bg-white border border-neutral-200 hover:border-neutral-400 text-neutral-800 text-sm font-semibold rounded-full transition-colors whitespace-nowrap"
            >
              Portofolio
            </Link>
            <Link
              href="/blog"
              className="w-full sm:w-auto px-6 py-3 bg-white border border-neutral-200 hover:border-neutral-400 text-neutral-800 text-sm font-semibold rounded-full transition-colors whitespace-nowrap"
            >
              Blog
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
