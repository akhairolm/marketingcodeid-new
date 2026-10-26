import React from 'react'
import Link from 'next/link'
import { desc, eq } from 'drizzle-orm'
import { db } from '@/db'
import { adClickSessions, offlineConversions } from '@/db/schema'
import { ConversionStatCard } from '@/components/dashboard/offline-conversion/ConversionStatCard'
import { MetaConversionTableClient, type MetaConversionItem } from './MetaConversionTableClient'
import { Target, Settings, MousePointerClick, MessageSquare, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export const dynamic = 'force-dynamic'

export default async function MetaOfflineConversionPage() {
  let items: MetaConversionItem[] = []
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
    <main className="w-full max-w-[1240px] mx-auto p-4 sm:p-8 flex flex-col gap-6">
      {/* ── Header ─────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className="gap-1.5 px-3 py-1 text-xs font-semibold bg-accent/40 border-border">
              <Target className="w-3.5 h-3.5 text-primary" />
              <span>Meta Conversions API (CAPI)</span>
            </Badge>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Meta Ads Offline Conversion
          </h1>
          <p className="text-sm text-muted-foreground mt-1 max-w-2xl leading-relaxed">
            Pantau sesi klik iklan Meta, pencocokan chat WhatsApp, dan kirim sinyal closing Purchase ke Meta Events Manager secara real-time.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            asChild
            variant="outline"
            size="sm"
            className="rounded-full border-border font-bold hover:bg-accent text-xs h-9 px-4"
          >
            <Link href="/dashboard/offline-conversion/meta/settings">
              <Settings className="w-3.5 h-3.5 mr-1.5" />
              <span>Pengaturan CAPI</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* ── KPI Stats Cards ────────────────────────────────── */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <ConversionStatCard
          label="TOTAL SESI KLIK"
          value={totalClicks}
          sublabel="Klik tombol WhatsApp tercatat"
          icon={MousePointerClick}
          delay="0ms"
        />
        <ConversionStatCard
          label="CHAT MASUK"
          value={totalLeads}
          sublabel="Ref code & nomor WA cocok"
          icon={MessageSquare}
          delay="80ms"
        />
        <ConversionStatCard
          label="CLOSING PURCHASE"
          value={totalWon}
          sublabel="Event Purchase terkirim CAPI"
          icon={CheckCircle}
          delay="160ms"
        />
        <ConversionStatCard
          label="ESTIMASI MATCH"
          value="8.8 / 10"
          sublabel="Kombinasi fbc, fbp, IP & SHA-256"
          icon={Target}
          delay="240ms"
        />
      </section>

      {/* ── Table Container ────────────────────────────────── */}
      <MetaConversionTableClient items={items} />
    </main>
  )
}
