import React from 'react'

interface ConversionStatusBadgeProps {
  status: string
}

export function ConversionStatusBadge({ status }: ConversionStatusBadgeProps) {
  const normalized = status.toUpperCase()

  const config: Record<string, { label: string; className: string }> = {
    CLICKED: {
      label: 'Klik WhatsApp',
      className: 'bg-zinc-800 text-zinc-300 border-zinc-700',
    },
    LEAD_RECEIVED: {
      label: 'Chat Masuk',
      className: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    },
    WON: {
      label: 'Closing (Purchase)',
      className: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    },
    LOST: {
      label: 'Tidak Closing',
      className: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
    },
    SUCCESS: {
      label: 'Terkirim CAPI',
      className: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    },
    FAILED: {
      label: 'Gagal Kirim',
      className: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
    },
    PENDING: {
      label: 'Pending',
      className: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    },
  }

  const current = config[normalized] || {
    label: status,
    className: 'bg-zinc-800 text-zinc-300 border-zinc-700',
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${current.className}`}
    >
      {current.label}
    </span>
  )
}
