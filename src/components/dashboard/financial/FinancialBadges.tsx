import React from 'react'
import { cn } from '@/lib/utils'
import type { PaymentStatus, ProjectStatus, ServiceCategory, HppCategory } from '@/types/financial'

export function PaymentStatusBadge({
  status,
  className,
}: {
  status: PaymentStatus | string
  className?: string
}) {
  switch (status) {
    case 'paid':
      return (
        <span
          className={cn(
            'inline-flex items-center rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 border border-emerald-500/20',
            className
          )}
        >
          Lunas
        </span>
      )
    case 'down_payment':
      return (
        <span
          className={cn(
            'inline-flex items-center rounded-full bg-amber-500/10 px-2.5 py-0.5 text-xs font-semibold text-amber-700 dark:text-amber-400 border border-amber-500/20',
            className
          )}
        >
          DP Terbayar
        </span>
      )
    case 'unpaid':
    default:
      return (
        <span
          className={cn(
            'inline-flex items-center rounded-full bg-rose-500/10 px-2.5 py-0.5 text-xs font-semibold text-rose-700 dark:text-rose-400 border border-rose-500/20',
            className
          )}
        >
          Belum Bayar
        </span>
      )
  }
}

export function ProjectStatusBadge({
  status,
  className,
}: {
  status: ProjectStatus | string
  className?: string
}) {
  switch (status) {
    case 'completed':
      return (
        <span
          className={cn(
            'inline-flex items-center rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 border border-emerald-500/20',
            className
          )}
        >
          Selesai
        </span>
      )
    case 'revision':
      return (
        <span
          className={cn(
            'inline-flex items-center rounded-full bg-orange-500/10 px-2.5 py-0.5 text-xs font-semibold text-orange-700 dark:text-orange-400 border border-orange-500/20',
            className
          )}
        >
          Revisi
        </span>
      )
    case 'cancelled':
      return (
        <span
          className={cn(
            'inline-flex items-center rounded-full bg-zinc-500/10 px-2.5 py-0.5 text-xs font-semibold text-zinc-600 dark:text-zinc-400 border border-zinc-500/20',
            className
          )}
        >
          Dibatalkan
        </span>
      )
    case 'in_progress':
    default:
      return (
        <span
          className={cn(
            'inline-flex items-center rounded-full bg-blue-500/10 px-2.5 py-0.5 text-xs font-semibold text-blue-700 dark:text-blue-400 border border-blue-500/20',
            className
          )}
        >
          Pengerjaan
        </span>
      )
  }
}

export function ServiceCategoryBadge({
  category,
  className,
}: {
  category: ServiceCategory | string
  className?: string
}) {
  switch (category) {
    case 'website':
      return (
        <span
          className={cn(
            'inline-flex items-center rounded-full bg-sky-500/10 px-2.5 py-0.5 text-xs font-semibold text-sky-700 dark:text-sky-400 border border-sky-500/20',
            className
          )}
        >
          Website
        </span>
      )
    case 'ads':
      return (
        <span
          className={cn(
            'inline-flex items-center rounded-full bg-violet-500/10 px-2.5 py-0.5 text-xs font-semibold text-violet-700 dark:text-violet-400 border border-violet-500/20',
            className
          )}
        >
          Iklan Ads
        </span>
      )
    case 'mobile':
      return (
        <span
          className={cn(
            'inline-flex items-center rounded-full bg-indigo-500/10 px-2.5 py-0.5 text-xs font-semibold text-indigo-700 dark:text-indigo-400 border border-indigo-500/20',
            className
          )}
        >
          Mobile App
        </span>
      )
    case 'custom':
    default:
      return (
        <span
          className={cn(
            'inline-flex items-center rounded-full bg-zinc-500/10 px-2.5 py-0.5 text-xs font-semibold text-zinc-700 dark:text-zinc-400 border border-zinc-500/20',
            className
          )}
        >
          Kustom
        </span>
      )
  }
}

export function HppCategoryBadge({
  category,
  className,
}: {
  category: HppCategory | string
  className?: string
}) {
  const map: Record<string, { label: string; color: string }> = {
    hosting: { label: 'Hosting/Server', color: 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20' },
    domain: { label: 'Domain', color: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20' },
    freelancer: { label: 'Freelancer', color: 'bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20' },
    license: { label: 'Lisensi', color: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20' },
    tools: { label: 'Tools/API', color: 'bg-teal-500/10 text-teal-700 dark:text-teal-400 border-teal-500/20' },
    other: { label: 'Lainnya', color: 'bg-zinc-500/10 text-zinc-700 dark:text-zinc-400 border-zinc-500/20' },
  }

  const item = map[category] || map.other

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold border',
        item.color,
        className
      )}
    >
      {item.label}
    </span>
  )
}
