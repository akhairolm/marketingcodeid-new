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
    setNewPayStatus((order.paymentStatus as PaymentStatus) || 'paid')
    setNewProjStatus((order.projectStatus as ProjectStatus) || 'in_progress')
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
      <Card className="bg-card border-border rounded-[20px] overflow-hidden shadow-xs">
        <CardHeader className="pb-3 border-b border-border px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <CardTitle className="font-display text-base font-bold tracking-tight flex items-center gap-2">
              <Receipt className="h-5 w-5 text-primary" />
              <span>Daftar Transaksi Order &amp; Laba Proyek</span>
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground mt-0.5">
              Merekam transaksi penjualan jasa agensi, rincian modal HPP riil, dan margin keuntungan per proyek.
            </CardDescription>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <a
              href="/api/financial/export-csv"
              className="inline-flex items-center gap-1.5 h-9 rounded-full border border-border bg-background px-4 text-xs font-bold hover:bg-accent transition-colors"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Ekspor CSV</span>
            </a>

            <Button
              onClick={() => setOrderModalOpen(true)}
              className="h-9 rounded-full text-xs font-bold gap-1.5 px-4 shadow-sm"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Tambah Order Baru</span>
            </Button>
          </div>
        </CardHeader>

        {/* Filter Bar */}
        <div className="px-6 py-3.5 border-b border-border bg-muted/20 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari order, klien, paket..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9 text-xs bg-background rounded-xl border-border"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={periodFilter}
              onChange={(e) => setPeriodFilter(e.target.value as any)}
              className="h-9 rounded-xl border border-border bg-background px-3 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="all">Semua Waktu</option>
              <option value="month">Bulan Ini</option>
              <option value="year">Tahun Ini</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-9 rounded-xl border border-border bg-background px-3 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="all">Semua Status Bayar</option>
              <option value="paid">Lunas</option>
              <option value="down_payment">DP Terbayar</option>
              <option value="unpaid">Belum Bayar</option>
            </select>
          </div>
        </div>

        {/* Table Content */}
        <CardContent className="p-0 overflow-x-auto bg-card">
          <Table>
            <TableHeader className="bg-muted/30 border-b border-border">
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="py-3.5 pl-6 text-xs font-bold text-muted-foreground uppercase tracking-wider">No. Order / Tgl</TableHead>
                <TableHead className="py-3.5 text-xs font-bold text-muted-foreground uppercase tracking-wider">Klien &amp; WhatsApp</TableHead>
                <TableHead className="py-3.5 text-xs font-bold text-muted-foreground uppercase tracking-wider">Paket Layanan</TableHead>
                <TableHead className="py-3.5 text-xs font-bold text-muted-foreground uppercase tracking-wider text-right">Harga Jual</TableHead>
                <TableHead className="py-3.5 text-xs font-bold text-muted-foreground uppercase tracking-wider text-right">Total HPP</TableHead>
                <TableHead className="py-3.5 text-xs font-bold text-muted-foreground uppercase tracking-wider text-right">Laba Bersih</TableHead>
                <TableHead className="py-3.5 text-xs font-bold text-muted-foreground uppercase tracking-wider text-center">Margin</TableHead>
                <TableHead className="py-3.5 text-xs font-bold text-muted-foreground uppercase tracking-wider">Status</TableHead>
                <TableHead className="py-3.5 pr-6 text-xs font-bold text-muted-foreground uppercase tracking-wider text-center">Aksi</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody className="bg-card">
              {filteredOrders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="py-12 text-center text-muted-foreground text-xs">
                    <div className="flex flex-col items-center justify-center gap-2 max-w-sm mx-auto px-4 sticky left-0">
                      <FileSpreadsheet className="h-8 w-8 text-muted-foreground/40" />
                      <p className="font-semibold text-foreground">Tidak ada transaksi order yang sesuai filter.</p>
                      <p className="text-muted-foreground text-[11px]">
                        Ubah kata kunci pencarian, filter status, atau buat transaksi penjualan baru untuk proyek agensi.
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setOrderModalOpen(true)}
                        className="h-8 rounded-full text-xs font-semibold mt-2 border-border"
                      >
                        <Plus className="h-3.5 w-3.5 mr-1" />
                        <span>Buat Order Baru</span>
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
                    <TableRow key={order.id} className="border-border hover:bg-accent/40 transition-colors text-xs">
                      {/* No Order & Tanggal */}
                      <TableCell className="py-3.5 pl-6 font-medium">
                        <span className="font-mono font-bold text-primary block">
                          {order.orderNumber}
                        </span>
                        <span className="text-[11px] text-muted-foreground">
                          {orderDateStr}
                        </span>
                      </TableCell>

                      {/* Klien & WhatsApp */}
                      <TableCell className="py-3.5">
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
                          <span>{order.clientPhone}</span>
                          <ExternalLink className="h-2.5 w-2.5" />
                        </a>
                      </TableCell>

                      {/* Paket Layanan */}
                      <TableCell className="py-3.5">
                        <div className="space-y-1">
                          <ServiceCategoryBadge category={order.serviceCategory} />
                          <div className="font-medium text-foreground truncate max-w-[180px]">
                            {order.packageName}
                          </div>
                        </div>
                      </TableCell>

                      {/* Harga Jual */}
                      <TableCell className="py-3.5 text-right font-mono font-bold text-foreground">
                        {formatRupiah(order.sellingPrice)}
                      </TableCell>

                      {/* Total HPP (Bisa diklik untuk buka rincian) */}
                      <TableCell className="py-3.5 text-right">
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
                      <TableCell className="py-3.5 text-right">
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
                      <TableCell className="py-3.5 text-center font-mono">
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
                      <TableCell className="py-3.5">
                        <div className="space-y-1">
                          <PaymentStatusBadge status={order.paymentStatus} />
                          <div>
                            <ProjectStatusBadge status={order.projectStatus} />
                          </div>
                        </div>
                      </TableCell>

                      {/* Aksi */}
                      <TableCell className="py-3.5 pr-6 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleOpenDrawer(order)}
                            className="h-7 px-2.5 rounded-full text-[11px] font-semibold border-border"
                          >
                            Rincian HPP
                          </Button>

                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleOpenStatusModal(order)}
                            className="h-7 w-7 rounded-full text-muted-foreground hover:text-foreground"
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
                              className="h-7 w-7 rounded-full text-destructive hover:bg-destructive/10"
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
          <div className="w-full max-w-sm rounded-[20px] bg-card border border-border p-5 shadow-xl space-y-4">
            <div>
              <h3 className="font-bold text-base text-foreground font-display">
                Perbarui Status: {orderToUpdate.orderNumber}
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Klien: {orderToUpdate.clientName}
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-foreground">Status Pembayaran</label>
                <select
                  value={newPayStatus}
                  onChange={(e) => setNewPayStatus(e.target.value as PaymentStatus)}
                  className="w-full h-9 rounded-xl border border-border bg-background px-3 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
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
                  className="w-full h-9 rounded-xl border border-border bg-background px-3 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
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
                className="h-8 rounded-full text-xs border-border"
              >
                Batal
              </Button>
              <Button
                size="sm"
                onClick={handleSaveStatus}
                disabled={isUpdatingStatus}
                className="h-8 rounded-full text-xs font-bold"
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
