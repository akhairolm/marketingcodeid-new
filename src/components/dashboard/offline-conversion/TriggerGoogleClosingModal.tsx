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
      <DialogContent className="sm:max-w-md bg-card border-border text-foreground rounded-[20px] p-6 shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader>
            <DialogTitle className="font-display text-lg font-bold tracking-tight text-foreground">
              Catat Closing Google Ads
            </DialogTitle>
            <DialogDescription className="text-muted-foreground text-xs leading-relaxed mt-1">
              Menandai transaksi berhasil dan mengaitkan GCLID dengan nilai omset untuk Smart Bidding Google Ads.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2 text-xs">
            <div className="rounded-xl bg-accent/40 p-4 border border-border space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground font-medium">Kode Referensi:</span>
                <span className="font-mono font-bold text-primary">{session.refCode}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground font-medium">Nomor WhatsApp:</span>
                <span className="font-mono font-semibold text-foreground">{session.phoneNumber || 'Belum terhubung'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground font-medium">Click ID (GCLID):</span>
                <span className="font-mono text-muted-foreground truncate max-w-[200px]" title={activeClickId}>
                  {activeClickId.length > 24 ? `${activeClickId.slice(0, 24)}...` : activeClickId}
                </span>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="googleConversionValue" className="text-foreground text-xs font-bold">
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
                className="bg-background border-border text-foreground font-semibold"
              />
              <p className="text-[11px] text-muted-foreground">
                Nilai ini akan dilaporkan ke Google Ads sebagai conversion value untuk perhitungan ROAS.
              </p>
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0 pt-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onOpenChange(false)}
              className="rounded-full border-border text-muted-foreground hover:text-foreground hover:bg-accent cursor-pointer"
            >
              Batal
            </Button>
            <Button
              type="submit"
              size="sm"
              disabled={loading}
              className="rounded-full bg-primary text-zinc-950 font-bold hover:bg-primary/90 cursor-pointer"
            >
              {loading ? 'Menyimpan...' : 'Konfirmasi Closing'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
