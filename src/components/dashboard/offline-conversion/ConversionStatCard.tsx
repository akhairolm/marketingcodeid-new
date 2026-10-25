import React from 'react'
import type { LucideIcon } from 'lucide-react'

interface ConversionStatCardProps {
  label: string
  value: string | number
  sublabel?: string
  icon: LucideIcon
  accent?: 'blue' | 'emerald' | 'amber' | 'purple' | 'primary'
}

export function ConversionStatCard({
  label,
  value,
  sublabel,
  icon: Icon,
  accent = 'primary',
}: ConversionStatCardProps) {
  const accentClasses = {
    primary: 'bg-primary/10 text-primary border-primary/20',
    blue: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    emerald: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    amber: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    purple: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
  }[accent]

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 shadow-xs">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
          {label}
        </span>
        <div className={`flex h-9 w-9 items-center justify-center rounded-xl border ${accentClasses}`}>
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <div className="mt-3">
        <div className="text-2xl font-extrabold tracking-tight text-white">{value}</div>
        {sublabel && <div className="mt-1 text-xs text-zinc-400">{sublabel}</div>}
      </div>
    </div>
  )
}
