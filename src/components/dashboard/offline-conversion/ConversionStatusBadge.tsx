import React from 'react'

interface ConversionStatusBadgeProps {
  status: string
}

export function ConversionStatusBadge({ status }: ConversionStatusBadgeProps) {
  const normalized = status.toUpperCase()

  const config: Record<string, { label: string; className: string }> = {
    CLICKED: {
      label: 'Klik WhatsApp',
      className: 'bg-secondary text-secondary-foreground',
    },
    LEAD_RECEIVED: {
      label: 'Chat Masuk',
      className: 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/20',
    },
    WON: {
      label: 'Closing (Purchase)',
      className: 'bg-chip-live text-chip-live-foreground font-bold',
    },
    LOST: {
      label: 'Tidak Closing',
      className: 'bg-destructive/15 text-destructive border border-destructive/20 font-bold',
    },
    SUCCESS: {
      label: 'Terkirim CAPI',
      className: 'bg-chip-live text-chip-live-foreground font-bold',
    },
    FAILED: {
      label: 'Gagal Kirim',
      className: 'bg-destructive/15 text-destructive border border-destructive/20 font-bold',
    },
    PENDING: {
      label: 'Pending',
      className: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/20',
    },
  }

  const current = config[normalized] || {
    label: status,
    className: 'bg-secondary text-secondary-foreground',
  }

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold ${current.className}`}
    >
      {current.label}
    </span>
  )
}

