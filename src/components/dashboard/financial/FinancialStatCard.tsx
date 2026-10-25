import React from 'react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FinancialStatCardProps {
  title: string
  value: string
  subValue?: string
  icon: LucideIcon
  delay?: string
  variant?: 'emerald' | 'blue' | 'amber' | 'purple' | 'primary'
  className?: string
}

const variantStyles: Record<string, string> = {
  emerald: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  blue: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  amber: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
  purple: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
  primary: 'bg-accent text-accent-foreground',
}

export function FinancialStatCard({
  title,
  value,
  subValue,
  icon: Icon,
  delay = '0ms',
  variant = 'primary',
  className,
}: FinancialStatCardProps) {
  return (
    <article
      className={cn(
        'group bg-card border border-border rounded-[20px] p-5 flex flex-col gap-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-18px_rgba(20,20,22,0.35)] animate-rise',
        className
      )}
      style={{ animationDelay: delay }}
    >
      <div className="flex justify-between items-center">
        <span className="text-xs tracking-[0.1em] font-bold text-muted-foreground uppercase">
          {title}
        </span>
        <span
          className={cn(
            'w-10 h-10 rounded-xl grid place-items-center shrink-0 transition-transform group-hover:scale-105',
            variantStyles[variant] || variantStyles.primary
          )}
        >
          <Icon className="h-5 w-5" />
        </span>
      </div>
      <div className="font-display text-[26px] sm:text-[28px] font-extrabold leading-none tracking-tight text-foreground truncate">
        {value}
      </div>
      {subValue && (
        <p className="text-[13px] leading-relaxed text-muted-foreground truncate">{subValue}</p>
      )}
    </article>
  )
}
