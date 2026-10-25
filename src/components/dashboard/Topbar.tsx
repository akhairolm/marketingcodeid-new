'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import { LogOut } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MobileSidebar } from './MobileSidebar'
import type { DraftCounts } from './sidebar-nav'
import { logoutAction } from '@/app/(dashboard)/dashboard/(main)/actions'

const TITLES: { match: (p: string) => boolean; title: string; parent?: string }[] = [
  { match: (p) => p === '/dashboard', title: 'Ringkasan' },
  { match: (p) => p.startsWith('/dashboard/portofolio/baru'), title: 'Tambah Portofolio', parent: 'Portofolio' },
  { match: (p) => p.startsWith('/dashboard/portofolio/'), title: 'Edit Portofolio', parent: 'Portofolio' },
  { match: (p) => p.startsWith('/dashboard/portofolio'), title: 'Portofolio' },
  { match: (p) => p.startsWith('/dashboard/artikel/baru'), title: 'Tulis Artikel', parent: 'Artikel' },
  { match: (p) => p.startsWith('/dashboard/artikel/'), title: 'Edit Artikel', parent: 'Artikel' },
  { match: (p) => p.startsWith('/dashboard/artikel'), title: 'Artikel Blog' },
  { match: (p) => p.startsWith('/dashboard/kategori'), title: 'Kategori' },
  { match: (p) => p.startsWith('/dashboard/media'), title: 'Media' },
  { match: (p) => p.startsWith('/dashboard/keuangan'), title: 'Keuangan & Order', parent: 'Manajemen Bisnis' },
  { match: (p) => p.startsWith('/dashboard/offline-conversion/meta'), title: 'Meta Ads Conversion', parent: 'Offline Conversion' },
  { match: (p) => p.startsWith('/dashboard/offline-conversion/google'), title: 'Google Ads Conversion', parent: 'Offline Conversion' },
]

function pageMeta(pathname: string): { title: string; parent?: string } {
  return TITLES.find((t) => t.match(pathname)) ?? { title: 'Dashboard' }
}

function greeting(hour: number): string {
  if (hour < 11) return 'Selamat pagi'
  if (hour < 15) return 'Selamat siang'
  if (hour < 19) return 'Selamat sore'
  return 'Selamat malam'
}

export function Topbar({
  user,
  draftCounts,
}: {
  user: { name: string; email: string }
  draftCounts: DraftCounts
}) {
  const pathname = usePathname()
  const meta = pageMeta(pathname)
  const initials =
    user.name
      .split(/\s+/)
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase())
      .join('') || 'AD'
  const dateStr = new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  const isHome = pathname === '/dashboard'

  return (
    <header className="h-[72px] px-4 sm:px-8 bg-card border-b border-border flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-3 min-w-0">
        <div className="md:hidden">
          <MobileSidebar draftCounts={draftCounts} />
        </div>
        {isHome ? (
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground leading-tight">{dateStr}</p>
            <h1 className="font-display text-lg font-bold tracking-tight truncate leading-tight">
              {greeting(new Date().getHours())}, Admin
            </h1>
          </div>
        ) : (
          <div className="min-w-0">
            {meta.parent && (
              <p className="text-[11px] text-muted-foreground leading-tight">{meta.parent}</p>
            )}
            <h1 className="text-sm font-bold text-foreground tracking-tight truncate leading-tight">
              {meta.title}
            </h1>
          </div>
        )}
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-10 px-2 gap-2.5">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-primary text-zinc-950 text-sm font-extrabold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <span className="hidden sm:block text-left leading-tight">
              <span className="block text-xs font-bold text-foreground">{user.name}</span>
              <span className="block text-[11px] text-muted-foreground">{user.email}</span>
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>
            <p className="text-sm font-semibold">{user.name}</p>
            <p className="text-xs text-muted-foreground font-normal">{user.email}</p>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <a href="/" target="_blank" rel="noopener noreferrer">
              Lihat Website
            </a>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <form action={logoutAction}>
            <button
              type="submit"
              className="w-full text-left flex items-center gap-2 px-2 py-1.5 text-sm text-destructive hover:bg-accent rounded-sm cursor-pointer outline-none transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Keluar
            </button>
          </form>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}
