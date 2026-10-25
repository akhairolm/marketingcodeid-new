import React from 'react'
import Link from 'next/link'
import { desc, eq, or, isNotNull } from 'drizzle-orm'
import { db } from '@/db'
import { adClickSessions, offlineConversions } from '@/db/schema'
import { ConversionStatCard } from '@/components/dashboard/offline-conversion/ConversionStatCard'
import { MetaConversionTableClient } from './MetaConversionTableClient'
import { Target, Settings, MousePointerClick, MessageSquare, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const dynamic = 'force-dynamic'

export default async function MetaOfflineConversionPage() {
  let items: any[] = []
  let totalClicks = 0
  let totalLeads = 0
  let totalWon = 0

  try {
    const rawSessions = await db
      .select({
        id: adClickSessions.id,
        refCode: adClickSessions.refCode,
        sourceUrl: adClickSessions.sourceUrl,
        fbclid: adClickSessions.fbclid,
        fbc: adClickSessions.fbc,
        fbp: adClickSessions.fbp,
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
    totalClicks = items.length
    totalLeads = items.filter((i) => i.status === 'LEAD_RECEIVED' || i.status === 'WON').length
    totalWon = items.filter((i) => i.status === 'WON').length
  } catch (err) {
    console.error('[meta/page] Failed to query sessions:', err)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold mb-1 border border-blue-500/20">
            <Target className="w-3.5 h-3.5" />
            <span>Meta Conversions API (CAPI)</span>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-white">
            Meta Ads Offline Conversion
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Pantau sesi klik iklan Meta, pencocokan chat WhatsApp, dan kirim sinyal closing Purchase ke Meta Events Manager secara real-time.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/dashboard/offline-conversion/meta/settings">
            <Button
              variant="outline"
              size="sm"
              className="border-zinc-700 bg-zinc-900 text-zinc-300 hover:text-white flex items-center gap-2 cursor-pointer text-xs"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Pengaturan CAPI</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ConversionStatCard
          label="Total Sesi Klik Iklan"
          value={totalClicks}
          sublabel="Klik tombol WhatsApp tercatat"
          icon={MousePointerClick}
          accent="blue"
        />
        <ConversionStatCard
          label="Prospek Chat Masuk"
          value={totalLeads}
          sublabel="Ref code & nomor WA cocok"
          icon={MessageSquare}
          accent="purple"
        />
        <ConversionStatCard
          label="Transaksi Closing"
          value={totalWon}
          sublabel="Event Purchase terkirim CAPI"
          icon={CheckCircle}
          accent="emerald"
        />
        <ConversionStatCard
          label="Estimasi EMQ Match"
          value="8.8 / 10"
          sublabel="Kombinasi fbc, fbp, IP & SHA-256"
          icon={Target}
          accent="primary"
        />
      </div>

      {/* Interactive Table Client */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-300">
            Riwayat Sesi Klik & Status Closing
          </h2>
          <span className="text-xs text-zinc-500">
            Menampilkan {items.length} data terbaru
          </span>
        </div>

        <MetaConversionTableClient items={items} />
      </div>
    </div>
  )
}
