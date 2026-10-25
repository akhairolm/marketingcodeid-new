import React from 'react'
import type { Metadata } from 'next'
import { TrendingUp, Coins, Receipt, Percent, Wallet } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
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
    <main className="w-full max-w-[1240px] mx-auto p-4 sm:p-8 flex flex-col gap-6">
      {/* ── Header Halaman ─────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className="gap-1.5 px-3 py-1 text-xs font-semibold bg-accent/40 border-border">
              <Wallet className="w-3.5 h-3.5 text-primary" />
              <span>Manajemen Bisnis</span>
            </Badge>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Laporan Penjualan &amp; Laba Bersih Agensi
          </h1>
          <p className="text-sm text-muted-foreground mt-1 max-w-2xl leading-relaxed">
            Pantau omset penjualan, rincian modal HPP dinamis per proyek, dan perolehan profit bersih riil agensi.
          </p>
        </div>
      </div>

      {/* ── 4 Kartu KPI Finansial Utama ────────────────────── */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <FinancialStatCard
          title="Laba Bersih Bulan Ini"
          value={formatRupiah(summary.currentMonth.totalNetProfit)}
          subValue={`Tahun ini: ${formatRupiah(summary.currentYear.totalNetProfit)}`}
          icon={TrendingUp}
          variant="emerald"
          delay="0ms"
        />

        <FinancialStatCard
          title="Total Omset Bulan Ini"
          value={formatRupiah(summary.currentMonth.totalSellingPrice)}
          subValue={`Tahun ini: ${formatRupiah(summary.currentYear.totalSellingPrice)}`}
          icon={Coins}
          variant="blue"
          delay="80ms"
        />

        <FinancialStatCard
          title="Total Modal HPP Bulan Ini"
          value={formatRupiah(summary.currentMonth.totalHpp)}
          subValue={`Tahun ini: ${formatRupiah(summary.currentYear.totalHpp)}`}
          icon={Receipt}
          variant="amber"
          delay="160ms"
        />

        <FinancialStatCard
          title="Rata-rata Margin Bulan Ini"
          value={formatPercent(summary.currentMonth.averageProfitMargin)}
          subValue={`Rata-rata tahun ini: ${formatPercent(summary.currentYear.averageProfitMargin)}`}
          icon={Percent}
          variant="purple"
          delay="240ms"
        />
      </section>

      {/* ── Tabel Utama Order & Modifikasi HPP ────────────── */}
      <OrdersTableClient initialOrders={orders} />
    </main>
  )
}
