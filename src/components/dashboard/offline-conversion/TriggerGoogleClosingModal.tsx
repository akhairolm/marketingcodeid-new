'use client'

import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { markGoogleLeadClosingAction } from '@/app/(dashboard)/dashboard/(main)/offline-conversion/google/actions'

interface TriggerGoogleClosingModalProps {
  session: {
    id: string
    refCode: string
    phoneNumber?: string | null
    gclid?: string | null
    wbraid?: string | null
    gbraid?: string | null
  } | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function TriggerGoogleClosingModal({
  session,
  open,
  onOpenChange,
}: TriggerGoogleClosingModalProps) {
  const [loading, setLoading] = useState(false)
  const [value, setValue] = useState('1190000')

  if (!session) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData()
    formData.append('sessionId', session.id)
    formData.append('conversionValue', value)

    try {
      const res = await markGoogleLeadClosingAction(formData)
      if (res.success) {
        toast.success(
          `Closing berhasil dicatat! Konversi telah siap diunggah ke Google Ads.`
        )
        onOpenChange(false)
      } else {
        toast.error(res.error || 'Gagal menandai closing.')
      }
    } catch {
      toast.error('Terjadi kesalahan jaringan.')
    } finally {
      setLoading(false)
    }
  }

  const activeClickId = session.gclid || session.wbraid || session.gbraid || 'Tidak terdeteksi'

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-zinc-900 border-zinc-800 text-white">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">Catat Closing Google Ads</DialogTitle>
            <DialogDescription className="text-zinc-400 text-xs">
              Menandai transaksi berhasil dan mengaitkan GCLID dengan nilai omset untuk Smart Bidding Google Ads.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4 text-xs">
            <div className="rounded-xl bg-zinc-800/60 p-3 border border-zinc-700/60 space-y-1.5">
              <div className="flex justify-between">
                <span className="text-zinc-400">Kode Referensi:</span>
                <span className="font-mono font-bold text-primary">{session.refCode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Nomor WhatsApp:</span>
                <span className="font-mono text-zinc-200">{session.phoneNumber || 'Belum terhubung'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Click ID (GCLID):</span>
                <span className="font-mono text-zinc-300 truncate max-w-[200px]" title={activeClickId}>
                  {activeClickId.length > 24 ? `${activeClickId.slice(0, 24)}...` : activeClickId}
                </span>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="googleConversionValue" className="text-zinc-200 text-xs font-semibold">
                Nilai Transaksi Closing (IDR)
              </Label>
              <Input
                id="googleConversionValue"
                type="number"
                min="0"
                step="1000"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="1190000"
                required
                className="bg-zinc-800 border-zinc-700 text-white"
              />
              <p className="text-[11px] text-zinc-400">
                Nilai ini akan dilaporkan ke Google Ads sebagai conversion value untuk perhitungan ROAS.
              </p>
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onOpenChange(false)}
              className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 cursor-pointer"
            >
              Batal
            </Button>
            <Button
              type="submit"
              size="sm"
              disabled={loading}
              className="bg-primary text-zinc-950 font-bold hover:bg-primary/90 cursor-pointer"
            >
              {loading ? 'Menyimpan...' : 'Konfirmasi Closing'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
