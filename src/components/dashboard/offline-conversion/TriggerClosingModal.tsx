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
import { markMetaLeadClosingAction } from '@/app/(dashboard)/dashboard/(main)/offline-conversion/meta/actions'

interface TriggerClosingModalProps {
  session: {
    id: string
    refCode: string
    phoneNumber?: string | null
    fbc?: string | null
    fbp?: string | null
  } | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function TriggerClosingModal({ session, open, onOpenChange }: TriggerClosingModalProps) {
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
      const res = await markMetaLeadClosingAction(formData)
      if (res.success) {
        toast.success(
          `Closing berhasil dicatat! Event Purchase telah dikirim ke Meta CAPI.`
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-zinc-900 border-zinc-800 text-white">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">Catat Closing Prospek (Meta CAPI)</DialogTitle>
            <DialogDescription className="text-zinc-400 text-xs">
              Menandai sesi prospek ini sebagai transaksi berhasil (Purchase) dan menembakkan event ke Meta Conversions API secara real-time.
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
                <span className="text-zinc-400">Parameter fbc (Meta):</span>
                <span className="font-mono text-zinc-300 truncate max-w-[200px]" title={session.fbc || '-'}>
                  {session.fbc ? `${session.fbc.slice(0, 24)}...` : 'Tidak ada'}
                </span>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="conversionValue" className="text-zinc-200 text-xs font-semibold">
                Nilai Transaksi (IDR)
              </Label>
              <Input
                id="conversionValue"
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
                Nilai ini akan dilaporkan ke Meta Events Manager sebagai nilai omset (Purchase value).
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
              {loading ? 'Mengirim ke Meta...' : 'Konfirmasi Closing'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
