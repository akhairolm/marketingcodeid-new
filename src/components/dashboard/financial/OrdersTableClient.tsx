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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Label } from '@/components/ui/label'
import {
  Plus,
  Download,
  Search,
  Receipt,
  FileSpreadsheet,
  Trash2,
  ExternalLink,
  MoreHorizontal,
  ReceiptText,
  Edit3,
} from 'lucide-react'
import { toast } from 'sonner'
import {
  PaymentStatusBadge,
  ProjectStatusBadge,
  ServiceCategoryBadge,
} from './FinancialBadges'
import { HppDetailDrawer } from './HppDetailDrawer'
import { OrderFormModal } from './OrderFormModal'
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

  // Delete Alert Dialog State
  const [orderToDelete, setOrderToDelete] = useState<OrderWithHppBreakdown | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

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

  const handleConfirmDelete = async () => {
    if (!orderToDelete) return
    setIsDeleting(true)
    try {
      const res = await deleteOrderAction(orderToDelete.id)
      if (res.success) {
        toast.success('Transaksi order telah dihapus.')
        setOrders(orders.filter((o) => o.id !== orderToDelete.id))
        setOrderToDelete(null)
        router.refresh()
      } else {
        toast.error(res.error || 'Gagal menghapus order.')
      }
    } catch {
      toast.error('Terjadi kesalahan jaringan saat menghapus order.')
    } finally {
      setIsDeleting(false)
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
            <Select
              value={periodFilter}
              onValueChange={(val) => setPeriodFilter(val as 'all' | 'month' | 'year')}
            >
              <SelectTrigger className="w-[140px] h-9 text-xs bg-background">
                <SelectValue placeholder="Semua Waktu" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Waktu</SelectItem>
                <SelectItem value="month">Bulan Ini</SelectItem>
                <SelectItem value="year">Tahun Ini</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={statusFilter}
              onValueChange={(val) => setStatusFilter(val)}
            >
              <SelectTrigger className="w-[165px] h-9 text-xs bg-background">
                <SelectValue placeholder="Semua Status Bayar" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status Bayar</SelectItem>
                <SelectItem value="paid">Lunas</SelectItem>
                <SelectItem value="down_payment">DP Terbayar</SelectItem>
                <SelectItem value="unpaid">Belum Bayar</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Table Content */}
        <CardContent className="p-0 overflow-x-auto bg-card">
          <Table>
            <TableHeader className="bg-muted/30 border-b border-border">
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="py-3.5 pl-6 text-xs font-bold text-muted-foreground uppercase tracking-wider whitespace-nowrap">No. Order / Tgl</TableHead>
                <TableHead className="py-3.5 text-xs font-bold text-muted-foreground uppercase tracking-wider whitespace-nowrap">Klien &amp; WhatsApp</TableHead>
                <TableHead className="py-3.5 text-xs font-bold text-muted-foreground uppercase tracking-wider whitespace-nowrap">Paket Layanan</TableHead>
                <TableHead className="py-3.5 text-xs font-bold text-muted-foreground uppercase tracking-wider text-right whitespace-nowrap min-w-[130px]">Harga Jual</TableHead>
                <TableHead className="py-3.5 text-xs font-bold text-muted-foreground uppercase tracking-wider text-right whitespace-nowrap min-w-[130px]">Total HPP</TableHead>
                <TableHead className="py-3.5 text-xs font-bold text-muted-foreground uppercase tracking-wider text-right whitespace-nowrap min-w-[130px]">Laba Bersih</TableHead>
                <TableHead className="py-3.5 text-xs font-bold text-muted-foreground uppercase tracking-wider text-center whitespace-nowrap min-w-[80px]">Margin</TableHead>
                <TableHead className="py-3.5 text-xs font-bold text-muted-foreground uppercase tracking-wider whitespace-nowrap">Status</TableHead>
                <TableHead className="py-3.5 pr-6 text-xs font-bold text-muted-foreground uppercase tracking-wider text-center whitespace-nowrap w-[70px]">Aksi</TableHead>
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

                  const hasDistinctCompany =
                    order.clientCompany &&
                    order.clientCompany.trim().length > 0 &&
                    order.clientCompany.trim().toLowerCase() !== order.clientName.trim().toLowerCase()

                  return (
                    <TableRow key={order.id} className="border-border hover:bg-accent/40 transition-colors text-xs">
                      {/* No Order & Tanggal */}
                      <TableCell className="py-3.5 pl-6 font-medium whitespace-nowrap">
                        <span className="font-mono font-bold text-primary block">
                          {order.orderNumber}
                        </span>
                        <span className="text-[11px] text-muted-foreground block">
                          {orderDateStr}
                        </span>
                      </TableCell>

                      {/* Klien & WhatsApp */}
                      <TableCell className="py-3.5 whitespace-nowrap">
                        <div className="font-semibold text-foreground truncate max-w-[180px]">
                          {order.clientName}
                        </div>
                        {hasDistinctCompany && (
                          <div className="text-[11px] text-muted-foreground truncate max-w-[180px]">
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
                      <TableCell className="py-3.5 whitespace-nowrap">
                        <div className="space-y-1">
                          <ServiceCategoryBadge category={order.serviceCategory} />
                          <div className="font-medium text-foreground">
                            {order.packageName}
                          </div>
                        </div>
                      </TableCell>

                      {/* Harga Jual */}
                      <TableCell className="py-3.5 text-right font-mono font-bold text-foreground whitespace-nowrap">
                        {formatRupiah(order.sellingPrice)}
                      </TableCell>

                      {/* Total HPP (Bisa diklik untuk buka rincian) */}
                      <TableCell className="py-3.5 text-right whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => handleOpenDrawer(order)}
                          className="group text-right inline-block cursor-pointer"
                          title="Klik untuk melihat dan memodifikasi rincian HPP"
                        >
                          <span className="font-mono font-semibold text-foreground group-hover:text-primary transition-colors block whitespace-nowrap">
                            {formatRupiah(order.totalHpp)}
                          </span>
                          <span className="text-[10px] text-primary underline block whitespace-nowrap">
                            {order.hppItems?.length || 0} Pos Biaya
                          </span>
                        </button>
                      </TableCell>

                      {/* Laba Bersih */}
                      <TableCell className="py-3.5 text-right whitespace-nowrap">
                        <span
                          className={`font-mono font-bold block whitespace-nowrap ${
                            order.netProfit >= 0
                              ? 'text-emerald-600 dark:text-emerald-400'
                              : 'text-rose-600'
                          }`}
                        >
                          {formatRupiah(order.netProfit)}
                        </span>
                      </TableCell>

                      {/* Margin */}
                      <TableCell className="py-3.5 text-center font-mono whitespace-nowrap">
                        <span
                          className={`inline-block px-1.5 py-0.5 rounded text-[11px] font-bold whitespace-nowrap ${
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
                      <TableCell className="py-3.5 whitespace-nowrap">
                        <div className="space-y-1">
                          <PaymentStatusBadge status={order.paymentStatus} />
                          <div>
                            <ProjectStatusBadge status={order.projectStatus} />
                          </div>
                        </div>
                      </TableCell>

                      {/* Aksi: Tombol Menu Titik 3 (Shadcn UI DropdownMenu) */}
                      <TableCell className="py-3.5 pr-6 text-center whitespace-nowrap">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-md text-muted-foreground hover:text-foreground"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Buka menu aksi order</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48 shadow-lg">
                            <DropdownMenuItem
                              onClick={() => handleOpenDrawer(order)}
                              className="cursor-pointer text-xs"
                            >
                              <ReceiptText className="h-4 w-4 mr-2 text-primary" />
                              <span>Rincian Modal HPP</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleOpenStatusModal(order)}
                              className="cursor-pointer text-xs"
                            >
                              <Edit3 className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span>Ubah Status</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => setOrderToDelete(order)}
                              className="cursor-pointer text-xs text-destructive focus:text-destructive focus:bg-destructive/10"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              <span>Hapus Order</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
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

      {/* Modal Quick Update Status (Shadcn UI Dialog) */}
      <Dialog open={statusModalOpen} onOpenChange={setStatusModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-base font-bold">
              Perbarui Status Transaksi
            </DialogTitle>
            <DialogDescription className="text-xs">
              {orderToUpdate
                ? `Order ${orderToUpdate.orderNumber} - Klien: ${orderToUpdate.clientName}`
                : 'Pilih status pembayaran dan status pengerjaan proyek terbaru.'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2 text-xs">
            <div className="space-y-1.5">
              <Label htmlFor="quick-payment-status" className="text-xs font-semibold">
                Status Pembayaran
              </Label>
              <Select
                value={newPayStatus}
                onValueChange={(val) => setNewPayStatus(val as PaymentStatus)}
              >
                <SelectTrigger id="quick-payment-status" className="h-9 w-full text-xs">
                  <SelectValue placeholder="Pilih status bayar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="paid">Lunas (100%)</SelectItem>
                  <SelectItem value="down_payment">Uang Muka (DP)</SelectItem>
                  <SelectItem value="unpaid">Belum Bayar</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="quick-project-status" className="text-xs font-semibold">
                Status Pengerjaan Proyek
              </Label>
              <Select
                value={newProjStatus}
                onValueChange={(val) => setNewProjStatus(val as ProjectStatus)}
              >
                <SelectTrigger id="quick-project-status" className="h-9 w-full text-xs">
                  <SelectValue placeholder="Pilih status pengerjaan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="in_progress">Pengerjaan</SelectItem>
                  <SelectItem value="revision">Revisi</SelectItem>
                  <SelectItem value="completed">Selesai</SelectItem>
                  <SelectItem value="cancelled">Dibatalkan</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setStatusModalOpen(false)}
              disabled={isUpdatingStatus}
              className="text-xs"
            >
              Batal
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={handleSaveStatus}
              disabled={isUpdatingStatus}
              className="text-xs font-bold"
            >
              {isUpdatingStatus ? 'Menyimpan...' : 'Simpan Status'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog Konfirmasi Hapus Order (Shadcn UI AlertDialog) */}
      <AlertDialog
        open={!!orderToDelete}
        onOpenChange={(open) => !open && setOrderToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Transaksi Order?</AlertDialogTitle>
            <AlertDialogDescription className="text-xs text-muted-foreground">
              Transaksi order{' '}
              <span className="font-mono font-bold text-foreground">
                {orderToDelete?.orderNumber}
              </span>{' '}
              (Klien: {orderToDelete?.clientName}) beserta seluruh rincian pos biaya
              modal HPP terkait akan dihapus permanen dari database. Tindakan ini tidak dapat dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting} className="text-xs">
              Batal
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 text-xs font-bold"
            >
              {isDeleting ? 'Menghapus...' : 'Ya, Hapus Permanen'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
