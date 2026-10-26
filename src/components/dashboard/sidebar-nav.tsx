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
  Target,
  TrendingUp,
  Wallet,
} from 'lucide-react'
import { cn } from '@/lib/utils'

export interface DraftCounts {
  articles: number
  portfolios: number
}

const navItems = [
  { title: 'Ringkasan', href: '/dashboard', icon: LayoutDashboard, badgeKey: null },
  {
    title: 'Portofolio',
    href: '/dashboard/portofolio',
    icon: Briefcase,
    badgeKey: 'portfolios' as const,
  },
  {
    title: 'Artikel Blog',
    href: '/dashboard/artikel',
    icon: FileText,
    badgeKey: 'articles' as const,
  },
  { title: 'Kategori', href: '/dashboard/kategori', icon: Layers, badgeKey: null },
  { title: 'Media', href: '/dashboard/media', icon: ImageIcon, badgeKey: null },
]

const conversionNavItems = [
  {
    title: 'Meta Ads Conversion',
    href: '/dashboard/offline-conversion/meta',
    icon: Target,
  },
  {
    title: 'Google Ads Conversion',
    href: '/dashboard/offline-conversion/google',
    icon: TrendingUp,
  },
]

export function SidebarNav({ draftCounts }: { draftCounts: DraftCounts }) {
  const pathname = usePathname()

  return (
    <>
      <nav className="px-3 py-4 space-y-1">
        <div className="px-3 pb-2 text-[11px] tracking-[0.12em] font-semibold text-sidebar-foreground/70">
          MENU UTAMA
        </div>
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive =
            pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))
          const badge = item.badgeKey ? draftCounts[item.badgeKey] : 0
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center justify-between px-3 min-h-11 rounded-xl text-sm font-semibold transition-all hover:translate-x-1',
                isActive
                  ? 'bg-primary text-zinc-950'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent',
              )}
            >
              <span className="flex items-center gap-3">
                <Icon
                  className={cn(
                    'h-[18px] w-[18px]',
                    isActive ? 'text-zinc-950' : 'text-sidebar-foreground/80',
                  )}
                />
                {item.title}
              </span>
              {badge > 0 && (
                <span
                  className={cn(
                    'inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold',
                    isActive ? 'bg-zinc-950/15 text-zinc-950' : 'bg-primary/15 text-primary',
                  )}
                >
                  {badge}
                </span>
              )}
            </Link>
          )
        })}

        <div className="pt-4 px-3 pb-2 text-[11px] tracking-[0.12em] font-semibold text-sidebar-foreground/70">
          MANAJEMEN BISNIS
        </div>
        <Link
          href="/dashboard/keuangan"
          className={cn(
            'flex items-center justify-between px-3 min-h-11 rounded-xl text-sm font-semibold transition-all hover:translate-x-1',
            pathname.startsWith('/dashboard/keuangan')
              ? 'bg-primary text-zinc-950'
              : 'text-sidebar-foreground hover:bg-sidebar-accent',
          )}
        >
          <span className="flex items-center gap-3">
            <Wallet
              className={cn(
                'h-[18px] w-[18px]',
                pathname.startsWith('/dashboard/keuangan') ? 'text-zinc-950' : 'text-sidebar-foreground/80',
              )}
            />
            Keuangan & Order
          </span>
        </Link>

        <div className="pt-4 px-3 pb-2 text-[11px] tracking-[0.12em] font-semibold text-sidebar-foreground/70">
          OFFLINE CONVERSION
        </div>
        {conversionNavItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center justify-between px-3 min-h-11 rounded-xl text-sm font-semibold transition-all hover:translate-x-1',
                isActive
                  ? 'bg-primary text-zinc-950'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent',
              )}
            >
              <span className="flex items-center gap-3">
                <Icon
                  className={cn(
                    'h-[18px] w-[18px]',
                    isActive ? 'text-zinc-950' : 'text-sidebar-foreground/80',
                  )}
                />
                {item.title}
              </span>
            </Link>
          )
        })}
      </nav>
    </>
  )
}

export function SidebarBrand() {
  return (
    <Link href="/dashboard" className="flex items-center gap-3 group px-2">
      <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center font-display font-extrabold text-xl text-zinc-950 group-hover:scale-105 transition-transform">
        M
      </div>
      <div>
        <div className="text-[15px] font-extrabold tracking-tight text-white leading-tight">
          MarketingCode
        </div>
        <div className="text-[11px] tracking-[0.12em] text-sidebar-foreground/70 font-semibold">
          DASHBOARD
        </div>
      </div>
    </Link>
  )
}
