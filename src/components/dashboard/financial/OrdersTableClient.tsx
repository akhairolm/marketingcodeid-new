'use client'

import React, { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Plus,
  Download,
  Search,
  Receipt,
  FileSpreadsheet,
  Trash2,
  Edit2,
  ExternalLink,
} from 'lucide-react'
import { toast } from 'sonner'
import {
  PaymentStatusBadge,
  ProjectStatusBadge,
  ServiceCategoryBadge,
} from './FinancialBadges'
import { HppDetailDrawer } from './HppDetailDrawer'
import { OrderFormModal } from './OrderFormModal'
import { DeleteDialog } from '@/components/dashboard/DeleteDialog'
import { formatRupiah, formatPercent } from '@/lib/financial/calculator'
import {
  deleteOrderAction,
  updateOrderStatusAction,
} from '@/app/(dashboard)/dashboard/(main)/keuangan/actions'
import type { OrderWithHppBreakdown, PaymentStatus, ProjectStatus } from '@/types/financial'

interface OrdersTableClientProps {
  initialOrders: OrderWithHppBreakdown[]
}

export function OrdersTableClient({ initialOrders }: OrdersTableClientProps) {
  const router = useRouter()
  const [orders, setOrders] = useState<OrderWithHppBreakdown[]>(initialOrders)
  const [search, setSearch] = useState('')
  const [periodFilter, setPeriodFilter] = useState<'all' | 'month' | 'year'>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  // Modals & Drawers state
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<OrderWithHppBreakdown | null>(null)
  const [orderModalOpen, setOrderModalOpen] = useState(false)

  // Status Quick Update Modal State
  const [statusModalOpen, setStatusModalOpen] = useState(false)
  const [orderToUpdate, setOrderToUpdate] = useState<OrderWithHppBreakdown | null>(null)
  const [newPayStatus, setNewPayStatus] = useState<PaymentStatus>('paid')
  const [newProjStatus, setNewProjStatus] = useState<ProjectStatus>('in_progress')
  const [isUpdatingStatus, startStatusTransition] = useTransition()

  // Sync state if props change
  React.useEffect(() => {
    setOrders(initialOrders)
  }, [initialOrders])

  // Client-side filtering
  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
  const startOfYear = new Date(now.getFullYear(), 0, 1)

  const filteredOrders = orders.filter((order) => {
    const orderDate = new Date(order.orderDate)

    // Period filter
    if (periodFilter === 'month' && orderDate < startOfMonth) return false
    if (periodFilter === 'year' && orderDate < startOfYear) return false

    // Status filter
    if (statusFilter !== 'all' && order.paymentStatus !== statusFilter) return false

    // Search filter
    if (search.trim()) {
      const term = search.toLowerCase().trim()
      const matchNumber = order.orderNumber.toLowerCase().includes(term)
      const matchClient = order.clientName.toLowerCase().includes(term)
      const matchCompany = (order.clientCompany || '').toLowerCase().includes(term)
      const matchPhone = order.clientPhone.toLowerCase().includes(term)
      const matchPackage = order.packageName.toLowerCase().includes(term)

      if (!matchNumber && !matchClient && !matchCompany && !matchPhone && !matchPackage) {
        return false
      }
    }

    return true
  })

  const handleOpenDrawer = (order: OrderWithHppBreakdown) => {
    setSelectedOrder(order)
    setDrawerOpen(true)
  }

  const handleOpenStatusModal = (order: OrderWithHppBreakdown) => {
    setOrderToUpdate(order)
    setNewPayStatus(order.paymentStatus as PaymentStatus)
    setNewProjStatus(order.projectStatus as ProjectStatus)
    setStatusModalOpen(true)
  }

  const handleSaveStatus = () => {
    if (!orderToUpdate) return

    startStatusTransition(async () => {
      const res = await updateOrderStatusAction(orderToUpdate.id, {
        paymentStatus: newPayStatus,
        projectStatus: newProjStatus,
      })

      if (res.success) {
        toast.success('Status transaksi berhasil diperbarui.')
        setStatusModalOpen(false)
        router.refresh()
      } else {
        toast.error(res.error || 'Gagal memperbarui status.')
      }
    })
  }

  const handleDeleteOrder = async (formData: FormData) => {
    const orderId = String(formData.get('id') || '')
    if (!orderId) return

    const res = await deleteOrderAction(orderId)
    if (res.success) {
      toast.success('Transaksi order telah dihapus.')
      setOrders(orders.filter((o) => o.id !== orderId))
      router.refresh()
    } else {
      toast.error(res.error || 'Gagal menghapus order.')
    }
  }

  return (
    <>
      <Card className="border bg-white dark:bg-card shadow-xs">
        <CardHeader className="p-4 sm:p-6 border-b flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <Receipt className="h-5 w-5 text-primary" />
              Daftar Transaksi Order & Laba Proyek
            </CardTitle>
            <CardDescription className="text-xs">
              Merekam transaksi penjualan jasa agensi, rincian modal HPP riil, dan margin keuntungan per proyek.
            </CardDescription>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <a
              href="/api/financial/export-csv"
              className="inline-flex items-center gap-1.5 h-9 rounded-xl border border-input bg-background px-3 text-xs font-semibold hover:bg-accent transition-colors"
            >
              <Download className="h-3.5 w-3.5" />
              Ekspor CSV
            </a>

            <Button
              onClick={() => setOrderModalOpen(true)}
              className="h-9 rounded-xl text-xs font-bold gap-1.5"
            >
              <Plus className="h-3.5 w-3.5" />
              Tambah Order Baru
            </Button>
          </div>
        </CardHeader>

        {/* Filter Bar */}
        <div className="p-4 border-b bg-muted/20 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari order, klien, paket..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9 text-xs bg-background"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={periodFilter}
              onChange={(e) => setPeriodFilter(e.target.value as any)}
              className="h-9 rounded-md border border-input bg-background px-2.5 text-xs focus:outline-none"
            >
              <option value="all">Semua Waktu</option>
              <option value="month">Bulan Ini</option>
              <option value="year">Tahun Ini</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-9 rounded-md border border-input bg-background px-2.5 text-xs focus:outline-none"
            >
              <option value="all">Semua Status Bayar</option>
              <option value="paid">Lunas</option>
              <option value="down_payment">DP Terbayar</option>
              <option value="unpaid">Belum Bayar</option>
            </select>
          </div>
        </div>

        {/* Table Content */}
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/40 text-xs">
                  <TableHead className="font-bold">No. Order / Tgl</TableHead>
                  <TableHead className="font-bold">Klien & WhatsApp</TableHead>
                  <TableHead className="font-bold">Paket Layanan</TableHead>
                  <TableHead className="font-bold text-right">Harga Jual</TableHead>
                  <TableHead className="font-bold text-right">Total HPP</TableHead>
                  <TableHead className="font-bold text-right">Laba Bersih</TableHead>
                  <TableHead className="font-bold text-center">Margin</TableHead>
                  <TableHead className="font-bold">Status</TableHead>
                  <TableHead className="font-bold text-center">Aksi</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredOrders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="h-32 text-center text-xs text-muted-foreground">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <FileSpreadsheet className="h-8 w-8 text-muted-foreground/40" />
                        <p className="font-semibold">Tidak ada transaksi order yang sesuai filter.</p>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setOrderModalOpen(true)}
                          className="h-7 text-xs mt-1"
                        >
                          + Buat Order Baru
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredOrders.map((order) => {
                    const marginNum = parseFloat(order.profitMargin) || 0
                    const orderDateStr = order.orderDate
                      ? new Date(order.orderDate).toLocaleDateString('id-ID', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })
                      : '-'

                    return (
                      <TableRow key={order.id} className="text-xs hover:bg-muted/30">
                        {/* No Order & Tanggal */}
                        <TableCell className="font-medium">
                          <span className="font-mono font-bold text-primary block">
                            {order.orderNumber}
                          </span>
                          <span className="text-[11px] text-muted-foreground">
                            {orderDateStr}
                          </span>
                        </TableCell>

                        {/* Klien & WhatsApp */}
                        <TableCell>
                          <div className="font-semibold text-foreground truncate max-w-[160px]">
                            {order.clientName}
                          </div>
                          {order.clientCompany && (
                            <div className="text-[11px] text-muted-foreground truncate max-w-[160px]">
                              {order.clientCompany}
                            </div>
                          )}
                          <a
                            href={`https://wa.me/${order.clientPhone.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[11px] text-emerald-600 hover:underline font-mono inline-flex items-center gap-1 mt-0.5"
                          >
                            {order.clientPhone}
                            <ExternalLink className="h-2.5 w-2.5" />
                          </a>
                        </TableCell>

                        {/* Paket Layanan */}
                        <TableCell>
                          <div className="space-y-1">
                            <ServiceCategoryBadge category={order.serviceCategory} />
                            <div className="font-medium text-foreground truncate max-w-[180px]">
                              {order.packageName}
                            </div>
                          </div>
                        </TableCell>

                        {/* Harga Jual */}
                        <TableCell className="text-right font-mono font-bold text-foreground">
                          {formatRupiah(order.sellingPrice)}
                        </TableCell>

                        {/* Total HPP (Bisa diklik untuk buka rincian) */}
                        <TableCell className="text-right">
                          <button
                            type="button"
                            onClick={() => handleOpenDrawer(order)}
                            className="group text-right inline-block"
                            title="Klik untuk melihat dan memodifikasi rincian HPP"
                          >
                            <span className="font-mono font-semibold text-foreground group-hover:text-primary transition-colors block">
                              {formatRupiah(order.totalHpp)}
                            </span>
                            <span className="text-[10px] text-primary underline block">
                              {order.hppItems?.length || 0} Pos Biaya
                            </span>
                          </button>
                        </TableCell>

                        {/* Laba Bersih */}
                        <TableCell className="text-right">
                          <span
                            className={`font-mono font-bold block ${
                              order.netProfit >= 0
                                ? 'text-emerald-600 dark:text-emerald-400'
                                : 'text-rose-600'
                            }`}
                          >
                            {formatRupiah(order.netProfit)}
                          </span>
                        </TableCell>

                        {/* Margin */}
                        <TableCell className="text-center font-mono">
                          <span
                            className={`inline-block px-1.5 py-0.5 rounded text-[11px] font-bold ${
                              marginNum >= 50
                                ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400'
                                : marginNum > 0
                                ? 'bg-amber-500/10 text-amber-700 dark:text-amber-400'
                                : 'bg-rose-500/10 text-rose-700'
                            }`}
                          >
                            {formatPercent(order.profitMargin)}
                          </span>
                        </TableCell>

                        {/* Status Bayar & Proyek */}
                        <TableCell>
                          <div className="space-y-1">
                            <PaymentStatusBadge status={order.paymentStatus} />
                            <div>
                              <ProjectStatusBadge status={order.projectStatus} />
                            </div>
                          </div>
                        </TableCell>

                        {/* Aksi */}
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center gap-1">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleOpenDrawer(order)}
                              className="h-7 px-2 text-[11px] font-semibold"
                            >
                              Rincian HPP
                            </Button>

                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleOpenStatusModal(order)}
                              className="h-7 w-7 text-muted-foreground hover:text-foreground"
                              title="Ubah Status"
                            >
                              <Edit2 className="h-3.5 w-3.5" />
                            </Button>

                            <DeleteDialog
                              action={handleDeleteOrder}
                              id={order.id}
                              label={order.orderNumber}
                              description="Transaksi order ini beserta seluruh pos biaya HPP-nya akan dihapus permanen dari database."
                            >
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 text-destructive hover:bg-destructive/10"
                                title="Hapus Order"
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
          </div>
        </CardContent>
      </Card>

      {/* Drawer Detail HPP */}
      <HppDetailDrawer
        order={selectedOrder}
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        onRefresh={() => router.refresh()}
      />

      {/* Modal Input Order Baru */}
      <OrderFormModal
        open={orderModalOpen}
        onOpenChange={setOrderModalOpen}
        onSuccess={() => router.refresh()}
      />

      {/* Modal Quick Update Status */}
      {statusModalOpen && orderToUpdate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-card border p-5 shadow-lg space-y-4">
            <div>
              <h3 className="font-bold text-base text-foreground">
                Perbarui Status: {orderToUpdate.orderNumber}
              </h3>
              <p className="text-xs text-muted-foreground">
                Klien: {orderToUpdate.clientName}
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-foreground">Status Pembayaran</label>
                <select
                  value={newPayStatus}
                  onChange={(e) => setNewPayStatus(e.target.value as PaymentStatus)}
                  className="w-full h-8 rounded border border-input bg-background px-2 text-xs"
                >
                  <option value="paid">Lunas (100%)</option>
                  <option value="down_payment">Uang Muka (DP)</option>
                  <option value="unpaid">Belum Bayar</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">Status Pengerjaan Proyek</label>
                <select
                  value={newProjStatus}
                  onChange={(e) => setNewProjStatus(e.target.value as ProjectStatus)}
                  className="w-full h-8 rounded border border-input bg-background px-2 text-xs"
                >
                  <option value="in_progress">Pengerjaan</option>
                  <option value="revision">Revisi</option>
                  <option value="completed">Selesai</option>
                  <option value="cancelled">Dibatalkan</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setStatusModalOpen(false)}
                disabled={isUpdatingStatus}
                className="h-8 text-xs"
              >
                Batal
              </Button>
              <Button
                size="sm"
                onClick={handleSaveStatus}
                disabled={isUpdatingStatus}
                className="h-8 text-xs font-bold"
              >
                {isUpdatingStatus ? 'Menyimpan...' : 'Simpan Status'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
