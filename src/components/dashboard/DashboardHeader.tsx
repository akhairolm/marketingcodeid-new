'use client'

import React from 'react'
import Link from 'next/link'
import { PlusCircle, ExternalLink, Globe } from 'lucide-react'

interface DashboardHeaderProps {
  title: string
  subtitle?: string
}

export function DashboardHeader({ title, subtitle }: DashboardHeaderProps) {
  return (
    <header className="h-16 px-8 bg-white border-b border-zinc-200 flex items-center justify-between sticky top-0 z-30">
      <div>
        <h1 className="text-lg font-bold text-zinc-900 tracking-tight">{title}</h1>
        {subtitle && <p className="text-xs text-zinc-500">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-3">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-600 hover:text-zinc-900 bg-zinc-100 hover:bg-zinc-200 transition-colors"
        >
          <Globe className="w-3.5 h-3.5 text-[#FF5C28]" />
          <span>Lihat Website</span>
          <ExternalLink className="w-3 h-3 text-zinc-400" />
        </a>

        <Link
          href="/dashboard/portofolio/baru"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-[#FF5C28] hover:bg-[#ea4510] text-white shadow-sm shadow-[#FF5C28]/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          <span>+ Portofolio</span>
        </Link>

        <Link
          href="/dashboard/artikel/baru"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-zinc-900 hover:bg-zinc-800 text-white transition-all hover:scale-[1.02]"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          <span>+ Artikel</span>
        </Link>
      </div>
    </header>
  )
}
