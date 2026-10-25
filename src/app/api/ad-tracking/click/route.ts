import { NextResponse } from 'next/server'
import { db } from '@/db'
import { adClickSessions } from '@/db/schema'
import { generateRefCode } from '@/lib/tracking/ref-code'
import { extractAdParamsFromSearch } from '@/lib/tracking/ad-params'

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}))
    const { sourceUrl = '', searchParams = '', fbp = null, fbc = null } = body

    // Ambil IP Address dan User-Agent
    const forwardedFor = req.headers.get('x-forwarded-for')
    const ipAddress = forwardedFor ? forwardedFor.split(',')[0].trim() : req.headers.get('x-real-ip') || null
    const userAgent = req.headers.get('user-agent') || null

    // Ekstrak parameter iklan
    const adParams = extractAdParamsFromSearch(searchParams, { fbp, fbc })

    // Generate kode referensi unik
    let refCode = generateRefCode()
    let insertedId: string | null = null

    try {
      const [newSession] = await db
        .insert(adClickSessions)
        .values({
          refCode,
          sourceUrl: sourceUrl || null,
          gclid: adParams.gclid,
          wbraid: adParams.wbraid,
          gbraid: adParams.gbraid,
          fbclid: adParams.fbclid,
          fbc: adParams.fbc,
          fbp: adParams.fbp,
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
      // Fallback: tetap kembalikan refCode agar flow WhatsApp klien tidak terputus
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
