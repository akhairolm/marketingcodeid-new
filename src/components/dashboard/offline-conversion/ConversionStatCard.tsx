import React from 'react'
import type { LucideIcon } from 'lucide-react'

interface ConversionStatCardProps {
  label: string
  value: string | number
  sublabel?: string
  icon: LucideIcon
  accent?: 'blue' | 'emerald' | 'amber' | 'purple' | 'primary'
  delay?: string
}

export function ConversionStatCard({
  label,
  value,
  sublabel,
  icon: Icon,
  delay = '0ms',
}: ConversionStatCardProps) {
  return (
    <article
      className="group bg-card border border-border rounded-[20px] p-5 flex flex-col gap-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-18px_rgba(20,20,22,0.35)] animate-rise"
      style={{ animationDelay: delay }}
    >
      <div className="flex justify-between items-center">
        <span className="text-xs tracking-[0.1em] font-bold text-muted-foreground uppercase">
          {label}
        </span>
        <span className="w-10 h-10 rounded-xl bg-accent text-accent-foreground grid place-items-center">
          <Icon className="h-5 w-5" />
        </span>
      </div>
      <div className="font-display text-[40px] font-extrabold leading-none tracking-tight text-foreground">
        {value}
      </div>
      {sublabel && (
        <p className="text-[13px] leading-relaxed text-muted-foreground">{sublabel}</p>
      )}
    </article>
  )
}

