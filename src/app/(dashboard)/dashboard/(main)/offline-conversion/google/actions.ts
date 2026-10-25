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
import {
  sendGoogleOfflineConversion,
  formatGoogleAdsDateTime,
  type GoogleConversionResponse,
} from '@/lib/integrations/google-ads'

export async function markGoogleLeadClosingAction(formData: FormData): Promise<{
  success: boolean
  error?: string
  result?: GoogleConversionResponse
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

    // Update status sesi menjadi WON
    await db
      .update(adClickSessions)
      .set({ status: 'WON', updatedAt: new Date() })
      .where(eq(adClickSessions.id, sessionId))

    // Catat baris konversi offline
    const [conversion] = await db
      .insert(offlineConversions)
      .values({
        sessionId,
        platform: 'GOOGLE',
        eventName: 'Purchase',
        conversionValue: String(conversionValue),
        currency: 'IDR',
        conversionTime: new Date(),
      })
      .returning({ id: offlineConversions.id })

    // Siapkan identifier Enhanced Conversions
    const userIdentifiers = session.phoneHash
      ? [{ hashedPhoneNumber: session.phoneHash }]
      : []

    // Kirim konversi ke Google Ads API
    const result = await sendGoogleOfflineConversion({
      conversionId: conversion?.id,
      payload: {
        gclid: session.gclid || undefined,
        wbraid: session.wbraid || undefined,
        gbraid: session.gbraid || undefined,
        conversionAction: 'Closing_WhatsApp_Sales',
        conversionDateTime: formatGoogleAdsDateTime(new Date()),
        conversionValue,
        currencyCode: 'IDR',
        userIdentifiers,
      },
    })

    revalidatePath('/dashboard/offline-conversion/google')
    revalidatePath('/dashboard/offline-conversion/meta')
    revalidatePath('/dashboard')

    return {
      success: true,
      result,
    }
  } catch (error: any) {
    console.error('[google/actions] markGoogleLeadClosingAction error:', error)
    return {
      success: false,
      error: error?.message || 'Gagal memproses closing Google Ads.',
    }
  }
}

export async function saveGoogleConfigAction(formData: FormData): Promise<{
  success: boolean
  error?: string
}> {
  await requireAdmin()

  const customerId = String(formData.get('customerId') || '').trim()
  const conversionActionName = String(formData.get('conversionActionName') || '').trim()
  const developerToken = String(formData.get('developerToken') || '').trim()
  const enableEnhancedConversions = formData.get('enableEnhancedConversions') === 'on'

  try {
    const existing = await db
      .select({ id: adPlatformConfigs.id })
      .from(adPlatformConfigs)
      .where(eq(adPlatformConfigs.platform, 'GOOGLE'))
      .limit(1)

    const payload = {
      customerId,
      conversionActionName: conversionActionName || 'Closing_WhatsApp_Sales',
      developerToken: developerToken || undefined,
      enableEnhancedConversions,
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
        platform: 'GOOGLE',
        credentialsEncrypted: payload,
        isActive: true,
      })
    }

    revalidatePath('/dashboard/offline-conversion/google')
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error?.message || 'Gagal menyimpan pengaturan Google Ads.' }
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

    revalidatePath('/dashboard/offline-conversion/google')
    revalidatePath('/dashboard/offline-conversion/meta')
    revalidatePath('/dashboard')
  } catch (error) {
    console.error('[google/actions] deleteAdClickSessionAction error:', error)
    throw new Error('Gagal menghapus data sesi iklan.')
  }
}
