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
import { normalizePhoneNumberE164 } from '@/lib/tracking/whatsapp-parser'
import { hashSha256 } from '@/lib/tracking/hashing'

export async function markGoogleLeadClosingAction(formData: FormData): Promise<{
  success: boolean
  error?: string
  result?: GoogleConversionResponse
}> {
  await requireAdmin()

  const sessionId = String(formData.get('sessionId') || '').trim()
  const conversionValue = Number(formData.get('conversionValue') || 0)
  const rawPhone = String(formData.get('phoneNumber') || '').trim()

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

    let finalPhone = session.phoneNumber
    let finalPhoneHash = session.phoneHash

    if (rawPhone) {
      finalPhone = normalizePhoneNumberE164(rawPhone)
      finalPhoneHash = hashSha256(finalPhone)
    }

    // Update status sesi menjadi WON beserta nomor HP (jika diinput/diperbarui)
    await db
      .update(adClickSessions)
      .set({
        status: 'WON',
        phoneNumber: finalPhone,
        phoneHash: finalPhoneHash,
        updatedAt: new Date(),
      })
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
    const userIdentifiers = finalPhoneHash
      ? [{ hashedPhoneNumber: finalPhoneHash }]
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
  } catch (error: unknown) {
    console.error('[google/actions] markGoogleLeadClosingAction error:', error)
    const errMessage = error instanceof Error ? error.message : 'Gagal memproses closing Google Ads.'
    return {
      success: false,
      error: errMessage,
    }
  }
}

export async function linkGoogleSessionPhoneAction(formData: FormData): Promise<{
  success: boolean
  error?: string
  formattedPhone?: string
}> {
  await requireAdmin()

  const sessionId = String(formData.get('sessionId') || '').trim()
  const rawPhone = String(formData.get('phoneNumber') || '').trim()

  if (!sessionId) {
    return { success: false, error: 'Sesi klik iklan tidak valid.' }
  }
  if (!rawPhone) {
    return { success: false, error: 'Nomor WhatsApp wajib diisi.' }
  }

  try {
    const formattedPhone = normalizePhoneNumberE164(rawPhone)
    const phoneHash = hashSha256(formattedPhone)

    const sessions = await db
      .select({ id: adClickSessions.id, status: adClickSessions.status })
      .from(adClickSessions)
      .where(eq(adClickSessions.id, sessionId))
      .limit(1)

    if (!sessions[0]) {
      return { success: false, error: 'Data sesi tidak ditemukan.' }
    }

    const currentStatus = sessions[0].status
    const newStatus = currentStatus === 'CLICKED' ? 'LEAD_RECEIVED' : currentStatus

    await db
      .update(adClickSessions)
      .set({
        phoneNumber: formattedPhone,
        phoneHash,
        status: newStatus,
        updatedAt: new Date(),
      })
      .where(eq(adClickSessions.id, sessionId))

    revalidatePath('/dashboard/offline-conversion/google')
    revalidatePath('/dashboard/offline-conversion/meta')
    revalidatePath('/dashboard')

    return { success: true, formattedPhone }
  } catch (err) {
    console.error('[google/actions] linkGoogleSessionPhoneAction error:', err)
    return { success: false, error: 'Gagal menghubungkan nomor WhatsApp.' }
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
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : 'Gagal menyimpan pengaturan Google Ads.'
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

    revalidatePath('/dashboard/offline-conversion/google')
    revalidatePath('/dashboard/offline-conversion/meta')
    revalidatePath('/dashboard')
  } catch (error) {
    console.error('[google/actions] deleteAdClickSessionAction error:', error)
    throw new Error('Gagal menghapus data sesi iklan.')
  }
}
