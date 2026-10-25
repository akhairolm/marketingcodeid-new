import { NextResponse } from 'next/server'
import { desc, eq, isNotNull } from 'drizzle-orm'
import { db } from '@/db'
import { adClickSessions, offlineConversions } from '@/db/schema'
import { getSessionUser } from '@/lib/auth'
import { generateGoogleAdsConversionCsv } from '@/lib/integrations/google-csv-export'

export async function GET() {
  const user = await getSessionUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const rows = await db
      .select({
        gclid: adClickSessions.gclid,
        eventName: offlineConversions.eventName,
        conversionTime: offlineConversions.conversionTime,
        conversionValue: offlineConversions.conversionValue,
        currency: offlineConversions.currency,
      })
      .from(offlineConversions)
      .innerJoin(adClickSessions, eq(offlineConversions.sessionId, adClickSessions.id))
      .where(isNotNull(adClickSessions.gclid))
      .orderBy(desc(offlineConversions.conversionTime))

    const csvData = rows.map((r) => ({
      gclid: r.gclid!,
      conversionName: r.eventName === 'Purchase' ? 'Closing_WhatsApp_Sales' : r.eventName,
      conversionTime: r.conversionTime,
      conversionValue: r.conversionValue || '0',
      currency: r.currency || 'IDR',
    }))

    const csvString = generateGoogleAdsConversionCsv(csvData)

    const dateStr = new Date().toISOString().slice(0, 10)
    return new NextResponse(csvString, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="google-ads-offline-conversions-${dateStr}.csv"`,
      },
    })
  } catch (error) {
    console.error('[export-csv] Failed to export Google Ads CSV:', error)
    return NextResponse.json({ error: 'Gagal membuat file ekspor CSV' }, { status: 500 })
  }
}
