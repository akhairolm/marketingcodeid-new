'use client'

import React, { useState } from 'react'
import { ConversionStatusBadge } from '@/components/dashboard/offline-conversion/ConversionStatusBadge'
import { MaskedPhoneCell } from '@/components/dashboard/offline-conversion/MaskedPhoneCell'
import { TriggerClosingModal } from '@/components/dashboard/offline-conversion/TriggerClosingModal'
import { Button } from '@/components/ui/button'
import { CheckCircle2, RotateCw } from 'lucide-react'
import { retryMetaCapiEventAction } from './actions'
import { toast } from 'sonner'

interface MetaConversionItem {
  id: string
  refCode: string
  sourceUrl: string | null
  fbclid: string | null
  fbc: string | null
  fbp: string | null
  phoneNumber: string | null
  status: string
  createdAt: Date
  conversionId?: string | null
  conversionValue?: string | null
}

export function MetaConversionTableClient({ items }: { items: MetaConversionItem[] }) {
  const [selectedSession, setSelectedSession] = useState<MetaConversionItem | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [retryingId, setRetryingId] = useState<string | null>(null)

  const handleOpenClosing = (item: MetaConversionItem) => {
    setSelectedSession(item)
    setModalOpen(true)
  }

  const handleRetry = async (conversionId: string) => {
    setRetryingId(conversionId)
    try {
      const res = await retryMetaCapiEventAction(conversionId)
      if (res.success) {
        toast.success('Pengiriman ulang event Meta CAPI berhasil.')
      } else {
        toast.error(res.error || 'Gagal mengirim ulang ke Meta.')
      }
    } catch {
      toast.error('Terjadi kesalahan jaringan.')
    } finally {
      setRetryingId(null)
    }
  }

  return (
    <>
      <div className="overflow-x-auto rounded-2xl border border-zinc-800 bg-zinc-900/60 shadow-xs">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-zinc-800 bg-zinc-950/40 text-zinc-400 font-semibold uppercase tracking-wider text-[11px]">
            <tr>
              <th className="py-3.5 px-4">Waktu Klik</th>
              <th className="py-3.5 px-4">Ref Code</th>
              <th className="py-3.5 px-4">Nomor WhatsApp</th>
              <th className="py-3.5 px-4">Parameter Meta (fbc / fbp)</th>
              <th className="py-3.5 px-4">Status Sesi</th>
              <th className="py-3.5 px-4 text-right">Aksi CAPI</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
            {items.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-zinc-500 text-xs">
                  Belum ada data sesi klik Meta Ads yang tercatat. Sesi akan otomatis muncul ketika ada pengunjung yang mengklik tombol WhatsApp dari landing page.
                </td>
              </tr>
            ) : (
              items.map((item) => {
                const dateStr = new Date(item.createdAt).toLocaleString('id-ID', {
                  day: '2-digit',
                  month: 'short',
                  hour: '2-digit',
                  minute: '2-digit',
                })
                const isWon = item.status === 'WON'

                return (
                  <tr key={item.id} className="hover:bg-zinc-800/30 transition-colors">
                    <td className="py-3 px-4 font-mono text-zinc-400 whitespace-nowrap">
                      {dateStr}
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-primary">
                      {item.refCode}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <MaskedPhoneCell phone={item.phoneNumber} />
                    </td>
                    <td className="py-3 px-4 font-mono text-[11px] text-zinc-400 max-w-xs truncate">
                      {item.fbc ? (
                        <span className="text-zinc-200" title={`fbc: ${item.fbc}\nfbp: ${item.fbp || '-'}`}>
                          {item.fbc.slice(0, 20)}...
                        </span>
                      ) : (
                        <span className="text-zinc-500 italic">Tidak ada fbclid</span>
                      )}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <ConversionStatusBadge status={item.status} />
                    </td>
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      {isWon ? (
                        <div className="inline-flex items-center gap-1.5 text-emerald-400 text-[11px] font-semibold">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          <span>Closing Tercatat</span>
                          {item.conversionId && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 text-zinc-400 hover:text-white"
                              title="Kirim ulang ke Meta CAPI"
                              disabled={retryingId === item.conversionId}
                              onClick={() => handleRetry(item.conversionId!)}
                            >
                              <RotateCw className={`h-3 w-3 ${retryingId === item.conversionId ? 'animate-spin' : ''}`} />
                            </Button>
                          )}
                        </div>
                      ) : (
                        <Button
                          size="sm"
                          onClick={() => handleOpenClosing(item)}
                          className="h-7 text-[11px] px-2.5 font-bold bg-primary/10 text-primary border border-primary/30 hover:bg-primary hover:text-zinc-950 transition-all cursor-pointer"
                        >
                          Catat Closing
                        </Button>
                      )}
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      <TriggerClosingModal
        session={selectedSession}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </>
  )
}
