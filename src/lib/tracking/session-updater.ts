import { eq } from 'drizzle-orm'
import { db } from '@/db'
import { adClickSessions } from '@/db/schema'
import { normalizePhoneNumberE164 } from './whatsapp-parser'
import { hashSha256 } from './hashing'

export interface MatchResult {
  matched: boolean
  sessionId?: string
  refCode?: string
  phoneNumber?: string
}

/**
 * Mencocokkan pesan masuk yang memuat kode referensi ke database sesi klik,
 * lalu memperbarui nomor telepon pengirim dan mengubah status menjadi LEAD_RECEIVED.
 */
export async function matchAndLinkIncomingLead(
  refCode: string,
  rawPhone: string
): Promise<MatchResult> {
  const cleanRef = refCode.trim().toUpperCase()
  const normalizedPhone = normalizePhoneNumberE164(rawPhone)
  const phoneHash = hashSha256(normalizedPhone)

  try {
    const rows = await db
      .select({ id: adClickSessions.id, refCode: adClickSessions.refCode, status: adClickSessions.status })
      .from(adClickSessions)
      .where(eq(adClickSessions.refCode, cleanRef))
      .limit(1)

    const session = rows[0]
    if (!session) {
      return { matched: false }
    }

    await db
      .update(adClickSessions)
      .set({
        phoneNumber: normalizedPhone,
        phoneHash,
        status: session.status === 'CLICKED' ? 'LEAD_RECEIVED' : session.status,
        updatedAt: new Date(),
      })
      .where(eq(adClickSessions.id, session.id))

    return {
      matched: true,
      sessionId: session.id,
      refCode: session.refCode,
      phoneNumber: normalizedPhone,
    }
  } catch (error) {
    console.error('[session-updater] Failed to match incoming lead:', error)
    return { matched: false }
  }
}
