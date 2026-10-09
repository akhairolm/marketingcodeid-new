'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  Layers,
  Image as ImageIcon,
  ExternalLink,
} from 'lucide-react'
import { cn } from '@/lib/utils'

export interface DraftCounts {
  articles: number
  portfolios: number
}

const navItems = [
  { title: 'Ringkasan', href: '/dashboard', icon: LayoutDashboard, badgeKey: null },
  { title: 'Portofolio', href: '/dashboard/portofolio', icon: Briefcase, badgeKey: 'portfolios' as const },
  { title: 'Artikel Blog', href: '/dashboard/artikel', icon: FileText, badgeKey: 'articles' as const },
  { title: 'Kategori', href: '/dashboard/kategori', icon: Layers, badgeKey: null },
  { title: 'Media', href: '/dashboard/media', icon: ImageIcon, badgeKey: null },
]

export function SidebarNav({ draftCounts }: { draftCounts: DraftCounts }) {
  const pathname = usePathname()

  return (
    <>
      <nav className="px-3 py-4 space-y-1">
        <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-zinc-500">
          Menu Utama
        </div>
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive =
            pathname === item.href ||
            (item.href !== '/dashboard' && pathname.startsWith(item.href))
          const badge = item.badgeKey ? draftCounts[item.badgeKey] : 0
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                  : 'text-sidebar-foreground hover:text-sidebar-accent-foreground hover:bg-sidebar-accent/60',
              )}
            >
              <span className="flex items-center gap-2.5">
                <Icon className={cn('h-4 w-4', isActive ? 'text-primary' : 'text-zinc-500')} />
                {item.title}
              </span>
              {badge > 0 && (
                <span className="inline-flex items-center rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-semibold text-primary">
                  {badge}
                </span>
              )}
            </Link>
          )
        })}
      </nav>

      <div className="px-3 pt-4 pb-2 border-t border-sidebar-border mt-2 space-y-1">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-sidebar-foreground hover:text-sidebar-accent-foreground hover:bg-sidebar-accent/60 transition-colors"
        >
          <span className="flex items-center gap-2.5">
            <ExternalLink className="h-4 w-4 text-zinc-500" />
            Lihat Website
          </span>
        </a>
      </div>
    </>
  )
}

export function SidebarBrand() {
  return (
    <Link href="/dashboard" className="flex items-center gap-2.5 group">
      <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-sm shadow-md shadow-primary/25 group-hover:scale-105 transition-transform">
        M
      </div>
      <div>
        <div className="text-sm font-bold tracking-tight text-white flex items-center gap-1.5">
          MarketingCode
          <span className="text-[10px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded bg-primary/15 text-primary">
            Pro
          </span>
        </div>
        <div className="text-[11px] text-zinc-500 font-medium">Agency Console</div>
      </div>
    </Link>
  )
}
