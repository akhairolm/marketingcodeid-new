import React from 'react'
import type { Metadata } from 'next'
import { TrendingUp, Coins, Receipt, Percent } from 'lucide-react'
import { FinancialStatCard } from '@/components/dashboard/financial/FinancialStatCard'
import { OrdersTableClient } from '@/components/dashboard/financial/OrdersTableClient'
import { getFinancialSummary, getOrdersWithBreakdownList } from '@/lib/financial/queries'
import { formatRupiah, formatPercent } from '@/lib/financial/calculator'

export const metadata: Metadata = {
  title: 'Keuangan & Laba Bersih Agensi | Dashboard MarketingCode',
  description: 'Pencatatan penjualan, rincian komponen HPP dinamis, dan analisis laba bersih agensi.',
}

export const dynamic = 'force-dynamic'

export default async function KeuanganDashboardPage() {
  const [summary, orders] = await Promise.all([
    getFinancialSummary(),
    getOrdersWithBreakdownList(),
  ])

  return (
    <div className="space-y-6">
      {/* Header Halaman */}
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
          Laporan Penjualan & Laba Bersih Agensi
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Pantau omset penjualan, rincian modal HPP dinamis per proyek, dan perolehan profit bersih riil agensi.
        </p>
      </div>

      {/* 4 Kartu KPI Finansial Utama */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <FinancialStatCard
          title="Laba Bersih Bulan Ini"
          value={formatRupiah(summary.currentMonth.totalNetProfit)}
          subValue={`Tahun ini: ${formatRupiah(summary.currentYear.totalNetProfit)}`}
          icon={TrendingUp}
          variant="emerald"
        />

        <FinancialStatCard
          title="Total Omset Bulan Ini"
          value={formatRupiah(summary.currentMonth.totalSellingPrice)}
          subValue={`Tahun ini: ${formatRupiah(summary.currentYear.totalSellingPrice)}`}
          icon={Coins}
          variant="blue"
        />

        <FinancialStatCard
          title="Total Modal HPP Bulan Ini"
          value={formatRupiah(summary.currentMonth.totalHpp)}
          subValue={`Tahun ini: ${formatRupiah(summary.currentYear.totalHpp)}`}
          icon={Receipt}
          variant="amber"
        />

        <FinancialStatCard
          title="Rata-rata Margin Bulan Ini"
          value={formatPercent(summary.currentMonth.averageProfitMargin)}
          subValue={`Rata-rata tahun ini: ${formatPercent(summary.currentYear.averageProfitMargin)}`}
          icon={Percent}
          variant="purple"
        />
      </div>

      {/* Tabel Utama Order & Modifikasi HPP */}
      <OrdersTableClient initialOrders={orders} />
    </div>
  )
}
