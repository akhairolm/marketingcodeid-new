'use client'

import React, { useState } from 'react'
import { ConversionStatusBadge } from '@/components/dashboard/offline-conversion/ConversionStatusBadge'
import { MaskedPhoneCell } from '@/components/dashboard/offline-conversion/MaskedPhoneCell'
import { TriggerGoogleClosingModal } from '@/components/dashboard/offline-conversion/TriggerGoogleClosingModal'
import { Button } from '@/components/ui/button'
import { CheckCircle2, Copy, Trash2 } from 'lucide-react'
import { deleteAdClickSessionAction } from './actions'
import { DeleteDialog } from '@/components/dashboard/DeleteDialog'
import { toast } from 'sonner'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export interface GoogleConversionItem {
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
      <Card className="bg-card border-border rounded-[20px] overflow-hidden shadow-xs">
        <CardHeader className="pb-3 border-b border-border px-6 py-4 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="font-display text-base font-bold tracking-tight">
              Riwayat GCLID & Status Konversi
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground mt-0.5">
              Menampilkan {items.length} sesi terbaru yang terekam
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="p-0 overflow-x-auto bg-card">
          <Table>
            <TableHeader className="bg-muted/30 border-b border-border">
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="py-3.5 pl-6 text-xs font-bold text-muted-foreground uppercase tracking-wider">Waktu Klik</TableHead>
                <TableHead className="py-3.5 text-xs font-bold text-muted-foreground uppercase tracking-wider">Ref Code</TableHead>
                <TableHead className="py-3.5 text-xs font-bold text-muted-foreground uppercase tracking-wider">Nomor WhatsApp</TableHead>
                <TableHead className="py-3.5 text-xs font-bold text-muted-foreground uppercase tracking-wider">Google Click ID (GCLID / WBRAID)</TableHead>
                <TableHead className="py-3.5 text-xs font-bold text-muted-foreground uppercase tracking-wider">Status</TableHead>
                <TableHead className="py-3.5 pr-6 text-right text-xs font-bold text-muted-foreground uppercase tracking-wider">Aksi Konversi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-card">
              {items.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="py-12 text-center text-muted-foreground text-xs">
                    Belum ada data sesi klik Google Ads yang tercatat. Sesi akan otomatis muncul ketika ada pengunjung yang mengklik tombol WhatsApp dari landing page.
                  </TableCell>
                </TableRow>
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
                    <TableRow key={item.id} className="border-border hover:bg-muted/30 transition-colors">
                      <TableCell className="py-3.5 pl-6 font-mono text-xs text-muted-foreground whitespace-nowrap">
                        {dateStr}
                      </TableCell>
                      <TableCell className="py-3.5 font-mono font-bold text-xs text-primary">
                        {item.refCode}
                      </TableCell>
                      <TableCell className="py-3.5 whitespace-nowrap">
                        <MaskedPhoneCell phone={item.phoneNumber} />
                      </TableCell>
                      <TableCell className="py-3.5 font-mono text-xs text-foreground max-w-xs">
                        {clickId ? (
                          <div className="flex items-center gap-1.5">
                            <span className="truncate max-w-[180px] font-medium" title={clickId}>
                              {clickId.slice(0, 18)}...
                            </span>
                            <button
                              type="button"
                              onClick={() => handleCopyGclid(clickId)}
                              className="text-muted-foreground hover:text-foreground cursor-pointer p-0.5 rounded-sm transition-colors"
                              title="Salin GCLID"
                            >
                              <Copy className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        ) : (
                          <span className="text-muted-foreground/60 italic">Tidak ada GCLID</span>
                        )}
                      </TableCell>
                      <TableCell className="py-3.5 whitespace-nowrap">
                        <ConversionStatusBadge status={item.status} />
                      </TableCell>
                      <TableCell className="py-3.5 pr-6 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          {isWon ? (
                            <div className="inline-flex items-center gap-1.5 text-chip-live-foreground text-xs font-bold">
                              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                              <span>Closing Tersimpan</span>
                            </div>
                          ) : (
                            <Button
                              size="sm"
                              onClick={() => handleOpenClosing(item)}
                              className="h-8 text-xs px-3.5 rounded-full font-bold bg-primary text-white hover:bg-primary/90 transition-all cursor-pointer shadow-xs"
                            >
                              Catat Closing
                            </Button>
                          )}

                          <DeleteDialog
                            action={async (formData) => {
                              try {
                                await deleteAdClickSessionAction(formData)
                                toast.success('Sesi berhasil dihapus.')
                              } catch {
                                toast.error('Gagal menghapus sesi.')
                              }
                            }}
                            id={item.id}
                            label={`Sesi ${item.refCode}`}
                            description="Data sesi klik iklan dan konversi terkait akan dihapus secara permanen dari database."
                          >
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full cursor-pointer transition-colors"
                              aria-label={`Hapus sesi ${item.refCode}`}
                              title="Hapus sesi"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </DeleteDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <TriggerGoogleClosingModal
        session={selectedSession}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </>
  )
}
