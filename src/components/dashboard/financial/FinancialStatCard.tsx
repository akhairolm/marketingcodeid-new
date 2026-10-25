import React from 'react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FinancialStatCardProps {
  title: string
  value: string
  subValue?: string
  icon: LucideIcon
  variant?: 'emerald' | 'blue' | 'amber' | 'purple' | 'zinc'
  className?: string
}

const variantStyles = {
  emerald: {
    bg: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400',
    iconBg: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400',
    accentText: 'text-emerald-700 dark:text-emerald-300 font-semibold',
  },
  blue: {
    bg: 'bg-blue-500/10 border-blue-500/20 text-blue-600 dark:text-blue-400',
    iconBg: 'bg-blue-500/15 text-blue-600 dark:text-blue-400',
    accentText: 'text-blue-700 dark:text-blue-300 font-semibold',
  },
  amber: {
    bg: 'bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400',
    iconBg: 'bg-amber-500/15 text-amber-600 dark:text-amber-400',
    accentText: 'text-amber-700 dark:text-amber-300 font-semibold',
  },
  purple: {
    bg: 'bg-purple-500/10 border-purple-500/20 text-purple-600 dark:text-purple-400',
    iconBg: 'bg-purple-500/15 text-purple-600 dark:text-purple-400',
    accentText: 'text-purple-700 dark:text-purple-300 font-semibold',
  },
  zinc: {
    bg: 'bg-zinc-500/10 border-zinc-500/20 text-zinc-600 dark:text-zinc-400',
    iconBg: 'bg-zinc-500/15 text-zinc-600 dark:text-zinc-400',
    accentText: 'text-zinc-600 dark:text-zinc-300 font-medium',
  },
}

export function FinancialStatCard({
  title,
  value,
  subValue,
  icon: Icon,
  variant = 'zinc',
  className,
}: FinancialStatCardProps) {
  const styles = variantStyles[variant]

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl border bg-card p-5 shadow-xs transition-all hover:shadow-md',
        className
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1.5 min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {title}
          </p>
          <div className="text-2xl font-extrabold tracking-tight text-foreground truncate">
            {value}
          </div>
          {subValue && (
            <p className={cn('text-xs truncate', styles.accentText)}>
              {subValue}
            </p>
          )}
        </div>
        <div
          className={cn(
            'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl',
            styles.iconBg
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  )
}
