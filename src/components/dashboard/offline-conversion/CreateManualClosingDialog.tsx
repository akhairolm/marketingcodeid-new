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
import { Plus, MessageSquarePlus } from 'lucide-react'
import { toast } from 'sonner'
import { createManualClosingAction } from '@/app/(dashboard)/dashboard/(main)/offline-conversion/meta/actions'

export function CreateManualClosingDialog() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [conversionValue, setConversionValue] = useState('1190000')
  const [channel, setChannel] = useState<'CTWA' | 'MANUAL'>('CTWA')
  const [note, setNote] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!phoneNumber.trim()) {
      toast.error('Silakan masukkan nomor WhatsApp klien.')
      return
    }

    setLoading(true)

    const formData = new FormData()
    formData.append('phoneNumber', phoneNumber.trim())
    formData.append('conversionValue', conversionValue)
    formData.append('channel', channel)
    formData.append('note', note.trim())

    try {
      const res = await createManualClosingAction(formData)
      if (res.success) {
        toast.success(
          `Closing ${res.refCode} berhasil dicatat! Sinyal Purchase telah dikirim ke Meta CAPI.`
        )
        setOpen(false)
        setPhoneNumber('')
        setNote('')
        setConversionValue('1190000')
      } else {
        toast.error(res.error || 'Gagal mencatat closing.')
      }
    } catch {
      toast.error('Terjadi kesalahan jaringan.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="rounded-full bg-primary text-white font-bold hover:bg-primary/90 text-xs h-9 px-4 cursor-pointer shadow-xs gap-1.5"
      >
        <Plus className="w-3.5 h-3.5" />
        <span>Input Closing CTWA</span>
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md bg-card border-border text-foreground rounded-[20px] p-6 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            <DialogHeader>
              <div className="flex items-center gap-2 mb-1">
                <span className="p-1.5 rounded-lg bg-primary/10 text-primary">
                  <MessageSquarePlus className="w-4 h-4" />
                </span>
                <DialogTitle className="font-display text-lg font-bold tracking-tight text-foreground">
                  Catat Closing CTWA / Chat WhatsApp
                </DialogTitle>
              </div>
              <DialogDescription className="text-muted-foreground text-xs leading-relaxed">
                Catat penjualan dari klien yang chat via iklan Click-to-WhatsApp (CTWA) atau kontak langsung, lalu kirim event Purchase ke Meta CAPI.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-2 text-xs">
              <div className="space-y-1.5">
                <Label htmlFor="manualPhoneInput" className="text-foreground text-xs font-bold">
                  Nomor WhatsApp Pembeli
                </Label>
                <Input
                  id="manualPhoneInput"
                  type="tel"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Contoh: 08123456789 atau +628123456789"
                  className="bg-background border-border text-foreground font-mono text-xs"
                />
                <p className="text-[11px] text-muted-foreground">
                  Nomor akan otomatis dinormalisasi ke E.164 (+62) dan di-hash SHA-256 untuk pencocokan akun Meta pengguna.
                </p>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="manualValueInput" className="text-foreground text-xs font-bold">
                  Nilai Transaksi Closing (IDR)
                </Label>
                <Input
                  id="manualValueInput"
                  type="number"
                  required
                  min="0"
                  step="1000"
                  value={conversionValue}
                  onChange={(e) => setConversionValue(e.target.value)}
                  placeholder="1190000"
                  className="bg-background border-border text-foreground font-semibold"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-foreground text-xs font-bold">Sumber Prospek (Jalur Iklan)</Label>
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setChannel('CTWA')}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold text-center cursor-pointer transition-colors ${
                      channel === 'CTWA'
                        ? 'border-primary bg-primary/10 text-primary font-bold'
                        : 'border-border bg-accent/20 text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    Iklan Meta CTWA
                  </button>
                  <button
                    type="button"
                    onClick={() => setChannel('MANUAL')}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold text-center cursor-pointer transition-colors ${
                      channel === 'MANUAL'
                        ? 'border-primary bg-primary/10 text-primary font-bold'
                        : 'border-border bg-accent/20 text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    Chat Langsung / Offline
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="manualNoteInput" className="text-foreground text-xs font-bold">
                  Keterangan Paket / Produk (Opsional)
                </Label>
                <Input
                  id="manualNoteInput"
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Contoh: Paket Web Katalog UMKM"
                  className="bg-background border-border text-foreground text-xs"
                />
              </div>
            </div>

            <DialogFooter className="gap-2 sm:gap-0 pt-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setOpen(false)}
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
                {loading ? 'Mengirim...' : 'Simpan & Kirim ke Meta CAPI'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
