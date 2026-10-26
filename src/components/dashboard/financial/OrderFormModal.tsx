'use client'

import React, { useState, useEffect, useId } from 'react'
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
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from 'sonner'
import { Plus, Trash2, Calculator, Loader2, Package, X } from 'lucide-react'
import {
  PACKAGE_PRESETS,
  getPackagePresets,
  findPackageByName,
  getCustomPackagesFromStorage,
  saveCustomPackageToStorage,
  deleteCustomPackageFromStorage,
  type PackagePreset,
} from '@/lib/financial/package-presets'
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

  // Custom Packages State
  const [customPackages, setCustomPackages] = useState<PackagePreset[]>([])
  const [isAddingCustomPackage, setIsAddingCustomPackage] = useState(false)

  // Form State untuk Tambah Paket Baru
  const [newPkgName, setNewPkgName] = useState('')
  const [newPkgCategory, setNewPkgCategory] = useState<ServiceCategory>('website')
  const [newPkgPrice, setNewPkgPrice] = useState<number>(0)
  const [newPkgDesc, setNewPkgDesc] = useState('')
  const [newPkgHppItems, setNewPkgHppItems] = useState<InitialHppItemInput[]>([
    { category: 'hosting', description: 'Biaya Server / Cloud', amount: 0 },
  ])

  // Form State Order
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

  // Muat custom packages dari localStorage saat modal terbuka
  useEffect(() => {
    if (open) {
      const stored = getCustomPackagesFromStorage()
      setCustomPackages(stored)
    }
  }, [open])

  // Saat kategori layanan diubah oleh user
  const handleCategoryChange = (category: ServiceCategory) => {
    setServiceCategory(category)
    const available = getPackagePresets(category, customPackages)
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

  // Saat paket layanan diubah oleh user dari dropdown
  const handlePackageChange = (name: string) => {
    if (name === '__add_custom_package__') {
      setIsAddingCustomPackage(true)
      return
    }
    setPackageName(name)
    const preset = findPackageByName(name, customPackages)
    if (preset) {
      // Sinkronisasi kategori layanan otomatis jika paket berasal dari kategori lain
      if (preset.category !== serviceCategory) {
        setServiceCategory(preset.category)
      }
      setSellingPrice(preset.defaultSellingPrice)
      setHppItems(preset.defaultHppItems)
      if (paymentStatus === 'paid') {
        setPaidAmount(preset.defaultSellingPrice)
      }
    }
  }

  // Simpan paket baru ke localStorage dan terapkan ke form order
  const handleSaveCustomPackage = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = newPkgName.trim()
    if (!trimmed) {
      toast.error('Nama paket wajib diisi.')
      return
    }
    if (newPkgPrice < 0) {
      toast.error('Harga jual paket tidak valid.')
      return
    }

    const created: PackagePreset = {
      category: newPkgCategory,
      name: trimmed,
      label: `${newPkgCategory.toUpperCase()} - ${trimmed} (${formatRupiah(newPkgPrice)})`,
      defaultSellingPrice: newPkgPrice,
      description: newPkgDesc.trim() || 'Paket layanan kustom agensi',
      defaultHppItems: newPkgHppItems.filter((it) => it.description.trim() !== '' || it.amount > 0),
    }

    const updated = saveCustomPackageToStorage(created)
    setCustomPackages(updated)

    // Terapkan langsung ke form order saat ini
    setServiceCategory(created.category)
    setPackageName(created.name)
    setSellingPrice(created.defaultSellingPrice)
    setHppItems(created.defaultHppItems)
    if (paymentStatus === 'paid') {
      setPaidAmount(created.defaultSellingPrice)
    }

    // Reset form tambah paket & sembunyikan
    setNewPkgName('')
    setNewPkgPrice(0)
    setNewPkgDesc('')
    setNewPkgHppItems([{ category: 'hosting', description: 'Biaya Server / Cloud', amount: 0 }])
    setIsAddingCustomPackage(false)
    toast.success(`Paket "${created.name}" berhasil ditambahkan dan dipilih.`)
  }

  // Hapus paket kustom buatan user
  const handleDeleteCustomPackage = (pkgNameToDelete: string) => {
    const updated = deleteCustomPackageFromStorage(pkgNameToDelete)
    setCustomPackages(updated)
    toast.success(`Paket "${pkgNameToDelete}" dihapus dari daftar.`)
    if (packageName === pkgNameToDelete) {
      handleCategoryChange(serviceCategory)
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
        setIsAddingCustomPackage(false)
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

  // Kelompokkan seluruh paket yang dijual agensi (otomatis digabung dengan paket kustom pengguna)
  const websitePackages = getPackagePresets('website', customPackages)
  const adsPackages = getPackagePresets('ads', customPackages)
  const mobilePackages = getPackagePresets('mobile', customPackages)
  const customPresets = getPackagePresets('custom', customPackages)

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
                <div className="min-h-[26px] flex items-center">
                  <Label htmlFor={`${formId}-category`}>Kategori Layanan</Label>
                </div>
                <Select
                  value={serviceCategory}
                  onValueChange={(val) => handleCategoryChange(val as ServiceCategory)}
                >
                  <SelectTrigger id={`${formId}-category`} className="w-full h-10">
                    <SelectValue placeholder="Pilih Kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    {categoryOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="min-h-[26px] flex items-center justify-between">
                  <Label htmlFor={`${formId}-package`}>Pilihan Paket</Label>
                  <button
                    type="button"
                    onClick={() => setIsAddingCustomPackage((prev) => !prev)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#D13D00] hover:text-[#B33400] transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Tambah Paket</span>
                  </button>
                </div>
                <Select
                  value={packageName}
                  onValueChange={(val) => {
                    if (val === '__add_custom_package__') {
                      setIsAddingCustomPackage(true)
                    } else {
                      handlePackageChange(val)
                    }
                  }}
                >
                  <SelectTrigger id={`${formId}-package`} className="w-full h-10">
                    <SelectValue placeholder="Pilih Paket Layanan" />
                  </SelectTrigger>
                  <SelectContent className="max-h-72">
                    <SelectGroup>
                      <SelectLabel>Website Development</SelectLabel>
                      {websitePackages.map((p) => (
                        <SelectItem key={`web-${p.name}`} value={p.name}>
                          {p.name} ({formatRupiah(p.defaultSellingPrice)})
                        </SelectItem>
                      ))}
                    </SelectGroup>
                    <SelectSeparator />
                    <SelectGroup>
                      <SelectLabel>Digital Advertising (Ads)</SelectLabel>
                      {adsPackages.map((p) => (
                        <SelectItem key={`ads-${p.name}`} value={p.name}>
                          {p.name} ({formatRupiah(p.defaultSellingPrice)})
                        </SelectItem>
                      ))}
                    </SelectGroup>
                    <SelectSeparator />
                    <SelectGroup>
                      <SelectLabel>Mobile Application</SelectLabel>
                      {mobilePackages.map((p) => (
                        <SelectItem key={`mob-${p.name}`} value={p.name}>
                          {p.name} ({formatRupiah(p.defaultSellingPrice)})
                        </SelectItem>
                      ))}
                    </SelectGroup>
                    {customPresets.length > 0 && (
                      <>
                        <SelectSeparator />
                        <SelectGroup>
                          <SelectLabel>Layanan Kustom &amp; Kreatif</SelectLabel>
                          {customPresets.map((p) => (
                            <SelectItem key={`cust-${p.name}`} value={p.name}>
                              {p.name} {p.defaultSellingPrice > 0 ? `(${formatRupiah(p.defaultSellingPrice)})` : ''}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </>
                    )}
                    <SelectSeparator />
                    <SelectItem value="__add_custom_package__" className="text-primary font-semibold">
                      + Tambah Paket Baru ke Daftar...
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Panel Form Tambah Paket Baru */}
            {isAddingCustomPackage && (
              <div className="rounded-xl border border-orange-200 bg-orange-50/50 p-4 space-y-4 animate-in fade-in-50 duration-200">
                <div className="flex items-center justify-between border-b border-orange-200/70 pb-2">
                  <div className="flex items-center gap-2 text-sm font-bold text-neutral-900">
                    <Package className="w-4 h-4 text-[#D13D00]" />
                    <span>Tambah Paket Layanan Baru ke Daftar</span>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsAddingCustomPackage(false)}
                    className="h-7 px-2 text-xs text-neutral-500 hover:text-neutral-800"
                  >
                    <X className="w-3.5 h-3.5 mr-1" />
                    Tutup
                  </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                  <div className="space-y-1.5">
                    <Label htmlFor="new-pkg-name" className="text-xs">
                      Nama Paket Baru
                    </Label>
                    <Input
                      id="new-pkg-name"
                      placeholder="Contoh: Paket Maintenance & SEO Bulanan"
                      value={newPkgName}
                      onChange={(e) => setNewPkgName(e.target.value)}
                      className="text-xs bg-white"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="new-pkg-category" className="text-xs">
                      Kategori Layanan
                    </Label>
                    <Select
                      value={newPkgCategory}
                      onValueChange={(val) => setNewPkgCategory(val as ServiceCategory)}
                    >
                      <SelectTrigger id="new-pkg-category" className="w-full h-9 text-xs bg-white">
                        <SelectValue placeholder="Pilih Kategori" />
                      </SelectTrigger>
                      <SelectContent>
                        {categoryOptions.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="new-pkg-price" className="text-xs">
                      Harga Jual Standar (IDR)
                    </Label>
                    <Input
                      id="new-pkg-price"
                      type="number"
                      min={0}
                      value={newPkgPrice || ''}
                      onChange={(e) => setNewPkgPrice(Math.max(0, parseInt(e.target.value) || 0))}
                      className="text-xs font-mono font-bold bg-white"
                      placeholder="Contoh: 1500000"
                    />
                    <p className="text-[11px] text-muted-foreground">
                      Terformat: <span className="font-semibold text-foreground">{formatRupiah(newPkgPrice)}</span>
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="new-pkg-desc" className="text-xs">
                      Deskripsi Ringkas (Opsional)
                    </Label>
                    <Input
                      id="new-pkg-desc"
                      placeholder="Ringkasan fitur &amp; cakupan paket"
                      value={newPkgDesc}
                      onChange={(e) => setNewPkgDesc(e.target.value)}
                      className="text-xs bg-white"
                    />
                  </div>
                </div>

                {/* Pos HPP Awal untuk Paket Baru */}
                <div className="space-y-2 border-t border-orange-200/70 pt-3 text-left">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs font-bold text-neutral-800">
                      Pos Modal HPP Bawaan (Opsional)
                    </Label>
                    <button
                      type="button"
                      onClick={() =>
                        setNewPkgHppItems([
                          ...newPkgHppItems,
                          { category: 'other', description: '', amount: 0 },
                        ])
                      }
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#D13D00] hover:text-[#B33400] cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Tambah Pos HPP</span>
                    </button>
                  </div>

                  <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                    {newPkgHppItems.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Select
                          value={item.category}
                          onValueChange={(val) => {
                            const updated = [...newPkgHppItems]
                            updated[idx].category = val as HppCategory
                            setNewPkgHppItems(updated)
                          }}
                        >
                          <SelectTrigger className="w-28 h-8 text-xs bg-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="hosting">Hosting</SelectItem>
                            <SelectItem value="domain">Domain</SelectItem>
                            <SelectItem value="freelancer">Freelancer</SelectItem>
                            <SelectItem value="license">Lisensi</SelectItem>
                            <SelectItem value="tools">Tools / API</SelectItem>
                            <SelectItem value="other">Lainnya</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input
                          placeholder="Deskripsi pengeluaran..."
                          value={item.description}
                          onChange={(e) => {
                            const updated = [...newPkgHppItems]
                            updated[idx].description = e.target.value
                            setNewPkgHppItems(updated)
                          }}
                          className="text-xs h-8 bg-white flex-1"
                        />
                        <Input
                          type="number"
                          placeholder="Nominal"
                          value={item.amount || ''}
                          onChange={(e) => {
                            const updated = [...newPkgHppItems]
                            updated[idx].amount = Math.max(0, parseInt(e.target.value) || 0)
                            setNewPkgHppItems(updated)
                          }}
                          className="w-28 text-xs font-mono h-8 bg-white"
                        />
                        {newPkgHppItems.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                              setNewPkgHppItems(newPkgHppItems.filter((_, i) => i !== idx))
                            }
                            className="h-8 w-8 text-neutral-400 hover:text-red-600"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Tombol Simpan Paket */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pt-2 border-t border-orange-200/70">
                  <span className="text-[11px] text-neutral-500">
                    Paket baru akan tersimpan di daftar pilihan untuk order saat ini dan seterusnya.
                  </span>
                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setIsAddingCustomPackage(false)}
                      className="text-xs h-8"
                    >
                      Batal
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      onClick={handleSaveCustomPackage}
                      className="text-xs h-8 bg-[#D13D00] hover:bg-[#B33400] text-white font-semibold"
                    >
                      Simpan &amp; Terapkan Paket
                    </Button>
                  </div>
                </div>

                {/* Pengelolaan Paket Kustom Tersimpan */}
                {customPackages.length > 0 && (
                  <div className="mt-2 pt-2 border-t border-orange-200/70 text-left">
                    <p className="text-[11px] font-semibold text-neutral-700 mb-1.5">
                      Paket Tambahan Buatan Anda ({customPackages.length}):
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {customPackages.map((pkg) => (
                        <span
                          key={pkg.name}
                          className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-white border border-neutral-200 text-[11px] text-neutral-800 shadow-2xs"
                        >
                          <span className="font-medium">{pkg.name}</span>
                          <span className="text-neutral-500 font-mono">({formatRupiah(pkg.defaultSellingPrice)})</span>
                          <button
                            type="button"
                            onClick={() => handleDeleteCustomPackage(pkg.name)}
                            className="text-neutral-400 hover:text-red-600 transition-colors ml-0.5 cursor-pointer"
                            title={`Hapus paket ${pkg.name}`}
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

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
                      <Select
                        value={item.category}
                        onValueChange={(val) => handleUpdateHppItem(idx, 'category', val as HppCategory)}
                      >
                        <SelectTrigger className="w-full h-8 text-xs bg-background">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hosting">Hosting</SelectItem>
                          <SelectItem value="domain">Domain</SelectItem>
                          <SelectItem value="license">Lisensi</SelectItem>
                          <SelectItem value="freelancer">Freelancer</SelectItem>
                          <SelectItem value="tools">Tools/API</SelectItem>
                          <SelectItem value="other">Lainnya</SelectItem>
                        </SelectContent>
                      </Select>
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
                <div className="min-h-[26px] flex items-center">
                  <Label htmlFor={`${formId}-payment-status`}>Status Pembayaran</Label>
                </div>
                <Select
                  value={paymentStatus}
                  onValueChange={(val) => {
                    const status = val as PaymentStatus
                    setPaymentStatus(status)
                    if (status === 'paid') {
                      setPaidAmount(sellingPrice)
                    } else if (status === 'unpaid') {
                      setPaidAmount(0)
                    }
                  }}
                >
                  <SelectTrigger id={`${formId}-payment-status`} className="w-full h-10">
                    <SelectValue placeholder="Pilih status bayar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="paid">Lunas (100%)</SelectItem>
                    <SelectItem value="down_payment">Uang Muka (DP)</SelectItem>
                    <SelectItem value="unpaid">Belum Bayar</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="min-h-[26px] flex items-center">
                  <Label htmlFor={`${formId}-project-status`}>Status Pengerjaan</Label>
                </div>
                <Select
                  value={projectStatus}
                  onValueChange={(val) => setProjectStatus(val as ProjectStatus)}
                >
                  <SelectTrigger id={`${formId}-project-status`} className="w-full h-10">
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

              <div className="space-y-2">
                <div className="min-h-[26px] flex items-center">
                  <Label htmlFor={`${formId}-order-date`}>Tanggal Transaksi</Label>
                </div>
                <Input
                  id={`${formId}-order-date`}
                  type="date"
                  value={orderDate}
                  onChange={(e) => setOrderDate(e.target.value)}
                  className="h-10 bg-background text-sm"
                />
              </div>
            </div>

            {paymentStatus === 'down_payment' && (
              <div className="rounded-lg bg-orange-50/60 border border-orange-200/80 p-3 grid grid-cols-1 sm:grid-cols-2 gap-3 items-center animate-in fade-in-50">
                <div className="space-y-1">
                  <Label htmlFor={`${formId}-paid-amount`} className="text-xs font-semibold text-neutral-800">
                    Nominal DP Terbayar (IDR)
                  </Label>
                  <Input
                    id={`${formId}-paid-amount`}
                    type="number"
                    min={0}
                    max={sellingPrice}
                    value={paidAmount}
                    onChange={(e) => setPaidAmount(Math.max(0, parseInt(e.target.value) || 0))}
                    className="h-10 font-mono font-bold bg-white text-sm"
                    placeholder="Contoh: 500000"
                  />
                </div>
                <div className="text-xs space-y-1 text-muted-foreground sm:pt-4">
                  <div>Terbayar: <span className="font-semibold text-foreground font-mono">{formatRupiah(paidAmount)}</span></div>
                  <div>Sisa Tagihan: <span className="font-semibold text-rose-600 font-mono">{formatRupiah(Math.max(0, sellingPrice - paidAmount))}</span></div>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor={`${formId}-notes`}>Catatan Internal (Opsional)</Label>
              <Textarea
                id={`${formId}-notes`}
                rows={2}
                placeholder="Catatan tambahan mengenai proyek, diskon khusus, atau timeline pengerjaan..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full text-sm"
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
