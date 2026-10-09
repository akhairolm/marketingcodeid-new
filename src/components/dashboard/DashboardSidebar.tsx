'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  Layers,
  Globe,
  Image as ImageIcon,
  ExternalLink,
  ChevronRight,
} from 'lucide-react'

const navItems = [
  {
    title: 'Ringkasan',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Portofolio',
    href: '/dashboard/portofolio',
    icon: Briefcase,
  },
  {
    title: 'Artikel Blog',
    href: '/dashboard/artikel',
    icon: FileText,
  },
  {
    title: 'Kategori',
    href: '/dashboard/kategori',
    icon: Layers,
  },
  {
    title: 'Media',
    href: '/dashboard/media',
    icon: ImageIcon,
  },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 shrink-0 bg-white border-r border-zinc-200 min-h-screen flex flex-col justify-between select-none">
      {/* Top Branding & Main Navigation */}
      <div>
        {/* Brand Header */}
        <div className="h-16 px-6 flex items-center justify-between border-b border-zinc-100">
          <Link href="/dashboard" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-[#FF5C28] flex items-center justify-center text-white font-bold text-sm shadow-md shadow-[#FF5C28]/25 group-hover:scale-105 transition-transform">
              M
            </div>
            <div>
              <div className="text-sm font-bold tracking-tight text-zinc-900 flex items-center gap-1.5">
                MarketingCode
                <span className="text-[10px] uppercase tracking-wider font-semibold px-1.5 py-0.2 rounded bg-[#FF5C28]/10 text-[#FF5C28]">
                  Pro
                </span>
              </div>
              <div className="text-[11px] text-zinc-400 font-medium">Agency CMS Hub</div>
            </div>
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="px-3 py-4 space-y-1">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
            Menu Utama
          </div>
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive =
              pathname === item.href ||
              (item.href !== '/dashboard' && pathname.startsWith(item.href))

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-[#FF5C28] text-white shadow-sm shadow-[#FF5C28]/20'
                    : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-zinc-400'}`} />
                  <span>{item.title}</span>
                </div>
                {isActive && <ChevronRight className="w-3.5 h-3.5 text-white/80" />}
              </Link>
            )
          })}

          <div className="pt-6 px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
            Akses Cepat
          </div>

          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <Globe className="w-4 h-4 text-zinc-400" />
              <span>Website Live</span>
            </div>
            <ExternalLink className="w-3 h-3 text-zinc-400" />
          </a>
        </div>
      </div>

      {/* Footer Brand Status */}
      <div className="p-4 border-t border-zinc-100">
        <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200/60 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="text-xs font-bold text-zinc-800 truncate">Fullstack Next.js</div>
            <div className="text-[10px] text-zinc-500 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              PostgreSQL Live
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
