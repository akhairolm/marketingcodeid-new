'use client'

import React, { useState, useEffect } from 'react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from 'sonner'
import { Plus, Trash2, Check, Loader2, Sparkles, AlertCircle } from 'lucide-react'
import { HppCategoryBadge } from './FinancialBadges'
import { calculateProfitAndMargin, formatRupiah, formatPercent } from '@/lib/financial/calculator'
import {
  addHppItemAction,
  updateHppItemAction,
  deleteHppItemAction,
} from '@/app/(dashboard)/dashboard/(main)/keuangan/actions'
import type {
  OrderWithHppBreakdown,
  OrderHppItemRow,
  HppCategory,
  AddHppItemInput,
} from '@/types/financial'

interface HppDetailDrawerProps {
  order: OrderWithHppBreakdown | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onRefresh?: () => void
}

export function HppDetailDrawer({
  order,
  open,
  onOpenChange,
  onRefresh,
}: HppDetailDrawerProps) {
  const [items, setItems] = useState<OrderHppItemRow[]>([])
  const [loadingItemId, setLoadingItemId] = useState<string | null>(null)
  const [isAdding, setIsAdding] = useState(false)

  // Form Tambah Item Baru
  const [newCategory, setNewCategory] = useState<HppCategory>('hosting')
  const [newDescription, setNewDescription] = useState('')
  const [newAmount, setNewAmount] = useState<number>(0)
  const [newNotes, setNewNotes] = useState('')

  // Edit item inline state
  const [editingItemId, setEditingItemId] = useState<string | null>(null)
  const [editDesc, setEditDesc] = useState('')
  const [editAmount, setEditAmount] = useState<number>(0)
  const [editCategory, setEditCategory] = useState<HppCategory>('hosting')
  const [editNotes, setEditNotes] = useState('')

  useEffect(() => {
    if (order) {
      setItems(order.hppItems || [])
    }
  }, [order])

  if (!order) return null

  // Kalkulasi total HPP terkini
  const totalHpp = items.reduce((sum, it) => sum + (it.amount || 0), 0)
  const { netProfit, profitMargin } = calculateProfitAndMargin(order.sellingPrice, totalHpp)

  // Handle Tambah Pos HPP Baru
  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!newDescription.trim()) {
      toast.error('Deskripsi pos biaya wajib diisi.')
      return
    }

    setIsAdding(true)

    try {
      const payload: AddHppItemInput = {
        category: newCategory,
        description: newDescription.trim(),
        amount: Math.max(0, newAmount),
        notes: newNotes.trim() || undefined,
      }

      const res = await addHppItemAction(order.id, payload)

      if (res.success && res.itemId) {
        toast.success('Pos biaya HPP baru berhasil ditambahkan.')
        // Tambah ke state lokal
        const newItem: OrderHppItemRow = {
          id: res.itemId,
          orderId: order.id,
          category: payload.category,
          description: payload.description,
          amount: payload.amount,
          notes: payload.notes || null,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
        setItems([...items, newItem])
        // Reset form
        setNewDescription('')
        setNewAmount(0)
        setNewNotes('')
        onRefresh?.()
      } else {
        toast.error(res.error || 'Gagal menambahkan pos biaya.')
      }
    } catch {
      toast.error('Terjadi kesalahan jaringan saat menambah pos biaya.')
    } finally {
      setIsAdding(false)
    }
  }

  // Mulai mode edit item
  const startEdit = (item: OrderHppItemRow) => {
    setEditingItemId(item.id)
    setEditDesc(item.description)
    setEditAmount(item.amount)
    setEditCategory(item.category as HppCategory)
    setEditNotes(item.notes || '')
  }

  // Simpan perubahan item
  const handleSaveEdit = async (itemId: string) => {
    if (!editDesc.trim()) {
      toast.error('Deskripsi pos biaya tidak boleh kosong.')
      return
    }

    setLoadingItemId(itemId)

    try {
      const res = await updateHppItemAction(itemId, {
        category: editCategory,
        description: editDesc.trim(),
        amount: Math.max(0, editAmount),
        notes: editNotes.trim() || undefined,
      })

      if (res.success) {
        toast.success('Perubahan pos biaya HPP berhasil disimpan.')
        setItems(
          items.map((it) =>
            it.id === itemId
              ? {
                  ...it,
                  category: editCategory,
                  description: editDesc.trim(),
                  amount: Math.max(0, editAmount),
                  notes: editNotes.trim() || null,
                  updatedAt: new Date(),
                }
              : it
          )
        )
        setEditingItemId(null)
        onRefresh?.()
      } else {
        toast.error(res.error || 'Gagal memperbarui pos biaya.')
      }
    } catch {
      toast.error('Terjadi kesalahan jaringan.')
    } finally {
      setLoadingItemId(null)
    }
  }

  // Hapus item HPP
  const handleDeleteItem = async (itemId: string) => {
    setLoadingItemId(itemId)

    try {
      const res = await deleteHppItemAction(itemId)

      if (res.success) {
        toast.success('Pos biaya HPP telah dihapus.')
        setItems(items.filter((it) => it.id !== itemId))
        onRefresh?.()
      } else {
        toast.error(res.error || 'Gagal menghapus pos biaya.')
      }
    } catch {
      toast.error('Terjadi kesalahan jaringan saat menghapus pos biaya.')
    } finally {
      setLoadingItemId(null)
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-xl overflow-y-auto p-6 sm:p-8 space-y-6"
      >
        <SheetHeader className="space-y-2 text-left">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">
              {order.orderNumber}
            </span>
            <span className="text-xs text-muted-foreground">
              {order.serviceCategory.toUpperCase()}
            </span>
          </div>
          <SheetTitle className="text-xl font-extrabold text-foreground leading-snug">
            Rincian & Modifikasi HPP Proyek
          </SheetTitle>
          <SheetDescription className="text-xs">
            Klien: <strong className="text-foreground">{order.clientName}</strong>
            {order.clientCompany ? ` (${order.clientCompany})` : ''} • Paket: {order.packageName}
          </SheetDescription>
        </SheetHeader>

        {/* Live Financial Summary Banner */}
        <div className="rounded-2xl border bg-muted/40 p-4 space-y-3">
          <div className="flex items-center justify-between border-b pb-2">
            <span className="text-xs font-semibold text-muted-foreground">
              Rekapitulasi Margin Proyek
            </span>
            <span className="text-[11px] text-muted-foreground">
              Harga Jual: <strong className="text-foreground">{formatRupiah(order.sellingPrice)}</strong>
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="rounded-xl bg-background/80 p-2.5 border">
              <p className="text-[11px] text-muted-foreground">Total HPP</p>
              <p className="font-mono font-extrabold text-sm text-foreground">
                {formatRupiah(totalHpp)}
              </p>
            </div>

            <div className="rounded-xl bg-background/80 p-2.5 border">
              <p className="text-[11px] text-muted-foreground">Laba Bersih</p>
              <p
                className={`font-mono font-extrabold text-sm ${
                  netProfit >= 0
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : 'text-rose-600'
                }`}
              >
                {formatRupiah(netProfit)}
              </p>
            </div>

            <div className="rounded-xl bg-background/80 p-2.5 border">
              <p className="text-[11px] text-muted-foreground">Profit Margin</p>
              <p
                className={`font-mono font-extrabold text-sm ${
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

          <p className="text-[11px] text-muted-foreground flex items-center gap-1.5 pt-1">
            <Sparkles className="h-3 w-3 text-primary shrink-0" />
            <span>
              Perubahan pos biaya di bawah otomatis me-rekalkulasi total laba bersih dan laporan finansial dashboard.
            </span>
          </p>
        </div>

        {/* Daftar Item HPP */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Daftar Pos Biaya ({items.length} Item)
            </h4>
          </div>

          {items.length === 0 ? (
            <div className="rounded-xl border border-dashed p-6 text-center text-xs text-muted-foreground space-y-1">
              <AlertCircle className="h-6 w-6 mx-auto text-muted-foreground/60" />
              <p className="font-semibold">Belum ada pos biaya HPP tercatat.</p>
              <p>Tambahkan komponen biaya pengerjaan menggunakan form di bawah.</p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {items.map((item) => {
                const isEditing = editingItemId === item.id
                const isLoading = loadingItemId === item.id

                if (isEditing) {
                  return (
                    <div
                      key={item.id}
                      className="rounded-xl border-2 border-primary/40 bg-card p-3 space-y-3 shadow-xs"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
                        <div className="sm:col-span-4">
                          <Label className="text-[11px]">Kategori</Label>
                          <Select
                            value={editCategory}
                            onValueChange={(val) => setEditCategory(val as HppCategory)}
                          >
                            <SelectTrigger className="w-full h-8 text-xs bg-background">
                              <SelectValue placeholder="Pilih Kategori" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="hosting">Hosting/Server</SelectItem>
                              <SelectItem value="domain">Domain</SelectItem>
                              <SelectItem value="license">Lisensi</SelectItem>
                              <SelectItem value="freelancer">Freelancer</SelectItem>
                              <SelectItem value="tools">Tools/API</SelectItem>
                              <SelectItem value="other">Lainnya</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="sm:col-span-8">
                          <Label className="text-[11px]">Deskripsi Pos Biaya</Label>
                          <Input
                            value={editDesc}
                            onChange={(e) => setEditDesc(e.target.value)}
                            className="h-8 text-xs"
                            placeholder="Keterangan pos biaya"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
                        <div className="sm:col-span-6">
                          <Label className="text-[11px]">Nominal Modal (IDR)</Label>
                          <Input
                            type="number"
                            min={0}
                            value={editAmount}
                            onChange={(e) =>
                              setEditAmount(Math.max(0, parseInt(e.target.value) || 0))
                            }
                            className="h-8 text-xs font-mono font-bold"
                          />
                        </div>

                        <div className="sm:col-span-6">
                          <Label className="text-[11px]">Catatan / Kode Promo (Opsional)</Label>
                          <Input
                            value={editNotes}
                            onChange={(e) => setEditNotes(e.target.value)}
                            className="h-8 text-xs"
                            placeholder="Contoh: Diskon promo 50%"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end gap-2 pt-1">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditingItemId(null)}
                          className="h-7 text-xs"
                          disabled={isLoading}
                        >
                          Batal
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          onClick={() => handleSaveEdit(item.id)}
                          className="h-7 text-xs gap-1 font-bold"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <Loader2 className="h-3 w-3 animate-spin" />
                          ) : (
                            <Check className="h-3 w-3" />
                          )}
                          Simpan
                        </Button>
                      </div>
                    </div>
                  )
                }

                return (
                  <div
                    key={item.id}
                    className="flex items-center justify-between rounded-xl border bg-card p-3 shadow-2xs hover:border-primary/30 transition-colors"
                  >
                    <div className="space-y-1 min-w-0 pr-3">
                      <div className="flex items-center gap-2">
                        <HppCategoryBadge category={item.category} />
                        <span className="font-semibold text-xs text-foreground truncate">
                          {item.description}
                        </span>
                      </div>
                      {item.notes && (
                        <p className="text-[11px] text-muted-foreground italic truncate">
                          Catatan: {item.notes}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <div className="text-right">
                        <span className="font-mono font-bold text-xs text-foreground block">
                          {formatRupiah(item.amount)}
                        </span>
                      </div>

                      <div className="flex items-center gap-1">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => startEdit(item)}
                          disabled={isLoading}
                          className="h-7 px-2 text-xs"
                        >
                          Edit
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteItem(item.id)}
                          disabled={isLoading}
                          className="h-7 w-7 text-destructive hover:bg-destructive/10"
                          title="Hapus pos biaya"
                        >
                          {isLoading ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          ) : (
                            <Trash2 className="h-3.5 w-3.5" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Form Tambah Pos Biaya Baru */}
        <div className="rounded-2xl border bg-muted/30 p-4 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <Plus className="h-3.5 w-3.5 text-primary" />
            Tambah Pos Biaya HPP Baru
          </h4>

          <form onSubmit={handleAddItem} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
              <div className="sm:col-span-4">
                <Label className="text-[11px]">Kategori</Label>
                <Select
                  value={newCategory}
                  onValueChange={(val) => setNewCategory(val as HppCategory)}
                >
                  <SelectTrigger className="w-full h-8 text-xs bg-background">
                    <SelectValue placeholder="Pilih Kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hosting">Hosting/Server</SelectItem>
                    <SelectItem value="domain">Domain</SelectItem>
                    <SelectItem value="license">Lisensi</SelectItem>
                    <SelectItem value="freelancer">Freelancer</SelectItem>
                    <SelectItem value="tools">Tools/API</SelectItem>
                    <SelectItem value="other">Lainnya</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="sm:col-span-8">
                <Label className="text-[11px]">Deskripsi Pos Biaya *</Label>
                <Input
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Contoh: Hosting Cloud VPS (Promo 50%)"
                  className="h-8 text-xs"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
              <div className="sm:col-span-6">
                <Label className="text-[11px]">Nominal Biaya (IDR) *</Label>
                <Input
                  type="number"
                  min={0}
                  value={newAmount}
                  onChange={(e) => setNewAmount(Math.max(0, parseInt(e.target.value) || 0))}
                  placeholder="Nominal modal"
                  className="h-8 text-xs font-mono font-bold"
                  required
                />
              </div>

              <div className="sm:col-span-6">
                <Label className="text-[11px]">Catatan Tambahan (Opsional)</Label>
                <Input
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="Kupon diskon / info vendor"
                  className="h-8 text-xs"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isAdding}
              className="w-full h-8 text-xs font-bold gap-1.5"
            >
              {isAdding ? (
                <>
                  <Loader2 className="h-3 w-3 animate-spin" />
                  Menambahkan...
                </>
              ) : (
                <>
                  <Plus className="h-3.5 w-3.5" />
                  Tambah Pos Biaya Ini
                </>
              )}
            </Button>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  )
}
