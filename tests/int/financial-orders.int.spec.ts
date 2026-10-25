import { describe, it, expect, afterAll } from 'vitest'
import {
  calculateProfitAndMargin,
  generateOrderNumber,
  formatRupiah,
  formatPercent,
} from '@/lib/financial/calculator'
import {
  PACKAGE_PRESETS,
  getPackagePresets,
  getPackagePreset,
} from '@/lib/financial/package-presets'
import { db } from '@/db'
import { orders, orderHppItems } from '@/db/schema'
import {
  recalculateOrderTotals,
  getFinancialSummary,
  getOrderWithHppDetails,
} from '@/lib/financial/queries'
import { eq } from 'drizzle-orm'

describe('Dashboard Keuangan & Modifikasi HPP Dinamis Suite', () => {
  let createdOrderId: string | null = null
  let createdItemId: string | null = null

  afterAll(async () => {
    // Bersihkan data uji coba jika ada yang tersisa
    if (createdOrderId) {
      await db.delete(orders).where(eq(orders.id, createdOrderId))
    }
  })

  describe('1. Unit Test Kalkulator Finansial & Pemformat', () => {
    it('menghitung laba bersih dan margin keuntungan normal secara presisi', () => {
      const res = calculateProfitAndMargin(1190000, 350000)
      expect(res.netProfit).toBe(840000)
      expect(res.profitMargin).toBe(70.59)
    })

    it('menghitung titik impas (break-even) ketika harga jual sama dengan total HPP', () => {
      const res = calculateProfitAndMargin(1000000, 1000000)
      expect(res.netProfit).toBe(0)
      expect(res.profitMargin).toBe(0)
    })

    it('menghitung rugi negatif ketika total HPP melebihi harga jual', () => {
      const res = calculateProfitAndMargin(500000, 700000)
      expect(res.netProfit).toBe(-200000)
      expect(res.profitMargin).toBe(-40)
    })

    it('menangani harga jual 0 dengan margin 0 tanpa error division by zero', () => {
      const res = calculateProfitAndMargin(0, 150000)
      expect(res.netProfit).toBe(-150000)
      expect(res.profitMargin).toBe(0)
    })

    it('memformat angka Rupiah dengan benar', () => {
      expect(formatRupiah(1190000)).toBe('Rp 1.190.000')
      expect(formatRupiah(0)).toBe('Rp 0')
      expect(formatRupiah(-50000)).toBe('-Rp 50.000')
      expect(formatRupiah(null)).toBe('Rp 0')
      expect(formatRupiah(undefined)).toBe('Rp 0')
    })

    it('memformat persentase margin dengan benar', () => {
      expect(formatPercent(70.59)).toBe('70.6%')
      expect(formatPercent('65.4')).toBe('65.4%')
      expect(formatPercent(0)).toBe('0.0%')
      expect(formatPercent(null)).toBe('0%')
    })

    it('menghasilkan nomor order berformat ORD-YYYYMM-XXX', () => {
      const num = generateOrderNumber(new Date('2026-10-25'), 1)
      expect(num).toBe('ORD-202610-001')

      const autoNum = generateOrderNumber(new Date('2026-10-25'))
      expect(autoNum).toMatch(/^ORD-202610-\d{3}$/)
    })
  })

  describe('2. Preset Paket Layanan Agensi', () => {
    it('memuat daftar paket resmi agensi MarketingCode.ID', () => {
      expect(PACKAGE_PRESETS.length).toBeGreaterThan(0)

      const websitePresets = getPackagePresets('website')
      expect(websitePresets.length).toBeGreaterThanOrEqual(3)

      const landingPage = getPackagePreset('website', 'Landing Page & Iklan')
      expect(landingPage).toBeDefined()
      expect(landingPage?.defaultSellingPrice).toBe(1190000)
      expect(landingPage?.defaultHppItems.length).toBe(2)
    })

    it('mengembalikan preset kustom jika diperlukan', () => {
      const custom = getPackagePreset('custom', 'Paket Kustom / Layanan Khusus')
      expect(custom).toBeDefined()
      expect(custom?.defaultSellingPrice).toBe(0)
    })
  })

  describe('3. Database: Pencatatan Order & Rincian HPP Dinamis', () => {
    it('menyimpan order baru beserta rincian pos biaya modal awal', async () => {
      const sellingPrice = 1190000
      const initialHpp = 350000
      const { netProfit, profitMargin } = calculateProfitAndMargin(sellingPrice, initialHpp)

      const [newOrder] = await db
        .insert(orders)
        .values({
          orderNumber: 'ORD-TEST-2610-999',
          clientName: 'Budi Santoso (Test Suite)',
          clientPhone: '081234567890',
          clientCompany: 'Agan Travel Bandung',
          serviceCategory: 'website',
          packageName: 'Landing Page & Iklan',
          sellingPrice,
          totalHpp: initialHpp,
          netProfit,
          profitMargin: profitMargin.toString(),
          paymentStatus: 'paid',
          paidAmount: sellingPrice,
          projectStatus: 'in_progress',
        })
        .returning()

      createdOrderId = newOrder.id
      expect(newOrder.id).toBeDefined()
      expect(newOrder.totalHpp).toBe(350000)
      expect(newOrder.netProfit).toBe(840000)

      // Simpan 2 item HPP awal
      const [item1] = await db
        .insert(orderHppItems)
        .values({
          orderId: newOrder.id,
          category: 'hosting',
          description: 'Cloud VPS 1 Tahun',
          amount: 200000,
        })
        .returning()

      createdItemId = item1.id

      await db.insert(orderHppItems).values({
        orderId: newOrder.id,
        category: 'domain',
        description: 'Domain .com 1 Tahun',
        amount: 150000,
      })

      const details = await getOrderWithHppDetails(newOrder.id)
      expect(details).toBeDefined()
      expect(details?.hppItems.length).toBe(2)
    })

    it('memodifikasi HPP saat mendapat promo hosting murah dan me-rekalkulasi profit secara otomatis', async () => {
      expect(createdOrderId).toBeDefined()
      expect(createdItemId).toBeDefined()

      // Simulasi pemilik agensi mendapat promo hosting murah dari Rp 200.000 menjadi Rp 100.000
      await db
        .update(orderHppItems)
        .set({
          amount: 100000,
          description: 'Cloud VPS 1 Tahun (Diskon Promo 50%)',
          notes: 'Kupon PROMO50',
          updatedAt: new Date(),
        })
        .where(eq(orderHppItems.id, createdItemId!))

      // Jalankan fungsi rekalkulasi otomatis
      const updatedOrder = await recalculateOrderTotals(createdOrderId!)

      expect(updatedOrder).toBeDefined()
      // Total HPP turun: 100.000 (hosting) + 150.000 (domain) = 250.000
      expect(updatedOrder?.totalHpp).toBe(250000)
      // Laba bersih naik: 1.190.000 - 250.000 = 940.000
      expect(updatedOrder?.netProfit).toBe(940000)
      // Margin naik: (940.000 / 1.190.000) * 100 = 78.99%
      expect(Number(updatedOrder?.profitMargin)).toBe(78.99)
    })

    it('menambahkan pos biaya tak terduga dan memverifikasi rekalkulasi profit', async () => {
      expect(createdOrderId).toBeDefined()

      // Tambah biaya freelancer add-on: Rp 75.000
      const [extraItem] = await db
        .insert(orderHppItems)
        .values({
          orderId: createdOrderId!,
          category: 'freelancer',
          description: 'Copywriting Tambahan',
          amount: 75000,
        })
        .returning()

      const updated = await recalculateOrderTotals(createdOrderId!)
      // Total HPP bertambah: 250.000 + 75.000 = 325.000
      expect(updated?.totalHpp).toBe(325000)
      // Laba bersih: 1.190.000 - 325.000 = 865.000
      expect(updated?.netProfit).toBe(865000)

      // Hapus pos biaya tambahan tersebut
      await db.delete(orderHppItems).where(eq(orderHppItems.id, extraItem.id))
      const restored = await recalculateOrderTotals(createdOrderId!)
      expect(restored?.totalHpp).toBe(250000)
      expect(restored?.netProfit).toBe(940000)
    })

    it('memverifikasi getFinancialSummary menyertakan transaksi aktif', async () => {
      const summary = await getFinancialSummary()

      expect(summary.currentMonth).toBeDefined()
      expect(summary.currentMonth.orderCount).toBeGreaterThanOrEqual(1)
      expect(summary.currentMonth.totalNetProfit).toBeGreaterThan(0)
      expect(summary.currentYear).toBeDefined()
      expect(summary.allTime).toBeDefined()
    })

    it('memastikan cascade delete menghapus order dan seluruh rincian pos biaya terkait', async () => {
      expect(createdOrderId).toBeDefined()

      // Hapus order
      await db.delete(orders).where(eq(orders.id, createdOrderId!))

      // Verifikasi item pos biaya juga otomatis terhapus (cascade)
      const remainingItems = await db
        .select()
        .from(orderHppItems)
        .where(eq(orderHppItems.orderId, createdOrderId!))

      expect(remainingItems.length).toBe(0)
      createdOrderId = null
    })
  })
})
