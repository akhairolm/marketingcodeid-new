import React from 'react'
import Link from 'next/link'
import { desc, eq } from 'drizzle-orm'
import { db } from '@/db'
import { adClickSessions, offlineConversions } from '@/db/schema'
import { ConversionStatCard } from '@/components/dashboard/offline-conversion/ConversionStatCard'
import { GoogleConversionTableClient } from './GoogleConversionTableClient'
import { TrendingUp, Settings, Download, Search, MessageSquare, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export const dynamic = 'force-dynamic'

export default async function GoogleOfflineConversionPage() {
  let items: any[] = []
  let totalGclid = 0
  let totalLeads = 0
  let totalWon = 0

  try {
    const rawSessions = await db
      .select({
        id: adClickSessions.id,
        refCode: adClickSessions.refCode,
        sourceUrl: adClickSessions.sourceUrl,
        gclid: adClickSessions.gclid,
        wbraid: adClickSessions.wbraid,
        gbraid: adClickSessions.gbraid,
        phoneNumber: adClickSessions.phoneNumber,
        status: adClickSessions.status,
        createdAt: adClickSessions.createdAt,
        conversionId: offlineConversions.id,
        conversionValue: offlineConversions.conversionValue,
      })
      .from(adClickSessions)
      .leftJoin(
        offlineConversions,
        eq(adClickSessions.id, offlineConversions.sessionId)
      )
      .orderBy(desc(adClickSessions.createdAt))
      .limit(100)

    items = rawSessions
    totalGclid = items.filter((i) => Boolean(i.gclid || i.wbraid || i.gbraid)).length
    totalLeads = items.filter((i) => i.status === 'LEAD_RECEIVED' || i.status === 'WON').length
    totalWon = items.filter((i) => i.status === 'WON').length
  } catch (err) {
    console.error('[google/page] Failed to query sessions:', err)
  }

  return (
    <main className="w-full max-w-[1240px] mx-auto p-4 sm:p-8 flex flex-col gap-6">
      {/* ── Header ─────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className="gap-1.5 px-3 py-1 text-xs font-semibold bg-accent/40 border-border">
              <TrendingUp className="w-3.5 h-3.5 text-primary" />
              <span>Google Ads Offline Conversion Imports (OCI)</span>
            </Badge>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Google Ads Offline Conversion
          </h1>
          <p className="text-sm text-muted-foreground mt-1 max-w-2xl leading-relaxed">
            Rekam GCLID otomatis saat klik tombol WhatsApp, catat transaksi closing penjualan, dan unggah konversi ke Google Ads untuk optimasi Smart Bidding (Target ROAS).
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Button
            asChild
            variant="outline"
            size="sm"
            className="rounded-full border-border font-bold hover:bg-accent text-xs h-9 px-4"
          >
            <a href="/api/offline-conversion/google/export-csv" download>
              <Download className="w-3.5 h-3.5 mr-1.5" />
              <span>Ekspor CSV Google Ads</span>
            </a>
          </Button>

          <Button
            asChild
            variant="outline"
            size="sm"
            className="rounded-full border-border font-bold hover:bg-accent text-xs h-9 px-4"
          >
            <Link href="/dashboard/offline-conversion/google/settings">
              <Settings className="w-3.5 h-3.5 mr-1.5" />
              <span>Pengaturan Akun</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* ── KPI Stats Cards ────────────────────────────────── */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <ConversionStatCard
          label="TOTAL GCLID TERCATAT"
          value={totalGclid}
          sublabel="Pengunjung dari Google Ads"
          icon={Search}
          delay="0ms"
        />
        <ConversionStatCard
          label="LEAD WA MASUK"
          value={totalLeads}
          sublabel="Tercatat bersama nomor HP"
          icon={MessageSquare}
          delay="80ms"
        />
        <ConversionStatCard
          label="CLOSING TRANSAKSI"
          value={totalWon}
          sublabel="Siap diimpor ke Google Ads"
          icon={CheckCircle}
          delay="160ms"
        />
        <ConversionStatCard
          label="ENHANCED CONVERSIONS"
          value="Aktif"
          sublabel="SHA-256 E.164 phone matching"
          icon={TrendingUp}
          delay="240ms"
        />
      </section>

      {/* ── Table Container ────────────────────────────────── */}
      <GoogleConversionTableClient items={items} />
    </main>
  )
}
