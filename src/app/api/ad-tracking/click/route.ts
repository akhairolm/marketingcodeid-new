import { NextResponse } from 'next/server'
import { db } from '@/db'
import { adClickSessions } from '@/db/schema'
import { generateRefCode, isValidRefCode } from '@/lib/tracking/ref-code'
import { extractAdParamsFromSearch, formatMetaFbc } from '@/lib/tracking/ad-params'

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}))
    const {
      sourceUrl = '',
      searchParams = '',
      fbp = null,
      fbc = null,
      refCode: clientRefCode = null,
      gclid: clientGclid = null,
      wbraid: clientWbraid = null,
      gbraid: clientGbraid = null,
      fbclid: clientFbclid = null,
    } = body

    // Ambil IP Address dan User-Agent
    const forwardedFor = req.headers.get('x-forwarded-for')
    const ipAddress = forwardedFor ? forwardedFor.split(',')[0].trim() : req.headers.get('x-real-ip') || null
    const userAgent = req.headers.get('user-agent') || null

    // Ekstrak parameter iklan dari query string
    const adParams = extractAdParamsFromSearch(searchParams, { fbp, fbc })

    // Gabungkan parameter dari URL query dan parameter yang dipersistensikan dari client
    const effectiveGclid = adParams.gclid || (typeof clientGclid === 'string' ? clientGclid.trim() : null)
    const effectiveWbraid = adParams.wbraid || (typeof clientWbraid === 'string' ? clientWbraid.trim() : null)
    const effectiveGbraid = adParams.gbraid || (typeof clientGbraid === 'string' ? clientGbraid.trim() : null)
    const effectiveFbclid = adParams.fbclid || (typeof clientFbclid === 'string' ? clientFbclid.trim() : null)

    const effectiveFbc =
      adParams.fbc ||
      (typeof fbc === 'string' ? fbc : null) ||
      (effectiveFbclid ? formatMetaFbc(effectiveFbclid) : null)
    const effectiveFbp = adParams.fbp || (typeof fbp === 'string' ? fbp : null)

    // Tentukan kode referensi unik (prioritaskan dari client jika valid)
    let refCode =
      clientRefCode && typeof clientRefCode === 'string' && isValidRefCode(clientRefCode)
        ? clientRefCode.trim().startsWith('#')
          ? clientRefCode.trim().toUpperCase()
          : `#${clientRefCode.trim().toUpperCase()}`
        : generateRefCode()

    let insertedId: string | null = null

    try {
      const [newSession] = await db
        .insert(adClickSessions)
        .values({
          refCode,
          sourceUrl: sourceUrl || null,
          gclid: effectiveGclid,
          wbraid: effectiveWbraid,
          gbraid: effectiveGbraid,
          fbclid: effectiveFbclid,
          fbc: effectiveFbc,
          fbp: effectiveFbp,
          ipAddress: ipAddress ? ipAddress.slice(0, 45) : null,
          userAgent: userAgent ? userAgent.slice(0, 500) : null,
          status: 'CLICKED',
        })
        .returning({ id: adClickSessions.id, refCode: adClickSessions.refCode })

      if (newSession) {
        insertedId = newSession.id
        refCode = newSession.refCode
      }
    } catch (dbError) {
      console.error('[ad-tracking/click] Database insert error:', dbError)
      // Fallback: coba sekali lagi dengan kode baru jika terjadi collision
      try {
        const fallbackCode = generateRefCode()
        const [fallbackSession] = await db
          .insert(adClickSessions)
          .values({
            refCode: fallbackCode,
            sourceUrl: sourceUrl || null,
            gclid: effectiveGclid,
            wbraid: effectiveWbraid,
            gbraid: effectiveGbraid,
            fbclid: effectiveFbclid,
            fbc: effectiveFbc,
            fbp: effectiveFbp,
            ipAddress: ipAddress ? ipAddress.slice(0, 45) : null,
            userAgent: userAgent ? userAgent.slice(0, 500) : null,
            status: 'CLICKED',
          })
          .returning({ id: adClickSessions.id, refCode: adClickSessions.refCode })

        if (fallbackSession) {
          insertedId = fallbackSession.id
          refCode = fallbackSession.refCode
        }
      } catch (retryError) {
        console.error('[ad-tracking/click] Fallback insert error:', retryError)
      }
    }

    return NextResponse.json({
      success: true,
      refCode,
      sessionId: insertedId,
    })
  } catch (error) {
    console.error('[ad-tracking/click] Handler error:', error)
    return NextResponse.json(
      {
        success: false,
        refCode: generateRefCode(),
        sessionId: null,
      },
      { status: 200 } // Tetap 200 agar client-side fetch tidak melempar uncaught error
    )
  }
}
