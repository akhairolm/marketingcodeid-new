'use client'

import React, { useState } from 'react'
import { ConversionStatusBadge } from '@/components/dashboard/offline-conversion/ConversionStatusBadge'
import { MaskedPhoneCell } from '@/components/dashboard/offline-conversion/MaskedPhoneCell'
import { TriggerGoogleClosingModal } from '@/components/dashboard/offline-conversion/TriggerGoogleClosingModal'
import { Button } from '@/components/ui/button'
import { CheckCircle2, Copy } from 'lucide-react'
import { toast } from 'sonner'

interface GoogleConversionItem {
  id: string
  refCode: string
  sourceUrl: string | null
  gclid: string | null
  wbraid: string | null
  gbraid: string | null
  phoneNumber: string | null
  status: string
  createdAt: Date
  conversionId?: string | null
  conversionValue?: string | null
}

export function GoogleConversionTableClient({ items }: { items: GoogleConversionItem[] }) {
  const [selectedSession, setSelectedSession] = useState<GoogleConversionItem | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  const handleOpenClosing = (item: GoogleConversionItem) => {
    setSelectedSession(item)
    setModalOpen(true)
  }

  const handleCopyGclid = (gclid: string) => {
    navigator.clipboard.writeText(gclid)
    toast.success('GCLID berhasil disalin ke clipboard.')
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
              <th className="py-3.5 px-4">Google Click ID (GCLID / WBRAID)</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4 text-right">Aksi Konversi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
            {items.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-zinc-500 text-xs">
                  Belum ada data sesi klik Google Ads yang tercatat. Sesi akan otomatis muncul ketika ada pengunjung yang mengklik tombol WhatsApp dari landing page.
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
                const clickId = item.gclid || item.wbraid || item.gbraid

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
                    <td className="py-3 px-4 font-mono text-[11px] text-zinc-300 max-w-xs">
                      {clickId ? (
                        <div className="flex items-center gap-1.5">
                          <span className="truncate max-w-[180px]" title={clickId}>
                            {clickId.slice(0, 18)}...
                          </span>
                          <button
                            type="button"
                            onClick={() => handleCopyGclid(clickId)}
                            className="text-zinc-500 hover:text-zinc-300 cursor-pointer p-0.5"
                            title="Salin GCLID"
                          >
                            <Copy className="h-3 w-3" />
                          </button>
                        </div>
                      ) : (
                        <span className="text-zinc-500 italic">Tidak ada GCLID</span>
                      )}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <ConversionStatusBadge status={item.status} />
                    </td>
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      {isWon ? (
                        <div className="inline-flex items-center gap-1.5 text-emerald-400 text-[11px] font-semibold">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          <span>Closing Tersimpan</span>
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

      <TriggerGoogleClosingModal
        session={selectedSession}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </>
  )
}
