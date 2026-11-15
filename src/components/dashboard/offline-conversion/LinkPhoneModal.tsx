'use client'

import React, { useState, useEffect } from 'react'
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
import { linkGoogleSessionPhoneAction } from '@/app/(dashboard)/dashboard/(main)/offline-conversion/google/actions'

interface LinkPhoneModalProps {
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

export function LinkPhoneModal({
  session,
  open,
  onOpenChange,
}: LinkPhoneModalProps) {
  const [loading, setLoading] = useState(false)
  const [phone, setPhone] = useState('')

  useEffect(() => {
    if (session?.phoneNumber) {
      setPhone(session.phoneNumber)
    } else {
      setPhone('')
    }
  }, [session])

  if (!session) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!phone.trim()) {
      toast.error('Silakan masukkan nomor WhatsApp.')
      return
    }

    setLoading(true)

    const formData = new FormData()
    formData.append('sessionId', session.id)
    formData.append('phoneNumber', phone.trim())

    try {
      const res = await linkGoogleSessionPhoneAction(formData)
      if (res.success) {
        toast.success(
          `Nomor WhatsApp (${res.formattedPhone}) berhasil ditautkan ke sesi ${session.refCode}!`
        )
        onOpenChange(false)
      } else {
        toast.error(res.error || 'Gagal menautkan nomor WhatsApp.')
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
              Tautkan Nomor WhatsApp Lead
            </DialogTitle>
            <DialogDescription className="text-muted-foreground text-xs leading-relaxed mt-1">
              Menghubungkan nomor WhatsApp calon klien ke sesi klik iklan ini untuk validasi Lead dan Enhanced Conversions.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2 text-xs">
            <div className="rounded-xl bg-accent/40 p-4 border border-border space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground font-medium">Kode Referensi:</span>
                <span className="font-mono font-bold text-primary">{session.refCode}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground font-medium">Click ID (GCLID):</span>
                <span className="font-mono text-muted-foreground truncate max-w-[200px]" title={activeClickId}>
                  {activeClickId.length > 24 ? `${activeClickId.slice(0, 24)}...` : activeClickId}
                </span>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="leadPhoneNumberInput" className="text-foreground text-xs font-bold">
                Nomor WhatsApp Calon Klien
              </Label>
              <Input
                id="leadPhoneNumberInput"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Contoh: 08123456789 atau +628123456789"
                required
                className="bg-background border-border text-foreground font-mono text-xs"
              />
              <p className="text-[11px] text-muted-foreground">
                Nomor akan otomatis dinormalisasi ke format internasional (+62) dan di-hash SHA-256 untuk Google Enhanced Conversions. Status sesi akan otomatis berubah menjadi <strong>Lead WA Masuk</strong>.
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
              className="rounded-full bg-primary text-white font-bold hover:bg-primary/90 cursor-pointer"
            >
              {loading ? 'Menyimpan...' : 'Simpan & Tautkan'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
