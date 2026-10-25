'use client'

import React, { useState } from 'react'
import { ConversionStatusBadge } from '@/components/dashboard/offline-conversion/ConversionStatusBadge'
import { MaskedPhoneCell } from '@/components/dashboard/offline-conversion/MaskedPhoneCell'
import { TriggerClosingModal } from '@/components/dashboard/offline-conversion/TriggerClosingModal'
import { Button } from '@/components/ui/button'
import { CheckCircle2, RotateCw } from 'lucide-react'
import { retryMetaCapiEventAction } from './actions'
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
      <Card className="bg-card border-border rounded-[20px] overflow-hidden shadow-xs">
        <CardHeader className="pb-3 border-b border-border px-6 py-4 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="font-display text-base font-bold tracking-tight">
              Riwayat Sesi Klik & Status Closing
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
                <TableHead className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Ref Code</TableHead>
                <TableHead className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Nomor WhatsApp</TableHead>
                <TableHead className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Parameter Meta (fbc / fbp)</TableHead>
                <TableHead className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Status Sesi</TableHead>
                <TableHead className="pr-6 text-right text-xs font-bold text-muted-foreground uppercase tracking-wider">Aksi CAPI</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-card">
              {items.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="py-12 text-center text-muted-foreground text-xs">
                    Belum ada data sesi klik Meta Ads yang tercatat. Sesi akan otomatis muncul ketika ada pengunjung yang mengklik tombol WhatsApp dari landing page.
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
                      <TableCell className="py-3.5 font-mono text-xs text-foreground max-w-xs truncate">
                        {item.fbc ? (
                          <span className="text-foreground font-medium" title={`fbc: ${item.fbc}\nfbp: ${item.fbp || '-'}`}>
                            {item.fbc.slice(0, 20)}...
                          </span>
                        ) : (
                          <span className="text-muted-foreground/60 italic">Tidak ada fbclid</span>
                        )}
                      </TableCell>
                      <TableCell className="py-3.5 whitespace-nowrap">
                        <ConversionStatusBadge status={item.status} />
                      </TableCell>
                      <TableCell className="py-3.5 pr-6 text-right whitespace-nowrap">
                        {isWon ? (
                          <div className="inline-flex items-center gap-1.5 text-chip-live-foreground text-xs font-bold">
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                            <span>Closing Tercatat</span>
                            {item.conversionId && (
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 text-muted-foreground hover:text-foreground rounded-full ml-1"
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
                            className="h-8 text-xs px-3.5 rounded-full font-bold bg-primary text-white hover:bg-primary/90 transition-all cursor-pointer shadow-xs"
                          >
                            Catat Closing
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  )
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <TriggerClosingModal
        session={selectedSession}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </>
  )
}
