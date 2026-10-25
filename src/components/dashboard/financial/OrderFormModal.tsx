'use client'

import React, { useState, useId } from 'react'
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
import { Plus, Trash2, Calculator, Loader2 } from 'lucide-react'
import { PACKAGE_PRESETS, getPackagePresets } from '@/lib/financial/package-presets'
import { calculateProfitAndMargin, formatRupiah, formatPercent } from '@/lib/financial/calculator'
import { createOrderAction } from '@/app/(dashboard)/dashboard/(main)/keuangan/actions'
import type {
  ServiceCategory,
  PaymentStatus,
  ProjectStatus,
  HppCategory,
  InitialHppItemInput,
} from '@/types/financial'

interface OrderFormModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
}

export function OrderFormModal({ open, onOpenChange, onSuccess }: OrderFormModalProps) {
  const formId = useId()
  const [loading, setLoading] = useState(false)

  // Form State
  const [serviceCategory, setServiceCategory] = useState<ServiceCategory>('website')
  const [packageName, setPackageName] = useState(PACKAGE_PRESETS[0].name)
  const [sellingPrice, setSellingPrice] = useState<number>(PACKAGE_PRESETS[0].defaultSellingPrice)
  const [clientName, setClientName] = useState('')
  const [clientPhone, setClientPhone] = useState('')
  const [clientCompany, setClientCompany] = useState('')
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('paid')
  const [paidAmount, setPaidAmount] = useState<number>(PACKAGE_PRESETS[0].defaultSellingPrice)
  const [projectStatus, setProjectStatus] = useState<ProjectStatus>('in_progress')
  const [orderDate, setOrderDate] = useState(() => new Date().toISOString().split('T')[0])
  const [notes, setNotes] = useState('')

  // HPP Items State
  const [hppItems, setHppItems] = useState<InitialHppItemInput[]>(
    PACKAGE_PRESETS[0].defaultHppItems
  )

  // Saat kategori layanan diubah
  const handleCategoryChange = (category: ServiceCategory) => {
    setServiceCategory(category)
    const available = getPackagePresets(category)
    if (available.length > 0) {
      const first = available[0]
      setPackageName(first.name)
      setSellingPrice(first.defaultSellingPrice)
      setHppItems(first.defaultHppItems)
      if (paymentStatus === 'paid') {
        setPaidAmount(first.defaultSellingPrice)
      }
    } else {
      setPackageName('Paket Kustom')
      setSellingPrice(0)
      setHppItems([])
    }
  }

  // Saat paket layanan diubah
  const handlePackageChange = (name: string) => {
    setPackageName(name)
    const preset = PACKAGE_PRESETS.find((p) => p.category === serviceCategory && p.name === name)
    if (preset) {
      setSellingPrice(preset.defaultSellingPrice)
      setHppItems(preset.defaultHppItems)
      if (paymentStatus === 'paid') {
        setPaidAmount(preset.defaultSellingPrice)
      }
    }
  }

  // Tambah item HPP
  const handleAddHppItem = () => {
    setHppItems([
      ...hppItems,
      {
        category: 'other',
        description: '',
        amount: 0,
      },
    ])
  }

  // Update item HPP
  const handleUpdateHppItem = (
    index: number,
    field: keyof InitialHppItemInput,
    value: any
  ) => {
    const updated = [...hppItems]
    updated[index] = { ...updated[index], [field]: value }
    setHppItems(updated)
  }

  // Hapus item HPP
  const handleRemoveHppItem = (index: number) => {
    setHppItems(hppItems.filter((_, i) => i !== index))
  }

  // Kalkulasi Live
  const totalHpp = hppItems.reduce(
    (sum, it) => sum + (Number(it.amount) || 0),
    0
  )
  const { netProfit, profitMargin } = calculateProfitAndMargin(sellingPrice, totalHpp)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!clientName.trim()) {
      toast.error('Nama klien wajib diisi.')
      return
    }

    if (!clientPhone.trim()) {
      toast.error('Nomor WhatsApp klien wajib diisi.')
      return
    }

    setLoading(true)

    try {
      const res = await createOrderAction({
        clientName,
        clientPhone,
        clientCompany,
        serviceCategory,
        packageName,
        sellingPrice,
        paymentStatus,
        paidAmount: paymentStatus === 'paid' ? sellingPrice : paidAmount,
        projectStatus,
        orderDate,
        notes,
        hppItems,
      })

      if (res.success) {
        toast.success('Order penjualan berhasil disimpan.')
        onOpenChange(false)
        // Reset form
        setClientName('')
        setClientPhone('')
        setClientCompany('')
        setNotes('')
        onSuccess?.()
      } else {
        toast.error(res.error || 'Gagal menyimpan order.')
      }
    } catch {
      toast.error('Terjadi kesalahan jaringan saat menyimpan order.')
    } finally {
      setLoading(false)
    }
  }

  const categoryOptions: { value: ServiceCategory; label: string }[] = [
    { value: 'website', label: 'Website Development' },
    { value: 'ads', label: 'Digital Advertising (Ads)' },
    { value: 'mobile', label: 'Mobile Application' },
    { value: 'custom', label: 'Layanan Kustom' },
  ]

  const currentPresets = getPackagePresets(serviceCategory)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Catat Order Penjualan Baru</DialogTitle>
          <DialogDescription>
            Pilih paket layanan untuk mengisi estimasi harga dan modal HPP secara otomatis, atau sesuaikan secara manual.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 pt-2">
          {/* Section 1: Layanan & Paket */}
          <div className="space-y-4 rounded-xl border bg-muted/30 p-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Paket Layanan Agensi
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`${formId}-category`}>Kategori Layanan</Label>
                <select
                  id={`${formId}-category`}
                  value={serviceCategory}
                  onChange={(e) => handleCategoryChange(e.target.value as ServiceCategory)}
                  className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  {categoryOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor={`${formId}-package`}>Pilihan Paket</Label>
                <select
                  id={`${formId}-package`}
                  value={packageName}
                  onChange={(e) => handlePackageChange(e.target.value)}
                  className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  {currentPresets.map((p) => (
                    <option key={p.name} value={p.name}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor={`${formId}-price`}>
                Harga Jual ke Klien (IDR)
              </Label>
              <Input
                id={`${formId}-price`}
                type="number"
                min={0}
                value={sellingPrice}
                onChange={(e) => setSellingPrice(Math.max(0, parseInt(e.target.value) || 0))}
                className="font-mono text-base font-bold"
              />
              <p className="text-xs text-muted-foreground">
                Terformat: <span className="font-semibold text-foreground">{formatRupiah(sellingPrice)}</span>
              </p>
            </div>
          </div>

          {/* Section 2: Rincian Pos Biaya HPP */}
          <div className="space-y-3 rounded-xl border bg-muted/30 p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Rincian Modal HPP Proyek
                </h4>
                <p className="text-xs text-muted-foreground">
                  Bisa dimodifikasi jika ada diskon domain atau promo hosting murah.
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddHppItem}
                className="h-8 text-xs gap-1"
              >
                <Plus className="h-3.5 w-3.5" />
                Tambah Pos
              </Button>
            </div>

            {hppItems.length === 0 ? (
              <p className="text-xs italic text-muted-foreground py-2">
                Belum ada pos biaya modal untuk order ini.
              </p>
            ) : (
              <div className="space-y-2.5">
                {hppItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-12 gap-2 items-center bg-background p-2.5 rounded-lg border text-sm"
                  >
                    <div className="col-span-3">
                      <select
                        value={item.category}
                        onChange={(e) => handleUpdateHppItem(idx, 'category', e.target.value as HppCategory)}
                        className="w-full h-8 rounded border border-input bg-background px-2 text-xs focus:outline-none"
                      >
                        <option value="hosting">Hosting</option>
                        <option value="domain">Domain</option>
                        <option value="license">Lisensi</option>
                        <option value="freelancer">Freelancer</option>
                        <option value="tools">Tools/API</option>
                        <option value="other">Lainnya</option>
                      </select>
                    </div>

                    <div className="col-span-5">
                      <Input
                        type="text"
                        placeholder="Deskripsi pos biaya"
                        value={item.description}
                        onChange={(e) => handleUpdateHppItem(idx, 'description', e.target.value)}
                        className="h-8 text-xs"
                      />
                    </div>

                    <div className="col-span-3">
                      <Input
                        type="number"
                        min={0}
                        placeholder="Nominal"
                        value={item.amount}
                        onChange={(e) =>
                          handleUpdateHppItem(idx, 'amount', Math.max(0, parseInt(e.target.value) || 0))
                        }
                        className="h-8 text-xs font-mono font-medium"
                      />
                    </div>

                    <div className="col-span-1 flex justify-end">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveHppItem(idx)}
                        className="h-8 w-8 text-destructive hover:bg-destructive/10"
                        title="Hapus pos"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Live Calculation Box */}
            <div className="mt-3 rounded-lg bg-card border p-3">
              <div className="flex items-center gap-2 pb-2 text-xs font-semibold text-muted-foreground border-b">
                <Calculator className="h-3.5 w-3.5 text-primary" />
                <span>Kalkulasi Keuntungan Otomatis:</span>
              </div>
              <div className="grid grid-cols-3 gap-2 pt-2.5 text-center">
                <div>
                  <p className="text-[11px] text-muted-foreground">Total HPP</p>
                  <p className="font-mono font-bold text-sm text-foreground">
                    {formatRupiah(totalHpp)}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] text-muted-foreground">Estimasi Laba Bersih</p>
                  <p
                    className={`font-mono font-bold text-sm ${
                      netProfit >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600'
                    }`}
                  >
                    {formatRupiah(netProfit)}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] text-muted-foreground">Profit Margin</p>
                  <p
                    className={`font-mono font-bold text-sm ${
                      profitMargin >= 50
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : profitMargin > 0
                        ? 'text-amber-600'
                        : 'text-rose-600'
                    }`}
                  >
                    {formatPercent(profitMargin)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Data Klien */}
          <div className="space-y-4 rounded-xl border bg-muted/30 p-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Informasi Klien
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`${formId}-client-name`}>Nama Klien *</Label>
                <Input
                  id={`${formId}-client-name`}
                  placeholder="Contoh: Budi Santoso"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`${formId}-client-phone`}>Nomor WhatsApp *</Label>
                <Input
                  id={`${formId}-client-phone`}
                  placeholder="Contoh: 08123456789"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor={`${formId}-client-company`}>Nama Usaha / Perusahaan (Opsional)</Label>
              <Input
                id={`${formId}-client-company`}
                placeholder="Contoh: PT Harapan Makmur / Agan Travel"
                value={clientCompany}
                onChange={(e) => setClientCompany(e.target.value)}
              />
            </div>
          </div>

          {/* Section 4: Status Pembayaran & Tanggal */}
          <div className="space-y-4 rounded-xl border bg-muted/30 p-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Status Pembayaran & Tanggal Transaksi
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`${formId}-payment-status`}>Status Pembayaran</Label>
                <select
                  id={`${formId}-payment-status`}
                  value={paymentStatus}
                  onChange={(e) => {
                    const status = e.target.value as PaymentStatus
                    setPaymentStatus(status)
                    if (status === 'paid') {
                      setPaidAmount(sellingPrice)
                    } else if (status === 'unpaid') {
                      setPaidAmount(0)
                    }
                  }}
                  className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none"
                >
                  <option value="paid">Lunas (100%)</option>
                  <option value="down_payment">Uang Muka (DP)</option>
                  <option value="unpaid">Belum Bayar</option>
                </select>
              </div>

              {paymentStatus === 'down_payment' && (
                <div className="space-y-2">
                  <Label htmlFor={`${formId}-paid-amount`}>Nominal DP (IDR)</Label>
                  <Input
                    id={`${formId}-paid-amount`}
                    type="number"
                    min={0}
                    max={sellingPrice}
                    value={paidAmount}
                    onChange={(e) => setPaidAmount(Math.max(0, parseInt(e.target.value) || 0))}
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor={`${formId}-project-status`}>Status Pengerjaan</Label>
                <select
                  id={`${formId}-project-status`}
                  value={projectStatus}
                  onChange={(e) => setProjectStatus(e.target.value as ProjectStatus)}
                  className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none"
                >
                  <option value="in_progress">Pengerjaan</option>
                  <option value="revision">Revisi</option>
                  <option value="completed">Selesai</option>
                  <option value="cancelled">Dibatalkan</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor={`${formId}-order-date`}>Tanggal Transaksi</Label>
                <Input
                  id={`${formId}-order-date`}
                  type="date"
                  value={orderDate}
                  onChange={(e) => setOrderDate(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor={`${formId}-notes`}>Catatan Internal (Opsional)</Label>
              <textarea
                id={`${formId}-notes`}
                rows={2}
                placeholder="Catatan tambahan mengenai proyek, diskon khusus, atau timeline pengerjaan..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full rounded-md border border-input bg-background p-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Batal
            </Button>
            <Button type="submit" disabled={loading} className="gap-1.5 font-bold">
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Menyimpan...
                </>
              ) : (
                'Simpan Order Penjualan'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
