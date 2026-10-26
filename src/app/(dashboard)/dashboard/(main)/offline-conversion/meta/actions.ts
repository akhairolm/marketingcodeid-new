'use server'

import { revalidatePath } from 'next/cache'
import { eq, inArray } from 'drizzle-orm'
import { db } from '@/db'
import {
  adClickSessions,
  adPlatformConfigs,
  conversionApiLogs,
  offlineConversions,
} from '@/db/schema'
import { requireAdmin } from '@/lib/auth'
import { sendMetaCapiEvent, type MetaCapiResponse } from '@/lib/integrations/meta-capi'

export async function markMetaLeadClosingAction(formData: FormData): Promise<{
  success: boolean
  error?: string
  capiResult?: MetaCapiResponse
}> {
  await requireAdmin()

  const sessionId = String(formData.get('sessionId') || '').trim()
  const conversionValue = Number(formData.get('conversionValue') || 0)

  if (!sessionId) {
    return { success: false, error: 'Sesi klik iklan tidak valid.' }
  }

  try {
    const sessions = await db
      .select()
      .from(adClickSessions)
      .where(eq(adClickSessions.id, sessionId))
      .limit(1)

    const session = sessions[0]
    if (!session) {
      return { success: false, error: 'Data sesi tidak ditemukan di database.' }
    }

    // Update status sesi menjadi WON (Closing)
    await db
      .update(adClickSessions)
      .set({ status: 'WON', updatedAt: new Date() })
      .where(eq(adClickSessions.id, sessionId))

    // Catat baris konversi offline
    const [conversion] = await db
      .insert(offlineConversions)
      .values({
        sessionId,
        platform: 'META',
        eventName: 'Purchase',
        conversionValue: String(conversionValue),
        currency: 'IDR',
        conversionTime: new Date(),
      })
      .returning({ id: offlineConversions.id })

    // Susun payload CAPI
    const userPhoneHash = session.phoneHash ? [session.phoneHash] : []
    const capiPayload = {
      event_name: 'Purchase' as const,
      event_time: Math.floor(Date.now() / 1000),
      action_source: 'website' as const,
      event_source_url: session.sourceUrl || undefined,
      user_data: {
        fbc: session.fbc || undefined,
        fbp: session.fbp || undefined,
        client_ip_address: session.ipAddress || undefined,
        client_user_agent: session.userAgent || undefined,
        ph: userPhoneHash,
      },
      custom_data: {
        value: conversionValue,
        currency: 'IDR',
      },
    }

    // Kirim langsung ke Meta CAPI
    const capiResult = await sendMetaCapiEvent({
      conversionId: conversion?.id,
      payload: capiPayload,
    })

    revalidatePath('/dashboard/offline-conversion/meta')
    revalidatePath('/dashboard/offline-conversion/google')
    revalidatePath('/dashboard')

    return {
      success: true,
      capiResult,
    }
  } catch (error: unknown) {
    console.error('[meta/actions] markMetaLeadClosingAction error:', error)
    const errMessage = error instanceof Error ? error.message : 'Gagal memproses closing transaksi.'
    return {
      success: false,
      error: errMessage,
    }
  }
}

export async function retryMetaCapiEventAction(conversionId: string): Promise<{
  success: boolean
  error?: string
}> {
  await requireAdmin()

  if (!conversionId) return { success: false, error: 'Conversion ID tidak valid.' }

  try {
    const rows = await db
      .select({
        conversion: offlineConversions,
        session: adClickSessions,
      })
      .from(offlineConversions)
      .leftJoin(adClickSessions, eq(offlineConversions.sessionId, adClickSessions.id))
      .where(eq(offlineConversions.id, conversionId))
      .limit(1)

    const item = rows[0]
    if (!item?.conversion) {
      return { success: false, error: 'Data konversi tidak ditemukan.' }
    }

    const session = item.session
    const userPhoneHash = session?.phoneHash ? [session.phoneHash] : []

    const capiPayload = {
      event_name: item.conversion.eventName,
      event_time: Math.floor(Date.now() / 1000),
      action_source: 'website' as const,
      event_source_url: session?.sourceUrl || undefined,
      user_data: {
        fbc: session?.fbc || undefined,
        fbp: session?.fbp || undefined,
        client_ip_address: session?.ipAddress || undefined,
        client_user_agent: session?.userAgent || undefined,
        ph: userPhoneHash,
      },
      custom_data: {
        value: Number(item.conversion.conversionValue || 0),
        currency: item.conversion.currency,
      },
    }

    const capiResult = await sendMetaCapiEvent({
      conversionId,
      payload: capiPayload,
    })

    revalidatePath('/dashboard/offline-conversion/meta')
    return { success: capiResult.success, error: capiResult.error }
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : 'Gagal mengirim ulang CAPI'
    return { success: false, error: errMessage }
  }
}

export async function saveMetaConfigAction(formData: FormData): Promise<{
  success: boolean
  error?: string
}> {
  await requireAdmin()

  const pixelId = String(formData.get('pixelId') || '').trim()
  const datasetId = String(formData.get('datasetId') || '').trim()
  const accessToken = String(formData.get('accessToken') || '').trim()
  const testEventCode = String(formData.get('testEventCode') || '').trim()

  try {
    const existing = await db
      .select({ id: adPlatformConfigs.id })
      .from(adPlatformConfigs)
      .where(eq(adPlatformConfigs.platform, 'META'))
      .limit(1)

    const payload = {
      pixelId,
      datasetId: datasetId || pixelId,
      accessToken,
      testEventCode: testEventCode || undefined,
    }

    if (existing[0]) {
      await db
        .update(adPlatformConfigs)
        .set({
          credentialsEncrypted: payload,
          updatedAt: new Date(),
        })
        .where(eq(adPlatformConfigs.id, existing[0].id))
    } else {
      await db.insert(adPlatformConfigs).values({
        platform: 'META',
        credentialsEncrypted: payload,
        isActive: true,
      })
    }

    revalidatePath('/dashboard/offline-conversion/meta')
    return { success: true }
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : 'Gagal menyimpan pengaturan Meta.'
    return { success: false, error: errMessage }
  }
}

export async function deleteAdClickSessionAction(formData: FormData): Promise<void> {
  await requireAdmin()

  const id = String(formData.get('id') || '').trim()
  if (!id) return

  try {
    const relatedConversions = await db
      .select({ id: offlineConversions.id })
      .from(offlineConversions)
      .where(eq(offlineConversions.sessionId, id))

    const convIds = relatedConversions.map((c) => c.id)

    if (convIds.length > 0) {
      await db.delete(conversionApiLogs).where(inArray(conversionApiLogs.conversionId, convIds))
      await db.delete(offlineConversions).where(eq(offlineConversions.sessionId, id))
    }

    await db.delete(adClickSessions).where(eq(adClickSessions.id, id))

    revalidatePath('/dashboard/offline-conversion/meta')
    revalidatePath('/dashboard/offline-conversion/google')
    revalidatePath('/dashboard')
  } catch (error) {
    console.error('[meta/actions] deleteAdClickSessionAction error:', error)
    throw new Error('Gagal menghapus data sesi iklan.')
  }
}
