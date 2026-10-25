import React from 'react'

interface MaskedPhoneCellProps {
  phone: string | null | undefined
}

/**
 * Menampilkan nomor WhatsApp dengan masking bagian tengah demi menjaga kepatuhan privasi (PII).
 * Contoh: "+6281234567890" -> "+62 812-****-7890"
 */
export function MaskedPhoneCell({ phone }: MaskedPhoneCellProps) {
  if (!phone) {
    return <span className="text-zinc-500 text-xs italic">Belum terhubung</span>
  }

  const clean = phone.trim()
  if (clean.length < 8) {
    return <span className="font-mono text-xs text-zinc-300">{clean}</span>
  }

  const prefix = clean.slice(0, 6)
  const suffix = clean.slice(-4)
  const masked = `${prefix}****${suffix}`

  return (
    <span className="font-mono text-xs text-zinc-200 tracking-tight" title={clean}>
      {masked}
    </span>
  )
}
