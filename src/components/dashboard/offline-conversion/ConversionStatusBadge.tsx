import React from 'react'

interface ConversionStatusBadgeProps {
  status: string
}

export function ConversionStatusBadge({ status }: ConversionStatusBadgeProps) {
  const normalized = status.toUpperCase()

  const config: Record<string, { label: string; className: string }> = {
    CLICKED: {
      label: 'Klik WhatsApp',
      className: 'bg-muted text-muted-foreground border border-border',
    },
    LEAD_RECEIVED: {
      label: 'Chat Masuk',
      className: 'bg-sky-50 text-sky-700 border border-sky-200 font-bold',
    },
    WON: {
      label: 'Closing (Purchase)',
      className: 'bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold',
    },
    LOST: {
      label: 'Tidak Closing',
      className: 'bg-rose-50 text-rose-700 border border-rose-200 font-bold',
    },
    SUCCESS: {
      label: 'Terkirim CAPI',
      className: 'bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold',
    },
    FAILED: {
      label: 'Gagal Kirim',
      className: 'bg-rose-50 text-rose-700 border border-rose-200 font-bold',
    },
    PENDING: {
      label: 'Pending',
      className: 'bg-amber-50 text-amber-700 border border-amber-200 font-bold',
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

